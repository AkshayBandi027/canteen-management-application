import jwt from "jsonwebtoken"

export const checkAuth = (req,res,next) => {
    let token
    const authHeader = req.headers.Authorization || req.headers.Authorization
    if(authHeader && authHeader.startsWith("Bearer ")) {
         token = authHeader.split(" ")[1]
    }

    if(!token) {
        return res.status(401).json({
            message: "Access denied. login required"
        })
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verifyToken
    next()
}