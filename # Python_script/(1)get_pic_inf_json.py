import json
import os

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

resources_path = './resources/'

pic_inf: dict = {
    '网页数量': 0,
    '视频数量': 0,
}


def save_dict_as_json(dic, path='./pic_inf.json'):
    """
    将字典存储为json文件至path
    :param path: 存储json的位置
    :param dic: 字典
    :return: None
    """
    with open(path, 'w') as fp:
        json.dump(dic, fp, indent=4, ensure_ascii=False)


def main():
    video_num = 0
    for i in range(1, 11):
        for folder in os.listdir(resources_path + str(i)):
            html_name = str(i) + '_' + subject_dict[folder]
            path = resources_path + str(i) + '/' + folder + '/' + '文件夹一' + '/'
            file_1_name = os.listdir(path)[0]
            pic_inf[html_name] = {}
            with open(path + file_1_name, 'r', encoding='utf-8') as fp:
                content = fp.readlines()
                # 处理txt文件最后一个是不是回车
                if content[-1] != '\n':
                    content.append('\n')
                if len(content) % 4 != 0:
                    raise Exception("文件{}存在问题".format(path + file_1_name))
                # 视频数量
                num = len(content) // 4
                video_num += num
                for j in range(num):
                    # j为视频序号
                    title = content[1 + 4 * j][5:].rstrip("\n").strip(" ")
                    href = content[2 + 4 * j][5:].rstrip("\n").strip(" ")
                    pic_inf[html_name][html_name + '_' + str(j)] = {
                        "title": title,
                        "href": href,
                    }
    pic_inf["网页数量"] = len(pic_inf) - 2
    pic_inf["视频数量"] = video_num
    save_dict_as_json(pic_inf)


if __name__ == '__main__':
    main()
