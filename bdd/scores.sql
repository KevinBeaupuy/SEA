-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql-kevineuh.alwaysdata.net
-- Généré le : lun. 29 nov. 2021 à 05:51
-- Version du serveur : 10.5.11-MariaDB
-- Version de PHP : 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `kevineuh_sea`
--

-- --------------------------------------------------------

--
-- Structure de la table `scores`
--

CREATE TABLE `scores` (
  `username` varchar(11) DEFAULT '',
  `score` varchar(5) DEFAULT '',
  `date` varchar(10) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `scores`
--

INSERT INTO `scores` (`username`, `score`, `date`) VALUES
('Sarkozy', '0', '15/11/2021'),
('Blkany', '15.64', '16/11/2021'),
('Kadhafi', '47.71', '17/11/2021'),
('Bettencourt', '3.75', '18/11/2021'),
('Boby', '42', '19/11/2021'),
('Malika', '35', '20/11/2021'),
('Fixou', '-1', '21/11/2021'),
('Coincoin', '28.34', '22/11/2021'),
('Boton', '56', '23/11/2021'),
('Pompidou', '19', '24/11/2021'),
('PYH', '39.42', '25/11/2021'),
('Hervé', '24.5', '26/11/2021'),
('Antoine', '32.66', '27/11/2021'),
('ToinouDu88', '18.75', '28/11/2021'),
('wquiche', '12.12', '29/11/2021'),
('Robert', '2.7', '30/11/2021'),
('Cirose', '1', '1/12/2021');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
