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
    const userResults = {
      ...req.body.user,
      ...req.body.results,
      email: "temporary@mail.com",
    };
    console.log(userResults);
    const result = new Result(userResults);
    console.log('before save');
    await result.save();
    console.log('after save');
    res.sendStatus(201);
  } catch (error) {
    print('error: ',error)
    res.status(500).json(error);
  }
});

// router.delete("/testResults", async (req, res) => {
//
// })

router.get("/testResults", async (req, res) => {
  try {
    const results = await Result.find().sort({ date: -1 });
    res.json(results).status(200);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/testResults/:id", async (req, res) => {
  try {
    await Result.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
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
