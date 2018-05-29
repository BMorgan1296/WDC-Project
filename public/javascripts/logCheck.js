//is logged in?
$(document).ready(function(){
    $.ajax({
                url: '/login.json',
                type: 'POST',
                success: function (data) {
                    console.log("DATA";
                    if(data==""||data==undefined){
                         window.location.href = '/index.html';
                    }
                }
            });
});