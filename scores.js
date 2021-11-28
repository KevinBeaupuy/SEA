//
// fetch('scores_fetch.php', {
// })
// .then(r => r.json())
// .then(r => {
//     console.log(r);
// });


console.log(location.pathname);
if (location.pathname == "/game.html") {
  $.ajax({
    url: "scores_fetch_best.php",
    type: "POST",
    dataType: "json",
    data: {}
  })
    .done(function( data,status ) {

      //Selecteur du tableau html
      $("#tab_score").html(data);
    });
}

else {
  $.ajax({
    url: "scores_fetch.php",
    type: "POST",
    dataType: "json",
    data: {}
  })
    .done(function( data,status ) {

      //Selecteur du tableau html
      $("#tab_score").html(data);
    });
}
