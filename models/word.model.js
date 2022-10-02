const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: [true, "Word is required!"],
    unique: [true, "Word must be unique!"],
    // index: {},
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = new mongoose.model("Words", WordSchema);
