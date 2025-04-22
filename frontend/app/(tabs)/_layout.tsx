import { Redirect, Tabs, useRouter } from "expo-router"
import { House, ShoppingBag, User, History, ShoppingCart } from "lucide-react-native"
import { BlurView } from "expo-blur"
import { Platform, StyleSheet } from "react-native"
import { useAuth } from "../../lib/context/auth-context"


export default function TabLayout() {
  const { authState } = useAuth()

  if (!authState) {
    return <Redirect href="/(auth)/login" />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarLabelStyle: {
          fontFamily: "Inter-Medium",
          fontSize: 12,
          marginTop: 4,
        },
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: Platform.OS === "ios" ? BlurBackground : undefined,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Menu",
          tabBarIcon: ({ color, size }) => <House size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}

const BlurBackground = () => (
  <BlurView tint="light" intensity={95} style={StyleSheet.absoluteFill} />
)

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Platform.OS === "ios" ? "transparent" : "#fff",
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    paddingBottom: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
})
