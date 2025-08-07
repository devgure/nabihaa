// backend/src/payment/payment.service.ts
import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createCheckoutSession(userId: string, plan: string) {
    const priceIds = {
      premium: process.env.STRIPE_PREMIUM_PRICE_ID,
      vip: process.env.STRIPE_VIP_PRICE_ID,
    };

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceIds[plan],
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      customer_email: (await this.prisma.user.findUnique({ where: { id: userId } }))?.email,
      metadata: { userId, plan },
    });

    return session;
  }

  async handleWebhook(request: any) {
    const sig = request.headers['stripe-signature'];
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      throw new Error(`Webhook signature verification failed: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, plan } = session.metadata;
      await this.prisma.subscription.upsert({
        where: { userId },
        update: {
          plan: plan === 'vip' ? 'VIP' : 'PREMIUM',
          subscriptionId: session.subscription as string,
          currentPeriodEnd: new Date((session.subscription as any).current_period_end * 1000),
          isActive: true,
        },
        create: {
          userId,
          plan: plan === 'vip' ? 'VIP' : 'PREMIUM',
          subscriptionId: session.subscription as string,
          currentPeriodEnd: new Date((session.subscription as any).current_period_end * 1000),
        },
      });
    }

    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as Stripe.Subscription;
      await this.prisma.subscription.updateMany({
        where: { subscriptionId: sub.id },
        data: { isActive: false },
      });
    }

    return { received: true };
  }
}