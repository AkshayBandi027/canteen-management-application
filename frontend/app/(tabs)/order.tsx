import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Clock, CircleCheck as CheckCircle2 } from 'lucide-react-native';

const orders = [
  {
    id: 1,
    items: ['Masala Dosa x1', 'Coffee x1'],
    total: '₹80',
    status: 'preparing',
    time: '10:30 AM',
  },
  {
    id: 2,
    items: ['Veg Thali x2'],
    total: '₹240',
    status: 'ready',
    time: '10:15 AM',
  },
  {
    id: 3,
    items: ['Samosa x4', 'Tea x2'],
    total: '₹120',
    status: 'completed',
    time: 'Yesterday',
  },
];

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Orders</Text>
      </View>

      <ScrollView 
        style={styles.ordersContainer}
        contentContainerStyle={styles.ordersContent}
        showsVerticalScrollIndicator={false}>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderTime}>{order.time}</Text>
              <Text style={styles.orderTotal}>{order.total}</Text>
            </View>

            <View style={styles.orderItems}>
              {order.items.map((item, index) => (
                <Text key={index} style={styles.orderItem}>
                  {item}
                </Text>
              ))}
            </View>

            <View style={styles.orderFooter}>
              <View style={[
                styles.statusContainer,
                order.status === 'preparing' && styles.statusPreparingContainer,
                order.status === 'ready' && styles.statusReadyContainer,
                order.status === 'completed' && styles.statusCompletedContainer,
              ]}>
                {order.status === 'preparing' ? (
                  <Clock size={16} color="#92400E" />
                ) : (
                  <CheckCircle2 size={16} color="#166534" />
                )}
                <Text
                  style={[
                    styles.statusText,
                    order.status === 'preparing' && styles.statusPreparingText,
                    order.status === 'ready' && styles.statusReadyText,
                    order.status === 'completed' && styles.statusCompletedText,
                  ]}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Text>
              </View>

              {order.status === 'ready' && (
                <TouchableOpacity style={styles.pickupButton}>
                  <Text style={styles.pickupButtonText}>Pick Up</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  ordersContainer: {
    flex: 1,
  },
  ordersContent: {
    padding: 20,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  orderTotal: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#007AFF',
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusPreparingContainer: {
    backgroundColor: '#FEF3C7',
  },
  statusReadyContainer: {
    backgroundColor: '#DCFCE7',
  },
  statusCompletedContainer: {
    backgroundColor: '#F1F5F9',
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginLeft: 6,
  },
  statusPreparingText: {
    color: '#92400E',
  },
  statusReadyText: {
    color: '#166534',
  },
  statusCompletedText: {
    color: '#64748B',
  },
  pickupButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pickupButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 14,
  },
});