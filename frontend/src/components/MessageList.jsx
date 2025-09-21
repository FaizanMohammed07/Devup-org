import { useEffect, useState } from "react";
import { fetchMessages } from "../services/api";
import { motion } from "framer-motion";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      const res = await fetchMessages();
      setMessages(res.data);
    };
    getMessages();
  }, []);

  if (!messages.length) {
    return (
      <p className="text-center text-gray-500 text-lg mt-6">
        🚀 No messages yet. Be the first to post!
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {messages.map((msg, index) => (
        <motion.div
          key={msg.refId}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-5 border border-purple-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
        >
          <h2 className="text-xl font-bold text-purple-600 mb-2">
            {msg.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-3">{msg.body}</p>

          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>
              👤 <span className="font-semibold">{msg.author.name}</span>
            </p>
            <p>
              🎭 {msg.author.role} | {msg.author.team}
            </p>
            <p>🕒 {new Date(msg.createdAt).toLocaleString()}</p>
            <p>🆔 {msg.refId}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MessageList;
