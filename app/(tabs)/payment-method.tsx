import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type PaymentMethod = 'rocket' | 'upay' | 'nagad' | 'cash' | 'bkash' | 'card' | 'other';

const paymentMethods: { key: PaymentMethod; label: string; subtitle?: string; hasChildren?: boolean }[] = [
  { key: 'rocket', label: 'Rocket' },
  { key: 'upay', label: 'upay' },
  { key: 'nagad', label: 'Nagad' },
  { key: 'cash', label: 'Cash' },
  { key: 'bkash', label: 'bKash' },
  { key: 'card', label: 'Credit or debit card', hasChildren: true },
  { key: 'other', label: 'Other online payment methods', hasChildren: true },
];

export default function PaymentMethodScreen() {
  const [selected, setSelected] = useState<PaymentMethod>('cash');

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem('selectedPaymentMethod');
      if (saved) setSelected(saved as PaymentMethod);
    };
    load();
  }, []);

  const saveAndGoBack = async () => {
    await AsyncStorage.setItem('selectedPaymentMethod', selected);
    router.back();
  };

  const Row = ({ item }: { item: typeof paymentMethods[number] }) => (
    <TouchableOpacity style={styles.row} onPress={() => setSelected(item.key)}>
      <View style={styles.rowLeft}>
        {/* Placeholder icon box to mimic logos */}
        <View style={styles.logoBox} />
        <Text style={styles.rowLabel}>{item.label}</Text>
        {item.key === 'cash' && (
          <View style={styles.primaryBadge}>
            <Text style={styles.primaryBadgeText}>Primary</Text>
          </View>
        )}
      </View>
      <View style={styles.rowRight}>
        {item.hasChildren ? (
          <Ionicons name="chevron-forward" size={18} color={Colors.product.lightGrey} />
        ) : (
          <View style={[styles.radio, selected === item.key && styles.radioActive]} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <PageWrapper title="Select a payment method" leftIcon="back" rightIcons={[]} showBottomNav={false}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
          {paymentMethods.map((pm) => (
            <Row key={pm.key} item={pm} />
          ))}
        </ScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.confirmBtn} onPress={saveAndGoBack} activeOpacity={0.8}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.product.background,
  },
  row: {
    backgroundColor: Colors.product.bgWhite,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.product.darkGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: Colors.product.darkGrey,
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 16,
    color: Colors.product.text,
    flexShrink: 1,
  },
  rowRight: {
    marginLeft: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.product.lightGrey,
  },
  radioActive: {
    backgroundColor: Colors.product.text,
    borderColor: Colors.product.text,
  },
  primaryBadge: {
    backgroundColor: '#E6F0FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  primaryBadgeText: {
    color: '#1768D1',
    fontSize: 12,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.product.bgWhite,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.product.darkGrey,
  },
  confirmBtn: {
    backgroundColor: Colors.product.accentPink,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmText: {
    color: Colors.product.white,
    fontSize: 16,
    fontWeight: '600',
  },
});