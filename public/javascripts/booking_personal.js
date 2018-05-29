
$(document).ready(function(){

$.ajax({
    url: '/UserInfo.json',
    type: 'GET',
    dataType: 'json',
    success: function (info) 
    {
    console.log("HERE");
        var user = JSON.parse(info.user);
        console.log(JSON.stringify(info));
        $("#gender").val(info.gender);
        $("#fName").val(info.fName);
        $("#sName").val(info.sName);
        $("#address").val(info.address);
        $("#postcode").val(info.postcode);
        $("#city").val(info.city);
        $("#country").val(info.country);
    }
});

    $("#nextButton").on("click",function(){
    
        window.location.href='/booking_confirm.html?roomId='+getParameterByName('roomId')+'&guestNum='+getParameterByName('guestNum')+'&checkIn='+getParameterByName('checkIn')+'&checkout='+getParameterByName('checkOut')+'&gender='+$("#gender").val()+'&fName='+$("#fName").val()+'&sName='+$("#sName").val()+'&address='+$("#address").val()+'&number='+$("#number").val()+'&postcode='+$("#postcode").val()+'&city='+$("#city").val()+'&country='+$("#country").val(); 
    
    });
    
});


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}