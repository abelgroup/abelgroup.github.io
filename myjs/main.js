// 是否启用本地图片:
// true则使用本地图片
// false则使用SM.MS图床图片外链
const USE_LOCAL_SRC = true;


function load_src(pagename, base=true){
    // 此函数作用为加载所有所需的图片src变量
    // pagename为网页名称

    // 本地方式
    if(USE_LOCAL_SRC){
        // 任意网页均需加载的图片：
        load_both_local(pagename);
        if(base){
            // 加载本地图片
            load_loacl(pagename);
        }
    }
    // SM.MS方式
    else{
        // 任意网页均需加载的图片：
        load_both_smms()
        if (base){
            // 加载SMMS外链
            load_smms(pagename);
        }
    }
}

function get_location(pagename){
    if(pagename == 'index'){
        web_file_location = './';
    }
    else{
        web_file_location = '../../';
    }
    return web_file_location;
}

function load_both_local(pagename){
    // 以本地方式加载任意网页均需加载的图片
    var inf = window.both;
    var key = Object.keys(inf);
    for (var i=0;i<key.length;i++){
        window[key[i]] = get_location(pagename) + inf[key[i]]['loacl'];
    }
}

function load_both_smms(){
    // 以smms方式加载任意网页均需加载的图片
    var inf = window.both;
    var key = Object.keys(inf);
    for (var i=0;i<key.length;i++){
        window[key[i]] = inf[key[i]]['smms'];
    }
}

function load_loacl(pagename){
    // 加载本地图片
    var inf = window.pic_inf[pagename];
    var key = Object.keys(inf);
    for (var i=0;i<key.length;i++){
        window['pic_' + key[i]] = get_location(pagename) + 'Pic/' + key[i] + '.jpg';
    }
}

function load_smms(pagename){
    // 加载SMMS外链
    var inf = window.pic_inf[pagename];
    var key = Object.keys(inf);
    for (var i=0;i<key.length;i++){
        window['pic_' + key[i]] = inf[key[i]];
    }
}

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

function add_icon_pic(){
    // 加载网页图标的函数
    $('#icon').attr('href', window.pic_icon);
}

// 设置年级的跳转的函数
function click_to_change_web_trans(id, href){
    $(id).click(function(){
        window.location.href = '#foot';
        remove_pop('#tograde');
        web_trans("#tograde", href);
    });
}

// grade页面调整导航栏active的方法
function click_change_active(id){
    $(id).click(function(){
        remove_class('#tohome', 'active');
        remove_class('#toprimary', 'active');
        remove_class('#tojunior', 'active');
        remove_class('#tosenior', 'active');
        remove_class('#touniversity', 'active');
        remove_class('#tofoot', 'active');
        $(id).addClass('active', 'active');
    })
}

// // 页面调整导航栏active的方法
// function click_change_active_2(id_list){
//     var l = id_list.length;
//     for (var i=0;i<l;i++){
//         $(id_list[i]).click(
//             function(){
//                 for (var j=0;j<l;j++){
//                     remove_class(id_list[j], 'active');
//                 }
//                 $(id_list[i]).addClass('active', 'active');
//             }
//         );
//     }
// }

// 自动调用的页面加载函数
(function(){
    var path = window.location.pathname.split('/');
    if(path[path.length-1] == 'index.html'){
        // /index.html
        // 加载index页面图片src
        load_src('index');
    }
    else if(path[path.length-1] == 'grade_index.html'){
        // grade_index.html
        // 只加载基础图片src
        load_src('grade', false);
    }
    else if(path[path.length-1].split('_')[0] == 'grade'){
        // grade_1.html~grade_10_.html的网页
        // 加载grade页面图片src
        load_src('grade');
    }
    else{
        // subject内的网页
        load_src(path[path.length-1].split('.')[0]);
    }
    // 加载网页图标
    add_icon_pic();
})();