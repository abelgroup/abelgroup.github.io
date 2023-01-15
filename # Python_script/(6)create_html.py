# from os import listdir
from json import load
from tqdm import tqdm

"""
    模板
"""
# title, scripts, nav_item(NAV_ITEM...), topic, subjects(LINE_1(VIDEO...), LINE_2(VIDEO...), LINE_3(VIDEO...))
HTML = """
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- 网页图标 -->
        <link rel="shortcut icon" type="image/x-icon" id="icon"/>
    
        <!-- 年级+学科 -->
        <title>
        
            {title}
        
        </title>
    
        <!-- 新 Bootstrap5 核心 CSS 文件 -->
        <link rel="stylesheet" href="../../Bootstrap5/bootstrap.min.css">
    
        <!-- jQuery -->
        <script src="../../jQuery/jquery-1.10.2.min.js"></script>
    
        <!--  popper.min.js 用于弹窗、提示、下拉菜单 -->
        <script src="../../Bootstrap5/popper.min.js"></script>
    
        <!-- 最新的 Bootstrap5 核心 JavaScript 文件 -->
        <script src="../../Bootstrap5/bootstrap.min.js"></script>
    
        <!-- pic_inf js -->
        <script src="../../myjs/pic_inf.js"></script>
    
        <!-- 自定义css -->
        <link rel="stylesheet" href="../../mycss/main.css">
    
        <!-- 自定义js -->
        <script src="../../myjs/main.js"></script>
    
        <script>
            $(document).ready(function(){{\n{scripts}\n}});
        </script>
    
    </head>
    <body>
    
        <!-- 导航栏 -->
        <div class="container" id="top">
            <nav class="navbar navbar-expand-sm bg-light navbar-light fixed-top">
                <!-- 左侧logo -->
                <a href="../../index.html" class="d-flex align-items-center me-md-auto text-dark text-decoration-none px-md-4">
                    <img decoding="async" id="logo" alt="logo" width="108" height="48">
                    <span class="fs-4 px-md-2">
                        教育资源收藏夹
                    </span>
                </a>
                <!-- 右侧导航 -->
                <ul class="nav nav-pills" role="tablist">
                    <li class="nav-item">
                        <div class="nav-link active" data-bs-toggle="pill" id="tograde">
                            选择年级
                        </div>
                    </li>
                    
                    {nav_item}
                    
                    <li class="nav-item">
                        <div class="nav-link" data-bs-toggle="pill" id="tofoot">
                            联系我们
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
        <!-- 导航栏 -->
    
        <!-- 学科选择 -->
        <div class="containe-fluidr pt-0 px-0" id="introduction">
            <div class="pt-0 mt-0">
                <center><hr style="width: 100%; color: #ff6196;" size="3px"></center>
            </div>
            <div class="py-5">
                <center><h1><strong>
                
                    -- {topic} --
                    
                </strong></h1></center>
                <center><hr style="width: 15%; color: #ff0000;" size="5px"></center>
                <!-- 在此各存放学科 -->
                
                    {subjects}
                    
            </div>
            <div class="pt-0 mt-0">
                <center><hr style="width: 100%; color: #ff6196;" size="3px"></center>
            </div>
        </div>
        <!-- 学科选择 -->
    
        <!-- 联系我们 -->
        <div class="container-fluid px-0" id="foot">
            <nav class="navbar navbar-expand-sm bg-light justify-content-center">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <div class="nav-link">
                            <strong>
                                如何联系我们:
                            </strong>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link" id="toqq">
                            QQ-mail
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="nav-link" id="tomygithub">
                            站长的Github
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
        <!-- 联系我们 -->      
    
    </body>
    </html>
"""
# line_1_v
LINE_1 = """
    <!-- 第1行 -->
    <div class="container px-3 py-5">
        <center>
            <div class="row">
            
                {line_1_v}
                
            </div>             
            </center>
    </div>
    <!-- 第1行 -->
"""
# line_2_v
LINE_2 = """
    <div class="pt-0 mt-0">
        <center><hr style="width: 100%; color: #ff6196;" size="3px"></center>
    </div>

    <!-- 第2行 -->
    <div class="container px-3 py-5">
        <center>
            <div class="row">

                {line_2_v}

            </div>             
            </center>
    </div>
    <!-- 第2行 -->
"""
# line_3_v
LINE_3 = """
    <div class="pt-0 mt-0">
        <center><hr style="width: 100%; color: #ff6196;" size="3px"></center>
    </div>

    <!-- 第3行 -->
    <div class="container px-3 py-5">
        <center>
            <div class="row">

                {line_3_v}

            </div>
        </center>
    </div>
    <!-- 第3行 -->
"""
# img_div_id, img_id, v_name
VIDEO = """
    <div class="col-sm-3">
        <center>
            <div class="card" id="{img_div_id}">
                <img id="{img_id}" class="card-img-top px-2 py-2">
                <div class="card-body">
                    {v_name}
                </div>
            </div>
        </center>
    </div>
"""
# to_subject_name, subject_name
NAV_ITEM = """
    <li class="nav-item">
        <div class="nav-link" data-bs-toggle="pill" id="{to_subject_name}">
            {subject_name}
        </div>
    </li>
"""
# set_src, nav_trans, v_trans
SCRIPT = """
    // 设置图片src:
    set_src("#logo", window.logo_src);

    // 设置视频图片:
    {set_src}

    // 设置首尾导航栏链接跳转:
    {nav_trans}

    // 每个页面都有的导航:
    web_trans("#tograde", '../Grade/grade_index.html');
    web_trans("#tofoot", '#foot');
    web_trans("#toqq", 'https://mail.qq.com');
    web_trans("#tomygithub", 'https://github.com/abelgroup');

    // 设置视频卡片跳转链接:
    {v_trans}
"""
grade_dict = {
    '1': '小学一年级',
    '2': '小学二年级',
    '3': '小学三年级',
    '4': '小学四年级',
    '5': '小学五年级',
    '6': '小学六年级',
    '7': '初中一年级',
    '8': '初中二年级',
    '9': '初中三年级',
    '10': '高中一至三年级',
}
subject_dict = {
    '语文': 'ch',
    '数学': 'math',
    '英语': 'en',
    '物理': 'ph',
    '化学': 'c',
    '生物': 'b',
    '地理': 'd',
    '历史': 'h',
    '信息技术': 'x',
    '道德与法治': 'dd',
    '美术': 'art',
    '音乐': 'mu',
    '体育': 'ti',
    '科学': 'ke',
    '政治': 'po',
}

