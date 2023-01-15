from os import listdir
from json import load, dump
from time import localtime, time
from requests import post, exceptions
from typing import TextIO
from functools import reduce
from tqdm import tqdm


class SMMS(object):
    """
    用于便利地批量上传一个文件的图片至SM.MS图床的类
    """

    def __init__(self) -> None:
        # 参数设置:
        # 支持的三种图片格式
        self.__picture: set = {'png', 'jpg', 'jpeg'}
        # API token
        self.__headers: dict = {'Authorization': 'fpNgYxFbSEtNz5Fwg0fWi5AKTvXTS2tq'}
        # api接口
        self.__url: str = 'https://smms.app/api/v2/upload'
        # json文件的名字，存储json文件的地址
        self.save_json_name: str = 'smms.pic.json'
        self.save_json_path: str = './'

        # 查看是否存在json文件
        if self.save_json_name not in listdir(self.save_json_path):
            # 创建一个空json
            print('[提示]不存在{}，已创建'.format(self.save_json_name))
            with open(self.save_json_path + self.save_json_name, 'w') as fp:
                dump({}, fp)

        # pic_dict：存储外链的字典，在初始化时加载已有的json文件
        with open(self.save_json_path + self.save_json_name, 'r') as fp:
            self.pic_dict: dict = load(fp)

        # 意外或正常退出时备份
        self.__fp: TextIO = open(self.save_json_path + self.save_json_name.rstrip('.json') + '_报错备份' +
                                 reduce(lambda x, y: x + y, ['_' + str(i) for i in localtime(time())[:-3]]) +
                                 '.json', 'a')

        # 循环保存
        self.__loop: int = 0

    def upload_img(self, img_path: str) -> str:
        """
        处理单个图片文件的函数
        :param img_path: 图片文件path
        :return: 图片文件图床外链
        """
        files: dict = {'smfile': open(img_path, 'rb')}
        try:
            res = post(self.__url, files=files, headers=self.__headers, timeout=15.0).json()
            if res['success']:
                return res['data']['url']
            else:
                error: str = 'Image upload repeated limit, this image exists at:'
                error2: str = 'Flood detected. You can only upload 100 images per hour'
                error3: str = 'Upload file frequency limit'
                error4: str = 'Flood detected. You can only upload 200 images per day'
                if error in res['message']:
                    return res['message'][len(error):].strip(" ")
                elif error2 in res['message']:
                    raise Exception('[提示]达到每小时上限，请稍后上传')
                elif error3 in res['message']:
                    raise SystemExit
                elif error4 in res['message']:
                    raise Exception('[提示]达到每日上限，请明日上传')
                else:
                    raise Exception('[提示]{}其他错误:\n{}'.format(img_path, res['message']))
        except ValueError:
            raise Exception('[提示]请关闭vpn，或检查是否有其他问题')
        except exceptions.ReadTimeout:
            raise SystemExit

    def upload_img_file(self, file_path: str, save_loop: int = 10) -> None:
        """
        处理包含多个图片的文件夹的函数
        :param save_loop: 保存频率，上传多少次保存一次json
        :param file_path:文件夹path
        """
        file_path: str = file_path.rstrip('/')
        # 获取要上传的所有文件名
        pic_file_list: list = listdir(file_path)
        # tqdm进度条
        for pic in tqdm(pic_file_list):
            # 获取文件名与文件格式
            name, form = pic.split('.')
            # 如已上传过，则不必再上传
            if name not in self.pic_dict:
                # 检查图片格式
                if form in self.__picture:
                    # 上传图片，并获取外链
                    self.pic_dict[name]: str = self.upload_img(file_path + '/' + pic)
                    # print("图片:{}已成功上传,src:{}".format(pic, pic_dict[pic.split('.')[0]]))
                else:
                    print('[提示]{}格式不正确'.format(pic))
            else:
                # print("[提示]{}已经上传过".format(pic))
                pass
            if self.__loop >= save_loop - 1:
                self.save()
                self.__loop = 0
            else:
                self.__loop += 1
        self.save()

    def save(self) -> None:
        """运行时覆盖保存"""
        with open(self.save_json_path + self.save_json_name, 'w+') as fp:
            dump(self.pic_dict, fp, indent=4)

    def __del__(self) -> None:
        """退出时备份"""
        dump(self.pic_dict, self.__fp, indent=4)
        self.__fp.close()

    @classmethod
    def upload_main(cls, folder_path, error_max_time=20) -> None:
        """
        更方便一次性处理一个文件夹图片的上传的类方法
        :param folder_path: 文件夹路径
        :param error_max_time: 最多错误次数，太多次错误停止运行程序
        :return: None
        """
        # 上传图片
        loop: bool = True
        smms: SMMS = cls()
        error_time: int = 0
        while loop:
            try:
                smms.upload_img_file(folder_path)
                # 运行完毕则中止
                if len(smms.pic_dict) > len(listdir(folder_path)) - 1:
                    loop = False
            except SystemExit:
                error_time += 1
                print('\n[提示]超时，error time:{}！'.format(error_time))
                if error_time >= error_max_time:
                    loop = False
                    print("[提示]上传超时次数过多，请稍后再试")
            finally:
                print("[提示]现计{}张图片已上传".format(len(smms.pic_dict)))


if __name__ == "__main__":

    def check() -> None:
        # 获取pic_inf
        with open('./pic_inf.json', 'r') as fi:
            pic_inf_dict = load(fi)

        # 网页数量
        html_num: int = pic_inf_dict.pop("网页数量")
        # 视频数量
        vi_num: int = pic_inf_dict.pop("视频数量")
        # 网页名称list
        html_list: list = [i for i in pic_inf_dict]

        if vi_num != len(listdir('./pic')):
            raise Exception("[提示]图片数量错误:{}/{}".format(vi_num, len(listdir('./pic'))))
        if html_num != len(html_list):
            raise Exception("[提示]网页数量错误:{}/{}".format(html_num, len(html_list)))


    # 检查一下pic图片数量与json文件是否匹配
    check()

    # 批量上传./pic所有图片
    SMMS.upload_main('./pic')
