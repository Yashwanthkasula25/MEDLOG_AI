export async function sendToBackend(text) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("Backend error: " + response.statusText);
    }

    return await response.json();
  } catch (err) {
    console.error("sendToBackend error:", err);
    return {
      actions: [
        {
          type: "message",
          text: "Backend error: " + err.message,
        },
      ],
    };
  }
}