with open('./all.json', 'r') as fl:
    # 所有关于pic的信息都存储于其中
    all_dict = load(fl)


def use_value_get_key(dic, value):
    """
    用字典的value获取key，必须一对一，否则报错
    :param dic: 字典
    :param value: 值
    :return: 键
    """
    key_list = [k for k, v in dic.items() if v == value]
    if len(key_list) == 1:
        return key_list[0]
    elif len(key_list) > 1:
        raise Exception("在字典{}中，值{}所对应key不唯一".format(dic, value))
    else:
        raise Exception("字典{}，值{}参数错误".format(dic, value))


def get_same_grade(grade: str) -> list:
    same_list = []
    for ht in all_dict:
        if ht.split('_')[0] == grade:
            same_list.append(ht)
    return same_list


def get_video_list(hl_name) -> list:
    v_list = [i for i in all_dict[hl_name]]
    num = len(v_list)
    lines = num // 4 + 1
    yu = num % 4
    vl = []
    for i in range(lines):
        vl.append([])
        if i == lines - 1:
            loop = yu
        else:
            loop = 4
        for _ in range(loop):
            vl[i].append(v_list.pop(0))
    return vl


def create_html(hl, folder_path):
    """
    :param folder_path: 网页所在文件夹路径
    :param hl: 网页名称.html
    """
    file_name = hl[:-5]
    grade, subject = file_name.split('_')

    # 处理title
    title = grade_dict[grade] + use_value_get_key(subject_dict, subject)

    # 处理topic
    topic = title + '课程资源'

    # 处理nav_item
    # 获取除本网页学科以外的所有本年级学科
    nav_item_list = [i for i in get_same_grade(grade) if i != file_name]
    nav = """"""
    for s in nav_item_list:
        nav += NAV_ITEM.format(to_subject_name='to_' + s,
                               subject_name=use_value_get_key(subject_dict, s.split('_')[-1])) + '\n'

    # 处理subjects
    subjects = """"""
    for i, line in enumerate(get_video_list(file_name)):
        lv = """"""
        for v in line:
            lv += VIDEO.format(img_div_id=v+'_div',
                                img_id=v,
                                v_name='《'+all_dict[file_name][v]["title"]+'》') + '\n'
        if i == 0:
            subjects += LINE_1.format(line_1_v=lv)
        elif i == 1:
            subjects += LINE_2.format(line_2_v=lv)
        elif i == 2:
            subjects += LINE_3.format(line_3_v=lv)
        else:
            print("error")

    # 处理script
    set_src = """"""
    for i in all_dict[file_name]:
        set_src += 'set_src("#{0}", window.pic_{0});'.format(i) + '\n'
    nav_trans = """"""
    for j in nav_item_list:
        nav_trans += "web_trans('#to_{0}', '../Subject/{0}.html');".format(j) + '\n'
    v_trans = """"""
    for p in [i for i in all_dict[file_name]]:
        v_trans += "web_trans('#{}_div', '{}');".format(p, all_dict[file_name][p]["href"]) + '\n'
    script = SCRIPT.format(set_src=set_src,
                           nav_trans=nav_trans,
                           v_trans=v_trans)

    # 合并为完整的html代码
    html = HTML.format(
        title=title,
        scripts=script,
        nav_item=nav,
        topic=topic,
        subjects=subjects
    )

    # save
    with open(folder_path + hl, 'w', encoding='utf8') as fp:
        fp.writelines(html)


def main(folder_path):
    # file_list = listdir(folder_path)
    file_list = [i + '.html' for i in all_dict if i != 'inf']
    for hl in tqdm(file_list):
        create_html(hl, folder_path)


if __name__ == '__main__':
    main('../WEB/Subject/')
