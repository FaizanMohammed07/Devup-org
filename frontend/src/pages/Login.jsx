import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    team: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || err.message || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Signup successful! Please login.");
      setIsLogin(true);
    } catch (err) {
      alert(err.response?.data?.msg || err.message || "Signup failed");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 overflow-hidden">
      {/* Glowing animated background circles */}
      <motion.div
        className="absolute w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-30"
        animate={{ x: [0, 200, -200, 0], y: [0, -100, 100, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-purple-600 rounded-full filter blur-3xl opacity-30"
        animate={{ x: [0, -150, 150, 0], y: [0, 80, -80, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
      />

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl w-full max-w-lg p-10 z-10"
      >
        <motion.h2
          key={isLogin ? "login" : "signup"}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-extrabold text-center text-white mb-8 tracking-wide drop-shadow-lg"
        >
          {isLogin ? " Welcome Back To DevUpSociety" : "🌟 Join DevUpSociety "}
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? "loginForm" : "signupForm"}
            onSubmit={isLogin ? handleLogin : handleSignup}
            initial={{ opacity: 0, x: isLogin ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 100 : -100 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {!isLogin && (
              <>
                <motion.input
                  whileFocus={{
                    scale: 1.05,
                    boxShadow: "0px 0px 15px #ec4899",
                  }}
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-pink-400 focus:outline-none"
                  required
                />
                <motion.input
                  whileFocus={{
                    scale: 1.05,
                    boxShadow: "0px 0px 15px #ec4899",
                  }}
                  type="text"
                  name="role"
                  placeholder="Role / Tag"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-pink-400 focus:outline-none"
                  required
                />
                <motion.input
                  whileFocus={{
                    scale: 1.05,
                    boxShadow: "0px 0px 15px #ec4899",
                  }}
                  type="text"
                  name="team"
                  placeholder="Team"
                  value={formData.team}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-pink-400 focus:outline-none"
                  required
                />
              </>
            )}

            <motion.input
              whileFocus={{ scale: 1.05, boxShadow: "0px 0px 15px #a855f7" }}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-purple-400 focus:outline-none"
              required
            />
            <motion.input
              whileFocus={{ scale: 1.05, boxShadow: "0px 0px 15px #a855f7" }}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-purple-400 focus:outline-none"
              required
            />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:from-pink-600 hover:to-purple-600 transition"
            >
              {isLogin ? "⚡ Login" : "✨ Sign Up"}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center text-gray-300"
        >
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            className="text-pink-400 font-bold cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Auth;
