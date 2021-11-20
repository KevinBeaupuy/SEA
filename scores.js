
fetch('scores_fetch.php', {
})
.then(r => r.json())
.then(r => {
    console.log(r);
});



// $.ajax({
//   url: "scores_fetch.php",
//   type: "POST",
//   data: { text: $("p.unbroken").text() }
// })
//   .done(function( data,status ) {
//     console.log(data)
//     $("p.broken").html(data);
//   });
