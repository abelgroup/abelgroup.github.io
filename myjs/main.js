function web_trans(id, href){
    // 网页跳转
    $(id).click(function(){
        window.location.href = href;
    });
}

function set_src(id, src){
    //设置src
    $(id).attr('src', src);
}

function remove_pop(id){
    // 移除提示框的函数
    // data-bs-toggle="popover" title="提示" data-bs-content="内容"
    if(typeof($(id).attr('data-bs-toggle'))=="undefined"){
        // console.log('pass');
    }
    else{
        $(id).removeAttr('data-bs-toggle');
        $(id).removeAttr('title');
        $(id).removeAttr('data-bs-content');
        // console.log('del');
        popoverTriggerList = null;
        popoverList = null;
    }
}

function remove_class(id, cla){
    // 如有class，去除它
    if ($(id).hasClass(cla)){
        $(id).removeClass(cla);
    }
}