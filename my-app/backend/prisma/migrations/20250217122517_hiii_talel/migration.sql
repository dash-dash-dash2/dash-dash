/*
  Warnings:

  - You are about to drop the `_ordersupplements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ordersupplements` DROP FOREIGN KEY `_OrderSupplements_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ordersupplements` DROP FOREIGN KEY `_OrderSupplements_B_fkey`;

-- AlterTable
ALTER TABLE `order` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE `_ordersupplements`;

-- CreateTable
CREATE TABLE `_OrderItemSupplements` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OrderItemSupplements_AB_unique`(`A`, `B`),
    INDEX `_OrderItemSupplements_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_OrderItemSupplements` ADD CONSTRAINT `_OrderItemSupplements_A_fkey` FOREIGN KEY (`A`) REFERENCES `OrderItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderItemSupplements` ADD CONSTRAINT `_OrderItemSupplements_B_fkey` FOREIGN KEY (`B`) REFERENCES `Supplement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
