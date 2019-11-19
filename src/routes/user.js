const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bCrypt = require("bcrypt");
const { validationResult, check } = require("express-validator");
const config = require("config");
const { signToken } = require("../utils/crypto");

let validationRules = [
  check("username", "Username is required").not().isEmpty(),
  check(
    "password",
    "Password must be consist of 6 or more character"
  ).isLength({ min: 6 })
];

// @ROUTE : POST api/user/register
// @DESC  : This route allows user to register
// @Access : Public
router.post("/register", validationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;

  try {
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Username already exist" }] });
    }

    const user = new User({ username, password });
    //encrypt the password with bCrypt
    let salt = await bCrypt.genSalt(10);
    user.password = await bCrypt.hash(password.toString(), salt);

    //save data into database
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };
    //send jwt token to the registered user
    let token = await signToken(payload, config.get("jwtSecret"), "1000h");
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
