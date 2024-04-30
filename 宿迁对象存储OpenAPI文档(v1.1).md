# 对象存储公开API目录

## API概览

OSS产品提供以下相关API接口

| API                      | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| GetAllBucketUsedCapacity | 统计所有存储桶（Bucket）最近一个5min时间的用量（具体时间按照调用结果为准），流入带宽，流出带宽，GET，PUT，HEAD，DELETE请求的时延、获取状态码个数等监控信息，时间颗粒度为5min。 |

- 认证方式
  - [1.公共请求参数](https://github.com/capitalonline/openapi/blob/master/首云OpenAPI(v1.2).md#1公共请求参数)
  - 2.签名机制
    - [步骤一：构造规范化请求字符串](https://github.com/capitalonline/openapi/blob/master/首云OpenAPI(v1.2).md#步骤一构造规范化请求字符串)
    - [步骤二：构造签名字符串](https://github.com/capitalonline/openapi/blob/master/首云OpenAPI(v1.2).md#步骤二构造签名字符串)
  - [3.获取签名代码](https://github.com/capitalonline/openapi/blob/master/首云OpenAPI(v1.2).md#2获取签名代码)
- [访问地址](https://github.com/capitalonline/openapi/blob/master/对象存储概览(v1.1).md#访问地址)

### 访问地址

| 地区 | 访问地址                     |
| ---- | ---------------------------- |
| 宿迁 | gic-ossapi.capitalonline.net |

## 实例

### GetAllBucketUsedCapacity

**Action：**GetAllBucketUsedCapacity

**数据时效：**每次请求都会返回一个监控开始时间start_time，该时间为最新数据的起点，监控数据为[start_time, start_time+5min]时间段的数据的计算值，

例如：当前时间18:40

调用接口后，监控开始时间start_time为18:20，监控数据为18:20-18:25之前的数据，带宽、时延、响应码个数，均为5min的时间颗粒度

**描述：**统计存储桶（Bucket）的各项监控数据

**请求方法：**POST

**参数：**无

**headers参数：**

| 名称 | 类型   | 是否必需 | 描述                                                         |
| ---- | ------ | -------- | ------------------------------------------------------------ |
| host | 字符串 | 是       | 存储空间所在节点endpoint地址。示例：{'host': 'oss-cnsq02.cdsgss.com'} 其中oss-cnsq02.cdsgss.com为宿迁节点的endpoint地址 |

**响应参数：**

| 名称          | 单位         | 含义                                     |
| ------------- | ------------ | ---------------------------------------- |
| bucket_name   | /            | 存储桶名称                               |
| capacity_used | KB           | 存储桶已使用的容量                       |
| obj_count     | 个           | 存储桶的对象数目                         |
| in_bandwidth  | 字节（byte） | 上传带宽，支持周期：5minute              |
| out_bandwidth | 字节（byte） | 下载带宽，支持周期：5minute              |
| get_avg_time  | 微秒（μs）   | GET请求平均时延，支持周期：5minute       |
| put_avg_time  | 微秒（μs）   | PUT请求平均时延，支持周期：5minute       |
| head_avg_time | 微秒（μs）   | HEAD请求平均时延，支持周期：5minute      |
| del_avg_time  | 微秒（μs）   | DELETE请求平均时延，支持周期：5minute    |
| 2xx           | 个           | 2开头的响应码个数（时间颗粒度为5minute） |
| 3xx           | 个           | 3开头的响应码个数（时间颗粒度为5minute） |
| 4xx           | 个           | 4开头的响应码个数（时间颗粒度为5minute） |
| 5xx           | 个           | 5开头的响应码个数（时间颗粒度为5minute） |



**注意事项：**

- GetAllBucketUsedCapacity，有如下注意事项：
  - 仅限宿迁站点指定用户

**请求示例demo（假如有2个桶）：**

通过curl方式调用接口时，使用signature函数返回url替换即可

```
curl -X POST 'https://gic-ossapi.capitalonline.net/ossapi/GetAllBucketUsedCapacity/?Action=GetAllBucketUsedCapacity&AccessKeyId=XXXXXXXXXXXXXXXXXXXXXXXXXXXXX&SignatureMethod=HMAC-SHA1&SignatureNonce=XXXXXXXXXXXXXXXXXXXXXXXX&SignatureVersion=1.0&Timestamp=2024-04-09T10%3A53%3A12Z&Version=2019-08-08&Signature=XXXXXXXXXXXXXXXXXXXXXXXXX' -H 'content-type: application/json'  -H 'host: oss-cnsq02.cdsgss.com'
```

**返回示例demo（假如有2个桶）：**

```
{"Code": "Success", "Msg": "Success", "Data": {"bucket1": {"capacity_used": 6259635108, "obj_count": 4397333, "in_bandwidth": 6388855, "out_bandwidth": 15498830, "get_avg_time": {"total_time": 2404311, "reqs_count": 216, "avg_time": 11131.07}, "put_avg_time": {"total_time": 6160814, "reqs_count": 273, "avg_time": 22567.08}, "head_avg_time": {"total_time": 0, "reqs_count": 0, "avg_time": 0}, "del_avg_time": {"total_time": 9019, "reqs_count": 2, "avg_time": 4509.5}, "GET": {"2xx": 216, "3xx": 0, "4xx": 0, "5xx": 0}, "PUT": {"2xx": 273, "3xx": 0, "4xx": 0, "5xx": 0}, "HEAD": {"2xx": 0, "3xx": 0, "4xx": 0, "5xx": 0}, "DELETE": {"2xx": 2, "3xx": 0, "4xx": 0, "5xx": 0}}, "bucket2": {"capacity_used": 1727619660, "obj_count": 660222, "in_bandwidth": 6978223, "out_bandwidth": 6957037, "get_avg_time": {"total_time": 998818, "reqs_count": 193, "avg_time": 5175.22}, "put_avg_time": {"total_time": 4430208, "reqs_count": 199, "avg_time": 22262.35}, "head_avg_time": {"total_time": 1506797, "reqs_count": 193, "avg_time": 7807.24}, "del_avg_time": {"total_time": 0, "reqs_count": 0, "avg_time": 0}, "GET": {"2xx": 193, "3xx": 0, "4xx": 0, "5xx": 0}, "PUT": {"2xx": 199, "3xx": 0, "4xx": 0, "5xx": 0}, "HEAD": {"2xx": 193, "3xx": 0, "4xx": 0, "5xx": 0}, "DELETE": {"2xx": 0, "3xx": 0, "4xx": 0, "5xx": 0}},"start_time": "2024-04-29T14:30:00"}, "RequestId": "4ddbd437-97cc-44a7-8d5a-b94902ccb977"}
```



**python调用示例：(需替换自己的ak，sk，endpoint，bucket名称)**

```
# coding: utf-8
import base64
import hmac
import time
import urllib.parse as parse
import uuid
import json
from hashlib import sha1

import requests
import xmltodict as xmlparse

OSSPREBASEURL = 'https://gic-ossapi.capitalonline.net/ossapi'


endpoint = "oss-cnsq02.cdsgss.com"
a_key = 'XXXXXXXXXXXXXXXXXXXX'
s_key = 'XXXXXXXXXXXXXXXXXXXX'

def percent_encode(string):
    """将特殊转义字符替换"""
    res = parse.quote(string, '')
    res = res.replace('+', '%20')
    res = res.replace('*', '%2A')
    res = res.replace('%7E', '~')
    return res



def signature(action, ak, access_key_secret, method, url, param={}):
    """
    @params: action: 接口动作
    @params: ak: ak值
    @params: access_key_secret: ak秘钥
    @params: method: 接口调用方法(POST/GET)
    @params: param: 接口调用Query中参数(非POST方法Body中参数)
    @params: url: 接口调用路径
    @return: 请求的url可直接调用
    """
    timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    D = {
        'Action': action,
        'AccessKeyId': ak,
        'SignatureMethod': 'HMAC-SHA1',
        'SignatureNonce': str(uuid.uuid1()),
        'SignatureVersion': "1.0",
        "Timestamp": timestamp,
        'Version': '2019-08-08',
    }
    if param:
        D.update(param)
    sortedD = sorted(D.items(), key=lambda x: x[0])
    canstring = ''
    for k, v in sortedD:
        canstring += '&' + percent_encode(k) + '=' + percent_encode(v)
    stringToSign = method + '&%2F&' + percent_encode(canstring[1:])
    stringToSign = stringToSign.encode('utf-8')
    access_key_secret = access_key_secret.encode('utf-8')
    h = hmac.new(access_key_secret, stringToSign, sha1)
    signature = base64.encodebytes(h.digest()).strip()
    D['Signature'] = signature
    url = url + '/?' + parse.urlencode(D)
    return url

def bucketinfo(data):
    for key,value in data.items():
        if key == "start_time":
            continue
        print("桶名：",key)
        print("桶使用量capacity_used:",value.get("capacity_used"))
        print("桶对象个数obj_count:",value.get("obj_count"))
        print("上传带宽in_bandwidth:  %s Mbps" % (value.get("in_bandwidth")/1024/1024))
        print("下载带宽out_bandwidth: %s Mbps" % (value.get("out_bandwidth")/1024/1024))

        print("GET平均延时:    total_time:"+str(value.get("get_avg_time").get("total_time")) + " reqs_count:"+str(value.get("get_avg_time").get("reqs_count")) + " avg:" + str(round(value.get("get_avg_time").get("avg_time") / 1000, 2)))
        print("PUT平均延时:    total_time:"+str(value.get("put_avg_time").get("total_time")) + " reqs_count:"+str(value.get("put_avg_time").get("reqs_count")) + " avg:" + str(round(value.get("put_avg_time").get("avg_time") / 1000, 2)))
        print("HEAD平均延时:   total_time:"+str(value.get("head_avg_time").get("total_time")) + " reqs_count:"+str(value.get("head_avg_time").get("reqs_count")) + " avg:" + str(round(value.get("head_avg_time").get("avg_time") / 1000, 2)))
        print("DELETE平均延时: total_time:"+str(value.get("del_avg_time").get("total_time")) + " reqs_count:"+str(value.get("del_avg_time").get("reqs_count")) + " avg:" + str(round(value.get("del_avg_time").get("avg_time") / 1000, 2)))

        print("GET状态码:      2xx:"+str(value.get("GET").get("2xx")) + " 3xx:"+str(value.get("GET").get("3xx")) + " 4xx:" + str(value.get("GET").get("4xx"))+ " 5xx:" + str(value.get("GET").get("5xx")))
        print("PUT状态码:      2xx:"+str(value.get("PUT").get("2xx")) + " 3xx:"+str(value.get("PUT").get("3xx")) + " 4xx:" + str(value.get("PUT").get("4xx"))+ " 5xx:" + str(value.get("GET").get("5xx")))
        print("HEAD状态码:     2xx:"+str(value.get("HEAD").get("2xx")) + " 3xx:"+str(value.get("HEAD").get("3xx")) + " 4xx:" + str(value.get("HEAD").get("4xx"))+ " 5xx:" + str(value.get("GET").get("5xx")))
        print("DELETE状态码:   2xx:"+str(value.get("DELETE").get("2xx")) + " 3xx:"+str(value.get("DELETE").get("3xx")) + " 4xx:" + str(value.get("DELETE").get("4xx"))+ "5xx: " + str(value.get("GET").get("5xx")))

        print()





class OpenAPI(object):
    centent_type = "application/json"

    def __init__(self, access_key, secret_key):
        self.access_key = access_key
        self.secret_key = secret_key

        self.headers = {
            'content-type': 'application/json'
        }

    def GetAllBucketUsedCapacity(self):
        url = OSSPREBASEURL + "/GetAllBucketUsedCapacity"
        action = "GetAllBucketUsedCapacity"
        method = "POST"
        param = {}
        self.headers.update({"host":'%s' %(endpoint)})
        url = signature(action, self.access_key, self.secret_key, method, url, param)
        resp = requests.post(url, headers=self.headers)
        if resp.status_code == 200:
            return json.loads(resp.text)
        else:
            return None

if __name__ == '__main__':
    api = OpenAPI(a_key, s_key)
    #获取最近一次查询的所有桶的数据
    res_data = api.GetAllBucketUsedCapacity()
    # print(res_data)
    print("开始时间：", res_data.get("Data").get("start_time"))
    print()
    bucketinfo(res_data.get("Data"))

```

**python调用返回示例*(假设只有两个桶，数据时效性：监控开始时间——监控开始时间+5min，该五分钟内的数据)：**

```
监控开始时间： 2024-04-03T17:50:00

桶名： bucket1
桶使用量capacity_used: 1666297628
桶对象个数obj_count: 2862656
上传带宽in_bandwidth:  0.0 Mbps
下载带宽out_bandwidth: 0.0 Mbps
GET平均延时:    total_time:0 reqs_count:0 avg:0.0
PUT平均延时:    total_time:0 reqs_count:0 avg:0.0
HEAD平均延时:   total_time:0 reqs_count:0 avg:0.0
DELETE平均延时: total_time:0 reqs_count:0 avg:0.0
GET状态码:      2xx:0 3xx:0 4xx:0 5xx:0
PUT状态码:      2xx:0 3xx:0 4xx:0 5xx:0
HEAD状态码:     2xx:0 3xx:0 4xx:0 5xx:0
DELETE状态码:   2xx:0 3xx:0 4xx:05xx: 0

桶名： bucket2
桶使用量capacity_used: 0
桶对象个数obj_count: 0
上传带宽in_bandwidth:  0.0 Mbps
下载带宽out_bandwidth: 0.0 Mbps
GET平均延时:    total_time:0 reqs_count:0 avg:0.0
PUT平均延时:    total_time:0 reqs_count:0 avg:0.0
HEAD平均延时:   total_time:0 reqs_count:0 avg:0.0
DELETE平均延时: total_time:0 reqs_count:0 avg:0.0
GET状态码:      2xx:0 3xx:0 4xx:0 5xx:0
PUT状态码:      2xx:0 3xx:0 4xx:0 5xx:0
HEAD状态码:     2xx:0 3xx:0 4xx:0 5xx:0
DELETE状态码:   2xx:0 3xx:0 4xx:05xx: 0
```

