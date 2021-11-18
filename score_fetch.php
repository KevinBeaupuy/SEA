<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Départements</title>
  </head>
  <body>
    <select name="regions">
      <?php
      //importation de la bdd
      include('connect.php');
        $requete2 = "SELECT * FROM scores ORDER BY score ASC";
        $tab=[];

        if($result=mysqli_query($link,$requete)){
          while($ligne=mysqli_fetch_assoc($result)){
             $tab[]=$ligne;
           }
         } else {
           echo "Erreur de requête de base de données.";
         }

         //rédaction du tableau des scores
         $out = "<table><tr>";

         foreach($tab[0] as $key => $elem){
           $out .= "<th>".$key."</th>";
         }

         foreach($tab as $onegens){
           $out .= "</tr><tr>";
           foreach($onegens as $key => $elem){
             $out .= "<td>".$elem."</td>";
           }
         }
         $out .= "</tr></table>";
         echo $out;
      ?>
    </select>

  </body>
</html>
