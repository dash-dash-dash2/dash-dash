/*
  Warnings:

  - You are about to drop the column `foodId` on the `orderitem` table. All the data in the column will be lost.
  - You are about to drop the column `foodId` on the `supplement` table. All the data in the column will be lost.
  - You are about to drop the `categoryfood` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `food` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `categoryfood` DROP FOREIGN KEY `CategoryFood_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `categoryfood` DROP FOREIGN KEY `CategoryFood_foodId_fkey`;

-- DropForeignKey
ALTER TABLE `food` DROP FOREIGN KEY `Food_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_foodId_fkey`;

-- DropForeignKey
ALTER TABLE `supplement` DROP FOREIGN KEY `Supplement_foodId_fkey`;

-- AlterTable
ALTER TABLE `chat` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `menu` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `orderitem` DROP COLUMN `foodId`;

-- AlterTable
ALTER TABLE `payment` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `supplement` DROP COLUMN `foodId`,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `categoryfood`;

-- DropTable
DROP TABLE `food`;
