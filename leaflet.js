var mymap = L.map('map', {
    zoomSnap: 1
}).setView([51.505, 0], 5);

L.tileLayer('http://tiles.lyrk.org/ls/{z}/{x}/{y}?apikey=982c82cc765f42cf950a57de0d891076', {
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
          var marker = creerMarker(data[0]);


          mymap.addEventListener('zoomend',function(){
              if (mymap.getZoom()>7){
                  marker.addTo(mymap);
              } else {
                  marker.remove(mymap);
              }

          })
          //Si l'objet est récupérable, alors on l'ajoute ) l'inventaire en clickant (et il n'a pas de dialogue attaché)
          if (data[0]["type"] == "recuperable") {
            marker.addEventListener('click', function(){
              addIconInventaire(data[0]["nom"]);

              mymap.removeLayer(marker);
              mymap.clearAllEventListeners('zoomend');
              appel(data[0]["bloque"])
            })




            // marker.on('dblclick', addIconInventaire(nom));

          } else if (data[0]["type"] == "deplacable"){
            //idk si on peut juste modifier le draggable en true sur un marker déjà créé ?
            marker.bindPopup('Déplace moi !')
            //var estArrive = cibleMarker(data[0]);
            //while (!(estArrive)){
                //var estArrive = cibleMarker(data[0]);
            //} // idée : on test quand on lanche l'objet
            appel(data[0]["bloque"])


          } else {  //sinon, on affiche le dialogue attaché
            marker.bindPopup(`${data[0]["dialogue"]}`);

            marker.addEventListener('click', function() {
              appel(data[0]["bloque"]);
            })


            //On supprime le popup si le niveau de zoom change
            mymap.on('zoom',function(){
              mymap.closePopup()
            })

          }
        ;}
      })
    });
}

function cibleMarker(objet, x1, y1){
return (distance(x1,y1,objet["x_cible"],objet["y_cible"])<10000/objet["niv_zoom_min"])

}


function distance(x1, y1, x2, y2){
  //donne la distance euclidienne
  var carre = Math.pow(x1-x2,2) + Math.pow(y1-y2,2);
  return Math.pow(carre,0.5);
}

function creerMarker(objet){
  //Créer un marker de l'objet à ses coordonnées, et l'affiche sur la carte
  var typeObjet = objet["type"];
  var icon = L.icon({
    iconUrl: `image/${objet["nom"]}.png`,
    iconSize: [45, 45],
    popupAnchor: [0, -20]
  });
  return L.marker([objet["x"], objet["y"]], {icon: icon, zoom: 13, draggable: typeObjet=='deplacable'}).addTo(mymap);
}

function addIconInventaire(nom) {
  //Trouver un emplacement libre dans l'inventaire
  //Modifier le html pour afficher l'icon de l'objet récupéré
  const img = document.querySelector("#invA");
  img.src = `image/icons/icon_${nom}.png`;
}



appel('voiture');
appel('rhinoceros');
appel('loi_belge');
appel('kadhafi');
appel('maison_familiale_sarkisov');
appel('cheval');
appel('salah');
appel('mandat_perquisition')
appel('roi')
appel('fleurs')
appel('ziad')

// on ajoute un élément sur la carte
var myIcon = L.icon({
  iconUrl: 'image/ziad.png',
  iconSize: [45, 45],
  popupAnchor: [0, -20]
});
/*
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
*/
