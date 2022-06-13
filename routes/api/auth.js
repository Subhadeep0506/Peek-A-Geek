const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult, check } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route         GET api/auth
// @description   Test route
// @access        Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // '-password' excludes password from being viewed
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route         POST api/auth
// @description   Authenticate user and get token
// @access        Public
router.post(
  "/",
  [
    body("email", "Include a valid email.").isEmail(),
    body("password", "Password is required.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring the request body
    const { email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials." }] });
      }

      // Check if password is correct
      const isMatching = await bcrypt.compare(password, user.password);

      if (!isMatching) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials." }] });
      }

      // Return jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          }

          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);

      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
