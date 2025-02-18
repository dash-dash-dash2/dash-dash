import React from 'react';
import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">DishDash</h3>
            <p className="text-gray-400">
              Bringing the best local restaurants directly to your doorstep. 
              Fast delivery, great food, amazing service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/home" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/restaurants" className="hover:text-primary transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>support@dishdash.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>123 Food Street, Kitchen City</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary"
              />
              <button className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>© 2024 DishDash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 