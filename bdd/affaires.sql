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
-- Structure de la table `affaires`
--

CREATE TABLE `affaires` (
  `affaire` varchar(50) DEFAULT NULL,
  `resume` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `affaires`
--

INSERT INTO `affaires` (`affaire`, `resume`) VALUES
('bettencourt ', 'Lors de la campagne présidentielle de 2007, Éric Woerth, le trésorier de la campagne de Nicolas Sarkozy, aurait eu des conflits d’intérêts avec Lilliane Bettencourt, actionnaire principale de l’Oréal et la femme la plus fortunée du monde.\nDes soupçons de financements illégaux de la campagne sont alors révélés, Sarkozy est accusé d’abus de faiblesse et Woerth de trafic d\'influence passif et de recel.\nMonsieur Sarkozy bénéficie finalement d’un non lieu, et Monsieur Woerth est relaxé.\nL’affaire est donc classée sans suite, mais la famille Bettencourt aurait retrouvé mercredi dernier un témoignage manuscrit de Liliane qui apporterait de nouvelles preuves accablantes sur Sarkozy !'),
('bygmalion ', 'Lors de sa campagne présidentielle de 2012, Monsieur Sarkozy et son parti ont largement dépassé le plafond financier alloué. Ils ont alors tenté de dissimuler cet excès en fabriquant de toute pièce des fausses factures avec la compagnie de communication Bygmalion.\r\nÀ ce jour, il est condamné à un an de prison ferme pour financement illégal de sa campagne électorale. Mais comme il a fait appel, nous avons plus de temps pour éclaircir les points encore flous de cette histoire.'),
('reso_garantia', 'Cette affaire encore récente a été révélée cette année : des soupçons de « trafic d’influence » et de « blanchiment de crime ou de délit » pour sa rémunération par la société d\'assurances russe Reso-Garantia. Plusieurs transferts d’argents importants ont été effectués pour des raisons plus que suspicieuses, afin qu’il ne puisse esquiver cette affaire, trouvez vite les preuves qui l’incriminent !'),
('karachi', 'En 1994, la France passe des contrats d’armements avec le Pakistan et l’Arabie Saoudite. Il y aurait eu des rétrocommissions (chose illégale en France) qui auraient servi à Monsieur Balladur pour financer sa campagne présidentielle. Sarkozy était alors ministre des Finances et porte-parole de la campagne de Balladur. Un attentat contre des français à Karachi fait 14 morts et aurait été organisé par les services secrets pakistanais pour se venger de la fin des commissions de la part de la France.\nActuellement Monsieur Sarkozy n’est que témoin assisté de l’affaire, mais peut être saurez vous trouver des preuves supplémentaires de son implication.'),
('kazakhgate', 'En 2010, sous la présidence de Nicolas Sarkozy, la France passe un contrat d’armement de 45 hélicoptères avec le Kazakhstan.\nIl y aurait eu des rétrocommissions (toujours illégales) et les enquêteurs soupçonnent l’équipe du président Monsieur Sarkozy d’avoir fait pression sur le Sénat belge. Afin d’obtenir la signature du contrat, ils auraient pris une décision favorable à trois hommes d’affaires d’origine kazakh poursuivis en Belgique. En particulier Claude Guéant et Jean-François Etienne des Rosaies, deux proches de Sarkozy, ont été interrogés et mis en garde à vue dans cette affaire de « corruption d’agents publics étrangers » et de « blanchiment en bande organisée ».\nCependant, Monsieur Sarkozy n’a jamais pu être directement mis en cause, alors allez-y, attrapez-nous cette anguille.'),
('libye', 'Comme vous le savez, Monsieur Sarkozy s’est présenté plusieurs fois aux présidentielles en France. Et qui dit nouvelle campagne de Sarkozy, dit nouveaux financements suspicieux et donc nouvelle chance de le coffrer !\nPour sa campagne de 2007, il est donc soupçonné d’avoir reçu des fonds venus du régime de l’ancien dictateur libyen, Kadhafi. Il est mis en examen pour « corruption passive », « financement illégal de campagne électorale », « recel de fonds publics libyens » et « association de malfaiteurs ». Choukri Ghanem était ministre du pétrole en Libye et aurait un carnet sur lequel serait marqué les différents transferts d’argent à Sarkozy.  Béchir Salah était l\'interlocuteur direct entre la Libye et la France. Alexandre Djouhri accompagnait Claude Guéant, directeur de cabinet et proche de Sarkozy, lors des voyages en Syrie. Il y a beaucoup de témoins dans cette affaire. Allez les rencontrer pour résoudre cette affaire !');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
