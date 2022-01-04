Redis 公开API目录
=================
- [Redis 公开API目录](#redis-公开api目录)
    - [API概览](#api概览)
      - [实例](#实例)
      - [备份](#备份)
      - [错误码](#错误码)
    - [访问地址](#访问地址)
    - [1.DescribeRegins](#1describeregins)
    - [2.DescribeAvailableDBConfig](#2describeavailabledbconfig)
      - [DataObj](#dataobj)
      - [ProductObj](#productobj)
      - [ArchitectureObj](#architectureobj)
      - [ComputeRoleObj](#computeroleobj)
      - [StandardObj](#standardobj)
      - [AttachDiskObj](#attachdiskobj)
      - [CpuRamObj](#cpuramobj)
      - [NetworkLinkOb](#networklinkob)
    - [3.CreateDBInstance](#3createdbinstance)
    - [4.DescribeDBInstances](#4describedbinstances)
    - [5.DeleteDBInstance](#5deletedbinstance)
    - [6.DescribeBackups](#6describebackups)
    - [7.DownloadBackup](#7downloadbackup)
    - [8.CreateBackup](#8createbackup)
    - [9.DeleteBackup](#9deletebackup)

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

**返回参数**：

| 参数名  | 类型                | 说明                                                   |
| :------ | :------------------ | ------------------------------------------------------ |
| Code    | string              | 状态码                                                 |
| Data    | [DataObj](#DataObj) | 可购买的redis产品类型以及规格数据对象                  |
| Message | string              | 返回调用接口状态信息和code相对应，比如：Success, Error |
| TaskId  | string              | 任务Id, 暂时不支持根据任务查询任务状态                 |

#### DataObj

| 参数名      | 类型                              | 说明                   |
| :---------- | :-------------------------------- | ---------------------- |
| ProductName | string                            | 产品名称,比如redis     |
| Products    | list of [ProductObj](#ProductObj) | 该类产品支持的产品列表 |
| RegionId    | string                            | 站点编号               |

#### ProductObj

| 参数名        | 类型                                        | 说明               |
| :------------ | :------------------------------------------ | ------------------ |
| Architectures | list of [ArchitectureObj](#ArchitectureObj) | 产品支持的架构列表 |
| Version       | string                                      | 产品支持的版本     |

#### ArchitectureObj

| 参数名           | 类型                                      | 说明                                                         |
| :--------------- | :---------------------------------------- | ------------------------------------------------------------ |
| ArchitectureName | string                                    | 架构名称                                                     |
| ArchitectureType | int                                       | 架构类型：<br/>1-主从版<br/>2-集群版<br/>3-经济型主从版      |
| ComputeRoles     | list of [ComputeRoleObj](#ComputeRoleObj) | 支持的计算类型，不同的计算类型支持不同规格，并支持添加不同类型的硬盘 |
| EnginesType      | string                                    | 引擎类型                                                     |
| NetworkLinks     | list of [NetworkLinkObj](#NetworkLinkObj) | 此架构支持的链路类型                                         |
| SubProductName   | string                                    | 子产品名称，比如：Redis 经济型主从、Redis 主从版、Redis 集群版 |

#### ComputeRoleObj

| 参数名      | 类型                        | 说明                                                       |
| :---------- | :-------------------------- | ---------------------------------------------------------- |
| ComputeName | string                      | 计算类型名称， 比如：通用型                                |
| ComputeType | int                         | 支持的计算类型(目前仅支持通用型计算类型)：<br>0-通用型<br> |
| Standards   | [StandardObj](#StandardObj) | 该类型支持的规格                                           |

#### StandardObj

| 参数名     | 类型                                    | 说明                             |
| :--------- | :-------------------------------------- | -------------------------------- |
| AttachDisk | list of [AttachDiskObj](#AttachDiskObj) | 该类型规格能够添加的磁盘类型列表 |
| CpuRam     | list of [CpuRamObj](#CpuRamObj)         | 支持的规格列表                   |

#### AttachDiskObj

| 参数名        | 类型   | 说明                                                         |
| :------------ | :----- | ------------------------------------------------------------ |
| BasicIops     | string | 基础的磁盘的iops                                             |
| DiskMax       | int    | 单次支持扩容到最大磁盘容量为2000                             |
| DiskMaxExpand | string | 磁盘最大可扩容大小                                           |
| DiskMin       | string | 磁盘容量支持的最小值，起步为100                              |
| DiskName      | string | 磁盘类型名称，包含SSD和性能型<br />SSD：SSD磁盘，磁盘IOPS默认为5000，可购买IOPS性能包<br />性能型：普通SSD盘，磁盘IOPS限定在3000 |
| DiskStep      | string | 磁盘扩容步长，步长大小=100                                   |
| DiskUnit      | string | 磁盘容量单位：GB                                             |
| DiskValue     | string | 磁盘类型,用于创建服务实例指定磁盘类型 (创建服务时候使用)     |

#### CpuRamObj

| 参数名      | 类型   | 说明                                           |
| :---------- | :----- | ---------------------------------------------- |
| CPU         | int    | 核心数量，单位：个                             |
| Name        | string | 规格名称                                       |
| PaasGoodsId | int    | 具体的产品编号，根据产品编号确定购买哪一种规格 |
| RAM         | int    | 内存大小，单位：GB                             |

#### NetworkLinkOb

| 参数名     | 类型   | 说明           |
| :--------- | :----- | -------------- |
| DescDetail | string | 链路类型描述   |
| LinkType   | string | 链路类型“英文” |
| Name       | string | 链路类型“中文” |

**返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "ProductName": "redis",
        "Products": [{
            "Architectures": [{
                "ArchitectureName": "经济型主从",
                "ComputeRoles": [{
                    "ComputeName": "通用型",
                    "Standards": {
                        "AttachDisk": [{
                            "BasicIops": "",
                            "DiskMax": 2000,
                            "DiskMaxExpand": 2000,
                            "DiskMin": 100,
                            "DiskName": "SSD",
                            "DiskStep": 100,
                            "DiskUnit": "G",
                            "DiskValue": "ssd_disk"
                        }],
                        "CpuRam": [{
                            "CPU": 0,
                            "Name": "1G",
                            "PaasGoodsId": 12188,
                            "RAM": 1
                        }]
                    }
                }],
                "EnginesType": [],
                "NetworkLinks": [{
                    "DescDetail": "默认链路：服务实例占用VDC私有网络IP地址，适用于对延迟敏感类型的应用。",
                    "LinkType": "default_link",
                    "Name": "默认链路"
                }],
                "SubProductName": "Redis 经济型主从"
            }],
            "Version": "2.8"
        }],
        "RegionId": "*******"
    },
    "Message": "success",
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
| Data    | dict   | 包含任务编码和实例编码列表     |
| InstancesUuid    | list   | 实例编码     |
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
    "Message": "Success.",
    "Code": "Success",
    "Data": {
        "InstancesUuid":["5d74bb81-0473-464d-b15b-0ae418619248",]
    },
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

| 参数名       | 必选 | 类型   | 说明                          |
| :----------- | :--- | :----- | ----------------------------- |
| InstanceUuid | 是   | string | 实例编号                      |
| Desc         | 否   | string | 备份的描述,不传默认为空字符串 |

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

