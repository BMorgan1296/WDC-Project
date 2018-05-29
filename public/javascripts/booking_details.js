
var id = {id:getParameterByName('roomId')};

$.ajax({
    url: '/roomInfo.json',
    type: 'POST',
    dataType: 'json',
    success: function (data) {
        var room = JSON.parse(data.room);
        var business = JSON.parse(data.business);
        $("#hotelName").html(business[0].name);
        $("#price").html(room[0].currency+" "+room[0].price);
        $("#hotelImg").html(room[0].description);
        for(var i = 0; i < room[0].max_guests; i++){
            $('#guestNum').append($('<option>', {
                value: i+1,
                text: i+1
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