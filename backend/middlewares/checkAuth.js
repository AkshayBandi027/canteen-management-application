import expressAsyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"

const checkAuth = expressAsyncHandler(async (req, res, next) => {
  let token
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({
      message: "Access denied. login required",
    })
  }

  const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
  if (!verifyToken) {
    return res.status(401).json({
      message: "Access denied. login required",
    })
  }
  req.user = verifyToken
  next()
})

export { checkAuth }
