// services/auth.ts
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';
import axios from './api';

export const loginWithPhone = async (phone: string) => {
  const auth = getAuth();
  const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
  return confirmation; // OTP sent
};

export const verifyOtp = async (code: string, confirmation: any) => {
  const result = await confirmation.confirm(code);
  const idToken = await result.user.getIdToken();
  
  const { data } = await axios.post('/auth/verify-firebase', { idToken });
  await AsyncStorage.setItem('token', data.token);
};