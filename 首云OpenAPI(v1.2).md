 目录
=================

   * [首云公开API文档](#首云公开api文档)
     * [认证方式](#认证方式)
       * [1.公共请求参数](#1公共请求参数)
       * [2.签名机制](#2签名机制)
         * [步骤一：构造规范化请求字符串](#步骤一构造规范化请求字符串)
         * [步骤二：构造签名字符串](#步骤二构造签名字符串)
       * [3.获取签名代码](#2获取签名代码)
     * [访问地址](#访问地址)
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
       * [16.StartInstance](#16startinstance)
       * [17.ModifyInstanceName](#17modifyinstancename)
       * [18.DescribeTags](#18describetags)
       * [19.CreateTag](#19createtag)
       * [20.DeleteTag](#20deletetag)
       * [21.AddInstancesTags](#21addinstancestags)
       * [22.DeleteInstancesTags](#22deleteinstancestags)
       * [23.DescribeInstanceType](#23DescribeInstanceType)
       * [24.DescribePublicIp](#24DescribePublicIp)
       * [25.DescribePrivateIp](#25DescribePrivateIp)
       * [26.ResetInstancesPassword](#26ResetInstancesPassword)
       * [27.CreateInstanceHtmlConsoleURL](#27CreateInstanceHtmlConsoleURL)
       * [28.ExtendSystemDisk](#28ExtendSystemDisk)
       * [29.DescribeInstancePrice](#29DescribeInstancePrice)
       * [30.StopInstances](#30StopInstances)
       * [31.StartInstances](#31StartInstances)
       * [32.RebootInstances](#32RebootInstances)
       * [33.BatchAddNetworkInterfaces](#33BatchAddNetworkInterfaces)
       * [34.BatchDeleteNetworkInterfaces](#34BatchDeleteNetworkInterfaces)
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
       * [13.DescribeGPN](#13describegpn)
       * [14.AddAccessPoint](#14addaccesspoint)
       * [15.DeleteAccessPoint](#15deleteaccesspoint)
       * [16.DescribeAccessInfo](#16describeaccessinfo)
       * [17.CreateGPN](#17creategpn)
       * [18.DeleteGPN](#18deletegpn)
       * [19.ModifyVdcName](#19modifyvdcname)
     * [私有网络相关](#私有网络相关)
       * [1.DescribeVPC](#1describevpc)
       * [2.CreateVPC](#2createvpc)
       * [3.DeleteVPC](#3deletevpc)
       * [4.DescribeSubNet](#4describesubnet)
       * [5.CreateSubNet](#5createsubnet)
       * [6.DeleteSubNet](#6deletesubnet)
       * [7.DescribeVirtualGateWay](#7describevirtualgateway)
       * [8.CreateVirtualGateWay](#8createvirtualgateway)
       * [9.DeleteVirtualGateWay](#9deletevirtualgateway)
       * [10.DescribeEIP](#10describeeip)
       * [11.CreateEIP](#11createeip)
       * [12.UpdateEIP](#12updateeip)
       * [13.DeleteEIP](#13deleteeip)
       * [14.BindEIP](#14bindeip)
       * [15.UnbindEIP](#15unbindeip)
       * [16.DescribeBandwidth](#16describebandwidth)
       * [17.CreateBandwidth](#17createbandwidth)
       * [18.UpdateBandwidth](#18updatebandwidth)
       * [19.DeleteBandwidth](#19deletebandwidth)
       * [20.BandwidthAddEIP](#20bandwidthaddeip)
       * [21.BandwidthRemoveEIP](#21bandwidthremoveeip)
       * [22.DescribeIPInfo](#22describeipinfo)
       * [23.NetEIPInfo](#23neteipinfo)
       * [24.ReserveIPAndBindEIP](#24reserveipandbindeip)
       * [25.DescribeSubnetIp](#25describesubnetIp)
       * [26.CreateVLINK](#26createvlink)
       * [27.DeleteVLINK](#27deletevlink)
       * [28.VLINKAddVM](#28vlinkaddvm)
       * [29.VLINKDeleteVM](#29vlinkdeletevm)
     * [裸金属相关](#裸金属相关)
       * [1.DescribeBmsGoods](#1describebmsgoods)
       * [2.DescribeBmsGoodsPrice](#2describebmsgoodsprice)
       * [3.DescribeBmsImage](#3describebmsimage)
       * [4.CreateBmsInstance](#4createbmsinstance)
       * [5.DescribeBms](#5describebms)
       * [6.DescribeBmsDetail](#6describebmsdetail)
       * [7.OperateBmsPower](#7operatebmspower)
       * [8.ReinstallBms](#8ReinstallBms)
       * [9.DescribeBmsVNC](#9describebmsvnc)
       * [10.ModifyBmsOrder](#10modifybmsorder)
       * [11.DescribeBmsTask](#11describebmstask)
       * [12.DeleteBmsInstance](#12describebmstask)
     * [裸金属云盘相关](#裸金属云盘相关)
       * [1.CreateDisk](#1createDisk)
       * [2.AttachDisk](#2attachDisk)
       * [3.DetachDisk](#3detachDisk)
       * [4.DeleteDisk](#4deleteDisk)
       * [5.DescribeDisks](#5describeDisks)
       * [6.DescribeDiskUsage](#6describeDiskUsage)
       * [7.DescribePoolUsage](#7describePoolUsage)
       * [8.ChangeIops](#8changeIops)
       * [9.ChangeBandwidth](#9changeBandwidth)
       * [10.ExpansionSize](#10expansionSize)  
       * [11.CreateSnapshot](#11createSnapshot)  
       * [12.CloneSnapshot](#12cloneSnapshot)  
       * [13.DeleteSnapshot](#13deleteSnapshot)  
       * [14.RollbackSnapshot](#14rollbackSnapshot)  
       * [15.DescribeGoodsId](#15describeGoodsId)        
     * [账单相关](#账单相关)
       * [1.DescribeBill](#1describebill)
       * [2.DescribeBillInfo](#2describebillinfo)
       * [3.DescribeBillDetail](#3describebilldetail)
       * [4.DescribeAccountInfo](#4describeAccountInfo)
       * [5.DescribeCostSummaryByPro](#5describecostsummarybypro)
       * [6.DescribeCostSummaryByProject](#6describecostsummarybyproject)
     * [冷云计量相关](#冷云计量相关)
       * [1.GetMetering](#1GetMetering)
     * [网络告警相关](#网络告警相关)
       * [1.GetWanAlarmReceiver](#1GetWanAlarmReceiver)
       * [2.UpdateWanAlarmReceiver](#2UpdateWanAlarmReceiver)
     * [云桌面相关](#云桌面相关)
       * [1.QueryTask](#1QueryTask)
       * [2.QuerySites](#2QuerySites)
       * [3.QueryProducts](#3QueryProducts)
       * [4.QueryImages](#4QueryImages)
       * [5.QueryVmPrice](#5QueryVmPrice)
       * [6.UpdateOrder](#6UpdateOrder)
       * [7.RenewalOrder](#7RenewalOrder)
       * [8.QuerySubAccounts](#8QuerySubAccounts)
       * [9.CreateSubAccount](#9CreateSubAccount)
       * [10.CreateSubAccounts](#10CreateSubAccounts)
       * [11.ChangeSubAccountName](#11ChangeSubAccountName)
       * [12.ChangeSubAccountRemark](#12ChangeSubAccountRemark)
       * [13.CreateDefaultNet](#13CreateDefaultNet)
       * [14.SupplyDefaultNet](#14SupplyDefaultNet)
       * [15.GetDefaultNet](#15GetDefaultNet)
       * [16.GetCustomNet](#16GetCustomNet)
       * [17.GetLineBillingScheme](#17GetLineBillingScheme)
       * [18.GetEipPrice](#18GetEipPrice)
       * [19.QueryVms](#19QueryVms)
       * [20.QueryVm](#20QueryVm)
       * [21.QueryExpireVms](#21QueryExpireVms)
       * [22.CreateVm](#22CreateVm)
       * [23.OperateVm](#23OperateVm)
       * [24.RebuildVm](#24RebuildVm)
       * [25.DeleteVm](#25DeleteVm)
       * [26.ChangeVmName](#26ChangeVmName)
       * [27.UpdateVmLabels](#27UpdateVmLabels)
       * [28.ChangeAccount](#28ChangeAccount)
       * [29.UnbindAccounts](#29UnbindAccounts)
       * [30.BindAccounts](#30BindAccounts)
       * [31.ConfigNet](#31ConfigNet)
     * [弹性云服务器ECS相关](#弹性云服务器ecs相关)
       * [1.DescribeRegions](#1describeregions)
       * [2.DescribeEcsFamilyInfo](#2describeecsfamilyinfo)
       * [3.DescribeImages](#3describeimages)
       * [4.DescribeInstanceList](#4describeinstancelist)
       * [5.DescribePrice](#5describeprice)
       * [6.DescribeInstance](#6describeinstance)
       * [7.DescribeInstanceStatus](#7describeinstancestatus)
       * [8.DescribeEvent](#8describeevent)
       * [9.DescribeInstanceMonitor](#9describeinstancemonitor)
       * [10.DescribeAccountSubject](#10describeaccountsubject)
       * [11.CreateInstance](#11createinstance)
       * [12.OperateInstance](#12operateinstance)
       * [13.DeleteInstance](#13deleteinstance)
       * [14.ModifyInstancePassword](#14modifyinstancepassword)
       * [15.ModifyInstanceName](#15modifyinstancename)
       * [16.CreateImage](#16createimage)
       * [17.DeleteImage](#17deleteimage)
       * [18.SyncImage](#18syncimage)
     * [云盘EBS相关](#云盘ebs相关)
       * [1.CreateDisk](#1createdisk-1)
       * [2.DeleteDisk](#2deletedisk)
       * [3.DetachDisk](#3detachdisk-1)
       * [4.AttachDisk](#4attachdisk)
       * [5.ExtendDisk](#5extenddisk)
       * [6.DescribeDiskQuota](#6describediskquota)
       * [7.DescribeDiskList](#7describedisklist)
       * [8.DescribeDisk](#8describedisk)
       * [9.DescribeEcsAttachDisks](#9describeecsattachdisks)
       * [10.DescribeEvent](#10describeevent)
     * [快照SNAPSHOT相关](#快照snapshot相关)
       - [1.DescribeSnapshotList](#1describesnapshotlist)
       - [2.DescribeSnapshot](#2describesnapshot)
       - [3.DescribeSnapshotChainList](#3describesnapshotchainlist)
       - [4.DescribeSnapshotChain](#4describesnapshotchain)
       - [5.CreateSnapshot](#5createsnapshot)
       - [6.RollbackDiskBySnapshot](#6rollbackdiskbysnapshot)
       - [7.RenameSnapshot](#7renamesnapshot)
       - [8.DeleteSnapshot](#8deletesnapshot)
       - [9.DescribeSnapshotQuota](#9describesnapshotquota)
       - [10.CreateImageBySnapshot](#10reateimagebysnapshot)
       - [11.CopySnapshotCrossAZ](#11copysnapshotcrossaz)
     * [其他公共接口](#其他公共接口)
       * [1.DescribeAvailableResource](#1describeavailableresource)
       * [2.DescribeTask](#2describetask)
     * [附件一](#附件一)
           * [可用区名称](#可用区名称)
     * [附件二](#附件二)
           * [主机类型](#主机类型)
     * [附件三](#附件三)
           * [带宽类型](#带宽类型)
     * [附件四](#附件四)
           * [公共模板](#公共模板)
     * [附件五](#附件五)
       * [1.私有网络区域名称](#私有网络区域名称)
       * [2.私有网络可用区名称](#私有网络可用区名称) 
     * [示例](#示例)
       * [1.获取请求url](#1获取请求url)
       * [2.获取虚拟数据中心公网信息](#2获取虚拟数据中心公网信息)
       * [3.获取机器信息](#3获取机器信息)
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

### 2.获取签名代码

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


## 实例相关

### 1.CreateInstance

  **Action：CreateInstance** 

  **描述** 创建一台或多台按量付费或者包年包月云服务器。

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST** 

  **请求参数:** 

| 名称               | 类型     | 是否必选 | 示例                                                         | 描述                                                         |
| ------------------ | -------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| RegionId           | String   | 是       | CN_Beijing_A                                                 | 区域id                                                       |
| VdcId              | String   | 是       |                                                              | 云服务器所属虚拟数据中心                                     |
| Password           | string   | 是       | EcsV587!                                                     | 云服务器密码 **(注: 公钥方式创建的云服务器也需要用户提供密码)** |
| PublicKey          | string   | 否       |                                                              | 云服务器公钥                                                 |
| InstanceName       | string   | 是       | shouduzaixhost                                               | 云服务器的主机名                                             |
| DescriptionNum     | string   | 否       | 001                                                          | int字符串；启用编号功能后，将自动为名称加上由3至6位数字组成的后缀，当一次性开通多台云服务器时，每台云服务器的编号将顺序加1。禁用编号后，一次性开通多台云服务器时每台服务器的名称将一样。 |
| InstanceChargeType | string   | 否       | PostPaid                                                     | 云主机的付费方式，取值范围：    PrePaid：预付费，包年包月。    PostPaid（默认）：按量付费。 |
| AutoRenew          | interger | 否       | 1                                                            | 包年包月云主机是否自动续费，1为自动续费（默认），0为不自动续费 |
| PrepaidMonth       | interger | 否       | 0                                                            | 包年包月云主机购买月数，输入0为购买到月底，输入1为购买一个自然月，默认为0。 |
| Cpu                | int      | 是       | 4                                                            | cpu数量，单位（个）只可选[1,2,4,8,10,16,32]    默认选择可以购买的最小的 |
| Ram                | int      | 是       | 8                                                            | 内存数量，单位（GB）只可选[1, 2, 4, 8, 12,  16, 24, 32, 48, 64, 96, 128]    默认选择可以购买的最小的 |
| InstanceType       | string   | 是       | Standard                                                     | 购买实例的类型，具体类型可参考附件二，可调用公共接口获取不同及诶单售卖的产品 |
| ImageId            | string   | 否       | bbf63749-0186-4c68-8adc-9bf584bc1376                         | 模板Id，不指定则默认选择Ubuntu_16.04_64                      |
| ImagePassword      | string   | 否       | tpl-password                                                 | 使用公共镜像时，该字段为非必填项；使用的是自定义镜像，该字段为必填项 |
| SystemDisk         | Dict     | 否       | { "Size": 200, "Type": "ssd_system_disk", "IOPS": 5}         | 系统盘类型，大小，IOPS预置性能包个数。默认: "IOPS": 0, "size": 所选模板的系统盘大小, Type: system_disk |
| DataDisks          | string   | 否       | [{ "Size": 100,  "Type": "ssd_disk", "IOPS": 5 },{  "Size": 50,  "Type": "high_disk" }] | ssd支持IOPS,默认: "IOPS": 0                                  |
| Amount             | integer  | 否       | 1                                                            | 指定创建云服务器的数量，取值范围：1-99，默认取值：1          |
| PublicIp           | list     | 否       | [“101.251.1.1”, “101.251.1.2”, “101.251.13”]                 | 公网Ip    输入的ip必须是该Vdc下可用ip，手动分配输入ip地址，自动分配输入：auto，默认不写为不分配公网ip |
| PrivateIp          | list     | 否       | [{"PrivateId": "xxxxxxxxxx", "IP": ["auto", "auto"]}]        | 内网Ip    输入的ip必须是该Vdc下可用内网uuid、ip，手动分配输入ip地址，自动分配输入：auto，默认不写为不分配ip |
| UTC                | Bool     | 否       | true                                                         | 是否设置时区为 UTC                                           |
| WindowsActivation  | Dict     | 否       | {"Batch":1,"ProductIds": ["Q7NBW-8B24B-MG6PV-DVP24-K4QWM"]}  | Windows型主机激活码, Batch: 1为批量激活，0为单机激活；<br> 批量激活：为本次创建的所有云服务器使用同一密钥进行激活；<br> 单机激活：为本次创建的云服务器分别使用不同密钥进行激活，需要您输入与创建云服务器数量等数目的激活密钥，输入多个密钥请用逗号分隔。 |
| **UserData**       | list     | 否       | ["IyEvYmluL3NoCmVjaG8gIkhlbGxvIFdvcmxkIg=="]                 | 用户自定义数据，格式必须为base64编码                         |



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
        "PublicIp": ["auto"], # 自动分配
        "PrivateIp": []
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print("create vm error: %s" % result.get("Message"))
    return result.get("TaskId")
```

### 2.DeleteInstance

  **Action：** DeleteInstance

  **描述：** 删除一台或者多台云服务器

  **请求地址:** api.capitalonline.net/ccs

  **请求方法：POST** 

  **请求参数:**

| 名称        | 类型 | 是否必选 | 示例值                                   | 描述                                          |
| ----------- | ---- | -------- | ---------------------------------------- | --------------------------------------------- |
| InstanceIds | list | 是       | ["f9053ea8-fc23-4032-8a7f-01def77b4cc0"] | 云服务器的编号，可以在DescribeInstances中获取 |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

  **返回示例:**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376",
"RequestId":"bbf63749-0186-4c68-8adc-9bf584b1234"
}
```

  **调用代码示例:**

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
        print(result.get("Message"))
        return None
    return True
```

### 3.StopInstance

  **Action:StopInstance**

  **描述:** 云服务器关机

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：GET**

  **请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                               | 描述                                          |
| ---------- | ------ | -------- | ------------------------------------ | --------------------------------------------- |
| InstanceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在DescribeInstances中获取 |

  **返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

  **返回示例:**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376",
}
```

### 4.RebootInstance

  **Action：RebootInstance**

  **描述：** 云服务器重启

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：GET**

  **请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                               | 描述                                          |
| ---------- | ------ | -------- | ------------------------------------ | --------------------------------------------- |
| InstanceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在DescribeInstances中获取 |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current Status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceId.Malformed | The specified parameter   "InstanceId" is not valid.         | 指定云服务器Id参数格式错误     |

  **返回示例：**

```json
{
"Code":"Success",
"TaskId":"63749"
}
```

### 5.ModifyInstanceChargeType

  **Action：ModifyInstanceChargeType**

  **描述：** 云服务器变更计费方式

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称               | 类型     | 是否必选 | 示例值                               | 描述                                                         |
| ------------------ | -------- | -------- | ------------------------------------ | ------------------------------------------------------------ |
| InstanceId         | string   | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在DescribeInstances中获取                |
| InstanceChargeType | string   | 是       | PostPaid                             | 云主机的付费方式，取值范围：    PrePaid：预付费，包年包月。    PostPaid：按量付费。 |
| AutoRenew          | interger | 否       | 1                                    | 包年包月云主机是否自动续费，1为自动续费（默认），0为不自动续费 |
| PrepaidMonth       | interger | 否       | 0                                    | 包年包月云主机购买月数，输入0为购买到月底，输入1为到月底后在购买一个自然月，默认为0。 |

  **返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current Status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceId.Malformed | The specified parameter   "InstanceId" is not valid.         | 指定云服务器Id参数格式错误     |

  **返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

### 6.ModifyInstanceSpec

  **Action：ModifyInstanceSpec**

  **描述：** 云服务器配置升级，更新cpu/内存

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称         | 类型   | 是否必选 | 示例值                               | 描述                                                         |
| ------------ | ------ | -------- | ------------------------------------ | ------------------------------------------------------------ |
| InstanceId   | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在查询云服务器详情中查出                 |
| Cpu          | int    | 否       | 4                                    | cpu数量，单位（个）只可选[1,2,4,8,10,16,32]    <br />不填写默认不更改 |
| Ram          | int    | 否       | 8                                    | 内存数量，单位（GB）只可选[1, 2, 4, 8, 12,  16, 24, 32, 48, 64, 96, 128]    <br />不填写默认不更改 |
| InstanceType | string | 否       | Standard                             | 将要修改为新的主机类型                                       |

  **返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                                | 错误信息                                                     | 描述                           |
| -------- | ------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus               | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound                      | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed           | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |
| 400      | InvalidInstanceType.ValueUnauthorized | The  specified InstanceType is not authorized.               | 指定的云主机规格未授权使用。   |

  **返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

  **代码调用示例:**

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
    print(result)
```

### 7.CreateDisk

  **Action：CreateDisk**

  **描述：** 云服务器增加一块或者多块硬盘

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                                                       | 描述                                                         |
| ---------- | ------ | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| InstanceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0                         | 云服务器的编号，可以在查询云服务器详情中查出                 |
| DataDisks  | list   | 否       | [<br />{ "Size": 100,  "Type": "ssd_disk", "IOPS": 5},<br />{  "Size": 200,  "Type": "high_disk" }<br />], | 数据盘列表，<br />Size：数据盘大小，<br />Type：数据盘类型，可选参数，<br />IOPS：IOPS包，可选参数,ssd类型可选，默认为0 |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskID | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务ID |

  **错误码：**

| httpcode | 错误码                                    | 错误信息                                                     | 描述                           |
| -------- | ----------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus                   | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound                          | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed               | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |
| 400      | InvalidInstanceTypeDisk.ValueUnauthorized | The  specified Instance DiskType is not authorized.          | 指定的硬盘规格未授权使用。     |

  **返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

  **代码调用示例:**

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

  **Action：ResizeDisk**

  **描述：** 扩容一块已经购买的硬盘

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                               | 描述                                         |
| ---------- | ------ | -------- | ------------------------------------ | -------------------------------------------- |
| InstanceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在查询云服务器详情中查出 |
| DiskId     | string | 是       | a67644ba-873f-11e9-bf49-0242ac1104e7 | 硬盘编号                                     |
| DataSize   | int    | 是       | 100                                  | 硬盘扩容后的大小                             |
| IOPS       | int    | 否       | 5                                    | IOPS预置性能包个数，默认为0，ssd类型可选     |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                                    | 错误信息                                                     | 描述                           |
| -------- | ----------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus                   | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound                          | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed               | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |
| 400      | InvalidInstanceID.Malformed               | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |
| 400      | InvalidInstanceTypeDisk.ValueUnauthorized | The  specified Instance DiskType is not authorized.          | 指定的硬盘规格未授权使用。     |
| 403      | InvalidDiskSize.TooSmall                  | Specified new disk size is less than the original disk size. | 指定的新磁盘小于原始磁盘。     |
| 400      | IncompleteParamter                        | Some fields can not be null in this request.                 | 请求中缺失参数。               |

  **返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

### 9.DeleteDisk

  **Action：DeleteDisk**

  **描述：** 云服务器删除一块硬盘

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                                                       | 描述                                         |
| ---------- | ------ | -------- | ------------------------------------------------------------ | -------------------------------------------- |
| InstanceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0                         | 云服务器的编号，可以在查询云服务器详情中查出 |
| DiskIds    | List   | 是       | ["a67644ba-873f-11e9-bf49-0242ac1104e7","f9053ea8-fc23-4032-8a7f-01def77bq312"] | 硬盘编号                                     |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

  **返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

### 10.ResetImage

  **Action：ResetImage**

  **描述：** 云服务器重装系统

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称          | 类型   | 是否必选 | 示例值                                       | 描述                                                         |
| ------------- | ------ | -------- | -------------------------------------------- | ------------------------------------------------------------ |
| InstanceId    | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0         | 云服务器的编号，可以在查询云服务器详情中查出                 |
| ImageId       | string | 是       | bbf63749-0186-4c68-8adc-9bf584bc1376         | 模板Id                                                       |
| ImagePassword | string | 否       | tpl-password                                 | 使用公共镜像时，该字段为非必填项；使用的是自定义镜像，该字段为必填项 |
| Password      | string | 是       | EcsV587!                                     | 云服务器密码 **(注: 公钥方式创建的云服务器也需要用户提供密码)** |
| PublicKey     | string | 否       |                                              | 云服务器公钥                                                 |
| ProductId     | string | 否       |                                              | 输入Windows密钥后，在创建云服务器时自动将密钥写入并激活系统，请您保证正确填写，否则将激活失败；若您未填写密钥，默认创建未激活的windows云服务器。 |
| **UserData**  | list   | 否       | ["IyEvYmluL3NoCmVjaG8gIkhlbGxvIFdvcmxkIg=="] | 用户自定义数据，格式必须为base64编码                         |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                                | 错误信息                                                     | 描述                           |
| -------- | ------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus               | The   current Status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound                      | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceId.Malformed           | The specified parameter   "InstanceId" is not valid.         | 指定云服务器Id参数格式错误     |
| 404      | InvalidLaunchTemplateVersion.NotFound | %s                                                           | 指定的模板版本未找到。         |

  **返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

  **调用代码示例:**

```python
def reset_os(vm_id, os_id, passwd):
    action = "ResetImage"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    body = {
        "InstanceId": vm_id,
        "ImageId": os_id,
        "Password":  passwd
    }
    res = requests.post(url, json=body)
    result = json.loads(res.ocntent)
    print(result)
```

### 11.DescribeInstances

  **Action：DescribeInstances**

  **描述：** 查询云服务器信息

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称       | 类型    | 是否必选 | 示例值                                 | 描述                                                         |
| ---------- | ------- | -------- | -------------------------------------- | ------------------------------------------------------------ |
| PageNumber | Integer | 否       | 1                                      | Vdc列表的页码。起始值：1   默认值：1，默认每页显示10个Vdc的详细信息 |
| VdcId      | string  | 否       | "773f14c2-c8bc-4f66-acd7-ec34d3bfde7d" | 云服务器所属的Vdc                                            |
| InstanceId | string  | 否       | "f9053ea8-fc23-4032-8a7f-01def77b4cc0" | 云服务器的编号，可以在查询云服务器详情中查出                 |
| PublicIp   | array   | 否       | ["101.251.1.1"]                        | 公网Ip                                                       |
| PageSize   | int     | 否       | 10                                     | 每页返回数量                                                 |

  **返回参数:**

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
| DataDisks               | list     | [ { "size": 100,  "type": "ssd_disk" }, {  "size": 200,  "type": "high_disk" } ], | 数据硬盘信息              |
| PublicNetworkInterface  | string   |                                                              | 公网网卡信息              |
| PrivateNetworkInterface | string   |                                                              | 私网网卡信息              |
| Cpu                     | int      | 4                                                            | Cpu信息                   |
| Ram                     | int      | 4                                                            | Ram信息                   |
| Tags                    | list     | [{"TagId":"1234","TagName":"tag_abc"}]                       | 云主机资源的标签信息      |
| CreateTime              | string   | 2022-06-01 12:30:00                                          | 云服务器创建时间          |

  **错误码：**

| httpcode | 错误码                                | 错误信息                                                     | 描述                           |
| -------- | ------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus               | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound                      | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed           | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |
| 404      | InvalidLaunchTemplateVersion.NotFound | %s                                                           | 指定的模板版本未找到。         |

  **返回示例:**

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
                "PublicNetworkInterface":[],
                "InstanceChargeType":"PostPaid",
                "VdcName":"cdsApi-testaa",
                "InstanceName":"root",
                "Cpu": 4,
                "Ram": 4,
                "Tags": [
                  {
                    "TagId": "123",
                    "TagName": "tag_abc"
                  }
                ],
                "VdcId": "c603ee06-cef3-439d-bdea-fd72768ecb77",
                "VdcName": "test-j"
              } 
        ],
        "PageNumber":1,
        "PageCount":1
    }
}
```

  **代码调用示例:**

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
    if instance_id:
        body.update({"InstanceId": instance_id})
    if vdc_id:
        body.update({"VdcId": vdc_id})
    if pub_ip:
        body.update({"PublicIp": pub_ip})
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print("get vm error.")
        return None
    return result.get("Data")
```



### 12.ConnectNetworkInterface

  **Action：ConnectNetworkInterface**

  **描述：** 连接网卡

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称        | 类型   | 是否必选 | 示例值                               | 描述                                     |
| ----------- | ------ | -------- | ------------------------------------ | ---------------------------------------- |
| InterfaceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 网卡的编号，可以在查询云服务器详情中查出 |
| InstanceId  | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云主机ID                                 |

  **返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                       | 错误信息                                                     | 描述                           |
| -------- | ---------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus      | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid.        | 指定网卡ID参数格式错误         |

  **返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

  **代码调用示例：**

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
        print("up card error.")
        print(result.get("Message"))
    task_id = result.get("TaskId")
    return task_id
```

### 13.DisconnectNetworkInterface

  **Action：DisconnectNetworkInterface**

  **描述：** 断开网卡

  **请求方法：POST**

  **请求参数：**

| 名称        | 类型   | 是否必选 | 示例值                               |
| ----------- | ------ | -------- | ------------------------------------ |
| InterfaceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 |
| InstanceId  | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                       | 错误信息                                                     | 描述                           |
| -------- | ---------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus      | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid.        | 指定网卡ID参数格式错误         |

  **返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

  **代码调用示例**

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
        print("down card error.")
        print(result.get("Message"))
    task_id = result.get("TaskId")
    return task_id
```



### 14.ModifyIpAddress

  **Action：ModifyIpAddress**

  **描述：** 为网卡绑定Ip地址或解绑Ip地址或修改Ip地址

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称        | 类型   | 是否必选 | 示例值                               | 描述                                                         |
| ----------- | ------ | -------- | ------------------------------------ | ------------------------------------------------------------ |
| InstanceId  | string | 是       | f9053ea8-fc23-4032-8a7f-01def773dw22 | 云服务器编号                                                 |
| InterfaceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 网卡的编号，可以在查询云服务器详情中查出                     |
| Address     | string | 是       | 101.251.2.29                         | 要绑定或者修改的Ip地址，解绑Ip此处请填写None                 |
| Password    | string | 是       | 123abc,.;                            | 云服务器密码 **(注: 公钥方式创建的云服务器也需要用户提供密码)** |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                       | 错误信息                                                     | 描述                           |
| -------- | ---------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus      | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid.        | 指定网卡ID参数格式错误         |

  **返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

### 15.DescribeInstanceMonitor

  **Action：DescribeInstanceMonitor**

  **描述：** 获取主机实例各个指标监控数据

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称        | 类型   | 是否必选 | 示例值                                                       | 描述                                                         |
| ----------- | ------ | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| InstanceId  | string | 是       | f9053ea8-fc23-4032-8a7f-01def773dw22                         | 云服务器编号                                                 |
| MetricName  | string | 是       | CPUUtilization、RAMUtilization、DiskWriteIOPS、DiskReadIOPS、DiskWriteBPS、DiskReadBPS、InterfaceInRate、InterfaceOutRate | 实例各项指标，CPU(cpu)、内存(ram)、硬盘IOPS(iops)、硬盘吞吐量(throughput)、网卡流量(nic) |
| Period      | int    | 是       | 60、900                                                      | 监控数据粒度，一分钟粒度(60)、十五分钟粒度(900)              |
| StartTime   | string | 是       | 2019-10-09 15:30:00                                          | 开始时间                                                     |
| EndTime     | string | 是       | 2019-10-09 16:30:00                                          | 结束时间                                                     |
| InterfaceId | string | 否       | f9053ea8-fc23-4032-8a7f-01def77b4cc0                         | 网卡的编号，可以在查询云服务器详情中查出                     |
| DiskId      | string | 否       | f9053ea8-fc23-4032-8a7f-01def77b4cc0                         | 硬盘编号， 可以在查询云服务器详情中查出                      |

  **返回参数：**

| 名称       | 类型     | 示例值                               | 描述                                                         |
| :--------- | -------- | :----------------------------------- | ------------------------------------------------------------ |
| Code       | Interger | Success                              | 错误码                                                       |
| Data       | Dict     | {}                                   | 返回数据列表                                                 |
| InstanceId | String   | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 实例ID                                                       |
| Period     | String   | 60                                   | 数据粒度                                                     |
| DataPoints | list     | []                                   | 监控数据列表(各项指标单位：CPU/RAM: 百分比，网卡吞吐: Mbps，磁盘吞吐量: Kbps，磁盘IOPS: IOPS) |
| Timestamp  | String   | 2019-10-09 15:30:00                  | 数据时间点                                                   |
| Value      | Float    | 49.67                                | 监控数据数值                                                 |

  **错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

  **返回示例：**

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

### 16.StartInstance

  **Action:StartInstance**

  **描述:** 云服务器开机

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：GET**

  **请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                               | 描述                                          |
| ---------- | ------ | -------- | ------------------------------------ | --------------------------------------------- |
| InstanceId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在DescribeInstances中获取 |

  **返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

  **返回示例:**

```json
{
    "Code":"Success",
    "TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

### 17.ModifyInstanceName

**Action:ModifyInstanceName**

**描述：** 修改云主机名称

**请求地址:** cdsapi.capitalonline.net/ccs

**请求方法：POST**

**请求参数：**

| 名称         | 类型   | 是否必选 | 示例值                               | 描述                                         |
| ------------ | ------ | -------- | ------------------------------------ | -------------------------------------------- |
| InstanceId   | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在查询云服务器详情中查出 |
| InstanceName | string | 是       | shouduzaixhost                       | 云服务器的主机名                             |

**返回参数：**

| 名称    | 类型     | 示例值  | 描述     |
| :------ | -------- | :------ | :------- |
| Code    | Interger | Success | 错误码   |
| Message | string   |         | 提示信息 |

**错误码：**

| httpcode | 错误码                                | 错误信息                                                     | 描述                           |
| -------- | ------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus               | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound                      | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed           | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |
| 400      | InvalidInstanceType.ValueUnauthorized | The  specified InstanceType is not authorized.               | 指定的云主机规格未授权使用。   |

**返回示例：**

```json
{
  "Code": "Success",
  "Data": {},
  "Message": "Success.",
  "TaskId": ""
}
```

### 18.DescribeTags

**Action:DescribeTags**

**描述：** 获取用户标签

**请求地址:** cdsapi.capitalonline.net/ccs

**请求方法：POST**

**请求参数：**

不需要额外参数

**返回参数：**

| 名称    | 类型     | 示例值  | 描述     |
| :------ | -------- | :------ | :------- |
| Code    | Interger | Success | 错误码   |
| Message | string   |         | 提示信息 |

**错误码：**

| httpcode | 错误码                  | 错误信息                                                     | 描述                           |
| -------- | ----------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus | The current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |

**返回示例：**

```json
{
  "Message": "Success.",
  "Code": "Success",
  "Data": [
    {
      "TagId": 257,
      "TagName": "sdfasdfasdfasdf"
    },
    {
      "TagId": 263,
      "TagName": "abcd1234xxx"
    },
    {
      "TagId": 266,
      "TagName": "testonly_label_1"
    }
  ]
}
```

### 19.CreateTag

**Action: CreateTag**

**描述：** 创建用户标签

**请求地址:** cdsapi.capitalonline.net/ccs

**请求方法：POST**

**请求参数：**

| 名称    | 类型   | 是否必选 | 示例值 | 描述     |
| ------- | ------ | -------- | ------ | -------- |
| TagName | string | 是       | abcd   | 标签名称 |

**返回参数：**

| 名称    | 类型     | 示例值  | 描述     |
| :------ | -------- | :------ | :------- |
| Code    | Interger | Success | 错误码   |
| Message | string   |         | 提示信息 |

**返回示例：**

```json
{
  "Code": "Success",
  "Data": {},
  "Message": "Success.",
  "TaskId": ""
}
```

### 20.DeleteTag

**Action: DeleteTag**

**描述：** 删除用户标签

**请求地址:** cdsapi.capitalonline.net/ccs

**请求方法：POST**

**请求参数：**

| 名称  | 类型   | 是否必选 | 示例值 | 描述   |
| ----- | ------ | -------- | ------ | ------ |
| TagId | string | 是       |        | 标签Id |

**返回参数：**

| 名称    | 类型     | 示例值  | 描述     |
| :------ | -------- | :------ | :------- |
| Code    | Interger | Success | 错误码   |
| Message | string   |         | 提示信息 |

**错误码：**

| httpcode | 错误码 | 错误信息                      | 描述                   |
| -------- | ------ | ----------------------------- | ---------------------- |
| 400      | 20101  | 当前有云主机 xxx 正在使用标签 | 有有云主机正在使用标签 |


**返回示例：**

```json
{
  "Code": "Success",
  "Data": {},
  "Message": "Success.",
  "TaskId": ""
}
```

### 21.AddInstancesTags

**Action: AddInstancesTags**

**描述：** 为云主机添加标签

**请求地址:** cdsapi.capitalonline.net/ccs

**请求方法：POST**

**请求参数：**

| 名称        | 类型   | 是否必选 | 示例值                                                       | 描述            |
| ----------- | ------ | -------- | ------------------------------------------------------------ | --------------- |
| InstanceIds | string | 是       | "f9053ea8-fc23-4032-8a7f-01def77b4cc0,a67644ba-873f-11e9-bf49-0242ac1104e7" | 云主机IDs       |
| AddTagIds   | string | 否       | "123,456"                                                    | 被添加标签的IDs |

**返回参数：**

| 名称    | 类型     | 示例值  | 描述     |
| :------ | -------- | :------ | :------- |
| Code    | Interger | Success | 错误码   |
| Message | string   |         | 提示信息 |


**返回示例：**

```json
{
  "Code": "Success",
  "Data": {},
  "Message": "Success.",
  "TaskId": ""
}
```

### 22.DeleteInstancesTags

**Action: DeleteInstancesTags**

**描述：** 删除云主机标签

**请求地址:** cdsapi.capitalonline.net/ccs

**请求方法：POST**

**请求参数：**


| 名称        | 类型   | 是否必选 | 示例值                                                       | 描述                |
| ----------- | ------ | -------- | ------------------------------------------------------------ | ------------------- |
| InstanceIds | string | 是       | "f9053ea8-fc23-4032-8a7f-01def77b4cc0,a67644ba-873f-11e9-bf49-0242ac1104e7" | 云主机IDs           |
| DelTagIds   | string | 否       | "123,456"                                                    | 需要被删除的标签IDs |

**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

**返回示例：**

```json
{
  "Code": "Success",
  "Data": {},
  "Message": "Success.",
  "TaskId": ""
}
```

### 23.DescribeInstanceType

**Action: DescribeInstanceType**

**描述：** 获取主机可售规格详情

**请求地址:** cdsapi.capitalonline.net/ccs

**请求方法：POST**

**请求参数：**


| 名称               | 类型   | 是否必选 | 示例值       | 描述                                                         |
| ------------------ | ------ | -------- | ------------ | ------------------------------------------------------------ |
| RegionId           | string | 是       | CN_Beijing_A | 选择可用区,见附件                                            |
| InstanceType       | string | 是       | "Standard"   | 主机类型                                                     |
| InstanceChargeType | string | 否       | "PostPaid"   | 云主机的付费方式，取值范围： PrePaid：预付费，包年包月。 PostPaid（默认）：按量付费。 |

**返回参数：**


| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |



**返回示例：**

```json
{
    "Code": "Success",
    "Data": [
        {
            "Cpu": 1,
            "Name": "1核1G",
            "Ram": 1
        },
        {
            "Cpu": 1,
            "Name": "1核2G",
            "Ram": 2
        }
    ],
    "Message": "Success."
}
```


### 24.DescribePublicIp

**Action: DescribePublicIp**

**描述：** 获取公网IP使用详情

**请求地址:** cdsapi.capitalonline.net/network

**请求方法：POST**

**请求参数：**


| 名称     | 类型   | 是否必选 | 示例值                                                | 描述    |
| -------- | ------ | -------- | ----------------------------------------------------- | ------- |
| VdcId    | string | 是       | "f9053ea8-fcxxxxx01def77b4cc0,a67644baxxxx42ac1104e7" | Vdc编号 |
| PublicId | string | 是       | "123443ea8-fcxxxxx01defxxx104e7"                      | 公网ID  |

**返回参数：**


| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String |         | 任务ID   |


**返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "UnusedList": [
            "123.123.11.11",
            "123.145.13.11"
        ],
        "UnusedTotal": 2,
        "UsedList": [
            {
                "Address": "111.222.14.111",
                "Usage": "云服务器使用(xxx)"
            }
        ],
        "UsedTotal": 1
    },
    "Message": "Success.",
    "TaskId": ""
}

```

### 25.DescribePrivateIp

**Action: DescribePrivateIp**

**描述：** 获取私网IP使用详情

**请求地址:** cdsapi.capitalonline.net/network

**请求方法：POST**

**请求参数：**


| 名称      | 类型   | 是否必选 | 示例值                                                | 描述    |
| --------- | ------ | -------- | ----------------------------------------------------- | ------- |
| VdcId     | string | 是       | "f9053ea8-fcxxxxx01def77b4cc0,a67644baxxxx42ac1104e7" | Vdc编号 |
| PrivateId | string | 是       | "123443ea8-fcxxxxx01defxxx104e7"                      | 私网ID  |

**返回参数：**


| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String |         | 任务ID   |


**返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "UnusedList": [
            "12.12.11.11",
            "12.14.13.11"
        ],
        "UnusedTotal": 2,
        "UsedList": [
            {
                "Address": "11.22.14.11",
                "Usage": "云服务器使用(xxx)"
            }
        ],
        "UsedTotal": 1
    },
    "Message": "Success.",
    "TaskId": ""
}

```

### 26.ResetInstancesPassword

**Action: ResetInstancesPassword**

**描述：** 修改云主机密码

**请求地址:** cdsapi.capitalonline.net/ccs

**请求方法：POST**

**请求参数：**


| 名称        | 类型   | 是否必选 | 示例值                                                | 描述                     |
| ----------- | ------ | -------- | ----------------------------------------------------- | ------------------------ |
| InstanceIds | string | 是       | "f9053ea8-fcxxxxx01def77b4cc0,a67644baxxxx42ac1104e7" | 主机编号，多个用逗号隔开 |
| Password    | string | 是       | "xxxx"                                                | 新主机密码               |

**返回参数：**


| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |


**返回示例：**

```json
{
    "Code": "Success",
    "Data": [
        {
            "InstanceId": "xxxxx",
            "TaskId": 12334545
        },
        {
            "InstanceId": "1233445454",
            "TaskId": 233454556
        }
    ],
    "Message": "Success."
}
```

### 27.CreateInstanceHtmlConsoleURL

**Action: CreateInstanceHtmlConsoleURL**

**描述：** 生成云主机HTML控制台地址

**请求地址:** cdsapi.capitalonline.net/ccs

**请求方法：POST**

**请求参数：**


| 名称       | 类型   | 是否必选 | 示例值                                 | 描述                                          |
| ---------- | ------ | -------- | -------------------------------------- | --------------------------------------------- |
| InstanceId | string | 是       | "f9053ea8-fc23-4032-8a7f-01def77b4cc0" | 云服务器的编号，可以在DescribeInstances中获取 |

**返回参数：**


| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String |         | 任务ID   |


**返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "URL": "https://console.capitalonline.net/web_console/xxxxxx?os_type=centos&instance=xxx&info=xxxxxxxx"
    },
    "Message": "Success.",
    "TaskId": ""
}

```

### 28.ExtendSystemDisk

**Action: ExtendSystemDisk**

**描述：** 系统盘扩容

**请求地址:** cdsapi.capitalonline.net/ccs

**请求方法：POST**

**请求参数：**


| 名称       | 类型   | 是否必选 | 示例值                                 | 描述                                          |
| ---------- | ------ | -------- | -------------------------------------- | --------------------------------------------- |
| InstanceId | string | 是       | "f9053ea8-fc23-4032-8a7f-01def77b4cc0" | 云服务器的编号，可以在DescribeInstances中获取 |
| Size       | int    | 否       | 200                                    | 系统盘大小                                    |
| IOPS       | int    | 否       | 5                                      | IOPS预置性能包个数                            |

**返回参数：**


| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String |         | 任务ID   |


**返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "order_audit": 0
    },
    "Message": "",
    "TaskId": "111111"
}
```

### 29.DescribeInstancePrice

**Action: DescribeInstancePrice**

**描述：** 云主机价格

**请求地址:** cdsapi.capitalonline.net/ccs

**请求方法：POST**

**请求参数：**


| 名称               | 类型     | 是否必选 | 示例值                                                       | 描述                                                         |
| ------------------ | -------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| RegionId           | String   | 是       | CN_Beijing_A                                                 | 区域id                                                       |
| InstanceChargeType | string   | 否       | PostPaid                                                     | 云主机的付费方式，取值范围：    PrePaid：预付费，包年包月。    PostPaid（默认）：按量付费。 |
| AutoRenew          | interger | 否       | 1                                                            | 包年包月云主机是否自动续费，1为自动续费（默认），0为不自动续费 |
| PrepaidMonth       | interger | 否       | 0                                                            | 包年包月云主机购买月数，输入0为购买到月底，输入1为购买一个自然月，默认为0。 |
| Cpu                | int      | 是       | 4                                                            | cpu数量，单位（个）只可选[1,2,4,8,10,16,32]    默认选择可以购买的最小的 |
| Ram                | int      | 是       | 8                                                            | 内存数量，单位（GB）只可选[1, 2, 4, 8, 12,  16, 24, 32, 48, 64, 96, 128]    默认选择可以购买的最小的 |
| InstanceType       | string   | 是       | Standard                                                     |                                                              |
| ImageId            | string   | 是       | bbf63749-0186-4c68-8adc-9bf584bc1376                         | 模板Id，不指定则默认选择Ubuntu_16.04_64                      |
| SystemDisk         | Dict     | 是       | { "Size": 200, "Type": "ssd_system_disk", "IOPS": 5 }        | 系统盘类型，大小，IOPS预置性能包个数。默认: "IOPS": 0, "size": 所选模板的系统盘大小, Type: system_disk |
| DataDisks          | string   | 否       | [{ "Size": 100,  "Type": "ssd_disk" },{  "Size": 50,  "Type": "high_disk" }] |                                                              |
| Amount             | integer  | 是       | 1                                                            | 指定创建云服务器的数量，取值范围：1-99，默认取值：1          |

**返回参数：**


| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |


**返回示例：**

```json
{
    "Message": "success",
    "Code": "Success",
    "Data": {
        "TotalPrice": 244.8
    }
}
```

### 30.StopInstances

  **Action:StopInstances**

  **描述:** 批量云服务器关机

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：GET**

  **请求参数：**

| 名称        | 类型   | 是否必选 | 示例值                                                       | 描述                                                         |
| ----------- | ------ | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| InstanceIds | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0,bbf63749-0186-4c68-8adc-9bf584bc1376 | 云服务器的编号，可以在DescribeInstances中获取,多个使用逗号分隔 |

  **返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

  **返回示例:**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376",
}
```

### 31.StartInstances

  **Action:StartInstances**

  **描述:** 批量云服务器开机

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：GET**

  **请求参数：**

| 名称        | 类型   | 是否必选 | 示例值                               | 描述                                                         |
| ----------- | ------ | -------- | ------------------------------------ | ------------------------------------------------------------ |
| InstanceIds | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在DescribeInstances中获取,多个使用逗号分隔 |

  **返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

  **返回示例:**

```json
{
    "Code":"Success",
    "TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

### 32.RebootInstances

  **Action：RebootInstances**

  **描述：** 批量云服务器重启

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：GET**

  **请求参数：**

| 名称        | 类型   | 是否必选 | 示例值                               | 描述                                                         |
| ----------- | ------ | -------- | ------------------------------------ | ------------------------------------------------------------ |
| InstanceIds | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 云服务器的编号，可以在DescribeInstances中获取,多个使用逗号分隔 |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current Status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceId.Malformed | The specified parameter   "InstanceId" is not valid.         | 指定云服务器Id参数格式错误     |

  **返回示例：**

```json
{
"Code":"Success",
"TaskId":"63749"
}
```

### 33.BatchAddNetworkInterfaces

  **Action：BatchAddNetworkInterfaces**

  **描述：** 批量添加云服务器网卡

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称               | 类型   | 是否必选 | 示例值                                     | 描述                                          |
| ------------------ | ------ | -------- | ------------------------------------------ | --------------------------------------------- |
| InstanceIds        | list   | 是       | ["76571028-e2a3-11e9-b","80-de55f62159fe"] | 云服务器的编号，可以在DescribeInstances中获取 |
| PrivateId/PublicId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe       | 私网ID/公网ID(填写公网ID或私网ID)             |
| VdcId              | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0       | Vdc编号                                       |
| Password           | string | 是       | xxxx                                       | 主机密码                                      |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |


**返回示例：**

```json
{
    "Code": "Success",
    "Data": {},
    "Message": "",
    "TaskId": "12804345"
}
```

### 34.BatchDeleteNetworkInterfaces

  **Action：BatchDeleteNetworkInterfaces**

  **描述：** 批量删除云服务器网卡

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称               | 类型   | 是否必选 | 示例值                                     | 描述                                          |
| ------------------ | ------ | -------- | ------------------------------------------ | --------------------------------------------- |
| InstanceIds        | list   | 是       | ["76571028-e2a3-11e9-b","80-de55f62159fe"] | 云服务器的编号，可以在DescribeInstances中获取 |
| PrivateId/PublicId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe       | 私网ID/公网ID(填写公网ID或私网ID)             |
| VdcId              | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0       | Vdc编号                                       |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |


**返回示例：**

```json
{
    "Code": "Success",
    "Data": {},
    "Message": "",
    "TaskId": "12804345"
}
```

## 安全组相关

### 1.CreateSecurityGroup

  **Action：CreateSecurityGroup**

  **描述：** 创建网络安全组

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称              | 类型   | 是否必选 | 示例值 | 描述                       |
| ----------------- | ------ | -------- | ------ | -------------------------- |
| SecurityGroupName | String | 是       | Test   | 安全组名称                 |
| Description       | String | 是       | 安全组 | 安全组描述                 |
| SecurityGroupType | String | 是       | public | 安全组类型(public/private) |

  **返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String |         | 任务ID   |

  **错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

  **返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":""
}
```

### 2.DeleteSecurityGroup

  **Action：DeleteSecurityGroup**

  **描述：** 删除网络安全组

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：GET**

  **请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                               | 描述     |
| --------------- | ------ | -------- | ------------------------------------ | -------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组ID |

  **返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String |         | 任务ID   |

  **错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

  **返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":""
}
```

### 3.ForceDeleteSecurityGroup

  **Action：ForceDeleteSecurityGroup**

  **描述：** 强制删除网络安全组

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：GET**

  **请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                               | 描述     |
| --------------- | ------ | -------- | ------------------------------------ | -------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组ID |

  **返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688881 | 任务ID   |

  **错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

  **返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688881"
}
```

### 4.DescribeSecurityGroupAttribute

  **Action：DescribeSecurityGroupAttribute**

  **描述：** 查看网络安全组属性

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：GET**

  **请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                               | 描述         |
| --------------- | ------ | -------- | ------------------------------------ | ------------ |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组ID     |
| RuleId          | String | 否       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组规则ID |

  **返回参数：**

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

  **错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

  **返回示例**

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

  **Action：ModifySecurityGroupAttribute**

  **描述：** 修改网络安全组属性

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称              | 类型   | 是否必选 | 示例值                               | 描述         |
| ----------------- | ------ | -------- | ------------------------------------ | ------------ |
| SecurityGroupId   | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组ID     |
| Description       | String | 是       | 修改安全组描述                       | 新安全组描述 |
| SecurityGroupName | String | 是       | 安全组名称                           | 新安全组名称 |

  **返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String |         | 任务ID   |

  **错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

  **返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":""
}
```

### 6.DescribeSecurityGroups

  **Action：DescribeSecurityGroups**

  **描述：** 网络安全组列表

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称              | 类型   | 是否必选 | 示例值 | 描述                                                        |
| ----------------- | ------ | -------- | ------ | ----------------------------------------------------------- |
| SecurityGroupType | String | 否       | public | 安全组类型(public/private),不填默认筛选所有类型的安全组列表 |
| Keyword           | String | 否       | test   | 查询关键字                                                  |
| SecurityGroupId   | String | 否       | xxxx   | 安全组ID                                                    |

  **返回参数：**

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

  **错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

  **返回示例**

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

  **Action：AddSecurityGroupRule**

  **描述：** 添加网络安全组规则

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

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

  **返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688348 | 任务ID   |

  **错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

  **返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688348"
}
```

### 8.RemoveSecurityGroupRule

  **Action：RemoveSecurityGroupRule**

  **描述：** 删除网络安全组规则

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                               | 描述     |
| --------------- | ------ | -------- | ------------------------------------ | -------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组ID |
| RuleIds         | Array  | 是       | ["xxx", "xxx"]                       | 规则ID   |

  **返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688411 | 任务ID   |

  **错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

  **返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688411"
}
```

### 9.ModifySecurityGroupRule

  **Action：ModifySecurityGroupRule**

  **描述：** 修改网络安全组规则描述

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                               | 描述       |
| --------------- | ------ | -------- | ------------------------------------ | ---------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组ID   |
| RuleId          | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 规则ID     |
| Description     | String | 是       | 新描述                               | 新修改描述 |

  **返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String |         | 任务ID   |

  **错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

  **返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":""
}
```

### 10.JoinSecurityGroup

  **Action：JoinSecurityGroup**

  **描述：** 主机实例加入安全组

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                                    | 描述     |
| --------------- | ------ | -------- | ----------------------------------------- | -------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe      | 安全组ID |
| BindData        | String | 是       | [{"InstanceId":"xxx", "PrivateId":"xxx"}] | 绑定数据 |
| InstanceId      | String | 是       | 76571028-e2a3-11e9-b380-de55f62159fe      | 实例ID   |
| PrivateId       | String | 否       | 50971028-e2a3-11e9-b380-de55f62159fe      | 私网ID   |
| PublicId        | String | 否       | 50971028-e2a3-11e9-b380-de55f62159fe      | 公网ID   |

  **返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688564 | 任务ID   |

  **错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

  **返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688564"
}
```

### 11.LeaveSecurityGroup

  **Action：LeaveSecurityGroup**

  **描述：** 实例解绑网络安全组

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                                    | 描述     |
| --------------- | ------ | -------- | ----------------------------------------- | -------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe      | 安全组ID |
| BindData        | String | 是       | [{"InstanceId":"xxx", "PrivateId":"xxx"}] | 绑定数据 |
| InstanceId      | String | 是       | 76571028-e2a3-11e9-b380-de55f62159fe      | 实例ID   |
| PrivateId       | String | 否       | 50971028-e2a3-11e9-b380-de55f62159fe      | 私网ID   |
| PublicId        | String | 否       | 50971028-e2a3-11e9-b380-de55f62159fe      | 公网ID   |

  **返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688573 | 任务ID   |

  **错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

  **返回示例**

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688573"
}
```

### 12.ModifySecurityGroupRulePriority

  **Action：ModifySecurityGroupRulePriority**

  **描述：** 修改安全组规则优先级

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST**

  **请求参数：**

| 名称            | 类型   | 是否必选 | 示例值                               | 描述                   |
| --------------- | ------ | -------- | ------------------------------------ | ---------------------- |
| SecurityGroupId | String | 是       | 50971028-e2a3-11e9-b380-de55f62159fe | 安全组ID               |
| BindData        | String | 是       | [{"RuleId":"xxx", "Priority":"xxx"}] | 绑定数据               |
| RuleId          | String | 是       | 76571028-e2a3-11e9-b380-de55f62159fe | (BindData中参数)规则ID |
| Priority        | Int    | 否       | 1                                    | (BindData中参数)优先级 |

  **返回参数：**

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688573 | 任务ID   |

  **错误码：**

| httpcode | 错误码                       | 错误信息                                              | 描述                   |
| -------- | ---------------------------- | ----------------------------------------------------- | ---------------------- |
| 400      | InvalidInterfaceID.Malformed | The specified parameter   "InterfaceID" is not valid. | 指定网卡ID参数格式错误 |

  **返回示例**

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

  **Action：** CreateTemplate

  **描述：** 定制模板

  **请求地址:**  cdsapi.capitalonline.net/ccs

  **请求方法：POST** 

  **请求参数:** 

| 名称             | 类型   | 是否必选 | 示例值 | 描述                                                         |
| ---------------- | ------ | -------- | ------ | ------------------------------------------------------------ |
| InstanceId       | String | 是       | Test   | 云主机实例ID                                                 |
| DisplayName      | String | 是       | 模板   | 模板名称                                                     |
| PowerOn          | Bool   | 是       | True   | 是否开机定制模板                                             |
| WithDataDisk     | Bool   | 否       | True   | 所定制的模板是否需要挂载原主机数据盘，默认为 True            |
| InstanceUserName | String | 否       | root   | 云主机用户名, 如您的云主机使用的是公钥创建的方式，且未更改过密码，则无需填写用户名 如您修改过管理员权限默认账户，请填写修改后的名称。如用户名不一致，会导致创建云主机失败！ |


  **返回参数：** 

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688573 | 任务ID   |

  **错误码：** 

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

  **返回示例** 

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688573"
}
```

### 2.DeleteTemplate

  **Action：** DeleteTemplate

  **描述：** 删除模板

  **请求地址:**  cdsapi.capitalonline.net/ccs

  **请求方法：POST** 

  **请求参数:** 

| 名称       | 类型   | 是否必选 | 示例值       | 描述   |
| ---------- | ------ | -------- | ------------ | ------ |
| TemplateId | String | 是       | xxx          | 模板ID |
| RegionId   | String | 是       | CN_Beijing_A | 区域ID |

  **返回参数：** 

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688573 | 任务ID   |

  **错误码：** 

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

  **返回示例** 

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688573"
}
```

### 3.SyncTemplate

  **Action：** SyncTemplate

  **描述：** 同步模板

  **请求地址:**  cdsapi.capitalonline.net/ccs

  **请求方法：POST** 

  **请求参数:** 

| 名称       | 类型   | 是否必选 | 示例值       | 描述   |
| ---------- | ------ | -------- | ------------ | ------ |
| TemplateId | String | 是       | xxx          | 模板ID |
| RegionId   | String | 是       | CN_Beijing_A | 区域ID |

  **返回参数：** 

| 名称    | 类型   | 示例值  | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | String | Success | 错误码   |
| Message | String | Success | 提示信息 |
| Data    | Object | {}      | 返回信息 |
| TaskId  | String | 7688573 | 任务ID   |

  **错误码：** 

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

  **返回示例** 

```json
{
"Code":"Success",
"Message":"Success.",
"Data":{},
"TaskId":"7688573"
}
```

### 4.DescribeTemplateInfo

  **Action：** DescribeTemplateInfo

  **描述：** 模板信息

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：POST** 

  **请求参数:** 

| 名称       | 类型   | 是否必选 | 示例值 | 描述       |
| ---------- | ------ | -------- | ------ | ---------- |
| PageNumber | Int    | 是       | 1      | 页码       |
| PageSize   | Int    | 是       | 10     | 每一页大小 |
| Keyword    | String | 否       | test   | 关键字查询 |

  **返回参数：** 

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
| Region       | List   | []                  | 可用区信息   |
| RegionId     | String | CN_Beijing_C        | 区域ID       |
| RegionName   | String | 北京-可用区C        | 区域名称     |

  **错误码：** 

| httpcode | 错误码                      | 错误信息                                                     | 描述                           |
| -------- | --------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectInstanceStatus     | The   current status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | InstanceNotFound            | the Instance has   deleted                                   | 指定的云服务器已被删除         |
| 400      | InvalidInstanceID.Malformed | The specified parameter   "InstanceID" is not valid.         | 指定云服务器ID参数格式错误     |

  **返回示例** 

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

  **Action：** DescribeVdc

  **描述：** 查询虚拟数据中心(以下简称VDC)详细信息

  **请求地址:** cdsapi.capitalonline.net/network

  **请求方法：GET**

  **请求参数:**

| 名称       | 类型    | 是否必选 | 示例                                 | 描述                       |
| ---------- | ------- | -------- | ------------------------------------ | -------------------------- |
| RegionId   | string  | 否       | CN_Beijing_A                         | 选择Vdc所属可用区,见附件一 |
| VdcId      | string  | 否       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | Vdc编号                    |
| PageNumber | Integer | 否       | 1                                    | Vdc列表的页码              |
| Keyword    | string  | 否       | Beijing                              | 查询关键字                 |

  **返回参数:**

| 名称           | 类型     | 示例                                                         | 描述                                                         |
| -------------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Code           | interger | Success                                                      | 错误码                                                       |
| PageNumber     | interger | 1                                                            | 页码                                                         |
| PageCount      | interger | 10                                                           | 总页数                                                       |
| Data           | List     | []                                                           | 返回数据列表                                                 |
| VdcId          | string   | f9053ea8-fc23-4032-8a7f-01def77b4cc0                         | Vdc编号                                                      |
| VdcName        | string   | capitalcloud                                                 | Vdc名称                                                      |
| RegionId       | string   | CN_Beijing_A                                                 | Vdc所在可用区                                                |
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
        print("get vdc info error.")
        return None
    data = result.get("Data")
    return data
```



### 2.CreateVdc

  **Action:CreateVdc**

  **描述：** 创建一个Vdc

  **请求地址:** cdsapi.capitalonline.net/network

  **请求方法：POST**

  **请求参数：**

| 名称          | 类型   | 是否必选 | 示例值                                                       | 描述                                   |
| ------------- | ------ | -------- | ------------------------------------------------------------ | -------------------------------------- |
| RegionId      | string | 是       | cn_beijingA                                                  | Vdc所属的可用区Id                      |
| VdcName       | string | 否       | newVdc                                                       | 创建的Vdc名称，不填写时默认写入Vdc的Id |
| PublicNetwork | string | 否       | PublicNetword: {"Name": "公网1","Type": "Bandwidth_BGP", "BillingMethod": "BandwIdth", "Qos": 20, "IPNum":4, "AutoRenew":0, "FloatBandwich":200} | 参考附件三带宽类型                     |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码:**

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

  **返回示例：**

```
{
   "Code":"Success",
   "TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

  **代码请求示例:**

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
        print("create vdc error.")
        return None
    task_id = result.get("TaskId")
    return task_id
```



### 3.DeleteVdc

  **Action：DeleteVdc**

  **描述：** 删除一个没有公网及没有加入gpn等其他产品的Vdc

  **请求地址:** cdsapi.capitalonline.net/network

  **请求方法：GET**

  **请求参数：**

| 名称  | 类型   | 是否必选 | 示例值                               | 描述                               |
| ----- | ------ | -------- | ------------------------------------ | ---------------------------------- |
| VdcId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | Vdc的编号，可以在查询Vdc详情中查出 |

  **返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                 | 错误信息                                                     | 描述                           |
| -------- | ---------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectVdcStatus     | The   current Status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | VdcNotFound            | the Vdc has   deleted                                        | 指定的Vdc已被删除              |
| 400      | InvalidVdcId.Malformed | The specified parameter   "VdcId" is not valid.              | 指定VdcId参数格式错误          |

  **返回示例：**

```
{
"Code":"Success"
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
"RequestId":"bbf63749-0186-4c68-8adc-9bf584b1234"
}
```

### 4.CreatePublicNetwork

  **Action:CreatePublicNetwork**

  **描述：** 给一个Vdc增加公网带宽和Ip

  **请求地址:** cdsapi.capitalonline.net/network

  **请求方法：POST**

  **请求参数:**

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

  **返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码:**

| httpcode | 错误码                                        | 错误信息                                                     | 描述                           |
| -------- | --------------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 400      | Account.Arrearage                             | Your account has been in   arrears.                          | 账户余额不足，请先充值再操作。 |
| 400      | InvalidVdcId.Malformed                        | The specified parameter   "VdcId" is not valid.              | 指定VdcId参数格式错误          |
| 400      | InvalidPublicNetwork. Type.Malformed          | The specified parameter   "PbulicNetwork.Type" is not valid. | 指定的公网类型格式错误。       |
| 400      | InvalidPublicNetwork. BillingMethod.Malformed | The specified parameter   "PbulicNetwork.BillingMethod" is not valid. | 指定的公网计费类型格式错误。   |
| 400      | InvalidPublicNetwork. Bandwich.Malformed      | The specified parameter   "PbulicNetwork.Bandwich" is not valid. | 指定的公网带宽大小格式错误。   |
| 400      | InvalidPublicNetwork. Bandwich.Malformed      | The specified parameter   "PbulicNetwork.Bandwich" is not valid. | 指定的公网带宽大小格式错误。   |
| 400      | InvalidPublicNetwork.Ip.Malformed             | The specified parameter   "PbulicNetwork.Ip" is not valid.   | 指定的公网Ip格式错误。         |

  **返回示例：**

```
{
   "Code":"Success,
   "TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

### 5.CreatePrivateNetwork

  **Action:CreatePrivateNetwork**

  **描述：** 给一个Vdc创建一个私网

  **请求地址:** cdsapi.capitalonline.net/network

  **请求方法：POST**

  **请求参数：**

| 名称    | 类型   | 是否必选 | 示例值                               | 描述                            |
| ------- | ------ | -------- | ------------------------------------ | ------------------------------- |
| VdcId   | string | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 云服务器所属的Vdc               |
| Name    | string | 否       | siwang1                              | 私网名称，默认不写名称是私网1/2 |
| Type    | string | 否       | manual                               | 私网类型(auto/manual)，默认auto |
| Address | string | 否       | 192.168.0.0                          | 私网地址                        |
| Mask    | string | 否       | 16                                   | 私网掩码                        |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                     | 错误信息                                           | 描述                   |
| -------- | -------------------------- | -------------------------------------------------- | ---------------------- |
| 400      | InvalidVDCID.Malformed     | The specified parameter   "VDCID" is not valid.    | 指定VDCID参数格式错误  |
| 400      | QuotaExceed.PrivateNetwork | The   maximum number of PrivateNetwork is exceeded | 创建的私网数量超出限制 |

  **返回示例：**

```
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

  **代码调用示例:**

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

  **Action:ModifyPublicNetwork**

  **描述：** 变更Vdc的公网带宽大小或者类型

  **请求地址:** cdsapi.capitalonline.net/network

  **请求方法：GET**

  **请求参数：**

| 名称     | 类型   | 是否必选 | 示例值                               | 描述     |
| -------- | ------ | -------- | ------------------------------------ | -------- |
| PublicId | string | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 公网id   |
| Qos      | string | 是       | 100                                  | 带宽大小 |

  **返回参数：**

| 名称   | 类型   | 示例值                               | 描述   |
| :----- | ------ | :----------------------------------- | :----- |
| Code   | string | Success                              | 错误码 |
| TaskId | string | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                           | 错误信息                                                  | 描述                   |
| -------- | -------------------------------- | --------------------------------------------------------- | ---------------------- |
| 400      | InvalidPublicNetworkID.Malformed | The specified parameter   "PublicNetworkID" is not valid. | 指定公网ID参数格式错误 |

  **返回示例：**

```
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}
```

  **代码调用示例:**

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
        print(result.get("Message"))
    task_id = result.get("TaskId")
    return task_id
```

### 7.AddPublicIp

  **Action:AddPublicIp**

  **描述：** 为已经购买的公网增加一个公网Ip段

  **请求地址:** cdsapi.capitalonline.net/network

  **请求方法：GET**

  **请求参数：**

| 名称     | 类型     | 是否必选 | 示例值                               | 描述                                  |
| -------- | -------- | -------- | ------------------------------------ | ------------------------------------- |
| PublicId | string   | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 公网id                                |
| Number   | Interger | 是       | 8                                    | 购买的Ip数量，可选参数:{4,8,16,32,64} |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                            | 错误信息                                                   | 描述                   |
| -------- | --------------------------------- | ---------------------------------------------------------- | ---------------------- |
| 400      | InvalidPublicNetwork.IP.Malformed | The specified parameter   "PbulicNetwork.IP" is not valid. | 指定的公网IP格式错误。 |

  **返回示例：**

```
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376"
}  
```

  **代码调用示例:**

```python

```

### 8.DeletePublicIp

  **Action:DeletePublicIp**

  **描述：** 删除Vdc公网下的一个Ip段

  **请求地址:** cdsapi.capitalonline.net/network

  **请求方法：GET**

  **请求参数：**

| 名称      | 类型   | 是否必选 | 示例值                               | 描述         |
| --------- | ------ | -------- | ------------------------------------ | ------------ |
| SegmentId | string | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 公网Ip段的Id |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                | 错误信息                                       | 描述                 |
| -------- | --------------------- | ---------------------------------------------- | -------------------- |
| 400      | InvalidIpId.Malformed | The specified parameter   "IpId" is not valid. | 指定IpId参数格式错误 |

  **返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376",
}
```

  **代码调用示例:**

```python

```

### 9.DeletePublicNetwork

  **Action:DeletePublicNetwork**

  **描述：** 删除Vdc下已经创建的公网Ip及带宽

  **请求地址:** cdsapi.capitalonline.net/network

  **请求方法：GET**

  **请求参数：**

| 名称     | 类型   | 是否必选 | 示例值                               | 描述   |
| -------- | ------ | -------- | ------------------------------------ | ------ |
| PublicId | string | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 公网Id |

  **返回参数：**

| 名称 | 类型     | 示例值  | 描述   |
| :--- | -------- | :------ | :----- |
| Code | Interger | Success | 错误码 |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |
| 400      | InvalidPublicID.Malformed | The specified parameter   "PublicID" is not valid. | 指定公网ID参数格式错误 |

  **返回示例：**

```json
{
"Code":"Success"
}
```

### 10.DeletePrivateNetwork

  **Action:DeletePrivateNetwork**

  **描述：** 删除Vdc下已经创建的私网

  **请求地址:** cdsapi.capitalonline.net/network

  **请求方法：GET**

  **请求参数：**

| 名称      | 类型   | 是否必选 | 示例值                               | 描述   |
| --------- | ------ | -------- | ------------------------------------ | ------ |
| PrivateId | string | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 私网Id |

  **返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

  **错误码：**

| httpcode | 错误码                     | 错误信息                                            | 描述                   |
| -------- | -------------------------- | --------------------------------------------------- | ---------------------- |
| 400      | InvalidPrivateId.Malformed | The specified parameter   "PrivateID" is not valid. | 指定私网Id参数格式错误 |

  **返回示例：**

```json
{
"Code":"Success",
"TaskId":"bbf63749-0186-4c68-8adc-9bf584bc1376",
}
```

### 11.RenewPublicNetwork

  **Action:RenewPublicNetwork**

  **描述：** 修改公网的自动续约为开或者关

  **请求地址:** cdsapi.capitalonline.net/network

  **请求方法：GET**

  **请求参数：**

| 名称      | 类型     | 是否必选 | 示例值                               | 描述                                             |
| --------- | -------- | -------- | ------------------------------------ | ------------------------------------------------ |
| PublicId  | string   | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 公网Id                                           |
| AutoRenew | Interger | 是       | 1                                    | 是否自动续费，1为自动续费（默认），0为不自动续费 |

  **返回参数：**

| 名称 | 类型     | 示例值  | 描述   |
| :--- | -------- | :------ | :----- |
| Code | Interger | Success | 错误码 |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                            | 描述                   |
| -------- | ------------------------- | --------------------------------------------------- | ---------------------- |
| 400      | InvalidPublicId.Malformed | The specified parameter   "PrivateID" is not valid. | 指定公网Id参数格式错误 |

  **返回示例：**

```json
{
"Code":"Success",
"Message":"Success."
}
```

### 12.DescribeBandwidthTraffic

  **Action:DescribeBandwidthTraffic**

  **描述：** 获取网络最近五分钟流量

  **请求地址:** cdsapi.capitalonline.net/network

  **请求方法：GET**

  **请求参数：**

| 名称      | 类型   | 是否必选 | 示例值                               | 描述                                                     |
| --------- | ------ | -------- | ------------------------------------ | -------------------------------------------------------- |
| NetworkId | string | 是       | 773f14c2-c8bc-4f66-acd7-ec34d3bfde7d | 网络Id(若查询公网即为PublicId， 若查询私网即为PrivateId) |

  **返回参数：**

| 名称 | 类型     | 示例值  | 描述     |
| :--- | -------- | :------ | :------- |
| Code | Interger | Success | 错误码   |
| Data | string   | {}      | 返回数据 |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |
| 400      | InvalidPublicId.Malformed | The specified parameter   "PublicId" is not valid. | 指定公网Id参数格式错误 |

  **返回示例：**

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

### 13.DescribeGPN

**Action:** DescribeGPN

**描述:** 查询云互联组(以下简称GPN)

**请求地址:** cdsapi.capitalonline.net/network

**请求方法:** POST

**请求参数:**

| 名称  |  类型  | 是否必选 |                 示例                 |  描述   |
| :---: | :----: | :------: | :----------------------------------: | :-----: |
| GpnId | String |    否    | 55271ebc-135d-11eb-97aa-0242ac110002 | GPN编号 |
|  Key  | String |    否    |               中美互联               | 关键词  |

**返回参数:**

| 名称       | 类型   | 示例                                                         | 描述                                                         |
| :--------- | :----- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| Code       | String | Success                                                      | 返回码                                                       |
| Data       | List   | []                                                           | 返回数据                                                     |
| GpnId      | String | c20a8424-26be-11ea-8333-0242ac110002                         | 云互联组编号                                                 |
| Qos        | Int    | 300                                                          | GPN带宽                                                      |
| Name       | Strint | 北京-无锡                                                    | GPN名称                                                      |
| EvpnId     | Int    | 12345                                                        | Evpn编号                                                     |
| Status     | String | ok                                                           | GPN状态                                                      |
| StatusStr  | String | 正常                                                         | GPN状态                                                      |
| SubOrderId | String | 425d533e-2d3d-11ea-93ed-0242ac110002                         | 订单编号                                                     |
| JoinVdcs   | List   | [{<br>"PrivateId":"2f8695bc-223f-11ea-bf4e-0050569e6138",<br>"RegionId":"CN_Beijing_A", <br>"VdcName": "北京一", <br>"VdcId": "425d533e-2d3d-11ea-93ed-0242ac110002",<br>"CityId": "713d3745-306d-11e7-9796-0050569b4d9c", <br>"PrivateNet": "10.240.129.0/16~10.240.129.255/16", <br>"Address": "10.240.129.0", <br>"Qos": 300<br>}] | PrivateId: 私网编号 <br>RegionId: 可用区编号 <br>VdcName: 数据中心名称 <br>VdcId: 数据中心编号 <br>CityId:城市编号 <br>PrivateNet:私网网段 <br>Address:私网地址 <br>Qos:私网带宽 |
| JoinVpcs   | List   | [{<br>"PrivateId":"2f8695bc-223f-11ea-bf4e-0050569e6138",<br>"RegionId":"CN_Beijing_A", <br>"VpcName": "北京一", <br>"VpcId": "425d533e-2d3d-11ea-93ed-0242ac110002",<br>"CityId": "713d3745-306d-11e7-9796-0050569b4d9c", <br>"PrivateNet": "10.240.129.0/16~10.240.129.255/16", <br>"Address": "10.240.129.0", <br>"Qos": 300<br>}] | PrivateId: 私网编号 <br>RegionId: 可用区编号 <br>VdcName: 数据中心名称 <br>VdcId: 数据中心编号 <br>CityId:城市编号 <br>PrivateNet:私网网段 <br>Address:私网地址 <br>Qos:私网带宽 |
| JoinPops   | List   | [{<br>"PopId":"2f8695bc-223f-11ea-bf4e-0050569e6138",<br>"CityId": "713d3745-306d-11e7-9796-0050569b4d9c", <br>"PopName": "北京一Pop", <br>"Qos": 300<br>}] | PopId: POP编号 <br>CityId:城市编号 <br>PopName: Pop名称 <br>Qos:Pop带宽 |


**错误码:**

| httpcode |         错误码         |                   错误信息                    |         描述          |
| :------: | :--------------------: | :-------------------------------------------: | :-------------------: |

**返回示例**

```json
{
    "Code": "Success",
    "Data": [
        {
            "EvpnId": 14105,
            "GpnId": "d91cc8a6-306a-11ea-ae2f-0242ac110002",
            "JoinVdcs": [
                {
                    "Address": "10.240.129.0",
                    "CityId": "713d3745-306d-11e7-9796-0050569b4d9c",
                    "PrivateId": "581d0c26-deb1-11e9-a055-0242ac110002",
                    "PrivateNet": "10.240.129.0/16~10.240.129.255/16",
                    "Qos": 5,
                    "RegionId": "CN_Taipei_A",
                    "VdcId": "206305c4-6b1e-4eef-a582-352216b3b48c",
                    "VdcName": "CDS-API台湾"
                },
                {
                    "Address": "192.168.1.0",
                    "CityId": "ea3ca775-306c-11e7-9796-0050569b4d9c",
                    "PrivateId": "cb166f84-1d76-11ea-9c39-0242ac110002",
                    "PrivateNet": "192.168.1.0/24",
                    "Qos": 5,
                    "RegionId": "CN_Beijing_A",
                    "VdcId": "179d1487-38dd-4656-9553-e1527bf183b2",
                    "VdcName": "CDS-API北京"
                },
                {
                    "Address": "10.240.169.0",
                    "CityId": "123d0d01-306d-11e7-9796-0050569b4d9c",
                    "PrivateId": "c20a8424-26be-11ea-8333-0242ac110002",
                    "PrivateNet": "10.240.169.0/16~10.240.169.255/16",
                    "Qos": 5,
                    "RegionId": "CN_Wuxi_A",
                    "VdcId": "72e2157d-4568-4c24-8585-8865f1683a10",
                    "VdcName": "CDS-API无锡"
                }
            ],
            "JoinVpcs": [
                {
                    "Address": "10.241.165.0",
                    "CityId": "e48e2312-306d-11e7-9796-0050569b4d9c",
                    "PrivateId": "ea683378-09f6-11eb-8e89-0242ac1112b3",
                    "PrivateNet": "10.241.165.0/16~10.241.165.255/16",
                    "Qos": 5,
                    "RegionId": "US_Dallas_D",
                    "VpcId": "de96aeb2-0159-11eb-abc1-12d7b66798c8",
                    "VpcName": "CDS-API达拉斯"
                }
            ],
            "JoinPops": null,
            "Name": "CDS-API-GPN",
            "Qos": 5,
            "Status": "ok",
            "StatusStr": "正常",
            "SubOrderId": "280dfb38-306b-11ea-85b1-1e50f85e211b"
        }
    ],
    "Message": "Success."
}
```

### 14.AddAccessPoint

**Action:** AddAccessPoint

**描述:** 云互联组增加接入点

**请求地址:** cdsapi.capitalonline.net/network

**请求方法:** POST

**请求参数:**

|  名称  |  类型  | 是否必选 | 示例                                                         | 描述                                               |
| :----: | :----: | :------: | :----------------------------------------------------------- | :------------------------------------------------- |
| GpnId  | String |    是    | c20a8424-26be-11ea-8333-0242ac110002                         | Gpn编号                                            |
| VdcAdd |  list  |    否    | [{<br>"VdcId": "c20a8769-26be-11ea-8333-0242ac110002", <br>"PointType":"VDC", <br>"PrivateId": "425d533e-2d3d-11ea-93ed-0242ac110002", <br>"CityId": "4257d33e-2d3d-11ea-93ed-0242ac110002"<br>}] | 添加VDC接入点                                      |
| PopAdd |  list  |    否    | [{<br>"PopId": "c20a8769-26be-11ea-8333-0242ac110002", <br>"CityId":"4257d33e-2d3d-11ea-93ed-0242ac110002", <br>"PointType": "Pop"<br>}] | 添加POP接入点<br>备注:PopAdd 和 VdcAdd不可同时为[] |


**返回参数:**

| 名称 | 类型   | 示例    | 描述     |
| :--- | :----- | :------ | :------- |
| Code | String | Success | 返回码   |
| Data | Dict   | {}      | 返回数据 |


**错误码：**

| httpcode | 错误码                 | 错误信息                                      | 描述                  |
| -------- | ---------------------- | --------------------------------------------- | --------------------- |
| 400      | InvalidGpnID.Malformed | The specified parameter "GpnId" is not valid. | 指定GpnId参数格式错误 |
| 400      | InvalidVdcID.Malformed | The specified parameter "VdcId" is not valid. | 指定VdcId参数格式错误 |


**返回示例**

```json
{
    "Code": "Success",
    "Data": {},
    "Message": "Success.",
    "TaskId": 3247486
}
```

### 15.DeleteAccessPoint

**Action:** DeleteAccessPoint

**描述:** 云互联组删除接入点

**请求地址:** cdsapi.capitalonline.net/network

**请求方法:** POST

**请求参数:**

|   名称    |  类型  | 是否必选 | 示例                                                         | 描述       |
| :-------: | :----: | :------: | :----------------------------------------------------------- | :--------- |
|   GpnId   | String |    是    | c20a8424-26be-11ea-8333-0242ac110002                         | Gpn编号    |
| DelPoints | Array  |    是    | ["c20a8424-26be-11ea-8333-0242ac110002", <br>"c20a8424-26be-11ea-8333-0242ac110002"<br>] | 删除接入点 |


**返回参数:**

| 名称    | 类型   | 示例    | 描述     |
| :------ | :----- | :------ | :------- |
| Code    | String | Success | 返回码   |
| Message | String | Success | 返回信息 |
| Data    | Dict   | {}      | 返回数据 |
| TaskId  | String | 111     | 任务编号 |

**错误码：**

| httpcode | 错误码                 | 错误信息                                      | 描述                  |
| -------- | ---------------------- | --------------------------------------------- | --------------------- |
| 400      | InvalidGpnID.Malformed | The specified parameter "GpnId" is not valid. | 指定GpnId参数格式错误 |


**返回示例**

```json
{
    "Code": "Success",
    "Data": {},
    "Message": "Success.",
    "TaskId": 3247486
}
```

### 16.DescribeAccessInfo

**Action:** DescribeAccessInfo

**描述:** 查询GPN接入点信息

**请求地址:** cdsapi.capitalonline.net/network

**请求方法:** POST

**请求参数:**

| 名称 |  类型  | 是否必选 | 示例 |        描述         |
| :--: | :----: | :------: | :--: | :-----------------: |
| Type | String |    是    | vdc  | 接入点类型(vdc/pop) |

**返回参数:**

|      名称      |  类型  | 示例                                                         |                  描述                  |
| :------------: | :----: | :----------------------------------------------------------- | :------------------------------------: |
|      Code      | String | Success                                                      |                 返回码                 |
|    Message     | String | Success                                                      |                返回信息                |
|      Data      |  Dict  | {}                                                           |                返回数据                |
| PrivateNetwork |  list  | [{"PrivateId": "928ce33c-22f3-11ea-a1a1-0242ac11001a",<br>"Address": "10.241.7.0"}] | PrivateId: 私网id<br>Address: 网段地址 |
|     CityId     | String | ea3ca775-306c-11e7-9796-0050569b4d9c                         |                城市编号                |
|    RegionId    | String | CN_Beijing_A                                                 |                地区编号                |
|   RegionName   | String | 北京1                                                        |                地区名称                |
|     VdcId      | String | 179d1487-38dd-4656-9553-e1527bf183b2                         |             虚拟数据中心id             |
|    VdcName     | String | vdc1                                                         |            虚拟数据中心名称            |
|    ZoneName    | String | 中国大陆                                                     |                大区名称                |


**返回示例**

```json
{
    "Code": "Success",
    "Data": {
        "Pop": null,
        "Vdc": [
            {
                "CityId": "ea3ca775-306c-11e7-9796-0050569b4d9c",
                "PrivateNetwork": [
                    {
                        "Address": "10.241.60.0",
                        "PrivateId": "3b227ec6-1d77-11ea-bd0d-0242ac110002"
                    }
                ],
                "RegionId": "CN_Beijing_A",
                "RegionName": "北京1",
                "VdcId": "179d1487-38dd-4656-9553-e1527bf183b2",
                "VdcName": "CDS-API-BJ",
                "ZoneName": "中国大陆"
            },
            {
                "CityId": "713d3745-306d-11e7-9796-0050569b4d9c",
                "PrivateNetwork": [
                    {
                        "Address": "10.241.65.0",
                        "PrivateId": "1f4932a8-369a-11ea-8778-0242ac110002"
                    }
                ],
                "RegionId": "CN_Taipei_A",
                "RegionName": "台北1",
                "VdcId": "206305c4-6b1e-4eef-a582-352216b3b48c",
                "VdcName": "CDS-API-TB",
                "ZoneName": "亚太地区"
            }
        ]
    },
    "Message": "Success.",
    "TaskId": ""
}
```

### 17.CreateGpn

   **Action:** CreateGPN

   **描述:** 创建GPN

   **请求地址:** cdsapi.capitalonline.net/network

   **请求方法:** POST

   **请求参数:**

|      名称      |  类型  | 是否必选 | 示例                                                         | 描述                                                         |
| :------------: | :----: | :------: | :----------------------------------------------------------- | :----------------------------------------------------------- |
|      Name      | String |    是    | gpn                                                          | 接入点名称                                                   |
|      Qos       |  Int   |    是    | 5                                                            | GPN带宽                                                      |
|  AccessPoint   |  list  |    是    | [{"VdcId":"",<br/>"AccessPointType":"vdc",<br/>"PrivateId":""}] | Vdc_id: 虚拟数据中心id<br/>AccessPointType:接入点类型<br/>PrivateId:私网id |
| PopAccessPoint |  list  |    是    | [{"AccessPointType":"pop",<br/>"PopId":""}]                  | AccessPointType:接入点类型<br/>PopId:pop点id                 |

   **返回参数:**

|  名称   |  类型  | 示例    |   描述   |
| :-----: | :----: | :------ | :------: |
|  Code   | String | Success |  返回码  |
| Message | String | Success | 返回信息 |
|  Data   |  Dict  | {}      | 返回数据 |
| TaskId  | String | 111     | 任务编号 |

   **错误码：**

| httpcode | 错误码 | 错误信息  | 描述 |
| ---- | ---- | ---- | ---- |


   **返回示例**

```json
{
    "Code": "Success",
    "Data": {},
    "Message": "Success.",
    "TaskId": 3247486
}
```

**调用代码示例:**

```python
def CreateGPN(Qos, Name, PrivateId1, PrivateId2, VdcId1,VdcId2):
    """
    创建云互联组
    :params Qos: 云互联组带宽
    :params Name: 云互联组名称
    :params PrivateId1: 接入点1的私网编号
    :params PrivateId2: 接入点2的私网编号 
    :params VdcId1: 接入点1的虚拟数据中心编号
    :params VdcId2: 接入点2的虚拟数据中心编号
    """
    action = "CreateGPN"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL, param={})
    body = {
        "Name": Name,
        "Qos": Qos,
        "AccessPoint": [
            {
                "VdcId": VdcId1,
                "AccessPointType": "vdc",
                "PrivateId": PrivateId1
            },
            {
                "VdcId": VdcId2,
                "AccessPointType": "vdc",
                "PrivateId": PrivateId2
            }
        ],
        "PopAccessPoint": []
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print("create GPN error: %s" % result.get("Message"))
    return result.get("TaskId")
```

### 18.DeleteGpn

   **Action:** DeleteGpn

   **描述:** 删除一个GPN

   **请求地址:** cdsapi.capitalonline.net/gpn

   **请求方法:** POST

   **请求参数:**

| 名称  |  类型  | 是否必选 |         示例          | 描述    |
| :---: | :----: | :------: | :-------------------: | :------ |
| GpnId | String |    是    | fjdgh90-98fhd78-kh487 | GPN编号 |

   **返回参数:**

|  名称   |  类型  | 示例    |   描述   |
| :-----: | :----: | :------ | :------: |
|  Code   | String | Success |  返回码  |
| Message | String | Success | 返回信息 |
|  Data   |  Dict  | {}      | 返回数据 |
| TaskId  | String | 111     | 任务编号 |

   **错误码：**

| httpcode | 错误码 | 错误信息  | 描述 |
| ---- | ---- | ---- | ---- |


   **返回示例**

```json
{
    "Code": "Success",
    "Data": {},
    "Message": "Success.",
    "TaskId": 3247486
}
```

### 19.ModifyVdceName

**Action：ModifyVdcName**

**描述：** 修改VDC名称

**请求地址:** cdsapi.capitalonline.net/network

**请求方法：POST**

**请求参数：**

| 名称    | 类型   | 是否必选 | 示例值                               | 描述               |
| ------- | ------ | -------- | ------------------------------------ | ------------------ |
| VdcId   | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 虚拟数据中心的编号 |
| VdcName | string | 是       | shouduzaixhost                       | 虚拟数据中心的名称 |

**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code   | Interger | Success                              | 错误码 |
| TaskId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 任务Id |

**错误码：**

| httpcode | 错误码                 | 错误信息                                                     | 描述                           |
| -------- | ---------------------- | ------------------------------------------------------------ | ------------------------------ |
| 403      | IncorrectVdcStatus     | The   current Status of the resource does not support this operation. | 该资源目前的状态不支持此操作。 |
| 400      | VdcNotFound            | the Vdc has   deleted                                        | 指定的Vdc已被删除              |
| 400      | InvalidVdcId.Malformed | The specified parameter   "VdcId" is not valid.              | 指定VdcId参数格式错误          |

**返回示例：**

```json
{
  "Code": "Success",
  "Data": {},
  "Message": "Success.",
  "TaskId": ""
}
```

## 私有网络相关

### 1.DescribeVPC

  **Action:DescribeVPC**

  **描述：** 查询私有网络(以下简称VPC)信息

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称       | 类型   | 是否必选 | 示例值      | 描述                           |
| ---------- | ------ | -------- | ----------- | ------------------------------ |
| RegionCode | string | 是       | CN_Hongkong | VPC区域code, 见附件五          |
| PageNumber | int    | 否       | 1           | 列表页码。起始值：1, 默认值：1 |
| Keyword    | string | 否       | vpc名称     | 查询关键字                     |


  **返回参数：**

| 名称       | 类型     | 示例值                               | 描述        |
| :--------- | -------- | :----------------------------------- | :---------- |
| Code       | string   | Success                              | 错误码      |
| Message    | string   | Success                              | 信息        |
| Data       | dict     | {}                                   | 返回数据    |
| Total      | int      | 11                                   | VPC总数     |
| VPCList    | list     | []                                   | VPC信息列表 |
| VPCId      | string   | 9304b130-e25b-11ec-a12c-823092f7a5bd | VPC ID      |
| VPCNmae    | string   | test                                 | VPC名称     |
| VPCSegment | string   | 10.15.0.0/16                         | VPC网段     |
| Status     | string   | ok                                   | VPC状态     |
| RegionCode | string   | CN_Hongkong                          | VPC区域code |
| CreateTime | datetime | 2022-06-02 18:05:47                  | 创建时间    |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "Total": 2,
        "VPCList": [
            {
                "CreateTime": "2022-06-02 18:05:47",
                "RegionCode": "CN_Hongkong",
                "Status": "ok",
                "VPCId": "9304b130-e25b-11ec-a12c-823092f7a5bd",
                "VPCNmae": "OPENAPI_VPC1",
                "VPCSegment": "10.15.0.0/16"
            },
            {
                "CreateTime": "2022-03-29 16:06:27",
                "RegionCode": "CN_Hongkong",
                "Status": "ok",
                "VPCId": "22310dfc-af37-11ec-8944-1200cba86117",
                "VPCNmae": "openapi测试",
                "VPCSegment": "10.10.0.0/16"
            }
        ]
    },
    "Message": "success"
}
```

  **代码调用示例**

```python
def describe_vpc(regin_code, key, page):
    action = 'DescribeVPC'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "RegionCode": regin_code,
        "Keyword": key,
        "PageNumber": page
    }
    res = requests.post(url, json=body)
```

### 2.CreateVPC

  **Action:CreateVPC**

  **描述：** 创建一个VPC

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**


| 名称              | 类型   | 是否必选 | 示例值        | 描述                    |
| ----------------- | ------ | -------- | ------------- | ----------------------- |
| RegionCode        | string | 是       | CN_Hongkong   | VPC区域code, 见附件五   |
| VPCName           | string | 是       | name          | VPC名称                 |
| VPCSegment        | string | 是       | 10.15.0.0/16  | VPC网段                 |
| VPCSegmentType    | string | 是       | auto/manual   | 使用推荐网段或手动分配  |
| SubnetList        | list   | 是       | []            | 创建VPC必须创建一个子网 |
| AvailableZoneCode | string | 是       | CN_Hongkong_A | VPC可用区code, 见附件五 |
| SubnetName        | string | 是       | 子网1         | 子网名称                |
| SubnetSegment     | string | 是       | 10.15.1.0/24  | 子网网段                |

  **返回参数：**

| 名称         | 类型   | 示例值                               | 描述               |
| :----------- | ------ | :----------------------------------- | :----------------- |
| Code         | string | Success                              | 错误码             |
| Message      | string | Success                              | 信息               |
| TaskId       | string | d7706342-e566-11ec-89a8-0ad447efda1e | 创建VPC任务ID      |
| Data         | dict   | {}                                   | 返回数据           |
| SubnetIdList | list   | []                                   | 创建子网ID列表     |
| SubnetTaskId | list   | []                                   | 创建子网任务ID列表 |
| VPCId        | string | d76df710-e566-11ec-89a8-0ad447efda1e | VPC ID             |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**


```json
{
  "Code": "Success",
  "Data": {
    "SubnetIdList": [
      "d7774090-e566-11ec-89a8-0ad447efda1e"
    ],
    "SubnetTaskId": [
      "d776d60a-e566-11ec-89a8-0ad447efda1e"
    ],
    "VPCId": "d76df710-e566-11ec-89a8-0ad447efda1e"
  },
  "Message": "您的VPC创建任务已下发成功!",
  "TaskId": "d7706342-e566-11ec-89a8-0ad447efda1e"
}
```


  **代码调用示例**

```python
def create_vpc():

    action = 'CreateVPC'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
   "RegionCode": "CN_Hongkong",
   "VPCName": "OPENAPI_VPC1",
   "VPCSegment": "10.15.0.0/16",
   "VPCSegmentType": "auto",
   "SubnetList": [{
         "AvailableZoneCode": "CN_Hongkong_A",
         "SubnetName": "子网1",
         "SubnetSegment": "10.15.1.0/24"
          }
       ]

    }
    res = requests.post(url, json=body)
```

### 3.DeleteVPC

  **Action:DeleteVPC**

  **描述：** 删除一个VPC

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**


| 名称  | 类型   | 是否必选 | 示例值                               | 描述           |
| ----- | ------ | -------- | ------------------------------------ | -------------- |
| VPCId | string | 是       | 0e6b73d2-e571-11ec-991d-0ad447efda1e | 要删除的VPC ID |

  **返回参数：**

| 名称    | 类型   | 示例值                               | 描述   |
| :------ | ------ | :----------------------------------- | :----- |
| Code    | string | Success                              | 错误码 |
| Message | string | Success                              | 信息   |
| TaskId  | string | d7706342-e566-11ec-89a8-0ad447efda1e | 任务ID |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
   "Code": "Success",
   "Data": {},
   "Message": "您的VPC删除任务已下发成功!",
   "TaskId": "98087aa4-e571-11ec-991d-0ad447efda1e"
}
```


  **代码调用示例**

```python
def delete_vpc(vpc_id):
    action = 'DeleteVPC'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "VPCId": vpc_id

    }
    res = requests.post(url, json=body)
```

### 4.DescribeSubNet

  **Action:DescribeSubNet**

  **描述：** 查询子网信息

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**



| 名称              | 类型   | 是否必选 | 示例值                               | 描述                           |
| ----------------- | ------ | -------- | ------------------------------------ | ------------------------------ |
| RegionCode        | string | 是       | CN_Hongkong                          | VPC区域code, 见附件五          |
| Keyword           | string | 否       | name                                 | 查询关键字 名称/ID             |
| PageNumber        | string | 否       | 1                                    | 列表页码。起始值：1, 默认值：1 |
| VPCId             | string | 否       | d5e16d74-30a4-49d0-bc1d-06cc40035999 | VPC ID                         |
| AvailableZoneCode | string | 否       | CN_Hongkong                          | VPC可用区code, 见附件五        |

  **返回参数：**

| 名称              | 类型   | 示例值                               | 描述       |
| :---------------- | ------ | :----------------------------------- | :--------- |
| Code              | string | Success                              | 错误码     |
| Message           | string | Success                              | 信息       |
| Data              | dict   | {}                                   | 返回信息   |
| Total             | int    | 1                                    | 总数       |
| SubnetList        | list   | []                                   | 子网列表   |
| SubnetId          | string | 026f4386-e573-11ec-a09a-cabfed3cc5e1 | 子网ID     |
| SubnetName        | string | 子网1                                | 子网名称   |
| SubnetSegment     | string | 026f4386-e573-11ec-a09a-cabfed3cc5e1 | 子网网段   |
| UsedIPNum         | int    | 026f4386-e573-11ec-a09a-cabfed3cc5e1 | 已用IP数量 |
| VPCId             | string | 026f4386-e573-11ec-a09a-cabfed3cc5e1 | VPC ID     |
| VPCName           | string | 026f4386-e573-11ec-a09a-cabfed3cc5e1 | VPC名称    |
| AvailableZoneCode | string | 026f4386-e573-11ec-a09a-cabfed3cc5e1 | 可用区code |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |



```json
{
  "Code": "Success",
  "Data": {
    "SubnetList": [
      {
        "AvailableZoneCode": "CN_Hongkong_A",
        "Status": "ok",
        "SubnetId": "026f4386-e573-11ec-a09a-cabfed3cc5e1",
        "SubnetName": "子网1",
        "SubnetSegment": "10.15.1.0/24",
        "UsedIPNum": 15,
        "VPCId": "0266c864-e573-11ec-a09a-cabfed3cc5e1",
        "VPCName": "OPENAPI_VPC1"
      },
      {
        "AvailableZoneCode": "CN_Hongkong_A",
        "Status": "ok",
        "SubnetId": "22390f70-af37-11ec-8944-1200cba86117",
        "SubnetName": "子网1",
        "SubnetSegment": "10.10.11.0/24",
        "UsedIPNum": 18,
        "VPCId": "22310dfc-af37-11ec-8944-1200cba86117",
        "VPCName": "openapi测试"
      }
    ],
    "Total": 2
  },
  "Message": "success"
}
```



  **代码调用示例**

```python
def describe_subnet(region_code, key, page, vpc_id, az_code):
    action = 'DescribeSubnet'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "RegionCode": region_code,
        "Keyword": key,
        "PageNumber": page,
        "VPCId": vpc_id,
        "AvailableZoneCode":az_code
    }
    res = requests.post(url, json=body)
```

### 5.CreateSubNet

  **Action:CreateSubNet**

  **描述：** 创建一个子网

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称              | 类型   | 是否必选 | 示例值                               | 描述                    |
| ----------------- | ------ | -------- | ------------------------------------ | ----------------------- |
| VPCId             | string | 是       | 0266c864-e573-11ec-a09a-cabfed3cc5e1 | VPC ID                  |
| SubnetList        | list   | 是       | []                                   | 创建VPC必须创建一个子网 |
| AvailableZoneCode | string | 是       | CN_Hongkong_A                        | VPC可用区code, 见附件五 |
| SubnetName        | string | 是       | 子网1                                | 子网名称                |
| SubnetSegment     | string | 是       | 10.15.1.0/24                         | 子网网段                |

  **返回参数：**

| 名称         | 类型   | 示例值  | 描述               |
| :----------- | ------ | :------ | :----------------- |
| Code         | string | Success | 错误码             |
| Message      | string | Success | 信息               |
| Data         | dict   | {}      | 返回数据           |
| TaskIdList   | list   | []      | 创建子网ID列表     |
| SubnetTaskId | list   | []      | 创建子网任务ID列表 |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
   "Code": "Success",
   "Data": {
      "SubnetIdList": ["354f920c-e577-11ec-8d74-cabfed3cc5e1"],
      "TaskIdList": ["354f04cc-e577-11ec-8d74-cabfed3cc5e1"]
   },
   "Message": "您的子网创建任务已下发成功"
}
```


  **代码调用示例**

```python
def create_subnet():
    action = 'CreateSubnet'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
   "VPCId": "0266c864-e573-11ec-a09a-cabfed3cc5e1",
   "SubnetList": [{
         "AvailableZoneCode": "CN_Hongkong_A",
         "SubnetName": "子网3",
         "SubnetSegment": "10.15.3.0/24"
      }
   ]
}
    json.dumps(body)
    res = requests.post(url, json=body)
```

### 6.DeleteSubNet

  **Action:DeleteSubNet**

  **描述：** 删除一个子网

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**


| 名称     | 类型   | 是否必选 | 示例值                               | 描述           |
| -------- | ------ | -------- | ------------------------------------ | -------------- |
| SubnetId | string | 是       | 0e6b73d2-e571-11ec-991d-0ad447efda1e | 要删除的子网ID |

  **返回参数：**

| 名称    | 类型   | 示例值                               | 描述   |
| :------ | ------ | :----------------------------------- | :----- |
| Code    | string | Success                              | 错误码 |
| Message | string | Success                              | 信息   |
| TaskId  | string | d7706342-e566-11ec-89a8-0ad447efda1e | 任务ID |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
   "Code": "Success",
   "Data": {},
   "Message": "您的子网删除任务已下发成功!",
   "TaskId": "0e6b73d2-e571-11ec-991d-0ad447efda1e"
}
```


  **代码调用示例**

```python
def delete_subnet(subnet_id):
    action = 'DeleteSubnet'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "SubnetId": subnet_id

    }
    res = requests.post(url, json=body)
```

### 7.DescribeVirtualGateWay

  **Action:DescribeVirtualGateWay**

  **描述：** 查询虚拟出网网关

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**



| 名称              | 类型   | 是否必选 | 示例值                               | 描述                           |
| ----------------- | ------ | -------- | ------------------------------------ | ------------------------------ |
| RegionCode        | string | 是       | CN_Hongkong                          | VPC区域code, 见附件五          |
| Keyword           | string | 否       | name                                 | 查询关键字 名称/ID             |
| PageNumber        | string | 否       | 1                                    | 列表页码。起始值：1, 默认值：1 |
| VPCId             | string | 否       | d5e16d74-30a4-49d0-bc1d-06cc40035999 | VPC ID                         |
| AvailableZoneCode | string | 否       | CN_Hongkong                          | VPC可用区code, 见附件五        |

  **返回参数：**

| 名称                  | 类型   | 示例值                               | 描述             |
| :-------------------- | ------ | :----------------------------------- | :--------------- |
| Code                  | string | Success                              | 错误码           |
| Message               | string | Success                              | 信息             |
| Data                  | dict   | {}                                   | 返回信息         |
| Total                 | int    | 1                                    | 总数             |
| VirtualGateWayList    | list   | []                                   | 虚拟出网网关列表 |
| VirtualGateWayId      | string | 026f4386-e573-11ec-a09a-cabfed3cc5e1 | 虚拟出网网关ID   |
| VirtualGateWayName    | string | test-gx                              | 虚拟出网网关名称 |
| VirtualGateWaySegment | string | 026f4386-e573-11ec-a09a-cabfed3cc5e1 | 虚拟出网网关网段 |
| UsedIPNum             | int    | 026f4386-e573-11ec-a09a-cabfed3cc5e1 | 已经IP数量       |
| VPCId                 | string | 026f4386-e573-11ec-a09a-cabfed3cc5e1 | VPC ID           |
| VPCName               | string | 026f4386-e573-11ec-a09a-cabfed3cc5e1 | VPC名称          |
| AvailableZoneCode     | string | 026f4386-e573-11ec-a09a-cabfed3cc5e1 | 可用区code       |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |



```json
{
   "Code": "Success",
   "Data": {
      "Total": 1,
      "VirtualGateWayList": [{
         "AvailableZoneCode": "CN_DaBieShan_A",
         "Status": "ok",
         "Type": "电信",
         "UsedIPNum": 16,
         "VPCId": "e0e6c470-7f4f-11ec-b3e8-d2aace4aaab9",
         "VPCName": "test-gx",
         "VirtualGateWayId": "7be91556-7fe4-11ec-a733-d2aace4aaab9",
         "VirtualGateWayName": "test-dainxin-02",
         "VirtualGateWaySegment": "10.4.230.0/24"
      }]
   },
   "Message": "success"
}
```


  **代码调用示例**

```python
def describe_virtual_gateway(regin_code, key, page, vpc_id, az_code):
    action = 'DescribeVirtualGateWay'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "RegionCode": regin_code,
        "Keyword": key,
        "PageNumber": page,
        "VPCId": vpc_id,
        "AvailableZoneCode": az_code
    }
    json.dumps(body)
    res = requests.post(url, json=body)
    result = res.json()
```

### 8.CreateVirtualGateWay

  **Action:CreateVirtualGateWay**

  **描述：** 创建一个虚拟出网网关

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称                  | 类型   | 是否必选 | 示例值                               | 描述                    |
| --------------------- | ------ | -------- | ------------------------------------ | ----------------------- |
| VPCId                 | string | 是       | 0266c864-e573-11ec-a09a-cabfed3cc5e1 | VPC ID                  |
| VirtualGateWayList    | list   | 是       | []                                   |                         |
| AvailableZoneCode     | string | 是       | CN_Hongkong_A                        | VPC可用区code, 见附件五 |
| VirtualGateWayName    | string | 是       | 虚拟出网网关1                        | 虚拟出网网关名称        |
| VirtualGateWaySegment | string | 是       | 10.15.1.0/24                         | 虚拟出网网关网段        |
| Type                  | string | 是       | 联通                                 | 带宽CODE                |

  **返回参数：**

| 名称                 | 类型   | 示例值  | 描述                         |
| :------------------- | ------ | :------ | :--------------------------- |
| Code                 | string | Success | 错误码                       |
| Message              | string | Success | 信息                         |
| Data                 | dict   | {}      | 返回数据                     |
| TaskIdList           | list   | []      | 创建子虚拟出网网关任务ID列表 |
| VirtualGateWayIdList | list   | []      | 创建子虚拟出网网关ID列表     |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
   "Code": "Success",
   "Data": {
      "TaskIdList": ["b1730f48-e640-11ec-8fd4-8a20ea9a3e7b"],
      "VirtualGateWayIdList": ["b173bc4a-e640-11ec-8fd4-8a20ea9a3e7b"]
   },
   "Message": "您的虚拟出网网关创建任务已下发成功"
}
```


  **代码调用示例**

```python
def create_virtual_gateway():
    action = 'CreateVirtualGateWay'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
   "VPCId": "170d5f32-9922-11ec-91ec-02fde40489da",
   "VirtualGateWayList": [{
         "AvailableZoneCode": "CN_DaBieShan_A",
         "VirtualGateWayName": "虚拟出网网关1",
         "VirtualGateWaySegment": "10.6.1.0/24",
            "Type": "Bandwidth_CMCC"
      }
   ]
}
    json.dumps(body)
    res = requests.post(url, json=body)
```

### 9.DeleteVirtualGateWay

  **Action:DeleteVirtualGateWay**

  **描述：** 删除一个虚拟出网网关

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**


| 名称             | 类型   | 是否必选 | 示例值                               | 描述                   |
| ---------------- | ------ | -------- | ------------------------------------ | ---------------------- |
| VirtualGateWayId | string | 是       | 0e6b73d2-e571-11ec-991d-0ad447efda1e | 要删除的虚拟出网网关ID |

  **返回参数：**

| 名称    | 类型   | 示例值                               | 描述   |
| :------ | ------ | :----------------------------------- | :----- |
| Code    | string | Success                              | 错误码 |
| Message | string | Success                              | 信息   |
| TaskId  | string | d7706342-e566-11ec-89a8-0ad447efda1e | 任务ID |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
   "Code": "Success",
   "Data": {},
   "Message": "您的虚拟出网网关删除任务已下发成功!",
   "TaskId": "05205da2-e642-11ec-8fd4-8a20ea9a3e7b"
}
```

  **代码调用示例**

```python
def delete_virtual_gateway(virtual_gateway_id):
    action = 'DeleteVirtualGateWay'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "VirtualGateWayId": virtual_gateway_id

    }
    res = requests.post(url, json=body)
```

### 10.DescribeEIP

  **Action:DescribeEIP**

  **描述：** 查询EIP

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称              | 类型   | 是否必选                        | 示例值        | 描述                                               |
| ----------------- | ------ | ------------------------------- | ------------- | -------------------------------------------------- |
| RegionCode        | string | 是                              | CN_Hongkong   | VPC区域code, 见附件五                              |
| AvailableZoneCode | string | 边缘节点：是 / 云平台节点：不传 | CN_Hongkong_A | VPC可用区code, 见附件五(云平台节点EIP不包含此字段) |
| Keyword           | string | 否                              | eip地址       | 查询关键字                                         |


  **返回参数：**

| 名称              | 类型     | 示例值                               | 描述                                                    |
| :---------------- | -------- | :----------------------------------- | :------------------------------------------------------ |
| Code              | string   | Success                              | 错误码                                                  |
| Message           | string   | Success                              | 信息                                                    |
| Data              | dict     | {}                                   | 返回数据                                                |
| Total             | int      | 4                                    | EIP总数                                                 |
| EIPList           | list     | []                                   | EIP信息列表                                             |
| Id                | string   | 22597c56-e646-11ec-97e2-7687d6f44ced | EIP ID                                                  |
| IP                | string   | 118.186.70.138                       | EIP 地址                                                |
| RegionCode        | string   | CN_Hongkong                          | VPC区域code                                             |
| AvailableZoneCode | string   | ""                                   | VPC可用区code, 见附件五(云平台节点EIP不包含此字段)      |
| Status            | string   | ok                                   | EIP 状态                                                |
| Description       | string   | test                                 | EIP 描述信息                                            |
| IsBind            | bool     | True                                 | EIP是否绑定了子网ip                                     |
| CreateTime        | datetime | 2022-06-02 18:05:47                  | 创建时间                                                |
| BandwidthInfo     | dict     | {}                                   | EIP带宽信息                                             |
| Id                | string   | 2232dede-e646-11ec-97e2-7687d6f44ced | 带宽ID                                                  |
| Name              | string   | ""                                   | 共享带宽名称(云平台节点，加入了共享带宽的EIP会有此字段) |
| Qos               | int      | 10                                   | 带宽大小（Mbps）                                        |
| AvailableZoneCode | string   | ""                                   | VPC可用区code, 见附件五(云平台节点EIP不包含此字段)      |
| BandwidthType     | string   | Bandwidth_China_Telecom              |                                                         |
| BillScheme        | string   | BandwIdth                            |                                                         |
| Status            | string   | ok                                   | 带宽状态                                                |
| CreateTime        | string   | 2022-06-02 18:05:47                  | 带宽创建时间                                            |
| BindResourceInfo  | dict     | {}                                   | EIP绑定的子网ip信息                                     |
| SubnetId          | string   | d9b88a1e-aa54-11ec-a512-06d5ff412043 | 子网ID（边缘节点，此处为虚拟出网网关ID）                |
| SubnetIP          | string   | 10.3.2.4                             | 子网IP（边缘节点，此处为虚拟出网网关IP）                |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
  "Code": "Success",
  "Data":
  {
    "Total": 2,
    "EIPList":
    [
      {
        "AvailableZoneCode": "",
        "CreateTime": "2022-06-07 17:42:24",
        "Description": "",
        "IP": "118.186.70.138",
        "Id": "22597c56-e646-11ec-97e2-7687d6f44ced",
        "IsBind": false,
        "RegionCode": "CN_Hongkong",
        "Status": "ok",
        "BandwidthInfo":
        {
          "AvailableZoneCode": "",
          "BandwidthType": "Bandwidth_China_Telecom",
          "BillScheme": "BandwIdth",
          "CreateTime": "2022-06-07 17:42:24",
          "Id": "2232dede-e646-11ec-97e2-7687d6f44ced",
          "Name": "",
          "Qos": 10,
          "Status": "ok"
        }，
         "BindResourceInfo": null
      },
      {
        "AvailableZoneCode": "",
        "CreateTime": "2022-06-07 12:35:44",
        "Description": "",
        "IP": "118.186.70.137",
        "Id": "4b75b15c-e61b-11ec-8d74-cabfed3cc5e1",
        "IsBind": true,
        "RegionCode": "CN_Hongkong",
        "Status": "ok",
        "BandwidthInfo":
        {
          "AvailableZoneCode": "CN_Hongkong_A",
          "BandwidthType": "Bandwidth_China_Telecom",
          "BillScheme": "BandwIdth_Shared",
          "CreateTime": "2022-06-07 12:35:37",
          "Id": "46f802ce-e61b-11ec-a09a-cabfed3cc5e1",
          "Name": "测试1",
          "Qos": 10,
          "Status": "ok"
        },
        "BindResourceInfo":
        {
          "SubnetIP": "10.3.2.4",
          "SubnetId": "d9b88a1e-aa54-11ec-a512-06d5ff412043"
        }
      }
    ]
  },
  "Message": "success"
}
```

   **代码调用示例**

```python
def describe_eip(regin_code, key, page, vpc_id, az_code):
    action = 'DescribeEIP'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "RegionCode": "CN_Hongkong"
    }
    res = requests.post(url, json=body)
```



### 11.CreateEIP

  **Action:CreateEIP**

  **描述：** 创建一个EIP

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称              | 类型   | 是否必选                      | 示例值                  | 描述                                                         |
| ----------------- | ------ | ----------------------------- | ----------------------- | ------------------------------------------------------------ |
| RegionCode        | string | 是                            | CN_Hongkong             | VPC区域code, 见附件五                                        |
| AvailableZoneCode | string | 边缘节点：是 / 云平台节点: 否 |                         | VPC可用区code, 见附件五(云平台节点EIP不传此字段/边缘节点必传) |
| BandwidthType     | string | 是                            | Bandwidth_China_Telecom | 带宽类型                                                     |
| BillScheme        | string | 是                            | BandwIdth               | 计费方案<br/>BandwIdth（固定带宽，默认）<br/>BandwIdthMonth（固定带宽包月，默认） |
| Qos               | int    | 是                            | 5                       | 带宽大小                                                     |
| Size              | int    | 是                            | 1                       | 创建个数                                                     |
| Description       | string | 否                            | test                    | EIP描述                                                      |


  **返回参数：**

| 名称    | 类型   | 示例值                              | 描述     |
| :------ | ------ | :---------------------------------- | :------- |
| Code    | string | Success                             | 错误码   |
| Message | string | Success                             | 信息     |
| Data    | list   | [{"EIPId":"abcd", "IP": "1.1.1.1"}] | 返回数据 |
| EIPId   | string | abcd                                | EIP ID   |
| IP      | string | 1.1.1.1                             | EIP 地址 |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
  "Code": "Success",
  "Data":
  [
    {
      "EIPId": "3b60ee94-e6f7-11ec-b681-bafaaf87d540",
      "IP": "118.186.70.139"
    }
  ],
  "Message": "任务下发成功"
}
```


   **代码调用示例**

```python
def create_eip(regin_code, key, page, vpc_id, az_code):
    action = 'CreateEIP'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "RegionCode": "CN_Hongkong",
        # "AvailableZoneId": None,  # 边缘节点必传
        "BandwidthType": "Bandwidth_China_Telecom",
        "BillScheme": "BandwIdth",
        "Qos": 5,
        "Size": 1,
        "Description": "openapi测试",
    }
    res = requests.post(url, json=body)
```


### 12.UpdateEIP

  **Action:UpdateEIP**

  **描述：** 变更EIP

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称        | 类型   | 是否必选 | 示例值 | 描述             |
| ----------- | ------ | -------- | ------ | ---------------- |
| EIPId       | string | 是       | abcd   | EIP ID           |
| Description | string | 否       | test   | 描述             |
| Qos         | int    | 否       | 5      | 带宽大小（Mbps） |


  **返回参数：**

| 名称    | 类型   | 示例值   | 描述           |
| :------ | ------ | :------- | :------------- |
| Code    | string | Success  | 错误码         |
| Message | string | 修改成功 | 信息           |
| Data    | dict   | {}       | 返回数据       |
| TaskId  | string | abcd     | 修改带宽任务ID |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
  "Code": "Success",
  "Data": {},
  "Message": "修改成功",
  "TaskId": "abcd"
}
```


   **代码调用示例**

```python
def update_eip(regin_code, key, page, vpc_id, az_code):
    action = 'UpdateEIP'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        'EIPId': '2e4fb57a-a43d-11ec-a3b5-fefaa522c9da',
        'Description': 'openapi',
        'Qos': 20
    }
    res = requests.post(url, json=body)
```


### 13.DeleteEIP

  **Action:DeleteEIP**

  **描述：** 删除一个EIP

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称  | 类型   | 是否必选 | 示例值 | 描述   |
| ----- | ------ | -------- | ------ | ------ |
| EIPId | string | 是       | abcd   | EIP ID |


  **返回参数：**

| 名称    | 类型   | 示例值  | 描述   |
| :------ | ------ | :------ | :----- |
| Code    | string | Success | 错误码 |
| Message | string | Success | 信息   |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
  "Code": "Success",
  "Data": null,
  "Message": "删除成功"
}
```


   **代码调用示例**

```python
def delete_eip(regin_code, key, page, vpc_id, az_code):
    action = 'DeleteEIP'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {'EIPId': '3b60ee94-e6f7-11ec-b681-bafaaf87d540'}
    res = requests.post(url, json=body)
```


### 14.BindEIP

  **Action:BindEIP**

  **描述：** 绑定EIP到子网IP

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称  | 类型   | 是否必选 | 示例值   | 描述                                |
| ----- | ------ | -------- | -------- | ----------------------------------- |
| EIPId | string | 是       | abcd     | EIP ID                              |
| NetId | string | 是       | aaaa     | 子网ID （边缘节点为虚拟出网网关ID） |
| IP    | string | 是       | 10.0.0.4 | 子网IP（边缘节点为虚拟出网网关IP）  |


  **返回参数：**

| 名称    | 类型   | 示例值       | 描述     |
| :------ | ------ | :----------- | :------- |
| Code    | string | Success      | 错误码   |
| Message | string | 任务下发成功 | 信息     |
| Data    | dict   | {}           | 返回数据 |
| TaskId  | string | aaaa         | 任务ID   |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
  "Code": "Success",
  "Data": {},
  "Message": "修改成功",
  "TaskId": "abcd"
}
```


   **代码调用示例**

```python
def bind_eip(regin_code, key, page, vpc_id, az_code):
    action = 'BindEIP'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        'EIPId': '2e4fb57a-a43d-11ec-a3b5-fefaa522c9da',
        'NetId': '22390f70-af37-11ec-8944-1200cba86117',
        'IP': '10.10.11.4'
    }
    res = requests.post(url, json=body)
```


### 15.UnbindEIP

  **Action:UnbindEIP**

  **描述：** EIP从子网IP解绑

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称  | 类型   | 是否必选 | 示例值   | 描述                                |
| ----- | ------ | -------- | -------- | ----------------------------------- |
| EIPId | string | 是       | abcd     | EIP ID                              |
| NetId | string | 是       | aaaa     | 子网ID （边缘节点为虚拟出网网关ID） |
| IP    | string | 是       | 10.0.0.4 | 子网IP（边缘节点为虚拟出网网关IP）  |


  **返回参数：**

| 名称    | 类型   | 示例值       | 描述     |
| :------ | ------ | :----------- | :------- |
| Code    | string | Success      | 错误码   |
| Message | string | 任务下发成功 | 信息     |
| Data    | dict   | {}           | 返回数据 |
| TaskId  | string | aaaa         | 任务ID   |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
  "Code": "Success",
  "Data": {},
  "Message": "修改成功",
  "TaskId": "abcd"
}
```


   **代码调用示例**

```python
def unbind_eip(regin_code, key, page, vpc_id, az_code):
    action = 'UnbindEIP'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        'EIPId': '2e4fb57a-a43d-11ec-a3b5-fefaa522c9da',
        'NetId': '22390f70-af37-11ec-8944-1200cba86117',
        'IP': '10.10.11.4'
    }
    res = requests.post(url, json=body)
```


### 16.DescribeBandwidth

  **Action:DescribeBandwidth**

  **描述：** 查询共享带宽

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称              | 类型   | 是否必选 | 示例值        | 描述                           |
| ----------------- | ------ | -------- | ------------- | ------------------------------ |
| RegionCode        | string | 否       | CN_Hongkong   | VPC区域code, 见附件五          |
| AvailableZoneCode | string | 否       | CN_Hongkong_A | 列表页码。起始值：1, 默认值：1 |
| Keyword           | string | 否       | eip地址       | 查询关键字                     |


  **返回参数：**

| 名称              | 类型   | 示例值                               | 描述                                               |
| :---------------- | ------ | :----------------------------------- | :------------------------------------------------- |
| Code              | string | Success                              | 错误码                                             |
| Message           | string | Success                              | 信息                                               |
| Data              | dict   | {}                                   | 返回数据                                           |
| Total             | int    | 4                                    | 共享带宽总数                                       |
| BandwidthList     | list   | []                                   | 共享带宽信息列表                                   |
| BandwidthInfo     | dict   | {}                                   | EIP带宽信息                                        |
| Id                | string | 2232dede-e646-11ec-97e2-7687d6f44ced | 带宽ID                                             |
| Name              | string | ""                                   | 共享带宽名称                                       |
| Qos               | int    | 10                                   | 带宽大小（Mbps）                                   |
| RegionCode        | string | “”                                   | VPC区域code, 见附件五                              |
| AvailableZoneCode | string | ""                                   | VPC可用区code, 见附件五(云平台节点EIP不包含此字段) |
| BandwidthType     | string | Bandwidth_China_Telecom              | 带宽类型                                           |
| BillScheme        | string | BandwIdth                            | 计费方案                                           |
| Status            | string | ok                                   | 带宽状态                                           |
| CreateTime        | string | 2022-06-02 18:05:47                  | 带宽创建时间                                       |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
  "Code": "Success",
  "Data":
  {
    "BandwidthList":
    [
      {
        "AvailableZoneCode": "CN_Hongkong_A",
        "BandwidthType": "Bandwidth_China_Unicom",
        "BillScheme": "BandwIdth_Shared",
        "CreateTime": "2022-03-21 14:56:06",
        "Id": "fad4efd4-a8e3-11ec-a855-be7901716fad",
        "Name": "zhz-test",
        "Qos": 30,
        "RegionCode": "CN_Hongkong",
        "Status": "ok"
      },
      {
        "AvailableZoneCode": "CN_Hongkong_A",
        "BandwidthType": "Bandwidth_China_Telecom",
        "BillScheme": "BandwIdth_Shared",
        "CreateTime": "2022-03-15 17:03:56",
        "Id": "d85b3aca-a43e-11ec-a3b5-fefaa522c9da",
        "Name": "lxl-test",
        "Qos": 40,
        "RegionCode": "CN_Hongkong",
        "Status": "ok"
      },
      {
        "AvailableZoneCode": "CN_Hongkong_A",
        "BandwidthType": "Bandwidth_China_Telecom",
        "BillScheme": "BandwIdth_Shared",
        "CreateTime": "2022-03-14 14:50:57",
        "Id": "1a3fb8a8-a363-11ec-a585-fe67ea065188",
        "Name": "test-zj",
        "Qos": 300,
        "RegionCode": "CN_Hongkong",
        "Status": "ok"
      },
      {
        "AvailableZoneCode": "CN_Hongkong_A",
        "BandwidthType": "Bandwidth_CMCC",
        "BillScheme": "BandwIdth_Shared",
        "CreateTime": "2022-03-08 16:24:57",
        "Id": "3d6b1326-9eb9-11ec-bc9c-3a75268f4570",
        "Name": "测试",
        "Qos": 35,
        "RegionCode": "CN_Hongkong",
        "Status": "ok"
      }
    ],
    "Total": 4
  },
  "Message": "success"
}
```

   **代码调用示例**

```python
def describe_bandwidth(regin_code, key, page, vpc_id, az_code):
    action = 'DescribeBandwidth'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "RegionCode": "CN_Hongkong",
        "AvailableZoneCode": "CN_Hongkong_A"
    }
    res = requests.post(url, json=body)
```



### 17.CreateBandwidth

  **Action:CreateBandwidth**

  **描述：** 创建一个共享带宽

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称              | 类型   | 是否必选 | 示例值                  | 描述                                      |
| ----------------- | ------ | -------- | ----------------------- | ----------------------------------------- |
| RegionCode        | string | 是       | CN_Hongkong             | VPC区域code, 见附件五                     |
| AvailableZoneCode | string | 是       | CN_Hongkong_A           | VPC可用区code, 见附件五                   |
| Name              | string | 是       | 香港共享带宽            | 共享带宽名称                              |
| BandwidthType     | string | 是       | Bandwidth_China_Telecom | 带宽类型                                  |
| BillScheme        | string | 是       | BandwIdth               | 计费方案<br/>BandwIdth_Shared（固定带宽） |
| Qos               | int    | 是       | 5                       | 带宽大小                                  |


  **返回参数：**

| 名称        | 类型   | 示例值                               | 描述       |
| :---------- | ------ | :----------------------------------- | :--------- |
| Code        | string | Success                              | 错误码     |
| Message     | string | 创建成功                             | 信息       |
| Data        | list   | [{"bandwidth_id":"abcd"}]            | 返回数据   |
| BandwidthId | string | ce11eb1e-e6fa-11ec-8b50-bafaaf87d540 | 共享带宽ID |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
  "Code": "Success",
  "Data":
  [
    {
      "BandwidthId": "ce11eb1e-e6fa-11ec-8b50-bafaaf87d540"
    }
  ],
  "Message": "创建成功"
}
```


   **代码调用示例**

```python
def create_bandwidth(regin_code, key, page, vpc_id, az_code):
    action = 'CreateBandwidth'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "RegionCode": "CN_Hongkong",
        "Name": "香港共享带宽"
        "AvailableZoneCode": "CN_Hongkong_A",
        "BandwidthType": "Bandwidth_China_Telecom",
        "BillScheme": "BandwIdth_Shared",
        "Qos": 10
    }
    res = requests.post(url, json=body)
```



### 18.UpdateBandwidth

  **Action:UpdateBandwidth**

  **描述：** 变更共享带宽

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称        | 类型   | 是否必选 | 示例值 | 描述                 |
| ----------- | ------ | -------- | ------ | -------------------- |
| BandwidthId | string | 是       | abcd   | 共享带宽ID           |
| Qos         | int    | 是       | 5      | 共享带宽大小（Mbps） |


  **返回参数：**

| 名称    | 类型   | 示例值       | 描述     |
| :------ | ------ | :----------- | :------- |
| Code    | string | Success      | 错误码   |
| Message | string | 任务下发成功 | 信息     |
| Data    | dict   | {}           | 返回数据 |
| TaskId  | string | aaaa         | 任务ID   |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
  "Code": "Success",
  "Data": {},
  "Message": "修改成功",
  "TaskId": "abcd"
}
```


   **代码调用示例**

```python
def update_bandwidth(regin_code, key, page, vpc_id, az_code):
    action = 'UpdateBandwidth'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "BandwidthId": "ce11eb1e-e6fa-11ec-8b50-bafaaf87d540",
        "Qos": 100
    }
    res = requests.post(url, json=body)
```



### 19.DeleteBandwidth

  **Action:DeleteBandwidth**

  **描述：** 删除一个共享带宽

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称        | 类型   | 是否必选 | 示例值 | 描述       |
| ----------- | ------ | -------- | ------ | ---------- |
| BandwidthId | string | 是       | abcd   | 共享带宽ID |


  **返回参数：**

| 名称    | 类型   | 示例值   | 描述     |
| :------ | ------ | :------- | :------- |
| Code    | string | Success  | 错误码   |
| Message | string | 删除成功 | 信息     |
| Data    | dict   | {}       | 返回数据 |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
  "Code": "Success",
  "Data": null,
  "Message": "删除成功"
}
```


   **代码调用示例**

```python
def delete_bandwidth(regin_code, key, page, vpc_id, az_code):
    action = 'DeleteBandwidth'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "BandwidthId": "ce11eb1e-e6fa-11ec-8b50-bafaaf87d540"
    }
    res = requests.post(url, json=body)
```


### 20.BandwidthAddEIP

  **Action:BandwidthAddEIP**

  **描述：** 共享带宽添加EIP

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称        | 类型   | 是否必选 | 示例值     | 描述       |
| ----------- | ------ | -------- | ---------- | ---------- |
| BandwidthId | string | 是       | abcd       | 共享带宽ID |
| EIPIdList   | array  | 是       | ["a", "b"] | EIP ID列表 |


  **返回参数：**

| 名称    | 类型   | 示例值                               | 描述     |
| :------ | ------ | :----------------------------------- | :------- |
| Code    | string | Success                              | 错误码   |
| Message | string | 删除成功                             | 信息     |
| Data    | dict   | {}                                   | 返回数据 |
| TaskId  | string | 0915ce44-e6fe-11ec-9721-bafaaf87d540 | 任务id   |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
  "Code": "Success",
  "Data":
  {},
  "Message": "任务下发成功",
  "TaskId": "0915ce44-e6fe-11ec-9721-bafaaf87d540"
}
```


   **代码调用示例**

```python
def bandwidth_add_eip(regin_code, key, page, vpc_id, az_code):
    action = 'BandwidthAddEIP'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "BandwidthId": "8034b4da-e6fa-11ec-bede-bafaaf87d540",
        "EIPIdList": ["c0d358c8-a377-11ec-af73-8ad8ba9228af"]
    }
    res = requests.post(url, json=body)
```

### 21.BandwidthRemoveEIP

  **Action:BandwidthRemoveEIP**

  **描述：** 共享带宽移除EIP

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称          | 类型   | 是否必选 | 示例值                  | 描述                                                         |
| ------------- | ------ | -------- | ----------------------- | ------------------------------------------------------------ |
| EIPIdList     | array  | 是       | ["abcd"]                | EIP列表                                                      |
| Delete        | bool   | 是       | False                   | 是否直接删除EIP，（否则需要为EIP新购独享底宽， 以下参数必传） |
| RegionCode    | string | 是       | CN_Hongkong             | VPC区域code, 见附件五                                        |
| BandwidthType | string | 是       | Bandwidth_China_Telecom | 带宽类型                                                     |
| BillScheme    | string | 是       | BandwIdth               | 计费方案                                                     |
| Qos           | int    | 是       | 5                       | 带宽大小                                                     |


  **返回参数：**

| 名称    | 类型   | 示例值   | 描述     |
| :------ | ------ | :------- | :------- |
| Code    | string | Success  | 错误码   |
| Message | string | 删除成功 | 信息     |
| Data    | dict   | {}       | 返回数据 |
| TaskId  | string | abcd     | 任务ID   |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
  "Code": "Success",
  "Data":
  {},
  "Message": "任务下发成功",
  "TaskId": "7ed9733c-e704-11ec-a421-b2796a2c8db8"
}
```


   **代码调用示例**

```python
def bandwidth_remove_eip(regin_code, key, page, vpc_id, az_code):
    action = 'BandwidthRemoveEIP'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "EIPIdList": ["c0d358c8-a377-11ec-af73-8ad8ba9228af"],
        "Delete": False,
        "RegionCode": "CN_Hongkong",
        "BandwidthType": "Bandwidth_China_Telecom",
        "BillScheme": "BandwIdth",
        "Qos": 5
    }
    res = requests.post(url, json=body)
```

### 22.DescribeIPInfo

  **Action:DescribeIPInfo**

  **描述：** 查询子网/虚拟出网网关/公网 IP 信息

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**


| 名称   | 类型   | 是否必选 | 示例值                               | 描述                          |
| ------ | ------ | -------- | ------------------------------------ | ----------------------------- |
| NetId  | string | 是       | 0e6b73d2-e571-11ec-991d-0ad447efda1e | 子网/虚拟出网网关/公网 ID     |
| IPType | string | 是       | subnet                               | subnet/virtual_gateway/pubnet |

  **返回参数：**

| 名称        | 类型   | 示例值                | 描述                 |
| :---------- | ------ | :-------------------- | :------------------- |
| Code        | string | Success               | 错误码               |
| Message     | string | Success               | 信息                 |
| SegmentNum  | int    | 1                     | 网段数量             |
| SegmentList | list   | []                    | 网段列表             |
| NetSignal   | string | 10.15.1.*             | IP匹配               |
| IPList      | list   | []                    | 网段列表             |
| IPAddress   | string | 10.15.1.2             | 地址                 |
| IPMask      | int    | 24                    | 掩码                 |
| IPStatus    | int    | 1                     | IP状态 1使用/0未使用 |
| IPUsage     | string | 已标记,用处: 路由使用 | IP用途               |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
   "Code": "Success",
   "Data": {
      "SegmentList": [{
         "IPList": [{
               "IPAddress": "10.15.1.1",
               "IPMask": 24,
               "IPStatus": 1,
               "IPUsage": "已标记,用处: 路由使用"
            },
            {
               "IPAddress": "10.15.1.2",
               "IPMask": 24,
               "IPStatus": 1,
               "IPUsage": "已标记,用处: 路由使用"
            },
            {
               "IPAddress": "10.15.1.3",
               "IPMask": 24,
               "IPStatus": 1,
               "IPUsage": "已标记,用处: 路由使用"
            },
            {
               "IPAddress": "10.15.1.4",
               "IPMask": 24,
               "IPStatus": 0
            },
            {
               "IPAddress": "10.15.1.5",
               "IPMask": 24,
               "IPStatus": 0
            },
            {
               "IPAddress": "10.15.1.254",
               "IPMask": 24,
               "IPStatus": 1,
               "IPUsage": "已标记,用处: 系统占用"
            }
         ],
         "NetSignal": "10.15.1.*"
      }],
      "SegmentNum": 1
   },
   "Message": "success"
}
```

  **代码调用示例**

```python
def ip_list(net_id, net_type):
    action = 'DescribeIPInfo'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "NetId": net_id,
        "IPType": net_type
    }
    res = requests.post(url, json=body)
```


### 23.NetEIPInfo

  **Action:NetEIPInfo**

  **描述：** 查询子网/虚拟出网网关 下的EIP

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**


| 名称      | 类型 | 是否必选 | 示例值                                   | 描述                       |
| --------- | ---- | -------- | ---------------------------------------- | -------------------------- |
| NetIdList | list | 是       | ["c3e41e00-a1a9-11ec-9d42-569f891b3cb6"] | 子网/虚拟出网网关 ID  列表 |

  **返回参数：**

| 名称          | 类型   | 示例值                               | 描述                     |
| :------------ | ------ | :----------------------------------- | :----------------------- |
| Code          | string | Success                              | 错误码                   |
| Message       | string | Success                              | 信息                     |
| Data          | list   | []                                   | 返回数据                 |
| NetId         | string | 2e4fb57a-a43d-11ec-a3b5-fefaa522c9da | IP匹配                   |
| NetName       | string | test                                 | 子网/虚拟出网网关 名称   |
| NetType       | string | subnet/vir                           | 类型  子网/虚拟出网网关  |
| IPNum         | string | 10.8.5.0                             | 子网/虚拟出网网关 网络号 |
| IPMask        | int    | 24                                   | 子网/虚拟出网网关 掩码   |
| EIP_INFO_LIST | list   | []                                   | EIP列表                  |
| EIP           | string | 118.186.70.143                       | EIP IP                   |
| EIPId         | string | 2e4fb57a-a43d-11ec-a3b5-fefaa522c9da | EIP ID                   |
| Qos           | int    | 20                                   | EIP 带宽                 |
| Status        | string | ok                                   | EIP 状态                 |
| BandwidthType | string | ok                                   | EIP 带宽类型             |
| BillScheme    | string | ok                                   | EIP 带宽计费方案         |
| ReginCode     | string | ok                                   | EIP Region Code          |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
   "Code": "Success",
   "Data": [{
      "EIP_INFO_LIST": [{
         "BandwidthType": "电信",
         "BillScheme": "固定带宽",
         "EIP": "118.186.70.143",
         "EIPId": "2e4fb57a-a43d-11ec-a3b5-fefaa522c9da",
         "Qos": 20,
         "ReginCode": "CN_Hongkong",
         "Status": "error"
      }],
      "IPMask": 24,
      "IPNum": "10.8.5.0",
      "NetId": "c3e41e00-a1a9-11ec-9d42-569f891b3cb6",
      "NetName": "20220312-泽宁子网测试",
      "NetType": "subnet"
   }],
   "Message": "success"
}
```

  **代码调用示例**

```python
def net_eip_info():
    action = 'NetEIPInfo'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "NetIdList": ["c3e41e00-a1a9-11ec-9d42-569f891b3cb6"]
    }
    res = requests.post(url, json=body)
```

### 24.ReserveIPAndBindEIP

  **Action:ReserveIPAndBindEIP**

  **描述：** 保留IP并绑定EIP

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**


| 名称              | 类型   | 是否必选 | 示例值                               | 描述                    |
| ----------------- | ------ | -------- | ------------------------------------ | ----------------------- |
| AvailableZoneCode | string | 是       | CN_Hongkong_A                        | VPC可用区code, 见附件五 |
| Ips               | list   | 是       |                                      | ip信息                  |
| NetId             | string | 是       | 3e229ff2-ee26-11ec-8a3f-f64faa0dae79 | 虚拟出网网关ID          |
| AddressList       | array  | 是       | ["172.18.2.0"]                       | 虚拟出网网关IP地址列表  |
| EIPList           | array  | 是       | ["114.112.38.17"]                    | EIP地址列表             |
| Description       | string | 是       | 手动保留并绑定                       | 描述                    |

  **返回参数：**

| 名称    | 类型   | 示例值  | 描述   |
| :------ | ------ | :------ | :----- |
| Code    | string | Success | 错误码 |
| Message | string | Success | 信息   |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
   "Code": "Success",
   "Message": "任务下发成功"
}
```

  **代码调用示例**

```python
def eip_batch_bind_and_reserve_ip():
    action = 'ReserveIPAndBindEIP'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "AvailableZoneCode": "CN_DaBieShan_A",
        "Ips": [
            {
                "NetId": "3e229ff2-ee26-11ec-8a3f-f64faa0dae79",
                "AddressList": ["172.18.2.0"],
                "EIPList": ["114.112.38.17"],
                "Description": "手动保留并绑定"
            }
        ]
    }
    res = requests.post(url, json=body)
```

### 25.DescribeSubnetIp

  **Action:DescribeSubnetIp**

  **描述：** 查询子网IP使用信息

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**


| 名称  | 类型   | 是否必选 | 示例值                                 | 描述   |
| ----- | ------ | -------- | -------------------------------------- | ------ |
| NetId | string | 是       | "489a0440-f842-11ec-9e17-8a1baacec6bd" | 子网ID |

  **返回参数：**

| 名称       | 类型    | 示例值                                   | 描述         |
| :--------- | ------- | :--------------------------------------- | :----------- |
| Code       | string  | Success                                  | 错误码       |
| Message    | string  | Success                                  | 信息         |
| Data       | dict    | {}                                       | 返回数据     |
| UnusedList | list    | ["10.0.0.5"]                             | 未使用ip列表 |
| UnusedNum  | int     | 1                                        | 未使用ip个数 |
| UsedList   | list    | [{"IP": "10.6.0.1","Usage": "路由使用"}] | 已使用ip列表 |
| IP         | strintg | "10.6.0.1"                               | ip地址       |
| Usage      | string  | "路由使用"                               | ip使用说明   |
| UsedNum    | int     | 1                                        | 已使用ip个数 |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "UnusedList": [
            "10.0.0.5"
        ],
        "UnusedNum": 1,
        "UsedList": [
            {
                "IP": "10.6.0.1",
                "Usage": "路由使用"
            }
        ],
        "UsedNum": 1
    },
    "Message": "success"
}
```

  **代码调用示例**

```python
def ip_usage():
    action = 'DescribeSubnetIp'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "NetId": "22390f70-af37-11ec-8944-1200cba86117"
    }
    res = requests.post(url, json=body)
```

### 26.CreateVLINK

  **Action:CreateVLINK**

  **描述：** 子网开启VLINK （仅云平台节点支持）

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**


| 名称     | 类型   | 是否必选 | 示例值                                 | 描述   |
| -------- | ------ | -------- | -------------------------------------- | ------ |
| SubnetId | string | 是       | "489a0440-f842-11ec-9e17-8a1baacec6bd" | 子网ID |
| PipeId   | string | 是       | "563a0440-f842-11ec-9e17-8a1baacec6bd" | 私网ID |

  **返回参数：**

| 名称    | 类型   | 示例值                                 | 描述     |
| :------ | ------ | :------------------------------------- | :------- |
| Code    | string | Success                                | 错误码   |
| Message | string | Success                                | 信息     |
| Data    | dict   | {}                                     | 返回数据 |
| VLINKId | string | "6ee7bd2e-1857-11ed-90cd-5a683b26c272" | VLINKId  |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "VLINKId": "6ee7bd2e-1857-11ed-90cd-5a683b26c272"
    },
    "Message": "开启Vlink成功"
}
```

  **代码调用示例**

```python
def vlink_create():
    action = 'CreateVLINK'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "SubnetId": "ea78d6a8-17a8-11ed-a00d-66cd58aefd0f",
        "PipeId": "56397648-1468-11ed-be4c-2acc8142a3ee",
    }
    res = requests.post(url, json=body)
```

### 27.DeleteVLINK

  **Action:DeleteVLINK**

  **描述：** 子网关闭VLINK （仅云平台节点支持）

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**


| 名称    | 类型   | 是否必选 | 示例值                                 | 描述    |
| ------- | ------ | -------- | -------------------------------------- | ------- |
| VLINKId | string | 是       | "6ee7bd2e-1857-11ed-90cd-5a683b26c272" | VLINKId |

  **返回参数：**

| 名称    | 类型   | 示例值                                 | 描述     |
| :------ | ------ | :------------------------------------- | :------- |
| Code    | string | Success                                | 错误码   |
| Message | string | Success                                | 信息     |
| Data    | dict   | {}                                     | 返回数据 |
| VLINKId | string | "6ee7bd2e-1857-11ed-90cd-5a683b26c272" | VLINKId  |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "VLINKId": "6ee7bd2e-1857-11ed-90cd-5a683b26c272"
    },
    "Message": "关闭Vlink成功"
}
```

  **代码调用示例**

```python
def vlink_delete():
    action = 'DeleteVLINK'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "VLINKId": "6ee7bd2e-1857-11ed-90cd-5a683b26c272"
    }
    res = requests.post(url, json=body)
```

### 28.VLINKAddVM

  **Action:VLINKAddVM**

  **描述：** 子网下主机加入VLINK （仅云平台节点支持）

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**


| 名称     | 类型   | 是否必选 | 示例值                                   | 描述         |
| -------- | ------ | -------- | ---------------------------------------- | ------------ |
| VLINKId  | string | 是       | "6ee7bd2e-1857-11ed-90cd-5a683b26c272"   | VLINKId      |
| VMIdList | list   | 是       | ["4d20118d-c58e-455b-b361-d1a95b4632d6"] | 云主机ID列表 |
| Password | string | 否       | "****"                                   | 云主机密码   |

  **返回参数：**

| 名称    | 类型   | 示例值     | 描述   |
| :------ | ------ | :--------- | :----- |
| Code    | string | Success    | 错误码 |
| Message | string | Success    | 信息   |
| TaskId  | string | "20635952" | 任务ID |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "Msg": "批量添加云主机网卡任务已下发，请等待任务执行"
    },
    "Message": "云主机加入Vlink任务已下发成功!",
    "TaskId": "20635952"
}
```

  **代码调用示例**

```python
def vlink_add_vm():
    action = 'VLINKAddVM'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "VLINKId": "86fc6e6c-1859-11ed-90cd-5a683b26c272",
        "VMIdList": ["4d20118d-c58e-455b-b361-d1a95b4632d6"],
        "Password": "***@@@"
    }
    res = requests.post(url, json=body)
```

### 29.VLINKDeleteVM

  **Action:VLINKDeleteVM**

  **描述：** 子网下主机退出VLINK （仅云平台节点支持）

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**


| 名称     | 类型   | 是否必选 | 示例值                                   | 描述         |
| -------- | ------ | -------- | ---------------------------------------- | ------------ |
| VLINKId  | string | 是       | "6ee7bd2e-1857-11ed-90cd-5a683b26c272"   | VLINKId      |
| VMIdList | list   | 是       | ["4d20118d-c58e-455b-b361-d1a95b4632d6"] | 云主机ID列表 |

  **返回参数：**

| 名称    | 类型   | 示例值     | 描述   |
| :------ | ------ | :--------- | :----- |
| Code    | string | Success    | 错误码 |
| Message | string | Success    | 信息   |
| TaskId  | string | "20635953" | 任务ID |


  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "Msg": "批量删除云主机网卡任务已下发，请等待任务执行"
    },
    "Message": "云主机退出Vlink任务已下发成功!",
    "TaskId": "20635970"
}
```

  **代码调用示例**

```python
def vlink_delete():
    action = 'VLINKDeleteVM'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "VLINKId": "86fc6e6c-1859-11ed-90cd-5a683b26c272",
        "VMIdList": ["4d20118d-c58e-455b-b361-d1a95b4632d6"]
    }
    res = requests.post(url, json=body)
```

## 裸金属相关

### 1.DescribeBmsGoods

**Action: DescribeBmsGoods**

**描述:** 查询裸金属商品列表

**请求地址:** cdsapi.capitalonline.net/bms

**请求方法:** GET

**请求参数：**

| 名称     | 类型   | 是否必须 | 示例         | 描述       |
| -------- | ------ | -------- | ------------ | ---------- |
| RegionId | string | 是       | CN_Beijing_F | 可用区编号 |

**返回数据：**

| 名称           | 类型   | 示例                                 | 描述                              |
| -------------- | ------ | ------------------------------------ | --------------------------------- |
| Code           | string | Success                              | 返回状态码: Success: 成功         |
| Message        | string | null                                 | 返回信息                          |
| Data           | object | {}                                   | 返回数据                          |
| PrePaid        | list   | []                                   | 预付费，包年包月商品列表 PostPaid |
| PostPaid       | list   | null                                 | 按量付费商品列表                  |
| GoodsId        | int    | 6034                                 | 商品ID                            |
| GoodsName      | string | 裸金属测试产品v1                     | 商品名称                          |
| Computes       | list   | []                                   | 商品里产品配置信息                |
| Id（Computes） | string | f59c9873-b57d-43e8-94c3-3ed0ba3550b0 | 产品配置Id                        |
| CpuInfo        | string | Intel Xeon Silver 4110*2             | CPU信息                           |
| Cpu            | int    | 32                                   | CPU个数                           |
| Ram            | int    | 64                                   | 内存大小                          |
| Frequency      | string | 2.1GHz                               | 主频                              |
| Disks          | list   | []                                   | 本地盘信息                        |
| Id（Disks）    | string | 8e857eb1-c8c1-4c73-9bc3-ea200121ed1a | 本地盘Id                          |
| Type           | string | SSD                                  | 磁盘类型                          |
| Capacity       | int    | 480                                  | 容量                              |
| Count          | int    | 1                                    | 个数                              |


**错误码：**

| httpcode | 错误码           | 错误信息                                  | 描述                   |
| -------- | ---------------- | ----------------------------------------- | ---------------------- |
| 400      | ParameterInvalid | The parameter "RegionId" is required.     | 参数RegionId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "RegionId" cannot be empty. | 参数RegionId不能为空。 |

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
                "GoodsName": "裸金属-02SS01（公测）"
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
                "GoodsName": "裸金属-03SA03（公测）"
            }
        ]
    }
}
```

 **代码调用示例**

 ```python
def describe_bms_goods(RegionId):
    action = "DescribeBmsGoods"
    method = "GET"
    param = {
        "RegionId": RegionId
    }
    url = get_signature(action, AK, AccessKeySecret, method, BMS_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
 ```



### 2.DescribeBmsGoodsPrice

**Action: DescribeBmsGoodsPrice**

**描述:** 计算裸金属商品价格

**请求地址:** cdsapi.capitalonline.net/bms

**请求方法:** POST

**请求参数：**

| 名称               | 类型   | 是否必须 | 示例                                 | 描述                                                         |
| ------------------ | ------ | -------- | ------------------------------------ | ------------------------------------------------------------ |
| RegionId           | string | 是       | CN_Beijing_F                         | 可用区编号                                                   |
| GoodsId            | int    | 是       | 7955                                 | 商品ID                                                       |
| ComputeId          | string | 是       | f7d3b7b4-e77d-47ac-aa37-8c9e3304e469 | 规格配置ID                                                   |
| InstanceChargeType | string | 是       | PrePaid                              | 付费方式，取值范围： PrePaid：预付费，包年包月。 PostPaid：按量付费。 目前只支持包年包月 |
| PrepaidMonth       | int    | 是       | 1                                    | 包年包月购买月数，输入0为购买到月底，输入1为到月底后在购买一个自然月，默认为0。 |
| Amount             | int    | 是       | 10                                   | 指定创建裸金属服务器的数量，默认取值：1                      |


**返回数据：**

| 名称        | 类型   | 示例    | 描述                       |
| ----------- | ------ | ------- | -------------------------- |
| Code        | string | Success | 返回状态码: Success: 成功  |
| Message     | string | Success | 返回信息                   |
| Data        | object | {}      | 返回数据                   |
| TradeAmount | string | 6660.00 | 交易价格                   |
| UnitPrice   | string | 666.00  | 单价                       |
| Currency    | string | CN      | 结算方式,CN:人命币 US:美元 |



**错误码：**

| httpcode | 错误码           | 错误信息                                      | 描述                   |
| -------- | ---------------- | --------------------------------------------- | ---------------------- |
| 400      | ParameterInvalid | The parameter "RegionId" is required.         | 参数RegionId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "RegionId" cannot be empty.     | 参数RegionId不能为空。 |
| 400      | DataNotExists    | Please check that the parameters are correct. | 请检查参数是否正确。   |


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
def describe_bms_price():
    action = "DescribeBmsGoodsPrice"
    method = "POST"
    param = {
        "RegionId": "CN_Beijing_F",
        "InstanceChargeType": "PrePaid",
        "ComputeId": "8fbdb61e-b941-46db-89f6-f8953b278ec9",
        "PrepaidMonth":1,
        "GoodsId": 7685,
        "Amount": 1
    }
    url = get_signature(action, AK, AccessKeySecret, method, BMS_URL)
    res = requests.post(url, json= param)
    result = json.loads(res.content)
 ```

### 3.DescribeBmsImage

**Action: DescribeBmsImage**

**描述:** 查询裸金属镜像列表

**请求地址:** cdsapi.capitalonline.net/bms

**请求方法:** POST

**请求参数：**

| 名称      | 类型   | 是否必须 | 示例    | 描述                                       |
| --------- | ------ | -------- | ------- | ------------------------------------------ |
| ImageType | string | 否       | private | 镜像类型: public:公有镜像,private:私有镜像 |
| OsType    | string | 否       | centos  | 操作系统类型: centos,ubuntu等              |


**返回数据：**

| 名称    | 类型   | 示例           | 描述                                       |
| ------- | ------ | -------------- | ------------------------------------------ |
| Code    | string | Success        | 返回状态码: Success: 成功                  |
| Message | string | null           | 返回信息                                   |
| Data    | object | {}             | 返回数据                                   |
| Id      | string | 8              | 镜像ID                                     |
| Name    | string | ubuntu14.04_64 | 镜像名称                                   |
| Type    | string | public         | 镜像类型: public:公有镜像,private:私有镜像 |



**错误码：**

| httpcode | 错误码           | 错误信息                                   | 描述                    |
| -------- | ---------------- | ------------------------------------------ | ----------------------- |
| 400      | ParameterIsEmpty | The parameter "ImageType" cannot be empty. | 参数ImageType不能为空。 |


 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
    "Ubuntu": [
      {
        "Id": "8",
        "Name": "ubuntu14.04_64",
        "Type": "public"
      }
    ],
    "Redhat": [
      {
        "Id": "7",
        "Name": "rhel7.6_64",
        "Type": "public"
      }
    ],
    "Windows": [
      {
        "Id": "13",
        "Name": "windows2012r2_64",
        "Type": "public"
      },
      {
        "Id": "11",
        "Name": "windows2016_64",
        "Type": "public"
      }
    ],
    "Centos": [
      {
        "Id": "2",
        "Name": "centos6.9_64",
        "Type": "public"
      }
    ]
  }
}
```

 **代码调用示例**

 ```python
def describe_bms_images():
    action = "DescribeBmsImage"
    method = "POST"
    param = {
          "ImageType": "public"
    }
    url = get_signature(action, AK, AccessKeySecret, method, BMS_URL)
    res = requests.post(url, json=param)
    result = json.loads(res.content)
 ```

### 4.CreateBmsInstance

**Action: CreateBmsInstance**

**描述:** 创建裸金属服务器

**请求地址:** cdsapi.capitalonline.net/bms

**请求方法:** POST

**请求参数：**

| 名称                | 类型    | 是否必须 | 示例                                        | 描述                                                         |
| ------------------- | ------- | -------- | ------------------------------------------- | ------------------------------------------------------------ |
| RegionId            | string  | 是       | CN_Beijing_F                                | 可用区编号                                                   |
| VdcId               | string  | 是       | f4a1ec63-a2c3-4979-a4bf-86f546054e6f        | 虚拟数据中心ID                                               |
| Password            | string  | 是       | MengYou&&Cds-2019                           | 密码                                                         |
| InstanceName        | string  | 是       | shouduzaixbms                               | 主机名称                                                     |
| AssignHostNo        | string  | 否       | 001                                         | 主机编号，编号至少三位，不足三位自动补全                     |
| InstanceChargeType  | string  | 是       | PostPaid                                    | 付费方式，取值范围： PrePaid：预付费，包年包月, PostPaid：按需计费 |
| AutoRenew           | int     | 是       | 1                                           | 包年包月是否自动续费，1为自动续费（默认），0为不自动续费     |
| PrepaidMonth        | int     | 是       | 1                                           | 包年包月购买月数，输入0为购买到月底，输入1为到月底后在购买一个自然月，默认为0。 |
| ComputeId           | string  | 是       | f7d3b7b4-e77d-47ac-aa37-8c9e3304e469        | 规格配置ID                                                   |
| GoodsId             | int     | 是       | 7955                                        | 商品ID                                                       |
| ImageId             | string  | 是       | d6012cd8-b672-11e9-9265-525400b97470        | 镜像ID                                                       |
| EnableMonitor       | boolean | 否       | True                                        | 是否开启监控, True为开启，False为关闭，默认为关闭。          |
| PipeIds             | list    | 是       | `["9fd88912-b668-11e9-a140-0242ac110002",]` | 网段主键ID列表                                               |
| Amount              | int     | 是       | 10                                          | 指定创建裸金属服务器的数量，取值范围：1-100                  |
| Raid                | string  | 否       | 1                                           | 数据盘自定义Raid,支持 0, 1, 5, 10                            |
| CustomPartition     | list    | 否       | ["/","swap", "/aaa"]                        | 系统盘自定义分区，第一个必须是"/" 分区，swap分区可选，/aaa分区为自定义 |
| CustomPartitionSize | list    | 否       | [100,  128,  300 ]                          | 系统盘自定义分区大小，单位GB，与自定义分区列表中对应分区的大小 |
| SubjectId           | string  | 否       | 68327                                       | 测试金ID                                                     |
| IsBond              | int     | 否       | 1                                           | 网卡是否做bond， 0：不做（默认），1：做                      |
| PortMode            | string  | 否       | trunk                                       | 交换机端口模式， 注：access模式的一个端口只能对应一个网络，IP绑定在物理网卡上；trunk模式的一个端口可以对应多个网络，IP绑定在虚拟网卡上 |

**返回数据：**

| 名称    | 类型   | 示例                                   | 描述                      |
| ------- | ------ | -------------------------------------- | ------------------------- |
| Code    | string | Success                                | 返回状态码: Success: 成功 |
| Message | string | 订单创建成功，任务已下发，请等待...... | 返回信息                  |
| Data    | object | {}                                     | 返回数据                  |
| taskId  | string | "f232d398-a77c-11e9-9d43-0242ac110003" | 返回主任务Id              |



**错误码：**

| httpcode | 错误码              | 错误信息                                                     | 描述                                     |
| -------- | ------------------- | ------------------------------------------------------------ | ---------------------------------------- |
| 400      | ParameterInvalid    | The parameter "RegionId" is required.                        | 参数RegionId是必选项。                   |
| 400      | ParameterIsEmpty    | The parameter "RegionId" cannot be empty.                    | 参数RegionId不能为空。                   |
| 400      | ImageNotFound       | Image cannot be found by id[d6012cd8-b672-11e9-9265-525400b97470] | 该镜像在该可用区不存在。                 |
| 400      | OrderGoodsConfEmpty | Order goods config is empty                                  | 商品配置Id不存在或者为空。               |
| 400      | NotSufficient       | Current configuration inventory is insufficient, please choose other configuration of goods! | 当前配置库存不足，请选择其他配置的商品！ |
| 400      | TaskToCoreFaild     | Push task to core failed                                     | 创建任务失败！                           |
| 400      | DataNotExists       | Please check that the parameters are correct.                | 请检查参数是否正确。                     |
| 400      | AmountOversize      | The parameter Amount is too large for 1-100.                 | 参数Amount的值超出100。                  |
| 400      | VdcNotFound         | The parameter VdcId is not valid.                            | 参数VdcId是无效的。                      |
| 400      | IpNotEnough         | Please check that the number of Ip is enough.                | 请检查Ip数量是否充足。                   |
| 400      | PipeIdNotFound      | The parameter PipeIds is not valid.                          | 参数PipeIds是无效的。                    |


 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
      "TaskIds": ["f232d398-a77c-11e9-9d43-0242ac110003",
                  "72dc0cae-a867-11e9-8184-0242ac110003"]
  }
}
```

 **代码调用示例**

 ```python
def create_bms_instance():
    action = "CreateBmsInstance"
    method = "POST"
    param = {
        "RegionId": "CN_Beijing_F",
        "VdcId": "062f81d7-cee2-4aca-880f-ad8766c78dab",
        "InstanceName": "shouduzaixbms",
        "Password": "Tester123",
        "AssignHostNo": "001",
        "InstanceChargeType": "PrePaid",
        "AutoRenew": 1,
        "PrepaidMonth": 1,
        "ComputeId": "eb41773f-c944-4831-810b-9db4826996f2",
        "GoodsId": 7685,
        "ImageId": "0dff0137-ed2b-4ebb-bccf-6ec9d982fbfb",
        "EnableMonitor": 1,
        "PipeIds": [
                    "79281b44-73db-11ea-ac8e-0242ac110002",
                    "6c00cd1c-73db-11ea-8379-0242ac110002"
                   ],
        "Amount": 1
    }
    url = get_signature(action, AK, AccessKeySecret, method, BMS_URL)
    res = requests.post(url, json=param)
    result = json.loads(res.content)
 ```


### 5.DescribeBms

**Action: DescribeBms**

**描述**:  查询裸金属列表

**请求地址**:  cdsapi.capitalonline.net/bms

**请求方法**: GET

**请求参数**: 

| 名称       | 类型   | 是否必选 | 示例值                               | 描述                              |
| ---------- | ------ | -------- | ------------------------------------ | --------------------------------- |
| VdcId      | string | 否       | 2bbacc90-5e8f-4394-92e1-3f237de1ae8d | 虚拟数据中心ID                    |
| Name       | string | 否       | bms003                               | 裸金属名称                        |
| PageNumber | string | 否       | 1                                    | Bms列表页码。起始值：1, 默认值：1 |
| PageSize   | string | 否       | 10                                   | 每页返回数量，默认值：500         |

**返回参数**:

| 名称               | 类型   | 示例值                               | 描述                                                         |
| ------------------ | ------ | ------------------------------------ | ------------------------------------------------------------ |
| Code               | string | Success                              | 错误码                                                       |
| Message            | string | null                                 | 返回信息说明                                                 |
| Data               | object | {}                                   | 裸金属服务器列表记录，包含裸金属服务器信息，网卡信息，分页信息 |
| Baremetals         | list   | []                                   | 裸金属服务器列表                                             |
| BaremetalId        | string | a0492924-1dc1-462e-9cbb-622dc1ec49a3 | 裸金属ID                                                     |
| Name               | string | bms-test                             | 裸金属名称                                                   |
| Cpu                | int    | 32                                   | Cpu个数                                                      |
| Ram                | int    | 64                                   | 内存大小                                                     |
| State              | string | running                              | 运行中                                                       |
| EnableMonitor      | bool   | True                                 | 是否开启监控, True: 开启, False: 关闭                        |
| Status             | string | 运行中                               | 运行状态                                                     |
| VdcId              | string | 2bbacc90-5e8f-4394-92e1-3f237de1ae8d | 虚拟数据中心ID                                               |
| RegionId           | string | CN_Beijing_F                         | 可用区编号                                                   |
| VdcName            | string | bms003                               | 虚拟数据中心名称                                             |
| RegionName         | string | 中国大陆-北京-可用区F                | 区域名称                                                     |
| InstanceChargeType | string | PostPaid                             | 计费方式<br />PrePaid：预付费 <br />PostPaid：按量付费<br />目前只支持包年包月 |
| IsAutoRenewal      | int    | 0                                    | 0: 没有开启自动续约，1: 开启自动续约                         |
| CreateDate         | string | 2019-08-08 11:45:51                  | 裸金属创建时间                                               |
| Networks           | object | {}                                   | 网络                                                         |
| NetworkCards       | list   | []                                   | 网卡                                                         |
| Id(NetworkCards)   | string | b0143a8a-2fb1-4c66-b0e4-34b12ff9e33c | 网卡Id                                                       |
| VlanId             | string | 1020                                 | Vlan编号                                                     |
| IpType             | string | private                              | Ip类型：public/private                                       |
| IpVersion          | string | ipV4                                 | Ip版本                                                       |
| IpAddress          | string | 10.241.36.1                          | Ip地址                                                       |
| Netmask            | string | 255.255.0.0                          | 掩码地址                                                     |
| Gateway            | string | 10.241.36.1                          | 网关地址                                                     |
| ConnectState       | string | on                                   | 是否连接  on\off                                             |
| TotalCount         | int    | 3                                    | 裸金属服务器总数                                             |
| PageSize           | int    | 10                                   | 每页大小                                                     |
| Pages              | int    | 1                                    | 页数                                                         |
| PageNumber         | int    | 1                                    | 当前页                                                       |


**错误码**

| httpcode | 错误码           | 错误信息                               | 描述                |
| -------- | ---------------- | -------------------------------------- | ------------------- |
| 400      | ParameterIsEmpty | The parameter "VdcId" cannot be empty. | 参数VdcId不能为空。 |

**返回示例**

~~~json
{
    "Code": "Success",
    "Message": "Success.",
    "Data": {
        "Baremetals": [
            {
                "BaremetalId": "0d19f7e6-553f-43be-ab3f-b5c31b3511d9",
                "Cpu": 32,
                "CreateDate": "2020-04-16 11:56:58",
                "EnableMonitor": "0",
                "InstanceChargeType": "PostPaid",
                "IsAutoRenewal": 1,
                "Name": "test-wwh",
                "Networks": {
                    "NetworkCards": [                        
                        {
                            "ConnectState": "on",
                            "Gateway": "10.240.57.1",
                            "Id": "69ed5a7b-8599-4104-a1fa-211db097b73d",
                            "IpAddress": "10.240.57.1",
                            "IpType": "private",
                            "IpVersion": "ipV4",
                            "Netmask": "255.255.0.0",
                            "VlanId": "3214"
                        }
                    ]
                },
                "Ram": 64,
                "RegionId": "CN_Beijing_F",
                "RegionName": "中国大陆-北京-可用区F（内测）",
                "State": "error",
                "Status": "错误",
                "VdcId": "9db2c835-3d4b-42a9-ad03-d381d7e6efb8",
                "VdcName": "test-wwh-盘古"
            }],
        "TotalCount": 3,
        "PageSize": 500,
        "PageNumber": 1
    }
}
~~~

 **代码调用示例**

 ```python
def describe_bms_list():
    action = "DescribeBms"
    method = "GET"
    param = {
        # "VdcId":"2ee7edc8-ebc3-4e21-9188-f82d4e4fd9bf"
    }
    url = get_signature(action, AK, AccessKeySecret, method, BMS_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
 ```


### 6.DescribeBmsDetail

**Action: DescribeBmsDetail**

**描述**:  查询裸金属详情

**请求地址**:  cdsapi.capitalonline.net/bms

**请求方法**: GET

**请求参数**: 

| 名称        | 类型   | 是否必选 | 示例值                               | 描述         |
| ----------- | ------ | -------- | ------------------------------------ | ------------ |
| BaremetalId | string | 是       | a0492924-1dc1-462e-9cbb-622dc1ec49a3 | 裸金属主键ID |

**返回参数**:

| 名称               | 类型   | 示例值                                    | 描述                                                         |
| ------------------ | ------ | ----------------------------------------- | ------------------------------------------------------------ |
| Code               | string | Success                                   | 错误码                                                       |
| Message            | string | null                                      | 返回信息说明                                                 |
| Data               | object | {}                                        | 裸金属服务器详情数据                                         |
| BaremetalId        | string | a0492924-1dc1-462e-9cbb-622dc1ec49a3      | 裸金属ID                                                     |
| Name               | string | bms-test                                  | 裸金属名称                                                   |
| Cpu                | int    | 32                                        | Cpu个数                                                      |
| Ram                | int    | 64                                        | 内存大小                                                     |
| State              | string | running                                   | 运行中                                                       |
| EnableMonitor      | string | 1                                         | 是否开启监控, 1: 开启, 0: 关闭                               |
| Status             | string | 运行中                                    | 运行状态                                                     |
| VdcId              | string | 2bbacc90-5e8f-4394-92e1-3f237de1ae8d      | 虚拟数据中心ID                                               |
| RegionId           | string | CN_Beijing_F                              | 可用区编号                                                   |
| VdcName            | string | bms003                                    | 虚拟数据中心名称                                             |
| RegionName         | string | 中国大陆-北京-可用区F                     | 区域名称                                                     |
| ImageName          | string | ubuntu14.04_64                            | 镜像名称                                                     |
| InstanceChargeType | string | PostPaid                                  | 计费方式<br />PrePaid：预付费 <br />PostPaid：按量付费<br />目前只支持包年包月 |
| BillStatus         | string | 1                                         | 1: 计费中                                                    |
| IsAutoRenewal      | int    | 0                                         | 0: 没有开启自动续约，1: 开启自动续约                         |
| RunningTime        | string | 0天3小时1分钟35秒                         | 运行时间                                                     |
| CreateDate         | string | 2019-08-08 11:45:51                       | 裸金属创建时间                                               |
| ExpireDate         | string | 2019-09-01 00:00:00                       | 裸金属到期时间                                               |
| Volumes            | list   | []                                        | 存储挂载                                                     |
| Id(Volumes)        | string | 951496fa-73a6-461b-96dd-4ffba09ef5a7      | 挂载ID                                                       |
| Type               | string | hard                                      | 存储类型                                                     |
| Capacity           | int    | 480                                       | 容量大小                                                     |
| Iops               | int    | 500                                       | Iops大小                                                     |
| Mbps               | int    | 70                                        | Mbps大小                                                     |
| VolumeType         | string | SSD                                       | 硬盘类型                                                     |
| VolumeId           | string | cb4228a9-58bb-44b2-8ddd-9e46168b364d      | 硬盘Id                                                       |
| VolumePath         | string | sda                                       | 卷名                                                         |
| UpdateDate         | string | 2020-04-17T07:47:23.000+0000              | 更新时间                                                     |
| Networks           | object | {}                                        | 网络                                                         |
| NetworkCards       | list   | []                                        | 网卡                                                         |
| Id(NetworkCards)   | string | b0143a8a-2fb1-4c66-b0e4-34b12ff9e33c      | 网卡Id                                                       |
| Mac                | list   | ["e4:43:4b:6b:a7:0e","e4:43:4b:6b:a7:10"] | Mac地址                                                      |
| VlanId             | string | 1020                                      | Vlan编号                                                     |
| WorkMode           | string | bond6                                     | 网卡绑定信息                                                 |
| IpType             | string | private                                   | Ip类型：public/private                                       |
| IpVersion          | string | ipV4                                      | Ip版本                                                       |
| IpAddress          | string | 10.241.36.1                               | Ip地址                                                       |
| Netmask            | string | 255.255.0.0                               | 掩码地址                                                     |
| Gateway            | string | 10.241.36.1                               | 网关地址                                                     |
| ConnectState       | string | on                                        | 是否连接  on\off                                             |

**错误码**

| httpcode | 错误码           | 错误信息                                                     | 描述                          |
| -------- | ---------------- | ------------------------------------------------------------ | ----------------------------- |
| 400      | ParameterInvalid | The parameter "BaremetalId" is required.                     | 参数BaremetalId是必选项。     |
| 400      | ParameterIsEmpty | The parameter "BaremetalId" cannot be empty.                 | 参数BaremetalId不能为空。     |
| 400      | InstanceNotFound | the Instance has deleted or The specified parameter InstanceID is not valid. | 实例被删除或者BaremetalId无效 |

**返回示例**

~~~json
{
    "Code": "Success",
    "Message": "Success.",
    "Data": {
        "BaremetalId": "19cd1c58-11d4-4ed0-8c19-81aa4cf3574a",
        "BillStatus": "1",
        "Cpu": 32,
        "CreateDate": "2020-04-30 11:22:41",
        "EnableMonitor": "0",
        "ExpireDate": "2020-05-01 00:00:00",
        "ImageName": "centos7.6_64",
        "InstanceChargeType": "PrePaid",
        "IsAutoRenewal": 0,
        "Name": "openapi006",
        "Networks": {
            "NetworkCards": [                
                {
                    "ConnectState": "on",
                    "Gateway": "10.241.14.1",
                    "Id": "2e976bfd-f355-4bae-9c09-b88d431fcc54",
                    "IpAddress": "10.241.14.4",
                    "IpType": "private",
                    "IpVersion": "ipV4",
                    "Mac": [
                        "6C:92:BF:FF:BD:6A",
                        "6C:92:BF:FF:BD:6B"
                    ],
                    "Netmask": "255.255.0.0",
                    "VlanId": "3733",
                    "WorkMode": "bond6"
                }
            ]
        },
        "Ram": 64,
        "RegionId": "CN_Beijing_F",
        "RegionName": "中国大陆-北京-可用区F（内测）",
        "RunningTime": "0天7小时18分钟55秒",
        "State": "rebuilding",
        "Status": "重装中",
        "VdcId": "9db2c835-3d4b-42a9-ad03-d381d7e6efb8",
        "VdcName": "test-wwh-盘古",
        "Volumes": [
            {
                "BaremetalId": "19cd1c58-11d4-4ed0-8c19-81aa4cf3574a",
                "Capacity": 480,
                "CreateDate": "2020-04-30T03:10:00.000+0000",
                "Id": "a5f18fb1-f4a4-4e8c-973f-865ee8662b0c",
                "Iops": 0,
                "Mbps": 0,
                "Type": "hard",
                "UpdateDate": "2020-04-30T03:10:00.000+0000",
                "VolumeId": "454a1d9d-25c3-48cc-8787-404447e81f49",
                "VolumePath": "sda",
                "VolumeType": "SSD"
            }
        ]
    }
}
~~~

 **代码调用示例**

 ```python
def describe_bms_detail(id):
    action = "DescribeBmsDetail"
    method = "GET"
    param = {
        "BaremetalId": id
    }
    url = get_signature(action, AK, AccessKeySecret, method, BMS_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
 ```



### 7.OperateBmsPower

**Action: OperateBmsPower**

**描述**:  裸金属服务器的电源操作（开机、关机、重启）

**请求地址**:  cdsapi.capitalonline.net/bms

**请求方法**: POST

**请求参数**: 

| 名称         | 类型   | 是否必选 | 示例值                                   | 描述                                                         |
| ------------ | ------ | -------- | ---------------------------------------- | ------------------------------------------------------------ |
| Operate      | string | 是       | start                                    | 操作电源的状态<br />start:  开启<br />stop:  关闭<br />reset:  重启 |
| BaremetalIds | list   | 是       | [“2df3f6b4-26ed-4c93-943d-a81a39ced124”] | 裸金属资源（ID）列表                                         |

**返回参数**:

| 名称         | 类型   | 示例值                                   | 描述                                               |
| ------------ | ------ | ---------------------------------------- | -------------------------------------------------- |
| Code         | string | Success                                  | 返回状态码                                         |
| Message      | string | Success                                  | 提示信息                                           |
| Data         | object | {}                                       | 返回数据                                           |
| TaskId       | list   | ["72dc0cae-a867-11e9-8184-0242ac110003"] | 任务编号列表，与裸金属资源(ID)列表按照下标一一对应 |
| BaremetalIds | list   | ["d226f190-f942-4257-8f3e-9cce8dfc0f2b"] | 裸金属资源(ID)列表                                 |

**错误码**

| httpcode | 错误码           | 错误信息                                                     | 描述                                      |
| -------- | ---------------- | ------------------------------------------------------------ | ----------------------------------------- |
| 400      | ParameterInvalid | The parameter "Operate" is required.                         | 参数Operate是必选项。                     |
| 400      | ParameterIsEmpty | The parameter "Operate" cannot be empty.                     | 参数Operate不能为空。                     |
| 400      | InstanceError    | The Instance is not allowed to operate  or The specified parameter BaremetalId is not valid. | 实例当前状态不允许操作或者BaremetalId无效 |
| 400      | TaskToCoreFaild  | Push task to core failed                                     | 创建任务失败！                            |
| 400      | DataNotExists    | Please check that the parameters are correct.                | 请检查参数是否正确。                      |


**返回示例**

~~~json
{
    "Code": "Success",
    "Msg": "Success.",
    "Data": {
        "BaremetalIds": [
            "2df3f6b4-26ed-4c93-943d-a81a39ced124"
        ],
        "TaskIds": [
            "72dc0cae-a867-11e9-8184-0242ac110003"
        ]
    }
}
~~~

 **代码调用示例**

 ```python
def operat_bms_power(id, state):
    action = "OperateBmsPower"
    method = "POST"
    param = {
        "BaremetalIds": [id],
        "Operate": state
    }
    url = get_signature(action, AK, AccessKeySecret, method, BMS_URL)
    res = requests.post(url, json=param)
    result = json.loads(res.content)
 ```



### 8.ReinstallBms

**Action: ReinstallBms**

**描述**:  裸金属服务器系统重装

**请求地址**:  cdsapi.capitalonline.net/bms

**请求方法**: POST

**请求参数**: 

| 名称                | 类型   | 是否必选 | 示例值                               | 描述                                                         |
| ------------------- | ------ | -------- | ------------------------------------ | ------------------------------------------------------------ |
| BaremetalId         | string | 是       | d226f190-f942-4257-8f3e-9cce8dfc0f2b | 裸金属ID                                                     |
| ImageId             | string | 是       | d6012cd8-b672-11e9-9265-525400b97470 | 镜像ID                                                       |
| Password            | string | 是       | capitalonline                        | 密码                                                         |
| Raid                | string | 否       | 1                                    | 数据盘自定义Raid,支持 0, 1, 5, 10                            |
| CustomPartition     | list   | 否       | ["/","swap", "/aaa"]                 | 系统盘自定义分区，第一个必须是"/" 分区，swap分区可选，/aaa分区为自定义 |
| CustomPartitionSize | list   | 否       | [100,  128,  300 ]                   | 系统盘自定义分区大小，单位GB，与自定义分区列表中对应分区的大小 |


**返回参数**

| 名称    | 类型   | 示例值                                   | 描述       |
| ------- | ------ | ---------------------------------------- | ---------- |
| Code    | string | Success                                  | 返回状态码 |
| Message | string | Success                                  | 提示信息   |
| Data    | object | {}                                       | 返回数据   |
| TaskIds | list   | ["72dc0cae-a867-11e9-8184-0242ac110003"] | 任务ID     |

**错误码**

| httpcode | 错误码           | 错误信息                                                     | 描述                      |
| -------- | ---------------- | ------------------------------------------------------------ | ------------------------- |
| 400      | ParameterInvalid | The parameter "BaremetalId" is required.                     | 参数BaremetalId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "BaremetalId" cannot be empty.                 | 参数BaremetalId不能为空。 |
| 400      | ImageNotFound    | Image cannot be found by id[d6012cd8-b672-11e9-9265-525400b97470] | 该镜像在该可用区不存在。  |
| 400      | RebuildFailed    | Compute state is not correct                                 | 服务器状态不正确。        |
| 400      | TaskToCoreFaild  | Push task to core failed                                     | 创建任务失败！            |
| 400      | DataNotExists    | Please check that the parameters are correct.                | 请检查参数是否正确。      |


**返回示例**

~~~json
{
    "Code": "Success",
    "Message": "Success.",
    "Data": {
        "TaskIds": [
            "97fe8058-8524-11ea-80e3-0242ac110003"
        ]
    }
}
~~~

 **代码调用示例**

 ```python
def operat_bms_reinstall(id, image_id, passwd):    
    action = "ReinstallBms"
    method = "POST"
    param = {
        "BaremetalId": id,
        "ImageId": image_id,
        "Password": passwd
    }
    url = get_signature(action, AK, AccessKeySecret, method, BMS_URL)
    res = requests.post(url, json=param)
    result = json.loads(res.content)
 ```



### 9.DescribeBmsVNC

**Action: DescribeBmsVNC**

**描述:** 获取裸金属服务器的VNC访问地址

**请求地址:** cdsapi.capitalonline.net/bms

**请求方法:** GET

**请求参数：**

| 名称        | 类型   | 是否必须 | 示例                                 | 描述         |
| ----------- | ------ | -------- | ------------------------------------ | ------------ |
| BaremetalId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 裸金属编号id |

**返回数据：**

| 名称    | 类型   | 示例                                     | 描述              |
| ------- | ------ | ---------------------------------------- | ----------------- |
| Code    | string | Success                                  | 错误码            |
| Message | string | Success                                  | 提示信息          |
| Data    | object | {}                                       | 返回数据          |
| Url     | string | http://114.112.35.22/vnc/?authId=&token= | 裸金属VNC访问地址 |

**错误码：**

| httpcode | 错误码           | 错误信息                                      | 描述                      |
| -------- | ---------------- | --------------------------------------------- | ------------------------- |
| 400      | ParameterInvalid | The parameter "BaremetalId" is required.      | 参数BaremetalId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "BaremetalId" cannot be empty.  | 参数BaremetalId不能为空。 |
| 400      | DataNotExists    | Please check that the parameters are correct. | 请检查参数是否正确。      |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
    "Url": "http://114.112.35.22/vnc/?authId=1c4c81e990bd4805a46575f411fe86b0&token=03cf4b2b6a911c0525fa1eed0d904370796060a6b6b85a261c143c7545ba633f"
  }
}
```

 **代码调用示例**

 ```python
def describe_bms_vnc(BaremetalId):
    action = "DescribeBmsVNC"
    method = "GET"
    param = {
        "BaremetalId": BaremetalId
    }
    url = get_signature(action, AK, AccessKeySecret, method, BMS_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
 ```



### 10.ModifyBmsOrder

**Action: ModifyBmsOrder**

**描述:** 更新裸金属订单

**请求地址:** cdsapi.capitalonline.net/bms

**请求方法:** POST

**请求参数：**

| 名称        | 类型   | 是否必须 | 示例                                 | 描述                                              |
| ----------- | ------ | -------- | ------------------------------------ | ------------------------------------------------- |
| BaremetalId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 裸金属编号id                                      |
| AutoRenewal | int    | 是       | 1                                    | 是否开启自动续约<br />0: 不开启，1: 开启          |
| BillMethod  | string | 否       | 1                                    | 计费方式<br />1: 包年包月<br />目前只支持包年包月 |
| Duration    | int    | 否       | 1                                    | 续约时长                                          |
| IsToMonth   | int    | 否       | 1                                    | 是否计费到月底<br />0: 否，1: 是                  |

**返回数据：**

| 名称        | 类型   | 示例                                       | 描述     |
| ----------- | ------ | ------------------------------------------ | -------- |
| Code        | string | Success                                    | 错误码   |
| Message     | string | Automatic renewal of order has been opened | 提示信息 |
| Data        | list   | []                                         | 返回数据 |
| SuborderIds | list   | ["697cb2d8-93ca-41bc-89f2-bde77fb71e6b"]   | 子订单Id |


**错误码：**

| httpcode | 错误码             | 错误信息                                                     | 描述                                      |
| -------- | ------------------ | ------------------------------------------------------------ | ----------------------------------------- |
| 400      | ParameterInvalid   | The parameter "BaremetalId" is required.                     | 参数BaremetalId是必选项。                 |
| 400      | ParameterIsEmpty   | The parameter "BaremetalId" cannot be empty.                 | 参数BaremetalId不能为空。                 |
| 400      | OrderUpdateError   | Order update failed!                                         | 订单更新失败。                            |
| 400      | InstanceNotFound   | the BaremetalInstance has deleted or The specified parameter "BaremetalId" is not valid. | 裸金属服务器已删除或者参数BaremetalId无效 |
| 400      | OrderResourceError | ResourceId not found!                                        | 裸金属编号id未找到                        |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": [
      {
        "SuborderIds": 
            ["697cb2d8-93ca-41bc-89f2-bde77fb71e6b"]
      }
  ]
}
```

 **代码调用示例**

 ```python
def update_bms_order(id, renewal):    
    action = "ModifyBmsOrder"
    method = "POST"
    param = {
        "BaremetalId": id,
        "AutoRenewal": renewal,
        "Duration": 2,
       "IsToMonth": 1
    }
    url = get_signature(action, AK, AccessKeySecret, method, BMS_URL)
    res = requests.post(url, json=param)
    result = json.loads(res.content)
 ```

### 11.DescribeBmsTask

**Action: DescribeBmsTask**

**描述:** 查询创建裸金属服务器任务状态

**请求地址:** cdsapi.capitalonline.net/bms

**请求方法:** GET

**请求参数：**

| 名称   | 类型   | 是否必须 | 示例                                 | 描述                         |
| ------ | ------ | -------- | ------------------------------------ | ---------------------------- |
| TaskId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 创建裸金属服务器返回的TaskId |

**返回数据：**

| 名称         | 类型   | 示例                                     | 描述                                    |
| ------------ | ------ | ---------------------------------------- | --------------------------------------- |
| Code         | string | Success                                  | 错误码                                  |
| Message      | string | Success                                  | 提示信息                                |
| Data         | object | {}                                       | 返回数据                                |
| BareMetalIds | list   | ["27f262ec-92fd-4a77-ba78-6f682b7533e3"] | 裸金属服务器的编号id                    |
| Status       | string | succeed / init                           | 任务状态: succeed（完成）, init(进行中) |

**错误码：**

| httpcode | 错误码           | 错误信息                                      | 描述                 |
| -------- | ---------------- | --------------------------------------------- | -------------------- |
| 400      | ParameterInvalid | The parameter "TaskId" is required.           | 参数TaskId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "TaskId" cannot be empty.       | 参数TaskId不能为空。 |
| 400      | DataNotExists    | Please check that the parameters are correct. | 请检查参数是否正确。 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
    "BareMetalIds":["27f262ec-92fd-4a77-ba78-6f682b7533e3"],
    "Status":"succeed"
  }
}
```

 **代码调用示例**

 ```python
def describe_bms_task(TaskId):
    action = "DescribeBmsTask"
    method = "GET"
    param = {
        "TaskId": TaskId
    }
    url = get_signature(action, AK, AccessKeySecret, method, BMS_URL, param)
    res = requests.get(url)
    result = json.loads(res.content)
 ```

### 12.DeleteBmsInstance

**Action: DeleteBmsInstance**

**描述:** 删除按需计费的裸金属服务器

**请求地址:** cdsapi.capitalonline.net/bms

**请求方法:** POST

**请求参数：**

| 名称        | 类型   | 是否必须 | 示例                                 | 描述                                       |
| ----------- | ------ | -------- | ------------------------------------ | ------------------------------------------ |
| BaremetalId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 按需裸金属服务器的编号id（删除前请先关机） |

**返回数据：**

| 名称    | 类型   | 示例    | 描述     |
| ------- | ------ | ------- | -------- |
| Code    | string | Success | 错误码   |
| Message | string | Success | 提示信息 |
| Data    | object | {}      | 返回数据 |


**错误码：**

| httpcode | 错误码           | 错误信息                                     | 描述                             |
| -------- | ---------------- | -------------------------------------------- | -------------------------------- |
| 400      | ParameterInvalid | The parameter "BaremetalId" is required.     | 参数BaremetalId是必选项。        |
| 400      | ParameterIsEmpty | The parameter "BaremetalId" cannot be empty. | 参数BaremetalId不能为空。        |
| 400      | LogicError       | 选择中包含有（非按需计费／非关机状态）的主机 | 只能删除按需计费和关机状态的主机 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {}
}
```

 **代码调用示例**

 ```python
def delete_bms_instance(BaremetalId):
    action = "DeleteBmsInstance"
    method = "POST"
    param = {
        "BaremetalId": BaremetalId
    }
    url = get_signature(action, AK, AccessKeySecret, method, BMS_URL)
    res = requests.post(url, json=param)
    result = json.loads(res.content)
 ```


## 裸金属云盘相关

### 1.CreateDisk

**Action: CreateDisk**

**描述:** 创建裸金属云盘

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** POST

**请求参数：**

| 名称     | 类型   | 是否必须 | 示例                                 | 描述            |
| -------- | ------ | -------- | ------------------------------------ | --------------- |
| RegionId | string | 是       | 35304122-8504-400c-a61c-56ba244c5dda | 可用区id        |
| Name     | string | 是       | disk-hk-A                            | 创建的磁盘名字  |
| Size     | int    | 是       | 200                                  | 磁盘大小，单位G |
| Num      | int    | 是       | 1                                    | 创建磁盘的数量  |
| GoodsId  | string | 是       | bbf63749-0186-4c68-8adc-9bf584bc1376 | 商品ID          |


**返回数据：**

| 名称     | 类型   | 示例                                 | 描述                      |
| -------- | ------ | ------------------------------------ | ------------------------- |
| Code     | string | Success                              | 返回状态码: Success: 成功 |
| Message  | string | null                                 | 返回信息                  |
| Data     | object | {}                                   | 返回数据                  |
| DiskInfo | list   | []                                   | 包含磁盘id、任务id        |
| TaskId   | string | 127d4ac3-f3fc-11ea-800c-f0d4e2e923e0 | 任务流id                  |
| DiskId   | string | 0767874e-f3fb-11ea-800c-f0d4e2e923e0 | 产品配置Id                |


**错误码：**

| httpcode | 错误码           | 错误信息                                  | 描述                   |
| -------- | ---------------- | ----------------------------------------- | ---------------------- |
| 400      | ParameterInvalid | The parameter "RegionId" is required.     | 参数RegionId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "RegionId" cannot be empty. | 参数RegionId不能为空。 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "DiskInfo": [
             {
              "DiskId":"0767874e-f3fb-11ea-800c-f0d4e2e923e0",
              "TaskId": "0c610d7a-f3fb-11ea-800c-f0d4e2e923e0"
            }
        ]
    }
}
```

 **代码调用示例**

 ```python
def create_disk():
   action = "CreateDisk"
   method = "POST"
   param = {
       "RegionId": "CN_Beijing_F",
       "Name": "test1",
       "Size": 200,
       "Num": 1,
       "GoodsId": "bbf63749-0186-4c68-8adc-9bf584bc1376"
   }
   url = get_signature(action, AK, AccessKeySecret, method, BMS_DISK_URL)
   res = requests.post(url, json=param)
   result = json.loads(res.content)
 ```

### 2.AttachDisk

**Action: AttachDisk**

**描述:** 挂载裸金属云盘

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** POST

**请求参数：**

| 名称       | 类型   | 是否必须 | 示例                                 | 描述           |
| ---------- | ------ | -------- | ------------------------------------ | -------------- |
| InstanceId | string | 是       | d95423a8-f3fb-11ea-800c-f0d4e2e923e0 | 挂载主机资源id |
| DiskId     | string | 是       | 0767874e-f3fb-11ea-800c-f0d4e2e923e0 | 磁盘id         |


**返回数据：**

| 名称    | 类型   | 示例                                 | 描述                      |
| ------- | ------ | ------------------------------------ | ------------------------- |
| Code    | string | Success                              | 返回状态码: Success: 成功 |
| Message | string | null                                 | 返回信息                  |
| Data    | object | {}                                   | 返回数据                  |
| TaskId  | string | 127d4ac3-f3fc-11ea-800c-f0d4e2e923e0 | 任务流id                  |



**错误码：**

| httpcode | 错误码           | 错误信息                                    | 描述                     |
| -------- | ---------------- | ------------------------------------------- | ------------------------ |
| 400      | ParameterInvalid | The parameter "InstanceId" is required.     | 参数InstanceId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "InstanceId" cannot be empty. | 参数InstanceId不能为空。 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "DiskInfo": [
             {
              "TaskId": "6667a809-f3fc-11ea-800c-f0d4e2e923e0"
            }
        ]
    }
}
```

 **代码调用示例**

 ```python
def attack_disk():
   action = "AttachDisk"
   method = "POST"
   param = {
       "InstanceId": "d95423a8-f3fb-11ea-800c-f0d4e2e923e0",
       "DiskId": "0767874e-f3fb-11ea-800c-f0d4e2e923e0"
   }
   url = get_signature(action, AK, AccessKeySecret, method, BMS_DISK_URL)
   res = requests.post(url, json=param)
   result = json.loads(res.content)
 ```

### 3.DetachDisk

**Action: DetachDisk**

**描述:** 卸载裸金属云盘

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** POST

**请求参数：**

| 名称   | 类型   | 是否必须 | 示例                                 | 描述   |
| ------ | ------ | -------- | ------------------------------------ | ------ |
| DiskId | string | 是       | 0767874e-f3fb-11ea-800c-f0d4e2e923e0 | 磁盘id |


**返回数据：**

| 名称    | 类型   | 示例                                 | 描述                      |
| ------- | ------ | ------------------------------------ | ------------------------- |
| Code    | string | Success                              | 返回状态码: Success: 成功 |
| Message | string | null                                 | 返回信息                  |
| Data    | object | {}                                   | 返回数据                  |
| TaskId  | string | 127d4ac3-f3fc-11ea-800c-f0d4e2e923e0 | 任务流id                  |



**错误码：**

| httpcode | 错误码           | 错误信息                                | 描述                 |
| -------- | ---------------- | --------------------------------------- | -------------------- |
| 400      | ParameterInvalid | The parameter "DiskId" is required.     | 参数DiskId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "DiskId" cannot be empty. | 参数DiskId不能为空。 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "DiskInfo": [
             {
              "TaskId": "6667a809-f3fc-11ea-800c-f0d4e2e923e0"
            }
        ]
    }
}
```

 **代码调用示例**

 ```python
def detack_disk():
   action = "DetachDisk"
   method = "POST"
   param = {
       "DiskId": "0767874e-f3fb-11ea-800c-f0d4e2e923e0"
   }
   url = get_signature(action, AK, AccessKeySecret, method, BMS_DISK_URL)
   res = requests.post(url, json=param)
   result = json.loads(res.content)
 ```

### 4.DeleteDisk

**Action: DeleteDisk**

**描述:** 删除裸金属云盘

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** POST

**请求参数：**

| 名称   | 类型   | 是否必须 | 示例                                 | 描述   |
| ------ | ------ | -------- | ------------------------------------ | ------ |
| DiskId | string | 是       | 0767874e-f3fb-11ea-800c-f0d4e2e923e0 | 磁盘id |


**返回数据：**

| 名称    | 类型   | 示例                                 | 描述                      |
| ------- | ------ | ------------------------------------ | ------------------------- |
| Code    | string | Success                              | 返回状态码: Success: 成功 |
| Message | string | null                                 | 返回信息                  |
| Data    | object | {}                                   | 返回数据                  |
| TaskId  | string | 127d4ac3-f3fc-11ea-800c-f0d4e2e923e0 | 任务流id                  |



**错误码：**

| httpcode | 错误码           | 错误信息                                | 描述                 |
| -------- | ---------------- | --------------------------------------- | -------------------- |
| 400      | ParameterInvalid | The parameter "DiskId" is required.     | 参数DiskId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "DiskId" cannot be empty. | 参数DiskId不能为空。 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "DiskInfo": [
             {
              "TaskId": "6667a809-f3fc-11ea-800c-f0d4e2e923e0"
            }
        ]
    }
}
```

 **代码调用示例**

 ```python
def delete_disk():
   action = "DeleteDisk"
   method = "POST"
   param = {
       "DiskId": "0767874e-f3fb-11ea-800c-f0d4e2e923e0"
   }
   url = get_signature(action, AK, AccessKeySecret, method, BMS_DISK_URL)
   res = requests.post(url, json=param)
   result = json.loads(res.content)
 ```

### 5.DescribeDisks

**Action: DescribeDisks**

**描述:** 查询裸金属云盘列表

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** GET

**请求参数：**

| 名称       | 类型   | 是否必须 | 示例                                 | 描述                 |
| ---------- | ------ | -------- | ------------------------------------ | -------------------- |
| RegionId   | string | 否       | 35304122-8504-400c-a61c-56ba244c5dda | 可用区id             |
| DiskId     | string | 否       | 0767874e-f3fb-11ea-800c-f0d4e2e923e0 | 磁盘id               |
| InstanceId | string | 否       | d95423a8-f3fb-11ea-800c-f0d4e2e923e0 | 挂载主机id           |
| Name       | string | 否       | test1                                | 创建的磁盘名字       |
| PageNumber | string | 否       | 1                                    | Disk列表页码         |
| PageSize   | string | 否       | 10                                   | 每页返回数量；默认50 |


**返回数据：**

| 名称    | 类型   | 示例    | 描述                      |
| ------- | ------ | ------- | ------------------------- |
| Code    | string | Success | 返回状态码: Success: 成功 |
| Message | string | null    | 返回信息                  |
| Data    | object | {}      | 返回数据                  |

| Total        | int | 20                                                      | 返回数据的条数         
| DiskList    | list    | []                                                         | 磁盘列表 |
| DiskId  | string | 0767874e-f3fb-11ea-800c-f0d4e2e923e0                         | 磁盘id                                                     |
| Name         | string | bms-test                                                     | 磁盘名称                                                       |
| State        | string | attach                                                      | 挂载         
| Size          | int    | 200                                                           | 磁盘大小；单位G                                                      |
| Iops          | int    | 5000                                                           | 最大iops                                                     |
| Bw          | int    | 4000                                                           | 最大磁盘带宽；单位Mb                                                       |
| DiskType       | string | Nvme                                                        | 磁盘类型                                                      |                                          |
| RegionId     | string | CN_Beijing_F                                                 | 可用区id                                                      |
| CustomerId     | string | E001                                                 | 用户id                                                      |
| UserId     | string | C001                                                 | 用户id                                                      |
| CreateTime     | string | 2020-08-13 07:20:00                                                 | 创建时间                                                      |




**错误码：**

| httpcode | 错误码            | 错误信息                                  | 描述           |
| -------- | ----------------- | ----------------------------------------- | -------------- |
| 400      | ParametersIsEmpty | The parameter "RegionId" cannot be empty. | 参数不能为空。 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "Total": 1,
        "DiskList": [
             {
                "Name": "disk-hk-A",
                "State": "attach",
                "Size": 500,
                "Iops": 3000,
                "Bw": 3000,
                "DiskType": "Nvme",
                "RegionId": "35304122-8504-400c-a61c-56ba244c5dda",
                "CustomerId": "E001",
                "UserId": "",
                "CreateTime": "2020-08-13 07:20:00"
            }
        ]
    }
}
```

 **代码调用示例**

 ```python
def describe_disks():
   action = "DescribeDisks"
   method = "GET"
   param = {
       "RegionId": "",
       "DiskId": "",
       "InstanceId": "d95423a8-f3fb-11ea-800c-f0d4e2e923e0",
       "Name": "disk-hk-A",
       "PageNumber": "1",
       "PageSize": "10"
   }
   url = get_signature(action=action, ak=AK, access_key_secret=AccessKeySecret, method=method, url=BMS_DISK_URL, param=param)
   res = requests.get(url)
 ```

### 6.DescribeDiskUsage

**Action: DescribeDiskUsage**

**描述:** 查询裸金属云盘使用详情

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** GET

**请求参数：**

| 名称   | 类型   | 是否必须 | 示例                                 | 描述   |
| ------ | ------ | -------- | ------------------------------------ | ------ |
| DiskId | string | 是       | 0767874e-f3fb-11ea-800c-f0d4e2e923e0 | 磁盘id |


**返回数据：**

| 名称    | 类型   | 示例                                 | 描述                      |
| ------- | ------ | ------------------------------------ | ------------------------- |
| Code    | string | Success                              | 返回状态码: Success: 成功 |
| Message | string | null                                 | 返回信息                  |
| Data    | object | {}                                   | 返回数据                  |
| DiskId  | string | 0767874e-f3fb-11ea-800c-f0d4e2e923e0 | 磁盘id                    |
| Use     | int    | 200                                  | 磁盘已使用大小；单位G     |
| Size    | int    | 500                                  | 磁盘总容量；单位G         |
| Ratio   | string | 40%                                  | 使用百分比                |




**错误码：**

| httpcode | 错误码           | 错误信息                                | 描述                 |
| -------- | ---------------- | --------------------------------------- | -------------------- |
| 400      | ParameterInvalid | The parameter "DiskId" is required.     | 参数DiskId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "DiskId" cannot be empty. | 参数DiskId不能为空。 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "DiskId": "0767874e-f3fb-11ea-800c-f0d4e2e923e0",
        "Use": 200,
        "Size": 500,
        "Ratio": "40%"
   }
}
```

 **代码调用示例**

 ```python
def describe_diskUsage():
   action = "DescribeDiskUsage"
   method = "GET"
   param = {
       "DiskId": "0767874e-f3fb-11ea-800c-f0d4e2e923e0"
   }
   url = get_signature(action=action, ak=AK, access_key_secret=AccessKeySecret, method=method, url=BMS_DISK_URL, param=param)
   res = requests.get(url)
 ```

### 7.DescribePoolUsage

**Action: DescribePoolUsage**

**描述:** 查询裸金属云盘存储池使用详情

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** GET

**请求参数：**

| 名称     | 类型   | 是否必须 | 示例                                 | 描述       |
| -------- | ------ | -------- | ------------------------------------ | ---------- |
| RegionId | string | 是       | 35304122-8504-400c-a61c-56ba244c5dda | 可用区id   |
| PoolName | string | 是       | nvme_pool                            | 存储池名字 |


**返回数据：**

| 名称     | 类型   | 示例      | 描述                      |
| -------- | ------ | --------- | ------------------------- |
| Code     | string | Success   | 返回状态码: Success: 成功 |
| Message  | string | null      | 返回信息                  |
| Data     | object | {}        | 返回数据                  |
| PoolName | string | nvme_pool | 存储池名字                |
| Use      | int    | 200       | 存储池已使用大小；单位G   |
| Size     | int    | 500       | 存储池总容量；单位G       |
| Ratio    | string | 40%       | 使用百分比                |




**错误码：**

| httpcode | 错误码           | 错误信息                                  | 描述                   |
| -------- | ---------------- | ----------------------------------------- | ---------------------- |
| 400      | ParameterInvalid | The parameter "RegionId" is required.     | 参数RegionId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "RegionId" cannot be empty. | 参数RegionId不能为空。 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "PoolName": "ssd_pool",
        "Use": 200,
        "Size": 500,
        "Ratio": "40%"
   }
}
```

 **代码调用示例**

 ```python
def describe_poolUsage():
    action = "DescribePoolUsage"
    method = "GET"
    param = {
        "RegionId": "a3c21f88-f356-11ea-800c-f0d4e2e923e0",
        "PoolName": "ssd_pool"
   }
   url = get_signature(action=action, ak=AK, access_key_secret=AccessKeySecret, method=method, url=BMS_DISK_URL, param=param)
   res = requests.get(url)
 ```

### 8.ChangeIops

**Action: ChangeIops**

**描述:** 更改裸金属云盘IOPS

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** POST

**请求参数：**

| 名称   | 类型   | 是否必须 | 示例                                 | 描述   |
| ------ | ------ | -------- | ------------------------------------ | ------ |
| DiskId | string | 是       | 0767874e-f3fb-11ea-800c-f0d4e2e923e0 | 磁盘id |
| Iops   | int    | 是       | 1000                                 | iops   |


**返回数据：**

| 名称    | 类型   | 示例                                 | 描述                      |
| ------- | ------ | ------------------------------------ | ------------------------- |
| Code    | string | Success                              | 返回状态码: Success: 成功 |
| Message | string | null                                 | 返回信息                  |
| Data    | object | {}                                   | 返回数据                  |
| TaskId  | string | 127d4ac3-f3fc-11ea-800c-f0d4e2e923e0 | 任务流id                  |



**错误码：**

| httpcode | 错误码           | 错误信息                                | 描述                 |
| -------- | ---------------- | --------------------------------------- | -------------------- |
| 400      | ParameterInvalid | The parameter "DiskId" is required.     | 参数DiskId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "DiskId" cannot be empty. | 参数DiskId不能为空。 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "TaskId": "b86646e9-f403-11ea-800c-f0d4e2e923e0"
    }
}
```

 **代码调用示例**

 ```python
def change_iops():
   action = "ChangeIops"
   method = "POST"
   param = {
       "DiskId": "0767874e-f3fb-11ea-800c-f0d4e2e923e0",
       "Iops": 1000
   }
   url = get_signature(action, AK, AccessKeySecret, method, BMS_DISK_URL)
   res = requests.post(url, json=param)
   result = json.loads(res.content)
 ```

### 9.ChangeBandwidth

**Action: ChangeBandwidth**

**描述:** 更改裸金属云盘带宽

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** POST

**请求参数：**

| 名称   | 类型   | 是否必须 | 示例                                 | 描述       |
| ------ | ------ | -------- | ------------------------------------ | ---------- |
| DiskId | string | 是       | 0767874e-f3fb-11ea-800c-f0d4e2e923e0 | 磁盘id     |
| Bw     | int    | 是       | 1000                                 | 增加的iops |


**返回数据：**

| 名称    | 类型   | 示例                                 | 描述                      |
| ------- | ------ | ------------------------------------ | ------------------------- |
| Code    | string | Success                              | 返回状态码: Success: 成功 |
| Message | string | null                                 | 返回信息                  |
| Data    | object | {}                                   | 返回数据                  |
| TaskId  | string | 127d4ac3-f3fc-11ea-800c-f0d4e2e923e0 | 任务流id                  |



**错误码：**

| httpcode | 错误码           | 错误信息                                | 描述                 |
| -------- | ---------------- | --------------------------------------- | -------------------- |
| 400      | ParameterInvalid | The parameter "DiskId" is required.     | 参数DiskId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "DiskId" cannot be empty. | 参数DiskId不能为空。 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "TaskId": "b86646e9-f403-11ea-800c-f0d4e2e923e0"
    }
}
```

 **代码调用示例**

 ```python
def change_bandwidth():
   action = "ChangeBandwidth"
   method = "POST"
   param = {
       "DiskId": "0767874e-f3fb-11ea-800c-f0d4e2e923e0",
       "Bw": 1000
   }
   url = get_signature(action, AK, AccessKeySecret, method, BMS_DISK_URL)
   res = requests.post(url, json=param)
   result = json.loads(res.content)
 ```


### 10.ExpansionSize

**Action: ExpansionSize**

**描述:** 裸金属云盘扩容

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** POST

**请求参数：**

| 名称   | 类型   | 是否必须 | 示例                                 | 描述       |
| ------ | ------ | -------- | ------------------------------------ | ---------- |
| DiskId | string | 否       | 0767874e-f3fb-11ea-800c-f0d4e2e923e0 | 磁盘id     |
| Size   | int    | 是       | 500                                  | 增加的容量 |


**返回数据：**

| 名称    | 类型   | 示例                                 | 描述                      |
| ------- | ------ | ------------------------------------ | ------------------------- |
| Code    | string | Success                              | 返回状态码: Success: 成功 |
| Message | string | null                                 | 返回信息                  |
| Data    | object | {}                                   | 返回数据                  |
| TaskId  | string | 127d4ac3-f3fc-11ea-800c-f0d4e2e923e0 | 任务流id                  |



**错误码：**

| httpcode | 错误码           | 错误信息                                | 描述                 |
| -------- | ---------------- | --------------------------------------- | -------------------- |
| 400      | ParameterInvalid | The parameter "DiskId" is required.     | 参数DiskId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "DiskId" cannot be empty. | 参数DiskId不能为空。 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "TaskId": "b86646e9-f403-11ea-800c-f0d4e2e923e0"
    }
}
```

 **代码调用示例**

 ```python
def describe_diskUsage():
   action = "DescribeDiskUsage"
   method = "POST"
   param = {
       "DiskId": "0767874e-f3fb-11ea-800c-f0d4e2e923e0",
       "Size": 500
   }
   url = get_signature(action, AK, AccessKeySecret, method, BMS_DISK_URL)
   res = requests.post(url, json=param)
   result = json.loads(res.content)
 ```

### 11.CreateSnapshot

**Action: CreateSnapshot**

**描述:** 创建裸金属云盘快照

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** POST

**请求参数：**

| 名称         | 类型   | 是否必须 | 示例                                 | 描述           |
| ------------ | ------ | -------- | ------------------------------------ | -------------- |
| DiskId       | string | 是       | 0767874e-f3fb-11ea-800c-f0d4e2e923e0 | 磁盘id         |
| SnapshotName | string | 是       | disk-hk-A-snap1                      | 创建快照的名字 |


**返回数据：**

| 名称       | 类型   | 示例                                 | 描述                      |
| ---------- | ------ | ------------------------------------ | ------------------------- |
| Code       | string | Success                              | 返回状态码: Success: 成功 |
| Message    | string | null                                 | 返回信息                  |
| Data       | object | {}                                   | 返回数据                  |
| TaskId     | string | 127d4ac3-f3fc-11ea-800c-f0d4e2e923e0 | 任务流id                  |
| SnapshotId | string | c000ba4c-f404-11ea-800c-f0d4e2e923e0 | 快照id                    |


**错误码：**

| httpcode | 错误码           | 错误信息                                | 描述                 |
| -------- | ---------------- | --------------------------------------- | -------------------- |
| 400      | ParameterInvalid | The parameter "DiskId" is required.     | 参数DiskId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "DiskId" cannot be empty. | 参数DiskId不能为空。 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "TaskId": "b86646e9-f403-11ea-800c-f0d4e2e923e0",
        "SnapshotId": "c000ba4c-f404-11ea-800c-f0d4e2e923e0"
    }
}
```

 **代码调用示例**

 ```python
def create_snapshot():
   action = "CreateSnapshot"
   method = "POST"
   param = {
       "DiskId": "0767874e-f3fb-11ea-800c-f0d4e2e923e0",
       "SnapshotName": "disk-hk-A-snap1"
   }
   url = get_signature(action, AK, AccessKeySecret, method, BMS_DISK_URL)
   res = requests.post(url, json=param)
   result = json.loads(res.content)
 ```


### 12.CloneSnapshot

**Action: CloneSnapshot**

**描述:** 克隆裸金属云盘快照

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** POST

**请求参数：**

| 名称       | 类型   | 是否必须 | 示例                                 | 描述                 |
| ---------- | ------ | -------- | ------------------------------------ | -------------------- |
| Name       | string | 是       | dish-hk-B                            | 克隆生成的新磁盘名字 |
| SnapshotId | string | 是       | c000ba4c-f404-11ea-800c-f0d4e2e923e0 | 快照id               |


**返回数据：**

| 名称    | 类型   | 示例                                 | 描述                      |
| ------- | ------ | ------------------------------------ | ------------------------- |
| Code    | string | Success                              | 返回状态码: Success: 成功 |
| Message | string | null                                 | 返回信息                  |
| Data    | object | {}                                   | 返回数据                  |
| TaskId  | string | 127d4ac3-f3fc-11ea-800c-f0d4e2e923e0 | 任务流id                  |
| DiskId  | string | d4965bac-f405-11ea-800c-f0d4e2e923e0 | 克隆生成的新磁盘id        |


**错误码：**

| httpcode | 错误码           | 错误信息                                    | 描述                     |
| -------- | ---------------- | ------------------------------------------- | ------------------------ |
| 400      | ParameterInvalid | The parameter "SnapshotId" is required.     | 参数SnapshotId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "SnapshotId" cannot be empty. | 参数SnapshotId不能为空。 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "TaskId": "b86646e9-f403-11ea-800c-f0d4e2e923e0",
        "DiskId": "d4965bac-f405-11ea-800c-f0d4e2e923e0"
    }
}
```

 **代码调用示例**

 ```python
def clone_snapshot():
   action = "CloneSnapshot"
   method = "POST"
   param = {
       "Name": "disk-hk-B",
       "SnapshotId": "c000ba4c-f404-11ea-800c-f0d4e2e923e0"
   }
   url = get_signature(action, AK, AccessKeySecret, method, BMS_DISK_URL)
   res = requests.post(url, json=param)
   result = json.loads(res.content)
 ```

### 13.DeleteSnapshot

**Action: DeleteSnapshot**

**描述:** 删除裸金属云盘快照

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** POST

**请求参数：**

| 名称       | 类型   | 是否必须 | 示例                                 | 描述   |
| ---------- | ------ | -------- | ------------------------------------ | ------ |
| SnapshotId | string | 是       | c000ba4c-f404-11ea-800c-f0d4e2e923e0 | 快照id |


**返回数据：**

| 名称    | 类型   | 示例                                 | 描述                      |
| ------- | ------ | ------------------------------------ | ------------------------- |
| Code    | string | Success                              | 返回状态码: Success: 成功 |
| Message | string | null                                 | 返回信息                  |
| Data    | object | {}                                   | 返回数据                  |
| TaskId  | string | 127d4ac3-f3fc-11ea-800c-f0d4e2e923e0 | 任务流id                  |


**错误码：**

| httpcode | 错误码           | 错误信息                                    | 描述                     |
| -------- | ---------------- | ------------------------------------------- | ------------------------ |
| 400      | ParameterInvalid | The parameter "SnapshotId" is required.     | 参数SnapshotId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "SnapshotId" cannot be empty. | 参数SnapshotId不能为空。 |


 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "TaskId": "b86646e9-f403-11ea-800c-f0d4e2e923e0"
    }
}
```

 **代码调用示例**

 ```python
def delete_snapshot():
   action = "DeleteSnapshot"
   method = "POST"
   param = {
       "SnapshotId": "c000ba4c-f404-11ea-800c-f0d4e2e923e0"
   }
   url = get_signature(action, AK, AccessKeySecret, method, BMS_DISK_URL)
   res = requests.post(url, json=param)
   result = json.loads(res.content)
 ```


### 14.RollbackSnapshot

**Action: RollbackSnapshot**

**描述:** 裸金属云盘快照回滚

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** POST

**请求参数：**

| 名称       | 类型   | 是否必须 | 示例                                 | 描述   |
| ---------- | ------ | -------- | ------------------------------------ | ------ |
| SnapshotId | string | 是       | c000ba4c-f404-11ea-800c-f0d4e2e923e0 | 快照id |


**返回数据：**

| 名称    | 类型   | 示例                                 | 描述                      |
| ------- | ------ | ------------------------------------ | ------------------------- |
| Code    | string | Success                              | 返回状态码: Success: 成功 |
| Message | string | null                                 | 返回信息                  |
| Data    | object | {}                                   | 返回数据                  |
| TaskId  | string | 127d4ac3-f3fc-11ea-800c-f0d4e2e923e0 | 任务流id                  |


**错误码：**

| httpcode | 错误码           | 错误信息                                    | 描述                     |
| -------- | ---------------- | ------------------------------------------- | ------------------------ |
| 400      | ParameterInvalid | The parameter "SnapshotId" is required.     | 参数SnapshotId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "SnapshotId" cannot be empty. | 参数SnapshotId不能为空。 |


 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "TaskId": "b86646e9-f403-11ea-800c-f0d4e2e923e0"
    }
}
```

 **代码调用示例**

 ```python
def rollback_snapshot():
   action = "RollbackSnapshot"
   method = "POST"
   param = {
       "SnapshotId": "c000ba4c-f404-11ea-800c-f0d4e2e923e0"
   }
   url = get_signature(action, AK, AccessKeySecret, method, BMS_DISK_URL)
   res = requests.post(url, json=param)
   result = json.loads(res.content)
 ```

### 15.DescribeGoodsId

**Action: DescribeGoodsId**

**描述:** 查询裸金属云盘商品id

**请求地址:** cdsapi.capitalonline.net/storage-service

**请求方法:** GET

**请求参数：**

| 名称     | 类型   | 是否必须 | 示例                                 | 描述     |
| -------- | ------ | -------- | ------------------------------------ | -------- |
| RegionId | string | 是       | 35304122-8504-400c-a61c-56ba244c5dda | 可用区id |
| Bw       | int    | 是       | 2000                                 | 带宽     |
| Iops     | int    | 是       | 8000                                 | iops     |
| Type     | string | 是       | ssd                                  | 磁盘类型 |


**返回数据：**

| 名称    | 类型   | 示例                                 | 描述                      |
| ------- | ------ | ------------------------------------ | ------------------------- |
| Code    | string | Success                              | 返回状态码: Success: 成功 |
| Message | string | null                                 | 返回信息                  |
| Data    | object | {}                                   | 返回数据                  |
| GoodsId | string | 127d4ac3-f3fc-11ea-800c-f0d4e2e923e0 | 商品id                    |


**错误码：**

| httpcode | 错误码           | 错误信息                                  | 描述                   |
| -------- | ---------------- | ----------------------------------------- | ---------------------- |
| 400      | ParameterInvalid | The parameter "RegionId" is required.     | 参数RegionId是必选项。 |
| 400      | ParameterIsEmpty | The parameter "RegionId" cannot be empty. | 参数RegionId不能为空。 |

 **返回示例**

```json
{
  "Code": "Success",
  "Message": "Success.",
  "Data": {
        "GoodsId": "b86646e9-f403-11ea-800c-f0d4e2e923e0"
    }
}
```

 **代码调用示例**

 ```python
def describe_goodsId():
   action = "DescribeGoodsId"
   method = "GET"
   param = {
       "RegionId": "35304122-8504-400c-a61c-56ba244c5dda",
       "Bw": 2000,
       "Iops": 8000,
       "Type": "ssd"
   }
   url = get_signature(action=action, ak=AK, access_key_secret=AccessKeySecret, method=method, url=BMS_DISK_URL, param=param)
   res = requests.get(url)
 ```


## 账单相关

### 1.DescribeBill

   **Action: DescribeBill**

  **描述：** 查询账单

   **请求地址:** cdsapi.capitalonline.net/billing

   **请求方法：GET**

   **请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                  | 描述                        |
| ---------- | ------ | -------- | ----------------------- | --------------------------- |
| DateFromTo | string | 是       | 2019.09.02 - 2019.09.03 | 账单区间("-"左右有一个空格) |
| Currency   | string | 是       | 账户币种(CN/US)         | 账户币种, 默认CN(人民币)    |

   **返回参数：**

| 名称            | 类型     | 示例值                               | 描述             |
| :-------------- | -------- | :----------------------------------- | :--------------- |
| Code            | Interger | Success                              | 错误码           |
| Data            | string   |                                      |                  |
| TotalMasterCost | Float    | 10.90                                | 主账户消费金额   |
| TotalViceCost   | Float    | 11.92                                | 副账户消费金额   |
| BillInfo        | List     | []                                   | 账单记录         |
| RegionId        | String   | CN_Beijing_E                         | 可用区ID         |
| ResourceId      | String   | 2e579aa0-f54f-11e9-814d-f6de00b3aa12 | 资源ID           |
| ResourceName    | String   | test                                 | 资源名称         |
| ResourceType    | String   | vm                                   | 资源类型         |
| TotalCost       | Float    | 9.62                                 | 该资源消费       |
| VdcId           | String   | b420f679-80a7-44f7-bf08-6e3bfadf3400 | 虚拟数据中心ID   |
| VdcName         | String   | testVdc                              | 虚拟数据中心名称 |
| CreateTime      | String   | 2019-10-23 12:40:04                  | 创建时间         |
| DeleteTime      | String   |                                      | 删除时间         |

  **错误码:**

| httpcode | 错误码                    | 错误信息                                            | 描述                   |
| -------- | ------------------------- | --------------------------------------------------- | ---------------------- |
| 400      | InvalidPublicId.Malformed | The specified parameter   "PrivateID" is not valid. | 指定公网Id参数格式错误 |

  **返回示例:**

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
    "Message": "bill day query success"
}
```

### 2.DescribeBillInfo

   **Action: DescribeBillInfo**

  **描述：** 查询账单

   **请求地址:** cdsapi.capitalonline.net/billing

   **请求方法：GET**

   **请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                               | 描述                     |
| ---------- | ------ | -------- | ------------------------------------ | ------------------------ |
| DateFrom   | string | 是       | 2019.09.02                           | 账单开始时间             |
| DateTo     | String | 是       | 2019.09.03                           | 账单结束时间             |
| ResourceId | String | 是       | 2e579aa0-f54f-11e9-814d-f6de00b3aa12 | 资源ID                   |
| Currency   | string | 是       | 账户币种(CN/US)                      | 账户币种, 默认CN(人民币) |

   **返回参数：**

| 名称          | 类型     | 示例值                                                       | 描述             |
| :------------ | -------- | :----------------------------------------------------------- | :--------------- |
| Code          | Interger | Success                                                      | 错误码           |
| Data          | string   |                                                              |                  |
| TotalCost     | Float    | 9.62                                                         | 查询资源总消费   |
| BillDetail    | List     | []                                                           | 账单记录         |
| RegionId      | String   | CN_Beijing_E                                                 | 可用区ID         |
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
| ProjectName   | string   | 默认项目组                                                   | 项目名称         |
| ProjectId     | string   | 0-0                                                          | 项目id           |

  **返回示例:**

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
                "VdcName": "北京五",
                "ProjectId": "0-0",
                "ProjectName": "默认项目组"
            }
        ],
        "TotalCost": 9.62
    },
    "Message": "bill details query success"
}
```

### 3.DescribeBillDetail

   **Action: DescribeBillDetail**

  **描述：** 查询账单

   **请求地址:** cdsapi.capitalonline.net/billing

   **请求方法：GET**

   **请求参数：**

| 名称        | 类型   | 是否必选 | 示例值     | 描述                                                   |
| ----------- | ------ | -------- | ---------- | ------------------------------------------------------ |
| DateFrom    | string | 是       | 2021.10.01 | 开始日期（大于2019.01.01）                             |
| DateTo      | string | 是       | 2021.10.31 | 结束日期（大于2019.01.01）开始日期到结束日期不超过31天 |
| ProjectName | string | 否       | 默认项目组 | 项目名称                                               |

   **返回参数：**

| 参数         | 参数类型 | 含义                             |
| ------------ | -------- | -------------------------------- |
| Code         | string   | 返回码                           |
| Message      | string   | 返回信息                         |
| Data         | dict     | 返回数据字典                     |
| TotalSummary | dict     | 总消费数据字典                   |
| TotalRecords | int      | 账单总条数                       |
| TotalCost    | float    | 总消费                           |
| ViceCost     | float    | 副账户消费                       |
| MasterCost   | float    | 主账户消费                       |
| ToDeduct     | float    | 待扣金额                         |
| BillDetail   | list     | 账单详情                         |
| Site         | string   | 站点                             |
| APP          | string   | 虚拟数据中心名称                 |
| PublicIp     | string   | 公网ip                           |
| Currency     | string   | 币种（”CN“：人民币，”US“：美元） |
| Label        | string   | 云服务器标签                     |
| Project      | string   | 项目组名称                       |
| PrivateIp    | string   | 私网ip                           |
| GoodsType    | string   | 商品类型                         |
| CloudId      | string   | 资源id                           |
| TotalCost    | float    | 总费用                           |
| BillType     | string   | 计费方式                         |
| Config       | string   | 配置详情                         |
| Product      | string   | 商品名称                         |
| Resource     | string   | 资源名称                         |
| BeginTime    | string   | 开始时间                         |
| EndTime      | string   | 结束时间                         |

  **返回示例:**

```json
{
  "Code": "success",
  "Data": {
    "BeginTime": "2021.10.01",
    "BillDetail": [
      {
        "APP": "",
        "BeginTime": "2021-10-01 00:00:00",
        "BillType": "包年包月计费",
        "CloudId": "2c6cc7f7731228f2daef4bbde87552c6",
        "Config": "网页加速-HTTPS:0GB,下载加速-HTTPS:0GB,动态加速-HTTP:0GB,点播加速-HTTP:0GB,下载加速-HTTP:0GB,直播加速:0GB,网页加速-HTTP:0GB,点播加速-HTTPS:0GB,动态加速-HTTPS:0Gb",
        "Currency": "CN",
        "EndTime": "2021-11-01 00:00:00",
        "GoodsType": "CDN",
        "Label": "",
        "Product": "CDN-V2-中国大陆-流量",
        "Project": "默认项目组",
        "Resource": "CDN-V2-中国大陆-流量",
        "Site": "",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-08 00:00:00",
        "BillType": "包年包月计费",
        "CloudId": "2c6cc7f7731228f2daef4bbde87552c6",
        "Config": "网页加速-HTTPS:0GB,下载加速-HTTPS:0GB,动态加速-HTTP:0GB,点播加速-HTTP:0GB,下载加速-HTTP:0GB,直播加速:0GB,网页加速-HTTP:0GB,点播加速-HTTPS:0GB,动态加速-HTTPS:0Gb",
        "Currency": "CN",
        "EndTime": "2021-11-08 00:00:00",
        "GoodsType": "CDN",
        "Label": "",
        "Product": "CDN-V2-中国大陆-流量",
        "Project": "默认项目组",
        "Resource": "CDN-V2-中国大陆-流量",
        "Site": "",
        "TotalCost": "0.00"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-01 00:00:00",
        "BillType": "按需付费",
        "CloudId": "3a5827b6-0b9b-11ec-95e0-ae64e33724df",
        "Config": "5Mb",
        "Currency": "CN",
        "EndTime": "2021-10-11 16:01:44",
        "GoodsType": "带宽",
        "Label": "",
        "Product": "电信-固定带宽",
        "Project": "默认项目组",
        "Resource": "公网1",
        "Site": "北京A",
        "TotalCost": "0.00"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-11 16:01:44",
        "BillType": "按需付费",
        "CloudId": "3a5827b6-0b9b-11ec-95e0-ae64e33724df",
        "Config": "10Mb",
        "Currency": "CN",
        "EndTime": "2021-10-11 16:05:04",
        "GoodsType": "带宽",
        "Label": "",
        "Product": "电信-固定带宽",
        "Project": "默认项目组",
        "Resource": "公网1",
        "Site": "北京A",
        "TotalCost": "0.06"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-11 16:05:04",
        "BillType": "按需付费",
        "CloudId": "3a5827b6-0b9b-11ec-95e0-ae64e33724df",
        "Config": "5Mb",
        "Currency": "CN",
        "EndTime": "2021-10-31 00:00:00",
        "GoodsType": "带宽",
        "Label": "",
        "Product": "电信-固定带宽",
        "Project": "默认项目组",
        "Resource": "公网1",
        "Site": "北京A",
        "TotalCost": "0.00"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-01 00:00:00",
        "BillType": "按需付费",
        "CloudId": "3aee2e8c-0b9b-11ec-9450-e2cb0b669b1c",
        "Config": "4个",
        "Currency": "CN",
        "EndTime": "2021-10-31 00:00:00",
        "GoodsType": "公网IP",
        "Label": "",
        "Product": "单线IP",
        "Project": "默认项目组",
        "Resource": "ip",
        "Site": "北京A",
        "TotalCost": "159.90"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-09 11:27:01",
        "BillType": "按需付费",
        "CloudId": "4aa49175-8ef1-4939-a043-3b6ce54527a0",
        "Config": "内存:16GB,操作系统:CDS-OS-CentOS8.2-64bit-Public-V7,vCPU:4C,性能型系统盘:20GB",
        "Currency": "CN",
        "EndTime": "2021-10-09 11:28:29",
        "GoodsType": "云主机",
        "Label": "",
        "Product": "通用型云主机g3v2",
        "Project": "默认项目组",
        "Resource": "买2台",
        "Site": "北京A",
        "TotalCost": "0.03"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-09 11:28:29",
        "BillType": "按需付费",
        "CloudId": "4aa49175-8ef1-4939-a043-3b6ce54527a0",
        "Config": "性能型系统盘:20GB,内存:16GB,操作系统:CDS-OS-CentOS8.2-64bit-Public-V7,vCPU:4C",
        "Currency": "CN",
        "EndTime": "2021-10-09 11:28:39",
        "GoodsType": "云主机",
        "Label": "",
        "Product": "通用型云主机g3v2",
        "Project": "默认项目组",
        "Resource": "买2台",
        "Site": "北京A",
        "TotalCost": "0.00"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-26 18:48:20",
        "BillType": "按需付费",
        "CloudId": "632a36b4-20bb-4b5e-a07b-100fdd28944f",
        "Config": "CPU:2C,RAM:4GB,CPU:2C,SSD磁盘:100GB,SSD磁盘:100GB,RAM:4GB",
        "Currency": "CN",
        "EndTime": "2021-10-27 00:00:00",
        "GoodsType": "关系型数据库",
        "Label": "",
        "Product": "云数据库MySQL高可用版v2",
        "Project": "默认项目组",
        "Resource": "mysql-2021-10-26-QlkVh",
        "Site": "北京A",
        "TotalCost": "6.42"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-27 00:00:00",
        "BillType": "按需付费",
        "CloudId": "632a36b4-20bb-4b5e-a07b-100fdd28944f",
        "Config": "SSD磁盘:100GB,RAM:4GB,CPU:2C,RAM:4GB,SSD磁盘:100GB,CPU:2C",
        "Currency": "CN",
        "EndTime": "2021-10-28 00:00:00",
        "GoodsType": "关系型数据库",
        "Label": "",
        "Product": "云数据库MySQL高可用版v2",
        "Project": "默认项目组",
        "Resource": "mysql-2021-10-26-QlkVh",
        "Site": "北京A",
        "TotalCost": "29.76"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-28 00:00:00",
        "BillType": "按需付费",
        "CloudId": "632a36b4-20bb-4b5e-a07b-100fdd28944f",
        "Config": "RAM:4GB,CPU:2C,SSD磁盘:100GB,RAM:4GB,CPU:2C,SSD磁盘:100GB",
        "Currency": "CN",
        "EndTime": "2021-10-28 17:04:35",
        "GoodsType": "关系型数据库",
        "Label": "",
        "Product": "云数据库MySQL高可用版v2",
        "Project": "默认项目组",
        "Resource": "mysql-2021-10-26-QlkVh",
        "Site": "北京A",
        "TotalCost": "21.16"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-11 16:01:44",
        "BillType": "按需付费",
        "CloudId": "6cd5bb9e-2a69-11ec-a5f1-42330aefd4e3",
        "Config": "4个",
        "Currency": "CN",
        "EndTime": "2021-10-11 16:04:20",
        "GoodsType": "公网IP",
        "Label": "",
        "Product": "单线IP",
        "Project": "默认项目组",
        "Resource": "ip",
        "Site": "北京A",
        "TotalCost": "0.01"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-01 00:00:00",
        "BillType": "按需付费",
        "CloudId": "7ee393bf0eef576799f288c9f6ea2256",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.001万次,OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-02 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "111",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-02 00:00:00",
        "BillType": "按需付费",
        "CloudId": "7ee393bf0eef576799f288c9f6ea2256",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_标签:0.0万个,OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-03 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "111",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-03 00:00:00",
        "BillType": "按需付费",
        "CloudId": "7ee393bf0eef576799f288c9f6ea2256",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-04 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "111",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-04 00:00:00",
        "BillType": "按需付费",
        "CloudId": "7ee393bf0eef576799f288c9f6ea2256",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_写及其它请求计费:0.0万次,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_外网流出:0.0GB,OSS_new_存储空间:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-05 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "111",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-05 00:00:00",
        "BillType": "按需付费",
        "CloudId": "7ee393bf0eef576799f288c9f6ea2256",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-06 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "111",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-06 00:00:00",
        "BillType": "按需付费",
        "CloudId": "7ee393bf0eef576799f288c9f6ea2256",
        "Config": "OSS_new_外网流出:0.0GB,OSS_new_存储空间:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-07 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "111",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-07 00:00:00",
        "BillType": "按需付费",
        "CloudId": "7ee393bf0eef576799f288c9f6ea2256",
        "Config": "OSS_new_写及其它请求计费:0.0万次,OSS_new_标签:0.0万个,OSS_new_CDN 回源流量:0.0GB,OSS_new_请求-读请求计费-GET:0.001万次,OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-08 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "111",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-08 00:00:00",
        "BillType": "按需付费",
        "CloudId": "7ee393bf0eef576799f288c9f6ea2256",
        "Config": "OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-09 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "111",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-09 00:00:00",
        "BillType": "按需付费",
        "CloudId": "7ee393bf0eef576799f288c9f6ea2256",
        "Config": "OSS_new_存储空间:0.0GB,OSS_new_CDN 回源流量:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-10 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "111",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-10 00:00:00",
        "BillType": "按需付费",
        "CloudId": "7ee393bf0eef576799f288c9f6ea2256",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_标签:0.0万个",
        "Currency": "CN",
        "EndTime": "2021-10-11 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "111",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-11 00:00:00",
        "BillType": "按需付费",
        "CloudId": "7ee393bf0eef576799f288c9f6ea2256",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-11 16:06:13",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "111",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-01 00:00:00",
        "BillType": "包年包月计费",
        "CloudId": "7f938c1974a127bc462a45b2edcc5b04",
        "Config": "动态加速-HTTP:0GB,直播加速:0GB,下载加速-HTTPS:0GB,网页加速-HTTPS:0GB,点播加速-HTTP:0GB,下载加速-HTTP:0GB,网页加速-HTTP:0GB,点播加速-HTTPS:0GB,动态加速-HTTPS:0GB",
        "Currency": "CN",
        "EndTime": "2021-11-01 00:00:00",
        "GoodsType": "CDN",
        "Label": "",
        "Product": "CDN-V2-海外-流量",
        "Project": "默认项目组",
        "Resource": "CDN-V2-海外-流量",
        "Site": "",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-01 00:00:00",
        "BillType": "按需付费",
        "CloudId": "88d6a9c0-f8eb-11eb-97f5-562e7f031744",
        "Config": "同城首次免费：5.0Mb，<br>区间线路：北京-北京;",
        "Currency": "CN",
        "EndTime": "2021-10-11 11:28:49",
        "GoodsType": "云互联网络",
        "Label": "",
        "Product": "云互联网络组-峰值型",
        "Project": "项目01",
        "Resource": "云互联",
        "Site": "",
        "TotalCost": "0.00"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-26 11:29:30",
        "BillType": "按需付费",
        "CloudId": "9b8e038c-19f4-458e-89d8-7e7b76f7c947",
        "Config": "内存:1GB",
        "Currency": "CN",
        "EndTime": "2021-10-28 17:04:47",
        "GoodsType": "非关系型数据库",
        "Label": "",
        "Product": "Redis经济型主从v2",
        "Project": "默认项目组",
        "Resource": "这是redis的一个实例",
        "Site": "北京A",
        "TotalCost": "11.24"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-08 00:00:00",
        "BillType": "包年包月计费",
        "CloudId": "b57abfdf-32a8-4c8a-9d84-ee5312647c80",
        "Config": "操作系统:CDS-OS-CentOS8.2-64bit-Public-V7,系统硬盘:20GB,vCPU:4C,内存:8GB",
        "Currency": "CN",
        "EndTime": "2021-11-08 00:00:00",
        "GoodsType": "云主机",
        "Label": "",
        "Product": "标准型云主机",
        "Project": "默认项目组",
        "Resource": "包月升降配",
        "Site": "北京A",
        "TotalCost": "354.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-29 18:05:30",
        "BillType": "包年包月计费",
        "CloudId": "bee1deba-389f-11ec-95fb-0e937cc906ef",
        "Config": "下行流量8点-24点:0GB,下行流量0点-8点:0GB,请求次数:0万次,冷数据取回量:0GB,存储空间:1024GB",
        "Currency": "CN",
        "EndTime": "2021-11-01 00:00:00",
        "GoodsType": "冷云存储",
        "Label": "",
        "Product": "冷云存储-河北",
        "Project": "默认项目组",
        "Resource": "leng",
        "Site": "",
        "TotalCost": "2.15"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-29 18:05:30",
        "BillType": "按需付费",
        "CloudId": "bee1deba-389f-11ec-95fb-0e937cc906ef",
        "Config": "存储空间:0.0GB,请求次数:0.0万次,下行流量8点-24点:0.0GB,冷数据取回量:0.0GB,下行流量0点-8点:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-30 00:00:00",
        "GoodsType": "冷云存储",
        "Label": "",
        "Product": "冷云存储-河北",
        "Project": "默认项目组",
        "Resource": "leng",
        "Site": "",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-30 00:00:00",
        "BillType": "按需付费",
        "CloudId": "bee1deba-389f-11ec-95fb-0e937cc906ef",
        "Config": "存储空间:1024.0GB,请求次数:0.0万次,下行流量8点-24点:0.0GB,冷数据取回量:0.0GB,下行流量0点-8点:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-31 00:00:00",
        "GoodsType": "冷云存储",
        "Label": "",
        "Product": "冷云存储-河北",
        "Project": "默认项目组",
        "Resource": "leng",
        "Site": "",
        "TotalCost": "0.00"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-26 18:49:18",
        "BillType": "按需付费",
        "CloudId": "c6758c88-f89e-4da6-9a87-c0f33e92c505",
        "Config": "CPU:1C,RAM:2GB,CPU:1C,RAM:2GB",
        "Currency": "CN",
        "EndTime": "2021-10-27 00:00:00",
        "GoodsType": "四层负载均衡",
        "Label": "",
        "Product": "LVS v2",
        "Project": "默认项目组",
        "Resource": "LVS-2021-10-26-YVZqa",
        "Site": "北京A",
        "TotalCost": "1.46"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-27 00:00:00",
        "BillType": "按需付费",
        "CloudId": "c6758c88-f89e-4da6-9a87-c0f33e92c505",
        "Config": "RAM:2GB,CPU:1C,RAM:2GB,CPU:1C",
        "Currency": "CN",
        "EndTime": "2021-10-28 17:04:12",
        "GoodsType": "四层负载均衡",
        "Label": "",
        "Product": "LVS v2",
        "Project": "默认项目组",
        "Resource": "LVS-2021-10-26-YVZqa",
        "Site": "北京A",
        "TotalCost": "11.80"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-26 18:59:38",
        "BillType": "按需付费",
        "CloudId": "c7fb262f-d8ff-4b77-91d9-f95356dbe63f",
        "Config": "CPU:1C,RAM:2GB,CPU:1C,RAM:2GB",
        "Currency": "CN",
        "EndTime": "2021-10-27 00:00:00",
        "GoodsType": "负载均衡",
        "Label": "",
        "Product": "HaProxy v2",
        "Project": "默认项目组",
        "Resource": "HaProxy-2021-10-26-rFYpm",
        "Site": "北京A",
        "TotalCost": "1.42"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-27 00:00:00",
        "BillType": "按需付费",
        "CloudId": "c7fb262f-d8ff-4b77-91d9-f95356dbe63f",
        "Config": "RAM:2GB,CPU:1C,RAM:2GB,CPU:1C",
        "Currency": "CN",
        "EndTime": "2021-10-28 17:04:05",
        "GoodsType": "负载均衡",
        "Label": "",
        "Product": "HaProxy v2",
        "Project": "默认项目组",
        "Resource": "HaProxy-2021-10-26-rFYpm",
        "Site": "北京A",
        "TotalCost": "11.80"
      },
      {
        "APP": "云主机虚拟数据中心01",
        "BeginTime": "2021-10-26 19:03:15",
        "BillType": "按需付费",
        "CloudId": "d87047a0-364b-11ec-abf8-0242ac110002",
        "Config": "系统盘:60GB,cpu:4C,系统盘:60GB,cpu:4C,系统盘:60GB,cpu:4C,性能盘:100GB,内存:8GB,性能盘:100GB,性能盘:100GB,内存:8GB,内存:8GB",
        "Currency": "CN",
        "EndTime": "2021-10-27 00:00:00",
        "GoodsType": "消息引擎",
        "Label": "",
        "Product": "消息引擎Kafka v2",
        "Project": "默认项目组",
        "Resource": "消息引擎Kafka v2",
        "Site": "北京H",
        "TotalCost": "19.14"
      },
      {
        "APP": "云主机虚拟数据中心01",
        "BeginTime": "2021-10-27 00:00:00",
        "BillType": "按需付费",
        "CloudId": "d87047a0-364b-11ec-abf8-0242ac110002",
        "Config": "系统盘:60GB,cpu:4C,系统盘:60GB,cpu:4C,系统盘:60GB,cpu:4C,性能盘:100GB,性能盘:100GB,内存:8GB,内存:8GB,性能盘:100GB,内存:8GB",
        "Currency": "CN",
        "EndTime": "2021-10-28 00:00:00",
        "GoodsType": "消息引擎",
        "Label": "",
        "Product": "消息引擎Kafka v2",
        "Project": "默认项目组",
        "Resource": "消息引擎Kafka v2",
        "Site": "北京H",
        "TotalCost": "93.09"
      },
      {
        "APP": "云主机虚拟数据中心01",
        "BeginTime": "2021-10-28 00:00:00",
        "BillType": "按需付费",
        "CloudId": "d87047a0-364b-11ec-abf8-0242ac110002",
        "Config": "cpu:4C,性能盘:100GB,cpu:4C,性能盘:100GB,内存:8GB,性能盘:100GB,内存:8GB,内存:8GB,系统盘:60GB,系统盘:60GB,cpu:4C,系统盘:60GB",
        "Currency": "CN",
        "EndTime": "2021-10-29 00:00:00",
        "GoodsType": "消息引擎",
        "Label": "",
        "Product": "消息引擎Kafka v2",
        "Project": "默认项目组",
        "Resource": "消息引擎Kafka v2",
        "Site": "北京H",
        "TotalCost": "93.09"
      },
      {
        "APP": "云主机虚拟数据中心01",
        "BeginTime": "2021-10-29 00:00:00",
        "BillType": "按需付费",
        "CloudId": "d87047a0-364b-11ec-abf8-0242ac110002",
        "Config": "cpu:4C,cpu:4C,内存:8GB,内存:8GB,内存:8GB,系统盘:60GB,系统盘:60GB,系统盘:60GB,性能盘:100GB,性能盘:100GB,性能盘:100GB,cpu:4C",
        "Currency": "CN",
        "EndTime": "2021-10-29 14:50:12",
        "GoodsType": "消息引擎",
        "Label": "",
        "Product": "消息引擎Kafka v2",
        "Project": "默认项目组",
        "Resource": "消息引擎Kafka v2",
        "Site": "北京H",
        "TotalCost": "57.60"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-01 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-02 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-02 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_标签:0.0万个,OSS_new_CDN 回源流量:0.0GB,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_外网流出:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-03 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-03 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_标签:0.0万个,OSS_new_CDN 回源流量:0.0GB,OSS_new_请求-读请求计费-GET:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-04 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-04 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_标签:0.0万个,OSS_new_存储空间:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_外网流出:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-05 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-05 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_CDN 回源流量:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-06 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-06 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_写及其它请求计费:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-07 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-07 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_写及其它请求计费:0.0万次,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB,OSS_new_标签:0.0万个,OSS_new_CDN 回源流量:0.0GB,OSS_new_外网流出:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-08 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-08 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_外网流出:0.0GB,OSS_new_存储空间:0.0GB,OSS_new_写及其它请求计费:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-09 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-09 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-10 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-10 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_写及其它请求计费:0.0万次,OSS_new_存储空间:0.0GB,OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_外网流出:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-11 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-11 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_CDN 回源流量:0.0GB,OSS_new_存储空间:0.0GB,OSS_new_标签:0.0万个,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-12 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-12 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个",
        "Currency": "CN",
        "EndTime": "2021-10-13 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-13 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_CDN 回源流量:0.0GB,OSS_new_外网流出:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-14 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-14 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_外网流出:0.0GB,OSS_new_存储空间:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-15 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-15 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_标签:0.0万个,OSS_new_CDN 回源流量:0.0GB,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_写及其它请求计费:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-16 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-16 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_标签:0.0万个,OSS_new_写及其它请求计费:0.0万次,OSS_new_CDN 回源流量:0.0GB,OSS_new_请求-读请求计费-GET:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-17 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-17 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_标签:0.0万个,OSS_new_写及其它请求计费:0.0万次,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_CDN 回源流量:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-18 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-18 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_写及其它请求计费:0.0万次,OSS_new_存储空间:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-19 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-19 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_外网流出:0.0GB,OSS_new_存储空间:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个",
        "Currency": "CN",
        "EndTime": "2021-10-20 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-20 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-21 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-21 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_标签:0.0万个,OSS_new_存储空间:0.0GB,OSS_new_CDN 回源流量:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_写及其它请求计费:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-22 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-22 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_存储空间:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_外网流出:0.0GB,OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-23 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-23 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_外网流出:0.0GB,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_写及其它请求计费:0.0万次,OSS_new_存储空间:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-24 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-24 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_外网流出:0.0GB,OSS_new_存储空间:0.0GB,OSS_new_写及其它请求计费:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-25 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-25 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_写及其它请求计费:0.0万次,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_CDN 回源流量:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-26 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-26 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_标签:0.0万个,OSS_new_外网流出:0.0GB,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_CDN 回源流量:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_存储空间:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-27 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-27 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_CDN 回源流量:0.0GB,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-28 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-28 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_CDN 回源流量:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_标签:0.0万个,OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB",
        "Currency": "CN",
        "EndTime": "2021-10-29 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-29 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_存储空间:0.0GB,OSS_new_CDN 回源流量:0.0GB,OSS_new_外网流出:0.0GB,OSS_new_标签:0.0万个,OSS_new_写及其它请求计费:0.0万次",
        "Currency": "CN",
        "EndTime": "2021-10-30 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "",
        "BeginTime": "2021-10-30 00:00:00",
        "BillType": "按需付费",
        "CloudId": "ef211673a5ab58199ec1be3a7a63236f",
        "Config": "OSS_new_请求-读请求计费-GET:0.0万次,OSS_new_外网流出:0.0GB,OSS_new_存储空间:0.0GB,OSS_new_CDN 回源流量:0.0GB,OSS_new_写及其它请求计费:0.0万次,OSS_new_标签:0.0万个",
        "Currency": "CN",
        "EndTime": "2021-10-31 00:00:00",
        "GoodsType": "新对象存储",
        "Label": "",
        "Product": "新对象存储",
        "Project": "默认项目组",
        "Resource": "www",
        "Site": "北京E",
        "TotalCost": "0.00"
      },
      {
        "APP": "北京A云主机",
        "BeginTime": "2021-10-09 11:27:04",
        "BillType": "按需付费",
        "CloudId": "ffb63aa3-af79-4da5-ac4d-8938e9415f6a",
        "Config": "性能型系统盘:20GB,内存:16GB,操作系统:CDS-OS-CentOS8.2-64bit-Public-V7,vCPU:4C",
        "Currency": "CN",
        "EndTime": "2021-10-09 11:28:56",
        "GoodsType": "云主机",
        "Label": "",
        "Product": "通用型云主机g3v2",
        "Project": "默认项目组",
        "Resource": "买2台",
        "Site": "北京A",
        "TotalCost": "0.03"
      }
    ],
    "EndTime": "2021.10.30",
    "TotalRecords": 69,
    "TotalSummary": {
      "Currency": "CN",
      "MasterCost": 0,
      "ToDeduct": 0,
      "TotalCost": 874.16,
      "ViceCost": 874.16
    }
  },
  "Message": "账单详情数据获取成功"
}
```

### 4.DescribeAccountInfo

   **Action: DescribeAccountInfo**

  **描述：** 查询主账户余额，充值记录以及消费概况

   **请求地址:** cdsapi.capitalonline.net/billing

   **请求方法：GET**

   **请求参数：** 无

**返回参数：**

| 参数               | 参数类型 | 含义             |
| ------------------ | -------- | ---------------- |
| Code               | string   | 返回码           |
| Message            | string   | 返回信息         |
| Data               | dict     | 返回数据字典     |
| MasterTotalBalance | float    | 主账户余额       |
| CreditLine         | float    | 信用额度         |
| ToDeduct           | float    | 待扣金额         |
| RechargeCount      | int      | 主账户充值次数   |
| RechargeRecord     | list     | 主账户充值记录   |
| Currency           | string   | 币种             |
| Amount             | float    | 主账户充值金额   |
| SwiftNumber        | string   | 流水号           |
| CreateDate         | string   | 充值日期         |
| Type               | string   | 充值方式         |
| MasterTotalCost    | float    | 主账户消费金额   |
| CostCount          | int      | 主账户消费月数   |
| CostRecords        | list     | 主账户月消费记录 |
| Month              | string   | 消费月时间       |
| Currency           | string   | 币种             |
| Amount             | float    | 主账户月消费金额 |

  **返回示例:**

```json
{
  "Code": "success",
  "Data": {
    "CostCount": 5,
    "CostRecords": [
      {
        "Amount": 0,
        "Currency": "CN",
        "Month": "202107"
      },
      {
        "Amount": 0,
        "Currency": "CN",
        "Month": "202108"
      },
      {
        "Amount": 0,
        "Currency": "CN",
        "Month": "202109"
      },
      {
        "Amount": 0,
        "Currency": "CN",
        "Month": "202110"
      },
      {
        "Amount": 0.01,
        "Currency": "CN",
        "Month": "202111"
      }
    ],
    "CreditLine": 0,
    "MasterTotalBalance": 0,
    "MasterTotalCost": 0.01,
    "RechargeCount": 1,
    "RechargeRecord": [
      {
        "Amount": 0.01,
        "CreateDate": "2021-11-16 11:04:25",
        "Currency": "CN",
        "SwiftNumber": "202111161104036848",
        "Type": "线上充值"
      }
    ],
    "ToDeduct": 16.63
  },
  "Message": "主账户的剩余金额、待扣金额、充值记录、消费金额以及月消费金额获取成功"
}
```

### 5.DescribeCostSummaryByPro

**Action: DescribeCostSummaryByPro**

 **描述：** 获取以产品为维度的汇总账单

**请求地址:** cdsapi.capitalonline.net/billing

**请求方法：GET**

**请求参数：**

| 名称     | 类型   | 是否必选 | 示例值          | 描述                     |
| -------- | ------ | -------- | --------------- | ------------------------ |
| DateFrom | string | 是       | 2022-10-01      | 账单开始时间             |
| DateTo   | string | 是       | 2022-10-17      | 账单结束时间             |
| Currency | string | 是       | 账户币种(CN/US) | 账户币种, 默认CN(人民币) |

**返回示例**

| 参数            | 参数类型 | 示例值               | 含义           |
| --------------- | -------- | -------------------- | -------------- |
| Code            | string   | Success              | 返回码         |
| Message         | string   | 获取产品账单汇总成功 | 返回信息       |
| Data            | dict     | {}                   | 返回数据字典   |
| TotalSummary    | dict     | {}                   | 汇总消费金额   |
| Currency        | string   | CN                   | 币种           |
| TotalCost       | float    | 333.0                | 总消费金额     |
| MasterCost      | float    | 333.0                | 主账户消费金额 |
| ViceCost        | float    | 0.0                  | 副账户消费金额 |
| ToDeduct        | float    | 0.0                  | 代扣金额       |
| BillInfo        | list     |                      | 账单信息       |
| TotalMasterCost | float    | 10.90                | 主账户消费金额 |
| TotalViceCost   | float    | 11.92                | 副账户消费金额 |
| TotalCost       | float    | 22.82                | 客户总消费金额 |
| ToDeduct        | float    | 0.0                  | 代扣金额       |
| Currency        | string   | CN                   | 币种           |
| ProductName     | string   | 云服务器             | 产品名称       |
| ProductType     | string   | vm                   | 产品类型       |
| ResourceCount   | int      | 1                    | 产品资源数量   |

**成功**

```json
{
    "Code": "Success",
    "Data": {
       "TotalSummary": {
           "TotalCost": 333.0,
           "MasterCost": 333.0,
           "ViceCost": 0.0,
           "ToDeduct": 0.0,
           "Currency": "CN"
        },
        "BillInfo": [
            {
                "TotalCost": 9.62,
                "TotalMasterCost": 9.62,
                "TotalViceCost": 9.62,
                "Currency": "CN",
                "ToDeduct": 0.0,
                "ProductName": "云服务器",
                "ProductType": "vm",
                "ResourceCount": 1
            }
        ]
    },
    "Message": "获取产品账单汇总成功",
}
```

### 6.DescribeCostSummaryByProject

**Action: DescribeCostSummaryByProject**

 **描述：** 获取以项目为维度的汇总账单

**请求地址:** cdsapi.capitalonline.net/billing

**请求方法：GET**

**请求参数：**

| 名称     | 类型   | 是否必选 | 示例值          | 描述                     |
| -------- | ------ | -------- | --------------- | ------------------------ |
| DateFrom | string | 是       | 2022-10-01      | 账单开始时间             |
| DateTo   | string | 是       | 2022-10-17      | 账单结束时间             |
| Currency | string | 是       | 账户币种(CN/US) | 账户币种, 默认CN(人民币) |

**返回示例**

| 参数            | 参数类型 | 示例值               | 含义           |
| --------------- | -------- | -------------------- | -------------- |
| Code            | string   | Success              | 返回码         |
| Message         | string   | 获取产品账单汇总成功 | 返回信息       |
| Data            | dict     | {}                   | 返回数据字典   |
| TotalSummary    | dict     | {}                   | 汇总消费金额   |
| Currency        | string   | CN                   | 币种           |
| TotalCost       | float    | 333.0                | 总消费金额     |
| MasterCost      | float    | 333.0                | 主账户消费金额 |
| ViceCost        | float    | 0.0                  | 副账户消费金额 |
| ToDeduct        | float    | 0.0                  | 代扣金额       |
| BillInfo        | list     |                      | 账单信息       |
| Currency        | string   | CN                   | 币种           |
| TotalMasterCost | float    | 10.90                | 主账户消费金额 |
| TotalViceCost   | float    | 11.92                | 副账户消费金额 |
| TotalCost       | float    | 22.82                | 客户总消费金额 |
| ToDeduct        | float    | 0.0                  | 代扣金额       |
| ProjectName     | string   | 测试项目0-0          | 项目名称       |
| ProjectId       | string   | 0-0                  | 项目类型       |
| ResourceCount   | int      | 1                    | 项目资源数量   |

**成功**

```json
{
    "Code": "Success",
    "Data": {
        "TotalSummary": {
            "TotalCost": 333.0,
            "MasterCost": 333.0,
            "ViceCost": 0.0,
            "ToDeduct": 0.0,
            "Currency": "CN"
        },
        "BillInfo": [
            {
               "TotalCost": 9.62,
                "TotalMasterCost": 9.62,
                "TotalViceCost": 9.62,
                "ToDeduct": 0.0,
                "Currency": "CN",
                "ProjectId": "c3e4945c-1314-11ed-bed4-b6888a4026a1",
                "ProjectName": "555",
                "ResourceCount": 1
            }
        ]
    },
    "Message": "获取项目账单汇总成功",
}
```

## 冷云计量相关

### 1.GetMetering

   **Action: GetMetering**

  **描述：** 获取客户一个或多个存储池计量信息

   **请求地址:** cdsapi.capitalonline.net/ccs-product

   **请求方法：GET**

   **请求参数：**

| 名称    | 类型   | 是否必选 | 示例值     | 描述                         |
| ------- | ------ | -------- | ---------- | ---------------------------- |
| EndTime | string | 是       | "20191101" | 获取截止到EndTime的计量信息  |
| Uid     | string | 否       | "1001"     | 单独获取这个存储池的计量信息 |

   **返回参数：**

| 名称    | 类型   | 示例值    | 描述         |
| :------ | ------ | :-------- | :----------- |
| Code    | string | Success   | 错误码       |
| Message | string | uid不存在 | 错误信息     |
| Data    | string | []        | 客户计量信息 |

  **错误码:**

| httpcode | 错误码                  | 错误信息         | 描述               |
| -------- | ----------------------- | ---------------- | ------------------ |
| 400      | InvalidParamater        | 非法的CustomerId | 非法的CustomerId。 |
| 400      | InvalidParamater        | uid不存在        | uid不存在          |
| 400      | InvalidParameter.IsNull | 缺少必要参数     | 缺少必要参数       |

  **返回示例:**

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

  **请求调用示例**

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

## 网络告警相关

### 1.GetWanAlarmReceiver

   **Action: GetWanAlarmReceiver**

  **描述：** 获取网络告警全部联系人或某个告警组的联系人

   **请求地址:** cdsapi.capitalonline.net/network

   **请求方法：POST**

   **请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                                 | 描述                                                         |
| ---------- | ------ | -------- | -------------------------------------- | ------------------------------------------------------------ |
| ObjGroupId | string | 否       | "6541d60c-d71f-11ec-b673-0242ac110033" | 获取特定监控组或全部告警联系人，获取全部告警联系人传递空字符串 |

   **返回参数：**

| 名称         | 类型   | 示例值                               | 描述                              |
| :----------- | ------ | :----------------------------------- | :-------------------------------- |
| Code         | string | Success                              | 错误码                            |
| Message      | string | 获取联系人成功                       | 错误信息                          |
| Data         | object | []                                   | 告警联系人数据列表                |
| ReceiverId   | string | 40abe08e-5073-11e9-b148-0242ac1103aa | 告警联系人ID                      |
| ReceiverMail | string | san.zhang@capitalonline.net          | 告警联系人邮件                    |
| ReceiverName | string | zhangsan                             | 告警联系人手机联系方式code+手机号 |
| ReceiverTel  | string | (+86)13322221111                     | 告警联系人名称                    |
| UsedByNow    | bool   | False                                | 告警联系人是否在当前监控组        |
| UsedByOther  | bool   | True                                 | 其他监控组是否使用该告警联系人    |

   **错误码:**

| httpcode | 错误码                  | 错误信息     | 描述         |
| -------- | ----------------------- | ------------ | ------------ |
| 400      | InvalidParameter.IsNull | 缺少必要参数 | 缺少必要参数 |

   **返回示例:**

```json
{
    "Code":"Success",
    "Message":"获取联系人成功",
    "Data":[
        {
            "ReceiverId":"40abe08e-5073-11e9-b148-0242ac1103aa",
            "ReceiverMail":"san.zhang@capitalonline.net",
            "ReceiverName":"zhangsan",
            "ReceiverTel":"(+86)13322221111",
            "UsedByNow":false,
            "UsedByOther":false
        }
    ]
 
}
```

   **请求调用示例**

```python
def get_all_receivers():
    NETWORK_URL = 'http://cdsapi.capitalonline.net/network'
    action = 'GetWanAlarmReceiver'
    method = "POST"
    param = {}
    AK = '您的ak值'
    AccessKeySecret = '您的AccessKeySecret值'
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "ObjGroupId":"",
    }
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    return result
```

### 2.UpdateWanAlarmReceiver

   **Action: UpdateWanAlarmReceiver**

  **描述：** 更新特定联系人联系方式

   **请求地址:** cdsapi.capitalonline.net/network

   **请求方法：POST**

   **请求参数：**

| 名称       | 类型   | 是否必选 | 示例值                                 | 描述                    |
| ---------- | ------ | -------- | -------------------------------------- | ----------------------- |
| ReceiverId | string | 是       | "a09855ea-15f6-11ec-bd9c-ce61e0b35aaa" | 联系人ID                |
| Email      | string | 否       | san.zhang@capitalonline.net            | 联系人邮箱              |
| Mobile     | string | 否       | 13322221111                            | 联系人手机号            |
| Code       | string | 否       | +86                                    | 可选择值 +86（国内)、+1 |


   **返回参数：**

| 名称    | 类型   | 示例值         | 描述     |
| :------ | ------ | :------------- | :------- |
| Code    | string | Success        | 错误码   |
| Message | string | 获取联系人成功 | 错误信息 |
| Data    | object | {}             |          |

   **错误码:**

| httpcode | 错误码          | 错误信息     | 描述         |
| -------- | --------------- | ------------ | ------------ |
| 400      | Parameter Error | 邮箱格式异常 | 邮箱格式异常 |
| 400      | Parameter Error | 手机格式异常 | 邮箱格式异常 |

   **返回示例:**

```json
{
    "Code":"Success",
    "Message":"success",
    "Data":{}
 
}
```

   **请求调用示例**

```python
def update_receiver():
    NETWORK_URL = 'http://cdsapi.capitalonline.net/network'
    action = 'UpdateWanAlarmReceiver'
    method = "POST"
    param = {}
    AK = '您的ak值'
    AccessKeySecret = '您的AccessKeySecret值'
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "ReceiverId":"a09855ea-15f6-11ec-bd9c-ce61e0b35baf",
        "Mobile":"13322221111",
        "Code":"+86"
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    return result
```

## 云桌面相关

### 1.QueryTask

   **Action: QueryTask**

  **描述：** 获取任务信息

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：GET**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                 | 描述         |
| --------- | ------ | -------- | ------------------------------------ | ------------ |
| taskId    | string | 是       | 6bca6bbd-58f2-427e-acdc-2eeb4c7328c7 | 任务id       |
| requestId | string | 是       | 6ca9ed98-27c8-4431-995f-59cc6d743dab | 请求标识uuid |

   **返回参数：**

| 名称       | 类型   | 示例                                   | 描述                              |
| ---------- | ------ | -------------------------------------- | --------------------------------- |
| Code       | string | Success                                | 返回状态码: Success: 成功         |
| Message    | string | null                                   | 返回信息                          |
| Data       | object | {}                                     | 返回数据                          |
| taskId     | string | “35304122-8504-400c-a61c-56ba244c5dda” | 任务id                            |
| status     | string | “Completed”                            | 任务状态 Running Failed Completed |
| failReason | string | “”                                     | 失败原因                          |
| requestId  | string | “6ca9ed98-27c8-4431-995f-59cc6d743dab” | 请求uuid                          |

   **错误码:**

| 错误码 | 错误信息           | 描述                 |
| ------ | ------------------ | -------------------- |
| 10003  | 传入参数不符合要求 | 传入参数不符合要求   |
| 10006  | 参数错误           | 参数错误，任务不存在 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "failReason": "失败子任务名称：关闭云桌面,失败子任务id:194c8fd2-d03e-41ce-a10d-53ef714fc0cd,失败流程名称:关闭云桌面,失败流程id：14695198-f1bc-454a-b464-b4b55eb9f7d7,失败原因:平台关机的云桌面不存在",
        "requestId": "6ca9ed98-27c8-4431-995f-59cc6d743dab",
        "status": "Failed",
        "taskId": "6bca6bbd-58f2-427e-acdc-2eeb4c7328c7"
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def queryTask():
    '''
    获取任务信息
    :return:
    '''
    action = "QueryTask"
    method = "GET"
    param = {"taskId": "a78a642b-7ee0-4c7e-9d45-62cd040cb910", "requestId": "6ca9ed98-27c8-4431-995f-59cc6d743dab"}
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 2.QuerySites

   **Action: QuerySites**

  **描述：** 查询可用区域信息

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：GET**

   **请求参数：**

| 名称   | 类型   | 是否必须 | 示例                                 | 描述   |
| ------ | ------ | -------- | ------------------------------------ | ------ |
| siteId | string | 否       | 09a38804-c1ee-11ec-bd22-4641dfd57315 | 站点id |

   **返回参数：**

| 名称       | 类型   | 示例                                   | 描述                      |
| ---------- | ------ | -------------------------------------- | ------------------------- |
| Code       | string | Success                                | 返回状态码: Success: 成功 |
| Message    | string | null                                   | 返回信息                  |
| Data       | list   | []                                     | 返回数据                  |
| siteId     | string | “d318e1a2-9bab-11ec-875a-2a8d1f4e167e” | 站点ID’                   |
| podName    | string | “POD210”                               | ‘站点名称’                |
| siteName   | string | “襄阳A”                                | ‘站点name’                |
| regionName | string | “中国大陆”                             | ‘区域name’                |
| regionId   | string | “408fd19e-fa78-11e6-bd9a-30b49e091019” | ‘区域id’                  |
| cityName   | string | “襄阳”                                 | ‘城市name’                |
| cityId     | string | “32e6fd62-9bac-11ec-875a-2a8d1f4e167e” | ‘城市id’                  |

   **错误码:**

| 错误码 | 错误信息 | 描述 |
| ------ | -------- | ---- |
|        |          |      |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": [
        {
            "cityId": "d318e1a2-9bab-11ec-875a-2a8d1f4e167e",
            "cityName": "襄阳",
            "podName": "POD210",
            "regionId": "408fd19e-fa78-11e6-bd9a-30b49e091019",
            "regionName": "中国大陆",
            "siteId": "32e6fd62-9bac-11ec-875a-2a8d1f4e167e",
            "siteName": "襄阳A"
        },
        {
            "cityId": "39c6ed64-8d5f-11ec-9247-5293695d0ddd",
            "cityName": "宿迁",
            "podName": "POD203",
            "regionId": "408fd19e-fa78-11e6-bd9a-30b49e091019",
            "regionName": "中国大陆",
            "siteId": "f7c3c7a6-8d5f-11ec-9311-5293695d0ddd",
            "siteName": "宿迁A"
        }
    ],
    "Message": ""
}
```

   **请求调用示例**

```python
def querySites():
    '''
    查询可用区域信息
    :return:
    '''
    action = "QuerySites"
    method = "GET"
    param = {}
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 3.QueryProducts

   **Action: QueryProducts**

  **描述：** 查询商品信息

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：GET**

   **请求参数：**

| 名称   | 类型   | 是否必须 | 示例                                 | 描述   |
| ------ | ------ | -------- | ------------------------------------ | ------ |
| siteId | string | 否       | 09a38804-c1ee-11ec-bd22-4641dfd57315 | 站点id |

   **返回参数：**

| 名称           | 类型    | 示例                                   | 描述                                 |
| -------------- | ------- | -------------------------------------- | ------------------------------------ |
| Code           | string  | Success                                | 返回状态码: Success: 成功            |
| Message        | string  | null                                   | 返回信息                             |
| Data           | list    | []                                     | 返回数据                             |
| siteId         | string  | “ebbfcb70-a98f-11ec-926b-8aaa763f849e” | 站点ID’                              |
| productId      | string  | “e0997510-1b69-4de8-85a8-cc44b2dd28f8” | 商品规格id                           |
| cpuCores       | int     | 14                                     | cpu 核数                             |
| memorySize     | int     | 25                                     | 内存                                 |
| gpuModel       | string  | “NVIDIA A5000”                         | gpu型号                              |
| gpuRam         | int     | 24                                     | gpu显存                              |
| systemDiskSize | int     | 150                                    | 系统盘大小                           |
| os             | string  | “windows”                              | 操作系统                             |
| goodsId        | int     | 15264                                  | 商品id                               |
| requirePrice   | double  | 0.1868333333                           | 按需价格，每分钟所需的人民币数值     |
| monthPrice     | double  | 3364                                   | 包月价格，每月所需的人民币数值       |
| isAllowSsd     | boolean | 1                                      | 是否允许使用ssd云盘 , 1允许，0不允许 |

   **错误码:**

| 错误码 | 错误信息             | 描述                 |
| ------ | -------------------- | -------------------- |
| 12000  | 查询商品规格信息失败 | 查询商品规格信息失败 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": [
        {
            "cpuCores": 14,
            "goodsId": 15264,
            "gpuModel": "NVIDIA A5000",
            "gpuRam": 24,
            "memorySize": 25,
            "monthPrice": 3364,
            "os": "windows",
            "productId": "e0997510-1b69-4de8-85a8-cc44b2dd28f8",
            "requirePrice": 0.1868333333,
            "siteId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
            "systemDiskSize": 150,
            "isAllowSsd":1
        },
        {
            "cpuCores": 14,
            "goodsId": 15264,
            "gpuModel": "NVIDIA A5000",
            "gpuRam": 24,
            "memorySize": 25,
            "monthPrice": 3364,
            "os": "windows",
            "productId": "e0997510-1b69-4de8-85a8-cc44b2dd28f8",
            "requirePrice": 0.1868333333,
            "siteId": "9efa59c0-a0db-11ec-aefa-1efd5a8f8465",
            "systemDiskSize": 150,
            "isAllowSsd":0
        }
    ],
    "Message": ""
}
```

   **请求调用示例**

```python
def queryProducts():
    '''
    查询商品信息
    :return:
    '''
    action = "QueryProducts"
    method = "GET"
    param = {}
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 4.QueryImages

   **Action: QueryImages**

  **描述：** 查询可用镜像信息

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：GET**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                 | 描述       |
| :-------- | :----- | :------- | :----------------------------------- | :--------- |
| siteId    | string | 否       | 09a38804-c1ee-11ec-bd22-4641dfd57315 | 站点id     |
| productId | string | 否       | 56a38804-cdee-1aec-bd22-3141dfd57235 | 商品规格id |

   **返回参数：**

| 名称          | 类型   | 示例                                   | 描述                                                         |
| :------------ | :----- | :------------------------------------- | :----------------------------------------------------------- |
| Code          | string | Success                                | 返回状态码: Success: 成功                                    |
| Message       | string | null                                   | 返回信息                                                     |
| Data          | list   | []                                     | 返回数据                                                     |
| productId     | string | "745f6546-dc5f-492f-82d1-9eb47cd9fa2d" | 商品规格id                                                   |
| productName   | string | "图形处理型"                           | 商品规格名称                                                 |
| publicImages  | list   | []                                     | 共有镜像                                                     |
| privateImages | list   | []                                     | 私有镜像                                                     |
| imageId       | string | "0e0f9143-35c5-4368-8c62-4bab440a9b9d" | 镜像Id                                                       |
| imageName     | string | "Windows10-公共镜像-图像处理型"        | 镜像名称                                                     |
| detailName    | string | ""                                     | 镜像详细名称                                                 |
| imageType     | string | "Public"                               | 镜像类型 public(公有) private（私有）                        |
| osType        | string | "windows"                              | 操作系统类型                                                 |
| imageSize     | Double | 72                                     | 镜像大小（G）                                                |
| message       | string | ""                                     | 描述信息                                                     |
| imageSites    | list   | []                                     | 镜像所在站点信息                                             |
| imageSiteId   | string | "nd206602-7f44-1343-a36f-32tyf61c1"    | 镜像站点ID                                                   |
| siteId        | string | "9efa59c0-a0db-11ec-aefa-1efd5a8f8     | 站点ID                                                       |
| siteName      | string | "保定A"                                | 站点名称                                                     |
| status        | string | "Available"                            | 状态 Creating(创建中)，Available(可用),Synchronizing(同步中), Error(错误), Deleting(删除中), Using(使用中) ，Deleted(已删除) ， 只有Available(可用)与Using(使用中)的镜像可用来创建与重装云桌面 |

   **错误码:**

| 错误码 | 错误信息 | 描述                                    |
| :----- | :------- | :-------------------------------------- |
| 10006  | 参数错误 | 1、无对应商品规格信息 2、无对应站点信息 |

   **返回示例:**

```json
{
    "code": "Success",
    "msg": null,
    "data": [
        {
            "productId": "745f6546-dc5f-492f-82d1-9eb47cd9fa2d",
            "productName": "图形处理型",
            "publicImages": [
                {
                    "imageId": "0e0f9143-35c5-4368-8c62-4bab440a9b9d",
                    "imageName": "Windows10-公共镜像-图像处理型",
                    "detailName": "",
                    "imageType": "Public",
                    "osType": "windows",
                    "imageSize": 0.0,
                    "message": "",
                    "imageSites": [
                        {
                            "imageSiteId": "nd206602-7f44-1343-a36f-32tyf61c1",
                            "siteId": "9efa59c0-a0db-11ec-aefa-1efd5a8f8465",
                            "siteName": "保定A",
                            "status": "Available"
                        },
                        {
                            "imageSiteId": "bc205502-7y54-1893-a36f-325af61c1",
                            "siteId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
                            "siteName": "娄底A",
                            "status": "Available"
                        },
                        {
                            "imageSiteId": "c37f559f-f1c0-47f4-9c5a-0df4af0b0e1b",
                            "siteId": "f7c3c7a6-8d5f-11ec-9311-5293695d0ddd",
                            "siteName": "宿迁A",
                            "status": "Available"
                        },
                        {
                            "imageSiteId": "0c380796-ecd5-4e16-b829-328710f68ddb",
                            "siteId": "09a38804-c1ee-11ec-bd22-4641dfd57315",
                            "siteName": "宿迁B",
                            "status": "Available"
                        }
                    ]
                }
            ],
            "privateImages": [
                {
                    "imageId": "e363df6f-2916-4efd-a243-50de5fb8928d",
                    "imageName": "定制模板",
                    "detailName": "dass-E2129298-windows10-Geforce-1655190089526",
                    "imageType": "Private",
                    "osType": "windows",
                    "imageSize": 32.0,
                    "message": "",
                    "imageSites": [
                        {
                            "imageSiteId": "3797fe64-4a5f-4791-8a10-65838134c898",
                            "siteId": "9efa59c0-a0db-11ec-aefa-1efd5a8f8465",
                            "siteName": "保定A",
                            "status": "Available"
                        },
                        {
                            "imageSiteId": "a2714dec-471e-426c-82e7-4f63f976ec2d",
                            "siteId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
                            "siteName": "娄底A",
                            "status": "Available"
                        },
                        {
                            "imageSiteId": "4f2e0e22-9d8d-4aa7-9226-b5961ea5aa2d",
                            "siteId": "f7c3c7a6-8d5f-11ec-9311-5293695d0ddd",
                            "siteName": "宿迁A",
                            "status": "Available"
                        }
                    ]
                }
            ]
        }
    ],
    "requestId": null,
    "status": 0
}
```

   **请求调用示例**

```python
def queryImages():
    '''
    查询可用镜像信息
   :return:
    '''
    action = "QueryImages"
    method = "GET"
    param = {
       ## "productId":"745f6546-dc5f-492f-82d1-9eb47cd9fa2d"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 5.QueryVmPrice

   **Action: QueryVmPrice**

  **描述：** 查询云桌面价格信息

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称          | 类型   | 是否必须 | 示例                                   | 描述                                                         |
| ------------- | ------ | -------- | -------------------------------------- | ------------------------------------------------------------ |
| requestId     | string | 是       | “e0997510-1b69-4de8-85a8-cc44b2dd28f8” | 请求uuid                                                     |
| siteId        | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e” | 节点id                                                       |
| duration      | string | 否       | ”1“                                    | 包月周期数，billCtcle的值是mounth时为包月，3个月传3,5个月传5；按需无需传，默认为1 |
| isToMonth     | string | 否       | ”1“                                    | 费用是否为计算到月底(1:是,0:否) ,如:7月20号购买到月底7-31号,则is_to_month=1,duration=1 ， 默认为0（包月使用） 如：包月开始时间为 2022.6.22 12:19:08isToMonth为1，duration为1，则包月到2022.7.1 00:00:00isToMonth为0，duration为1，则包整月到2022.7.22 12:19:08isToMonth为1，duration为6，则包整月到2022.12.1 12:19:08 isToMonth为0，duration为6，则包整月到2022.12.22 12:19:08 |
| billCycle     | string | 否       | “minute”                               | 计费周期 month是按月，minute是按需计费， 默认为minute        |
| num           | string | 否       | “1”                                    | 购买数量 ， 默认为1                                          |
| goodsId       | string | 是       | “15273”                                | 商品id                                                       |
| sysVolume     | string | 否       | “local”                                | 磁盘类型： 本地盘（local） 、云盘 (ssd) , 默认本地盘         |
| sysVolumeSize | string | 否       | “200”                                  | 云盘大小 ，本底盘不用传  （云盘时传入盘的大小必须大于镜像大小且是8的倍数） |

   **返回参数：**

| 名称              | 类型   | 示例                                 | 描述                                                         |
| ----------------- | ------ | ------------------------------------ | ------------------------------------------------------------ |
| Code              | string | Success                              | 返回状态码: Success: 成功                                    |
| Message           | string | null                                 | 返回信息                                                     |
| Data              | object | {}                                   | 返回数据                                                     |
| tradeAmount       | double | 0.11                                 | 最终总价格（元） 1、按需：返回结果为每小时的价格2、包月：返回的结果为所要计算的总价格 |
| singleTradeAmount | double | 0.11                                 | 单台 - 最终总价格（元） 1、按需：返回结果为每小时的价格2、包月：返回的结果单台的总价格 |
| num               | int    | 1                                    | 台数                                                         |
| vmPrice           | double | 0.11                                 | 单台 - vm 价格（元） 1、按需：返回结果为每小时的价格2、包月：返回的结果为单台 - vm 价格 |
| sysVolumePrice    | double | 0.11                                 | 单台 - 系统盘 价格（元） 1、按需：返回结果为每小时的价格2、包月：返回的结果为单台 - 系统盘 价格 |
| areaId            | string | CN                                   | 币种                                                         |
| requestId         | string | e0997510-1b69-4de8-85a8-cc44b2dd28f8 | 请求uuid                                                     |
| requestContent    | string | {}                                   | 请求参数                                                     |

   **错误码:**

| 错误码 | 错误信息           | 描述                                                    |
| ------ | ------------------ | ------------------------------------------------------- |
| 12505  | 查询云桌面价格失败 | 查询云桌面价格失败                                      |
| 10003  | 传入参数不符合要求 | 传入参数不符合要求，计费周期可选值为minute、month或year |
| 10006  | 参数错误           | 参数错误，无对应站点信息                                |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "areaId": "CN",
        "num": 1,
        "requestContent": "{\"billCycle\":\"month\",\"billMethod\":\"1\",\"customerId\":\"E2129298\",\"duration\":\"1\",\"goodsId\":\"15264\",\"isToMonth\":\"0\",\"num\":\"1\",\"requestId\":\"e0997510-1b69-4de8-85a8-cc44b2dd28f8\",\"siteId\":\"e5aa47be-da46-11ec-bad2-defff767b3b5\",\"sysVolume\":\"local\",\"sysVolumeSize\":\"96\",\"userFrom\":\"cdsapi\",\"userId\":\"713367\"}",
        "requestId": "e0997510-1b69-4de8-85a8-cc44b2dd28f8",
        "singleTradeAmount": 296700,
        "sysVolumePrice": 0,
        "tradeAmount": 296700,
        "vmPrice": 296700
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def queryVmPrice():
    '''
    获取vm价格
    :return:
    '''
    action = "QueryVmPrice"
    method = "POST"
    body = {
        "requestId": "e0997510-1b69-4de8-85a8-cc44b2dd28f8",
        "siteId": "e5aa47be-da46-11ec-bad2-defff767b3b5",
        "duration": "1",
        "isToMonth": "1",
        "billCycle": "minute",
        "num": "1",
        "goodsId": "15273"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 6.UpdateOrder

   **Action: UpdateOrder**

  **描述：** 按需转包年包月(批量)

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称          | 类型   | 是否必须 | 示例                                     | 描述                                                         |
| ------------- | ------ | -------- | ---------------------------------------- | ------------------------------------------------------------ |
| requestId     | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e”   | 请求uuid                                                     |
| vmIds         | array  | 是       | [“1f08cc62-c24b-46dd-b190-bf139d00ee82”] | vm ids                                                       |
| isToMonth     | string | 否       | ”0“                                      | 包月是否到月底 1是到月底，0否，默认为0 如：包月开始时间为 2022.6.22 12:19:08isToMonth为1，duration为1，则包月到2022.7.1 00:00:00isToMonth为0，duration为1，则包整月到2022.7.22 12:19:08isToMonth为1，duration为6，则包整月到2022.12.1 12:19:08 isToMonth为0，duration为6，则包整月到2022.12.22 12:19:08 |
| duration      | string | 否       | ”1“                                      | 包月周期数，3个月传3,5个月传5；默认为1                       |
| isAutoRenewal | string | 否       | ”0“                                      | 包月是否续约 1是0否 ， 默认为0                               |

   **返回参数：**

| 名称           | 类型   | 示例                                     | 描述                      |
| -------------- | ------ | ---------------------------------------- | ------------------------- |
| Code           | string | Success                                  | 返回状态码: Success: 成功 |
| Message        | string | null                                     | 返回信息                  |
| Data           | object | {}                                       | 返回数据                  |
| successVmIds   | array  | [“1f08cc62-c24b-46dd-b190-bf139d00ee82”] | 按需转包年包月成功 vmIds  |
| failedVmIds    | array  | []                                       | 按需转包年包月失败 vmIds  |
| failedMsg      | string | “”                                       | 失败信息                  |
| requestId      | string | “ebbfcb70-a98f-11ec-926b-8aaa763f849e”   | 请求uuid                  |
| requestContent | string | “”                                       | 请求参数                  |

   **错误码:**

| 错误码 | 错误信息                                                     | 描述                                                         |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 12503  | 该接口只能修改按需计费为包年包月，不可修改包年包月状态，修改包年包月请调用续约接口 | 该接口只能修改按需计费为包年包月，不可修改包年包月状态，修改包年包月请调用续约接口 |
| 12501  | 当前用户包月购买已达配额上限，请修改计费方式或联系销售人员增加包月配额 | 当前用户包月购买已达配额上限，请修改计费方式或联系销售人员增加包月配额 |
| 12506  | 云桌面订按需转包年包月失败                                   | 云桌面订按需转包年包月失败                                   |
| 10003  | 传入参数不符合要求                                           | 传入参数不符合要求，包月购买时长需大于等于1                  |
| 10006  | 参数错误                                                     | 参数错误，对应云桌面不存在                                   |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "failedMsg": "",
        "failedVmIds": [],
        "requestContent": "{\"billCycle\":\"month\",\"customerId\":\"E2129298\",\"duration\":1,\"isAutoRenewal\":0,\"isToMonth\":1,\"requestId\":\"ebbfcb70-a98f-11ec-926b-8aaa763f849e\",\"userFrom\":\"cdsapi\",\"userId\":\"713367\",\"vmIds\":[\"1f08cc62-c24b-46dd-b190-bf139d00ee82\"]}",
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "successVmIds": [
            "1f08cc62-c24b-46dd-b190-bf139d00ee82"
        ]
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def updateOrder():
    '''
    按需转包年包月(批量)
    :return:
    '''
    action = "UpdateOrder"
    method = "POST"
    body = {
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "vmIds": ["1f08cc62-c24b-46dd-b190-bf139d00ee82"],
        "isToMonth": "1",
        "duration": "1",
        "isAutoRenewal": "0"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 7.RenewalOrder

   **Action: RenewalOrder**

  **描述：** 包年包月续约(批量)

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称          | 类型   | 是否必须 | 示例                                     | 描述                                                         |
| ------------- | ------ | -------- | ---------------------------------------- | ------------------------------------------------------------ |
| requestId     | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e”   | 请求uuid                                                     |
| vmIds         | array  | 是       | [“1f08cc62-c24b-46dd-b190-bf139d00ee82”] | vm ids                                                       |
| duration      | string | 否       | ”1“                                      | 包月周期数，3个月传3,5个月传5；默认为1                       |
| priceToMonth  | string | 否       | ”0“                                      | 包月到月底，不足整月时是否按整月收费 0：否 1:是 默认为0      |
| isToMonth     | string | 否       | ”0“                                      | 包月是否到月底 1是到月底，0否 ， 默认为0  如：包月开始时间为 2022.6.22 12:19:08isToMonth为1，duration为1，则包月到2022.7.1 00:00:00isToMonth为0，duration为1，则包整月到2022.7.22 12:19:08isToMonth为1，duration为6，则包整月到2022.12.1 12:19:08 isToMonth为0，duration为6，则包整月到2022.12.22 12:19:08 |
| isAutoRenewal | string | 否       | ”1“                                      | 包月是否续约 1是0否 ， 默认为1                               |

   **返回参数：**

| 名称           | 类型   | 示例                                     | 描述                      |
| -------------- | ------ | ---------------------------------------- | ------------------------- |
| Code           | string | Success                                  | 返回状态码: Success: 成功 |
| Message        | string | null                                     | 返回信息                  |
| Data           | object | {}                                       | 返回数据                  |
| successVmIds   | array  | [“1f08cc62-c24b-46dd-b190-bf139d00ee82”] | 续约成功 vmIds            |
| failedVmIds    | array  | []                                       | 续约失败 vmIds            |
| failedMsg      | string | “”                                       | 失败信息                  |
| requestId      | string | “ebbfcb70-a98f-11ec-926b-8aaa763f849e”   | 请求uuid                  |
| requestContent | string | “”                                       | 请求参数                  |

   **错误码:**

| 错误码 | 错误信息                                                     | 描述                                                         |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 12504  | 该接口只用于续约包年包月，按需转包年包月请调用修改计费方案接口 | 该接口只用于续约包年包月，按需转包年包月请调用修改计费方案接口 |
| 12500  | 订单更新续约失败                                             | 订单更新续约失败                                             |
| 10003  | 传入参数不符合要求                                           | 传入参数不符合要求，包月是否续约可选值为0或1,1是续约,0是不续约 |
| 10006  | 参数错误                                                     | 参数错误，对应云桌面不存在                                   |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "failedMsg": "",
        "failedVmIds": [],
        "requestContent": "{\"billCycle\":\"month\",\"customerId\":\"E2129298\",\"duration\":1,\"isAutoRenewal\":1,\"isToMonth\":1,\"priceToMonth\":1,\"requestId\":\"ebbfcb70-a98f-11ec-926b-8aaa763f849e\",\"userFrom\":\"cdsapi\",\"userId\":\"713367\",\"vmIds\":[\"1f08cc62-c24b-46dd-b190-bf139d00ee82\"]}",
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "successVmIds": [
            "1f08cc62-c24b-46dd-b190-bf139d00ee82"
        ]
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def renewalOrder():
    '''
    包年包月续约(批量)
    :return:
    '''
    action = "RenewalOrder"
    method = "POST"
    body = {
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "vmIds": ["1f08cc62-c24b-46dd-b190-bf139d00ee82"],
        "duration": "1",
        "priceToMonth": "1",
        "isToMonth": "1",
        "isAutoRenewal": "1"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 8.QuerySubAccounts

   **Action: QuerySubAccounts**

  **描述：** 查询子账户集合

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：GET**

   **请求参数：**

| 名称   | 类型   | 是否必须 | 示例                            | 描述       |
| ------ | ------ | -------- | ------------------------------- | ---------- |
| email  | string | 否       | “cds@[163.com](http://163.com)” | 用户邮箱   |
| name   | string | 否       | “cds”                           | 用户的名称 |
| remark | string | 否       | “cds”                           | 备注       |

   **返回参数：**

| 名称      | 类型   | 示例                                   | 描述                                                         |
| --------- | ------ | -------------------------------------- | ------------------------------------------------------------ |
| Code      | string | Success                                | 返回状态码: Success: 成功                                    |
| Message   | string | null                                   | 返回信息                                                     |
| Data      | list   | []                                     | 返回数据                                                     |
| accountId | string | “7e7ba91e-4357-470a-9609-ce60d9d7e38f” | 用户id                                                       |
| name      | string | “miao123”                              | 用户的名称                                                   |
| password  | string | “CDS—GCW666”                           | 用户密码                                                     |
| email     | string | “”                                     | 邮箱                                                         |
| remark    | string | “miao123”                              | 备注                                                         |
| bindNum   | int    | 0                                      | 已绑定云桌面的数量                                           |
| status    | string | “create”                               | 账户状态，creating(创建中)，create(创建完成),error(创建失败) |

   **错误码:**

| 错误码 | 错误信息 | 描述 |
| ------ | -------- | ---- |
|        |          |      |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": [
        {
            "accountId": "7e7ba91e-4357-470a-9609-ce60d9d7e38f",
            "bindNum": 0,
            "email": "17716313367@163.com",
            "name": "miao123",
            "password": "CDS—GCW666",
            "remark": "miao123"
        }
    ],
    "Message": ""
}
```

   **请求调用示例**

```python
def querySubAccounts():
    '''
    查询子账户集合
    :return:
    '''
    action = "QuerySubAccounts"
    method = "GET"
    param = {}
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 9.CreateSubAccount

   **Action: CreateSubAccount**

  **描述：** 创建子账户

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                    | 描述                                                         |
| --------- | ------ | -------- | --------------------------------------- | ------------------------------------------------------------ |
| requestId | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e”  | 请求uuid                                                     |
| password  | string | 否       | “CDS—GCW666”                            | 用户密码，不传会自动生成默认密码：需8-20位，必须为数字、小写字母、大写字母组合 |
| email     | string | 是       | “17716313367@[163.com](http://163.com)” | 用户邮箱                                                     |
| name      | string | 是       | miao123                                 | 用户的名称                                                   |
| remark    | string | 否       | “miao123”                               | 备注，，子账户备注长度应长度不大于30位，支持汉字、英文、数字、符号 |

   **返回参数：**

| 名称    | 类型   | 示例    | 描述                      |
| ------- | ------ | ------- | ------------------------- |
| Code    | string | Success | 返回状态码: Success: 成功 |
| Message | string | null    | 返回信息                  |
| Data    | obejct | {}      | 返回数据                  |

   **错误码:**

| 错误码 | 错误信息           | 描述               |
| ------ | ------------------ | ------------------ |
| 10003  | 传入参数不符合要求 | 传入参数不符合要求 |
| 10005  | 账户数据异常       | 账户数据异常       |
| 11000  | 创建用户错误       | 创建用户错误       |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": null,
    "Message": ""
}
```

   **请求调用示例**

```python
def createSubAccount():
    '''
    创建子账户
    :return:
    '''
    action = "CreateSubAccount"
    method = "POST"
    body = {
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "name": "miao123",
        "email": "17716313367@163.com",
        "remark": "miao123"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return resul
```

### 10.CreateSubAccounts

   **Action: CreateSubAccounts**

  **描述：** 批量创建子账户

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称                | 类型   | 是否必须 | 示例                                    | 描述                                                         |
| ------------------- | ------ | -------- | --------------------------------------- | ------------------------------------------------------------ |
| requestId           | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e”  | 请求uuid                                                     |
| createAccountParams | list   | 是       | []                                      | 账户参数                                                     |
| password            | string | 否       | “CDS—GCW666”                            | 用户密码，不传会自动生成默认密码：需8-20位，必须为数字、小写字母、大写字母组合 |
| email               | string | 是       | “17716313367@[163.com](http://163.com)” | 用户邮箱                                                     |
| name                | string | 是       | “miao123”                               | 用户的名称                                                   |
| remark              | string | 否       | “miao123”                               | 备注，子账户备注长度应长度不大于30位，支持汉字、英文、数字、符号 |

   **返回参数：**

| 名称       | 类型   | 示例                                                       | 描述                      |
| ---------- | ------ | ---------------------------------------------------------- | ------------------------- |
| Code       | string | Success                                                    | 返回状态码: Success: 成功 |
| Message    | string | null                                                       | 返回信息                  |
| Data       | obejct | {}                                                         | 返回数据                  |
| failedNum  | int    | 0                                                          | 失败数量                  |
| successNum | int    | 1                                                          | 成功数量                  |
| failedMsgs | list   | [ ]                                                        | 失败错误信息              |
| name       | string | miao1233333                                                | 用户的名称                |
| email      | string | [3121111111@163.com](mailto:3121111111@163.com)            | 用户邮箱                  |
| remark     | string | miao123aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa                   | 备注                      |
| messsage   | string | 子账户备注长度应长度不大于30位，支持汉字、英文、数字、符号 | 错误信息                  |

   **错误码:**

| 错误码 | 错误信息           | 描述               |
| ------ | ------------------ | ------------------ |
| 10003  | 传入参数不符合要求 | 传入参数不符合要求 |
| 10005  | 账户数据异常       | 账户数据异常       |
| 11003  | 批量创建用户失败   | 批量创建用户失败   |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "failedNum": 1,
        "successNum": 0,
        "failedMsgs": [
           {
               "name": "miao1233333",
               "email": "3121111111@163.com",
               "remark": "miao123aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                "messsage": "子账户备注长度应长度不大于30位，支持汉字、英文、数字、符号"
            }
         ]
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def createSubAccounts():
    '''
    批量创建子账户
    :return:
    '''
    action = "CreateSubAccounts"
    method = "POST"
    body = {
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "createAccountParams":[
            {
                "name": "miao123",
                "email": "17716313367@163.com",
                "remark": "miao123"
            }
        ]
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 11.ChangeSubAccountName

   **Action: ChangeSubAccountName**

  **描述：** 修改子账名字

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                   | 描述     |
| --------- | ------ | -------- | -------------------------------------- | -------- |
| requestId | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e” | 请求uuid |
| email     | string | 是       | “17716313367@163.com”                  | 账户邮箱 |
| name      | string | 是       | “miao23456”                            | 用户名   |

   **返回参数：**

| 名称      | 类型   | 示例    | 描述                      |
| --------- | ------ | ------- | ------------------------- |
| Code      | string | Success | 返回状态码: Success: 成功 |
| Message   | string | null    | 返回信息                  |
| Data      | obejct | {}      | 返回数据                  |
| requestId | string |         | “”                        |

   **错误码:**

| 错误码 | 错误信息           | 描述               |
| ------ | ------------------ | ------------------ |
| 10003  | 传入参数不符合要求 | 传入参数不符合要求 |
| 10211  | 修改用户名失败     | 修改用户名失败     |

| 10006  | 参数错误           | 参数错误,无对应账户

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": null,
    "Message": ""
}
```

   **请求调用示例**

```python
def changeSubAccountName():
    '''
    修改子账名字
    :return:
    '''
    action = "ChangeSubAccountName"
    method = "POST"
    body = {
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "email":"17716313367@163.com",
        "name": "miao23456"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 12.ChangeSubAccountRemark

   **Action: ChangeSubAccountRemark**

  **描述：** 修改子账户备注 (批量)

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                      | 描述                                                         |
| --------- | ------ | -------- | ----------------------------------------- | ------------------------------------------------------------ |
| requestId | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e”    | 请求uuid                                                     |
| emails    | array  | 是       | [“17716313367@[163.com](http://163.com)”] | 账户邮箱集合                                                 |
| remark    | string | 是       | “miao23456”                               | 备注，子账户备注长度应长度不大于30位，支持汉字、英文、数字、符号 |

   **返回参数：**

| 名称      | 类型   | 示例    | 描述                      |
| --------- | ------ | ------- | ------------------------- |
| Code      | string | Success | 返回状态码: Success: 成功 |
| Message   | string | null    | 返回信息                  |
| Data      | obejct | {}      | 返回数据                  |
| requestId | string |         | “”                        |

   **错误码:**

| 错误码 | 错误信息           | 描述                 |
| ------ | ------------------ | -------------------- |
| 10003  | 传入参数不符合要求 | 传入参数不符合要求   |
| 11013  | 修改用户备注失败   | 修改用户备注失败     |
| 10006  | 参数错误           | 参数错误，无对应账户 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": null,
    "Message": ""
}
```

   **请求调用示例**

```python
def changeSubAccountRemark():
    '''
    修改子账户备注 (批量)
    :return:
    '''
    action = "ChangeSubAccountRemark"
    method = "POST"
    body = {
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "emails":["17716313367@163.com"],
        "remark": "miao23456"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 13.CreateDefaultNet

   **Action: CreateDefaultNet**

  **描述：** 创建默认网络资源

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                 | 描述         |
| --------- | ------ | -------- | ------------------------------------ | ------------ |
| siteId    | string | 是       | 35304122-8504-400c-a61c-56ba244c5dda | 站点id       |
| requestId | string | 是       | 6ca9ed98-27c8-4431-995f-59cc6d743dab | 请求标识uuid |

   **返回参数：**

| 名称           | 类型   | 示例                                   | 描述                      |
| -------------- | ------ | -------------------------------------- | ------------------------- |
| Code           | string | Success                                | 返回状态码: Success: 成功 |
| Message        | string | null                                   | 返回信息                  |
| Data           | object | {}                                     | 返回数据                  |
| requestId      | string | “6ca9ed98-27c8-4431-995f-59cc6d743dab” | 请求标识uuid              |
| taskId         | string | “d460f799-6896-4d93-b037-02ee2efb3adb” | 任务id                    |
| requestContent | string | “”                                     | 请求参数                  |

   **错误码:**

| 错误码 | 错误信息           | 描述                         |
| ------ | ------------------ | ---------------------------- |
| 10003  | 传入参数不符合要求 | 传入参数不符合要求           |
| 10005  | 账户数据异常       | 用户账户数据查询失败         |
| 13500  | 一键创建失败       | 一键创建失败                 |
| 10007  | 当前账户权限不足   | 当前账户权限不足             |
| 10006  | 参数错误           | 参数错误，对应站点信息不存在 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "requestContent": "{\"customerId\":\"CDS01555\",\"requestId\":\"6ca9ed98-27c8-4431-995f-59cc6d743dab\",\"siteId\":\"32e6fd62-9bac-11ec-875a-2a8d1f4e167e\",\"userFrom\":\"cdsapi\",\"userId\":\"715923\"}",
        "requestId": "6ca9ed98-27c8-4431-995f-59cc6d743dab",
        "taskId": "d460f799-6896-4d93-b037-02ee2efb3adb"
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def createDefaultNet():
    '''
    创建vpc与虚拟出网网关资源
    :return:
    '''
    action = "CreateDefaultNet"
    method = "POST"
    body = {
        "siteId": "32e6fd62-9bac-11ec-875a-2a8d1f4e167e",
        "requestId": "6ca9ed98-27c8-4431-995f-59cc6d743dab"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 14.SupplyDefaultNet

   **Action: SupplyDefaultNet**

  **描述：** 一键补全默认网络资源

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                 | 描述         |
| --------- | ------ | -------- | ------------------------------------ | ------------ |
| siteId    | string | 是       | 35304122-8504-400c-a61c-56ba244c5dda | 站点id       |
| requestId | string | 是       | 6ca9ed98-27c8-4431-995f-59cc6d743dab | 请求标识uuid |

   **返回参数：**

| 名称           | 类型   | 示例                                   | 描述                      |
| -------------- | ------ | -------------------------------------- | ------------------------- |
| Code           | string | Success                                | 返回状态码: Success: 成功 |
| Message        | string | null                                   | 返回信息                  |
| Data           | object | {}                                     | 返回数据                  |
| requestId      | string | “6ca9ed98-27c8-4431-995f-59cc6d743dab” | 请求标识uuid              |
| taskId         | string | “d460f799-6896-4d93-b037-02ee2efb3adb” | 任务id                    |
| requestContent | string | “”                                     | 请求参数                  |

   **错误码:**

| 错误码 | 错误信息           | 描述                         |
| ------ | ------------------ | ---------------------------- |
| 10003  | 传入参数不符合要求 | 传入参数不符合要求           |
| 10005  | 账户数据异常       | 用户账户数据查询失败         |
| 13506  | 补全vpc网络失败    | 补全vpc网络失败              |
| 10007  | 当前账户权限不足   | 当前账户权限不足             |
| 10006  | 参数错误           | 参数错误，对应站点信息不存在 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "requestContent": "{\"customerId\":\"CDS01555\",\"requestId\":\"6ca9ed98-27c8-4431-995f-59cc6d743dab\",\"siteId\":\"32e6fd62-9bac-11ec-875a-2a8d1f4e167e\",\"userFrom\":\"cdsapi\",\"userId\":\"715923\"}",
        "requestId": "6ca9ed98-27c8-4431-995f-59cc6d743dab",
        "taskId": "d460f799-6896-4d93-b037-02ee2efb3adb"
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def supplyDefaultNet():
    '''
    一键补全vpc的子网与虚拟出网网关
    :return:
    '''
    action = "SupplyDefaultNet"
    method = "POST"
    body = {
        "siteId": "32e6fd62-9bac-11ec-875a-2a8d1f4e167e",
        "requestId": "6ca9ed98-27c8-4431-995f-59cc6d743dab"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 15.GetDefaultNet

   **Action: GetDefaultNet**

  **描述：** 查询vpc与虚拟出网网关资源(调用CreateDefaultNet创建的默认网络配置)

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：GET**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                 | 描述         |
| --------- | ------ | -------- | ------------------------------------ | ------------ |
| siteId    | string | 是       | 32e6fd62-9bac-11ec-875a-2a8d1f4e167e | 站点id       |
| requestId | string | 是       | 6ca9ed98-27c8-4431-995f-59cc6d743dab | 请求标识uuid |

   **返回参数：**

| 名称        | 类型    | 示例                                 | 描述                                                         |
| ----------- | ------- | ------------------------------------ | ------------------------------------------------------------ |
| Code        | string  | Success                              | 返回状态码: Success: 成功                                    |
| Message     | string  | null                                 | 返回信息                                                     |
| Data        | object  | {}                                   | 返回数据                                                     |
| id          | Integer | 112                                  | 主键id                                                       |
| vpcRecordId | string  | c382a49c-942f-4389-af2b-7a81a7fee4d0 | vpc记录 id                                                   |
| cityId      | string  | 30044852-a985-11ec-82c4-bec056b60a5c | vpc所属区域Id                                                |
| vpcId       | string  | 3da4a818-80df-11ec-8c71-9291e2ce70c4 | vpc id                                                       |
| vpcName     | string  | 云桌面默认VPC                        | vpc名字                                                      |
| vpcSegment  | string  | 10.0.0.0/8                           | cidr规则的vpc网段                                            |
| customerId  | string  | E888825                              | 客户ID                                                       |
| userId      | string  | 571085                               | 用户ID                                                       |
| createTime  | Date    | 2022-01-29 16:41:34                  | 创建时间                                                     |
| updateTime  | Date    | 2022-01-29 16:41:34                  | 更新时间                                                     |
| deleteFlag  | boolean | false                                | 删除标识                                                     |
|             |         |                                      |                                                              |
| subnets     | list    | [ ]                                  | 子网集合                                                     |
| vGateways   | list    | [ ]                                  | 虚拟网关集合                                                 |
|             |         |                                      |                                                              |
| status      | string  | ok                                   | 状态 , ok ,erro ,creating ,deleting ,updating ,deleted ,shutdown ,stopping , starting |
| status_str  | string  | 正常                                 | 状态name, 正常 , 错误 , 创建中 , 删除中 , 更新中 , 已删除 , 等待删除 , 禁用中 , 启用中 |
| name        | string  | 子网1                                | 名称                                                         |
| not_used    | Integer | 65521                                | 未使用ip数量                                                 |
| used_num    | Integer | 15                                   | 已使用ip数量                                                 |
| mask        | Integer | 16                                   | 掩码                                                         |
| id          | String  | 3dabf76c-80df-11ec-8c71-9291e2ce70c4 | id                                                           |
| dns         | String  | [“8.8.8.8”,“8.8.4.4”]                | dns                                                          |
| ip_type     | String  | subnet                               | 网络类型：pubnet(“公网”), subnet( “子网”),virtual_gateway( “虚拟出网网”) |
| ip_address  | String  | "10.1.0.0                            | ip                                                           |
| gateway     | String  | 10.1.0.1                             | 网关                                                         |
| vlan_id     | String  | 2911                                 | vlan id                                                      |
| conf_id     | String  | 1216                                 | 带宽类型 id                                                  |
| conf_name   | String  | 电信                                 | 带宽类型名字                                                 |

   **错误码:**

| 错误码 | 错误信息                | 描述                    |
| ------ | ----------------------- | ----------------------- |
| 13502  | 查询vpc与可用区信息失败 | 服务错误查询失败        |
| 10003  | 传入参数不符合要求      | 传入参数不符合要求      |
| 10006  | 参数错误                | 参数错误,无对应站点信息 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "cityId": "30044852-a985-11ec-82c4-bec056b60a5c",
      "createTime": "2022-05-07 14:03:44",
        "customerId": "E2129298",
        "deleteFlag": false,
        "id": 476,
        "subnets": [
            {
                "dns": "[\"119.29.29.29\",\"114.114.114.114\"]",
                "gateway": "10.1.0.1",
                "id": "73d2c7ec-cdcb-11ec-a318-ee97882ecf7d",
                "ip_address": "10.1.0.0",
                "ip_type": "subnet",
                "mask": 16,
                "name": "子网1",               
                "not_used": 65520,
                "used_num": 16,
            "status": "ok",
                "status_str": "正常",
                "vlan_id": "1704"
            }
        ],
        "updateTime": "2022-05-07 14:04:35",
        "userId": "713367",
        "vgateways": [
            {
                "conf_id": "10289",
                "conf_name": "电信",
                "dns": "[\"119.29.29.29\",\"114.114.114.114\"]",
                "gateway": "10.2.0.1",
                "id": "8054ab84-cdcb-11ec-a318-ee97882ecf7d",
                "ip_address": "10.2.0.0",
                "ip_type": "virtual_gateway",
                "mask": 16,
                "name": "电信默认网关",                
                "not_used": 65520,
                "used_num": 16,
            "status": "ok",
                "status_str": "正常",
                "vlan_id": "1431"
            },
            {
                "conf_id": "10298",
                "conf_name": "移动",
                "dns": "[\"119.29.29.29\",\"114.114.114.114\"]",
                "gateway": "10.3.0.1",
                "id": "80587138-cdcb-11ec-a318-ee97882ecf7d",
                "ip_address": "10.3.0.0",
                "ip_type": "virtual_gateway",
                "mask": 16,
                "name": "移动默认网关",                
                "not_used": 65520,
                "used_num": 16,
           "status": "ok",
                "status_str": "正常",
                "vlan_id": "1767"
            }
        ],
        "vpcId": "73cbf764-cdcb-11ec-a318-ee97882ecf7d",
        "vpcName": "娄底-云桌面默认VPC",
        "vpcRecordId": "201bda0c-7cea-420b-b812-91a76aacfbd1",
        "vpcSegment": "10.0.0.0/8"
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def getDefaultNet():
    '''
    查询vpc与虚拟出网网关资源
    :return:
    '''
    action = "GetDefaultNet"
    method = "GET"
    param = {"siteId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e", "requestId": "6ca9ed98-27c8-4431-995f-59cc6d743dab"}
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 16.GetCustomNet

   **Action: GetCustomNet**

  **描述：** 查询vpc与虚拟出网网关资源(该账户下所有的自定义网络配置)

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：GET**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                 | 描述         |
| --------- | ------ | -------- | ------------------------------------ | ------------ |
| siteId    | string | 是       | 32e6fd62-9bac-11ec-875a-2a8d1f4e167e | 站点id       |
| requestId | string | 是       | 6ca9ed98-27c8-4431-995f-59cc6d743dab | 请求标识uuid |

   **返回参数：**

| 名称       | 类型    | 示例                                 | 描述                                                         |
| ---------- | ------- | ------------------------------------ | ------------------------------------------------------------ |
| Code       | string  | Success                              | 返回状态码: Success: 成功                                    |
| Message    | string  | null                                 | 返回信息                                                     |
| Data       | list    | [ ]                                  | 返回数据                                                     |
| vpcId      | string  | 3da4a818-80df-11ec-8c71-9291e2ce70c4 | vpc id                                                       |
| vpcName    | string  | 云桌面默认VPC                        | vpc名字                                                      |
| vpcSegment | string  | 10.0.0.0/8                           | cidr规则的vpc网段                                            |
| customerId | string  | E888825                              | 客户ID                                                       |
| userId     | string  | 571085                               | 用户ID                                                       |
|            |         |                                      |                                                              |
| subnets    | List    | [ ]                                  | 子网集合                                                     |
| vGateways  | List    | [ ]                                  | 虚拟网关集合                                                 |
|            |         |                                      |                                                              |
| status     | string  | ok                                   | 状态 , ok ,erro ,creating ,deleting ,updating ,deleted ,shutdown ,stopping , starting |
| status_str | string  | 正常                                 | 状态name, 正常 , 错误 , 创建中 , 删除中 , 更新中 , 已删除 , 等待删除 , 禁用中 , 启用中 |
| name       | string  | 子网1                                | 名称                                                         |
| not_used   | Integer | 65521                                | 未使用ip数量                                                 |
| used_num   | Integer | 15                                   | 已使用ip数量                                                 |
| mask       | Integer | 16                                   | 掩码                                                         |
| id         | String  | 3dabf76c-80df-11ec-8c71-9291e2ce70c4 | id                                                           |
| dns        | String  | [“8.8.8.8”,“8.8.4.4”]                | dns                                                          |
| ip_type    | String  | subnet                               | 网络类型：pubnet(“公网”), subnet( “子网”),virtual_gateway( “虚拟出网网”) |
| ip_address | String  | "10.1.0.0                            | ip                                                           |
| gateway    | String  | 10.1.0.1                             | 网关                                                         |
| vlan_id    | String  | 2911                                 | vlan id                                                      |
| conf_id    | String  | 1216                                 | 带宽类型 id                                                  |
| conf_name  | String  | 电信                                 | 带宽类型名字                                                 |

   **错误码:**

| 错误码 | 错误信息                | 描述                    |
| ------ | ----------------------- | ----------------------- |
| 13502  | 查询vpc与可用区信息失败 | 服务错误查询失败        |
| 10003  | 传入参数不符合要求      | 传入参数不符合要求      |
| 10006  | 参数错误                | 参数错误,无对应站点信息 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": [
        {
            "customerId": "CDS01555",
            "subnets": [
                {
                    "dns": "[\"119.29.29.29\",\"114.114.114.114\"]",
                    "gateway": "10.1.0.1",
                    "id": "2c93fcac-d749-11ec-9fb4-ca91557d24a6",
                    "ip_address": "10.1.0.0",
                    "ip_type": "subnet",
                    "mask": 16,
                    "name": "子网1",                   
                    "not_used": 65520,
                    "used_num": 16,
              "status": "ok",
                    "status_str": "正常",
                    "vlan_id": "1768"
                }
            ],
            "userId": "715923",
             "vgateways": [
            {
                "conf_id": "10289",
                "conf_name": "电信",
                "dns": "[\"119.29.29.29\",\"114.114.114.114\"]",
                "gateway": "10.2.0.1",
                "id": "8054ab84-cdcb-11ec-a318-ee97882ecf7d",
                "ip_address": "10.2.0.0",
                "ip_type": "virtual_gateway",
                "mask": 16,
                "name": "电信默认网关",                
                "not_used": 65520,
                "used_num": 16,
           "status": "ok",
                "status_str": "正常",
                "vlan_id": "1431"
            },
            {
                "conf_id": "10298",
                "conf_name": "移动",
                "dns": "[\"119.29.29.29\",\"114.114.114.114\"]",
                "gateway": "10.3.0.1",
                "id": "80587138-cdcb-11ec-a318-ee97882ecf7d",
                "ip_address": "10.3.0.0",
                "ip_type": "virtual_gateway",
                "mask": 16,
                "name": "移动默认网关",                
                "not_used": 65520,
                "used_num": 16,
            "status": "ok",
                "status_str": "正常",
                "vlan_id": "1767"
            }
        ],
            "vpcId": "2c869a08-d749-11ec-9fb4-ca91557d24a6",
            "vpcName": "襄阳-云桌面默认VPC",
            "vpcSegment": "10.0.0.0/8"
        }
    ],
    "Message": ""
}
```

   **请求调用示例**

```python
def getCustomNet():
    '''
    查询vpc与虚拟出网网关资源
    :return:
    '''
    action = "GetCustomNet"
    method = "GET"
    param = {"siteId": "32e6fd62-9bac-11ec-875a-2a8d1f4e167e", "requestId": "6ca9ed98-27c8-4431-995f-59cc6d743dab"}
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 17.GetLineBillingScheme

   **Action: GetLineBillingScheme**

  **描述：** 获取线路及其计费方案

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：GET**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                 | 描述         |
| --------- | ------ | -------- | ------------------------------------ | ------------ |
| siteId    | string | 是       | 35304122-8504-400c-a61c-56ba244c5dda | 站点id       |
| requestId | string | 是       | 6ca9ed98-27c8-4431-995f-59cc6d743dab | 请求标识uuid |

   **返回参数：**

| 名称                | 类型   | 示例                                   | 描述                             |
| ------------------- | ------ | -------------------------------------- | -------------------------------- |
| Code                | string | Success                                | 返回状态码: Success: 成功        |
| Message             | string | null                                   | 返回信息                         |
| Data                | list   | []                                     | 返回数据                         |
| conf_id             | int    | 1069                                   | 方案id                           |
| conf_name           | string | “电信”                                 | 方案名称 电信/联通…              |
| billing_scheme      | list   | []                                     | 计费方案                         |
| goods_id            | Sting  | "16319"                                | 商品id                           |
| billing_method      | string | “0”                                    | 计费方式 0：按需计费 1：包年包月 |
| billing_type        | string | “number”                               | 计费类型                         |
| billing_scheme_id   | string | “8f8527f0-c74b-11eb-b7f6-ea86f8094c7b” | 计费方案id                       |
| billing_scheme_name | string | “VPC公网带宽-固定带宽”                 | 计费方案名字                     |
| billing_cycle_id    | string | “minute”                               | “minute”                         |
| billing_items       | list   | []                                     | 计费项                           |
| key                 | string | “vpc_pubnet”                           | key                              |
| id                  | string | “b76cab5a-c749-11eb-b7f6-ea86f8094c7b” | id                               |
| name                | string | “VPC公网带宽-固定带宽”                 | name                             |

   **错误码:**

| 错误码 | 错误信息           | 描述                        |
| ------ | ------------------ | --------------------------- |
| 10003  | 传入参数不符合要求 | 传入参数不符合要求          |
| 13504  | 获取计费方案失败   | 服务错误查询失败            |
| 10006  | 参数错误           | 参数错误,对应站点信息不存在 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": [
        {
            "billing_scheme": [
                {
                    "billing_cycle_id": "minute",
                    "billing_items": [
                        {
                            "id": "bd9c7b0a-8a20-11ec-a9e9-dee2642e3814",
                            "key": "Bandwidth",
                            "name": "固定带宽-电信"
                        }
                    ],
                    "billing_method": "0",
                    "billing_scheme_id": "10dc1fe0-8a22-11ec-9537-02f6ca8ca3d2",
                    "billing_scheme_name": "固定带宽EIP电信",
                    "billing_type": "number",
                    "goods_id": "16319"
                }
            ],
            "conf_id": 10289,
            "conf_name": "电信"
        },
        {
            "billing_scheme": [
                {
                    "billing_cycle_id": "minute",
                    "billing_items": [
                        {
                            "id": "9fb925ac-8a20-11ec-a829-dee2642e3814",
                            "key": "Bandwidth",
                            "name": "固定带宽-移动"
                        }
                    ],
                    "billing_method": "0",
                    "billing_scheme_id": "fd81a33e-8a21-11ec-ab1f-dee2642e3814",
                    "billing_scheme_name": "固定带宽EIP移动",
                    "billing_type": "number",
                    "goods_id": "16328"
                }
            ],
            "conf_id": 10298,
            "conf_name": "移动"
        },
        {
            "billing_scheme": [
                {
                    "billing_cycle_id": "minute",
                    "billing_items": [
                        {
                            "id": "8a7cdaf8-8a20-11ec-98fd-dee2642e3814",
                            "key": "Bandwidth",
                            "name": "固定带宽-联通"
                        }
                    ],
                    "billing_method": "0",
                    "billing_scheme_id": "ec0aacae-8a21-11ec-befd-02f6ca8ca3d2",
                    "billing_scheme_name": "固定带宽EIP联通",
                    "billing_type": "number",
                    "goods_id": "16337"
                }
            ],
            "conf_id": 10307,
            "conf_name": "联通"
        }
    ],
    "Message": ""
}
```

   **请求调用示例**

```python
def getLineBillingScheme():
    '''
    获取线路及其计费方案
    :return:
    '''
    action = "GetLineBillingScheme"
    method = "GET"
    param = {"siteId": "32e6fd62-9bac-11ec-875a-2a8d1f4e167e", "requestId": "6ca9ed98-27c8-4431-995f-59cc6d743dab"}
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 18.GetEipPrice

   **Action: GetEipPrice**

  **描述：** 获取弹性ip价格

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：GET**

   **请求参数：**

| 名称            | 类型   | 是否必须 | 示例                                   | 描述         |
| --------------- | ------ | -------- | -------------------------------------- | ------------ |
| size            | string | 是       | “1”                                    | eip数量(个)  |
| bandwidthConfId | string | 是       | “1069”                                 | 带宽conf_id  |
| siteId          | string | 是       | “35304122-8504-400c-a61c-56ba244c5dda” | 站点id       |
| qos             | string | 是       | “5”                                    | 带宽值(mbps) |
| requestId       | string | 是       | “6ca9ed98-27c8-4431-995f-59cc6d743dab” | 请求标识uuid |

   **返回参数：**

| 名称            | 类型   | 示例                  | 描述                      |
| --------------- | ------ | --------------------- | ------------------------- |
| Code            | string | Success               | 返回状态码: Success: 成功 |
| Message         | string | null                  | 返回信息                  |
| Data            | object | {}                    | 返回数据                  |
| bandwidth_price | object | {}                    | 带宽的价格                |
| eip_price       | object | {}                    | ip的价格                  |
| total_price     | object | {}                    | 总价格                    |
| price           | double | 1.2                   | 价格                      |
| price_str       | string | “1.2”                 | 价格 str                  |
| sign            | string | “￥”                  | 单位                      |
| cycle           | string | “/天”                 | 周期                      |
| end_time        | string | “2099-01-01 00:00:00” | 结束时间                  |

   **错误码:**

| 错误码 | 错误信息           | 描述                    |
| ------ | ------------------ | ----------------------- |
| 10003  | 传入参数不符合要求 | 传入参数不符合要求      |
| 13503  | 获取eip价格失败    | 服务错误查询失败        |
| 10006  | 参数错误           | 参数错误,无对应站点信息 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "bandwidth_price": {
            "cycle": "/天",
            "end_time": "2099-01-01 00:00:00",
            "price": 1.5,
            "price_str": "1.50",
            "sign": "￥"
        },
        "eip_price": {
            "cycle": "/天",
            "end_time": "2099-01-01 00:00:00",
            "price": 0.5,
            "price_str": "0.50",
            "sign": "￥"
        },
        "total_price": {
            "cycle": "/天",
            "end_time": "2099-01-01 00:00:00",
            "price": 2.5,
            "price_str": "2.50",
            "sign": "￥"
        }
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def getEipPrice():
    '''
    获取弹性ip价格
    :return:
    '''
    action = "GetEipPrice"
    method = "GET"
    param = {
            "size":"1",
            "siteId": "09a38804-c1ee-11ec-bd22-4641dfd57315",
            "bandwidthConfId":"10289",
            "qos":"5",
            "requestId": "6ca9ed98-27c8-4431-995f-59cc6d743dab"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 19.QueryVms

   **Action: QueryVms**

  **描述：** 查询云桌面集合

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：GET**

   **请求参数：**

| 名称       | 类型   | 是否必须 | 示例                                   | 描述                     |
| ---------- | ------ | -------- | -------------------------------------- | ------------------------ |
| siteId     | string | 否       | “32e6fd62-9bac-11ec-875a-2a8d1f4e167e” | 节点id                   |
| productId  | string | 否       | “745f6546-dc5f-492f-82d1-9eb47cd9fa2d” | 规格                     |
| billMethod | string | 否       | “1”                                    | 计费模式 1包年包月 0按需 |
| email      | string | 否       | “cds@163.com”                          | 用户邮箱                 |
| vpcId      | string | 否       | “b4754c79-93fe-4662-a747-5581d23b8877” | VPC id                   |
| vpcName    | string | 否       | “保定-云桌面默认VPC”                   | VPC name                 |

   **返回参数：**

| 名称    | 类型   | 示例                                     | 描述                      |
| ------- | ------ | ---------------------------------------- | ------------------------- |
| Code    | string | Success                                  | 返回状态码: Success: 成功 |
| Message | string | null                                     | 返回信息                  |
| Data    | object | {}                                       | 返回数据                  |
| vmIds   | list   | [“a8d09bab-64d4-4549-9c8c-0efe19423e5e”] | 云桌面ids                 |

   **错误码:**

| 错误码 | 错误信息           | 描述                                                         |
| ------ | ------------------ | ------------------------------------------------------------ |
| 10003  | 传入参数不符合要求 | 传入参数不符合要求，计费模式可选值为1或0,1为包年包月,2为按需 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "vmIds": [
            "a8d09bab-64d4-4549-9c8c-0efe19423e5e"
        ]
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def queryVms():
    '''
    查询云桌面集合
    :return:
    '''
    action = "QueryVms"
    method = "GET"
    param = {}
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 20.QueryVm

   **Action: QueryVm**

  **描述：** 查询云桌面详细信息

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：GET**

   **请求参数：**

| 名称 | 类型   | 是否必须 | 示例                                   | 描述     |
| ---- | ------ | -------- | -------------------------------------- | -------- |
| vmId | string | 是       | “a8d09bab-64d4-4549-9c8c-0efe19423e5e” | 云桌面ID |

   **返回参数：**

| 名称         | 类型   | 示例                                   | 描述                                                         |
| ------------ | ------ | -------------------------------------- | ------------------------------------------------------------ |
| Code         | string | Success                                | 返回状态码: Success: 成功                                    |
| Message      | string | null                                   | 返回信息                                                     |
| Data         | object | {}                                     | 返回数据                                                     |
| vmName       | string | “openapi_test_2”                       | 云桌面的名称                                                 |
| siteId       | string | “ebbfcb70-a98f-11ec-926b-8aaa763f849e” | 区域                                                         |
| billMethod   | int    | 0                                      | 计费类型 1包年包月 0按需                                     |
| productId    | string | “745f6546-dc5f-492f-82d1-9eb47cd9fa2d” | 规格                                                         |
| vpcId        | string | “73cbf764-cdcb-11ec-a318-ee97882ecf7d” | VPC id                                                       |
| vpcName      | string | “娄底-云桌面默认VPC”                   | vpc Name                                                     |
| eip          | string | “移动:120.226.84.70”                   | EIP                                                          |
| privateIp    | string | “vlan1704:10.1.0.14”                   | 子网                                                         |
| publicIp     | string | “745f6546-dc5f-492f-82d1-9eb47cd9fa2d” | 虚拟出网网关                                                 |
| bw           | int    | 5                                      | 带宽                                                         |
| accountName  | string | “”                                     | 所属用户名称                                                 |
| accountEmail | string | “”                                     | 用户邮箱                                                     |
| expireTime   | string | “2098-12-31T16:00:00.000+0000”         | 包月到期时间                                                 |
| status       | string | “using”                                | 状态 : configuring(“配置中”), rebooting(“重启中”), starting(“开机中”), using(“已开机”), stoping(“关机中”), stop(“已关机”), deleteing(“删除中”), deleted(“已删除”),dataMoving(“云桌面迁移中”),error(“错误”),asNeedExpiring(“欠费关机中”),asNeedExpired(“已欠费”),asMonthExpiring(“到期关机中”),asMonthExpired(“已到期”),logicalDeleted(“逻辑删除”),destroying(“欠费到期删除中”),destroy(“欠费到期已删除”),invisibleError(“回收错误”),netErr("网络异常") |

   **错误码:**

| 错误码 | 错误信息           | 描述                       |
| ------ | ------------------ | -------------------------- |
| 10003  | 传入参数不符合要求 | 云桌面id为空               |
| 10006  | 参数错误           | 参数错误，对应云桌面不存在 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "accountEmail": "",
        "accountName": "",
        "billMethod": 0,
        "bw": 5,
        "eip": "移动:120.226.84.70",
        "expireTime": "2098-12-31T16:00:00.000+0000",
        "label": "",
        "privateIp": "vlan1704:10.1.0.14",
        "productId": "745f6546-dc5f-492f-82d1-9eb47cd9fa2d",
        "publicIp": "10.3.0.4",
        "siteId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "status": "using",
        "vmName": "openapi_test_2",
        "vpcId": "73cbf764-cdcb-11ec-a318-ee97882ecf7d",
        "vpcName": "娄底-云桌面默认VPC"
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def queryVm():
    '''
    查询云桌面
    :return:
    '''
    action = "QueryVm"
    method = "GET"
    param = {"vmId": "a8d09bab-64d4-4549-9c8c-0efe19423e5e"}
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 21.QueryExpireVms

   **Action: QueryExpireVms**

  **描述：** 查询七天内即将到期与已过期的云桌面信息

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：GET**

   **请求参数：**

| 名称 | 类型 | 是否必须 | 示例 | 描述 |
| ---- | ---- | -------- | ---- | ---- |
|      |      |          |      |      |

   **返回参数：**

| 名称       | 类型   | 示例    | 描述                      |
| ---------- | ------ | ------- | ------------------------- |
| Code       | string | Success | 返回状态码: Success: 成功 |
| Message    | string | null    | 返回信息                  |
| Data       | list   | []      | 返回数据                  |
| vmName     | string | “”      | 云桌面的名称              |
| billMethod | int    | “”      | 计费类型                  |
| expireTime | string | “”      | 包月到期时间              |
| status     | string | “”      | 状态                      |

   **错误码:**

| 错误码 | 错误信息 | 描述 |
| ------ | -------- | ---- |
|        |          |      |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": [
        {
            "billMethod": 1,
            "expireTime": "2022-06-30T16:00:00.000+0000",
            "status": "using",
            "vmName": "业务测试_shangw"
        }
    ],
    "Message": ""
}
```

   **请求调用示例**

```python
def queryExpireVms():
    '''
    查询到期的云桌面信息
    :return:
    '''
    action = "QueryExpireVms"
    method = "GET"
    param = {}
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 22.CreateVm

   **Action: CreateVm**

  **描述：** 创建云桌面实例

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称           | 类型   | 是否必须 | 示例                                   | 描述                                                         |
| -------------- | ------ | -------- | -------------------------------------- | ------------------------------------------------------------ |
| requestId      | string | 是       | “6ca9ed98-27c8-4431-995f-59cc6d743dab” | 请求uuid                                                     |
| siteId         | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e” | 节点ID                                                       |
| productId      | string | 是       | “745f6546-dc5f-492f-82d1-9eb47cd9fa2d” | 规格uuid                                                     |
| name           | string | 是       | “openapi_test_2”                       | GPU工作站名称                                                |
| num            | string | 否       | “1”                                    | 开通数量，默认为1                                            |
| hostNo         | string | 否       | “1”                                    | 开通机器起始编号，需大于0,购买超过一台GPU云桌面时，从第二台起名称后缀将自动添加编号，如名称为“测试”、后续名称为测试_001、测试_002等，默认为1 |
| imageId        | string | 是       | “dcd81283-d2e9-456d-9f03-803b83ecc25a” | 镜像id                                                       |
| moneyType      | string | 否       | “CN”                                   | 子账户-试用金的币种:US(美元)，CN(人民币) 默认人民币：“CN” ,  |
| subAccountId   | string | 否       | “76581”                                | 子账户-试用金id                                              |
| billCycle      | string | 否       | “minute”                               | 费周期 month是按月，minute是按需计费 ， 默认为minute 如果选择按需：minute，则参数duration、isToMonth、isAutoRenewal、priceToMonth无需传如果选择包月：montn，则参数 duration、isToMonth、isAutoRenewal、priceToMonth 选择：1、不传使用默认值：duration=1，isToMonth=0，isAutoRenewal=0，priceToMonth=0表示为：包1个整月 |
| duration       | string | 否       | “1”                                    | 包月周期数，billCtcle的值是mounth时为包月，3个月传3,5个月传5； 按需无需传，默认为1 |
| isToMonth      | string | 否       | “0”                                    | 包月是否到月底 1是到月底，0否， 默认为0如：包月开始时间为 2022.6.22 12:19:08isToMonth为1，duration为1，则包月到2022.7.1 00:00:00isToMonth为0，duration为1，则包整月到2022.7.22 12:19:08isToMonth为1，duration为6，则包整月到2022.12.1 12:19:08 isToMonth为0，duration为6，则包整月到2022.12.22 12:19:08 |
| isAutoRenewal  | string | 否       | “0”                                    | 包月是否续约 1是0否， 默认为0                                |
| priceToMonth   | string | 否       | “0”                                    | 包年包月 不足整月是否按整月收费 1是0否， 默认为0             |
| qos            | string | 是       | “5”                                    | 带宽大小 (mbps)                                              |
| vpcId          | string | 是       | “73cbf764-cdcb-11ec-a318-ee97882ecf7d” | vpc id                                                       |
| subnetNetId    | string | 是       | “73d2c7ec-cdcb-11ec-a318-ee97882ecf7d” | 子网–子网id                                                  |
| vgatewayNetId  | string | 是       | “80587138-cdcb-11ec-a318-ee97882ecf7d” | 虚拟出网网关网关–id                                          |
| vgatewayConfId | string | 是       | “10298”                                | 虚拟网关–conf_id                                             |
| sysVolume      | string | 否       | “local”                                | 磁盘类型： 本地盘（local） 、云盘 (ssd) , 默认本地盘         |
| sysVolumeSize  | string | 否       | “200”                                  | 云盘大小 ，本底盘不用传  （云盘时传入盘的大小必须大于镜像大小且是8的倍数） |

   **返回参数：**

| 名称           | 类型   | 示例                                     | 描述                      |
| -------------- | ------ | ---------------------------------------- | ------------------------- |
| Code           | string | Success                                  | 返回状态码: Success: 成功 |
| Message        | string | null                                     | 返回信息                  |
| Data           | obejct | {}                                       | 返回数据                  |
| taskId         | string | “53b150e2-bb27-4db1-8dc6-650eaba66fc2”   | 任务id                    |
| vmIds          | list   | [“a8d09bab-64d4-4549-9c8c-0efe19423e5e”] | 云桌面ids                 |
| requestId      | string | “6ca9ed98-27c8-4431-995f-59cc6d743dab”   | 请求uuid                  |
| requestContent | string | “”                                       | 请求参数                  |

   **错误码:**

| 错误码 | 错误信息                                                     | 描述                                                         |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 10007  | 当前账户权限不足                                             | 当前账户权限不足                                             |
| 10005  | 账户数据异常                                                 | 账户数据异常                                                 |
| 10003  | 传入参数不符合要求，请检查后重试                             | 传入参数不符合要求，请检查后重试                             |
| 13001  | GPU云桌面实例创建失败                                        | GPU云桌面实例创建失败                                        |
| 12501  | 当前用户包月购买已达配额上限，请修改计费方式或联系销售人员增加包月配额 | 当前用户包月购买已达配额上限，请修改计费方式或联系销售人员增加包月配额 |
| 12502  | 当前用户按需购买已达配额上限，请修改计费方式或联系销售人员增加按需配额 | 当前用户按需购买已达配额上限，请修改计费方式或联系销售人员增加按需配额 |
| 13505  | 校验网络信息失败                                             | 校验网络信息失败                                             |
| 13000  | 当前资源不足                                                 | 当前资源不足                                                 |
| 10006  | 参数错误                                                     | 参数错误，无对应商品信息                                     |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "requestContent": "{\"billCycle\":\"minute\",\"billMethod\":0,\"customerId\":\"E2129298\",\"duration\":1,\"funEipParam\":{\"qos\":5,\"siteId\":\"ebbfcb70-a98f-11ec-926b-8aaa763f849e\",\"size\":1,\"subnetNetId\":\"73d2c7ec-cdcb-11ec-a318-ee97882ecf7d\",\"vGatewayConfId\":\"10298\",\"vGatewayConfName\":\"移动\",\"vGatewayNetId\":\"80587138-cdcb-11ec-a318-ee97882ecf7d\",\"vpcId\":\"73cbf764-cdcb-11ec-a318-ee97882ecf7d\",\"vpcName\":\"娄底-云桌面默认VPC\"},\"isAutoRenewal\":0,\"isToMonth\":0,\"name\":\"openapi_test_2\",\"num\":1,\"priceToMonth\":0,\"productId\":\"745f6546-dc5f-492f-82d1-9eb47cd9fa2d\",\"qos\":5,\"requestId\":\"6ca9ed98-27c8-4431-995f-59cc6d743dab\",\"siteId\":\"ebbfcb70-a98f-11ec-926b-8aaa763f849e\",\"subnetNetId\":\"73d2c7ec-cdcb-11ec-a318-ee97882ecf7d\",\"userFrom\":\"cdsapi\",\"userId\":\"713367\",\"vGatewayConfId\":\"10298\",\"vGatewayConfName\":\"移动\",\"vGatewayNetId\":\"80587138-cdcb-11ec-a318-ee97882ecf7d\",\"vpcId\":\"73cbf764-cdcb-11ec-a318-ee97882ecf7d\",\"vpcName\":\"娄底-云桌面默认VPC\"}",
        "requestId": "6ca9ed98-27c8-4431-995f-59cc6d743dab",
        "taskId": "53b150e2-bb27-4db1-8dc6-650eaba66fc2",
        "vmIds": [
            "a8d09bab-64d4-4549-9c8c-0efe19423e5e"
        ]
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def createVm():
    '''
    创建云桌面实例
    :return:
    '''
    action = "CreateVm"
    method = "POST"
    body = {
        "requestId": "6ca9ed98-27c8-4431-995f-59cc6d743dab",
        "siteId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "productId": "745f6546-dc5f-492f-82d1-9eb47cd9fa2d",
        "imageId": "dcd81283-d2e9-456d-9f03-803b83ecc25a”,
      "name": "openapi_999",
        "num": "1",
        "billCycle": "minute",
        "isToMonth": "0",
        "isAutoRenewal": "0",
        "priceToMonth":"0",
        "qos": "5",
        "vpcId": "b35e43a6-e706-11ec-8171-32f9a7e748fc",
        "subnetNetId": "b36b43a8-e706-11ec-8171-32f9a7e748fc",
        "vgatewayNetId": "c0505a90-e706-11ec-8171-32f9a7e748fc",
        "vgatewayConfId": "10298"
    }
 
 
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 23.OperateVm

   **Action: OperateVm**

  **描述：** 云桌面电源操作

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                     | 描述                        |
| --------- | ------ | -------- | ---------------------------------------- | --------------------------- |
| requestId | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e”   | 请求uuid                    |
| action    | string | 是       | “off”                                    | 操作: “on”, “off”, “reboot” |
| vmIds     | array  | 是       | [“a8d09bab-64d4-4549-9c8c-0efe19423e5e”] | vm Ids                      |

   **返回参数：**

| 名称           | 类型   | 示例                                      | 描述                      |
| -------------- | ------ | ----------------------------------------- | ------------------------- |
| Code           | string | Success                                   | 返回状态码: Success: 成功 |
| Message        | string | null                                      | 返回信息                  |
| Data           | obejct | {}                                        | 返回数据                  |
| taskId         | string | “10e0284f-6ce5-4cb0-a61e-4858865d9295”    | 任务id                    |
| vmIds          | array  | [ “a8d09bab-64d4-4549-9c8c-0efe19423e5e”] | 云桌面ids                 |
| requestId      | string | “ebbfcb70-a98f-11ec-926b-8aaa763f849e”    | 请求uuid                  |
| requestContent | string | “”                                        | 请求参数                  |

   **错误码:**

| 错误码 | 错误信息                         | 描述                             |
| ------ | -------------------------------- | -------------------------------- |
| 10003  | 传入参数不符合要求，请检查后重试 | 传入参数不符合要求，请检查后重试 |
| 10005  | 账户数据异常                     | 账户数据异常                     |
| 13002  | GPU云桌面执行操作失败            | GPU云桌面执行操作失败            |
| 10006  | 参数错误                         | 参数错误，暂不支持该操作         |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "requestContent": "{\"action\":\"off\",\"customerId\":\"E2129298\",\"funVmParam\":{\"action\":\"off\",\"instanceIds\":[\"a8d09bab-64d4-4549-9c8c-0efe19423e5e\"]},\"requestId\":\"ebbfcb70-a98f-11ec-926b-8aaa763f849e\",\"userFrom\":\"cdsapi\",\"userId\":\"713367\",\"vmIds\":[\"a8d09bab-64d4-4549-9c8c-0efe19423e5e\"]}",
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "taskId": "10e0284f-6ce5-4cb0-a61e-4858865d9295",
        "vmIds": [
            "a8d09bab-64d4-4549-9c8c-0efe19423e5e"
        ]
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def operateVm():
    '''
    云桌面电源操作
    :return:
    '''
    action = "OperateVm"
    method = "POST"
    body = {
        "vmIds": ["a8d09bab-64d4-4549-9c8c-0efe19423e5e"],
        "action": "off",  #"on", "off", "reboot"
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 24.RebuildVm

   **Action: RebuildVm**

  **描述：** 重装云桌面

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：GET**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                   | 描述     |
| --------- | ------ | -------- | -------------------------------------- | -------- |
| requestId | string | 是       | “6ca9ed98-27c8-4431-995f-59cc6d743dab” | 请求uuid |
| vmId      | string | 是       | “a8d09bab-64d4-4549-9c8c-0efe19423e5e” | vm Id    |
| imageId   | string | 是       | "dcd81283-d2e9-456d-9f03-803b83ecc25a" | 镜像id   |

   **返回参数：**

| 名称           | 类型   | 示例                                   | 描述                      |
| -------------- | ------ | -------------------------------------- | ------------------------- |
| Code           | string | Success                                | 返回状态码: Success: 成功 |
| Message        | string | null                                   | 返回信息                  |
| Data           | obejct | {}                                     | 返回数据                  |
| taskId         | string | “0b4b8f52-def3-466f-ac37-d1069590cbe9” | 任务id                    |
| vmId           | string | “a8d09bab-64d4-4549-9c8c-0efe19423e5e” | 云桌面id                  |
| requestId      | string | “6ca9ed98-27c8-4431-995f-59cc6d743dab” | 请求uuid                  |
| requestContent | string | “”                                     | 请求参数                  |

   **错误码:**

| 错误码 | 错误信息                                         | 描述                                             |
| ------ | ------------------------------------------------ | ------------------------------------------------ |
| 10007  | 当前账户权限不足                                 | 当前账户权限不足                                 |
| 10005  | 账户数据异常                                     | 账户数据异常                                     |
| 13004  | 当前状态无法重装，仅支持关机状态的云桌面进行重装 | 当前状态无法重装，仅支持关机状态的云桌面进行重装 |
| 10003  | 传入参数不符合要求                               | 传入参数不符合要求                               |
| 13002  | GPU云桌面执行操作失败                            | GPU云桌面执行操作失败                            |
| 10006  | 参数错误                                         | 参数错误,无对应云桌面信息                        |
| 10008  | 系统内数据错误                                   | 系统内数据错误,商品信息查询失败                  |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "requestContent": "vmId=a8d09bab-64d4-4549-9c8c-0efe19423e5e",
        "requestId": "6ca9ed98-27c8-4431-995f-59cc6d743dab",
        "taskId": "0b4b8f52-def3-466f-ac37-d1069590cbe9",
        "vmId": "a8d09bab-64d4-4549-9c8c-0efe19423e5e"
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def rebuildVm():
    '''
    重装云桌面
    :return:
    '''
    action = "RebuildVm"
    method = "GET"
    param = {"vmId": "a8d09bab-64d4-4549-9c8c-0efe19423e5e","imageId": "dcd81283-d2e9-456d-9f03-803b83ecc25a","requestId": "6ca9ed98-27c8-4431-995f-59cc6d743dab"}
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 25.DeleteVm

   **Action: DeleteVm**

  **描述：** 删除云桌面

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                   | 描述     |
| --------- | ------ | -------- | -------------------------------------- | -------- |
| requestId | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e” | 请求uuid |
| vmId      | string | 是       | “a8d09bab-64d4-4549-9c8c-0efe19423e5e” | vm Id    |

   **返回参数：**

| 名称           | 类型   | 示例                                   | 描述                      |
| -------------- | ------ | -------------------------------------- | ------------------------- |
| Code           | string | Success                                | 返回状态码: Success: 成功 |
| Message        | string | null                                   | 返回信息                  |
| Data           | obejct | {}                                     | 返回数据                  |
| taskId         | string | “8eb19f5b-fd44-4225-94f5-0f9e39e56695” | 任务id                    |
| vmId           | string | “a8d09bab-64d4-4549-9c8c-0efe19423e5e” | 云桌面id                  |
| requestId      | string | “ebbfcb70-a98f-11ec-926b-8aaa763f849e” | 请求uuid                  |
| requestContent | string | “”                                     | 请求参数                  |

   **错误码:**

| 错误码 | 错误信息              | 描述                  |
| ------ | --------------------- | --------------------- |
| 10003  | 传入参数不符合要求    | 传入参数不符合要求    |
| 10007  | 当前账户权限不足      | 当前账户权限不足      |
| 10005  | 账户数据异常          | 账户数据异常          |
| 13002  | GPU云桌面执行操作失败 | GPU云桌面执行操作失败 |
| 10006  | 参数错误              | 参数错误,云桌面不存在 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "requestContent": "{\"customerId\":\"E2129298\",\"funVmParam\":{\"instanceIds\":[\"a8d09bab-64d4-4549-9c8c-0efe19423e5e\"]},\"requestId\":\"ebbfcb70-a98f-11ec-926b-8aaa763f849e\",\"userFrom\":\"cdsapi\",\"userId\":\"713367\",\"vmId\":\"a8d09bab-64d4-4549-9c8c-0efe19423e5e\"}",
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "taskId": "8eb19f5b-fd44-4225-94f5-0f9e39e56695",
        "vmId": "a8d09bab-64d4-4549-9c8c-0efe19423e5e"
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def deleteVm():
    '''
    删除云桌面
    :return:
    '''
    action = "DeleteVm"
    method = "POST"
    body = {
        "vmId": "a8d09bab-64d4-4549-9c8c-0efe19423e5e",
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 26.ChangeVmName

   **Action: ChangeVmName**

  **描述：** 修改云桌面名称

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                   | 描述     |
| --------- | ------ | -------- | -------------------------------------- | -------- |
| requestId | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e” | 请求uuid |
| vmId      | string | 是       | “1f08cc62-c24b-46dd-b190-bf139d00ee82” | vm Id    |
| name      | string | 是       | “openapi_改名”                         | vm name  |

   **返回参数：**

| 名称    | 类型   | 示例    | 描述                      |
| ------- | ------ | ------- | ------------------------- |
| Code    | string | Success | 返回状态码: Success: 成功 |
| Message | string | null    | 返回信息                  |
| Data    | obejct | {}      | 返回数据                  |

   **错误码:**

| 错误码 | 错误信息           | 描述                  |
| ------ | ------------------ | --------------------- |
| 10003  | 传入参数不符合要求 | 传入参数不符合要求    |
| 10006  | 参数错误           | 参数错误,云桌面不存在 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": null,
    "Message": ""
}
```

   **请求调用示例**

```python
def changeVmName():
    '''
    修改云桌面名称
    :return:
    '''
    action = "ChangeVmName"
    method = "POST"
    body = {
        "vmId": "1f08cc62-c24b-46dd-b190-bf139d00ee82",
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "name": "openapi_改名"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 27.UpdateVmLabels

   **Action: UpdateVmLabels**

  **描述：** 修改云桌面备注（批量）

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                     | 描述     |
| --------- | ------ | -------- | ---------------------------------------- | -------- |
| requestId | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e”   | 请求uuid |
| vmIds     | array  | 是       | [“1f08cc62-c24b-46dd-b190-bf139d00ee82”] | vm Ids   |
| label     | string | 是       | “备注”                                   | 备注     |

   **返回参数：**

| 名称    | 类型   | 示例    | 描述                      |
| ------- | ------ | ------- | ------------------------- |
| Code    | string | Success | 返回状态码: Success: 成功 |
| Message | string | null    | 返回信息                  |
| Data    | obejct | {}      | 返回数据                  |

   **错误码:**

| 错误码 | 错误信息           | 描述               |
| ------ | ------------------ | ------------------ |
| 10003  | 传入参数不符合要求 | 传入参数不符合要求 |
| 13015  | 更新云桌面备注失败 | 更新云桌面备注失败 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": null,
    "Message": ""
}
```

   **请求调用示例**

```python
def updateVmLabels():
    '''
    修改云桌面备注（批量）
    :return:
    '''
    action = "UpdateVmLabels"
    method = "POST"
    body = {
        "vmIds": ["1f08cc62-c24b-46dd-b190-bf139d00ee82"],
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "label": "备注"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 28.ChangeAccount

   **Action: ChangeAccount**

  **描述：** 实例修改绑定账户

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                   | 描述         |
| --------- | ------ | -------- | -------------------------------------- | ------------ |
| requestId | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e” | 请求uuid     |
| vmId      | string | 是       | “1f08cc62-c24b-46dd-b190-bf139d00ee82” | vm Id        |
| accountId | string | 是       | “9294858a-3948-4ece-8378-f31daf6bff0b” | vm accountId |

   **返回参数：**

| 名称    | 类型   | 示例    | 描述                      |
| ------- | ------ | ------- | ------------------------- |
| Code    | string | Success | 返回状态码: Success: 成功 |
| Message | string | null    | 返回信息                  |
| Data    | obejct | {}      | 返回数据                  |

   **错误码:**

| 错误码 | 错误信息              | 描述                                                         |
| ------ | --------------------- | ------------------------------------------------------------ |
| 10003  | 传入参数不符合要求    | 传入参数不符合要求                                           |
| 13011  | 换绑GPU云桌面实例失败 | 对没有绑定用户的云桌面在已开机和已关机的状态下都可以绑定用户，对于已经绑定用户的云桌面仅在已关机的状态下可以换绑用户 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": null,
    "Message": ""
}
```

   **请求调用示例**

```python
def changeAccount():
    '''
    实例修改绑定账户
    :return:
    '''
    action = "ChangeAccount"
    method = "POST"
    body = {
        "vmId": "1f08cc62-c24b-46dd-b190-bf139d00ee82",
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "accountId": "9294858a-3948-4ece-8378-f31daf6bff0b"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 29.UnbindAccounts

   **Action: UnbindAccounts**

  **描述：** 实例解绑账户（批量）

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                     | 描述     |
| --------- | ------ | -------- | ---------------------------------------- | -------- |
| requestId | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e”   | 请求uuid |
| vmIds     | array  | 是       | [“1f08cc62-c24b-46dd-b190-bf139d00ee82”] | vm Ids   |

   **返回参数：**

| 名称       | 类型   | 示例                                 | 描述                      |
| ---------- | ------ | ------------------------------------ | ------------------------- |
| Code       | string | Success                              | 返回状态码: Success: 成功 |
| Message    | string | null                                 | 返回信息                  |
| Data       | obejct | {}                                   | 返回数据                  |
| failedNum  | int    | 2                                    | 解绑失败数                |
| successNum | int    | 1                                    | 解绑成功数                |
| failedMsgs | list   | []                                   | 解绑失败错误信息          |
| messsage   | string | 对应云桌面不存在                     | 失败原因描述              |
| vmId       | string | 3b9e2d0c-a3a6-4817-9238-afffbbadd498 | 失败云桌面ID              |

   **错误码:**

| 错误码 | 错误信息              | 描述                                     |
| ------ | --------------------- | ---------------------------------------- |
| 10003  | 传入参数不符合要求    | 传入参数不符合要求                       |
| 13012  | 解绑GPU云桌面实例失败 | 仅支持已关机状态的云桌面执行解绑用户操作 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "failedMsgs": [
            {
                "messsage": "对应云桌面不存在",
                "vmId": "3b9e2d0c-a3a6-4817-9238-afffbbadd498"
            },
            {
                "messsage": "对应云桌面不存在",
                "vmId": "e55aa451-0655-4b18-a73f-3971ad5cba00"
            }
        ],
        "failedNum": 2,
        "successNum": 1
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def unbindAccounts():
    '''
    实例解绑账户（批量）
    :return:
    '''
    action = "UnbindAccounts"
    method = "POST"
    body = {
        "vmIds": [
            "1e13e8ac-b553-473d-9274-d9a9e513a5b1",
            "3b9e2d0c-a3a6-4817-9238-afffbbadd498",
            "e55aa451-0655-4b18-a73f-3971ad5cba00"
        ],
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 30.BindAccounts

   **Action: BindAccounts**

  **描述：** 实例绑定账户（批量）

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                     | 描述         |
| --------- | ------ | -------- | ---------------------------------------- | ------------ |
| requestId | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e”   | 请求uuid     |
| vmIds     | array  | 是       | [“1f08cc62-c24b-46dd-b190-bf139d00ee82”] | vm Ids       |
| accountId | string | 是       | “9294858a-3948-4ece-8378-f31daf6bff0b”   | vm accountId |

   **返回参数：**

| 名称       | 类型   | 示例                                 | 描述                      |
| ---------- | ------ | ------------------------------------ | ------------------------- |
| Code       | string | Success                              | 返回状态码: Success: 成功 |
| Message    | string | null                                 | 返回信息                  |
| Data       | obejct | {}                                   | 返回数据                  |
| failedNum  | int    | 2                                    | 绑定失败数                |
| successNum | int    | 1                                    | 绑定成功数                |
| failedMsgs | list   | []                                   | 绑定失败错误信息          |
| messsage   | string | 对应云桌面不存在                     | 失败原因描述              |
| vmId       | string | 3b9e2d0c-a3a6-4817-9238-afffbbadd498 | 失败云桌面ID              |

   **错误码:**

| 错误码 | 错误信息              | 描述                  |
| ------ | --------------------- | --------------------- |
| 10003  | 传入参数不符合要求    | 传入参数不符合要求    |
| 13013  | 绑定GPU云桌面实例失败 | 绑定GPU云桌面实例失败 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "failedMsgs": [
            {
                "messsage": "对应云桌面不存在",
                "vmId": "3b9e2d0c-a3a6-4817-9238-afffbbadd498"
            },
            {
                "messsage": "对应云桌面不存在",
                "vmId": "e55aa451-0655-4b18-a73f-3971ad5cba00"
            }
        ],
        "failedNum": 2,
        "successNum": 1
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def bindAccounts():
    '''
    实例绑定账户（批量）
    :return:
    '''
    action = "BindAccounts"
    method = "POST"
    body = {
        "vmIds": [
            "1e13e8ac-b553-473d-9274-d9a9e513a5b1",
            "3b9e2d0c-a3a6-4817-9238-afffbbadd498",
            "e55aa451-0655-4b18-a73f-3971ad5cba00"
        ],
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "accountId": "4f53fcf6-fea2-41ce-a260-12ad9307704f"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
    return result
```

### 31.ConfigNet

   **Action: ConfigNet**

  **描述：** 配置云桌面网络（批量）

   **请求地址:** cdsapi.capitalonline.net/gcw

   **请求方法：POST**

   **请求参数：**

| 名称      | 类型   | 是否必须 | 示例                                     | 描述     |
| --------- | ------ | -------- | ---------------------------------------- | -------- |
| requestId | string | 是       | “ebbfcb70-a98f-11ec-926b-8aaa763f849e”   | 请求uuid |
| vmIds     | array  | 是       | [“1f08cc62-c24b-46dd-b190-bf139d00ee82”] | vm Ids   |

   **返回参数：**

| 名称           | 类型   | 示例                                     | 描述                      |
| -------------- | ------ | ---------------------------------------- | ------------------------- |
| Code           | string | Success                                  | 返回状态码: Success: 成功 |
| Message        | string | null                                     | 返回信息                  |
| Data           | obejct | {}                                       | 返回数据                  |
| taskId         | string | “8eb19f5b-fd44-4225-94f5-0f9e39e56695”   | 任务id                    |
| vmIds          | array  | [“a8d09bab-64d4-4549-9c8c-0efe19423e5e”] | 云桌面id                  |
| requestId      | string | “ebbfcb70-a98f-11ec-926b-8aaa763f849e”   | 请求uuid                  |
| requestContent | string | “”                                       | 请求参数                  |

   **错误码:**

| 错误码 | 错误信息              | 描述                  |
| ------ | --------------------- | --------------------- |
| 10003  | 传入参数不符合要求    | 传入参数不符合要求    |
| 10005  | 账户数据异常          | 账户数据异常          |
| 13002  | GPU云桌面执行操作失败 | GPU云桌面执行操作失败 |

   **返回示例:**

```json
{
    "Code": "Success",
    "Data": {
        "requestContent": "{\"customerId\":\"CDS01236\",\"requestId\":\"ebbfcb70-a98f-11ec-926b-8aaa763f849e\",\"userFrom\":\"cdsapi\",\"userId\":\"681137\",\"vmIds\":[\"gcw-ecb427c719754291959c4073cff0217a\"]}",
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e",
        "taskId": "gcw-750f5ef099254fe599a994641d266195",
        "vmIds": [
            "gcw-ecb427c719754291959c4073cff0217a"
        ]
    },
    "Message": ""
}
```

   **请求调用示例**

```python
def configNet():
    '''
    配置云桌面网络
    :return:
    '''
    action = "ConfigNet"
    method = "POST"
    body = {
        "vmIds":[ "gcw-ecb427c719754291959c4073cff0217a"],
        "requestId": "ebbfcb70-a98f-11ec-926b-8aaa763f849e"
    }
    url = getUrl(action, AK, AccessKeySecret, method, CCS_URL, param={})
    res = requests.post(url,json=body)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        print ("request error: %s" % result.get("Message"))
    return result
```


## 弹性云服务器ECS相关

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
| BillingMethod     | 必选 | string | 计费方式 : "0"：按需计费; "1"：包年包月                      |

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
| ImageIds          | 可选 | list   | 镜像id列表                                                   |

**返回参数**

| 参数              | 类型   | 示例                                               | 说明                                |
| ----------------- | ------ | -------------------------------------------------- | ----------------------------------- |
| PageNumber        | int    | 1                                                  | 当前页数                            |
| PageSize          | int    | 1                                                  | 每页数据条数                        |
| TotalCount        | int    | 10                                                 | 总记录数                            |
| ImageList         | list   | []                                                 | 镜像列表                            |
| TemplateType      | string | public                                             | 公共镜像为public，私有镜像为private |
| ImageId           | string | img-46faai4r9rnbu639                               | 镜像id                              |
| ImageName         | string | gpu-private-Ubuntu-20.04-E104616-Geforce-V20220830 | 镜像名称                            |
| Status            | string | running                                            | 镜像状态code                        |
| OsType            | string | Ubuntu                                             | 镜像类型                            |
| OsBit             | int    | 64                                                 | 系统位数                            |
| StatusDisplay     | string | 可用                                               | 镜像状态中文                        |
| AvailableZoneCode | string | CN_Dongguan_A                                      | 可用区code                          |
| CreateTime        | string | 2022-08-30 12:30:48                                | 创建时间                            |
| OsSize            | int    | 40                                                 | 镜像容量(GB)                        |

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
                "AvailableZoneCode": "CN_DaBieShan_A"
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

| 参数              | 类型     | 示例                | 说明                               |
| ----------------- | -------- | ------------------- | ---------------------------------- |
| PageNumber        | int      | 1                   | 当前页数                           |
| PageSize          | int      | 1                   | 每页数据条数                       |
| TotalCount        | int      | 10                  | 总记录数                           |
| EcsList           | list     | []                  | 云服务器列表                       |
| Status            | string   | shutdown            | 云服务器状态码                     |
| StatusDisplay     | string   | 已关机              | 云服务器状态                       |
| PrivateNet        | string   | 10.10.10.10         | 私网ip                             |
| PubNet            | string   | 10.10.10.11         | 默认虚拟出网网关ip                 |
| VirtualNet        | list     | []                  | 其他线路出网网关ip列表             |
| EipInfo           | dict     | {}                  | 出网网关ip和公网ip对应字典         |
| ConfName          | string   | 电信                | 网络带宽运营商，如电信、移动、联通 |
| EipIp             | string   | 111.111.111.111     | 公网ip                             |
| CreateTime        | datetime | 2022-07-22 16:41:28 | 创建时间                           |
| EcsFamilyName     | string   | 专业渲染型rp3       | 规格族名称                         |
| CpuSize           | int      | 16                  | Cpu大小                            |
| RamSize           | int      | 32                  | 内存大小                           |
| IsGpu             | bool     | true                | 是否是gpu类型                      |
| GpuSize           | int      | 1                   | 显卡数量                           |
| CardName          | string   | NVIDIA RTX A5000    | 显卡型号                           |
| BillingMethodName | string   | 包年包月            | 计费方式名称                       |
| EndBillTime       | datetime | 2022-08-22 16:41:28 | 到期时间                           |
| IsAutoRenewal     | string   | 0                   | 到期是否自动续约                   |
| ImageName         | string   | Centos 7.4 64位     | 镜像名称                           |
| SystemDiskType    | string   | SSD云盘             | 系统盘类型                         |
| SystemDiskSize    | int      | 24                  | 系统盘大小                         |

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
                "EcsFamilyName": "CPU密集计算型I3"
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
| BillingMethod     | 必选 | string | 计费方式："0": 按需  "1":包月                                |
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

| 参数          | 类型     | 示例                                                         | 说明                |
| ------------- | -------- | ------------------------------------------------------------ | ------------------- |
| EcsId         | string   | "ins-abcr50fvgj45fgqw"                                       | 云服务器id          |
| EcsName       | string   | "test1.计算-6"                                               | 云服务器名称        |
| RegionId      | string   | "abcr50fvgj45fgqw"                                           | 地域id              |
| RegionName    | string   | "北京"                                                       | 地域名称            |
| AzId          | string   | "abcr50fvgj45fgqw"                                           | 可用区id            |
| AzName        | string   | "可用区A"                                                    | 可用区名称          |
| Status        | string   | "running"                                                    | 状态码              |
| StatusDisplay | string   | "运行中"                                                     | 状态                |
| IsGpu         | int      | 1:是 0:不是                                                  | 是否是gpu型云服务器 |
| CreateTime    | datetime | 2022-07-22 16:41:28                                          | 创建时间            |
| EndBillTime   | datetime | 2022-08-22 16:41:28                                          | 到期时间            |
| IsAutoRenewal | string   | 1                                                            | 是否自动续约        |
| TimeZone      | sting    | UTC                                                          | 时区                |
| EcsRule       | dict     | {<br/>      "Name": "Cpu密集计算型I3",  //  规格族名称<br/>      "CpuNum": 1,<br/>      "CpuUnit": "核",<br/>      "Ram": 1,<br/>      "Ram": 0,<br/>      "RamUnit": "个",<br/>      "RamUnit": "GiB"<br/> } | 规格                |
| OsInfo        | dict     | {<br/>      "ImageId": "2a602ae4-d4fd-11ec-bd6f-5ee3d36afa8f",<br/>      "ImageName": "create-image1",<br/>      "OsType": "Centos",<br/>      "Bit": 64,<br/>      "Version": "7.4"<br/>    } | 系统信息            |
| Disk          | dict     | {<br/>      "SystemDiskConf": {<br/>        "ReleaseWithInstance": true,<br/>        "DiskType": "system",<br/>        "Name": "ssd_20220721",<br/>        "Size": 24,<br/><br/>        "DiskIops": 2520,<br/>        "BandMbps": 96,<br/>        "Unit": "GB",<br/>        "DiskId": "disk-dj3g8odrnwqdrybj",<br/>        "DiskFeature": "ssd"<br/>      },<br/>      "DataDiskConf": [] | 硬盘信息            |
| Pipe          | dict     | {<br/>      "VpcName": "Ram服务器",<br/>      "VpcId": "7ab97a9a-8c0f-11ec-9b99-d2fedeecdbd1",<br/>      "SubnetId": "2cee7596-bbbb-11ec-a287-debf4cca37ce",<br/>      "SubnetName": "test-kvm",<br/>      "CreateTime": "2022-04-14 14:21:52",<br/>      "PrivateNet": "10.1.128.53",<br/>      "PubNet": "",<br/>      "VirtualNet": [],<br/>      "EipInfo": {<br/>        "10.1.128.53": {<br/>          "ConfName": "",<br/>          "EipIp": "",<br/>          "CurrentUseQos": ""<br/>        }<br/>      }<br/>    } | 网络信息            |
| BillingInfo   | dict     | {<br/>      "BillingMethod": "1",<br/>      "BillingMethodName": "包年包月",<br/>      "BillingStatus": "正常",<br/>      "BillCycleId": "month"<br/>    } | 计费信息            |

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
| BillingMethod     | 必选 | string | 计费方式："0": 按需  "1":包年包月                            |
| Password          | 必选 | string | 登录密码                                                     |
| ImageId           | 必选 | string | 镜像id或者镜像名称(**DescribeImage**返回值中的ImageName或者ImageId) |
| SystemDisk        | 必选 | dict   | 系统盘信息，示例:{<br/>        "DiskFeature":"local", # 盘类型: 本地盘:"local", 云盘:"ssd"<br/>         "Size":50 # 盘大小<br/>    }<br/> |
| VpcInfo           | 必选 | dict   | vpc信息，示例:{<br/>        "VpcId":"7ab97a9a-8c0f-11ec-9b99-d2fedeecdbd1"<br/>    } |
| SubnetInfo        | 必选 | dict   | 私有网络信息，示例：{<br/>        "SubnetId":"2cee7596-bbbb-11ec-a287-debf4cca37ce" # 子网id<br/>    } |
| PubnetInfo        | 可选 | list   | 公网信息(window系统最多只能设置一个公网网关，linux系统最多三个。网关中有且只能有一个默认出网网关){<br/>    "SubnetId":"2cee7596-bbbb-11ec-a287-debf4cca37ce",<br/>    "IpType":"",# 两种类型: 默认出网网关:"default_gateway",其他虚拟网关：”virtual“<br/>    "EipIds":[]<br/>} |
| Name              | 可选 | string | 云服务器名,不传自动赋予（自动命名规则：ecs-创建日期）        |
| StartNumber       | 可选 | int    | 云服务器名称编号起始数字，不需要服务器编号可不传             |
| Duration          | 可选 | int    | 只在包月算价时有意义，以月份为单位，一年值为12，大于一年要输入12的整数倍，最大值36(3年) |
| IsToMonth         | 可选 | int    | 包月是否到月底 1:是  0:否 默认为1。如2022-07-22购买，传值为1，则到期时间为2022-08-01；值为0，则到期时间为2022-08-22 |
| IsAutoRenewal     | 可选 | int    | 是否自动续约，包月时需传。1:是  0:否 默认为1                 |
| UtcTime           | 可选 | int    | 是否utc时间，1:是  0:否 默认为0（默认UTC+8，上海时间）       |
| DataDisk          | 可选 | list   | 数据盘信息。仅支持云盘，示例：[{<br/>        "DiskFeature":"local", # 盘类型，"local"：本地盘，"ssd": ssd云盘.  本地盘和云盘不能混用<br/>        "ReleaseWithInstance":1, # 是否随实例删除:1:随实例删除,0:不随实例删除.不传默认随实例删除<br/>         "Size":50 # 盘大小<br/>    }] |
| DnsList           | 可选 | list   | dns 解析 需要两个元素  [主dns，从dns]，不选采用默认通用DNS   |

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
            "ReleaseWithInstance": 0  
        },   
        "VpcInfo":{
            "VpcId":"7ab97a9a-8c0f-11ec-9b99-d2fedeecdbd1"
        },
        "SubnetInfo":{
            "SubnetId":"2cee7596-bbbb-11ec-a287-debf4cca37ce"
        },
        "Name":"",
        "StartNumber":0,
        "Password":"123QWEqwe"
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

| 参数   | 要求 | 类型   | 说明                                                         |
| ------ | ---- | ------ | ------------------------------------------------------------ |
| EcsIds | 必选 | list   | 云服务器id列表                                               |
| OpType | 必选 | string | 操作类型：<br/>开机:"start_up_ecs" <br/>关机:"shutdown_ecs"<br/>重启:"restart_ecs"<br/>强制关机:"hard_shutdown_ecs" |

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

| 参数   | 要求 | 类型 | 说明           |
| ------ | ---- | ---- | -------------- |
| EcsIds | 必选 | list | 云服务器id列表 |

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

### **16.CreateImage**

**Action**: CreateImage

**描述**:创建私有镜像

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：POST

**请求参数**

| 参数  | 要求 | 类型   | 说明     |
| ----- | ---- | ------ | -------- |
| EcsId | 必选 | string | 实例ID   |
| Name  | 必选 | string | 镜像名称 |

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
    resp = requests.get(url, json=body)
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
| 404          | InvalidEcsId.NotFound                      | The specified instance does not exist.                       | 指定的实例不存在                                         |
| 404          | InvalidVpc.NotFound                        | The specified vpc does not exist.                            | 指定的Vpc不存在                                          |
| 404          | InvalidImage.NotFound                      | The specified image does not exist.                          | 指定的镜像不存在                                         |
| 404          | InvalidEvent.NotFound                      | The specified event does not exist.                          | 指定的事件不存在                                         |
| 500          | InternalError                              | The request processing has failed due to some unknown error, exception or failure. | 内部错误，请重试。如果多次尝试失败，请提交工单           |

## 云盘EBS相关

**云盘状态(Status)说明**

| code       | 说明     |
| ---------- | -------- |
| building   | 创建中   |
| build_fail | 创建失败 |
| running    | 使用中   |
| mounting   | 挂载中   |
| unmounting | 卸载中   |
| waiting    | 待挂载   |
| updating   | 更新中   |
| error      | 错误     |

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

| 参数    | 说明       | 类型 | 是否必传 | 示例               |
| ------- | ---------- | ---- | -------- | ------------------ |
| DiskIds | 云盘id列表 | list | 是       | ["disk1", "disk2"] |

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

**请求方法**：GET

**请求参数：**

| 参数              | 说明       | 类型   | 是否必传 | 示例        |
| ----------------- | ---------- | ------ | -------- | ----------- |
| AvailableZoneCode | 可用区Code | string | 否       | CN_Suqian_A |
| RegionCode        | 地域Code   | string | 否       | CN_Suqian   |
| PageNumber        | 页码       | int    | 否       | 1           |
| PageSize          | 每页记录数 | int    | 否       | 20          |

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

## 快照SNAPSHOT相关

**快照状态(Status)说明**

| code               | 说明                                      |
| ------------------ | ----------------------------------------- |
| creating           | 创建中                                    |
| create_fail        | 创建失败                                  |
| running            | 运行中                                    |
| deleting           | 删除中（逻辑删除）                        |
| disk_creating      | 创建云盘中                                |
| disk_rollback      | 回滚云盘中                                |
| deleted            | 已删除                                    |
| recycling          | 回收中                                    |
| cancel_recycling   | 取消回收                                  |
| destroy            | 已销毁                                    |
| destroying         | 销毁中（gic展示删除中）                   |
| recycle_destroying | 回收销毁中（回收流程物理销毁，gic不展示） |
| error              | 错误                                      |

### 1.DescribeSnapshotList

**Action**: DescribeSnapshotList

**描述**:  查询云盘快照列表

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：GET

**请求参数**：

| 参数              | 说明       | 类型   | 是否必传 | 示例        |
| ----------------- | ---------- | ------ | -------- | ----------- |
| AvailableZoneCode | 可用区Code | string | 否       | CN_Suqian_A |
| RegionCode        | 地域Code   | string | 否       | CN_Suqian   |
| DiskId            | 云盘ID     | String | 否       | disk-**     |
| PageNumber        | 页码       | int    | 否       | 1           |
| PageSize          | 每页记录数 | int    | 否       | 20          |

**返回参数**：

| 参数              | 类型   | 示例                            | 说明                                                         |
| ----------------- | ------ | ------------------------------- | ------------------------------------------------------------ |
| PageNumber        | int    | 1                               | 当前页数                                                     |
| PageSize          | int    | 1                               | 每页数据条数                                                 |
| TotalCount        | int    | 10                              | 总记录数                                                     |
| SnapshotList      | list   | []                              | 快照id列表                                                   |
| RegionCode        | string | CN_Suqian                       | 地域Code                                                     |
| AvailableZoneCode | string | CN_Suqian_A                     | 可用区Code                                                   |
| SnapshotId        | string | s-disk-xftwc38r6ja63wr8-zg0y-01 | 快照ID                                                       |
| SnapshotName      | string | s-disk-xftwc38r6ja63wr8-zg0y-01 | 快照名称                                                     |
| DiskId            | string | disk-xftwc38r6ja63wr8           | 云盘ID                                                       |
| DiskName          | string | disk-xftwc38r6ja63wr8           | 云盘名称                                                     |
| DiskProperty      | string | system                          | system:系统盘 data数据盘                                     |
| DiskSize          | int    | 40                              | 盘容量,单位:GB                                               |
| CreateTime        | Date   | 2022-10-10 07:45:42             | 快照创建时间                                                 |
| ReservedTime      | string | 1                               | Forever:永久保留，当云盘删除时快照跟随云盘删除；具体数字为保留天数。 |
| SnapshotStatus    | string | 0                               | 快照状态                                                     |

**请求示例**

```python
def describe_snapshot_list():
    """
    获取快照列表
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "DescribeSnapshotList"
    method = "GET"
    param = {
        "AvailableZoneCode":"CN_Hohhot_B"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    return result
```

**返回实例**

```json
{
    "Code": "Success",
    "Msg": "获取快照列表成功！",
    "Data": {
        "SnapshotList": [
            {
                "SnapshotId": "s-disk-tyvgscgr1ria5ftt-aa22-01",
                "SnapshotName": "-2222222",
                "DiskId": "disk-tyvgscgr1ria5ftt",
                "DiskName": "ssd-20221010",
                "DiskSize": 24,
                "ReservedTime": "Forever",
                "SnapshotStatus": "running",
                "CreateTime": "2022-10-10 11:18:49",
                "RegionCode": "CN_Huhhot",
                "AvailableZoneCode": "CN_Hohhot_B",
                "DiskProperty": "data"
            }
        ]
    },
    "PageNumber": 1,
    "PageSize": 1,
    "TotalCount": 1
}
```

### 2.DescribeSnapshot

**Action**: DescribeSnapshot

**描述**:  查询某一快照信息

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：GET

**请求参数**：

| 参数       | 说明   | 类型   | 是否必传 | 示例                            |
| ---------- | ------ | ------ | -------- | ------------------------------- |
| SnapshotId | 快照ID | string | 否       | s-disk-tyvgscgr1ria5ftt-aa22-01 |

**返回参数**：

| 参数              | 类型   | 示例                            | 说明                                                         |
| ----------------- | ------ | ------------------------------- | ------------------------------------------------------------ |
| PageNumber        | int    | 1                               | 当前页数                                                     |
| PageSize          | int    | 1                               | 每页数据条数                                                 |
| TotalCount        | int    | 10                              | 总记录数                                                     |
| SnapshotList      | list   | []                              | 快照id列表                                                   |
| RegionCode        | string | CN_Suqian                       | 地域Code                                                     |
| AvailableZoneCode | string | CN_Suqian_A                     | 可用区Code                                                   |
| SnapshotId        | string | s-disk-xftwc38r6ja63wr8-zg0y-01 | 快照ID                                                       |
| SnapshotName      | string | s-disk-xftwc38r6ja63wr8-zg0y-01 | 快照名称                                                     |
| DiskId            | string | disk-xftwc38r6ja63wr8           | 云盘ID                                                       |
| DiskName          | string | disk-xftwc38r6ja63wr8           | 云盘名称                                                     |
| DiskProperty      | string | system                          | system:系统盘 data数据盘                                     |
| DiskSize          | int    | 40                              | 盘容量,单位:GB                                               |
| CreateTime        | Date   | 2022-10-10 07:45:42             | 快照创建时间                                                 |
| ReservedTime      | string | 1                               | Forever:永久保留，当云盘删除时快照跟随云盘删除；具体数字为保留天数。 |
| SnapshotStatus    | string | 0                               | 快照状态                                                     |

**请求示例**

```python
def describe_snapshot_detail():
    """
    获取快照详情
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "DescribeSnapshot"
    method = "GET"
    param = {
        "SnapshotId": "s-disk-tyvgscgr1ria5ftt-aa22-01",
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content, )
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "获取快照详情成功！",
    "Data": {
        "SnapshotInfo": {
            "SnapshotId": "s-disk-tyvgscgr1ria5ftt-aa22-01",
            "SnapshotName": "-2222222",
            "DiskId": "disk-tyvgscgr1ria5ftt",
            "DiskName": "ssd-20221010",
            "DiskSize": 24,
            "ReservedTime": "Forever",
            "SnapshotStatus": "running",
            "CreateTime": "2022-10-10 11:18:49",
            "RegionCode": "CN_Huhhot",
            "AvailableZoneCode": "CN_Hohhot_B",
            "DiskProperty": "data"
        }
    }
}
```


### 3.DescribeSnapshotChainList

**Action**: DescribeSnapshotChainList

**描述**:  查询快照链列表

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：GET

**请求参数**：

| 参数              | 说明       | 类型   | 是否必传 | 示例        |
| ----------------- | ---------- | ------ | -------- | ----------- |
| AvailableZoneCode | 可用区Code | string | 否       | CN_Suqian_A |
| RegionCode        | 地域Code   | string | 否       | CN_Suqian   |
| DiskId            | 云盘ID     | String | 否       | disk-**     |
| InstanceId        | 云主机ID   | String | 否       | ins-**      |
| PageNumber        | 页码       | int    | 否       | 1           |
| PageSize          | 每页记录数 | int    | 否       | 20          |

**返回参数**：

| 参数              | 类型   | 示例                          | 说明                                          |
| ----------------- | ------ | ----------------------------- | --------------------------------------------- |
| PageNumber        | int    | 1                             | 当前页数                                      |
| PageSize          | int    | 1                             | 每页数据条数                                  |
| TotalCount        | int    | 10                            | 总记录数                                      |
| SnapshotChainList | list   | []                            | 快照链列表                                    |
| RegionCode        | string | CN_Suqian                     | 地域Code                                      |
| AvailableZoneCode | string | CN_Suqian_A                   | 可用区Code                                    |
| SnapshotChainId   | string | sl-disk-tyvgscgr1ria5ftt-aa22 | 快照链ID                                      |
| InstanceId        | string | ins-**                        | 云主机ID                                      |
| InstanceName      | string | ins-**                        | 云主机名称                                    |
| DiskId            | string | disk-**                       | 云盘ID                                        |
| DiskName          | string | disk-**                       | 云盘名称                                      |
| DiskProperty      | string | system                        | system:系统盘 data数据盘                      |
| DiskSize          | int    | 40                            | 盘容量,单位:GB                                |
| SnapshotNum       | int    | 5                             | 该快照链下的快照数量                          |
| SnapshotSize      | double | 20.13                         | 快照链容量，单位为GB                          |
| BillingMethod     | string | 0                             | 计费方式 ，0:按需计费, 1:包年包月, 2:按次计费 |

**请求示例**

```python
def describe_snapshot_chains_list():
    """
    获取快照链列表
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "DescribeSnapshotChainList"
    method = "GET"
    param = {
        "AvailableZoneCode":"CN_Hohhot_B"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content, )
    return result

```

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "获取快照链列表成功！",
    "Data": {
        "SnapshotChainList": [
            {
                "BillingMethod": "0",
                "DiskId": "disk-tyvgscgr1ria5ftt",
                "DiskName": "ssd-20221010",
                "DiskSize": 24,
                "InstanceId": "",
                "InstanceName": "",
                "SnapshotNumber": 1,
                "RegionCode": "CN_Huhhot",
                "AvailableZoneCode": "CN_Hohhot_B",
                "DiskProperty": "data",
                "SnapshotChainId": "sl-disk-tyvgscgr1ria5ftt-aa22",
                "SnapshotSize": 0.0
            }
        ]
    },
    "PageNumber": 1,
    "PageSize": 1,
    "TotalCount": 1
}
```

### 4.DescribeSnapshotChain

**Action**: DescribeSnapshotChain

**描述**:  查询快照链下的详细信息

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：GET

**请求参数**：

| 参数            | 说明       | 类型   | 是否必传 | 示例                          |
| --------------- | ---------- | ------ | -------- | ----------------------------- |
| DiskId          | 云盘ID     | string | 否       | disk-1i5ybswrg8zrj9le         |
| SnapshotChainId | 快照链ID   | string | 否       | sl-disk-1i5ybswrg8zrj9le-zl08 |
| PageNumber      | 页码       | int    | 否       | 1                             |
| PageSize        | 每页记录数 | int    | 否       | 20                            |

**返回参数**：

| 参数              | 类型   | 示例                            | 说明                                                         |
| ----------------- | ------ | ------------------------------- | ------------------------------------------------------------ |
| PageNumber        | int    | 1                               | 当前页数                                                     |
| PageSize          | int    | 1                               | 每页数据条数                                                 |
| TotalCount        | int    | 10                              | 总记录数                                                     |
| SnapshotChainId   | string | sl-disk-xftwc38r6ja63wr8-zg0y   | 快照链ID                                                     |
| InstanceId        | string | ins-6xu4as3r285r89ie            | 云主机ID                                                     |
| InstanceName      | string | 云主机名称                      | 云主机名称                                                   |
| DiskId            | string | disk-1i5ybswrg8zrj9le           | 云盘ID                                                       |
| DiskName          | string | ssd_20221019                    | 云盘名称                                                     |
| DiskProperty      | string | system                          | system:系统盘 data：数据盘                                   |
| DiskSize          | int    | 40                              | 盘容量,单位:GB                                               |
| SnapshotNum       | int    | 5                               | 该快照链下的快照数量                                         |
| SnapshotSize      | double | 46.47GB                         | 快照链容量，单位为GB                                         |
| BillingMethod     | string | 0                               | 计费方式 ，0:按需计费                                        |
| SnapshotList      | list   | object[]                        | 快照列表                                                     |
| RegionCode        | string | CN_Suqian                       | 地域Code                                                     |
| AvailableZoneCode | string | CN_Suqian_A                     | 可用区Code                                                   |
| SnapshotId        | string | s-disk-xftwc38r6ja63wr8-zg0y-01 | 快照ID                                                       |
| SnapshotName      | string | s-disk-xftwc38r6ja63wr8-zg0y-01 | 快照名称                                                     |
| DiskId            | string | disk-xftwc38r6ja63wr8           | 云盘ID                                                       |
| DiskName          | string | disk-xftwc38r6ja63wr8           | 云盘名称                                                     |
| DiskProperty      | string | system                          | system:系统盘 data：数据盘                                   |
| DiskSize          | int    | 40                              | 盘容量,单位:GB                                               |
| CreateTime        | string | 2022-10-10 07:45:42             | 快照创建时间                                                 |
| ReservedTime      | string | 1                               | Forever:永久保留，当云盘删除时快照跟随云盘删除；具体数字为保留天数。 |
| SnapshotStatus    | string | running                         | 快照状态                                                     |

**请求示例：**

~~~python
def ebs_describe_snapshot_chain():
    """
    获取快照链详情
    """
    ecs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "DescribeSnapshotChain"
    method = "GET"
    param = {
        "DiskId": "disk-1i5ybswrg8zrj9le",
        "SnapshotChainId": "sl-disk-1i5ybswrg8zrj9le-zl08",
        "PageNumber": "1",
        "PageSize": "20"
    }

    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    return result
~~~



**返回示例：**

~~~json
{
    "Code": "Success",
    "Msg": "获取获取快照链详情！",
    "Data": {
        "DiskId": "disk-1i5ybswrg8zrj9le",
        "DiskName": "ssd_20221019",
        "DiskSize": 40,
        "InstanceId": "ins-6xu4as3r285r89ie",
        "InstanceName": "lzliu-test1",
        "SnapshotSize": "46.47GB",
        "BillingMethod": "0",
        "SnapshotChainId": "sl-disk-1i5ybswrg8zrj9le-zl08",
        "DiskProperty": "system",
        "SnapshotNum": 1,
        "SnapshotList": [
            {
                "SnapshotId": "s-disk-1i5ybswrg8zrj9le-zl08-01",
                "SnapshotName": "test-openapi-create",
                "DiskId": "disk-1i5ybswrg8zrj9le",
                "DiskName": "ssd_20221019",
                "DiskSize": 40,
                "ReservedTime": "1",
                "SnapshotStatus": "running",
                "CreateTime": "2022-10-19 17:21:18",
                "DiskProperty": "system",
                "AvailableZoneCode": "CN_Suqian_B",
                "RegionCode": "CN_Suqian"
            }
        ]
    }
    "PageNumber": 1,
    "PageSize": 20,
    "TotalCount": 1
}
~~~

### 5.CreateSnapshot

**Action**: CreateSnapshot

**描述**:  创建单个云盘快照

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：POST

**请求参数**

| 参数         | 说明         | 类型   | 是否必传 | 示例                                                         |
| ------------ | ------------ | ------ | -------- | ------------------------------------------------------------ |
| DiskId       | 云盘ID       | string | 是       | disk-1i5ybswrg8zrj9le                                        |
| SnapshotName | 快照名称     | string | 否       | 不传默认与快照id一致，快照名称允许使用2-128个字符，不允许使用auto作为开头，允许大小写字母、数字、汉字和“-” |
| ReservedTime | 快照保留时间 | string | 否       | 不传递该参数默认为1。Forever:永久保留，当云盘删除时快照跟随云盘删除；具体数字为保留天数。 |

**返回参数**

| 参数       | 类型   | 示例                                 | 说明   |
| ---------- | ------ | ------------------------------------ | ------ |
| EventId    | string | 11c4ad90-122c-11ed-b996-7ae483eaf4a4 | 事件id |
| SnapshotId | string | s-disk-r5cqowzrkcdzsyyj-aez6-01      | 快照id |

**请求示例：**

~~~python
def ebs_create_snapshot():
    """
    创建快照任务下发
    """
    ecs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "CreateSnapshot"
    method = "POST"
    param = {}
    body = {
        "DiskId": "disk-1i5ybswrg8zrj9le",
        "SnapshotName": "test-openapi-create",
        "ReservedTime": "1"
    }

    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    return result
~~~

**返回示例：**

~~~json
{
    "Code": "Success",
    "Msg": "创建快照任务下发成功！",
    "Data": {
        "EventId": "639e2f92-4f8f-11ed-ae23-be26ad5c0652",
      "SnapshotId":"s-disk-r5cqowzrkcdzsyyj-aez6-01"
    }
}
~~~



### 6.RollbackDiskBySnapshot

**Action**: RollbackDiskBySnapShot

**描述**：使用快照回滚云盘

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：POST

**请求参数：**

| 参数               | 说明                   | 类型   | 是否必传 | 示例                                                         |
| ------------------ | ---------------------- | ------ | -------- | ------------------------------------------------------------ |
| DiskId             | 要回滚的云盘ID         | string | 是       | disk-pnmgbrfrk2q64w48                                        |
| SnapshotId         | 快照ID                 | string | 是       | s-disk-pnmgbrfrk2q64w48-u1pa-05                              |
| NewSnapshot        | 新快照信息             | dict   | 否       | {<br/>        "SnapshotName": "rollback_test", #新建快照名称<br/>        "ReservedTime": "1" #新建快照保留时间<br/>} |
| AutoTurnOnInstance | 是否自动开启云主机电源 | int    | 否       | 1：开启，0：不开启，默认为1                                  |

**返回参数**

| 参数    | 类型   | 示例                                 | 说明   |
| ------- | ------ | ------------------------------------ | ------ |
| EventId | string | 11c4ad90-122c-11ed-b996-7ae483eaf4a2 | 事件id |

**请求示例**

```python
def ebs_rollback_disk_by_snapshot():
    """
    通过快照回滚云盘
    """
    ecs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "RollbackDiskBySnapshot"
    method = "POST"
    param = {}
    body = {
        "DiskId": "disk-pnmgbrfrk2q64w48",
        "SnapshotId": "s-disk-pnmgbrfrk2q64w48-u1pa-05",
        "NewSnapshot": {
            "SnapshotName": "rollback_test",
            "ReservedTime": "1"
        }
        "AutoTurnOnInstance": 1
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
    "Msg": "通过快照回滚云盘任务下发成功",
    "Data": {
        "EventId": "6d905a30-4f7a-11ed-9cd1-eaf7f2590855"
    }
}
```

### 7.RenameSnapshot

**Action**: RenameSnapshot

**描述**：修改快照名称

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：POST

**请求参数：**

| 参数         | 说明     | 类型   | 是否必传 | 示例                                                         |
| ------------ | -------- | ------ | -------- | ------------------------------------------------------------ |
| SnapshotId   | 快照ID   | string | 是       | s-disk-xftwc38r6ja63wr8-zg0y-01                              |
| SnapshotName | 快照名称 | string | 是       | 新的快照名称。允许用户自定义名称，避免与自动快照（后续规划功能）命名重复，不允许使用auto作为开头，字符长度为2-126，允许大小写字母、数字、汉字和“-” |

**请求示例**

```python
def rename_snapshot():
    """
    修改快照名称
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "RenameSnapshot"
    method = "POST"
    param = {}
    body = {
        "SnapshotId":"s-disk-gsy63hjr41fr33op-ajca-05",
        "SnapshotName":"更改后的名称001"
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
    "Msg": "快照名称更改成功！",
    "Data": {}
}
```

### 8.DeleteSnapshot

**Action**: DeleteSnapshot

**描述**：删除一个或者多个快照

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：POST

**请求参数**：

| 参数        | 说明     | 类型 | 是否必传 | 示例                          |
| ----------- | -------- | ---- | -------- | ----------------------------- |
| SnapshotIds | 快照列表 | list | 是       | ["snapshotid1","snapshotid2"] |

**返回参数**

| 参数    | 类型   | 示例                                 | 说明   |
| ------- | ------ | ------------------------------------ | ------ |
| EventId | string | eddb28de-4f91-11ed-988b-82b53449da97 | 事件id |

**请求示例**

```python
def delete_snapshot():
    """
    删除快照
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "DeleteSnapshot"
    method = "POST"
    param = {}
    body = {
        "SnapshotIds":["snapshotid1","snapshotid2"]
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content, json=body)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "快照删除下发任务成功！",
    "Data": {
        "EventId": "eddb28de-4f91-11ed-988b-82b53449da97"
    }
}
```

### 9.DescribeSnapshotQuota

**Action**: DescribeSnapshotQuota

**描述**：获取云盘快照配额信息

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：GET

**请求参数：**

| 参数   | 说明   | 类型   | 是否必传 | 示例                  |
| ------ | ------ | ------ | -------- | --------------------- |
| DiskId | 云盘ID | string | 是       | disk-5f1yn3or6tr998dn |

**返回参数**

| 参数       | 类型   |         示例          | 说明                                                         |
| ---------- | ------ | :-------------------: | ------------------------------------------------------------ |
| DiskId     | string | disk-5f1yn3or6tr998dn | 云盘ID                                                       |
| TotalQuota | int    |          10           | 单个云盘可创建的快照数量上限                                 |
| UsedQuota  | int    |           2           | 单个云盘已经创建的快照数量                                   |
| FreeQuota  | int    |           8           | 单个云盘剩余可创建的快照数量，如果该数量为0，那么该云盘不可以再创建快照。 |

**请求示例**

```python
def ebs_describe_snapshot_quota():
    """
    查询快照配额
    """
    ecs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "RollbackDiskBySnapshot"
    method = "GET"
    param = {
        "DiskId": "disk-5f1yn3or6tr998dn"
    }

    url = get_signature(action, AK, AccessKeySecret, method, ecs_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    return result
```

**返回示例：**

```json
{
    "Code": "Success",
    "Msg": "查询快照配额成功！",
    "Data": {
        "DiskId": "disk-5f1yn3or6tr998dn",
        "TotalQuota": 10,
        "UsedQuota": 10,
        "FreeQuota": 0
    }
}
```

### 10.CreateImageBySnapshot

**Action**: CreateImageBySnapshot

**描述**：使用快照创建自定义镜像

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：POST

**请求参数：**

| 参数       | 说明     | 类型   | 是否必传 | 示例        |
| ---------- | -------- | ------ | -------- | ----------- |
| SnapshotId | 快照ID   | string | 是       | "s-disk-**" |
| ImageName  | 镜像名称 | String | 是       | 镜像名称    |

**返回参数**

| 参数    | 类型   | 示例                                 | 说明   |
| ------- | ------ | ------------------------------------ | ------ |
| EventId | string | 11c4ad90-122c-11ed-b996-7ae483eaf4a2 | 事件id |
| ImageId | String | Img-**                               | 镜像ID |

**请求示例**

```python
def create_image_by_snapshot():
    """
    使用快照创建自定义镜像
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "CreateImageBySnapshot"
    method = "POST"
    param = {}
    body = {
        "SnapshotId":"snapshotid1",
        "ImageName":"测试镜像名称"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content, json=body)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "系统盘快照创建镜像成功！",
    "Data": {
        "EventId": "eddb28de-4f91-11ed-988b-82b53449da97",
        "ImageName": "测试镜像名称"
    }
}
```

### 11.CopySnapshotCrossAZ

**Action**: CopySnapshotCrossAZ

**描述**：跨可用区复制快照

**请求地址**：api.capitalonline.net/ebs/v1

**请求方法**：POST

**请求参数：**

| 参数              | 说明           | 类型   | 是否必传 | 示例        |
| ----------------- | -------------- | ------ | -------- | ----------- |
| SnapshotId        | 快照ID         | string | 是       | "s-disk-**" |
| AvailableZoneCode | 目标可用区Code | String | 是       | CN_Suqian_A |

**返回参数**

| 参数       | 类型   | 示例                                 | 说明                       |
| ---------- | ------ | ------------------------------------ | -------------------------- |
| EventId    | string | 11c4ad90-122c-11ed-b996-7ae483eaf4a2 | 事件id                     |
| SnapshotId | String | Sl-disk-**                           | 复制到目标可用区后的快照ID |

**请求示例**

```python
def copy_snapshot():
    """
    跨可用区复制快照
    """
    ebs_url = 'http://api.capitalonline.net/ebs/v1'
    action = "CopySnapshotCrossAZ"
    method = "POST"
    param = {}
    body = {
        "SnapshotId":"snapshotid1",
        "AvailableZoneCode":"CN_Suqian_A"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ebs_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content, json=body)
    return result
```

**返回示例**

```json
{
    "Code": "Success",
    "Msg": "快照复制成功！",
    "Data": {
        "EventId": "eddb28de-4f91-11ed-988b-82b53449da97",
        "SnapshotId": "s-disk-**"
  }
}
```

## 其他公共接口

### 1.DescribeAvailableResource

  **Action：DescribeAvailableResource**

  **描述：** 查询可用区下网络类型计费方式和云服务器类型

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：GET**

  **请求参数：**

| 名称     | 类型   | 是否必选 | 示例值       | 描述       |
| -------- | ------ | -------- | ------------ | ---------- |
| RegionId | string | 是       | CN_Beijing_A | 可用区编号 |

  **返回参数：**

| 名称 | 类型     | 示例值  | 描述   |
| :--- | -------- | :------ | :----- |
| Code | Interger | Success | 错误码 |
| Data | string   |         |        |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                     |
| -------- | ------------------------- | -------------------------------------------------- | ------------------------ |
| 400      | InvalidRegionID.Malformed | The specified parameter   "RegionID" is not valid. | 指定可用区ID参数格式错误 |

  **返回示例：**

```json
{
    "RegionStatus": "1",
    "RegionStatusZh": "正常",
    "RegionId": "CN_Taipei_A",
    "WanGoods": [
        {
            "BillingMethod": [
                {
                    "MaxQos": 51200,
                    "Key": "DataPackage"
                },
                {
                    "MaxQos": 500,
                    "Key": "BandwIdth"
                },
                {
                    "MaxQos": 500,
                    "Key": "Traffic"
                }
            ],
            "Type": "Bandwidth_China_Optimized"
        },
        {
            "BillingMethod": [
                {
                    "MaxQos": 500,
                    "Key": "Traffic"
                }
            ],
            "Type": "Bandwidth_VIP_Dedicated"
        }
    ],
    "InstanceGoods": [
        {
            "ImageGoods": {
                "PublicImage": [
                    {
                        "GicDisplayName": "Centos 8.0 64位",
                        "ImageType": "centos",
                        "ImageId": "Centos_8.0_64"
                    },
                ],
                "PrivateImages": null
            },
            "DiskGoods": [
                {
                    "MinSize": 100,
                    "MaxSize": 4000,
                    "Type": "high_disk",
                    "Step": 100
                },
                {
                    "MinSize": 50,
                    "MaxSize": 4000,
                    "Type": "ssd_disk",
                    "Step": 50
                }
            ],
            "InstanceType": "Standard",
            "SystemDiskGoods": [
                {
                    "MinSize": 0,
                    "MaxSize": 500,
                    "Type": "system_disk",
                    "Step": 10
                },
                {
                    "MinSize": 0,
                    "MaxSize": 500,
                    "Type": "ssd_system_disk",
                    "Step": 10
                }
            ]
        }
    ],
    "RegionName": "台北-可用区A"
}
```

  **请求调用示例**

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
        print( "get site goods error.")
        return None
    data = result.get("Data")
    wan_goods = data.get("WanGoods")
    vm_goods = data.get("InstanceGoods")
    return wan_goods, vm_goods
```



### 2.**DescribeTask**

  **Action：DescribeTask**

  **描述：** 查询任务状态

  **请求地址:** cdsapi.capitalonline.net/ccs

  **请求方法：GET**

  **请求参数：**

| 名称   | 类型   | 是否必选 | 示例值                               | 描述d  |
| ------ | ------ | -------- | ------------------------------------ | ------ |
| TaskId | string | 是       | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 任务Id |

  **返回参数：**

| 名称       | 类型     | 示例值                               | 描述                                                         |
| :--------- | -------- | :----------------------------------- | :----------------------------------------------------------- |
| Code       | Interger | Success                              | 错误码                                                       |
| Message    | string   |                                      | 提示信息                                                     |
| ResourceId | string   | bbf63749-0186-4c68-8adc-9bf584bc1376 | 资源Id列表                                                   |
| TaskId     | string   | f9053ea8-fc23-4032-8a7f-01def77b4cc0 | 任务Id                                                       |
| Status     | string   | finish                               | 任务执行的状态[NEW,DOING,FINISH,ERROR],分别对应新增，正在执行，完成，错误 |

  **错误码：**

| httpcode | 错误码                  | 错误信息                                         | 描述                       |
| -------- | ----------------------- | ------------------------------------------------ | -------------------------- |
| 400      | InvalidTaskID.Malformed | The specified parameter   "TaskID" is not valid. | 指定云服务器ID参数格式错误 |

  **返回示例：**

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

  **代码调用示例**

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
        print("task status error.")
        return None
    return result.get("Data")
```

## 附件一

#### 可用区名称

| 可用区名称    | RegionId          | 是否支持裸金属 | 所在大区 |
| ------------- | ----------------- | -------------- | -------- |
| 北京A         | CN_Beijing_A      | 否             | 中国大陆 |
| 北京B         | CN_Beijing_B      | 否             | 中国大陆 |
| 北京C         | CN_Beijing_C      | 否             | 中国大陆 |
| 北京E         | CN_Beijing_E      | 否             | 中国大陆 |
| 北京H         | CN_Beijing_H      | 否             | 中国大陆 |
| 北京I         | CN_Beijing_I      | 是             | 中国大陆 |
| 北京J         | CN_Beijing_J      | 是             | 中国大陆 |
| 达拉斯A       | US_Dallas_A       | 否             | 北美地区 |
| 达拉斯B       | US_Dallas_B       | 否             | 北美地区 |
| 达拉斯C       | US_Dallas_C       | 否             | 北美地区 |
| 达拉斯D       | US_Dallas_D       | 是             | 北美地区 |
| 达拉斯E       | US_Dallas_E       | 是             | 北美地区 |
| 达拉斯F       | US_Dallas_F       | 是             | 北美地区 |
| 达拉斯G       | US_Dallas_G       | 否             | 北美地区 |
| 达拉斯H       | US_Dallas_H       | 是             | 北美地区 |
| 达拉斯I       | US_Dallas_I       | 否             | 北美地区 |
| 达拉斯J       | US_Dallas_J       | 否             | 北美地区 |
| 迈阿密A       | US_Miami_A        | 否             | 北美地区 |
| 德国A         | EUR_Germany_A     | 否             | 欧洲地区 |
| 德国B         | EUR_Germany_B     | 否             | 欧洲地区 |
| 东京A         | APAC_Tokyo_A      | 否             | 亚太地区 |
| 广州A         | CN_Guangzhou_A    | 否             | 中国大陆 |
| 荷兰A         | EUR_Netherlands_A | 否             | 欧洲地区 |
| 洛杉矶A       | US_LosAngeles_A   | 否             | 北美地区 |
| 上海A         | CN_Shanghai_A     | 否             | 中国大陆 |
| 上海C         | CN_Shanghai_C     | 否             | 中国大陆 |
| 首尔A         | APAC_Seoul_A      | 否             | 亚太地区 |
| 台北A         | CN_Taipei_A       | 否             | 中国大陆 |
| 无锡A         | CN_Wuxi_A         | 否             | 中国大陆 |
| 无锡B         | CN_Wuxi_B         | 是             | 中国大陆 |
| 香港A         | CN_Hongkong_A     | 否             | 中国大陆 |
| 新加坡A       | APAC_Singapore_A  | 否             | 亚太地区 |
| 新加坡B       | APAC_Singapore_B  | 否             | 亚太地区 |
| 新加坡C       | APAC_Singapore_C  | 否             | 亚太地区 |
| 新加坡D       | APAC_Singapore_D  | 否             | 亚太地区 |
| 孟买A         | APAC_Mumbai_A     | 否             | 亚太地区 |
| 孟买B(已下线) | APAC_Mumbai_B     | 否             | 亚太地区 |
| 孟买C         | APAC_Mumbai_C     | 是             | 亚太地区 |
| 弗吉尼亚A     | US_Virginia_A     | 是             | 北美地区 |
| 德国C         | EUR_Germany_C     | 是             | 欧洲地区 |
| 达拉斯L       | US_Dallas_L       | 是             | 北美地区 |
| 新加坡E       | APAC_Singapore_E  | 是             | 亚太地区 |
| 呼和浩特A     | CN_Huhehaote_A    | 是             | 中国大陆 |
| 圣保罗A       | SR_SaintPaul_A    | 是             | 南美地区 |
| 苏州A         | CN_Suzhou_A       | 是             | 中国大陆 |
| 雅加达A       | APAC_Jakarta_A    | 是             | 亚太地区 |
| 胡志明A       | APAC_HoChiMinh_A  | 是             | 亚太地区 |
| 马赛A         | EUR_Marseilles_A  | 是             | 欧洲地区 |

## 附件二

#### 主机类型

| 计算类型配置名称          | 计算类型ID  |
| ------------------------- | ----------- |
| IO增强型                  | IO          |
| 高性能型                  | High        |
| 标准型                    | Standard    |
| 通用型                    | General     |
| 均衡型                    | Balance     |
| 紧凑型                    | Compact     |
| 内存型                    | Memory      |
| 独享型                    | Exclusive   |
| 高I/O型                   | HighIO      |
| 计算型                    | Compute     |
| G2.通用型                 | G2_General  |
| G2.计算型                 | G2_Compute  |
| G2.内存型                 | G2_Memory   |
| G2L.通用型                | G2L_General |
| G2L.计算型                | G2L_Compute |
| G2L.内存型                | G2L_Memory  |
| G2L.密集计算型            | G2L_Dense   |
| 密集计算型ic3             | CCS.IC3     |
| 计算型c3                  | CCS.C3      |
| 通用型g3                  | CCS.G3      |
| 内存型r3                  | CCS.R3      |
| 密集计算型ic2             | CCS.iC2     |
| 计算型c2                  | CCS.C2      |
| 通用型g2                  | CCS.G2      |
| 内存型r2                  | CCS.R2      |
| 密集计算型ic1             | CCS.IC1     |
| 计算型c1                  | CCS.C1      |
| 通用型g1                  | CCS.G1      |
| 内存型r1                  | CCS.R1      |
| 高主频计算型hfc3          | CCS.HFC3    |
| 高主频通用型hfg3          | CCS.HFG3    |
| 高主频内存型hfr3          | CCS.HFR3    |
| 密集计算型ic3v2           | CCS.IC3V2   |
| 计算型c3v2                | CCS.C3V2    |
| 通用型g3v2                | CCS.G3V2    |
| 内存型r3v2                | CCS.R3V2    |
| 密集计算型ic2v2           | CCS.IC2V2   |
| 计算型c2v2                | CCS.C2V2    |
| 通用型g2v2                | CCS.G2V2    |
| 内存型r2v2                | CCS.R2V2    |
| 密集计算型ic1v2           | CCS.IC1V2   |
| 计算型c1v2                | CCS.C1V2    |
| 通用型g1v2                | CCS.G1V2    |
| 内存型r1v2                | CCS.R1V2    |
| 计算网络增强型c3ne        | CCS.C3NE3   |
| 通用网络增强型g3ne        | CCS.G3NE3   |
| 内存网络增强型r3ne        | CCS.R3NE3   |
| 网络增强通用型g2ne        | CCS.G2NE    |
| 网络增强通用型g1ne        | CCS.G1NE    |
| 网络增强计算型c2ne        | CCS.C2NE    |
| 网络增强密集计算型ic2ne   | CCS.IC2NE   |
| 网络增强计算型c1ne        | CCS.C1NE    |
| 网络增强密集计算型ic1ne   | CCS.IC1NE   |
| 网络增强内存型r2ne        | CCS.R2NE    |
| 网络增强内存型r1ne        | CCS.R1NE    |
| 云主机AMD密集计算型ic1a   | CCS.IC1A    |
| 专有宿主机计算型云主机hc1 | CCS.HC1     |
| 专有宿主机通用型云主机hg1 | CCS.HG1     |
| 专有宿主机内存型云主机hr1 | CCS.HR1     |
| 专有宿主机密集计算型hic1  | CCS.HIC1    |
| 计算型c1cl                | CCS.C1CL    |
| 专有宿主机通用型云主机hg3 | CCS.HG3     |
| 专有宿主机计算型云主机hc3 | CCS.HC3     |
| 专有宿主机密集计算型hic3  | CCS.HIC3    |
| 专有宿主机内存型云主机hr3 | CCS.HR3     |
| 密集计算型ic3cl           | CCS.IC3CL   |
| 密集计算型ic1cl           | CCS.IC1CL   |
| GPU计算型gc3              | CCS.GC3     |
| 密集计算型ic2cl           | CCS.IC2CL   |
| 计算型c2cl                | CCS.C2CL    |
| 计算型c3cl                | CCS.C3CL    |
| 通用型g3cl                | CCS.G3CL    |
| 通用型g2cl                | CCS.G2CL    |
| 内存型r3cl                | CCS.R3CL    |
| 内存型r2cl                | CCS.R2CL    |


## 附件三

#### 带宽类型

| 带宽类型        | 带宽ID                                   |
| --------------- | ---------------------------------------- |
| 移动            | Bandwidth_CMCC                           |
| 联通            | Bandwidth_China_Unicom                   |
| 菲律宾优化带宽  | Southeast_Asia_Optimizes_Bandwidth       |
| IPv6测试        | Test_Ipv6                                |
| 日本本地带宽    | Bandwidth_Japan_Locally                  |
| 韩国本地带宽    | Bandwidth_Korea_Locally                  |
| BGP             | Bandwidth_BGP                            |
| 韩国优化        | Bandwidth_Korea_Optimized                |
| 台湾优化        | Bandwidth_Taiwai_Optimized               |
| 电信            | Bandwidth_China_Telecom                  |
| 双线BGP         | Bandwidth_Tow_Line_BGP                   |
| 客户专用带宽    | Customer_Specific_Bandwidth              |
| VIP专用带宽     | Bandwidth_VIP_Dedicated                  |
| 全球优化BGP     | Globally_Optimized_BGP                   |
| BGP优化         | Bandwidth_BGP_Optimized                  |
| 华东BGP         | Bandwidth_East_China_BGP                 |
| 华北BGP         | Bandwidth_North_China_BGP                |
| 东南亚优化BGP   | Bandwidth_SoutheastAsia_Optimization_BGP |
| 标准BGP         | Bandwidth_Standard_BGP                   |
| BGP(多线)       | Bandwidth_Multi_ISP_BGP                  |
| BGP(经济型多线) | Bandwidth_Multi_ISP_Economy_BGP          |

## 附件四

#### 公共模板

| 模板大类型  | 模板类型                         | 中文名称                               |
| ----------- | -------------------------------- | -------------------------------------- |
| Anolis OS   | AnolisOS_8.6_64                  |                                        |
| Rocky Linux | RockyLinux_9.0_64                |                                        |
|             | RockyLinux_8.6_64                |                                        |
|             | RockyLinux_8.5_64                |                                        |
| Centos      | Centos_Stream_8                  |                                        |
|             | Centos_8.2_64                    |                                        |
|             | Centos_8.1_64                    |                                        |
|             | Centos_8.0_64                    |                                        |
|             | Centos_7.9_64                    |                                        |
|             | Centos_7.8_64                    |                                        |
|             | Centos_7.6_64                    |                                        |
|             | Centos_7.5_64                    |                                        |
|             | Centos_7.4_64                    |                                        |
|             | Centos_7.3_64                    |                                        |
|             | Centos_7.2_64                    |                                        |
|             | Centos_6.10_64                   |                                        |
|             | Centos_6.9_64                    |                                        |
|             | Centos_6.8_64                    |                                        |
|             | Centos_6.7_64                    |                                        |
|             | Centos_6.6_64                    |                                        |
|             | Centos_6.5_64                    |                                        |
|             | Centos_6.4_64                    |                                        |
|             | Centos_5.9_64                    |                                        |
| Debian      | Debian_10.2_64                   |                                        |
|             | Debian_9.11_64                   |                                        |
|             | Debian_8.11_64                   |                                        |
|             | Debian_8.1_64                    |                                        |
|             | Debian_7.4_64                    |                                        |
| Redhat      | Redhat_7.4_64                    |                                        |
|             | Redhat_6.5_64                    |                                        |
| Ubuntu      | Ubuntu_20.04_64                  |                                        |
|             | Ubuntu_18.04_64                  |                                        |
|             | Ubuntu_16.04_64                  |                                        |
|             | Ubuntu_14.04_64                  |                                        |
| Windows     | Windows_2019_Datacenter_64_CN    | Windows 2019 数据中心版 64位 中文版    |
|             | Windows_2019_Datacenter_64_EN    | Windows 2019 数据中心版 64位 英文版    |
|             | Windows_2016_Datacenter_64_EN    | Windows 2016 数据中心版 64位 英文版    |
|             | Windows_2016_Datacenter_64_CN    | Windows 2016 数据中心版 64位 中文版    |
|             | Windows_2012_Standard_64_EN      | Windows 2012 标准版 64位 英文版        |
|             | Windows_2012_Standard_64_CN      | Windows 2012 标准版 64位 中文版        |
|             | Windows_2012_R2_Standard_64_EN   | Windows 2012 R2 标准版 64位 英文版     |
|             | Windows_2012_R2_Standard_64_CN   | Windows 2012 R2 标准版 64位 中文版     |
|             | Windows_2012_R2_Datacenter_64_EN | Windows 2012 R2 数据中心版 64位 英文版 |
|             | Windows_2012_R2_Datacenter_64_CN | Windows 2012 R2 数据中心版 64位 中文版 |
|             | Windows_2012_Datacenter_64_EN    | Windows 2012 数据中心版 64位 英文版    |
|             | Windows_2012_Datacenter_64_CN    | Windows 2012 数据中心版 64位 中文版    |
|             | Windows_2008_R2_Enterprise_64_CN | Windows 2008 R2 企业版 64位 中文版     |




## 附件五



#### 私有网络区域名称

| 区域名称 | RegionCode    | 区域类型   | 所在大区 |
| -------- | ------------- | ---------- | -------- |
| 东莞     | CN_Dongguan   | 边缘节点   | 中国大陆 |
| 中卫     | CN_Zhongwei   | 边缘节点   | 中国大陆 |
| 保定     | CN_Baoding    | 边缘节点   | 中国大陆 |
| 呼和浩特 | CN_Huhhot     | 边缘节点   | 中国大陆 |
| 娄底     | CN_Loudi      | 边缘节点   | 中国大陆 |
| 宿迁     | CN_Suqian     | 边缘节点   | 中国大陆 |
| 洛阳     | CN_Luoyang    | 边缘节点   | 中国大陆 |
| 济南     | CN_Jinan      | 边缘节点   | 中国大陆 |
| 眉山     | CN_Meishan    | 边缘节点   | 中国大陆 |
| 福州     | CN_Fuzhou     | 边缘节点   | 中国大陆 |
| 衢州     | CN_Quzhou     | 边缘节点   | 中国大陆 |
| 襄阳     | CN_Xiangyang  | 边缘节点   | 中国大陆 |
| 西安     | CN_Xian       | 边缘节点   | 中国大陆 |
| 贵阳     | CN_Guiyang    | 边缘节点   | 中国大陆 |
| 重庆两江 | CN_Liangjiang | 边缘节点   | 中国大陆 |
| 金华     | CN_Jinhua     | 边缘节点   | 中国大陆 |
| 中国香港 | CN_HongKong   | 云平台节点 | 亚太地区 |


#### 私有网络可用区名称

| 可用区名称 | AvailableZoneCode | 站点类型   | 所在区域 |
| ---------- | ----------------- | ---------- | -------- |
| 东莞A      | CN_Dongguan_A     | 边缘节点   | 东莞     |
| 中卫A      | CN_Zhongwei_A     | 边缘节点   | 中卫     |
| 保定A      | CN_Baoding_A      | 边缘节点   | 保定     |
| 呼和浩特B  | CN_Hohhot_B       | 边缘节点   | 呼和浩特 |
| 娄底A      | CN_Loudi_A        | 边缘节点   | 娄底     |
| 宿迁A      | CN_Suqian_A       | 边缘节点   | 宿迁     |
| 宿迁B      | CN_Suqian_B       | 边缘节点   | 宿迁     |
| 洛阳A      | CN_Louyang_A      | 边缘节点   | 洛阳     |
| 济南A      | CN_Jinan_A        | 边缘节点   | 济南     |
| 眉山A      | CN_Meishan_A      | 边缘节点   | 眉山     |
| 福州A      | CN_Fuzhou_A       | 边缘节点   | 福州     |
| 衢州A      | CN_Quzhou_A       | 边缘节点   | 衢州     |
| 襄阳A      | CN_Xiangyang_A    | 边缘节点   | 襄阳     |
| 西安A      | CN_Xian_A         | 边缘节点   | 西安     |
| 贵阳A      | CN_Guiyang_A      | 边缘节点   | 贵阳     |
| 重庆两江A  | CN_Liangjiang_A   | 边缘节点   | 重庆两江 |
| 金华A      | CN_Jinhua_A       | 边缘节点   | 金华     |
| 香港B      | CN_HongKong_B     | 云平台节点 | 中国香港 |

## 示例

### 1.获取请求url

  **代码示例**

```python
def percentEncode(str):
   """转换特殊符号"""
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

  **返回示例**

```json
http://cdsapi.capitalonline.net/ccs/?SignatureVersion=1.0&Timestamp=2019-09-22T05%3A37%3A47Z&AccessKeyId=AccessKeyId&SignatureMethod=HMAC-SHA1&Version=2019-08-08&Signature=****&Action=CreateInstance&SignatureNonce=1c276ff3-dcfb-11e9-bcd1-1c36bbed2c63
```



### 2.获取虚拟数据中心公网信息

  **请求代码**

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
        print("get vdc info error.")
    data = result.get("Data")
    if len(data) > 0:
        vdcInfo = data[0]
    else:
        # 未查询到虚拟数据中心
        return None
    pub = vdcInfo.get("PublicNetwork")
    return pub
```

  **返回示例**

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

  **请求代码**

```python
def descrive_vm(instance_id=None, vdc_id=None, pub_ip=None):
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
    if instance_id:
        body.update({"InstanceId": instance_id})
    if vdc_id:
        body.update({"VdcId": vdc_id})
    if pub_ip:
        body.update({"PublicIp": pub_ip})
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        print("get vm error.")
        return None
    return result.get("Data")
```

  **返回示例**

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
            "InstanceName":"TerraformTest",
            "Cpu": 4,
            "Ram": 4
        }
    ]
}
```

### 4.创建云主机实例

  **请求代码**

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
        print("create vm error: %s" % result.get("Message"))
        return None
    return result.get("TaskId")
```

  **返回示例**

```json
{
  "Message": "Success.", 
  "Code": "Success", 
  "Data": {}, 
  "TaskId": "7424648"
}
```

  **注意**

```md
TaskId可以通过DescribeTask接口获取任务状态并返回资源uuid
```

### 5.修改公网带宽

  **代码示例**

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
        print(result.get("Message"))
        return None
    task_id = result.get("TaskId")
    return task_id
```

  **返回示例**

```json
{
  "Message": "Success.", 
  "Code": "Success", 
  "Data": {}, 
  "TaskId": "7424648"
}
```

  **注意**

```md
TaskId可以通过DescribeTask接口获取任务状态
```

### 6.修改云主机实例计费类型

  **代码示例**

```python
def modify_vm_charge_type(vm_id, ):
    """
    修改云主机实例计费方式，只允许按需计费转换为包年包月
    """
    action = "ModifyInstanceChargeType"
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
        print(result.get("Message"))
        return None
    return True
```

  **返回示例**

```json
{
  "Message": "Success.", 
  "Code": "Success", 
  "Data": {"order_audit": 0}, 
  "TaskId": "0"
}
```

### 7.获取任务状态

  **代码示例**

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
        print("task status error.")
        return None
    return result.get("Data")
```

  **返回示例**

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

  **代码示例**

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
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    print(result)
```

  **返回示例**

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

