$(document).ready(
    function(){
        $("#calculate").on("tap", function(){
            try{
                $("#answer").val(eval($("#input").val()));
            }
            catch(error){
                $("#answer").val(error);
            }
        });
        $('#backspace').on("tap", function(){
            $('#input').val($('#input').val().slice(0, -1))
        });
        $("#clear").on("tap", function(){
            $("#answer").val('');
            $("#input").val('');
        });
        $("#1").on("tap", function(){
            $("#input").val($("#input").val() + '1');
        });
        $("#2").on("tap", function(){
            $("#input").val($("#input").val() + '2');
        });
        $("#3").on("tap", function(){
            $("#input").val($("#input").val() + '3');
        });
        $("#4").on("tap", function(){
            $("#input").val($("#input").val() + '4');
        });
        $("#5").on("tap", function(){
            $("#input").val($("#input").val() + '5');
        });
        $("#6").on("tap", function(){
            $("#input").val($("#input").val() + '6');
        });
        $("#7").on("tap", function(){
            $("#input").val($("#input").val() + '7');
        });
        $("#8").on("tap", function(){
            $("#input").val($("#input").val() + '8');
        });
        $("#9").on("tap", function(){
            $("#input").val($("#input").val() + '9');
        });
        $("#0").on("tap", function(){
            $("#input").val($("#input").val() + '0');
        });
        $("#add").on("tap", function(){
            $("#input").val($("#input").val() + '+');
        });
        $("#minus").on("tap", function(){
            $("#input").val($("#input").val() + '-');
        });
        $("#multiply").on("tap", function(){
            $("#input").val($("#input").val() + '*');
        });
        $("#divide").on("tap", function(){
            $("#input").val($("#input").val() + '/');
        });
        $("#dot").on("tap", function(){
            $("#input").val($("#input").val() + '.');
        });
        $("#brackets1").on("tap", function(){
            $("#input").val($("#input").val() + '(');
        });
        $("#brackets2").on("tap", function(){
            $("#input").val($("#input").val() + ')');
        });
        $("#power").on("tap", function(){
            $("#input").val($("#input").val() + '**');
        });
        $("#00").on("tap", function(){
            $("#input").val($("#input").val() + '00');
        });
        $("#000").on("tap", function(){
            $("#input").val($("#input").val() + '000');
        });
    }
);