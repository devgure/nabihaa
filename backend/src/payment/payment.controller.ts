// backend/src/payment/payment.controller.ts
import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  // Create Checkout Session
  @Post('checkout')
  @UseGuards(JwtAuthGuard)
  async createCheckoutSession(@Req() req: Request) {
    const session = await this.paymentService.createCheckoutSession(
      req.user.userId,
      req.body.plan, // 'premium', 'vip'
    );
    return { url: session.url };
  }

  // Get current subscription
  @Get('subscription')
  @UseGuards(JwtAuthGuard)
  async getSubscription(@Req() req: Request) {
    return this.paymentService.getSubscription(req.user.userId);
  }

  // Webhook (Stripe → Backend)
  @Post('webhook')
  async handleWebhook(@Req() req: Request) {
    return this.paymentService.handleWebhook(req);
  }
}