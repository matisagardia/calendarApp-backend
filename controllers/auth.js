const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

// Register user

const createUser = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // Check for mail availability

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "That email is already in use",
      });
    }

    user = new User(req.body);

    // Encrypt password

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generate JWT

    const token = await generateJWT(user.id, user.name);

    //errorHandling

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administator",
    });
  }
};

//Login

const loginUser = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if user exists

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "The user does not exist.",
      });
    }

    // Confirm passwords

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Incorrect password.",
      });
    }

    // Generate JWT

    const token = await generateJWT(user.id, user.name);

    // Authenticate

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administator.",
    });
  }
};

const revalidateToken = async (req, res = express.response) => {
  const uid = req.uid;
  const name = req.name;

  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};
