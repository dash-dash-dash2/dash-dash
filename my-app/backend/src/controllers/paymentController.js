const { PrismaClient } = require("@prisma/client");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

// Create a new payment
const createPayment = async (req, res) => {
  const { orderId, amount, paymentMethod } = req.body;
  console.log("body", req.body)
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

    if (paymentMethod === "Credit Card") {
      // Create a PaymentIntent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Amount in cents
        currency: "usd",
        metadata: { paymentId: orderId }
      });

      console.log("payment intent", paymentIntent)

      return res.status(201).json({ clientSecret: paymentIntent.client_secret });
    }

    res.status(400).json({ error: "Invalid payment method" });
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({ error: "Failed to create payment", details: error.message });
  }
};


////////// confirm PAyment 
const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    // Retrieve the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Check if the payment was successful
    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ error: "Payment not successful" });
    }

    // Find the payment record in the database
    const payment = await prisma.payment.findFirst({
      where: { paymentIntentId: paymentIntentId },
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment record not found" });
    }

    const orderId = payment.orderId;

    // Update the payment status to "Completed"
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "Completed",
        updatedAt: new Date(),
      },
    });

    // Update the order status to "Confirmed"
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "Confirmed",
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: error.message });
  }
};




// Process cash payment (Payment in place)
const processCashPayment = async (req, res) => {
  const { orderId, amount } = req.body;
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

    // Store cash payment details in database
    const payment = await prisma.payment.create({
      data: {
        orderId: parseInt(orderId),
        amount: parseFloat(amount),
        paymentMethod: "Cash on Delivery",
        status: "Pending"
      }
    });

    res.status(201).json({ message: "Cash payment recorded", payment });
  } catch (error) {
    console.error("Cash payment error:", error);
    res.status(500).json({ error: "Failed to process cash payment", details: error.message });
  }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(paymentId) },
      include: { order: true }
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
      where: { order: { userId } },
      include: { order: true },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json(payments);
  } catch (error) {
    console.error("Payment history fetch error:", error);
    res.status(500).json({ error: "Failed to fetch payment history", details: error.message });
  }
};

// Process Stripe webhook
// const processStripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];

//   try {
//     const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

//     if (event.type === "payment_intent.succeeded") {
//       const paymentIntent = event.data.object;

//       // Update payment status in database
//       await prisma.payment.update({
//         where: { id: parseInt(paymentIntent.metadata.paymentId) },
//         data: { status: "Completed" }
//       });
//     }

//     res.json({ received: true });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     res.status(400).json({ error: error.message });
//   }
// };

module.exports = {
  createPayment,
  processCashPayment,
  getPaymentStatus,
  getPaymentHistory,
  confirmPayment
};
