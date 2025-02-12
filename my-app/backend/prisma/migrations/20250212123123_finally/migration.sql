/*
  Warnings:

  - You are about to drop the column `email` on the `deliveryman` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `deliveryman` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `deliveryman` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `deliveryman` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `deliveryman` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `restaurant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Deliveryman` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Deliveryman_email_key` ON `deliveryman`;

-- DropIndex
DROP INDEX `Restaurant_email_key` ON `restaurant`;

-- AlterTable
ALTER TABLE `deliveryman` DROP COLUMN `email`,
    DROP COLUMN `location`,
    DROP COLUMN `name`,
    DROP COLUMN `password`,
    DROP COLUMN `phone`,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `restaurant` DROP COLUMN `address`,
    DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `password`,
    DROP COLUMN `phone`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deliverymanId` INTEGER NULL,
    ADD COLUMN `restaurantId` INTEGER NULL,
    ADD COLUMN `role` ENUM('CUSTOMER', 'DELIVERYMAN', 'RESTAURANT_OWNER', 'ADMIN') NOT NULL DEFAULT 'CUSTOMER';

-- CreateIndex
CREATE UNIQUE INDEX `Deliveryman_userId_key` ON `Deliveryman`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Restaurant_userId_key` ON `Restaurant`(`userId`);

-- AddForeignKey
ALTER TABLE `Deliveryman` ADD CONSTRAINT `Deliveryman_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restaurant` ADD CONSTRAINT `Restaurant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
