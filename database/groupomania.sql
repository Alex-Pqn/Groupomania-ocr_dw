-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 21 sep. 2023 à 15:03
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `forum_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `comment_fk0` (`user_id`),
  KEY `comment_fk1` (`forum_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `user_id`, `forum_id`, `text`, `created_at`, `updated_at`) VALUES
(6, 9, 9, 'Merci Alain :)', '2023-09-21 15:02:42', '2023-09-21 17:02:42'),
(5, 10, 4, 'Bon début de semaine à toi aussi Alex, j\'espère que tu as bien repris !', '2023-09-21 14:10:01', '2023-09-21 16:10:01');

-- --------------------------------------------------------

--
-- Structure de la table `forum`
--

DROP TABLE IF EXISTS `forum`;
CREATE TABLE IF NOT EXISTS `forum` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `forum_fk0` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `forum`
--

INSERT INTO `forum` (`id`, `user_id`, `text`, `image_url`, `created_at`, `updated_at`) VALUES
(4, 8, 'Bonjour tout le monde, bon début de semaine !', NULL, '2023-09-21 13:59:44', '2023-09-21 15:59:44'),
(9, 7, 'Bienvenue aux nouveaux, cet endroit permet de partager, échanger et faire des rencontres au sein de la boite. Faites des retours !', NULL, '2023-09-21 15:01:15', '2023-09-21 17:01:15');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(55) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `newsletters` tinyint(1) NOT NULL,
  `description` tinytext,
  `pic_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_mod` tinyint(1) NOT NULL DEFAULT '0',
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `hashed_password`, `newsletters`, `description`, `pic_url`, `created_at`, `updated_at`, `is_mod`, `is_admin`) VALUES
(9, 'Anna', 'Conda', 'anna.conda@fakemail.com', '$2b$10$q8On5zmUj.unOg4r2MibbeCxSiPizAgXd767LsSqkhVJDFgNkUacK', 1, '', 'http://localhost:3000/images/9.1695305183063.jpg', '2023-09-21 14:06:01', '2023-09-21 16:06:23', 0, 0),
(8, 'Alex', 'Terieur', 'alex.terieur@fakemail.com', '$2b$10$2SLynV5/L1CLJQwLoLeb7u6H8PENsKJBgKkiG3XjFKakGxk/6dRre', 1, '', 'http://localhost:3000/images/8.1695304486557.jpg', '2023-09-21 13:53:12', '2023-09-21 15:54:46', 0, 0),
(7, 'Alain', 'Terieur', 'alain.terieur@fakemail.com', '$2b$10$L/eozwQcgygMVxqI/fzrfuqGsk1qelAWI1rvOcyQPmF.Icf9FavgG', 0, '', 'http://localhost:3000/images/7.1695302477818.jpg', '2023-09-21 13:19:59', '2023-09-21 16:04:58', 0, 1),
(10, 'Sarah', 'Croche', 'sarah.croche@fakemail.com', '$2b$10$YUZ4zExDVbP5IGU9uZGbju0Nmxy6ZcxsTSClhIH0384wQxJx3/9bG', 1, '', 'http://localhost:3000/images/10.1695305352960.jpg', '2023-09-21 14:08:48', '2023-09-21 16:09:12', 0, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
