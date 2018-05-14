$(document).ready(function(){
    var info;
    $.ajax({
        type: "GET",
        url: '/BusinessInfo.json',
        success: function(response){
            console.log(response);
            console.log("yoyo");
            info = response;
            fillInfo();
        }
    });
    
    $("#update").on("click",function(){
        var info = {
            name:$("#name").val(),
            contact:$("#contact").val(),
            address:$("#address").val(),
            suburb:$("#suburb").val(),
            postcode:$("#postcode").val(),
            city:$("#city").val(),
            country:$("#country").val()
        }

        $.ajax({
            url: '/UpdateBusinessInfo.json',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                console.log("Yeeboi");
            },
            data: info
        });
    });
    
    function fillInfo(){
        $("#name").val(info.name);
        $("#contact").val(info.contact);
        $("#address").val(info.address);
        $("#suburb").val(info.suburb);
        $("#postcode").val(info.postcode);
        $("#city").val(info.city);
        $("#country").val(info.country);
    }
});