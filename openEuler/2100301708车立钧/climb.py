#爬虫文件
from concurrent.futures import ThreadPoolExecutor
import requests
import re
import os
requests.packages.urllib3.disable_warnings()

header = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41'
}

load='./data/validation/cat'
load1='./data/train/cat'
load2='./data/validation/dog'
load3='./data/train/dog'
load4='./data/result'
if not os.path.exists(load):
    os.makedirs(load)

if not os.path.exists(load1):
    os.makedirs(load1)

if not os.path.exists(load2):
    os.makedirs(load2)

if not os.path.exists(load3):
    os.makedirs(load3)

if not os.path.exists(load4):
    os.makedirs(load4)

def dowload(url,load,i):
    dowresp = requests.get('http:'+url,headers=header,verify=False)
    name =f'{load}-{i}.jpg'
    with open(name,'wb') as f:
        f.write(dowresp.content)

i=0
for j in range(1,4):
    url = f'https://www.vcg.com/creative-photo/buoumao/?page={j}'
    resp = requests.get(url=url,headers=header,verify=False)
    resp.encoding='utf-8'
    obj = re.compile('.jpg" data-min="(?P<animal>.*?)" src="',re.S)
    list_1 = obj.finditer(resp.text)
    load='./data/validation/cat/xiaomao'

    with ThreadPoolExecutor(100) as t:
        for path in list_1:
            i=i+1
            t.submit(dowload,path.group('animal'),load,i)

print('xiaomao validation climb succeed')

i=0
for j in range(4,11):
    url1 = f'https://www.vcg.com/creative-photo/buoumao/?page={j}'
    resp1 = requests.get(url=url1,headers=header,verify=False)
    resp1.encoding='utf-8'
    load1='./data/train/cat/xiaomao'
    list_2 = obj.finditer(resp1.text)

    with ThreadPoolExecutor(100) as t:
        for path in list_2:
            i=i+1
            t.submit(dowload,path.group('animal'),load1,i)

print('xiaomao train climb succeed')

i=0
for j in range(1,4):
    url2 = f'https://www.vcg.com/creative-photo/labuladuo/?page={j}'
    resp2 = requests.get(url=url2,headers=header,verify=False)
    resp2.encoding='utf-8'
    load2='./data/validation/dog/xiaogou'
    list_3 = obj.finditer(resp2.text)

    with ThreadPoolExecutor(100) as t:
        for path in list_3:
            i=i+1
            t.submit(dowload,path.group('animal'),load2,i)

print('xiaogou validation climb succeed')

i=0
for j in range(4,11):
    url3 = f'https://www.vcg.com/creative-photo/labuladuo/?page={j}'
    resp3 = requests.get(url=url3,headers=header,verify=False)
    resp3.encoding='utf-8'
    load3='./data/train/dog/xiaogou'
    list_4 = obj.finditer(resp3.text)

    with ThreadPoolExecutor(100) as t:
        for path in list_4:
            i=i+1
            t.submit(dowload,path.group('animal'),load3,i)

print('xiaogou train climb succeed')