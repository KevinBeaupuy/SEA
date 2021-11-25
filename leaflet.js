var mymap = L.map('map', {
    zoomSnap: 0.8
}).setView([51.505, 0], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
  minZoom: 3,
}).addTo(mymap);


// Ex : https://stackoverflow.com/questions/28685613/how-to-structure-ajax-call
// explication de l'asynchrone : https://stackoverflow.com/questions/14220321/how-to-return-the-response-from-an-asynchronous-call?rq=1

function appel(param){
  //fetch un objet dans la bdd et renvoit ses attributs
  $(document).ready(function(event){
    $.ajax({
        url: "fetch.php",
        type: "POST",
        data: {"nom": param},
        dataType: "json",
        async: true,         //asynchrone, précision pour certain navigateurs (pas ceux qui pilotent les navires hein)
        success: function(data,status){
          const nom = data[0]["nom"];
          console.log(nom);
          // console.log(data[0]["type"]);
          var marker = creerMarker(data[0]);

          //Si l'objet est récupérable, alors on l'ajoute ) l'inventaire en clickant (et il n'a pas de dialogue attaché)
          if (data[0]["type"] == "recuperable") {
            //Pb : ça le modifie directement dans l'inventaire, sans faire de double click dessus ...
            console.log("BONJOUR JE SUIS RECUPERABLE\n");
            // marker.on('dblclick', addIconInventaire(nom));

          } else if (data[0]["type"] == "deplacable"){
            //idk si on peut juste modifier le draggable en true sur un marker déjà créé ?
            marker.bindPopup(`Attention je peux me déplacer !"`)

          } else {  //sinon, on affiche le dialogue attaché
            marker.bindPopup(`Je suis ${data[0]["dialogue"]}`)

            //On supprime le popup si le niveau de zoom change
            // marker.on('dblclick', addIconInventaire(nom));
            mymap.on('zoom',function(){
              mymap.removeLayer(popup)
            })
          }
        ;}
      })
    });
}

function creerMarker(objet){
  //Créer un marker de l'objet à ses coordonnées, et l'affiche sur la carte
  var icon = L.icon({
    iconUrl: `image/${objet["nom"]}.png`,
    iconSize: [45, 45],
    popupAnchor: [0, -20]
  });
  return L.marker([objet["x"], objet["y"]], {icon: icon, zoom: 13}).addTo(mymap);
}

function addIconInventaire(nom) {
  //Trouver un emplacement libre dans l'inventaire
  //Modifier le html pour afficher l'icon de l'objet récupéré
  const img = document.querySelector("#invA");
  img.src = `image/icon_${nom}.png`;
}

appel('voiture');
appel('rhinoceros');
appel('loi_belge');
appel('kadhafi');
appel('maison_familiale_sarkisov');
appel('cheval');
appel('salah');


// on ajoute un élément sur la carte
var myIcon = L.icon({
  iconUrl: 'image/ziad.png',
  iconSize: [45, 45],
  popupAnchor: [0, -20]
});

var ziadMarker = L.marker([51.5, 0], {icon: myIcon, zoom: 13}).addTo(mymap)
  .bindPopup('Je suis takieddine');


var gueantIcon = L.icon({
  iconUrl: 'image/gueant.png',
  iconSize: [45, 45],
  popupAnchor: [0, -20]
});


var bouton_recuperer ='<button id="bouton_recup" ' + '>Récupère moi </button>';
var recup = L.marker([51.6,0.1],{icon: gueantIcon, zoom:9, draggable:true}).bindPopup(bouton_recuperer);


ziadMarker.addEventListener('click',function(){

    mymap.addEventListener('zoomend',function(){
        if (mymap.getZoom()>11){
            recup.addTo(mymap);
        } else {
            recup.remove(mymap);
        }

    })

});


recup.addEventListener('dragend',function(e){
  var coord = recup.getLatLng() ;
  //on transforme les coordonnées en chaine de caractère
  var coord2 = coord.toString();

  //on localise les éléments indésirables dans la chaine de caractère
  var premiereParenthese = coord2.indexOf("(");
  var deuxiemeParenthese = coord2.indexOf(")");
  var virgule = coord2.indexOf(",");

  var x_souris = coord2.substring(premiereParenthese+1,virgule);
  var y_souris = coord2.substring(virgule+1,deuxiemeParenthese);

  if (x_souris>52) {
  alert("Attention, Claude a froid");}
});



// var papier = document.createElement("img_papier");
// papier.src = "image/papier.png";
// papier.style.maxHeight = "50px";
//
// inventaire1.appendChild(img_papier);

//
//     img.src = 'image/inventaire.png';
//     img.style.width = '350px';
//
//     return img;
//   },
//
//   onRemove: function(mymap) {
//       // Nothing to do here
//       }
//   });
//
//on ajoute l'inventaire en bas à gauche
// L.Control.Watermark = L.Control.extend({
//   onAdd: function(mymap) {
//     var img = L.DomUtil.create('img');
//
//     img.src = 'image/inventaire.png';
//     img.style.width = '350px';
//
//     return img;
//   },
  //
  // onRemove: function(mymap) {
  //     // Nothing to do here
  //     }
  // });

  // L.control.watermark = function(opts) {
  //     return new L.Control.Watermark(opts);
  // }
  //
  // L.control.watermark({ position: 'bottomleft' }).addTo(mymap);
