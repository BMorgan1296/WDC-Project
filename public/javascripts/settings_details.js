$(document).ready(function(){
    /*$.ajax({
        url: '/login.json',
        type: 'POST',
        success: function (data) {
            console.log("Wee")
            console.log(data);
            if(data=="-1"){
                window.location.href = '/index.html';
            }
        }
    });*/
    var info;
    $.ajax({
        type: "GET",
        url: '/UserInfo.json',
        success: function(response){
            console.log(response);
            console.log("yoyo");
            info = response;
            fillInfo();
        }
    });
    
    $("#update").on("click",function(){
        var info = {
            gender: $("input:radio[name ='gender']:checked").val(),
            fName:$("#id-address").val(),
            sName:$("#id-phone").val(),
            address:$("#address").val(),
            postcode:$("#postcode").val(),
            city:$("#city").val(),
            country:$("#country").val()
        };

        $.ajax({
            url: '/UpdateUserInfo.json',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                console.log("Yeeboi");
            },
            data: info
        });
    });
    
    function fillInfo(){
        $("#gender"+info.gender).prop("checked", true);
        $("#fName").val(info.fName);
        $("#sName").val(info.sName);
        $("#address").val(info.address);
        $("#postcode").val(info.postcode);
        $("#city").val(info.city);
        $("#country").val(info.country);
    }
});