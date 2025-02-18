"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Store, ArrowRight } from 'lucide-react';

const CareersSection = () => {
  const router = useRouter();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Join Our Team</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Be part of our growing community. Choose your path and start earning with DishDash today.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Delivery Partner Card */}
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Become a Delivery Partner</h3>
              <p className="text-gray-600 mb-6">
                Enjoy flexible hours, competitive earnings, and be your own boss. Join our delivery team today.
              </p>
              <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
                <li>✓ Flexible working hours</li>
                <li>✓ Competitive pay per delivery</li>
                <li>✓ Weekly payments</li>
                <li>✓ Sign-up bonus</li>
              </ul>
              <Button 
                className="w-full"
                onClick={() => router.push('/careers/delivery')}
              >
                Apply Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Restaurant Owner Card */}
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Store className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Partner Your Restaurant</h3>
              <p className="text-gray-600 mb-6">
                Expand your business reach and increase your revenue by joining our platform.
              </p>
              <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
                <li>✓ Increased visibility</li>
                <li>✓ Access to new customers</li>
                <li>✓ Easy order management</li>
                <li>✓ Marketing support</li>
              </ul>
              <Button 
                className="w-full"
                onClick={() => router.push('/careers/restaurant')}
              >
                Partner With Us <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CareersSection; 