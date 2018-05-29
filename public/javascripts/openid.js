/* exported onSignIn*/
/* exported signOut*/
/* exported logIn*/
/* exported getUserInfo*/
/* exported gapi*/
/* exported alert*/

 function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        document.getElementById("gbutton").style.display = "none";
        document.getElementById("signbutton").style.display = "inline-block";
        // The ID token that need to pass to backend:
        var id_token = googleUser.getAuthResponse().id_token; //gotten from successful login
        getUserInfo({idtoken: id_token}, profile); //checks log in, logs person in
}
       
 function signOut()
 {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function()
  {
     document.getElementById("signbutton").style.display = "none";
     document.getElementById("gbutton").style.display = "inline-block";
  });
}  

function getUserInfo(param, profile) {
  // Create new AJAX request
  var xhttp = new XMLHttpRequest();

  // Define behaviour for a response
  xhttp.onreadystatechange = function() 
  {
    if (this.readyState == 4 && this.status == 200)
    {
        // convert from string to JSON, 
        var loginName = JSON.stringify(xhttp.responseText);
        console.log(JSON.parse(loginName));     
        updateName(profile); //what does this do
    }
  };            

  xhttp.open("POST", "/login.json", true);

  xhttp.setRequestHeader("Content-type","application/json");

  // Send request
  xhttp.send(JSON.stringify(param));
}

//updates name on the header, gets send user name from backend    
function updateName(param)
{
  $.ajax({
          url: '/UserInfo.json',
          type: 'POST',
          dataType: 'json',
          success: function (data) {
              $("#Sign-in").hide();
              $("#Logged-in").show();
              console.log(param);
              $("#Logged-in").html(" "+ param.ofa);
              $("#loggedName").html(" "+ param.ofa);
          },
          data: param
      });
}