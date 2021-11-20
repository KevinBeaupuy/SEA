    <?php
    include('connect.php');

    $username = $_POST["username"];
    $score =    $_POST["score"];



    $requete = "INSERT INTO `user` (`pseudo`, `temps`, `score`) VALUES
         ('maxime  ', '01:39:55', 9500),";
    $tab=[];
    if($result=mysqli_query($link,$requete)){
      while($ligne=mysqli_fetch_assoc($result)){
        $tab[]=$ligne;
      }
    }
    echo json_encode($tab);
    ?>
