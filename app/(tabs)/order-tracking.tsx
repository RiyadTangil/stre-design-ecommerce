import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { Colors } from '@/constants/Colors';

// Reusable: Timeline item type
type TimelineItem = {
  title: string;
  time: string;
  description?: string;
  active?: boolean;
  person?: { name: string; id: string };
  showCall?: boolean;
};

function PricePill() {
  return (
    <View style={styles.pricePill}>
      <Text style={styles.priceCurrent}>৳158.15</Text>
      <Text style={styles.priceOld}>৳200.10</Text>
    </View>
  );
}

function QuantityStepper() {
  return (
    <View style={styles.stepper}>
      <TouchableOpacity activeOpacity={0.8} style={styles.stepperBtn}>
        <Ionicons name="remove" size={16} color={Colors.product.white} />
      </TouchableOpacity>
      <Text style={styles.stepperValue}>1</Text>
      <TouchableOpacity activeOpacity={0.8} style={styles.stepperBtn}>
        <Ionicons name="add" size={16} color={Colors.product.white} />
      </TouchableOpacity>
    </View>
  );
}

function ProductSummaryCard() {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <View style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.productTitle}>Peter England Casual</Text>
          <Text style={styles.productSubtitle}>Summer Pure Cotton Tshirt</Text>
        </View>
      </View>

      <View style={styles.cardFooterRow}>
        <PricePill />
        <View style={{ flex: 1 }} />
        {/* <QuantityStepper /> */}
      </View>
    </View>
  );
}

function MapPreviewCard() {
  return (
    <View style={styles.card}>
      <View style={styles.mapHeader}>
        <View>
          <Text style={styles.mapTitle}>The Painted Ladies</Text>
          <TouchableOpacity>
            <Text style={styles.mapLink}>View larger map</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Map placeholder */}
      <View style={styles.mapBox}>
        <Ionicons name="location" size={22} color={Colors.product.accentPink} />
        <View style={styles.mapPlus}>
          <Ionicons name="add" size={20} color={Colors.product.white} />
        </View>
      </View>
    </View>
  );
}

function TimelineItemRow({ item, isLast }: { item: TimelineItem; isLast: boolean }) {
  return (
    <View style={styles.timelineRow}>
      <View style={styles.timelineLeft}>
        {/* Top spacer to align the dot */}
        <View style={styles.timelineDotWrapper}>
          <View
            style={[
              styles.timelineDot,
              item.active ? styles.timelineDotActive : styles.timelineDotInactive,
            ]}
          />
        </View>
        {!isLast && <View style={[styles.timelineLine, styles.timelineLineActive]} />}
      </View>

      <View style={styles.timelineContent}>
        <View style={styles.timelineTitleRow}>
          <Text style={[styles.timelineTitle, item.active && { color: Colors.product.accentPink }]}> {item.title} </Text>
        </View>
        <Text style={styles.timelineTime}>{item.time}</Text>
        {item.person && (
          <View style={styles.personRow}>
            <View style={styles.personInfoLeft}>
              <View style={styles.personAvatar} />
              <View>
                <Text style={styles.personName}>{item.person.name}</Text>
                <Text style={styles.personId}>{item.person.id}</Text>
              </View>
            </View>
            {item.showCall && (
              <TouchableOpacity style={styles.callBtn}>
                <Ionicons name="call-outline" size={18} color={Colors.product.accentPink} />
              </TouchableOpacity>
            )}
          </View>
        )}
        {!!item.description && <Text style={styles.timelineDesc}>{item.description}</Text>}
      </View>
    </View>
  );
}

