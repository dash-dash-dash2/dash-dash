-- AlterTable
ALTER TABLE `admin` ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `menu` ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `price` DOUBLE NULL;

-- AlterTable
ALTER TABLE `restaurant` ADD COLUMN `imageUrl` VARCHAR(191) NULL;
