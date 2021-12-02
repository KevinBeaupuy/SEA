//------------------------------------------------------------------------------
//Variables globales
//------------------------------------------------------------------------------

//Initialisation de la carte
var mymap = L.map('map', {
    zoomSnap: 1
}).setView([48.8506, 2.3798], 17);

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

//Variables globales
var listeObjet = [];
listeObjet.push("");
var listeAffaires = ['libye','kazakhgate','karachi','reso_garantia','fin','bygmalion','bettencourt'];
var debut = new Date().getTime();
var score_tot = 0;

var inventaire1 = document.getElementById('inventaire1'); //document.getElementById('#inventaire1');
var num = document.getElementById('telephone');
var boutonTel = document.getElementById('boutonTel');


//------------------------------------------------------------------------------
//Fonctions
//------------------------------------------------------------------------------

function appel(param){
  //fetch un objet dans la bdd, l'affiche sur la carte et initialise ses interaction, avant d'appeler l'objet suivant.

  if (!(listeObjet.includes(param))){
    listeObjet.push(param);
    if (param.substring(0,2)=="06") {
      var info = document.getElementById('info');
      info.innerText = param;
    } else {
    //Cas particulier de transition entre deux scénarios
    if (listeAffaires.includes(param)){
      mediapart.bindPopup("On dirait que tu as assez d'éléments pour cette affaire, viens me les donner !");
      var info = document.getElementById('info');
      info.innerText = "Va voir médiapart" ;
      mediapart.addEventListener('popupclose', function() {
          changementAffaire(param);
      });
      mediapart.removeEventListener('popupclose', function() {
          changementAffaire(param);
      });
    } else{mediapart.bindPopup("Ca n'est pas encore fini");

  //Sinon
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
          if (mymap.getZoom()>data[0]["niv_zoom_min"]){
              //marker.addTo(mymap);
              marker.setOpacity(1);
          } else {
              //marker.remove(mymap);
              marker.setOpacity(0);
          }

          mymap.addEventListener('zoomend',function(){
              if (mymap.getZoom()>data[0]["niv_zoom_min"]){
                  marker.setOpacity(1);
              } else {
                  marker.setOpacity(0);
              }
          })

          //ajout texte sur le carnet
          $('#info').text(data[0]["info_carnet"]);

          //ajout possibilité d'ajouter un indice
          var indiceSup = document.getElementById('indiceSup');
          $('indiceText').text("");
          if (data[0]["indice"]=='null'){
              indiceSup.disabled = true;

          } else {
            $('#ecriture').get(0).play();
            indiceSup.disabled = false;
            indiceSup.addEventListener('click', function(){
                indiceText.innerText = data[0]["indice"];
              }, {once : true});
          }

          //Si l'objet est récupérable, alors on l'ajoute à l'inventaire en clickant
          if (data[0]["type"] == "recuperable") {
            marker.addEventListener('click', function(){
              addIconInventaire(data[0]["nom"]);

              //son de la récupération d'objets
              $('#recupObjet').get(0).play();

              //Maintenant que l'objet a été utilisé, on le supprime et on appel le suivant
              mymap.removeLayer(marker);
              appel(data[0]["bloque"])
            })

          //Si l'objet est déplaçable
          } else if (data[0]["type"] == "deplacable"){
            marker.bindPopup('Déplace moi !').openPopup();
            marker.addEventListener('mouseup', function(){
              mymap.clearAllEventListeners('zoomend');
              var coordBrut = marker.getLatLng();
              var coordString = coordBrut.toString();

              if (cibleMarker(data[0],stringToCoordonnee(coordString)[0], stringToCoordonnee(coordString)[1])){
                mymap.removeLayer(marker);
                appel(data[0]["bloque"]);
              }
            })

          //Sinon, on affiche le dialogue attaché
          } else {
            marker.bindPopup(`${data[0]["dialogue"]}`);
            marker.on('popupclose', function() {
              mymap.removeLayer(marker);
              appel(data[0]["bloque"]);
            },
            {once : true});
          }
        }
      })
    })
  }}}
}


