/* exported initMap */
/* exported addMarker */
/* exported showKI */
var map;
var marker;
var uni = {lat: -34.920603, lng: 138.606228};

function initMap() 
{
   map = new google.maps.Map(document.getElementById('map'), 
   {
      zoom: 20,
      center: uni
   });   
}

function addMarker()
{
   marker = new google.maps.Marker(
   {
      position: uni,
      map: map
   });
}

function showKI()
{
   map.setZoom(10);
   map.setCenter({lat: -35.775243, lng: 137.214242});
}
