$(document).ready(function(){
    var currencies = ["AUD","CAD","USD","EUR"];
    
    //is logged in?
    /*$.ajax({
                url: '/login.json',
                type: 'POST',
                success: function (data) {
                    console.log(data);
                    if(data!="-1"){
                        updateName();
                    }
                }
            });*/
    
    updateCurrency("AUD");
    
    //$("#Sign-in").hide();
    
    //on-clicks
    $("#currency").on("click",function(){
        $("#currencyDrop").slideDown();      
    });
    
    $("#Sign-in").on("click",function(){
        $("#signDrop").slideDown();
    });
    
    
    $("#Logged-in").on("click",function(){
        $("#loggedDrop").slideDown();
    });
    
    $(document).on("click",".fixedPopDownItem",function(){
        var val = $(this).attr('value');
        updateCurrency(val);
        $("#currencyText").text(val);
    });
    
    $("#Signup").on("click",function(){
        $("#newSignup").fadeIn();
    });
    
     $("#Log-out").on("click",function(){
         console.log("oo")
        $.ajax({
                url: '/logout',
                type: 'POST',
                success: function (data) {
                    console.log("logged Out");
                }
            });
         
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function(){
             document.getElementById("signbutton").style.display = "none";
             document.getElementById("gbutton").style.display = "inline-block";
             $("#loggedDrop").slideUp();
             $("#Sign-in").show();
             $("#Logged-in").hide();
          });
    });
    
    //off-clicks
    $(document).click(function(event){
        var id = event.target.id;
        var classes = event.target.classList;
        if((id!='currency'&&id!="currencyText")&&$("#currencyDrop").css('display') == 'block') {
            $("#currencyDrop").slideUp();
        }
        if((classes[0]!="sign")&&$("#signDrop").css('display') == 'block') {
            $("#signDrop").slideUp();
        }
        
        if((classes[0]!="logged")&&$("#loggedDrop").css('display') == 'block') {
            $("#loggedDrop").slideUp();
        }
        
        if(id=="newSignup"){
            $("#newSignup").fadeOut();
        }
    });
    
    function updateCurrency(current)
    {          
        //changeCurr(current); //need to wait for result to be defined then it can be set lower down. $("#currencyDrop").empty();
        $("#currencyDrop").empty();
        for(var i = 0;i<currencies.length;i++){
            if(current!=currencies[i]){
               $("#currencyDrop").append("<div class='fixedPopDownItem' value='"+currencies[i]+"'>"+currencies[i]+"</div>");
            }
        }               
    }
    /*function changeCurr(chosenCurr)
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {            
                console.log(this.response);
                
            }
        };
        var temp = {curr:chosenCurr};
        var curr = JSON.stringify(temp);
        xhttp.open("POST", "/currency.json", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(curr);
    }*/
    function updateName(){
        $.ajax({
                url: '/UserInfo.json',
                type: 'GET',
                success: function (data) {
                    $("#Sign-in").hide();
                    $("#Logged-in").show();
                    console.log(data);
                    $("#Logged-in").html(" "+ data.fName);
                    $("#loggedName").html(" "+ data.fName);
                }
            });
    }

});