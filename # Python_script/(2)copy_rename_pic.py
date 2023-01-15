import os
import shutil

resources_path = './resources/'

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


def main():
    for i in range(1, 11):
        for folder in os.listdir(resources_path + str(i)):
            path = resources_path + str(i) + '/' + folder + '/' + '文件夹二' + '/'
            for j, pic in enumerate(os.listdir(path)):
                shutil.copy(path + pic, './pic')
                # rename
                before = './pic/' + pic
                after = './pic/' + str(i) + '_' + subject_dict[folder] + '_' + str(j) + '.jpg'
                os.rename(before, after)
                print("{}已移动与重命名成功".format(after))


if __name__ == '__main__':
    main()
