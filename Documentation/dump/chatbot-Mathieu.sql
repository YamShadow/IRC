-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Dim 17 Décembre 2017 à 15:26
-- Version du serveur :  5.7.14
-- Version de PHP :  7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `chatbot`
--

-- --------------------------------------------------------

--
-- Structure de la table `amis`
--

CREATE TABLE `amis` (
  `id` int(10) UNSIGNED NOT NULL,
  `personne_a` int(10) UNSIGNED NOT NULL,
  `personne_b` int(10) UNSIGNED NOT NULL,
  `etat` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `etats`
--

CREATE TABLE `etats` (
  `id` int(10) UNSIGNED NOT NULL,
  `nom` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(10) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `emetteur` int(10) UNSIGNED NOT NULL,
  `salon` int(10) UNSIGNED NOT NULL,
  `date_message` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `messages`
--

INSERT INTO `messages` (`id`, `message`, `emetteur`, `salon`, `date_message`) VALUES
(1, 'teste', 2, 1, '2017-12-16 21:28:24'),
(2, 'test', 2, 1, '2017-12-16 21:29:13'),
(3, 'test', 2, 1, '2017-12-16 21:29:51'),
(4, 'testNode', 2, 1, '2017-12-16 21:47:21'),
(5, 'testNode', 2, 1, '2017-12-16 21:55:34'),
(6, 'testNode', 2, 1, '2017-12-16 21:56:43'),
(7, 'test', 2, 2, '2017-12-16 21:57:19'),
(8, 'Je suis un message sauvegarder depuis le chat !', 2, 2, '2017-12-16 21:57:27'),
(9, 'Et oui je vais bien :D', 2, 2, '2017-12-16 21:57:31'),
(10, 'é', 2, 2, '2017-12-16 22:03:29'),
(11, 'test', 2, 2, '2017-12-16 23:10:10'),
(12, '/msg lol', 2, 2, '2017-12-16 23:10:15'),
(13, '/msg lol', 2, 2, '2017-12-16 23:13:30'),
(14, '/msg lol', 2, 2, '2017-12-16 23:14:03'),
(15, 'msg ', 2, 2, '2017-12-16 23:14:05'),
(16, 'couci', 2, 2, '2017-12-16 23:46:10'),
(17, 'lol', 2, 2, '2017-12-16 23:46:50'),
(18, 'lol', 2, 2, '2017-12-16 23:50:02'),
(19, 'coucou', 2, 2, '2017-12-16 23:52:37'),
(20, 'Tu vas bien ? ', 2, 2, '2017-12-16 23:52:42'),
(21, 'moi moi ', 2, 2, '2017-12-16 23:52:43'),
(22, 'et toi ? ', 2, 2, '2017-12-16 23:52:44'),
(23, 'il y a du son :D', 2, 2, '2017-12-16 23:52:50'),
(24, 'test d\'un mot avec appostrophe', 2, 2, '2017-12-16 23:55:48'),
(25, 'coucou', 2, 2, '2017-12-17 00:01:40'),
(26, 'lol', 3, 2, '2017-12-17 00:20:17'),
(27, 'Coucou', 2, 1, '2017-12-17 15:24:36'),
(28, 'Lol', 3, 1, '2017-12-17 15:24:40');

-- --------------------------------------------------------

--
-- Structure de la table `messages_prives`
--

CREATE TABLE `messages_prives` (
  `id` int(10) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `emetteur` int(10) UNSIGNED NOT NULL,
  `destinataire` int(10) UNSIGNED NOT NULL,
  `date_message` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `messages_prives`
--

INSERT INTO `messages_prives` (`id`, `message`, `emetteur`, `destinataire`, `date_message`) VALUES
(1, '/msg YamiShadow Je t\'envoie un mp ;)', 3, 2, '2017-12-17 00:24:50'),
(2, '/msg test reponse !!', 2, 3, '2017-12-17 00:24:57'),
(3, ' COucou', 2, 3, '2017-12-17 00:44:38');

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `nom` varchar(100) NOT NULL,
  `salon` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `roles_permissions`
--

CREATE TABLE `roles_permissions` (
  `role` int(10) UNSIGNED NOT NULL,
  `permission` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `salons`
--

CREATE TABLE `salons` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type_salon` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `salons`
--

INSERT INTO `salons` (`id`, `name`, `type_salon`) VALUES
(1, 'General', 1),
(2, 'Room_1', 1);

-- --------------------------------------------------------

--
-- Structure de la table `types_salon`
--

CREATE TABLE `types_salon` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `types_salon`
--

INSERT INTO `types_salon` (`id`, `name`) VALUES
(1, 'text'),
(2, 'vocaux'),
(3, 'dessin'),
(4, 'jeux');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `pseudo` varchar(100) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` text,
  `connected` text NOT NULL,
  `channelConnected` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `mail`, `password`, `image`, `connected`, `channelConnected`) VALUES
(2, 'YamiShadow', '', '098f6bcd4621d373cade4e832627b4f6', '', 'igvEItmdqlrCa-uzAAAA', 1),
(3, 'Test', '', '098f6bcd4621d373cade4e832627b4f6', '', 'k6K3prgZb9kDdmYdAAAB', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users_roles`
--

CREATE TABLE `users_roles` (
  `user` int(10) UNSIGNED NOT NULL,
  `role` int(10) UNSIGNED NOT NULL,
  `salon` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `users_salons`
--

CREATE TABLE `users_salons` (
  `user` int(10) UNSIGNED NOT NULL,
  `salon` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `amis`
--
ALTER TABLE `amis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `personne_a` (`personne_a`),
  ADD KEY `personne_b` (`personne_b`),
  ADD KEY `etat` (`etat`);

--
-- Index pour la table `etats`
--
ALTER TABLE `etats`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `emetteur` (`emetteur`),
  ADD KEY `salon` (`salon`);

--
-- Index pour la table `messages_prives`
--
ALTER TABLE `messages_prives`
  ADD PRIMARY KEY (`id`),
  ADD KEY `emetteur` (`emetteur`),
  ADD KEY `destinataire` (`destinataire`);

--
-- Index pour la table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `salon` (`salon`);

--
-- Index pour la table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  ADD PRIMARY KEY (`role`,`permission`),
  ADD KEY `permission` (`permission`);

--
-- Index pour la table `salons`
--
ALTER TABLE `salons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_salon` (`type_salon`);

--
-- Index pour la table `types_salon`
--
ALTER TABLE `types_salon`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users_roles`
--
ALTER TABLE `users_roles`
  ADD PRIMARY KEY (`user`,`role`,`salon`),
  ADD KEY `role` (`role`),
  ADD KEY `salon` (`salon`);

--
-- Index pour la table `users_salons`
--
ALTER TABLE `users_salons`
  ADD PRIMARY KEY (`user`,`salon`),
  ADD KEY `salon` (`salon`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `amis`
--
ALTER TABLE `amis`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `etats`
--
ALTER TABLE `etats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT pour la table `messages_prives`
--
ALTER TABLE `messages_prives`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `salons`
--
ALTER TABLE `salons`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `types_salon`
--
ALTER TABLE `types_salon`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `amis`
--
ALTER TABLE `amis`
  ADD CONSTRAINT `amis_ibfk_1` FOREIGN KEY (`personne_a`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `amis_ibfk_2` FOREIGN KEY (`personne_b`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `amis_ibfk_3` FOREIGN KEY (`etat`) REFERENCES `etats` (`id`);

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`emetteur`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`salon`) REFERENCES `salons` (`id`);

--
-- Contraintes pour la table `messages_prives`
--
ALTER TABLE `messages_prives`
  ADD CONSTRAINT `messages_prives_ibfk_1` FOREIGN KEY (`emetteur`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_prives_ibfk_2` FOREIGN KEY (`destinataire`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`salon`) REFERENCES `salons` (`id`);

--
-- Contraintes pour la table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  ADD CONSTRAINT `roles_permissions_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `roles_permissions_ibfk_2` FOREIGN KEY (`permission`) REFERENCES `permissions` (`id`);

--
-- Contraintes pour la table `salons`
--
ALTER TABLE `salons`
  ADD CONSTRAINT `salons_ibfk_1` FOREIGN KEY (`type_salon`) REFERENCES `types_salon` (`id`);

--
-- Contraintes pour la table `users_roles`
--
ALTER TABLE `users_roles`
  ADD CONSTRAINT `users_roles_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users_roles_ibfk_2` FOREIGN KEY (`role`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `users_roles_ibfk_3` FOREIGN KEY (`salon`) REFERENCES `salons` (`id`);

--
-- Contraintes pour la table `users_salons`
--
ALTER TABLE `users_salons`
  ADD CONSTRAINT `users_salons_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users_salons_ibfk_2` FOREIGN KEY (`salon`) REFERENCES `salons` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
