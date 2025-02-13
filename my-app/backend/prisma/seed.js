const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function seed() {
  try {
    // Clean the database
    await prisma.orderHistory.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.rating.deleteMany();
    await prisma.chat.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.supplement.deleteMany();
    await prisma.categoryFood.deleteMany();
    await prisma.food.deleteMany();
    await prisma.menu.deleteMany();
    await prisma.categoryRestaurant.deleteMany();
    await prisma.category.deleteMany();
    await prisma.order.deleteMany();
    await prisma.restaurant.deleteMany();
    await prisma.deliveryman.deleteMany();
    await prisma.user.deleteMany();
    await prisma.admin.deleteMany();

    // Create admin users
    const hashedPassword = await bcrypt.hash('password123', 10);
    const admin1 = await prisma.admin.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword
      }
    });

    const admin2 = await prisma.admin.create({
      data: {
        name: 'Super Admin',
        email: 'superadmin@example.com',
        password: hashedPassword
      }
    });

    // Create food categories
    const categories = await prisma.category.createMany({
      data: [
        { name: 'Italian' },
        { name: 'Japanese' },
        { name: 'Mexican' },
        { name: 'Indian' },
        { name: 'Fast Food' }
      ]
    });

    const allCategories = await prisma.category.findMany();

    // Create multiple restaurant owners and their restaurants
    const restaurantOwners = [];
    const cuisineTypes = ['Italian', 'Japanese', 'Mexican', 'Indian', 'American'];
    const locations = [
      '48.8566,2.3522',  // Paris
      '40.7128,-74.0060', // New York
      '51.5074,-0.1278',  // London
      '35.6762,139.6503', // Tokyo
      '41.8781,-87.6298'  // Chicago
    ];

    for (let i = 0; i < 5; i++) {
      const owner = await prisma.user.create({
        data: {
          name: `Restaurant Owner ${i + 1}`,
          email: `owner${i + 1}@example.com`,
          password: hashedPassword,
          phone: `+1234567890${i}`,
          role: 'RESTAURANT_OWNER',
          restaurant: {
            create: {
              name: `Restaurant ${i + 1}`,
              cuisineType: cuisineTypes[i],
              location: locations[i],
              categories: {
                create: {
                  categoryId: allCategories[i].id
                }
              }
            }
          }
        },
        include: {
          restaurant: true
        }
      });
      restaurantOwners.push(owner);
    }

    // Create multiple customers
    const customers = [];
    for (let i = 0; i < 5; i++) {
      const customer = await prisma.user.create({
        data: {
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          password: hashedPassword,
          phone: `+1987654321${i}`,
          role: 'CUSTOMER',
          location: locations[i]
        }
      });
      customers.push(customer);
    }

    // Create multiple delivery persons
    const deliveryPersons = [];
    const vehicleTypes = ['Car', 'Motorcycle', 'Bicycle', 'Scooter', 'Van'];
    for (let i = 0; i < 5; i++) {
      const deliveryPerson = await prisma.user.create({
        data: {
          name: `Delivery Person ${i + 1}`,
          email: `delivery${i + 1}@example.com`,
          password: hashedPassword,
          phone: `+1567890123${i}`,
          role: 'DELIVERYMAN',
          location: locations[i],
          deliveryman: {
            create: {
              vehicleType: vehicleTypes[i],
              isAvailable: true
            }
          }
        },
        include: {
          deliveryman: true
        }
      });
      deliveryPersons.push(deliveryPerson);
    }

    // Create menus and foods for each restaurant
    for (const owner of restaurantOwners) {
      const menu = await prisma.menu.create({
        data: {
          name: `${owner.restaurant.name} Main Menu`,
          restaurantId: owner.restaurant.id,
          foods: {
            create: [
              {
                name: `Special Dish 1 - ${owner.restaurant.name}`,
                description: `Signature dish from ${owner.restaurant.name}`,
                price: 15.99,
                imageUrl: 'dish1.jpg',
                categories: {
                  create: {
                    categoryId: allCategories[0].id
                  }
                },
                supplements: {
                  create: [
                    {
                      name: 'Extra Topping 1',
                      price: 2.50
                    },
                    {
                      name: 'Special Sauce',
                      price: 1.50
                    }
                  ]
                }
              },
              {
                name: `Special Dish 2 - ${owner.restaurant.name}`,
                description: `Another specialty from ${owner.restaurant.name}`,
                price: 18.99,
                imageUrl: 'dish2.jpg',
                categories: {
                  create: {
                    categoryId: allCategories[1].id
                  }
                }
              }
            ]
          }
        }
      });

      // Create some orders for each restaurant
      for (let i = 0; i < 3; i++) {
        const order = await prisma.order.create({
          data: {
            userId: customers[Math.floor(Math.random() * customers.length)].id,
            restaurantId: owner.restaurant.id,
            deliverymanId: deliveryPersons[Math.floor(Math.random() * deliveryPersons.length)].deliveryman.id,
            status: ['Pending', 'Preparing', 'Delivered'][Math.floor(Math.random() * 3)],
            totalAmount: Math.floor(Math.random() * 100) + 20,
            history: {
              create: {
                status: 'Pending'
              }
            },
            payments: {
              create: {
                amount: Math.floor(Math.random() * 100) + 20,
                paymentMethod: ['Credit Card', 'Debit Card', 'Cash'][Math.floor(Math.random() * 3)],
                status: ['Pending', 'Completed'][Math.floor(Math.random() * 2)]
              }
            }
          }
        });

        // Create some chats for each order
        await prisma.chat.create({
          data: {
            orderId: order.id,
            userId: order.userId,
            deliverymanId: order.deliverymanId,
            message: `Chat message for order ${order.id}`,
            sender: 'user'
          }
        });

        // Create notifications
        await prisma.notification.create({
          data: {
            deliverymanId: order.deliverymanId,
            orderId: order.id,
            message: `New order notification for order ${order.id}`,
            isRead: false
          }
        });
      }

      // Create ratings for each restaurant
      for (const customer of customers) {
        await prisma.rating.create({
          data: {
            userId: customer.id,
            restaurantId: owner.restaurant.id,
            score: Math.floor(Math.random() * 5) + 1,
            comment: `Rating comment from ${customer.name}`
          }
        });
      }
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed(); 