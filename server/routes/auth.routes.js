const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const Result = require("../models/testResults.model");
const Admin = require("../models/admin.model");

const keys = require("../keys");

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

router.post("/admin/login", async (req, res) => {
  try {
    const candidate = await Admin.findOne({ login: req.body.login });

    if (candidate) {
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        candidate.password
      );
      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            login: candidate.login,
            userId: candidate._id,
          },
          keys.jwtKey,
          { expiresIn: 60 * 60 * 24 * 2 }
        );
        res.json({ token });
      } else {
        console.log("password ");
        res.sendStatus(404);
      }
    } else {
      console.log("admin not found");
      res.sendStatus(404);
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json(error);
  }
});

router.post(
  "/admin/register",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const candidate = await Admin.findOne({ login: req.body.login });

      if (candidate) {
        console.log("admin with this login is already in base");
        res.sendStatus(409);
      } else {
        const salt = bcrypt.genSaltSync(10);

        const admin = new Admin({
          login: req.body.login,
          password: bcrypt.hashSync(req.body.password, salt),
        });

        await admin.save();
        console.log(`new admin ${req.body.login} added to base`);
        res.sendStatus(201);
      }
    } catch (e) {
      console.log("error:", e);
      res.status(500).json(e);
    }
  }
);

module.exports = router;
