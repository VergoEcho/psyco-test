const { Router } = require("express");
const router = Router();

const Result = require("../models/testResults.model");

router.post("/checkUser", async (req, res) => {
  try {
    const invitationLink = req.body.invitationLink;
    const userIsChecked = await Result.exists({
      invitationLink,
      passed: false,
    });
    console.log("il", invitationLink);
    console.log("user", userIsChecked);

    res.status(200).send({ userIsChecked: userIsChecked });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json(error);
  }
});

module.exports = router;
