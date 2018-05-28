 function SignIn() {
         var xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function() {
            
                if (this.readyState == 4 && this.status == 200) {
                
                    // convert from string to JSON, 
                    signup = JSON.parse(xhttp.responseText);  
                }
             };
         xhttp.open("POST", "/signup.json", true);      
         xhttp.setRequestHeader("Content-type","application/json");
         var newUser= {fullName:document.getElementById('nameS').value, email:document.getElementById('emailS').value,password:document.getElementById('passwordS').value} 
         xhttp.send(JSON.stringify(newUser)); 
        }


