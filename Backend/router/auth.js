const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db/conn");
const User = require("../models/user");
const Blog = require("../models/blog");
const Like = require("../models/like");
const authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  console.log(req.body);
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "ERRRRRRRRR" });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const result = await User.findOne({ email: email });
    console.log(result);
    if (result) {
      return res.status(422).send({ error: "Email exists" });
    } else if (password !== cpassword) {
      return res.status(422).send({ error: "password not matching" });
    }
    const user = new User({
      name,
      email,
      phone,
      work,
      password: passwordHash,
      img: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      },
    });
    await user.save();
    res.status(201).json({ message: "success" });
  } catch (err) {
    console.log(err);
  }
});

function generateAccessToken(id) {
  return jwt.sign(
    {
      userId: id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
}

router.post("/signin", async (req, res) => {
  let token;
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Fill required fields!!!" });
  }
  try {
    const existingUser = await User.findOne({ email: email });

    console.log("existingUser : ", existingUser);

    if (!existingUser) {
      return res.status(400).json({ error: "ERRR" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    token = generateAccessToken(existingUser._id);
    console.log("token :", token);

    console.log("isPasswordValid", isPasswordValid);

    res.cookie("jwttoken", token, {
      expires: new Date(Date.now() + 10000000000),
      httpOnly: true,
    });

    if (!isPasswordValid) {
      console.log("password invalid");
      return res.status(400).json({ error: "ERRR invalid password" });
    }
    res.json({ message: "Successful login", token, userId: existingUser._id });
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", authenticate, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      throw new Error("User not found!");
    }
    res.status(200).json({
      // message: "current user received",
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

router.patch("/update", authenticate, async(req, res) => {
  const userId = req.userId;
  console.log("__________________");
  console.log(req.body);
  console.log(req.body.user);
  console.log("___________________________");
  try {
    const user = await User.findById(userId);
    if(!user) {
      throw new Error("User not found!");
    }
    let imageUrl;
    if(req.files[0]) {
      console.log(req.files);
      imageUrl = req.files[0].path;
    }
    const {name, email, work, phone} = req.body;
    user.set({
      name: name,
      email: email,
      phone: phone,
      work: work,
      image: imageUrl
    });
    await user.save();
    console.log("--------------");
    console.log(user);
    res.status(200).send({
      message: "User profile updated!",
      user: user
    })
  } 
  catch (error) {
    console.log(error.message);
    console.log("User not updated");
    console.log("--------------");
    res.status(404).send({
      message: error.message
    });  
  }
});

module.exports = router;
