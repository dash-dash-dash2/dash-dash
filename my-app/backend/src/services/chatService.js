const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// class ChatService {
//   // Store chat message in Redis and Database
//   async saveMessage(orderId, userId, message, sender) {
//     const chatMessage = {
//       orderId,
//       userId,
//       message,
//       sender,
//       timestamp: Date.now()
//     };

//     try {
//       // Save to Redis for quick retrieval
//       // await redis.lpush(`chat:${orderId}`, JSON.stringify(chatMessage));
      
//       // Save to Database for persistence
//       const savedMessage = await prisma.chat.create({
//         data: {
//           orderId: parseInt(orderId),
//           userId,
//           message,
//           sender
//         },
//         include: {
//           user: {
//             select: {
//               name: true
//             }
//           }
//         }
//       });

//       return savedMessage;
//     } catch (error) {
//       console.error('Error saving chat message:', error);
//       throw error;
//     }
//   }

//   // Get recent chat messages from Redis
//   async getRecentMessages(orderId, limit = 50) {
//     try {
//       const messages = await redis.lrange(`chat:${orderId}`, 0, limit - 1);
//       return messages.map(msg => JSON.parse(msg));
//     } catch (error) {
//       console.error('Error getting recent messages:', error);
//       throw error;
//     }
//   }

//   // Store delivery location
//   async updateDeliveryLocation(deliverymanId, orderId, location) {
//     try {
//       const locationData = {
//         deliverymanId,
//         orderId,
//         location,
//         timestamp: Date.now()
//       };

//       await redis.set(
//         `location:${deliverymanId}:${orderId}`, 
//         JSON.stringify(locationData),
//         'EX',
//         300 // expire in 5 minutes
//       );

//       return locationData;
//     } catch (error) {
//       console.error('Error updating location:', error);
//       throw error;
//     }
//   }

//   // Get delivery location
//   async getDeliveryLocation(deliverymanId, orderId) {
//     try {
//       const location = await redis.get(`location:${deliverymanId}:${orderId}`);
//       return location ? JSON.parse(location) : null;
//     } catch (error) {
//       console.error('Error getting location:', error);
//       throw error;
//     }
//   }
// }

// module.exports = new ChatService(); 