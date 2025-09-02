import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { Colors } from '@/constants/Colors';

// Types
type OrderStatus = 'all' | 'on_delivery' | 'completed' | 'canceled';

interface OrderItem {
  id: string;
  title: string;
  variant: string;
  quantity: number;
  price: string; // already formatted as currency like $47.6
  image: { uri: string };
  status: Exclude<OrderStatus, 'all'>;
  note: string; // e.g. courier / received by / canceled reason
}

// Mock data
const ORDERS: OrderItem[] = [
  {
    id: '#12451245',
    title: 'Brown Women Shirts by Coklat Cloth',
    variant: 'GREY Variant',
    quantity: 1,
    price: '$47.6',
    image: { uri: 'https://images.unsplash.com/photo-1604695573706-53730d51e7ec?auto=format&fit=crop&w=120&q=60' },
    status: 'completed',
    note: 'Order Received by [Louis Simatupang]'
  },
  {
    id: '#12451245',
    title: 'Women Sleep Suits by Femall Clothings',
    variant: 'GREY Variant',
    quantity: 2,
    price: '$47.6',
    image: { uri: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=120&q=60' },
    status: 'canceled',
    note: 'Reach on payment due date'
  },
  {
    id: '#12451245',
    title: 'Red Candy Handy Bag with Random Accessories',
    variant: 'GREY Variant',
    quantity: 1,
    price: '$50.6',
    image: { uri: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=120&q=60' },
    status: 'on_delivery',
    note: 'On the way by Courir [H. Stefanus]'
  },
  {
    id: '#12451245',
    title: 'Women Sleep Suits by Femall Clothings',
    variant: 'GREY Variant',
    quantity: 1,
    price: '$47.6',
    image: { uri: 'https://images.unsplash.com/photo-1520975922284-51f2ff6a32a1?auto=format&fit=crop&w=120&q=60' },
    status: 'completed',
    note: 'Order Received by [Louis Simatupang]'
  },
];

// Small, reusable status badge
function StatusBadge({ status }: { status: Exclude<OrderStatus, 'all'> }) {
  const config = useMemo(() => {
    switch (status) {
      case 'completed':
        return { label: 'Completed', dot: '#2ECC71', bg: 'rgba(46, 204, 113, 0.15)', text: '#2ECC71' };
      case 'canceled':
        return { label: 'Canceled', dot: '#FF5A5F', bg: 'rgba(255, 90, 95, 0.15)', text: '#FF5A5F' };
      case 'on_delivery':
        return { label: 'On Delivery', dot: '#4D83FF', bg: 'rgba(77, 131, 255, 0.15)', text: '#4D83FF' };
    }
  }, [status]);

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}> 
      <View style={[styles.badgeDot, { backgroundColor: config.dot }]} />
      <Text style={[styles.badgeText, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

function OrderRow({ item }: { item: OrderItem }) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.rowContainer}>
      <View style={styles.rowLeft}>
        <Text style={styles.orderId}>{item.id}</Text>
        <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
        <Text style={styles.variant}>{item.variant}</Text>
        <View style={styles.rowStatusLine}>
          <StatusBadge status={item.status} />
          <Text style={styles.note} numberOfLines={2}>{item.note}</Text>
        </View>
      </View>
      <View style={styles.rowRight}>
        <Image source={item.image} style={styles.thumbnail} />
        <View style={styles.qtyPriceRow}>
          <Text style={styles.qtyText}>{item.quantity}x</Text>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Tabs({ active, onChange }: { active: OrderStatus; onChange: (v: OrderStatus) => void }) {
  const tabs: { key: OrderStatus; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'on_delivery', label: 'On Delivery' },
    { key: 'completed', label: 'Completed' },
    { key: 'canceled', label: 'Canceled' },
  ];

  return (
    <View style={styles.tabContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
        {tabs.map(t => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, active === t.key && styles.activeTab]}
            onPress={() => onChange(t.key)}
          >
            <Text style={[styles.tabText, active === t.key && styles.activeTabText]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default function OrdersPage() {
  const [active, setActive] = useState<OrderStatus>('all');

  const data = useMemo(() => {
    if (active === 'all') return ORDERS;
    return ORDERS.filter(o => o.status === active);
  }, [active]);

  return (
    <PageWrapper title="Orders" leftIcon="back" rightIcons={["search"]} showBottomNav={false}>
      <View style={styles.container}>
        <Tabs active={active} onChange={setActive} />
        <FlatList
          data={data}
          keyExtractor={(it, idx) => `${it.id}-${idx}`}
          renderItem={({ item }) => <OrderRow item={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.product.background,
  },
  listContent: {
    paddingBottom: 24,
  },
  // Tabs
  tabContainer: {
    backgroundColor: Colors.product.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.product.borderLightWhite,
  },
  tabsRow: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.product.accentPink,
  },
  tabText: {
    fontSize: 16,
    color: Colors.product.lightGrey,
  },
  activeTabText: {
    color: Colors.product.accentPink,
    fontWeight: '600',
  },

  // Order row
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.product.background,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.product.borderLightWhite,
  },
  rowLeft: {
    flex: 1,
    paddingRight: 10,
  },
  orderId: {
    color: Colors.product.lightGrey,
    fontSize: 12,
    marginBottom: 6,
  },
  title: {
    color: Colors.product.white,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  variant: {
    color: Colors.product.lightGrey,
    fontSize: 12,
    marginBottom: 8,
  },
  rowStatusLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  note: {
    color: Colors.product.lightGrey,
    fontSize: 12,
    flex: 1,
  },
  rowRight: {
    width: 110,
    alignItems: 'flex-end',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginBottom: 8,
  },
  qtyPriceRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyText: {
    color: Colors.product.lightGrey,
    fontSize: 12,
  },
  priceText: {
    color: Colors.product.accentPink,
    fontSize: 16,
    fontWeight: '700',
  },

  // Badge styles
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
});