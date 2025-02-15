const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Seed Roles (already defined in the schema as an enum, no need to seed)

  // Seed Users
  const userEmails = [
    'john.doe@example.com',
    'jane.smith@example.com',
    'alice.johnson@example.com',
    'admin@example.com',
    'bob.brown@example.com',
    'charlie.white@example.com'
  ];

  const userNames = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Admin User',
    'Bob Brown',
    'Charlie White'
  ];

  const userRoles = [
    'CUSTOMER',
    'DELIVERYMAN',
    'RESTAURANT_OWNER',
    'ADMIN',
    'CUSTOMER',
    'CUSTOMER'
  ];

  for (let i = 0; i < userEmails.length; i++) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmails[i] },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          name: userNames[i],
          email: userEmails[i],
          password: await bcrypt.hash('password123', 10),
          role: userRoles[i],
        },
      });
    } else {
      console.log(`User with email ${userEmails[i]} already exists.`);
    }
  }

  // Seed Deliverymen
  const deliverymen = [
    { vehicleType: 'Motorcycle', userEmail: 'jane.smith@example.com' },
    { vehicleType: 'Bicycle', userEmail: 'bob.brown@example.com' },
    { vehicleType: 'Car', userEmail: 'charlie.white@example.com' },
    { vehicleType: 'Scooter', userEmail: 'john.doe@example.com' },
    { vehicleType: 'Truck', userEmail: 'admin@example.com' }
  ];

  for (const deliveryman of deliverymen) {
    await prisma.deliveryman.create({
      data: {
        vehicleType: deliveryman.vehicleType,
        isAvailable: true,
        user: { connect: { email: deliveryman.userEmail } },
      },
    });
  }

  // Seed Restaurants and store their IDs
  const restaurantIds = {};
  const restaurants = [
    { name: 'Pizza Palace', cuisineType: 'Italian', location: '40.7128,-74.0060', userEmail: 'alice.johnson@example.com' },
    { name: 'Sushi World', cuisineType: 'Japanese', location: '35.6895,139.6917', userEmail: 'john.doe@example.com' },
    { name: 'Taco Town', cuisineType: 'Mexican', location: '19.4326,-99.1332', userEmail: 'jane.smith@example.com' },
    { name: 'Burger Haven', cuisineType: 'American', location: '34.0522,-118.2437', userEmail: 'bob.brown@example.com' },
    { name: 'Curry House', cuisineType: 'Indian', location: '28.6139,77.2090', userEmail: 'charlie.white@example.com' }
  ];

  for (const restaurant of restaurants) {
    const createdRestaurant = await prisma.restaurant.create({
      data: {
        name: restaurant.name,
        cuisineType: restaurant.cuisineType,
        location: restaurant.location,
        user: { connect: { email: restaurant.userEmail } },
      },
    });
    restaurantIds[restaurant.name] = createdRestaurant.id; // Store the restaurant ID
  }

  // Seed Categories and store their IDs
  const categoryIds = {};
  const categories = [
    { name: 'Italian' },
    { name: 'Japanese' },
    { name: 'Mexican' },
    { name: 'American' },
    { name: 'Indian' }
  ];

  for (const category of categories) {
    const createdCategory = await prisma.category.create({
      data: {
        name: category.name,
      },
    });
    categoryIds[category.name] = createdCategory.id; // Store the category ID
  }

  // Seed Category-Restaurant Relationships
  const categoryRestaurants = [
    { categoryName: 'Italian', restaurantName: 'Pizza Palace' },
    { categoryName: 'Japanese', restaurantName: 'Sushi World' },
    { categoryName: 'Mexican', restaurantName: 'Taco Town' },
    { categoryName: 'American', restaurantName: 'Burger Haven' },
    { categoryName: 'Indian', restaurantName: 'Curry House' }
  ];

  for (const cr of categoryRestaurants) {
    const category = await prisma.category.findUnique({
      where: { id: categoryIds[cr.categoryName] },
    });
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantIds[cr.restaurantName] },
    });

    await prisma.categoryRestaurant.create({
      data: {
        category: { connect: { id: category.id } },
        restaurant: { connect: { id: restaurant.id } },
      },
    });
  }

  // Seed Menus using the stored restaurant IDs
  const menuItems = [
    { name: 'Main Menu', description: 'The main menu featuring our best dishes.', price: 10.99, restaurantId: restaurantIds['Pizza Palace'] },
    { name: 'Sushi Menu', description: 'Fresh sushi and sashimi.', price: 15.99, restaurantId: restaurantIds['Sushi World'] },
    { name: 'Taco Menu', description: 'Delicious tacos with various fillings.', price: 8.99, restaurantId: restaurantIds['Taco Town'] },
    { name: 'Burger Menu', description: 'Juicy burgers with fries.', price: 12.99, restaurantId: restaurantIds['Burger Haven'] },
    { name: 'Curry Menu', description: 'Spicy curries and rice.', price: 9.99, restaurantId: restaurantIds['Curry House'] }
  ];

  for (const menuItem of menuItems) {
    await prisma.menu.create({
      data: {
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        imageUrl: 'menu.jpg', // Add an image URL if available
        restaurantId: menuItem.restaurantId, // Use the stored restaurant ID
      },
    });
  }

  // Seed Orders
  const orders = [
    { userEmail: 'john.doe@example.com', restaurantId: restaurantIds['Pizza Palace'], totalAmount: 10.99 },
    { userEmail: 'jane.smith@example.com', restaurantId: restaurantIds['Sushi World'], totalAmount: 15.99 },
    { userEmail: 'alice.johnson@example.com', restaurantId: restaurantIds['Taco Town'], totalAmount: 8.99 },
    { userEmail: 'bob.brown@example.com', restaurantId: restaurantIds['Burger Haven'], totalAmount: 12.99 },
    { userEmail: 'charlie.white@example.com', restaurantId: restaurantIds['Curry House'], totalAmount: 9.99 }
  ];

  for (const order of orders) {
    const user = await prisma.user.findUnique({ where: { email: order.userEmail } });

    await prisma.order.create({
      data: {
        userId: user.id,
        restaurantId: order.restaurantId,
        status: 'Pending',
        totalAmount: order.totalAmount,
        orderItems: {
          create: {
            quantity: 1,
            price: order.totalAmount,
          },
        },
      },
    });
  }

  // Seed Payments
  const payments = [
    { orderId: 1, amount: 10.99, paymentMethod: 'Credit Card', status: 'Completed' },
    { orderId: 2, amount: 15.99, paymentMethod: 'Debit Card', status: 'Completed' },
    { orderId: 3, amount: 8.99, paymentMethod: 'PayPal', status: 'Completed' },
    { orderId: 4, amount: 12.99, paymentMethod: 'Credit Card', status: 'Completed' },
    { orderId: 5, amount: 9.99, paymentMethod: 'Cash', status: 'Completed' }
  ];

  for (const payment of payments) {
    await prisma.payment.create({
      data: {
        orderId: payment.orderId,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        status: payment.status,
      },
    });
  }

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

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });