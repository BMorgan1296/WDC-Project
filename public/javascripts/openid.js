/* exported onSignIn*/
/* exported signOut*/
/* exported logIn*/
/* exported getUserInfo*/
/* exported gapi*/
/* exported alert*/

 function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); 
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());
        document.getElementById("gbutton").style.display = "none";
        document.getElementById("signbutton").style.display = "inline-block";
        // The ID token that need to pass to backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);

        getUserInfo({idtoken: id_token});
      };
       
         function signOut(){
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function(){
              alert("signed out");
             document.getElementById("signbutton").style.display = "none";
             document.getElementById("gbutton").style.display = "inline-block";
       });
}

              
        function logIn() {

            getUserInfo({email:document.getElementById('email').value, password:document.getElementById('password').value});
        }

       
      function getUserInfo(params) {
            // Create new AJAX request
             var xhttp = new XMLHttpRequest();
            
            // Define behaviour for a response
             xhttp.onreadystatechange = function() {

                if (this.readyState == 4 && this.status == 200) {
                     console.log(xhttp.responseText);
                    // convert from string to JSON, 
                     login = JSON.parse(xhttp.responseText);
                

                }
            };            
            
            
            xhttp.open("POST", "/login.json", true);
            
            xhttp.setRequestHeader("Content-type","application/json");
            
            // Send request
            xhttp.send(JSON.stringify(params));
    }