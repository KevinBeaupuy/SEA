var mymap = L.map('map', {
    zoomSnap: 0.8
}).setView([51.505, 0], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
  minZoom: 3,
}).addTo(mymap);

/*
// Récupération bdd
/*
fetch('fetch.php', {
})
.then(r => r.json())
.then(r => {
    console.log(r);
});*/
function appel(param){
  $(document).ready(function(event){
  console.log("test fetch 1");

    $.ajax({
                url: "fetch.php",
                type: "POST",
                data: {"nom": param},
                dataType: "json",
                async: true,
                success: function(data,status){

                  console.log(data);

                  console.log("test fetch 2");}

            })

          });
}
appel("parfum")
appel('voiture')

// on ajoute un élément sur la carte
var myIcon = L.icon({
  iconUrl: 'image/takieddine.jpg',
  iconSize: [45, 45],
  popupAnchor: [0, -20]
});

var ziadMarker = L.marker([51.5, 0], {icon: myIcon},{zoom: 13}).addTo(mymap)
  .bindPopup('Je suis takieddine');



var guantIcon = L.icon({
  iconUrl: 'image/gueant.png',
  iconSize: [45, 45],
  popupAnchor: [0, -20]
});


var bouton_recuperer ='<button id="bouton_recup" ' + '>Récupère moi </button>';
var recup = L.marker([51.6,0.1],{icon: guantIcon}, {zoom:9}).bindPopup(bouton_recuperer);


ziadMarker.addEventListener('click',function(){

    mymap.addEventListener('zoomend',function(){
        if (mymap.getZoom()>11){
            recup.addTo(mymap);
        } else {
            recup.remove(mymap);
        }

    })

});

var papier = document.createElement("papier");
papier.src = "image/papier.png";
papier.style.maxHeight = "50px";

.appendChild(img_saum);

// on ajoute l'inventaire en bas à gauche
L.Control.Watermark = L.Control.extend({
  onAdd: function(mymap) {
    var img = L.DomUtil.create('img');

    img.src = 'image/inventaire.png';
    img.style.width = '350px';

    return img;
  },

  onRemove: function(mymap) {
      // Nothing to do here
      }
  });

  L.control.watermark = function(opts) {
      return new L.Control.Watermark(opts);
  }

  L.control.watermark({ position: 'bottomleft' }).addTo(mymap);
