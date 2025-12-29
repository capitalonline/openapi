# Nas

### 1.OpenNasService

**Action**: OpenNasService

**描述**:  开通NAS服务

**请求地址**：api.capitalonline.net/nas/v1

**请求方法**：POST

**请求参数**：

无

**返回参数**：

| 参数    | 类型   | 示例            | 说明               |
| ------- | ------ | --------------- | ------------------ |
| Code    | string | success         | 返回码对应基础信息 |
| Message | string | 开通NAS服务成功 | 返回详细描述信息   |

**调用代码示例**：

```python
def open_nas():
    """
    开通nas服务
    @params: 
    """
    nas_url = "http://api.capitalonline.net/nas/v1"
    action = "OpenNasService"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, nas_url)
    res = requests.post(url)
    result = json.loads(res.content)
    return result
```

**返回示例**：

```json
{
    "Code": "Success",
    "Msg": "nas开通成功！",
    "Data": {},
    "RequestId": "8a55f46ddad011ee85800456e5321350"
}
```

### 2.DescribeRegions

**Action**: DescribeRegions

**描述**:  查询NAS可以使用的地域及可用区

**请求地址**：api.capitalonline.net/nas/v1

**请求方法**：GET

**请求参数**：

| 参数           | 说明       | 类型     | 是否必传 | 示例                            |
| -------------- | ---------- | -------- | -------- | ------------------------------- |
| FileSystemType | string     | standard | 否       | standard:通用型，默认为standard |
| PageNumber     | 页码       | int      | 否       | 1，不传值默认为1                |
| PageSize       | 每页记录数 | int      | 否       | 20，不传值默认为所有            |

**返回参数**：

| 参数       | 类型 | 示例     | 说明         |
| ---------- | ---- | -------- | ------------ |
| PageNumber | int  | 1        | 当前页数     |
| PageSize   | int  | 1        | 每页数据条数 |
| TotalCount | int  | 10       | 总记录数     |
| Regions    | list | object[] | 地域列表     |

Object参数为：

| 参数       | 类型   | 示例                                 | 说明       |
| ---------- | ------ | ------------------------------------ | ---------- |
| RegionId   | string | 39c6ed64-8d5f-11ec-9247-5293695d0ddd | 地域ID     |
| RegionCode | String | CN_Huhhot                            | 地域Code   |
| RegionName | String | 呼和浩特                             | 地域名称   |
| AZList     | list   | Object[]                             | 可用区列表 |

其中AZList对应的参数为：

