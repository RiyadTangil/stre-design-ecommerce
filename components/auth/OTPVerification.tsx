import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface OTPVerificationProps {
  phoneNumber: string;
  onVerifyOTP: (otp: string) => Promise<boolean>;
  onResendOTP: () => Promise<boolean>;
  otpLength?: number;
  timerDuration?: number;
  onBack?: () => void;
}

const { width } = Dimensions.get('window');
const isTablet = width > 768;

export const OTPVerification: React.FC<OTPVerificationProps> = ({
  phoneNumber,
  onVerifyOTP,
  onResendOTP,
  otpLength = 6,
  timerDuration = 60,
  onBack
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(otpLength).fill(''));
  const [timer, setTimer] = useState(timerDuration);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === otpLength) {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otpCode: string) => {
    setIsVerifying(true);
    try {
      const success = await onVerifyOTP(otpCode);
      if (!success) {
        // Clear OTP on failure
        setOtp(new Array(otpLength).fill(''));
        inputRefs.current[0]?.focus();
        Alert.alert('Invalid OTP', 'Please check the code and try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
      setOtp(new Array(otpLength).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    try {
      const success = await onResendOTP();
      if (success) {
        setTimer(timerDuration);
        setCanResend(false);
        setOtp(new Array(otpLength).fill(''));
        inputRefs.current[0]?.focus();
        Alert.alert('OTP Sent', 'A new verification code has been sent to your phone.');
      } else {
        Alert.alert('Error', 'Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPhoneNumber = (phone: string) => {
    // Format phone number for display (e.g., +1 (555) 123-4567)
    if (phone.length >= 10) {
      const cleaned = phone.replace(/\D/g, '');
      const match = cleaned.match(/^(\d{1,3})(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
      }
    }
    return phone;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={Colors.product.text} />
          </TouchableOpacity>
        )} */}
        <Text style={styles.headerTitle}>Verify Phone Number</Text>
        <Text style={styles.headerSubtitle}>
          Enter the 6-digit code sent to{' '}
          <Text style={styles.phoneNumber}>{formatPhoneNumber(phoneNumber)}</Text>
        </Text>
      </View>

      {/* OTP Input */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[
              styles.otpInput,
              digit ? styles.otpInputFilled : null,
              isTablet ? styles.otpInputTablet : null
            ]}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
            keyboardType="numeric"
            maxLength={1}
            selectTextOnFocus
            textAlign="center"
            editable={!isVerifying}
          />
        ))}
      </View>

      {/* Timer and Resend */}
      <View style={styles.timerContainer}>
        {!canResend ? (
          <Text style={styles.timerText}>
            Resend code in {formatTime(timer)}
          </Text>
        ) : (
          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendOTP}
            disabled={isResending}
          >
            <Text style={styles.resendButtonText}>
              {isResending ? 'Sending...' : 'Resend Code'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        style={[
          styles.verifyButton,
          (!otp.every(digit => digit !== '') || isVerifying) ? styles.verifyButtonDisabled : null
        ]}
        onPress={() => handleVerifyOTP(otp.join(''))}
        disabled={!otp.every(digit => digit !== '') || isVerifying}
      >
        <Text style={styles.verifyButtonText}>
          {isVerifying ? 'Verifying...' : 'Verify Code'}
        </Text>
      </TouchableOpacity>

      {/* Help Text */}
      <View style={styles.helpContainer}>
        <Text style={styles.helpText}>
          Did not receive the code? Check your phone or try resending.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.product.background,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.product.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.product.lightGrey,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  phoneNumber: {
    color: Colors.product.accentPink,
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: isTablet ? 60 : 45,
    height: isTablet ? 60 : 45,
    borderWidth: 2,
    borderColor: Colors.product.darkGrey,
    borderRadius: 12,
    backgroundColor: Colors.product.darkGrey,
    color: Colors.product.text,
    fontSize: isTablet ? 24 : 18,
    fontWeight: '600',
    marginHorizontal: isTablet ? 8 : 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  otpInputFilled: {
    borderColor: Colors.product.accentPink,
    backgroundColor: Colors.product.background,
  },
  otpInputTablet: {
    width: 70,
    height: 70,
    fontSize: 28,
    marginHorizontal: 10,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  timerText: {
    fontSize: 16,
    color: Colors.product.lightGrey,
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resendButtonText: {
    fontSize: 16,
    color: Colors.product.accentPink,
    fontWeight: '600',
  },
  verifyButton: {
    backgroundColor: Colors.product.accentPink,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: Colors.product.accentPink,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  verifyButtonDisabled: {
    backgroundColor: Colors.product.darkGrey,
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  verifyButtonText: {
    color: Colors.product.white,
    fontSize: 16,
    fontWeight: '600',
  },
  helpContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  helpText: {
    fontSize: 14,
    color: Colors.product.lightGrey,
    textAlign: 'center',
    lineHeight: 20,
  },
});