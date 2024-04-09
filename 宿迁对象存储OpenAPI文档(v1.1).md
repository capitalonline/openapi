# 对象存储公开API目录

## API概览

OSS产品提供以下相关API接口

| API                      | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| GetAllBucketUsedCapacity | 统计所有存储桶（Bucket）的当前时间的用量，一定时间内（当前时间往前推的）的流入带宽，流出带宽，GET，PUT，HEAD，DELETE请求的时延、获取状态码个数等监控信息，时间颗粒度为5min。 |

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
| unit          | /            | 存储桶已使用的容量的单位                 |
| site_id       | /            | 节点id                                   |
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

**请求示例demo（假如有1个桶）：**

通过curl方式调用接口时，使用signature函数返回url替换即可

```
curl -X POST 'https://gic-ossapi.capitalonline.net/ossapi/GetAllBucketUsedCapacity/?Action=GetAllBucketUsedCapacity&AccessKeyId=XXXXXXXXXXXXXXXXXXXXXXXXXXXXX&SignatureMethod=HMAC-SHA1&SignatureNonce=XXXXXXXXXXXXXXXXXXXXXXXX&SignatureVersion=1.0&Timestamp=2024-04-09T10%3A53%3A12Z&Version=2019-08-08&Signature=XXXXXXXXXXXXXXXXXXXXXXXXX' -H 'content-type: application/json'  -H 'host: oss-cnsq02.cdsgss.com'
```

**返回示例demo（假如有1个桶）：**

