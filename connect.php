<?php
//Connection à la BDD
$link = mysqli_connect('localhost', 'mamp', '', 'my_db');

//Vérification
if (!$link) {
  die('Erreur de connexion');
} else {
  echo 'Succès... ';
}

//Prévention de potentiels problèmes d'encodages
mysqli_set_charset($link, "utf8");
?>
