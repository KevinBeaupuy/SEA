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
              console.log("passe par la");
              addIconInventaire(data[0]["nom"]);

              mymap.removeLayer(marker);
              //mymap.clearAllEventListeners('zoomend'); pk il y a ca ici ?

              appel(data[0]["bloque"])
            })




            // marker.on('dblclick', addIconInventaire(nom));

          } else if (data[0]["type"] == "deplacable"){
            marker.bindPopup('Déplace moi !');
            //var estArrive = cibleMarker(data[0]);
            //while (!(estArrive)){
                //var estArrive = cibleMarker(data[0]);
            //} // idée : on test quand on lanche l'objet

            marker.addEventListener('mouseup', function(){
              mymap.clearAllEventListeners('zoomend');

              var coordBrut = marker.getLatLng();
              var coordString = coordBrut.toString();

              if (cibleMarker(data[0],stringToCoordonnee(coordString)[0], stringToCoordonnee(coordString)[1])){
                console.log("reussi");

              appel(data[0]["bloque"])}})


          } else {  //sinon, on affiche le dialogue attaché
            marker.bindPopup(`${data[0]["dialogue"]}`);

            marker.addEventListener('click', function() {
              /*if (data[0]["bloque"])=="telephone" {
                telephone(data[0])
              }
              else {*/
              appel(data[0]["bloque"])

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


function deg2rad (angle) {
 return (angle / 180) * Math.PI;
}

function cibleMarker(objet, x1, y1){
  // en partie repris du site https://dotclear.placeoweb.com/post/Formule-de-calcul-entre-2-points-wgs84-pour-calculer-la-distance-qui-separe-ces-deux-points
  //fonction a changer quand la colonne des x cibles sera des entiers et non plus des string
  //console.log(x1);
  // console.log(y1);
  // console.log(objet["x_cible"]);
  // console.log(objet["y_cible"]);


  var r = 6366;


  lat1 = deg2rad(parseInt(x1));
  lon1 = deg2rad(parseInt(y1));
  lat2 = deg2rad(parseInt(objet["x_cible"]));
  lon2 = deg2rad(parseInt(objet["y_cible"]));

  var ds = Math.acos( Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1-lon2) );
  ds = ds * r; // c'est la distance à plat
  console.log(ds);
  return ds<10;
  //return (distance(parseInt(x1),parseInt(y1),parseInt(objet["x_cible"]),parseInt(objet["y_cible"]))<100)//00/parseInt(objet["niv_zoom_min"]))

}

function stringToCoordonnee(chaineCaractere){
  //on localise les éléments indésirables dans la chaine de caractère
  var premiereParenthese = chaineCaractere.indexOf("(");
  var deuxiemeParenthese = chaineCaractere.indexOf(")");
  var virgule = chaineCaractere.indexOf(",");

  var x = chaineCaractere.substring(premiereParenthese+1,virgule);
  var y = chaineCaractere.substring(virgule+1,deuxiemeParenthese);

  return [x,y]
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
appel('jfe')

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
