import express from "express"
import {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  updateOrderToDelivered,
  updateOrderToCancelled,
} from "../controllers/order-controllers.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.send("Hello World!")
})

router.post("/", createOrder)

router.get("/all", getAllOrders)

router.get("/:id", getOrder)

router.put("/:id", updateOrder)

router.put("/:id/delivered", updateOrderToDelivered)

router.put("/:id/cancelled", updateOrderToCancelled)



export default router
