cck容器集群公开API目录
=================
* [认证方式](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#认证方式)
  * [1.公共请求参数](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#1公共请求参数)
  * [2.签名机制](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#2签名机制)
    * [步骤一：构造规范化请求字符串](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#步骤一构造规范化请求字符串)
    * [步骤二：构造签名字符串](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#步骤二构造签名字符串)
  * [3.获取签名代码](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#2获取签名代码)
* [API概览](#api概览)
    * [1.DescribeTask](#1DescribeTask)
    * [2.DescribeClusters](#2DescribeClusters)
    * [3.DescribeClusterNodes](#3DescribeClusterNodes)
    * [4.DescribeClusterNats](#4DescribeClusterNats)
    * [5.CreateClusterNodes](#5CreateClusterNodes)
    * [6.StartClusterNodes](#6StartClusterNodes)
    * [7.StopClusterNodes](#7StopClusterNodes)
    * [8.DeleteClusterNodes](#8DeleteClusterNodes)

## cck容器集群

### 节点配置表

规格类型

| 规格名称       | 规格配置id   | 支持的配置                                                   |
| -------------- | ------------ | ------------------------------------------------------------ |
| **密集计算型** | CCK.CpuHigh  | [{"cpu":8,"ram":8},{"cpu":16,"ram":16},{"cpu":32,"ram":32},{"cpu":64,"ram":64}] |
| **计算型**     | CCK.Cpu      | [{"cpu":8,"ram":16},{"cpu":16,"ram":32},{"cpu":32,"ram":64},{"cpu":64,"ram":128}] |
| **通用型**     | CCK.Standard | [{"cpu":8,"ram":32},{"cpu":16,"ram":64},{"cpu":32,"ram":128}] |
| **内存型**     | CCK.Memory   | [{"cpu":8,"ram":64},{"cpu":16,"ram":128}]                    |

### 1.DescribeTask

**Action** : DescribeTask

**描述**：查询任务

**请求地址**: https://api.capitalonline.net/cck/v1

**请求方法**: GET

**请求参数**

| 名称   | 类型   | 是否必选 | 示例                                 | 描述   |
| ------ | ------ | -------- | ------------------------------------ | ------ |
| TaskId | string | 是       | d6d2scdr-96f3-4d50-a6b1-6c373d7dfb8s | 集群id |

**返回参数**

| 名称 | 类型   | 示例值     | 描述       |
| ---- | ------ | ---------- | ---------- |
| Code | string | Success    | 错误码     |
| Data | object |            | 返回的数据 |
| Msg  | string | 查询成功！ | 提示信息   |

**Data对象**

| 名称   | 类型   | 示例值 | 描述                   |
| ------ | ------ | ------ | ---------------------- |
| Status | string |        | 任务状态               |
| ErrMsg | string |        | 任务失败时，失败的原因 |

**请求示例：**

```python
def describe_task():
    action = "DescribeTask"
    method = "GET"
    body = {
        "TaskId": "f9ef5c64-fbb5-11ed-a819-9ea198d57e15",
    }

    url = get_signature(action, AK, AccessKeySecret, method, CCK_URL, param=body)
    response = requests.get(url)
    result = response.json()
    print(json.dumps(result, ensure_ascii=False))
```

**返回示例：**

```json
{
    "Code":"Success",
    "Msg":"查询成功",
    "Data":{
        "Status":"Finish"
    },
    "RequestId":"2acc9bdd-6841-449f-9912-0629e8bcca25"
}
```

### 2.DescribeClusters

   **Action** : DescribeClusters

**描述**：查询cck集群列表

**请求地址**: https://api.capitalonline.net/cck/v1

**请求方法**: GET

**请求参数**

| 名称        | 类型   | 是否必选 | 示例                                 | 描述                        |
| ----------- | ------ | -------- | ------------------------------------ | --------------------------- |
| RegionId    | string | 否       | CN_Hongkong_B                        | 区域id与vdc版本产品保持一致 |
| VdcId       | string | 否       | d6d2bf8c-96f3-4d50-a6b1-6c373d7dfb56 | vdc id                      |
| ClusterName | string | 否       | cck-cluster1                         | 集群名称，可模糊匹配        |
| ClusterId   | string | 否       | 96fd21ae-fb8d-11ed-b833-060b6f41d883 | 集群id                      |

**返回参数**

| 名称 | 类型   | 示例值     | 描述       |
| ---- | ------ | ---------- | ---------- |
| Code | string | Success    | 错误码     |
| Data | list   |            | 返回的数据 |
| Msg  | string | 查询成功！ | 提示信息   |

data对象字段

| 名称        | 类型   | 示例值 | 描述                                         |
| ----------- | ------ | ------ | -------------------------------------------- |
| VdcId       | string |        | vdc id                                       |
| VdcName     | string |        | vdc 名称                                     |
| ClusterId   | string |        | 集群id                                       |
| ClusterName | string |        | 集群名称                                     |
| NodeNum     | int    |        | 节点总数量                                   |
| K8sVersion  | string |        | K8s版本                                      |
| HaproxyIp   | string |        | 集群ha的ip                                   |
| Status      | string |        | 集群的状态Ok/Error/Pending/Updating/Creating |
| Domain      | string |        | 集群访问域名                                 |
| Snats       | list   |        | 集群出网网关                                 |
| ErrorMsg    | string |        | 当集群错误时，错误的原因                     |
| CreateTime  | string |        | 创建时间                                     |

Snats对象字段

| 名称       | 类型   | 示例值 | 描述           |
| ---------- | ------ | ------ | -------------- |
| Id         | string |        | 出网关网关id   |
| Name       | string |        | 出网关网关名称 |
| PublicIp   | string |        | 出网网关公网ip |
| PrivateIp  | string |        | 出网网关私网ip |
| UsedNum    | int    |        | nat使用量      |
| CreateTime | string |        | 创建时间       |

**请求示例：**

```python
def describe_clusters():
    action = "DescribeClusters"
    method = "GET"
    body = {
        "ClusterId": "96fd21ae-fb8d-11ed-b833-060b6f41d883"
    }
    url = get_signature(action, AK, AccessKeySecret, method, CCK_URL, param=body)
    response = requests.get(url)
    result = response.json()
    print(json.dumps(result, ensure_ascii=False))
```

**返回示例：**

```json
{
    "Code":"Success",
    "Msg":"查询成功！",
    "Data":[
        {
            "VdcId":"e8dc80d9-f790-4038-b3a7-42b2689113be",
            "VdcName":"vdc-Hongkong",
            "ClusterId":"96fd21ae-fb8d-11ed-b833-060b6f41d883",
            "ClusterName":"cck-Hongkong",
            "NodeNum":4,
            "K8SVersion":"1.19.3",
            "HaproxyIp":"223.255.250.82",
            "Status":"Ok",
            "Domain":"dashboard-5xqmqi.yun-paas.com",
            "ErrorMsg":"",
            "CreateTime":"2023-05-26 14:21:46",
            "Snats":[
                {
                    "Id":"96fda1b0-fb8d-11ed-b833-060b6f41d883",
                    "Name":"default",
                    "PublicIp":"223.255.250.16",
                    "PrivateIp":"10.241.178.10",
                    "UsedNum":4,
                    "CreateTime":"2023-05-26 14:21:46"
                }
            ]
        }
    ],
    "RequestId":"d28362c9-b406-49b9-83c0-025e195fa13f"
}
```



### 3.DescribeClusterNodes

**Action** : DescribeClusterNodes

**描述**：查询集群节点详情

**请求地址**: https://api.capitalonline.net/cck/v1

**请求方法**: GET

**请求参数**

| 名称       | 类型   | 是否必选 | 示例                                 | 描述             |
| ---------- | ------ | -------- | ------------------------------------ | ---------------- |
| ClusterId  | string | 是       | d6d2scdr-96f3-4d50-a6b1-6c373d7dfb8s | 集群id           |
| PageSize   | int    | 否       | 20                                   | 页面大小，默认20 |
| PageNumber | int    | 否       | 1                                    | 页码，默认1      |

**返回参数**

| 名称       | 类型   | 示例值     | 描述       |
| ---------- | ------ | ---------- | ---------- |
| Code       | string | Success    | 错误码     |
| Data       | object |            | 返回的数据 |
| Msg        | string | 查询成功！ | 提示信息   |
| PageSize   | int    | 否         | 页面大小   |
| PageNumber | int    | 否         | 页码       |
| Total      | int    | 否         | 总数       |

**Data对象**

| 名称  | 类型 | 示例值 | 描述       |
| ----- | ---- | ------ | ---------- |
| Nodes | list |        | 节点列表   |
| Total | int  |        | 节点总数量 |

**Nodes对象**

| 名称        | 类型   | 示例值 | 描述                               |
| ----------- | ------ | ------ | ---------------------------------- |
| VdcId       | string |        | vdc id                             |
| VdcName     | string |        | vdc 名称                           |
| NodeId      | string |        | 节点id                             |
| NodeName    | string |        | 节点名称                           |
| Type        | string |        | Master/Worker                      |
| Cpu         | int    |        | cpu核数                            |
| Memory      | int    |        | 内存                               |
| Status      | string |        | Ok/Error/Pending/Updating/Creating |
| Schedulable | bool   |        | 是否可调度                         |
| PrivateIp   | string |        | 节点私网ip                         |
| PublicIp    | string |        | 节点公网ip                         |
| PublicId    | string |        | 公网id                             |
| SnatId      | string |        | 节点出网网关id                     |
| SnatName    | string |        | 节点出网网关名称                   |
| CreateTime  | string |        | 创建时间                           |

**请求示例：**

```python
def describe_cluster_nodes():
    action = "DescribeClusterNodes"
    method = "GET"
    body = {
        "ClusterId": "96fd21ae-fb8d-11ed-b833-060b6f41d883",
    }
    url = get_signature(action, AK, AccessKeySecret, method, CCK_URL, param=body)
    response = requests.get(url)
    result = response.json()
    print(json.dumps(result, ensure_ascii=False))
```

**返回示例：**

```json
{
    "Code":"Success",
    "Msg":"查询成功！",
    "Data":{
        "Nodes":[
            {
                "VdcId":"e8dc80d9-f790-4038-b3a7-42b2689113be",
                "VdcName":"vdc-Hongkong",
                "NodeId":"9721908e-fb8d-11ed-b833-060b6f41d883",
                "NodeName":"cck-Hongkong-master001",
                "Type":"Master",
                "Cpu":8,
                "Memory":32,
                "Status":"Ok",
                "Schedulable":false,
                "PrivateIp":"10.241.178.11",
                "PublicIp":"",
                "PublicId":"",
                "SnatId":"96fda1b0-fb8d-11ed-b833-060b6f41d883",
                "SnatName":"default",
                "CreateTime":"2023-05-26 14:21:46"
            },
            {
                "VdcId":"e8dc80d9-f790-4038-b3a7-42b2689113be",
                "VdcName":"vdc-Hongkong",
                "NodeId":"9732a856-fb8d-11ed-b833-060b6f41d883",
                "NodeName":"cck-Hongkong-master002",
                "Type":"Master",
                "Cpu":8,
                "Memory":32,
                "Status":"Ok",
                "Schedulable":false,
                "PrivateIp":"10.241.178.12",
                "PublicIp":"",
                "PublicId":"",
                "SnatId":"96fda1b0-fb8d-11ed-b833-060b6f41d883",
                "SnatName":"default",
                "CreateTime":"2023-05-26 14:21:46"
            },
            {
                "VdcId":"e8dc80d9-f790-4038-b3a7-42b2689113be",
                "VdcName":"vdc-Hongkong",
                "NodeId":"974451a0-fb8d-11ed-b833-060b6f41d883",
                "NodeName":"cck-Hongkong-master003",
                "Type":"Master",
                "Cpu":8,
                "Memory":32,
                "Status":"Ok",
                "Schedulable":false,
                "PrivateIp":"10.241.178.13",
                "PublicIp":"",
                "PublicId":"",
                "SnatId":"96fda1b0-fb8d-11ed-b833-060b6f41d883",
                "SnatName":"default",
                "CreateTime":"2023-05-26 14:21:47"
            },
            {
                "VdcId":"e8dc80d9-f790-4038-b3a7-42b2689113be",
                "VdcName":"vdc-Hongkong",
                "NodeId":"975a96ea-fb8d-11ed-b833-060b6f41d883",
                "NodeName":"cck-Hongkong-worker001",
                "Type":"Worker",
                "Cpu":8,
                "Memory":32,
                "Status":"Ok",
                "Schedulable":true,
                "PrivateIp":"10.241.178.14",
                "PublicIp":"",
                "PublicId":"",
                "SnatId":"96fda1b0-fb8d-11ed-b833-060b6f41d883",
                "SnatName":"default",
                "CreateTime":"2023-05-26 14:21:47"
            }
        ],
        "Total":4
    },
    "PageSize":20,
    "PageNumber":1,
    "Total":4,
    "RequestId":"2b1b4a2d-ee2d-4763-9a89-ef24d558c2c8"
}
```

### 4.DescribeClusterNats

**Action** : DescribeClusterNats

**描述**：查询集群网关

**请求地址**: https://api.capitalonline.net/cck/v1

**请求方法**: GET

**请求参数**

| 名称      | 类型   | 是否必选 | 示例                                 | 描述   |
| --------- | ------ | -------- | ------------------------------------ | ------ |
| ClusterId | string | 是       | d6d2scdr-96f3-4d50-a6b1-6c373d7dfb8s | 集群id |

**返回参数**

| 名称 | 类型   | 示例值     | 描述       |
| ---- | ------ | ---------- | ---------- |
| Code | string | Success    | 错误码     |
| Data | list   |            | 返回的数据 |
| Msg  | string | 查询成功！ | 提示信息   |

**Data对象**

| 名称       | 类型   | 示例值 | 描述        |
| ---------- | ------ | ------ | ----------- |
| Id         | string |        | nat网关id   |
| Name       | string |        | nat网关名称 |
| ClusterId  | string |        | 集群id      |
| PublicIp   | string |        | 公网ip      |
| PrivateIp  | string |        | 私网ip      |
| UsedNum    | int    |        | 使用量      |
| CreateTime | string |        | 创建时间    |
| UpdateTime | string |        | 更新时间    |

**请求示例：**

```python
def describe_cluster_nats():
    action = "DescribeClusterNats"
    method = "GET"
    body = {
        "ClusterId": "96fd21ae-fb8d-11ed-b833-060b6f41d883",
    }
    url = get_signature(action, AK, AccessKeySecret, method, CCK_URL, param=body)
    response = requests.get(url)
    result = response.json()
    print(json.dumps(result, ensure_ascii=False))
```

**返回示例：**

```json
{
    "Code":"Success",
    "Msg":"查询成功！",
    "Data":[
        {
            "Id":"96fda1b0-fb8d-11ed-b833-060b6f41d883",
            "Name":"default",
            "ClusterId":"96fd21ae-fb8d-11ed-b833-060b6f41d883",
            "VmId":"eeb424e3-998e-4380-8fcf-22deb418e718",
            "PublicIp":"223.255.250.16",
            "PrivateIp":"10.241.178.10",
            "UsedNum":4,
            "CreateTime":"2023-05-26 14:21:46",
            "UpdateTime":"2023-05-26 14:26:39"
        }
    ],
    "RequestId":"0b3d9916-5a37-435e-8cc1-1278181cfc12"
}
```

### 5.CreateClusterNodes

**Action**: CreateClusterNodes

**描述**：批量创建cck集群worker节点

**请求地址**: https://api.capitalonline.net/cck/v1

**请求方法**: POST

**请求参数**

| 名称         | 类型   | 是否必选 | 示例                                     | 描述                                                         |
| ------------ | ------ | -------- | ---------------------------------------- | ------------------------------------------------------------ |
| ClusterId    | string | 是       | 1b68fbe2-9c4d-4c1e-a1f8-6a25a29df2d3     | 集群id                                                       |
| Cpu          | int    | 是       | 8                                        | 节点cpu核数                                                  |
| Memory       | int    | 是       | 16                                       | 节点内存大小                                                 |
| AttachDisks  | list   | 是       |                                          | 节点的数据盘，最少要有一块数据盘                             |
| Num          | int    | 是       | 3                                        | 创建的节点数量                                               |
| Password     | string | 是       |                                          | 节点的密码                                                   |
| Type         | string | 是       | Worker                                   | 节点类型：Mater/Worker   目前只支持Worker                    |
| InstanceType | string | 是       | CCK.Memory                               | 节点配置类型，参考 [节点配置表](#节点配置表)                 |
| PublicId     | string | 否       | 11d31d29-5897-4a71-a656-af6e59ddfe3c     | 公网id，与SnatIds二选一                                      |
| Lsb          | string | 否       | Ubuntu                                   | 节点的操作系统Ubuntu，默认Ubuntu，当前只支持Ubuntu           |
| SnatIds      | list   | 否       | ["9cfb7b80-ee10-11ed-b152-de8c6b7a0fa0"] |                                                              |
| SnatType     | int    | 否       | 1                                        | snat出网网关类型，默认1。0:不指定snat网关，自动从默认网关中选择一个最近最少使用的。1：使用指定的出网网关，SnatIds必须是合法的出网网关id |

**AttachDisks**对象

| 名称     | 类型   | 是否必选 | 示例     | 描述                          |
| -------- | ------ | -------- | -------- | ----------------------------- |
| DiskType | string | 是       | HighDisk | HighDisk:性能型，当前只有一种 |
| DiskSize | int    | 否       | 100      | 100-4000GB，步长100。默认100  |
| Iops     | int    | 否       | 3000     | 当前取值3000，默认3000        |

**返回参数**

| 名称 | 类型   | 示例值                                              | 描述       |
| ---- | ------ | --------------------------------------------------- | ---------- |
| Code | string | Success                                             | 错误码     |
| Data | object | { "TaskId":"d154475e-e70f-41b5-b464-4ebf279622c6" } | 返回的数据 |
| Msg  | string | 节点扩容任务已下发，请等待完成！                    | 提示信息   |

**请求示例：**

```python
def create_cluster_nodes():
    action = "CreateClusterNodes"
    method = "POST"
    body = {
        "ClusterId": "96fd21ae-fb8d-11ed-b833-060b6f41d883",
        "Cpu": 8,
        "Memory": 64,
        "AttachDisks": [{
            "DiskType": "HighDisk",
            "DiskSize": 100,
            "Iops": 3000
        }],
        "Num": 1,
        "Password": "cck@passHonkong1",
        "Type": "Worker",
        "InstanceType": "CCK.Memory",
        "Command": "ZWNobyAiMTIzIiA+IC9yb290LzEudHh0",
        "PublicId": "",
        "SnatIds": [],
        "SnatType": 0,
        "Lsb": "Ubuntu"
    }
    url = get_signature(action, AK, AccessKeySecret, method, CCK_URL, param=None)
    response = requests.post(url, json=body)
    result = response.json()
    print(json.dumps(result, ensure_ascii=False))
```

**返回示例：**

```json
{
    "Code":"Success",
    "Msg":"节点扩容任务已下发，请等待完成！",
    "Data":{
        "TaskId":"78e534de-fbb7-11ed-9398-9ea198d57e15"
    },
    "RequestId":"4d23aa0d-66c8-46de-a738-e998b96013bd"
}
```

### 6.StartClusterNodes

**Action** : StartClusterNodes

**描述**：cck集群worker节点批量开机

**请求地址**: https://api.capitalonline.net/cck/v1

**请求方法**: POST

**请求参数**

| 名称      | 类型   | 是否必选 | 示例                                     | 描述 |
| --------- | ------ | -------- | ---------------------------------------- | ---- |
| ClusterId | string | 是       | 96fd21ae-fb8d-11ed-b833-060b6f41d883     |      |
| NodeIds   | list   | 是       | ["d6d2bf8c-96f3-4d50-a6b1-6c373d7dfb56"] |      |

**返回参数**

| 名称 | 类型   | 示例值                                            | 描述       |
| ---- | ------ | ------------------------------------------------- | ---------- |
| Code | string | Success                                           | 错误码     |
| Data | object | {"TaskId":"3b0a0238-eede-11ed-8815-4e97c0f3d95d"} | 返回的数据 |
| Msg  | string | 节点批量开机任务已下发，请等待执行！              | 提示信息   |

**请求示例：**

```python
def start_cluster_nodes():
    action = "StartClusterNodes"
    method = "POST"
    body = {
        "ClusterId": "96fd21ae-fb8d-11ed-b833-060b6f41d883",
        "NodeIds": ["975a96ea-fb8d-11ed-b833-060b6f41d883"]
    }
    url = get_signature(action, AK, AccessKeySecret, method, CCK_URL, param=None)
    response = requests.post(url, json=body)
    result = response.json()
    print(json.dumps(result, ensure_ascii=False))

```

**返回示例：**

```json
{
    "Code":"Success",
    "Msg":"节点批量开机任务已下发，请等待执行！",
    "Data":{
        "TaskId":"f9ef5c64-fbb5-11ed-a819-9ea198d57e15"
    },
    "RequestId":"62de1628-ef3a-452f-816e-a4854c867c2c"
}
```

### 7.StopClusterNodes

**Action** : StopClusterNodes

**描述**：cck集群worker节点批量关机

**请求地址**: https://api.capitalonline.net/cck/v1

**请求方法**: POST

**请求参数**

| 名称      | 类型   | 是否必选 | 示例                                     | 描述 |
| --------- | ------ | -------- | ---------------------------------------- | ---- |
| ClusterId | string | 是       | 96fd21ae-fb8d-11ed-b833-060b6f41d88      |      |
| NodeIds   | list   | 是       | ["975a96ea-fb8d-11ed-b833-060b6f41d883"] |      |

**返回参数**

| 名称 | 类型   | 示例值                                            | 描述       |
| ---- | ------ | ------------------------------------------------- | ---------- |
| Code | string | Success                                           | 错误码     |
| Data | object | {"TaskId":"3b0a0238-eede-11ed-8815-4e97c0f3d95d"} | 返回的数据 |
| Msg  | string | 节点批量关机任务已下发，请等待执行！              | 提示信息   |

**请求示例：**

```python
def stop_cluster_nodes():
    action = "StopClusterNodes"
    method = "POST"
    body = {
        "ClusterId": "96fd21ae-fb8d-11ed-b833-060b6f41d883",
        "NodeIds": ["975a96ea-fb8d-11ed-b833-060b6f41d883"]
    }
    url = get_signature(action, AK, AccessKeySecret, method, CCK_URL, param=None)
    response = requests.post(url, json=body)
    result = response.json()
    print(json.dumps(result, ensure_ascii=False))

```

**返回示例：**

```json
{
    "Code":"Success",
    "Msg":"节点批量关机任务已下发，请等待执行！",
    "Data":{
        "TaskId":"ab738e02-fbb5-11ed-9dcc-5ad8d6a7f4dc"
    },
    "RequestId":"94249551-f608-46c0-8a12-45915a49f0ee"
}
```

### 8.DeleteClusterNodes

**Action** : DeleteClusterNodes

**描述**：cck集群worker节点批量回收

**请求地址**: https://api.capitalonline.net/cck/v1

**请求方法**: POST

**请求参数**

| 名称      | 类型   | 是否必选 | 示例                                     | 描述 |
| --------- | ------ | -------- | ---------------------------------------- | ---- |
| ClusterId | string | 是       | 96fd21ae-fb8d-11ed-b833-060b6f41d883     |      |
| NodeIds   | list   | 是       | ["975a96ea-fb8d-11ed-b833-060b6f41d883"] |      |

**返回参数**

| 名称 | 类型   | 示例值                                            | 描述       |
| ---- | ------ | ------------------------------------------------- | ---------- |
| Code | string | Success                                           | 错误码     |
| Data | object | {"TaskId":"3b0a0238-eede-11ed-8815-4e97c0f3d95d"} | 返回的数据 |
| Msg  | string | 节点批量回收任务已下发，请等待执行！              | 提示信息   |

**请求示例：**

```python
def delete_cluster_nodes():
    action = "DeleteClusterNodes"
    method = "POST"
    body = {
        "ClusterId": "96fd21ae-fb8d-11ed-b833-060b6f41d883",
        "NodeIds": ["975a96ea-fb8d-11ed-b833-060b6f41d883"]
    }
    url = get_signature(action, AK, AccessKeySecret, method, CCK_URL, param=None)
    response = requests.post(url, json=body)
    result = response.json()
    print(json.dumps(result, ensure_ascii=False))
```

**返回示例：**

```json
{
    "Code":"Success",
    "Msg":"节点批量回收任务已下发，请等待执行！",
    "Data":{
        "TaskId":"d6bf9040-fbb7-11ed-9398-9ea198d57e15"
    },
    "RequestId":"da0260a1-07e4-4db2-8017-85108fa5c715"
}
```

