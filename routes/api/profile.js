const express = require("express");
const request = require("request");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { profile_url } = require("gravatar");

const config = require("config");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

// @route         GET api/profile/me
// @description   Get current user's profile
// @access        Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    // Check if profile is not null
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for this user." });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route         POST api/profile
// @description   Create or update user profile
// @access        Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Deconstructing the resquest body
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) {
      profileFields.status = status;
    }
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(", ").map((skill) => skill.trim());
    }

    // Build social objects
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      // Search for user existance
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update if profile exists
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create if profile is empty
      profile = new Profile(profileFields);
      // Save profile data
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route         GET api/profile
// @description   Get all user profile
// @access        Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});

// @route         GET api/profile/user/:user_id
// @description   Get all profile by user_id
// @access        Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    // Check if profile exists
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found." });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    // If user id that is passed is not valid
    if (err.kind == "ObjectID") {
      return res.status(400).json({ msg: "Profile not found." });
    }
    res.status(500).send("Internal server error");
  }
});

// @route         DELETE api/profile
// @description   Delete profile, user & post
// @access        Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user post
    await Post.deleteMany({ user: req.user.id });
    // Finds the profile and removes it
    await Profile.findOneAndRemove({ user: req.user.id });
    // Finds the user and deletes it
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error.");
  }
});

// @route         PUT api/profile/experience
// @description   Add profile experience
// @access        Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Field 'title' is required.").not().isEmpty(),
      check("company", "Field 'company' is required.").not().isEmpty(),
      check("from", "Field 'from' is required.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);
      // unshift is same as push() but pushes to the beggining rather than end.
      // That makes recent experience first in the experience array.
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route         DELETE api/profile/experience/:exp_id
// @description   Delete a profile experience
// @access        Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get the remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    // If the exp_id is wrong/not found, returns an error message.
    if (removeIndex === -1) {
      res.json({ msg: "Not found." });
      return;
    }
    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route         PUT api/profile/education
// @description   Add profile education
// @access        Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "Field 'school' is required.").not().isEmpty(),
      check("degree", "Field 'degree' is required.").not().isEmpty(),
      check("fieldofstudy", "Field 'fieldofstudy' is required.")
        .not()
        .isEmpty(),
      check("from", "Field 'from' is required.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);
      // unshift is same as push() but pushes to the beggining rather than end.
      // That makes recent experience first in the experience array.
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route         DELETE api/profile/education/:edu_id
// @description   Delete a profile education
// @access        Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get the remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    // If the exp_id is wrong/not found, returns an error message.
    if (removeIndex === -1) {
      return res.status(404).json({ msg: "Profile not found." });
    }
    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route         GET api/profile/github/:username
// @description   Get user repos from github
// @access        Public
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
      }

      if (response.statusCode !== 200) {
        res.status(404).json({ msg: "No Github profile found." });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
