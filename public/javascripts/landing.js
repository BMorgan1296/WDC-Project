$(document).ready(function(){
    //Words shown next to search-bar
    var searchWords = ["see","experience","find","explore","go"];
  
    //updateCurrency("AUD");
    
    //Animate words next to search-bar
    var textCount = Math.floor(Math.random()*searchWords.length);
    textChange((textCount-1)%searchWords.length);
    var textEnd = textCount+searchWords.length-1;
    var textChanger = setInterval(function(){
        textChange(textCount%searchWords.length);
        textCount++;
        if(textEnd==textCount){
            clearInterval(textChanger);
        }
    }, 1500);
    function textChange(index){
        $("#searchText").fadeOut(function() {
            $(this).text(searchWords[index]).fadeIn();
        });
    }
    /*
    //on-clicks
    $("#currency").on("click",function(){
        $("#currencyDrop").slideDown();
    })
    
    $("#Sign-in").on("click",function(){
        $("#signDrop").slideDown();
    })
    
    $(document).on("click",".fixedPopDownItem",function(){
        var val = $(this).attr('value');
        updateCurrency(val);
        $("#currencyText").text(val)
    })
    
    $("#Signup").on("click",function(){
        console.log("whadup")
        $("#newSignup").fadeIn();
    })
    
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
    })
    
    function updateCurrency(current){
        $("#currencyDrop").empty();
        for(var i = 0;i<currencies.length;i++){
            if(current!=currencies[i]){
                $("#currencyDrop").append("<div class='fixedPopDownItem' value='"+currencies[i]+"'>"+currencies[i]+"</div>");
            }
        }
    }
    */
});

//SERVER REQUESTS
function search()
{
    var search = document.getElementById('searchBar').value; 
    var s = "?"+"s="; //search parameter for URL

    if(search.length == 0 || search == " ") //changes to normal mappage if search is pressed
        document.location.href = "mappage.html";
    else
    {
        var temp = search.split(" ");
        var searchWords = new Array();
        for (var i = 0; i < temp.length; i++) 
        {
            if(temp[i] !== '')
                searchWords.push(temp[i]); //makes new searchWords arrays with just actual words not blanks
        }
        for (var i = 0; i < searchWords.length; i++)
        {
            s = s+searchWords[i]; //puts ? param on the end of URL
            if(i < searchWords.length-1)
                s = s+"+";
        }

        document.location.href = "mappage.html"+s; //changes page to mapppage with the params
    }                
}