/* exported MapFunction */
/* exported searchSubmit */
/* exported searchresults */

  var map, places, infoWindow, google;
      var markers = [];
     function MapFunction() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 51.5073509, lng: -0.12775829999998223},
          zoom: 2,
          clickableIcons: false
        });
        infoWindow = new google.maps.InfoWindow({
          content: document.getElementById('info-content')
        });
       var input = document.getElementById('search2');
       var autocomplete = new google.maps.places.Autocomplete(input);
       places = new google.maps.places.PlacesService(map);
       autocomplete.addListener('place_changed', searchedPlace);
      
      function searchedPlace() {
        var place = autocomplete.getPlace();
         if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          hotels();
        } else {
          map.setCenter(place.geometry.location);
            map.setZoom(20);  
          } 
      }

      }

      function hotels() {
        var search = {
          bounds: map.getBounds(),
          types: ['lodging']
        };

        places.nearbySearch(search, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
            markers[i] = new google.maps.Marker({
            position: results[i].geometry.location,
               });
              markers[i].placeResult = results[i];
              google.maps.event.addListener(markers[i], 'click', infowindow);
               setTimeout(placemarker(i), i * 50);
            }
          }
        });
      }

      
        for (var i = 0; i < markers.length; i++) {
          if (markers[i]) {
            markers[i].setMap(null);
          }
        }
        markers = [];
      
      function placemarker(i) {
        return function() {
          markers[i].setMap(map);
        };
      }

      function searchresults(result, i) {
        var popup = document.createElement('popup');
        popup.onclick = function() {
          google.maps.event.trigger(markers[i], 'click');
        };
        }

        var results = document.getElementById('results');
        while (results.childNodes[0]) {
          results.removeChild(results.childNodes[0]);
        }
     
      function infowindow() {
        var marker = this;
        places.getDetails({placeId: marker.placeResult.place_id},
            function(place, status) {
              if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
              }
              infoWindow.open(map, marker);
              hotelInfoContent(place);
            });
      }
      
      function hotelInfoContent(place) {
             document.getElementById("name_hotel").innerHTML = 
             place.name;
        document.getElementById('hotel_address').textContent = place.vicinity;

        if (place.formatted_phone_number) {
          document.getElementById('phonerow').style.display = '';
          document.getElementById('hotel_phone').textContent =
              place.formatted_phone_number;
        } 

          if (place.rating) {
          var stars = '';
          for (var i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
              stars += '&#10025;';
            } else {
              stars += '&#10029;';
            }
          document.getElementById('rating_row').style.display = '';
          document.getElementById('hotel_rating').innerHTML = stars;
          }
        }
      }