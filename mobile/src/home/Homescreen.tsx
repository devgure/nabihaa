// home/HomeScreen.tsx
import TinderCard from 'react-tinder-card';

const HomeScreen = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get('/users/nearby').then(res => setUsers(res.data));
  }, []);

  const onSwipe = (dir: string, userId: string) => {
    if (dir === 'right') {
      api.post('/likes', { receiverId: userId, isSuperLike: false });
    }
  };

  return (
    <View>
      {users.map(user => (
        <TinderCard onSwipe={(dir) => onSwipe(dir, user.id)} key={user.id}>
          <Image source={{ uri: user.photos[0]?.url }} style={styles.card} />
          <Text>{user.displayName}, {user.age}</Text>
        </TinderCard>
      ))}
    </View>
  );
};