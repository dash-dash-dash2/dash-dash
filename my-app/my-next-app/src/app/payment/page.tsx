"use client"; // Mark this component as a Client Component
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Navbar from "@/components/Navbar";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);


interface PaymentHistory {
  id: number;
  orderId: number;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}




const PaymentPage = ({
  searchParams,
}: {
  searchParams: { orderId: string; totalAmount: string };
}) => {
  // const { orderId, totalAmount } = searchParams  ; // Access query params

  const  orderId = 1 
  const  totalAmount = 250 

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);

  // Fetch payment history
  useEffect(() => {
    const fetchPaymentHistory = async () => {

      
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          "http://localhost:5000/api/payments/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPaymentHistory(response.data);
      } catch (err: any) {
        setError("Failed to fetch payment history");
      }
    };

    fetchPaymentHistory();
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch the PaymentIntent client secret from the backend
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        "http://localhost:5000/api/payments/create",
        {
          orderId: parseInt(orderId),
          amount: parseFloat(totalAmount),
          paymentMethod: "Credit Card", // Default payment method
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { clientSecret } = response.data;

      // Initialize Stripe
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: `http://localhost:3000/orders`, // Redirect after payment
        },
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex p-6 gap-6 items-start">
  {/* Payment History */}
  <div className="flex-1 max-w-xs">
    <h2 className="text-lg font-semibold">Payment History</h2>
    {paymentHistory.length === 0 ? (
      <p className="text-gray-500">No payment history found.</p>
    ) : (
      <ul className="list-none p-0">
        {paymentHistory.map((payment) => (
          <li
            key={payment.id}
            className="p-3 mb-3 bg-gray-100 rounded-lg shadow-sm"
          >
            <p><strong>Order ID:</strong> {payment.orderId}</p>
            <p><strong>Amount:</strong> ${payment.amount.toFixed(2)}</p>
            <p><strong>Method:</strong> {payment.paymentMethod}</p>
            <p><strong>Status:</strong> {payment.status}</p>
            <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    )}
  </div>

  {/* Payment Form */}
  <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg self-start">
    <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
      Complete Your Payment
    </h2>
    <p className="text-gray-600 mb-2">
      Order ID: <span className="font-medium">{orderId}</span>
    </p>
    <p className="text-gray-600 mb-6">
      Total Amount: <span className="font-medium">${totalAmount}</span>
    </p>

    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full py-3 px-6 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>

    {error && (
      <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
    )}
  </div>
</div>
    </>
  );
};

export default PaymentPage;
