import asyncHandler from "express-async-handler";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../model/userModel.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Check if user already exists
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: "User created successfully",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "User not created",
    });
  }
};

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check if user exists
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(400).json({
      success: false,
      message: "User does not exist",
    });
  }

  //check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({
      success: false,
      message: "Incorrect password",
    });
  }

  if (user && isMatch) {
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

export const generateToken = id => {
  const token = jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return token;
};
