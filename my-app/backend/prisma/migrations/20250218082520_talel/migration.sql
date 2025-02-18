-- DropForeignKey
ALTER TABLE `_menusupplements` DROP FOREIGN KEY `_MenuSupplements_A_fkey`;

-- DropForeignKey
ALTER TABLE `_menusupplements` DROP FOREIGN KEY `_MenuSupplements_B_fkey`;

-- DropForeignKey
ALTER TABLE `_orderitemsupplements` DROP FOREIGN KEY `_OrderItemSupplements_A_fkey`;

-- DropForeignKey
ALTER TABLE `_orderitemsupplements` DROP FOREIGN KEY `_OrderItemSupplements_B_fkey`;

-- DropForeignKey
ALTER TABLE `categoryrestaurant` DROP FOREIGN KEY `CategoryRestaurant_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `categoryrestaurant` DROP FOREIGN KEY `CategoryRestaurant_restaurantId_fkey`;

-- DropForeignKey
ALTER TABLE `chat` DROP FOREIGN KEY `Chat_deliverymanId_fkey`;

-- DropForeignKey
ALTER TABLE `chat` DROP FOREIGN KEY `Chat_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `chat` DROP FOREIGN KEY `Chat_userId_fkey`;

-- DropForeignKey
ALTER TABLE `deliveryman` DROP FOREIGN KEY `Deliveryman_userId_fkey`;

-- DropForeignKey
ALTER TABLE `menu` DROP FOREIGN KEY `Menu_restaurantId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_deliverymanId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_deliverymanId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_restaurantId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `orderhistory` DROP FOREIGN KEY `OrderHistory_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `rating` DROP FOREIGN KEY `Rating_restaurantId_fkey`;

-- DropForeignKey
ALTER TABLE `rating` DROP FOREIGN KEY `Rating_userId_fkey`;

-- DropForeignKey
ALTER TABLE `restaurant` DROP FOREIGN KEY `Restaurant_userId_fkey`;

-- DropIndex
DROP INDEX `CategoryRestaurant_categoryId_fkey` ON `categoryrestaurant`;

-- DropIndex
DROP INDEX `CategoryRestaurant_restaurantId_fkey` ON `categoryrestaurant`;

-- DropIndex
DROP INDEX `Chat_deliverymanId_fkey` ON `chat`;

-- DropIndex
DROP INDEX `Chat_orderId_fkey` ON `chat`;

-- DropIndex
DROP INDEX `Chat_userId_fkey` ON `chat`;

-- DropIndex
DROP INDEX `Menu_restaurantId_fkey` ON `menu`;

-- DropIndex
DROP INDEX `Notification_deliverymanId_fkey` ON `notification`;

-- DropIndex
DROP INDEX `Notification_orderId_fkey` ON `notification`;

-- DropIndex
DROP INDEX `Order_deliverymanId_fkey` ON `order`;

-- DropIndex
DROP INDEX `Order_restaurantId_fkey` ON `order`;

-- DropIndex
DROP INDEX `Order_userId_fkey` ON `order`;

-- DropIndex
DROP INDEX `OrderHistory_orderId_fkey` ON `orderhistory`;

-- DropIndex
DROP INDEX `OrderItem_menuId_fkey` ON `orderitem`;

-- DropIndex
DROP INDEX `OrderItem_orderId_fkey` ON `orderitem`;

-- DropIndex
DROP INDEX `Payment_orderId_fkey` ON `payment`;

-- DropIndex
DROP INDEX `Rating_restaurantId_fkey` ON `rating`;

-- DropIndex
DROP INDEX `Rating_userId_fkey` ON `rating`;

-- DropIndex
DROP INDEX `Restaurant_userId_fkey` ON `restaurant`;

-- CreateTable
CREATE TABLE `DeliveryLocation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `DeliveryLocation_orderId_key`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
