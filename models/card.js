const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type:  mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  likes: {
    type:  [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
}, { validateBeforeSave: true });

module.exports = mongoose.model("card", cardSchema);
