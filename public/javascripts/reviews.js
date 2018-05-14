var allReviews;
function showReview() {
    // Create new AJAX request    
    var xhttp = new XMLHttpRequest();
     
    // Define behaviour for a response   
    xhttp.onreadystatechange = function() {
              
        if (this.readyState == 4 && this.status == 200) {
                     
            // convert from string to JSON, populate content var  
            allReviews = JSON.parse(xhttp.responseText);
            var output="";
            
            //to select the second element of array as the first is for testing 
              
            for(var i=1; i<allReviews.length; i++){
                output=output+"By "+ content[i].name+" <br> "+content[i].date+" <br> "+content[i].text+"<hr>"+"<br>";
   
            }
             document.getElementById("reviews").innerHTML = output;    
            }
        };
         
    xhttp.open("GET", "reviews.json", true);          
    xhttp.send();     
}


function addReview() {
// Get variables to send as POST
var name = document.getElementById('name').value;
var date = document.getElementById('date').value;
var text = document.getElementById('text').value;
    
    var xhttp = new XMLHttpRequest();
   
    xhttp.open("POST", "addReview.json", true);
    xhttp.setRequestHeader("Content-type","application/json");
   
    xhttp.send(JSON.stringify({name:name,date:date,text:text}));
        
}
