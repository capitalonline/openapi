GPU服务器公开API目录
=================

* [认证方式](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#认证方式)
  * [1.公共请求参数](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#1公共请求参数)
  * [2.签名机制](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#2签名机制)
    * [步骤一：构造规范化请求字符串](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#步骤一构造规范化请求字符串)
    * [步骤二：构造签名字符串](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#步骤二构造签名字符串)
  * [3.获取签名代码](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#2获取签名代码)
* [GPU服务器相关](#gpu服务器相关)
  * [1.DescribeRegions](#1describeregions)
  * [2.DescribeGpuGoods](#2describegpugoods)
  * [3.DescribeGpuGoodsPrice](#3describegpugoodsprice)
  * [4.DescribeGpu](#4describegpu)
  * [5.DescribeGpuDetail](#5describegpudetail)
  * [6.DescribeGpuTask](#6Describegputask)
  * [7.ReinstallGpu](#7reinstallgpu)
  * [8.DescribeGpuImage](#8describegpuimage)
  * [9.CreateGpuInstance](#9creategpuinstance)
  * [10.OperateGpuPower](#10operategpupower)
  * [11.DeleteGpuInstances](#11deletegpuinstances)

## GPU服务器相关

### 1.DescribeGpuRegions

**Action**: DescribeGpuRegions

**描述**：获取GPU服务器可售的地域信息

**请求地址**：api.capitalonline.net/gpubms/v1

**请求方法**: GET

**返回参数**：

| 名称         | 类型     | 示例           | 描述                 |
| ---------- | ------ | ------------ | ------------------ |
| Code       | string | Success      | 返回状态码: Success: 成功 |
| Message    | string | null         | 返回信息               |
| Data       | object | {}           | 返回数据               |
| RegionId   | string | CN_Hohhot_B  | 站点编号               |
| RegionName | string | 中国大陆-庆阳-可用区A | 站点名称               |



**请求示例**

```python
def gpu_region_info():
   action = "DescribeGpuRegions"
   method = "GET"
   param = {}
   url = get_signature(action, AK, AccessKeySecret, method, GPU_URL, param)
   res = requests.get(url)
   result = json.loads(res.content)
```

**返回示例**

```json
{
    "Code": "Success",
    "Message": "",
    "Data": [
        {
            "RegionId": "CN_Hohhot_B",
            "RegionName": "中国大陆-呼和浩特-可用区B"
        }
    ]
}
```

### 2.DescribeGpuGoods

**Action: DescribeGpuGoods**

**描述:** 查询GPU服务器商品列表

**请求地址:** api.capitalonline.net/gpubms/v1

**请求方法:** GET

**请求参数：**

| 名称       | 类型     | 是否必须 | 示例          | 描述                       |
| -------- | ------ | ---- | ----------- | ------------------------ |
| RegionId | string | 是    | CN_Hohhot_B | 站点编号（DescribeRegions返回值） |

**返回数据：**

| 名称           | 类型     | 示例                                   | 描述                    |
| ------------ | ------ | ------------------------------------ | --------------------- |
| Code         | string | Success                              | 返回状态码: Success: 成功    |
| Message      | string | null                                 | 返回信息                  |
| Data         | object | {}                                   | 返回数据                  |
| PrePaid      | list   | []                                   | 预付费，包年包月商品列表 PostPaid |
| PostPaid     | list   | null                                 | 按量付费商品列表              |
| GoodsId      | int    | 6034                                 | 商品ID                  |
| GoodsName    | string | GPU服务器测试产                            | 商品名称                  |
| Computes     | list   | []                                   | 商品里产品配置信息             |
| Id（Computes） | string | f59c9873-b57d-43e8-94c3-3ed0ba3550b0 | 产品配置Id                |
| CpuInfo      | string | Intel Xeon Silver 4110*2             | CPU信息                 |
| Cpu          | int    | 32                                   | CPU个数                 |
| Ram          | int    | 64                                   | 内存大小                  |
| Frequency    | string | 2.1GHz                               | 主频                    |
| PurchaseNum  | int    | 0                                    | 可购买的数量                |
| Disks        | list   | []                                   | 本地盘信息                 |
| Id（Disks）    | string | 8e857eb1-c8c1-4c73-9bc3-ea200121ed1a | 本地盘Id                 |
| Type         | string | SSD                                  | 磁盘类型                  |
| Capacity     | int    | 480                                  | 容量                    |
| Count        | int    | 1                                    | 个数                    |

**返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "PostPaid": [
            {
                "Computes": [
                    {
                        "Cpu": 32,
                        "CpuInfo": "Intel Xeon Silver 4110",
                        "Disks": [
                            {
                                "Capacity": 480,
                                "Count": 1,
                                "Id": "ab72e15b-f3ab-4448-9094-ab271813f405",
                                "Type": "SSD"
                            }
                        ],
                        "Frequency": "2.1GHz",
                        "Id": "8fbdb61e-b941-46db-89f6-f8953b278ec9",  
                        "Ram": 64
                    }
                ],
                "GoodsId": 7685,
                "GoodsName": "GPU服务器-02SS01（公测）"
            }
        ],
        "PrePaid": [            
            {
                "Computes": [
                    {
                        "Cpu": 32,
                        "CpuInfo": "Intel Xeon Silver 6148",
                        "Disks": [
                            {
                                "Capacity": 3200,
                                "Count": 1,
                                "Id": "d7a3f7ef-98e1-417c-a7e4-a5720e273f67",
                                "Type": "NVME"
                            }
                        ],
                        "Frequency": "3.5GHz",
                        "Id": "1b69ecca-453c-4535-8c96-16edf1ec6da9",
                        "Ram": 64
                    }
                ],
                "GoodsId": 7793,
                "GoodsName": "GPU服务器-03SA03（公测）"
            }
        ]
    }
}
```

**代码调用示例**

```python
def describe_gpu_goods(RegionId):
   action = "DescribeGpuGoods"
   method = "GET"
   param = {
       "RegionId": RegionId
   }
   url = get_signature(action, AK, AccessKeySecret, method, GPU_URL, param)
   res = requests.get(url)
   result = json.loads(res.content)
```

### 3.DescribeGpuGoodsPrice

**Action: DescribeGpuGoodsPrice**

**描述:** 计算GPU服务器商品价格

**请求地址:** api.capitalonline.net/gpubms/v1

**请求方法:** POST

**请求参数：**

| 名称                 | 类型     | 是否必须 | 示例                                   | 描述                                                    |
| ------------------ | ------ |------| ------------------------------------ | ----------------------------------------------------- |
| RegionId           | string | 是    | CN_Hohhot_B                          | 站点编号                                                  |
| GoodsId            | int    | 是    | 7955                                 | 商品ID                                                  |
| ComputeId          | string | 是    | f7d3b7b4-e77d-47ac-aa37-8c9e3304e469 | 规格配置ID                                                |
| InstanceChargeType | string | 是    | PrePaid                              | 付费方式，取值范围： PrePaid：预付费，包年包月。 PostPaid：按量付费。 目前只支持包年包月 |
| PrepaidMonth       | int    | 否    | 1                                    | 包年包月购买月数，输入0为购买到月底，输入1为到月底后在购买一个自然月，默认为0。最长36月        |
| Amount             | int    | 是    | 10                                   | 指定创建GPU服务器服务器的数量，默认取值：1                               |

**返回数据：**

| 名称          | 类型     | 示例      | 描述                 |
| ----------- | ------ | ------- | ------------------ |
| Code        | string | Success | 返回状态码: Success: 成功 |
| Message     | string | null    | 返回信息               |
| Data        | object | {}      | 返回数据               |
| TradeAmount | string | 6660.00 | 交易价格               |
| UnitPrice   | string | 666.00  | 单价                 |
| Currency    | string | CN      | 结算方式,CN:人命币 US:美元  |

**返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "Currency": "CN",
        "TradeAmount": "0.79",
        "UnitPrice": "10000.00"
    }
}
```

**代码调用示例**

```python
def describe_gpu_price():
   action = "DescribeGpuGoodsPrice"
   method = "POST"
   param = {
       "RegionId": "CN_Hohhot_B",
       "InstanceChargeType": "PrePaid",
       "ComputeId": "8fbdb61e-b941-46db-89f6-f8953b278ec9",
       "PrepaidMonth":1,
       "GoodsId": 7685,
       "Amount": 1
   }
   url = get_signature(action, AK, AccessKeySecret, method, GPU_URL)
   res = requests.post(url, json= param)
   result = json.loads(res.content)
```

### 4.DescribeGpu

**Action: **DescribeGpu****

**描述**: 查询GPU服务器列表

**请求地址**: api.capitalonline.net/gpubms/v1

**请求方法**: GET

**请求参数**:

| 名称         | 类型     | 是否必选 | 示例值                                  | 描述                                               |
| ---------- | ------ | ---- | ------------------------------------ | ------------------------------------------------ |
| AppId      | string | 否    | 2bbacc90-5e8f-4394-92e1-3f237de1ae8d | VPC ID/虚拟数据中心Id(如：参考私有网络相关DescribeVPC 获取返回VpcId) |
| Name       | string | 否    | bms003                               | GPU服务器名称                                         |
| PageNumber | int    | 否    | 1                                    | Gpu列表页码。起始值：1, 默认值：1                             |
| PageSize   | int    | 否    | 10                                   | 每页返回数量，默认值：500                                   |

**返回参数**:

| 名称                 | 类型     | 示例值                                  | 描述                                                |
| ------------------ | ------ | ------------------------------------ | ------------------------------------------------- |
| Code               | string | Success                              | 错误码                                               |
| Message            | string | null                                 | 返回信息说明                                            |
| Data               | object | {}                                   | GPU服务器服务器列表记录，包含GPU服务器服务器信息，网卡信息，分页信息             |
| Records            | list   | []                                   | GPU服务器列表                                          |
| ResourceId         | string | a0492924-1dc1-462e-9cbb-622dc1ec49a3 | GPU服务器ID                                          |
| Name               | string | bms-test                             | GPU服务器名称                                          |
| Cpu                | int    | 32                                   | Cpu个数                                             |
| Ram                | int    | 64                                   | 内存大小                                              |
| State              | string | running                              | 运行状态                                              |
| Status             | string | 运行                                   | 运行状态（中文）                                          |
| RegionId           | string | CN_Hohhot_B                          | 站点编号                                              |
| AppName            | string | 庆阳监控测试                               | VPC名称/虚拟数据中心名称                                    |
| AppId              | string | 6d323aa0-9a46-11ee-9a07-622ad4e5a137 | VPC ID/虚拟数据中心ID                                   |
| RegionName         | string | 中国大陆-庆阳-可用区A                         | 区域名称                                              |
| InstanceChargeType | string | PostPaid                             | 计费方式<br>PrePaid：预付费<br>PostPaid：按量付费<br>目前只支持包年包月 |
| IsAutoRenewal      | int    | 0                                    | 0: 没有开启自动续约，1: 开启自动续约                             |
| CreateDate         | string | 2019-08-08 11:45:51                  | GPU服务器创建时间                                        |
| Networks           | object | {}                                   | 网络                                                |
| NetworkCards       | list   | []                                   | 网卡                                                |
| Id(NetworkCards)   | string | b0143a8a-2fb1-4c66-b0e4-34b12ff9e33c | 网卡Id                                              |
| VlanId             | string | 1020                                 | Vlan编号                                            |
| IpType             | string | subnet                               | Ip类型：subnet/public/private                        |
| IpVersion          | string | ipV4                                 | Ip版本                                              |
| IpAddress          | string | 10.241.36.1                          | Ip地址                                              |
| Netmask            | string | 255.255.0.0                          | 掩码地址                                              |
| Gateway            | string | 10.241.36.1                          | 网关地址                                              |
| EipAddress         | String | 60.165.239.111                       | EIP地址                                             |
| EipLinkType        | String | 电信                                   | EIP类型                                             |
| TotalCount         | int    | 3                                    | GPU服务器服务器总数                                       |
| PageSize           | int    | 10                                   | 每页大小                                              |
| Pages              | int    | 1                                    | 页数                                                |
| PageNumber         | int    | 1                                    | 当前页                                               |

**返回示例**

```json
{
    "Code": "Success",
    "Message": "Success.",
    "Data": {
        "Records": [
            {
                "ResourceId": "0d19f7e6-553f-43be-ab3f-b5c31b3511d9",
                "Cpu": 32,
                "CreateDate": "2020-04-16 11:56:58",
                "InstanceChargeType": "PostPaid",
                "IsAutoRenewal": 1,
                "Name": "test-wwh",
                "RegionName": "中国大陆-庆阳-可用区A",
                "AppName": "SLB",
                "AppId": "6d323aa0-9a46-11ee-9a07-622ad4e5a137",
                "Networks": {
                    "NetworkCards": [                        
                        {
                            "Gateway": "10.240.57.1",
                            "Id": "69ed5a7b-8599-4104-a1fa-211db097b73d",
                            "IpAddress": "10.240.57.1",
                            "IpType": "subnet",
                            "IpVersion": "ipV4",
                            "Netmask": "255.255.0.0",
                            "VlanId": "3214",
                            "EipAddress": "60.165.239.111",
                            "EipLinkType": "电信"
                        }
                    ]
                },
                "Ram": 64,
                "State": "running",
                "Status": "运行"
            }],
        "TotalCount": 3,
        "PageSize": 500,
        "PageNumber": 1
    }
}
```

**代码调用示例**

```python
def describe_gpu_list():
    action = "DescribeGpu"
    method = "GET"
    param = {
         "Name":"bms003"
    }
    url = get_signature(action, AK, AccessKeySecret, method, GPU_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
```

### 5. DescribeGpuDetail

**Action: DescribeGpuDetail**

**描述**: 查询GPU服务器详情

**请求地址**: api.capitalonline.net/gpubms/v1

**请求方法**: GET

**请求参数**:

| 名称         | 类型     | 是否必选 | 示例值                                  | 描述       |
| ---------- | ------ | ---- | ------------------------------------ | -------- |
| ResourceId | string | 是    | a0492924-1dc1-462e-9cbb-622dc1ec49a3 | GPU服务器ID |

**返回参数**:

| 名称                 | 类型     | 示例值                                       | 描述                                                |
| ------------------ | ------ | ----------------------------------------- | ------------------------------------------------- |
| Code               | string | Success                                   | 错误码                                               |
| Message            | string | null                                      | 返回信息说明                                            |
| Data               | object | {}                                        | GPU服务器服务器详情数据                                     |
| ResourceId         | string | a0492924-1dc1-462e-9cbb-622dc1ec49a3      | GPU服务器ID                                          |
| Name               | string | bms-test                                  | GPU服务器名称                                          |
| Cpu                | int    | 32                                        | Cpu个数                                             |
| Ram                | int    | 64                                        | 内存大小                                              |
| State              | string | running                                   | 运行状态                                              |
| Status             | string | 运行                                        | 运行状态（中文）                                          |
| AppId              | string | 2bbacc90-5e8f-4394-92e1-3f237de1ae8d      | VPC ID/虚拟数据中心Id                                   |
| RegionId           | string | CN_Hohhot_B                               | 站点编号                                              |
| AppName            | string | bms003                                    | VPC名称/虚拟数据中心名称                                    |
| RegionName         | string | 中国大陆-北京-可用区F                              | 站点名称                                              |
| ImageName          | string | ubuntu14.04_64                            | 镜像名称                                              |
| InstanceChargeType | string | PostPaid                                  | 计费方式<br>PrePaid：预付费<br>PostPaid：按量付费<br>目前只支持包年包月 |
| BillStatus         | string | 1                                         | 1: 计费中                                            |
| IsAutoRenewal      | int    | 0                                         | 0: 没有开启自动续约，1: 开启自动续约                             |
| RunningTime        | string | 0天3小时1分钟35秒                               | 运行时间                                              |
| CreateDate         | string | 2019-08-08 11:45:51                       | GPU服务器创建时间                                        |
| ExpireDate         | string | 2019-09-01 00:00:00                       | GPU服务器到期时间                                        |
| Volumes            | list   | []                                        | 存储挂载                                              |
| Id(Volumes)        | string | 951496fa-73a6-461b-96dd-4ffba09ef5a7      | 挂载ID                                              |
| Type               | string | hard                                      | 存储类型                                              |
| Capacity           | int    | 480                                       | 容量大小                                              |
| VolumeType         | string | SSD                                       | 硬盘类型                                              |
| VolumeId           | string | cb4228a9-58bb-44b2-8ddd-9e46168b364d      | 硬盘Id                                              |
| UpdateDate         | string | 2020-04-17T07:47:23.000+0000              | 更新时间                                              |
| Networks           | object | {}                                        | 网络                                                |
| NetworkCards       | list   | []                                        | 网卡                                                |
| Id(NetworkCards)   | string | b0143a8a-2fb1-4c66-b0e4-34b12ff9e33c      | 网卡Id                                              |
| Mac                | list   | ["e4:43:4b:6b:a7:0e","e4:43:4b:6b:a7:10"] | Mac地址                                             |
| VlanId             | string | 1020                                      | Vlan编号                                            |
| WorkMode           | string | bond6                                     | 网卡绑定信息                                            |
| IpType             | string | private                                   | Ip类型：subnet/public/private                        |
| IpVersion          | string | ipV4                                      | Ip版本                                              |
| IpAddress          | string | 10.241.36.1                               | Ip地址                                              |
| Netmask            | string | 255.255.0.0                               | 掩码地址                                              |
| Gateway            | string | 10.241.36.1                               | 网关地址                                              |
| EipAddress         | String | 60.165.239.111                            | EIP地址                                             |
| EipLinkType        | String | 电信                                        | EIP类型                                             |



**返回示例**

```json
{
    "Code": "Success",
    "Message": "Success.",
    "Data": {
        "ResourceId": "19cd1c58-11d4-4ed0-8c19-81aa4cf3574a",
        "BillStatus": "1",
        "Cpu": 32,
        "CreateDate": "2020-04-30 11:22:41",
        "ExpireDate": "2020-05-01 00:00:00",
        "ImageName": "centos7.6_64",
        "InstanceChargeType": "PrePaid",
        "IsAutoRenewal": 0,
        "Name": "openapi006",
        "Networks": {
            "NetworkCards": [
                {
                    "Gateway": "10.240.57.1",
                    "Id": "69ed5a7b-8599-4104-a1fa-211db097b73d",
                    "IpAddress": "10.240.57.1",
                    "IpType": "subnet",
                    "IpVersion": "ipV4",
                    "Netmask": "255.255.0.0",
                    "Mac": [
                        "6C:92:BF:FF:BD:6A",
                        "6C:92:BF:FF:BD:6B"
                    ],
                    "VlanId": "3214",
                    "WorkMode": "bond6",
                    "eipAddress": "60.165.239.111",
                    "eipLinkType": "电信"
                }
            ]
        },
        "Ram": 64,
        "RegionName": "中国大陆-庆阳-可用区A",
        "RunningTime": "0天7小时18分钟55秒",
        "State": "rebuilding",
        "Status": "重装中",
        "Volumes": [
            {
                "Capacity": 480,
                "Id": "a5f18fb1-f4a4-4e8c-973f-865ee8662b0c",
                "Type": "hard",
                "VolumeId": "454a1d9d-25c3-48cc-8787-404447e81f49",
                "VolumePath": "sda",
                "VolumeType": "SSD"
            }
        ]
    }
}
```

**代码调用示例**

```python
def describe_gpu_detail(id):
   action = "DescribeGpuDetail"
   method = "GET"
   param = {
       "ResourceId": id
   }
   url = get_signature(action, AK, AccessKeySecret, method, GPU_URL, param)
   res = requests.get(url)
   result = json.loads(res.content)
```

### 6. DescribeGpuTask

**Action: DescribeGpuTask**

**描述:** 查询创建GPU服务器服务器任务状态

**请求地址:** api.capitalonline.net/gpubms/v1

**请求方法:** GET

**请求参数：**

| 名称     | 类型     | 是否必须 | 示例                                   | 描述                   |
| ------ | ------ | ---- | ------------------------------------ | -------------------- |
| TaskId | string | 是    | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 创建GPU服务器服务器返回的TaskId |

**返回数据：**

| 名称          | 类型     | 示例                                       | 描述                                      |
| ----------- | ------ | ---------------------------------------- | --------------------------------------- |
| Code        | string | Success                                  | 错误码                                     |
| Message     | string | Success                                  | 提示信息                                    |
| Data        | object | {}                                       | 返回数据                                    |
| ResourceIds | list   | ["27f262ec-92fd-4a77-ba78-6f682b7533e3"] | GPU服务器服务器的编号id                          |
| Status      | string | succeed / init                           | 任务状态: succeed（完成）, init(进行中)，failed(失败) |

**返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
    "ResourceIds":["27f262ec-92fd-4a77-ba78-6f682b7533e3"],
    "Status":"succeed"
  }
}
```

**代码调用示例**

```python
def describe_gpu_task(TaskId):
   action = "DescribeGpuTask"
   method = "GET"
   param = {
       "TaskId": TaskId
   }
   url = get_signature(action, AK, AccessKeySecret, method, GPU_URL, param)
   res = requests.get(url)
   result = json.loads(res.content)
```

### 7. ReinstallGpu

**Action: ReinstallGpu**

**描述**: GPU服务器服务器系统重装

**请求地址**: api.capitalonline.net/gpubms/v1

**请求方法**: POST

**请求参数**:

| 名称                  | 类型     | 是否必选 | 示例值                                  | 描述                                           |
| ------------------- | ------ | ---- | ------------------------------------ | -------------------------------------------- |
| ResourceId          | string | 是    | d226f190-f942-4257-8f3e-9cce8dfc0f2b | GPU服务器ID                                     |
| ImageId             | string | 是    | d6012cd8-b672-11e9-9265-525400b97470 | 镜像ID (参考DescribeGpuImage返回Id)                |
| Password            | string | 是    | capitalonline                        | 密码                                           |
| Raid                | int    | 否    | 1                                    | 数据盘自定义Raid,支持 0, 1, 5, 10, -1（直通）,-2（不做raid） |
| CustomPartition     | list   | 否    | ["/","swap", "/aaa"]                 | 系统盘自定义分区，第一个必须是"/" 分区，swap分区可选，/aaa分区为自定义    |
| CustomPartitionSize | list   | 否    | [100, 128, 300 ]                     | 系统盘自定义分区大小，单位GB，与自定义分区列表中对应分区的大小             |

**返回参数**

| 名称      | 类型     | 示例值                                      | 描述    |
| ------- | ------ | ---------------------------------------- | ----- |
| Code    | string | Success                                  | 返回状态码 |
| Message | string | Success                                  | 提示信息  |
| Data    | object | {}                                       | 返回数据  |
| TaskIds | list   | ["72dc0cae-a867-11e9-8184-0242ac110003"] | 任务ID  |

**返回示例**

```json
{
    "Code": "Success",
    "Message": "Success.",
    "Data": {
        "TaskIds": [
            "97fe8058-8524-11ea-80e3-0242ac110003"
        ]
    }
}
```

**代码调用示例**

```python
def operat_gpu_reinstall(id, image_id, passwd):    
   action = "ReinstallGpu"
   method = "POST"
   param = {
       "ResourceId": id,
       "ImageId": image_id,
       "Password": passwd
   }
   url = get_signature(action, AK, AccessKeySecret, method, GPU_URL)
   res = requests.post(url, json=param)
   result = json.loads(res.content)
```

### 8.DescribeGpuImage

**Action: DescribeGpuImage**

**描述:** 查询GPU服务器镜像列表

**请求地址:** api.capitalonline.net/gpubms/v1

**请求方法:** POST

**请求参数：**

| 名称        | 类型     | 是否必须 | 示例                                   | 描述                                                  |
| --------- | ------ | ---- | ------------------------------------ | --------------------------------------------------- |
| ImageType | string | 是    | private                              | 镜像类型: public:公有镜像,private:私有镜像                      |
| RegionId  | string | 是    | CN_Hohhot_B                          | 站点编号                                                |
| OsType    | string | 否    | centos                               | 操作系统类型: centos,ubuntu等                              |
| ComputeId | string | 否    | f7d3b7b4-e77d-47ac-aa37-8c9e3304e469 | 规格配置ID（可参考DescribeGpuGoods返回ComputeIds中id），公有镜像必须指定 |

**返回数据：**

| 名称      | 类型     | 示例                                   | 描述                             |
| ------- | ------ | ------------------------------------ | ------------------------------ |
| Code    | string | Success                              | 返回状态码: Success: 成功             |
| Message | string | null                                 | 返回信息                           |
| Data    | object | {}                                   | 返回数据                           |
| Id      | string | d32af696-5774-4936-8f09-e9f4cf069b31 | 镜像ID                           |
| Name    | string | ubuntu14.04_64                       | 镜像名称                           |
| Type    | string | public                               | 镜像类型: public:公有镜像,private:私有镜像 |



**返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
    "Ubuntu": [
      {
        "Id": "d32af696-5774-4936-8f09-e9f4cf069b31",
        "Name": "ubuntu14.04_64",
        "Type": "public"
      }
    ],
    "Redhat": [
      {
        "Id": "232af696-5774-4936-8f09-e9f4cf069b31",
        "Name": "rhel7.6_64",
        "Type": "public"
      }
    ]
}
```

**代码调用示例**

```python
def describe_gpu_images():
    action = "DescribeGpuImage"
    method = "POST"
    param = {
        "ImageType": "public",
        "RegionId": "CN_SJZ_B",
        'ComputeId': "219a3445-bb9c-4ae9-b50d-3f83c416c626"
    }
    url = get_signature(action, AK, AccessKeySecret, method, GPU_URL)
    res = requests.post(url, json=param)
    result = json.loads(res.content)
```

### 9.CreateGpuInstance

**Action: CreateGpuInstance**

**描述:** 创建GPU服务器服务器

**请求地址:** api.capitalonline.net/gpubms/v1

**请求方法:** POST

**请求参数：**

| 名称                  | 类型     | 是否必须 | 示例                                                                                                                                                                                                                                                           | 描述                                                                                                                                                                                                                                                                                       |
| ------------------- |--------|------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| RegionId            | string | 是    | CN_Hohhot_B                                                                                                                                                                                                                                                  | 站点编号                                                                                                                                                                                                                                                                                     |
| VpcNetWork          | json   | 是    | {"VpcId":"f91084b4-050d-11ef-b98e-4637f0e9cd45","ReserveEip":true,"NetId":"f9129e16-050d-11ef-b98e-4637f0e9cd45","EipIdList":["8e2330bc-fbc5-11ee-a916-8a891739d466"],"Segments":[{"SegmentId":"f912d2aa-050d-11ef-b98e-4637f0e9cd45","Address":"10.15.0.5"}]} | VPC网络信息。<br/>VpcId为vpc网络编号id(可参考私有网络相关DescribeVPC获取返回VpcId)。<br/>ReserveEip 为是否预留eip，默认为false。<br/>NetId 为子网ID(可参考私有网络相关DescribeSubnet返回SubnetId)。EipIdList为eip的id列表，ReserveEip为ture时生效，如需指定eip地址时填入，需等于创建机器数量，当该值默认为空时自动分配。<br/>Segments为指定私网ip与segmentId，数量需等于机器数量。<br />当Segments为空时，默认为自动分配。 |
| Password            | string | 是    | MengYou&&Cds-2019                                                                                                                                                                                                                                            | 密码                                                                                                                                                                                                                                                                                       |
| InstanceName        | string | 是    | shouduzaixbms                                                                                                                                                                                                                                                | 主机名称                                                                                                                                                                                                                                                                                     |
| AssignHostNo        | string | 否    | 001                                                                                                                                                                                                                                                          | 主机编号，编号至少三位，不足三位自动补全                                                                                                                                                                                                                                                                     |
| InstanceChargeType  | string | 是    | PostPaid                                                                                                                                                                                                                                                     | 付费方式，取值范围： PrePaid：预付费，包年包月, PostPaid：按需计费                                                                                                                                                                                                                                               |
| AutoRenew           | int    | 否    | 1                                                                                                                                                                                                                                                            | 包年包月是否自动续费，1为自动续费（默认），0为不自动续费                                                                                                                                                                                                                                                            |
| PrepaidMonth        | int    | 否    | 1                                                                                                                                                                                                                                                            | 包年包月云主机购买月数，输入0为购买到月底，输入1为购买一个自然月，默认为0。最长36月                                                                                                                                                                                                                                             |
| ComputeId           | string | 是    | f7d3b7b4-e77d-47ac-aa37-8c9e3304e469                                                                                                                                                                                                                         | 规格配置（可参考DescribeGpuGoods返回ComputeIds中id）ID                                                                                                                                                                                                                                               |
| GoodsId             | int    | 是    | 7955                                                                                                                                                                                                                                                         | 商品（可参考DescribeGpuGoods返回GoodsId）ID                                                                                                                                                                                                                                                       |
| ImageId             | string | 是    | d6012cd8-b672-11e9-9265-525400b97470                                                                                                                                                                                                                         | 镜像ID (参考DescribeGpuImage返回Id)                                                                                                                                                                                                                                                            |
| BondMode            | string | 否    | noBond,bond1,bond6                                                                                                                                                                                                                                           | 默认noBond。目前已支持bond1,bond6                                                                                                                                                                                                                                                                |
| Raid                | int    | 否    | 0                                                                                                                                                                                                                                                            | 数据盘自定义Raid,支持 0, 1, 5, 10, -1（直通）,-2（不做raid）                                                                                                                                                                                                                                   |
| Amount              | int    | 是    | 10                                                                                                                                                                                                                                                           | 指定创建GPU服务器服务器的数量，取值范围：1-100                                                                                                                                                                                                                                                              |
| CustomPartition     | list   | 否    | ["/","swap", "/aaa"]                                                                                                                                                                                                                                         | 系统盘自定义分区，第一个必须是"/" 分区，swap分区可选，/aaa分区为自定义                                                                                                                                                                                                                                                |
| CustomPartitionSize | list   | 否    | [100, 128, 300 ]                                                                                                                                                                                                                                             | 系统盘自定义分区大小，单位GB，与自定义分区列表中对应分区的大小                                                                                                                                                                                                                                                         |
| SubjectId           | string | 否    | 68327                                                                                                                                                                                                                                                        | 测试金ID                                                                                                                                                                                                                                                                                    |
| PortMode            | string | 否    | trunk,access                                                                                                                                                                                                                                                 | 交换机端口模式， 注：access模式的一个端口只能对应一个网络，IP绑定在物理网卡上；trunk模式的一个端口可以对应多个网络，IP绑定在虚拟网卡上                                                                                                                                                                                                              |

**返回数据：**

| 名称      | 类型     | 示例                                     | 描述                 |
| ------- | ------ | -------------------------------------- | ------------------ |
| Code    | string | Success                                | 返回状态码: Success: 成功 |
| Message | string | 订单创建成功，任务已下发，请等待......                 | 返回信息               |
| Data    | object | {}                                     | 返回数据               |
| taskId  | string | "f232d398-a77c-11e9-9d43-0242ac110003" | 返回主任务Id            |

返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
      "taskId": "f232d398-a77c-11e9-9d43-0242ac110003"
  }
}
```

**代码调用示例**

```python
def create_gpu_instance():
   action = "CreateGpuInstance"
   method = "POST"
   param = {
       "RegionId": "CN_SJZ_B",
       "InstanceName": "shouduzaixbms",
       "Password": "Tester@123",
       "InstanceChargeType": "PrePaid",
       "AutoRenew": 1,
       "PrepaidMonth": 1,
       "ComputeId": "228c20b9-e27e-4bee-bea2-d7c2985a2f3d",
       "GoodsId": 8520,
       "ImageId": "bd597daa-2157-4a6f-8e29-8c212eb86tes",
       "Amount": 1,
       "VpcNetWork": {
           "VpcId": "b2ca7892-a329-11ef-943a-66fdd349a9b1",
           "NetId": "b2cc9168-a329-11ef-943a-66fdd349a9b1"
       }
   }
   url = get_signature(action, AK, AccessKeySecret, method, GPU_URL)
   res = requests.post(url, json=param)
   result = json.loads(res.content)
   print(result)
```

### 10.OperateGpuPower

**Action: OperateGpuPower**

**描述**: GPU服务器的电源操作（开机、关机、重启）

**请求地址**: api.capitalonline.net/gpubms/v1

**请求方法**: POST

**请求参数**:

| 名称          | 类型     | 是否必选 | 示例值                                      | 描述                                                     |
| ----------- | ------ | ---- | ---------------------------------------- | ------------------------------------------------------ |
| Operate     | string | 是    | start                                    | 操作电源的状态<br/> start:  开启 <br/>stop:  关闭<br/> reset:  重启 |
| ResourceIds | list   | 是    | ["2df3f6b4-26ed-4c93-943d-a81a39ced124"] | GPU服务器资源ID列表                                           |

**返回参数**:

| Code        | string | Success                                  | 返回状态码                        |
| ----------- | ------ | ---------------------------------------- | ---------------------------- |
| Message     | string | 操作下发成功                                   | 提示信息                         |
| Data        | object | {}                                       | 返回数据                         |
| TaskId      | list   | ["72dc0cae-a867-11e9-8184-0242ac110003"] | 任务编号列表，与GPU服务器资源ID列表按照下标一一对应 |
| ResourceIds | list   | ["d226f190-f942-4257-8f3e-9cce8dfc0f2b"] | GPU服务器资源ID列表                 |

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "操作下发成功",
    "Data": {
        "ResourceIds": [
            "2df3f6b4-26ed-4c93-943d-a81a39ced124"
        ],
        "TaskIds": [
            "72dc0cae-a867-11e9-8184-0242ac110003"
        ]
    }
}
```

**代码调用示例**

```python
def operat_gpu_power():
   action = "OperateGpuPower"
   method = "POST"
   param ={
      "Operate":"start",  
      "ResourceIds": ["46814cbf-2797-4e80-b54e-a9ea3d659511"]
   }
   url = get_signature(action, AK, AccessKeySecret, method, GPU_URL)
   res = requests.post(url, json=param)
   result = json.loads(res.content)
```

### 11.DeleteGpuInstances

**Action: DeleteGpuInstances**

**描述**: 删除gpu服务器

**请求地址**: api.capitalonline.net/gpubms/v1

**请求方法**: POST

**请求参数**:

| 名称          | 类型   | 是否必须 | 示例                                       | 描述           |
| ----------- | ---- | ---- | ---------------------------------------- | ------------ |
| ResourceIds | List | 是    | ["00ccb28c-da75-48a0-9a02-1c43c7403de5"] | GPU服务器资源ID列表 |

**返回参数**

| 名称      | 类型     | 示例      | 描述                 |
| ------- | ------ | ------- | ------------------ |
| Code    | string | Success | 返回状态码: Success: 成功 |
| Message | string | 任务下发成功! | 返回信息               |
| Data    | object | {}      | 返回数据               |

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "任务下发成功!",
    "Data":{}
}
```

**代码调用示例**

```python
def delete_gpu_instance(ResourceIds):
    action = "DeleteGpuInstances"
    method = "POST"
    param = {
        "ResourceIds": ResourceIds
    }
    url = get_signature(action, AK, AccessKeySecret, method, GPU_URL)
    res = requests.post(url, json=param)
    result = json.loads(res.content)
```
