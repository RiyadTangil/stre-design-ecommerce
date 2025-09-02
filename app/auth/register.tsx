import { OTPVerification } from '@/components/auth/OTPVerification';
import { PageWrapper } from '@/components/ui/PageWrapper';
import PhoneNumberInput from '@/components/ui/PhoneNumberInput';
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

export default function RegisterScreen() {
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ 
    name: '', 
    phoneNumber: '', 
    password: '', 
    confirmPassword: '' 
  });
  
  const { register, sendOTP, verifyOTP, isLoading } = useAuth();

  const formatPhoneNumber = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 5) {
      return digits;
    }
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { 
      name: '', 
      phoneNumber: '', 
      password: '', 
      confirmPassword: '' 
    };
    
    if (!name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
      valid = false;
    } else if (cleanedPhone.length !== 11 || !cleanedPhone.startsWith('01')) {
      newErrors.phoneNumber = 'Enter a valid Bangladesh phone number (11 digits starting with 01)';
      valid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSendOTP = async () => {
    if (validateForm()) {
      const cleanedPhone = phoneNumber.replace(/\D/g, '');
      const success = await sendOTP(cleanedPhone);
      if (success) {
        setStep('otp');
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    const otpValid = await verifyOTP(cleanedPhone, otp);
    if (otpValid) {
      const success = await register(name, cleanedPhone, password);
      if (success) {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace('/');
        }
        return true;
      } else {
        Alert.alert('Registration Failed', 'Could not create account. Please try again.');
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
    setStep('form');
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

  return (
    <PageWrapper
      title="Register"
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
              <Text style={styles.headerTitle}>Create Account</Text>
              <Text style={styles.headerSubtitle}>Sign up to start shopping</Text>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={[styles.inputWrapper, errors.name ? styles.inputError : null]}>
                  <Ionicons name="person-outline" size={20} color={Colors.product.lightGrey} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Your full name"
                    placeholderTextColor={Colors.product.lightGrey}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
              </View>
              
              {/* Phone Number */}
              <PhoneNumberInput
                label="Phone Number"
                value={phoneNumber}
                onChange={(formatted, raw) => setPhoneNumber(formatted)}
                error={errors.phoneNumber}
              />
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={[styles.inputWrapper, errors.password ? styles.inputError : null]}>
                  <Ionicons name="lock-closed-outline" size={20} color={Colors.product.lightGrey} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Create password"
                    placeholderTextColor={Colors.product.lightGrey}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={Colors.product.lightGrey}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={[styles.inputWrapper, errors.confirmPassword ? styles.inputError : null]}>
                  <Ionicons name="lock-closed-outline" size={20} color={Colors.product.lightGrey} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor={Colors.product.lightGrey}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons
                      name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={Colors.product.lightGrey}
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
              </View>
              
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By creating an account, you agree to our{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text>
                  {' '}and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>
              
              <TouchableOpacity 
                style={styles.registerButton} 
                onPress={handleSendOTP}
                disabled={isLoading}
              >
                <Text style={styles.registerButtonText}>
                  {isLoading ? 'Sending OTP...' : 'Send Verification Code'}
                </Text>
              </TouchableOpacity>
              
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
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
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.product.lightGrey,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
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
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  termsContainer: {
    marginBottom: 24,
  },
  termsText: {
    color: Colors.product.lightGrey,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  termsLink: {
    color: Colors.product.accentPink,
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: Colors.product.accentPink,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  registerButtonText: {
    color: Colors.product.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
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
});