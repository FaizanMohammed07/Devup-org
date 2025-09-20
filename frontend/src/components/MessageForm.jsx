import { useState } from "react";
import { postMessage } from "../services/api";

const MessageForm = ({ onMessageSent }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [generatedMsg, setGeneratedMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return alert("Please fill all fields");

    const res = await postMessage({ title, body });
    setGeneratedMsg(
      `📌 ${res.data.structure.header}\n${res.data.structure.hub}\n\n🔹 ${
        res.data.structure.title
      }\n${res.data.structure.body}\n\n👤 Author\nName: ${
        res.data.structure.author.name
      }\nRole: ${res.data.structure.author.role}\nTeam: ${
        res.data.structure.author.team
      }\n\n🕒 Logged At\n📅 Date: ${new Date(
        res.data.structure.timestamp
      ).toLocaleDateString()}\n⏰ Time: ${new Date(
        res.data.structure.timestamp
      ).toLocaleTimeString()}\n🆔 Ref ID: ${res.data.structure.refId}`
    );
    setTitle("");
    setBody("");
    onMessageSent(res.data.structure);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMsg);
    alert("Message copied to clipboard!");
  };

  return (
    <div className="p-4 bg-white rounded shadow-md mb-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <textarea
          placeholder="Message Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">OK</button>
      </form>

      {generatedMsg && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Generated Message:</h3>
          <pre className="whitespace-pre-wrap">{generatedMsg}</pre>
          <button
            onClick={handleCopy}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageForm;
