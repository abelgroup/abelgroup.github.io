// 是否启用本地图片:
// true则使用本地图片
// false则使用SM.MS图床图片外链
const use_local_src = true;


function load_src(pagename){
    // 此函数作用为加载所有所需的图片src变量
    // pagename为网页名称
    if(use_local_src){
        // 本地图片src
        if(pagename == 'index'){
            web_file_location = './';
        }
        else{
            web_file_location = '../../';
        }
        // 任意网页均需加载的图片：
        // logo图片
        window.logo_src = web_file_location + 'Pic/logo_3.png';
        // icon
        window.icon_src = web_file_location + 'Pic/favicon.png';
        // 加载指针
        change_cursor('cursor_local');
        if(pagename == 'index'){
            // index.html
            // 顶部轮播三张图片
            window.top_1_src = web_file_location + 'Pic/6.jpg';
            window.top_2_src = web_file_location + 'Pic/6.jpg';
            window.top_3_src = web_file_location + 'Pic/6.jpg';
            // 作者图片
            window.miao_src =  web_file_location + 'Pic/miaomiao.jpg';
            window.tao_src =  web_file_location + 'Pic/tao1.jpg';
            window.yu_src =  web_file_location + 'Pic/yuquan.jpg';
            window.fan_src =  web_file_location + 'Pic/caiqi.jpg';
        }
        else if(pagename == 'grade'){
            // 语文
            window.ch_src = web_file_location + 'Pic/ch.jpg';
            // 数学
            window.math_src = web_file_location + 'Pic/ma.jpg';
            // 英语
            window.en_src = web_file_location + 'Pic/en.jpg';
            // 物理
            window.ph_src = web_file_location + 'Pic/ph.jpg';
            // 化学
            window.c_src = web_file_location + 'Pic/c.jpg';
            // 生物
            window.b_src = web_file_location + 'Pic/b.jpg';
            // 地理
            window.d_src = web_file_location + 'Pic/d.jpg';
            // 历史
            window.h_src = web_file_location + 'Pic/h.jpg';
            // 信息技术
            window.x_src = web_file_location + 'Pic/x.jpg';
            // 小学道德与法治
            window.dd_src = web_file_location + 'Pic/dd.jpg';
            // 美术
            window.art_src = web_file_location + 'Pic/art.jpg';
            // 音乐
            window.mu_src = web_file_location + 'Pic/mu.jpg';
            // 体育
            window.ti_src = web_file_location + 'Pic/ti.jpg';
            // 小学科学
            window.ke_src = web_file_location + 'Pic/ke.jpg';
            // 政治
            window.po_src = web_file_location + 'Pic/po.jpg';
        }
    }
    else{
        // SM.MS图床src
        // 任意网页均需加载的图片：
        // logo图片
        window.logo_src = 'https://s2.loli.net/2023/01/12/cYAyfBNPRDtC249.png';
        // icon
        window.icon_src = 'https://s2.loli.net/2023/01/12/wpGnd64zheTA39g.png';
        // 加载指针
        change_cursor('cursor_web');
        if(pagename == 'index'){
            // 顶部轮播三张图片
            window.top_1_src = 'https://s2.loli.net/2023/01/12/xveSVAwYgj3mpLF.jpg';
            window.top_2_src = 'https://s2.loli.net/2023/01/12/xveSVAwYgj3mpLF.jpg';
            window.top_3_src = 'https://s2.loli.net/2023/01/12/xveSVAwYgj3mpLF.jpg';
            // 作者图片
            window.miao_src =  'https://s2.loli.net/2023/01/12/BPyaSrvFTNit5qm.jpg';
            window.tao_src =  'https://s2.loli.net/2023/01/12/B1xJ6IeTMfWoXqE.jpg';
            window.yu_src =  'https://s2.loli.net/2023/01/12/frOIxtgyRG6u5aP.jpg';
            window.fan_src =  'https://s2.loli.net/2023/01/12/N3SjFiY4lruVQgv.jpg';
        }
        else if(pagename == 'grade'){
            // 语文
            window.ch_src = 'https://s2.loli.net/2023/01/13/hta64C9HgIfeGwX.jpg';
            // 数学
            window.math_src = 'https://s2.loli.net/2023/01/13/64ZLCfaonGv3Rsj.jpg';
            // 英语
            window.en_src = 'https://s2.loli.net/2023/01/13/4nfZoEAg7bw15mY.jpg';
            // 物理
            window.ph_src = 'https://s2.loli.net/2023/01/13/SGR7yz4tPeXNAxb.jpg';
            // 化学
            window.c_src = 'https://s2.loli.net/2023/01/13/VaAew8NHupxyRLl.jpg';
            // 生物
            window.b_src = 'https://s2.loli.net/2023/01/13/uhcCmVKJv7NP1kn.jpg';
            // 地理
            window.d_src = 'https://s2.loli.net/2023/01/13/6vXe5wL1EgsopmZ.jpg';
            // 历史
            window.h_src = 'https://s2.loli.net/2023/01/13/tg5uQEXbmD3ROaz.jpg';
            // 信息技术
            window.x_src = 'https://s2.loli.net/2023/01/13/iP7vXJUonZdgVbH.jpg';
            // 小学道德与法治
            window.dd_src = 'https://s2.loli.net/2023/01/13/kNvIBJdZre1sjtR.jpg';
            // 美术
            window.art_src = 'https://s2.loli.net/2023/01/13/8ReWUYlXvySktT6.jpg';
            // 音乐
            window.mu_src = 'https://s2.loli.net/2023/01/13/p9UEIb5s4RDwXNL.jpg';
            // 体育
            window.ti_src = 'https://s2.loli.net/2023/01/13/moSewBH4diG32J6.jpg';
            // 小学科学
            window.ke_src = 'https://s2.loli.net/2023/01/13/tUQDrWZnI26liHs.jpg';
            // 政治
            window.po_src = 'https://s2.loli.net/2023/01/13/67iUcZa9KutJOgT.jpg';
        }
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
    $('#icon').attr('href', window.icon_src);
}

function change_cursor(cla){
    // 改变指针
    // cla:'cursor_local'/'cursor_web'
    $('*').addClass(cla);
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
        load_src('');
    }
    else if(path[path.length-1].split('_')[0] == 'grade'){
        // grade_1.html~grade_10_.html的网页
        // 加载grade页面图片src
        load_src('grade');
    }
    // 加载网页图标
    add_icon_pic();
})();