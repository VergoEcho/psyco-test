const { Router } = require("express");
const router = Router();
const Question = require("../models/questions.model");
const Result = require("../models/testResults.model");

router.post("/", async (req, res) => {
  const index = await Question.countDocuments();
  const question = new Question({
    index,
    question: req.body.question,
    type: req.body.type,
    answer: req.body.answer,
  });
  await question.save();
  res.sendStatus(201);
});

router.post("/saveTestResults", async (req, res) => {
  try {
    const userResults = { ...req.body.user, ...req.body.results };
    const result = new Result(userResults);
    await result.save();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/testResults", async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results).status(200);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/all", async (req, res) => {
  const test = await Question.find();
  res.json(test).status(200);
});

router.get("/allReversed", async (req, res) => {
  const test = await Question.find().sort({ index: -1 });
  res.json(test).status(200);
});

module.exports = router;
