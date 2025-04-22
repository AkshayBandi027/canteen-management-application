import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "../lib/query-client"
import AuthProvider, { useAuth } from "../lib/context/auth-context"
import { CartProvider } from "@/lib/context/cart-context"

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Slot />
        </CartProvider>
        <StatusBar style="auto" />
      </AuthProvider>
    </QueryClientProvider>
  )
}
