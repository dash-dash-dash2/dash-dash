import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  // Clean the database
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.deliveryman.deleteMany();
  await prisma.user.deleteMany();
  await prisma.supplement.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderHistory.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.notification.deleteMany();

  // Create Users with different roles
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const users = await Promise.all([
    // Customers
    ...Array.from({ length: 8 }, (_, i) => 
      prisma.user.create({
        data: {
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          password: hashedPassword,
          role: 'CUSTOMER',
          phone: `+12345678${i}`,
          address: `${i + 1} Customer St`
        }
      })
    ),
    // Restaurant Owners
    ...Array.from({ length: 8 }, (_, i) => 
      prisma.user.create({
        data: {
          name: `Owner ${i + 1}`,
          email: `owner${i + 1}@example.com`,
          password: hashedPassword,
          role: 'RESTAURANT_OWNER',
          phone: `+19876543${i}`,
          address: `${i + 1} Restaurant Ave`
        }
      })
    ),
    // Delivery People
    ...Array.from({ length: 8 }, (_, i) => 
      prisma.user.create({
        data: {
          name: `Driver ${i + 1}`,
          email: `driver${i + 1}@example.com`,
          password: hashedPassword,
          role: 'DELIVERYMAN',
          phone: `+11223344${i}`,
          address: `${i + 1} Delivery Rd`
        }
      })
    )
  ]);

  // Create Deliverymen
  const deliverymen = await Promise.all(users.slice(16, 24).map((user, index) => 
    prisma.deliveryman.create({
      data: {
        vehicleType: index % 2 === 0 ? 'Motorcycle' : 'Bicycle',
        isAvailable: true,
        userId: user.id
      }
    })
  ));

  // Create Restaurants
  const restaurants = await Promise.all(users.slice(8, 16).map((user, index) => 
    prisma.restaurant.create({
      data: {
        name: `${user.name}'s Restaurant`,
        cuisineType: index % 2 === 0 ? 'Italian' : 'Mexican',
        location: `${40 + index},${-74 + index}`,
        userId: user.id
      }
    })
  ));

  // Create Supplements
  const supplements = await Promise.all([
    'Extra Cheese',
    'Bacon',
    'Avocado',
    'Hot Sauce',
    'Garlic Sauce',
    'Onions',
    'Pickles',
    'Mushrooms'
  ].map(name => 
    prisma.supplement.create({
      data: {
        name,
        price: parseFloat((Math.random() * 2 + 1).toFixed(2)) // Ensure price is a float
      }
    })
  ));

  // Create Menu Items
  const menus = await Promise.all(restaurants.map(async (restaurant, index) => {
    const menuItems = [
      {
        name: `Dish ${index * 2 + 1}`,
        description: 'Delicious dish with fresh ingredients',
        price: parseFloat((Math.random() * 10 + 5).toFixed(2)), // Ensure price is a float
        restaurantId: restaurant.id,
      },
      {
        name: `Dish ${index * 2 + 2}`,
        description: 'Tasty dish with a unique flavor',
        price: parseFloat((Math.random() * 10 + 5).toFixed(2)), // Ensure price is a float
        restaurantId: restaurant.id,
      }
    ];

    // Create each menu item and connect supplements
    return Promise.all(menuItems.map((menuItem, itemIndex) => 
      prisma.menu.create({
        data: {
          ...menuItem,
          supplements: {
            connect: [{ id: supplements[itemIndex % supplements.length].id }]
          }
        }
      })
    ));
  }));

  // Create Orders with Order Items
  const orders = await Promise.all(users.slice(0, 8).map((user, index) => 
    prisma.order.create({
      data: {
        userId: user.id,
        restaurantId: restaurants[index % restaurants.length].id,
        status: 'PENDING',
        totalAmount: parseFloat((Math.random() * 20 + 10).toFixed(2)), // Ensure totalAmount is a float
        deliveryCost: 5.00,
        orderItems: {
          create: [
            {
              menuId: menus[index % menus.length][0].id, // Use the first menu item
              quantity: Math.floor(Math.random() * 3) + 1, // Random quantity between 1 and 3
              price: parseFloat((Math.random() * 10 + 5).toFixed(2)) // Ensure price is a float
            }
          ]
        }
      }
    })
  ));

  // Create Ratings
  const ratings = await Promise.all(orders.map(order => 
    prisma.rating.create({
      data: {
        userId: order.userId,
        restaurantId: order.restaurantId,
        score: Math.floor(Math.random() * 5) + 1, // Random score between 1 and 5
        comment: 'Great food and service!'
      }
    })
  ));

  // Create Payments
  const payments = await Promise.all(orders.map(order => 
    prisma.payment.create({
      data: {
        orderId: order.id,
        amount: parseFloat(order.totalAmount) + order.deliveryCost,
        paymentMethod: 'Credit Card',
        status: 'Completed'
      }
    })
  ));

  // Create Order Histories
  const orderHistories = await Promise.all(orders.map(order => 
    prisma.orderHistory.create({
      data: {
        orderId: order.id,
        status: order.status
      }
    })
  ));

  // Create Chats
  const chats = await Promise.all(orders.map(order => 
    prisma.chat.create({
      data: {
        orderId: order.id,
        userId: order.userId,
        message: 'Is my order ready?',
        sender: 'user'
      }
    })
  ));

  // Create Notifications
  const notifications = await Promise.all(deliverymen.map(deliveryman => 
    prisma.notification.create({
      data: {
        deliverymanId: deliveryman.id,
        orderId: orders[Math.floor(Math.random() * orders.length)].id,
        message: 'New order assigned',
        isRead: false
      }
    })
  ));

  console.log('Seed data created successfully');
  console.log({
    users,
    deliverymen,
    restaurants,
    supplements,
    menus,
    orders,
    ratings,
    payments,
    orderHistories,
    chats,
    notifications
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });