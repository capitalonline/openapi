[TOC]



# 首云公开API文档

## 认证方式

### 1.公共请求参数

| 名称             | String | 是否必填 | 描述                                                         |
| ---------------- | ------ | -------- | ------------------------------------------------------------ |
| Action           | String | 是       | API 的动作名称                                               |
| AccessKeyId      | String | 是       | 访问密钥 ID（位于用户中心-->用户安全-->密钥管理）            |
| Signature        | String | 是       | 您的签名                                                     |
| SignatureMethod  | String | 是       | 签名方式。取值范围：HMAC-SHA1。                              |
| SignatureVersion | String | 是       | 签名算法版本。取值范围：1.0。                                |
| SignatureNonce   | String | 是       | 签名唯一随机数。用于防止网络重放攻击，建议您每一次请求都使用不同的随机数。 |
| Timestamp        | String | 是       | 请求的时间戳。按照标准表示，并需要使用UTC时间，格式为yyyy-MM-ddTHH:mm:ssZ。示例：`2018-01-01T12:00:00Z` 表示北京时间 2018 年 01 月 01 日 20 点 00 分 00 秒。 |
| Version          | String | 是       | API 的版本号，格式为 YYYY-MM-DD。取值范围：2019-08-08。      |

### 2.签名机制

#### 步骤一：构造规范化请求字符串

1. 排序参数。排序规则以首字母顺序排序，排序参数包括公共请求参数和接口自定义参数，不包括公共请求参数中的Signature参数。

   **注意:** 当使用GET方法提交请求时，这些参数就是请求URL中的参数部分，即URL中`?`之后由`&`连接的部分。

2. 编码参数。使用UTF-8字符集按照RFC3986规则编码请求参数和参数取值，编码规则如下：

   - 字符A~Z、a~z、0~9以及字符`-`、`_`、`.`、`~`不编码。

   - 其它字符编码成`%XY`的格式，其中`XY`是字符对应ASCII码的16进制。示例：半角双引号（`"`）对应`%22`。

   - 扩展的UTF-8字符，编码成`%XY%ZA…`的格式。

   - 空格（ ）编码成%20，而不是加号（+）。

     该编码方式与`application/x-www-form-urlencoded`MIME格式编码算法相似，但又有所不同。

     将编码后的字符中加号（`+`）替换为`%20`、星号（`*`）替换为`%2A`、`%7E`替换为波浪号（`~`），即可得到上述规则描述的编码字符串。

3. 使用等号（`=`）连接编码后的请求参数和参数取值。

4. 使用与号（`&`）连接编码后的请求参数，注意参数排序与[步骤1]一致。

#### 步骤二：构造签名字符串

1. 构造待签名字符串StringToSign。您可以同样使用percentEncode处理上一步构造的规范化请求字符串，规则如下：

   ```python
       canstring = ''
     for k, v in sortedD:
         canstring += '&' + percentEncode(k) + '=' + percentEncode(v)
     stringToSign = method + '&%2F&' + percentEncode(canstring[1:])
   ```

2. 按照RFC2104的定义，计算待签名字符串StringToSign的HMAC-SHA1值。示例使用的是Java Base64编码方法。

   ```python
       h = hmac.new(access_key_secret, stringToSign, sha1)
       signature = base64.encodestring(h.digest()).strip()
   ```

   **说明** 计算签名时，RFC2104规定的Key值是您的`AccessKeySecret`并加上与号（`&`)，其ASCII值为38。

### 3.获取签名代码

```python
def percentEncode(str):
   """将特殊转义字符替换"""
    res = urllib.parse.quote(str.decode(sys.stdin.encoding).encode('utf8'), '') 
    res = res.replace('+', '%20')
    res = res.replace('*', '%2A')
    res = res.replace('%7E', '~')
    return res

def get_signature(action, ak, access_key_secret, method, url, param={}):
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
        canstring += '&' + percentEncode(k) + '=' + percentEncode(v)
    stringToSign = method + '&%2F&' + percentEncode(canstring[1:])
    h = hmac.new(access_key_secret, stringToSign, sha1)
    signature = base64.encodestring(h.digest()).strip()
    D['Signature'] = signature
    url = url + '/?' + urllib.parse.urlencode(D)
    return url
```

## 访问地址


| 地区     | 访问地址                      |
| -------- | ----------------------------- |
| 中国大陆 | cdsapi.capitalonline.net      |
| 亚太地区 | cdsapi-asia.capitalonline.net |
| 欧美地区 | cdsapi-us.capitalonline.net   |

## 弹性云服务器ECS/GPU云主机相关

**云服务器ECS状态(Status)说明**

| code             | 说明       |
| ---------------- | ---------- |
| building         | 创建中     |
| running          | 运行中     |
| restarting       | 重启中     |
| shutting_down    | 关机中     |
| shutdown         | 已关机     |
| starting_up      | 开机中     |
| deleting         | 删除中     |
| deleted          | 已删除     |
| destroying       | 销毁中     |
| destroy          | 已销毁     |
| recovering       | 恢复中     |
| updating         | 更新中     |
| error            | 错误       |
| failed           | 创建失败   |
| recycling        | 回收中     |
| cancel_recycling | 取消回收中 |
| creating_image   | 定制镜像中 |

### 1.DescribeRegions

**Action**: DescribeRegions

**描述**：获取弹性云服务器ECS可售的地域可用区信息

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**:  GET

**返回参数**：

| 名称              | 类型   | 示例值                               | 描述               |
| ----------------- | ------ | ------------------------------------ | ------------------ |
| CodeMsg           | string | success                              | 返回码对应基础信息 |
| Message           | string | 获取地域可用区信息成功               | 返回详细描述信息   |
| RequestId         | string | b9bb7e27c75656112db63b8213672843     | 请求标识uuid       |
| RegionGroupName   | string | 中国                                 | 大区名称           |
| RegionList        | list   | []                                   | 地域列表           |
| RegionId          | string | 39c6ed64-8d5f-11ec-9247-5293695d0ddd | 地域id             |
| RegionCode        | string | CN_Huhhot                            | 地域code           |
| RegionName        | string | 呼和浩特                             | 地域名称           |
| AzId              | string | f7c3c7a6-8d5f-11ec-9311-5293695d0ddd | 可用区id           |
| AvailableZoneCode | string | CN_Hohhot_B                          | 可用区code         |
| AzName            | string | 呼和浩特B                            | 可用区名称         |

**请求示例**

```python
def region_az_info():
    """
    获取地区可用区信息
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "DescribeRegions"
    method = "GET"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "获取地域可用区信息成功！",
    "Data": [
        {
            "RegionGroupId": "408fd19e-fa78-11e6-bd9a-30b49e091019",
            "RegionGroupName": "中国",
            "RegionList": [
                {
                    "RegionId": "cdc9be22-a6f8-11eb-be28-ca1003d55bcc",
                    "RegionName": "呼和浩特",
                    "AzList": [
                        {
                            "AzId": "e5aa47be-da46-11ec-bad2-defff767b3b5",
                            "AzName": "呼和浩特B",
                            "AvailableZoneCode": "CN_Hohhot_B"
                        }
                    ],
                    "RegionCode": "CN_Huhhot"
                },
                {
                    "RegionId": "bd477d6e-7f42-11ec-9e90-36a0465df1a6",
                    "RegionName": "东莞",
                    "AzList": [
                        {
                            "AzId": "ab806602-7f44-11ec-a36f-325a386f61c1",
                            "AzName": "东莞A",
                            "AvailableZoneCode": "CN_Dongguan_A"
                        }
                    ],
                    "RegionCode": "CN_Dongguan"
                },
                {
                    "RegionId": "39c6ed64-8d5f-11ec-9247-5293695d0ddd",
                    "RegionName": "宿迁",
                    "AzList": [
                        {
                            "AzId": "f7c3c7a6-8d5f-11ec-9311-5293695d0ddd",
                            "AzName": "宿迁A",
                            "AvailableZoneCode": "CN_Suqian_A"
                        },
                        {
                            "AzId": "09a38804-c1ee-11ec-bd22-4641dfd57315",
                            "AzName": "宿迁B",
                            "AvailableZoneCode": "CN_Suqian_B"
                        }
                    ],
                    "RegionCode": "CN_Suqian"
                }
            ]
        }
    ],
    "RequestId": "8749860c118311ed843bc2b5d7e451cd"
}
```

### 2.DescribeEcsFamilyInfo

**Action**: DescribeEcsFamilyInfo

**描述**：获取弹性云服务器ECS计算类型规格信息

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：GET

**请求参数**

| 参数              | 要求 | 类型   | 说明                                                         |
| ----------------- | ---- | ------ | ------------------------------------------------------------ |
| AvailableZoneCode | 必选 | string | 可用区code(可取**附件五**中私有网络可用区名称或者**DescribeRegions**返回值) |
| BillingMethod     | 必选 | string | 计费方式 : "0"：按需计费; "1"：包年包月; "3": 竞价实例                      |

**返回参数**

| 参数             | 类型   | 示例            | 说明               |
| ---------------- | ------ | --------------- | ------------------ |
| EcsFamilyInfo    | dict   | {}              | 计算类型族信息字典 |
| EcsFamilyName    | string | 极速渲染型re3   | 规格族名称         |
| SpecList         | list   | []              | 规格列表           |
| Cpu              | int    | 16              | Cpu大小            |
| Ram              | int    | 32              | 内存大小           |
| Gpu              | int    | 1               | 显卡数量           |
| GpuShowType      | string | NVIDIA RTX 3090 | 显卡型号           |
| SupportGpuDriver | string | Geforce         | 显卡驱动类型       |

**请求示例**

