MongoDB 公开API目录
=================
* [API概览](#api概览)
* [认证方式](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#认证方式)
  * [1.公共请求参数](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#1公共请求参数)
  * [2.签名机制](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#2签名机制)
    * [步骤一：构造规范化请求字符串](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#步骤一构造规范化请求字符串)
    * [步骤二：构造签名字符串](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#步骤二构造签名字符串)
  * [3.获取签名代码](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#2获取签名代码)
* [错误码](#错误码)
* [访问地址](#访问地址)
* [实例](#实例)
    * [1.DescribeZones](#1describezones)
    * [2.DescribeSpecInfo](#2describespecinfo)
    * [3.CreateDBInstance](#3createdbinstance)
    * [4.DescribeDBInstances](#4describedbinstances)
    * [5.DeleteDBInstance](#5deletedbinstance)

### API概览

MongoDB产品提供以下相关API接口。

#### 实例

| API                 | 描述                                      |
| ------------------- | ----------------------------------------- |
| DescribeZones       | 获取云数据库MongoDB支持的站点区域         |
| DescribeSpecInfo    | 获取某个站点支持的MongoDB产品类型以及规格 |
| CreateDBInstance    | 创建MongoDB云数据库实例                   |
| DescribeDBInstances | 获取MongoDB实例列表                       |
| DeleteDBInstance    | 删除MongoDB实例                           |

#### 错误码

| **HttpCode** | **错误码**           | **描述**                         |
| ------------ | -------------------- | -------------------------------- |
| 400          | ArgMissing           | 缺少参数错误                     |
| 400          | InvalidParameter     | 参数错误                         |
| 400          | BadArgs              | 参数错误                         |
| 400          | UnsupportedOperation | 操作不支持                       |
| 404          | ResourceNotFound     | 资源不存在                       |
| 409          | ResourceInUse        | 资源正在被其他任务占用，操作冲突 |
| 500          | InternalError        | 内部错误                         |
| 500          | CreateOrderExcept    | 创建订单异常                     |

### 访问地址


| 地区     | 访问地址                      |
| -------- | ----------------------------- |
| 中国大陆 | cdsapi.capitalonline.net      |
| 亚太地区 | cdsapi-asia.capitalonline.net |
| 欧美地区 | cdsapi-us.capitalonline.net   |

### 1.DescribeZones

**Action：** DescribeZones

**描述：** 获取云数据库MongoDB支持的站点区域

**请求地址：** cdsapi.capitalonline.net/mongodb/v1

**请求方法：** GET

**请求参数：**

无

**请求示例：**

```python
def get_mongodb_Zones():
    """
    获取云数据库Mongodb支持的站点区域
    """
    action = "DescribeZones"
    method = "GET"
    param = {
    }
    url = get_signature(action, AK, AccessKeySecret, method, MONGODB_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
    result = json.dumps(result)  # json格式化
    print(result)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Data": [{
        "CityId": "3082f45e-306e-11e7-9796-0050569b4d9c",
        "CityName": "洛杉矶",
        "IsSaling": 1,
        "RegionId": "US_LosAngeles_A",
        "RegionName": "北美地区",
        "SiteName": "洛杉矶1"
    }, {
        "CityId": "7b98a5d1-306e-11e7-9796-0050569b4d9c",
        "CityName": "法兰克福",
        "IsSaling": 1,
        "RegionId": "EUR_Germany_A",
        "RegionName": "欧洲地区",
        "SiteName": "德国1"
    }, {
        "CityId": "8737606f-306d-11e7-9796-0050569b4d9c",
        "CityName": "东京",
        "IsSaling": 1,
        "RegionId": "APAC_Tokyo_A",
        "RegionName": "亚太地区",
        "SiteName": "东京1"
    }, {
        "CityId": "27b57297-306d-11e7-9796-0050569b4d9c",
        "CityName": "香港",
        "IsSaling": 1,
        "RegionId": "CN_Hongkong_A",
        "RegionName": "亚太地区",
        "SiteName": "香港1"
    }, {
        "CityId": "a8937b00-306d-11e7-9796-0050569b4d9c",
        "CityName": "新加坡",
        "IsSaling": 1,
        "RegionId": "APAC_Singapore_A",
        "RegionName": "亚太地区",
        "SiteName": "新加坡1"
    }, {
        "CityId": "154ed19e-306e-11e7-9796-0050569b4d9c",
        "CityName": "纽约",
        "IsSaling": 1,
        "RegionId": "US_NewYork_A",
        "RegionName": "北美地区",
        "SiteName": "纽约1"
    }, {
        "CityId": "ea3ca775-306c-11e7-9796-0050569b4d9c",
        "CityName": "北京",
        "IsSaling": 1,
        "RegionId": "CN_Beijing_E",
        "RegionName": "中国大陆",
        "SiteName": "北京5"
    },  {
        "CityId": "e48e2312-306d-11e7-9796-0050569b4d9c",
        "CityName": "达拉斯",
        "IsSaling": 1,
        "RegionId": "US_Dallas_A",
        "RegionName": "北美地区",
        "SiteName": "达拉斯1"
    }, {
        "CityId": "713d3745-306d-11e7-9796-0050569b4d9c",
        "CityName": "台北",
        "IsSaling": 1,
        "RegionId": "CN_Taipei_A",
        "RegionName": "亚太地区",
        "SiteName": "台北1"
    },  {
        "CityId": "c11a5abe-3f7e-11e7-86b1-0242ac11000e",
        "CityName": "广州",
        "IsSaling": 1,
        "RegionId": "CN_Guangzhou_A",
        "RegionName": "中国大陆",
        "SiteName": "广州1"
    }],
    "Message": "Success."
}
```

**返回参数说明：**

| 参数名     | 类型   | 说明                                                   |
| :--------- | :----- | ------------------------------------------------------ |
| Code       | string | 状态码                                                 |
| Data       | dict   | 数据                                                   |
| CityId     | string | 城市编号                                               |
| CityName   | string | 城市名称                                               |
| IsSaling   | int    | 站点是否能购买服务，1：站点支持购买；0：资源不足以下线 |
| RegionId   | string | 区域编号                                               |
| RegionName | string | 区域名称                                               |
| SiteName   | string | 站点名称                                               |
| Message    | string | 信息描述                                               |



### 2.DescribeSpecInfo

**Action：** DescribeSpecInfo

**描述：** 获取某个站点支持的MongoDB产品类型以及规格

**请求地址：** cdsapi.capitalonline.net/mongodb/v1

**请求方法：** GET

**请求参数：**

| 参数名   | 必选 | 类型   | 说明     |
| :------- | :--- | :----- | -------- |
| RegionId | 是   | string | 站点编号 |

**请求示例：**

```python
def get_mongodb_spec_info(RegionId):
    """
    获取某个站点支持的Mongodb产品类型以及规格
    :param RegionId:
    """
    action = "DescribeSpecInfo"
    method = "GET"
    param = {
        "RegionId": RegionId
    }
    url = get_signature(action, AK, AccessKeySecret, method, MONGODB_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
    result = json.dumps(result)  # json格式化
    print(result)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "ProductName": "mongodb",
        "Products": [{
            "Architectures": [{
                "ArchitectureName": "副本集",
                "ComputeRoles": [{
                    "ComputeName": "高性能型",
                    "Standards": {
                        "AttachDisk": [{
                            "BasicIops": "3000",
                            "DiskMax": 2000,
                            "DiskMaxExpand": 2000,
                            "DiskMin": 100,
                            "DiskName": "性能型",
                            "DiskStep": 100,
                            "DiskUnit": "G",
                            "DiskValue": "high_disk"
                        }],
                        "CpuRam": [{
                            "CPU": 1,
                            "Name": "1C2G",
                            "PaasGoodsId": 7292,
                            "RAM": 2
                        }, {
                            "CPU": 2,
                            "Name": "2C4G",
                            "PaasGoodsId": 7295,
                            "RAM": 4
                        }, {
                            "CPU": 4,
                            "Name": "4C8G",
                            "PaasGoodsId": 7298,
                            "RAM": 8
                        }, {
                            "CPU": 8,
                            "Name": "8C16G",
                            "PaasGoodsId": 7301,
                            "RAM": 16
                        }, {
                            "CPU": 8,
                            "Name": "8C32G",
                            "PaasGoodsId": 7307,
                            "RAM": 32
                        }, {
                            "CPU": 8,
                            "Name": "8C24G",
                            "PaasGoodsId": 7304,
                            "RAM": 24
                        }]
                    }
                }],
                "EnginesType": ["WiredTiger"],
                "NetworkLinks": [{
                    "DescDetail": "默认链路：服务实例占用VDC私有网络IP地址，适用于对延迟敏感类型的应用。",
                    "LinkType": "default_link",
                    "Name": "默认链路",
                    "SplitRwSwitch": 1
                }],
                "SubProductName": "MongoDB 副本集版"
            }],
            "Version": "3.4.21"
        }],
        "RegionId": "CN_Hongkong_A"
    },
    "Message": "Success.",
    "TaskId": ""
}
```

**返回参数说明：**

| 参数名           | 类型   | 说明                                                         |
| :--------------- | :----- | ------------------------------------------------------------ |
| Message          | string | 信息描述                                                     |
| Code             | string | 状态码                                                       |
| TaskId           | string | 任务Id                                                       |
| Data             | dict   | 数据                                                         |
| Products         | list   | 该类产品支持的产品列表                                       |
| ProductName      | string | 产品名称                                                     |
| SubProductName   | string | 子产品名称                                                   |
| Version          | string | 产品支持的版本                                               |
| Architectures    | string | 产品支持的架构                                               |
| ArchitectureName | string | 架构名称                                                     |
| NetworkLinks     | list   | 此架构支持的链路类型                                         |
| DescDetail       | string | 链路类型描述                                                 |
| LinkType         | string | 链路类型“英文”                                               |
| Name             | string | 链路类型“中文”                                               |
| ComputeRoles     | list   | 支持的计算类型，不同的计算类型支持不同规格，并支持添加不同类型的硬盘 |
| Standards        | dict   | 该类型支持的规格                                             |
| CpuRam           | list   | 支持的规格列表                                               |
| CPU              | int    | 规格CPU大小                                                  |
| RAM              | int    | 规格RAM大小                                                  |
| Name             | string | 规格名称                                                     |
| PaasGoodsId      | int    | 具体的产品编号，根据产品编号确定购买哪一种规格               |
| AttachDisk       | list   | 该类型规格能够添加的磁盘类型列表                             |
| DiskMax          | int    | 单次支持最大规格的磁盘                                       |
| DiskValue        | string | 磁盘类型,用于创建服务实例指定磁盘类型 (创建服务时候使用)     |
| BasicIops        | string | 基础的磁盘的iops                                             |
| DiskUnit         | string | 磁盘规格单位                                                 |
| DiskName         | string | 磁盘类型名称                                                 |
| DiskMaxExpand    | string | 磁盘最大可扩容大小                                           |
| DiskMin          | string | 磁盘最小大小                                                 |
| DiskStep         | string | 磁盘扩容大小                                                 |
| EnginesType      | string | 引擎类型                                                     |



### 3.CreateDBInstance

**Action：** CreateDBInstance

**描述：** 创建MongoDB云数据库实例

**请求地址：** cdsapi.capitalonline.net/mongodb/v1

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型   | 说明                                           |
| :----------- | :--- | :----- | ---------------------------------------------- |
| RegionID     | 是   | string | 站点编号                                       |
| VdcID        | 是   | string | 数据中心的编号                                 |
| BasePipeId   | 是   | string | 数据中心的私网编号，创建服务将按这个私网分配id |
| InstanceName | 是   | string | 实例名称                                       |
| PaasGoodsId  | 是   | int    | 产品的规格编号，注意：对比旧版使用Integer类型  |
| DiskType     | 是   | string | 磁盘类型                                       |
| DiskValue    | 是   | int    | 磁盘大小                                       |
| Password     | 是   | string | Mongodb 最高权限数据库密码                     |
| Version      | 否   | string | 实例的版本，默认4.0.3，参数范围["4.0.3","3.6.7","3.2.21"]                     |

**请求示例：**

```python
def create_mongodb():
    """
    创建MongoDB实例
    """
    action = "CreateDBInstance"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, MONGODB_URL, param=param)
    body = {
        "RegionId": "******",
        "VdcId": "*******",
        "BasePipeId": "******",
        "InstanceName": "******",
        "PaasGoodsId": "******",
        "DiskType": "high_disk",
        "DiskValue": 100,
        "Version":"4.0.3",
        "Password": "******",
    }

    res = requests.post(url, json=body)
    result = json.loads(res.content)
    print(result)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "InstanceUuid":"****************"
    },
    "Message": "Success.",
    "TaskId": ""
}
```

**返回参数说明：**

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Code    | string | 状态码   |
| Data    | dict   | 数据     |
| InstanceUuid    | string   | 实例的编码     |
| Message | string | 信息描述 |
| TaskId  | string | 任务id   |



### 4.DescribeDBInstances

**Action：** DescribeDBInstances

**描述：** 获取MongoDB实例列表（支持常见字段过滤:实例编号、实例名称、实例IP）

**请求地址：** cdsapi.capitalonline.net/mongodb/v1

**请求方法：** GET

**请求参数：**

| 参数名       | 必选 | 类型   | 说明             |
| :----------- | :--- | :----- | ---------------- |
| InstanceUuid | 否   | string | 要过滤的实例编号 |
| InstanceName | 否   | string | 要过滤的实例名称 |
| IP           | 否   | string | 要过滤的实例ip   |

**请求示例：**

```python
def get_mongodb_instances_list():
    """
    获取Mongodb实例列表(可根据ip、instance_uuid、instance_name过滤)
    """
    action = "DescribeDBInstances"
    method = "GET"
    param = {
        "IP": "66.66"  
    }
    url = get_signature(action, AK, AccessKeySecret, method, MONGODB_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Data": [{
        "CloneServices": null,
        "DisplayName": "亚太地区-香港-可用区A",
        "IP": "66.66.0.44",
        "InstanceName": "test-mongodb",
        "InstanceUuid": "9a5a796c-78ab-4b1c-88a4-ba9d9e8c996b",
        "LinkType": "default_link",
        "LinkTypeStr": "默认链路",
        "MasterInfo": "",
        "Port": 27017,
        "Ram": 2048,
        "RegionId": "CN_Hongkong_A",
        "RelationService": null,
        "ResourceId": "71bf731e-7cc8-4307-8408-4952e4dcd470",
        "Status": "RUNNING",
        "StatusStr": "运行中",
        "SubProductName": "MongoDB 副本集版",
        "VdcId": "d459c74b-d60e-4f28-adbb-67be402f76f3",
        "VdcName": "香港PaaS",
        "Version": "4.0.3"
    }],
    "Message": "Success."
}
```

**返回参数说明：**

| 参数名          | 类型   | 说明                     |
| :-------------- | :----- | ------------------------ |
| Code            | string | 状态码                   |
| Data            | dict   | 数据                     |
| CloneServices   | list   | 克隆的临时实例列表       |
| DisplayName     | string | 可用区                   |
| IP              | string | 数据库的连接的IP         |
| InstanceName    | string | 实例名称                 |
| InstanceUuid    | string | 实例编号                 |
| LinkType        | string | 链路类型名称             |
| LinkTypeStr     | string | 链路类型名称对应中文     |
| MasterInfo      | dict   | 从属集群，只读服务会有值 |
| Port            | int    | 连接的端口               |
| Ram             | int    | 内存 单位M               |
| RegionId        | string | 站点编号                 |
| RelationService | dict   | 相关联的服务实例         |
| Status          | string | 实例状态                 |
| StatusStr       | string | 状态对应的中文           |
| SubProductName  | string | 子产品的名字             |
| VdcId           | string | 数据中心的编号           |
| VdcName         | string | 数据中心名称             |
| Version         | string | 服务版本                 |
| Message         | string | 信息描述                 |



### 5.DeleteDBInstance

**Action：** DeleteDBInstance

**描述：** 删除MongoDB实例

**请求地址：** cdsapi.capitalonline.net/mongodb/v1

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型   | 说明     |
| :----------- | :--- | :----- | -------- |
| InstanceUuid | 否   | string | 实例编号 |

**请求示例：**

```python
def delete_mongodb(instance_uuid, ):
    """
    删除MongoDB实例
    :param instance_uuid:
    """
    action = "DeleteDBInstance"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, MONGODB_URL, param=param)
    body = {
        "InstanceUuid": instance_uuid,
    }

    res = requests.post(url, json=body)
    result = json.loads(res.content)
    print(result)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Data": {},
    "Message": "Success.",
    "TaskId": "***************"
}
```

**返回参数说明：**

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Code    | string | 状态码   |
| Data    | dict   | 数据     |
| Message | string | 信息描述 |
| TaskId  | string | 任务编号 |
