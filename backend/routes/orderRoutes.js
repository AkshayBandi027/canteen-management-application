import express from "express"
import {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  updateOrderToDelivered,
  updateOrderToCancelled,
} from "../controllers/order-controllers.js"
import { checkAuth } from "../middlewares/checkAuth.js"

const router = express.Router()

router.post("/", checkAuth, createOrder)

router.get("/all", checkAuth, getAllOrders)

router.get("/:id", checkAuth, getOrder)

router.put("/:id", checkAuth, updateOrder)

router.put("/:id/delivered", checkAuth, updateOrderToDelivered)

router.put("/:id/cancelled", checkAuth, updateOrderToCancelled)

export default router
