const PISTON_API = "http://localhost:2000/api/v2";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "*" },
  python: { language: "python", version: "*" },
  java: { language: "java", version: "*" },
  cpp: { language: "c++", version: "*" }, 
};

function getFileName(language) {
  switch (language) {
    case "java":
      return "Main.java";
    case "javascript":
      return "main.js";
    case "python":
      return "main.py";
    case "cpp":
      return "main.cpp";
    default:
      return "main.txt";
  }
}

export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return { success: false, error: "Unsupported language" };
    }

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: getFileName(language),
            content: code,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: JSON.stringify(data) };
    }

    if (data.compile?.stderr) {
      return { success: false, error: data.compile.stderr };
    }

    if (data.run?.stderr) {
      return { success: false, error: data.run.stderr };
    }

    return { success: true, output: data.run?.stdout || "" };

  } catch (err) {
    console.error("Piston Error:", err);
    return { success: false, error: "Execution failed" };
  }
}