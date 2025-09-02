import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  phoneNumber: string;
  name:  string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (phoneNumber: string, password: string) => Promise<boolean>;
  register: (name: string, phoneNumber: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  sendOTP: (phoneNumber: string) => Promise<boolean>;
  verifyOTP: (phoneNumber: string, otp: string) => Promise<boolean>;
  resetPassword: (phoneNumber: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (phoneNumber: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (phoneNumber && password) {
        const mockUser = {
          id: '123',
          phoneNumber,
          name: 'User ' + phoneNumber.slice(-4),
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, phoneNumber: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (name && phoneNumber && password) {
        const mockUser = {
          id: '123',
          phoneNumber,
          name,
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async (phoneNumber: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual SMS service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would:
      // 1. Call your backend API
      // 2. Backend generates and stores OTP
      // 3. Backend sends SMS via service like Twilio
      // 4. Return success/failure
      
      console.log(`Mock OTP sent to ${phoneNumber}: 123456`);
      return !!phoneNumber;
    } catch (error) {
      console.error('Send OTP error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (phoneNumber: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would:
      // 1. Call your backend API with phone number and OTP
      // 2. Backend verifies OTP against stored value
      // 3. Return verification result
      
      // Mock: accept '123456' as valid OTP
      const isValid = otp === '123456';
      console.log(`OTP verification for ${phoneNumber}: ${isValid ? 'SUCCESS' : 'FAILED'}`);
      return isValid;
    } catch (error) {
      console.error('Verify OTP error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (phoneNumber: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual password reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would:
      // 1. Generate temporary password
      // 2. Update user's password in database
      // 3. Send temporary password via SMS
      
      console.log(`Mock temporary password sent to ${phoneNumber}`);
      return !!phoneNumber;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        sendOTP,
        verifyOTP,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};