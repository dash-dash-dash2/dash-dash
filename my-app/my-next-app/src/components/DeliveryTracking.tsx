"use client";  // Add this line at the top

import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useState, useEffect, useRef } from 'react';
import { socket } from '../utils/socket';

interface Location {
  lat: number;
  lng: number;
}

interface Order {
  id: string;
  orderItems: Array<{
    menu: {
      name: string;
      description: string;
      price: number;
    };
  }>;
  restaurant: {
    name: string;
    location: string;
  };
  user: {
    name: string;
    address: string;
  };
}

interface DeliveryTrackingProps {
  order: Order;
}

const DeliveryTracking = ({ order }: DeliveryTrackingProps) => {
  const [driverLocation, setDriverLocation] = useState<Location | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    // Join order-specific room
    socket.emit('joinOrderRoom', order.id);

    // Listen for location updates
    socket.on('locationUpdate', (data: { latitude: number; longitude: number }) => {
      setDriverLocation({
        lat: data.latitude,
        lng: data.longitude
      });
    });

    return () => {
      socket.off('locationUpdate');
      socket.emit('leaveOrderRoom', order.id);
    };
  }, [order.id]);

  useEffect(() => {
    if (driverLocation && window.google) {
      const directionsService = new google.maps.DirectionsService();
      const [restLat, restLng] = order.restaurant.location.split(',').map(Number);
      const [destLat, destLng] = order.user.address.split(',').map(Number);
      
      directionsService.route(
        {
          origin: { lat: driverLocation.lat, lng: driverLocation.lng },
          destination: { lat: destLat, lng: destLng },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
          }
        }
      );
    }
  }, [driverLocation, order]);

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = driverLocation || {
    lat: parseFloat(order.restaurant.location.split(',')[0]),
    lng: parseFloat(order.restaurant.location.split(',')[1])
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Delivery Tracking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Details Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          {order.orderItems[0] && (
            <div className="flex mb-4">
              <div className="ml-4">
                <h3 className="text-lg font-medium">{order.orderItems[0].menu.name}</h3>
                <p className="text-gray-600">{order.orderItems[0].menu.description}</p>
                <p className="text-yellow-600 font-medium mt-2">
                  ${order.orderItems[0].menu.price}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-gray-500 w-32">Restaurant:</span>
              <span className="font-medium">{order.restaurant.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 w-32">Customer:</span>
              <span className="font-medium">{order.user.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 w-32">Delivery Address:</span>
              <span className="font-medium">{order.user.address}</span>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Delivery Route</h2>
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={15}
              onLoad={map => {
                mapRef.current = map;
              }}
            >
              {driverLocation && <Marker position={driverLocation} icon="/driver-marker.png" />}
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;
