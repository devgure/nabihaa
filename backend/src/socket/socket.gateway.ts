// backend/src/socket/socket.gateway.ts
import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('joinChat')
  handleJoin(client: Socket, matchId: string) {
    client.join(`match_${matchId}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { matchId: string; message: string }) {
    this.server.to(`match_${payload.matchId}`).emit('newMessage', payload);
  }
}