function changementAffaire(nom){
  //Passe d'une affaire à une autre (6 en tout)
  updateScore();
  if (nom=='fin'){ // c'est la fin du jeu
    var d = new Date;
    var date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
    //enregistrement du score
    $.ajax({
      url: "insert_score.php",
      type: "POST",
      data: {"score":score_tot, "date":date },
      dataType: "json",
      async: true,
    })
    document.location.href="/fin.html"; //on change de page

  } else{   //On charge la nouvelle affaire
    $.ajax({
      url: "fetch_affaires.php",
      type: "POST",
      data: {"nom":nom},
      dataType: "json",
      async: true,
      success: function(data,status){
       //on supprime les objets temporaires de l'inventaire
        for (let k = 3; k <= 7; k++) {
           useIconInventaire(k);
        };
       //on fait apparaitre un affichage
        $(`.affaire`).show();
        $('#titreAffaire').text(data[0]['nom_affaire_francais']);
        $('#infoAffaire').text(data[0]['resume']);
        $('#sendAffaire').click(function(){
          $(`.affaire`).hide();
        });
        appel(data[0]['objet']); // on appelle le prochain objet
      }
    })
  }
}


//Téléphone
inventaire1.addEventListener('click', function(){

  $('#sonTel').get(0).play();
  $('.centered').show();
  $('#fin_appel').click(function(){
    num.value = "";                                     //on remet le texte par défault
    $('.centered').hide();
  })
//c'est le bouton téléphoner
  boutonTel.addEventListener('click', function(){
    var numero = num.value;

    if (numero == "06 41 43 45 47"){// numero de barbara pompili
      $('#infoTel').text("Allo ? Oui bonjour Monsieur, je suis en visite dans une école d'ingénieur sous la tutelle du Ministère de l'ecologie.");
      appel("ecole_entpe");
      appel("ecole_ensg");
      appel("ecole_enm");

    } else if (numero == "06 77 86 35 42") { //numero du roi
      $('#infoTel').text("Bonjour, je suis en vacances sur une ile artificielle des Maldives, venez me voir si vous voulez");
      appel("roi")

    } else if (numero == "06 57 59 43 83"){// numero des sarkisov
      // var infoTel = document.getElementById('infoTel');
      $('#infoTel').text("Bonjour, venez nous voir dans notre maison familiale, dans le nord de l'Arménie. C'est mal déservi par les transports alors prenez une voiture dans une de nos agences de location à Moscou");
      appel("voiture")

    } else {
      $('#infoTel').text("Numéro non attribué"); // numéro inconnu
    }
  })
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
  return ds<75; //moins de 75km : c'est la condition pour valider le déplacement
}

function stringToCoordonnee(chaineCaractere){
  //on localise les éléments indésirables dans la chaine de caractère
  var premiereParenthese = chaineCaractere.indexOf("(");
  var deuxiemeParenthese = chaineCaractere.indexOf(")");
  var virgule = chaineCaractere.indexOf(",");

  var x = chaineCaractere.substring(premiereParenthese+1,virgule);
  var y = chaineCaractere.substring(virgule+1,deuxiemeParenthese);

  return [x,y] // pour ensuite retourner les coordonnées propres
}


//Autres fonctions utiles
function creerMarker(objet){
  //Créer un marker de l'objet à ses coordonnées, et l'affiche sur la carte
  var typeObjet = objet["type"];
  var icon = L.icon({
    iconUrl: `image/${objet["nom"]}.png`,
    iconSize: [55, 55],
    popupAnchor: [0, -20]
  });
  return L.marker([objet["x"], objet["y"]], {icon: icon, zoom: 13, draggable: typeObjet=='deplacable'}).addTo(mymap);
}

function addIconInventaire(nom) {
  //Ajoute l'objet dans le premier emplacement d'inventaire libre
  var i = 1;
  while ($(`#inv${i}`).attr("src") !== "image/icons/icon_vide.png" && i<7) {
    i++;
  }
  $(`#inv${i}`).attr("src",`image/icons/icon_${nom}.png`);
  //$(`#inv${i}`).click(useIconInventaire(i)); fonctionnalité que nous n'avons pas réussi à faire fonctionner
}

function useIconInventaire(i) {
//change l'icon de l'inventaire
$(`#inv${i}`).attr("src","image/icons/icon_vide.png");
}

function updateScore() {
  //Met à jour le score, à la fin de chaque scénario
  var now = new Date().getTime();
  var time = new Date(now - debut)
  var sec = time/1000;
  var score = Math.round((100-sec/10)*100)/100; //arrondi à 10-2
  score_tot += score;
  debut = now;
  $('#timerScore').html(score_tot);
}


//------------------------------------------------------------------------------
//Main
//------------------------------------------------------------------------------

//Appel du premier objet
changementAffaire('bettencourt');
mediapart.bindPopup('Bonjour à toi ! Nous avons été initiateur de quasiment toutes affaires sur Sarkozy. Nous acceptons volontier ton aide. Tiens, voilà ta carte de presse.').openPopup();
