 var markers = [];
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          
          zoom: 25
        });
        
        var input = document.getElementById('search');
        var autocomplete = new google.maps.places.Autocomplete(input);
        var infowindow = new google.maps.InfoWindow(); 
          places = new google.maps.places.PlacesService(map);      
        autocomplete.addListener('place_changed', searchedPlace); 
      
      //place changed/////
      function searchedPlace(){
          var place = autocomplete.getPlace();
    
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
            hotels();
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  
          }     
     
   } 
}
   function hotels() {
        var searchplaces = {
          bounds: map.getBounds(),
          types: ['lodging']
        };
        places.nearbySearch(searchplaces, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Create a marker for each hotel found, and
            for (var i = 0; i < results.length; i++) {
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                icon: markerIcon
              });
            }
          }
        });
      }