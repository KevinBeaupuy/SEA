//Dans la page du jeu, on affiche seulement les 3 meilleurs scores
if (location.pathname == "/jeu.html") {
  $.ajax({
    url: "scores_fetch_best.php",
    type: "POST",
    dataType: "json",
    async: true,
    data: {},
    success: function( data,status ) {
      $("#tab_score").html(data);
    }
})

//Dans la page des scores, on les affiches tous avec la date en plus
} else {
  $.ajax({
    url: "scores_fetch.php",
    type: "POST",
    dataType: "json",
    async: true,
    data: {},
    success: function( data,status ) {
      $("#tab_score").html(data);
    }
  })
}