```python
def ecs_family_info():
    """
    获取计算类型族
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "DescribeEcsFamilyInfo"
    method = "GET"
    param = {
        "AvailableZoneCode": "CN_Hohhot_B",
        "BillingMethod": "0"
    }

    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "获取云服务器类型成功！",
    "Data": {
        "EcsFamilyInfo": [
            {
                "EcsFamilyName": "Cpu计算型C4",
                "SpecList": [
                    {
                        "GpuShowType": "",
                        "GpuTypeId": "",
                        "Cpu": 2,
                        "Ram": 4,
                        "Gpu": 0,
                        "SupportGpuDriver": ""
                    },
                    {
                        "GpuShowType": "",
                        "GpuTypeId": "",
                        "Cpu": 4,
                        "Ram": 8,
                        "Gpu": 0,
                        "SupportGpuDriver": ""
                    }
                ]
            },
            {
                "EcsFamilyName": "Cpu计算型C3",
                "SpecList": [
                    {
                        "GpuShowType": "",
                        "GpuTypeId": "",
                        "Cpu": 4,
                        "Ram": 8,
                        "Gpu": 0,
                        "SupportGpuDriver": ""
                    }
                ]
            },
            {
                "EcsFamilyName": "Cpu密集计算型I3",
                "SpecList": [
                    {
                        "GpuShowType": "",
                        "GpuTypeId": "",
                        "Cpu": 4,
                        "Ram": 4,
                        "Gpu": 0,
                        "SupportGpuDriver": ""
                    }
                ]
            },
            {
                "EcsFamilyName": "专业渲染型rp3",
                "SpecList": [
                    {
                        "GpuShowType": "NVIDIA RTX A5000",
                        "GpuTypeId": "6d103608-79ba-11ec-b4f5-0456e530f43e",
                        "Cpu": 16,
                        "Ram": 32,
                        "Gpu": 1,
                        "SupportGpuDriver": "Datacenter"
                    },
                    {
                        "GpuShowType": "NVIDIA RTX A5000",
                        "GpuTypeId": "6d103608-79ba-11ec-b4f5-0456e530f43e",
                        "Cpu": 32,
                        "Ram": 64,
                        "Gpu": 2,
                        "SupportGpuDriver": "Datacenter"
                    }
                ]
            },
            {
                "EcsFamilyName": "专业渲染型rp2",
                "SpecList": [
                    {
                        "GpuShowType": "NVIDIA RTX A5000",
                        "GpuTypeId": "6d103608-79ba-11ec-b4f5-0456e530f43e",
                        "Cpu": 16,
                        "Ram": 32,
                        "Gpu": 1,
                        "SupportGpuDriver": "Datacenter"
                    },
                    {
                        "GpuShowType": "NVIDIA RTX A5000",
                        "GpuTypeId": "6d103608-79ba-11ec-b4f5-0456e530f43e",
                        "Cpu": 32,
                        "Ram": 64,
                        "Gpu": 2,
                        "SupportGpuDriver": "Datacenter"
                    }
                ]
            }
        ]
    },
    "RequestId": "f73056a01050e1626a1a9f5b5ae6143d"
}
```

### 3.DescribeImages

**Action**: DescribeImages

**描述**：获取镜像信息

**请求地址**：api.capitalonline.net/ecs/v1.1

**请求方法**：POST GET

**请求参数**

| 参数              | 要求 | 类型   | 说明                                                         |
| ----------------- | ---- | ------ | ------------------------------------------------------------ |
| AvailableZoneCode | 可选 | string | 可用区code(可取**附件五**中私有网络可用区名称或者**DescribeRegions**返回值) |
| ImageIds          | 可选 | string | 镜像id列表(格式为字符串，例如: '["img-xx", "img-xx"]' )      |

**返回参数**

| 参数              | 类型   | 示例                                               | 说明                                     |
| ----------------- | ------ | -------------------------------------------------- | ---------------------------------------- |
| PageNumber        | int    | 1                                                  | 当前页数                                 |
| PageSize          | int    | 1                                                  | 每页数据条数                             |
| TotalCount        | int    | 10                                                 | 总记录数                                 |
| ImageList         | list   | []                                                 | 镜像列表                                 |
| TemplateType      | string | public                                             | 公共镜像为public，私有镜像为private      |
| ImageId           | string | img-46faai4r9rnbu639                               | 镜像id                                   |
| ImageName         | string | gpu-private-Ubuntu-20.04-E104616-Geforce-V20220830 | 镜像名称                                 |
| Status            | string | running                                            | 镜像状态code                             |
| OsType            | string | Ubuntu                                             | 镜像类型                                 |
| OsBit             | int    | 64                                                 | 系统位数                                 |
| StatusDisplay     | string | 可用                                               | 镜像状态中文                             |
| AvailableZoneCode | string | CN_Dongguan_A                                      | 可用区code                               |
| CreateTime        | string | 2022-08-30 12:30:48                                | 创建时间                                 |
| OsSize            | int    | 40                                                 | 镜像容量(GB)                             |
| IsOptimized       | int    | 1                                                  | 镜像是否开启优化选项，1为开启，0为不开启 |

**请求示例**

```python
def image_info():
    """
    获取镜像信息
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1.1'
    action = "DescribeImages"
    method = "POST"
    body = {
        "AvailableZoneCode": ""
    }
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "获取镜像信息成功！",
    "Data": {
        "ImageList": [
            {
                "TemplateType": "public",
                "ImageId": "667a49df-20ff-4569-9cdc-35180b28d16f",
                "ImageName": "Ubuntu 20.04 64位",
                "Status": "running",
                "OsType": "Ubuntu",
                "OsBit": 64,
                "StatusDisplay": "可用",
                "AzId": "16e6e380-729d-11ec-b62a-1e00e202ff80",
                "AzName": "大别山A",
                "SupportGpuDriver": "Datacenter",
                "Username": "root",
                "SupportType": [
                    "gpu"
                ],
                "OsVersion": "20.04",
                "CreateTime": "2022-01-24 17:46:17",
                "OsSize": 24,
                "AvailableZoneCode": "CN_DaBieShan_A",
                "IsOptimized": 1
            }
        ]
    },
    "RequestId": "13c88ede54e011edb7f6c2b5d7e451cd",
    "PageNumber": 1,
    "PageSize": 71,
    "TotalCount": 71
}
```

### 4.DescribeInstanceList

**Action**: DescribeInstanceList

**描述**: 获取云服务器列表

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：GET

**请求参数**

| 参数              | 要求 | 类型   | 说明                                         |
| ----------------- | ---- | ------ | -------------------------------------------- |
| AvailableZoneCode | 可选 | string | 可用区code                                   |
| VpcId             | 可选 | string | vpc id                                       |
| SearchInfo        | 可选 | string | 搜索信息（可传实例id或者实例名称或者私网ip） |
| PageNumber        | 可选 | int    | 当前页数（分页参数不传返回所有数据）         |
| PageSize          | 可选 | int    | 每页数据条数（分页参数不传返回所有数据）     |

**返回参数**

| 参数                | 类型     | 示例                | 说明                               |
| ------------------- | -------- | ------------------- | ---------------------------------- |
| PageNumber          | int      | 1                   | 当前页数                           |
| PageSize            | int      | 1                   | 每页数据条数                       |
| TotalCount          | int      | 10                  | 总记录数                           |
| EcsList             | list     | []                  | 云服务器列表                       |
| Status              | string   | shutdown            | 云服务器状态码                     |
| StatusDisplay       | string   | 已关机              | 云服务器状态                       |
| PrivateNet          | string   | 10.10.10.10         | 私网ip                             |
| PubNet              | string   | 10.10.10.11         | 默认虚拟出网网关ip                 |
| VirtualNet          | list     | []                  | 其他线路出网网关ip列表             |
| EipInfo             | dict     | {}                  | 出网网关ip和公网ip对应字典         |
| ConfName            | string   | 电信                | 网络带宽运营商，如电信、移动、联通 |
| EipIp               | string   | 111.111.111.111     | 公网ip                             |
| CreateTime          | datetime | 2022-07-22 16:41:28 | 创建时间                           |
| EcsFamilyName       | string   | 专业渲染型rp3       | 规格族名称                         |
| CpuSize             | int      | 16                  | Cpu大小                            |
| RamSize             | int      | 32                  | 内存大小                           |
| IsGpu               | bool     | true                | 是否是gpu类型                      |
| GpuSize             | int      | 1                   | 显卡数量                           |
| CardName            | string   | NVIDIA RTX A5000    | 显卡型号                           |
| BillingMethodName   | string   | 包年包月            | 计费方式名称                       |
| EndBillTime         | datetime | 2022-08-22 16:41:28 | 到期时间                           |
| IsAutoRenewal       | string   | 0                   | 到期是否自动续约                   |
| ImageName           | string   | Centos 7.4 64位     | 镜像名称                           |
| SystemDiskType      | string   | SSD云盘             | 系统盘类型                         |
| SystemDiskSize      | int      | 24                  | 系统盘大小                         |
| NoChargeForShutdown | int      | 0                   | 是否关机不计费       1:是， 0：否  |

**请求示例**

```python
def ecs_list():
    """
    获取云服务器列表
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "DescribeInstanceList"
    method = "GET"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "code": "Success",
    "CodeMsg": "success",
    "Message": "获取云服务器列表成功！",
    "Data": {
        "EcsList": [
            {
                "EcsId": "ins-tevgfaaronl12h11",
                "EcsName": "openAPI-MPUB--101",
                "VpcId": "9a25d704-fe63-11ec-a994-2e3db9adf607",
                "VpcName": "呼和浩特B-VPC",
                "Status": "running",
                "StatusDisplay": "运行中",
                "AzId": "e5aa47be-da46-11ec-bad2-defff767b3b5",
                "AzName": "呼和浩特B",
                "RegionId": "cdc9be22-a6f8-11eb-be28-ca1003d55bcc",
                "RegionName": "呼和浩特",
                "PrivateNet": "10.15.100.147",
                "PubNet": "10.15.1.40",
                "VirtualNet": [],
                "EipInfo": {
                    "10.15.100.147": {
                        "ConfName": "",
                        "EipIp": ""
                    },
                    "10.15.1.40": {
                        "ConfName": "移动",
                        "EipIp": "117.161.233.90"
                    }
                },
                "CreateTime": "2022-07-31 14:14:59",
                "EndBillTime": "2099-01-01 00:00:00",
                "IsAutoRenewal": "1",
                "IsGpu": false,
                "CardName": "",
                "CpuSize": 4,
                "RamSize": 4,
                "GpuSize": 0,
                "BillingMethodName": "按需计费",
                "BillingMethod": "0",
                "OsType": "Centos",
                "OsVersion": "7.4",
                "ImageName": "Centos 7.4 64位",
                "OsBit": 64,
                "CustomerId": "E104616",
                "SystemDiskType": "本地盘",
                "SystemDiskFeature": "local",
                "SystemDiskSize": 50,
                "SupportGpuDriver": "",
                "SpecFamilyId": "bd1a7a0a-f29f-11ec-a66c-7a4c8683bd6c",
                "EcsFamilyName": "CPU密集计算型I3",
                "NoChargeForShutdown": 0
            }
        ]
    },
    "PageNumber": 1,
    "PageSize": 1,
    "TotalCount": 6,
    "RequestId": "0343bc60-e876-11eb-aa87-30c9ab46699c"

}
```

### 5.DescribePrice

**Action**: DescribePrice

**描述**：获取云服务器价格

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：POST

**请求参数**

| 参数              | 要求 | 类型   | 说明                                                         |
| ----------------- | ---- | ------ | ------------------------------------------------------------ |
| AvailableZoneCode | 必选 | string | 可用区code(可取**附件五**中私有网络可用区名称或者**DescribeRegions**返回值) |
| EcsFamilyName     | 可选 | string | 云服务器规格族名称,例：Ram渲染型GN6-01                       |
| Cpu               | 必选 | int    | Cpu大小（参数值必须为DescribeEcsFamilyInfo返回值中对应的规格大小） |
| Ram               | 必选 | int    | 内存大小（参数值必须为DescribeEcsFamilyInfo返回值中对应的规格大小） |
| Gpu               | 可选 | int    | 显卡数量（参数值必须为DescribeEcsFamilyInfo返回值中对应的规格大小） |
| BillingMethod     | 必选 | string | 计费方式："0": 按需  "1":包月  "3"竞价                              |
| Duration          | 可选 | int    | 默认为1，只在包月算价时有意义，单位为月，小于12时按月计费；大于等于12时按年计费，且输入值必须为12的整数倍 |
| IsToMonth         | 可选 | int    | 包月是否到月底 1:是  0:否 默认为1。如2022-07-22购买，传值为1，则到期时间为2022-08-01；值为0，则到期时间为2022-08-22 |
| SystemDiskInfo    | 必选 | dict   | 系统盘信息{"DiskFeature":"ssd","Size":40}                    |
| DiskFeature       | 必选 | string | 盘类型,如："ssd","local"                                     |
| DataDiskInfo      | 可选 | list   | 数据盘信息[{"DiskFeature":"ssd","Size":40}]                  |
| Number            | 可选 | int    | 购买数量，默认为1                                            |

