import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test")
  } catch (error) {
    console.error(error)
    console.log(`error while connecting to database!`)
  }
}
