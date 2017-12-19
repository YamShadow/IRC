-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mar 19 Décembre 2017 à 14:09
-- Version du serveur :  5.7.11
-- Version de PHP :  7.0.4

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
(29, 'coucou', 3, 1, '2017-12-18 07:38:37'),
(30, 'Yo', 2, 1, '2017-12-18 07:38:42'),
(31, 'gege', 3, 1, '2017-12-18 07:39:45'),
(32, 'yfguiop', 3, 2, '2017-12-18 07:40:15'),
(33, 'lol', 3, 2, '2017-12-18 07:41:49'),
(34, 'lokjhgvcxcvn', 3, 1, '2017-12-18 07:43:07'),
(35, 'xcgbknl', 2, 1, '2017-12-18 07:43:09'),
(36, '', 2, 1, '2017-12-18 07:43:09'),
(37, 'lol', 2, 1, '2017-12-18 08:05:26'),
(38, 'lol', 3, 1, '2017-12-18 08:05:29'),
(39, 'coucou', 3, 1, '2017-12-18 08:06:20'),
(40, 'hgrohgovgeg', 3, 2, '2017-12-18 08:06:39'),
(41, 'geg', 2, 1, '2017-12-18 08:06:41'),
(42, 'fesfes', 3, 2, '2017-12-18 08:07:00'),
(43, '', 2, 2, '2017-12-18 08:07:52'),
(44, 'test', 4, 1, '2017-12-18 15:56:48'),
(45, 'coucou', 2, 1, '2017-12-18 17:59:39'),
(46, 'test', 2, 1, '2017-12-18 18:05:12'),
(47, '/switch Room_1', 2, 1, '2017-12-18 18:05:19'),
(48, '/switch Room_1', 2, 1, '2017-12-18 18:05:27'),
(49, 'test', 2, 1, '2017-12-18 18:06:05'),
(50, '/switch Room_1', 2, 1, '2017-12-18 18:06:14'),
(51, 'test', 2, 1, '2017-12-18 18:06:42'),
(52, 'coucou', 2, 1, '2017-12-18 18:25:36'),
(53, 'test', 2, 1, '2017-12-18 18:46:23'),
(54, 'test', 2, 1, '2017-12-18 19:35:22'),
(55, 'test', 2, 1, '2017-12-18 20:56:05'),
(56, 'je suis un &#233;', 2, 1, '2017-12-18 20:56:08'),
(57, '/romms', 2, 1, '2017-12-18 21:50:47'),
(58, '/createRoom', 2, 1, '2017-12-18 22:07:05'),
(59, '', 2, 1, '2017-12-18 22:49:25'),
(60, 'coucou', 2, 1, '2017-12-18 23:22:38'),
(61, '&#60;script&#62;alert(&#39;lol&#39;)&#60;/script&#62;', 2, 1, '2017-12-18 23:23:56'),
(62, '/roomsList', 2, 2, '2017-12-19 07:55:32'),
(63, '/roomLost', 2, 3, '2017-12-19 08:16:05'),
(64, '/roomsList', 2, 3, '2017-12-19 08:16:11'),
(65, 'coucou', 2, 1, '2017-12-19 10:59:53'),
(66, 'lol', 2, 1, '2017-12-19 11:01:30'),
(67, 'coucou', 2, 1, '2017-12-19 11:01:48'),
(68, 'coucou', 2, 1, '2017-12-19 11:02:06'),
(69, 'coucou', 2, 1, '2017-12-19 11:18:04'),
(70, 'lol', 2, 1, '2017-12-19 11:19:01'),
(71, 'coucou', 2, 1, '2017-12-19 11:40:54'),
(72, 'coucou', 2, 3, '2017-12-19 13:41:38'),
(73, 'lol', 2, 3, '2017-12-19 13:41:40'),
(74, 'ngi ridgh gr', 2, 3, '2017-12-19 13:41:49'),
(75, 'g', 2, 3, '2017-12-19 13:41:49'),
(76, 'g r', 2, 3, '2017-12-19 13:41:49'),
(77, 'g', 2, 3, '2017-12-19 13:41:49'),
(78, 'rs', 2, 3, '2017-12-19 13:41:49'),
(79, 'g', 2, 3, '2017-12-19 13:41:49'),
(80, 'rs', 2, 3, '2017-12-19 13:41:49'),
(81, '', 2, 3, '2017-12-19 13:41:49'),
(82, 'ger', 2, 3, '2017-12-19 13:41:49'),
(83, '', 2, 3, '2017-12-19 13:41:50'),
(84, 'her', 2, 3, '2017-12-19 13:41:50'),
(85, '', 2, 3, '2017-12-19 13:41:50'),
(86, 'd', 2, 3, '2017-12-19 13:41:50'),
(87, 'gg', 2, 3, '2017-12-19 13:41:50'),
(88, 'r', 2, 3, '2017-12-19 13:41:50'),
(89, 'sg', 2, 3, '2017-12-19 13:41:50'),
(90, 'rdg', 2, 3, '2017-12-19 13:41:58'),
(91, 'g', 2, 3, '2017-12-19 13:41:58'),
(92, 'g', 2, 3, '2017-12-19 13:41:58'),
(93, 'dr gdr', 2, 3, '2017-12-19 13:41:58'),
(94, 'rd', 2, 3, '2017-12-19 13:41:59'),
(95, 'g rd', 2, 3, '2017-12-19 13:41:59'),
(96, 'g rd', 2, 3, '2017-12-19 13:41:59'),
(97, 'g dr', 2, 3, '2017-12-19 13:41:59'),
(98, 'g rd', 2, 3, '2017-12-19 13:42:00'),
(99, 'fes', 2, 3, '2017-12-19 13:42:07'),
(100, 'fes', 2, 3, '2017-12-19 13:42:09'),
(101, 'fes', 2, 3, '2017-12-19 13:42:10');

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
(4, ' Tu es ou ? ', 3, 2, '2017-12-18 07:40:39'),
(5, ' lol', 3, 2, '2017-12-18 07:41:08'),
(6, ' lol', 3, 3, '2017-12-18 07:41:23'),
(7, ' Coucou', 2, 3, '2017-12-18 07:42:20'),
(8, ' Yo', 2, 3, '2017-12-18 07:43:14'),
(9, ' coucou', 2, 3, '2017-12-18 07:43:38'),
(10, ' Je suis partie', 3, 2, '2017-12-18 07:43:47'),
(11, ' coucou', 3, 2, '2017-12-18 08:07:44'),
(12, ' lol', 2, 3, '2017-12-18 08:07:51'),
(13, ' coucou', 2, 2, '2017-12-18 17:52:56'),
(14, ' test', 2, 2, '2017-12-18 17:53:28'),
(15, 'Coucou', 4, 2, '2017-12-18 22:56:07'),
(16, 'yo', 4, 2, '2017-12-18 22:59:13'),
(17, 'tu vas bien ?', 2, 4, '2017-12-18 22:59:18'),
(18, 'oui et toi ?', 4, 2, '2017-12-18 22:59:24'),
(19, 'coucou', 2, 4, '2017-12-19 08:30:05'),
(20, 'salut', 4, 2, '2017-12-19 08:30:11');

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
(1, 'Generale', 1),
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
  `mail` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `image` text,
  `connected` tinyint(1) DEFAULT '0',
  `channelConnected` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `mail`, `password`, `image`, `connected`, `channelConnected`) VALUES
(2, 'YamiShadow', NULL, '098f6bcd4621d373cade4e832627b4f6', NULL, 0, 1),
(3, 'Testz', '', '098f6bcd4621d373cade4e832627b4f6', '', 0, 1),
(4, 'login', NULL, '098f6bcd4621d373cade4e832627b4f6', NULL, 0, 1);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;
--
-- AUTO_INCREMENT pour la table `messages_prives`
--
ALTER TABLE `messages_prives`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
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