**返回参数**

|    参数     |  类型  |  示例  |     说明      |
| :---------: | :----: | :----: | :-----------: |
|  PriceUnit  | string |   天   | 价格时间单位  |
| PriceSymbol | string |   ￥   |   币种符号    |
| TotalPrice  | float  | 100.34 | 总价,单位为元 |
| SpotStdAmount  | float  | 100.34 | 竞价实例标准价格（最低出价）,单位为元 |
| DemandStdAmount  | float  | 200.34 | 竞价实例按需价格（最高出价），单位为元 |

**请求示例**

```python
def get_ecs_price():
    """
    获取云服务器价格
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "DescribePrice"
    method = "POST"
    param = {}
    body = {
        "AvailableZoneCode":"CN_Hohhot_B",
        "EcsFamilyName":"Ram专业渲染型rp3",
        "Cpu":16,
        "Ram":32,
        "Gpu":1,
        "BillingMethod":"0",
        "Duration":12,
        "SystemDiskInfo":{
            "DiskFeature":"ssd",
            "Size":10
        },
        "Number": 2,
        "DataDiskInfo":[
            {
                "DiskFeature":"ssd",
                "Size":10
            }
        ]
    }
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "CodeMsg": "success",
    "Msg": "获取计费信息成功！",
    "Data": {
        "PriceUnit": "天",
        "PriceSymbol": "￥",
        "TotalPrice": 9.34
    }
}
```

### 6.DescribeInstance

**Action**: DescribeInstance

**描述**：获取云服务器配置详情 

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：GET

**请求参数**

| 参数  | 要求 | 类型   | 说明       |
| ----- | ---- | ------ | ---------- |
| EcsId | 必选 | string | 云服务器id |

**返回参数**