```
{'Code': 'Success', 'Msg': 'Success', 'Data': 
[
{'site_id': '33', 'customer_id': 'xxxxx', 'user_id': 'dd1dc582-8f71-11ee-ac88-646c80cc671e', 'bucket_name': 'bucket_name', 'bucket_id': 'c1036dbe-c400-11ee-bd70-7a50d87ea341', 'capacity_used': 2093746632, 'obj_count': 56723, 'start_time': '2024-04-03 14:00', 'unit': 'KB'}, 
{'bucket_name': 'bucket_name', 'metric_key': 'in_bandwidth', 'http_method': None, 'response': [{'site_id': '33', 'customer_id': 'XXXX', 'bucket_name': 'bucket_name', 'bucket_id': 'lph4h4be-c400-11ee-gbnghfg444h44h544', 'start_time': '2024-04-03 13:50', 'value': 248149}]}, 
 {'bucket_name': 'bucket_name', 'metric_key': 'out_bandwidth', 'http_method': None, 'response': [{'site_id': '33', 'customer_id': 'XXXX', 'bucket_name': 'bucket_name', 'bucket_id': 'lph4h4be-c400-11ee-gbnghfg444h44h544', 'start_time': '2024-04-03 13:50', 'value': 43909265130}]}, 
 {'bucket_name': 'bucket_name', 'metric_key': 'get_avg_time', 'http_method': None, 'response': [{'site_id': '33', 'customer_id': 'XXXX', 'bucket_name': 'bucket_name', 'bucket_id': 'lph4h4be-c400-11ee-gbnghfg444h44h544', 'start_time': '2024-04-03 13:50', 'total_time': 9209301334, 'reqs_count': 1313252, 'avg_time': 7012.59}]}, 
 {'bucket_name': 'bucket_name', 'metric_key': 'put_avg_time', 'http_method': None, 'response': [{'site_id': '33', 'customer_id': 'XXXX', 'bucket_name': 'bucket_name', 'bucket_id': 'lph4h4be-c400-11ee-gbnghfg444h44h544', 'start_time': '2024-04-03 13:50', 'total_time': 14881482, 'reqs_count': 1299, 'avg_time': 11456.11}]}, 
 {'bucket_name': 'bucket_name', 'metric_key': 'head_avg_time', 'http_method': None, 'response': [{'site_id': '33', 'customer_id': 'XXXX', 'bucket_name': 'bucket_name', 'bucket_id': 'lph4h4be-c400-11ee-gbnghfg444h44h544', 'start_time': '2024-04-03 13:50', 'total_time': 228601936, 'reqs_count': 25073, 'avg_time': 9117.45}]}, 
 {'bucket_name': 'bucket_name', 'metric_key': 'del_avg_time', 'http_method': None, 'response': [{'site_id': '33', 'customer_id': 'XXXX', 'bucket_name': 'bucket_name', 'bucket_id': 'lph4h4be-c400-11ee-gbnghfg444h44h544', 'start_time': '2024-04-03 13:50', 'total_time': 1952654, 'reqs_count': 479, 'avg_time': 4076.52}]}, 
 {'bucket_name': 'bucket_name', 'metric_key': 'http_codes', 'GET': [{'site_id': '33', 'customer_id': 'XXXX', 'bucket_name': 'bucket_name', 'bucket_id': 'lph4h4be-c400-11ee-gbnghfg444h44h544', 'start_time': '2024-04-03 13:50', '2xx': 1313252, '3xx': 0, '4xx': 0, '5xx': 0}], 'PUT': [{'site_id': '33', 'customer_id': 'XXXX', 'bucket_name': 'bucket_name', 'bucket_id': 'lph4h4be-c400-11ee-gbnghfg444h44h544', 'start_time': '2024-04-03 13:50', '2xx': 1299, '3xx': 0, '4xx': 0, '5xx': 0}], 'HEAD': [{'site_id': '33', 'customer_id': 'XXXX', 'bucket_name': 'bucket_name', 'bucket_id': 'lph4h4be-c400-11ee-gbnghfg444h44h544', 'start_time': '2024-04-03 13:50', '2xx': 11901, '3xx': 0, '4xx': 13172, '5xx': 0}], 'DELETE': [{'site_id': '33', 'customer_id': 'XXXX', 'bucket_name': 'bucket_name', 'bucket_id': 'lph4h4be-c400-11ee-gbnghfg444h44h544', 'start_time': '2024-04-03 13:50', '2xx': 479, '3xx': 0, '4xx': 0, '5xx': 0}]
 }, '2024-04-03T13:50:00'],
    "RequestId":"c2e49f30-81b3-4395-a123-892e69459369"
}
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

#替换自己的endpoint
endpoint = "xxxxxxxxxxxxxxxxx.com"

#替换自己的ak
a_key = 'xxxxxxxxxxxxxxxxxxxxxxxx'

#替换自己的sk
s_key = 'xxxxxxxxxxxxxxxxxxxxxxxx'

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

def Listbucket(data):
    for info in data[:-1]:
        if list(info.keys())[0] == "site_id":
            print('存储桶名称:%s 使用容量为 %s TB 对象数量：%s ' % (info.get("bucket_name"), round(info.get("capacity_used") / 1024 / 1024 / 1024 , 2),info.get("obj_count")))

def ListInfo(data):
    for info in data[:-1]:
        if list(info.keys())[0] == "bucket_name" :
            if info["metric_key"] == "in_bandwidth":
                if info["response"]:
                    print('桶名：%s, 上传带宽in_bandwidth is :%s Mbps' % (info["bucket_name"], info["response"][0]['value']/1024/1024))
                else:
                    print('桶名：%s, 上传带宽in_bandwidth is :%s Mbps' % (info["bucket_name"], 0))

            elif info["metric_key"] == "out_bandwidth":
                if info["response"]:
                    print('桶名：%s, 下载带宽out_bandwidth is :%s Mbps' % (info["bucket_name"], info["response"][0]['value']/1024/1024))
                else:
                    print('桶名：%s, 下载带宽out_bandwidth is :%s Mbps' % (info["bucket_name"], 0))

            elif info["metric_key"] == "get_avg_time":
                if info["response"]:
                    print('桶名：%s, GET平均延时 total_time:%s reqs_count:%s avg:%s' %
                          (info["bucket_name"], info["response"][0]["total_time"], info["response"][0]['reqs_count'], round(info["response"][0]['avg_time'] / 1000, 2)))
                else:
                    print('桶名：%s, 无GET请求 ' % (info["bucket_name"]))

            elif info["metric_key"] == "put_avg_time":
                if info["response"]:
                    print('桶名：%s, PUT平均延时 total_time:%s reqs_count:%s avg:%s' %
                          (info["bucket_name"], info["response"][0]["total_time"], info["response"][0]['reqs_count'], round(info["response"][0]['avg_time'] / 1000, 2)))
                else:
                    print('桶名：%s, 无PUT请求 ' % (info["bucket_name"]))

            elif info["metric_key"] == "head_avg_time":
                if info["response"]:
                    print('桶名：%s, HEAD平均延时 total_time:%s reqs_count:%s avg:%s' %
                          (info["bucket_name"], info["response"][0]["total_time"], info["response"][0]['reqs_count'], round(info["response"][0]['avg_time'] / 1000, 2)))
                else:
                    print('桶名：%s, 无HEAD请求 ' % (info["bucket_name"]))

            elif info["metric_key"] == "del_avg_time":
                if info["response"]:
                    print('桶名：%s, DELETE平均延时 total_time:%s reqs_count:%s avg:%s' %
                          (info["bucket_name"], info["response"][0]["total_time"], info["response"][0]['reqs_count'], round(info["response"][0]['avg_time'] / 1000, 2)))
                else:
                    print('桶名：%s, 无DELETE请求 ' % (info["bucket_name"]))

            elif info["metric_key"] == "http_codes":
                for http_method in ['GET', 'PUT', 'HEAD', 'DELETE']:
                    if info[http_method]:
                        print('桶名：%s，%s请求状态码为: 2xx:%s 3xx:%s 4xx:%s 5xx:%s' % (info["bucket_name"], http_method, info[http_method][0]["2xx"], info[http_method][0]["3xx"], info[http_method][0]["4xx"], info[http_method][0]["5xx"]))
                    else:
                        print('桶名：%s, %s请求状态码为: 2xx:%s 3xx:%s 4xx:%s 5xx:%s' % (info["bucket_name"], http_method,  0, 0, 0, 0))
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
        self.headers.update({"host": '%s' % (endpoint)})
        url = signature(action, self.access_key, self.secret_key, method, url, param)
        resp = requests.post(url, headers=self.headers)
        if resp.status_code == 200:
            return json.loads(resp.text)
        else:
            return None

if __name__ == '__main__':
    api = OpenAPI(a_key, s_key)
    #获取最近一次查询的所有桶的监控数据
    res_data = api.GetAllBucketUsedCapacity()
    print("监控开始时间：", res_data.get("Data")[-1])
    print()
    Listbucket(res_data.get("Data"))
    print()
    ListInfo(res_data.get("Data"))


```

