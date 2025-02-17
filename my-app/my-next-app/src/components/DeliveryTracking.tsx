"use client";  // Add this line at the top

import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useState, useEffect } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const DeliveryTracking = () => {
  const { user } = useAuth();
  const { activeOrder } = useOrders();
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);
console.log(activeOrder);
  useEffect(() => {
    if (activeOrder && window.google) {
      const directionsService = new google.maps.DirectionsService();
      
      directionsService.route({
        origin: new google.maps.LatLng(
          activeOrder.restaurant.latitude,
          activeOrder.restaurant.longitude
        ),
        destination: new google.maps.LatLng(
          activeOrder.deliveryLocation.lat,
          activeOrder.deliveryLocation.lng
        ),
        travelMode: google.maps.TravelMode.DRIVING
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        }
      });
    }
  }, [activeOrder, isMapsLoaded]);

  // if (!activeOrder) {
  //   return <div className="p-4">No active delivery</div>;
  // }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Delivery Tracking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Details Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="flex mb-4">
            <div className="ml-4">
              <h3 className="text-lg font-medium">{activeOrder.orderItems[0].menu.name}</h3>
              <p className="text-gray-600">{activeOrder.orderItems[0].menu.description}</p>
              <p className="text-yellow-600 font-medium mt-2">
                ${activeOrder.orderItems[0].menu.price}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-gray-500 w-32">Restaurant:</span>
              <span className="font-medium">{activeOrder.restaurant.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 w-32">Customer:</span>
              <span className="font-medium">{activeOrder.user.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 w-32">Delivery Address:</span>
              <span className="font-medium">{activeOrder.deliveryLocation.address}</span>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Delivery Route</h2>
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            onLoad={() => setIsMapsLoaded(true)}
          >
            
<GoogleMap
  mapContainerStyle={containerStyle}
  center={{
    lat: activeOrder.restaurant.latitude,
    lng: activeOrder.restaurant.longitude,
  }}
  zoom={12}
  onLoad={map => setMap(map)}
>
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    polylineOptions: {
                      strokeColor: '#ecc94b',
                      strokeWeight: 5
                    },
                    suppressMarkers: false
                  }}
                />
              )}

              {/* Restaurant Marker */}
              <Marker
                position={{
                  lat: activeOrder.restaurant.latitude,
                  lng: activeOrder.restaurant.longitude
                }}
                icon={{
                  url: '/restaurant-marker.png',
                  scaledSize: new window.google.maps.Size(40, 40)
                }}
              />

              {/* Delivery Location Marker */}
              <Marker
  position={{
    lat: activeOrder.user.address.latitude,
    lng: activeOrder.user.address.longitude,
  }}
  icon={{
    url: '/delivery-marker.png',
    scaledSize: new window.google.maps.Size(40, 40),
  }}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;
