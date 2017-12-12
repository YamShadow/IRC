/* Pour les tests en dev*/
DROP DATABASE IF EXISTS `chatbot`;

CREATE DATABASE IF NOT EXISTS `chatbot`;
USE `chatbot`;

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `image` TEXT,

    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `messages_prives` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    `emetteur` INT NOT NULL,
    `destinataire` INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY `emetteur` REFERENCES (`users`.`id`),
    FOREIGN KEY `destinataire` REFERENCES (`users`.`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `etats` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(20) NOT NULL,
    
    PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `amis` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `personne_a` INT NOT NULL,
    `personne_b` INT NOT NULL,
    `etat` INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY `personne_a` REFERENCES (`users`.`id`),
    FOREIGN KEY `personne_b` REFERENCES (`users`.`id`),
    FOREIGN KEY `etat` REFERENCES (`etats`.`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `serveurs` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` TEXT NOT NULL,

    PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `types_salon` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `salons` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `type_salon` INT NOT NULL,
    `serveur` INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY `type_salon` REFERENCES (`types_salon`.`id`),
    FOREIGN KEY `serveur` REFERENCES (`serveurs`.`id`)
) ENGINE = InnoDB;
