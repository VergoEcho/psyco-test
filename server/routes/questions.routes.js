const { Router } = require("express");
const router = Router();
const passport = require("passport");
const jwtDecode = require("jwt-decode");

const Question = require("../models/questions.model");
const Result = require("../models/testResults.model");
const InvitationLink = require("../models/invitatitonLink.model");

router.post("/saveTestResults", async (req, res) => {
  try {
    const allowed = InvitationLink.exists({ link: req.body.invitationLink });
    if (allowed) {
      const user = await jwtDecode(req.body.invitationLink);
      console.log(user);
      const userResults = {
        ...user,
        ...req.body.results,
        passed: true,
      };
      console.log("before add");
      const result = new Result(userResults);
      await result.save();
      console.log("after save");
      await InvitationLink.deleteOne({ link: req.body.invitationLink });
      console.log(result);
      res.sendStatus(201);
    } else {
      console.log("invitationLink isn't valid");
      res.sendStatus(401);
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json(error);
  }
});

router.get(
  "/testResults",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const results = await Result.find().sort({ date: -1 });
      res.json(results).status(200);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.delete(
  "/testResults/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await Result.deleteOne({ _id: req.params.id });
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get("/all", async (req, res) => {
  const test = await Question.find();
  res.json(test).status(200);
});

router.get("/allReversed", async (req, res) => {
  const test = await Question.find().sort({ index: -1 });
  res.json(test).status(200);
});

module.exports = router;
