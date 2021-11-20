<?php
$nom=$_POST["nom"];
// $nom="parfum";

include('connect.php');

$requete = "SELECT * FROM objets where nom like '".$nom."'";
$tab=[];
if($result=mysqli_query($link,$requete)){
  while($ligne=mysqli_fetch_assoc($result)){
    //tableau associatif
    $tab[]=$ligne;
  }
}

echo json_encode($tab);
?>
