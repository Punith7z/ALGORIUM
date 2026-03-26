const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  topic: String,
  question: String,
  options: [String],
  correct: Number,
  explanation: String
});
const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

router.get("/quiz/:topic", async (req, res) => {
  const { topic } = req.params;

  const quizData = await Quiz.find({ topic });

  res.render("quiz", {
    quizData,
    topic
  });
});

module.exports = router;

module.exports = mongoose.model("Quiz", quizSchema);