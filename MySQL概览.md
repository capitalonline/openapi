
MySQL 公开API目录
=================
- [MySQL 公开API目录](#mysql-公开api目录)
    - [API概览](#api概览)
      - [实例](#实例)
      - [账号](#账号)
      - [备份](#备份)
      - [只读实例](#只读实例)
      - [监控](#监控)
      - [参数](#参数)
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
      - [NetworkLinkObj](#networklinkobj)
    - [3.CreateDBInstance](#3createdbinstance)
    - [4.DescribeDBInstances](#4describedbinstances)
    - [5.CreatePrivilegedAccount](#5createprivilegedaccount)
    - [6.ModifyDbPrivilege](#6modifydbprivilege)
      - [OperationsObj](#operationsobj)
      - [ExtraPrivilegeObj](#extraprivilegeobj)
    - [7.DeleteDbPrivilege](#7deletedbprivilege)
    - [8.DescribeDbPrivileges](#8describedbprivileges)
      - [查询权限DataObj](#查询权限dataobj)
    - [9.DescribeDBAccount](#9describedbaccount)
      - [查询用户DataObj](#查询用户dataobj)
      - [DatabasePrivilegesObj](#databaseprivilegesobj)
      - [查询用户ExtraPrivilegeObj](#查询用户extraprivilegeobj)
    - [10.DeleteDBAccount](#10deletedbaccount)
    - [11.DescribeModifiableDBSpec](#11describemodifiabledbspec)
    - [12.ModifyDBInstanceSpec](#12modifydbinstancespec)
    - [13.DeleteDBInstance](#13deletedbinstance)
    - [14.DescribeAvailableReadOnlyConfig](#14describeavailablereadonlyconfig)
      - [查询只读实例规格DataObj](#查询只读实例规格dataobj)
      - [查询只读实例规格ComputeRolesObj](#查询只读实例规格computerolesobj)
      - [查询只读实例规格StandardObj](#查询只读实例规格standardobj)
      - [查询只读实例规格AttachDiskObj](#查询只读实例规格attachdiskobj)
      - [查询只读实例规格CpuRamObj](#查询只读实例规格cpuramobj)
    - [15.CreateReadOnlyDBInstance](#15createreadonlydbinstance)
    - [16.CreateBackup](#16createbackup)
    - [17.DescribeBackups](#17describebackups)
    - [18.DeleteBackup](#18deletebackup)
    - [19.DownloadBackup](#19downloadbackup)
    - [20.ModifyDbBackupPolicy](#20modifydbbackuppolicy)
      - [DataBackupsObj](#databackupsobj)
    - [21.DescribeDBInstancePerformance](#21describedbinstanceperformance)
    - [22.DescribeDBParameter](#22describedbparameter)
      - [查询参数DataObj](#查询参数dataobj)
      - [ParametersObj](#parametersobj)
    - [23.DescribeDBParameterModifyHistory](#23describedbparametermodifyhistory)
      - [查询参数修改历史DataObj](#查询参数修改历史dataobj)
    - [24.ModifyDBParameter](#24modifydbparameter)
      - [修改参数ParametersObj](#修改参数parametersobj)

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

| API                     | 描述                   |
| ----------------------- | ---------------------- |
| CreatePrivilegedAccount | 创建账号               |
| ModifyDbPrivilege       | 修改普通账号数据库权限 |
| DeleteDbPrivilege       | 删除普通账号数据库权限 |
| DescribeDbPrivileges    | 获取普通账号详细权限   |
| DescribeDBAccount       | 获取账号列表           |
| DeleteDBAccount         | 删除账号               |

#### 备份

| API                  | 描述                                  |
| -------------------- | ------------------------------------- |
| CreateBackup         | 为实例创建一个备份集                  |
| DescribeBackups      | 查看备份集列表                        |
| DeleteBackup         | 删除数据备份文件                      |
| DownloadBackup       | 获取备份下载地址                      |
| ModifyDbBackupPolicy | 修改云数据库MySQL高可用版自动备份设置 |

#### 只读实例

| API                             | 描述                                        |
| ------------------------------- | ------------------------------------------- |
| DescribeAvailableReadOnlyConfig | 获取当前MySQL主从实例支持购买的只读实例规格 |
| CreateReadOnlyDBInstance        | 为MySQL添加只读实例（目前只支持主从版）     |

#### 监控

| API                           | 描述                      |
| ----------------------------- | ------------------------- |
| DescribeDBInstancePerformance | 获取云数据库MySQL监控指标 |

#### 参数

| API                              | 描述                              |
| -------------------------------- | --------------------------------- |
| DescribeDBParameter              | 获取云数据库MySQL参数列表         |
| DescribeDBParameterModifyHistory | 获取云数据库MySQL参数修改历史记录 |
| ModifyDBParameter                | 修改云数据库MySQL参数             |

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

#### NetworkLinkObj

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

| 参数名       | 必选 | 类型   | 说明                                                         |
| :----------- | :--- | :----- | ------------------------------------------------------------ |
| RegionId     | 是   | string | 站点编号                                                     |
| VdcId        | 是   | string | 数据中心的编号                                               |
| BasePipeId   | 是   | string | 数据中心的私网编号，创建服务将按这个私网分配IP               |
| InstanceName | 是   | string | 实例名称                                                     |
| PaasGoodsId  | 是   | int    | 产品的规格编号                                               |
| DiskType     | 是   | string | 磁盘类型 只能选择支持的磁盘类型                              |
| DiskValue    | 是   | int    | 磁盘大小                                                     |
| TimeZone     | 否   | string | 实例的UTC时区，默认值根据地域不同变化，输入参数范围：<br />["-12:00","-11:00","-10:00","-09:00","-08:00","-07:00","-06:00","-05:00","-04:00","-03:00","-02:00","-01:00","+00:00","+01:00","+02:00","+03:00","+04:00","+05:00","+05:30","+06:00","+07:00","+08:00","+09:00","+10:00","+11:00","+12:00","+13:00",] |
| Amount       | 否   | int    | 购买的数量，一次最多购买10个                                 |
| ServicePort  | 否   | int    | MySQL实例端口，默认3306，取值范围：1024-65535（9100和9101无效） |

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
        "PaasGoodsId": ******,
        "DiskType": "******",
        "DiskValue": 100,
        "ServicePort": 6033,
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

| 参数名       | 必选 | 类型   | 说明               |
| :----------- | :--- | :----- | ------------------ |
| InstanceUuid | 否   | string | 要过滤的实例编号   |
| InstanceName | 否   | string | 要过滤的实例名称   |
| IP           | 否   | string | 要过滤的实例IP     |
| TagName      | 否   | string | 要过滤的实例标签名 |

**返回参数：**

| 参数名          | 类型   | 说明                             |
| :-------------- | :----- | -------------------------------- |
| Message         | string | 信息描述                         |
| Code            | string | 状态码                           |
| Data            | list   | 数据                             |
| RelationService | dict   | 相关联的服务实例                 |
| DisplayName     | string | 站点名称                         |
| VdcName         | string | 数据中心名称                     |
| IP              | string | 数据库的连接的IP                 |
| Port            | int    | 连接的端口                       |
| Cpu             | int    | CPU大小                          |
| Ram             | int    | 内存,单位MB                      |
| Disks           | int    | 磁盘大小,单位GB                  |
| RegionId        | string | 站点编号                         |
| VdcId           | string | 数据中心的编号                   |
| Master_Info     | dict   | 主节点信息（已弃用） |
| LinkTypeStr     | string | 链路类型名称                     |
| RoGroups        | list   | 只读实例列表                     |
| SubProductKey  | string | 子产品的英文名                     |
| SubProductName  | string | 子产品的名字                     |
| Version         | string | MySQL的版本                      |
| LinkType        | string | 链路类型：英文                   |
| Status          | string | 实例状态                         |
| StatusStr       | string | 状态对应的中文                   |
| InstanceUuid    | string | 实例编号                         |
| InstanceName    | string | 实例名称                         |
| CreatedTime     | string | 实例创建时间                     |
| ResourceId      | string | 账单ID，查询账单时的唯一标识     |
| ProjectName      | string | 项目名称     |
| Tags | list | 标签信息 |
| TagID | int | 标签ID |
| TagName | string | 标签名称 |

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
        "ProjectName": "默认项目",
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
        "SubProductKey": "mysql-replication",
        "SubProductName": "MySQL 高可用版",
      	"Tags":[
            {
               "TagID":24644,
               "TagName":"test_tag"
            }
         ],
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

### 6.ModifyDbPrivilege

**Action：ModifyDbPrivilege**

**描述：** 更新（添加、修改）云数据库MySQL普通用户权限

**请求地址：cdsapi.capitalonline.net/mysql**

**请求方法：** POST 

**请求参数：**

| 参数名         | 必选 | 类型                                    | 说明                         |
| :------------- | :--- | :-------------------------------------- | ---------------------------- |
| InstanceUuid   | 是   | string                                  | 要更新用户权限的实例编号     |
| AccountName    | 是   | string                                  | 普通用户的账号名称           |
| Operations     | 是   | list of [Operations](#OperationsObj)    | 账号赋权数据库与对应权限列表 |
| ExtraPrivilege | 否   | [ExtraPrivilegeObj](#ExtraPrivilegeObj) | 附加权限                     |

#### OperationsObj

| 参数名    | 必选 | 类型   | 说明                                                         |
| :-------- | :--- | :----- | ------------------------------------------------------------ |
| DBName    | 是   | string | 需要赋权的数据库名称                                         |
| Privilege | 是   | string | 数据库对应账号权限。<br />ReadWrite：读写权限<br />DMLOnly：仅DML<br />ReadOnly：只读权限<br />DDLOnly：仅DDL |

#### ExtraPrivilegeObj

| 参数名    | 必选 | 类型   | 说明                                                         |
| --------- | ---- | ------ | ------------------------------------------------------------ |
| AllCreate | 否   | string | 普通账号全局create权限，默认false，取值范围：["ture","false"] |

**返回参数：**

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Message | string | 信息描述 |
| Code    | string | 状态码   |

**请求示例：**

```python
def modify_mysql_privilege(instance_uuid):
    """
    更新（添加、修改）云数据库MySQL普通用户权限
    :param instance_uuid: 实例编号
    """
    action = "ModifyDbPrivilege"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param=param)
    body = {
        "InstanceUuid": instance_uuid,
        "AccountName": "pt",
        "Operations": [{
            "DBName": "test2",
            "Privilege": "ReadWrite"
        }, {
            "DBName": "test1",
            "Privilege": "DDLOnly"
    	}],
        "ExtraPrivilege": {
            "AllCreate": "true"
        }
    }

    res = requests.post(url, json=body)
    result = json.loads(res.content)
    print(result)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Message": "Success."
}
```

### 7.DeleteDbPrivilege

**Action：DeleteDbPrivilege**

**描述：** 删除云数据库MySQL普通用户权限。

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型           | 说明                     |
| :----------- | :--- | :------------- | ------------------------ |
| InstanceUuid | 是   | string         | 要删除用户权限的实例编号 |
| AccountName  | 是   | string         | 普通用户的账号名称       |
| DBNames      | 是   | list of string | 需要删除权限的数据库名称 |

**返回参数：**

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Code    | string | 状态码   |
| Message | string | 信息描述 |

**请求示例：**

```python
def delete_user_privilege(instance_uuid):
    """
    删除云数据库MySQL普通用户权限
    :param instance_uuid: 实例编号
    """
    action = "DeleteDbPrivilege"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param=param)
    body = {
        "InstanceUuid": instance_uuid,
        "AccountName": "pt",
        "DBNames": ["test"]
    }

    res = requests.post(url, json=body)
    result = json.loads(res.content)
    print(result)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Message": "success"
}
```

### 8.DescribeDbPrivileges

**Action：DescribeDbPrivileges**

**描述：** 获取云数据库MySQL普通用户详细权限。

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** GET

**请求参数：**

无

**返回参数：**

| 参数名  | 类型                        | 说明                                                   |
| :------ | :-------------------------- | ------------------------------------------------------ |
| Code    | string                      | 状态码                                                 |
| Data    | [DataObj](#查询权限dataobj) | MySQL普通用户权限明细数据集合                          |
| Message | string                      | 返回调用接口状态信息和code相对应，比如：Success, Error |

#### 查询权限DataObj

| 参数名    | 类型   | 说明                  |
| :-------- | :----- | --------------------- |
| ReadWrite | string | 读写权限详细权限说明  |
| DMLOnly   | string | 仅DML权限详细权限说明 |
| ReadOnly  | string | 只读权限详细权限说明  |
| DDLOnly   | string | 仅DDL权限详细权限说明 |

**请求示例：**

```python
def get_mysql_user_privileges():
    """
    获取云数据库MySQL普通用户详细权限
    """
    action = "DescribeDbPrivileges"
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
    "Data": {
        "DDLOnly": "CREATE, DROP, INDEX, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE",
        "DMLOnly": "SELECT, INSERT, UPDATE, DELETE, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE, SHOW VIEW, EVENT, TRIGGER",
        "ReadOnly": "SELECT, LOCK TABLES, SHOW VIEW",
        "ReadWrite": "SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, EVENT, TRIGGER"
    },
    "Message": "success"
}
```

### 9.DescribeDBAccount

**Action：DescribeDBAccount**

**描述：** 获取云数据库MySQL用户

**请求地址：cdsapi.capitalonline.net/mysql**

**请求方法：** GET 

**请求参数：**

| 参数名       | 必选 | 类型   | 说明     |
| :----------- | :--- | :----- | -------- |
| InstanceUuid | 是   | string | 实例编号 |

**返回参数：**

| 参数名  | 类型                                | 说明                 |
| :------ | :---------------------------------- | :------------------- |
| Message | string                              | 信息描述             |
| Code    | string                              | 状态码               |
| Data    | list of [DataObj](#查询用户dataobj) | 实例当前用户列表信息 |

#### 查询用户DataObj

| 参数名             | 类型                                                    | 说明                                                         |
| :----------------- | :------------------------------------------------------ | :----------------------------------------------------------- |
| AccountType        | string                                                  | 账号类型<br />高权限用户："Super"<br/>普通用户："Normal"     |
| ServiceId          | string                                                  | 账号所属实例编号                                             |
| AccountStatus      | string                                                  | 账号状态<br/>processing：处理中<br/>available：已激活<br/>unavailable：未激活 |
| AccountName        | string                                                  | 账号名称                                                     |
| AccountDescription | string                                                  | 账号描述                                                     |
| DatabasePrivileges | list of [DatabasePrivilegesObj](#databaseprivilegesobj) | 数据库权限详情                                               |
| ExtraPrivilege     | [ExtraPrivilegeObj](#查询用户ExtraPrivilegeObj)         | 附加权限                                                     |

#### DatabasePrivilegesObj

| 参数名                 | 类型   | 说明                                                         |
| :--------------------- | :----- | :----------------------------------------------------------- |
| AccountPrivilegeType   | string | 数据库对应账号权限。<br/>ReadWrite：读写权限<br/>DMLOnly：仅DML<br/>ReadOnly：只读权限<br/>DDLOnly：仅DDL |
| DBName                 | string | 已授权数据库名称                                             |
| TableName              | string | 已授权数据表名称                                             |
| AccountPrivilegeDetail | string | 账号权限详情                                                 |

#### 查询用户ExtraPrivilegeObj

| 参数名    | 类型   | 说明                                                         |
| --------- | ------ | ------------------------------------------------------------ |
| AllCreate | string | 普通账号全局create权限，默认false，取值范围：["ture","false"] |

**请求示例：**

```python
def get_mysql_account():
    """
    获取云数据库MySQL用户
    """
    action = "DescribeDBAccount"
    method = "GET"
    param = {
        "InstanceUuid": "********************"
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
        "AccountDescription": "",
        "AccountName": "admin",
        "AccountStatus": "available",
        "AccountType": "Super",
        "DatabasePrivileges": null,
        "ExtraPrivilege": null,
        "ServiceId": "********************"
    }, {
        "AccountDescription": "",
        "AccountName": "pt",
        "AccountStatus": "available",
        "AccountType": "Normal",
        "DatabasePrivileges": [{
            "AccountPrivilegeDetail": "CREATE, DROP, INDEX, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE",
            "AccountPrivilegeType": "DDLOnly",
            "DBName": "test",
            "TableName": "*"
        }],
        "ExtraPrivilege": {
            "AllCreate": "true"
        },
        "ServiceId": "********************"
    }],
    "Message": "success"
}
```

### 10.DeleteDBAccount

**Action：DeleteDBAccount**

**描述：** 删除云数据库MySQL用户

**请求地址：cdsapi.capitalonline.net/mysql**

**请求方法：** POST 

**请求参数：**

| 参数名       | 必选 | 类型   | 说明             |
| ------------ | ---- | ------ | ---------------- |
| InstanceUuid | 是   | string | 实例编号         |
| AccountName  | 是   | string | 需删除的账号名称 |

**返回参数：**

| 参数名  | 类型   | 说明     |
| :------ | :----- | :------- |
| Message | string | 信息描述 |
| Code    | string | 状态码   |
| Data    | Object | 数据     |
| TaskId  | string | 任务编号 |

**请求示例：**

```python
def delete_user(instance_uuid):
    """
    删除云数据库MySQL用户
    :param instance_uuid: 实例编号
    """
    action = "DeleteDBAccount"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param=param)
    body = {
        "InstanceUuid": "**************",
        "AccountName": "root",
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
    "Message": "Success",
    "TaskId": ""
}
```

### 11.DescribeModifiableDBSpec

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

### 12.ModifyDBInstanceSpec

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
| DiskValue    | 否   | string | 新增磁盘大小                                                     |

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

### 13.DeleteDBInstance

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

### 14.DescribeAvailableReadOnlyConfig

**Action：DescribeAvailableReadOnlyConfig**

**描述：** 获取当前MySQL主从实例支持购买的只读实例规格

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** GET

**请求参数：**

| 参数名       | 必选 | 类型   | 说明               |
| :----------- | :--- | :----- | ------------------ |
| InstanceUuid | 是   | string | 要初始化的实例编号 |

**返回参数：**

| 参数名  | 类型                                | 说明                                                   |
| ------- | ----------------------------------- | ------------------------------------------------------ |
| Code    | string                              | 状态码                                                 |
| Data    | [DataObj](#查询只读实例规格DataObj) | 可购买的MySQL只读实例规格数据对象                      |
| Message | string                              | 返回调用接口状态信息和code相对应，比如：Success, Error |

#### 查询只读实例规格DataObj

| 参数名           | 类型                                                        | 说明                                                         |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| ArchitectureName | string                                                      | 架构名称                                                     |
| ComputeRoles     | list of [ComputeRolesObj](#查询只读实例规格ComputeRolesObj) | 支持的计算类型，不同的计算类型支持不同规格，并支持添加不同类型的硬盘 |
| SubProductName   | string                                                      | 子产品名称，比如：MySQL 只读实例                             |
| Version          | string                                                      | 产品支持的版本                                               |

#### 查询只读实例规格ComputeRolesObj

| 参数名      | 类型                                        | 说明                        |
| ----------- | ------------------------------------------- | --------------------------- |
| ComputeName | string                                      | 计算类型名称， 比如：通用型 |
| Standards   | [StandardObj](#查询只读实例规格StandardObj) | 该类型支持的规格            |

#### 查询只读实例规格StandardObj

| 参数名     | 类型                                                    | 说明                             |
| ---------- | ------------------------------------------------------- | -------------------------------- |
| AttachDisk | list of [AttachDiskObj](#查询只读实例规格AttachDiskObj) | 该类型规格能够添加的磁盘类型列表 |
| CpuRam     | list of [CpuRamObj](#查询只读实例规格CpuRamObj)         | 支持的规格列表                   |

#### 查询只读实例规格AttachDiskObj

| 参数名        | 类型   | 说明                                                         |
| ------------- | ------ | ------------------------------------------------------------ |
| BasicIops     | string | 基础的磁盘的iops                                             |
| DiskMax       | int    | 单次支持扩容到最大磁盘容量为2000                             |
| DiskMaxExpand | int    | 磁盘最大可扩容大小                                           |
| DiskMin       | int    | 磁盘容量支持的最小值，起步为100                              |
| DiskName      | string | 磁盘类型名称，包含SSD和性能型 SSD：SSD磁盘，磁盘IOPS默认为5000，可购买IOPS性能包 性能型：普通SSD盘，磁盘IOPS限定在3000 |
| DiskStep      | int    | 磁盘扩容步长，步长大小=100                                   |
| DiskUnit      | string | 磁盘容量单位：GB                                             |
| DiskValue     | string | 磁盘类型,用于创建服务实例指定磁盘类型 (创建服务时候使用      |

#### 查询只读实例规格CpuRamObj

| 参数名      | 类型   | 说明                                           |
| ----------- | ------ | ---------------------------------------------- |
| CPU         | int    | 核心数量，单位：个                             |
| Name        | string | 规格名称                                       |
| PaasGoodsId | int    | 具体的产品编号，根据产品编号确定购买哪一种规格 |
| RAM         | int    | 内存大小，单位：GB                             |

**请求示例：**

```python
def get_mysql_modifiable_spec(instance_uuid):
    """
    获取当前MySQL实例支持的配置变更的规格
    :param instance_uuid: 实例编号
    :return:
    """
    action = "DescribeAvailableReadOnlyConfig"
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
        "ArchitectureName": "主从",
        "ComputeRoles": [{
            "ComputeName": "通用型",
            "Standards": {
                "AttachDisk": [{
                    "BasicIops": "",
                    "DiskMax": 4000,
                    "DiskMaxExpand": 2000,
                    "DiskMin": 100,
                    "DiskName": "SSD",
                    "DiskStep": 100,
                    "DiskUnit": "G",
                    "DiskValue": "ssd_disk"
                }, {
                    "BasicIops": "",
                    "DiskMax": 4000,
                    "DiskMaxExpand": 2000,
                    "DiskMin": 100,
                    "DiskName": "性能型",
                    "DiskStep": 100,
                    "DiskUnit": "G",
                    "DiskValue": "high_disk"
                }],
                "CpuRam": [{
                    "CPU": 2,
                    "Name": "2C4G",
                    "PaasGoodsId": 15686,
                    "RAM": 4
                }, {
                    "CPU": 4,
                    "Name": "4C8G",
                    "PaasGoodsId": 15688,
                    "RAM": 8
                }, {
                    "CPU": 4,
                    "Name": "4C16G",
                    "PaasGoodsId": 15690,
                    "RAM": 16
                }, {
                    "CPU": 8,
                    "Name": "8C16G",
                    "PaasGoodsId": 15692,
                    "RAM": 16
                }, {
                    "CPU": 8,
                    "Name": "8C32G",
                    "PaasGoodsId": 15694,
                    "RAM": 32
                }, {
                    "CPU": 16,
                    "Name": "16C64G",
                    "PaasGoodsId": 15696,
                    "RAM": 64
                }]
            }
        }],
        "SubProductName": "MySQL 只读实例",
        "Version": "8.0"
    },
    "Message": "获取只读规格列表成功。"
}
```

### 15.CreateReadOnlyDBInstance

**Action：CreateReadOnlyDBInstance**

**描述：** 为MySQL添加只读实例（目前只支持主从版）

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型   | 说明                                                         |
| :----------- | :--- | :----- | ------------------------------------------------------------ |
| InstanceUuid | 是   | string | 实例编号，为该数据库添加只读实例                             |
| InstanceName | 是   | string | 只读实例名称                                                 |
| PaasGoodsId  | 是   | int    | 只读实例商品规格，要大于等于主实例规格                       |
| DiskType     | 是   | string | 磁盘类型                                                     |
| DiskValue    | 是   | int    | 磁盘大小，只读实例磁盘规格不能低于主实例                     |
| TestGroupId  | 否   | int    | 是否使用测试组计费                                           |
| Amount       | 否   | int    | 购买的数量一次最多购买三个                                   |
| ServicePort  | 否   | int    | MySQL实例端口，默认3306，取值范围：1024-65535（9100和9101无效） |

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
        "PaasGoodsId": 6707,
        "ServicePort": 6033,
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
### 16.CreateBackup

**Action：CreateBackup**

**描述：** 为实例创建一个备份集，支持云数据库MySQL主从版实例和集群版实例

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型   | 说明                                                         |
| :----------- | :--- | :----- | ------------------------------------------------------------ |
| InstanceUuid | 是   | string | 实例编号                                                     |
| BackupType   | 是   | string | 备份类型，取值范围：<br />物理全备份："physical-backup"<br/>逻辑备份："logical-backup" |
| Desc         | 否   | string | 备份的描述,不传默认为空字符串                                |
| DBList       | 否   | list   | 当备份类型为逻辑备份时，用于指定数据库备份，<br />不填默认为整个实例备份 |

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
        "BackupType": "logical-backup", 
        "Desc": "test-openapi-python",
        "DBList":[
            "test1",
            "test2"
        ]
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

### 17.DescribeBackups

**Action：DescribeBackups**

**描述：** 查看备份集列表

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** GET

**请求参数：**

| 参数名       | 必选 | 类型   | 说明     |
| :----------- | :--- | :----- | -------- |
| InstanceUuid | 是   | string | 实例编号 |

**返回参数：**

| 参数名         | 类型   | 说明                                                         |
| :------------- | :----- | ------------------------------------------------------------ |
| Message        | string | 信息描述                                                     |
| Code           | string | 状态码                                                       |
| Data           | dict   | 数据                                                         |
| BackupId       | string | 备份id                                                       |
| Status         | string | 备份状态                                                     |
| BackupType     | string | 备份类型，取值范围：<br />物理全备份："physical-backup"<br/>逻辑备份："logical-backup" |
| StartTime      | string | 开始时间                                                     |
| EndTime        | string | 结束时间                                                     |
| BackupMode     | string | 备份策略（自动备份、手动备份）                               |
| BackupSize     | string | 备份文件大小，单位字节                                       |
| Desc           | string | 备份描述                                                     |
| BackupStrategy | string | 备份范围，取值范围：<br />整个实例："instance"<br />指定数据库："db" |

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
        "BackupType": "logical-backup",
        "Desc": "",
        "EndTime": "2020-06-18 04:10:13",
        "InstanceId": "**************************",
        "StartTime": "2020-06-18 04:09:59",
        "Status": "finished",
        "BackupStrategy":"db"
    }, {
        "BackupId": "**************************",
        "BackupMode": "auto",
        "BackupSize": 677494,
        "BackupType": "physical-backup",
        "Desc": "",
        "EndTime": "2020-06-17 04:10:22",
        "InstanceId": "**************************",
        "StartTime": "2020-06-17 04:10:08",
        "Status": "finished",
        "BackupStrategy":"instance"
    }, {
        "BackupId": "**************************",
        "BackupMode": "auto",
        "BackupSize": 677498,
        "BackupType": "physical-backup",
        "Desc": "",
        "EndTime": "2020-06-16 04:10:17",
        "InstanceId": "**************************",
        "StartTime": "2020-06-16 04:10:03",
        "Status": "finished",
        "BackupStrategy":"instance"
    }, {
        "BackupId": "**************************",
        "BackupMode": "manual",
        "BackupSize": 677484,
        "BackupType": "physical-backup",
        "Desc": "",
        "EndTime": "2020-06-15 15:04:59",
        "InstanceId": "**************************",
        "StartTime": "2020-06-15 15:04:41",
        "Status": "finished",
        "BackupStrategy":"instance"
    }],
    "Message": "Success."
}
```

### 18.DeleteBackup

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

### 19.DownloadBackup

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

| 参数名                    | 类型      | 说明                                                         |
| :------------------------ | :-------- | ------------------------------------------------------------ |
| Message                   | string    | 信息描述                                                     |
| Code                      | string    | 状态码                                                       |
| Data                      | dict      | 数据                                                         |
| BackupId                  | string    | 备份编号                                                     |
| Status                    | string    | 备份状态                                                     |
| BackupType                | string    | 备份类型，取值范围：<br />物理全备份："physical-backup"<br/>逻辑备份："logical-backup" |
| StartTime                 | string    | 备份的开始时间                                               |
| EndTime                   | string    | 备份的结束时间                                               |
| BackupMode                | ststringr | 备份策略（自动或者手动备份）                                 |
| BackupSize                | string    | 备份文件大小，单位字节                                       |
| Desc                      | string    | 备份的描述（手动备份可以自定义内容），自动备份为空字符串     |
| BackupDownloadUrl         | string    | 公网下载地址                                                 |
| BackupIntranetDownloadUrl | string    | 内网下载地址                                                 |
| BackupStrategy            | string    | 备份范围，取值范围：<br />整个实例："instance"<br />指定数据库："db" |

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
        "BackupType": "physical-backup",
        "Desc": "",
        "EndTime": "2020-06-18 04:00:26",
        "InstanceId": "***************",
        "StartTime": "2020-06-18 04:00:06",
        "Status": "finished",
        "BackupStrategy":"instance"
    },
    "Message": "Success.",
    "TaskId": ""
}
```

### 20.ModifyDbBackupPolicy

**Action：ModifyDbBackupPolicy**

**描述：** 修改云数据库MySQL高可用版自动备份设置。

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型                                     | 说明                     |
| :----------- | :--- | :--------------------------------------- | ------------------------ |
| InstanceUuid | 是   | string                                   | 要修改备份设置的实例编号 |
| DataBackups  | 是   | object of [DataBackups](#DataBackupsObj) | 备份设置                 |

#### DataBackupsObj

| 参数名   | 必选 | 类型           | 说明                                                         |
| :------- | :--- | :------------- | ------------------------------------------------------------ |
| TimeSlot | 是   | string         | 备份时间段，以整点开始，整点结束，间隔为一小时。<br />输入参数范围：["00:00-01:00","01:00-02:00","02:00-03:00","03:00-04:00","04:00-05:00","05:00-06:00","06:00-07:00","07:00-08:00","08:00-09:00","09:00-10:00","10:00-11:00","11:00-12:00","12:00-13:00","13:00-14:00","14:00-15:00","15:00-16:00","16:00-17:00","17:00-18:00","18:00-19:00","19:00-20:00","20:00-21:00","21:00-22:00","22:00-23:00","23:00-24:00"] |
| DateList | 是   | list of string | 备份周期，输入参数范围：["0","1","2","3","4","5","6"]，0为星期日，1为星期一，以此类推 |
| Sign     | 是   | int            | 自动备份开关，关闭：0 ，开启：1                              |

**返回参数：**

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| Code    | string | 状态码   |
| Message | string | 信息描述 |

**请求示例：**

```python
def modify_mysql_backup_policy(instance_uuid):
    """
    修改云数据库MySQL高可用版自动备份设置
    :param instance_uuid: 实例编号
    """
    action = "ModifyDbBackupPolicy"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param=param)
    body = {
        "InstanceUuid": instance_uuid,
        "DataBackups": {
            "TimeSlot": "13:00-14:00",
            "DateList": ["0", "1", "2", "3", "4", "5", "6"],
            "Sign": 1
        }
    }

    res = requests.post(url, json=body)
    result = json.loads(res.content)
    print(result)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Message": "success"
}
```

### 21.DescribeDBInstancePerformance

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

### 22.DescribeDBParameter

**Action：DescribeDBParameter**

**描述：** 获取云数据库MySQL参数列表。

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** GET

**请求参数：**

| 参数名       | 必选 | 类型   | 说明     |
| ------------ | ---- | ------ | -------- |
| InstanceUuid | 是   | string | 实例编号 |

**返回参数：**

| 名称    | 类型                        | 描述     |
| :------ | :-------------------------- | :------- |
| Message | string                      | 信息描述 |
| Code    | string                      | 状态码   |
| Data    | [DataObj](#查询参数dataobj) | 数据     |

#### 查询参数DataObj

| 名称       | 类型                                    | 描述     |
| :--------- | :-------------------------------------- | :------- |
| Parameters | list of [ParametersObj](#parametersobj) | 参数信息 |

#### ParametersObj

| 名称         | 类型   | 描述         |
| :----------- | :----- | :----------- |
| DefaultValue | string | 参数默认值   |
| CurrentValue | string | 运行参数值   |
| Description  | string | 参数描述     |
| IsModify     | string | 是否可修改   |
| CheckingCode | string | 可修改参数值 |
| IsRestart    | string | 是否重启     |
| Name         | string | 参数名       |

**请求示例：**

```python
def get_mysql_parameter_info():
    """
    获取MySQL参数列表
    """
    action = "DescribeDBParameter"
    method = "GET"
    param = {
        "InstanceUuid": "********************"
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
    "Data": {
        "Parameters": [{
            "CheckingCode": "[10-84]",
            "CurrentValue": "84",
            "DefaultValue": "84",
            "Description": "Maximum length of words that are stored in an InnoDB FULLTEXT index.",
            "IsModify": "true",
            "IsRestart": "true",
            "Name": "innodb_ft_max_token_size"
        }]
    },
    "Message": "success"
}
```

### 23.DescribeDBParameterModifyHistory

**Action：DescribeDBParameterModifyHistory**

**描述：** 获取云数据库MySQL参数修改历史。

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** GET

**请求参数：**

| 参数名       | 必选 | 类型   | 说明     |
| ------------ | ---- | ------ | -------- |
| InstanceUuid | 是   | string | 实例编号 |
| StartTime    | 是   | string | 开始时间 |
| EndTime      | 是   | string | 结束时间 |

**返回参数：**

| 名称    | 类型                                | 描述     |
| :------ | :---------------------------------- | :------- |
| Message | string                              | 信息描述 |
| Code    | string                              | 状态码   |
| Data    | [DataObj](#查询参数修改历史dataobj) | 数据     |

#### 查询参数修改历史DataObj

| 名称              | 类型   | 描述           |
| :---------------- | :----- | :------------- |
| IsValid           | bool   | 是否生效       |
| ModifyTime        | string | 变更时间       |
| ModifyRole        | string | 操作者         |
| OldParameterValue | string | 变更前的参数值 |
| NewParameterValue | string | 变更后的参数值 |
| StatusMessage     | string | 状态描述       |
| ParameterName     | string | 参数名         |

**请求示例：**

```python
def get_mysql_parameter_history():
    """
    获取MySQL参数修改历史
    """
    action = "DescribeDBParameterModifyHistory"
    method = "GET"
    param = {
        "InstanceUuid": "********************",
        "StartTime": "2022-02-01 17:16:08",
        "EndTime": "2022-02-18 17:16:08"
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
        "IsValid": ture,
        "ModifyRole": "用户",
        "ModifyTime": "2022-02-17 15:34:06",
        "NewParameterValue": "74.43",
        "OldParameterValue": "74.43",
        "ParameterName": "innodb_max_dirty_pages_pct",
        "StatusMessage": "已生效"
    }],
    "Message": "success"
}
```

### 24.ModifyDBParameter

**Action：ModifyDBParameter**

**描述：** 修改云数据库MySQL参数。

**请求地址：** cdsapi.capitalonline.net/mysql

**请求方法：** POST

**请求参数：**

| 参数名       | 必选 | 类型                                            | 说明       |
| ------------ | ---- | ----------------------------------------------- | ---------- |
| InstanceUuid | 是   | string                                          | 实例编号   |
| Parameters   | 是   | list of [ParametersObj](#修改参数parametersobj) | 待修改参数 |

#### 修改参数ParametersObj

| 参数名 | 必选 | 类型   | 说明     |
| ------ | ---- | ------ | -------- |
| Name   | 是   | string | 参数名称 |
| Value  | 是   | string | 参数值   |

**返回参数：**

| 名称    | 类型   | 描述                 |
| :------ | :----- | :------------------- |
| Message | string | 信息描述             |
| Code    | string | 状态码               |
| Data    | dict   | 参数修改历史查询数据 |
| TaskId  | string | 任务编号             |

**请求示例：**

```python
def modify_mysql_parameter(instance_uuid):
    """
    修改云数据库MySQL参数
    :param instance_uuid: 实例编号
    """
    action = "ModifyDBParameter"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, MYSQL_URL, param=param)
    body = {
        "InstanceUuid": "************",
        "Parameters": [
            {
                "Name": "back_log",
                "Value": "345"
            }, {
                "Name": "connect_timeout",
                "Value": "145"
            }
        ]
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
    "Message": "Parameter configuration is being configured",
    "TaskId": "42a73680-af4d-498e-b6a2-416fec04ca44"
}
```
