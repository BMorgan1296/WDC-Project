var map = null;
var hotels = [];
var markers = [];
        
// Initialise map
function MapFunction() {
  geocoder = new google.maps.Geocoder();
        map = new google.maps.Map(document.getElementById('map'), {

          center: {lat: -34.9284989, lng: 138.60074559999998},
          zoom: 13,
          clickableIcons: false
        });

        var input = document.getElementById('search2');
        var searchBox = new google.maps.places.SearchBox(input);
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
    
   } 
  

// Load and show hotels on map
function showHotels() {
            
    // Create new AJAX request    
    var xhttp = new XMLHttpRequest();
                 
    // Define behaviour for a response       
    xhttp.onreadystatechange = function() {
                   
        if (this.readyState == 4 && this.status == 200) {
                        
            // convert from string to JSON, populate hotels array      
            hotels = JSON.parse(xhttp.responseText);
                          
            // Populates the map with markers      
            addMarkers();    
        }      
    };
                  
    // Initiate connection   
    xhttp.open("GET", "hotels.json", true);
                  
    // Send request    
    xhttp.send();
}

        
function addMarkers() {
        
    // Loop over hotels array      
    for (var i=0; i<hotels.length; i++){
        
        // Create new marker
        var marker = new google.maps.Marker({     
            position: {lat: hotels[i].lat, lng: hotels[i].lng},       
            map: map          
        });
                   
        // Add to markers array     
        markers.push(marker);   
    }      
    
    
// //adds details box to markers 
    var infowindow = new google.maps.InfoWindow;
        for(var i =0; i<hotels.length;i++){
            
        marker = new google.maps.Marker({
         position: {lat: hotels[i].lat, lng: hotels[i].lng},
         map: map,
         title: hotels[i].name
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i)
     {
        
         return function() {
             infowindow.setContent(hotels[i].name+"<br>Phone: "+hotels[i].phone+"<br>Address: "+hotels[i].address+ "<br>" +"<button class=moreinfo>More Info</button>");
             infowindow.open(map, marker);
         }
    })(marker, i));
  
  }

  }

