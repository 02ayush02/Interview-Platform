import { AlertCircle, CheckCircle, Terminal, XCircle, Beaker } from 'lucide-react';
import { useState, useEffect } from 'react';

function OutputPanel({ output, isRunning, expectedOutput = "", examples = [] }) {
  const [activeTab, setActiveTab] = useState(0);

  // Reset to first tab whenever new output comes in
  useEffect(() => {
    setActiveTab(0);
  }, [output]);

  // Helper to normalize strings for robust comparison (removes spaces for matching)
  const normalize = (str) => (str ? str.replace(/\s+/g, '') : "");

  // Render logic for different states
  const renderContent = () => {
    if (isRunning) {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-3 text-base-content/50">
          <span className="loading loading-spinner loading-md text-primary"></span>
          <p className="text-sm font-medium animate-pulse">Compiling & Executing...</p>
        </div>
      );
    }

    if (!output) {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-2 text-base-content/40">
          <Beaker className="size-8 opacity-50" />
          <p className="text-sm">Run your code to see test results</p>
        </div>
      );
    }

    if (!output.success) {
      return (
        <div className="flex flex-col gap-2 h-full">
          <div className="flex items-center gap-2 text-error mb-1">
            <AlertCircle className="size-5" />
            <span className="font-bold text-lg">Execution Error</span>
          </div>
          <pre className="text-sm font-mono text-error bg-error/10 p-4 rounded-xl border border-error/20 whitespace-pre-wrap overflow-x-auto flex-1">
            {output.error || "An unknown error occurred during execution."}
          </pre>
        </div>
      );
    }

    // --- FAULT TOLERANCE CHECK ---
    // If ProblemPage fails to pass expectedOutput or examples, we gracefully fallback
    // to a clean raw-output view instead of falsely claiming "Wrong Answer".
    const hasTestCases = examples.length > 0 || expectedOutput;

    if (!hasTestCases) {
      return (
        <div className="flex flex-col h-full gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-success">
              Execution Successful
            </h2>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-4">
            <div>
              <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2 block">
                Raw Output
              </span>
              <pre className="p-4 rounded-xl font-mono text-sm border bg-base-200/50 text-base-content border-base-300 whitespace-pre-wrap">
                {output.output || "No output generated."}
              </pre>
            </div>
          </div>
        </div>
      );
    }

    // --- LEETCODE STYLE TEST RESULTS PARSING ---
    
    // Split the raw output block into individual lines (one per testcase)
    const actualOutputs = output.output ? output.output.trim().split('\n') : [];
    const expectedOutputs = expectedOutput ? expectedOutput.trim().split('\n') : [];

    // Map the tabs securely to ensure the UI never crashes
    const displayTabs = examples.length > 0 
      ? examples 
      : expectedOutputs.map((out) => ({ input: "Hidden Input", output: out }));

    // Safely check if the user passed all test cases
    const isAllPassed = displayTabs.every((_, i) => normalize(actualOutputs[i]) === normalize(expectedOutputs[i]));

    const currentActual = actualOutputs[activeTab] || "";
    const currentExpected = expectedOutputs[activeTab] || "";
    const currentPassed = normalize(currentActual) === normalize(currentExpected);
    const currentInput = displayTabs[activeTab]?.input || "No input provided";

    return (
      <div className="flex flex-col h-full gap-4">
        
        {/* Status Header */}
        <div className="flex items-center gap-4">
          <h2 className={`text-2xl font-bold ${isAllPassed ? 'text-success' : 'text-error'}`}>
            {isAllPassed ? 'Accepted' : 'Wrong Answer'}
          </h2>
          <span className="text-sm text-base-content/50 font-medium">Runtime: 0 ms</span>
        </div>

        {/* Test Case Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {displayTabs.map((_, idx) => {
            const isPassed = normalize(actualOutputs[idx]) === normalize(expectedOutputs[idx]);
            const isActive = activeTab === idx;
            
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap
                  ${isActive 
                    ? 'bg-base-content/10 text-base-content' 
                    : 'text-base-content/60 hover:bg-base-content/5'
                  }`}
              >
                {isPassed ? (
                  <CheckCircle className="size-4 text-success" />
                ) : (
                  <XCircle className="size-4 text-error" />
                )}
                Case {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Test Case Details */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-4">
          
          {/* Input Block */}
          <div>
            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2 block">
              Input
            </span>
            <div className="bg-base-200/50 p-4 rounded-xl font-mono text-sm border border-base-300">
              {currentInput.split(', ').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>

          {/* Actual Output Block */}
          <div>
            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2 block">
              Output
            </span>
            <div className={`p-4 rounded-xl font-mono text-sm border 
              ${!currentPassed && currentActual !== "" ? 'bg-error/10 text-error border-error/20' : 'bg-base-200/50 text-base-content border-base-300'}`}
            >
              {currentActual || "undefined"}
            </div>
          </div>

          {/* Expected Output Block */}
          <div>
            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-2 block">
              Expected
            </span>
            <div className="bg-base-200/50 p-4 rounded-xl font-mono text-sm border border-base-300 text-base-content">
              {currentExpected || "undefined"}
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-base-100 flex flex-col font-sans">
      {/* Premium Header */}
      <div className="px-4 py-3 bg-base-200/50 border-b border-base-300 font-semibold text-sm flex items-center gap-2 text-base-content/80">
        <Terminal className="size-4" />
        Test Result
      </div>
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        {renderContent()}
      </div>
    </div>
  );
}

export default OutputPanel;