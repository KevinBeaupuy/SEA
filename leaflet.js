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
          var info = document.getElementById('info');
          info.innerText = data[0]["info_carnet"];

          //ajout possibilité d'ajouter un indice
          var indiceSup = document.getElementById('indiceSup');
          var indiceText = document.getElementById('indiceText');
          indiceText.innerText = "";
          if (data[0]["indice"]=='null'){
              indiceSup.disabled = true;

          } else {
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
              var audio = document.querySelector('#recupObjet');
              audio.play();

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
            }, {once : true});

          }
        }
      })
    })
  }}}
}


function changementAffaire(nom){
  //c'est la fonction qui passe d'une affaire à une autre (6 en tout)
 updateScore();
  if (nom=='fin'){ // c'est la fin du jeu
    var d = new Date;
    var date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
    //enregistrement du score
    $.ajax({
      url: "insert_score.php",
      type: "POST",
      data: {"username":'username', "score":score_tot, "date":date },
      dataType: "json",
      async: true,
    })
    document.location.href="/fin.html"; //on change de page
  } else{

 var dictObjet = {};
 var dictText = {};

 dictObjet['bettencourt'] = "carte_presse";
 dictObjet['bygmalion'] = "jean_françois_cope";
 dictObjet['reso_garantia'] = "siege_social_reso_garantia";
 dictObjet['karachi'] = "isi";
 dictObjet['kazakhgate'] = "tracfin";
 dictObjet['libye'] = 'kadhafi';

 dictText['bettencourt'] = "Lors de la campagne présidentielle de 2007, Éric Woerth, le trésorier de la campagne de Nicolas Sarkozy, aurait eu des conflits d’intérêts avec Lilliane Bettencourt, actionnaire principale de l’Oréal et la femme la plus fortunée du monde. Des soupçons de financements illégaux de la campagne sont alors révélés, Sarkozy est accusé d’abus de faiblesse et Woerth de trafic d'influence passif et de recel. Monsieur Sarkozy bénéficie finalement d’un non lieu, et Monsieur Woerth est relaxé. L’affaire est donc classée sans suite, mais la famille Bettencourt aurait retrouvé mercredi dernier un témoignage manuscrit de Liliane qui apporterait de nouvelles preuves accablantes sur Sarkozy !";
 dictText['bygmalion'] = "Lors de sa campagne présidentielle de 2012, Monsieur Sarkozy et son parti ont largement dépassé le plafond financier alloué. Ils ont alors tenté de dissimuler cet excès en fabriquant de toute pièce des fausses factures avec la compagnie de communication Bygmalion. À ce jour, il est condamné à un an de prison ferme pour financement illégal de sa campagne électorale. Mais comme il a fait appel, nous avons plus de temps pour éclaircir les points encore flous de cette histoire."
 dictText['reso_garantia'] = "Cette affaire encore récente a été révélée cette année : des soupçons de « trafic d’influence » et de « blanchiment de crime ou de délit » pour sa rémunération par la société d'assurances russe Reso-Garantia. Plusieurs transferts d’argents importants ont été effectués pour des raisons plus que suspicieuses, afin qu’il ne puisse esquiver cette affaire, trouvez vite les preuves qui l’incriminent !";
 dictText['karachi'] = "En 1994, la France passe des contrats d’armements avec le Pakistan et l’Arabie Saoudite. Il y aurait eu des rétrocommissions (chose illégale en France) qui auraient servi à Monsieur Balladur pour financer sa campagne présidentielle. Sarkozy était alors ministre des Finances et porte-parole de la campagne de Balladur. Un attentat contre des français à Karachi fait 14 morts et aurait été organisé par les services secrets pakistanais pour se venger de la fin des commissions de la part de la France. Actuellement Monsieur Sarkozy n’est que témoin assisté de l’affaire, mais peut être saurez vous trouver des preuves supplémentaires de son implication.";
 dictText['kazakhgate'] = "En 2010, sous la présidence de Nicolas Sarkozy, la France passe un contrat d’armement de 45 hélicoptères avec le Kazakhstan. Il y aurait eu des rétrocommissions (toujours illégales) et les enquêteurs soupçonnent l’équipe du président Monsieur Sarkozy d’avoir fait pression sur le Sénat belge. Afin d’obtenir la signature du contrat, ils auraient pris une décision favorable à trois hommes d’affaires d’origine kazakh poursuivis en Belgique. En particulier Claude Guéant et Jean-François Etienne des Rosaies, deux proches de Sarkozy, ont été interrogés et mis en garde à vue dans cette affaire de « corruption d’agents publics étrangers » et de « blanchiment en bande organisée ». Cependant, Monsieur Sarkozy n’a jamais pu être directement mis en cause, alors allez-y, attrapez-nous cette anguille.";
 dictText['libye'] = "Comme vous le savez, Monsieur Sarkozy s’est présenté plusieurs fois aux présidentielles en France. Et qui dit nouvelle campagne de Sarkozy, dit nouveaux financements suspicieux et donc nouvelle chance de le coffrer ! Pour sa campagne de 2007, il est donc soupçonné d’avoir reçu des fonds venus du régime de l’ancien dictateur libyen, Kadhafi. Il est mis en examen pour « corruption passive », « financement illégal de campagne électorale », « recel de fonds publics libyens » et « association de malfaiteurs ». Choukri Ghanem était ministre du pétrole en Libye et aurait un carnet sur lequel serait marqué les différents transferts d’argent à Sarkozy.  Béchir Salah était l'interlocuteur direct entre la Libye et la France. Alexandre Djouhri accompagnait Claude Guéant, directeur de cabinet et proche de Sarkozy, lors des voyages en Syrie. Il y a beaucoup de témoins dans cette affaire. Allez les rencontrer pour résoudre cette affaire !";

//on supprime les objets en inventaire
 for (let k = 3; k <= 7; k++) {
    useIconInventaire(k);
 };
//on fait apparaitre un affichage
 var popup = document.querySelector(`.affaire`);
 var infoAffaire = document.getElementById('infoAffaire');
 var titreAffaire = document.getElementById('titreAffaire');
 var sendAffaire = document.getElementById('sendAffaire');
 titreAffaire.innerText = nom;
 infoAffaire.innerText = dictText[nom];
 popup.style.display = "block";

 sendAffaire.addEventListener('click', function(){
 popup.style.display = "none";
    })
 appel(dictObjet[nom]); // on appelle le prochain objet
  }
}


