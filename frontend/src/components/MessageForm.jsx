import { useState } from "react";
import { postMessage } from "../services/api";
import { motion } from "framer-motion";

const MessageForm = ({ onMessageSent }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [generatedMsg, setGeneratedMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return alert("⚠️ Please fill all fields");

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
    alert("✅ Message copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl mb-6 border border-purple-200"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="✨ Message Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <textarea
          placeholder="📝 Message Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          rows="4"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold shadow-lg hover:opacity-90 transition"
        >
          🚀 Post Message
        </motion.button>
      </form>

      {generatedMsg && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 p-5 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-inner"
        >
          <h3 className="font-bold mb-2 text-purple-600">
            📢 Generated Message:
          </h3>
          <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-200 text-sm">
            {generatedMsg}
          </pre>
          <button
            onClick={handleCopy}
            className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            📋 Copy
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MessageForm;
