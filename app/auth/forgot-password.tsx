import { OTPVerification } from '@/components/auth/OTPVerification';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  
  const { sendOTP, verifyOTP, resetPassword, isLoading } = useAuth();

  const formatPhoneNumber = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 5) {
      return digits;
    }
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  };

  const validatePhoneNumber = () => {
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    if (!phoneNumber) {
      setPhoneError('Phone number is required');
      return false;
    } else if (cleanedPhone.length !== 11 || !cleanedPhone.startsWith('01')) {
      setPhoneError('Enter a valid Bangladesh phone number (11 digits starting with 01)');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSendOTP = async () => {
    if (validatePhoneNumber()) {
      const cleanedPhone = phoneNumber.replace(/\D/g, '');
      const success = await sendOTP(cleanedPhone);
      if (success) {
        setStep('otp');
      } else {
        Alert.alert('Error', 'Failed to send reset code. Please try again.');
      }
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    const otpValid = await verifyOTP(cleanedPhone, otp);
    if (otpValid) {
      const success = await resetPassword(cleanedPhone);
      if (success) {
        setStep('success');
        return true;
      } else {
        Alert.alert('Error', 'Failed to reset password. Please try again.');
        return false;
      }
    }
    return false;
  };

  const handleResendOTP = async () => {
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    return await sendOTP(cleanedPhone);
  };

  const navigateToLogin = () => {
    router.push('/auth/login');
  };

  const handlePhoneNumberChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const handleBackFromOTP = () => {
    setStep('phone');
  };

  if (step === 'otp') {
    return (
      <PageWrapper
        title="Verify Phone"
        leftIcon="back"
        rightIcons={[]}
        showBottomNav={false}
      >
        <OTPVerification
          phoneNumber={phoneNumber.replace(/\D/g, '')}
          onVerifyOTP={handleVerifyOTP}
          onResendOTP={handleResendOTP}
          onBack={handleBackFromOTP}
        />
      </PageWrapper>
    );
  }

  if (step === 'success') {
    return (
      <PageWrapper
        title="Password Reset"
        leftIcon="back"
        rightIcons={[]}
        showBottomNav={false}
      >
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={80} color={Colors.product.accentPink} style={styles.successIcon} />
          <Text style={styles.successTitle}>Password Reset Sent</Text>
          <Text style={styles.successMessage}>
            A temporary password has been sent to your phone number. Please check your messages and use it to log in.
          </Text>
          <TouchableOpacity style={styles.backToLoginButton} onPress={navigateToLogin}>
            <Text style={styles.backToLoginText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title="Forgot Password"
      leftIcon="back"
      rightIcons={[]}
      showBottomNav={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Forgot Password</Text>
              <Text style={styles.headerSubtitle}>
                Enter your phone number and we will send you a verification code to reset your password
              </Text>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={[styles.inputWrapper, phoneError ? styles.inputError : null]}>
                  <Ionicons name="call-outline" size={20} color={Colors.product.lightGrey} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="01XXX-XXXXXX"
                    placeholderTextColor={Colors.product.lightGrey}
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    keyboardType="phone-pad"
                    maxLength={12}
                  />
                </View>
                {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
              </View>
              
              <TouchableOpacity 
                style={styles.submitButton} 
                onPress={handleSendOTP}
                disabled={isLoading}
              >
                <Text style={styles.submitButtonText}>
                  {isLoading ? 'Sending...' : 'Send Reset Code'}
                </Text>
              </TouchableOpacity>
              
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Remember your password? </Text>
                <TouchableOpacity onPress={navigateToLogin}>
                  <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.product.background,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.product.text,
    marginBottom: 16,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.product.lightGrey,
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.product.text,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.product.darkGrey,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: Colors.product.text,
    fontSize: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: Colors.product.accentPink,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButtonText: {
    color: Colors.product.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    color: Colors.product.lightGrey,
    fontSize: 14,
  },
  loginLink: {
    color: Colors.product.accentPink,
    fontSize: 14,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.product.text,
    marginBottom: 16,
  },
  successMessage: {
    fontSize: 16,
    color: Colors.product.lightGrey,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  backToLoginButton: {
    backgroundColor: Colors.product.accentPink,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  backToLoginText: {
    color: Colors.product.white,
    fontSize: 16,
    fontWeight: '600',
  },
});