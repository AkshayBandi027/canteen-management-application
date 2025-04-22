import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native"
import { router } from "expo-router"
import {
  User,
  Wallet,
  Clock,
  Settings,
  LogOut,
  ChevronRight,
  CreditCard,
  Bell,
  Shield,
} from "lucide-react-native"
import { useAuth } from "@/lib/context/auth-context"

const menuItems = [
  {
    icon: User,
    title: "Personal Information",
    subtitle: "Update your profile details",
  },
  {
    icon: Wallet,
    title: "Payment Methods",
    subtitle: "Manage your payment options",
  },
  {
    icon: Clock,
    title: "Order History",
    subtitle: "View your past orders",
  },
  {
    icon: Bell,
    title: "Notifications",
    subtitle: "Manage your notifications",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    subtitle: "Control your account security",
  },
  {
    icon: Settings,
    title: "Settings",
    subtitle: "App preferences",
  },
]

export default function ProfileScreen() {
  
  const { authState } = useAuth()
  const hanleLogOut = () => {
    // handle logout
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
          <Text style={styles.studentId}>Student ID: CS21B0123</Text>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <CreditCard size={20} color="#007AFF" />
            <Text style={styles.balanceTitle}>Wallet Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>₹500</Text>
          <TouchableOpacity style={styles.addMoneyButton}>
            <Text style={styles.addMoneyText}>Add Money</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <item.icon size={20} color="#1E293B" />
              </View>
              <View style={styles.menuItemText}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#94A3B8" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={hanleLogOut}>
        <LogOut size={20} color="#EF4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#1E293B",
  },
  profileCard: {
    padding: 20,
  },
  profileInfo: {
    marginBottom: 24,
  },
  name: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: "#1E293B",
    marginBottom: 4,
  },
  email: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#64748B",
    marginBottom: 4,
  },
  studentId: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#94A3B8",
  },
  balanceCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    padding: 20,
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  balanceTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#1E293B",
    marginLeft: 8,
  },
  balanceAmount: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    color: "#007AFF",
    marginBottom: 16,
  },
  addMoneyButton: {
    backgroundColor: "#007AFF",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  addMoneyText: {
    fontFamily: "Inter-SemiBold",
    color: "#fff",
    fontSize: 16,
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemText: {
    marginLeft: 16,
    flex: 1,
  },
  menuItemTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#1E293B",
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#64748B",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 20,
  },
  logoutText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#EF4444",
    marginLeft: 8,
  },
})
