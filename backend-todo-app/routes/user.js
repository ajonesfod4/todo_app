const express = require("express");
const router = express.Router();

//necessary dependencies for user routes
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Sequelize User model
const User = require("../models/user");

//middleware
const verifyJWT = require("../middleware/verfiyJWT");

//* ############### user routes ###############
// These routes are responsible for logging in and creating new users

//############### logs the user in ###############
//creates a new session token for the user
//this token will be verified during each api call from the frontend
router.post("/login", async (req, res) => {
  const user = await User.findAll({
    attributes: ["userID", "salt", "password"],
    where: { username: req.body.username },
  });

  if (user.length > 0) {
    const salt = user[0].dataValues.salt;
    const hashed_pwd = await bcrypt.hash(req.body.password, salt);

    if (hashed_pwd === user[0].dataValues.password) {
      const token = jwt.sign(
        { user: user[0].dataValues.userID },
        process.env.SECRET_KEY,
        {
          expiresIn: 300 * 60, //300 seconds * 60 (total of 300 minutes)
        }
      );

      res.json({
        auth: true,
        token: token,
        user: req.body.username,
        userID: [user[0].dataValues.userID],
      });
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
});

//############### creates a new user ###############
router.post("/createUser", async (req, res) => {
  //check if user exists
  const users = await User.findAll({
    attributes: ["username"],
    where: { username: req.body.username },
  });

  if (users.length > 0) {
    res.sendStatus(409);
  } else {
    const salt = await bcrypt.genSalt();
    const hashed_pwd = await bcrypt.hash(req.body.password, salt);

    User.create({
      username: req.body.username,
      salt: salt,
      password: hashed_pwd,
    })
      .then((user) => {
        res.send("user created");
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(401);
      });
  }
});

//############### verifies if the user's token is active or expired ###############
//this function only sends a response if the token if verified
//see verifyJWT for what is sent if token is expired
router.post("/isUserAuth", verifyJWT, (req, res) => {
  res.send({ auth: true });
});

//############### receives a user ID and returnts the corresponding username ###############
router.post("/userLetter", verifyJWT, async (req, res) => {
  const user = await User.findOne({ where: { userID: req.body.userId } });

  res.json({ userLetter: user.dataValues.username[0] });
});

module.exports = router;
