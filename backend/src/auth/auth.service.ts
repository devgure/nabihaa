// backend/src/auth/auth.service.ts
import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async verifyFirebaseToken(idToken: string) {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    let user = await this.prisma.user.findUnique({ where: { email: decodedToken.email } });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          firebaseUid: decodedToken.uid,
          email: decodedToken.email,
          displayName: decodedToken.name || 'Anonymous',
          photos: { create: [] },
        },
      });
    }
    return {
      token: this.jwtService.sign({ userId: user.id }),
      user,
    };
  }
}