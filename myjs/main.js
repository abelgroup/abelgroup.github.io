function web_trans(id, href){
    // 网页跳转
    $(id).click(function(){
        window.location.href = href;
    });
}

function set_src(id, src){
    //设置src
    $(id).attr("src", src);
}