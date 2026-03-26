const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

router.get("/quiz/:topic", async (req, res) => {
  const topic = req.params.topic;

  console.log("Requested topic:", topic);

  const quizData = await Quiz.find({ topic });

  console.log("Fetched data:", quizData);

  res.render("listings/quiz", { quizData, topic });
});

module.exports = router;