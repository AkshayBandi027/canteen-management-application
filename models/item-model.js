import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["vegetarian", "vegan", "non-vegetarian"],
  },
  available: {
    type: Boolean,
    default: true
  }
})

const Item = mongoose.model("Item", itemSchema)
export default Item
