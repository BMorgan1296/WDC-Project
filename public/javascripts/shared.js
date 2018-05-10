$(document).ready(function(){
    var currencies = ["AUD","CAD","USD","EUR"];
    
    updateCurrency("AUD");
    
    //on-clicks
    $("#currency").on("click",function(){
        $("#currencyDrop").slideDown();      
    });
    
    $("#Sign-in").on("click",function(){
        $("#signDrop").slideDown();
    });
    
    $(document).on("click",".fixedPopDownItem",function(){
        var val = $(this).attr('value');
        updateCurrency(val);
        $("#currencyText").text(val);
    });
    
    $("#Signup").on("click",function(){
        $("#newSignup").fadeIn();
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
        
        if(id=="newSignup"){
            $("#newSignup").fadeOut();
        }
    });
    
    function updateCurrency(current)
    {   
        console.log("Result: "+result);
        
        $("#currencyDrop").empty();
        for(var i = 0;i<currencies.length;i++){
            if(current!=currencies[i]){
                $("#currencyDrop").append("<div class='fixedPopDownItem' value='"+currencies[i]+"'>"+currencies[i]+"</div>");
            }
        }
    }


});

function changeCurr(chosenCurr)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            return this.response;
        }
    };
    var temp = {curr:chosenCurr};
    var curr = JSON.stringify(temp);
    xhttp.open("POST", "/currency.json", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(curr);
}