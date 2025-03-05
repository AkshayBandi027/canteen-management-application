
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/user-model.js"

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body
  if (!email || !password || !username) {
    res.status(400).json({ message: "Please provide all the fields" })
  }
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    res.status(400).json({ message: "User already exists" })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    email,
    password: hashedPassword,
    username,
  })
  res.status(201).json({ message: "User created successfully", user })
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: "Please provide all the fields" })
  }

  const user = await User.findOne({ email })
  if (!user) {
    res.status(400).json({ message: "User not found" })
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    res.status(400).json({ message: "Incorrect password" })
  } 
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
  res.status(200).json({ message: "Login successful", token })
})

const logoutUser = asyncHandler(async (req, res) => {
  let token
  const authHeader = req.headers.Authorization || req.headers.Authorization
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({
      message: "UnAuthorized.",
    })
  }
  req.user = null
  res.status(200).json({ message: "Logged out successfully" })
})

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id
  if (!userId) {
    return res.status(400).json({
      message: "Please provide a valid user ID",
    })
  }
  const user = await User.findById(userId)
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    })
  }
  res.status(200).json(user)
})

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id
  if (!userId) {
    return res.status(400).json({
      message: "Please provide a valid user ID",
    })
  }
  const user = await User.findById(userId)
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    })
  }
  const { email, password, username } = req.body
  if (email) {
    user.email = email
  }
  if (password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    user.password = hashedPassword
  }
  if (username) {
    user.username = username
  }
  await user.save()
  res.status(200).json({
    message: "User updated successfully",
    user,
  })
})

export { registerUser, loginUser, logoutUser, getUserById, updateUser }
