import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

interface Order {
  id: string;
  menuItem: {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
  restaurant: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  customer: {
    name: string;
    phone: string;
  };
  deliveryLocation: {
    lat: number;
    lng: number;
    address: string;
  };
}

const DriverOrderAcceptance: React.FC = () => {
  const { orders, acceptOrder } = useOrders();
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Orders are already fetched by OrderProvider
  }, []);

  const handleAcceptOrder = async (orderId: string) => {
    try {
      await acceptOrder(orderId);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const renderOrderList = () => {
    return orders.map(order => (
      <div 
        key={order.id} 
        onClick={() => setSelectedOrder(order)}
        className="order-card"
      >
        <img 
          src={getFullImageUrl(order.menuItem.imageUrl)} 
          alt={order.menuItem.name} 
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{order.menuItem.name}</h3>
          <p className="text-gray-600">Restaurant: {order.restaurant.name}</p>
          <p className="text-yellow-600 font-medium">${order.menuItem.price}</p>
        </div>
      </div>
    ));
  };

  const renderOrderDetails = () => {
    if (!selectedOrder) return null;

    return (
      <div className="order-details">
        <h2>Order Details</h2>
        
        {/* Order Item Details */}
        <div className="item-details">
          <img 
            src={selectedOrder.menuItem.imageUrl} 
            alt={selectedOrder.menuItem.name}
            style={{width: '200px', height: '200px'}}
          />
          <div>
            <h3>{selectedOrder.menuItem.name}</h3>
            <p>{selectedOrder.menuItem.description}</p>
            <p>Price: ${selectedOrder.menuItem.price}</p>
          </div>
        </div>

        {/* Restaurant Details */}
        <div className="restaurant-details">
          <h3>Restaurant: {selectedOrder.restaurant.name}</h3>
          <p>Address: {selectedOrder.restaurant.address}</p>
        </div>

        {/* Customer Details */}
        <div className="customer-details">
          <h3>Customer Details</h3>
          <p>Name: {selectedOrder.customer.name}</p>
          <p>Phone: {selectedOrder.customer.phone}</p>
        </div>

        {/* Map with Restaurant and Delivery Locations */}
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerStyle={{ height: '400px', width: '100%' }}
            zoom={12}
            center={{
              lat: (selectedOrder.restaurant.latitude + selectedOrder.deliveryLocation.lat) / 2,
              lng: (selectedOrder.restaurant.longitude + selectedOrder.deliveryLocation.lng) / 2
            }}
          >
            {/* Restaurant Marker */}
            <Marker
              position={{
                lat: selectedOrder.restaurant.latitude,
                lng: selectedOrder.restaurant.longitude
              }}
              title={selectedOrder.restaurant.name}
              icon={{
                url: '/restaurant-marker.png',
                scaledSize: new window.google.maps.Size(40, 40)
              }}
            />

            {/* Delivery Location Marker */}
            <Marker
              position={{
                lat: selectedOrder.deliveryLocation.lat,
                lng: selectedOrder.deliveryLocation.lng
              }}
              title="Delivery Location"
              icon={{
                url: '/delivery-marker.png',
                scaledSize: new window.google.maps.Size(40, 40)
              }}
            />
          </GoogleMap>
        </LoadScript>

        {/* Accept Order Button */}
        <button 
          onClick={() => handleAcceptOrder(selectedOrder.id)}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Accept Order
        </button>
      </div>
    );
  };

  return (
    <div className="driver-order-acceptance">
      <div className="order-list">
        <h2 className="text-2xl font-bold mb-4">Available Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders available</p>
        ) : (
          renderOrderList()
        )}
      </div>

      <div className="order-details-container">
        {renderOrderDetails()}
      </div>
    </div>
  );
};

export default DriverOrderAcceptance;
