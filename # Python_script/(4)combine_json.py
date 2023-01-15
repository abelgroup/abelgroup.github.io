import json

src_not_exist_num = 0

with open('./pic_inf.json', 'r') as fp:
    pic_inf_dict: dict = {'inf': {'img_src非空比例': None}, **json.load(fp)}

pic_inf_dict['inf']["网页数量"] = pic_inf_dict.pop("网页数量")
pic_inf_dict['inf']["视频数量"] = pic_inf_dict.pop("视频数量")

with open('./smms.pic.json', 'r') as fp:
    smms_pic = json.load(fp)

for href in pic_inf_dict:
    if href != 'inf':
        for pic in pic_inf_dict[href]:
            try:
                pic_inf_dict[href][pic]["img_src"] = smms_pic[pic]
            except KeyError:
                pic_inf_dict[href][pic]["img_src"] = ''
                src_not_exist_num += 1

pic_inf_dict['inf']['img_src非空比例'] = str(pic_inf_dict['inf']["视频数量"] - src_not_exist_num) + '/' + \
                                     str(pic_inf_dict['inf']["视频数量"])

# save
with open('./all.json', 'w') as fp:
    json.dump(pic_inf_dict, fp, indent=4, ensure_ascii=False)