| 参数                | 类型     | 示例                                                         | 说明                         |
| ------------------- | -------- | ------------------------------------------------------------ | ---------------------------- |
| EcsId               | string   | "ins-abcr50fvgj45fgqw"                                       | 云服务器id                   |
| EcsName             | string   | "test1.计算-6"                                               | 云服务器名称                 |
| RegionId            | string   | "abcr50fvgj45fgqw"                                           | 地域id                       |
| RegionName          | string   | "北京"                                                       | 地域名称                     |
| AzId                | string   | "abcr50fvgj45fgqw"                                           | 可用区id                     |
| AzName              | string   | "可用区A"                                                    | 可用区名称                   |
| Status              | string   | "running"                                                    | 状态码                       |
| StatusDisplay       | string   | "运行中"                                                     | 状态                         |
| IsGpu               | int      | 1:是 0:不是                                                  | 是否是gpu型云服务器          |
| CreateTime          | datetime | 2022-07-22 16:41:28                                          | 创建时间                     |
| EndBillTime         | datetime | 2022-08-22 16:41:28                                          | 到期时间                     |
| IsAutoRenewal       | string   | 1                                                            | 是否自动续约                 |
| TimeZone            | sting    | UTC                                                          | 时区                         |
| EcsRule             | dict     | {<br/>      "Name": "Cpu密集计算型I3",  //  规格族名称<br/>      "CpuNum": 1,<br/>      "CpuUnit": "核",<br/>      "Ram": 1,<br/>      "Ram": 0,<br/>      "RamUnit": "个",<br/>      "RamUnit": "GiB"<br/> } | 规格                         |
| OsInfo              | dict     | {<br/>      "ImageId": "2a602ae4-d4fd-11ec-bd6f-5ee3d36afa8f",<br/>      "ImageName": "create-image1",<br/>      "OsType": "Centos",<br/>      "Bit": 64,<br/>      "Version": "7.4"<br/>    } | 系统信息                     |
| Disk                | dict     | {<br/>      "SystemDiskConf": {<br/>        "ReleaseWithInstance": true,<br/>        "DiskType": "system",<br/>        "Name": "ssd_20220721",<br/>        "Size": 24,<br/><br/>        "DiskIops": 2520,<br/>        "BandMbps": 96,<br/>        "Unit": "GB",<br/>        "DiskId": "disk-dj3g8odrnwqdrybj",<br/>        "DiskFeature": "ssd"<br/>      },<br/>      "DataDiskConf": [] | 硬盘信息                     |
| Pipe                | dict     | {<br/>      "VpcName": "Ram服务器",<br/>      "VpcId": "7ab97a9a-8c0f-11ec-9b99-d2fedeecdbd1",<br/>      "SubnetId": "2cee7596-bbbb-11ec-a287-debf4cca37ce",<br/>      "SubnetName": "test-kvm",<br/>      "CreateTime": "2022-04-14 14:21:52",<br/>      "PrivateNet": "10.1.128.53",<br/>      "PubNet": "",<br/>      "VirtualNet": [],<br/>      "EipInfo": {<br/>        "10.1.128.53": {<br/>          "ConfName": "",<br/>          "EipIp": "",<br/>          "CurrentUseQos": ""<br/>        }<br/>      }<br/>    } | 网络信息                     |
| BillingInfo         | dict     | {<br/>      "BillingMethod": "1",<br/>      "BillingMethodName": "包年包月",<br/>      "BillingStatus": "正常",<br/>      "BillCycleId": "month"<br/>    } | 计费信息                     |
| NoChargeForShutdown | int      | 0                                                            | 是否关机不计费, 1:是， 0：否 |

**请求示例**

```python
def get_ecs_detail():
    """
    获取云服务器详情
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "DescribeInstance"
    method = "GET"
    param = {
        "EcsId":"ins-ajgaioirpwvdjynj"
    }

    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "code": "Success",
    "CodeMsg": "success",
    "Message": "获取云服务器详情成功！",
    "Data": {
        "EcsId": "ins-ajgaioirpwvdjynj",
        "EcsName": "宿迁",
        "RegionId": "3af19bf4-729c-11ec-b62a-1e00e202ff80",
        "RegionName": "宿迁",
        "AzId": "16e6e380-729d-11ec-b62a-1e00e202ff80",
        "AzName": "宿迁A",
        "Status": "running",
        "StatusDisplay": "运行中",
        "CreateTime": "2022-07-21 15:30:22",
        "Duration": 1,
        "EndBillTime": "2022-08-21 15:37:18",
        "IsAutoRenewal": "1",
        "TimeZone": "UTC",
        "IsRam": false,
        "NoChargeForShutdown": 0,
        "EcsRule": {
            "Name": "Cpu密集计算型I3",
            "CpuNum": 1,
            "CpuUnit": "核",
            "Ram": 1,
            "Gpu": 0,
            "RamUnit": "个",
            "GpuUnit": "GiB"
        },
        "OsInfo": {
            "ImageId": "2a602ae4-d4fd-11ec-bd6f-5ee3d36afa8f",
            "ImageName": "create-image1",
            "OsType": "Centos",
            "Bit": 64,
            "Version": "7.4"
        },
        "Disk": {
            "SystemDiskConf": {   // 系统盘信息
                "ReleaseWithInstance": 1,  // 是否随实例删除
                "DiskType": "system",
                "Name": "ssd_20220721",  
                "Size": 24,
                "DiskIops": 2520,  //iops大小
                "BandMbps": 96,  // 吞吐量
                "Unit": "GB",
                "DiskId": "disk-dj3g8odrnwqdrybj",  //系统盘id
                "DiskFeature": "ssd"  //盘类型
            },
            "DataDiskConf": [
                "ReleaseWithInstance": 0,  // 不随实例删除
                "DiskType": "data",
                "Name": "ssd_20220721",  
                "Size": 24,
                "DiskIops": 2520,  //iops大小
                "BandMbps": 96,  // 吞吐量
                "Unit": "GB",
                "Id": "disk-dj3g8odrnwqdrybj",  //数据盘id
                "DiskFeature": "ssd"  //盘类型
            ]
        },
        "Pipe": {
            "VpcName": "Ram服务器",
            "VpcId": "7ab97a9a-8c0f-11ec-9b99-d2fedeecdbd1",
            "SubnetId": "2cee7596-bbbb-11ec-a287-debf4cca37ce",
            "SubnetName": "test-kvm",
            "CreateTime": "2022-04-14 14:21:52",
            "PrivateNet": "10.1.128.53",
            "PubNet": "",
            "VirtualNet": [],
            "EipInfo": {
                "10.1.128.53": {
                    "ConfName": "",
                    "EipIp": "",
                    "CurrentUseQos": ""
                }
            }
        },
        "BillingInfo": {
            "BillingMethod": "1",
            "BillingMethodName": "包年包月", //计费方式
            "BillingStatus": "正常",  //计费状态
            "BillCycleId": "month"  //计费周期: "month": 月，"year": 年
        }
    }
}
```

### 7.DescribeInstanceStatus

**Action**: DescribeInstanceStatus

**描述**：批量获取云服务器状态

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**:   POST

**请求参数**

| 参数   | 要求 | 类型 | 说明         |
| ------ | ---- | ---- | ------------ |
| EcsIds | 必选 | list | 云服务器列表 |

**返回参数**

| 参数          | 类型   | 示例    | 说明                          |
| ------------- | ------ | ------- | ----------------------------- |
| EcsStatus     | dict   | {}      | 云服务器状态字典，key为实例id |
| Status        | string | running | 状态码                        |
| StatusDisplay | string | 运行中  | 状态                          |

**请求示例**

```python
def get_ecs_status():
    """
       批量获取云服务器状态
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "DescribeInstanceStatus"
    method = "POST"
    param = {}
    body = {
        "EcsIds": ["ins-3j62nodr5w2daycj", "ins-ajgaioirpwvdjynj"]
    }
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "Message": "获取云服务器状态成功！",
    "Data": {
        "EcsStatus": {
            "ins-3j62nodr5w2daycj": {
                "Status": "running",
                "StatusDisplay": "运行中"
            },
            "ins-ajgaioirpwvdjynj": {
                "Status": "running",
                "StatusDisplay": "运行中"
            }
        }
    }
}
```

### 8.DescribeEvent

**Action**: DescribeEvent

**描述**： 获取事件信息

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：GET 

**请求参数**

| 参数    | 要求 | 类型   | 说明   |
| ------- | ---- | ------ | ------ |
| EventId | 必选 | string | 事件id |

**返回参数**：

| 名称             | 类型   | 示例值                                 | 描述                       |
| ---------------- | ------ | -------------------------------------- | -------------------------- |
| EventId          | string | 3de9d9f0-8f09-11ec-a494-d2a2d83b77e2   | 事件id                     |
| EventStatus      | string | success                                | 事件状态                   |
| EventType        | string | create_ecs                             | 事件类型                   |
| EventTypeDisplay | string | 创建云服务器                           | 事件类型中文名称           |
| CreateTime       | string | "2022-01-16 17:17:20"                  | 创建时间                   |
| TaskList         | list   | []                                     | 事件下的任务列表           |
| TaskId           | string | "3e54d714-8f09-11ec-a494-d2a2d83b77e2" | 任务id                     |
| Status           | string | 成功                                   | 任务状态                   |
| ResourceId       | string | "ins-klkyifuqgmq4cxes"                 | 资源id                     |
| UpdateTime       | string | "2022-01-16 17:17:25"                  | 任务更新时间               |
| EndTime          | string | "2022-01-16 17:17:30"                  | 任务完成时间，未完成则为空 |
| ResourceType     | string | ecs                                    | 任务资源类型               |
| TaskType         | string | create_ecs                             | 任务类型                   |
| TaskTypeDisplay  | string | 创建云服务器                           | 任务类型中文名称           |

**请求示例**

```python
def describe_event():
    """
    查询事件信息
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "DescribeEvent"
    method = "GET"
    param = {"EventId": "3de9d9f0-8f09-11ec-a494-d2a2d83b77e2"}
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "获取事件信息成功！",
    "Data": {
        "EventId": "2d01ed16-1231-11ed-b805-ae32005fa3a1",
        "EventStatus": "success",
        "EventStatusDisplay": "成功",
        "EventType": "create_ecs",
        "EventTypeDisplay": "创建云服务器",
        "CreateTime": "2022-08-02 15:03:13",
        "TaskList": [
            {
                "TaskId": "eaea8708-13c5-11ed-9210-3296060c3fb9",
                "Status": "success",
                "StatusDisplay": "成功",
                "ResourceId": "ins-klkyifuqgmq4cxes",
                "CreateTime": "2022-08-04 15:20:28",
                "UpdateTime": "2022-08-04 15:20:41",
                "EndTime": "2022-08-04 15:20:41",
                "ResourceType": "ecs",
                "ResourceDisplay": "云服务器",
                "TaskType": "create_ecs",
                "TaskTypeDisplay": "创建云服务器"
            }
        ]
    },
    "RequestId": "a00aa52e119211ed93f1c2b5d7e451cd"
}
```

### 9.DescribeInstanceMonitor

**Action**: DescribeInstanceMonitor

**描述**： 云服务器监控信息

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：POST

**请求参数**

| 参数         | 要求 | 类型   | 说明                                                         |
| ------------ | ---- | ------ | ------------------------------------------------------------ |
| EcsId        | 必选 | string | 实例ID                                                       |
| TimeInterval | 可选 | string | 当前时间某个时间段的监控时间，单位为小时 (默认1小时)         |
| StartTime    | 可选 | string | 当前时间附近时间间隔                                         |
| EndTime      | 可选 | string | 获取数据的结束时间点(默认当前时间为结束时间)                 |
| Indicators   | 可选 | list   | 监控指标('CpuUsage', 'CPU使用率'), ('MemoryUsage', '内存使用率'), ('Load', '系统平均负载'), ('NetworkRate', '网络吞吐量'), ('DiskUsage', '磁盘使用率'), ('DiskThroughput', '磁盘吞吐量'), ('DiskIops', '磁盘iops'), ('GpuUsage', 'GPU使用率'), ('GpuMemoryUsage', '显存使用率'), ('GpuTemperature', 'GPU温度') ,('GpuClocksGraphics','图形时钟频率'),('GpuClocksMemory', '显存时钟频率')不填默认监控所有指标 |

**返回参数**

| 参数   | 类型   | 示例                     | 说明                                                         |
| ------ | ------ | ------------------------ | ------------------------------------------------------------ |
| Data   | dict   | {}                       | 由监控指标的Key和值组成，CPU使用率：CpuUsage； 内存使用率： MemoryUsage；系统平均负载：Load1M、Load5M、Load15M；'网络吞吐量：NetworkOutrate、NetworkInrate；磁盘使用率：DiskUsage； 磁盘吞吐量： DiskReadThroughput、DiskWriteThroughput；磁盘Iops：DiskReadIops、DiskWriteIops； GPU使用率：GpuUsage； 显存使用率：GpuMemoryUsage； GPU温度：GpuTemperature |
| Time   | list   | ["2022-09-03  01:29:28"] | 时间数组，与值数组一一对应                                   |
| Value  | list   | [0.33]                   | 值数组，与时间数组一一对应                                   |
| Device | string | “”                       | 设备                                                         |
| Unit   | string | ”%“                      | 值数组内的数据单位                                           |

**请求示例**

```python
def instance_monitor():
    """
    云服务器监控
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "DescribeInstanceMonitor"
    method = "POST"
    body = {
        "EcsId":"XXX",
        "StartTime":"2022-09-03  01:29:28",
        "EndTime":"2022-09-03  01:29:28",
        "Indicators":["CpuUsage"]
    }
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "获取云服务器监控信息成功！",
    "Data": {
        "CpuUsage": {
            "Unit": "%",
            "Device": null,
            "Time": [
                "2022-09-15 09:05:45"
            ],
            "Value": [
                0.1
            ]
        }
    },
    "RequestId": "94fa404a34d511eda939e454e81c0d47"
}
```

### 10.DescribeAccountSubject

**Action**: DescribeAccountSubject

**描述**:获取客户测试账户

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：GET

**返回参数：**

| 名称      | 类型   | 示例值                           | 描述               |
| --------- | ------ | -------------------------------- | ------------------ |
| CodeMsg   | string | success                          | 返回码对应基础信息 |
| Message   | string | 获取地域可用区信息成功           | 返回详细描述信息   |
| RequestId | string | b9bb7e27c75656112db63b8213672843 | 请求标识uuid       |
| Name      | string | BMSTEST                          | 测试账户名称       |
| Income    | float  | 3000.0                           | 总测试金额         |
| Duration  | int    | 302                              | 测试项目时长(天)   |
| BeginTime | string | "2022-03-02"                     | 测试项目开始时间   |
| EndTime   | string | "2023-01-11"                     | 测试项目截至时间   |

**请求示例：**

```python
def describe_account_subject():
    """
    获取客户测试账户
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "DescribeAccountSubject"
    method = "GET"
    param={}
    body={}
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.get(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例**：

```json
{
    "Code": "Success",
    "Msg": "获取测试账户信息成功！",
    "Data": [
        {
            "Name": "BMSTEST",
            "Balance": 0.0,
            "Income": 3000.0,
            "Duration": 365,
            "BeginTime": "2022-01-11",
            "EndTime": "2023-01-11"
        },
        {
            "Name": "kvmtest",
            "Balance": 1000.01,
            "Income": 1100.01,
            "Duration": 302,
            "BeginTime": "2022-03-02",
            "EndTime": "2022-12-29"
        }
    ],
    "RequestId": "df93f6d51bc5e95c89a96fc976964523"
}
```

### 11.CreateInstance

**Action**: CreateInstance

**描述**：创建云服务器

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：POST

**请求参数**

| 参数              | 要求 | 类型   | 说明                                                         |
| ----------------- | ---- | ------ | ------------------------------------------------------------ |
| AvailableZoneCode | 必选 | string | 可用区code(可取**附件五**中私有网络可用区名称或者**DescribeRegions**返回值) |
| EcsFamilyName     | 必选 | string | 规格族名称(可取**DescribeEcsFamilyInfo**接口返回值EcsFamilyName) |
| Cpu               | 必选 | int    | Cpu                                                          |
| Ram               | 必选 | int    | 内存                                                         |
| Gpu               | 可选 | int    | 显卡数量，默认为0                                            |
| Number            | 可选 | int    | 购买数量，默认为1（默认批量最大值为100台）                   |
| BillingMethod     | 必选 | string | 计费方式："0": 按需  "1":包年包月  "3": 竞价实例                        |
| SpotType          | 可选 | string | 购买的竞价实例模式： "auto": 自动出价（自动根据市场价格出价，最高可达到按需计费价格。实例不会因出价问题释放，但库存不足时仍会被自动释放），"bid" 设置上线                       |
| SpotAmount        | 可选 | string | 竞价实例bid（设置上线）模式下需指的购买价 （需在**DescribePrice**返回的竞价价格范围内)                      |
| SkipSpotRelease   | 可选 | bool   | 是否跳过资源池中已占用的竞价实例释放。默认为 False：库存紧张时会释放竞价实例，释放依赖退租过程（约 1 小时），可最大化提高资源池整体可用性与利用率。设为 True 时：不释放竞价实例，从而跳过等待过程，适用于对创建速度要求较高、期望短时间内完成机器创建的场景。|                    
| Password          | 必选 | string | 登录密码                                                     |
| ImageId           | 必选 | string | 镜像id或者镜像名称(**DescribeImages**返回值中的ImageName或者ImageId) |
| SystemDisk        | 必选 | dict   | 系统盘信息，示例:{<br/>        "DiskFeature":"local", # 盘类型: 本地盘:"local", 云盘:"ssd"<br/>         "Size":50 # 盘大小<br/>    }<br/> |
| VpcInfo           | 必选 | dict   | vpc信息，示例:{<br/>        "VpcId":"7ab97a9a-8c0f-11ec-9b99-d2fedeecdbd1"<br/>    } |
| SubnetInfo        | 必选 | dict   | 私有网络信息，示例：{<br/>        "SubnetId":"2cee7596-bbbb-11ec-a287-debf4cca37ce" # 子网id<br/>    } |
| PubnetInfo        | 可选 | list   | 支持新分配公网IP和绑定已有的公网IP.<br/>"SubnetId":""; string类型，必填,子网id;若使用虚拟出网网关IP绑定公网IP则传虚拟出网网关id.<br/>"EipIds":[]; list类型, 选填,绑定的eip的id列表;若需新分配公网IP,不填,绑定已有公网IP需填,数量需要和云服务器数量一致.<br/>"IpType":""; string类型，选填, 若使用虚拟出网网关必填.默认出网网关:"default_gateway",虚拟网关：”virtual”.<br/>"BandwidthType":""; string类型，选填, 带宽类型;若需新分配公网IP必填,表示绑定公网IP的带宽类型.绑定已有公网IP不填.固定带宽:”Bandwidth”,固定带宽包月:”BandwidthMonth”,流量按需: “Traffic”（若实例计费方式为包年包月选择固定带宽时需传"固定带宽包月"）.<br/>"Qos":100; int类型，选填，公网带宽值,单位为M;若带宽类型选择”固定带宽”需填写. |
| Name              | 可选 | string | 云服务器名,不传自动赋予（自动命名规则：ecs-创建日期）        |
| StartNumber       | 可选 | int    | 云服务器名称编号起始数字，不需要服务器编号可不传             |
| Duration          | 可选 | int    | 只在包月算价时有意义，以月份为单位，一年值为12，大于一年要输入12的整数倍，最大值36(3年) |
| IsToMonth         | 可选 | int    | 包月是否到月底 1:是  0:否 默认为1。如2022-07-22购买，传值为1，则到期时间为2022-08-01；值为0，则到期时间为2022-08-22 |
| IsAutoRenewal     | 可选 | int    | 是否自动续约，包月时需传。1:是  0:否 默认为1                 |
| UtcTime           | 可选 | int    | 是否utc时间，1:是  0:否 默认为0（默认UTC+8，上海时间）       |
| DataDisk          | 可选 | list   | 数据盘信息。仅支持云盘，示例：[{<br/>        "DiskFeature":"local", # 盘类型，"local"：本地盘，"ssd": ssd云盘.  本地盘和云盘不能混用<br/>        "ReleaseWithInstance":1, # 是否随实例删除:1:随实例删除,0:不随实例删除.不传默认随实例删除<br/>         "Size":50 # 盘大小,<br/>         "SnapshotId":"s-xxx" # 快照id,通过此快照创建数据盘,非必填<br/>    }] |
| DnsList           | 可选 | list   | dns 解析 需要两个元素  [主dns，从dns]，不选采用默认通用DNS   |
| SecurityGroups    | 可选 | list   | 安全组列表，安全组优先级按顺序由高到低，示例：SecurityGroups:[{<br/>      "SecurityGroupId":"sg-p9fpfbrg6r1ft5vs", #安全组id<br/>     }] |
| TestAccount       | 可选 | string | 测试账户名称                                                 |
| ProjectId         | 可选 | string | 项目组id                                                     |

**返回参数**

| 参数     | 类型   | 示例                                 | 说明             |
| -------- | ------ | ------------------------------------ | ---------------- |
| EventId  | string | d0b1d5b7-7549-41dc-972c-c40270b53bd7 | 事件id           |
| EcsIdSet | list   | ['ins-xxx']                          | 创建的资源id列表 |

**请求示例**

```python
def create_ecs():
    """
    创建云服务器
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "CreateInstance"
    method = "POST"
    param = {}
    body = {
        "AvailableZoneCode":"CN_Hohhot_B",
        "EcsFamilyName":"极速渲染型re3",
        "Cpu":12,    
        "Ram":24,
        "Gpu":1,
        "Number":1,
        "BillingMethod":"0",
        "ImageId":"Windows 10 64位-GPU-Geforce",
        "SystemDisk":{
            "DiskFeature":"local",
            "Size":50
        },
        "DataDisk": {
            "DiskFeature": "ssd",
            "Size": 48,
            "SnapshotId":"s-xxx",
            "ReleaseWithInstance": 0  
        },   
        "VpcInfo":{
            "VpcId":"7ab97a9a-8c0f-11ec-9b99-d2fedeecdbd1"
        },
        "SubnetInfo":{
            "SubnetId":"2cee7596-bbbb-11ec-a287-debf4cca37ce"
        },
        "SecurityGroups":[{
            "SecurityGroupId":"sg-p9fpfbrg6r1ft5vs1"
        }],
        "Name":"",
        "StartNumber":0,
        "Password":"123QWEqwe",
        "ProjectId": "0-0-0-0-0"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "创建云服务器任务下发成功",
    "Data": {
        "EventId": "d0b1d5b7-7549-41dc-972c-c40270b53bd7",
        "EcsIdSet": ["ins-72ys37squwzemjlx"]
    }
}
```

### 12.OperateInstance

**Action**: OperateInstance

**描述**：批量操作云服务器开、关机、重启

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：POST

**请求参数**

| 参数      | 要求 | 类型   | 说明                                                         |
| --------- | ---- | ------ | ------------------------------------------------------------ |
| EcsIds    | 必选 | list   | 云服务器id列表                                               |
| OpType    | 必选 | string | 操作类型：<br/>开机:"start_up_ecs" <br/>关机:"shutdown_ecs"<br/>重启:"restart_ecs"<br/>强制关机:"hard_shutdown_ecs"<br/>不计费关机:"free_shutdown_ecs",仅按需计费的云盘实例支持关机不计费，再开机公网IP可能会变化；若批量操作关机：支持关机不收费的实例，关机后停止 CPU、内存、GPU和公网收费；不支持关机不收费的实例，正常关机，继续收费；不计费关机期间不支持除开机、删除、定制镜像外的操作。目前关机不计费白名单开放，若需要请联系商务。 |
| DeleteEip | 可选 | int    | 公网释放选项，0：保留公网IP；1：释放公网IP；默认1：释放公网IP；仅在关机不计费情况生效 |

**返回参数**

| 参数    | 类型   | 示例 | 说明   |
| ------- | ------ | ---- | ------ |
| EventId | string |      | 事件id |

**请求示例**

```python
def operate_ecs():
    """
       批量操作云服务器
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "OperateInstance"
    method = "POST"
    param = {}
    body = {
        "EcsIds": ["ins-ajgaioirpwvdjynj"],
        "OpType": "shutdown_ecs"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "code": "Success",
    "CodeMsg": "success",
    "Message": "批量操作云服务器任务下发成功！",
    "Data": {
        "EventId": "7e782a16-0bc9-11ed-a942-92d3bb445445"
    }
}
```

### 13.DeleteInstance

**Action**: DeleteInstance

**描述**：删除云服务器

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：POST

**请求参数**

| 参数      | 要求 | 类型 | 说明                                            |
| --------- | ---- | ---- | ----------------------------------------------- |
| EcsIds    | 必选 | list | 云服务器id列表                                  |
| DeleteEip | 可选 | int  | 1:解绑并删除服务器绑定的EIP，0:解绑EIP  默认为0 |

**返回参数**

| 参数    | 类型   | 示例   | 说明 |
| ------- | ------ | ------ | ---- |
| EventId | string | 事件id |      |

**请求示例**

```python
def delete_ecs():
    """
    删除云服务器
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "DeleteInstance"
    method = "POST"
    param = {}
    body = {
        "EcsIds": ["ins-5922pyermmx7wbtg"]
    }
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "CodeMsg": "success",
    "Msg": "删除云服务器任务下发成功！",
    "Data": {
        "EventId": "47be5182-0ca8-11ed-bd9c-62b5fae1caf2"
    }
}
```

### 14.ModifyInstancePassword

**Action**: ModifyInstancePassword

**描述**： 修改实例管理员用户密码

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：  POST 

**请求参数**

| 参数     | 要求 | 类型   | 说明           |
| -------- | ---- | ------ | -------------- |
| EcsIds   | 必选 | list   | 云服务器id列表 |
| Password | 必选 | string | 新密码         |

**返回参数**：

| 名称    | 类型   | 示例值    | 描述   |
| ------- | ------ | --------- | ------ |
| EventId | string | "EventId" | 事件id |

**请求示例**

```python
def ecs_reset_password():
    """
       云服务器管理员用户密码修改
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "ModifyInstancePassword"
    method = "POST"
    param = {}
    body = {
        "EcsIds": ["ins-vjugdoyrtwrdpy5j"],
        "Password": "KVMV587!\t"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "CodeMsg": "success",
    "Msg": "云服务器管理员用户密码修改任务下发成功！",
    "Data": {
        "EventId": "fd97952e-0c9c-11ed-bd9c-62b5fae1caf2"
    }
}
```

### 15.ModifyInstanceName

**Action**: ModifyInstanceName

**描述**： 修改云服务器名称

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：POST 

**请求参数**

| 参数  | 要求 | 类型   | 说明           |
| ----- | ---- | ------ | -------------- |
| EcsId | 必选 | string | 云服务器实例ID |
| Name  | 必选 | string | 新实例名称     |

**返回参数**：

| 名称  | 类型   | 示例值               | 描述           |
| ----- | ------ | -------------------- | -------------- |
| EcsId | string | ins-5ruc2dbp15drl152 | 云服务器实例ID |
| Name  | string | test                 | 新实例名称     |

**请求示例**

```python
def change_ecs_name():
    """
    修改云服务器实例名称
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "ModifyInstanceName"
    method = "POST"
    param = {}
    body = {
       "EcsId":"ins-ajgaioirpwvdjynj",
       "Name":"测试测试1",
    }
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "修改实例名称成功！",
    "Data": {
        "EcsId": "ins-7tusfmrri849r9tv",
        "Name": "create-error0731"
    },
    "RequestId": "7cafad69fb02ea43ae0fb92699600d5c"
}
```

### 16.CreateImage

**Action**: CreateImage

**描述**:创建私有镜像

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：POST

**请求参数**

| 参数        | 要求 | 类型   | 说明                                                |
| ----------- | ---- | ------ | --------------------------------------------------- |
| EcsId       | 必选 | string | 实例ID                                              |
| Name        | 必选 | string | 镜像名称                                            |
| TestAccount | 可选 | string | 测试项目名称                                        |
| IsOptimized | 可选 | int    | 1：开启优化加速选项，0：不开启优化加速选项，默认为0 |

**返回参数**

| 参数    | 类型   | 示例                                   | 说明       |
| ------- | ------ | -------------------------------------- | ---------- |
| EventId | string | "d0b1d5b7-7549-41dc-972c-c40270b53bd7" | 事件id     |
| ImageId | string | img-wchmdfur5lpmh2bz                   | 镜像资源id |

**请求示例**

```python
def create_image():
    """
    创建私有镜像
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "CreateImage"
    method = "POST"
    param={}
    body = {
        "EcsId":"ins-xx",
        "Name":"私有镜像xx"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "Code":"Success",
    "Msg":"创建私有镜像成功",
    "Data":{
        "EventId":"d0b1d5b7-7549-41dc-972c-c40270b53bd7",
        "ImageId":"img-wchmdfur5lpmh2bz"
    }
}
```

### 17.DeleteImage

**Action**: DeleteImage

**描述**:删除节点镜像

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：POST

**请求参数：**

| 参数              | 要求 | 类型   | 说明                                                 |
| ----------------- | ---- | ------ | ---------------------------------------------------- |
| ImageIds          | 必选 | list   | 实例ID列表                                           |
| AvailableZoneCode | 可选 | string | 删除的镜像所在可用区code，不填时默认删除所有节点镜像 |

**返回参数：**

| 参数    | 类型   | 示例                                 | 说明   |
| ------- | ------ | ------------------------------------ | ------ |
| EventId | string | d0b1d5b7-7549-41dc-972c-c40270b53bd7 | 事件id |

**请求示例：**

```python
def delete_image():
    """
    删除节点镜像
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "DeleteImage"
    method = "POST"
    param={}
    body={"ImageIds":["img-jx9w92oq9gmmkjnb"]}
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例：**

```json
{
    "Code": "Success",
    "Msg": "删除节点镜像成功!",
    "Data": {
        "EventId": "d0b1d5b7-7549-41dc-972c-c40270b53bd7"
    }
}
```

### 18.SyncImage

**Action**: SyncImage

**描述**:同步镜像到目标节点

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：POST

**请求参数：**

| 参数               | 要求 | 类型   | 说明                         |
| ------------------ | ---- | ------ | ---------------------------- |
| ImageId            | 必选 | string | 实例ID                       |
| AvailableZoneCodes | 必选 | list   | 同步镜像到目标可用区code列表 |
| TestAccount        | 可选 | string | 测试项目名称                 |

**返回参数：**

| 参数    | 类型   | 示例                                 | 说明   |
| ------- | ------ | ------------------------------------ | ------ |
| EventId | string | d0b1d5b7-7549-41dc-972c-c40270b53bd7 | 事件id |

**请求示例：**

```python
def sync_image():
    """
    同步私有镜像
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "SyncImage"
    method = "POST"
    param={}
    body={
        "ImageId":"img-jx9w92oq9gmmkjnb",
        "AvailableZoneCodes": ["CN_Beijing_A"]
    }
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例：**

```json
{
    "Code": "Success",
    "Msg": "同步私有镜像成功！",
    "Data": {
        "EventId": "d0b1d5b7-7549-41dc-972c-c40270b53bd7"
    }
}
```

### 19.DescribeInstanceVncUrl

**Action**: DescribeInstanceVncUrl

**描述**:获取云服务器远程连接地址

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：GET

**请求参数：**

| 参数  | 要求 | 类型   | 说明   |
| ----- | ---- | ------ | ------ |
| EcsId | 必选 | string | 实例ID |

**返回参数：**

| 参数           | 类型   | 示例                             | 说明            |
| -------------- | ------ | -------------------------------- | --------------- |
| InstanceVncUrl | string | http://xxx.capitalonline.net/xxx | vnc远程连接地址 |

**请求示例：**

```python
def describe_instance_vnc_url():
    """
    获取云服务器远程连接地址
    """
    ecs_url = 'http://api.capitalonline.net/ecs/v1'
    action = "DescribeInstanceVncUrl"
    method = "GET"
    param={
        "EcsId":"ins-xxxx"
    }
    body={}
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    return result
```

**返回示例：**

```json
{
    "Code": "Success",
    "Msg": "获取远程连接地址成功！",
    "Data": {
        "InstanceVncUrl": "http://xxx.capitalonline.net/xxx"
    }
}
```



**错误码**

**错误码**

| **HttpCode** | 错误码                                     | 错误信息                                                     | 描述                                                     |
| ------------ | ------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------- |
| 400          | ParamParseError                            | Parameter parsing error.                                     | 请求参数解析错误                                         |
| 400          | InvalidParameter                           | The parameter is not valid.                                  | 参数不合法                                               |
| 400          | MissingParameter                           | Missing required parameter.                                  | 缺少必需的参数                                           |
| 400          | InvalidParameter.IsNull                    | Required parameter is empty.                                 | 必需的参数为空                                           |
| 400          | UnsupportedHTTPMethod                      | Action does not correspond to the request method.            | http请求方式不支持                                       |
| 400          | UnsupportedAction                          | Unsupported action.                                          | Action不在可选范围内                                     |
| 400          | MaxEcsCountExceed                          | Exceeding the maximum number of ECS available.               | 云服务器创建数量大于当前可创建数量                       |
| 400          | InvalidInstanceSpec.ValueNotSupported      | The specified InstanceSpec does not exist or beyond the permitted range. | 指定的实例规格参数不存在                                 |
| 400          | InvalidInstanceType.ValueNotSupported      | The specified InstanceType does not exist or beyond the permitted range. | 指定的实例规格族类型不存在，或者没有权限操作此规格的实例 |
| 400          | MaxDiskSizeExceed                          | The specified disk size exceeds the maximum capacity of the disk. | 指定的盘规格超出最大限制                                 |
| 400          | MinDiskSizeLess                            | The specified disk size is below the minimum capacity of the disk. | 指定的盘规格低于最小限制                                 |
| 400          | InvalidDiskSize.ValueNotSupported          | The specified DiskSize does not exist or beyond the permitted range. | 指定的盘规格不存在，或者没有权限操作此规格               |
| 400          | UnSupportedMixingLocalAndEbs               | Mixing local disks and cloud disks is not supported.         | 不支持盘本地盘和云盘混用                                 |
| 403          | InvalidOperation                           | The operation fails to pass the inspection and is invalid.   | 操作未通过校验，无法进行                                 |
| 403          | InvalidOperation.VpcMismatch               | The operation is invalid. The resources of the operation are not in the same VPC. | 批量操作资源需要在相同vpc下                              |
| 403          | InvalidOperation.AzMismatch                | The operation is invalid.The resources of the operation are not in the same zone. | 批量操作资源需要在相同可用区下                           |
| 403          | InvalidOperation.InstanceStatusUnsupported | The instance state does not support the specified operation. | 实例状态不支持执行指定操作                               |
| 404          | InvalidUser.NotFound                       | The user information under the customer name does not exist. | 未获取到客户名下用户信息                                 |
| 404          | InvalidAccount.NotFound                    | Customer information does not exist                          | 未获取到客户信息                                         |
| 404          | InvalidRegion.NotFound                     | The specified region does not exist.                         | 指定的地域不存在                                         |
| 404          | InvalidAvailableZone.NotFound              | The specified available zone does not exist.                 | 指定的可用区不存在                                       |
| 404          | InvalidResourceId.NotFound                 | The specified resource zone does not exist                   | 指定的资源id不存在                                       |
| 404          | InvalidVpc.NotFound                        | The specified vpc does not exist.                            | 指定的Vpc不存在                                          |
| 404          | InvalidImage.NotFound                      | The specified image does not exist.                          | 指定的镜像不存在                                         |
| 404          | InvalidEvent.NotFound                      | The specified event does not exist.                          | 指定的事件不存在                                         |
| 404          | InvalidEvent.InvalidUrl.NotFound           | The specified url does not exist                             | 路由不存在或已升级                                       |
| 500          | InternalError                              | The request processing has failed due to some unknown error, exception or failure. | 内部错误，请重试。如果多次尝试失败，请提交工单           |

### 20.DescribeZoneInstanceType

**Action**: DescribeZoneInstanceType

**描述**：获取弹性云服务器ECS计算类型规格及其销售状况

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：GET

**请求参数**

| 参数              | 要求   | 类型   | 说明                                                         |
| ----------------- | ------ | ------ | ------------------------------------------------------------ |
| AvailableZoneCode | 必选   | string | 可用区code(可取**附件五**中私有网络可用区名称或者**DescribeRegions**返回值) |
| EcsFamilyName     | string | string | 规格族名称                                                   |
| Cpu               | 可选   | int    | Cpu大小                                                      |
| Ram               | 可选   | int    | 内存大小                                                     |
| Gpu               | 可选   | int    | 显卡数量                                                     |

**返回参数**

| 参数             | 类型   | 示例              | 说明                                    |
| ---------------- | ------ | ----------------- | --------------------------------------- |
| EcsFamilyName    | string | 专业渲染型rp3     | 规格族名称                              |
| AvailableZone    | string | 宿迁B             | 可用区                                  |
| SpecList         | list   | []                | 规格列表                                |
| Cpu              | int    | 16                | Cpu大小                                 |
| Ram              | int    | 32                | 内存大小                                |
| Gpu              | int    | 1                 | 显卡数量                                |
| GpuType          | string | 专业显卡          | 显卡型号                                |
| SupportGpuDriver | string | Datacenter        | 显卡驱动类型                            |
| Status           | string | SELL              | 销售状况：1）SELL销售中;2)SELLOUT已售罄 |
| CpuName          | string | Intel第八代处理器 | 处理器型号                              |

**请求示例**

```python
def describe_zone_instance_type():
    action = "DescribeZoneInstanceType"
    method = "GET"
    param = {
        "EcsFamilyName": "专业渲染型rp3",
        "AvailableZoneCode": "CN_Suqian_B",
    }
    ecs_url = "http://api.capitalonline.net/ecs/v1"
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    print(url)
    resp = requests.get(url)
    print(resp)
    tes_text = json.dumps(resp.json(),ensure_ascii=False)
    print(tes_text)
```

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "获取计算类型族及其售卖状态！",
    "Data": [
        {
            "EcsFamilyName": "专业渲染型rp3",
            "AvailableZone": "宿迁B",
            "SpecList": [
                {
                    "Cpu": 12,
                    "Ram": 24,
                    "Gpu": 1,
                    "GpuType": "专业显卡",
                    "SupportGpuDriver": "Datacenter",
                    "Status": "SELLOUT",
                    "CpuName": "Intel第八代处理器"
                }
            ]
        }
    ],
    "RequestId": "5987dcd6-3fed-41ac-9e75-de17d675cb64"
}
```

**错误码**

| **HttpCode** | 错误码                        | 错误信息                                                     | 描述                                           |
| ------------ | ----------------------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| 400          | ParamParseError               | Parameter parsing error.                                     | 请求参数解析错误                               |
| 400          | InvalidParameter              | The parameter is not valid.                                  | 参数不合法                                     |
| 400          | MissingParameter              | Missing required parameter.                                  | 缺少必需的参数                                 |
| 400          | UnsupportedHTTPMethod         | Action does not correspond to the request method.            | http请求方式不支持                             |
| 400          | UnsupportedAction             | Unsupported action.                                          | Action不在可选范围内                           |
| 404          | InvalidAccount.NotFound       | Customer information does not exist                          | 未获取到客户信息                               |
| 404          | InvalidAvailableZone.NotFound | The specified available zone does not exist.                 | 指定的可用区不存在                             |
| 500          | InternalError                 | The request processing has failed due to some unknown error, exception or failure. | 内部错误，请重试。如果多次尝试失败，请提交工单 |

### 21.ChangeInstanceConfigure

**Action**: ChangeInstanceConfigure

**描述**： 更改实例规格

**需知**:
1. 已关机状态下才可以操作
2. 不支持跨类型修改实例规格
3. GPU型不支持跨驱动
4. 按需计费支持升降配置
5. 包年包月只支持升配置
6. 云盘实例支持跨规格族，本地盘实例不支持跨规格族
7. 批量操作要具有一致性
8. 竞价实例不允许修改

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：  POST 

**请求参数**

| 参数     | 要求 | 类型   | 说明           |
| -------- | ---- | ------ | -------------- |
| AvailableZoneCode | 必选  | string | 可用区code                                                                   |
| EcsFamilyName     | 必选  | string | 规格族名称                                                                     |
| Cpu               | 必选  | int    | Cpu                                                                       |
| Ram               | 必选  | int    | 内存                                                                        |
| Gpu               | 可选  | int    | 显卡数量，默认为0                                                                 |
| EcsIds            | 必传  | list   | 实例id列表                                                                    |

**返回参数**：

| 名称    | 类型   | 示例值    | 描述   |
| ------- | ------ | --------- | ------ |
| EventId | string | "EventId" | 事件id |

**请求示例**

```python
def change_instance_configure():
    """
    更改实例规格
    """
    ecs_url = 'http://gateway.gic.test/ecs/v1'
    action = "ChangeInstanceConfigure"
    method = "POST"
    body = {
        "EcsIds": ['ins-dhz8kr4u7ajp5gcc'],
        "AvailableZoneCode":"CN_SJZ_B",
        "EcsFamilyName":"优化型M2",
        "Cpu":2,    
        "Ram":2,
        "Gpu":0,
    }
    url = get_signature(action, AK, AccessKeySecret, method, ecs_url)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "云服务器规格修改成功",
    "Data": {
        "EventId": "fd97952e-0c9c-11ed-bd9c-62b5fae1caf2"
    },
    "RequestId": "7cafad69fb02ea43ae0fb92699600d5c"
}
```
## 云盘EBS相关

**云盘状态(Status)说明**

| code              | 说明       |
| ----------------- | ---------- |
| building          | 创建中     |
| build_fail        | 创建失败   |
| running           | 使用中     |
| mounting          | 挂载中     |
| unmounting        | 卸载中     |
| waiting           | 待挂载     |
| updating          | 更新中     |
| error             | 错误       |
| recovering        | 恢复中     |
| cancel_recycling  | 取消回收中 |
| recycling         | 欠费回收中 |
| error             | 错误       |
| creating_snapshot | 创建快照中 |
| rollback          | 回滚中     |

### 1.CreateDisk

**Action**: CreateDisk

**描述**:  创建一块或多块云盘（数据盘）

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：POST

**请求参数**

| 参数                | 说明                                                         | 类型   | 是否必传 | 示例                            |
| ------------------- | ------------------------------------------------------------ | ------ | -------- | ------------------------------- |
| AvailableZoneCode   | 可用区Code                                                   | string | 是       | CN_Suqian_A                     |
| InstanceId          | 挂载到云主机的实例id(字段有值并且有效时表示挂载到该实例，云盘只能挂载至同一可用区的实例上) | string | 否       | ins-72ys37squwzemjlx            |
| ReleaseWithInstance | 是否随实例删除，1:是,0:否(挂载实例字段有效时，本字段有意义，如果挂载到实例，默认为1) | int    | 否       | 1                               |
| DiskName            | 设置的云盘名称，不传则提供默认名称(名称规则：2-40个字符，可包含大小写字母、中文、数字、点号(.)、下划线(_)、半角冒号(:)、连字符(-)、英文括号(英文输入法下的括号)字符，以大小写字母开头) | string | 否       | ssd-20220802                    |
| DiskFeature         | 盘类型(目前只支持SSD)                                        | string | 是       | SSD                             |
| SnapshotId          | 快照ID（只能传递数据盘的快照ID）                             | string | 否       | s-disk-xftwc38r6ja63wr8-zg0y-01 |
| Size                | 盘容量，单位:GB,容量为8的倍数，且最小24GB起。                | int    | 是       | 24                              |
| Number              | 创建数量，不传默认为1                                        | int    | 否       | 5                               |
| BillingMethod       | 计费方式 ，0:按需计费,1:包年包月, (默认为0，目前只支持按需计费) | string | 否       | 0                               |

**返回参数**

| 参数      | 类型   | 示例                                 | 说明       |
| --------- | ------ | ------------------------------------ | ---------- |
| EventId   | string | 11c4ad90-122c-11ed-b996-7ae483eaf4a4 | 事件id     |
| DiskIdSet | list   | ["disk-8q6wrg5qdomw1t3i"]            | 云盘id列表 |

**请求示例：**

```python
def create_disk():
    """
    创建云盘
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "CreateDisk"
    method = "POST"
    param = {}
    body = {
        "AvailableZoneCode":"CN_Hohhot_B",
        "DiskName":"",
        "DiskFeature":"SSD",
        "Size":32,
        "Number":1,
        "BillingMethod":"0"
    }

    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例：**

```json
{
    "Code": "Success",  
    "Msg": "云盘创建任务下发成功！", 
    "Data": {
        "EventId": "11c4ad90-122c-11ed-b996-7ae483eaf4a4",
        "DiskIdSet": ["disk-8q6wrg5qdomw1t3i"]
    }
}
```

### 2.DeleteDisk

**Action**: DeleteDisk

**描述**:  删除一块或多块云盘(数据盘)

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：POST

**请求参数**：

| 参数           | 说明                       | 类型 | 是否必传 | 示例                  |
| -------------- | -------------------------- | ---- | -------- | --------------------- |
| DiskIds        | 云盘id列表                 | list | 是       | ["disk1", "disk2"]    |
| DeleteSnapshot | 是否同时删除非永久保留快照 | int  | 否       | 1：是，0：否，默认为0 |

**返回参数**

| 参数    | 类型   | 示例                                 | 说明   |
| ------- | ------ | ------------------------------------ | ------ |
| EventId | string | 11c4ad90-122c-11ed-b996-7ae483eaf4a2 | 事件id |

**请求示例**

```python
def delete_disk():
    """
    删除云盘
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "DeleteDisk"
    method = "POST"
    param = {}
    body = {
        "DiskIds":["disk1", "disk2"]
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content, json=body)
    return result
