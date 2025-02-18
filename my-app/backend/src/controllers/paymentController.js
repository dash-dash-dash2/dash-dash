import { PrismaClient } from '@prisma/client';
import stripe from 'stripe';

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

// Create a new payment
const createPayment = async (req, res) => {
  const { orderId, amount, paymentMethod } = req.body;
  const userId = req.user.id;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) }
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.userId !== userId) {
      return res.status(403).json({ error: "Not authorized to pay for this order" });
    }

    const payment = await prisma.payment.create({
      data: {
        orderId: parseInt(orderId),
        amount,
        paymentMethod,
        status: 'Pending'
      }
    });

    res.status(201).json(payment);
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({ error: "Failed to create payment", details: error.message });
  }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(paymentId) },
      include: {
        order: true
      }
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error("Payment status fetch error:", error);
    res.status(500).json({ error: "Failed to fetch payment status", details: error.message });
  }
};

// Get payment history
const getPaymentHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const payments = await prisma.payment.findMany({
      where: {
        order: {
          userId
        }
      },
      include: {
        order: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(payments);
  } catch (error) {
    console.error("Payment history fetch error:", error);
    res.status(500).json({ error: "Failed to fetch payment history", details: error.message });
  }
};

// Process Stripe webhook
const processStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripeClient.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      // Update payment status in database
      await prisma.payment.update({
        where: { id: parseInt(paymentIntent.metadata.paymentId) },
        data: { status: 'Completed' }
      });
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(400).json({ error: error.message });
  }
};

export {
  createPayment,
  getPaymentStatus,
  getPaymentHistory,
  processStripeWebhook
}; 