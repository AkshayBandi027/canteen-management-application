import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import globalErrorHandler from "./controllers/error-controllers.js"

dotenv.config()

const app = express()

app.use(morgan("dev"))
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.statusCode = 404;
    next(error);
  });

app.use(globalErrorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})