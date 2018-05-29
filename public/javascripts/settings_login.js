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
    
    $("#updatePassword").on("click",function(){
        if($("#newPass1").val()==$("#newPass2").val()){
            var password = {
                oldPass: $("#oldPass").val(),
                newPass:$("#newPass1").val()
            };

            $.ajax({
                url: '/updatePasswordUser.json',
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    console.log("Yeeboi");
                },
                data: password
            });
        }
    });
    
    $("#updateEmail").on("click",function(){
            var email = {
                email: $("#newEmail").val()
            };

            $.ajax({
                url: '/updateEmailUser.json',
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    console.log("Yeeboi");
                },
                data: email
            });
    });
});
