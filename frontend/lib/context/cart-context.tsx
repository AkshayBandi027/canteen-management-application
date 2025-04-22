import { createContext, useContext, useState } from "react"
import { MenuItem } from "../types"

type CartContextProps = {
  cartItems: MenuItem[]
  addToCart: (item: any) => void
  removeFromCart: (item: any) => void
  clearCart: () => void
  updateQuantity: (itemId: number, quantity: number) => void
}

const CartContext = createContext<CartContextProps>({})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<MenuItem[]>([])

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevItems) => [
      ...prevItems,
      { ...menuItem, quantity: menuItem.quantity + 1 },
    ])
  }

  const removeFromCart = (menuItemId: number) => {
    setCartItems((prevItems) => [
      ...prevItems.filter((item) => item.id !== menuItemId),
    ])
  }

  const updateQuantity = (menuItemId: number, quantity: number) => {
    if (quantity <= 0) return

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === menuItemId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
