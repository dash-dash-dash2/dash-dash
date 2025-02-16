const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Seed Roles (already defined in the schema as an enum, no need to seed)

  // Seed Users with unique emails
  const users = await Promise.all([
    prisma.user.create({ data: { name: 'Alice', email: 'alice@example.com', password: 'password123', role: 'CUSTOMER' } }),
    prisma.user.create({ data: { name: 'Bob', email: 'bob@example.com', password: 'password123', role: 'CUSTOMER' } }),
    prisma.user.create({ data: { name: 'Charlie', email: 'charlie@example.com', password: 'password123', role: 'CUSTOMER' } }),
    prisma.user.create({ data: { name: 'David', email: 'david@example.com', password: 'password123', role: 'CUSTOMER' } }),
    prisma.user.create({ data: { name: 'Eve', email: 'eve@example.com', password: 'password123', role: 'CUSTOMER' } }),
    prisma.user.create({ data: { name: 'Frank', email: 'frank@example.com', password: 'password123', role: 'CUSTOMER' } }),
  ]);

  // Seed Deliverymen
  const deliverymen = await Promise.all([
    prisma.deliveryman.create({ data: { vehicleType: 'Bike', isAvailable: true, userId: users[0].id } }),
    prisma.deliveryman.create({ data: { vehicleType: 'Car', isAvailable: true, userId: users[1].id } }),
    prisma.deliveryman.create({ data: { vehicleType: 'Scooter', isAvailable: true, userId: users[2].id } }),
    prisma.deliveryman.create({ data: { vehicleType: 'Van', isAvailable: true, userId: users[3].id } }),
    prisma.deliveryman.create({ data: { vehicleType: 'Truck', isAvailable: true, userId: users[4].id } }),
    prisma.deliveryman.create({ data: { vehicleType: 'Bicycle', isAvailable: true, userId: users[5].id } }),
  ]);

  // Seed Restaurants
  const restaurants = await Promise.all([
    prisma.restaurant.create({ data: { name: 'Pizza Palace', cuisineType: 'Italian', location: '40.7128,-74.0060', userId: users[0].id } }),
    prisma.restaurant.create({ data: { name: 'Sushi World', cuisineType: 'Japanese', location: '35.6895,139.6917', userId: users[1].id } }),
    prisma.restaurant.create({ data: { name: 'Taco Town', cuisineType: 'Mexican', location: '19.4326,-99.1332', userId: users[2].id } }),
    prisma.restaurant.create({ data: { name: 'Burger Haven', cuisineType: 'American', location: '34.0522,-118.2437', userId: users[3].id } }),
    prisma.restaurant.create({ data: { name: 'Curry House', cuisineType: 'Indian', location: '28.6139,77.2090', userId: users[4].id } }),
    prisma.restaurant.create({ data: { name: 'Pasta Place', cuisineType: 'Italian', location: '41.9028,12.4964', userId: users[5].id } }),
  ]);

  // Seed Supplements
  const supplements = await Promise.all([
    prisma.supplement.create({ data: { name: 'Extra Cheese', price: 1.5 } }),
    prisma.supplement.create({ data: { name: 'Spicy Sauce', price: 0.5 } }),
    prisma.supplement.create({ data: { name: 'Garlic Bread', price: 2.0 } }),
    prisma.supplement.create({ data: { name: 'Avocado', price: 1.0 } }),
    prisma.supplement.create({ data: { name: 'Bacon', price: 1.5 } }),
    prisma.supplement.create({ data: { name: 'Mushrooms', price: 1.0 } }),
  ]);

  // Seed Menus and associate them with supplements
  const menus = await Promise.all([
    prisma.menu.create({
      data: {
        name: 'Main Menu',
        description: 'The main menu featuring our best dishes.',
        price: 10.99,
        restaurantId: restaurants[0].id,
        supplements: {
          connect: [{ id: supplements[0].id }, { id: supplements[1].id }], // Connect to Extra Cheese and Spicy Sauce
        },
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Sushi Menu',
        description: 'Fresh sushi and sashimi.',
        price: 15.99,
        restaurantId: restaurants[1].id,
        supplements: {
          connect: [{ id: supplements[2].id }, { id: supplements[3].id }], // Connect to Garlic Bread and Avocado
        },
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Taco Menu',
        description: 'Delicious tacos with various fillings.',
        price: 8.99,
        restaurantId: restaurants[2].id,
        supplements: {
          connect: [{ id: supplements[4].id }, { id: supplements[5].id }], // Connect to Bacon and Mushrooms
        },
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Burger Menu',
        description: 'Juicy burgers with fries.',
        price: 12.99,
        restaurantId: restaurants[3].id,
        supplements: {
          connect: [{ id: supplements[0].id }, { id: supplements[4].id }], // Connect to Extra Cheese and Bacon
        },
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Curry Menu',
        description: 'Spicy curries and rice.',
        price: 9.99,
        restaurantId: restaurants[4].id,
        supplements: {
          connect: [{ id: supplements[1].id }, { id: supplements[3].id }], // Connect to Spicy Sauce and Avocado
        },
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Pasta Menu',
        description: 'Delicious pasta dishes.',
        price: 11.99,
        restaurantId: restaurants[5].id,
        supplements: {
          connect: [{ id: supplements[2].id }, { id: supplements[5].id }], // Connect to Garlic Bread and Mushrooms
        },
      },
    }),
  ]);

  // Seed Orders with price, quantity, restaurantId, and userId
  const orders = await Promise.all([
    prisma.order.create({ data: { userId: users[0].id, restaurantId: restaurants[0].id, totalAmount: 22.98, price: 22.98, quantity: 2, menuId: 1, status: 'Pending' } }),
    prisma.order.create({ data: { userId: users[1].id, restaurantId: restaurants[1].id, totalAmount: 15.99, price: 15.99, quantity: 1, menuId: 2, status: 'Pending' } }),
    prisma.order.create({ data: { userId: users[2].id, restaurantId: restaurants[2].id, totalAmount: 26.97, price: 26.97, quantity: 3, menuId: 3, status: 'Pending' } }),
    prisma.order.create({ data: { userId: users[3].id, restaurantId: restaurants[3].id, totalAmount: 12.99, price: 12.99, quantity: 1, menuId: 4, status: 'Pending' } }),
    prisma.order.create({ data: { userId: users[4].id, restaurantId: restaurants[4].id, totalAmount: 19.98, price: 19.98, quantity: 2, menuId: 5, status: 'Pending' } }),
    prisma.order.create({ data: { userId: users[5].id, restaurantId: restaurants[5].id, totalAmount: 11.99, price: 11.99, quantity: 1, menuId: 6, status: 'Pending' } }),
  ]);

  // Seed Ratings
  const ratings = await Promise.all([
    prisma.rating.create({ data: { score: 5, comment: 'Best pizza ever!', userId: users[0].id, restaurantId: restaurants[0].id } }),
    prisma.rating.create({ data: { score: 4, comment: 'Great sushi, will come back!', userId: users[1].id, restaurantId: restaurants[1].id } }),
    prisma.rating.create({ data: { score: 3, comment: 'Tacos were okay.', userId: users[2].id, restaurantId: restaurants[2].id } }),
    prisma.rating.create({ data: { score: 5, comment: 'Amazing burgers!', userId: users[3].id, restaurantId: restaurants[3].id } }),
    prisma.rating.create({ data: { score: 4, comment: 'Delicious curry!', userId: users[4].id, restaurantId: restaurants[4].id } }),
    prisma.rating.create({ data: { score: 5, comment: 'Pasta was fantastic!', userId: users[5].id, restaurantId: restaurants[5].id } }),
  ]);

  // Seed Payments
  const payments = await Promise.all([
    prisma.payment.create({ data: { orderId: orders[0].id, amount: 22.98, paymentMethod: 'Credit Card', status: 'Completed' } }),
    prisma.payment.create({ data: { orderId: orders[1].id, amount: 15.99, paymentMethod: 'Debit Card', status: 'Completed' } }),
    prisma.payment.create({ data: { orderId: orders[2].id, amount: 26.97, paymentMethod: 'PayPal', status: 'Completed' } }),
    prisma.payment.create({ data: { orderId: orders[3].id, amount: 12.99, paymentMethod: 'Credit Card', status: 'Completed' } }),
    prisma.payment.create({ data: { orderId: orders[4].id, amount: 19.98, paymentMethod: 'Cash', status: 'Completed' } }),
    prisma.payment.create({ data: { orderId: orders[5].id, amount: 11.99, paymentMethod: 'Credit Card', status: 'Completed' } }),
  ]);

  // Seed Chats
  const chats = [
    { orderId: 1, userId: 1, message: 'When will my order arrive?', sender: 'user' },
    { orderId: 2, userId: 2, message: 'Is my sushi ready?', sender: 'user' },
    { orderId: 3, userId: 3, message: 'I need to change my order.', sender: 'user' },
    { orderId: 4, userId: 4, message: 'Can I get extra fries?', sender: 'user' },
    { orderId: 5, userId: 5, message: 'What time do you close?', sender: 'user' }
  ];

  for (const chat of chats) {
    await prisma.chat.create({
      data: {
        orderId: chat.orderId,
        userId: chat.userId,
        message: chat.message,
        sender: chat.sender,
      },
    });
  }

  // Seed Notifications
  const notifications = [
    { deliverymanId: 1, orderId: 1, message: 'New order assigned to you', isRead: false },
    { deliverymanId: 2, orderId: 2, message: 'New order assigned to you', isRead: false },
    { deliverymanId: 3, orderId: 3, message: 'New order assigned to you', isRead: false },
    { deliverymanId: 4, orderId: 4, message: 'New order assigned to you', isRead: false },
    { deliverymanId: 5, orderId: 5, message: 'New order assigned to you', isRead: false }
  ];

  for (const notification of notifications) {
    await prisma.notification.create({
      data: {
        deliverymanId: notification.deliverymanId,
        orderId: notification.orderId,
        message: notification.message,
        isRead: notification.isRead,
      },
    });
  }

  // Seed Order History
  const orderHistory1 = await prisma.orderHistory.create({
    data: {
      orderId: 1, // Assuming order ID 1 for this example
      status: 'Pending',
      updatedAt: new Date(),
    },
  });

  console.log('Seeding completed successfully!');
  console.log({ users, deliverymen, restaurants, menus, supplements, orders, ratings, payments });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });