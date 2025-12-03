import { useState, useEffect } from "react";
import "./ChatPanels.css";

export default function ChatPanel({ onUpdateFields }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Listen for "sendMessageToChat" event (sent from SplitLayout Log button)
  useEffect(() => {
    const listener = (e) => {
      const text = e.detail;
      if (text) {
        setInput(text);
        handleSend(text);
      }
    };
    window.addEventListener("sendMessageToChat", listener);
    return () => window.removeEventListener("sendMessageToChat", listener);
  }, []);

  const handleSend = async (forcedText) => {
    const messageText = forcedText || input;
    if (!messageText.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: messageText }]);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: messageText }),
      });

      const data = await res.json();

      let aiMessage = "";

      data.actions.forEach((action) => {
        if (action.type === "update") {
          onUpdateFields(action.fields);
          setShowSuccess(true);
        }
        if (action.type === "message") {
          aiMessage = action.text;
        }
      });

      setMessages((prev) => [...prev, { sender: "ai", text: aiMessage }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error contacting backend." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">

      {/* Instructions Box */}
      <div className="ai-instructions-box">
        Log interaction details here (e.g., “Met Dr. Smith, discussed Product-X efficacy,
        positive sentiment, shared brochure”) or ask for help.
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === "user" ? "bubble-user" : "bubble-ai"}>
            <strong>{msg.sender === "user" ? "You:" : "AI:"}</strong> {msg.text}
          </div>
        ))}

        {showSuccess && (
          <div className="success-box">
            ✔ <strong>Interaction logged successfully!</strong>
            <br />
            The details (HCP Name, Date, Sentiment, and Materials) have been auto-populated
            based on your summary.
            <br />
            Would you like me to suggest a follow-up action?
          </div>
        )}
      </div>

      {/* Input + Log */}
      <div className="chat-input-row">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe interaction..."
          className="chat-input"
        />

        <button className="log-button" onClick={() => handleSend()}>
          Log
        </button>
      </div>
    </div>
  );
}
