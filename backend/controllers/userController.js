import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exits = await User.findOne({ email });
    if (!exits) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, exits.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const token = generateToken(exits._id, exits.role);
    res
      .status(200)
      .json({ success: true, message: "User Logged In Successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error, Unable to Login" });
  }
};

//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exits = await User.findOne({ email });
    if (exits) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email, Please enter a valid email.",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = generateToken(user._id, user.role);
    res
      .status(201)
      .json({ success: true, message: "User Created Successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error, Unable to SignUp" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: "Server Error, Unable to get Users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Server Error, Unable to get User" });
  }
};

export { loginUser, registerUser, getAllUsers, getUserById };
