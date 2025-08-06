import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SaleTimerProps {
  endTime: Date;
}

export const SaleTimer: React.FC<SaleTimerProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>BIG SALE</Text>
      </View>
      <View style={styles.timerContainer}>
        <Text style={styles.timerLabel}>Sales end in</Text>
        <Text style={styles.timerText}>
          {formatNumber(timeLeft.hours)}hrs {formatNumber(timeLeft.minutes)}Mins {formatNumber(timeLeft.seconds)}Secs
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  badge: {
    backgroundColor: '#FBBF24',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  timerContainer: {
    alignItems: 'flex-end',
  },
  timerLabel: {
    color: 'white',
    fontSize: 12,
    marginBottom: 4,
  },
  timerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
}); 