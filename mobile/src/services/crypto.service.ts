// services/crypto.service.ts
import nacl from 'tweetnacl';
import * as utf8 from 'utf8';

nacl.secretKey = null;

export const CryptoService = {
  generateKeyPair() {
    return nacl.box.keyPair();
  },

  encrypt(message: string, recipientPublicKey: Uint8Array, senderSecretKey: Uint8Array) {
    const nonce = nacl.randomBytes(24);
    const msgUint8 = new TextEncoder().encode(utf8.encode(message));
    const encrypted = nacl.box(msgUint8, nonce, recipientPublicKey, senderSecretKey);
    const encryptedMessage = new Uint8Array(nonce.length + encrypted.length);
    encryptedMessage.set(nonce);
    encryptedMessage.set(encrypted, nonce.length);
    return btoa(String.fromCharCode(...encryptedMessage));
  },

  decrypt(encryptedMessage: string, senderPublicKey: Uint8Array, recipientSecretKey: Uint8Array) {
    const encryptedData = Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0));
    const nonce = encryptedData.slice(0, 24);
    const message = encryptedData.slice(24);
    const decrypted = nacl.box.open(message, nonce, senderPublicKey, recipientSecretKey);
    if (!decrypted) throw new Error('Decryption failed');
    const decoded = new TextDecoder().decode(decrypted);
    return utf8.decode(decoded);
  },
};