-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 09 nov. 2021 à 00:29
-- Version du serveur :  5.7.24
-- Version de PHP : 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sea`
--

-- --------------------------------------------------------

--
-- Structure de la table `bdd_objets_sea___feuille_1`
--

CREATE TABLE `bdd_objets_sea___feuille_1` (
  `COL 1` varchar(22) DEFAULT NULL,
  `COL 2` varchar(11) DEFAULT NULL,
  `COL 3` varchar(13) DEFAULT NULL,
  `COL 4` varchar(12) DEFAULT NULL,
  `COL 5` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `bdd_objets_sea___feuille_1`
--

INSERT INTO `bdd_objets_sea___feuille_1` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('nom', 'type', 'affaire', 'position_geo', 'niv_zoom_min'),
('adresse_bettencourt', 'recuperable', 'bettencourt ', '', ''),
('parfum', 'recuperable', 'bettencourt ', '', ''),
('temoignage_manuscrit', 'recuperable', 'bettencourt ', '', ''),
('archives_non_declarees', 'recuperable', 'bygmalion ', '', ''),
('rhinoceros', 'recuperable', 'reso_garantia', '', ''),
('voiture', 'deplacable', 'reso_garantia', '', ''),
('facture_douteuse', 'recuperable', 'reso_garantia', '', ''),
('mandat_perquisition', 'recuperable', 'reso_garantia', '', ''),
('fleurs', 'recuperable', 'karachi', '', ''),
('numero_roi', '?', 'karachi', '', ''),
('papier_roi', 'recuperable', 'karachi', '', ''),
('papier_ziad', 'recuperable', 'karachi', '', ''),
('papier_mediapart_1', 'recuperable', 'karachi', '', ''),
('loi_belge', 'recuperable', 'kazakhgate', '', ''),
('papier_tracfin', 'recuperable', 'kazakhgate', '', ''),
('papier_jfe', 'recuperable', 'kazakhgate', '', ''),
('cheval', 'recuperable', 'kazakhgate', '', ''),
('papier_gueant_1', 'recuperable', 'kazakhgate', '', ''),
('papier_djouhri', 'recuperable', 'libye', '', ''),
('clef_bnp', 'recuperable', 'libye', '', ''),
('papier_bnp', 'recuperable', 'libye', '', ''),
('papier_mediapart_2', 'recuperable', 'libye', '', ''),
('', '', '', '', ''),
('', '', '', '', ''),
('carte_presse', '', 'toutes', '', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
