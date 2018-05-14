//is logged in?
$(document).ready(function(){
    $.ajax({
                url: '/login.json',
                type: 'POST',
                success: function (data) {
                    console.log("Wee")
                    console.log(data);
                    if(data==""){
                         window.location.href = '/index.html';
                    }
                }
            });
});