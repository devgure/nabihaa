// mobile/src/screens/SubscriptionScreen.tsx
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { api } from '../services/api';

export default function SubscriptionScreen() {
  const subscribe = async (plan: 'premium' | 'vip') => {
    const { url } = await api.post('/payments/checkout', { plan });
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <View>
      <Button title="Go Premium ($9.99)" onPress={() => subscribe('premium')} />
      <Button title="VIP ($19.99)" onPress={() => subscribe('vip')} />
    </View>
  );
}