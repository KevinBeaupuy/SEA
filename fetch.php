<?php
$nom=$_POST["nom"];
// echo '<script>console.log("Your stuff here")</script>';


if (empty($nom)) {
  echo "c'est videeeeeeeeeee !";
}
// else
//   echo "console.log('cest pas vide !!')";


include('connect.php');
//
//      // solution préconisee: extraire des tableaux associatifs.
//      $requete = "SELECT * FROM users";
//      if ($result = mysqli_query($link, $requete)) {
//        while ($ligne = mysqli_fetch_assoc($result)) {
//          $tab[]=$ligne;
//        }
//      } else {
//        echo "Erreur de requête de base de données.";
//      }
//

$requete = "SELECT * FROM objets where nom like '".$nom."'";
$tab=[];
if($result=mysqli_query($link,$requete)){
  while($ligne=mysqli_fetch_assoc($result)){
    //tableau associatif
    $tab[]=$ligne;
    // echo $ligne
  }
}
echo json_encode($tab);
// if (sizeof($nom) != 0) {
// }
// else :
//   echo "requête vide";

?>
