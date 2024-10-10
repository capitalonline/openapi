# 目录

   * [首云公开API文档](#首云公开api文档)
     * [认证方式](#认证方式)
       * [1.公共请求参数](#1公共请求参数)
       * [2.签名机制](#2签名机制)
         * [步骤一：构造规范化请求字符串](#步骤一构造规范化请求字符串)
         * [步骤二：构造签名字符串](#步骤二构造签名字符串)
       * [3.获取签名代码](#3获取签名代码)
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
       * [35.DescribeNetworkCardFlow](#35DescribeNetworkCardFlow)
       * [36.GetIpInfoBySegment](#36GetIpInfoBySegment)
       * [37.ModifyInstanceAttribute](#37ModifyInstanceAttribute)
       * [38.DescribeHostMonitor](#38DescribeHostMonitor)
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
       * [20.DescribePipeUtilization](#20describepipeutilization)
       * [21.VDCBandwidthBillingScheme](#21VDCBandwidthBillingScheme)
       * [22.VDCBandwidthUnitPrice](#22VDCBandwidthUnitPrice)
     * [私有网络相关](#私有网络相关)
       * [1.DescribeVPC](#1describevpc)
       * [2.CreateVPC](#2createvpc)
       * [3.DeleteVPC](#3deletevpc)
       * [4.DescribeSubnet](#4describesubnet)
       * [5.CreateSubnet](#5createsubnet)
       * [6.DeleteSubnet](#6deletesubnet)
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
       * [25.DescribeSubnetIp](#25DescribesubnetIp)
       * [26.CreateVLINK](#26createvlink)
       * [27.DeleteVLINK](#27deletevlink)
       * [28.VLINKAddVM](#28vlinkaddvm)
       * [29.VLINKDeleteVM](#29vlinkdeletevm)
       * [30.UpdateVPCBandwidthType](#30updatevpcbandwidthtype)
       * [31.VPCBandWidthBillingScheme](#31vpcbandwidthbillingscheme)
       * [32.VPCBandWidthUnitPrice](#32vpcbandwidthunitprice)
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
     * [测试项目相关](#测试项目相关)
       * [1.DescribeSubjects](#1describesubjects)
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
       * [32.GetVpcBandwidth](#32GetVpcBandwidth)
       * [33.OffAndUnbind](#33OffAndUnbind)
     * [弹性云服务器ECS/GPU云主机相关](#弹性云服务器ECS/GPU云主机相关)
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
       * [19.DescribeInstanceVncUrl](#19describeinstancevncurl)
       * [20.DescribeZoneInstanceType](#20describezoneinstancetype)
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
     * [告警相关](#告警相关接口)
       - [1.CreateContactUser](#1createcontactuser)
       - [2.DescribeContactUsers](#2describecontactusers)
       - [3.JoinContactGroups](#3joincontactgroups)
       - [4.CreateContactGroup](#4createcontactgroup)
       - [5.DeleteContactGroup](#5deletecontactgroup)
       - [6.DescribeContactGroups](#6describecontactgroups)
       - [7.DescribeAlarmMetrics](#7describealarmmetrics)
       - [8.CreateAlarmStrategy](#8createalarmstrategy)
       - [9.DeleteAlarmStrategy](#9deletealarmstrategy)
       - [10.DescribeAlarmStrategies](#10describealarmstrategies)
       - [11.ModifyStrategyStatus](#11modifystrategystatus)
       - [12.ModifyStrategy](#12modifystrategy)
       - [13.ModifyStrategyRule](#13modifystrategyrule)
       - [14.AddStrategyRule](#14addstrategyrule)
       - [15.DeleteStrategyRule](#15deletestrategyrule)
       - [16.DescribeAlarmHistories](#16describealarmhistories)
     * [ECS安全组相关接口](#ECS安全组相关接口)
       - [1.DescribeSecurityGroups](#1-describeSecurityGroups)
       - [2.CreateSecurityGroup](#2-createSecurityGroup)
       - [3.ModifySecurityGroupAttribute](#3-modifySecurityGroupAttribute)
       - [4.DeleteSecurityGroup](#4-deleteSecurityGroup)
       - [5.CreateSecurityGroupPolicies](#5-createSecurityGroupPolicies)
       - [6.DescribeSecurityGroupPolicies](#6-describeSecurityGroupPolicies)
       - [7.DeleteSecurityGroupPolicies](#7-deleteSecurityGroupPolicies)
       - [8.ModifySecurityGroupPolicies](#8-modifySecurityGroupPolicies)
       - [9.AssociateSecurityGroups](#9-associateSecurityGroups)
       - [10.DisassociateSecurityGroups](#10-disassociateSecurityGroups)
       - [11.ModifySecurityGroupsPriority](#11-modifySecurityGroupsPriority)
       - [12.DescribeSecurityGroupAssociationStatistics](#12-describeSecurityGroupAssociationStatistics)
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
     * [附件六](#附件六)
       * [1.VPC推荐网段](#VPC推荐网段)
       * [2.VPC带宽类型](#vpc带宽类型)
       * [3.EIP计费方案](#EIP计费方案)
       * [4.共享带宽计费类型](#共享带宽计费类型)

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
| SubjectId      | int | 否       | 123                                                  | 测试金Id                      |

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
| SubjectId      | int | 否       | 123                                                  | 测试金Id                   |

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
| SubjectId      | int | 否       | 123                                                  | 测试金Id                    |

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

### 20.DescribePipeUtilization

**Action：DescribePipeUtilization**

**描述：** 查询所有pipe资源带宽使用率(未加入GPN的私网不进行统计)

**请求地址:** cdsapi.capitalonline.net/vpc

**请求方法：POST**

**请求参数：**

| 名称 | 类型 | 是否必选 | 示例值 | 描述 |
| ---- | ---- | -------- | ------ | ---- |
| 无   |      |          |        |      |

**返回参数：**

| 名称   | 类型     | 示例值                               | 描述   |
| :----- | -------- | :----------------------------------- | :----- |
| Code          | string | Success                              | 错误码            |
| Message       | string | success                              | 信息              |
| Data          | dict   | {}                                   | 返回数据          |
| Time          | string | 2023-06-19 11:43:51                  | 时间              |
| VdcInfo       | list   | []                                   | vdc信息列表       |
| VdcId         | string | 019c4121-58d3-453b-9fce-46a05301699e | VDC ID            |
| VdcName       | string | 测试1                                | VDC 名称          |
| PipeInfo      | list   | []                                   | VDC下Pipe信息列表 |
| InFlow        | float | 0                                    | 入向带宽          |
| InUtilization | string | 0.0%                                 | 入向带宽使用率         |
| OutFlow | float | 0 | 出向带宽 |
| OutUtilization | string | 0.0% | 出向带宽使用率 |
| PipeId | string | 61c5c88a-0712-11ed-bddb-a6f78540e6aa | Pipe ID |
| PipeName | string | 公网1 | Pipe名称 |
| Qos | int | 10 | Pipe带宽限速 |
| Type | string | public | Pipe类型:public/private（公网/私网） |

**错误码：**

| httpcode | 错误码                 | 错误信息                                                     | 描述                           |
| -------- | ---------------------- | ------------------------------------------------------------ | ------------------------------ |

**返回示例：**
```json
{
    "Code": "Success",
    "Data": {
        "Time": "2023-06-19 11:43:51",
        "VdcInfo": [
            {
                "PipeInfo": null,
                "VdcId": "019c4121-58d3-453b-9fce-46a05301699e",
                "VdcName": "测试1"
            },
            {
                "PipeInfo": [
                    {
                        "InFlow": 0,
                        "InUtilization": "0.0%",
                        "OutFlow": 0,
                        "OutUtilization": "0.0%",
                        "PipeId": "61c5c88a-0712-11ed-bddb-a6f78540e6aa",
                        "PipeName": "公网1",
                        "Qos": 10,
                        "Type": "public"
                    }
                ],
                "VdcId": "02a6eadb-8e81-47ec-a891-2ec7a805afcb",
                "VdcName": "测试2"
            }
        ]
    },
    "Message": "success"
}
```
### 21.VDCBandwidthBillingScheme

  **Action:VDCBandwidthBillingScheme**

  **描述：** 获取对应节点支持的公网带宽计费方案

  **请求地址:** cdsapi.capitalonline.net/network

  **请求方法：GET**

  **请求参数：**

| 名称          | 类型   | 是否必选 | 示例值                               | 描述                 |
| ------------- | ------ | -------- | ------------------------------------ | -------------------- |
| RegionId        |      string  | 是 |   CN_Beijing_A     |  选择Vdc所属可用区,见附件一               |
| Type | string | 否       | 资源类型              | 公网带宽:wan |


  **返回参数：**

| 名称    | 类型   | 示例值   | 描述   |
| :------ | ------ | :------- | :----- |
| Code    | string | Success  | 错误码 |
| Message | string | 修改成功 | 信息   |
| data | list | [] | 返回数据  |
| BandwidthType | string | Bandwidth_China_Telecom | 带宽类型   |
| BandwidthTypeName | string | 电信 | 带宽类型中文名称   |
| BillingSchemeList | list | [] | 计费方案信息列表   |
| BillingScheme | string | BandwIdth | 计费方案   |
| BillingSchemeName | string | 固定带宽 | 计费方案中文名称   |
| ResourceType | string | wan | 资源类型   |
| ResourceTypeName | string | 公网带宽 | 资源类型中文名称   |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
    "Code": "Success",
    "Data": [
        {
            "BandwidthType": "Bandwidth_China_Telecom",
            "BandwidthTypeName": "电信",
            "BillingSchemeList": [
                {
                    "BillingScheme": "BandwIdth",
                    "BillingSchemeName": "固定带宽",
                    "ResourceType": "wan",
                    "ResourceTypeName": "公网带宽"
                }
            ]
        }
    ],
    "Message": "success"
}
```


   **代码调用示例**

```python
def vdc_bandwidth_scheme():
    action = "VDCBandwidthBillingScheme"
    method = "GET"
    param = {
        "RegionId": 'CN_Beijing_A',
        "Type": 'wan',
    }
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    print(result)
    if result.get("Code") != "Success":
        return None
    data = result.get("Data")
    return data
```

### 22.VDCBandwidthUnitPrice

  **Action:VDCBandwidthUnitPrice**

  **描述：** 获取对应节点支持的公网带宽计费方案的对应单价

  **请求地址:** cdsapi.capitalonline.net/network

  **请求方法：GET**

  **请求参数：**

| 名称          | 类型   | 是否必选 | 示例值                               | 描述                 |
| ------------- | ------ | -------- | ------------------------------------ | -------------------- |
| RegionId        |      string  | 是 |   CN_Beijing_A     |  选择Vdc所属可用区,见附件一               |
| BandwidthType | string | 是       | Bandwidth_China_Telecom | 带宽类型 |
| BillScheme | string | 是      |    BandwIdth |  计费方案|
| Type | string | 是       | 资源类型              | 公网带宽:wan |


  **返回参数：**

| 名称    | 类型   | 示例值   | 描述   |
| :------ | ------ | :------- | :----- |
| Code    | string | Success  | 错误码 |
| Message | string | 修改成功 | 信息   |
| data | dict | {} | 返回数据  |
| BandwidthPrice | dict | {} | 带宽价格   |
| StdPrice | float | 10.0 | 原价   |
| StdPriceStr | string | "10.0" | 原价字符串类型   |
| Price | float | 9.0 | 折扣价   |
| PriceStr | string | "9.0" | 折扣价字符串类型   |
| Discount | float | 0.9 | 折扣   |
| DiscountStr | string | "0.9" | 折扣字符串类型   |
| Sign | string | ¥/$ | 币种符号   |
| Cycle | string | /天,/GB | 价格周期   |
| Unit | string | Mb,GB | 价格计量单位   |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "BandwidthPrice": {
            "Cycle": "/天",
            "Discount": 1,
            "DiscountStr": "无折扣",
            "Price": 3.312,
            "PriceStr": "3.312",
            "Sign": "￥",
            "StdPrice": 3.312,
            "StdPriceStr": "3.312",
            "Unit": "Mb"
        },
        "EIPPrice": {
            "Cycle": "/天",
            "Discount": 1,
            "DiscountStr": "无折扣",
            "Price": 0.331,
            "PriceStr": "0.331",
            "Sign": "￥",
            "StdPrice": 0.331,
            "StdPriceStr": "0.331",
            "Unit": "个"
        }
    },
    "Message": "success"
}
```


   **代码调用示例**

```python
def vdc_bandwidth_unit_price():
    action = "VDCBandwidthUnitPrice"
    method = "GET"
    param = {
        "RegionId": 'CN_Beijing_A',
        "Type": 'wan',
        'BandwidthType': 'VDC_Bandwidth_BGP',
        'BillingScheme': 'Bandwidth',
    }
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    res = requests.get(url)
    result = json.loads(res.content)
    if result.get("Code") != "Success":
        return None
    data = result.get("Data")
    return data
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
| RegionCode | string | 否       | CN_Hongkong | VPC区域code, 见附件五          |
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
| BandwidthType | string   | Bandwidth_China_Telecom                          | 带宽类型 |
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
		"BandwidthType": "Bandwidth_China_Telecom",
                "VPCSegment": "10.15.0.0/16"
            },
            {
                "CreateTime": "2022-03-29 16:06:27",
                "RegionCode": "CN_Hongkong",
                "Status": "ok",
                "VPCId": "22310dfc-af37-11ec-8944-1200cba86117",
                "VPCNmae": "openapi测试",
                "BandwidthType": "Bandwidth_China_Telecom",
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


| 名称              | 类型   | 是否必选 | 示例值                  | 描述                                |
| ----------------- | ------ | -------- | ----------------------- | ----------------------------------- |
| RegionCode        | string | 是       | CN_Hongkong             | VPC区域code, 见附件五               |
| VPCName           | string | 是       | name                    | VPC名称                             |
| VPCSegment        | string | 是       | 10.15.0.0/16            | VPC网段   推荐网段，见附件六                          |
| VPCSegmentType    | string | 是       | auto/manual             | 使用推荐网段或手动分配，              |
| BandwidthType     | string | 否       | Bandwidth_China_Telecom | VPC带宽类型，边缘节点必传，见附件六 |
| SubnetList        | list   | 是       | []                      | 创建VPC必须创建一个子网             |
| AvailableZoneCode | string | 是       | CN_Hongkong_B           | VPC可用区code, 见附件五             |
| SubnetName        | string | 是       | 子网1                   | 子网名称                            |
| SubnetSegment     | string | 是       | 10.15.1.0/24            | 子网网段                            |

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
         "AvailableZoneCode": "CN_Hongkong_B",
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

### 4.DescribeSubnet

  **Action:DescribeSubnet**

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
| AvailableZoneCode | string | 否       | CN_Hongkong_B                        | VPC可用区code, 见附件五        |

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
        "AvailableZoneCode": "CN_Hongkong_B",
        "Status": "ok",
        "SubnetId": "026f4386-e573-11ec-a09a-cabfed3cc5e1",
        "SubnetName": "子网1",
        "SubnetSegment": "10.15.1.0/24",
        "UsedIPNum": 15,
        "VPCId": "0266c864-e573-11ec-a09a-cabfed3cc5e1",
        "VPCName": "OPENAPI_VPC1"
      },
      {
        "AvailableZoneCode": "CN_Hongkong_B",
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

### 5.CreateSubnet

  **Action:CreateSubnet**

  **描述：** 创建一个子网

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称              | 类型   | 是否必选 | 示例值                               | 描述                    |
| ----------------- | ------ | -------- | ------------------------------------ | ----------------------- |
| VPCId             | string | 是       | 0266c864-e573-11ec-a09a-cabfed3cc5e1 | VPC ID                  |
| SubnetList        | list   | 是       | []                                   | 创建VPC必须创建一个子网 |
| AvailableZoneCode | string | 是       | CN_Hongkong_B                        | VPC可用区code, 见附件五 |
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
         "AvailableZoneCode": "CN_Hongkong_B",
         "SubnetName": "子网3",
         "SubnetSegment": "10.15.3.0/24"
      }
   ]
}
    json.dumps(body)
    res = requests.post(url, json=body)
```

### 6.DeleteSubnet

  **Action:DeleteSubnet**

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
| AvailableZoneCode     | string | 是       | CN_Suqian_A                          | VPC可用区code, 见附件五 |
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
         "AvailableZoneCode": "CN_Suqian_A",
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
| AvailableZoneCode | string | 边缘节点：是 / 云平台节点：不传 | CN_Hongkong_B | VPC可用区code, 见附件五(云平台节点EIP不包含此字段) |
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
| BandwidthType     | string   | Bandwidth_China_Telecom ，见附件六             |                                                         |
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
        },
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
          "AvailableZoneCode": "CN_Hongkong_B",
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
| BandwidthType     | string | 是                            | Bandwidth_China_Telecom ，见附件六| 带宽类型                                                     |
| BillScheme        | string | 是                            | BandwIdth               | 计费方案见附件六，EIP计费方案 |
| Qos               | int    | 是                            | 5                       | 带宽大小                                                     |
| Size              | int    | 是                            | 1                       | 创建个数                                                     |
| Description       | string | 否                            | test                    | EIP描述                                                      |
| SubjectId      | int | 否       | 123                                                  | 测试金Id                     |

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
| AvailableZoneCode | string | 否       | CN_Hongkong_B | 列表页码。起始值：1, 默认值：1 |
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
| BandwidthType     | string | Bandwidth_China_Telecom ，见附件六             | 带宽类型                                           |
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
        "AvailableZoneCode": "CN_Hongkong_B",
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
        "AvailableZoneCode": "CN_Hongkong_B",
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
        "AvailableZoneCode": "CN_Hongkong_B",
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
        "AvailableZoneCode": "CN_Hongkong_B",
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
        "AvailableZoneCode": "CN_Hongkong_B"
    }
    res = requests.post(url, json=body)
```



### 17.CreateBandwidth

  **Action:CreateBandwidth**

  **描述：** 创建一个共享带宽

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称              | 类型   | 是否必选 | 示例值                               | 描述                                                         |
| ----------------- | ------ | -------- | ------------------------------------ | ------------------------------------------------------------ |
| RegionCode        | string | 是       | CN_Hongkong                          | VPC区域code, 见附件五                                        |
| AvailableZoneCode | string | 是       | CN_Hongkong_B                        | VPC可用区code, 见附件五                                      |
| Name              | string | 是       | 香港共享带宽                         | 共享带宽名称                                                 |
| BandwidthType     | string | 是       | Bandwidth_China_Telecom ，见附件六             | 带宽类型                                                     |
| BillScheme        | string | 是       | BandwIdth                            | 计费方案，见附件六，共享带宽计费方案 |
| Qos               | int    | 是       | 5                                    | 带宽大小                                                     |
| NETID             | string | 否       | ce11eb1e-e6fa-11ec-8b50-bafaaf87d540 | 子网ID，边缘节点必传                                         |
| SubjectId      | int | 否       | 123                                                  | 测试金Id                     |

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
        "AvailableZoneCode": "CN_Hongkong_B",
        "BandwidthType": "Bandwidth_China_Telecom",
        "BillScheme": "BandwIdth_Shared",
        "Qos": 10,
        "NETID": "cc8b3018-8b2b-11ed-b9a9-1a4f7a4e7272"
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
| BandwidthType | string | 是       | Bandwidth_China_Telecom，见附件六 | 带宽类型                                                     |
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
| BandwidthType | string | ok                                   | EIP 带宽类型，见附件六             |
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
| AvailableZoneCode | string | 是       | CN_Suqian_B                          | VPC可用区code, 见附件五，云平台节点暂不支持 |
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
        "AvailableZoneCode": "CN_Suqian_B",
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

### 30.UpdateVPCBandwidthType

  **Action:UpdateVPCBandwidthType**

  **描述：** 变更VPC带宽类型(仅适用于边缘节点)

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称          | 类型   | 是否必选 | 示例值                               | 描述                 |
| ------------- | ------ | -------- | ------------------------------------ | -------------------- |
| VPCID         | string | 是       | ce11eb1e-e6fa-11ec-8b50-bafaaf87d540 | VPC ID               |
| BandwidthType | string | 是       | Bandwidth_China_Telecom              | 见附件六 |


  **返回参数：**

| 名称    | 类型   | 示例值   | 描述   |
| :------ | ------ | :------- | :----- |
| Code    | string | Success  | 错误码 |
| Message | string | 修改成功 | 信息   |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
  "Code": "Success",
  "Data": null,
  "Message": "修改成功"
}
```


   **代码调用示例**

```python
def update_vpc_bandwidth_type(regin_code, key, page, vpc_id, az_code):
    action = 'UpdateVPCBandwidthType'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body = {
        "VPCID": "ce11eb1e-e6fa-11ec-8b50-bafaaf87d540",
        "BandwidthType": "Bandwidth_China_Telecom"
    }
    res = requests.post(url, json=body)
```

### 31.VPCBandWidthBillingScheme

  **Action:VPCBandWidthBillingScheme**

  **描述：** 获取对应节点支持的EIP带宽及共享带宽计费方案

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称          | 类型   | 是否必选 | 示例值                               | 描述                 |
| ------------- | ------ | -------- | ------------------------------------ | -------------------- |
| AvailableZoneCode |    string   | 是 |   CN_Suqian_A     |  可用区Code, 见附件五             |
| RegionCode        |      string  | 是 |   CN_Suqian     |  地域Code, 见附件五               |
| Type | string | 否       | 资源类型              | EIP：Bandwidth ； 共享带宽：Bandwidth_Shared |


  **返回参数：**

| 名称    | 类型   | 示例值   | 描述   |
| :------ | ------ | :------- | :----- |
| Code    | string | Success  | 错误码 |
| Message | string | 修改成功 | 信息   |
| data | list | [] | 返回数据  |
| BandwidthType | string | Bandwidth_China_Telecom | 带宽类型   |
| BandwidthTypeName | string | 电信 | 带宽类型中文名称   |
| BillingSchemeList | list | [] | 计费方案信息列表   |
| BillingScheme | string | BandwIdth | 计费方案   |
| BillingSchemeName | string | 固定带宽 | 计费方案中文名称   |
| ResourceType | string | Bandwidth | 资源类型   |
| ResourceTypeName | string | EIP带宽 | 资源类型中文名称   |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
    "Code": "Success",
    "Data": [
        {
            "BandwidthType": "Bandwidth_China_Telecom",
            "BandwidthTypeName": "电信",
            "BillingSchemeList": [
                {
                    "BillingScheme": "BandwIdth",
                    "BillingSchemeName": "固定带宽",
                    "ResourceType": "Bandwidth",
                    "ResourceTypeName": "EIP带宽"
                }
            ]
        }
    ],
    "Message": "success"
}
```


   **代码调用示例**

```python
def vpc_bandwidth_scheme():
    action = 'VPCBandWidthBillingScheme'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body ={
        "RegionCode": "CN_Suqian",
        "AvailableZoneCode": "CN_Suqian_B",
        # "Type": "Bandwidth"
        # "Type": "Bandwidth_Shared"
        "Type": ""
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    return result
```

### 32.VPCBandWidthUnitPrice

  **Action:VPCBandWidthUnitPrice**

  **描述：** 获取EIP带宽及共享带宽计费方案对应单价

  **请求地址:** cdsapi.capitalonline.net/vpc

  **请求方法：POST**

  **请求参数：**

| 名称          | 类型   | 是否必选 | 示例值                               | 描述                 |
| ------------- | ------ | -------- | ------------------------------------ | -------------------- |
| AvailableZoneCode |    string   | 是 |   CN_Suqian_A     |  可用区Code, 见附件五             |
| RegionCode        |      string  | 是 |   CN_Suqian     |  地域Code, 见附件五               |
| BandwidthType | string | 是       | Bandwidth_China_Telecom | 带宽类型 |
| BillScheme | string | 是      |    BandwIdth |  计费方案|
| Type | string | 是       | 资源类型              | EIP：Bandwidth ； 共享带宽：Bandwidth_Shared |


  **返回参数：**

| 名称    | 类型   | 示例值   | 描述   |
| :------ | ------ | :------- | :----- |
| Code    | string | Success  | 错误码 |
| Message | string | 修改成功 | 信息   |
| data | dict | {} | 返回数据  |
| BandwidthPrice | dict | {} | 带宽价格   |
| StdPrice | float | 10.0 | 原价   |
| StdPriceStr | string | "10.0" | 原价字符串类型   |
| Price | float | 9.0 | 折扣价   |
| PriceStr | string | "9.0" | 折扣价字符串类型   |
| Discount | float | 0.9 | 折扣   |
| DiscountStr | string | "0.9" | 折扣字符串类型   |
| Sign | string | ¥/$ | 币种符号   |
| Cycle | string | /天 | 价格周期   |
| Unit | string | Mb | 价格计量单位   |

  **错误码：**

| httpcode | 错误码                    | 错误信息                                           | 描述                   |
| -------- | ------------------------- | -------------------------------------------------- | ---------------------- |


  **返回示例：**

```json
{
    "Code": "Success",
    "Data": {
        "BandwidthPrice": {
            "Cycle": "/天",
            "Discount": 1,
            "DiscountStr": "无折扣",
            "Price": 3.312,
            "PriceStr": "3.312",
            "Sign": "￥",
            "StdPrice": 3.312,
            "StdPriceStr": "3.312",
            "Unit": "Mb"
        },
        "EIPPrice": {
            "Cycle": "/天",
            "Discount": 1,
            "DiscountStr": "无折扣",
            "Price": 0.331,
            "PriceStr": "0.331",
            "Sign": "￥",
            "StdPrice": 0.331,
            "StdPriceStr": "0.331",
            "Unit": "个"
        }
    },
    "Message": "success"
}
```


   **代码调用示例**

```python
def vpc_bandwidth_unit_price():
    action = 'VPCBandWidthUnitPrice'
    method = "POST"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, NETWORK_URL, param=param)
    body ={
        "RegionCode": "CN_Suqian",
        "AvailableZoneCode": "CN_Suqian_B",
        "BandwidthType": "Bandwidth_China_Telecom",
        "BillScheme":"BandwIdth",
        "Type":"Bandwidth"
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    return result
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

```json
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
```

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

```json
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
```

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

```json
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
```

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

## 测试项目相关

### 1.DescribeSubjects

**Action：DescribeSubjects**

**描述** 获取当前账户下的测试项目。

**请求地址:** api.capitalonline.net/platform/subject

**请求方法：GET**

**返回参数:**

| 名称              | 类型   | 示例                                 | 描述                                                         |
| ----------------- | ------ | ------------------------------------ | ------------------------------------------------------------ |
| Id                | Int    | 3273566                              | 测试项目id                                                   |
| Name              | String | 测试项目-按需                        | 名称                                                         |
| Balance           | String | 1110.00                              | 可用余额，单位 元/美元                                       |
| BeginTime         | String | 2024-02-21                           | 开始测试时间                                                 |
| EndTime           | String | 2024-03-02                           | 结束测试时间                                                 |
| BillMethod        | String | 0                                    | 支持的计费方式                                               |
| BillMethodDisplay | String | 按需计费                             | 支持的计费方式展示                                           |
| GoodsIds          | String | 8534,8528                            | 支持的商品，该字段**unlimited**代表所有商品支持（与GoodsNames限制一致） |
| GoodsNames        | String | 商品名称                             | 支持的商品，该字段**无限制**代表所有商品支持（与GoodsIds限制一致） |
| SiteIds           | String | 35304122-8504-400c-a61c-56ba244c5dda | 支持创建的节点，该字段**unlimited**代表所有节点支持（与SiteNames限制一致） |
| SiteNames         | String | 石家庄A                              | 支持创建的节点，该字段**无限制**代表所有节点支持（与SiteIds限制一致） |

返回示例：

~~~json
{
          "Code":  "Success",
          "Msg":  "Success",
          "Data":  {
                    "Total":  3,
                    "Currency":  "人民币",
                    "SubjectList":  [
                              {
                                        "Id":  3273359,
                                        "Name":  "测试项目-按需",
                                        "Balance":  "13808.27",
                                        "BeginTime":  "2021-12-31",
                                        "EndTime":  "2026-04-14",
                                        "BillMethod":  "0",
                                        "BillMethodDisplay":  "按需计费",
                                        "GoodsIds":  "unlimited",
                                        "GoodsNames":  "无限制",
                                        "SiteIds":  "unlimited",
                                        "SiteNames":  "无限制"
                              },
                              {
                                        "Id":  3273566,
                                        "Name":  "指定区域测试",
                                        "Balance":  "111110.00",
                                        "BeginTime":  "2023-12-07",
                                        "EndTime":  "2024-03-16",
                                        "BillMethod":  "0",
                                        "BillMethodDisplay":  "按需计费",
                                        "GoodsIds":  "8534,8528",
                                        "GoodsNames":  "CCK镜像仓库增强配置,带宽",
                                        "SiteIds":  "35304122-8504-400c-a61c-56ba244c5dda,1296b88a-8903-11ea-a207-9a8ee1b6ac8c,35aef6e1-34ee-4f32-bcc4-62ede720ba80,a04f56cf-55d4-11e5-aa04-482199072629,b13d22e9-c078-4979-a06e-cc1c2cbaeb9c,bb2e22cf-5643-11e7-81eb-184f329fa47a,04d42ff3-bb26-4063-89e9-1c38509843a3,25c7978e-c820-4cd6-8bd3-77f90e410ffb,ca0bd848-9b59-40a2-9f57-d64fbc72a9df,d01a7924-6454-11ea-b26e-00505691938c,750b39e0-03d4-485c-8b07-8aec2329050a,b70c5130-629d-11ea-94fb-00505691f8f1,fdd523fe-fe6c-434a-a817-9b415a0206e8,fba8121c-e5a1-4038-b240-790db3ed5b5d,61fb444a-f0ad-41cf-aef2-19297c7dbf37,b4d0a486-71b3-4e6c-a136-2c9beb98546f,b26322d9-6dc0-4a60-a46e-c8aa6a00163b,ba46b02f-eb4e-457a-a800-1f2bfb9d80be,de0b0931-4c14-4f0b-ab60-7e1768241136",
                                        "SiteNames":  "北京C,香港B,北京D,香港1,迪拜1,纽约1,研发kvm,广州网络节点,研发GIC,上海1,达拉斯1,北京10,台北1,北京2,北京5,北京F,无锡3,上海3,北京3"
                              },
                              {
                                        "Id":  3273580,
                                        "Name":  "测试",
                                        "Balance":  "1000.00",
                                        "BeginTime":  "2024-02-21",
                                        "EndTime":  "2024-03-02",
                                        "BillMethod":  "0",
                                        "BillMethodDisplay":  "按需计费",
                                        "GoodsIds":  "unlimited",
                                        "GoodsNames":  "无限制",
                                        "SiteIds":  "unlimited",
                                        "SiteNames":  "无限制"
                              }
                    ]
          },
          "RequestId":  "9e50f1f7a1d0f688f0e2515192848612"
}
~~~

**调用代码示例:**

~~~python
def describe_subjects():
    ak = "xxxxxxxx"
    sk = "xxxxxxxx"
    url = "https://api.capitalonline.net/platform/subject"
    action = "DescribeSubjects"
    method = "GET"
    url = get_signature(action, ak, sk, method, url)
    resp = requests.get(url)
    result = json.loads(resp.content)
    result = json.dumps(result)  # json格式化
    result = result.encode('utf-8').decode('unicode_escape')  # 转中文
    print(result)
    return result
~~~




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
| ImageIds          | 可选 | string | 镜像id列表(格式为字符串，例如: '["img-xx", "img-xx"]' )      |

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
| NoChargeForShutdown    | int      | 0              | 是否关机不计费       1:是， 0：否    |

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
| NoChargeForShutdown    | int      | 0              | 是否关机不计费, 1:是， 0：否                    |

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
| BillingMethod     | 必选 | string | 计费方式："0": 按需  "1":包年包月                            |
| Password          | 必选 | string | 登录密码                                                     |
| ImageId           | 必选 | string | 镜像id或者镜像名称(**DescribeImage**返回值中的ImageName或者ImageId) |
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
| OpType | 必选 | string | 操作类型：<br/>开机:"start_up_ecs" <br/>关机:"shutdown_ecs"<br/>重启:"restart_ecs"<br/>强制关机:"hard_shutdown_ecs"<br/>不计费关机:"free_shutdown_ecs",仅按需计费的云盘实例支持关机不计费，再开机公网IP可能会变化；若批量操作关机：支持关机不收费的实例，关机后停止 CPU、内存、GPU和公网收费；不支持关机不收费的实例，正常关机，继续收费；不计费关机期间不支持除开机、删除、定制镜像外的操作。目前关机不计费白名单开放，若需要请联系商务。 |
| DeleteEip | 可选 | int | 公网释放选项，0：保留公网IP；1：释放公网IP；默认1：释放公网IP；仅在关机不计费情况生效|

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

### **16.CreateImage**

**Action**: CreateImage

**描述**:创建私有镜像

**请求地址**：api.capitalonline.net/ecs/v1

**请求方法**：POST

**请求参数**

| 参数        | 要求 | 类型   | 说明         |
| ----------- | ---- | ------ | ------------ |
| EcsId       | 必选 | string | 实例ID       |
| Name        | 必选 | string | 镜像名称     |
| TestAccount | 可选 | string | 测试项目名称 |
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

| 参数              | 说明       | 类型   | 是否必传 | 示例                 |
| ----------------- | ---------- | ------ | -------- | -------------------- |
| AvailableZoneCode | 可用区Code | string | 否       | CN_Suqian_A          |
| SnapshotIds       | 快照列表   | string | 否       | '["s-xxx", "s-xxx"]' |
| RegionCode        | 地域Code   | string | 否       | CN_Suqian            |
| DiskId            | 云盘ID     | String | 否       | disk-**              |
| PageNumber        | 页码       | int    | 否       | 1                    |
| PageSize          | 每页记录数 | int    | 否       | 20                   |

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
| IsOptimized       | int    | 1                               | 快照是否开启优化选项，1为开启，0为不开启。                   |

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
                "DiskProperty": "data",
                "IsOptimized": 1
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
| SnapshotInfo      | dict   | {}                              | 快照信息                                                   |
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
| IsOptimized       | int    | 1                               | 快照是否开启优化选项，1为开启，0为不开启。                   |

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
            "DiskProperty": "data",
            "IsOptimized": 1
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

```python
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
```



**返回示例：**

```json
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
```

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
| ReservedTime | 快照保留时间 | string | 否       | 不传递该参数默认为1。Forever:永久保留，当云盘删除时快照不随随云盘删除；具体数字为保留天数。 |
| IsOptimized  | 优化加速选项 | int    | 否       | 1：开启优化加速选项，0：不开启优化加速选项，默认为0          |


**返回参数**

| 参数       | 类型   | 示例                                 | 说明   |
| ---------- | ------ | ------------------------------------ | ------ |
| EventId    | string | 11c4ad90-122c-11ed-b996-7ae483eaf4a4 | 事件id |
| SnapshotId | string | s-disk-r5cqowzrkcdzsyyj-aez6-01      | 快照id |

**请求示例：**

```python
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
```

**返回示例：**

```json
{
    "Code": "Success",
    "Msg": "创建快照任务下发成功！",
    "Data": {
        "EventId": "639e2f92-4f8f-11ed-ae23-be26ad5c0652",
      "SnapshotId":"s-disk-r5cqowzrkcdzsyyj-aez6-01"
    }
}
```



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
| DeleteBindImages | 删除快照关联的镜像选项 | Boolean | 否 | true：删除快照时，删除对应的镜像，false：删除快照时不影响镜像 |

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

| 参数       | 说明     | 类型   | 是否必传 | 示例      |
| ---------- | -------- | ------ | -------- | --------- |
| SnapshotId | 快照ID   | string | 是       | s-disk-** |
| ImageName  | 镜像名称 | string | 是       | 镜像名称  |
| IsOptimized | 优化加速选项 | int | 否     | 1：开启优化加速选项，0：不开启优化加速选项，默认为0 |

**返回参数**

| 参数    | 类型   | 示例                                 | 说明   |
| ------- | ------ | ------------------------------------ | ------ |
| EventId | string | 11c4ad90-122c-11ed-b996-7ae483eaf4a2 | 事件id |
| ImageId | string | img-**                               | 镜像ID |

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
        "ImageId": "img-**"
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
| SnapshotId        | 快照ID         | string | 是       | s-disk-**   |
| AvailableZoneCode | 目标可用区Code | string | 是       | CN_Suqian_A |

**返回参数**

| 参数       | 类型   | 示例                                 | 说明                       |
| ---------- | ------ | ------------------------------------ | -------------------------- |
| EventId    | string | 11c4ad90-122c-11ed-b996-7ae483eaf4a2 | 事件id                     |
| SnapshotId | string | s-2022-11-02**                       | 复制到目标可用区后的快照ID |

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

## 告警相关接口

### 通用字段

- AlarmStatus:  告警状态

| 字段值        | 含义     |
| ------------- | -------- |
| AlarmHappened | 发生告警 |
| PipeSilence   | 通道沉默 |
| RecoverNormal | 告警恢复 |

- AlarmType:   告警类型

| 字段值      | 含义     |
| ----------- | -------- |
| MetricAlarm | 指标告警 |
| EventAlarm  | 事件告警 |

- <<span id="ProductType">ProductType</span>:  产品类型

| 字段值            | 含义                      |      |
| ----------------- | ------------------------- | ---- |
| CCS               | 云服务器                  |      |
| BMS               | 裸金属服务器              |      |
| ECS               | 弹性云服务器（GPU云主机） |      |
| Cdb               | 云数据库-MySQL-主机       |      |
| CdbSlave          | 云数据库-MySQL-备机       |      |
| RedisCluster      | 云数据库Redis集群(社区版) |      |
| RedisReplication  | 云数据库Redis主从(社区版) |      |
| RedisStandalone   | 云数据库Redis经济型主从   |      |
| MysqlSingle       | 云数据库-MYSQL-基础版     |      |
| Haproxy           | 云数据库Haproxy-基础资源  |      |
| HaproxyServer     | 负载均衡Haproxy-4层监听   |      |
| HaproxyServerHttp | 负载均衡Haproxy-7层监听   |      |
| Lvs               | 负载均衡LVS-基础资源      |      |
| LvsListenerTotal  | 负载均衡LVS-监听          |      |

TriggerType

| 字段值  | 含义       |      |
| ------- | ---------- | ---- |
| Average | 取平均值   |      |
| Always  | 总是       |      |
| Once    | 只要有一次 |      |


### 1.CreateContactUser

**Action**: CreateContactUser

**描述**：创建报警联系人

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: POST

**请求参数**

| 名称         | 类型   | 是否必选 | 示例                   | 描述                     |
| ------------ | ------ | -------- | ---------------------- | ------------------------ |
| ContactName  | string | 是       | 联系人1                | 联系人名字，2到128个字符 |
| ContactEmail | string | 是       | test@capitalonline.net | 联系人邮箱               |
| WebhookUrl   | string | 否       | http://www.example.com | webhook地址              |
| PhoneNumber  | string | 否       | 17701307177            | 联系人电话               |

**返回参数**

| 名称    | 类型   | 示例值                                | 描述               |
| ------- | ------ | ------------------------------------- | ------------------ |
| Code    | string | Success                               | 错误码             |
| Data    | object | {"ContactId":"3434-545-4545-5656-34"} | 添加成功的联系人ID |
| Message | string | Request success                       | 提示信息           |

**错误码**

| httpcode | 错误码               | 错误信息                  | 描述               |
| -------- | -------------------- | ------------------------- | ------------------ |
| 400      | ContactNameDuplicate | ContactName duplicate     | 联系人名称重复     |
| 400      | EmailDuplicate       | Email duplicate           | 邮箱重复或已被占用 |
| 400      | InvalidWebhookUrl    | Webhook parameter invalid | webhook地址无效    |

**请求示例**

```python
def create_contact_user():
    action = "CreateContactUser"
    method = "POST"
    param = {
        "ContactName": "联系人-example",
        "PhoneNumber": "1560727xxxx",
        "ContactEmail": "example@capitalonline.net",
        "WebhookUrl": "https://www.example.com"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL)
    res = requests.post(url, json=param)
    result = res.json()
    print(json.dumps(res.json(), ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return
```

**返回示例**

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "ContactId": "98824212-1505-45f4-a503-7ec20a26c7b5"
   }
}
```

### 2.DescribeContactUsers

**Action**: DescribeContactUsers

**描述**：查询报警联系人列表

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: GET

**请求参数**

| 名称         | 类型   | 是否必选 | 示例                                                    | 描述                      |
| ------------ | ------ | -------- | ------------------------------------------------------- | ------------------------- |
| ContactName  | string | 否       |                                                         | 联系人名字                |
| PhoneNumber  | string | 否       | 1560727xxxx                                             | 联系人电话                |
| ContactEmail | string | 否       | example@capitalonline.net                               | 联系人邮箱地址            |
| PageNumber   | int    | 否       | 10                                                      | 当前页码，默认第一页      |
| WebhookUrl   | string | 否       | https://oapi.dingtalk.com/robot/send?access_token=xxxxx |                           |
| PageSize     | int    | 否       | 20                                                      | 每页记录条数,默认每页10条 |
| ContactId    | string | 否       | 4bb4a784-dd6b-41a5-83d5-a022a7aa425c                    | 报警联系人id              |

**返回参数**

| 名称    | 类型   | 示例值          | 描述           |
| ------- | ------ | --------------- | -------------- |
| Code    | string | Success         | 错误码         |
| Data    | list   |                 | 多条联系人详情 |
| Message | string | Request success | 提示信息       |

Data对象

| 名称       | 类型 | 示例值 | 描述                       |
| ---------- | ---- | ------ | -------------------------- |
| PageNumber | int  | 5      | 分页使用，第几页           |
| PageSize   | int  | 20     | 分页使用，每页显示几条规则 |
| TotalCount | int  | 100    | 分页使用，总记录数         |
| Contacts   | list |        | 联系人列表                 |

Contacts对象：

| 名称         | 类型   | 示例值                 | 描述       |
| ------------ | ------ | ---------------------- | ---------- |
| ContactId    | string | 3434-545-4545-5656-34  | 联系人id   |
| CustomerId   | string | E12345                 | 客户id     |
| ContactName  | string | test                   | 联系人名称 |
| PhoneNumber  | string | 17701307177            | 电话号码   |
| ContactEmail | string | test@capitalonline.net | 邮箱       |

**调用示例**

```python
def describe_contact_users():
    action = "DescribeContactUsers"
    method = "GET"
    param = {
        "ContactName": "联系人-example",
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param=param)
    response = requests.get(url)
    result = response.json()
    print(json.dumps(result, ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return
    return result
```

**返回示例**

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "PageSize": 10,
      "PageNumber": 1,
      "TotalCount": 1,
      "Contacts": [{
         "ContactId": "98824212-1505-45f4-a503-7ec20a26c7b5",
         "ContactName": "联系人-example",
         "PhoneNumber": "1560727xxxx",
         "ContactEmail": "example@capitalonline.net",
         "WebhookUrl": "",
         "ContactStatus": "Normal",
         "CreateTime": "2022-11-24 01:25:24"
      }]
   }
}
```

### 3.JoinContactGroups

**Action**: JoinContactGroups

**描述**：报警联系人添加至报警组

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: POST

**请求参数**

| 名称      | 类型   | 是否必选 | 示例                                                         | 描述     |
| --------- | ------ | -------- | ------------------------------------------------------------ | -------- |
| GroupIds  | list   | 是       | ["4c8d8bad-10ed-4673-ba3f-4a568d0756a1","d32a71ff-3667-43cf-92f5-32ed74cee46f"] | 联系组ID |
| ContactId | string | 是       | b51ea7d3-df46-477b-9c40-df37fba22ae0                         | 联系人id |

**返回参数**

| 名称    | 类型   | 示例值          | 描述     |
| ------- | ------ | --------------- | -------- |
| Code    | string | Success         | 错误码   |
| Data    | object |                 | 具体数据 |
| Message | string | Request success | 提示信息 |

data对象

| 名称    | 类型 | 示例                                     | 描述                   |
| ------- | ---- | ---------------------------------------- | ---------------------- |
| Success | list | ["4c8d8bad-10ed-4673-ba3f-4a568d0756a1"] | 添加成功的联系组id列表 |
| Failed  | list | ["d32a71ff-3667-43cf-92f5-32ed74cee46f"] | 添加失败的联系组id列表 |

**错误码**

| httpcode | 错误码                   | 错误信息                                                     | 描述                             |
| -------- | ------------------------ | ------------------------------------------------------------ | -------------------------------- |
| 400      | InvalidContactID         | ContactId parameter invalid  or not exist                    | 联系人ID错误或不存在             |
| 400      | InvalidNotificationGroup | NotificationGroup parameter invalid or contains invalid groups | 联系组你数错误或者包含无效联系组 |

**请求示例**

```python
def join_contact_groups():
    action = "JoinContactGroups"
    method = "POST"
    param = {
        "GroupIds": ["4c8d8bad-10ed-4673-ba3f-4a568d0756a1"],
        "ContactId": "b51ea7d3-df46-477b-9c40-df37fba22ae0"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param={})
    res = requests.post(url, json=param)
    result = res.json()

    print(json.dumps(result,ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return

    return result
```

**返回示例**

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "Success": ["4c8d8bad-10ed-4673-ba3f-4a568d0756a1"],
      "Failed": []
   }
}
```

### 4.CreateContactGroup

**Action**: CreateContactGroup

**描述**：创建报警联系组

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: POST

**请求参数**

| 名称             | 类型   | 是否必选 | 示例                                              | 描述                           |
| ---------------- | ------ | -------- | ------------------------------------------------- | ------------------------------ |
| GroupName        | string | 是       | 联系组-example                                    | 联系组名称，长度范围1到128字符 |
| GroupDescription | string | 否       | 联系组                                            | 联系组描述，最大长度512字符    |
| ContactIds       | list   | 否       | ["3434-545-4545-5656-34","3434-545-4545-5656-34"] | 联系人id                       |

**返回参数**

| 名称    | 类型   | 示例值                         | 描述               |
| ------- | ------ | ------------------------------ | ------------------ |
| Code    | string | Success                        | 错误码             |
| Data    | object | {"GroupId":"xxxxxxxx-xxx-xxx"} | 添加成功的联系组id |
| Message | string | Request success                | 提示信息           |

**错误码**

| httpcode | 错误码             | 错误信息                     | 描述           |
| -------- | ------------------ | ---------------------------- | -------------- |
| 400      | InvalidContact     | ContactIds parameter invalid | 联系人无效     |
| 400      | GroupNameDuplicate | GroupName duplicate          | 联系组名称重复 |

**请求示例**

```python
def create_contact_group():
    action = "CreateContactGroup"
    method = "POST"
    param = {
        "GroupName": "联系组-example",
        "GroupDescription": "联系组",
        "ContactIds": ["98824212-1505-45f4-a503-7ec20a26c7b5"]
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param={})
    res = requests.post(url, json=param)
    result = res.json()
    print(json.dumps(result,ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return

    return result
```

**返回示例**

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "GroupId": "4c8d8bad-10ed-4673-ba3f-4a568d0756a1"
   }
}
```

### 5.DeleteContactGroup

**Action**: DeleteContactGroup

**描述**：删除报警联系组

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: POST

**请求参数**

| 名称     | 类型 | 是否必选 | 示例                      | 描述     |
| -------- | ---- | -------- | ------------------------- | -------- |
| GroupIds | list | 是       | ["3434-545-4545-5656-34"] | 联系组ID |

**返回参数**

| 名称    | 类型   | 示例值          | 描述               |
| ------- | ------ | --------------- | ------------------ |
| Code    | string | Success         | 错误码             |
| Data    | object |                 | 删除成功的联系组id |
| Message | string | Request success | 提示信息           |

data对象

| 名称    | 类型 | 示例                                                         | 描述                   |
| ------- | ---- | ------------------------------------------------------------ | ---------------------- |
| Success | list | ["e714f411-c941-478c-9f22-23a57977eb85", "e714f411-c941-478c-9f22-23a57977eb85"] | 删除成功的联系组id列表 |
| Failed  | list | ["e714f411-c941-478c-9f22-23a57977eb85", "e714f411-c941-478c-9f22-23a57977eb85"] | 删除失败的联系组id列表 |

**请求示例**

```python
def delete_contact_group():
    action = "DeleteContactGroup"
    method = "POST"
    param = {
        "GroupIds": ["14ec565a-8f11-4944-ba2b-13f3b0fa91db", "1f0234e8-8883-42ad-850e-47ad54f1da03"]
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param={})
    res = requests.post(url, json=param)
    result = res.json()
    print(json.dumps(result,ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return

    return result
```

**返回示例**

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "Success": ["14ec565a-8f11-4944-ba2b-13f3b0fa91db"],
      "Failed": ["1f0234e8-8883-42ad-850e-47ad54f1da03"]
   }
}
```

### 6.DescribeContactGroups

**Action**: DescribeContactGroups

**描述**：查询报警联系组列表

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: GET

**请求参数**

| 名称       | 类型   | 是否必选 | 示例                                 | 描述                       |
| ---------- | ------ | -------- | ------------------------------------ | -------------------------- |
| GroupName  | string | 否       | 联系组-example                       | 联系组名称，支持模糊匹配   |
| GroupId    | string | 否       | 4c8d8bad-10ed-4673-ba3f-4a568d0756a1 | 联系组ID                   |
| PageNumber | int    | 否       | 1                                    | 当前页码，默认第一页       |
| PageSize   | int    | 否       | 10                                   | 每页记录条数，默认每页10条 |

**返回参数**

| 名称    | 类型   | 示例值          | 描述           |
| ------- | ------ | --------------- | -------------- |
| Code    | string | Success         | 错误码         |
| Data    | object |                 | 多条联系组详情 |
| Message | string | Request success | 提示信息       |

data对象

| 名称          | 类型 | 示例值 | 描述                       |
| ------------- | ---- | ------ | -------------------------- |
| PageNumber    | int  | 1      | 分页使用，第几页           |
| PageSize      | int  | 10     | 分页使用，每页显示几条规则 |
| TotalCount    | int  | 100    | 分页使用，总记录数         |
| ContactGroups | list |        | 联系组信息列表             |

ContactGroup对象

| 名称             | 类型   | 示例值                               | 描述       |
| ---------------- | ------ | ------------------------------------ | ---------- |
| GroupId          | string | 4c8d8bad-10ed-4673-ba3f-4a568d0756a1 | 联系组id   |
| GroupName        | string | 联系组-example                       | 联系组名   |
| GroupDescription | string | 联系组                               | 联系组描述 |

**请求示例**

```python
def describe_contact_groups():
    action = "DescribeContactGroups"
    method = "GET"
    param = {
        "PageNumber": 1,
        "PageSize": 10,
        "GroupName": "联系组-example",
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param=param)
    res = requests.get(url)
    result = res.json()
    print(json.dumps(result,ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return

    return result
```

**返回示例**

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "PageNumber": 1,
      "PageSize": 10,
      "TotalCount": 1,
      "ContactGroups": [{
         "GroupId": "4c8d8bad-10ed-4673-ba3f-4a568d0756a1",
         "GroupName": "联系组-example",
         "GroupDescription": "联系组"
      }]
   }
}
```

### 7.DescribeAlarmMetrics

**Action**: DescribeAlarmMetrics

**描述**：查询报警指标列表

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: GET

**请求参数**

| 名称        | 类型   | 是否必选 | 示例        | 描述                             |
| ----------- | ------ | -------- | ----------- | -------------------------------- |
| AlarmType   | string | 是       | MetricAlarm | 报警类型 MetricAlarm, EventAlarm |
| ProductType | string | 否       | ECS         | 资源类型，参考通用字段           |

**返回参数**

| 名称    | 类型   | 示例值          | 描述     |
| ------- | ------ | --------------- | -------- |
| Code    | string | Success         | 错误码   |
| Data    | object |                 | 具体数据 |
| Message | string | Request success |          |

Data对象

| 名称              | 类型 | 示例值      | 描述                      |
| ----------------- | ---- | ----------- | ------------------------- |
| CCS               | list | Metrics数组 | 云服务器                  |
| BMS               | list | Metrics数组 | 裸金属服务器              |
| ECS               | list | Metrics数组 | 弹性云服务器（GPU云主机） |
| Cdb               | list | Metrics数组 | 云数据库-MySQL-主机       |
| CdbSlave          | list | Metrics数组 | 云数据库-MySQL-备机       |
| RedisCluster      | list | Metrics数组 | 云数据库Redis集群(社区版) |
| RedisReplication  | list | Metrics数组 | 云数据库Redis主从(社区版) |
| RedisStandalone   | list | Metrics数组 | 云数据库Redis经济型主从   |
| MysqlSingle       | list | Metrics数组 | 云数据库-MYSQL-基础版     |
| Haproxy           | list | Metrics数组 | 云数据库Haproxy-基础资源  |
| HaproxyServer     | list | Metrics数组 | 负载均衡Haproxy-4层监听   |
| HaproxyServerHttp | list | Metrics数组 | 负载均衡Haproxy-7层监听   |
| Lvs               | list | Metrics数组 | 负载均衡LVS-基础资源      |
| LvsListenerTotal  | list | Metrics数组 | 负载均衡LVS-监听          |

Metrics对象：

| 名称        | 类型   | 示例值             | 描述                      |
| ----------- | ------ | ------------------ | ------------------------- |
| Id          | string | vm.mem.usage       | 指标id                    |
| Name        | string | 云服务器内存使用率 | 指标名称                  |
| Granularity | int    | 60                 | 指标告警最小粒度，单位 秒 |
| Unit        | string | %                  | 指标告警单位              |

**请求示例**

```python
def describe_alarm_metrics():
    action = "DescribeAlarmMetrics"
    method = "GET"
    param = {
        "AlarmType": "MetricAlarm",
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param=param)
    res = requests.get(url)
    result = res.json()
    print(json.dumps(result, ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return

    return result
```

**返回示例**

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "CCS": [{
         "Id": "vm.cpu.usage",
         "Name": "云服务器CPU使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "vm.data_disk.usage",
         "Name": "云服务器数据盘使用率",
         "Granularity": 1800,
         "Unit": "%"
      }, {
         "Id": "vm.disk.iops.read",
         "Name": "云服务器磁盘读IOPS",
         "Granularity": 60,
         "Unit": "iops"
      }, {
         "Id": "vm.disk.iops.write",
         "Name": "云服务器磁盘写IOPS",
         "Granularity": 60,
         "Unit": "iops"
      }, {
         "Id": "vm.disk.throughput.read",
         "Name": "云服务器磁盘读吞吐量",
         "Granularity": 60,
         "Unit": "kbps"
      }, {
         "Id": "vm.disk.throughput.write",
         "Name": "云服务器磁盘写吞吐量",
         "Granularity": 60,
         "Unit": "kbps"
      }, {
         "Id": "vm.mem.usage",
         "Name": "云服务器内存使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "vm.nic.throughput.read",
         "Name": "云服务器网卡读吞吐量",
         "Granularity": 60,
         "Unit": "mbps"
      }, {
         "Id": "vm.nic.throughput.write",
         "Name": "云服务器网卡写吞吐量",
         "Granularity": 60,
         "Unit": "mbps"
      }, {
         "Id": "vm.private_nic.throughput.read",
         "Name": "云服务器私网网卡读吞吐量",
         "Granularity": 60,
         "Unit": "mbps"
      }, {
         "Id": "vm.private_nic.throughput.write",
         "Name": "云服务器私网网卡写吞吐量",
         "Granularity": 60,
         "Unit": "mbps"
      }, {
         "Id": "vm.public_nic.throughput.read",
         "Name": "云服务器公网网卡读吞吐量",
         "Granularity": 60,
         "Unit": "mbps"
      }, {
         "Id": "vm.public_nic.throughput.write",
         "Name": "云服务器公网网卡写吞吐量",
         "Granularity": 60,
         "Unit": "mbps"
      }, {
         "Id": "vm.system_disk.usage",
         "Name": "云服务器系统盘使用率",
         "Granularity": 1800,
         "Unit": "%"
      }],
      "ECS": [{
         "Id": "ecs.cpu.usage",
         "Name": "ecs云服务器CPU使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "ecs.disk.iops.read",
         "Name": "ecs云服务器磁盘读IOPS",
         "Granularity": 60,
         "Unit": "iops"
      }, {
         "Id": "ecs.disk.iops.write",
         "Name": "ecs云服务器磁盘写IOPS",
         "Granularity": 60,
         "Unit": "iops"
      }, {
         "Id": "ecs.disk.throughput.read",
         "Name": "ecs云服务器磁盘读吞吐量",
         "Granularity": 60,
         "Unit": "kbps"
      }, {
         "Id": "ecs.disk.throughput.write",
         "Name": "ecs云服务器磁盘写吞吐量",
         "Granularity": 60,
         "Unit": "kbps"
      }, {
         "Id": "ecs.disk.usage",
         "Name": "ecs云服务器磁盘使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "ecs.mem.usage",
         "Name": "ecs云服务器内存使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "ecs.nic.throughput.read",
         "Name": "ecs云服务器网卡读吞吐量",
         "Granularity": 60,
         "Unit": "mbps"
      }, {
         "Id": "ecs.nic.throughput.write",
         "Name": "ecs云服务器网卡写吞吐量",
         "Granularity": 60,
         "Unit": "mbps"
      }],
      "BMS": [{
         "Id": "bms.cpu.usage",
         "Name": "裸金属CPU使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "bms.disk.iops.read",
         "Name": "裸金属磁盘读IOPS",
         "Granularity": 60,
         "Unit": "iops"
      }, {
         "Id": "bms.disk.iops.write",
         "Name": "裸金属磁盘写IOPS",
         "Granularity": 60,
         "Unit": "iops"
      }, {
         "Id": "bms.disk.throughput.read",
         "Name": "裸金属磁盘读吞吐量",
         "Granularity": 60,
         "Unit": "mb/s"
      }, {
         "Id": "bms.disk.throughput.write",
         "Name": "裸金属磁盘写吞吐量",
         "Granularity": 60,
         "Unit": "mb/s"
      }, {
         "Id": "bms.disk.usage",
         "Name": "裸金属磁盘使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "bms.mem.usage",
         "Name": "裸金属内存使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "bms.nic.throughput.read",
         "Name": "裸金属网卡读吞吐量",
         "Granularity": 60,
         "Unit": "mb/s"
      }, {
         "Id": "bms.nic.throughput.write",
         "Name": "裸金属网卡写吞吐量",
         "Granularity": 60,
         "Unit": "mb/s"
      }],
      "Cdb": [{
         "Id": "51b8dabd-5140-4ed5-972a-dd5cf7f0c785",
         "Name": "cpu利用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "eff006d7-8819-4ab7-ab50-0b56de49255d",
         "Name": "内存使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "feb4d34a-8c13-4407-83b7-c6d28c20d809",
         "Name": "磁盘使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "d7bcda20-f76e-4301-8c19-2e96ef15ff77",
         "Name": "最大连接数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "8a9f82d1-ebfd-472a-8e13-9ebd180950e0",
         "Name": "每秒执行操作数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "d08a47f1-7495-4982-9d55-d9e84564ad58",
         "Name": "慢查询数",
         "Granularity": 60,
         "Unit": "次"
      }, {
         "Id": "bdd7fc9f-926c-493d-a073-e174102cce03",
         "Name": "全表扫描数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "68507a96-a73e-4bef-b8ee-d5280d068112",
         "Name": "查询数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "1d7d6bff-1d29-479f-87f0-faf750a0509d",
         "Name": "更新数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "186c472b-0ad9-4aab-a91b-733fb3c20842",
         "Name": "删除数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "a313b122-7ea1-4ef0-a2b0-b729bb0e5e0d",
         "Name": "插入数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "4a61bd4a-dc2f-4beb-b549-08f3f75defac",
         "Name": "覆盖数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "8b33e392-8de5-49e7-97dc-19a3450e67a0",
         "Name": "总请求数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "c47fd55b-dee6-4e15-ba5a-5b745f004d4f",
         "Name": "当前打开连接数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "ef97e0a8-04cb-4bfe-adf7-7a9e869c3685",
         "Name": "连接数使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "3dfa12f0-548b-4cfc-b66f-1097ea77522d",
         "Name": "临时表数量",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "a183d550-abc7-41be-a5a8-c12d45eff0d5",
         "Name": "临时文件数量",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "070aa6d1-9e82-4e31-a1b9-3cfca2369e96",
         "Name": "运行的线程数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "e029808c-c791-4f1c-a9cf-f6a26dee6746",
         "Name": "磁盘临时表数量",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "233ae49c-c594-41c0-ae00-fc7f3a5d3eec",
         "Name": "每秒提交的事务数量",
         "Granularity": 60,
         "Unit": "次/秒"
      }],
      "CdbSlave": [{
         "Id": "f613c855-779a-4eed-af4c-97e04aa8f460",
         "Name": "主从延迟距离",
         "Granularity": 60,
         "Unit": "MB"
      }, {
         "Id": "f158ce6e-2565-43be-9eee-d87a3b16931d",
         "Name": "主从延迟时间",
         "Granularity": 60,
         "Unit": "秒"
      }, {
         "Id": "3031d60d-cb1b-44fd-9ab6-db2dc5d9eab6",
         "Name": "IO 线程状态",
         "Granularity": 60,
         "Unit": "状态值"
      }, {
         "Id": "abcf6f68-21c8-4950-aaf9-632d8cdda8c5",
         "Name": "SQL 线程状态",
         "Granularity": 60,
         "Unit": "状态值"
      }],
      "RedisCluster": [{
         "Id": "00ff51cd-dee8-476c-982d-c9b0379f6498",
         "Name": "CPU使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "929d873f-1db0-4ab9-8aef-9cc4d1f810aa",
         "Name": "内存使用量",
         "Granularity": 60,
         "Unit": "MB"
      }, {
         "Id": "7393ae80-4cee-40fc-a594-c0e2c63aede4",
         "Name": "内存使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "4ebaddda-cfa1-4529-9cc4-961de0e8e322",
         "Name": "Key总个数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "679e5efe-164d-4a21-b663-6ee7e7896fd4",
         "Name": "读请求命中率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "0aa8354d-09b8-487e-8e5b-1a3f23ac3f78",
         "Name": "读请求命中",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "0a41153a-2bc5-4c31-a27f-72ff9d38e614",
         "Name": "总请求",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "5017029a-9033-41a5-9543-3f62da99cb9f",
         "Name": "入流量",
         "Granularity": 60,
         "Unit": "MB"
      }, {
         "Id": "c342d9cf-7bd7-4bcf-8e70-c6ddfd7261d7",
         "Name": "出流量",
         "Granularity": 60,
         "Unit": "MB"
      }, {
         "Id": "4c0ebb4d-0226-4617-b0af-a7403c27eb6a",
         "Name": "分片CPU使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "81d8d08b-f585-4674-89ee-e87f83800c32",
         "Name": "分片内存使用量",
         "Granularity": 60,
         "Unit": "MB"
      }, {
         "Id": "b0347b11-e484-4c3a-b0b7-6bd69fd3233c",
         "Name": "分片内存使用率",
         "Granularity": 60,
         "Unit": "%"
      }],
      "RedisReplication": [{
         "Id": "ce415c93-2df2-4f57-b4ad-bc882ccc0df5",
         "Name": "CPU使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "ecf3b95c-7bcf-43fe-9c21-76bebaeecbaa",
         "Name": "内存使用量",
         "Granularity": 60,
         "Unit": "MB"
      }, {
         "Id": "97b00e01-5e65-41b9-ba05-c0dace1cdaf9",
         "Name": "内存使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "82860c15-c5c8-438d-902c-9c982c32d147",
         "Name": "Key总个数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "6adb90ab-4d24-451e-ae9e-274a9e1348cc",
         "Name": "读请求命中率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "58247601-489f-47ee-bb41-6177883220e2",
         "Name": "读请求命中",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "84b6305b-181c-4d2b-a5c7-88df76dc21d8",
         "Name": "总请求",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "7440cdc1-1f08-4f3a-9ff8-9d884671c591",
         "Name": "入流量",
         "Granularity": 60,
         "Unit": "MB"
      }, {
         "Id": "281b21fe-f624-4914-a193-9cc1bdb6e823",
         "Name": "出流量",
         "Granularity": 60,
         "Unit": "MB"
      }, {
         "Id": "bb8a9d27-9898-40a1-813e-753cc3f51739",
         "Name": "平均执行时延",
         "Granularity": 60,
         "Unit": "ms"
      }, {
         "Id": "783df910-77ef-443f-8c20-99e585c8718a",
         "Name": "读平均时延",
         "Granularity": 60,
         "Unit": "ms"
      }, {
         "Id": "4bec55f3-9cad-420b-8ca1-0630dc734b73",
         "Name": "写平均时延",
         "Granularity": 60,
         "Unit": "ms"
      }],
      "RedisStandalone": [{
         "Id": "4bc3687f-8e2a-4ee1-b8b9-e24515bf96a4",
         "Name": "CPU使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "d4dd91f7-875f-4b36-a0c1-c1b5a985a95a",
         "Name": "内存使用量",
         "Granularity": 60,
         "Unit": "MB"
      }, {
         "Id": "789701e9-6272-4187-af53-abdca577017e",
         "Name": "内存使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "cffea516-eec1-4659-9f29-81714ba2e844",
         "Name": "Key总个数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "b51d3820-ec16-4157-8874-61eb581250cb",
         "Name": "读请求命中率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "8b945bc4-b51a-4da5-bd3c-f4e5ed1f8c2b",
         "Name": "读请求命中",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "e64de80d-3781-4157-970b-55277cbf9a43",
         "Name": "总请求",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "bd756af5-a4bd-4ce3-950c-c689731d22aa",
         "Name": "入流量",
         "Granularity": 60,
         "Unit": "MB"
      }, {
         "Id": "b1bf33ed-f51d-484a-80ea-179337c72f5a",
         "Name": "出流量",
         "Granularity": 60,
         "Unit": "MB"
      }, {
         "Id": "eb61afce-db2c-47ef-85f9-1f2271cdceec",
         "Name": "平均执行时延",
         "Granularity": 60,
         "Unit": "ms"
      }, {
         "Id": "e39c4a0e-2895-4668-a585-9ed85edf89bf",
         "Name": "读平均时延",
         "Granularity": 60,
         "Unit": "ms"
      }, {
         "Id": "b49cd095-1998-49f4-840f-aef0499a1a67",
         "Name": "写平均时延",
         "Granularity": 60,
         "Unit": "ms"
      }],
      "MysqlSingle": [{
         "Id": "c622839a-fcc1-4e03-abc7-fb5de90e18c5",
         "Name": "cpu利用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "6405b795-77ed-4fe0-a9ab-52403ef6686b",
         "Name": "内存使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "70458642-a0b6-430b-8354-7b52da6ccd5f",
         "Name": "磁盘使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "7debf81d-6e58-4ff1-983c-fcf0c9b3037a",
         "Name": "最大连接数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "1142da28-8efb-4c71-83c1-61e834705d30",
         "Name": "每秒执行操作数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "bf9828b6-64b0-489e-9ab4-93d3a0d40324",
         "Name": "慢查询数",
         "Granularity": 60,
         "Unit": "次"
      }, {
         "Id": "882938bc-bf2d-44d1-b468-2dbb95b9d848",
         "Name": "全表扫描数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "db08e90d-2ee6-45f6-87ff-549781c2abe1",
         "Name": "查询数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "57bb0e52-6fce-4055-9264-fbd2cb2f99a5",
         "Name": "更新数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "809bf5a6-9f75-452b-8475-ff13962b40a0",
         "Name": "删除数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "adc3bea5-9024-4220-9a33-66cd350d7c63",
         "Name": "插入数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "93e95b0f-5ebb-4111-bd81-6289532aac6f",
         "Name": "覆盖数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "493d5db0-ae59-46cf-8223-14213817c3a3",
         "Name": "总请求数",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "74ca0c11-2ef3-451b-9e39-898c5cb5203b",
         "Name": "当前打开连接数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "8724a58c-282c-43fb-bb80-8a8ec6787ff6",
         "Name": "临时文件数量",
         "Granularity": 60,
         "Unit": "次/秒"
      }, {
         "Id": "329015c7-8bfa-4734-8691-f24ea65a26f8",
         "Name": "每秒提交的事务数量",
         "Granularity": 60,
         "Unit": "次/秒"
      }],
      "Haproxy": [{
         "Id": "7ae02782-3076-4187-a790-d1ccd489912b",
         "Name": "CPU使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "e83e4ab5-b322-4335-a7f8-177340ffd7d2",
         "Name": "内存使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "f53abaf5-0602-47a9-8f77-ad162acc55e1",
         "Name": "入包量",
         "Granularity": 60,
         "Unit": "个/s"
      }, {
         "Id": "813d9b33-09ed-48a6-9294-e5637306bc8b",
         "Name": "出包量",
         "Granularity": 60,
         "Unit": "个/s"
      }, {
         "Id": "27f7e53b-02ca-488c-8ad7-67f9e7b4fe4b",
         "Name": "出流量",
         "Granularity": 60,
         "Unit": "MB/s"
      }, {
         "Id": "69c74b54-9b15-4224-8b43-f42d6e879767",
         "Name": "入流量",
         "Granularity": 60,
         "Unit": "MB/s"
      }],
      "HaproxyServer": [{
         "Id": "65aaa113-7a2b-48b4-98aa-045791dfdfbc",
         "Name": "负载均衡队列请求数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "870acb8b-4019-4e4c-ac9c-510ec1dd20f2",
         "Name": "负载均衡活跃会话数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "8a021b1b-fee5-4777-a43e-0fc2ba131eb5",
         "Name": "负载均衡入流量",
         "Granularity": 60,
         "Unit": "MB/s"
      }, {
         "Id": "e10582bb-84e9-4a86-8d80-3ac059982b60",
         "Name": "负载均衡出流量",
         "Granularity": 60,
         "Unit": "MB/s"
      }, {
         "Id": "7f205784-2884-4013-b959-e1778b1ea66f",
         "Name": "负载均衡失败连接数",
         "Granularity": 60,
         "Unit": "个/s"
      }, {
         "Id": "716e0770-daac-4d23-8ccd-c44c58e67266",
         "Name": "负载均衡错误响应数",
         "Granularity": 60,
         "Unit": "个/s"
      }, {
         "Id": "c7559bb0-15fe-403f-96a1-f8125bc041e4",
         "Name": "负载均衡新建会话数",
         "Granularity": 60,
         "Unit": "个"
      }],
      "HaproxyServerHttp": [{
         "Id": "65aaa113-7a2b-48b4-98aa-045791dfdfbc",
         "Name": "负载均衡队列请求数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "870acb8b-4019-4e4c-ac9c-510ec1dd20f2",
         "Name": "负载均衡活跃会话数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "8a021b1b-fee5-4777-a43e-0fc2ba131eb5",
         "Name": "负载均衡入流量",
         "Granularity": 60,
         "Unit": "MB/s"
      }, {
         "Id": "e10582bb-84e9-4a86-8d80-3ac059982b60",
         "Name": "负载均衡出流量",
         "Granularity": 60,
         "Unit": "MB/s"
      }, {
         "Id": "7f205784-2884-4013-b959-e1778b1ea66f",
         "Name": "负载均衡失败连接数",
         "Granularity": 60,
         "Unit": "个/s"
      }, {
         "Id": "716e0770-daac-4d23-8ccd-c44c58e67266",
         "Name": "负载均衡错误响应数",
         "Granularity": 60,
         "Unit": "个/s"
      }, {
         "Id": "c7559bb0-15fe-403f-96a1-f8125bc041e4",
         "Name": "负载均衡新建会话数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "1fa95a83-5316-4778-a73c-9e276e04eb92",
         "Name": "http每秒2XX个数",
         "Granularity": 60,
         "Unit": "个/s"
      }, {
         "Id": "c675d7ca-114e-413e-af35-7ebc5bb3efa9",
         "Name": "http每秒3XX个数",
         "Granularity": 60,
         "Unit": "个/s"
      }, {
         "Id": "c495df46-8ae8-446f-93c2-328c15ecbf05",
         "Name": "http每秒4XX个数",
         "Granularity": 60,
         "Unit": "个/s"
      }, {
         "Id": "e5d67afe-2f58-4c27-8735-63b61691f4e8",
         "Name": "http每秒5XX个数",
         "Granularity": 60,
         "Unit": "个/s"
      }],
      "Lvs": [{
         "Id": "52e25a12-56bd-4fd5-95d1-59abd073e759",
         "Name": "CPU使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "fda33502-56af-4622-a94f-263e0366a62c",
         "Name": "内存使用率",
         "Granularity": 60,
         "Unit": "%"
      }, {
         "Id": "18e528d0-6c06-4f7f-963c-4b4ba600130e",
         "Name": "入包量",
         "Granularity": 60,
         "Unit": "个/s"
      }, {
         "Id": "b4e7dd9b-c8bf-4b0f-9722-35678d5706fc",
         "Name": "出包量",
         "Granularity": 60,
         "Unit": "个/s"
      }, {
         "Id": "9ee2b2e5-1340-4aa8-97c2-ad636b4ba552",
         "Name": "出流量",
         "Granularity": 60,
         "Unit": "MB/s"
      }, {
         "Id": "cbea7adc-1fc3-4df1-8ff5-58d2aec9a998",
         "Name": "入流量",
         "Granularity": 60,
         "Unit": "MB/s"
      }],
      "LvsListenerTotal": [{
         "Id": "a2849467-af38-4efb-8aa3-1939ba9c53ca",
         "Name": "活跃连接数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "e1024fdd-eb44-4fe9-b25a-8a30ab436f35",
         "Name": "不活跃连接数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "9fc0d3e5-28ae-486a-8f93-a360b8e83108",
         "Name": "新增连接数",
         "Granularity": 60,
         "Unit": "个"
      }, {
         "Id": "b1f7bee7-6a37-4268-af24-ba6fd6e1a5b8",
         "Name": "监听入流量",
         "Granularity": 60,
         "Unit": "MB/s"
      }, {
         "Id": "d8bfd4bf-23f0-4067-9887-6c7e9a813fc8",
         "Name": "监听出流量",
         "Granularity": 60,
         "Unit": "MB/s"
      }, {
         "Id": "3f9ee23a-c3b3-4953-a75a-9f320e5a4ee2",
         "Name": "监听入包量",
         "Granularity": 60,
         "Unit": "个/s"
      }, {
         "Id": "115aa7a8-b289-4bab-a787-d120ac200026",
         "Name": "监听出包量",
         "Granularity": 60,
         "Unit": "个/s"
      }]
   }
}
```

### 8.CreateAlarmStrategy

**Action**: CreateAlarmStrategy

**描述**：创建云监控报警策略

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: POST

**请求参数**

| 名称              | 类型   | 是否必须 | 示例                                     | 描述                                                         |
| ----------------- | ------ | -------- | ---------------------------------------- | ------------------------------------------------------------ |
| ActiveStartTime   | string | 否       | 00:00                                    | 起始时间 默认00:00                                           |
| ActiveEndTime     | string | 否       | 23:59                                    | 结束时间  默认23:59                                          |
| Level             | int    | 是       | 1                                        | 告警级别 3 Info 2 Warning 1 Critical                         |
| LinkInstances     | list   | 否       | ["e714f411-c941-478c-9f22-23a57977eb85"] | 关联的实例                                                   |
| NotificationType  | list   | 否       | ["email","sms","webhook"]                | 通知方式 email:邮件；sms:短信；webhook:第三方回调，默认为邮件通知，短信每人每天最多可接收15条 |
| NotificationGroup | list   | 是       | ["f8b892c0-3506-402d-b91a-caaefa816bfb"] | 联系人组                                                     |
| Rules             | list   | 是       |                                          | 规则详情，云服务器（CCS），裸金属（BMS），弹性云服务器（ECS），暂时仅支持一个策略一条规则 |
| Scope             | int    | 是       | 0                                        | 规则是否为全局 0.全局 1.实例                                 |
| StrategyName      | string | 是       | 测试策略                                 | 策略名称,2到64字符                                           |
| ProductType       | string | 是       | ECS                                      | 产品类型，产品类型与指标必须相匹配                           |
| AlarmType         | string | 否       | MetricAlarm                              | 告警类型， 默认为MetricAlarm， 注：云服务器（CCS），裸金属（BMS），弹性云服务器（ECS）产品 暂不支持事件告警(EventAlarm)， 其它产品如果监控指标为EventAlarm， 需指明AlarmType为**EventAlarm**。 |
| CallbackUrl       | string | 否       | http://www.example.com                   | 告警回调URL，最大长度2048个字符                              |

Rules对象

| 名称          | 类型   | 是否必须 | 示例          | 描述                                                         |
| ------------- | ------ | -------- | ------------- | ------------------------------------------------------------ |
| RuleName      | string | 否       | 测试规则      | 规则名称， 当前仅支持云服务器（CCS），裸金属（BMS），弹性云服务器（ECS）产品 |
| MetricsId     | string | 是       | ecs.cpu.usage | 指标id，可以通过DescribeAlarmMetrics 获取产品指标ID          |
| Period        | int    | 否       | 1             | 周期，默认为1,取值范围1/15/30/60                             |
| LastedPeriod  | int    | 否       | 5             | 连续周期数,默认为1                                           |
| TriggerType   | string | 否       | Average       | 判断类型Always/Average/Once，默认为平均值，除ECS/CCS/BMS以外其它产品只支持Average |
| TriggerSymbol | string | 否       | >=            | 规则判断方式，默认>=         取值范围>=   <=     <    >      |
| Value         | int    | 否       | 10            | 触发值，默认为10                                             |
| SilentPeriod  | int    | 否       | 360           | 规则沉默周期，单位分钟 5 10 15 30 60 180 360 720 1440，默认5 |

**返回参数**

| 名称    | 类型   | 示例            | 描述     |
| ------- | ------ | --------------- | -------- |
| Code    | string | Success         | 错误码   |
| Message | string | Request success | 提示信息 |
| Data    | Object |                 |          |

Data对象

| 名称         | 类型   | 示例                                 | 描述           |
| ------------ | ------ | ------------------------------------ | -------------- |
| StrategyId   | string | e714f411-c941-478c-9f22-23a57977eb85 | 生成的策略的id |
| StrategyName | string | 测试策略                             | 策略名称       |

**错误码**

| httpcode | 错误码                         | 错误信息                                                     | 描述                                        |
| -------- | ------------------------------ | ------------------------------------------------------------ | ------------------------------------------- |
| 400      | InvalidNotificationGroup       | NotificationGroup parameter invalid or contains invalid groups | 参数错误或包含无效联系组                    |
| 400      | UnSupportMultipleRules         | Not support multiple rules                                   | ECS、BMS、CCS单条策略暂时不允许多个规则存在 |
| 400      | InvalidInstance                | LinkInstances parameter id invalid or instance not exist     | 关联实例参数错误或者实例id无效              |
| 400      | InvalidProductTypeAndMetricsId | ProductType parameter does not match MetricsId               | 产品类型与指标不匹配                        |
| 400      | StrategyNameExists             | StrategyName duplicate                                       | 策略名重复                                  |
| 400      | InvalidInActiveValue           | Inactive value invalid                                       | 禁用值无效                                  |

**请求示例**

```python
def create_alarm_strategy():
    action = "CreateAlarmStrategy"
    method = "POST"
    param = {
        "ActiveStartTime": "00:00",
        "ActiveEndTime": "23:59",
        "Level": 1,
        "NotificationType": ["webhook"],
        "NotificationGroup": [
            "4c8d8bad-10ed-4673-ba3f-4a568d0756a1"
        ],
        "Rules":
            [
                {
                 "MetricsId": "ecs.cpu.usage",
                 "Period": 1,
                 "LastedPeriod": 5,
                 "TriggerType": "Average",
                 "TriggerSymbol": ">=",
                 "Value": 90,
                 "SilentPeriod": 5
                 }
            ],
        "Scope": 0,
        "StrategyName": "ecs策略-example",
        "ProductType": "ECS",
        "AlarmType": "MetricAlarm",
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param={})
    res = requests.post(url, json=param)
    result = res.json()

    print(json.dumps(result,ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return

    return result
```

**返回示例**

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "StrategyId": "ba586b23-5d28-4558-9a9f-75e1ec1a0309",
      "StrategyName": "ecs策略-example"
   }
}
```

### 9.DeleteAlarmStrategy

**Action**: DeleteAlarmStrategy

**描述**：删除报警策略

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: POST

**请求参数**

| 名称        | 类型 | 是否必须 | 示例                                                         | 描述       |
| ----------- | ---- | -------- | ------------------------------------------------------------ | ---------- |
| StrategyIds | list | 是       | ["e714f411-c941-478c-9f22-23a57977eb85", "e714f411-c941-478c-9f22-23a57977eb85"] | 策略id列表 |

**返回参数**

| 名称    | 类型   | 示例            | 描述             |
| ------- | ------ | --------------- | ---------------- |
| Code    | string | Success         | 错误码           |
| Message | string | Request success | 提示信息         |
| Data    | object |                 | 删除成功的规则id |

data对象

| 名称    | 类型 | 示例                                                         | 描述                 |
| ------- | ---- | ------------------------------------------------------------ | -------------------- |
| Success | list | ["e714f411-c941-478c-9f22-23a57977eb85", "e714f411-c941-478c-9f22-23a57977eb85"] | 删除成功的策略id列表 |
| Failed  | list | ["e714f411-c941-478c-9f22-23a57977eb85", "e714f411-c941-478c-9f22-23a57977eb85"] | 删除失败的策略id列表 |

**请求示例**

```python
def delete_alarm_strategy():
    action = "DeleteAlarmStrategy"
    method = "POST"
    param = {
        "StrategyIds": ["ba586b23-5d28-4558-9a9f-75e1ec1a0309", "5ee92b2a-df85-4026-b6ed-39dd54115ea2"],
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param={})
    res = requests.post(url, json=param)
    result = res.json()
    print(json.dumps(result,ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return

    return result
```

**返回示例**

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "Success": ["ba586b23-5d28-4558-9a9f-75e1ec1a0309"],
      "Failed": ["5ee92b2a-df85-4026-b6ed-39dd54115ea2"]
   }
}
```

### 10.DescribeAlarmStrategies

**Action**: DescribeAlarmStrategies

**描述**：查询报警策略列表

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: GET

**请求参数**

| 名称         | 类型   | 是否必须 | 示例                             | 描述                                                         |
| ------------ | ------ | -------- | -------------------------------- | ------------------------------------------------------------ |
| StrategyId   | string | 否       | 1e97d3c0-721a-4f6f-bcf1-47d71f16 | 报警策略ID                                                   |
| PageNumber   | int    | 否       | 10                               | 当前页码                                                     |
| PageSize     | int    | 否       | 20                               | 每页记录规则条数                                             |
| StrategyName | string | 否       | test                             | 策略名称                                                     |
| AlarmType    | string | 否       | MetricAlarm                      | 告警类型:MetricAlarm、EventAlarm                             |
| InActive     | string | 否       | 0                                | 是否启用                                                     |
| ProductType  | string | 否       | ECS                              | 产品类型 参考[通用字段下的ProductType:  产品类型](#ProductType) |
| Level        | int    | 否       | 3                                | 告警级别 3-info；2-warning；1-critical                       |

**返回参数**

| 名称    | 类型   | 示例值          | 描述     |
| ------- | ------ | --------------- | -------- |
| Code    | string | Success         | 错误码   |
| Data    | object |                 |          |
| Message | string | Request success | 提示信息 |

Data对象

| 名称       | 类型 | 示例值 | 描述                       |
| ---------- | ---- | ------ | -------------------------- |
| PageNumber | int  | 5      | 分页使用，第几页           |
| PageSize   | int  | 20     | 分页使用，每页显示几条规则 |
| TotalCount | int  | 100    | 分页使用，总记录数         |
| Strategy   | list |        | 策略列表                   |

Strategy对象

| 名称              | 类型     | 示例值                                                 | 描述                                                         |
| ----------------- | -------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| StrategyId        | string   | 1e97d3c0-721a-4f6f-bcf1-47d71f16                       | 策略id                                                       |
| StrategyName      | string   | 测试策略                                               | 策略名称                                                     |
| Status            | string   | Normal                                                 | 规则使用状态：正常Normal，正在告警中Alarming、未告警出来Pending、数据不足DataLocked |
| StatusStr         | string   | 正常                                                   | 规则状态的中文说明                                           |
| InActive          | int      | 1                                                      | 0 未启用 1 启用                                              |
| Level             | int      | 1                                                      | 告警级别 3 Info 2 Warning 1 Critical                         |
| LevelStr          | string   | 严重                                                   | 告警级别说明                                                 |
| ActiveStartSime   | string   | 00:00                                                  | 起始时间 00:00                                               |
| ActiveEndTime     | string   | 23:59                                                  | 结束时间 23:59                                               |
| ProductType       | string   | ECS                                                    | 资源类型 BMS裸金属 CCS 云服务器、ECS                         |
| ProductTypeStr    | string   | gpu云服务器                                            | 资源类型说明                                                 |
| AlarmType         | string   | MetricAlarm                                            | 告警类型:MetricAlarm、EventAlarm                             |
| AlarmTypeStr      | string   | 指标告警                                               | 告警类型说明                                                 |
| NotificationType  | list     | ["email","sms"]                                        | 通知方式 email:邮件；sms:短信；webhook:第三方回调            |
| NotificationGroup | string   | {'247a1925-f401-44ce-90b4-43b2a900124a': 'warnGroup1'} | 联系人组                                                     |
| Scope             | int      | 1                                                      | 生效资源范围：0：全部资源;1:实例（指定实例）                 |
| CreateTime        | datetime | 2020-12-06 00:13:29                                    | 策略创建时间                                                 |
| UpdateTime        | datetime | 2020-12-06 00:13:29                                    | 策略最近一次更新时间                                         |
| CallbackUrl       | string   | http://www.example.com                                 | url回调地址，POST请求方式                                    |
| Rules             | list     |                                                        | 规则列表                                                     |
| LinkInstances     | list     |                                                        | 关联的实例                                                   |

Rules对象

| 名称            | 类型     | 示例值                           | 描述                                                      |
| --------------- | -------- | -------------------------------- | --------------------------------------------------------- |
| RuleName        | string   | 测试规则                         | 规则名称                                                  |
| RuleId          | string   | 1e97d3c0-721a-4f6f-bcf1-47d71f16 | 规则id                                                    |
| Description     | string   | 测试规则                         | 描述                                                      |
| MetricsId       | string   | ecs.cpu.usage                    | 监控指标id                                                |
| MetricsIdStr    | string   | ecs实例cpu使用率                 | 监控指标说明                                              |
| Period          | int      | 1                                | 监控周期 单位 分钟                                        |
| PeriodStr       | string   |                                  | 监控周期说明                                              |
| LastedPeriod    | int      | 30                               | 连续报警周期                                              |
| LastedPeriodStr | string   |                                  | 连续报警周期说明                                          |
| TriggerType     | string   | Average                          | 判断方式Always:总是， Maximum：最大值，  Once：只要有一次 |
| TriggerTypeStr  | string   | 平均值                           | 判断方式说明                                              |
| TriggerSymbol   | string   | >                                | 比较方式>=,<=,!=,between,=,<,>                            |
| Value           | int      | 80                               | 单位 百分比                                               |
| Unit            | string   | %                                | 单位 %,mb/s                                               |
| SilentPeriod    | int      | 3600                             | 沉默周期，单位秒                                          |
| SilentPeriodStr | string   | 一小时                           | 沉默周期说明                                              |
| CreateTime      | datetime | 2020-12-06 00:13:29              | 规则创建时间                                              |
| UpdateTime      | datetime | 2020-12-06 00:13:29              | 规则最近一次更新时间                                      |

LinkInstances对象

| 名称         | 类型   | 示例值                               | 描述   |
| ------------ | ------ | ------------------------------------ | ------ |
| InstanceId   | string | 20a5037b-f8e6-4457-9e2b-f016f4a872f1 | 实例id |
| InstanceName | string | ccs实例-example                      | 实例名 |

错误码：

| httpcode | 错误码      | 错误信息               | 描述             |
| -------- | ----------- | ---------------------- | ---------------- |
| 400      | InvalidPage | Page parameter invalid | 分页相关参数无效 |

**请求示例**

```python
def describe_alarm_strategies():
    action = "DescribeAlarmStrategies"
    method = "GET"
    param = {
        "PageNumber": 1,
        "PageSize": 100,
        "StrategyName": "ecs策略-example"
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param=param)
    res = requests.get(url)
    result = res.json()

    print(json.dumps(result, ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return

    return result
```

返回结果示例

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "PageNumber": 1,
      "PageSize": 100,
      "TotalCount": 1,
      "Strategy": [{
         "StrategyId": "ba586b23-5d28-4558-9a9f-75e1ec1a0309",
         "StrategyName": "ecs策略-example",
         "Status": "",
         "StatusStr": "正常状态",
         "InActive": 1,
         "Level": 1,
         "LevelStr": "严重",
         "ActiveStartTime": "00:00",
         "ActiveEndTime": "23:59",
         "Scope": 0,
         "ProductType": "ECS",
         "ProductTypeStr": "",
         "NotificationType": ["webhook"],
         "NotificationGroup": [{
            "GroupId": "4c8d8bad-10ed-4673-ba3f-4a568d0756a1",
            "GroupName": "联系组-example"
         }],
         "CallbackUrl": "",
         "AlarmType": "MetricAlarm",
         "AlarmTypeStr": "指标告警",
         "SmsSendLimit": 0,
         "Rules": [{
            "RuleId": "9653b68a-82a5-4329-a400-8177bd10758b",
            "RuleName": "ecs策略-example_0",
            "Description": "",
            "MetricsId": "ecs.cpu.usage",
            "MetricsIdStr": "",
            "Period": 1,
            "PeriodStr": "1分钟周期",
            "LastedPeriod": 5,
            "LastedPeriodStr": "连续5周期",
            "TriggerType": "Average",
            "TriggerTypeStr": "平均值",
            "TriggerSymbol": ">=",
            "Value": 90,
            "Unit": "%",
            "SilentPeriod": 5,
            "SilentPeriodStr": "5分钟",
            "CreateTime": "2022-11-24 11:31:01",
            "UpdateTime": "2022-11-24 11:31:01"
         }],
         "CreateTime": "2022-11-24 11:31:01",
         "UpdateTime": "2022-11-24 11:31:01"
      }]
   }
}
```

### 11.ModifyStrategyStatus

**Action**: ModifyStrategyStatus

**描述**：查询报警策略列表

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: POST

**请求参数**

| 名称        | 类型 | 是否必须 | 示例                                                         | 描述         |
| ----------- | ---- | -------- | ------------------------------------------------------------ | ------------ |
| StrategyIds | List | 是       | ["e714f411-c941-478c-9f22-23a57977eb85", "e714f411-c941-478c-9f22-23a57977eb85"] | 策略ID       |
| Enable      | int  | 是       | 0                                                            | 0禁用，1启用 |

**返回参数**

| 名称    | 类型   | 示例值          | 描述     |
| ------- | ------ | --------------- | -------- |
| Code    | string | Success         | 错误码   |
| Data    | object |                 | 具体数据 |
| Message | string | Request success | 提示信息 |

Data对象

| 名称    | 类型 | 示例值                                                       | 描述                      |
| ------- | ---- | ------------------------------------------------------------ | ------------------------- |
| Success | list | ["e714f411-c941-478c-9f22-23a57977eb85", "e714f411-c941-478c-9f22-23a57977eb85"] | 启用/禁用成功的策略id列表 |
| Failed  | list | ["e714f411-c941-478c-9f22-23a57977eb85", "e714f411-c941-478c-9f22-23a57977eb85"] | 启用/禁用成功的策略id列表 |

**请求示例**

```python
ef modify_strategy_status():
    action = "ModifyStrategyStatus"
    method = "POST"
    param = {
        "StrategyIds": ["ba586b23-5d28-4558-9a9f-75e1ec1a0309"],
        "Enable": 0
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param={})
    res = requests.post(url, json=param)
    result = res.json()

    print(json.dumps(result,ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return

    return result
```

**返回示例**

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "Success": ["ba586b23-5d28-4558-9a9f-75e1ec1a0309"],
      "Failed": []
   }
}
```

### 12.ModifyStrategy

**Action**: ModifyStrategy

**描述**：修改报警策略

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: POST

**请求参数**

| 名称              | 类型   | 是否必须 | 示例                                     | 描述                                              |
| ----------------- | ------ | -------- | ---------------------------------------- | ------------------------------------------------- |
| StrategyId        | string | 是       | e714f411-c941-478c-9f22-23a57977eb85     | 策略ID                                            |
| StrategyName      | string | 否       | test                                     | 策略名称，长度范围2到64字符                       |
| Level             | int    | 否       | 1                                        | 告警级别                                          |
| ActiveStartTime   | string | 否       | 00:00                                    | 有效起始时间                                      |
| ActiveEndTime     | string | 否       | 23:59                                    | 有效结束时间                                      |
| NotificationType  | list   | 否       | ["email","sms"]                          | 通知方式 email:邮件；sms:短信；webhook:第三方回调 |
| NotificationGroup | list   | 否       | ["f8b892c0-3506-402d-b91a-caaefa816bfb"] | 联系人组                                          |
| CallbackUrl       | string | 否       | http:/test.com.cn                        | 回调URL，最长2048个字符                           |
| Scope             | int    | 否       | 0                                        | 资源范围，0.全局 1.实例                           |
| LinkInstances     | list   | 否       | ["e714f411-c941-478c-9f22-23a57977eb85"] | 关联实例                                          |

**返回参数**

| 名称    | 类型   | 示例值          | 描述               |
| ------- | ------ | --------------- | ------------------ |
| Code    | string | Success         | 错误码             |
| Data    | object |                 | 修改成功的规则的ID |
| Message | string | Request success |                    |

Data对象

| 名称       | 类型   | 示例值                               | 描述   |
| ---------- | ------ | ------------------------------------ | ------ |
| StrategyId | string | e714f411-c941-478c-9f22-23a57977eb85 | 策略id |

**错误码**

| httpcode | 错误码                    | 错误信息                                                     | 描述                             |
| -------- | ------------------------- | ------------------------------------------------------------ | -------------------------------- |
| 400      | ParameterNotEnough        | There must be at least one optional parameter                | 可选参数不能全部为空             |
| 400      | InvalidStrategyNameLength | Strategy too short or too lang,lenth limit 2 to 64           | 策略名长度范围为2到64字符        |
| 400      | InvalidNotificationGroup  | NotificationGroup parameter invalid or contains invalid groups | 联系组参数无效或者包含无效联系组 |
| 400      | InvalidInstance           | LinkInstances parameter id invalid or instance not exist     | 关联实例参数无效或者实例不存在   |
| 400      | InvalidActiveTimeRange    | ActiveStartTime must be earlier than ActiveEndTime           | 起始时间必须早于终止时间         |
| 400      | StrategyIdNotFound        | Strategy id not found                                        | 策略id不存在                     |

**请求示例**

```python
def modify_strategy():
    action = "ModifyStrategy"
    method = "POST"
    param = {
        "StrategyId": "ba586b23-5d28-4558-9a9f-75e1ec1a0309",
        "NotificationGroup": ["4c8d8bad-10ed-4673-ba3f-4a568d0756a1"],
        "NotificationType": [
            "email",
            "sms",
            "webhook"
        ],
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param={})
    res = requests.post(url, json=param)
    result = res.json()

    print(json.dumps(result,ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return

    return result
```

**返回示例**

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "StrategyId": "ba586b23-5d28-4558-9a9f-75e1ec1a0309"
   }
}
```

### 13.ModifyStrategyRule

**Action**: ModifyStrategyRule

**描述**：修改报警策略的规则

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: POST

**请求参数**

| 名称       | 类型   | 是否必须 | 示例                                 | 描述                                           |
| ---------- | ------ | -------- | ------------------------------------ | ---------------------------------------------- |
| StrategyId | string | 是       | 6cb991fb-3989-4860-8b79-e65466b7ec30 | 策略ID                                         |
| Rules      | list   | 是       |                                      | 规则组，仅作为修改使用，增加和删除规则另有接口 |

Rules对象：

**注**： 当前对于监控指标的修改不建议跨产品操作

| 名称          | 类型   | 是否必须 | 示例                                 | 描述                                                         |
| ------------- | ------ | -------- | ------------------------------------ | ------------------------------------------------------------ |
| RuleId        | string | 是       | e714f411-c941-478c-9f22-23a57977eb85 | 规则ID                                                       |
| MetricsId     | string | 否       | vm.cpu.usage                         | 指标id，DescribeAlarmMetrics 获取指标ID                      |
| Period        | int    | 否       | 1                                    | 监控周期（分钟）默认为1,取值范围1/15/30/60                   |
| LastedPeriod  | int    | 否       | 1                                    | 连续周期（分钟）                                             |
| TriggerType   | string | 否       | Always                               | 判断类型Always/Average/Once，默认为平均值，除ECS/CCS/BMS以外其它产品只支持Average |
| TriggerSymbol | string | 否       | <=                                   | 规则判断方式，默认>=         取值范围>=   <=     <    >      |
| Value         | int    | 否       | 4                                    | 设定值                                                       |
| SilentPeriod  | int    | 否       | 0                                    | 沉默周期（分钟）取值范围 5 10 15 30 60 180 360 720 1440，默认5 |

**返回参数**

| 名称    | 类型   | 示例值          | 描述               |
| ------- | ------ | --------------- | ------------------ |
| Code    | string | Success         | 错误码             |
| Data    | object |                 | 修改成功的规则的ID |
| Message | string | Request success |                    |

Data对象

| 名称    | 类型 | 示例值                                                       | 描述                 |
| ------- | ---- | ------------------------------------------------------------ | -------------------- |
| Success | list | ["e714f411-c941-478c-9f22-23a57977eb85", "e714f411-c941-478c-9f22-23a57977eb85"] | 修改成功的规则ID列表 |
| Failed  | list | ["e714f411-c941-478c-9f22-23a57977eb85", "e714f411-c941-478c-9f22-23a57977eb85"] | 修改失败的规则ID列表 |

**错误码**

| httpcode | 错误码             | 错误信息                | 描述         |
| -------- | ------------------ | ----------------------- | ------------ |
| 400      | InvalidRule        | Rules parameter invalid | 规则参数无效 |
| 400      | StrategyIdNotFound | Strategy id not found   | 策略id不存在 |

调用示例

```python
def modify_strategy_rule():
    action = "ModifyStrategyRule"
    method = "POST"
    param = {
        "StrategyId": "ba586b23-5d28-4558-9a9f-75e1ec1a0309",
        "Rules": [{
            "RuleId": "9653b68a-82a5-4329-a400-8177bd10758b",
            "MetricsId": "ecs.mem.usage",
            "Period": 15,
            "LastedPeriod": 5,
            "Value": 89
        }]
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param={})
    res = requests.post(url, json=param)
    result = res.json()
    print(json.dumps(result, ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return

    return result
```

返回值示例

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "Success": ["9653b68a-82a5-4329-a400-8177bd10758b"],
      "Failed": null
   }
}
```

### 14.AddStrategyRule

**Action**: AddStrategyRule

**描述**：增加报警策略的规则【CCS/BMS/ECS暂不支持】

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: POST

| 名称       | 类型   | 是否必须 | 示例                                 | 描述     |
| ---------- | ------ | -------- | ------------------------------------ | -------- |
| StrategyId | string | 是       | 6cb991fb-3989-4860-8b79-e65466b7ec30 | 策略ID   |
| Rules      | list   | 是       |                                      | 规则对象 |

Rules对象

| 名称          | 类型   | 是否必须 | 示例          | 描述                                                         |
| ------------- | ------ | -------- | ------------- | ------------------------------------------------------------ |
| MetricsId     | string | 是       | ecs.cpu.usage | 指标id                                                       |
| Period        | int    | 否       | 1             | 周期，默认为1,取值范围1/15/30/60                             |
| LastedPeriod  | int    | 否       | 5             | 连续周期数,默认为1                                           |
| TriggerType   | string | 否       | Average       | 判断类型Always/Average/Once，默认为平均值                    |
| TriggerSymbol | string | 否       | >=            | 规则判断方式                                                 |
| Value         | int    | 否       | 10            | 触发值，默认为10                                             |
| SilentPeriod  | int    | 否       | 360           | 规则沉默周期，单位分钟 5 10 15 30 60 180 360 720 1440，默认0 |

**返回参数**

| 名称    | 类型   | 示例值          | 描述               |
| ------- | ------ | --------------- | ------------------ |
| Code    | string | Success         | 错误码             |
| Data    | object |                 | 修改成功的规则的ID |
| Message | string | Request success |                    |

data对象

| 名称    | 类型 | 示例                                                         | 描述                 |
| ------- | ---- | ------------------------------------------------------------ | -------------------- |
| Success | list | ["e714f411-c941-478c-9f22-23a57977eb85", "e714f411-c941-478c-9f22-23a57977eb85"] | 删除成功的规则id列表 |
| Failed  | list | ["e714f411-c941-478c-9f22-23a57977eb85", "e714f411-c941-478c-9f22-23a57977eb85"] | 删除失败的规则id列表 |

**请求示例**

```python
def add_strategy_rule():
    action = "AddStrategyRule"
    method = "POST"
    param = {
        "StrategyId": "7203f66c-d761-4038-b46f-6a5d9130558e",
        "Rules": [{
            "MetricsId": "eff006d7-8819-4ab7-ab50-0b56de49255d",
            "Period": 5,
            "LastedPeriod": 5,
            "Value": 89,
            "TriggerType": "Average",
        }]
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param={})
    res = requests.post(url, json=param)
    result = res.json()
    print(json.dumps(result, ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return

    return result
```

**返回示例**

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "Success": ["5e5e7ced-3f16-402b-b458-72be178882b8"],
      "Failed": []
   }
}
```

### 15.DeleteStrategyRule

**Action**: DeleteStrategyRule

**描述**：删除报警策略的规则【CCS/BMS/ECS暂不支持】

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: POST

**请求参数**

| 名称       | 类型   | 是否必须 | 示例                                                         | 描述   |
| ---------- | ------ | -------- | ------------------------------------------------------------ | ------ |
| StrategyId | string | 是       | 6cb991fb-3989-4860-8b79-e65466b7ec30                         | 策略ID |
| RuleIds    | list   | 是       | ["a4704352-7fa7-4782-af82-bde57e28cf15","13a9fb72-7c92-4e54-8c16-cd73f4d52bc7"] | 规则ID |

**返回参数**

| 名称    | 类型   | 示例值          | 描述               |
| ------- | ------ | --------------- | ------------------ |
| Code    | string | Success         | 错误码             |
| Data    | object |                 | 修改成功的规则的ID |
| Message | string | Request success |                    |

data对象

| 名称    | 类型 | 示例                                                         | 描述                 |
| ------- | ---- | ------------------------------------------------------------ | -------------------- |
| Success | list | ["e714f411-c941-478c-9f22-23a57977eb85", "e714f411-c941-478c-9f22-23a57977eb85"] | 删除成功的规则id列表 |
| Failed  | list | ["e714f411-c941-478c-9f22-23a57977eb85", "e714f411-c941-478c-9f22-23a57977eb85"] | 删除失败的规则id列表 |

**请求示例**

```python
def delete_strategy_rule():
    action = "DeleteStrategyRule"
    method = "POST"
    param = {
        "StrategyId": "7203f66c-d761-4038-b46f-6a5d9130558e",
        "RuleIds": ["5e5e7ced-3f16-402b-b458-72be178882b8"]
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param={})
    res = requests.post(url, json=param)
    result = res.json()
    print(json.dumps(result, ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return

    return result

```

**返回示例**

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "Success": ["5e5e7ced-3f16-402b-b458-72be178882b8"],
      "Failed": []
   }
}
```

### 16.DescribeAlarmHistories

**Action**: DescribeAlarmHistories

**描述**：查询产生的告警历史记录（暂只支持查询一小时以内）

**请求地址**: api.capitalonline.net/alarm/v1

**请求方法**: GET

**请求参数**

| 名称         | 类型   | 是否必须 | 示例                                  | 描述                                                         |
| ------------ | ------ | -------- | ------------------------------------- | ------------------------------------------------------------ |
| RuleName     | string | 否       | ecs规则-cpu                           | 规则名                                                       |
| RuleId       | string | 否       | efefddsdf-8wef-1ewc-9247-5293weed0ddd | 规则ID                                                       |
| InstanceName | string | 否       | test                                  | 实例名                                                       |
| InstanceId   | string | 否       | ewefewa-95e1-11ec-adf8-1efweeef8465   | 实例ID                                                       |
| PageNumber   | int    | 否       | 1                                     | 当前页码，默认第1页                                          |
| PageSize     | int    | 否       | 10                                    | 页面大小，默认10                                             |
| AlarmStatus  | string | 否       | AlarmHappened                         | 告警状态AlarmHappened、PipeSilence、RecoverNormal 、NewInitialize 初始化 |
| AlarmType    | string | 否       | MetricAlarm                           | 报警类型MetricAlarm, EventAlarm                              |

**返回参数**

| 名称    | 类型   | 示例            | 描述     |
| ------- | ------ | --------------- | -------- |
| Code    | string | Success         | 错误码   |
| Message | string | Request success | 提示信息 |
| Data    | object |                 |          |

Data对象的字段

| 名称       | 类型 | 示例 | 描述         |
| ---------- | ---- | ---- | ------------ |
| AlarmList  | list |      | 告警记录列表 |
| PageNumber | int  | 1    | 当前页码     |
| TotalPages | int  | 10   | 总页数       |
| Total      | int  | 100  |              |

AlarmList对象的字段

| 名称              | 类型   | 示例                                 | 描述                                                         |
| ----------------- | ------ | ------------------------------------ | ------------------------------------------------------------ |
| RuleId            | string | 73203ba0-09cc-4b52-a4f9-452b5b7642a5 | 规则id                                                       |
| RuleName          | string | CCS规则-cpu                          | 规则名称                                                     |
| InstanceId        | string | f61c355a-b43f-42f2-8c08-cf25f542a538 | 实例id                                                       |
| ProductType       | string | CCS                                  | 产品类型CCS、BMS、ECS                                        |
| InstanceName      | string | 测试实例                             | 实例名称                                                     |
| Status            | string | PipeSilence                          | 告警状态：AlarmHappened 报警发生 PipeSilence 发送通道沉默 RecoverNormal 恢复正常 NewInitialize 初始化 |
| NotificationType  | list   | ["email","sms"]                      |                                                              |
| Duration          | string | 600                                  | 持续时间 单位秒                                              |
| AlarmTime         | string | 2019-11-29 06:11:17                  | 告警发生时间                                                 |
| NotificationGroup | list   |                                      | 告警联系组                                                   |
| AlarmType         | string | MetricAlarm                          | 告警类型EventAlarm='事件告警', MetricAlarm='指标告警'        |
| AlarmTypeStr      | string | 指标告警                             | 告警类型(中文说明)                                           |

NotificationGroup

| 名称      | 类型   | 示例                                 | 描述       |
| --------- | ------ | ------------------------------------ | ---------- |
| GroupId   | string | 4e16ac79-7541-4811-a658-22940a69bea8 | 联系组id   |
| GroupName | string | 联系组1                              | 联系组名称 |

**请求示例**

```python
def describe_alarm_histories():
    action = "DescribeAlarmHistories"
    method = "GET"
    param = {
        "AlarmStatus": "AlarmHappened",
        "AlarmType": "MetricAlarm",
        "PageNumber": 1,
        "PageSize": 10,
    }
    url = get_signature(action, AK, AccessKeySecret, method, ALARM_URL, param=param)
    res = requests.get(url)
    result = res.json()
    print(json.dumps(result,ensure_ascii=False))
    if result.get("Code") != "Success":
        print("request error: %s" % result.get("Message"))
        return

    return result
```

**返回示例**

```json
{
   "Code": "Success",
   "Message": "Request success",
   "Data:": {
      "PageNumber": 1,
      "PageSize": 2,
      "Total": 1,
      "AlarmList": [{
         "RuleId": "17fc9559-c114-49a6-84fd-e55ca09be999",
         "RuleName": "ccs规则-example",
         "InstanceId": "0df11f95-0dd5-43fa-8b53-bf8884ccc942",
         "ProductType": "CCS",
         "InstanceName": "ccs实例-example",
         "Status": "AlarmHappened",
         "NotificationType": ["webhook"],
         "Duration": 60,
         "AlarmTime": "2022-11-24 16:04:36",
         "NotificationGroup": [{
            "GroupId": "fae5f321-8a8f-4992-a1f8-e41b4e2d9dcf",
            "GroupName": "联系组-example"
         }],
         "AlarmType": "MetricAlarm"
      }]
   }
}
```

## ECS安全组相关接口

### 1. DescribeSecurityGroups

**Action**: DescribeSecurityGroups

**描述**: 查看用户下安全组属性概况

**请求方法**：GET

**请求参数** 

| 参数              | 类型   | 含义         | 是否必选                            | 示例                |
| ----------------- | ------ | ------------ | ----------------------------------- | ------------------- |
| RegionCode        | string | 区域Code     | 否                                  | CN_Suqian           |
| SecurityGroupId   | string | 安全组id     | 否                                  | sg-12ys37squazemjlx |
| SecurityGroupName | string | 安全组名称   | 否                                  | mySG                |
| PageNumber        | int    | 当前页       | 否，当为0或者不填时，表示不分页查询 | 1                   |
| PageSize          | int    | 每页展示数量 | 否                                  | 20                  |

**响应参数**

| 参数             | 类型                     | 含义                            |
| ---------------- | ------------------------ | ------------------------------- |
| SecurityGroupSet | Array of *SecurityGroup* | 安全组对象，此字段可能返回 null |
| TotalCount       | int                      | 符合条件的实例数量              |

*SecurityGroup*

| 参数                | 类型   | 含义                          |
| ------------------- | ------ | ----------------------------- |
| SecurityGroupId     | string | 安全组实例ID                  |
| SecurityGroupName   | string | 安全组名称                    |
| SecurityGroupRegion | string | 安全组区域名称                |
| InstanceCount       | int    | 绑定实例数量                  |
| IpCount             | int    | 可加入IP数量                  |
| SecurityGroupDesc   | string | 安全组描述                    |
| CreatedTime         | string | 安全组创建时间                |
| UpdateTime          | string | 安全组更新时间                |
| GroupInterconnected | bool   | 是否组内互通，true是，false否 |

分页响应参数

| 参数       | 类型 | 含义         |
| ---------- | ---- | ------------ |
| TotalCount | int  | 总数量       |
| PageNumber | int  | 当前页       |
| PageSize   | int  | 每页展示数量 |

**示例**

```
GET http://api.capitalonline.net/sg/v1?&RegionCode=CN_Suqian&RegionCode=CN_Suqian&<公共请求参数>
```

```json
{
    "Code": "Success",
    "Message": "成功",
    "Data": {
        "TotalCount": 1,
        "SecurityGroupSet": [
            {
                "SecurityGroupId": "sg-ateok6ref6ho4smp",
                "SecurityGroupName": "demo",
                "SecurityGroupRegion":"宿迁",
                "InstanceCount": 2,
                "IpCount": 1998,
                "CreatedTime": "2022-11-02 10:05:47",
                "UpdateTime": "2022-11-02 10:05:47",
                "SecurityGroupDesc": "描述",
                "GroupInterconnected": true
            }
        ]
    },
    "RequestId": "qtsnhp06l00co36tbbcdfg8100zsobyh",
    "TotalCount": 16,
    "PageNumber": 1,
    "PageSize": 5
}
```



### 2. CreateSecurityGroup

**Action**: CreateSecurityGroup

**描述**: 创建安全组

**请求方法**：POST 

**请求参数** 

| 参数                     | 类型   | 含义                          | 是否必选 | 示例       |
| ------------------------ | ------ | ----------------------------- | -------- | ---------- |
| SecurityGroupName        | string | 安全组名称，最多60个字符      | 是       | mySG       |
| SecurityGroupDescription | string | 安全组描述，最多128个字符     | 否       | 安全组描述 |
| GroupInterconnected      | bool   | 是否组内互通，true是，false否 | 否       | true       |
| RegionCode               | string | 可用区code                    | 是       | CN_Suqian  |

**响应参数** 

| 参数            | 类型   | 含义     | 是否必选 | 示例                |
| --------------- | ------ | -------- | -------- | ------------------- |
| SecurityGroupId | string | 安全组id | 是       | sg-iwvmqar807h34cmk |

**示例**

```
POST  http://api.capitalonline.net/sg/v1?<公共请求参数>
```

```json
{
    "SecurityGroupName": "测试demo",
    "SecurityGroupDescription": "安全组描述",
    "GroupInterconnected":true,
    "RegionCode":"CN_Suqian"
}
```

```json
{
    "Code": "Success",
    "Message": "成功",
    "Data": {
        "SecurityGroupId": "sg-iwvmqar807h34cmk"
    },
    "RequestId": "qtsnhp04n00co3alsf4j6to100kbj61s"
}
```



### 3. ModifySecurityGroupAttribute

**Action**: ModifySecurityGroupAttribute

**描述**: 修改安全组属性

**请求方法**：POST 

**请求参数** 

| 参数                     | 类型   | 含义                                                | 是否必选 |
| ------------------------ | ------ | --------------------------------------------------- | -------- |
| SecurityGroupId          | string | 安全组id                                            | 是       |
| SecurityGroupName        | string | 安全组名称，最多60个字符                            | 否       |
| SecurityGroupDescription | string | 安全组描述，最多128个字符                           | 否       |
| GroupInterconnected      | bool   | 是否组内互通，true是，false否，且不能更改和之前一样 | 否       |

*注：修改时不填视为不更改，且不能修改和之前一样，GroupName/GroupDescription/GroupInterconnected 至少有要一个更改*

**示例**

```
POST  http://api.capitalonline.net/sg/v1?<公共请求参数>
```

```json
{
    "SecurityGroupId":"sg-78e4t8rkp4h740m0",
    "SecurityGroupDescription": "描述修改"
}
```

```json
{
    "Code": "Success",
    "Message": "成功",
    "RequestId": "qtsnhp094c0co5qv5cvko8w600gullgh"
}
```



### 4. DeleteSecurityGroup

**Action**: DeleteSecurityGroup

**描述**: 安全组删除

**请求方法**：POST

**请求参数** 

| 参数            | 类型   | 含义     | 是否必选 |
| --------------- | ------ | -------- | -------- |
| SecurityGroupId | string | 安全组id | 是       |

**示例**

```
POST  http://api.capitalonline.net/sg/v1?<公共请求参数>&SecurityGroupId=sg-78e4t8rkp4h740m0
```

```json
{
    "Code": "Success",
    "Message": "成功",
    "RequestId": "qtsnhp094c0co5qv5cvko8w600gullgh"
}
```



### 5. CreateSecurityGroupPolicies

**Action**: CreateSecurityGroupPolicies

**描述**: 安全组添加规则

**请求方法**：POST

**请求参数** 

| 参数                   | 类型                     | 含义         | 是否必选 |
| ---------------------- | ------------------------ | ------------ | -------- |
| SecurityGroupId        | string                   | 安全组实例ID | 是       |
| SecurityGroupPolicySet | *SecurityGroupPolicySet* | 规则集合     | 否       |

*SecurityGroupPolicySet*

| 参数    | 类型                           | 含义     | 是否必选 |
| ------- | ------------------------------ | -------- | -------- |
| Ingress | Array of *SecurityGroupPolicy* | 入站规则 | 否       |
| Egress  | Array of *SecurityGroupPolicy* | 出站规则 | 否       |

*SecurityGroupPolicy*

| 参数              | 类型   | 含义                              | 是否必选 | 示例      |
| ----------------- | ------ | --------------------------------- | -------- | --------- |
| Protocol          | string | 协议类型                          | 是       | TCP       |
| PolicyDescription | string | 描述                              | 否       | 描述      |
| Port              | string | 端口号范围                        | 是       | 22/22     |
| Priority          | int    | 规则优先级（1~100）               | 是       | 12        |
| CidrBlock         | string | 网段或IP(互斥)                    | 是       | 0.0.0.0/0 |
| Status            | bool   | 状态，true表示允许，false表示拒绝 | 是       | true      |

*注意：*

*1. 当协议为icmp时，Port无意义，填1/1即可*

*2. 新增的规则和历史规则一样时，则会新增失败*

**示例**

```
POST  http://api.capitalonline.net/sg/v1?<公共请求参数>
```

```json
{
    "SecurityGroupId": "sg-tzejtarkp5hd4rm7",
    "SecurityGroupPolicySet": {
        "Ingress": [
            {
                "Protocol": "TCP",
                "PolicyDescription": "规则描述",
                "Port": "22/22",
                "CidrBlock": "0.0.0.0/0",
                "Priority": 1,
                "Status": true
            },
            {
                "Protocol": "TCP",
                "PolicyDescription": "规则描述",
                "Port": "3000/4000",
                "CidrBlock": "0.0.0.0/0",
                "Priority": 10,
                "Status": false
            }
        ],
        "Egress": [
            {
                "Protocol": "TCP",
                "PolicyDescription": "规则描述",
                "Port": "10000/20000",
                "CidrBlock": "0.0.0.0/0",
                "Priority": 1,
                "Status": false
            }
        ]
    }
}
```

```json
{
    "Code": "Success",
    "Message": "成功",
    "RequestId": "qtsnhp03bw0co5rceqdgv6o100w4kner"
}
```



### 6. DescribeSecurityGroupPolicies

**Action**: DescribeSecurityGroupPolicies

**描述**: 查询安全组规则

**请求方法**：GET

**请求参数** 

| 参数            | 类型   | 含义     | 是否必选 |
| --------------- | ------ | -------- | -------- |
| SecurityGroupId | string | 安全组id | 是       |

**响应参数**

| 参数                   | 类型                     | 含义         |
| ---------------------- | ------------------------ | ------------ |
| SecurityGroupId        | string                   | 安全组实例ID |
| SecurityGroupPolicySet | *SecurityGroupPolicySet* | 规则集合     |

*SecurityGroupPolicySet*

| 参数    | 类型                           | 含义     |
| ------- | ------------------------------ | -------- |
| Ingress | Array of *SecurityGroupPolicy* | 入站规则 |
| Egress  | Array of *SecurityGroupPolicy* | 出站规则 |

*SecurityGroupPolicy*

| 参数              | 类型   | 含义                              |
| ----------------- | ------ | --------------------------------- |
| PolicyId          | string | 规则id                            |
| Protocol          | string | 协议类型                          |
| PolicyDescription | string | 描述                              |
| Port              | string | 端口号范围 例如：22/22            |
| Priority          | int    | 规则优先级                        |
| CidrBlock         | string | 网段或IP(互斥)                    |
| Status            | bool   | 状态，true表示允许，false表示拒绝 |
| SecurityGroupId   | string | 安全组实例ID                      |

**示例**

```
GET  http://api.capitalonline.net/sg/v1?<公共请求参数>&SecurityGroupId=sg-tzejtarkp5hd4rm7
```

```json
{
    "Code": "Success",
    "Message": "成功",
    "Data": {
        "SecurityGroupId": "sg-tzejtarkp5hd4rm7",
        "SecurityGroupPolicySet": {
            "Ingress": [
                {
                    "SecurityGroupId": "sg-tzejtarkp5hd4rm7",
                    "PolicyID": "sp-a3hv1qrvbnhr4emz",
                    "Protocol": "tcp",
                    "PolicyDescription": "规则描述",
                    "Port": "22/22",
                    "CidrBlock": "0.0.0.0/0",
                    "Priority": 1,
                    "Status": true
                },
                {
                    "SecurityGroupId": "sg-tzejtarkp5hd4rm7",
                    "PolicyID": "sp-3azd1hrbb9hf4dm3",
                    "Protocol": "tcp",
                    "PolicyDescription": "规则描述",
                    "Port": "3000/4000",
                    "CidrBlock": "0.0.0.0/0",
                    "Priority": 10,
                    "Status": false
                }
            ],
            "Egress": [
                {
                    "SecurityGroupId": "sg-tzejtarkp5hd4rm7",
                    "PolicyID": "sp-w8z51hrfbmhs4emt",
                    "Protocol": "tcp",
                    "PolicyDescription": "规则描述",
                    "Port": "10000/20000",
                    "CidrBlock": "0.0.0.0/0",
                    "Priority": 1,
                    "Status": false
                }
            ]
        }
    },
    "RequestId": "qtsnhp0b900co5rzt5fu0f810087vhn8"
}
```



### 7. DeleteSecurityGroupPolicies

**Action**: DeleteSecurityGroupPolicies

**描述**: 安全组规则删除

**请求方法**：POST

**请求参数** 

| 参数            | 类型            | 含义                                   | 是否必选 |
| --------------- | --------------- | -------------------------------------- | -------- |
| SecurityGroupId | string          | 安全组id                               | 是       |
| PolicyIds       | Array of string | 规则id数组，为空则删除该安全组所有策略 | 否       |

**示例**

```
POST  http://api.capitalonline.net/sg/v1?<公共请求参数>
```

```json
{
    "SecurityGroupId":"sg-tzejtarkp5hd4rm7",
    "PolicyIds":[
        "sp-3azd1hrbb9hf4dm3",
        "sp-w8z51hrfbmhs4emt"
    ]
}
```

```json
{
    "Code": "Success",
    "Message": "成功",
    "RequestId": "qtsnhp0b900co5ucyr8pww44002b1kwl"
}
```



### 8. ModifySecurityGroupPolicies

**Action**: ModifySecurityGroupPolicies

**描述**: 安全组修改规则

**请求方法**：POST

**请求参数** 

| 参数                   | 类型                     | 含义                                                         | 是否必选 |
| ---------------------- | ------------------------ | ------------------------------------------------------------ | -------- |
| SecurityGroupId        | string                   | 安全组实例ID                                                 | 是       |
| SecurityGroupPolicySet | *SecurityGroupPolicySet* | 规则集合                                                     | 否       |
| Reset                  | bool                     | 重置规则（将SecurityGroupPolicySet）覆盖之前规则，false不覆盖，true覆盖 | 是       |

*SecurityGroupPolicySet*

| 参数    | 类型                           | 含义     | 是否必选 |
| ------- | ------------------------------ | -------- | -------- |
| Ingress | Array of *SecurityGroupPolicy* | 入站规则 | 否       |
| Egress  | Array of *SecurityGroupPolicy* | 出站规则 | 否       |

*SecurityGroupPolicy*

| 参数              | 类型   | 含义                              | 是否必选                                   |
| ----------------- | ------ | --------------------------------- | ------------------------------------------ |
| PolicyId          | string | 规则id，只修改已存在的策略。      | 外层Reset为false时，必选。为true时，不用填 |
| Protocol          | string | 协议类型                          | 外层Reset为false时，非必选。为true时，必选 |
| PolicyDescription | string | 描述                              | 否                                         |
| Port              | string | 端口号范围（22/22）               | 外层Reset为false时，非必选。为true时，必选 |
| Priority          | int    | 规则优先级（1~100）               | 外层Reset为false时，非必选。为true时，必选 |
| CidrBlock         | string | 网段或IP(互斥)                    | 外层Reset为false时，非必选。为true时，必选 |
| Status            | int    | 状态，true表示允许，false表示拒绝 | 外层Reset为false时，非必选。为true时，必选 |

*注意：*

*1. 当外层Reset为ture时，可以理解为新增规则，要遵循新增规则规范。当外层Reset为false时，非必选的修改参数，至少有一处需要修改*

*2. 当协议为icmp时，修改Port无意义*

*3. 修改内容中存在与历史规则重复的规则时，无法修改*

**示例**

```
POST  http://api.capitalonline.net/sg/v1?<公共请求参数>
```

```json
{
    "SecurityGroupId": "sg-tzejtarkp5hd4rm7",
    "Reset":false,
    "SecurityGroupPolicySet": {
        "Ingress": [
            {
                "PolicyId":"sp-3azd1hrbb9hf4dm3",
                "Port": "3000/10000",
                "Status": true
            }
        ],
        "Egress": []
    }
}
```

```json
{
    "Code": "Success",
    "Message": "成功",
    "RequestId": "qtsnhp03ho0co5v44yi9tq41002d16qa"
}
```





### 9. AssociateSecurityGroups

**Action**: AssociateSecurityGroups

**描述**: 安全组绑定实例

**请求方法**：POST

**请求参数** 

| 参数            | 类型                        | 含义           | 是否必选 |
| --------------- | --------------------------- | -------------- | -------- |
| SecurityGroupId | string                      | 安全组id       | 是       |
| RegionCode      | string                      | 实例所属的区域 | 是       |
| InstanceSet     | Array of *InstanceSecurity* | 实例集合       | 是       |

*InstanceSecurity*

| 参数                  | 类型   | 含义                                    | 是否必选 |
| --------------------- | ------ | --------------------------------------- | -------- |
| InstanceId            | string | 实例id                                  | 是       |
| SecurityGroupPriority | int    | 上层安全组的优先级，只能1~5，且不能重复 | 是       |

*注意：同一实例内，安全组的优先级不能重复*

**示例**

```
POST  http://api.capitalonline.net/sg/v1?<公共请求参数>
```

```json
{
    "SecurityGroupId":"sg-tzejtarkp5hd4rm7",
    "RegionCode":"CN_Suqian",
    "InstanceSet":[
        {
            "InstanceId":"ins-xuuentqr7y36lubc",
            "SecurityGroupPriority":1
        }
    ]
}
```

```json
{
    "Code": "Success",
    "Message": "成功",
    "RequestId": "qtsnhp062c0co5xf5j75two100uewugm"
}
```



### 10.DisassociateSecurityGroups

**Action**: DisassociateSecurityGroups

**描述**: 安全组解绑实例

**请求方法**：POST

**请求参数**

| 参数            | 类型            | 含义       | 是否必选 |
| --------------- | --------------- | ---------- | -------- |
| SecurityGroupId | string          | 安全组id   | 是       |
| InstanceIds     | Array of string | 实例id数组 | 是       |

**示例**

```
POST  http://api.capitalonline.net/sg/v1?<公共请求参数>
```

```json
{
    "SecurityGroupId":"sg-78e4t8rkp4h740m0",
    "InstanceIds":[
        "ins-xuuentqr7y36lubc"
    ]
}
```

```json
{
    "Code": "Success",
    "Message": "成功",
    "RequestId": "qtsnhp01880co5xvdelk92g400dfg2i4"
}
```

*注意：当安全组为当前实例的最后一个安全组时，无法解绑*

### 11. ModifySecurityGroupsPriority

**Action**: ModifySecurityGroupsPriority

**描述**: 修改/重置实例下安全组和优先级

**请求方法**：POST

**请求参数**

| 参数             | 类型                        | 含义           | 是否必选 |
| ---------------- | --------------------------- | -------------- | -------- |
| InstanceId       | string                      | 实例id         | 是       |
| RegionCode       | string                      | 实例所属的区域 | 是       |
| SecurityGroupSet | Array of *SecurityGroupSet* | 安全组数组     | 是       |

*SecurityGroupSet*

| 参数            | 类型   | 含义     | 是否必选 |
| --------------- | ------ | -------- | -------- |
| SecurityGroupId | string | 安全组id | 是       |
| Priority        | int    | 优先级   | 是       |

**示例**

```
POST  http://api.capitalonline.net/sg/v1?<公共请求参数>
```

```json
{
    "InstanceId": "ins-xuuentqr7y36lubc",
    "RegionCode":"CN_Suqian",
    "SecurityGroupSet": [
        {
            "SecurityGroupId": "sg-tzejtarkp5hd4rm7",
            "Priority": 1
        },
        {
            "SecurityGroupId": "sg-78e4t8rkp4h740m0",
            "Priority": 2
        }
    ]
}
```

```json
{
    "Code": "Success",
    "Message": "成功",
    "RequestId": "qtsnhp0bec0co5y582enh2o200obda2o"
}
```



### 12. DescribeSecurityGroupAssociationStatistics

**Action**: DescribeSecurityGroupAssociationStatistics

**描述**: 查询安全组关联实例统计

**请求方法**：GET

**请求参数**

| 参数            | 类型   | 含义     | 是否必选 |
| --------------- | ------ | -------- | -------- |
| SecurityGroupId | string | 安全组id | 是       |

**响应参数**

| 参数               | 类型                          | 含义     |
| ------------------ | ----------------------------- | -------- |
| InstanceCount      | int                           | 实例数   |
| InstanceStatistics | Array of *InstanceStatistics* | 实例详情 |

*InstanceStatistics*

| 参数         | 类型   | 含义     |
| ------------ | ------ | -------- |
| InstanceName | string | 实例名称 |
| InstanceId   | string | 实例id   |
| Region       | string | 区域     |
| Az           | string | 可用区   |
| Vpc          | string | 所属vpc  |
| Ip           | string | ip地址   |

**示例**

```
POST  http://api.capitalonline.net/sg/v1?<公共请求参数>&SecurityGroupId=sg-tzejtarkp5hd4rm7
```

```json
{
    "Code": "Success",
    "Message": "成功",
    "Data": {
        "InstanceCount": 1,
        "InstanceStatistics": [
            {
                "InstanceName": "gyx_test",
                "InstanceId": "ins-xuuentqr7y36lubc",
                "Region": "宿迁",
                "Az": "宿迁B",
                "Vpc": "cmy-suqianA",
                "Ip": "10.0.2.6"
            }
        ]
    },
    "RequestId": "qtsnhp0bec0co5y9j9cnbgg400bil9gi"
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
| Code       | string | Success                              | 错误码                                                       |
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
| 北京Y         | CN_Beijing_Y      | 是             | 中国大陆 |
| 北京Z         | CN_Beijing_Z     | 是             | 中国大陆 |
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
| 德国C         | EUR_Germany_C     | 否             | 欧洲地区 |
| 东京A         | APAC_Tokyo_A      | 否             | 亚太地区 |
| 广州A         | CN_Guangzhou_A    | 否             | 中国大陆 |
| 荷兰A         | EUR_Netherlands_A | 否             | 欧洲地区 |
| 洛杉矶A       | US_LosAngeles_A   | 否             | 北美地区 |
| 上海A         | CN_Shanghai_A     | 否             | 中国大陆 |
| 上海C         | CN_Shanghai_C     | 否             | 中国大陆 |
| 上海D         | CN_Shanghai_D     | 否             | 中国大陆 |
| 首尔A         | APAC_Seoul_A      | 否             | 亚太地区 |
| 台北A         | CN_Taipei_A       | 否             | 中国大陆 |
| 无锡A         | CN_Wuxi_A         | 否             | 中国大陆 |
| 无锡B         | CN_Wuxi_B         | 是             | 中国大陆 |
| 香港A         | CN_Hongkong_A     | 否             | 中国大陆 |
| 新加坡A       | APAC_Singapore_A  | 否             | 亚太地区 |
| 新加坡B       | APAC_Singapore_B  | 否             | 亚太地区 |
| 新加坡C       | APAC_Singapore_C  | 否             | 亚太地区 |
| 新加坡D       | APAC_Singapore_D  | 否             | 亚太地区 |
| 新加坡E       | APAC_SGSIN_E      | 否             | 亚太地区 |
| 孟买A         | APAC_Mumbai_A     | 否             | 亚太地区 |
| 孟买B(已下线) | APAC_Mumbai_B     | 否             | 亚太地区 |
| 孟买C         | APAC_Mumbai_C     | 是             | 亚太地区 |
| 弗吉尼亚A     | US_Virginia_A     | 是             | 北美地区 |
| 达拉斯L       | US_Dallas_L       | 是             | 北美地区 |
| 迈阿密A       | US_Miami_A       | 是             | 北美地区 |
| 呼和浩特A     | CN_Huhehaote_A    | 是             | 中国大陆 |
| 呼和浩特B     | CN_Huhehaote_B    | 是             | 中国大陆 |
| 圣保罗A       | SR_SaintPaul_A    | 是             | 南美地区 |
| 苏州A         | CN_Suzhou_A       | 是             | 中国大陆 |
| 雅加达A       | APAC_Jakarta_A    | 是             | 亚太地区 |
| 胡志明A       | APAC_HoChiMinh_A  | 是             | 亚太地区 |
| 马赛A         | EUR_Marseilles_A  | 是             | 欧洲地区 |
| 达拉斯N       | US_Dallas_N       | 是             | 北美地区 |
| 长沙A        | CN_Changsha_A     | 否             | 中国大陆 |
| 宿迁B         | CN_Suqian_B       | 是             | 中国大陆 |

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

|带宽类型|Type|计费方式|BillingMethod|
|----:|-------:|-------:|-------:|
|标准BGP |Bandwidth_Standard_BGP  |   标准BGP-固定带宽 |BandwIdth |
| 标准BGP|Bandwidth_Standard_BGP  |   标准BGP-流量按需 |Traffic |
| 标准BGP|Bandwidth_Standard_BGP  |   标准BGP-95峰值 |BandwIdth_95  |
| BGP(多线)|Bandwidth_Multi_ISP_BGP |  BGP(多线)-固定带宽  |BandwIdth |
| BGP(多线)|Bandwidth_Multi_ISP_BGP | BGP(多线)-流量按需   |Traffic |
| BGP(多线)|Bandwidth_Multi_ISP_BGP |  BGP(多线)-95峰值  |BandwIdth_95  |
| BGP(经济型多线) |Bandwidth_Multi_ISP_Economy_BGP | BGP(经济型多线)-固定带宽   |BandwIdth  |
| BGP(经济型多线)|Bandwidth_Multi_ISP_Economy_BGP  |  BGP(经济型多线)-流量按需  |Traffic  |
| BGP(经济型多线)|Bandwidth_Multi_ISP_Economy_BGP  |   BGP(经济型多线)-95峰值 |BandwIdth_95 |
| BGP(本地多线)|Bandwidth_Locally_Multi_ISP_BGP |   BGP(本地多线)-固定带宽 |BandwIdth |
| BGP(本地多线)|Bandwidth_Locally_Multi_ISP_BGP |   BGP(本地多线)-流量按需 |Traffic |
| BGP(本地多线)|Bandwidth_Locally_Multi_ISP_BGP |   BGP(本地多线)-95峰值 |BandwIdth_95  |
| BGP-中国优化|Bandwidth_China_Optimized  |  中国优化BGP-固定带宽  |BandwIdth |
|BGP-中国优化 |Bandwidth_China_Optimized  |  中国优化BGP-95峰值  |BandwIdth_95  |
|BGP-中国优化|Bandwidth_China_Optimized |  中国优化BGP-流量包  |DataPackage  |
|BGP-中国优化 |Bandwidth_China_Optimized  |  BGP中国优化-流量按需  |Traffic |
|双线BGP |Bandwidth_Tow_Line_BGP  |  双线BGP-固定带宽  |  BandwIdth |
|双线BGP |Bandwidth_Tow_Line_BGP  |  双线BGP-流量包  | DataPackage |
| 双线BGP|Bandwidth_Tow_Line_BGP  |    双线BGP-95峰值|  BandwIdth_95  |
| 双线BGP|Bandwidth_Tow_Line_BGP  |   双线BGP-流量按需 |  Traffic |
| 单移动带宽|Bandwidth_Single_CMCC |   单移动带宽-固定带宽 |BandwIdth |
| 单移动带宽|Bandwidth_Single_CMCC |  单移动带宽-95峰值  |BandwIdth_95  |
| 单电信带宽|Bandwidth_Single_Telecom  |   单电信带宽-固定带宽 |BandwIdth |
| 单电信带宽|Bandwidth_Single_Telecom  |   单电信带宽-95峰值 |BandwIdth_95  |
| 单联通带宽|Bandwidth_Single_Unicom |   单联通带宽-固定带宽 |BandwIdth |
| 单联通带宽|Bandwidth_Single_Unicom |  单联通带宽-95峰值  |BandwIdth_95  |
| BGP|Bandwidth_BGP |   BGP-固定带宽 |  BandwIdth |
| BGP|Bandwidth_BGP |   BGP-流量包 |DataPackage  |
| BGP|Bandwidth_BGP |  BGP-95峰值  |BandwIdth_95  |
| BGP|Bandwidth_BGP |    BGP-流量按需|Traffic |
| 电信|Bandwidth_China_Telecom  | 电信-固定带宽   |BandwIdth  |
|电信 |Bandwidth_China_Telecom  |  电信-流量包  |DataPackage |
| 电信|Bandwidth_China_Telecom  |   电信-95峰值|BandwIdth_95  |
| 电信|Bandwidth_China_Telecom  |  单电信-流量按需  |Traffic |
| 台湾优化|Bandwidth_Taiwai_Optimized |  台湾优化BGP-固定带宽  |BandwIdth|  
| 台湾优化|Bandwidth_Taiwai_Optimized |   台湾优化BGP-流量包 |DataPackage| 
| 台湾优化|Bandwidth_Taiwai_Optimized |   台湾优化-95峰值 |BandwIdth_95 |
| 韩国优化|Bandwidth_Korea_Optimized  |    韩国优化BGP-固定带宽|BandwIdth|  
| 韩国优化|Bandwidth_Korea_Optimized  |  韩国优化BGP-流量包  |DataPackage| 
| 韩国优化|Bandwidth_Korea_Optimized  |   韩国优化BGP-95峰值 |BandwIdth_95| 
| VIP专用带宽|Bandwidth_VIP_Dedicated |  VIP专用带宽-流量按需  |Traffic |
| VIP专用带宽|Bandwidth_VIP_Dedicated |  VIP专用带宽-95峰值  |BandwIdth_95|
| 韩国本地带宽|Bandwidth_Korea_Locally  |   韩国本地带宽-固定带宽 |BandwIdth| 
| 韩国本地带宽|Bandwidth_Korea_Locally  |  韩国本地带宽-流量包  |DataPackage|  
| 韩国本地带宽|Bandwidth_Korea_Locally  |   韩国本地带宽-95峰值 |BandwIdth_95 |
| 全球优化BGP|Globally_Optimized_BGP  |   全球优化BGP-固定带宽 |BandwIdth|  
| 日本本地带宽|Bandwidth_Japan_Locally  |   日本本地带宽-固定带宽 |BandwIdth| 
| 菲律宾优化带宽|Southeast_Asia_Optimizes_Bandwidth  |  菲律宾优化带宽-流量按需  |Traffic|  
| 菲律宾优化带宽|Southeast_Asia_Optimizes_Bandwidth  |  菲律宾优化带宽-固定带宽  |BandwIdth |
| 菲律宾优化带宽|Southeast_Asia_Optimizes_Bandwidth  |   BandwIdth_95  菲律宾优化带宽-95峰值 |
| 联通|Bandwidth_China_Unicom |   联通-固定带宽 | BandwIdth |
| 移动|Bandwidth_CMCC |移动-固定带宽|BandwIdth  |
| BGP优化|Bandwidth_BGP_Optimized |  BGP优化-固定带宽  |BandwIdth|  
| BGP优化|Bandwidth_BGP_Optimized |  BGP优化-流量按需  |Traffic |
| BGP优化|Bandwidth_BGP_Optimized |  BGP优化-95峰值  |BandwIdth_95  |
| 华东BGP|Bandwidth_East_China_BGP  |  华东BGP-固定带宽  |BandwIdth |
| 华东BGP|Bandwidth_East_China_BGP  |  华东BGP-流量按需  |Traffic |
| 华东BGP|Bandwidth_East_China_BGP  |  华东BGP-95峰值  |BandwIdth_95  |
| 华北BGP|Bandwidth_North_China_BGP | 华北BGP-流量按需   |Traffic |
| 华北BGP|Bandwidth_North_China_BGP |   华北BGP-固定带宽  |Bandwidth|
| 华北BGP|Bandwidth_North_China_BGP |   华北BGP-95峰值 |Bandwidth_95  |
| 东南亚区域优化带宽|Bandwidth_SoutheastAsia_Optimization  |   东南亚区域优化带宽-固定带宽 |Bandwidth |
| 东南亚区域优化带宽|Bandwidth_SoutheastAsia_Optimization  |  东南亚区域优化带宽-流量按需  |Traffic |
| 东南亚区域优化带宽|Bandwidth_SoutheastAsia_Optimization  |   东南亚区域优化带宽-95峰值 |Bandwidth_95  |

## 附件四

#### 公共模板

| 模板大类型  | 模板类型                         | 中文名称                               |
| ----------- | -------------------------------- | -------------------------------------- |
| Anolis OS   | AnolisOS_8.6_64                  |                                        |
| Rocky Linux | RockyLinux_9.3_64                |                                        |
|             | RockyLinux_9.0_64                |                                        |
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
| Debian      | Debian_12.4_64                   |                                        |
|             | Debian_11.3_64                   |                                        |
|             | Debian_10.2_64                   |                                        |
|             | Debian_9.11_64                   |                                        |
|             | Debian_9.8_64                    |                                        |
|             | Debian_8.11_64                   |                                        |
|             | Debian_8.1_64                    |                                        |
|             | Debian_7.4_64                    |                                        |
| Redhat      | Redhat_7.4_64                    |                                        |
|             | Redhat_6.5_64                    |                                        |
| Ubuntu      | Ubuntu_22.04_64                  |                                        |
|             | Ubuntu_20.04_64                  |                                        |
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
| 呼和浩特 | CN_Huhhot     | 边缘节点   | 中国大陆 |
| 宿迁     | CN_Suqian     | 边缘节点   | 中国大陆 |
| 中国香港 | CN_HongKong   | 云平台节点 | 亚太地区 |
|  信创    |  CN_Xinchuang|边缘节点   | 中国大陆 |
|  文昌    | CN_Wenchang|  边缘节点   | 中国大陆 |
|  庆阳    | CN_Qingyang | 边缘节点   | 中国大陆 |
|  达拉斯   | US_Dallas   | 边缘节点   | 中国大陆 |
	

	

#### 私有网络可用区名称

| 可用区名称 | AvailableZoneCode | 站点类型   | 所在区域 |
| ---------- | ----------------- | ---------- | -------- |
| 呼和浩特B  | CN_Hohhot_B       | 边缘节点   | 呼和浩特 |
| 宿迁B      | CN_Suqian_B       | 边缘节点   | 宿迁     |
| 香港B      | CN_HongKong_B     | 云平台节点 | 中国香港 |
| 宿迁C      | CN_Suqian_C       | 边缘节点   | 宿迁     |
| 文昌A      | CN_Wenchang_A     | 边缘节点   | 文昌     |
| 信创A      | CN_Xinchuang_A    | 边缘节点   | 信创     |
| 庆阳A      | CN_Qingyang_A     | 边缘节点   | 庆阳    |
| 达拉斯N    | US_Dallas_N        | 边缘节点   | 达拉斯     |

## 附件六
### VPC推荐网段
|网段|
| -------- |
|10.0.0.0/16|
|172.16.0.0/16|
|192.168.0.0/16|

### vpc带宽类型

| 名称 | BandwidthType    | 
| -------- | ------------- |
| 移动    | Bandwidth_CMCC |
| 联通    | Bandwidth_China_Unicom |
| 电信    | Bandwidth_China_Telecom |
| BGP多线 | Bandwidth_Multi_ISP_BGP |
 
### EIP计费方案
| 名称 | BillScheme    | 
| -------- | ------------- |
|电信-固定带宽|BandwIdth|
|移动-固定带宽|BandwIdth|
|联通-固定带宽|BandwIdth|
|BGP(多线)-固定带宽|BandwIdth|
|电信-固定带宽EIP电信包月|BandwIdthMonth|
|移动-固定带宽EIP移动包月|BandwIdthMonth|
|联通-固定带宽EIP联通包月|BandwIdthMonth|
|BGP（多线）-固定带宽EIPBGP包月|BandwIdthMonth|
|电信-流量按需|Traffic|
|移动-流量按需|Traffic|
|联通-流量按需|Traffic|
|BGP(多线)-流量按需|Traffic|

### 共享带宽计费类型
| 名称 | BillScheme    | 
| -------- | ------------- |
|电信-固定带宽(共享)|BandwIdth_Shared|
|移动-固定带宽(共享)|BandwIdth_Shared|
|联通-固定带宽(共享)|BandwIdth_Shared|
|BGP(多线)-固定带宽(共享)|BandwIdth_Shared|
|电信-固定带宽(电信包月共享)|BandwIdthMonth_Shared|
|移动-固定带宽(移动包月共享)|BandwIdthMonth_Shared|
|联通-固定带宽(联通包月共享)|BandwIdthMonth_Shared|
|BGP(多线)-固定带宽(BGP包月共享)|BandwIdthMonth_Shared|
|电信-流量按需(共享)|Traffic_Shared|
|移动-流量按需(共享)|Traffic_Shared|
|联通-流量按需(共享)|Traffic_Shared|
|BGP(多线)-流量按需(共享)|Traffic_Shared|

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

