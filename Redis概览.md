Redis 公开API目录
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
    * [1.DescribeRegins](#1describeregins)
    * [2.DescribeAvailableDBConfig](#2describeavailabledbconfig)
    * [3.CreateDBInstance](#3createdbinstance) 
    * [4.DescribeDBInstances](#4describedbinstances)
    * [5.DeleteDBInstance](#5deletedbinstance)
    * [6.DescribeBackups](#6describebackups)
    * [7.DownloadBackup](#7downloadbackup)
    * [8.CreateBackup](#8createbackup)
    * [9.DeleteBackup](#9deletebackup)

### API概览

云数据库Redis提供以下API接口。

#### 实例

| API                       | 描述                                      |
| ------------------------- | ----------------------------------------- |
| DescribeRegins            | 获取云数据库Redis支持购买的站点区域       |
| DescribeAvailableDBConfig | 获取某个站点可购买的Redis产品类型以及规格 |
| CreateDBInstance          | 创建Redis云数据库实例                     |
| DescribeDBInstances       | 查看Redis实例列表                         |
| DeleteDBInstance          | 删除Redis实例                            |

#### 备份

| API             | 描述                                |
| --------------- | ----------------------------------- |
| DescribeBackups | 获取备份集列表                      |
| DownloadBackup  | 获取备份文件信息及内网下载地址      |
| CreateBackup    | 创建备份（物理全备份，RDB格式文件） |
| DeleteBackup    | 删除备份文件                        |

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

### 1.DescribeRegins

**Action：DescribeRegins**

**描述：** 获取云数据库Redis支持购买的站点区域

**请求地址：** cdsapi.capitalonline.net/redis

**请求方法：** GET

**请求参数：**

无

**返回参数**：

| 参数名     | 类型   | 说明                                                   |
| :--------- | :----- | ------------------------------------------------------ |
| Message    | string | 信息描述                                               |
| Code       | string | 状态码                                                 |
| Data       | dict   | 数据                                                   |
| IsSaling   | int    | 站点是否能购买服务，1：站点支持购买；0：资源不足已下线 |
| CityId     | string | 城市编号                                               |
| CityName   | string | 城市名称                                               |
| SiteName   | string | 站点名称                                               |
| RegionId   | string | 站点编号                                               |
| RegionName | string | 区域名称                                               |

**请求示例：**

```python
def get_redis_Zones():
    """
    获取云数据库Redis支持的站点区域
    """
    action = "DescribeRegins"
    method = "GET"
    param = {
    }
    url = get_signature(action, AK, AccessKeySecret, method, REDIS_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
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
        "CityId": "5c432e0e-306e-11e7-9796-0050569b4d9c",
        "CityName": "阿姆斯特丹",
        "IsSaling": 1,
        "RegionId": "EUR_Netherlands_A",
        "RegionName": "欧洲地区",
        "SiteName": "荷兰1"
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
        "RegionId": "CN_Beijing_B",
        "RegionName": "中国大陆",
        "SiteName": "北京2"
    }, {
        "CityId": "ea3ca775-306c-11e7-9796-0050569b4d9c",
        "CityName": "北京",
        "IsSaling": 1,
        "RegionId": "CN_Beijing_E",
        "RegionName": "中国大陆",
        "SiteName": "北京5"
    }, {
        "CityId": "ea3ca775-306c-11e7-9796-0050569b4d9c",
        "CityName": "北京",
        "IsSaling": 1,
        "RegionId": "CN_Beijing_A",
        "RegionName": "中国大陆",
        "SiteName": "北京1"
    }, {
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
    }, {
        "CityId": "123d0d01-306d-11e7-9796-0050569b4d9c",
        "CityName": "无锡",
        "IsSaling": 1,
        "RegionId": "CN_Wuxi_A",
        "RegionName": "中国大陆",
        "SiteName": "无锡1"
    }, {
        "CityId": "87fcbbd6-be0a-11e7-9d6b-0242ac110004",
        "CityName": "首尔",
        "IsSaling": 1,
        "RegionId": "APAC_Seoul_A",
        "RegionName": "亚太地区",
        "SiteName": "首尔1"
    }, {
        "CityId": "ea3ca775-306c-11e7-9796-0050569b4d9c",
        "CityName": "北京",
        "IsSaling": 1,
        "RegionId": "CN_Beijing_C",
        "RegionName": "中国大陆",
        "SiteName": "北京3"
    }, {
        "CityId": "c11a5abe-3f7e-11e7-86b1-0242ac11000e",
        "CityName": "广州",
        "IsSaling": 1,
        "RegionId": "CN_Guangzhou_A",
        "RegionName": "中国大陆",
        "SiteName": "广州1"
    }, {
        "CityId": "b44355d0-65e7-11e7-8ea9-0050569b651c",
        "CityName": "上海",
        "IsSaling": 1,
        "RegionId": "CN_Shanghai_A",
        "RegionName": "中国大陆",
        "SiteName": "上海1"
    }, {
        "CityId": "ea3ca775-306c-11e7-9796-0050569b4d9c",
        "CityName": "北京",
        "IsSaling": 1,
        "RegionId": "",
        "RegionName": "中国大陆",
        "SiteName": "北京8"
    }],
    "Message": "Success."
}
```

### 2.DescribeAvailableDBConfig

**Action：DescribeAvailableDBConfig**

**描述：** 获取某个站点支持的Redis产品类型以及规格

**请求地址：** cdsapi.capitalonline.net/redis

**请求方法：** GET

**请求参数：**

| 参数名   | 必选 | 类型   | 说明     |
| :------- | :--- | :----- | -------- |
| RegionId | 是   | string | 站点编号 |

**返回参数**：

| 参数名           | 类型   | 说明                                                         |
| :--------------- | :----- | ------------------------------------------------------------ |
| Message          | string | 信息描述                                                     |
| Code             | string | 状态码                                                       |
| Data             | dict   | 数据                                                         |
| Products         | list   | 该类产品支持的产品列表                                       |
| Version          | string | 产品支持的版本                                               |
| Architectures    | string | 产品支持的架构                                               |
| ArchitectureName | string | 架构名称                                                     |
| NetworkLinks     | list   | 该架构支持的链路类型                                         |
| ComputeRoles     | list   | 支持的计算类型，不同的计算类型支持不同规格，并支持添加不同类型的硬盘 |
| Standards        | dict   | 该类型支持的规格                                             |
| CpuRam           | list   | 支持的规格列表                                               |
| PaasGoodsId      | int    | 具体的产品编号，根据产品编号确定购买哪一种规格               |
| AttachDisk       | list   | 该类型规格能够添加的磁盘类型                                 |
| DiskMax          | int    | 单次支持添加的最大规格磁盘                                   |
| DiskValue        | string | 磁盘类型,用于创建服务实例指定磁盘类型                        |
| BasicIops        | string | 基础的磁盘的iops                                             |
| DiskUnit         | string | 磁盘规格                                                     |
| DiskName         | string | 磁盘类型名称                                                 |

**请求示例：**

```python
def get_redis_config():
    """
    获取某个站点支持的Redis产品类型以及规格
    """
    action = "DescribeAvailableDBConfig"
    method = "GET"
    param = {
        "RegionId": "CN_Hongkong_A"
    }
    url = get_signature(action, AK, AccessKeySecret, method, REDIS_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "ProductName": "redis",
        "Products": [{
            "Architectures": [{
                "ArchitectureName": "读写分离",
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
                            "CPU": 0,
                            "Name": "1G",
                            "PaasGoodsId": 5765,
                            "RAM": 1
                        }, {
                            "CPU": 0,
                            "Name": "2G",
                            "PaasGoodsId": 5768,
                            "RAM": 2
                        }, {
                            "CPU": 0,
                            "Name": "4G",
                            "PaasGoodsId": 5771,
                            "RAM": 4
                        }, {
                            "CPU": 0,
                            "Name": "8G",
                            "PaasGoodsId": 5774,
                            "RAM": 8
                        }, {
                            "CPU": 0,
                            "Name": "16G",
                            "PaasGoodsId": 5777,
                            "RAM": 16
                        }, {
                            "CPU": 0,
                            "Name": "32G",
                            "PaasGoodsId": 8012,
                            "RAM": 32
                        }, {
                            "CPU": 0,
                            "Name": "64G",
                            "PaasGoodsId": 8021,
                            "RAM": 64
                        }]
                    }
                }],
                "EnginesType": [],
                "NetworkLinks": [{
                    "DescDetail": "默认链路：服务实例占用VDC私有网络IP地址，适用于对延迟敏感类型的应用。",
                    "LinkType": "default_link",
                    "Name": "默认链路"
                }],
                "SubProductName": "Redis 读写分离版"
            }],
            "Version": "2.8.19"
        }, {
            "Architectures": [{
                "ArchitectureName": "集群",
                "ComputeRoles": [{
                    "ComputeName": "高I/O型",
                    "Standards": {
                        "AttachDisk": [{
                            "BasicIops": "5000",
                            "DiskMax": 2000,
                            "DiskMaxExpand": 2000,
                            "DiskMin": 100,
                            "DiskName": "超高性能型",
                            "DiskStep": 100,
                            "DiskUnit": "G",
                            "DiskValue": "ssd_disk"
                        }],
                        "CpuRam": [{
                            "CPU": 0,
                            "Name": "8G",
                            "PaasGoodsId": 8063,
                            "RAM": 8
                        }, {
                            "CPU": 0,
                            "Name": "12G",
                            "PaasGoodsId": 8069,
                            "RAM": 12
                        }, {
                            "CPU": 0,
                            "Name": "20G",
                            "PaasGoodsId": 8075,
                            "RAM": 20
                        }, {
                            "CPU": 0,
                            "Name": "32G",
                            "PaasGoodsId": 8081,
                            "RAM": 32
                        }, {
                            "CPU": 0,
                            "Name": "64G",
                            "PaasGoodsId": 8087,
                            "RAM": 64
                        }, {
                            "CPU": 0,
                            "Name": "128G",
                            "PaasGoodsId": 8093,
                            "RAM": 128
                        }]
                    }
                }],
                "EnginesType": [],
                "NetworkLinks": [{
                    "DescDetail": "默认链路：服务实例占用VDC私有网络IP地址，适用于对延迟敏感类型的应用。",
                    "LinkType": "default_link",
                    "Name": "默认链路"
                }],
                "SubProductName": "Redis 集群版"
            }],
            "Version": "5.0"
        }],
        "RegionId": "CN_Hongkong_A"
    },
    "Message": "Success.",
    "TaskId": ""
}
```

### 3.CreateDBInstance

**Action：CreateDBInstance**

**描述：** 创建Redis云数据库实例

**请求地址：** cdsapi.capitalonline.net/redis

**请求方法：** POST 

**请求参数：**

| 参数名       | 必选 | 类型   | 说明                                           |
| :----------- | :--- | :----- | ---------------------------------------------- |
| RegionId     | 是   | string | 站点编号                                       |
| VdcId        | 是   | string | 数据中心的编号                                 |
| BasePipeId   | 是   | string | 数据中心的私网编号，创建实例将按这个私网分配IP |
| InstanceName | 是   | string | 实例名称                                       |
| PaasGoodsId  | 是   | int    | 产品的规格编号                                 |
| Password     | 是   | string | Redis数据库密码                                |
| TestGroupId  | 否   | int    | 是否使用测试组计费                             |
| Amount       | 否   | int    | 购买的数量一次最多购买三个                     |

**返回参数**：

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Message | string | 信息描述 |
| Code    | string | 状态码   |
| Data    | dict   | 数据     |
| TaskId  | string | 任务id   |

**请求示例：**

```python
def create_redis():
    """
    创建Redis实例
    """
    action = "CreateDBInstance"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, REDIS_URL, param=param)
    body = {
        "RegionId": "********",
        "VdcId": "*******",
        "BasePipeId": "*******",
        "InstanceName": "*******",
        "PaasGoodsId": "*******",
        "Password": "*******",
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
    "TaskId": "****************"
}
```

### 4.DescribeDBInstances

**Action：DescribeDBInstances**

**描述：** 获取Redis实例列表（支持常见字段过滤:实例编号、实例名称、实例IP）

**请求地址：** cdsapi.capitalonline.net/redis

**请求方法：** GET

**请求参数：**

| 参数名       | 必选 | 类型   | 说明             |
| :----------- | :--- | :----- | ---------------- |
| InstanceUuid | 否   | string | 要过滤的实例编号 |
| InstanceName | 否   | string | 要过滤的实例名称 |
| IP           | 否   | string | 要过滤的实例IP   |

**返回参数**：

| 参数名          | 类型   | 说明                                                |
| :-------------- | :----- | --------------------------------------------------- |
| RelationService | dict   | 相关联的服务实例                                    |
| CloneServices   | list   | 克隆的临时实例列表                                  |
| AppName         | string | 数据中心名称                                        |
| IP              | string | 数据库的连接的IP                                    |
| Port            | int    | 连接的端口                                          |
| Ram             | int    | 内存 单位M                                          |
| RegionId        | string | 站点编号                                            |
| VdcId           | string | 数据中心的编号                                      |
| MasterInfo      | dict   | 从属集群，只读实例会有值（Redis目前不支持只读实例） |
| LinkTypeStr     | string | 链路类型名称                                        |
| RoGroups        | list   | 只读实例列表（Redis目前不支持只读实例）             |
| SubProductName  | string | 子产品的名字                                        |
| Version         | string | 服务版本                                            |
| LinkType        | string | 链路类型：英文                                      |
| Status          | string | 实例状态                                            |
| StatusStr       | string | 状态对应的中文                                      |
| InstanceUuid    | string | 实例编号                                            |
| InstanceName    | string | 实例名称                                            |
| CreatedTime     | string | 实例创建时间                                        |

**请求示例：**

```python
def get_redis_instances_list():
    """
    获取Redis实例列表(支持常见字段过滤、instance_uuid/instance_name/ip)
    """
    action = "DescribeDBInstances"
    method = "GET"
    param = {
        "IP": "66.66"  # 根据ip查询
    }
    url = get_signature(action, AK, AccessKeySecret, method, REDIS_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)

```

**返回示例：**

```json
"Data": [{
        "CloneServices": null,
        "CreatedTime": "2020-03-13 15:38:35",
        "DisplayName": "中国大陆-北京-可用区H",
        "IP": "********",
        "InstanceName": "********",
        "InstanceUuid": "***************",
        "LinkType": "default_link",
        "LinkTypeStr": "默认链路",
        "MasterInfo": "",
        "Port": 9736,
        "Ram": 1024,
        "RegionId": "CN_Beijing_H",
        "RelationService": null,
        "ResourceId": "9e8e7d56-d394-4b8f-a2e3-51ca29048073",
        "RoGroups": null,
        "Status": "RUNNING",
        "StatusStr": "运行中",
        "SubProductName": "Redis 读写分离版",
        "VdcId": "cacdf937-d484-435a-894b-241be9309d80",
        "VdcName": "北京8",
        "Version": "2.8.19"
    }],
    "Message": "Success."
}
```

### 5.DeleteDBInstance

**Action：DeleteDBInstance**

**描述：** 删除Redis实例

**请求地址：** cdsapi.capitalonline.net/redis

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型   | 说明     |
| :----------- | :--- | :----- | -------- |
| InstanceUuid | 否   | string | 实例编号 |

**返回参数**：

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Message | string | 信息描述 |
| Code    | string | 状态码   |
| Data    | dict   | 数据     |
| TaskId  | string | 任务编号 |

**请求示例：**

```python
def delete_redis(instance_uuid, ):
    """
    删除Redis实例
    :param instance_uuid: 实例编号
    """
    action = "DeleteDBInstance"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, REDIS_URL, param=param)
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
    "TaskId": "****************"
}
```
### 6.DescribeBackups

**Action：DescribeBackups**

**描述：** 获取备份集列表

**请求地址：** cdsapi.capitalonline.net/redis

**请求方法：** GET

**请求参数：**

| 参数名       | 必选 | 类型   | 说明     |
| :----------- | :--- | :----- | -------- |
| InstanceUuid | 是   | string | 实例编号 |

**返回参数**：

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Message | string | 信息描述 |
| Code    | string | 状态码   |
| Data    | dict   | 数据     |
| TaskId  | string | 任务编号 |

**请求示例：**

```python
def get_redis_backups_list(instance_uuid):
    """
    获取Redis实例备份列表
    """
    action = "DescribeBackups"
    method = "GET"
    param = {
        "InstanceUuid": instance_uuid,  # 实例ID
    }
    url = get_signature(action, AK, AccessKeySecret, method, REDIS_URL, param)
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
        "BackupId": "**************",
        "BackupMode": "manual",
        "BackupSize": 178,
        "BackupType": "full-backup",
        "Desc": "",
        "EndTime": "2020-08-21 18:11:21",
        "InstanceId": "***************",
        "StartTime": "2020-08-21 18:11:04",
        "Status": "finished"
    }, {
        "BackupId": "***************",
        "BackupMode": "manual",
        "BackupSize": 178,
        "BackupType": "full-backup",
        "Desc": "",
        "EndTime": "2020-08-21 18:01:34",
        "InstanceId": "********************",
        "StartTime": "2020-08-21 18:01:16",
        "Status": "finished"
    }],
    "Message": "success"
}
```

### 7.DownloadBackup

**Action：DownloadBackup**

**描述：** 获取备份文件信息及备份文件下载地址

**请求地址：** cdsapi.capitalonline.net/redis

**请求方法：** GET

**请求参数：**

| 参数名       | 必选 | 类型   | 说明           |
| :----------- | :--- | :----- | -------------- |
| InstanceUuid | 是   | string | 实例编号       |
| BackupId     | 是   | string | 备份文件的编号 |

**返回参数**：

| 参数名                    | 类型   | 说明                                                     |
| :------------------------ | :----- | -------------------------------------------------------- |
| Message                   | string | 信息描述                                                 |
| Code                      | string | 状态码                                                   |
| Data                      | dict   | 数据                                                     |
| BackupId                  | string | 备份编号                                                 |
| Status                    | string | 备份状态                                                 |
| BackupType                | string | 备份的类型                                               |
| StartTime                 | string | 备份的开始时间                                           |
| EndTime                   | string | 备份的结束时间                                           |
| ShardId                   | string | 集群版分片id，其他产品为空字符串                         |
| BackupMode                | string | 备份的类型（自动或者手动备份）                           |
| BackupSize                | string | 备份文件大小，单位字节                                   |
| Desc                      | string | 备份的描述（手动备份可以自定义内容），自动备份为空字符串 |
| BackupDownloadUrl         | string | 公网下载地址                                             |
| BackupIntranetDownloadUrl | string | 同内网下载地址                                           |

**请求示例：**

```python
def get_redis_backups_download(instance_uuid,backup_id):
    """
    获取Redis实例备份详情
    """
    action = "DownloadBackup"
    method = "GET"
    param = {
        "InstanceUuid": instance_uuid,  # 实例ID
        "BackupId": backup_id,  # 备份ID
    }
    url = get_signature(action, AK, AccessKeySecret, method, REDIS_URL, param)
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
        "BackupDownloadUrl": "https:/***************************",
        "BackupId": "**********",
        "BackupIntranetDownloadUrl": "http://***************",
        "BackupMode": "manual",
        "BackupSize": 176,
        "BackupType": "full-backup",
        "Desc": "",
        "EndTime": "2020-08-21 15:59:02",
        "InstanceId": "*************",
        "ShardId": "*************",
        "StartTime": "2020-08-21 15:58:45",
        "Status": "finished"
    },
    "Message": "success",
    "TaskId": ""
}
```

### 8.CreateBackup

**Action：CreateBackup**

**描述：** 创建备份（物理全备份，RDB格式文件）

**请求地址：** cdsapi.capitalonline.net/redis

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型   | 说明                                                      |
| :----------- | :--- | :----- | --------------------------------------------------------- |
| InstanceUuid | 是   | string | 实例编号                                                  |
| BackupType   | 否   | string | 备份类型（目前只支持物理全备份,默认为full-backup,可以不传 |
| Desc         | 否   | string | 备份的描述,不传默认为空字符串                             |

**返回参数**：

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Message | string | 信息描述 |
| Code    | string | 状态码   |
| Data    | dict   | 数据     |
| TaskId  | string | 任务编号 |

**请求示例：**

```python
def create_redis_backup(instance_uuid):
    """
    创建Redis备份
    :param instance_uuid: 实例编号
    """
    action = "CreateBackup"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, REDIS_URL, param=param)
    body = {
        "InstanceUuid": instance_uuid,
        "BackupType": "full-backup",  # 目前只支持物理全备份,默认为full-backup
        "Desc": "测试Redis备份"
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
    "Message": "succes",
    "TaskId": "*************"
}
```

### 9.DeleteBackup

**Action：DeleteBackup**

**描述：** 删除备份文件

**请求地址：** cdsapi.capitalonline.net/redis

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型   | 说明               |
| :----------- | :--- | :----- | ------------------ |
| InstanceUuid | 是   | string | 实例编号           |
| BackupId     | 是   | string | 删除的备份文件编号 |

**返回参数**：

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Message | string | 信息描述 |
| Code    | string | 状态码   |
| Data    | dict   | 数据     |
| TaskId  | string | 任务编号 |

**请求示例：**

```python
def delete_redis_backup(instance_uuid, backup_id):
    """
    删除Redis实例备份
    :param instance_uuid: 实例编号
    :param backup_id: 备份编号
    """
    action = "DeleteBackup"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, REDIS_URL, param=param)
    body = {
        "InstanceUuid": instance_uuid,
        "BackupId": backup_id,
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
    "Message": "success",
    "TaskId": "*************"
}
```


