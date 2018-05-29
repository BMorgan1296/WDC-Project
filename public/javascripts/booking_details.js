
var id = {id:getParameterByName('roomId')};

$.ajax({
    url: '/roomInfo.json',
    type: 'POST',
    dataType: 'json',
    success: function (data) {
        $("#hotelName").html(data.name);
        $("#price").html("$" + data.price);
        for(var i = 0; i < data.maxGuestsl; i++){
            $('#guestNum').append($('<option>', {
                value: i,
                text: i
            }));
        }
    },
    data: id
});
$(document).ready(function(){
    $("#nextButton").on("click",function(){
    
        window.location.href='/booking_personal.html?roomId='+getParameterByName('roomId')+'&guestNum='+$("#guestNum").val()+'&checkIn='+$("#checkIn").val()+'&checkout='+$("#checkOut").val(); 
    
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