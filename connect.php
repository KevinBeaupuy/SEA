<?php
//Connection à la BDD en local
//$link = mysqli_connect('localhost', 'root', 'root', 'sea');

//Connection à la BDD
$link = mysqli_connect('mysql-kevineuh.alwaysdata.net', 'kevineuh', 'root', 'kevineuh_sea');

//Vérification
if (!$link) {
  die('Erreur de connexion');
} else {
  //echo 'Succès... ';
}

//Prévention de potentiels problèmes d'encodages
mysqli_set_charset($link, "utf8");
?>
