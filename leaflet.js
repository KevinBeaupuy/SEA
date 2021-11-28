var mymap = L.map('map', {
    zoomSnap: 1
}).setView([51.505, 0], 5);
/*
L.tileLayer('http://tiles.lyrk.org/ls/{z}/{x}/{y}?apikey=982c82cc765f42cf950a57de0d891076', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
  minZoom: 3,
}).addTo(mymap);*/

L.tileLayer('https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 3,
	maxZoom: 19,
	subdomains: 'abcd',
	accessToken: '3iGD1TvBMo7WDZMJi2edvDBN9hEkNSLMxQ0AMmcViGIPbC6Hvl4czS1GADGxdLAO'
}).addTo(mymap);


//Premier objet chargé en même temps que le début du jeu
//Celui ci restera d'ailleurs permanent
var mediapartIcon = L.icon({
  iconUrl: 'image/mediapart.png',
  iconSize: [45, 45],
  popupAnchor: [0, -20]
});
var mediapart = L.marker([48.8506, 2.3798], {icon: mediapartIcon, zoom: 13}).addTo(mymap);

var listeAffaires = ['libye','kazakhgate','karachi','reso_garantia','fin','bygmalion','bettencourt'];


function appel(param){
  //fetch un objet dans la bdd, l'affiche sur la carte et initialise ses interaction, avant d'appeler l'objet suivant.
  if (!(param=="")){
    if (listeAffaires.includes(param)){
      mediapart.bindPopup("On dirait que tu as assez d'éléments pour cette affaire, viens me les donner !").openPopup();
      changementAffaire(param);
    }
    else{

  $(document).ready(function(event){
    $.ajax({
        url: "fetch.php",
        type: "POST",
        data: {"nom": param},
        dataType: "json",
        async: true,         //asynchrone, précision pour certain navigateurs (pas ceux qui pilotent les navires hein)
        success: function(data,status){
          const nom = data[0]["nom"];

          //création du marker
          var marker = creerMarker(data[0]);
          mymap.addEventListener('zoomend',function(){
              if (mymap.getZoom()>7){
                  marker.addTo(mymap);
              } else {
                  marker.remove(mymap);
              }
          })
          //Si l'objet est récupérable, alors on l'ajoute à l'inventaire en clickant
          if (data[0]["type"] == "recuperable") {
            marker.addEventListener('click', function(){
              addIconInventaire(data[0]["nom"]);

              //son de la récupération d'objets
              var audio = document.getElementById("recupObjet");
              audio.play();

              //Maintenant que l'objet a été utilisé, on le supprime et on appel le suivant
              mymap.removeLayer(marker);
              appel(data[0]["bloque"])
            })

          //Si l'objet est déplaçable
          } else if (data[0]["type"] == "deplacable"){
            marker.bindPopup('Déplace moi !');

            marker.addEventListener('mouseup', function(){
              mymap.clearAllEventListeners('zoomend');

              var coordBrut = marker.getLatLng();
              var coordString = coordBrut.toString();

              if (cibleMarker(data[0],stringToCoordonnee(coordString)[0], stringToCoordonnee(coordString)[1])){

              appel(data[0]["bloque"]);
              }
            })

          //Sinon, on affiche le dialogue attaché
          } else {
            marker.bindPopup(`${data[0]["dialogue"]}`);
            marker.addEventListener('click', function() {

              appel(data[0]["bloque"]);
            })
            //On ferme le popup si le niveau de zoom change
            mymap.on('zoom',function(){
              mymap.closePopup()
            })
          }
        ;}
      })
    });
}}}


function changementAffaire(nom){
/*  cette partie ne marche pas ... du coup je l'ai fait en moins propre apres
var i = 4;

    var img = document.getElementById('inv'+i);
 while (img.src !== "http://www.localhost/image/icons/icon_vide.png" && i<7){

   var img = document.getElementById('inv'+i);
   console.log('inv'+i);

   img.addEventListener('click', function(){
     img.src = "http://www.localhost/image/icons/icon_vide.png";
     console.log("un tour");
   })
   i++;
 }}*/

 var img4 = document.querySelector('#inv4');
 img4.addEventListener('click', function(){
   img4.src = "http://www.localhost/image/icons/icon_vide.png"
 })


 var img5 = document.querySelector('#inv5');
 img5.addEventListener('click', function(){
   img5.src = "http://www.localhost/image/icons/icon_vide.png"
 })

 var img6 = document.querySelector('#inv6');
 img6.addEventListener('click', function(){
   img6.src = "http://www.localhost/image/icons/icon_vide.png"
 })

 var img7 = document.querySelector('#inv7');
 img7.addEventListener('click', function(){
   img7.src = "http://www.localhost/image/icons/icon_vide.png"
 })


 if (nom=='fin'){ // c'est la fin du jeu
   document.location.href="/fin.html";
 }
 else{

 var dict = {};

 dict['bygmalion'] = "jean_françois_cope";
 dict['reso_garantia'] = "siege_social_reso_garantia";
 dict['karachi'] = "isi";
 dict['kazakhgate'] = "tracfin";

 var popup = document.querySelector(`.affaire`);
 var infoAffaire = document.getElementById('infoAffaire');
 infoAffaire.innerText = " des infos quali"
 popup.style.display = "block";

 appel(dict.nom);

}}


