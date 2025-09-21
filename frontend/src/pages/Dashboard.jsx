import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MessageForm from "../components/MessageForm";
import MessageList from "../components/MessageList";
import { motion } from "framer-motion";
import gsap from "gsap";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // Animate on load
  useEffect(() => {
    gsap.from(".dashboard-header", { y: -50, opacity: 0, duration: 1 });
  }, []);

  const handleRefresh = () => setRefresh(!refresh);

  const handleCopyLatest = async () => {
    const latestMessage = document.querySelector(
      ".message-card:first-child .message-body"
    );
    if (latestMessage) {
      await navigator.clipboard.writeText(latestMessage.textContent);
      alert("✅ Latest message copied!");
    }
  };

  const handleCopyAll = async () => {
    const allMessages = [...document.querySelectorAll(".message-body")]
      .map((el) => el.textContent)
      .join("\n\n---\n\n");
    if (allMessages) {
      await navigator.clipboard.writeText(allMessages);
      alert("📋 All messages copied!");
    }
  };

  const handleClearMessages = () => {
    if (window.confirm("⚠️ Clear all messages locally?")) {
      document.querySelectorAll(".message-card").forEach((el) => el.remove());
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-purple-200 to-blue-100 text-gray-800"
      }`}
    >
      {/* Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} user={user} />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Dashboard Header */}
        <div className="dashboard-header mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 dark:text-purple-400">
            📢 DevUpSociety Hub
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share, copy & collaborate in real-time 🚀
          </p>
        </div>

        {/* Conditional Message Form */}
        {showForm && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-xl p-6 mb-6"
          >
            <MessageForm
              onMessageSent={() => {
                setRefresh(!refresh);
                setShowForm(false);
              }}
            />
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow"
          >
            {showForm ? "Close Form" : "New Message"}
          </button>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow"
          >
            Refresh
          </button>
          <button
            onClick={handleCopyLatest}
            className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white shadow"
          >
            Copy Latest
          </button>
          <button
            onClick={handleCopyAll}
            className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white shadow"
          >
            Copy All
          </button>
          <button
            onClick={handleClearMessages}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow"
          >
            Clear Local
          </button>
        </div>

        {/* Message List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-4"
        >
          <MessageList key={refresh} />
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
