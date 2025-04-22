export type MenuItem = {
  id: number
  name: string
  imageUrl: string
  price: number
  category: string
  available: boolean
  quantity: number
}

export type Order = {
    id: number
    items: MenuItem[]
    totalPrice: number
    status: "pending" | "delivered" | "cancelled"
    userId: string
}