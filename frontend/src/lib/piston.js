export async function executeCode(language, code) {
  const response = await fetch("http://localhost:3000/api/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ language, code }),
  });

  return await response.json();
}