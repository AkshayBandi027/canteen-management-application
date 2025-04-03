import expressAsyncHandler from "express-async-handler"
import Order from "../models/order-model.js"
import razorpay from "../config/razorpay.js"
import crypto from "crypto"

const createPayment = expressAsyncHandler(async (req, res) => {
  const { orderId, amount } = req.body
  const order = await Order.findById(orderId)

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    })
  }

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: order.id,
  }

  await razorpay.orders.create(options, (err, order) => {
    if (err) {
      return res.status(400).json({
        message: "Payment failed",
        order: null,
      })
    } else {
      return res.status(200).json({
        message: "Payment successful",
        order,
      })
    }
  })
})

const verifyPayment = expressAsyncHandler(async (req, res) => {
  const { orderId, paymentId, signature } = req.body

  const secretKey = process.env.SECRET_KEY

  const hmac = crypto.createHmac("sha256", secretKey)
  hmac.update(`${orderId}|${paymentId}`)

  const generateSignature = hmac.digest("hex")

  if (generateSignature !== signature) {
    return res.status(400).json({
      message: "Invalid signature",
    })
  }

  const order = await Order.findById(orderId)

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    })
  }

  order.paymentId = paymentId
  order.paymentStatus = "paid"
  await order.save()

  return res.status(200).json({
    message: "Payment verified",
    order,
  })
})

export { createPayment, verifyPayment }
