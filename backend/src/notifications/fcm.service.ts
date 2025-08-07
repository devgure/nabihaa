// backend/src/notifications/fcm.service.ts
export class FcmService {
  async sendMatchNotification(fcmToken: string, name: string) {
    const message = {
      token: fcmToken,
      notification: {
        title: 'It’s a Match!',
        body: `You and ${name} liked each other!`,
      },
      data: { type: 'match', click_action: 'FLUTTER_NOTIFICATION_CLICK' },
    };
    try {
      await getMessaging().send(message);
    } catch (e) {
      console.error('FCM Error:', e);
    }
  }
}