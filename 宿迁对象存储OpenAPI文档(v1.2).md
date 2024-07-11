# 对象存储公开API目录

## API概览

OSS产品提供以下相关API接口

| API                      | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| DescribeBucketMetrics | 统计单个存储桶（Bucket）最近一个10min时间的用量（具体时间按照调用结果为准），流入流量、流出流量、请求的总耗时、请求次数 和 HTTP 状态码个数等监控信息，时间颗粒度为 10min。 |

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

### DescribeBucketMetrics

**Action：** DescribeBucketMetrics

**数据时效：** 每次请求都会返回一个监控开始时间（StartTime）和结束时间（EndTime）之间的汇总数据，时间颗粒度均为 10min

例如：当前时间 18:42，调用接口后，会返回 StartTime <= RequestTime 的监控数据。例如 18:40 - 18:49 时段之间有数据，则返回该时段的数据；如果没有数据，则向前查询最近一个有数据的时段数据，并返回。

**描述：** 获取单个（指定）存储桶（Bucket）的各项监控数据

**请求方法：** POST

**参数：** 无

| **名称**        |   **类型**   |  **是否必需** | **描述**                                                         |
| ----------- | ------ | -------- | ------------------------------------------------------------ |
| BucketName | 字符串 | 是       | 存储桶名称                                                   |
| RequestTime  | 时间字符串 | 否       | 请求该时间最近一次的监控数据。如果没有设置该参数，服务端会采用当前时间作为默认值。时间格式：2024-07-06 18:42:00   |

**headers参数：**

| 名称 | 类型   | 是否必需 | 描述                                                         |
| ---- | ------ | -------- | ------------------------------------------------------------ |
| endpoint | 字符串 | 是       | 存储空间所在节点 endpoint 地址。示例：{'endpoint': 'oss-cnsq02.cdsgss.com'} 其中 oss-cnsq02.cdsgss.com 为宿迁节点的 endpoint 地址 |

**响应参数：**

| **名称**          | **单位**         | **含义**                                 |
| ------------- | ------------ | ---------------------------------------- |
| BucketName   | /            | 存储桶名称                                       |
| StartTime   | /             | 监控数据的开始时间                                |
| EndTime   | /               | 监控数据的结束时间                                |
| CapacityUsed | 字节（byte）  | 存储桶已使用的容量                                 |
| ObjectCount     | 个        | 存储桶中对象数量                                  |
| InBandwidth  | 字节（byte）  | 上传总流量                                       |
| OutBandwidth | 字节（byte）  | 下载总流量                                       |
| Network | 流量类型            | 内网流量：inner，外网流量：flow，CDN回源流量：cdn    |
| TotalCount  | 个            | GET/PUT/POST/DELETE/HEADER 请求次数              |
| TotalTime  | 微秒（μs）      | GET/PUT/POST/DELETE/HEADER 累计请求耗时          |
| 2xx           | 个           | http 2xx 响应码个数                              |
| 3xx           | 个           | http 3xx 响应码个数                              |
| 4xx           | 个           | http 4xx 响应码个数                              |
| 5xx           | 个           | http 5xx 响应码个数                              |



**注意事项：**

- DescribeBucketMetrics，有如下注意事项：
  - 仅限宿迁站点指定用户


**Python 请求示例：**

```
def request_describe_bucket_metrics():
    base_url = 'http://gic-ossapi.capitalonline.net/ossapi/v2/DescribeBucketMetrics'
    bucket = "xxx"
    endpoint = "xxxx"
    access_key = 'xxx'
    secret_key = 'xxx'
    request_time = "2024-07-10 15:21:00"
    action = "DescribeBucketMetrics"
    method = "POST"
    body = {
        "BucketName": bucket,
        "RequestTime": request_time,  # 非必填项
    }

    headers = {
        'content-type': 'application/json',
        "endpoint": '%s.%s' % (bucket, endpoint)
    }

    data = json.dumps(body)
    url = base_url + "/?" + signature(action, access_key, secret_key, method)
    resp = requests.post(url, headers=headers, data=data)
    print(f'request url: {url} body: {data} resp: {resp}')
```

**返回示例：**

```
{
    "Code": "Success",
    "Msg": "Success",
    "Data": {
        "RequestTime": "2024-07-07T11:17:42",
        "BucketName": "xxx",
        "Usage": {
            "StartTime": "2024-07-07T11:00:00",
            "EndTime": "2024-07-07T11:09:59",
            "CapacityUsed": 1153478656,
            "ObjectCount": 11
        },
        "NetworkTraffic": [
            {
                "StartTime": "2024-07-07T11:00:00",
                "EndTime": "2024-07-07T11:09:59",
                "Network": "inner",
                "InBandwidth": 0,
                "OutBandwidth": 710,
                "Put": {
                    "TotalCount": 0,
                    "TotalTime": 0,
                    "CountDetail": {
                        "2xx": 0,
                        "3xx": 0,
                        "4xx": 0,
                        "5xx": 0
                    }
                },
                "Get": {
                    "TotalCount": 2,
                    "TotalTime": 153873,
                    "CountDetail": {
                        "2xx": 2,
                        "3xx": 0,
                        "4xx": 0,
                        "5xx": 0
                    }
                },
                "Delete": {
                    "TotalCount": 0,
                    "TotalTime": 0,
                    "CountDetail": {
                        "2xx": 0,
                        "3xx": 0,
                        "4xx": 0,
                        "5xx": 0
                    }
                },
                "Post": {
                    "TotalCount": 0,
                    "TotalTime": 0,
                    "CountDetail": {
                        "2xx": 0,
                        "3xx": 0,
                        "4xx": 0,
                        "5xx": 0
                    }
                },
                "Head": {
                    "TotalCount": 0,
                    "TotalTime": 0,
                    "CountDetail": {
                        "2xx": 0,
                        "3xx": 0,
                        "4xx": 0,
                        "5xx": 0
                    }
                }
            },
            {
                "StartTime": "2024-07-05T20:30:00",
                "EndTime": "2024-07-05T20:39:59",
                "Network": "flow",
                "InBandwidth": 1153440717,
                "OutBandwidth": 8470,
                "Put": {
                    "TotalCount": 77,
                    "TotalTime": 9902016,
                    "CountDetail": {
                        "2xx": 77,
                        "3xx": 0,
                        "4xx": 0,
                        "5xx": 0
                    }
                },
                "Get": {
                    "TotalCount": 11,
                    "TotalTime": 198003,
                    "CountDetail": {
                        "2xx": 11,
                        "3xx": 0,
                        "4xx": 0,
                        "5xx": 0
                    }
                },
                "Delete": {
                    "TotalCount": 0,
                    "TotalTime": 0,
                    "CountDetail": {
                        "2xx": 0,
                        "3xx": 0,
                        "4xx": 0,
                        "5xx": 0
                    }
                },
                "Post": {
                    "TotalCount": 22,
                    "TotalTime": 772349,
                    "CountDetail": {
                        "2xx": 22,
                        "3xx": 0,
                        "4xx": 0,
                        "5xx": 0
                    }
                },
                "Head": {
                    "TotalCount": 0,
                    "TotalTime": 0,
                    "CountDetail": {
                        "2xx": 0,
                        "3xx": 0,
                        "4xx": 0,
                        "5xx": 0
                    }
                }
            }
        ]
    },
    "RequestId": "094fee75447d4439aa3c27766a0cd8a6"
}
```


