<?php
//Cas de la page de jeu :
//on importe uniquement les 3 meilleurs scores sans la date.

include('connect.php');

  $requete3 = "SELECT username, score FROM scores ORDER BY score ASC limit 3";
  $tab=[];
  if($result=mysqli_query($link,$requete3)){
    while($ligne=mysqli_fetch_assoc($result)){
      $tab[]=$ligne;
     }
   }

   //rédaction du tableau des scores
   $out = "<table><tr>";

   //entête
   foreach($tab[0] as $key => $elem){
     $out .= "<th>".$key."</th>";
   }

   //valeurs
   foreach($tab as $onegens){
     $out .= "</tr><tr>";
     foreach($onegens as $key => $elem){
       $out .= "<td>".$elem."</td>";
     }
   }
   $out .= "</tr></table>";

   // affichage
   echo json_encode($out);
?>
