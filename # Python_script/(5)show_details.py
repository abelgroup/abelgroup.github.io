import json


with open('./all.json', 'r') as fp:
    all_dict = json.load(fp)

for i in all_dict['inf']:
    print('{}:{}'.format(i, all_dict['inf'][i]))

li = []
for j in all_dict:
    if j != 'inf':
        if len(all_dict[j]) not in li:
            li.append(len(all_dict[j]))

print("网页内图片数量:{}".format(sorted(li)))
