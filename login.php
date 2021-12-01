<?php
//On démarre une nouvelle session
session_start();

//On définit des variables de session
$_SESSION['username'] = $_POST["nom"];
?>
