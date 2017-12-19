-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Mar 19 Décembre 2017 à 00:31
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

--
-- Contenu de la table `etats`
--

INSERT INTO `etats` (`id`, `nom`) VALUES
(1, 'Invitation envoyée'),
(2, 'Invitattion rejetée'),
(3, 'Invitation expirée'),
(4, 'Indésirable'),
(5, 'Amis');

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
(29, 'coucou', 3, 1, '2017-12-18 08:38:37'),
(30, 'Yo', 2, 1, '2017-12-18 08:38:42'),
(31, 'gege', 3, 1, '2017-12-18 08:39:45'),
(32, 'yfguiop', 3, 2, '2017-12-18 08:40:15'),
(33, 'lol', 3, 2, '2017-12-18 08:41:49'),
(34, 'lokjhgvcxcvn', 3, 1, '2017-12-18 08:43:07'),
(35, 'xcgbknl', 2, 1, '2017-12-18 08:43:09'),
(36, '', 2, 1, '2017-12-18 08:43:09'),
(37, 'lol', 2, 1, '2017-12-18 09:05:26'),
(38, 'lol', 3, 1, '2017-12-18 09:05:29'),
(39, 'coucou', 3, 1, '2017-12-18 09:06:20'),
(40, 'hgrohgovgeg', 3, 2, '2017-12-18 09:06:39'),
(41, 'ge\'g', 2, 1, '2017-12-18 09:06:41'),
(42, 'fesfes', 3, 2, '2017-12-18 09:07:00'),
(43, '', 2, 2, '2017-12-18 09:07:52'),
(44, 'test', 4, 1, '2017-12-18 16:56:48'),
(45, 'coucou', 2, 1, '2017-12-18 18:59:39'),
(46, 'test', 2, 1, '2017-12-18 19:05:12'),
(47, '/switch Room_1', 2, 1, '2017-12-18 19:05:19'),
(48, '/switch Room_1', 2, 1, '2017-12-18 19:05:27'),
(49, 'test', 2, 1, '2017-12-18 19:06:05'),
(50, '/switch Room_1', 2, 1, '2017-12-18 19:06:14'),
(51, 'test', 2, 1, '2017-12-18 19:06:42'),
(52, 'coucou', 2, 1, '2017-12-18 19:25:36'),
(53, 'test', 2, 1, '2017-12-18 19:46:23'),
(54, 'test', 2, 1, '2017-12-18 20:35:22'),
(55, 'test', 2, 1, '2017-12-18 21:56:05'),
(56, 'je suis un &#233;', 2, 1, '2017-12-18 21:56:08'),
(57, '/romms', 2, 1, '2017-12-18 22:50:47'),
(58, '/createRoom', 2, 1, '2017-12-18 23:07:05'),
(59, '', 2, 1, '2017-12-18 23:49:25'),
(60, 'coucou', 2, 1, '2017-12-19 00:22:38'),
(61, '&#60;script&#62;alert(&#39;lol&#39;)&#60;/script&#62;', 2, 1, '2017-12-19 00:23:56');

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
(4, ' Tu es ou ? ', 3, 2, '2017-12-18 08:40:39'),
(5, ' lol', 3, 2, '2017-12-18 08:41:08'),
(6, ' lol', 3, 3, '2017-12-18 08:41:23'),
(7, ' Coucou', 2, 3, '2017-12-18 08:42:20'),
(8, ' Yo', 2, 3, '2017-12-18 08:43:14'),
(9, ' coucou', 2, 3, '2017-12-18 08:43:38'),
(10, ' Je suis partie', 3, 2, '2017-12-18 08:43:47'),
(11, ' coucou', 3, 2, '2017-12-18 09:07:44'),
(12, ' lol', 2, 3, '2017-12-18 09:07:51'),
(13, ' coucou', 2, 2, '2017-12-18 18:52:56'),
(14, ' test', 2, 2, '2017-12-18 18:53:28'),
(15, 'Coucou', 4, 2, '2017-12-18 23:56:07'),
(16, 'yo', 4, 2, '2017-12-18 23:59:13'),
(17, 'tu vas bien ?', 2, 4, '2017-12-18 23:59:18'),
(18, 'oui et toi ?', 4, 2, '2017-12-18 23:59:24');

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
  `nom` varchar(255) NOT NULL,
  `type_salon` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `salons`
--

INSERT INTO `salons` (`id`, `nom`, `type_salon`) VALUES
(1, 'General', 1),
(2, 'Room_1', 1),
(3, 'lol', 1),
(6, 'testRoom', 1);

-- --------------------------------------------------------

--
-- Structure de la table `types_salon`
--

CREATE TABLE `types_salon` (
  `id` int(10) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `types_salon`
--

INSERT INTO `types_salon` (`id`, `nom`) VALUES
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
  `connected` tinyint(1) NOT NULL,
  `channelConnected` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `mail`, `password`, `image`, `connected`, `channelConnected`) VALUES
(2, 'YamiShadow', '', '098f6bcd4621d373cade4e832627b4f6', '', 1, 1),
(3, 'Test', '', '098f6bcd4621d373cade4e832627b4f6', '', 0, 1),
(4, 'login', '', '098f6bcd4621d373cade4e832627b4f6', '', 1, 1);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT pour la table `etats`
--
ALTER TABLE `etats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT pour la table `messages_prives`
--
ALTER TABLE `messages_prives`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT pour la table `types_salon`
--
ALTER TABLE `types_salon`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
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
