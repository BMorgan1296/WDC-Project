$(document).ready(function(){
    var info;
    /*
    $.ajax({
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
    
    $.ajax({
        type: "GET",
        url: '/PaymentInfo.json',
        success: function(response){
            console.log(response);
            console.log("yoyo");
            info = response;
            fillInfo();
        }
    });
    
    $("#update").on("click",function(){
        var info = {
            cardType: $("#cardType").val(),
            cardNo:$("#cardNo").val(),
            cardVV:$("#cardVV").val(),
            expiryM:$("#expiryM").val(),
            expiryY:$("#expiryY").val()
        };

        $.ajax({
            url: '/UpdatePaymentInfo.json',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                console.log("Yeeboi");
            },
            data: info
        });
    });
    
    function fillInfo(){
        $("#cardType").val(info.cardType);
        $("#cardNo").val(info.cardNo);
        $("#cardVV").val(info.cardVV);
        $("#expiryM").val(info.expiryM);
        $("#expiryY").val(info.expiryY);
    }
});
