import React, { useState, useEffect } from "react";
import MessageForm from "../components/MessageForm";
import MessageList from "../components/MessageList";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false); // toggle new message form
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Animate page load
  useEffect(() => {
    gsap.from(".dashboard-header", { opacity: 0, y: -50, duration: 1 });
    gsap.from(".dashboard-btns button", {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.2,
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleRefresh = () => setRefresh(!refresh);

  const handleCopyLatest = async () => {
    const latestMessage = document.querySelector(
      ".message-card:first-child .message-body"
    );
    if (latestMessage) {
      await navigator.clipboard.writeText(latestMessage.textContent);
      alert("Latest message copied!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-100 p-4 md:p-6">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 dashboard-header gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700">
            DevUpSociety Hub
          </h1>
          <div className="flex flex-wrap items-center gap-3 dashboard-btns">
            <span className="text-gray-700 font-semibold">
              👤 {user?.name} | {user?.role} | {user?.team}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg transition-all duration-300"
            >
              Logout
            </button>
            <button
              onClick={handleRefresh}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-lg transition-all duration-300"
            >
              Refresh Messages
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-all duration-300"
            >
              {showForm ? "Close Form" : "New Message"}
            </button>
            <button
              onClick={handleCopyLatest}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow-lg transition-all duration-300"
            >
              Copy Latest
            </button>
          </div>
        </div>

        {/* Conditional Message Form */}
        {showForm && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white backdrop-blur-md bg-opacity-60 rounded-xl shadow-xl p-6 mb-6"
          >
            <MessageForm
              onMessageSent={() => {
                setRefresh(!refresh);
                setShowForm(false);
              }}
            />
          </motion.div>
        )}

        {/* Message List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-4"
        >
          <MessageList key={refresh} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
