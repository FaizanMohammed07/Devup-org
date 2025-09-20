const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  refId: String,
});

module.exports = mongoose.model("Message", messageSchema);
