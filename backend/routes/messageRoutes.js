const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Message = require("../models/Message");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
const SECRET = process.env.SECRET_KEY;

// Middleware: auth check
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).send("Access denied");

  const token = authHeader.split(" ")[1]; // remove "Bearer"
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token");
    req.userId = decoded.id;
    next();
  });
}

// Post message
router.post("/create", authMiddleware, async (req, res) => {
  const { title, body } = req.body;
  const user = await User.findById(req.userId);

  const refId = `DUS-${new Date().getFullYear()}-${Date.now()
    .toString()
    .slice(-4)}`;

  const message = new Message({ title, body, author: user._id, refId });
  await message.save();

  res.json({
    structure: {
      header: "📌 DevUpSociety 2025 Edition v1.0",
      hub: "Core Team Communication Hub",
      title,
      body,
      author: {
        name: user.name,
        role: user.role,
        team: user.team,
      },
      timestamp: new Date(),
      refId,
    },
  });
});

// Fetch all messages
router.get("/", authMiddleware, async (req, res) => {
  const messages = await Message.find()
    .populate("author")
    .sort({ createdAt: -1 });
  res.json(messages);
});

module.exports = router;
