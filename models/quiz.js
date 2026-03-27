const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  topic: String,
  question: String,
  options: [String],
  correct: Number,
  explanation: String
});


module.exports = mongoose.model("Quiz", quizSchema);