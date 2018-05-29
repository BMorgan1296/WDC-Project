
$(document).ready(function(){

$.ajax({
    url: '/UserInfo.json',
    type: 'POST',
    dataType: 'json',
    success: function (info) 
    {
        var user = info[0];
        console.log(user);
        $("#gender").val(user.gender);
        $("#fName").val(user.first_name);
        $("#sName").val(user.last_name);
        $("#number").val(user.contact);
        $("#address").val(user.address);
        $("#postcode").val(user.postcode);
        $("#city").val(user.city);
        $("#country").val(user.country);
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