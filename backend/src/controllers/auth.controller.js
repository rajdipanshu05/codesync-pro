// controllers/auth.controller.js

import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";


// ================= SIGNUP =================

export const signup = async (req, res) => {
  try {

    let { username, email, password } = req.body;

    // trim + normalize
    username = username?.trim();
    email = email?.trim().toLowerCase();

    // validations
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({
        message: "Username must be between 3 and 20 characters",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // existing user check
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or Username already exists",
      });
    }

    // create user
    const user = await User.create({
      username,
      email,
      password,
    });

    // generate jwt
    const token = generateToken(user._id);

    // send cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Signup successful",

      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });

  } catch (error) {

    console.error("Signup Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


// ================= LOGIN =================

export const login = async (req, res) => {
  try {

    let { email, password } = req.body;

    email = email?.trim().toLowerCase();

    // validations
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    // find user
    const user = await User.findOne({ email })
      .select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // compare password
    const isPasswordCorrect =
      await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // generate token
    const token = generateToken(user._id);

    // send cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",

      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });

  } catch (error) {

    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


// ================= LOGOUT =================

export const logout = async (_, res) => {

  res.clearCookie("jwt");
  // res.clearCookie("token");

  return res.status(200).json({
    message: "Logout successful",
  });
};


// ================= CHECK AUTH =================

export const checkAuth = async (req, res) => {
  try {

    return res.status(200).json({
      user: req.user,
    });

  } catch (error) {

    console.error("Check Auth Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};