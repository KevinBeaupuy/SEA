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
-- Structure de la table `objets`
--

CREATE TABLE `objets` (
  `nom` varchar(50) NOT NULL,
  `type` varchar(11) DEFAULT NULL,
  `affaire` varchar(13) DEFAULT NULL,
  `x` double NOT NULL,
  `y` double NOT NULL,
  `niv_zoom_min` int(2) NOT NULL,
  `bloque` varchar(31) DEFAULT NULL,
  `info_carnet` varchar(151) DEFAULT NULL,
  `indice` varchar(92) DEFAULT NULL,
  `x_cible` double DEFAULT NULL,
  `y_cible` double DEFAULT NULL,
  `dialogue` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `objets`
--

INSERT INTO `objets` (`nom`, `type`, `affaire`, `x`, `y`, `niv_zoom_min`, `bloque`, `info_carnet`, `indice`, `x_cible`, `y_cible`, `dialogue`) VALUES
('mediapart', 'clickable', '', 48.8506, 2.3798, 4, 'carte_presse', 'Va voir Médiapart, à Paris', 'Rendez-vous au bâtiment de mediapart à Paris (c\'est le seul objet visible en même temps x) )', 0, 0, 'Bonjour à toi ! Nous avons été initiateur de quasiment toutes affaires sur Sarkozy. Nous acceptons volontier ton aide. Tiens, voilà ta carte de presse.'),
('carte_presse', 'recuperable', '', 48.8506, 2.3788, 4, 'siege_social_oreal', '', 'null', 0, 0, ''),
('siege_social_oreal', 'clickable', 'bettencourt ', 48.8681, 2.3233, 13, 'papier_adresse_bettencourt', 'Rendez-vous au siège social de l\'Oréal, à Paris', 'Au centre de Paris', 0, 0, 'Bienvenue chez L\'Oreal. Vous investiguez sur l\'affaire Bettencourt ? Cette famille n\'a rien à cacher, pour preuve je peux vous donner leur adresse.  Et voici mon témoignage.'),
('papier_adresse_bettencourt', 'recuperable', 'bettencourt ', 48.8681, 2.3233, 13, 'agent_secu_bett', '', 'null', 0, 0, ''),
('agent_secu_bett', 'clickable', 'bettencourt ', 48.8779, 2.2541, 12, 'françoise_bettencourt_meyers', 'Adresse Bettencourt : Rue Delabordère à Neuilly-sur-Seine', 'Neuilly-sur-Seine est à l\'ouest de Paris', 0, 0, 'Bonjour Monsieur. Non Madame Bettencourt n\'est pas disponible. Elle est au restaurent au Fouquet’s.'),
('françoise_bettencourt_meyers', 'clickable', 'bettencourt ', 48.8715, 2.3012, 14, 'papier_temoignage_bettencourt', 'Aller au Fouquet’s', 'Dans le 8eme', 0, 0, 'Oh c\'est de l\'histoire vieille tout ça, c\'était il y a 14 enfin ! Et puis cela concernait ma mère. Mais tenez un témoignage manuscrit qui pourrait vous aider.'),
('papier_temoignage_bettencourt', 'recuperable', 'bettencourt ', 48.8715, 2.3012, 14, 'bygmalion', 'Remettre les preuves à mediapart', 'null', 0, 0, ''),
('jean_françois_cope', 'clickable', 'bygmalion ', 48.9583, 2.8777, 14, 'preuve_blanchiment', 'Jean-Francois Copé est directement impliqué dans l\'affaire. Va le voir à Meaux.', 'Dans le 77', 0, 0, 'Bonjour Monsieur, j\'aimerais que la justice soit plus clémente avec moi alors je fais preuve de bonne volonté, tenez des preuves des fausses factures. Et je peux également vous dire qu\'il y a eu du blanchiment d\'argent par greenwashing  entre bygmalion et le ministère de la transition écologique pour le compte de l’UMP. Tenez le numéro de l\'actuelle ministre Barbara Pompili.'),
('preuve_blanchiment', 'recuperable', 'bygmalion ', 48.9583, 2.8777, 14, '06 41 43 45 47', '', 'null', 0, 0, ''),
('ecole_entpe', 'clickable', 'bygmalion ', 45.7785, 4.9223, 6, '', '', 'L\'ENSG est apparemment une école de ce Ministère ...', 0, 0, 'Bonjour, pardonez-moi mais Madame Pompili n\'est pas en visite chez nous aujourd\'hui. '),
('ecole_enm', 'clickable', 'bygmalion ', 43.5739, 1.3777, 6, '', '', 'L\'ENSG est apparemment une école de ce Ministère ...', 0, 0, 'Non, pardonez-moi, Madame Pompili n\'est pas en visite chez nous aujourd\'hui. '),
('ecole_ensg', 'clickable', 'bygmalion ', 48.8412, 2.5876, 13, 'secu_ensg', '', 'L\'ENSG est apparemment une école de ce Ministère ...', 0, 0, 'Veuillez vous identifier au poste de sécurité s\'il vous plaît.'),
('secu_ensg', 'clickable', 'bygmalion ', 48.8418, 2.5865, 13, 'secu_ensg_content', '', 'null', 0, 0, 'Carte étudiante s\'il vous plaît.'),
('secu_ensg_content', 'clickable', 'bygmalion ', 48.8418, 2.5865, 13, 'barbara_pompil', 'Convaincre l\'agent de vous laisser rentrer', 'Vous possédez une autre carte dans votre inventaire.', 0, 0, 'Tiens donc, vous êtes journaliste. Bon, ça ira pour aujourd\'hui. Et attention, on rentre dans le bâtiment par la porte de GAUCHE.'),
('barbara_pompil', 'clickable', 'bygmalion ', 48.8412, 2.5876, 13, 'archives_factures_non_declarees', '', 'null', 0, 0, 'Vous êtes Serge Botton ? Ah non enquêteur ?! Tenez les archives des factures que vous me demandez.'),
('archives_factures_non_declarees', 'recuperable', 'bygmalion ', 48.8412, 2.5876, 13, 'reso_garantia', '', 'null', 0, 0, ''),
('siege_social_reso_garantia', 'clickable', 'reso_garantia', 60.5574, 30.2271, 9, '06 57 59 43 83', 'C\'est reso garantia, situé au nord de Saint Petersbourg, qui est au coeur de l\'affaire', 'Au nord de la ville', 0, 0, 'Привет ! Non les propriétaires ne sont pas ici, mais je peux vous donner leur numéro de téléphone'),
('voiture', 'deplacable', 'reso_garantia', 55.7454, 37.6541, 10, 'maison_familiale_sarkisov', '', 'null', 41.1058, 44.6593, ''),
('maison_familiale_sarkisov', 'clickable', 'reso_garantia', 41.1058, 44.6593, 9, 'rhinoceros', 'Nord de l\'Arménie', 'L\'Arménie c\'est un des pays du caucase', 0, 0, 'Bonjour l\'étranger. Nous acceptons de parler mais étant fan de rhinocéros vous devez d\'abord nous apporter un spéciemen du parc Kruger en Afrique du Sud.'),
('rhinoceros', 'recuperable', 'reso_garantia', -23.988, 31.554, 9, 'papier_sarkisov', 'Nord Est de l\'Afrique du Sud', 'null', 0, 0, ''),
('papier_sarkisov', 'recuperable', 'reso_garantia', 41.1058, 44.6593, 9, 'commissariat', 'Le papier est à la villa !', 'null', 0, 0, ''),
('commissariat', 'clickable', 'reso_garantia', 48.8542, 2.2688, 14, 'mandat_perquisition', 'Il faut aller dans le cabinet d\'avocat de Sarkozy. Mais il te faudra d\'abord un mandat de perquisition à la police du 16eme.', '', 0, 0, 'Bonjour Monsieur l\'inspecteur. Vous voulez un mandat de perquisition du cabinet d\'avocat Claude et Sarkozy avocat ? Très bien je vous le donne.'),
('mandat_perquisition', 'recuperable', 'reso_garantia', 48.8542, 2.2688, 14, 'claude_et_sarkozy_avocats', '', 'null', 0, 0, ''),
('claude_et_sarkozy_avocats', 'clickable', 'reso_garantia', 48.877, 2.3175, 15, 'facture_douteuse', 'Le cabinet se situe au 52 boulevard Malesherbes dans le 8eme.', 'C\'est pas assez précis ?!', 0, 0, 'La République c\'est nous ! Jamais on ne se fera perquisitionner ici !! Ah vous avez un mandat ?! Bon très bien, voici les factures que vous souhaitez.'),
('facture_douteuse', 'recuperable', 'reso_garantia', 48.877, 2.3175, 15, 'karachi', '', 'null', 0, 0, ''),
('isi', 'clickable', 'karachi', 33.7037, 73.0795, 8, 'fleurs', 'Va voir les services secrets pakistanais, dans la capitale du pays', 'Islamabad', 0, 0, 'Ah non, nous n\'avons rien à voir avec ces attentats. Ceux-ci nous ont beaucoup attristés. Voilà un bouquet de fleurs à poser en mémoire sur le lieu de l\'attentat, à Karachi. '),
('fleurs', 'deplacable', 'karachi', 33.7037, 73.0795, 8, 'garde_roi', '', 'null', 24.86, 67.01, ''),
('garde_roi', 'clickable', 'karachi', 24.6649, 46.6401, 10, '06 77 86 35 42', 'Le roi d\'Arabie Saoudite a, lui aussi, commandé des équipements militaires. Va dans son palai.', 'A Riyad', 0, 0, 'Le roi n\'est pas là. Téléphonez lui pour savoir où il est. '),
('roi', 'clickable', 'karachi', 6.5421, 72.974, 8, 'papier_roi', 'C\'est dans une petite ile au nord de l\'archipel', 'A l\'ouest du ski lanka', 0, 0, 'Pourquoi vous me déranger dans mes vacances ? Oui, certes, nous avons eu des commandes millitaires auprès de la France. Voilà la facture. Quoi encore ? Qui était l\'intermédiaire ? C\'était Ziad Takieddine. '),
('papier_roi', 'recuperable', 'karachi', 6.5421, 72.974, 8, 'ziad', '', 'null', 0, 0, ''),
('ziad', 'clickable', 'karachi', 33.6781, 35.5578, 10, 'papier_ziad', 'Il doit être dans son village natal, au Liban', 'null', 0, 0, 'Oui c\'est vrai j\'étais intermédiaire dans les deux contrats. Et il y avait bien des rétrocommissions occultes. Voilà mon témoignage enregistré.'),
('papier_ziad', 'recuperable', 'karachi', 33.6781, 35.5578, 10, 'kazakhgate', '', 'null', 0, 0, ''),
('tracfin', 'clickable', 'kazakhgate', 48.8501, 2.421, 13, 'papier_tracfin', 'Va voir Tracfin, dans la banlieu Est de Paris', 'A Montreuil', 0, 0, 'C\'est Tracfin, le service de renseignement français, chargé de la lutte contre la fraude fiscale, le blanchiment d\'argent et le financement du terrorisme, qui a sorti l\'affaire. Voilà toutes les preuves retenus par le service. '),
('papier_tracfin', 'recuperable', 'kazakhgate', 48.8501, 2.421, 12, 'senat_belge', '', 'null', 0, 0, ''),
('senat_belge', 'clickable', 'kazakhgate', 50.8469, 4.3647, 14, 'loi_belge', 'Va au Sénat belge pour lire leur loi pénale', 'A Bruxelles', 0, 0, 'C\'est la loi sur la transaction pénale votée pour réduire la peine des trois proches du président Kazakh. Nous te conseillons d\'aller voir Jean-François Etienne des Rosaies qui est président des haras nationaux français. '),
('loi_belge', 'recuperable', 'kazakhgate', 50.8469, 4.3647, 14, 'jfe', '', 'null', 0, 0, ''),
('jfe', 'clickable', 'kazakhgate', 45.3968, 1.3826, 8, 'cheval', 'Haras national de Pompadour, en Corrèze', 'null', 0, 0, 'Bonjour ! Moi je veux bien parler mais uniquement si tu ramènes au haras une race de cheval qui vient des steppes de Mongolie, le cheval de Przewalski.'),
('cheval', 'deplacable', 'kazakhgate', 48.2891, 113.043, 3, 'papier_jfe', '', 'null', 45.3968, 1.3826, ''),
('papier_jfe', 'recuperable', 'kazakhgate', 45.3968, 1.3826, 8, 'gueant', '', 'null', 0, 0, ''),
('gueant', 'clickable', 'kazakhgate', 48.8934, 2.3082, 13, 'papier_gueant_kazakhgate', 'Va voir Claude Guéant qui, au vu du nombre d\'affaires judiciaires qu’il a, doit sûrement avoir acheté un appartement près du tribunal de Paris (17eme).', 'Au nord ouest de Paris', 0, 0, 'Bonjour ! Tiens, voilà un dossier contenant des photos qui atteste des entrevus avec le président Kazakh, Noursoultan Nazarbaïev.'),
('papier_gueant_kazakhgate', 'recuperable', 'kazakhgate', 48.8934, 2.3082, 13, 'libye', '', 'null', 0, 0, ''),
('kadhafi', 'clickable', 'libye', 32.8722, 13.1726, 9, 'ghanem', 'Kadhafi était dictateur de la Libye, il siégeait à la capitale', 'null', 0, 0, 'Eh non, révise ton cours d\'histoire, je suis mort en 2011, parce que le Conseil national de transition (CNT), aidé notamment de la France de Sarkozy m\'a tué. Va plutôt voir Choukri Gnanem.'),
('ghanem', 'clickable', 'libye', 48.238, 16.3907, 12, 'salah', 'Il est à Vienne, à coté du Danube', 'En Autriche', 0, 0, 'Mince ! Moi aussi je suis mort mystérieusement le 29 avril 2012, noyé dans le Danube le lendemain de la publication du scandale par Médiapart. Va voir l\'ancien interlocuteur entre la France et la Libye, Béchir Salah.'),
('salah', 'clickable', 'libye', -26.199, 28.0432, 12, 'djouhri', 'Il est à Johannesburg', 'En Afrique du Sud', 0, 0, 'Mince ! Justement début 2018, j\'ai été visé par une tentative d\'assassinat dans cette ville et j\'ai reçu six balles dans la poitrine. Selon mes proches, je m\'apprêtait à transmettre à la justice française des informations sur l\'affaire. Depuis, je me cache ... Va plutôt voir Alexandre Djouhri, un des interlocuteurs côté français.'),
('djouhri', 'clickable', 'libye', 51.5175, -0.0586, 13, 'papier_djouhri', 'Il est à Londres, dans le centre ville', 'A l\'hopital principal', 0, 0, 'Mince ! Justement je suis hospitalisé car j\'ai été victime d\'une attaque cardique et placé en coma artificiel. Heureusement maintenant ça va mieux. Tiens, voilà un document montrant nos allés et venus en Libye avec Claude Guéant. Je te conseille d\'ailleur d\'aller voir son coffre.'),
('papier_djouhri', 'recuperable', 'libye', 51.5175, -0.0586, 13, 'coffre_bnp', '', 'null', 0, 0, ''),
('coffre_bnp', 'clickable', 'libye', 48.8717, 2.3377, 14, 'papier_bnp', 'Guéant a ouvert un coffre secret à la BNP pour la campagne de Sarkozy. C\'est au siège social de la BNP', 'A Paris', 0, 0, 'Oui, ce coffre a bien été ouvert en 2007. Voilà un papier l\'attestant. '),
('papier_bnp', 'recuperable', 'libye', 48.8717, 2.3377, 14, 'fin', '', 'null', 0, 0, '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
