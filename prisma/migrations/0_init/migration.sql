-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `avatar` VARCHAR(225) NULL,
    `crush_avatar` VARCHAR(225) NULL,
    `file_music` VARCHAR(225) NULL,
    `story` VARCHAR(50) NULL,
    `side_story` VARCHAR(50) NULL,
    `day_love_begins` DATE NULL,
    `id_account` INTEGER NULL,

    UNIQUE INDEX `id_account`(`id_account`),
    INDEX `PK_stories`(`id_account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stories` ADD CONSTRAINT `PK_stories` FOREIGN KEY (`id_account`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

