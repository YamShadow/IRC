/* Pour les tests en dev*/
DROP DATABASE IF EXISTS `FinalChatProject`;

CREATE DATABASE IF NOT EXISTS `FinalChatProject`;
USE `FinalChatProject`;

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `pseudo` VARCHAR(100) NOT NULL,
    `mail` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `image` TEXT,
    `connected` int(1) NOT NULL,
    -- `last_conn` TIMESTAMP,

    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `messages_prives` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    `emetteur` INT UNSIGNED NOT NULL,
    `destinataire` INT UNSIGNED NOT NULL,
    `date_message` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`emetteur`) REFERENCES `users`(`id`),
    FOREIGN KEY (`destinataire`) REFERENCES `users`(`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `types_salon` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `salons` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    -- `serveur` INT UNSIGNED NOT NULL,
    `type_salon` INT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`),
    -- FOREIGN KEY (`serveur`) REFERENCES `serveurs`(`id`),
    FOREIGN KEY (`type_salon`) REFERENCES `types_salon`(`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `messages` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    `emetteur` INT UNSIGNED NOT NULL,
    `salon` INT UNSIGNED NOT NULL,
    `date_message` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`emetteur`) REFERENCES `users`(`id`),
    FOREIGN KEY (`salon`) REFERENCES `salons`(`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `etats` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(20) NOT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `amis` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `personne_a` INT UNSIGNED NOT NULL,
    `personne_b` INT UNSIGNED NOT NULL,
    `etat` INT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`personne_a`) REFERENCES `users`(`id`),
    FOREIGN KEY (`personne_b`) REFERENCES `users`(`id`),
    FOREIGN KEY (`etat`) REFERENCES `etats`(`id`)
) ENGINE = InnoDB;

/* Tant qu'on utilise pas les serveurs elle reste commentée
CREATE TABLE IF NOT EXISTS `serveurs` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
*/

CREATE TABLE IF NOT EXISTS `permissions` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `roles` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(100) NOT NULL,
    `salon` INT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`salon`) REFERENCES `salons`(`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `roles_permissions` (
    `role` INT UNSIGNED NOT NULL,
    `permission` INT UNSIGNED NOT NULL,

    PRIMARY KEY (`role`, `permission`),
    FOREIGN KEY (`role`) REFERENCES `roles`(`id`),
    FOREIGN KEY (`permission`) REFERENCES `permissions`(`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `users_salons` (
    `user` INT UNSIGNED NOT NULL,
    `salon` INT UNSIGNED NOT NULL,

    PRIMARY KEY (`user`, `salon`),
    FOREIGN KEY (`user`) REFERENCES `users`(`id`),
    FOREIGN KEY (`salon`) REFERENCES `salons`(`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `users_roles` (
    `user` INT UNSIGNED NOT NULL,
    `role` INT UNSIGNED NOT NULL,
    `salon` INT UNSIGNED NOT NULL,

    PRIMARY KEY (`user`, `role`, `salon`),
    FOREIGN KEY (`user`) REFERENCES `users`(`id`),
    FOREIGN KEY (`role`) REFERENCES `roles`(`id`),
    FOREIGN KEY (`salon`) REFERENCES `salons`(`id`)
) ENGINE = InnoDB;