export default function OrderTrackingPage() {
  const items: TimelineItem[] = [
    {
      title: 'On Delivery',
      time: 'Monday June 20th, 2020 12:25 AM',
      active: true,
    },
    {
      title: 'Thomas Djono',
      time: 'ID 01212401',
      person: { name: 'Thomas Djono', id: 'ID 01212401' },
      showCall: true,
    },
    {
      title: 'North Gateway',
      time: 'Monday June 20th, 2020 12:25 AM',
      description: 'Your order has been arrived at North Gateway, please wait next info',
    },
    {
      title: 'Order Created',
      time: 'Monday June 20th, 2020 12:25 AM',
    },
  ];

  return (
    <PageWrapper
      title="Tracking Orders"
      leftIcon="back"
      rightIcons={[]}
      showBottomNav={false}
    >
      <View style={styles.orderIdContainer}>
        <Text style={styles.orderIdText}>#0123456</Text>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ProductSummaryCard />
        <MapPreviewCard />

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeader}>Order Status</Text>
        </View>

        <View style={styles.timelineContainer}>
          {items.map((it, idx) => (
            <TimelineItemRow key={`${it.title}-${idx}`} item={it} isLast={idx === items.length - 1} />
          ))}
        </View>
      </ScrollView>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.product.background,
  },
  content: {
    paddingBottom: 48,
    paddingHorizontal: 16,
  },
  orderIdContainer: {
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 8,
  },
  orderIdText: {
    color: Colors.product.lightGrey,
    fontSize: 12,
  },

  // Product card
  card: {
    backgroundColor: Colors.product.bgWhite,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.product.darkGrey,
    marginRight: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.product.white,
  },
  productSubtitle: {
    fontSize: 12,
    color: Colors.product.lightGrey,
    marginTop: 2,
  },
  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pricePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.product.darkGrey,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  priceCurrent: {
    color: Colors.product.white,
    fontWeight: '700',
    marginRight: 8,
  },
  priceOld: {
    color: Colors.product.lightGrey,
    textDecorationLine: 'line-through',
    fontSize: 12,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepperBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.product.accentPink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: {
    color: Colors.product.white,
    fontWeight: '600',
    minWidth: 12,
    textAlign: 'center',
  },

  // Map card
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mapTitle: {
    color: Colors.product.white,
    fontSize: 14,
    fontWeight: '600',
  },
  mapLink: {
    color: Colors.product.accentPink,
    fontSize: 12,
    marginTop: 2,
  },
  mapBox: {
    height: 180,
    borderRadius: 12,
    backgroundColor: Colors.product.darkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlus: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.product.accentPink,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Section header
  sectionHeaderRow: {
    marginTop: 12,
    marginBottom: 8,
  },
  sectionHeader: {
    color: Colors.product.white,
    fontSize: 16,
    fontWeight: '600',
  },

  // Timeline
  timelineContainer: {
    backgroundColor: Colors.product.bgWhite,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  timelineRow: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  timelineLeft: {
    width: 18,
    alignItems: 'center',
  },
  timelineDotWrapper: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  timelineDotActive: {
    backgroundColor: Colors.product.accentPink,
  },
  timelineDotInactive: {
    borderWidth: 1,
    borderColor: Colors.product.accentPink,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    borderRadius: 1,
    marginTop: 2,
  },
  timelineLineActive: {
    backgroundColor: Colors.product.accentPink,
  },
  timelineLineInactive: {
    backgroundColor: Colors.product.darkGrey,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 8,
  },
  timelineTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timelineTitle: {
    color: Colors.product.white,
    fontSize: 14,
    fontWeight: '600',
  },
  timelineTime: {
    color: Colors.product.lightGrey,
    fontSize: 12,
    marginTop: 2,
  },
  timelineDesc: {
    color: Colors.product.white,
    fontSize: 12,
    marginTop: 8,
    lineHeight: 18,
  },
  callBtn: {
    padding: 6,
    borderRadius: 16,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 2,
    gap: 10,
    justifyContent: 'space-between',
  },
  personInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  personAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.product.darkGrey,
  },
  personName: {
    color: Colors.product.white,
    fontWeight: '600',
  },
  personId: {
    color: Colors.product.lightGrey,
    fontSize: 12,
  },
});