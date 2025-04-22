import React from "react"
import { useCart } from "@/lib/context/cart-context"
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native"
import { MenuItem } from "@/lib/types"

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } =
    useCart()

  const calculateTotalPrice = (items: MenuItem[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const renderItem = ({ item }: { item: MenuItem }) => (
    <CartItem
      item={item}
      quantity={item.quantity || 0}
      onRemove={removeFromCart}
      updateQuantity={updateQuantity}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCart}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={styles.listContainer}
          />

          <View style={styles.checkoutCard}>
            <View style={styles.checkoutRow}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>
                  Total: ₹{calculateTotalPrice(cartItems)}
                </Text>
                <View style={styles.cartButtons}>
                  <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>
                      Proceed to Checkout
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={clearCart}
                  >
                    <Text style={styles.clearButtonText}>Clear Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  )
}

const CartItem = ({ item, quantity, onRemove, updateQuantity }: any) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemDetails}>
        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
        <View style={styles.itemActions}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                quantity <= 1 && styles.quantityButtonDisabled,
              ]}
              onPress={() => updateQuantity(item.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemove(item.id)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    paddingTop: 30,
    paddingBottom: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#222",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCart: {
    color: "#aaa",
    fontSize: 18,
  },
  listContainer: {
    padding: 16,
  },
  cartItem: {
    flexDirection: "column",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    color: "#666",
  },
  itemActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#f2f2f2",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  checkoutCard: {
    position: "absolute",
    bottom: 61,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  checkoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalContainer: {
    alignItems: "flex-start",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  checkoutButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  clearButton: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  clearButtonText: {
    color: "#FF3B30",
    fontSize: 15,
    fontWeight: "600",
  },
  cartButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
  }
})
