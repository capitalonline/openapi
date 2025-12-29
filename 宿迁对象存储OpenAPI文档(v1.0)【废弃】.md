# 宿迁对象存储(v1.0)【废弃】

## API概览

OSS产品提供以下相关API接口

| API                   | 描述                                                         |
| --------------------- | ------------------------------------------------------------ |
| GetBucketUsedCapacity | 统计存储桶（Bucket）的用量。                                 |
| GetMonitorInfo        | 获取流入带宽，流出带宽，获取GET，PUT，HEAD，DELETE请求的时延、获取状态码个数等监控信息。 |

- 认证方式
  - [1.公共请求参数](https://github.com/capitalonline/openapi/blob/master/首云OpenAPI(v1.2).md#1公共请求参数)
  - 2.签名机制
    - [步骤一：构造规范化请求字符串](https://github.com/capitalonline/openapi/blob/master/首云OpenAPI(v1.2).md#步骤一构造规范化请求字符串)
    - [步骤二：构造签名字符串](https://github.com/capitalonline/openapi/blob/master/首云OpenAPI(v1.2).md#步骤二构造签名字符串)
  - [3.获取签名代码](https://github.com/capitalonline/openapi/blob/master/首云OpenAPI(v1.2).md#2获取签名代码)
- [访问地址](https://github.com/capitalonline/openapi/blob/master/对象存储概览(v1.1).md#访问地址)

### 访问地址

| 地区     | 访问地址                     |
| -------- | ---------------------------- |
| 所有节点 | gic-ossapi.capitalonline.net |

## 实例

### GetBucketUsedCapacity

**Action：**GetBucketUsedCapacity

**描述：**统计存储桶（Bucket）的用量

**请求方法：**POST

**参数：**

| 名称        | 类型   | 是否必需 | 描述                                                         |
| ----------- | ------ | -------- | ------------------------------------------------------------ |
| bucket_name | 字符串 | 是       | 存储桶名称                                                   |
| start_time  | 字符串 | 是       | 开始时间                                                     |
| end_time    | 字符串 | 是       | 结束时间                                                     |
| period      | 字符串 | 是       | 周期 （hour,day），默认为hour，当时间范围为大于一小时且为整数时，按照时间顺序每小时显示数据 |

**时间周期：**

| 周期         | 监控粒度 |
| ------------ | -------- |
| hour（小时） | 1h       |
| day（天）    | 24h      |

**headers参数：**

| 名称 | 类型   | 是否必需 | 描述                                                         |
| ---- | ------ | -------- | ------------------------------------------------------------ |
| host | 字符串 | 是       | 存储空间所在节点endpoint地址。示例：{'host': 'oss-cnsq02.cdsgss.com'} 其中oss-cnsq02.cdsgss.com为宿迁节点的endpoint地址 |

**响应参数：**

| 名称          | 类型   | 单位 | 含义                     |
| ------------- | ------ | ---- | ------------------------ |
| capacity_used | Int    | KB   | 存储桶已使用的容量       |
| obj_count     | Int    | 个   | 存储桶的对象数目         |
| unit          | 字符串 |      | 存储桶已使用的容量的单位 |
| bucket_name   | 字符串 |      | 存储桶名称               |
| site_id       | 字符串 |      | 节点id                   |



**注意事项：**

- GetBucketUsedCapacity，有如下注意事项：
  - 仅限宿迁站点指定用户

**请求示例（period为hour）：**

```
POST http://gic-ossapi.capitalonline.net/ossapi/ossapi/GetBucketUsedCapacity/?Action=GetBucketUsedCapacity&AccessKeyId=akxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&SignatureMethod=HMAC-SHA1&SignatureNonce=0d29a3f8-d133-11ee-8797-4c445b646135&SignatureVersion=1.0&Timestamp=2024-02-22T03%3A32%3A48Z&Version=2019-08-08&Signature=p0lJpLPoCzxwL7JFG499RXW4psE%3D
--header 'content-type': 'application/json'
--header 'host': 'oss-cnsq02.cdsgss.com'
--data '{
            "bucket_name":"test",
            "start_time":"2024-02-19 00:00:00",
            "end_time":"2024-02-19 02:00:00",
            "period":"hour"
        }'
```

**返回示例（period为hour）：**

```
{
    "Code":"Success",
    "Msg":"Success",
    "Data":[
        {
            "site_id":"33",
            "customer_id":"E890856",
            "user_id":"dd1dc582-8f71-11ee-ac88-646c80cc671e",
            "bucket_name":"test",
            "bucket_id":"c1086abc-c400-11ee-bd70-7a50d87ea341",
            "capacity_used":9216360308,
            "obj_count":14179,
            "start_time":"2024-02-19 00:00",
            "unit":"KB"
        },
        {
            "site_id":"33",
            "customer_id":"E890856",
            "user_id":"dd1dc582-8f71-11ee-ac88-646c80cc671e",
            "bucket_name":"test",
            "bucket_id":"c1086abc-c400-11ee-bd70-7a50d87ea341",
            "capacity_used":9216360308,
            "obj_count":14179,
            "start_time":"2024-02-19 01:00",
            "unit":"KB"
        }
    ],
    "RequestId":"c2e49f30-81b3-4395-a123-892e69459369"
}
```

**请求示例（period为day）：**

```
POST http://gic-ossapi.capitalonline.net/ossapi/ossapi/GetBucketUsedCapacity/?Action=GetBucketUsedCapacity&AccessKeyId=akxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&SignatureMethod=HMAC-SHA1&SignatureNonce=0d29a3f8-d133-11ee-8797-4c445b646135&SignatureVersion=1.0&Timestamp=2024-02-22T03%3A32%3A48Z&Version=2019-08-08&Signature=p0lJpLPoCzxwL7JFG499RXW4psE%3D
--header 'content-type': 'application/json'
--header 'host': 'oss-cnsq02.cdsgss.com'
--data '{
            "bucket_name":"test",
            "start_time":"2024-02-19 00:00:00",
            "end_time":"2024-02-20 00:00:00",
            "period":"day"
        }'
```

**返回示例（period为day）：**

```
{
    "Code":"Success",
    "Msg":"Success",
    "Data":[
        {
            "site_id":"33",
            "customer_id":"E890856",
            "user_id":"dd1dc582-8f71-11ee-ac88-646c80cc671e",
            "bucket_name":"test",
            "bucket_id":"c1086abc-c400-11ee-bd70-7a50d87ea341",
            "capacity_used":13073890684,
            "obj_count":19960,
            "day_date":"2024-02-19",
            "unit":"KB"
        }
    ],
    "RequestId":"d0cd5d0c-307f-460a-8689-1512ccc222a4"
}
```

**错误请求示例（period为day，缺少start_time参数或该参数不规范）：**

```
POST /ossapi/GetBucketUsedCapacity/?Action=GetBucketUsedCapacity&AccessKeyId=akxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&SignatureMethod=HMAC-SHA1&SignatureNonce=d88843d9-d477-11ee-b629-4c445b646135&SignatureVersion=1.0&Timestamp=2024-02-26T07%3A22%3A49Z&Version=2019-08-08&Signature=oNiiYV6x7J2J7d5uXdMLvyDrW1k%3D
--header 'content-type': 'application/json'
--header 'host': 'oss-cnsq02.cdsgss.com'
--data '{
            "bucket_name":"test",
            "end_time":"2024-02-20 00:00:00",
            "period":"day"
        }'
```

**错误请求返回示例（period为day，缺少start_time参数或该参数不规范）：**

```
{
          "Code":  "parameter_invalid",
          "Msg":  "开始时间不正确：日期格式为：yyyy-MM-dd hh:mm:ss",
          "Data":  {

          },
          "RequestId":  "2cc90de1-43f1-4636-9fcb-d829f5789cf9"
}
status_code: 400
```



### GetMonitorInfo

**Action：**GetMonitorInfo

**描述：**获取流入带宽，流出带宽，获取GET，PUT，HEAD，DELETE请求的时延、获取状态码个数等监控信息

**请求方法：**POST

**参数：**

| 名称         | 类型   | 是否必需 | 描述                                                         |
| ------------ | ------ | -------- | ------------------------------------------------------------ |
| bucket_name  | 字符串 | 否       | 存储桶名称，可选，不传则查询全部桶                           |
| metric_key   | 字符串 | 是       | 可选指标参数(见性能参数表)                                   |
| network_type | 字符串 | 是       | 可选指标参数(见内外网参数)                                   |
| start_time   | 字符串 | 是       | 开始时间                                                     |
| end_time     | 字符串 | 是       | 结束时间                                                     |
| period       | 字符串 | 是       | 周期 （minute, hour,day ）                                   |
| http_method  | 字符串 | 否       | 请求方法['GET','PUT', 'DELETE', 'HEAD']，如果传空字符串，将查询全部请求的状态码个数 |

**性能参数表：**

| API参数名     | 单位         | 含义                                            | 说明                 |
| ------------- | ------------ | ----------------------------------------------- | -------------------- |
| in_bandwidth  | 字节（byte） | 上传带宽，支持周期：minute、hour、day           |                      |
| out_bandwidth | 字节（byte） | 下载带宽，支持周期：minute、hour、day           |                      |
| get_avg_time  | 微秒（μs）   | GET请求平均时延，支持周期：minute、hour、day    |                      |
| put_avg_time  | 微秒（μs）   | PUT请求平均时延，支持周期：minute、hour、day    |                      |
| head_avg_time | 微秒（μs）   | HEAD请求平均时延，支持周期：minute、hour、day   |                      |
| del_avg_time  | 微秒（μs）   | DELETE请求平均时延，支持周期：minute、hour、day |                      |
| http_codes    | 个           | 请求的状态码个数                                | (2xx、3xx、4xx、5xx) |

**内外网参数表：**

| API参数名 | 单位 | 含义             | 说明 |
| --------- | ---- | ---------------- | ---- |
| private   |      | 内网访问（默认） |      |
| public    |      | 公网访问         |      |

**时间周期：**

| 周期   | 监控粒度 |
| ------ | -------- |
| minute | 300s     |
| hour   | 1h       |
| day    | 24h      |

**headers参数：**

| 名称 | 类型   | 是否必需 | 描述                                                         |
| ---- | ------ | -------- | ------------------------------------------------------------ |
| host | 字符串 | 是       | 存储空间所在节点endpoint地址。示例：{'host': 'oss-cnsq02.cdsgss.com'} 其中oss-cnsq02.cdsgss.com为宿迁节点的endpoint地址 |

**响应参数：**

| 名称       | 单位         | 含义                   |
| ---------- | ------------ | ---------------------- |
| site_id    |              | 节点id                 |
| bucket_nam |              | 存储桶名称             |
| value      | 字节（byte） | 上传或者下载的带宽     |
| reqs_count | 个           | 请求的个数             |
| avg_time   | 微秒（μs）   | 查询出的请求的平均时延 |
| 2xx        | 个           | 2开头的响应码个数      |
| 3xx        | 个           | 3开头的响应码个数      |
| 4xx        | 个           | 4开头的响应码个数      |
| 5xx        | 个           | 5开头的响应码个数      |

**注意事项：**

- GetMonitorInfo，有如下注意事项：
  - 仅限宿迁站点指定用户

**请求示例（查询每天内网流出带宽，Period为day，metric_key为out_bandwidth）：**

```
POST http://gic-ossapi.capitalonline.net/ossapi/ossapi/GetMonitorInfo/?Action=GetMonitorInfo&AccessKeyId=akxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&SignatureMethod=HMAC-SHA1&SignatureNonce=df04dec0-d147-11ee-9fef-4c445b646135&SignatureVersion=1.0&Timestamp=2024-02-22T06%3A01%3A50Z&Version=2019-08-08&Signature=6cY0bxpK%2BIUI3MEp%2F%2FNMnH3f294%3D
--header 'content-type': 'application/json'
--header 'host': 'oss-cnsq02.cdsgss.com'
--data '{
			"bucket_name":"test",
			"metric_key":"out_bandwidth",
            "start_time":"2024-02-19 00:00:00",
			"end_time":"2024-02-20 00:00:00",
			"period":"day",
            "network_type":"private"
        }'
```

**返回示例（查询每天内网流出带宽，Period为day，metric_key为out_bandwidth）：**

```
{
    "Code":"Success",
    "Msg":"Success",
    "Data":[
        {
            "site_id":"33",
            "customer_id":"E890856",
            "bucket_name":"test",
            "bucket_id":"c1086abc-c400-11ee-bd70-7a50d87ea341",
            "start_time":"2024-02-19",
            "value":4286269812
        }
    ],
    "RequestId":"6920adcc-f9f0-4df5-854f-aacdf1454309"
}
```

**请求示例（查询每小时内网流出带宽，Period为hour，metric_key为out_bandwidth）：**

```
POST http://gic-ossapi.capitalonline.net/ossapi/ossapi/GetMonitorInfo/?Action=GetMonitorInfo&AccessKeyId=akxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&SignatureMethod=HMAC-SHA1&SignatureNonce=df04dec0-d147-11ee-9fef-4c445b646135&SignatureVersion=1.0&Timestamp=2024-02-22T06%3A01%3A50Z&Version=2019-08-08&Signature=6cY0bxpK%2BIUI3MEp%2F%2FNMnH3f294%3D
--header 'content-type': 'application/json'
--header 'host': 'oss-cnsq02.cdsgss.com'
--data '{
            "bucket_name":"test",
            "metric_key":"out_bandwidth",
            "start_time":"2024-02-20 00:00:00",
			"end_time":"2024-02-20 02:00:00",
			"period":"hour",
            "network_type":"private"
        }'
```

**返回示例（查询每小时内网流出带宽，Period为hour，metric_key为out_bandwidth）：**

```
{
    "Code":"Success",
    "Msg":"Success",
    "Data":[
        {
            "site_id":"33",
            "customer_id":"E890856",
            "bucket_name":"test",
            "bucket_id":"c1086abc-c400-11ee-bd70-7a50d87ea341",
            "start_time":"2024-02-20 00:00",
            "value":10479891668
        },
        {
            "site_id":"33",
            "customer_id":"E890856",
            "bucket_name":"test",
            "bucket_id":"c1086abc-c400-11ee-bd70-7a50d87ea341",
            "start_time":"2024-02-20 01:00",
            "value":5729212199
        }
    ],
    "RequestId":"47475059-f40b-4850-9515-5a471be3ab62"
}
```

**请求示例（查询每小时GET请求平均时延，Period为hour，metric_key为get_avg_time）：**

```
POST http://gic-ossapi.capitalonline.net/ossapi/ossapi/GetMonitorInfo/?Action=GetMonitorInfo&AccessKeyId=akxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&SignatureMethod=HMAC-SHA1&SignatureNonce=df04dec0-d147-11ee-9fef-4c445b646135&SignatureVersion=1.0&Timestamp=2024-02-22T06%3A01%3A50Z&Version=2019-08-08&Signature=6cY0bxpK%2BIUI3MEp%2F%2FNMnH3f294%3D
--header 'content-type': 'application/json'
--header 'host': 'oss-cnsq02.cdsgss.com'
--data '{
            "bucket_name":"test",
            "metric_key":"get_avg_time",
            "start_time":"2024-02-20 00:00:00",
			"end_time":"2024-02-20 02:00:00",
			"period":"hour",
            "network_type":"private"
        }'
```

**返回示例（查询每小时GET请求平均时延，Period为hour，metric_key为get_avg_time）：**

```
{
    "Code":"Success",
    "Msg":"Success",
    "Data":[
        {
            "site_id":"33",
            "customer_id":"E890856",
            "bucket_name":"test",
            "bucket_id":"c1086abc-c400-11ee-bd70-7a50d87ea341",
            "start_time":"2024-02-20 00:00",
            "total_time":16248944210,
            "reqs_count":1773306,
            "avg_time":9163.08
        },
        {
            "site_id":"33",
            "customer_id":"E890856",
            "bucket_name":"test",
            "bucket_id":"c1086abc-c400-11ee-bd70-7a50d87ea341",
            "start_time":"2024-02-20 01:00",
            "total_time":9555946019,
            "reqs_count":1044761,
            "avg_time":9146.54
        }
    ],
    "RequestId":"d80c1c37-5485-47a7-8a07-084284a340b2"
}
```

**请求示例（查询每天PUT请求的状态码个数，Period为day，metric_key为http_codes，http_method为PUT）：**

```
POST http://gic-ossapi.capitalonline.net/ossapi/ossapi/GetMonitorInfo/?Action=GetMonitorInfo&AccessKeyId=akxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&SignatureMethod=HMAC-SHA1&SignatureNonce=df04dec0-d147-11ee-9fef-4c445b646135&SignatureVersion=1.0&Timestamp=2024-02-22T06%3A01%3A50Z&Version=2019-08-08&Signature=6cY0bxpK%2BIUI3MEp%2F%2FNMnH3f294%3D
--header 'content-type': 'application/json'
--header 'host': 'oss-cnsq02.cdsgss.com'
--data '{
            "bucket_name":"test",
            "metric_key":"get_avg_time",
            "start_time":"2024-02-19 00:00:00",
			"end_time":"2024-02-20 00:00:00",
			"period":"hour",
            "network_type":"private",
            "http_method":"PUT"
        }'
```

**返回示例（查询每天PUT请求的状态码个数，Period为day，metric_key为http_codes，http_method为PUT）：**

```
{
    "Code":"Success",
    "Msg":"Success",
    "Data":[
        {
            "site_id":"33",
            "customer_id":"E890856",
            "bucket_name":"test",
            "bucket_id":"c1086abc-c400-11ee-bd70-7a50d87ea341",
            "start_time":"2024-02-19",
            "2xx":9879,
            "3xx":0,
            "4xx":0,
            "5xx":0
        }
    ],
    "RequestId":"aeeec483-15de-4a2b-b1a5-6af105ae49ef"
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

# 用户密钥,需要替换成自己的
a_key = 'ak******************'
s_key = 'sk******************'

# 对象存储节点endpoint
endpoint = "oss-cnsq02.cdsgss.com"

# 对象存储空间
bucket = "test"

def encode_query_param(query_param):
    _query_str = ''
    if query_param:
        _query_str = parse.urlencode(query_param)
    return _query_str


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
    print(url)
    return url


class OpenAPI(object):
    centent_type = "application/json"

    def __init__(self, access_key, secret_key):
        self.access_key = access_key
        self.secret_key = secret_key

        self.headers = {
            'content-type': 'application/json'
        }

    def GetBucketUsedCapacity(self, bucket_name=None, start_time='', end_time='', period='hour'):
        url = OSSPREBASEURL + "/GetBucketUsedCapacity"
        action = "GetBucketUsedCapacity"
        method = "POST"
        param = {}
        body = {
          "start_time": start_time,
          "end_time": end_time,
          "period": period
        }
        if bucket_name:
            self.headers.update({"host":'%s.%s' %(bucket_name, endpoint)})
        else:
            self.headers.update({"host": '%s' % (endpoint)})
        data = json.dumps(body)
        url = signature(action, self.access_key, self.secret_key, method, url, param)
        resp = requests.post(url, headers=self.headers, data=data)
        # print("查询容量：", resp.headers)
        print("查询容量resp：", resp.text)
        print("查询容量status_code:", resp.status_code)
        if resp.status_code == 200:
            return json.loads(resp.text)
        else:
            return None

    def GetMonitorInfo(self, bucket_name=None, start_time='', end_time='', period='hour', metric_key=None, network_type='private', http_method=None):
        url = OSSPREBASEURL + "/GetMonitorInfo"
        action = "GetMonitorInfo"
        method = "POST"
        param = {}
        body = {
          "metric_key": metric_key,
          "start_time": start_time,
          "end_time": end_time,
          "period": period,
          "network_type": network_type
        }
        if http_method:
            body["http_method"] = http_method
        if bucket_name:
            self.headers.update({"host":'%s.%s' %(bucket_name, endpoint)})
        else:
            self.headers.update({"host": '%s' % (endpoint)})
        data = json.dumps(body)

        url = signature(action, self.access_key, self.secret_key, method, url, param)
        resp = requests.post(url, headers=self.headers, data=data)
        # print("查询容量：", resp.headers)
        print("查询监控resp：", resp.text)
        print("查询监控status_code:", resp.status_code)
        if resp.status_code == 200:
            return json.loads(resp.text)
        else:
            return None
def convert_to_bps(traffic, time):
    # traffic为流量，单位为Byte
    # time为时间，单位为秒
    bps = traffic * 8 / time
    return bps

def convert_to_Mbps(traffic, time):
    # traffic为流量，单位为Byte
    # time为时间，单位为秒
    Mbps = traffic * 8 / time / 1000000
    return Mbps

if __name__ == '__main__':
    api = OpenAPI(a_key, s_key)
    start_time = "2024-02-19 00:00:00"
    end_time = "2024-02-20 00:00:00"
    bucket_name = "test" # 不传查询全部桶
    period = "day" # 取值范围['minute','hour', 'day']
    network_type = "private" # private | public
    http_method = "GET" # 取值范围['GET','PUT', 'DELETE', 'HEAD']
    # 按小时查询桶容量信息
    res_data = api.GetBucketUsedCapacity(bucket_name=bucket_name, start_time=start_time, end_time=end_time, period='day')
    for item in res_data.get("Data"):
        print('存储空间容量start_time:%s value %s TB 对象数量：%s ' % (item.get("start_time"), round(item.get("capacity_used") / 1024 / 1024 / 1024 , 2),item.get("obj_count")))
    # 按天查询桶容量信息
    # api.GetBucketUsedCapacity(bucket_name=bucket_name, start_time=start_time, end_time=end_time, period='day')

    # metric_key not 取值范围 ['in_bandwidth', 'out_bandwidth', 'get_avg_time', 'put_avg_time', 'head_avg_time', 'del_avg_time', 'http_codes']
    # period 取值范围['minute','hour', 'day']
    # network_type 网络方式默认内网 取值范围['public', 'private']

    # 上传带宽
    res_data = api.GetMonitorInfo(bucket_name=bucket_name, start_time=start_time, end_time=end_time,
                              period=period, metric_key="in_bandwidth", network_type=network_type)
    for item in res_data.get("Data"):
        print('上传带宽start_time:%s bandwidth:%s Mbps' % (item.get("start_time"), item.get("value")/1024/1024))

    # 下载带宽
    res_data = api.GetMonitorInfo(bucket_name=bucket_name, start_time=start_time, end_time=end_time,
                       period=period, metric_key="out_bandwidth", network_type=network_type)
    for item in res_data.get("Data"):
        print('下载带宽start_time:%s bandwidth:%s Mbps' % (item.get("start_time"), item.get("value")/1024/1024))

    # 下载平均延时
    res_data = api.GetMonitorInfo(bucket_name=bucket_name, start_time=start_time, end_time=end_time,
                       period=period, metric_key="get_avg_time", network_type=network_type)
    for item in res_data.get("Data"):
        print('下载平均延时 start_time:%s total_time:%s reqs_count:%s avg:%s ' % (
            item.get("start_time"), item.get("total_time"), item.get("reqs_count"),
            round(item.get("avg_time") / 1000, 2)))

    # 上传平均延时
    res_data = api.GetMonitorInfo(bucket_name=bucket_name, start_time=start_time, end_time=end_time,
                       period=period, metric_key="put_avg_time", network_type=network_type)
    for item in res_data.get("Data"):
        print('上传平均延时 start_time:%s total_time:%s reqs_count:%s avg:%s ' % (
            item.get("start_time"), item.get("total_time"), item.get("reqs_count"),
            round(item.get("avg_time") / 1000, 2)))

    # head平均延时
    res_data = api.GetMonitorInfo(bucket_name=bucket_name, start_time=start_time, end_time=end_time,
                       period=period, metric_key="head_avg_time", network_type=network_type)
    for item in res_data.get("Data"):
        print('head平均延时 start_time:%s total_time:%s reqs_count:%s avg:%s ' % (
            item.get("start_time"), item.get("total_time"), item.get("reqs_count"),
            round(item.get("avg_time") / 1000, 2)))

    # 删除平均延时
    res_data = api.GetMonitorInfo(bucket_name=bucket_name, start_time=start_time, end_time=end_time,
                       period=period, metric_key="del_avg_time", network_type=network_type)
    for item in res_data.get("Data"):
        print('删除平均延时 start_time:%s total_time:%s reqs_count:%s avg:%s ' % (
            item.get("start_time"), item.get("total_time"), item.get("reqs_count"),
            round(item.get("avg_time") / 1000, 2)))

    # 状态码
    res_data = api.GetMonitorInfo(bucket_name=bucket_name, start_time=start_time, end_time=end_time,
                       period=period, metric_key="http_codes", network_type=network_type, http_method='PUT')
    for item in res_data.get("Data"):
        print('start_time:%s 2xx:%s 3xx:%s 4xx:%s 5xx:%s' % (item.get("start_time"), item.get("2xx"), item.get("3xx"), item.get("4xx"), item.get("5xx")))

```
