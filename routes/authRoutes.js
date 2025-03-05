import express from "express"
import { registerUser, loginUser, logoutUser ,getUserById, updateUser } from "../controllers/auth-controllers.js"

const router = express.Router()

router.post("/signup", registerUser)

router.post("/login", loginUser)

router.get("/logout", logoutUser)

router.get("/user/:id", getUserById)

router.put("/user/:id", updateUser)

export default router