| 参数              | 类型   | 示例                                 | 说明                                                         |
| ----------------- | ------ | ------------------------------------ | ------------------------------------------------------------ |
| AzId              | string | f7c3c7a6-8d5f-11ec-9311-5293695d0ddd | 可用区ID                                                     |
| AvailableZoneCode | String | CN_Hohhot_B                          | 可用区Code（参考[附件一](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#%E9%99%84%E4%BB%B6%E4%B8%80)RegionId字段） |
| AzName            | String | 呼和浩特B                            | 可用区名称                                                   |

**返回参数**：

| 参数    | 类型   | 示例            | 说明               |
| ------- | ------ | --------------- | ------------------ |
| Code    | string | success         | 返回码对应基础信息 |
| Message | string | 开通NAS服务成功 | 返回详细描述信息   |

**调用代码示例**：

```python
def describe_regions():
    """
    显示区域列表
    @params: 
    """
    nas_url = "http://api.capitalonline.net/nas/v1"
    action = "DescribeRegions"
    method = "GET"
    body = {
        "FileSystemType": "standard",
        "PageNumber": 1,
        "PageSize": 5
    }
    url = get_signature(action, AK, AccessKeySecret, method, nas_url, param=body)
    res = requests.get(url)
    result = json.loads(res.content)
    return result
```

**返回示例**：

```json
{
    "Code": "Success",
    "Msg": "查询nas地域成功！",
    "Data": {
        "PageNumber": 1,
        "PageSize": 1,
        "TotalCount": 1,
        "Regions": [
            {
                "RegionId": "339baef4-c76f-11eb-b5be-5e439efe35c4",
                "RegionName": "石家庄2",
                "AzList": [
                    {
                        "AzId": "c79d830f-06b9-4e83-96b0-24aa2460867a",
                        "AzName": "石家庄F",
                        "AvailableZoneCode": "CN_SJZ_B"
                    }
                ],
                "RegionCode": "CN_SJZ"
            }
        ]
    },
    "RequestId": "637c4ecddac911eeb42b0456e5321350"
}
```

### 3.DescribeFileSystems

**Action**: DescribeFileSystems

**描述**:  查询文件系统信息

**请求地址**：api.capitalonline.net/nas/v1

**请求方法**：GET

**请求参数**：

| 参数              | 说明                                                         | 类型   | 是否必传 | 示例                                 |
| ----------------- | ------------------------------------------------------------ | ------ | -------- | ------------------------------------ |
| AvailableZoneCode | 可用区Code（参考[附件一](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#%E9%99%84%E4%BB%B6%E4%B8%80)RegionId字段） | string | 否       | CN_Suqian_A                          |
| RegionCode        | 地域Code                                                     | string | 否       | CN_Suqian                            |
| FileSystemIds     | 文件系统ID                                                   | string | 否       | nas-123,nas-324                      |
| VpcId             | 私有网络ID                                                   | string | 否       | 2efde1b2-76cf-11ed-aae3-46c53bbd2344 |
| PageNumber        | 页码                                                         | int    | 否       | 1，不传值默认为1                     |
| PageSize          | 每页记录数                                                   | int    | 否       | 20，不传值默认为所有                 |

**返回参数**：

| 参数        | 类型 | 示例     | 说明         |
| ----------- | ---- | -------- | ------------ |
| PageNumber  | int  | 1        | 当前页数     |
| PageSize    | int  | 1        | 每页数据条数 |
| TotalCount  | int  | 10       | 总记录数     |
| FileSystems | list | object[] | 文件系统列表 |



Object参数为：

| 参数              | 类型     | 示例                                 | 说明                                                         |
| ----------------- | -------- | ------------------------------------ | ------------------------------------------------------------ |
| RegionCode        | string   | CN_Suqian                            | 地域Code                                                     |
| AvailableZoneCode | string   | CN_Suqian_A                          | 可用区Code（参考[附件一](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#%E9%99%84%E4%BB%B6%E4%B8%80)RegionId字段） |
| FileSystemId      | string   | nas-**                               | 文件系统ID                                                   |
| FileSystemName    | string   | nas-**                               | 文件系统名称                                                 |
| Status            | string   | Running                              | 文件系统状态                                                 |
| FileSystemType    | string   | standard                             | standard:通用型                                              |
| Capacity          | int      | 1024                                 | 文件系统容量，单位为GB                                       |
| MeteredSize       | Long     | 1611661312                           | 文件系统使用量，为当前最新采集的使用量数据，单位为Byte       |
| ProtocolType      | string   | NFS                                  | NFS：NFS文件协议，SMB：SMB文件协议                           |
| VpcId             | string   | 2efde1b2-76cf-11ed-aae3-46c53bbd2344 | VPC ID                                                       |
| VpcName           | String   | VPC名称                              | VPC 名称                                                     |
| SubnetId          | String   | 2f048df0-76cf-11ed-aae3-46c53bbd46d9 | 子网ID                                                       |
| SubnetName        | String   | 子网名称                             | 子网名称                                                     |
| MountedPath       | List     | ["10.26.0.38:/1a8c9123"]             | 挂载地址                                                     |
| BillingMethod     | string   | 0                                    | 计费方式，0:按需计费                                         |
| CreateTime        | datetime | 2022-07-22 16:41:28                  | 创建时间                                                     |

**调用代码示例**：

```python
def describe_file_systems():
    """
    显示文件系统列表
    @params: 
    """
    nas_url = "http://api.capitalonline.net/nas/v1"
    action = "DescribeFileSystems"
    method = "GET"
    body = {
        "AvailableZoneCode": "CN_SJZ_B",
        "RegionCode": "CN_SJZ",
        "FileSystemIds": "nas-r67erbfs943444tm,nas-lr8src9syfk7iw8m",
        "VpcId": "VpcId",
        "PageNumber": 1,
        "PageSize": 5
    }
    url = get_signature(action, AK, AccessKeySecret, method, nas_url, param=body)
    res = requests.get(url)
    result = json.loads(res.content)
    return result
```

**返回示例**：

```json
{
    "Code": "Success",
    "Msg": "查询nas列表成功！",
    "Data": {
        "FileSystems": [
            {
                "AvailableZoneCode": "CN_SJZ_B",
                "RegionCode": "CN_SJZ",
                "FileSystemIds": "nas-r67erbfs943444tm",
                "FileSystemName": "nas-r67erbfs943444tm",
                "Status": "running",
                "FileSystemType": "文件存储-通用型",
                "Capacity": 100.0,
                "MeteredSize": 0,
                "ProtocolType": "NFS",
                "VpcId": "e3f66ae0-b8d6-11ee-a6f1-b6e5ad6f00f4",
                "VpcName": "EKS-TEST",
                "SubnetId": "e3f8b778-b8d6-11ee-a6f1-b6e5ad6f00f4",
                "SubnetName": "EKS-SUB1",
                "MountedPath": [
                    "10.33.24.32:/ecf199e5"
                ],
                "BillingMethod": "0",
                "CreateTime": "2024-03-01T10:11:41"
            },
            {
                "AvailableZoneCode": "CN_SJZ_B",
                "RegionCode": "CN_SJZ",
                "FileSystemIds": "nas-lr8src9syfk7iw8m",
                "FileSystemName": "nas-lr8src9syfk7iw8m",
                "Status": "building",
                "FileSystemType": "文件存储-性能型",
                "Capacity": 100.0,
                "MeteredSize": 0,
                "ProtocolType": "NFS",
                "VpcId": "e3f66ae0-b8d6-11ee-a6f1-b6e5ad6f00f4",
                "VpcName": "EKS-TEST",
                "SubnetId": "e3f8b778-b8d6-11ee-a6f1-b6e5ad6f00f4",
                "SubnetName": "EKS-SUB1",
                "MountedPath": [
                    "10.33.24.23"
                ],
                "BillingMethod": "",
                "CreateTime": "2024-02-04T15:56:42"
            }
        ],
        "PageNumber": 1,
        "PageSize": 20,
        "TotalCount": 2
    },
    "RequestId": "c7fce8b5daca11ee850c0456e5321350"
}
```

### 4.CreateFileSystem

**Action**: CreateFileSystem

**描述**:  创建一个文件系统

**请求地址**：api.capitalonline.net/nas/v1

**请求方法**：POST

**请求参数**：

| 参数              | 说明                                                         | 类型   | 是否必传 | 示例                                 |
| ----------------- | ------------------------------------------------------------ | ------ | -------- | ------------------------------------ |
| AvailableZoneCode | 可用区Code（参考[附件一](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#%E9%99%84%E4%BB%B6%E4%B8%80)RegionId字段） | string | 是       | CN_Suqian_A                          |
| FileSystemType    | 文件系统类型,standard:通用型                                 | string | 是       | standard                             |
| ProtocolType      | NFS：NFS文件协议，SMB：SMB文件协议                           | String | 是       | NFS                                  |
| VpcId             | VPC ID                                                       | String | 是       | 2efde1b2-76cf-11ed-aae3-46c53bbd2344 |
| SubnetId          | 子网ID                                                       | string | 是       | 2f048df0-76cf-11ed-aae3-46c53bbd46d9 |

**返回参数**：

| 参数         | 类型   | 示例                                 | 说明       |
| ------------ | ------ | ------------------------------------ | ---------- |
| EventId      | String | 11c4ad90-122c-11ed-b996-7ae483eaf4a2 | 事件ID     |
| FileSystemId | String | nas-**                               | 文件系统ID |

**调用代码示例**：

```python
def create_file_system():
    """
    创建文件系统
    @params: 
    """
    nas_url = "http://api.capitalonline.net/nas/v1"
    action = "CreateFileSystem"
    method = "POST"
    body = {
        "AvailableZoneCode": "CN_SJZ_B",
        "FileSystemType": "standard",
        "ProtocolType": "NFS",
        "VpcId": "VpcId",
        "SubnetId": "SubnetId"
    }
    url = get_signature(action, AK, AccessKeySecret, method, nas_url)
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    return result
```

**返回示例**：

```json
{
    "Code": "Success",
    "Msg": "创建nas成功！",
    "Data": {
        "EventId": "0b14e376-d771-11ee-bfd7-0456e5321350",
        "NasId": "nas-r67erbfs943444tm",
        "FileSystemId": "nas-r67erbfs943444tm"
    },
    "RequestId": "04affc05d77111ee88920456e5321350"
}
```

### 5.ModifyFileSystem

**Action**: ModifyFileSystem

**描述**:  修改一个文件系统

**请求地址**：api.capitalonline.net/nas/v1

**请求方法**：POST

**请求参数**：

| 参数           | 说明         | 类型   | 是否必传 | 示例                                                         |
| -------------- | ------------ | ------ | -------- | ------------------------------------------------------------ |
| FileSystemId   | 文件系统ID   | string | 是       | nas-**                                                       |
| FileSystemName | 文件系统名称 | string | 是       | 文件系统名称，2-128个字符，只允许大小写字母或者中文和数字、_或-,以大小写字母或中文开头 |

**返回参数**：

| 参数 | 类型   | 示例   | 说明 |
| ---- | ------ | ------ | ---- |
| code | String | nas-** |      |

**调用代码示例**：

```python
def modify_file_system():
    """
    更改文件系统名称
    @params: 
    """
    nas_url = "http://api.capitalonline.net/nas/v1"
    action = "ModifyFileSystem"
    method = "POST"
    body = {
        "FileSystemId": "nas-r67erbfs943444tm",
        "FileSystemName": "test"
    }
    url = get_signature(action, AK, AccessKeySecret, method, nas_url)
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    return result
```

**返回示例**：

```json
{
    "Code": "Success",
    "Msg": "修改nas成功！",
    "Data": {},
    "RequestId": "8a55f46ddad011ee85800456e5321350"
}
```

### 6.DeleteFileSystem

**Action**: DeleteFileSystem

**描述**:  删除文件系统

**请求地址**：api.capitalonline.net/nas/v1

**请求方法**：POST

**请求参数**：

| 参数          | 说明       | 类型 | 是否必传 | 示例                        |
| ------------- | ---------- | ---- | -------- | --------------------------- |
| FileSystemIds | 文件系统ID | list | 是       | ["nas-11....","nas-12...."] |

**返回参数**：

| 参数    | 类型   | 示例                                 | 说明   |
| ------- | ------ | ------------------------------------ | ------ |
| EventId | String | 11c4ad90-122c-11ed-b996-7ae483eaf4a2 | 事件ID |

**调用代码示例**：

```python
def delete_file_system():
    """
    删除文件系统
    @params: 
    """
    nas_url = "http://api.capitalonline.net/nas/v1"
    action = "DeleteFileSystem"
    method = "POST"
    body = {
        "FileSystemIds": ["nas-r67erbfs943444tm"]
    }
    url = get_signature(action, AK, AccessKeySecret, method, nas_url)
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    return result
```

**返回示例**：

```json
{
    "Code": "Success",
    "Msg": "删除nas成功！",
    "Data": {
        "EventId": "c64e21ea-dad0-11ee-8f63-0456e5321350"
    },
    "RequestId": "c4663843dad011eebb7c0456e5321350"
}
```
