// controllers/auth.controller.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.config.js";

export async function register(req, res) {
  try {
    const {
      username,
      email,
      password,
      bio = "",
      skills = ""
    } = req.body;

    // skills can arrive comma-separated
    const skillsArray = skills
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    // username / email uniqueness
    if (await User.findOne({ username }))
      return res.status(400).json({ message: "Username already exists" });
    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    // upload picture if provided
    let pictureData = { url: "", public_id: "" };
    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars"
      });
      pictureData = { url: uploadRes.secure_url, public_id: uploadRes.public_id };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      bio,
      skills: skillsArray,
      profilePicture: pictureData
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
}

// login stays the same
export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", user, token });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
}