//Téléphone
var inventaire1 = document.getElementById('inventaire1'); //document.getElementById('#inventaire1');
var num = document.getElementById('telephone');
var boutonTel = document.getElementById('boutonTel');

inventaire1.addEventListener('click', function(){

  var popup = document.querySelector('.centered');
  popup.style.display = "block";
  var bouton_fin_appel = document.querySelector('#fin_appel');
  bouton_fin_appel.addEventListener('click', function(){
    var popup = document.querySelector('.centered');
    popup.style.display = "none";
  })

  boutonTel.addEventListener('click', function(){
  var numero = num.value;

  if (numero == "06 41 43 45 47"){// numero de barbara pompili
    //var popup = document.querySelector(`.popup`);
    var infoTel = document.getElementById('infoTel');
    infoTel.innerText = "Allo ? Oui bonjour Monsieur, je suis en visite dans une école d'ingénieur sous la tutelle du Ministère de l'ecologie."
    //popup.style.display = "block";

    appel("ecole_entpe");
    appel("ecole_ensg");
    appel("ecole_enm");

  }
   else{
  if (numero == "06 77 86 35 42"){//numero du roi
    //var popup = document.querySelector(`.popup`);
    var infoTel = document.getElementById('infoTel');
    infoTel.innerText = "Bonjour, je suis en vacances sur une ile artificielle des Maldives, venez me voir si vous voulez"

    appel("roi")

  } else {
  if (numero == "06 57 59 43 83"){// numero des sarkisov
    var infoTel = document.getElementById('infoTel');
    infoTel.innerText = "Bonjour, venez nous voir dans notre maison familiale, dans le nord de l'Arménie. C'est mal déservi par les transports alors prenez une voiture dans une de nos agences de location à Moscou"
    appel("voiture")
  }
  else {
    var infoTel = document.getElementById('infoTel');

    infoTel.innerText = "Numéro non attribué"

  }
}}})
})


//calcul distance pour objets déplacables
function deg2rad (angle) {
 return (angle / 180) * Math.PI;
}

function cibleMarker(objet, x1, y1){
  // en partie repris du site https://dotclear.placeoweb.com/post/Formule-de-calcul-entre-2-points-wgs84-pour-calculer-la-distance-qui-separe-ces-deux-points
  //fonction a changer quand la colonne des x cibles sera des entiers et non plus des string
  var r = 6366;

  lat1 = deg2rad(parseInt(x1));
  lon1 = deg2rad(parseInt(y1));
  lat2 = deg2rad(parseInt(objet["x_cible"]));
  lon2 = deg2rad(parseInt(objet["y_cible"]));

  latMediapart = deg2rad(48.8506);
  lonMediapart = deg2rad(2.3798);

  var ds = Math.acos( Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1-lon2) );
  ds *= r; // c'est la distance à plat

  var dsMediapart = Math.acos( Math.sin(lat1) * Math.sin(latMediapart) + Math.cos(lat1) * Math.cos(latMediapart) * Math.cos(lon1-lonMediapart) );
  dsMediapart *= r;

  if (dsMediapart < 100) {
    mediapart.bindPopup("Ce n'est pas à nous que tu dois donner l'objet !").openPopup();
  };
  return ds<15;
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


//Autres fonctions utiles
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
  //Ajoute l'objet dans le premier emplacement d'inventaire libre
  var i = 1;
  while ($(`#inv${i}`).attr("src") !== "image/icons/icon_vide.png" && i<=7) {
    i++;
  }
  $(`#inv${i}`).attr("src",`image/icons/icon_${nom}.png`);
  // $(`#inv${i}`).on('click',useIconInventaire(i));
  $(`#inv${i}`).click(useIconInventaire(i));
}

function useIconInventaire(i) {
  // $(`#inv${i}`).attr("src",'image/icons/icon_vide.png');


  $(`#inv${i}`).off("click");
  // var img = document.querySelector(`#inv${i}`);
  // if ($(`#inv${i}`).attr("src") !== "image/icons/icon_vide.png") {
  //   console.log("cet objet est actuellement inutile");
  // } else {
  //   $(`#inv${i}`).attr("src", `image/icons/icon_vide.png`);
  //   $(`#inv${i}`).off("click");
    // img.removeEventListener('click', useIconInventaire(i));

  // }
}

appel('papier_ziad');
appel('loi_belge');
//appel('coffre_bnp');


/*
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
*/
