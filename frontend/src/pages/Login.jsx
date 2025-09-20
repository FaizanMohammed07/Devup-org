import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle between login & signup
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    team: "",
    email: "",
    password: "",
  });

  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Animate container on mount
  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, { opacity: 0, y: -50, duration: 1 });
    }
  }, []);

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
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name,
          role: res.data.role,
          team: res.data.team,
        })
      );
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        role: formData.role,
        team: formData.team,
        email: formData.email,
        password: formData.password,
      });
      alert("Signup successful! Please login.");
      setIsLogin(true);
      setFormData({ name: "", role: "", team: "", email: "", password: "" });
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form
          onSubmit={isLogin ? handleLogin : handleSignup}
          className="space-y-4"
        >
          {/* Signup extra fields */}
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
              <input
                type="text"
                name="role"
                placeholder="Role/Tag"
                value={formData.role}
                onChange={handleChange}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
              <input
                type="text"
                name="team"
                placeholder="Team"
                value={formData.team}
                onChange={handleChange}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </>
          )}

          {/* Common fields */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition-colors"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-purple-500 cursor-pointer font-semibold"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
