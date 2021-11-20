<?php
$nom=$_POST["nom"];
// echo '<script>console.log("Your stuff here")</script>';

}
// else
//   echo "console.log('cest pas vide !!')";


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
