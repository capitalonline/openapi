Memcached 公开API目录
=================
* [API概览](#api概览)
* [认证方式](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#认证方式)
  * [1.公共请求参数](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#1公共请求参数)
  * [2.签名机制](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#2签名机制)
    * [步骤一：构造规范化请求字符串](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#步骤一构造规范化请求字符串)
    * [步骤二：构造签名字符串](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#步骤二构造签名字符串)
  * [3.获取签名代码](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#2获取签名代码)
* [访问地址](#访问地址)
* [实例](#实例)
    * [1.CreateMemcachedInstance](#1creatememcachedinstance)
    * [2.MemcachedInstanceList](#2memcachedinstancelist)
    * [3.DescribeMemcachedInstance](#3describememcachedinstance)
    * [4.DeleteMemcachedInstance](#4deletememcachedinstance)
    * [5.ClearMemcachedInstance](#5clearmemcachedinstance)
    * [6.UpdateMemcachedInstance](#6updatememcachedinstance)

### API概览

Memcached产品提供以下相关API接口。

#### 实例

| API                 | 描述                                   |
| ------------------- | ------------------------------------- |
| CreateMemcachedInstance       |创建一台或多台按需计费的memcached的机器        |
| MemcachedInstanceList    | 获取memcached数据库实例列表页 |
| DescribeMemcachedInstance    | 获取memcached数据库实例详情页                 |
| DeleteMemcachedInstance | 删除memcached数据库实例                     |
| ClearMemcachedInstance | 清空memcached数据库实例                  |
| UpdateMemcachedInstance    | 更新memcached数据库实例配置                         |

### 访问地址


| 地区     | 访问地址                      |
| -------- | ----------------------------- |
| 中国大陆 | cdsapi.capitalonline.net      |
| 亚太地区 | cdsapi-asia.capitalonline.net |
| 欧美地区 | cdsapi-us.capitalonline.net   |


### 1.CreateMemcachedInstance

 **Action：CreateMemcached**

 **描述** 创建一台或多台按需计费的memcached的机器。

 **请求地址:** cdsapi.capitalonline.net/memcached

 **请求方法：POST**

 **请求参数:**

| 名称         | 类型   | 是否必选 | 示例                                   | 描述                             |
| ------------ | ------ |------|--------------------------------------| -------------------------------- |
| InstanceName | String | 否    | test                                 | memcached实例名称                |
| ConfSize     | String | 是    | 1G                                   | memcached配置大小 可选大小1G-10G |
| VdcId        | string | 是    | a58052bf-3bfc-4d0c-a3a5-0bcca72589f5 | 虚拟数据中心id                   |
| PipeId       | string | 是    | 48de2f3c-b3df-11ec-8bed-e6717c813be8 | 虚拟数据中心网段主键ID           |
| Amount       | int    | 否    | 1                                    | 创建的数据 可选1-10              |
| RegionId     | string | 是    | CN_Beijing_H                         | 区域id                           |

**代码调用示例：**

~~~python
def create_memcached_instance(ConfSize, VdcId, PipeId, RegionId, InstanceName="", Amount=1):
    action = "CreateMemcachedInstance"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL, param={})
    body = {"ConfSize": ConfSize,
            "VdcId": VdcId,
            "PipeId": PipeId,
            "RegionId": RegionId}
    if InstanceName:
        body["InstanceName"] = InstanceName
    if Amount:
        body["Amount"] = Amount
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    return result
~~~

**返回示例：**

~~~json
{
    "Code":"Success",
    "Data":{
        "InstanceIds":[
            "4e3bb828-c6a4-11ec-95eb-b2d9e44608b0"
        ],
        "TaskIds":[
            915
        ]
    },
    "Message":"任务下发成功！"
}
~~~

**返回参数:**

| 名称        | 类型   | 示例值                                   | 描述     |
| ----------- | ------ | ---------------------------------------- | -------- |
| Code        | string | 0000                                     | 错误码   |
| message     | string | 任务下发成功！                           | 任务信息 |
| InstanceIds | List   | ['285656f8-c547-11ec-8cc4-4279b2da6491'] | 实例id   |
| TaskIds     | list   | [857]                                    | 任务id   |

**错误码:**

| httpcode | 错误码   | 错误信息                                                  | 描述         |
| -------- | -------- | --------------------------------------------------------- | ------------ |
| 20001    | 参数错误 | 参数缺失，conf_size，site_id ，app_id， pipe_id为必传参数 | 请求参数错误 |

### 2.MemcachedInstanceList

 **Action：MemcachedInstanceList**

 **描述** 获取memcached数据库实例列表页。

 **请求地址:** cdsapi.capitalonline.net/memcached

 **请求方法：POST**

 **请求参数:**

| 名称    | 类型   | 是否必选 | 示例                                 | 描述                                   |
| ------- | ------ | -------- | ------------------------------------ | -------------------------------------- |
| VdcId   | string | 否       | a58052bf-3bfc-4d0c-a3a5-0bcca72589f5 | 虚拟数据中心id                         |
| Keyword | string | 否       | Test                                 | 关键字查询，可以查ip，实例名称和实例id |

**代码调用示例：**

~~~python
def memcached_instance_list(VdcId="", Keyword=""):

    action = "MemcachedInstanceList"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL, param={})
    body = {}
    if VdcId:
        body["VdcId"] = VdcId
    if Keyword:
        body["Keyword"] = Keyword
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    return result
~~~

**返回示例：**

~~~json
{
    "Code":"Success",
    "Data":{
        "CreatingTotal":0,
        "DeletingTotal":0,
        "ErrorTotal":0,
        "InstanceList":[
            {
                "Address":"10.240.166.8",
                "AppName":"wx-memcache",
                "BillMethod":"0",
                "ConfName":"Memcached单机版",
                "CreateTime":"2022-04-27 18:13:30",
                "InstanceConf":"1G",
                "InstanceId":"439b83f4-c612-11ec-95eb-b2d9e44608b0",
                "InstanceName":"api测试11-pre",
                "Port":"11211",
                "SiteName":"中国大陆-北京-可用区H",
                "Status":"running",
                "UpdateTime":"2022-04-27 18:10:28",
                "Version":"Memcached1.6"
            }
        ],
        "RunningTotal":1,
        "Total":1,
        "UpdatingTotal":0
    },
    "Message":"获取memcached列表成功！"
}
~~~

**返回参数:**

| 名称          | 类型   | 示例值                               | 描述               |
| ------------- | ------ | ------------------------------------ | ------------------ |
| CreatingTotal | Int    | 0                                    | 创建中实例的数量   |
| DeletingTotal | Int    | 0                                    | 删除中实例的数量   |
| ErrorTotal    | Int    | 0                                    | 错误实例的数量     |
| RunningTotal  | Int    | 0                                    | 运行中实例的数量   |
| Total         | Int    | 0                                    | 实例的总数量       |
| UpdatingTotal | Int    | 0                                    | 更新中实例的总数量 |
| SiteName      | string | 亚太地区-中国香港-可用区B            | 节点信息           |
| AppName       | string | memcached服务端测试                  | vdc名称            |
| InstanceId    | string | 4733bae6-bc84-11ec-8ced-acde48001122 | 实例id             |
| InstanceName  | string | zn-test                              | 实例名称           |
| CreateTime    | string | 2022-04-15 13:21:25                  | 创建时间           |
| UpdateTime    | string | 2022-04-15 14:21:25                  | 更新时间           |
| BillMethod    | string | 0                                    | 计费方式           |
| Status        | string | running                              | 实例状态           |
| Version       | string | Memcached1.6                         | 版本               |
| ConfName      | string | Memcached单机版                      | 配置信息           |
| Address       | string | 10.240.12.29                         | 内网地址           |
| Port          | int    | 11211                                | 端口               |
| InstanceConf  | string | 1G                                   | 实例配置           |

**错误码:**

| httpcode | 错误码   | 错误信息                       | 描述         |
| -------- | -------- | ------------------------------ | ------------ |
| 20001    | 参数错误 | customer_id和user_id为必传参数 | 请求参数错误 |

### 3.DescribeMemcachedInstance

 **Action：DescribeMemcachedInstance**

 **描述** 获取memcached数据库实例详情页。

 **请求地址:** cdsapi.capitalonline.net/memcached

 **请求方法：POST**

 **请求参数:**

| 名称       | 类型   | 是否必选 | 示例                                 | 描述   |
| ---------- | ------ | -------- | ------------------------------------ | ------ |
| InstanceId | string | 是       | a58052bf-3bfc-4d0c-a3a5-0bcca72589f5 | 实例id |

**代码调用示例：**

~~~python
def describe_memcached_instance(InstanceId=""):
    action = "DescribeMemcachedInstance"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL, param={})
    body = {"InstanceId": InstanceId}
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    return result
~~~

**返回示例：**

~~~json
{
    "Code":"Success",
    "Data":{
        "Address":"10.240.166.7",
        "AppName":"wx-memcache",
        "BillMethod":"0",
        "Coon":10000,
        "CreateTime":"2022-04-27 10:31:39",
        "GoodsId":"17129",
        "InstanceConf":"2G",
        "InstanceId":"d37e3944-c5d1-11ec-b023-d21e41ec5741",
        "InstanceName":"api测试11-pre",
        "Port":"11211",
        "RunningTime":"0个月1天1小时1分47秒",
        "SiteId":"CN_Beijing_H",
        "SiteName":"中国大陆-北京-可用区H",
        "Status":"running",
        "Version":"Memcached1.6"
    },
    "Message":"获取Memcached详情成功！"
}
~~~

**返回参数:**

| 名称         | 类型   | 示例值                               | 描述       |
| ------------ | ------ | ------------------------------------ | ---------- |
| SiteName     | string | 亚太地区-中国香港-可用区B            | 节点信息   |
| SiteId       | String | CN_Beijing_H                         | 地域id     |
| AppName      | string | memcached服务端测试                  | vdc名称    |
| InstanceId   | string | 4733bae6-bc84-11ec-8ced-acde48001122 | 实例id     |
| InstanceName | string | zn-test                              | 实例名称   |
| CreateTime   | string | 2022-04-15 13:21:25                  | 创建时间   |
| update_time  | string | 2022-04-15 14:21:25                  | 更新时间   |
| BillMethod   | string | 0                                    | 计费方式   |
| Status       | string | running                              | 实例状态   |
| Version      | string | Memcached1.6                         | 版本       |
| conf_name    | string | Memcached单机版                      | 配置信息   |
| Address      | string | 10.240.12.29                         | 内网地址   |
| Port         | int    | 11211                                | 端口       |
| InstanceConf | string | 1G                                   | 实例配置   |
| Coon         | int    | 10000                                | 最大连接数 |
| RunningTime  | string | 0个月2天0小时0分15秒                 | 运行时间   |
| GoodsId      | string | 6055                                 | 商品id     |

**错误码:**

| httpcode | 错误码   | 错误信息                       | 描述         |
| -------- | -------- | ------------------------------ | ------------ |
| 20001    | 参数错误 | customer_id和user_id为必传参数 | 请求参数错误 |

### 4.DeleteMemcachedInstance

 **Action：DeleteMemcachedInstance**

 **描述** 删除memcached数据库实例。

 **请求地址:** cdsapi.capitalonline.net/memcached

 **请求方法：POST**

 **请求参数:**

| 名称       | 类型   | 是否必选 | 示例                                 | 描述   |
| ---------- | ------ | -------- | ------------------------------------ | ------ |
| InstanceId | string | 是       | a58052bf-3bfc-4d0c-a3a5-0bcca72589f5 | 实例id |

**代码调用示例：**

~~~python
def delete_memcached_instance(InstanceId):
    action = "DeleteMemcachedInstance"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL, param={})
    body = {"InstanceId": InstanceId}
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    return result
~~~

**返回示例：**

~~~json
{
    "Code":"Success",
    "Data":{
        "TaskId":918
    },
    "Message":"删除实例任务下发成功！"
}
~~~

**返回参数:**

| 名称    | 类型   | 示例值         | 描述     |
| ------- | ------ | -------------- | -------- |
| Code    | string | 0000           | 错误码   |
| Message | string | 任务下发成功！ | 任务信息 |
| TaskId  | int    | 889            | 任务id   |

**错误码:**

| httpcode | 错误码   | 错误信息                       | 描述         |
| -------- | -------- | ------------------------------ | ------------ |
| 20001    | 参数错误 | customer_id和user_id为必传参数 | 请求参数错误 |

### 5.ClearMemcachedInstance

 **Action：ClearMemcachedInstance**

 **描述** 清空memcached数据库实例。

 **请求地址:** cdsapi.capitalonline.net/memcached

 **请求方法：POST**

 **请求参数:**

| 名称       | 类型   | 是否必选 | 示例                                 | 描述   |
| ---------- | ------ | -------- | ------------------------------------ | ------ |
| InstanceId | string | 是       | a58052bf-3bfc-4d0c-a3a5-0bcca72589f5 | 实例id |

**代码调用示例：**

~~~python
def clear_memcached_instance(InstanceId):
    action = "ClearMemcachedInstance"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL, param={})
    body = {"InstanceId": InstanceId}
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    return result
~~~

**返回示例：**

~~~json
{
    "Code":"Success",
    "Data":{
        "TaskId":917
    },
    "Message":"清空memcached的数据信息成功"
}
~~~

**返回参数:**

| 名称    | 类型   | 示例值         | 描述     |
| ------- | ------ | -------------- | -------- |
| Code    | string | 0000           | 错误码   |
| Message | string | 任务下发成功！ | 任务信息 |
| TaskId  | Int    | 888            | 任务id   |

**错误码:**

| httpcode | 错误码   | 错误信息                       | 描述         |
| -------- | -------- | ------------------------------ | ------------ |
| 20001    | 参数错误 | customer_id和user_id为必传参数 | 请求参数错误 |

### 6.UpdateMemcachedInstance

 **Action：UpdateMemcachedInstance**

 **描述** 更新memcached数据库实例配置。

 **请求地址:** cdsapi.capitalonline.net/memcached

 **请求方法：POST**

 **请求参数:**

| 名称       | 类型   | 是否必选 | 示例                                 | 描述         |
| ---------- | ------ | -------- | ------------------------------------ | ------------ |
| InstanceId | string | 是       | a58052bf-3bfc-4d0c-a3a5-0bcca72589f5 | 实例id       |
| ConfSize   | string | 是       | 2G                                   | 实例配置大小 |

**代码调用示例：**

~~~python
def UpdateMemcachedInstance(InstanceId, ConfSize):
    action = "UpdateMemcachedInstance"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL, param={})
    body = {"InstanceId": InstanceId, "ConfSize": ConfSize}
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    return result
~~~

**返回示例：**

~~~json
{
    "Code":"Success",
    "Data":{
        "TaskId":916
    },
    "Message":"清空memcached的数据信息成功"
}
~~~

**返回参数:**

| 名称    | 类型   | 示例值         | 描述     |
| ------- | ------ | -------------- | -------- |
| Code    | string | 0000           | 错误码   |
| Message | string | 任务下发成功！ | 任务信息 |
| TaskId  | int    | 885            | 任务id   |

**错误码:**

| httpcode | 错误码   | 错误信息                       | 描述         |
| -------- | -------- | ------------------------------ | ------------ |
| 20001    | 参数错误 | customer_id和user_id为必传参数 | 请求参数错误 |
