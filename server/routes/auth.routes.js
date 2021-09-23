const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const nodemailer = require("nodemailer");

const Result = require("../models/testResults.model");
const Admin = require("../models/admin.model");

const keys = require("../keys");

let smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "psychotest7@gmail.com",
    pass: "psychopass",
  },
});
var rand, mailOptions, host, link;

router.post("/sendMail", function (req, res) {
  console.log("inside send", req.body.user);
  res.sendStatus(200);
  // rand = Math.floor(Math.random() * 100 + 54);
  // host = req.get("host");
  // link = "http://" + req.get("host") + "/verify?id=" + rand;
  // console.log("to", req.query.to);
  // mailOptions = {
  //   to: req.query.to,
  //   subject: "Please confirm your Email account",
  //   html:
  //     "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
  //     link +
  //     ">Click here to verify</a>",
  // };
  // console.log(mailOptions);
  // smtpTransport.sendMail(mailOptions, function (error, response) {
  //   if (error) {
  //     console.log(error);
  //     res.end("error");
  //   } else {
  //     console.log("Message sent: " + response.message);
  //     res.end("sent");
  //   }
  // });
});

router.get("/verify", function (req, res) {
  console.log(req.protocol + ":/" + req.get("host"));
  if (req.protocol + "://" + req.get("host") === "http://" + host) {
    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.id === rand) {
      console.log("email is verified");
      res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
    } else {
      console.log("email is not verified");
      res.end("<h1>Bad Request</h1>");
    }
  } else {
    res.end("<h1>Request is from unknown source");
  }
});

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
