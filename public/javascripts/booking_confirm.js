
var id = {id:getParameterByName('roomId')};

$.ajax({
    url: '/roomInfo.json',
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
    $("#confirm").on("click",function(){
        var info = {
            roomId:getParameterByName('roomId'),
            guestNum:getParameterByName('guestNum'),
            checkIn:getParameterByName('checkIn'),
            checkOut:getParameterByName('checkOut'),
            gender: getParameterByName('gender'),
            fName:getParameterByName('fName'),
            sName:getParameterByName('sName'),
            address:getParameterByName('address'),
            number:getParameterByName('number'),
            postcode:getParameterByName('postcode'),
            city:getParameterByName('city'),
            country:getParameterByName('country')
        }
        $.ajax({
            url: '/newBooking.json',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                console.log("Yeeboi");
                window.location.href='/settings_bookings.html';
            },
            data: info
        });
    
        window.location.href='/settings_bookings.html';
    
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