```

**返回示例：**

```json
{
    "Code": "Success",  
    "Msg": "云盘删除任务下发成功！", 
    "Data": {
        "EventId": "11c4ad90-122c-11ed-b996-7ae483eaf4a4"
    }
}
```



### 3.DetachDisk

**Action**: DetachDisk

**描述**：卸载一块或多块云盘（数据盘）

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：POST

**请求参数：**

| 参数    | 说明             | 类型 | 是否必传 | 示例               |
| ------- | ---------------- | ---- | -------- | ------------------ |
| DiskIds | 卸载的云盘id列表 | list | 是       | ["disk1", "disk2"] |

**返回参数**

| 参数    | 类型   | 示例                                 | 说明   |
| ------- | ------ | ------------------------------------ | ------ |
| EventId | string | 11c4ad90-122c-11ed-b996-7ae483eaf4a2 | 事件id |

**请求示例**

```python
def detach_disk():
    """
    卸载云盘
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "DetachDisk"
    method = "POST"
    param = {}
    body = {
        "DiskIds":["disk1", "disk2"],
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例：**

```json
{
    "Code": "Success",  
    "Msg": "云盘卸载任务下发成功！", 
    "Data": {
        "EventId": "11c4ad90-122c-11ed-b996-7ae483eaf4a4"
    }
}
```

### 4.AttachDisk

**Action**: AttachDisk

**描述**：挂载一块或多块云盘（数据盘）

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：POST

**请求参数：**

| 参数                | 说明                               | 类型   | 是否必传 | 示例                 |
| ------------------- | ---------------------------------- | ------ | -------- | -------------------- |
| DiskIds             | 挂载的云盘id列表                   | list   | 是       | ["disk1", "disk2"]   |
| InstanceId          | 挂载的目标实例id                   | string | 是       | ins-cplc7w0rfmy7sb1g |
| ReleaseWithInstance | 是否随实例删除,默认为1。1:是, 0:否 | int    | 否       | 1                    |

**返回参数**

| 参数    | 类型   | 示例                                 | 说明   |
| ------- | ------ | ------------------------------------ | ------ |
| EventId | string | 11c4ad90-122c-11ed-b996-7ae483eaf4a2 | 事件id |

**请求示例**

```python
def attach_disk():
    """
    挂载云盘
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "AttachDisk"
    method = "POST"
    param = {}
    body = {
        "DiskIds":["disk1", "disk2"],
        "EcsId":"ins-cplc7w0rfmy7sb1g"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
```

**返回示例：**

```json
{
    "Code": "Success",  
    "Msg": "云盘挂载任务下发成功！", 
    "Data": {
        "EventId": "11c4ad90-122c-11ed-b996-7ae483eaf4a4"
    }
}
```



### 5.ExtendDisk

**Action**: ExtendDisk

**描述**：云盘扩容（系统盘或者数据盘）

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：POST

**请求参数**：

| 参数         | 说明                                                         | 类型   | 是否必传 | 示例                  |
| ------------ | ------------------------------------------------------------ | ------ | -------- | --------------------- |
| DiskId       | 扩容的云盘id                                                 | string | 是       | disk-w2bcmplru0s6cchy |
| ExtendedSize | 扩容目标容量,单位:GB，目标容量必须大于扩容前容量，且必须为8的倍数。 | int    | 是       | 64                    |

**返回参数**

| 参数    | 类型   | 示例                                 | 说明   |
| ------- | ------ | ------------------------------------ | ------ |
| EventId | string | 11c4ad90-122c-11ed-b996-7ae483eaf4a2 | 事件id |

**请求示例**

```python
def extend_disk():
    """
    扩容云盘接口
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "ExtendDisk"
    method = "POST"
    param = {}
    body = {
        "DiskId":"disk-w2bcmplru0s6cchy",
        "ExtendedSize":64
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result

```

**返回示例：**

```json
{
    "Code": "Success",
    "Msg": "云盘扩容任务下发成功！",
    "Data": {
        "EventId": "24f4cbee-13c0-11ed-9d3b-6a3e8fbcc464"
    }
}
```

### 6.DescribeDiskQuota

**Action**: DescribeDiskQuota

**描述**：获取云盘配额

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：GET

**请求参数：**

| 参数              | 说明       | 类型   | 是否必传 | 示例        |
| ----------------- | ---------- | ------ | -------- | ----------- |
| AvailableZoneCode | 可用区Code | string | 是       | CN_Suqian_A |

**返回参数**

| 参数        | 类型   | 示例 | 说明             |
| ----------- | ------ | ---- | ---------------- |
| QuotaList   | list   | []   | 配额列表         |
| TotalQuota  | int    | 0    | 总配额,单位:GB   |
| UsedQuota   | int    | 0    | 已用配额,单位:GB |
| FreeQuota   | int    | 0    | 剩余配额,单位:GB |
| DiskFeature | string | SSD  | 云盘类型         |

**请求示例**

```python
def describe_disk_quota():
    """
    获取云盘配额
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "DescribeDiskQuota"
    method = "GET"
    param = {
        "AvailableZoneCode":"CN_Hohhot_B"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    return result
```

**返回示例：**

```json
{
    "Code": "Success",
    "Msg": "获取云盘配额成功！",
    "Data": {
        "QuotaList": [
            {
                "TotalQuota": 10240,
                "UsedQuota": 9760,
                "FreeQuota": 480,
                "DiskFeature": "SSD"
            }
        ]
    },
    "RequestId": "2759cebe146211edb481e454e81c0d47"
}
```

### 7.DescribeDiskList

**Action**: DescribeDiskList

**描述**：获取云盘列表

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：POST GET

**请求参数：**

| 参数              | 说明           | 类型   | 是否必传 | 示例                     |
| ----------------- | -------------- | ------ | -------- | ------------------------ |
| AvailableZoneCode | 可用区Code     | string | 否       | CN_Suqian_A              |
| RegionCode        | 地域Code       | string | 否       | CN_Suqian                |
| DiskIds           | 云盘资源id列表 | string | 否       | '["disk-xx", "disk-xx"]' |
| PageNumber        | 页码           | int    | 否       | 1                        |
| PageSize          | 每页记录数     | int    | 否       | 20                       |

**返回参数**

| 参数                | 类型   | 示例                  | 说明                       |
| ------------------- | ------ | --------------------- | -------------------------- |
| PageNumber          | int    | 1                     | 当前页数                   |
| PageSize            | int    | 1                     | 每页数据条数               |
| TotalCount          | int    | 10                    | 总记录数                   |
| DiskList            | list   | []                    | 云盘列表                   |
| RegionCode          | string | CN_Suqian             | 地域Code                   |
| AvailableZoneCode   | string | CN_Suqian_A           | 可用区Code                 |
| DiskId              | string | disk-qpv6gojrhlsru7lj | 云盘ID                     |
| DiskName            | string | ssd_20220802          | 云盘名称                   |
| Status              | string | running               | 状态code                   |
| StatusDisplay       | string | 使用中                | 状态说明                   |
| DiskFeature         | string | SSD                   | 盘类型                     |
| Size                | int    | 40                    | 盘容量,单位:GB             |
| Property            | string | system                | system:系统盘 data：数据盘 |
| BillingMethod       | string | 0                     | 0:按需计费, 1:包年包月     |
| EcsId               | string | ins-r6g0posrclxrw7dj  | 挂载的实例，未挂载为空     |
| EcsName             | string | test-ntp-ygh          | 挂载实例的名称，未挂载为空 |
| ReleaseWithInstance | int    | 1                     | 是否随实例删除，1:是，0:否 |

**请求示例**

```python
def describe_disk_list():
    """
    获取云盘列表
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "DescribeDiskList"
    method = "GET"
    param = {
        "AvailableZoneCode":"CN_Hohhot_B"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    return result
```

**返回示例：**

```json
{
    "Code": "Success",
    "Msg": "获取云盘列表成功！",
    "Data": {
        "DiskList": [
            {
                "DiskId": "disk-khpw24dr6wcyfzxh",
                "DiskName": "ssd_20220804_01",
                "Size": 64,
                "EcsId": "ins-z684q1prultrf7rj",
                "EcsName": "disk-Ubuntu-013",
                "BillingMethod": "0",
                "ReleaseWithInstance": 1,
                "RegionCode": "CN_Huhhot",
                "AvailableZoneCode": "CN_Hohhot_B",
                "Status": "running",
                "StatusDisplay": "使用中",
                "DiskFeature": "SSD",
                "Property": "system"
            }
        ]
    },
    "PageNumber": 1,
    "PageSize": 1,
    "TotalCount": 1
}
```

### 8.DescribeDisk

**Action**: DescribeDisk

**描述**：获取云盘详情

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：GET

**请求参数：**

| 参数   | 说明   | 类型   | 是否必传 | 示例                  |
| ------ | ------ | ------ | -------- | --------------------- |
| DiskId | 云盘id | string | 是       | disk-qpv6gojrhlsru7lj |

**返回参数**

| 参数                | 类型   | 示例                  | 说明                       |
| ------------------- | ------ | --------------------- | -------------------------- |
| RegionCode          | string | CN_Suqian             | 地域Code                   |
| AvailableZoneCode   | string | CN_Suqian_A           | 可用区Code                 |
| DiskId              | string | disk-qpv6gojrhlsru7lj | 云盘ID                     |
| DiskName            | string | ssd_20220802          | 云盘名称                   |
| Status              | string | running               | 状态code                   |
| StatusDisplay       | string | 使用中                | 状态说明                   |
| DiskFeature         | string | SSD                   | 盘类型                     |
| Size                | int    | 40                    | 盘容量,单位:GB             |
| Property            | string | system                | system:系统盘 data：数据盘 |
| BillingMethod       | string | 0                     | 0:按需计费, 1:包年包月     |
| EcsId               | string | ins-r6g0posrclxrw7dj  | 挂载的实例，未挂载为空     |
| EcsName             | string | test-ntp-ygh          | 挂载实例的名称，未挂载为空 |
| ReleaseWithInstance | int    | 1                     | 是否随实例删除，1:是，0:否 |

**请求示例**

```python
def describe_disk():
    """
    获取云盘详情
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "DescribeDisk"
    method = "GET"
    param = {
        "DiskId":"disk-qpv6gojrhlsru7lj"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    return result
```

**返回示例：**

```json
{
    "Code": "Success",
    "Msg": "获取云盘详情成功！",
    "Data": {
        "DiskInfo": {
                "DiskId": "disk-khpw24dr6wcyfzxh",
                "DiskName": "ssd_20220804_01",
                "Size": 64,
                "EcsId": "ins-z684q1prultrf7rj",  // 挂载的实例，未挂载为空
                "EcsName": "disk-Ubuntu-013",    // 挂载的实例，未挂载为空
                "BillingMethod": "0",
                "ReleaseWithInstance": 1,
                "RegionCode": "CN_Huhhot",
                "AvailableZoneCode": "CN_Hohhot_B",
                "Status": "running",
                "StatusDisplay": "使用中",
                "DiskFeature": "SSD",
                "Property": "system"
            }
    }
}
```

### 9.DescribeEcsAttachDisks

**Action**: DescribeEcsAttachDisks

**描述**：获取实例挂载的云盘信息

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：GET

**请求参数：**

| 参数       | 说明     | 类型   | 是否必传 | 示例                 |
| ---------- | -------- | ------ | -------- | -------------------- |
| InstanceId | 云主机id | string | 是       | ins-z684q1prultrf7rj |

**返回参数**

| 参数                | 类型   | 示例                  | 说明                       |
| ------------------- | ------ | --------------------- | -------------------------- |
| DiskList            | list   | []                    | 云盘列表                   |
| RegionCode          | string | CN_Suqian             | 地域Code                   |
| AvailableZoneCode   | string | CN_Suqian_A           | 可用区Code                 |
| DiskId              | string | disk-qpv6gojrhlsru7lj | 云盘ID                     |
| DiskName            | string | ssd_20220802          | 云盘名称                   |
| Status              | string | running               | 状态code                   |
| StatusDisplay       | string | 使用中                | 状态说明                   |
| DiskFeature         | string | SSD                   | 盘类型                     |
| Size                | int    | 40                    | 盘容量,单位:GB             |
| Property            | string | system                | system:系统盘 data：数据盘 |
| BillingMethod       | string | 0                     | 0:按需计费, 1:包年包月     |
| EcsId               | string | ins-r6g0posrclxrw7dj  | 挂载的实例，未挂载为空     |
| EcsName             | string | test-ntp-ygh          | 挂载实例的名称，未挂载为空 |
| ReleaseWithInstance | int    | 1                     | 是否随实例删除，1:是，0:否 |

**请求示例**

```python
def describe_ecs_attach_disk():
    """
    获取实例挂载的云盘
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "DescribeEcsAttachDisks"
    method = "GET"
    param = {
        "EcsId":"ins-z684q1prultrf7rj"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    return result
```

**返回示例：**

```json
{
    "Code": "Success",
    "Msg": "获取实例挂载的云盘信息成功！",
    "Data": {
        "DiskList": [
            {
                "DiskId": "disk-khpw24dr6wcyfzxh",
                "DiskName": "ssd_20220804_01",
                "Size": 64,
                "EcsId": "ins-z684q1prultrf7rj",
                "EcsName": "disk-Ubuntu-013",
                "BillingMethod": "0",
                "ReleaseWithInstance": 1,
                "RegionCode": "CN_Huhhot",
                "AvailableZoneCode": "CN_Hohhot_B",
                "Status": "running",
                "StatusDisplay": "使用中",
                "DiskFeature": "SSD",
                "Property": "system"
            }
        ]
    }
}
```

### 10.DescribeEvent

**Action**: DescribeEvent

**描述**：获取事件信息

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：GET

**请求参数：**

| 参数    | 说明   | 类型   | 是否必传 | 示例                                 |
| ------- | ------ | ------ | -------- | ------------------------------------ |
| EventId | 事件id | string | 是       | 2d01ed16-1231-11ed-b805-ae32005fa3a1 |

**返回参数**

| 名称               | 类型   | 示例值                               | 描述                       |
| ------------------ | ------ | ------------------------------------ | -------------------------- |
| EventId            | string | 3de9d9f0-8f09-11ec-a494-d2a2d83b77e2 | 事件id                     |
| EventStatus        | string | success                              | 事件状态                   |
| EventStatusDisplay | string | 成功                                 | 事件中文名称               |
| EventType          | string | unmount_disk                         | 事件类型                   |
| EventTypeDisplay   | string | 卸载云盘                             | 事件类型中文名称           |
| CreateTime         | string | 2022-01-16 17:17:20                  | 创建时间                   |
| TaskList           | list   | []                                   | 事件下的任务列表           |
| TaskId             | string | 3e54d714-8f09-11ec-a494-d2a2d83b77e2 | 任务id                     |
| Status             | string | success                              | 任务状态                   |
| StatusDisplay      | string | 成功                                 | 任务中文状态               |
| ResourceId         | string | disk-y6yknvvr64mvn06a                | 任务对应的资源id           |
| UpdateTime         | string | 2022-01-16 17:17:25                  | 任务更新时间               |
| EndTime            | string | 2022-01-16 17:17:30                  | 任务完成时间，未完成则为空 |
| ResourceType       | string | disk                                 | 资源类型                   |
| ResourceDisplay    | string | 云盘                                 | 资源类型中文名称           |
| TaskType           | string | unmount_disk                         | 任务类型                   |
| TaskTypeDisplay    | string | 卸载云盘                             | 任务类型中文名称           |

**请求示例**

```python
def describe_event():
    """
    获取事件信息
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "DescribeEvent"
    method = "GET"
    param = {
        "EventId":"2d01ed16-1231-11ed-b805-ae32005fa3a1"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    return result
```

**返回示例：**

```json
{
    "Code": "Success",
    "Msg": "获取事件信息成功！",
    "Data": {
        "EventId": "2d01ed16-1231-11ed-b805-ae32005fa3a1",
        "EventStatus": "success",
        "EventStatusDisplay": "成功",
        "EventType": "unmount_disk",
        "EventTypeDisplay": "卸载云盘",
        "CreateTime": "2022-08-02 15:03:13",
        "TaskList": [
            {
                "TaskId": "eaea8708-13c5-11ed-9210-3296060c3fb9",
                "Status": "success",
                "StatusDisplay": "成功",
                "ResourceId": "disk-y6yknvvr64mvn06a",
                "CreateTime": "2022-08-04 15:20:28",
                "UpdateTime": "2022-08-04 15:20:41",
                "EndTime": "2022-08-04 15:20:41",
                "ResourceType": "disk",
                "ResourceDisplay": "云盘",
                "TaskType": "unmount_disk",
                "TaskTypeDisplay": "卸载云盘"
            }
        ]
    }
}
```

## 