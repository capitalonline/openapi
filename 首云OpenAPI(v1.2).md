
目录
=================

   * [首云公开API文档](#首云公开api文档)
      * [认证方式](#认证方式)
         * [1.公共请求参数](#1公共请求参数)
         * [2.签名机制](#2签名机制)
            * [步骤一：构造规范化请求字符串](#步骤一构造规范化请求字符串)
            * [步骤二：构造签名字符串](#步骤二构造签名字符串)
         * [3.获取签名代码](#2获取签名代码)
      * [实例相关](#实例相关)
         * [1.CreateInstance](#1createinstance)
         * [2.DeleteInstance](#2deleteinstance)
         * [3.StopInstance](#3stopinstance)
         * [4.RebootInstance](#4rebootinstance)
         * [5.ModifyInstanceChargeType](#5modifyinstancechargetype)
         * [6.ModifyInstanceSpec](#6modifyinstancespec)
         * [7.CreateDisk](#7createdisk)
         * [8.ResizeDisk](#8resizedisk)
         * [9.DeleteDisk](#9deletedisk)
         * [10.ResetImage](#10resetimage)
         * [11.DescribeInstances](#11describeinstances)
         * [12.ConnectNetworkInterface](#12connectnetworkinterface)
         * [13.DisconnectNetworkInterface](#13disconnectnetworkinterface)
         * [14.ModifyIpAddress](#14modifyipaddress)
         * [15.DescribeInstanceMonitor](#15describeinstancemonitor)
      * [安全组相关](#安全组相关)
         * [1.CreateSecurityGroup](#1createsecuritygroup)
         * [2.DeleteSecurityGroup](#2deletesecuritygroup)
         * [3.ForceDeleteSecurityGroup](#3forcedeletesecuritygroup)
         * [4.DescribeSecurityGroupAttribute](#4describesecuritygroupattribute)
         * [5.ModifySecurityGroupAttribute](#5modifysecuritygroupattribute)
         * [6.DescribeSecurityGroups](#6describesecuritygroups)
         * [7.AddSecurityGroupRule](#7addsecuritygrouprule)
         * [8.RemoveSecurityGroupRule](#8removesecuritygrouprule)
         * [9.ModifySecurityGroupRule](#9modifysecuritygrouprule)
         * [10.JoinSecurityGroup](#10joinsecuritygroup)
         * [11.LeaveSecurityGroup](#11leavesecuritygroup)
         * [12.ModifySecurityGroupRulePriority](#12modifysecuritygrouprulepriority)
      * [模板相关](#模板相关)
         * [1.CreateTemplate](#1createtemplate)
         * [2.DeleteTemplate](#2deletetemplate)
         * [3.SyncTemplate](#3synctemplate)
         * [4.DescribeTemplateInfo](#4describetemplateinfo)
      * [虚拟数据中心相关](#虚拟数据中心相关)
         * [1.DescribeVdc](#1describevdc)
         * [2.CreateVdc](#2createvdc)
         * [3.DeleteVdc](#3deletevdc)
         * [4.CreatePublicNetwork](#4createpublicnetwork)
         * [5.CreatePrivateNetwork](#5createprivatenetwork)
         * [6.ModifyPublicNetwork](#6modifypublicnetwork)
         * [7.AddPublicIp](#7addpublicip)
         * [8.DeletePublicIp](#8deletepublicip)
         * [9.DeletePublicNetwork](#9deletepublicnetwork)
         * [10.DeletePrivateNetwork](#10deleteprivatenetwork)
         * [11.RenewPublicNetwork](#11renewpublicnetwork)
         * [12.DescribeBandwidthTraffic](#12describebandwidthtraffic)
      * [账单相关](#账单相关)
         * [1.DescribeBill](#1describebill)
         * [2.DescribeBillInfo](#2describebillinfo)
      * [冷云计量相关](#冷云计量相关)
         * [1.GetMetering](#1GetMetering)
      * [其他公共接口](#其他公共接口)
         * [1.DescribeAvailableResource](#1describeavailableresource)
         * [2.DescribeTask](#2describetask)
      * [附件一](#附件一)
            * [节点名称](#节点名称)
      * [附件二](#附件二)
            * [主机类型](#主机类型)
      * [附件三](#附件三)
            * [带宽类型](#带宽类型)
      * [附件四](#附件四)
            * [公共模板](#公共模板)
      * [示例](#示例)
         * [1.获取请求url](#1获取请求url)
         * [4.创建云主机实例](#4创建云主机实例)
         * [5.修改公网带宽](#5修改公网带宽)
         * [6.修改云主机实例计费类型](#6修改云主机实例计费类型)
         * [7.获取任务状态](#7获取任务状态)
         * [8.定制模板](#8定制模板)


# 首云公开API文档

## 认证方式

### 1.公共请求参数

| 名称             | String | 是否必填 | 描述                                                         |
| ---------------- | ------ | -------- | ------------------------------------------------------------ |
| Action           | String | 是       | API 的动作名称                                               |
| AccessKeyId      | String | 是       | 访问密钥 ID。AccessKey 用于调用 AP                           |
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

### 2.获取签名代码

```python
def percentEncode(str):
  	"""将特殊转义字符替换"""
    res = urllib.quote(str.decode(sys.stdin.encoding).encode('utf8'), '') 
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
    return signature
```



## 实例相关

### 1.CreateInstance

​	**Action：CreateInstance** 

​	**描述** 创建一台或多台按量付费或者包年包月云服务器。

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST** 

​	**请求参数:** 

| 名称               | 类型     | 是否必选 | 示例                                                         | 描述                                                         |
| ------------------ | -------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| RegionId           | String   | 是       | CN_Beijing_A                                                 | 区域id                                                       |
| VdcId              | String   | 是       |                                                              | 云服务器所属虚拟数据中心                                     |
| Password           | string   | 是       | EcsV587!                                                     | 云服务器密码                                                 |
| InstanceName       | string   | 否       | shouduzaixhost                                               | 云服务器的主机名    默认写入主机Id                           |
| AssignCCSId        | integer  | 否       | 1                                                            | 是否启用编号，1为启用，0为不启用                             |
| InstanceChargeType | string   | 否       | PostPaid                                                     | 云主机的付费方式，取值范围：    PrePaid：预付费，包年包月。    PostPaid（默认）：按量付费。 |
| AutoRenew          | interger | 否       | 1                                                            | 包年包月云主机是否自动续费，1为自动续费（默认），0为不自动续费 |
| PrepaidMonth       | interger | 否       | 0                                                            | 包年包月云主机购买月数，输入0为购买到月底，输入1为到月底后在购买一个自然月，默认为0。 |
| Cpu                | int      | 否       | 4                                                            | cpu数量，单位（个）只可选[1,2,4,8,10,16,32]    默认选择可以购买的最小的 |
| Ram                | int      | 否       | 8                                                            | 内存数量，单位（GB）只可选[1, 2, 4, 8, 12,  16, 24, 32, 48, 64, 96, 128]    默认选择可以购买的最小的 |
| InstanceType       | string   | 否       | Standard                                                     |                                                              |
| ImageId            | string   | 否       | bbf63749-0186-4c68-8adc-9bf584bc1376                         | 模板Id，不指定则默认选择centos7.4（界面显示第一个）          |
| DataDisks          | string   | 否       | [{ "Size": 100,  "Type": "ssd_disk" },{  "Size": 50,  "Type": "high_disk" }] |                                                              |
| Amount             | integer  | 否       | 1                                                            | 指定创建云服务器的数量，取值范围：1-99，默认取值：1          |
| PublicIp           | string   | 否       | [“101.251.1.1”, “101.251.1.2”, “101.251.13”]                 | 公网Ip    输入的ip必须是该Vdc下可用ip，手动分配输入ip地址，自动分配输入：auto，默认不写为不分配公网ip |
| PrivateIp          | string   | 否       | [{“PrivateID”: “6a3ce526-287f-11e6-b7c1-0050569b4d9c”, “IP”: [“10.0.0.2”, “10.0.0.3”, “10.0.0.4”]}] | 私网Ip    输入的ip必须是该Vdc下可用ip，手动分配输入ip地址，自动分配输入：auto，默认不写为不分配私网ip |

**返回参数:**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

**错误码:**

| httpcode | 错误码                                | 错误信息                                                     | 描述                                       |
| -------- | ------------------------------------- | ------------------------------------------------------------ | ------------------------------------------ |
| 400      | InvalidInstanceType.ValueUnauthorized | The  specified InstanceType is not authorized.               | 指定的云主机规格未授权使用。               |
| 400      | InvalidInstanceName.Malformed         | The  specified parameter "Instance" is not valid.            | 指定的Instance格式错误。                   |
| 400      | InvalidPassword.Malformed             | The  specified parameter "Password" is not valid.            | 指定的 Password 参数错误。                 |
| 400      | InvalidDataDiskSize.ValueNotSupported | The  specified DataDisk.n.Size beyond the permitted range, or the capacity of  snapshot exceeds the size limit of the specified disk category. | 指定的数据盘大小已超过最大允许值。         |
| 400      | InvalidPrivateIpAddress.Malformed     | Specified  private IP address is malformed.                  | 指定的私有IP不合法。                       |
| 400      | InvalidPrivateIpAddress.Duplicated    | Specified  private IP address is duplicated.                 | 指定的私网IP已经被使用，请您更换IP再重试。 |
| 400      | InvalidPublicIpAddress.Malformed      | Specified  public IP address is malformed.                   | 指定的公网IP错误。                         |
| 400      | InvalidPublicIpAddress.Duplicated     | Specified  public IP address is duplicated.                  | 指定的公网IP已经被使用，请您更换IP再重试。 |
| 400      | NotEnoughBalance                      | Your account does not have enough balance.                   | 账户余额不足，请先充值再操作。             |
| 403      | Zone.NotOnSale                        | The  resource in the specified zone is no longer available for sale. Please try  other regions and zones. | 指定的可用区暂停售卖。                     |
| 404      | InvalidLaunchTemplateVersion.NotFound | %s                                                           | 指定的模板版本未找到。                     |
| 403      | InvalidIp.IpRepeated                  | %s                                                           | 指定的 IP 重复。                           |
| 403      | InvalidIp.IpAssigned                  | %s                                                           | 指定的 IP 已被分配。                       |
| 403      | InvalidIp.Address                     | %s                                                           | 指定的 IP地址不合法。                      |

**返回示例:**

```json
{
  "Code":"Success",
  "TaskId":"63749"
}
```

**调用代码示例:**

```python
def CreateInstance(RegionId, VdcId, InstanceName, InstanceType, ImageId, Amount):
    """
    创建虚拟数据中心
    @params: RegionId: 区域ID
    @params: VdcId: 虚拟数据中心ID
    @params: InstanceName: 要创建的云主机名称
    @params: InstanceType: 创建的主机类型
    @params: ImageId: 镜像ID
    @parmas: Amount: 创建数量
    """
    action = "CreateInstance"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL, param={})
    body = {
        "RegionId": RegionId,
        "VdcId": VdcId,
        "InstanceName": InstanceName,
        "Cpu": 4,
        "Ram": 4,
        "InstanceType": InstanceType,
        "ImageId": ImageId,
        "DataDisks": [],
        "InstanceChargeType": "PostPaid",
        "Password": "123abc,.;",
        "AutoRenew": 1,
        "PrepaidMonth": 1,
        "Amount": Amount,
        "PublicIp": "",
        "PrivateIp": ""
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print ("create vm error: %s" % result.get("Message"))
    return result.get("TaskId")
```

### 2.DeleteInstance

​	**Action：** DeleteInstance

​	**描述：** 删除一台或者多台云服务器

​	**请求地址:** api.capitalonline.net/ccs

​	**请求方法：POST** 

​	**请求参数:**

| 名称        | 类型 | 是否必选 | 示例值                                   | 描述                                          |
| ----------- | ---- | -------- | ---------------------------------------- | --------------------------------------------- |
| InstanceIds | list | 是       | ["f9053ea8-fc23-4032-8a7f-01def77b4cc0"] | 云服务器的编号，可以在DescribeInstances中获取 |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

​	**返回示例:**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376",
"RequestId":"bbf63749-0186-4c68-8adc-9bf584b1234"
}
```

​	**调用代码示例:**

```python
def delete_instance(vm_ids):
    """
    删除主机实例
    @params: vm_id: 实例uuid列表
    """
    action = "DeleteInstance"
    method = "POST"
    body = {
        "InstanceIds": vm_ids
    }
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print result.get("Message")
        return None
    return True
```

### 3. StopInstance

​	**Action:StopInstance**

​	**描述:** 云服务器关机

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：GET**

​	**请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                               | 描述                                          |
| ---------- | ------ | -------- | ------------------------------------ | --------------------------------------------- |
| InstanceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在DescribeInstances中获取 |

​	**返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

​	**返回示例:**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376",
}
```

### 4.RebootInstance

​	**Action：RebootInstance**

​	**描述：** 云服务器开机

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：GET**

​	**请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                               | 描述                                          |
| ---------- | ------ | -------- | ------------------------------------ | --------------------------------------------- |
| InstanceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在DescribeInstances中获取 |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current Status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceId.Malformed | The specified parameter   "InstanceId" is not valid.         | 指定云服务器Id参数格式错误     |

​	**返回示例：**

```json
{
"Code":"Success",
"TaskId":"63749"
}
```

### 5.ModifyInstanceChargeType

​	**Action：ModifyInstanceChargeType**

​	**描述：** 云服务器变更计费方式

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称               | 类型     | 是否必选 | 示例值                               | 描述                                                         |
| ------------------ | -------- | -------- | ------------------------------------ | ------------------------------------------------------------ |
| InstanceId         | string   | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在DescribeInstances中获取                |
| InstanceChargeType | string   | 是       | PostPaid                             | 云主机的付费方式，取值范围：    PrePaid：预付费，包年包月。    PostPaid：按量付费。 |
| AutoRenew          | interger | 否       | 1                                    | 包年包月云主机是否自动续费，1为自动续费（默认），0为不自动续费 |
| PrepaidMonth       | interger | 否       | 0                                    | 包年包月云主机购买月数，输入0为购买到月底，输入1为到月底后在购买一个自然月，默认为0。 |

​	**返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current Status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceId.Malformed | The specified parameter   "InstanceId" is not valid.         | 指定云服务器Id参数格式错误     |

​	**返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

### 6.ModifyInstanceSpec

​	**Action：ModifyInstanceSpec**

​	**描述：** 云服务器配置升级，更新cpu/内存

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                               | 描述                                                         |
| ---------- | ------ | -------- | ------------------------------------ | ------------------------------------------------------------ |
| InstanceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在查询云服务器详情中查出                 |
| Cpu        | int    | 否       | 4                                    | cpu数量，单位（个）只可选[1,2,4,8,10,16,32]    <br />不填写默认不更改 |
| Ram        | int    | 否       | 8                                    | 内存数量，单位（GB）只可选[1, 2, 4, 8, 12,  16, 24, 32, 48, 64, 96, 128]    <br />不填写默认不更改 |

​	**返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                                | 错误信息                                                     | 描述                           |
| -------- | ------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus               | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound                      | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed           | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |
| 400      | InvalidInstanceType.ValueUnauthorized | The  specified InstanceType is not authorized.               | 指定的云主机规格未授权使用。   |

​	**返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

​	**代码调用示例:**

```python
def update_vm(vm_id):
    action = "ModifyInstanceSpec"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    body = {
        "InstanceId": vm_id,
        "Cpu": 4,
        "Ram": 4
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    print result
```

### 7.CreateDisk

​	**Action：CreateDisk**

​	**描述：** 云服务器增加一块或者多块硬盘

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                                                       | 描述                                                         |
| ---------- | ------ | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| InstanceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0                         | 云服务器的编号，可以在查询云服务器详情中查出                 |
| DataDisks  | string | 否       | [<br />{ "Size": 100,  "Type": "ssd_disk" },<br />{  "Size": 200,  "Type": "high_disk" }<br />], | 数据盘列表，<br />Size：数据盘大小，<br />Type：数据盘类型，可选参数： |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskID | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务ID |

​	**错误码：**

| httpcode | 错误码                                    | 错误信息                                                     | 描述                           |
| -------- | ----------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus                   | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound                          | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed               | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |
| 400      | InvalidInstanceTypeDisk.ValueUnauthorized | The  specified Instance DiskType is not authorized.          | 指定的硬盘规格未授权使用。     |

​	**返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

​	**代码调用示例:**

```python
def add_disk(vm_id):
    action = "CreateDisk"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    body = {
        "InstanceId": vm_id,
        "DataDisks": [{"Size": 100, "Type": "high_disk"}]
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
```



### 8.ResizeDisk

​	**Action：ResizeDisk**

​	**描述：** 扩容一块已经购买的硬盘

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                               | 描述                                         |
| ---------- | ------ | -------- | ------------------------------------ | -------------------------------------------- |
| InstanceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在查询云服务器详情中查出 |
| DiskId     | string | 是       | a67644ba-873f-11e9-bf49-0242ac1104e7 | 硬盘编号                                     |
| DataSize   | string | 是       | 100                                  | 硬盘扩容后的大小                             |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                                    | 错误信息                                                     | 描述                           |
| -------- | ----------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus                   | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound                          | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed               | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |
| 400      | InvalidInstanceID.Malformed               | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |
| 400      | InvalidInstanceTypeDisk.ValueUnauthorized | The  specified Instance DiskType is not authorized.          | 指定的硬盘规格未授权使用。     |
| 403      | InvalidDiskSize.TooSmall                  | Specified new disk size is less than the original disk size. | 指定的新磁盘小于原始磁盘。     |
| 400      | IncompleteParamter                        | Some fields can not be null in this request.                 | 请求中缺失参数。               |

​	**返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

### 9.DeleteDisk

​	**Action：DeleteDisk**

​	**描述：** 云服务器删除一块硬盘

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                                                       | 描述                                         |
| ---------- | ------ | -------- | ------------------------------------------------------------ | -------------------------------------------- |
| InstanceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0                         | 云服务器的编号，可以在查询云服务器详情中查出 |
| DiskIds    | List   | 是       | ["a67644ba-873f-11e9-bf49-0242ac1104e7","f9053ea8-fc23-4032-8a7f-01def77bq312"] | 硬盘编号                                     |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

​	**返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

### 10.ResetImage

​	**Action：ResetImage**

​	**描述：** 云服务器重装系统

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                               | 描述                                         |
| ---------- | ------ | -------- | ------------------------------------ | -------------------------------------------- |
| InstanceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在查询云服务器详情中查出 |
| ImageId    | string | 是       | bbf63749-0186-4c68-8adc-9bf584bc1376 | 模板Id                                       |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                                | 错误信息                                                     | 描述                           |
| -------- | ------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus               | The   current Status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound                      | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceId.Malformed           | The specified parameter   "InstanceId" is not valid.         | 指定云服务器Id参数格式错误     |
| 404      | InvalidLaunchTemplateVersion.NotFound | %s                                                           | 指定的模板版本未找到。         |

​	**返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

​	**调用代码示例:**

```python
def reset_os(vm_id, os_id):
    action = "ResetImage"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    body = {
        "InstanceId": vm_id,
        "ImageId": os_id
    }
    res = requests.post(url, json=body)
    result = json.loads(res.ocntent)
    print result
```

### 11.DescribeInstances

​	**Action：DescribeInstances**

​	**描述：** 查询云服务器信息

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称       | 类型    | 是否必选 | 示例值                                                       | 描述                                                         |
| ---------- | ------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| PageNumber | Integer | 否       | 1                                                            | Vdc列表的页码。起始值：1   默认值：1，默认每页显示10个Vdc的详细信息 |
| VdcId      | string  | 否       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d                         | 云服务器所属的Vdc                                            |
| InstanceId | string  | 否       | ["f9053ea8-fc23-4032-8a7f-01def77b4cc0","a67644ba-873f-11e9-bf49-0242ac1104e7"] | 云服务器的编号，可以在查询云服务器详情中查出                 |
| PublicIp   | string  | 否       | 101.251.1.1                                                  | 公网Ip    输入的ip必须是该Vdc下可用ip，手动分配输入ip地址    |
| PageSize   | int     | 否       | 10                                                           | 每页返回数量                                                 |

​	**返回参数:**

| 名称                    | 类型     | 示例值                                                       | 描述                      |
| :---------------------- | -------- | :----------------------------------------------------------- | :------------------------ |
| Code                    | Interger | Success                                                      | 错误码                    |
| Data                    | list     | []                                                           | 返回数据列表              |
| PageNumber              | interger | 1                                                            | 页码                      |
| PageCount               | interger | 10                                                           | 总页数                    |
| InstanceId              | string   | bbf63749-0186-4c68-8adc-9bf584bc1376                         | 云服务器编号              |
| InstanceName            | string   | shouduzaixian                                                | 云服务器名称              |
| InstanceStatus          | string   | running                                                      | 云服务器运行状态          |
| InstanceChargeType      | string   | PostPaid                                                     | 云服务器计费方式          |
| InstanceChargeStatus    | string   | success                                                      | 云服务器计费状态          |
| VdcName                 | string   | Vdc1                                                         | Vdc名称                   |
| VdcId                   | string   | f9053ea8-fc23-4032-8a7f-01def77b4cc0                         | Vdc编号                   |
| RegionId                | string   | CN_Beijing_A                                                 | RegionId：Vdc所属的可用区 |
| SystemDisk              | list     | []                                                           | 系统盘                    |
| DataDisks               | string   | [ { "size": 100,  "type": "ssd_disk" }, {  "size": 200,  "type": "high_disk" } ], | 数据硬盘信息              |
| PublicNetworkInterface  | string   |                                                              | 公网网卡信息              |
| PrivateNetworkInterface | string   |                                                              | 私网网卡信息              |

​	**错误码：**

| httpcode | 错误码                                | 错误信息                                                     | 描述                           |
| -------- | ------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus               | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound                      | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed           | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |
| 404      | InvalidLaunchTemplateVersion.NotFound | %s                                                           | 指定的模板版本未找到。         |

​	**返回示例:**

```json
{
    "Message":"Success.",
    "Code":"Success",
    "Data":{
        "Instances":[
            {
                "InstanceStatus":"updating",
                "RegionId":"CN_Beijing_A",
                "PrivateNetworkInterface":[
                    {
                        "InterfaceId":"e0e12830-a7b6-11e9-a7ea-0242ac1102f8",
                        "Name":"siwang-api1",
                        "IP":"10.240.59.2",
                        "MAC":"00:50:56:a5:22:22",
                        "Connected":1,
                        "PrivateId":"4e6f6790-a6b3-11e9-8f88-0242ac110041"
                    }
                ],
                "InstanceId":"e0dfea2e-a7b6-11e9-a7ea-0242ac1102f8",
                "Disks":{
                    "SystemDisk":{
                        "IOPS":600,
                        "Size":60
                    },
                    "DataDisks":[]
                },
                "VdcId":"0bb08ed7-e686-4168-93e5-e0187579753b",
                "PublicNetworkInterface":{},
                "InstanceChargeType":"PostPaid",
                "VdcName":"cdsApi-testaa",
                "InstanceName":"root"
            }
        ],
        "PageNumber":1,
        "PageCount":1
    },
}
```

​	**代码调用示例:**

```python
def descrive_instance(instance_id=None, vdc_id=None, pub_ip=None):
    """
    根据vm_id、vdc_id或者公网ip获取主机信息
    @params: instance_id: 主机ID
    @params: vdc_id: 虚拟数据中心ID
    @params: pub_ip: 公网ip
    """
    action = "DescribeInstances"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    body = {}
    if vm_id:
        body.update({"InstanceId": vm_id})
    if vdc_id:
        body.update({"VdcId": vdc_id})
    if pub_ip:
        body.update({"PubIp": pub_ip})
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print "get vm error."
        return None
    return result.get("Data")
```



### 12.ConnectNetworkInterface

​	**Action：ConnectNetworkInterface**

​	**描述：** 连接网卡

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称        | 类型   | 是否必选 | 示例值                               | 描述                                     |
| ----------- | ------ | -------- | ------------------------------------ | ---------------------------------------- |
| InterfaceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 网卡的编号，可以在查询云服务器详情中查出 |
| InstanceId  | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云主机ID                                 |

​	**返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                                     | 描述                           |
| -------- | ---------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus      | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid.        | 指定网卡ID参数格式错误         |

​	**返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

​	**代码调用示例：**

```python
def up_card(InterfaceId, InstanceId):
    """
    开启网卡
    @params: InterfaceId: 网卡ID
    @params: InstanceId: 主机ID
    """
    action = "ConnectNetworkInterface"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    body = {
        "InterfaceId": InterfaceId, 
        "InstanceId": InstanceId
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print "up card error."
        print result.get("Message")
    task_id = result.get("TaskId")
    return task_id
```

### 13.**DisconnectNetworkInterface**

​	**Action：DisconnectNetworkInterface**

​	**描述：** 断开网卡

​	**请求方法：POST**

​	**请求参数：**

| 名称        | 类型   | 是否必选 | 示例值                               |
| ----------- | ------ | -------- | ------------------------------------ |
| InterfaceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 |
| InstanceId  | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                                     | 描述                           |
| -------- | ---------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus      | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid.        | 指定网卡ID参数格式错误         |

​	**返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

​	**代码调用示例**

```python
def down_card(InterfaceId, InstanceId):
    """
    断开网卡
    @params: InterfaceId: 网卡ID
    @params: InstanceId: 主机ID
    """
    action = "DisconnectNetworkInterface"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    body = {
        "InterfaceId": InterfaceId, 
        "InstanceId": InstanceId
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print "down card error."
        print result.get("Message")
    task_id = result.get("TaskId")
    return task_id
```



### 14. ModifyIpAddress

​	**Action：ModifyIpAddress**

​	**描述：** 为网卡绑定Ip地址或解绑Ip地址或修改Ip地址

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称        | 类型   | 是否必选 | 示例值                               | 描述                                         |
| ----------- | ------ | -------- | ------------------------------------ | -------------------------------------------- |
| InstanceId  | string | 是       | f9053ea8-fc23-4032-8a7f-01def773dw22 | 云服务器编号                                 |
| InterfaceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 网卡的编号，可以在查询云服务器详情中查出     |
| Address     | string | 是       | 101.251.2.29                         | 要绑定或者修改的Ip地址，解绑Ip此处请填写None |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                                     | 描述                           |
| -------- | ---------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus      | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid.        | 指定网卡ID参数格式错误         |

​	**返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

### 15.DescribeInstanceMonitor

​	**Action：DescribeInstanceMonitor**

​	**描述：** 获取主机实例各个指标监控数据

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称        | 类型   | 是否必选 | 示例值                                                       | 描述                                                         |
| ----------- | ------ | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| InstanceId  | string | 是       | f9053ea8-fc23-4032-8a7f-01def773dw22                         | 云服务器编号                                                 |
| MetricName  | string | 是       | CPUUtilization、RAMUtilization、DiskWriteIOPS、DiskReadIOPS、DiskWriteBPS、DiskReadBPS、InterfaceInRate、InterfaceOutRate | 实例各项指标，CPU(cpu)、内存(ram)、硬盘IOPS(iops)、硬盘吞吐量(throughput)、网卡流量(nic) |
| Period      | int    | 是       | 60、900、3600                                                | 监控数据粒度，一分钟粒度(60)、十五分钟粒度(900)、一小时粒度(3600) |
| StartTime   | string | 是       | 2019-10-09 15:30:00                                          | 开始时间                                                     |
| EndTime     | string | 是       | 2019-10-09 16:30:00                                          | 结束时间                                                     |
| InterfaceId | string | 否       | f9053ea8-fc23-4032-8a7f-01def77b4cc0                         | 网卡的编号，可以在查询云服务器详情中查出                     |
| DiskId      | string | 否       | f9053ea8-fc23-4032-8a7f-01def77b4cc0                         | 硬盘编号， 可以在查询云服务器详情中查出                      |

​	**返回参数：**

| 名称       | 类型     | 示例值                               | 描述         |
| :--------- | -------- | :----------------------------------- | ------------ |
| Code       | Interger | Success                              | 错误码       |
| Data       | Dict     | {}                                   | 返回数据列表 |
| InstanceId | String   | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 实例ID       |
| Period     | String   | 60                                   | 数据粒度     |
| DataPoints | list     | []                                   | 监控数据列表 |
| Timestamp  | String   | 2019-10-09 15:30:00                  | 数据时间点   |
| Value      | Float    | 49.67                                | 监控数据数值 |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

​	**返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "DataPoints": [
            {
                "Timestamp": "2019-10-09 15:30:00",
                "Value": 49.67
            },
            {
                "Timestamp": "2019-10-09 15:31:00",
                "Value": 46
            },
            {
                "Timestamp": "2019-10-09 15:32:00",
                "Value": 47.67
            },
            {
                "Timestamp": "2019-10-09 15:34:00",
                "Value": 57
            }
        ],
        "InstanceId": "50971028-e2a3-11e9-b380-de55f62159fe",
        "Period": "60"
    },
    "Message": "Success."
}
```

## 安全组相关

### 1.CreateSecurityGroup

​	**Action：CreateSecurityGroup**

​	**描述：** 创建网络安全组

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称              | 类型   | 是否必选 | 示例值 | 描述                       |
| ----------------- | ------ | -------- | ------ | -------------------------- |
| SecurityGroupName | String | 是       | Test   | 安全组名称                 |
| Description       | String | 是       | 安全组 | 安全组描述                 |
| SecurityGroupType | String | 是       | public | 安全组类型(public/private) |

​	**返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String |         | 任务ID   |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

​	**返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":""
}
```

### 2.DeleteSecurityGroup

​	**Action：DeleteSecurityGroup**

​	**描述：** 删除网络安全组

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：GET**

​	**请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                               | 描述     |
| --------------- | ------ | -------- | ------------------------------------ | -------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组ID |

​	**返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String |         | 任务ID   |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

​	**返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":""
}
```

### 3.ForceDeleteSecurityGroup

​	**Action：ForceDeleteSecurityGroup**

​	**描述：** 强制删除网络安全组

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：GET**

​	**请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                               | 描述     |
| --------------- | ------ | -------- | ------------------------------------ | -------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组ID |

​	**返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688881 | 任务ID   |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

​	**返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688881"
}
```

### 4.DescribeSecurityGroupAttribute

​	**Action：DescribeSecurityGroupAttribute**

​	**描述：** 查看网络安全组属性

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：GET**

​	**请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                               | 描述     |
| --------------- | ------ | -------- | ------------------------------------ | -------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组ID |
| RuleId          | String | 否       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组规则ID |

​	**返回参数：**

| 名称                   | 类型   | 示例值              | 描述                    |
| ---------------------- | ------ | ------------------- | ----------------------- |
| Code                   | String | Success             | 错误码                  |
| Message                | String | Success             | 提示信息                |
| TaskId                 | String |                     | 任务ID                  |
| Data                   | Object | {}                  | 返回信息                |
| SecurityGroupType      | String | public              | 安全组类型              |
| SecurityGroupRuleCount | Int    | 6                   | 安全组规则数量          |
| SecurityGroupRules     | List   | []                  | 安全组规则信息          |
| Status                 | String | ok                  | 安全组状态              |
| TargetAddress          | String | 0.0.0.0/0           | 目标地址                |
| TargetPort             | String | 0                   | 目标端口                |
| Direction              | String | all                 | 规则方向                |
| Protocol               | String | TCP                 | 规则协议                |
| LocalPort              | String | 22                  | 本地端口                |
| Priority               | Int    | 1                   | 优先级                  |
| RuleId                 | String | xxxx                | 规则ID                  |
| Action                 | Int    | 1                   | 规则动作：1:允许 0:禁止 |
| Type                   | String | ip                  | 规则类型：ip/Mac        |
| Description            | String | 描述                | 规则描述                |
| CreateTime             | String | 2019-09-11 11:00:01 | 创建时间                |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

​	**返回示例**

```json
{
    "Message":"Success.",
    "Code":"Success",
    "Data":{
        "SecurityGroupType":"public",
        "SecurityGroupRuleCount":6,
        "SecurityGroupRules":[
            {
                "Status":"ok",
                "TargetAddress":"0.0.0.0/0",
                "Direction":"all",
                "Protocol":"TCP",
                "LocalPort":"22",
                "RuleId":"d2b957d4-d53b-11e9-b3c9-0242ac110002",
                "Priority":1,
                "Action":1,
                "TargetPort":"0",
                "Type":"ip",
                "CreateTime":"2019-09-12 17:00:52",
                "Description":"22"
            },
            {
                "Status":"ok",
                "TargetAddress":"0.0.0.0/0",
                "Direction":"all",
                "Protocol":"TCP",
                "LocalPort":"443",
                "RuleId":"d8e90154-d53b-11e9-8a97-0242ac110002",
                "Priority":2,
                "Action":1,
                "TargetPort":"0",
                "Type":"ip",
                "CreateTime":"2019-09-12 17:01:03",
                "Description":"443"
            }
        ],
        "SecurityGroupName":"安全组测试bilibili"
    },
    "TaskId":""
}
```

### 5.ModifySecurityGroupAttribute

​	**Action：ModifySecurityGroupAttribute**

​	**描述：** 修改网络安全组属性

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称              | 类型   | 是否必选 | 示例值                               | 描述         |
| ----------------- | ------ | -------- | ------------------------------------ | ------------ |
| SecurityGroupId   | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组ID     |
| Description       | String | 是       | 修改安全组描述                       | 新安全组描述 |
| SecurityGroupName | String | 是       | 安全组名称                           | 新安全组名称 |

​	**返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String |         | 任务ID   |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

​	**返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":""
}
```

### 6.DescribeSecurityGroups

​	**Action：DescribeSecurityGroups**

​	**描述：** 网络安全组列表

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称              | 类型   | 是否必选 | 示例值 | 描述                                                        |
| ----------------- | ------ | -------- | ------ | ----------------------------------------------------------- |
| SecurityGroupType | String | 否       | public | 安全组类型(public/private),不填默认筛选所有类型的安全组列表 |
| Keyword           | String | 否       | test   | 查询关键字                                                  |
| SecurityGroupId   | String | 否       | xxxx   | 安全组ID                                                  |

​	**返回参数：**

| 名称               | 类型   | 示例值                   | 描述             |
| ------------------ | ------ | ------------------------ | ---------------- |
| Code               | String | 0000                     | 错误码           |
| Message            | String | 删除网络安全组任务已下发 | 提示信息         |
| TaskId             | String |                          | 任务ID           |
| Data               | Object | {}                       | 返回信息         |
| SecurityGroupCount | Int    | 2                        | 安全组数量       |
| SecurityGroup      | List   | []                       | 安全组列表       |
| SecurityGroupId    | String | xxx                      | 安全组ID         |
| SecurityGroupName  | String | group                    | 安全组名称       |
| Description        | String | desc                     | 安全组描述       |
| BindInstanceCount  | Int    | 1                        | 绑定主机实例数量 |
| CreateTime         | String | 2019-09-27 14:30:03      | 创建时间         |
| UpdateTime         | String | 2019-09-27 14:30:03      | 更新时间         |
| BindInterfaceCount | Int    | 2                        | 绑定网卡数量     |
| SecurityGroupType  | String | private                  | 安全组类型       |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

​	**返回示例**

```json
{
    "Message":"Success.",
    "Code":"Success",
    "Data":{
        "SecurityGroupCount":2,
        "SecurityGroup":[
            {
                "UpdateTime":"2019-09-27 14:30:03",
                "Description":"terraform",
                "SecurityGroupName":"tf_test_zxg",
                "SecurityGroupId":"3d102c1a-e0f0-11e9-b530-0242ac110002",
                "BindInstanceCount":0,
                "SecurityGroupType":"private",
                "BindVdcCount":0,
                "CreateTime":"2019-09-27 14:30:03",
                "BindInterfaceCount":0
            },
            {
                "UpdateTime":"2019-03-19 18:09:19",
                "Description":"test",
                "SecurityGroupName":"test",
                "SecurityGroupId":"0f2fa0d0-4a2f-11e9-9710-0242ac110002",
                "BindInstanceCount":0,
                "SecurityGroupType":"public",
                "BindVdcCount":0,
                "CreateTime":"2019-03-19 18:09:19",
                "BindInterfaceCount":0
            }
        ]
    },
    "TaskId":""
}
```

### 7.AddSecurityGroupRule

​	**Action：AddSecurityGroupRule**

​	**描述：** 添加网络安全组规则

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                               | 描述                                                         |
| --------------- | ------ | -------- | ------------------------------------ | ------------------------------------------------------------ |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组id                                                     |
| Action          | String | 是       | 1                                    | 安全组内网络连通策略。  **0 代表禁止,1 代表允许**            |
| Description     | String | 是       | 开通80端口                           | 规则描述信息                                                 |
| TargetAddress   | String | 是       | 120.78.170.188/28                    | 目标ip地址                                                   |
| TargetPort      | String | 是       | 0                                    | 目标端口。**其中0代表所有端口的集合**                        |
| LocalPort       | String | 是       | 80                                   | 本机开放或禁止的源端口                                       |
| Direction       | String | 是       | all                                  | 规则访问权限。**目前只支持双向规则的添加和绑定**             |
| Priority        | String | 是       | 10                                   | 设置安全组中规则优先级，范围是1~100                          |
| Protocol        | String | 是       | TCP                                  | 传输层协议。选填参数为:  ICMP、TCP、UDP。**注:如果协议为ICMP，不需要传递TargetPort、LocalPort参数。** |
| RuleType        | String | 是       | ip                                   | 设置规则类型。选项: mac/ip                                   |

​	**返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688348 | 任务ID   |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

​	**返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688348"
}
```

### 8.RemoveSecurityGroupRule

​	**Action：RemoveSecurityGroupRule**

​	**描述：** 删除网络安全组规则

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                               | 描述     |
| --------------- | ------ | -------- | ------------------------------------ | -------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组ID |
| RuleIds         | Array  | 是       | ["xxx", "xxx"]                       | 规则ID   |

​	**返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688411 | 任务ID   |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

​	**返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688411"
}
```

### 9.ModifySecurityGroupRule

​	**Action：ModifySecurityGroupRule**

​	**描述：** 修改网络安全组规则描述

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                               | 描述       |
| --------------- | ------ | -------- | ------------------------------------ | ---------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组ID   |
| RuleId          | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 规则ID     |
| Description     | String | 是       | 新描述                               | 新修改描述 |

​	**返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String |         | 任务ID   |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

​	**返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":""
}
```

### 10.JoinSecurityGroup

​	**Action：JoinSecurityGroup**

​	**描述：** 主机实例加入安全组

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                                    | 描述     |
| --------------- | ------ | -------- | ----------------------------------------- | -------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe      | 安全组ID |
| BindData        | String | 是       | [{"InstanceId":"xxx", "PrivateId":"xxx"}] | 绑定数据 |
| InstanceId      | String | 是       | 76571028-e2a3-11e9-b380-de55f62159fe      | 实例ID   |
| PrivateId       | String | 否       | 50971028-e2a3-11e9-b380-de55f62159fe      | 私网ID   |
| PublicId        | String | 否       | 50971028-e2a3-11e9-b380-de55f62159fe      | 公网ID   |

​	**返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688564 | 任务ID   |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

​	**返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688564"
}
```

### 11.LeaveSecurityGroup

​	**Action：LeaveSecurityGroup**

​	**描述：** 实例解绑网络安全组

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                                    | 描述     |
| --------------- | ------ | -------- | ----------------------------------------- | -------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe      | 安全组ID |
| BindData        | String | 是       | [{"InstanceId":"xxx", "PrivateId":"xxx"}] | 绑定数据 |
| InstanceId      | String | 是       | 76571028-e2a3-11e9-b380-de55f62159fe      | 实例ID   |
| PrivateId       | String | 否       | 50971028-e2a3-11e9-b380-de55f62159fe      | 私网ID   |
| PublicId        | String | 否       | 50971028-e2a3-11e9-b380-de55f62159fe      | 公网ID   |

​	**返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688573 | 任务ID   |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

​	**返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688573"
}
```

### 12.ModifySecurityGroupRulePriority

​	**Action：ModifySecurityGroupRulePriority**

​	**描述：** 修改安全组规则优先级

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST**

​	**请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                               | 描述                   |
| --------------- | ------ | -------- | ------------------------------------ | ---------------------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组ID               |
| BindData        | String | 是       | [{"RuleId":"xxx", "Priority":"xxx"}] | 绑定数据               |
| RuleId          | String | 是       | 76571028-e2a3-11e9-b380-de55f62159fe | (BindData中参数)规则ID |
| Priority        | Int    | 否       | 1                                    | (BindData中参数)优先级 |

​	**返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688573 | 任务ID   |

​	**错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

​	**返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688573"
}
```

## 

## 模板相关

### 1.CreateTemplate

​	**Action：** CreateTemplate

​	**描述：** 定制模板

​	**请求地址:**  cdsapi.capitalonline.net/ccs

​	**请求方法：POST** 

​	**请求参数:** 

| 名称        | 类型   | 是否必选 | 示例值 | 描述             |
| ----------- | ------ | -------- | ------ | ---------------- |
| InstanceId  | String | 是       | Test   | 云主机实例ID     |
| DisplayName | String | 是       | 模板   | 模板名称         |
| PowerOn     | Bool   | 是       | 1      | 是否开机定制模板 |

​	**返回参数：** 

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688573 | 任务ID   |

​	**错误码：** 

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

​	**返回示例** 

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688573"
}
```

### 2.DeleteTemplate

​	**Action：** DeleteTemplate

​	**描述：** 删除模板

​	**请求地址:**  cdsapi.capitalonline.net/ccs

​	**请求方法：POST** 

​	**请求参数:** 

| 名称       | 类型   | 是否必选 | 示例值       | 描述       |
| ---------- | ------ | -------- | ------------ | ---------- |
| TemplateId | String | 是       | xxx          | 模板ID     |
| RegionId   | String | 是       | CN_Beijing_A | 安全组描述 |

​	**返回参数：** 

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688573 | 任务ID   |

​	**错误码：** 

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

​	**返回示例** 

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688573"
}
```

### 3.SyncTemplate

​	**Action：** SyncTemplate

​	**描述：** 同步模板

​	**请求地址:**  cdsapi.capitalonline.net/ccs

​	**请求方法：POST** 

​	**请求参数:** 

| 名称       | 类型   | 是否必选 | 示例值       | 描述       |
| ---------- | ------ | -------- | ------------ | ---------- |
| TemplateId | String | 是       | xxx          | 模板ID     |
| RegionId   | String | 是       | CN_Beijing_A | 安全组描述 |

​	**返回参数：** 

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688573 | 任务ID   |

​	**错误码：** 

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

​	**返回示例** 

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688573"
}
```

### 4.DescribeTemplateInfo

​	**Action：** DescribeTemplateInfo

​	**描述：** 模板信息

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：POST** 

​	**请求参数:** 

| 名称       | 类型   | 是否必选 | 示例值 | 描述       |
| ---------- | ------ | -------- | ------ | ---------- |
| PageNumber | Int    | 是       | 1      | 页码       |
| PageSize   | Int    | 是       | 10     | 每一页大小 |
| Keyword    | String | 否       | test   | 关键字查询 |

​	**返回参数：** 

| 名称         | 类型   | 示例值              | 描述         |
| ------------ | ------ | ------------------- | ------------ |
| Code         | String | Success             | 错误码       |
| Message      | String | Success             | 提示信息     |
| Data         | Object | {}                  | 返回信息     |
| TemplateList | List   | []                  | 模板列表信息 |
| TotalPage    | Int    | 3                   | 页数         |
| Status       | String | normal              | 模板状态     |
| Count        | Int    | 3                   | 模板数量     |
| Name         | String | test                | 模板名称     |
| TemplateId   | String | xxx                 | 模板ID       |
| OSType       | String | centos 7.4 64位     | 模板类型     |
| CreateTime   | String | 2019-05-15 10:38:28 | 创建时间     |
| Region       | List   | []                  | 节点信息     |
| RegionId     | String | CN_Beijing_C        | 区域ID       |
| RegionName   | String | 北京-可用区C        | 区域名称     |

​	**错误码：** 

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

​	**返回示例** 

```json
{
    "Message":"Success.",
    "Code":"Success",
    "Data":{
        "TotalPage":3,
        "TemplateList":[
            {
                "Count":3,
                "Status":"normal",
                "Name":"centos-openshift-3.11-beta2",
                "Region":[
                    {
                        "Status":"normal",
                        "RegionId":"CN_Beijing_C",
                        "RegionName":"北京-可用区C"
                    },
                    {
                        "Status":"normal",
                        "RegionId":"CN_Beijing_B",
                        "RegionName":"北京-可用区B"
                    },
                    {
                        "Status":"normal",
                        "RegionId":"CN_Beijing_A",
                        "RegionName":"北京-可用区A"
                    }
                ],
                "TemplateId":"74c76042-76ba-11e9-8962-0a580af412d2",
                "OSType":"centos 7.4 64位",
                "CreateTime":"2019-05-15 10:38:28"
            }
        ]
    }
}
```

## 虚拟数据中心相关

### 1.DescribeVdc

​	**Action：** DescribeVdc

​	**描述：** 查询虚拟数据中心(以下简称VDC)详细信息

​	**请求地址:** cdsapi.capitalonline.net/network

​	**请求方法：GET**

​	**请求参数:**

| 名称       | 类型    | 是否必选 | 示例                                 | 描述                       |
| ---------- | ------- | -------- | ------------------------------------ | -------------------------- |
| RegionId   | string  | 否       | CN_Beijing_A                         | 选择Vdc所属可用区,见附件一 |
| VdcId      | string  | 否       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | Vdc编号                    |
| PageNumber | Integer | 否       | 1                                    | Vdc列表的页码              |
| Keyword    | string  | 否       | Beijing                              | 查询关键字                 |

​	**返回参数:**

| 名称           | 类型     | 示例                                                         | 描述                                                         |
| -------------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Code           | interger | Success                                                      | 错误码                                                       |
| PageNumber     | interger | 1                                                            | 页码                                                         |
| PageCount      | interger | 10                                                           | 总页数                                                       |
| Data           | List     | []                                                           | 返回数据列表                                                 |
| VdcId          | string   | f9053ea8-fc23-4032-8a7f-01def77b4cc0                         | Vdc编号                                                      |
| VdcName        | string   | capitalcloud                                                 | Vdc名称                                                      |
| RegionId       | string   | CN_Beijing_A                                                 | Vdc所在可用区节点                                            |
| VdcStatus      | string   | ok                                                           | Vdc的使用状态                                                |
| PublicNetwork  | string   | {"Name": "公网1",<br/>"Status":"ok";<br />    "Type": "BGP_4",<br/>    "Qos": "20",<br/>''Ip':"38.121.60.96"<br />"Mask":"28"} | Name:公网名称<br />Status：状态<br />Type：公网带宽类型<br />Qos：带宽大小<br />Ip：购买的Ip段<br />Mask:掩码 |
| PrivateNetwork | string   | [{<br />"Name":"私网1",<br />"Status":"ok",<br />"Ip":"10.241.16.0/16"<br />"Id":"22b729aa-4540-11e9-99c5-0242ac11001b"},<br />{<br />"Name":"私网2",<br />"Status":"ok",<br />"Ip":"10.241.40.0"<br />"Mask":"16"<br />"Id":"c0d2bbf7-0e09-49d5-8dc7-8fe90e722c47"}] | Name：私网名称<br />Status：状态<br />Ip：购买的私网Ip段<br />Mask:掩码<br />ID:网络id |

**错误码:**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |
| 400      | InvalidRegionID.Malformed | The specified parameter   "RegionId" is not valid. | 指定可用区参数格式错误 |
| 400      | VDCNotFound               | the VDC has deleted.                               | 指定的VDC已被删除      |
| 400      | InvalidVDCID.Malformed    | The specified parameter "VdcId" is not valid.      | 指定VdcId参数格式错误  |

**返回示例:**

```json
{
    "Message":"Success.",
    "Code":"Success",
    "Data":[
        {
            "PublicNetwork":[
                {
                    "Status":"ok",
                    "Qos":20,
                    "Name":"cdsApi-public-2",
                    "Segments":[
                        {
                            "Mask":30,
                            "Gateway":"144.143.14.149",
                            "SegmentId":"e0e5ea32-a7b6-11e9-9052-0242ac11001b",
                            "Address":"144.143.14.148"
                        }
                    ],
                    "UnuseIpNum":1,
                    "PublicId":"e1186a02-a7b6-11e9-9052-0242ac11001b"
                }
            ],
            "PageCount":0,
            "RegionId":"CN_Beijing_A",
            "VdcId":"0bb08ed7-e686-4168-93e5-e0187579753b",
            "PageNumber":0,
            "VdcName":"cdsApi-testaa",
            "PrivateNetwork":[
                {
                    "Status":"ok",
                    "UnuseIpNum":253,
                    "Segments":[
                        "10.240.59.0/16~10.240.59.255/16"
                    ],
                    "PrivateId":"4e6f6790-a6b3-11e9-8f88-0242ac110041",
                    "Name":"siwang-api1"
                }
            ]
        }
    ]
}
```

**调用代码示例:**

```python
def descrive_vdc(keyword=None, vdc_id=None, region_id=None):
    """
    vdc详情
    @params: keyword: 查询关键字
    @params: vdc_id: 虚拟数据中心uuid
    @params: region_id: 区域代码
    """
    action = "DescribeVdc"
    method = "GET"
    param = {}
    if keyword:
        param.update({"Keyword": keyword})
    if vdc_id:
        param.update({"VdcId": vdc_id})
    if region_id:
        param.update({"RegionId": region_id})
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print "get vdc info error."
        return None
    data = result.get("Data")
    return data
```



### 2.CreateVdc

​	**Action:CreateVdc**

​	**描述：** 创建一个Vdc

​	**请求地址:** cdsapi.capitalonline.net/network

​	**请求方法：POST**

​	**请求参数：**

| 名称          | 类型   | 是否必选 | 示例值                                                       | 描述                                   |
| ------------- | ------ | -------- | ------------------------------------------------------------ | -------------------------------------- |
| RegionId      | string | 是       | cn_beijingA                                                  | Vdc所属的节点Id                        |
| VdcName       | string | 否       | newVdc                                                       | 创建的Vdc名称，不填写时默认写入Vdc的Id |
| PublicNetwork | string | 否       | PublicNetword: {     "Name": "公网1",     "Type": "Bandwidth_BGP", "BillingMethod": "BandwIdth", "Qos": 20, ''Ip':4, "AutoRenew":0, "FloatBandwich":200} | 参考附件三带宽类型                     |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码:**

| httpcode | 错误码                                        | 错误信息                                                     | 描述                           |
| -------- | --------------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 400      | Account.Arrearage                             | Your account has been in   arrears.                          | 账户余额不足，请先充值再操作。 |
| 403      | Region.NotOnSale                              | The resource in the specified   Region is no longer available for sale. Please try other regions and zones. | 指定的可用区暂停售卖。         |
| 400      | QuotaExceed.Vdc                               | The   maximum number of Vdc is exceeded                      | 创建的Vdc数量超出限制          |
| 400      | InvalidRegionId.Malformed                     | The specified parameter   "RegionId" is not valid.           | 指定可用区参数格式错误         |
| 400      | InvalidPublicNetwork. Type.Malformed          | The specified parameter   "PbulicNetwork.Type" is not valid. | 指定的公网类型格式错误。       |
| 400      | InvalidPublicNetwork. BillingMethod.Malformed | The specified parameter   "PbulicNetwork.BillingMethod" is not valid. | 指定的公网计费类型格式错误。   |
| 400      | InvalidPublicNetwork. Bandwich.Malformed      | The specified parameter   "PbulicNetwork.Bandwich" is not valid. | 指定的公网带宽大小格式错误。   |
| 400      | InvalidPublicNetwork. Bandwich.Malformed      | The specified parameter   "PbulicNetwork.Bandwich" is not valid. | 指定的公网带宽大小格式错误。   |
| 400      | InvalidPublicNetwork.Ip.Malformed             | The specified parameter   "PbulicNetwork.Ip" is not valid.   | 指定的公网Ip格式错误。         |

​	**返回示例：**

```
{
	"Code":"Success",
	"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

​	**代码请求示例:**

```python
def create_vdc(site_code, wan_code, qos, vdc_name):
    """
    @params: site_code: 区域代码
    @params: wan_code: 公网类型代码
    @params: qos: 公网带宽
    @params: vdc_name: 虚拟数据中心名称
    """
    action = "CreateVdc"
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "RegionId": site_code,
        "VdcName": vdc_name,
        "PublicNetwork": {
            "Name": vdc_name,
            "Type": wan_code,
            "BillingMethod": "Bandwidth",
            "Qos": qos,
            "IPNum": 4
        }
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print "create vdc error."
        return None
    task_id = result.get("TaskId")
    return task_id
```



### 3.DeleteVdc

​	**Action：DeleteVdc**

​	**描述：** 删除一个没有公网及没有加入gpn等其他产品的Vdc

​	**请求地址:** cdsapi.capitalonline.net/network

​	**请求方法：GET**

​	**请求参数：**

| 名称  | 类型   | 是否必选 | 示例值                               | 描述                               |
| ----- | ------ | -------- | ------------------------------------ | ---------------------------------- |
| VdcId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | Vdc的编号，可以在查询Vdc详情中查出 |

​	**返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                 | 错误信息                                                     | 描述                           |
| -------- | ---------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectVdcStatus     | The   current Status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | VdcNotFound            | the Vdc has   deleted                                        | 指定的Vdc已被删除              |
| 400      | InvalidVdcId.Malformed | The specified parameter   "VdcId" is not valid.              | 指定VdcId参数格式错误          |

​	**返回示例：**

```
{
"Code":"Success"
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
"RequestId":"bbf63749-0186-4c68-8adc-9bf584b1234"
}
```

### 4.CreatePublicNetwork

​	**Action:CreatePublicNetwork**

​	**描述：** 给一个Vdc增加公网带宽和Ip

​	**请求地址:** cdsapi.capitalonline.net/network

​	**请求方法：POST**

​	**请求参数:**

| 名称           | 类型   | 是否必选 | 示例值                               | 描述                                                         |
| -------------- | ------ | -------- | ------------------------------------ | ------------------------------------------------------------ |
| VdcId          | string | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 云服务器所属的Vdc                                            |
| Name           | string | 否       | 公网1                                | 公网名称，不填写时默认写公网1                                |
| Type           | string | 是       | BGP_4                                | BGP_4(4线BGP)       BGP_2(双线BGP)       ChinaTelecom(电信)       AntiDDOS(防DDOS) |
| BillingMethod  | string | 是       | Bandwidth                            | Bandwidth（固定带宽，默认）<br />Traffic（流量按需）       <br />DataPackage（流量包）      <br />Bandwidth_95（95峰值） |
| Qos            | int    | 是       |                                      | 类型是固定带宽时，此处是公网带宽大小，最大500，步长5；类型是95峰值时，此处代表保底带宽，最大为500，步长50；类型是流量包时，代表流量包大小，单位是GB，最大是51200（50T) |
| IPNum          | int    | 是       |                                      | 购买的Ip数量，可选参数:{4,8,16,32,64}                        |
| AutoRenew      | int    | 是       |                                      | 带宽类型为流量包和95峰值时，是否自动续费，1为自动续费（默认），0为不自动续费 |
| FloatBandwidth | int    | 是       |                                      | 公网类型为95峰值时，带宽大小的封顶带宽，为空时，默认为带宽大小的120% |

​	**返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码:**

| httpcode | 错误码                                        | 错误信息                                                     | 描述                           |
| -------- | --------------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 400      | Account.Arrearage                             | Your account has been in   arrears.                          | 账户余额不足，请先充值再操作。 |
| 400      | InvalidVdcId.Malformed                        | The specified parameter   "VdcId" is not valid.              | 指定VdcId参数格式错误          |
| 400      | InvalidPublicNetwork. Type.Malformed          | The specified parameter   "PbulicNetwork.Type" is not valid. | 指定的公网类型格式错误。       |
| 400      | InvalidPublicNetwork. BillingMethod.Malformed | The specified parameter   "PbulicNetwork.BillingMethod" is not valid. | 指定的公网计费类型格式错误。   |
| 400      | InvalidPublicNetwork. Bandwich.Malformed      | The specified parameter   "PbulicNetwork.Bandwich" is not valid. | 指定的公网带宽大小格式错误。   |
| 400      | InvalidPublicNetwork. Bandwich.Malformed      | The specified parameter   "PbulicNetwork.Bandwich" is not valid. | 指定的公网带宽大小格式错误。   |
| 400      | InvalidPublicNetwork.Ip.Malformed             | The specified parameter   "PbulicNetwork.Ip" is not valid.   | 指定的公网Ip格式错误。         |

​	**返回示例：**

```
{
	"Code":"Success,
	"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

### 5.CreatePrivateNetwork

​	**Action:CreatePrivateNetwork**

​	**描述：** 给一个Vdc创建一个私网

​	**请求地址:** cdsapi.capitalonline.net/network

​	**请求方法：POST**

​	**请求参数：**

| 名称   | 类型   | 是否必选 | 示例值                               | 描述                            |
| ------ | ------ | -------- | ------------------------------------ | ------------------------------- |
| VdcId  | string | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 云服务器所属的Vdc               |
| Name   | string | 否       | siwang1                              | 私网名称，默认不写名称是私网1/2 |
| Type   | string | 否       | auto                                 | 私网类型                        |
| Address | string | 否       | 192.168.0.0                          | 私网地址                        |
| Mask   | string | 否       | 16                                   | 私网掩码                        |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                     | 错误信息                                           | 描述                   |
| -------- | -------------------------- | -------------------------------------------------- | ---------------------- |
| 400      | InvalidVDCID.Malformed     | The specified parameter   "VDCID" is not valid.    | 指定VDCID参数格式错误  |
| 400      | QuotaExceed.PrivateNetwork | The   maximum number of PrivateNetwork is exceeded | 创建的私网数量超出限制 |

​	**返回示例：**

```
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

​	**代码调用示例:**

```python
def create_private(vdc_id):
    action = "CreatePrivateNetwork"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL)
    body = {
        "VdcId": vdc_id,
      	"Name": "私网"
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
```

### 6.ModifyPublicNetwork

​	**Action:ModifyPublicNetwork**

​	**描述：** 变更Vdc的公网带宽大小或者类型

​	**请求地址:** cdsapi.capitalonline.net/network

​	**请求方法：GET**

​	**请求参数：**

| 名称     | 类型   | 是否必选 | 示例值                               | 描述     |
| -------- | ------ | -------- | ------------------------------------ | -------- |
| PublicId | string | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 公网id   |
| Qos      | string | 是       | 100                                  | 带宽大小 |

​	**返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                           | 错误信息                                                  | 描述                   |
| -------- | -------------------------------- | --------------------------------------------------------- | ---------------------- |
| 400      | InvalidPublicNetworkID.Malformed | The specified parameter   "PublicNetworkID" is not valid. | 指定公网ID参数格式错误 |

​	**返回示例：**

```
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

​	**代码调用示例:**

```python
def modify_public_qos(publicId, qos):
    """
    修改公网带宽
    @params: publicId: 公网uuid
    @params: qos: 带宽大小
    """
    action = "ModifyPublicNetwork"
    method = "GET"
    param = {
        "PublicId": publicId,
        "Qos": qos
    }
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print result.get("Message")
    task_id = result.get("TaskId")
    return task_id
```

### 7.AddPublicIp

​	**Action:AddPublicIp**

​	**描述：** 为已经购买的公网增加一个公网Ip段

​	**请求地址:** cdsapi.capitalonline.net/network

​	**请求方法：GET**

​	**请求参数：**

| 名称     | 类型     | 是否必选 | 示例值                               | 描述                                  |
| -------- | -------- | -------- | ------------------------------------ | ------------------------------------- |
| PublicId | string   | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 公网id                                |
| Number   | Interger | 是       | 8                                    | 购买的Ip数量，可选参数:{4,8,16,32,64} |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                            | 错误信息                                                   | 描述                   |
| -------- | --------------------------------- | ---------------------------------------------------------- | ---------------------- |
| 400      | InvalidPublicNetwork.IP.Malformed | The specified parameter   "PbulicNetwork.IP" is not valid. | 指定的公网IP格式错误。 |

​	**返回示例：**

```
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}	
```

​	**代码调用示例:**

```python

```

### 8.DeletePublicIp

​	**Action:DeletePublicIp**

​	**描述：** 删除Vdc公网下的一个Ip段

​	**请求地址:** cdsapi.capitalonline.net/network

​	**请求方法：GET**

​	**请求参数：**

| 名称      | 类型   | 是否必选 | 示例值                               | 描述         |
| --------- | ------ | -------- | ------------------------------------ | ------------ |
| SegmentId | string | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 公网Ip段的Id |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                | 错误信息                                       | 描述                 |
| -------- | --------------------- | ---------------------------------------------- | -------------------- |
| 400      | InvalidIpId.Malformed | The specified parameter   "IpId" is not valid. | 指定IpId参数格式错误 |

​	**返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376",
}
```

​	**代码调用示例:**

```python

```

### 9.DeletePublicNetwork

​	**Action:DeletePublicNetwork**

​	**描述：** 删除Vdc下已经创建的公网Ip及带宽

​	**请求地址:** cdsapi.capitalonline.net/network

​	**请求方法：GET**

​	**请求参数：**

| 名称     | 类型   | 是否必选 | 示例值                               | 描述   |
| -------- | ------ | -------- | ------------------------------------ | ------ |
| PublicId | string | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 公网Id |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |
| 400      | InvalidPublicID.Malformed | The specified parameter   "PublicID" is not valid. | 指定公网ID参数格式错误 |

​	**返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376",
}
```

### 10.DeletePrivateNetwork

​	**Action:DeletePrivateNetwork**

​	**描述：** 删除Vdc下已经创建的私网

​	**请求地址:** cdsapi.capitalonline.net/network

​	**请求方法：GET**

​	**请求参数：**

| 名称      | 类型   | 是否必选 | 示例值                               | 描述   |
| --------- | ------ | -------- | ------------------------------------ | ------ |
| PrivateId | string | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 私网Id |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                     | 错误信息                                            | 描述                   |
| -------- | -------------------------- | --------------------------------------------------- | ---------------------- |
| 400      | InvalidPrivateId.Malformed | The specified parameter   "PrivateID" is not valid. | 指定私网Id参数格式错误 |

​	**返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376",
}
```

### 11.RenewPublicNetwork

​	**Action:RenewPublicNetwork**

​	**描述：** 修改公网的自动续约为开或者关

​	**请求地址:** cdsapi.capitalonline.net/network

​	**请求方法：GET**

​	**请求参数：**

| 名称      | 类型     | 是否必选 | 示例值                               | 描述                                             |
| --------- | -------- | -------- | ------------------------------------ | ------------------------------------------------ |
| PublicId  | string   | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 公网Id                                           |
| AutoRenew | Interger | 是       | 1                                    | 是否自动续费，1为自动续费（默认），0为不自动续费 |

​	**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

​	**错误码：**

| httpcode | 错误码                    | 错误信息                                            | 描述                   |
| -------- | ------------------------- | --------------------------------------------------- | ---------------------- |
| 400      | InvalidPublicId.Malformed | The specified parameter   "PrivateID" is not valid. | 指定公网Id参数格式错误 |

​	**返回示例：**

```json
{
"Code":"Success",
"Message":"Success."
}
```

### 12.DescribeBandwidthTraffic

​	**Action:DescribeBandwidthTraffic**

​	**描述：** 获取网络最近五分钟流量

​	**请求地址:** cdsapi.capitalonline.net/network

​	**请求方法：GET**

​	**请求参数：**

| 名称      | 类型   | 是否必选 | 示例值                               | 描述                                                     |
| --------- | ------ | -------- | ------------------------------------ | -------------------------------------------------------- |
| NetworkId | string | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 网络Id(若查询公网即为PublicId， 若查询私网即为PrivateId) |

​	**返回参数：**

| 名称 | 类型     | 示例值  | 描述     |
| :--- | -------- | :------ | :------- |
| Code | Interger | Success | 错误码   |
| Data | string   | {}      | 返回数据 |

​	**错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |
| 400      | InvalidPublicId.Malformed | The specified parameter   "PublicId" is not valid. | 指定公网Id参数格式错误 |

​	**返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "LastFiveMinutesUsage": {
            "Inbps": 0,
            "Outbps": 107.467
        },
        "MaxQos": 5
    },
    "Message": "Success."
}
```

## 账单相关

### 1.DescribeBill

   **Action: DescribeBill**

​	**描述：** 查询账单

   **请求地址:** cdsapi.capitalonline.net/billing

   **请求方法：GET**

   **请求参数：**

| 名称     | 类型   | 是否必选 | 示例值       | 描述       |
| -------- | ------ | -------- | ------------ | ---------- |
| DateFromTo | string | 是       | 2019.09.02 - 2019.09.03 | 账单区间("-"左右有一个空格) |

   **返回参数：**

| 名称            | 类型     | 示例值                               | 描述             |
| :-------------- | -------- | :----------------------------------- | :--------------- |
| Code            | Interger | Success                              | 错误码           |
| Data            | string   |                                      |                  |
| TotalMasterCost | Float    | 10.90                                | 主账户消费金额   |
| TotalViceCost   | Float    | 11.92                                | 副账户消费金额   |
| BillInfo        | List     | []                                   | 账单记录         |
| RegionId        | String   | CN_Beijing_E                         | 节点ID           |
| ResourceId      | String   | 2e579aa0-f54f-11e9-814d-f6de00b3aa12 | 资源ID           |
| ResourceName    | String   | test                                 | 资源名称         |
| ResourceType    | String   | vm                                   | 资源类型         |
| TotalCost       | Float    | 9.62                                 | 该资源消费       |
| VdcId           | String   | b420f679-80a7-44f7-bf08-6e3bfadf3400 | 虚拟数据中心ID   |
| VdcName         | String   | testVdc                              | 虚拟数据中心名称 |
| CreateTime      | String   | 2019-10-23 12:40:04                  | 创建时间         |
| DeleteTime      | String   |                                      | 删除时间         |

​	**错误码:**

| httpcode | 错误码                    | 错误信息                                            | 描述                   |
| -------- | ------------------------- | --------------------------------------------------- | ---------------------- |
| 400      | InvalidPublicId.Malformed | The specified parameter   "PrivateID" is not valid. | 指定公网Id参数格式错误 |

​	**返回示例:**

```json
{
    "Code": "success",
    "Data": {
        "BillInfo": [
            {
                "CreateTime": "2019-10-23 12:40:04",
                "DeleteTime": "",
                "RegionId": "CN_Beijing_E",
                "ResourceId": "2e579aa0-f54f-11e9-814d-f6de00b3aa12",
                "ResourceName": "prometheus_grafana",
                "ResourceType": "vm",
                "TotalCost": 9.62,
                "VdcId": "b420f679-80a7-44f7-bf08-6e3bfadf3400",
                "VdcName": "北京五"
            },
            {
                "CreateTime": "2019-10-23 11:30:51",
                "DeleteTime": "",
                "RegionId": "CN_Beijing_E",
                "ResourceId": "82210d38-f545-11e9-b7e9-0242ac110002",
                "ResourceName": "ip",
                "ResourceType": "ip",
                "TotalCost": 5.54,
                "VdcId": "b420f679-80a7-44f7-bf08-6e3bfadf3400",
                "VdcName": "北京五"
            },
            {
                "CreateTime": "2019-10-23 11:30:51",
                "DeleteTime": "",
                "RegionId": "CN_Beijing_E",
                "ResourceId": "834db44a-f545-11e9-b7e9-0242ac110002",
                "ResourceName": "公网1",
                "ResourceType": "wan",
                "TotalCost": 31.25,
                "VdcId": "b420f679-80a7-44f7-bf08-6e3bfadf3400",
                "VdcName": "北京五"
            },
            {
                "CreateTime": "2019-10-23 11:13:21",
                "DeleteTime": "",
                "RegionId": "CN_Beijing_C",
                "ResourceId": "113222ee-f543-11e9-a759-0242ac110002",
                "ResourceName": "ip",
                "ResourceType": "ip",
                "TotalCost": 5.67,
                "VdcId": "78eef50b-4c3e-4854-9f77-ce33065a6905",
                "VdcName": "test北京3"
            },
            {
                "CreateTime": "2019-10-23 11:13:21",
                "DeleteTime": "",
                "RegionId": "CN_Beijing_C",
                "ResourceId": "11778992-f543-11e9-a759-0242ac110002",
                "ResourceName": "公网1",
                "ResourceType": "wan",
                "TotalCost": 12.41,
                "VdcId": "78eef50b-4c3e-4854-9f77-ce33065a6905",
                "VdcName": "test北京3"
            },
            {
                "CreateTime": "2019-10-22 10:31:23",
                "DeleteTime": "",
                "RegionId": "CN_Beijing_A",
                "ResourceId": "0a45b9ca-f474-11e9-88e8-f6de00b3aa12",
                "ResourceName": "jiao",
                "ResourceType": "vm",
                "TotalCost": 9.82,
                "VdcId": "f5afe607-5848-41b3-9c15-d5ba8fc0721b",
                "VdcName": "fasdfdsafa"
            },
            {
                "CreateTime": "2019-04-19 15:22:43",
                "DeleteTime": "2019-08-26 12:22:38",
                "RegionId": "EUR_Netherlands_A",
                "ResourceId": "49751",
                "ResourceName": "template_STO",
                "ResourceType": "template_STO",
                "TotalCost": 2.66,
                "VdcId": "",
                "VdcName": ""
            },
            {
                "CreateTime": "2017-09-28 15:35:52",
                "DeleteTime": "",
                "RegionId": "US_Dallas_A",
                "ResourceId": "065201c1-0041-414d-97c8-d8415bd507a6",
                "ResourceName": "GET请求",
                "ResourceType": "oss",
                "TotalCost": 0,
                "VdcId": "",
                "VdcName": ""
            }
        ],
        "TotalMasterCost": 0,
        "TotalViceCost": 76.97
    },
    "Message": "bill day query success",
    "TaskId": ""
}
```

### 2.DescribeBillInfo

   **Action: DescribeBillInfo**

​	**描述：** 查询账单

   **请求地址:** cdsapi.capitalonline.net/billing

   **请求方法：GET**

   **请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                               | 描述         |
| ---------- | ------ | -------- | ------------------------------------ | ------------ |
| DateFrom   | string | 是       | 2019.09.02                           | 账单开始时间 |
| DateTo     | String | 是       | 2019.09.03                           | 账单结束时间 |
| ResourceId | String | 是       | 2e579aa0-f54f-11e9-814d-f6de00b3aa12 | 资源ID       |

   **返回参数：**

| 名称          | 类型     | 示例值                                                       | 描述             |
| :------------ | -------- | :----------------------------------------------------------- | :--------------- |
| Code          | Interger | Success                                                      | 错误码           |
| Data          | string   |                                                              |                  |
| TotalCost     | Float    | 9.62                                                         | 查询资源总消费   |
| BillDetail    | List     | []                                                           | 账单记录         |
| RegionId      | String   | CN_Beijing_E                                                 | 节点ID           |
| ResourceId    | String   | 2e579aa0-f54f-11e9-814d-f6de00b3aa12                         | 资源ID           |
| ResourceName  | String   | test                                                         | 资源名称         |
| ResourceType  | String   | vm                                                           | 资源类型         |
| VdcId         | String   | b420f679-80a7-44f7-bf08-6e3bfadf3400                         | 虚拟数据中心ID   |
| VdcName       | String   | testVdc                                                      | 虚拟数据中心名称 |
| CreateTime    | String   | 2019-10-23 12:40:04                                          | 创建时间         |
| Configuration | String   | 高性能云主机:系统硬盘:60GB,vCPU:4C,内存:8GB,操作系统:CDS-OS-CentOS7.6-64bit-General-V3 | 配置简介         |
| CostDetail    | String   | 高性能云主机:系统硬盘:0E-8,vCPU:0.00202508,内存:0.01215040,操作系统:0E-8 | 消费详情         |
| StartTime     | String   | 1571846400                                                   | 账单开始时间戳   |
| EndTime       | String   | 1571846400                                                   | 账单结束时间戳   |
| PayType       | String   | 1                                                            | 计费类型         |
| PayDesc       | String   | 按需计费                                                     | 计费类型描述     |
| Status        | String   | running                                                      | 资源状态         |
| UnitPrice     | Float    | 0.01417548                                                   | 资源单价         |
| IPs           | List     | []                                                           | IP列表           |

​	**返回示例:**

```json
{
    "Code": "success",
    "Data": {
        "BillDetail": [
            {
                "Configuration": "高性能云主机:系统硬盘:60GB,vCPU:4C,内存:8GB,操作系统:CDS-OS-CentOS7.6-64bit-General-V3",
                "CostDetail": "高性能云主机:系统硬盘:0E-8,vCPU:0.00202508,内存:0.01215040,操作系统:0E-8",
                "CreateTime": "2019-10-23 12:40:04",
                "EndTime": 1571846400,
                "IPs": [
                    "118.186.60.2"
                ],
                "PayDesc": "按需计费",
                "PayType": "1",
                "RegionId": "CN_Beijing_E",
                "ResourceId": "2e579aa0-f54f-11e9-814d-f6de00b3aa12",
                "ResourceName": "prometheus_grafana",
                "StartTime": 1571805679,
                "Status": "running",
                "TotalCost": 9.62,
                "UnitPrice": 0.01417548,
                "VdcId": "b420f679-80a7-44f7-bf08-6e3bfadf3400",
                "VdcName": "北京五"
            }
        ],
        "TotalCost": 9.62
    },
    "Message": "bill details query success",
    "TaskId": ""
}
```
## 冷云计量相关

### 1.GetMetering

   **Action: GetMetering**

​  **描述：** 获取客户一个或多个存储池计量信息

   **请求地址:** cdsapi.capitalonline.net/ccs-product

   **请求方法：GET**

   **请求参数：**

| 名称     | 类型   | 是否必选 | 示例值       | 描述       |
| -------- | ------ | -------- | ------------ | ---------- |
| EndTime | string | 是       | "20191101" | 获取截止到EndTime的计量信息 |
| Uid | string | 否       | "1001" | 单独获取这个存储池的计量信息 |

   **返回参数：**

| 名称            | 类型     | 示例值                               | 描述             |
| :-------------- | -------- | :----------------------------------| :---------------|
| Code            | string   | Success                            | 错误码           |
| Message         | string   | uid不存在                           | 错误信息         |
| Data            | string   | []                               | 客户计量信息      |

​	**错误码:**

| httpcode | 错误码                    | 错误信息                                            | 描述                   |
| -------- | ------------------------- | --------------------------------------------------- | --------------------|
| 400      | InvalidParamater          | 非法的CustomerId                                     | 非法的CustomerId。   |
| 400      | InvalidParamater          | uid不存在                                            | uid不存在            |
| 400      | InvalidParameter.IsNull   | 缺少必要参数                                          | 缺少必要参数          |
​	**返回示例:**

```json
{
    "Code": "Success",
    "Data": [
        {
            "Cold": 165.1226,
            "Id": "2001",
            "Name": "wlj_存储池1",
            "TotalSize": "10240",
            "Warm": 37.9796
        }
    ],
    "Message": "Success."
}
```
​	**请求调用示例**

```python
def get_metering(end_time, uid=None):
    """
    查询账号下的存储池计量信息
    @params: end_time: 获取截止到end_time的计量信息
    @params: uid: 要查询的存储池Id不传则是查询所有存储池计量信息
    """
    action = "GetMetering"
    method = "GET"
    param = {
        "EndTime": end_time
    }
    if uid:
        param.update({'Uid': uid})
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        # return result.get("Message")
        return result
    print(result)
    return result.get("Data")
```


## 其他公共接口

### 1.DescribeAvailableResource

​	**Action：DescribeAvailableResource**

​	**描述：** 查询节点下网络类型计费方式和云服务器类型

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：GET**

​	**请求参数：**

| 名称     | 类型   | 是否必选 | 示例值       | 描述       |
| -------- | ------ | -------- | ------------ | ---------- |
| RegionId | string | 是       | CN_Beijing_A | 可用区编号 |

​	**返回参数：**

| 名称 | 类型     | 示例值  | 描述   |
| :--- | -------- | :------ | :----- |
| Code | Interger | Success | 错误码 |
| Data | string   |         |        |

​	**错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                     |
| -------- | ------------------------- | -------------------------------------------------- | ------------------------ |
| 400      | InvalidRegionID.Malformed | The specified parameter   "RegionID" is not valid. | 指定可用区ID参数格式错误 |

​	**返回示例：**

```json
{
    "Message":"Success.",
    "Code":"Success",
    "Data":{
        "WanGoods":[
            {
                "BillingMethod":[
                    {
                        "MaxQos":500,
                        "Key":"Bandwidth"
                    }
                ],
                "Type":"DDos"
            },
            {
                "BillingMethod":[
                    {
                        "MaxQos":500,
                        "Key":"Bandwidth"
                    },
                    {
                        "MaxQos":51200,
                        "Key":"DataPackage"
                    },
                    {
                        "MaxQos":500,
                        "Key":"Traffic"
                    }
                ],
                "Type":"Bandwidth_Tow_Line_BGP"
            },
            {
                "BillingMethod":[
                    {
                        "MaxQos":51200,
                        "Key":"DataPackage"
                    },
                    {
                        "MaxQos":500,
                        "Key":"Bandwidth"
                    }
                ],
                "Type":"Bandwidth_China_Optimized"
            },
            {
                "BillingMethod":[
                    {
                        "MaxQos":500,
                        "Key":"Traffic"
                    },
                    {
                        "MaxQos":500,
                        "Key":"Bandwidth"
                    }
                ],
                "Type":"Bandwidth_BGP"
            }
        ],
        "RegionId":"CN_Beijing_A",
        "InstanceGoods":[
            {
                "ImageGoods":{
                    "PublicImage":[
                        {
                            "GicDisplayName":"CDS-OS-CentOS7.6-64bit-General-V2",
                            "ImageType":"centos",
                            "ImageId":"Centos_7.6_64"
                        }
                    ],
                    "PrivateImages":[
                        {
                            "GicDisplayName":"fefefefef",
                            "ImageType":"centos",
                            "ImageId":"38ef3c80-760f-11e9-9fd4-0242ac11001c"
                        },
                        {
                            "GicDisplayName":"ttt",
                            "ImageType":"centos",
                            "ImageId":"e39a1fd4-7235-11e9-b26c-0242ac11001c"
                        },
                        {
                            "GicDisplayName":"as",
                            "ImageType":"centos",
                            "ImageId":"24ee2d8c-7230-11e9-882f-0242ac11001c"
                        },
                        {
                            "GicDisplayName":"test-rrr",
                            "ImageType":"centos",
                            "ImageId":"3ac59da8-5b5f-11e9-8334-0242ac11000c"
                        },
                        {
                            "GicDisplayName":"y",
                            "ImageType":"centos",
                            "ImageId":"7057622c-3c00-11e9-a42b-0242ac11000c"
                        },
                        {
                            "GicDisplayName":"rrrr",
                            "ImageType":"centos",
                            "ImageId":"f7ce04ea-5ab4-11e9-8ee0-0242ac11000e"
                        }
                    ]
                },
                "DiskGoods":[
                    {
                        "MinSize":50,
                        "MaxSize":4000,
                        "Type":"big_disk",
                        "Step":50
                    },
                    {
                        "MinSize":100,
                        "MaxSize":4000,
                        "Type":"high_disk",
                        "Step":100
                    }
                ],
                "InstanceType":"high_ccs"
            },
        ],
        "RegionName":"北京-可用区A"
    }
}
```

​	**请求调用示例**

```python
def get_region_goods(site_code):
    """
    @params: site_code: 区域代码
    """
    action = "DescribeAvailableResource"
    method = "GET"
    param = {
        "RegionId": site_code,
        "AvailableResource": "1"
    }
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print "get site goods error."
        return None
    data = result.get("Data")
    wan_goods = data.get("WanGoods")
    vm_goods = data.get("InstanceGoods")
    return wan_goods, vm_goods
```



### 2.**DescribeTask**

​	**Action：DescribeTask**

​	**描述：** 查询任务状态

​	**请求地址:** cdsapi.capitalonline.net/ccs

​	**请求方法：GET**

​	**请求参数：**

| 名称   | 类型   | 是否必选 | 示例值                               | 描述d  |
| ------ | ------ | -------- | ------------------------------------ | ------ |
| TaskId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 任务Id |

​	**返回参数：**

| 名称       | 类型     | 示例值                               | 描述                                                         |
| :--------- | -------- | :----------------------------------- | :----------------------------------------------------------- |
| Code       | Interger | Success                              | 错误码                                                       |
| Message    | string   |                                      | 提示信息                                                     |
| ResourceId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 资源Id列表                                                   |
| TaskId     | string   | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 任务Id                                                       |
| Status     | string   | finish                               | 任务执行的状态[NEW,DOING,FINISH,ERROR],分别对应新增，正在执行，完成，错误 |

​	**错误码：**

| httpcode | 错误码                  | 错误信息                                         | 描述                       |
| -------- | ----------------------- | ------------------------------------------------ | -------------------------- |
| 400      | InvalidTaskID.Malformed | The specified parameter   "TaskID" is not valid. | 指定云服务器ID参数格式错误 |

​	**返回示例：**

```json
{
    "Message":"Success.",
    "Code":"Success",
    "Data":{
        "Status":"DOING",
        "ResourceId":"6b83fec0-ad13-11e9-adc1-0242ac11035d",
        "TaskType":"orderCreateVM"
    },
    "TaskId":"190982"
}
```

​	**代码调用示例**

```python
def get_status(task_id):
    """
    获取任务状态
    @params: task_id: 任务id
    """
    action = "DescribeTask"
    method = "GET"
    params = {
        "TaskId": task_id
    }
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL, params)
    res = requests.get(url)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print "task status error."
        return None
    return result.get("Data")
```

## 附件一

#### 节点名称

| 节点名称      | RegionId          |
| ------------- | ----------------- |
| 北京1         | CN_Beijing_A      |
| 北京2         | CN_Beijing_B      |
| 北京3         | CN_Beijing_C      |
| 北京4（测试） | CN_Beijing_D      |
| 北京5         | CN_Beijing_E      |
| 北京6（测试） | CN_Beijing_F      |
| 达拉斯1       | US_Dallas_A       |
| 达拉斯2       | US_Dallas_B       |
| 达拉斯3       | US_Dallas_C       |
| 德国1         | EUR_Germany_A     |
| 德国2         | EUR_Germany_B     |
| 东京1         | APAC_Tokyo_A      |
| 广州1         | CN_Guangzhou_A    |
| 荷兰1         | EUR_Netherlands_A |
| 洛杉矶1       | US_LosAngeles_A   |
| 纽约1         | US_NewYork_A      |
| 上海1         | CN_Shanghai_A     |
| 上海2（测试） | CN_Shanghai_B     |
| 首尔1         | APAC_Seoul_A      |
| 台北1         | CN_Taipei_A       |
| 无锡1         | CN_Wuxi_A         |
| 香港1         | CN_Hongkong_A     |
| 新加坡1       | APAC_Singapore_A  |
| 新加坡2       | APAC_Singapore_B  |
| 孟买1         | APAC_Mumbai_A     |

## 附件二

#### 主机类型

| 计算类型配置名称 | 计算类型ID |
| ---------------- | ---------- |
| IO增强型         | IO         |
| 高性能型         | High       |
| 标准型           | Standard   |
| 通用型           | General    |
| 均衡型           | Balance    |
| 紧凑型           | Compact    |
| 内存型           | Memory     |
| 独享型           | Exclusive  |
| 高I/O型          | HighIO     |
| 计算型           | Compute    |
| G2.通用型        | G2_General |
| G2.计算型        | G2_Compute |
| G2.内存型        | G2_Memory  |

## 附件三

#### 带宽类型

| 带宽类型       | 带宽ID                             |
| -------------- | ---------------------------------- |
| 移动           | Bandwidth_CMCC                     |
| 联通           | Bandwidth_China_Unicom             |
| 菲律宾优化带宽 | Southeast_Asia_Optimizes_Bandwidth |
| IPv6测试       | Test_Ipv6                          |
| 日本本地带宽   | Bandwidth_Japan_Locally            |
| 韩国本地带宽   | Bandwidth_Korea_Locally            |
| BGP            | Bandwidth_BGP                      |
| 韩国优化       | Bandwidth_Korea_Optimized          |
| 台湾优化       | Bandwidth_Taiwai_Optimized         |
| 电信           | Bandwidth_China_Telecom            |
| 双线BGP        | Bandwidth_Tow_Line_BGP             |
| BGP-中国优化   | Bandwidth_China_Optimized          |
| 客户专用带宽   | Customer_Specific_Bandwidth        |
| VIP专用带宽    | Bandwidth_VIP_Dedicated            |
| 全球优化BGP    | Globally_Optimized_BGP             |

## 附件四

#### 公共模板

| 模板大类型 | 模板类型                         | 中文名称                               |
| ---------- | -------------------------------- | -------------------------------------- |
| Centos     | Centos_7.6_64                    |                                        |
|            | Centos_7.5_64                    |                                        |
|            | Centos_7.4_64                    |                                        |
|            | Centos_7.3_64                    |                                        |
|            | Centos_7.2_64                    |                                        |
|            | Centos_7.1_64                    |                                        |
|            | Centos_7.0_64                    |                                        |
| Debian     | Debian_8.1_64                    |                                        |
|            | Debian_8.1_32                    |                                        |
|            | Debian_7.8_64                    |                                        |
| Redhat     | Redhat_6.5_64                    |                                        |
|            | Redhat_5.10_64                   |                                        |
| Ubuntu     | Ubuntu_16.04_64                  |                                        |
|            | Ubuntu_14.04_64                  |                                        |
|            | Ubuntu_14.10_64                  |                                        |
| Windows    | Windows_2008_R2_Enterprise_64_CN | Windows 2008 R2 企业版 64位 中文版     |
|            | Windows_2008_Enterprise_32_EN    | Windows 2008 企业版 32位 英文版        |
|            | Windows_2008_Enterprise_32_CN    | Windows 2008 企业版 32位 中文版        |
|            | Windows_2008_Enterprise_64_EN    | Windows 2008 企业版 64位 英文版        |
|            | Windows_2008_Enterprise_64_CN    | Windows 2008 企业版 64位 中文版        |
|            | Windows_2012_R2_Standard_64_EN   | Windows 2012 R2 标准版 64位 英文版     |
|            | Windows_2012_R2_Standard_64_CN   | Windows 2012 R2 标准版 64位 中文版     |
|            | Windows_2012_R2_Datacenter_64_EN | Windows 2012 R2 数据中心版 64位 英文版 |
|            | Windows_2012_R2_Datacenter_64_CN | Windows 2012 R2 数据中心版 64位 中文版 |
|            | Windows_2012_Standard_64_EN      | Windows 2012 标准版 64位 英文版        |
|            | Windows_2012_Standard_64_CN      | Windows 2012 标准版 64位 中文版        |
|            | Windows_2012_Datacenter_64_EN    | Windows 2012 数据中心版 64位 英文版    |
|            | Windows_2012_Datacenter_64_CN    | Windows 2012 数据中心版 64位 中文版    |
|            | Windows_2016_Datacenter_64_EN    | Windows 2016 数据中心版 64位 英文版    |
|            | Windows_2016_Datacenter_64_CN    | Windows 2016 数据中心版 64位 中文版    |

## 示例

### 1.获取请求url

​	**代码示例**

```python
def percentEncode(str):
  	"""转换特殊符号"""
    res = urllib.quote(str.decode(sys.stdin.encoding).encode('utf8'), '') 
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
    url = url + '/?' + urllib.urlencode(D)
    return url
```

​	**返回示例**

```json
http://cdsapi.capitalonline.net/ccs/?SignatureVersion=1.0&Timestamp=2019-09-22T05%3A37%3A47Z&AccessKeyId=AccessKeyId&SignatureMethod=HMAC-SHA1&Version=2019-08-08&Signature=****&Action=CreateInstance&SignatureNonce=1c276ff3-dcfb-11e9-bcd1-1c36bbed2c63
```



### 2.获取虚拟数据中心公网信息

​	**请求代码**

```python
def descrive_public_qos(vdc_id):
    """
    vdc公网带宽大小
    @params: vdc_id: 虚拟数据中心uuid
    @return: qos: 带宽大小
    """
    
    action = "DescribeVdc"
    method = "GET"
    param = {"VdcId": vdc_id}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print "get vdc info error."
    data = result.get("Data")
    if len(data) > 0:
        vdcInfo = data[0]
    else:
        # 未查询到虚拟数据中心
        return None
    pub = vdcInfo.get("PublicNetwork")
    return pub
```

​	**返回示例**

```python
[
    {
        "Stats":"ok",
        "Qos":5,
        "Name":"pblic",
        "Segments":[
            {
                "Mask":29,
                "Gateway":"114.112.34.81",
                "SegmentId":"7711db3e-da9c-11e9-82f4-0242ac110002",
                "Address":"114.112.34.80"
            }
        ],
        "nseIpNm":5,
        "PblicId":"7753b676-da9c-11e9-82f4-0242ac110002"
    }
]
```

**注意:**返回格式为列表，一个虚拟数据中心下可同时存在过个公网

### 3.获取机器信息

​	**请求代码**

```python
def descrive_vm(vm_id=None, vdc_id=None, pub_ip=None):
    """
    根据vm_id、vdc_id或者公网ip获取主机信息
    @params: vm_id: 通过主机ID
    @params: vdc_id: 虚拟数据中心ID、获取数据中心下所有实例
    @params: pub_ip: 公网ip、通过公网IP查询
    """
    action = "DescribeInstances"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    body = {}
    if vm_id:
        body.update({"InstanceId": vm_id})
    if vdc_id:
        body.update({"VdcId": vdc_id})
    if pub_ip:
        body.update({"PubIp": pub_ip})
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print "get vm error."
        return None
    return result.get("Data")
```

​	**返回示例**

```python
{
    "Instances":[
        {
            "InstanceStatus":"running",
            "PrivateNetworkInterface":[
                {
                    "InterfaceId":"1de68c6a-dcfb-11e9-8dd9-0242ac1107f9",
                    "Name":"Private1",
                    "IP":"10.240.0.1",
                    "MAC":"00:50:56:a4:5e:f7",
                    "Connected":1,
                    "PrivateId":"734934c6-4e51-11e8-992f-0242ac110002"
                }
            ],
            "InstanceId":"1de33272-dcfb-11e9-8dd9-0242ac1107f9",
            "Disks":{
              "SystemDisk":{
                "Size": 60,
                "IopsSize":600
              },
                "LeftDataDiskNum":14,
                "DataDisks":[]
            },
            "VdcId":"c07a10c6-afa0-4d50-8448-995d5ea1f651",
            "PublicNetworkInterface":{
                "InterfaceId":"6d5856e2-dcfc-11e9-a352-82ae5dae5b46",
                "PublicId":"7753b676-da9c-11e9-82f4-0242ac110002",
                "Name":"public",
                "IP":"",
                "MAC":"00:50:56:a4:1f:6d",
                "Connected":1
            },
            "InstanceChargeType":"PostPaid",
            "VdcName":"Beijing-TerraformTest",
            "InstanceName":"TerraformTest"
        }
    ]
}
```

### 4.创建云主机实例

​	**请求代码**

```python
def create_vm(RegionId, VdcId, InstanceName, InstanceType, ImageId, Amount):
    """
    创建虚拟数据中心
    @params: RegionId: 区域ID
    @params: VdcId: 虚拟数据中心ID
    @params: InstanceName: 要创建的云主机名称
    @params: InstanceType: 创建的主机类型
    @params: ImageId: 镜像ID
    @parmas: Amount: 创建数量
    """
    action = "CreateInstance"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL, param={})
    body = {
        "RegionId": RegionId,
        "VdcId": VdcId,
        "InstanceName": InstanceName,
        "Cpu": 4,
        "Ram": 4,
        "InstanceType": InstanceType,
        "ImageId": ImageId,
        "DataDisks": [],
        "InstanceChargeType": "PostPaid",
        "Password": "123abc,.;",
        "AutoRenew": 1,
        "PrepaidMonth": 1,
        "Amount": Amount,
        "PublicIp": ["auto"],
        "PrivateIp": ""
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print ("create vm error: %s" % result.get("Message"))
        return None
    return result.get("TaskId")
```

​	**返回示例**

```json
{
  "Message": "Success.", 
  "Code": "Success", 
  "Data": {}, 
  "TaskId": "7424648"
}
```

​	**注意**

```md
TaskId可以通过DescribeTask接口获取任务状态并返回资源uuid
```

### 5.修改公网带宽

​	**代码示例**

```python
def modify_public_qos(publicId, qos):
    """
    修改公网带宽
    @params: publicId: 公网uuid、可从DescribeVdc获取
    @params: qos: 带宽大小
    """
    action = "ModifyPublicNetwork"
    method = "GET"
    param = {
        "PublicId": publicId,
        "Qos": qos
    }
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print result.get("Message")
        return None
    task_id = result.get("TaskId")
    return task_id
```

​	**返回示例**

```json
{
  "Message": "Success.", 
  "Code": "Success", 
  "Data": {}, 
  "TaskId": "7424648"
}
```

​	**注意**

```md
TaskId可以通过DescribeTask接口获取任务状态
```

### 6.修改云主机实例计费类型

​	**代码示例**

```python
def modify_vm_charge_type(vm_id, ):
    """
    修改云主机实例计费方式，只允许按需计费转换为包年包月
    """
    action = ""
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    body = {
        "InstanceId": vm_id,
        "InstanceChargeType": "PrePaid",
        "AutoRenew": 1,
        "PrepaidMonth": 1
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print result.get("Message")
        return None
    return True
```

​	**返回示例**

```json
{
  "Message": "Success.", 
  "Code": "Success", 
  "Data": {"order_audit": 0}, 
  "TaskId": "0"
}
```

### 7.获取任务状态

​	**代码示例**

```python
def get_status(task_id):
    """
    获取任务状态
    @params: task_id: 任务id
    """
    action = "DescribeTask"
    method = "GET"
    params = {
        "TaskId": task_id
    }
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL, params)
    res = requests.get(url)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print "task status error."
        return None
    return result.get("Data")
```

​	**返回示例**

```json
{
  "Message": "Success.", 
  "Code": "Success", 
  "Data": {
    "Status": "FINISH", 
    "ResourceId": "1de33272-dcfb-11e9-8dd9-0242ac1107f9", 
    "TaskType": "newOrderUpdateVM"
  }, 
  "TaskId": "60095b3a-dcfc-11e9-9f67-0242ac110002"
}
```

### 8.定制模板

​	**代码示例**

```python
def create_template(vm_id):
    """
    定制模板
    @params: vm_id: 主机实例ID
    """
    action = "CreateTemplate"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    body = {
        "InstanceId": vm_id,
        "DisplayName": "模板名称",
        "PowerOn": False
    }
    res = requests.get(url, json=body)
    result = json.loads(res.content)
    print result
```

​	**返回示例**

```json
{
  "Message": "Success.", 
  "Code": "Success", 
  "Data": {
    "Status": "FINISH", 
    "ResourceId": "1de33272-dcfb-11e9-8dd9-0242ac1107f9", 
    "TaskType": "newOrderUpdateVM"
  }, 
  "TaskId": "60095b3a-dcfc-11e9-9f67-0242ac110002"
}
```
