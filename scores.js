//
// fetch('scores_fetch.php', {
// })
// .then(r => r.json())
// .then(r => {
//     console.log(r);
// });



// $.ajax({
//   url: "scores_fetch.php",
//   type: "POST",
//   dataType: "json",
//   data: {}
// })
//   .done(function( data,status ) {
//
//     //Selecteur du tableau html
//     $("#tab_score").html(data);
//   });


  console.log(location.pathname);
  if (location.pathname == "/jeu.html") {
    console.log("path game")
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
    console.log("path scores");
    $.ajax({
      url: "scores_fetch.php",
      type: "POST",
      dataType: "json",
      data: {}
    })
      .done(function( data,status ) {

        //Selecteur du tableau html
        $("#tab_score").html(data);
        console.log(data);
      });
  }
