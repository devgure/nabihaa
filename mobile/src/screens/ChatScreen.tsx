// ChatScreen.tsx
const sendMessage = async (text: string) => {
  const { publicKey, secretKey } = await getKeys(); // Stored in SecureStore (Expo)
  const recipientPubKey = decodeBase64(match.user.publicKey); // From server

  const encryptedText = CryptoService.encrypt(text, recipientPubKey, secretKey);

  socket.emit('sendMessage', {
    matchId: match.id,
    encryptedText,
    senderPublicKey: btoa(String.fromCharCode(...publicKey)),
  });
};