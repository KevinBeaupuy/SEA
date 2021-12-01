<?php
include('connect.php');

$username = $_SESSION['username'];
$score =    $_POST["score"];
$date =     date("d/m/Y");



$requete = "INSERT INTO `scores` ('username', '$score', 'date') VALUES
     ($username, $score, $date),";
$tab=[];
if($result=mysqli_query($link,$requete)){
}

session_destroy();
?>