**python调用返回示例*(假设只有两个桶，数据时效性：监控开始时间——监控开始时间+5min，该五分钟内的数据)：**

```
监控开始时间： 2024-04-03T17:50:00

存储桶名称:bucket_test1 使用容量为 9.7 TB 对象数量：464655 
存储桶名称:bucket_test2 使用容量为 2.1 TB 对象数量：11254

桶名：bucket_test1, 上传带宽in_bandwidth is :0 Mbps
桶名：bucket_test1, 下载带宽out_bandwidth is :0 Mbps
桶名：bucket_test1, 无GET请求 
桶名：bucket_test1, 无PUT请求 
桶名：bucket_test1, 无HEAD请求 
桶名：bucket_test1, 无DELETE请求 
桶名：bucket_test1, GET请求状态码为: 2xx:0 3xx:0 4xx:0 5xx:0
桶名：bucket_test1, PUT请求状态码为: 2xx:0 3xx:0 4xx:0 5xx:0
桶名：bucket_test1, HEAD请求状态码为: 2xx:0 3xx:0 4xx:0 5xx:0
桶名：bucket_test1, DELETE请求状态码为: 2xx:0 3xx:0 4xx:0 5xx:0

桶名：bucket_test2, 上传带宽in_bandwidth is :0.22241687774658203 Mbps
桶名：bucket_test2, 下载带宽out_bandwidth is :55568.7183265686 Mbps
桶名：bucket_test2, GET平均延时 total_time:7023548191 reqs_count:820358 avg:8561.56
桶名：bucket_test2, PUT平均延时 total_time:14001120 reqs_count:1332 avg:10511.35
桶名：bucket_test2, HEAD平均延时 total_time:393775490 reqs_count:49277 avg:7991.06
桶名：bucket_test2, DELETE平均延时 total_time:2598211 reqs_count:665 avg:3907.08
桶名：bucket_test2，GET请求状态码为: 2xx:820358 3xx:0 4xx:0 5xx:0
桶名：bucket_test2，PUT请求状态码为: 2xx:1332 3xx:0 4xx:0 5xx:0
桶名：bucket_test2，HEAD请求状态码为: 2xx:25917 3xx:0 4xx:23360 5xx:0
桶名：bucket_test2，DELETE请求状态码为: 2xx:665 3xx:0 4xx:0 5xx:0
```

