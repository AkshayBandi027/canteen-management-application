import express from "express"
import { checkAuth } from "../controllers/user-controllers"

const router = express.Router()

// Adding functionality around admin users.

router.get("/admin", checkAuth, (req, res) => {
  res.send("Admin user")
})
