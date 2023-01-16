import json

with open('./all.json', 'r') as fp:
    all_dict = json.load(fp)

all_dict.pop('inf')
for href in all_dict:
    for pic in all_dict[href]:
        all_dict[href][pic] = all_dict[href][pic]["img_src"]

with open('./group_smms_pic_inf.json', 'w') as fl:
    json.dump(all_dict, fl, indent=4, ensure_ascii=False)
