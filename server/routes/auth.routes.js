const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const nodemailer = require("nodemailer");

const Admin = require("../models/admin.model");
const InvitationLink = require("../models/invitatitonLink.model");

const keys = require("../keys");

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "psychotest7@gmail.com",
    // pass: "psychopass",
    pass: "zsiuqrxqnddfznpz",
  },
});

router.post("/sendMail", async (req, res) => {
  try {
    console.log("inside send", req.body.user);
    const userJwt = jwt.sign(req.body.user, keys.jwtKey, {
      expiresIn: 60 * 60 * 24 * 2,
    });
    const port = req.hostname === "localhost" ? ":8081" : "";
    const link =
      // req.protocol +
      "https://" +
      req.hostname +
      port +
      "/home?invitationLink=" +
      userJwt;
    console.log(link);
    console.log("to", req.body.user.email);

    const invitationLink = new InvitationLink({ link: userJwt });
    console.log(invitationLink.link);
    const alreadyInBase = await InvitationLink.exists({
      link: invitationLink.link,
    });
    if (!alreadyInBase) {
      await invitationLink.save();
    }

    const mailOptions = {
      to: req.body.user.email,
      subject: "Оцінка рівня нервово-психічної стійкості",
      html:
        "Щоб почати тестування перейдіть за <a href=" +
        link +
        ">посиланням</a>",
    };
    await smtpTransport.sendMail(mailOptions);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.post("/checkUser", async (req, res) => {
  try {
    const invitationLink = req.body.invitationLink;
    const userIsChecked = await InvitationLink.exists({
      link: invitationLink,
    });

    res.status(200).send({ userIsChecked: userIsChecked });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json(error);
  }
});

// router.post("/admin/login", async (req, res) => {
//   try {
//     console.log(req.body.login);
//     const candidate = await Admin.findOne({ login: req.body.login });
//     console.log(await Admin.find());
//     console.log(candidate);
//
//     if (candidate) {
//       const isPasswordCorrect = bcrypt.compareSync(
//         req.body.password,
//         candidate.password
//       );
//       if (isPasswordCorrect) {
//         const token = jwt.sign(
//           {
//             login: candidate.login,
//             userId: candidate._id,
//           },
//           keys.jwtKey,
//           { expiresIn: 60 * 60 * 24 * 2 }
//         );
//         res.json({ token });
//       } else {
//         console.log("password ");
//         res.sendStatus(404);
//       }
//     } else {
//       console.log("admin not found");
//       res.sendStatus(404);
//     }
//   } catch (error) {
//     console.log("error: ", error);
//     res.status(500).json(error);
//   }
// });

router.post(
  "/admin/login",
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
