$(document).ready(function(){
    $("#updatePassword").on("click",function(){
        if($("#newPass1").val()==$("#newPass2").val()){
            var password = {
                oldPass: $("#oldPass").val(),
                newPass:$("#newPass1").val()
            }

            $.ajax({
                url: '/updatePasswordBusiness.json',
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
            }

            $.ajax({
                url: '/updateEmailBusiness.json',
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    console.log("Yeeboi");
                },
                data: email
            });
    });
});
