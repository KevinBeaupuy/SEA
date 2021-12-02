<?php
$affaire = $_POST["nom"];
// $affaire = "bettencourt";

include('connect.php');

$requete = "SELECT * FROM affaires where affaire = '".$affaire."'";
$tab=[];
if($result=mysqli_query($link,$requete)){
  while($ligne=mysqli_fetch_assoc($result)){
    //tableau associatif
    $tab[]=$ligne;
  }
}

echo json_encode($tab);
?>
