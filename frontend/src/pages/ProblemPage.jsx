import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems.js";
import { useEffect, useState } from "react";
import ProblemDescription from "../components/ProblemDescription.jsx";
import CodeEditorPanel from "../components/CodeEditorPanel.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import Navbar from "../components/Navbar.jsx";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { executeCode } from "../lib/piston.js";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentProblemId, setCurrentProblemId] = useState("two-sum");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");

    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);

    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const currentProblem = PROBLEMS[currentProblemId];

    // update problem when the URL changes
    useEffect(() => {
        if (id && PROBLEMS[id]) {
            setCurrentProblemId(id);
            setCode(PROBLEMS[id].starterCode[selectedLanguage]);
            setOutput(null);
        }
    }, [id, selectedLanguage]);


    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setSelectedLanguage(newLang);
        setCode(currentProblem.starterCode[newLang]);
        setOutput(null);
    };

    const handleProblemChange = (newProblemId) => {
        navigate(`/problem/${newProblemId}`);
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.2, y: 0.6 },
        });
    };

    const normalizeOutput = (output) => {
        if (!output) return "";

        return output
            .toString()
            .replace(/\r\n/g, "\n")         // Normalize line endings
            .trim()
            .split("\n")
            .map(line =>
                line
                    .trim()
                    // Remove space after [
                    .replace(/\[\s+/g, "[")
                    // Remove space before ]
                    .replace(/\s+\]/g, "]")
                    // Normalize spaces around commas → ", "
                    .replace(/\s*,\s*/g, ", ")
            )
            .join("\n");
    };

    const checkIfTestsPassed = (actualOutput, expectedOutput) => {
        const normalizedActual = normalizeOutput(actualOutput);
        const normalizedExpected = normalizeOutput(expectedOutput);

        if (normalizedActual === normalizedExpected) {
            return {
                passed: true,
                message: "All test cases passed",
            };
        }
        return {
            passed: false,
            message: "Output did not match expected results."
        };
    };

    // Helper function to keep toast notifications short and professional
    const extractShortError = (errorStr) => {
        if (!errorStr) return "Execution failed!";
        const text = errorStr.toLowerCase();

        if (text.includes("timeout") || text.includes("killed") || text.includes("signal 9") || text.includes("signal 15")) return "Time Limit Exceeded";
        if (text.includes("memory") || text.includes("signal 11") || text.includes("segmentation fault") || text.includes("core dumped")) return "Memory Limit Exceeded";
        if (text.includes("syntaxerror") || text.includes("error:")) return "Compilation / Syntax Error";
        if (text.includes("exception") || text.includes("traceback") || text.includes("referenceerror") || text.includes("typeerror")) return "Runtime Error";

        return "Execution failed with errors";
    };

    const handleRunCode = async () => {
        if (isRunning) return;

        setIsRunning(true);
        setOutput(null);

        try {
            const result = await executeCode(selectedLanguage, code);

            console.log("Backend Response:", result);

            setOutput(result);
            setIsRunning(false);

            if (result.success) {
                const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
                const testResult = checkIfTestsPassed(result.output, expectedOutput);

                if (testResult && testResult.passed) {
                    triggerConfetti();
                    toast.success(testResult.message);
                } else if (testResult) {
                    toast.error(testResult.message);
                } else {
                    toast.error("Output did not match expected results.");
                }
            } else {
                // Extracts the core issue for the toast instead of displaying 30 lines of errors
                toast.error(extractShortError(result.error));
            }
        } catch (error) {
            console.error("Frontend Fetch Error:", error);
            toast.error("Network Error: Could not reach the backend server.");
            setIsRunning(false);
        }
    };

    return (
        <div className="h-screen bg-base-200 flex flex-col font-sans">
            <Navbar />

            {/* Framed padding layout */}
            <div className="flex-1 p-3 pb-4 overflow-hidden">

                {/* autoSaveId remembers layout sizes after page refresh */}
                <PanelGroup direction="horizontal" autoSaveId="workspace-layout">

                    {/* Left Panel - Problem Description */}
                    <Panel defaultSize={45} minSize={30}>
                        <div className="h-full w-full bg-base-100 rounded-xl border border-base-300 shadow-sm overflow-hidden flex flex-col">
                            <ProblemDescription
                                problem={PROBLEMS[currentProblemId]}
                                currentProblemId={currentProblemId}
                                onProblemChange={handleProblemChange}
                                allProblems={Object.values(PROBLEMS)}
                            />
                        </div>
                    </Panel>

                    {/* Premium Vertical Resize Handle */}
                    <PanelResizeHandle className="relative w-4 flex items-center justify-center cursor-col-resize group outline-none z-10 mx-1">
                        <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-2 rounded-full bg-transparent group-hover:bg-base-300/80 group-active:bg-base-300 transition-colors duration-200" />
                        <div className="flex flex-col gap-[3px] z-10">
                            <div className="w-1 h-1 rounded-full bg-base-content/20 group-hover:bg-primary transition-colors duration-200" />
                            <div className="w-1 h-1 rounded-full bg-base-content/20 group-hover:bg-primary transition-colors duration-200" />
                            <div className="w-1 h-1 rounded-full bg-base-content/20 group-hover:bg-primary transition-colors duration-200" />
                        </div>
                    </PanelResizeHandle>

                    {/* Right Panel - Code Editor and Output */}
                    <Panel defaultSize={55} minSize={30}>
                        <PanelGroup direction="vertical" autoSaveId="editor-layout">

                            {/* Top Right - Code Editor */}
                            <Panel defaultSize={65} minSize={20}>
                                <div className="h-full w-full bg-base-100 rounded-xl border border-base-300 shadow-sm overflow-hidden flex flex-col">
                                    <CodeEditorPanel
                                        selectedLanguage={selectedLanguage}
                                        code={code}
                                        isRunning={isRunning}
                                        onLanguageChange={handleLanguageChange}
                                        onCodeChange={setCode}
                                        onRunCode={handleRunCode}
                                    />
                                </div>
                            </Panel>

                            {/* Premium Horizontal Resize Handle */}
                            <PanelResizeHandle className="relative h-4 flex items-center justify-center cursor-row-resize group outline-none z-10 my-1">
                                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-2 rounded-full bg-transparent group-hover:bg-base-300/80 group-active:bg-base-300 transition-colors duration-200" />
                                <div className="flex gap-[3px] z-10">
                                    <div className="w-1 h-1 rounded-full bg-base-content/20 group-hover:bg-primary transition-colors duration-200" />
                                    <div className="w-1 h-1 rounded-full bg-base-content/20 group-hover:bg-primary transition-colors duration-200" />
                                    <div className="w-1 h-1 rounded-full bg-base-content/20 group-hover:bg-primary transition-colors duration-200" />
                                </div>
                            </PanelResizeHandle>

                            {/* Bottom Right - Output Panel */}
                            <Panel defaultSize={35} minSize={15}>
                                <div className="h-full w-full bg-base-100 rounded-xl border border-base-300 shadow-sm overflow-hidden flex flex-col">
                                    <OutputPanel
                                        output={output}
                                        isRunning={isRunning}
                                        expectedOutput={currentProblem?.expectedOutput?.[selectedLanguage]}
                                        examples={currentProblem?.examples || []}
                                    />
                                </div>
                            </Panel>

                        </PanelGroup>
                    </Panel>

                </PanelGroup>
            </div>
        </div>
    );
}

export default ProblemPage;