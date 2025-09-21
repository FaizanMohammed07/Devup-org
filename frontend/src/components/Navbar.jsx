import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-lg z-50 border-b border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 hover:opacity-90 transition"
        >
          DevUpSociety
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center font-medium">
          {["Dashboard", "About", "Projects", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="relative hover:text-purple-600 dark:hover:text-purple-400 transition"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition">
              👤 Profile
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                My Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings
              </Link>
              <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={isOpen ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden bg-white dark:bg-gray-900 px-6 py-4 space-y-4 shadow-lg ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {["Dashboard", "About", "Projects", "Contact"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className="block text-lg hover:text-purple-600 dark:hover:text-purple-400 transition"
          >
            {item}
          </Link>
        ))}
        <button
          onClick={toggleDarkMode}
          className="block w-full text-left text-sm py-2"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <button className="block w-full text-left text-red-500 font-medium">
          Logout
        </button>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
