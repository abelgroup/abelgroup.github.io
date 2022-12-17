$(document).ready(
    function(){
        var height = document.body.clientHeight-$('#header').height()-$('#footer').height();
        var content_h = $('#content').height();
        console.log(content_h, height);
        if(content_h < height){
            $('#content').css(
                {"height":height}
            );
        }    
    }
);