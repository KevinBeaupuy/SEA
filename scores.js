//
// fetch('scores_fetch.php', {
// })
// .then(r => r.json())
// .then(r => {
//     console.log(r);
// });



$.ajax({
  url: "scores_fetch.php",
  type: "POST",
  dataType: "json",
  data: {}
   // text: $("p#tab_score").text()
})
  .done(function( data,status ) {
    console.log(data)
    //Selecteur du tableau html
    $("#tab_score").html(data);
  });
