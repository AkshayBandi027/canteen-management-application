import express from "express"
import { createMenuItem, getAllMenuItems, getMenuItemById, updateMenuItem, deleteMenuItem } from "../controllers/menuItems-controllers.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.send("Hello World!")
})

router.get("/all", getAllMenuItems)

router.post("/", createMenuItem)

router.get("/:id", getMenuItemById)

router.put("/:id", updateMenuItem)

router.delete("/:id", deleteMenuItem)   


export default router