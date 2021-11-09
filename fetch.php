<?php
    include('connect.php');

     // solution préconisee: extraire des tableaux associatifs.
     $requete = "SELECT * FROM users";
     if ($result = mysqli_query($link, $requete)) {
       while ($ligne = mysqli_fetch_assoc($result)) {
         $tab[]=$ligne;
       }
     } else {
       echo "Erreur de requête de base de données.";
     }
?>
