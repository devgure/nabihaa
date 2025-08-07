// mobile/src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import TinderCard from 'react-tinder-card';
import api from '../services/api';

export default function HomeScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users/nearby').then(res => setUsers(res.data));
  }, []);

  const swiped = (dir, userId) => {
    if (dir === 'right') {
      api.post('/likes', { receiverId: userId });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {users.length === 0 ? (
        <Text>No users nearby</Text>
      ) : (
        users.map(user => (
          <TinderCard key={user.id} onSwipe={(dir) => swiped(dir, user.id)}>
            <Image source={{ uri: user.photos[0]?.url }} style={{ width: '100%', height: '80%' }} />
            <Text>{user.displayName}, {user.age}</Text>
          </TinderCard>
        ))
      )}
    </View>
  );
}