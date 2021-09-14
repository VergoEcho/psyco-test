const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");

const Question = require("../models/questions.model");
const Result = require("../models/testResults.model");

const saltRounds = 10;

router.post("/createUser", async (req, res) => {
  try {
    console.log("b-mail ", req.body.email);
    const results = await Result.find();

    await results.forEach((result) => {
      if (result.email === req.body.email) {
        console.log("User is already in database!");
        res.sendStatus(409);
      }
    });

    const invitationLink = await bcrypt.hash(req.body.email, saltRounds);

    console.log("il", invitationLink);

    const newUser = {
      email: req.body.email,
      invitationLink: invitationLink,
    };
    console.log("newUser = ", newUser);
    const newResult = new Result(newUser);

    await newResult.save();

    res.sendStatus(201);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json(error);
  }
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
    console.log("before save");
    await result.save();
    console.log("after save");
    res.sendStatus(201);
  } catch (error) {
    console.log("error: ", error);
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
