interface OrderItem {
  id: number;
  menuId: number;
  quantity: number;
  price: number;
  menu: {
    name: string;
    description: string;
    imageUrl: string;
  };
}

interface Order {
  id: number;
  status: string;
  totalAmount: number;
  deliveryCost: number;
  orderItems: OrderItem[];
  restaurant: {
    name: string;
    location: string;
  };
  deliveryman?: {
    user: {
      name: string;
      phone: string;
    };
  };
}

const OrderDetails = ({ order }: { order: Order }) => {
  return (
    <div className="order-details">
      <h2>Order #{order.id}</h2>
      <p>Status: {order.status}</p>
      <p>Restaurant: {order.restaurant.name}</p>
      
      <div className="order-items">
        <h3>Items</h3>
        {order.orderItems.map(item => (
          <div key={item.id} className="order-item">
            <img src={item.menu.imageUrl} alt={item.menu.name} />
            <div>
              <h4>{item.menu.name}</h4>
              <p>{item.menu.description}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="order-summary">
        <p>Subtotal: ${order.totalAmount}</p>
        <p>Delivery: ${order.deliveryCost}</p>
        <p>Total: ${order.totalAmount + order.deliveryCost}</p>
      </div>
      
      {order.deliveryman && (
        <div className="delivery-info">
          <h3>Delivery Information</h3>
          <p>Driver: {order.deliveryman.user.name}</p>
          <p>Contact: {order.deliveryman.user.phone}</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetails; 