import express from "express"
import {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItems-controllers.js"

const router = express.Router()

router.get("/", isAdmin, (req, res) => {
  res.send("Welcome to Admin route!")
})

router.get("/all", getAllMenuItems)

router.post("/", isAdmin, createMenuItem)

router.get("/:id", isAdmin, getMenuItemById)

router.put("/:id", isAdmin, updateMenuItem)

router.delete("/:id", isAdmin, deleteMenuItem)

export default router
