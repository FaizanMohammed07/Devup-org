import React from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-10 mt-16"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold"> DevUpSociety </h2>
          <p className="mt-3 text-sm opacity-80">
            Empowering developers to learn, build, and grow together. Join us in
            shaping the future of innovation!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/events" className="hover:underline">
                Events
              </a>
            </li>
            <li>
              <a href="/projects" className="hover:underline">
                Projects
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Stay Updated</h2>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-lg w-full text-black"
            />
            <button className="bg-yellow-400 px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 mt-4">
            <a href="#">
              <Facebook />
            </a>
            <a href="#">
              <Twitter />
            </a>
            <a href="#">
              <Instagram />
            </a>
            <a href="#">
              <Github />
            </a>
            <a href="#">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-8 opacity-80">
        © {new Date().getFullYear()} DevUpSociety. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
