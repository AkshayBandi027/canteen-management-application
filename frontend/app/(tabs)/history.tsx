import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';

const orderHistory = [
  {
    id: 1,
    orderNumber: '#ORD-2024-001',
    date: 'Jan 15, 2024',
    items: ['1x Chicken Burger', '1x French Fries', '1x Coke'],
    location: 'Main Cafeteria',
    total: '12.99',
    status: 'Completed',
  },
  {
    id: 2,
    orderNumber: '#ORD-2024-002',
    date: 'Jan 14, 2024',
    items: ['2x Veggie Pizza', '2x Water'],
    location: 'Food Court',
    total: '18.98',
    status: 'Completed',
  },
  {
    id: 3,
    orderNumber: '#ORD-2024-003',
    date: 'Jan 13, 2024',
    items: ['1x Caesar Salad', '1x Orange Juice'],
    location: 'Main Cafeteria',
    total: '9.99',
    status: 'Cancelled',
  },
];

export default function HistoryScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Order History</Text>
      </View>

      <View style={styles.historyContainer}>
        {orderHistory.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                <View style={styles.dateContainer}>
                  <Calendar size={14} color="#7C7C7C" />
                  <Text style={styles.dateText}>{order.date}</Text>
                </View>
              </View>
              <View style={[
                styles.statusBadge,
                order.status === 'Cancelled' && styles.statusBadgeCancelled
              ]}>
                <Text style={[
                  styles.statusText,
                  order.status === 'Cancelled' && styles.statusTextCancelled
                ]}>{order.status}</Text>
              </View>
            </View>

            <View style={styles.orderItems}>
              {order.items.map((item, index) => (
                <Text key={index} style={styles.itemText}>{item}</Text>
              ))}
            </View>

            <View style={styles.locationContainer}>
              <MapPin size={16} color="#7C7C7C" />
              <Text style={styles.locationText}>{order.location}</Text>
            </View>

            <View style={styles.orderFooter}>
              <Text style={styles.totalLabel}>Total Paid:</Text>
              <Text style={styles.totalAmount}>${order.total}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#2D2D2D',
  },
  historyContainer: {
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#7C7C7C',
    marginLeft: 4,
  },
  statusBadge: {
    backgroundColor: '#E7FFE9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeCancelled: {
    backgroundColor: '#FFE7E7',
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#4CAF50',
  },
  statusTextCancelled: {
    color: '#FF3A3A',
  },
  orderItems: {
    marginBottom: 12,
  },
  itemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#7C7C7C',
    marginLeft: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: 12,
  },
  totalLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#7C7C7C',
  },
  totalAmount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#2D2D2D',
  },
});