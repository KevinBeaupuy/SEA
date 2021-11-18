<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Départements</title>
  </head>
  <body>
    <?php
      include('connect.php');
    ?>
    <p></p>
    <p></p>
    <p></p>
    <form action="departements.php" method="post">
      <select name="regions">
        <?php
          $out = "";
          $requete2 = "SELECT id, region FROM tbl_regions_fr ORDER BY region";
          if ($result2 = pg_query($link, $requete2)) {
             while ($ligne2 = pg_fetch_assoc($result2)) {
               $id = $ligne2["id"];
               if(isset($_POST["regions"])){
                 if($id == $_POST["regions"]){
                   $out .= "<option value='".$id."' selected>".$ligne2['region']."</option>";
                 }else{
                   $out .= "<option value='".$id."'>".$ligne2['region']."</option>";}
               }

             }
           } else {
             echo "Erreur de requête de base de données.";
           }
           echo $out;
        ?>
      </select>
      <input type="submit" name="submit" value="Envoyer">
    </form>

    <?php
      if(isset($_POST["regions"])){
        $tab = [];
        $requete = "SELECT dep, num_dep, communes FROM tbl_departements_fr WHERE id_region = '".$_POST["regions"]."'";
        if ($result = pg_query($link, $requete)) {
          while ($ligne = pg_fetch_assoc($result)) {
            $tab[] = $ligne;
          }
        } else {
          echo "Erreur de requête de base de données.";
        }

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
      }
     ?>










  </body>
</html>
