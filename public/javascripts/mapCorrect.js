/* exported MapFunction*/
/* exported showHotels*/
/* exported addMarkers*/
/* exported setRating*/

var map = null;
var hotels = [];
var markers = [];
var currRating = 0;

function setRating(given)
{
  currRating = given;
}
        
// Initialise map
function MapFunction() 
{
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

    if (places.length === 0) {
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
            // convert from string to JSON, populate hotels array!!!
            hotels = JSON.parse(xhttp.responseText);
            // Populates the map with markers      
            addMarkers();
        }      
    };
    var searchObj = {
      query:document.getElementById("search2").value,
      numGuests:document.getElementById("roomID").value,
      maxPrice:document.getElementById("Range").value,
      //amenities
      pool:document.getElementById("pool").checked | 0,
      spa:document.getElementById("spa").checked | 0,
      wifi:document.getElementById("wifi").checked | 0,
      fitness:document.getElementById("fitness").checked | 0,
      parking:document.getElementById("parking").checked | 0,
      restaurant:document.getElementById("restaurant").checked | 0,
      //ratings
      rating: currRating
    };
                  
    // Initiate connection   
    xhttp.open("POST", "hotels.json", true);
    xhttp.setRequestHeader("Content-type","application/json");
    // Send request    
    xhttp.send(JSON.stringify(searchObj));
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
    
    
var infowindow = new google.maps.InfoWindow;
        for(i =0; i<hotels.length;i++){
            
        marker = new google.maps.Marker({
         position: {lat: hotels[i].lat, lng: hotels[i].lng},
         map: map,
         pixelOffset: new google.maps.Size(400,450),
         title: hotels[i].name,
         

    });
    google.maps.event.addListener(marker, 'click', (function(marker, i)
     {
        
         return function() {
             
             // infowindow.setContent(hotels[i].name+"<br>Phone: "+hotels[i].phone+"<br>Address: "+hotels[i].address+ "<br>" +"<button class=moreinfo>More Info</button>");
             infowindow.setContent('<h2>'+hotels[i].name+'</h2>'+
              '<br>'+'<b>Phone:</b>'+ ' ' +hotels[i].phone+
              '<br>'+'<b>Adress:</b>'+ ' '+hotels[i].address+ 
              '<br>' +'<b>Moreinfo:</b>'+ ' '+ hotels[i].Moreinfo+  
              '<br>'+'<button id=moreinfo onclick=myFunction(); hoteltitle() class=moreinfo>Book</button>');
              infowindow.open(map, marker);
         }
    })(marker, i));
  
  }

  }

  

