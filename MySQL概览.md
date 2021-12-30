
MySQL 公开API目录
=================
- [MySQL 公开API目录](#mysql-公开api目录)
    - [API概览](#api概览)
      - [实例](#实例)
      - [账号](#账号)
      - [备份](#备份)
      - [只读实例](#只读实例)
      - [监控](#监控)
      - [错误码](#错误码)
    - [访问地址](#访问地址)
    - [1.DescribeRegions](#1describeregions)
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
    - [5.CreatePrivilegedAccount](#5createprivilegedaccount)
    - [6.DescribeModifiableDBSpec](#6describemodifiabledbspec)
    - [7.ModifyDBInstanceSpec](#7modifydbinstancespec)
    - [8.DeleteDBInstance](#8deletedbinstance)
    - [9.DescribeAvailableReadOnlyConfig](#9describeavailablereadonlyconfig)
    - [10.CreateReadOnlyDBInstance](#10createreadonlydbinstance)
    - [11.CreateBackup](#11createbackup)
    - [12.DescribeBackups](#12describebackups)
    - [13.DeleteBackup](#13deletebackup)
    - [14.DownloadBackup](#14downloadbackup)
    - [15.DescribeDBInstancePerformance](#15describedbinstanceperformance)

### API概览

云数据库MySQL提供以下API接口。

#### 实例

| API                       | 描述                                                   |
| ------------------------- | ------------------------------------------------------ |
| DescribeRegions            | 获取云数据库MySQL支持购买的站点区域                    |
| DescribeAvailableDBConfig | 获取某个站点可购买的MySQL产品类型以及规格              |
| CreateDBInstance          | 创建MySQL云数据库实例                                  |
| DescribeDBInstances       | 查看MySQL实例列表                                      |
| DescribeModifiableDBSpec  | 获取当前MySQL实例支持的配置变更的规格                  |
| ModifyDBInstanceSpec      | 修改数据库实例（包括常规实例和只读实例）规格或存储空间 |
| DeleteDBInstance          | 删除MySQL实例                                          |

#### 账号

| API                     | 描述           |
| ----------------------- | -------------- |
| CreatePrivilegedAccount | 创建高权限账号 |

#### 备份

| API             | 描述                 |
| --------------- | -------------------- |
| CreateBackup    | 为实例创建一个备份集 |
| DescribeBackups | 查看备份集列表       |
| DeleteBackup    | 删除数据备份文件     |
| DownloadBackup  | 获取备份下载地址     |

#### 只读实例

| API                             | 描述                                        |
| ------------------------------- | ------------------------------------------- |
| DescribeAvailableReadOnlyConfig | 获取当前MySQL主从实例支持购买的只读实例规格 |
| CreateReadOnlyDBInstance        | 为MySQL添加只读实例（目前只支持主从版）     |

#### 监控

| API                           | 描述                      |
| ----------------------------- | ------------------------- |
| DescribeDBInstancePerformance | 获取云数据库MySQL监控指标 |

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


### 1.DescribeRegions

**Action：DescribeRegions**

**描述：** 获取云数据库MySQL支持购买的站点区域。

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** GET

**请求参数：**

无

**返回参数：**

| 名称       | 类型   | 描述                                                   |
| ---------- | ------ | ------------------------------------------------------ |
| Message    | string | 信息描述                                               |
| Code       | string | 状态码                                                 |
| Data       | list   | 数据                                                   |
| IsSaling   | int    | 站点是否能购买服务，1：站点支持购买；0：资源不足已下线 |
| CityName   | string | 城市名称                                               |
| CityId     | string | 城市编号                                               |
| SiteName   | string | 站点名称                                               |
| RegionId   | string | 站点编号                                               |
| RegionName | string | 区域名称                                               |

**请求示例：**

```python
def get_mysql_zones():
    """
    获取云数据库MySQL支持的站点区域
    """
    action = "DescribeRegions"
    method = "GET"
    param = {
    }
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param)
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
        "RegionId": "CN_Beijing_H",
        "RegionName": "中国大陆",
        "SiteName": "北京8"
    }],
    "Message": "Success."
}
```

### 2.DescribeAvailableDBConfig

**Action：DescribeAvailableDBConfig**

**描述：** 获取某个站点可购买的MySQL产品类型以及规格

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** GET

**请求参数：**

| 参数名   | 必选 | 类型   | 说明     |
| :------- | :--- | :----- | -------- |
| RegionId | 是   | string | 站点编号 |

**请求示例：**

```python
def get_mysql_spec_info():
    """
    获取某个站点支持的MySQL产品类型以及规格
    """
    action = "DescribeAvailableDBConfig"
    method = "GET"
    param = {
        "RegionId": "********"
    }
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
    result = json.dumps(result)  # json格式化
    print(result)
```

**返回参数：**

| 参数名  | 类型                | 说明                                                   |
| :------ | :------------------ | ------------------------------------------------------ |
| Code    | string              | 状态码                                                 |
| Data    | [DataObj](#DataObj) | 可购买的MySQL产品类型以及规格数据对象                  |
| Message | string              | 返回调用接口状态信息和code相对应，比如：Success, Error |
| TaskId  | string              | 任务Id, 暂时不支持根据任务查询任务状态                 |

#### DataObj

| 参数名      | 类型                              | 说明                   |
| :---------- | :-------------------------------- | ---------------------- |
| ProductName | string                            | 产品名称,比如mysql     |
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
| ArchitectureType | int                                       | 架构类型：<br/>0-基础版<br/>1-主从版                         |
| ComputeRoles     | list of [ComputeRoleObj](#ComputeRoleObj) | 支持的计算类型，不同的计算类型支持不同规格，并支持添加不同类型的硬盘 |
| EnginesType      | string                                    | 引擎类型                                                     |
| NetworkLinks     | list of [NetworkLinkObj](#NetworkLinkObj) | 此架构支持的链路类型                                         |
| SubProductName   | string                                    | 子产品名称，比如：MySQL 高可用版、MySQL 基础版               |

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
        "ProductName": "mysql",
        "Products": [
            {
                "Architectures": [
                    {
                        "ArchitectureName": "主从",
                        "ArchitectureType": 1,
                        "ComputeRoles": [
                            {
                                "ComputeName": "通用型",
                                "ComputeType": 0,
                                "Standards": {
                                    "AttachDisk": [
                                        {
                                            "BasicIops": "",
                                            "DiskMax": 2000,
                                            "DiskMaxExpand": 2000,
                                            "DiskMin": 100,
                                            "DiskName": "SSD",
                                            "DiskStep": 100,
                                            "DiskUnit": "G",
                                            "DiskValue": "ssd_disk"
                                        }
                                    ],
                                    "CpuRam": [
                                        {
                                            "CPU": 1,
                                            "Name": "1C2G",
                                            "PaasGoodsId": 17060,
                                            "RAM": 2
                                        }
                                    ]
                                }
                            }
                        ],
                        "EnginesType": [],
                        "NetworkLinks": [
                            {
                                "DescDetail": "默认链路：服务实例占用VDC私有网络IP地址，适用于对延迟敏感类型的应用。",
                                "LinkType": "default_link",
                                "Name": "默认链路"
                            }
                        ],
                        "SubProductName": "MySQL高可用版"
                    }
                ],
                "Version": "8.0"
            }
        ],
        "RegionId": "*******"
    },
    "Message": "success",
    "TaskId": ""
}
```



### 3.CreateDBInstance

**Action：CreateDBInstance**

**描述：** 创建MySQL云数据库实例

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型   | 说明                                           |
| :----------- | :--- | :----- | ---------------------------------------------- |
| RegionId     | 是   | string | 站点编号                                       |
| VdcId        | 是   | string | 数据中心的编号                                 |
| BasePipeId   | 是   | string | 数据中心的私网编号，创建服务将按这个私网分配IP |
| InstanceName | 是   | string | 实例名称                                       |
| PaasGoodsId  | 是   | int    | 产品的规格编号                                 |
| DiskType     | 是   | string | 磁盘类型 只能选择支持的磁盘类型                |
| DiskValue    | 是   | int    | 磁盘大小                                       |
| Amount       | 否   | int    | 购买的数量，一次最多购买三个                   |

**返回参数：**

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Message | string | 信息描述 |
| Code    | string | 状态码   |
| Data    | dict   | 包含任务编码和实例编码列表     |
| InstancesUuid    | list   | 实例编码     |
| TaskId  | string | 任务id   |

**请求示例：**

```python
def create_mysql():
    """
    创建MySQL实例
    """
    action = "CreateDBInstance"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param=param)
    body = {
        "RegionId": "******",
        "VdcId": "******",
        "BasePipeId": "******",
        "InstanceName": "******",
        "PaasGoodsId": "******",
        "DiskType": "******",
        "DiskValue": 100,
        "Password": "******",
        "Amount": 1
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
    "TaskId": "**********"
}
```

### 4.DescribeDBInstances

**Action：DescribeDBInstances**

**描述：** 查看MySQL实例列表（支持常见字段过滤:实例编号、实例名称、实例IP）

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** GET

**请求参数：**

| 参数名       | 必选 | 类型   | 说明             |
| :----------- | :--- | :----- | ---------------- |
| InstanceUuid | 否   | string | 要过滤的实例编号 |
| InstanceName | 否   | string | 要过滤的实例名称 |
| IP           | 否   | string | 要过滤的实例IP   |

**返回参数：**

| 参数名          | 类型   | 说明                             |
| :-------------- | :----- | -------------------------------- |
| Message         | string | 信息描述                         |
| Code            | string | 状态码                           |
| Data            | list   | 数据                             |
| RelationService | dict   | 相关联的服务实例                 |
| DisplayName     | string | 站点名称                         |
| CloneServices   | list   | 克隆的临时实例列表               |
| VdcName         | string | 数据中心名称                     |
| IP              | string | 数据库的连接的IP                 |
| Port            | int    | 连接的端口                       |
| Cpu             | int    | CPU大小                          |
| Ram             | int    | 内存,单位MB                      |
| Disks           | int    | 磁盘大小,单位GB                  |
| RegionId        | string | 站点编号                         |
| VdcId           | string | 数据中心的编号                   |
| Master_Info     | dict   | 从属集群，当实例为只读实例时有值 |
| LinkTypeStr     | string | 链路类型名称                     |
| RoGroups        | list   | 只读实例列表                     |
| SubProductName  | string | 子产品的名字                     |
| Version         | string | MySQL的版本                      |
| LinkType        | string | 链路类型：英文                   |
| Status          | string | 实例状态                         |
| StatusStr       | string | 状态对应的中文                   |
| InstanceUuid    | string | 实例编号                         |
| InstanceName    | string | 实例名称                         |
| CreatedTime     | string | 实例创建时间                     |

**请求示例：**

```python
def get_mysql_instances_list():
    """
    获取MySQL实例列表(支持常见字段过滤、instance_uuid/instance_name/ip)
    """
    action = "DescribeDBInstances"
    method = "GET"
    param = {
        "IP": "66.66"  # 可根据可选字段过滤
    }
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param)
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
        "CloneServices": [],
        "Cpu": 4,
        "CreatedTime": "2020-05-03 22:16:22",
        "Disks": 200,
        "DisplayName": "亚太地区-香港-可用区A",
        "IP": "66.66.0.46",
        "InstanceName": "test-mysql",
        "InstanceUuid": "5ac7c945-ae47-4bbf-82e6-2823d64b57c5",
        "LinkType": "default_link",
        "LinkTypeStr": "默认链路",
        "MasterInfo": "",
        "Port": 6033,
        "Ram": 8192,
        "RegionId": "CN_Hongkong_A",
        "RelationService": null,
        "ResourceId": "45533175-2c4b-4e5f-8280-85b68e932381",
        "RoGroups": [{
            "Cpu": 4,
            "CreateTime": "2020-05-04 00:37:13",
            "InpaasId": "591f61a6-2197-4b14-bd1a-82a8ee345647",
            "Ip": "66.66.0.48",
            "Locked": "",
            "Message": "运行中",
            "Port": 6033,
            "Progress": 100,
            "Ram": 8192,
            "ServiceId": "5f88d00f-d01b-4103-ba29-5810b027f7c9",
            "ResourceId": "45533175-2c4b-4e5f-8280-85b68e932381",
            "ServiceName": "mysql_for_readonly",
            "Status": "RUNNING",
            "SvcType": "mysql-readonly"
        }],
        "Status": "RUNNING",
        "StatusStr": "运行中",
        "SubProductName": "MySQL 高可用版\n",
        "VdcId": "d459c74b-d60e-4f28-adbb-67be402f76f3",
        "VdcName": "香港PaaS1",
        "Version": "5.7.24"
    }],
    "Message": "Success."
}
```

### 5.CreatePrivilegedAccount

**Action：CreatePrivilegedAccount**

**描述：** 创建用户账号

**请求地址：cdsapi.capitalonline.net/mysql**

**请求方法：** POST 

**请求参数：**

| 参数名       | 必选 | 类型   | 说明                                                         |
| :----------- | :--- | :----- | ------------------------------------------------------------ |
| InstanceUuid | 是   | string | 要初始化的实例编号                                           |
| AccountName  | 是   | string | 账户名称                                                     |
| Password     | 是   | string | 账户密码                                                     |
| AccountType  | 是   | string | 账户类型，支持创建高权限用户与普通用户。取值范围：</br>高权限用户："Super"</br>普通用户："Normal"</br>注意：一个实例只能有一个高权限账号 |
| Description  | 否   | string | 账户描述，不传默认为空                                       |

**返回参数：**

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Message | string | 信息描述 |
| Code    | string | 状态码   |
| Data    | dict   | 数据     |
| TaskId  | string | 任务id   |

**请求示例：**

```python
def create_mysql_super_account(instance_uuid, ):
    """
    创建MySQL高权限用户
    :param instance_uuid: 实例编号
    """
    action = "CreatePrivilegedAccount"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param=param)
    body = {
        "InstanceUuid": instance_uuid,
        "AccountName": "******",
        "Password": "******",
        "AccountType": "Super",
        "Description": "******"
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
    "TaskId": ""
}
```

### 6.DescribeModifiableDBSpec

**Action：DescribeModifiableDBSpec**

**描述：** 获取当前MySQL实例支持的配置变更的规格

**请求地址：cdsapi.capitalonline.net/mysql**

**请求方法：** GET 

**请求参数：**

| 参数名       | 必选 | 类型   | 说明               |
| :----------- | :--- | :----- | ------------------ |
| InstanceUuid | 是   | string | 要初始化的实例编号 |

**返回参数：**

| 参数名        | 类型   | 说明                                                     |
| :------------ | :----- | -------------------------------------------------------- |
| Message       | string | 信息描述                                                 |
| Code          | string | 状态码                                                   |
| Data          | dict   | 数据                                                     |
| ProductName   | string | 产品名称                                                 |
| CpuRam        | list   | 支持的规格列表                                           |
| PaasGoodsId   | int    | 具体的产品编号，用户确定购买哪一种规格                   |
| AttachDisk    | list   | 该类型规格能够添加的磁盘类型                             |
| DiskMax       | int    | 单次支持最大规格的磁盘                                   |
| DiskValue     | string | 磁盘类型,用于创建服务实例指定磁盘类型 (创建服务时候使用) |
| BasicIops     | string | 基础的磁盘的IOPS                                         |
| DiskUnit      | string | 磁盘规格单位                                             |
| DiskName      | string | 磁盘类型名称                                             |
| DiskMaxExpand | string | 磁盘最大可扩容大小                                       |
| DiskMin       | string | 磁盘最小大小                                             |
| DiskStep      | string | 磁盘扩容大小                                             |

**请求示例：**

```python
def get_mysql_modifiable_spec(instance_uuid):
    """
    获取当前MySQL实例支持的配置变更的规格
    :param instance_uuid: 实例编号
    :return:
    """
    action = "DescribeModifiableDBSpec"
    method = "GET"
    param = {
        "InstanceUuid": instance_uuid
    }
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Data": {
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
            "CPU": 2,
            "N": "2C4G",
            "PaasGoodsId": 6704,
            "RAM": 4
        }, {
            "CPU": 4,
            "Name": "4C8G",
            "PaasGoodsId": 6707,
            "RAM": 8
        }, {
            "CPU": 8,
            "Name": "8C16G",
            "PaasGoodsId": 6710,
            "RAM": 16
        }, {
            "CPU": 8,
            "Name": "8C32G",
            "PaasGoodsId": 6716,
            "RAM": 32
        }],
        "ProductName": "MySQL 高可用版\n",
        "RegionId": "CN_Hongkong_A"
    },
    "Message": "Success.",
    "TaskId": ""
}
```

### 7.ModifyDBInstanceSpec

**Action：ModifyDBInstanceSpec**

**描述：** 修改数据库实例（包括常规实例和只读实例）规格或存储空间

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型   | 说明                                                         |
| :----------- | :--- | :----- | ------------------------------------------------------------ |
| InstanceUuid | 是   | string | 要修改配置的实例编号                                         |
| PaasGoodsId  | 否   | int    | 变更后规格的商品编号                                         |
| DiskType     | 否   | string | 磁盘类型，磁盘的添加类型。只能跟最开始购买时候类型一致。不能一个实例加多种类型磁盘，比如最开始添加高性能磁盘，后面也只能选择添加高性能磁盘 |
| DiskValue    | 否   | string | 磁盘大小                                                     |

**返回参数：**

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Message | string | 信息描述 |
| Code    | string | 状态码   |
| Data    | dict   | 数据     |
| TaskId  | string | 任务id   |

**请求示例：**

```python
def modify_mysql_spec(instance_uuid, ):
    """
    修改MySQL规格(本方法同时修改了规格及加盘，如果单独修改规格，则只需传PaasGoodsId，单独加盘，需同时传DiskType、DiskValue)
    :param instance_uuid: 实例编号
    """
    action = "ModifyDBInstanceSpec"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param=param)
    body = {
        "InstanceUuid": instance_uuid,
        "PaasGoodsId": "******",
        "DiskType": "******",
        "DiskValue": 100,
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
    "TaskId": "***********"
}
```

### 8.DeleteDBInstance

**Action：DeleteDBInstance**

**描述：** 删除MySQL实例

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型   | 说明     |
| :----------- | :--- | :----- | -------- |
| InstanceUuid | 否   | string | 实例编号 |

**返回参数：**

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Message | string | 信息描述 |
| Code    | string | 状态码   |
| Data    | dict   | 数据     |
| TaskId  | string | 任务id   |

**请求示例：**

```python
def delete_mysql(instance_uuid, ):
    """
    删除MySQL实例
    :param instance_uuid: 实例编号
    """
    action = "DeleteDBInstance"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param=param)
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
    "TaskId": ""
}
```

### 9.DescribeAvailableReadOnlyConfig

**Action：DescribeAvailableReadOnlyConfig**

**描述：** 获取当前MySQL主从实例支持购买的只读实例规格

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** GET

**请求参数：**

| 参数名       | 必选 | 类型   | 说明               |
| :----------- | :--- | :----- | ------------------ |
| InstanceUuid | 是   | string | 要初始化的实例编号 |

**返回参数：**

| 参数名           | 类型   | 说明                                                         |
| :--------------- | :----- | ------------------------------------------------------------ |
| Message          | string | 信息描述                                                     |
| Code             | string | 状态码                                                       |
| Data             | dict   | 数据                                                         |
| SubProductName   | string | 子产品的名称                                                 |
| Version          | string | 产品支持的版本                                               |
| Architectures    | string | 产品支持的架构                                               |
| ArchitectureName | string | 架构名称                                                     |
| ProductId        | string | 产品的id                                                     |
| ProductType      | string | 产品类型                                                     |
| ComputeRoles     | list   | 支持的计算类型，不通的类型支持不通的规格和支持的添加不通类型的硬盘 |
| Standards        | dict   | 该类型支持的规格                                             |
| CpuRam           | list   | 支持的规格信息，以及以下商品规格支持的磁盘类型               |
| PaasGoodsId      | int    | 具体的产品编号，用户确定购买哪一种规格(创建服务时候使用)     |
| AttachDisk       | list   | 该类型规格能够添加的磁盘类型                                 |
| DiskMax          | int    | 单次支持最大规格的磁盘                                       |
| DiskValue        | string | 磁盘类型,用于创建服务实例指定磁盘类型 (创建服务时候使用)     |
| AttachDisk       | string | 该类型规格能够添加的磁盘类型                                 |
| BasicIops        | string | 基础的磁盘的iops                                             |
| DiskUnit         | string | 磁盘规格                                                     |
| DiskName         | string | 磁盘类型名称                                                 |

**请求示例：**

```python
def get_mysql_modifiable_spec(instance_uuid):
    """
    获取当前MySQL实例支持的配置变更的规格
    :param instance_uuid: 实例编号
    :return:
    """
    action = "DescribeModifiableDBSpec"
    method = "GET"
    param = {
        "InstanceUuid": instance_uuid
    }
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Data": {
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
            "CPU": 2,
            "N": "2C4G",
            "PaasGoodsId": "******",
            "RAM": 4
        }, {
            "CPU": 4,
            "Name": "4C8G",
            "PaasGoodsId": "******",
            "RAM": 8
        }, {
            "CPU": 8,
            "Name": "8C16G",
            "PaasGoodsId": "******",
            "RAM": 16
        }, {
            "CPU": 8,
            "Name": "8C32G",
            "PaasGoodsId": "******",
            "RAM": 32
        }],
        "ProductName": "MySQL 高可用版\n",
        "RegionId": "******"
    },
    "Message": "Success.",
    "TaskId": ""
}
```

### 10.CreateReadOnlyDBInstance

**Action：CreateReadOnlyDBInstance**

**描述：** 为MySQL添加只读实例（目前只支持主从版）

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型   | 说明                                     |
| :----------- | :--- | :----- | ---------------------------------------- |
| InstanceUuid | 是   | string | 实例编号，为该数据库添加只读实例         |
| InstanceName | 是   | string | 只读实例名称                             |
| PaasGoodsId  | 是   | int    | 只读实例商品规格，要大于等于主实例规格   |
| DiskType     | 是   | string | 磁盘类型                                 |
| DiskValue    | 是   | int    | 磁盘大小，只读实例磁盘规格不能低于主实例 |
| TestGroupId  | 否   | int    | 是否使用测试组计费                       |
| Amount       | 否   | int    | 购买的数量一次最多购买三个               |

**返回参数：**

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Message | string | 信息描述 |
| Code    | string | 状态码   |
| Data    | dict   | 数据     |
| TaskId  | string | 任务id   |

**请求示例：**

```python
def create_mysql_for_readonly(instance_uuid):
    """
    创建MySQL只读实例
    :param instance_uuid: 实例编号
    """
    action = "CreateReadOnlyDBInstance"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param=param)
    body = {
        "InstanceUuid": instance_uuid,
        "InstanceName": "mysql_for_readonly",
        "PaasGoodsId": "6707",
        "DiskType": "high_disk",
        "DiskValue": 400,  # 磁盘大小必须大于主实例
        "Amount": 1
    }
```

**返回示例：**

```json
{
    "Code": "Success",
    "Data": {},
    "Message": "Success.",
    "TaskId": "***********"
}
```
### 11.CreateBackup

**Action：CreateBackup**

**描述：** 为实例创建一个备份集，支持云数据库MySQL主从版实例和集群版实例

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型   | 说明                           |
| :----------- | :--- | :----- | ------------------------------ |
| InstanceUuid | 是   | string | 实例编号                       |
| BackupType   | 是   | string | 备份方法（目前只支持物理备份） |
| Desc         | 否   | string | 备份的描述,不传默认为空字符串  |

**返回参数：**

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Message | string | 信息描述 |
| Code    | string | 状态码   |
| Data    | dict   | 数据     |
| TaskId  | string | 任务编号 |

**请求示例：**

```python
def create_backup(instance_uuid):
    """
    创建MySQL备份
    :param instance_uuid: 实例编号
    """
    action = "CreateBackup"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param=param)
    body = {
        "InstanceUuid": instance_uuid,
        "BackupType": "physical-backup",  # 目前只支持物理备份
        "Desc": "test-openapi-python"
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
    "TaskId": "***********"
}
```

### 12.DescribeBackups

**Action：DescribeBackups**

**描述：** 查看备份集列表

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** GET

**请求参数：**

| 参数名       | 必选 | 类型   | 说明     |
| :----------- | :--- | :----- | -------- |
| InstanceUuid | 是   | string | 实例编号 |

**返回参数：**

| 参数名     | 类型   | 说明                           |
| :--------- | :----- | ------------------------------ |
| Message    | string | 信息描述                       |
| Code       | string | 状态码                         |
| Data       | dict   | 数据                           |
| BackupId   | string | 备份id                         |
| Status     | string | 备份状态                       |
| BackupType | string | 备份类型（全备份）             |
| StartTime  | string | 开始时间                       |
| EndTime    | string | 结束时间                       |
| BackupMode | string | 备份策略（自动备份、手动备份） |
| BackupSize | string | 备份文件大小，单位字节         |
| Desc       | string | 备份描述                       |

**请求示例：**

```python
def get_mysql_backups(instance_uuid):
    """
    查看备份集列表
    :param instance_uuid: 实例编号
    :return:
    """
    action = "DescribeBackups"
    method = "GET"
    param = {
        "InstanceUuid": instance_uuid
    }
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Data": [{
        "BackupId": "**************************",
        "BackupMode": "auto",
        "BackupSize": 677496,
        "BackupType": "physical-backup",
        "Desc": "",
        "EndTime": "2020-06-18 04:10:13",
        "InstanceId": "**************************",
        "StartTime": "2020-06-18 04:09:59",
        "Status": "finished"
    }, {
        "BackupId": "**************************",
        "BackupMode": "auto",
        "BackupSize": 677494,
        "BackupType": "physical-backup",
        "Desc": "",
        "EndTime": "2020-06-17 04:10:22",
        "InstanceId": "**************************",
        "StartTime": "2020-06-17 04:10:08",
        "Status": "finished"
    }, {
        "BackupId": "**************************",
        "BackupMode": "auto",
        "BackupSize": 677498,
        "BackupType": "physical-backup",
        "Desc": "",
        "EndTime": "2020-06-16 04:10:17",
        "InstanceId": "**************************",
        "StartTime": "2020-06-16 04:10:03",
        "Status": "finished"
    }, {
        "BackupId": "**************************",
        "BackupMode": "manual",
        "BackupSize": 677484,
        "BackupType": "physical-backup",
        "Desc": "",
        "EndTime": "2020-06-15 15:04:59",
        "InstanceId": "**************************",
        "StartTime": "2020-06-15 15:04:41",
        "Status": "finished"
    }],
    "Message": "Success."
}
```

### 13.DeleteBackup

**Action：DeleteBackup**

**描述：** 删除数据备份文件

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型   | 说明     |
| :----------- | :--- | :----- | -------- |
| InstanceUuid | 是   | string | 实例编号 |
| BackupId     | 是   | string | 备份编号 |

**返回参数：**

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Message | string | 信息描述 |
| Code    | string | 状态码   |
| Data    | dict   | 数据     |
| TaskId  | string | 任务编号 |

**请求示例：**

```python
def delete_backup(instance_uuid, backupid):
    """
    删除数据备份文件
    :param backupid: 备份编号
    :param instance_uuid: 实例编号
    """
    action = "DeleteBackup"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param=param)
    body = {
        "InstanceUuid": instance_uuid,
        "BackupId": backupid,
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
    "TaskId": "***********"
}
```

### 14.DownloadBackup

**Action：DownloadBackup**

**描述：** 获取备份下载地址

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** GET

**请求参数：**

| 参数名       | 必选 | 类型   | 说明     |
| :----------- | :--- | :----- | -------- |
| InstanceUuid | 是   | string | 实例编号 |
| BackupId     | 是   | string | 备份编号 |

**返回参数：**

| 参数名                    | 类型      | 说明                                                     |
| :------------------------ | :-------- | -------------------------------------------------------- |
| Message                   | string    | 信息描述                                                 |
| Code                      | string    | 状态码                                                   |
| Data                      | dict      | 数据                                                     |
| BackupId                  | string    | 备份编号                                                 |
| Status                    | string    | 备份状态                                                 |
| BackupType                | string    | 备份的类型（全备份）                                     |
| StartTime                 | string    | 备份的开始时间                                           |
| EndTime                   | string    | 备份的结束时间                                           |
| BackupMode                | ststringr | 备份策略（自动或者手动备份）                             |
| BackupSize                | string    | 备份文件大小，单位字节                                   |
| Desc                      | string    | 备份的描述（手动备份可以自定义内容），自动备份为空字符串 |
| BackupDownloadUrl         | string    | 公网下载地址                                             |
| BackupIntranetDownloadUrl | string    | 内网下载地址                                             |

**请求示例：**

```python
def get_backup_describe(instance_uuid, backupid):
    """
    获取备份详情
    :param backupid: 备份编号
    :param instance_uuid: 实例编号
    :return:
    """
    action = "DownloadBackup"
    method = "GET"
    param = {
        "InstanceUuid": instance_uuid,
        "BackupId": backupid
    }
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "BackupDownloadUrl": "https://gic.***************",
        "BackupIntranetDownloadUrl": "http://88.***************",
        "BackupMode": "auto",
        "BackupSize": 68140,
        "BackupType": "full-backup",
        "Desc": "",
        "EndTime": "2020-06-18 04:00:26",
        "InstanceId": "***************",
        "StartTime": "2020-06-18 04:00:06",
        "Status": "finished"
    },
    "Message": "Success.",
    "TaskId": ""
}
```

### 15.DescribeDBInstancePerformance

**Action：DescribeDBInstancePerformance**

**描述：** 获取云数据库MySQL监控指标

**请求地址：** http://cdsapi.capitalonline.net/paas/monitor

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型   | 说明                 |
| :----------- | :--- | :----- | -------------------- |
| InstanceUuid | 是   | string | 实例编号             |
| MetricKey    | 是   | string | 可选指标参数(见下表) |
| StartTime    | 是   | string | 开始时间             |
| EndTime      | 是   | string | 结束时间             |

**性能参数表：**

| API参数名             | 类别      | 类型  | 单位   | 含义                                                         |
| --------------------- | --------- | ----- | ------ | ------------------------------------------------------------ |
| mysql_cpu_usage       | resources | gauge | 百分比 | cpu使用率                                         |
| mysql_mem_usage       | resources | gauge | 百分比 | 内存使用率                                                   |
| mysql_space_usage     | resources | gauge | 百分比 | 挂载的数据磁盘容量使用百分比                                  |
| mysql_network_trffice | resources | gauge | MB/s   | 业务网卡流量大小每秒，包括进入流量和出去流量                 |
| mysql_sessions        | engine    | gauge | 个     | 当前打开的连接的数量                                         |
| mysql_slow_queries    | engine    | gauge | 个     | 查询时间超过 long_query_time 秒的查询的个数                  |

**时间粒度：**

监控粒度自适应方法如下：

| 时间跨度   | 监控粒度 | 自适应说明                                        | 保留时长 |
| ---------- | -------- | ------------------------------------------------- | -------- |
| (0h, 4h]   | 30s      | 时间跨度在4小时内，监控粒度为5秒                  | 1天      |
| (4h, 2d]   | 1min     | 时间跨度超过4小时，但在2天内，监控粒度调整为1分钟 | 15天     |
| (2d, 10d]  | 5min     | 时间跨度超过2天，但在10天内，监控粒度调整为5分钟  | 31天     |
| (10d, 30d] | 1h       | 时间跨度超过10天，但在30天内，监控粒度调整为1小时 | 62天     |

**返回参数**：

| 参数名       | 类型   | 说明                                                    |
| :----------- | :----- | ------------------------------------------------------- |
| Message      | str    | 信息描述                                                |
| Code         | str    | 状态码                                                  |
| Data         | dict   | 数据                                                    |
| InstanceUuid | str    | 实例编号                                                |
| ProductType  | str    | 产品类型                                                |
| MetricKey    | string | 性能指标参数                                            |
| Period       | int    | 监控粒度（根据时间跨度自适应监控粒度，单位为秒）        |
| StartTime    | string | 开始时间                                                |
| EndTime      | string | 结束时间                                                |
| DataPoints   | list   | 监控数据集合                                            |
| MetricName   | string | 性能指标名称                                            |
| MetricType   | string | 指标类型（gauge，counter）                              |
| MonitorType  | list   | 监控类型（resources，engine, engine_extension, deploy） |
| Values       | list   | 监控数据列表                                            |
| Value        | float  | 监控数值                                                |
| DataTime     | string | 监控时间点                                              |


**请求示例：**

```python
def get_instance_Performance(instance_uuid, metric_key, start_time, end_time):
    """
    获取MySQL监控
    :param instance_uuid: 实例uuid
    :param metric_key: 性能指标参数
    :param start_time: 开始时间
    :param end_time: 结束时间
    """
    action = "DescribeDBInstancePerformance"
    method = "POST"
    param = {}
    url = get_signature(action, AccessKey, SecretAccessKey, method, monitor_url, param=param)
    body = {
        "InstanceUuid": instance_uuid,
        "MetricKey": metric_key,
        "StartTime": start_time,
        "EndTime": end_time
    }
    res = requests.post(url, json=body).json()
    print(res)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "DataPoints": [{
            "MetricName": "slow_queries",
            "MetricType": "counter",
            "MonitorType": "engine",
            "Unit": "次",
            "Values": [{
                "DateTime": "2020-11-03 14:33:24",
                "Value": 4
            }, {
                "DateTime": "2020-11-03 14:33:54",
                "Value": 15
            }, {
                "DateTime": "2020-11-03 14:34:24",
                "Value": 35
            }, {
                "DateTime": "2020-11-03 14:34:54",
                "Value": 67
            }]
        }],
        "EndTime": "2020-11-03 14:35:00",
        "InstanceUuid": "b6120f04-63ab-491c-9049-54fca54102bf",
        "MetricKey": "mysql_slow_queries",
        "Period": 30,
        "ProductType": "mysql-replication",
        "StartTime": "2020-11-03 14:28:00"
    },
    "Message": "success",
    "TaskId": ""
}
```

