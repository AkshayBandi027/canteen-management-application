import asyncHandler from "express-async-handler"
import MenuItems from "../models/item-model.js"

// Todo: use zod for validation of input !!
const createMenuItem = asyncHandler(async (req, res) => {
  const { name, imageUrl, price, description, category, available } = req.body
  const menuItem = await MenuItems.create({
    name,
    imageUrl,
    price,
    description,
    category,
    available,
  })

  return res.status(201).json({
    message: "Menu item created successfully",
    menuItem,
  })
})

const getAllMenuItems = asyncHandler(async (req, res) => {
  const menuItems = await MenuItems.find().populate("category")
  return res.status(200).json(menuItems)
})

const getMenuItemById = asyncHandler(async (req, res) => {
  const menuItemId = req.params.id
  if (!menuItemId) {
    return res.status(400).json({
      message: "Please provide a valid menu item ID",
    })
  }
  const menuItem = await MenuItems.findById(menuItemId).populate("category")
  if (!menuItem) {
     return res.status(404).json({
      message: "Menu item not found",
    })  
  }
  
  return res.status(200).json(menuItem)
})

const updateMenuItem = asyncHandler(async (req, res) => {
  const menuItemId = req.params.id
  if (!menuItemId) {
    return res.status(400).json({
      message: "Please provide a valid menu item ID",
    })
  }
  const { name, imageUrl, price, description, category, available } = req.body

  const menuItem = await MenuItems.findById(menuItemId)
  if (!menuItem) {
    return res.status(404).json({
      message: "Menu item not found",
    })
  } 
  const updatedMenuItem = await MenuItems.findByIdAndUpdate(menuItemId, {
    name,
    imageUrl,
    price,
    description,
    category,
    available,
  })
  return res.status(200).json({
    message: "Menu item updated successfully",
    updatedMenuItem,
  })
})

const deleteMenuItem = asyncHandler(async (req, res) => {
  const menuItemId = req.params.id
  if (!menuItemId) {
    return res.status(400).json({
      message: "Please provide a valid menu item ID",
    })
  }
  const menuItem = await MenuItems.findById(menuItemId)
  if (!menuItem) {
    return res.status(404).json({
      message: "Menu item not found",
    })
  }
  const deletedMenuItem = await MenuItems.findByIdAndDelete(menuItemId)
  return res.status(200).json({
    message: "Menu item deleted successfully",
    deletedMenuItem,
  })
})


export {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
}   
