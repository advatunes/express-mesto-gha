const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      match: /^https?:\/\/(www\.)?\w+\.\w{2,}\/?.*$/i,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { validateBeforeSave: true },
);

module.exports = mongoose.model("card", cardSchema);