//Téléphone
inventaire1.addEventListener('click', function(){

  var audio = document.querySelector('#sonTel');
  audio.play();
  var popup = document.querySelector('.centered');
  popup.style.display = "block";
  var bouton_fin_appel = document.querySelector('#fin_appel');
  bouton_fin_appel.addEventListener('click', function(){
    num.value = "";                                     //on remet le texte par défault
    var popup = document.querySelector('.centered');
    popup.style.display = "none";
  })
//c'est le bouton téléphoner
  boutonTel.addEventListener('click', function(){
    var numero = num.value;

    if (numero == "06 41 43 45 47"){// numero de barbara pompili
      var infoTel = document.getElementById('infoTel');
      infoTel.innerText = "Allo ? Oui bonjour Monsieur, je suis en visite dans une école d'ingénieur sous la tutelle du Ministère de l'ecologie."

      appel("ecole_entpe");
      appel("ecole_ensg");
      appel("ecole_enm");

    }
     else{
      if (numero == "06 77 86 35 42"){//numero du roi
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
          infoTel.innerText = "Numéro non attribué" // numéro inconnu
        }
      }
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
    iconSize: [45, 45],
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
document.getElementById('inv'+i.toString()).src = 'image/icons/icon_vide.png';
}

function updateScore() {
  //Met à jour le score, à la fin de chaque scénario
  var now = new Date().getTime();
  var time = new Date(now - debut)
  var sec = time/1000;
  var score = Math.round((60-sec/10)*100)/100; //arrondi à 10-2
  $('#timerScore').html(score);
  score_tot += score;
}



//------------------------------------------------------------------------------
//Main
//------------------------------------------------------------------------------

//Appel du premier objet
changementAffaire('bettencourt');
mediapart.bindPopup('Bonjour à toi ! Nous avons été initiateur de quasiment toutes affaires sur Sarkozy. Nous acceptons volontier ton aide. Tiens, voilà ta carte de presse.').openPopup();
