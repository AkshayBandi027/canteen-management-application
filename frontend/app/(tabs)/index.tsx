import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { Search, Filter } from 'lucide-react-native';
import { useCart } from '@/lib/context/cart-context';


const menuItems = [
  {
    id: 1,
    name: 'Masala Dosa',
    price: 20,
    imageUrl: 'https://images.unsplash.com/photo-1630409346824-4f0e7b080087?w=500',
    category: 'Breakfast',
    available: true,
    quantity: 0,
  },
  {
    id: 2,
    name: 'Veg Thali',
    price: 20,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500',
    category: 'Lunch',
    available: true,
    quantity: 0,
  },
  {
    id: 3,
    name: 'Samosa',
    price: 20,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500',
    category: 'Snacks',
    available: true,
    quantity: 0,
  },
];

export default function MenuScreen() {
  // const [menuItems, setMenuItems] = useState<MenuItem[] | null>(null);
  const {addToCart, removeFromCart,cartItems} = useCart()

  const isAddedToCart = (itemId: number) =>  {
    return cartItems.find(menuItem => menuItem.id === itemId)
  }
  useEffect(() => {
    const fetchMenuItems = async () => {
      const response = await fetch(`http://localhost:3000/api/menu/all`)
      const menuItems = await response.json()

      console.log(menuItems)
    }
   // hardcode some data in database for now.
    // fetchMenuItems()
  },[])

  console.log(cartItems)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning!</Text>
        <Text style={styles.title}>What would you like to eat?</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#94A3B8" />
          <Text style={styles.searchPlaceholder}>Search for food items...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.menuContent}
        showsVerticalScrollIndicator={false}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.menuItemImage} />
            <View style={styles.menuItemInfo}>
              <View style={styles.menuItemHeader}>
                <Text style={styles.menuItemName}>{item.name}</Text>
              </View>
              <Text style={styles.menuItemCategory}>{item.category}</Text>
              <View style={styles.menuItemFooter}>
                <Text style={styles.menuItemPrice}>₹{item.price}</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => isAddedToCart(item.id) ? removeFromCart(item.id) : addToCart(item)}>
                  <Text style={styles.addButtonText}>{isAddedToCart(item.id) ? 'Remove' : 'Add'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
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
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginRight: 12,
    height: 50,
  },
  searchPlaceholder: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#94A3B8',
    marginLeft: 12,
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    maxHeight: 70,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#F1F5F9',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#64748B',
  },
  categoryTextActive: {
    color: '#fff',
  },
  menuContent: {
    padding: 20,
    paddingBottom: 100,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  menuItemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  menuItemName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#92400E',
    marginLeft: 4,
  },
  menuItemCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  menuItemPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#007AFF',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 14,
  },
});