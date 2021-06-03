const { Router } = require("express");
const router = Router();
const Question = require("../models/questions.model");

router.post("/", async (req, res) => {
  const index = await Question.countDocuments();
  const question = new Question({
    index,
    question: req.body.question,
    type: req.body.type,
    answer: req.body.answer,
  });
  await question.save();
  res.status(201);
});

router.get("/all", async (req, res) => {
  const test = await Question.find();
  res.json(test).status(201);
});

router.get("/length", async (req, res) => {
  const length = await Question.countDocuments();
  res.json(length).status(201);
});

// router.get("/:index", async (req, res)=> {
//   const index = await req.params.index;
//   console.log("index",index);
//   const question = await Question.findOne({index: req.params.index})
//   res.json(question).status(201);
// })

router.get("/byId", async (req, res) => {
  const question = new Question({
    question: req.body.question,
    type: req.body.type,
    answer: req.body.answer,
  });
  await question.save();
  res.status(201);
});

module.exports = router;
