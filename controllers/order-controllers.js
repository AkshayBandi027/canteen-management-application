import asyncHandler from "express-async-handler"
import Order from "../models/order-model.js"

// so need to add payments to this
// having value for payments to order model(schema)
const createOrder = asyncHandler(async (req, res) => {
  const { items, totalPrice } = req.body
  const user = req.user

  if (!items || !totalPrice) {
    return res.send(401).json({
      message: "order details missing!",
    })
  }
  const order = await Order.create({
    user,
    items,
    totalPrice,
  })

  res.status(201).json({
    message: "Order created successfully",
    order,
  })
})

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user")
  res.status(200).json(orders)
})

const getOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id
  if (!orderId) {
    return res.status(400).json({
      message: "Please provide a valid order ID",
    })
  }
  const order = await Order.findById(orderId).populate("user")
  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    })
  }

  return res.status(200).json(order)
})

const updateOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id
  if (!orderId) {
    return res.status(400).json({
      message: "Please provide a valid order ID",
    })
  }
  const { items, totalPrice } = req.body
  if (!items || !totalPrice) {
    return res.status(400).json({
      message: "order details missing!",
    })
  }

  const order = await Order.findByIdAndUpdate(orderId, {
    items,
    totalPrice,
  })

  return res.status(200).json({
    message: "Order updated successfully",
    order,
  })
})

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const orderId = req.params.id
  if (!orderId) {
    return res.status(400).json({
      message: "Please provide a valid order ID",
    })
  }

  const order = await Order.findByIdAndUpdate(orderId, {
    status: "delivered",
  })

  return res.status(200).json({
    message: "Order updated successfully",
    order,
  })
})

const updateOrderToCancelled = asyncHandler(async (req, res) => {
  const orderId = req.params.id
  if (!orderId) {
    return res.status(400).json({
      message: "Please provide a valid order ID",
    })
  }

  const order = await Order.findByIdAndUpdate(orderId, {
    status: "cancelled",
  })

  return res.status(200).json({
    message: "Order updated successfully",
    order,
  })
})

export {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  updateOrderToDelivered,
  updateOrderToCancelled,
}
