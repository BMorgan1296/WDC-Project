
var id = {id:getParameterByName('hotelId')};

$.ajax({
    url: '/hotelInfo.json',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        $("#hotelName").html(data.name);
        $("#price").html("$" + data.price);
        $("#hotelAddress").html(data.address);
    },
    data: id
});

$(document).ready(function(){
    $("confirm").on("click",function(){
    
        window.location.href='/booking_confirm.html?hotelId='+getParameterByName('hotelId')+'&guestNum='+getParameterByName('guestNum')+'&checkIn='+getParameterByName('checkIn')+'&checkout='+getParameterByName('checkOut')+'&gender='+$("#gender").val()+'&fName='+$("#fName").val()+'&sName='+$("#sName").val()+'&address='+$("#address").val()+'&number='+$("#number").val()+'&postcode='+$("#postcode").val()+'&city='+$("#city").val()+'&country='+$("#country").val(); 
    
    });
    
    console.log(getParameterByName("fName"));
    $('#guestNum').html(getParameterByName("guestNum"));
    $('#checkIn').html(getParameterByName("checkIn"));
    $('#checkOut').html(getParameterByName("checkOut"));
    $('#name').html(getParameterByName("fName") +" " + getParameterByName("sName"));
    $('#number').html(getParameterByName("number"));
    $('#address').html(getParameterByName("address"));

});
//onclick="window.location.href='settings_bookings.html'

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}