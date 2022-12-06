# CDN公开API目录
* [API概览](#api概览)
    - [域名管理](#域名管理)
    - [证书管理](#证书管理)
    - [刷新预取](#刷新预取)
    - [用量统计](#用量统计)
* [认证方式](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#认证方式)
  * [1.公共请求参数](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#1公共请求参数)
  * [2.签名机制](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#2签名机制)
    * [步骤一：构造规范化请求字符串](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#步骤一构造规范化请求字符串)
    * [步骤二：构造签名字符串](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#步骤二构造签名字符串)
  * [3.获取签名代码](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#2获取签名代码)
* [访问地址](#访问地址)
* [域名管理](#域名管理)
    - [CreateCdn](#createcdn)
    - [DescribeCdn](#describecdn)
    - [DescribeCdnInfo](#describecdninfo)
    - [ModifyCdn](#modifycdn)
    - [EnableCdn](#enablecdn)
    - [DisableCdn](#disablecdn)
    - [DeleteCdn](#deletecdn)
    - [ModifyProtocol](#modifyprotocol)
* [证书管理](#证书管理)
    - [CreateSsl](#createssl)
    - [ModifySsl](#modifyssl)
    - [DescribeSsl](#describessl)
    - [DescribeSslInfo](#describesslinfo)
* [刷新预取](#刷新预取)
    - [PrefetchFile](#prefetchfile)
    - [PrefetchList](#PrefetchList)
    - [PrefetchStatus](#PrefetchStatus)
    - [ContentRefresh](#contentrefresh)
    - [CacheList](#CacheList)
    - [CacheStatus](#CacheStatus)
* [用量统计](#用量统计)
    - [FlowStatistics](#flowstatistics)
    - [DosageAnalysis](#dosageanalysis)
    - [PathMetering](#pathmetering)
* [错误码](#错误码)

## API概览

CDN产品提供以下相关API接口。

### 域名管理

| API             | 描述                            |
| --------------- | ------------------------------- |
| CreateCdn       | 创建新的加速域名                |
| DescribeCdn     | 获取加速域名列表                |
| DescribeCdnInfo | 获取加速域名的详细信息          |
| ModifyCdn       | 修改加速域名                    |
| EnableCdn       | 启用加速域名                    |
| DisableCdn      | 禁用加速域名                    |
| DeleteCdn       | 删除加速域名                    |
| ModifyProtocol  | 修改加速域名的协议为 https 协议 |

### 证书管理

| API             | 描述               |
| --------------- | ------------------ |
| CreateSsl       | 创建证书           |
| ModifySsl       | 修改证书           |
| DescribeSsl     | 获取证书列表       |
| DescribeSslInfo | 获取证书的详细信息 |

### 刷新预取

| API            | 描述     |
| -------------- | -------- |
| PrefetchFile   | 预取文件 |
| PrefetchList   | 预取文件分页列表查询 |
| PrefetchStatus   | 预取文件进度查询 |
| ContentRefresh | 内容刷新 |
| CacheList   | 缓存刷新分页列表查询 |
| CacheStatus   | 缓存刷新进度查询 |


### 用量统计

| API            | 描述                                               |
| -------------- | -------------------------------------------------- |
| FlowStatistics | 获取指定域名在指定时间段内的用量信息               |
| DosageAnalysis | 获取指定域名今天、昨天、本月以及上个月的流量和带宽 |
| PathMetering   | 获取指定路径下产生的流量                           |

## 访问地址


| 地区     | 访问地址              |
| -------- | --------------------- |
| 中国大陆 | api.capitalonline.net |

## 域名管理

### CreateCdn

**Action：** CreateCdn

**描述：** 创建新的加速域名

**请求地址：** api.capitalonline.net/cdnapi/distribution

**请求方法：** POST

**请求参数：**

| 参数名          | 必选 | 类型   | 说明                                                         |
| :-------------- | :--- | ------ | ------------------------------------------------------------ |
| domainname      | 是   | string | 加速域名                                                     |
| typeid          | 是   | string | 加速类型（web：网页加速，download：下载加速，video：点播加速，dynamic：动态加速） |
| regionid        | 是   | list   | 区域（CN：中国大陆，OVS：海外）                              |
| protocolid      | 是   | string | 协议（http，https）                                          |
| sslid           | 否   | int    | 证书id，当protocolid为https时为必填项                        |
| origin          | 是   | dict   | 源站设置                                                     |
| originurl       | 是   | string | 回源ip或域名                                                 |
| mastersource    | 是   | string | 主源IP或域名，不为空时表示主备方式(与 originurl 同时存在时，优先主备) |
| slavesource     | 是   | string | 备源IP或域名，不为空时表示主备方式(与 originurl 同时存在时，优先主备) |
| originprotocol  | 是   | string | 回源协议（MATCH，HTTP，HTTPS）                               |
| originrewrite   | 否   | string | 回源重写host                                                 |
| originheader    | 否   | list   | 回源请求头配置                                               |
| originport      | 否   | string | http 回源协议端口，当originprotocol为HTTP时生效              |
| originporthttps | 否   | string | https 回源协议端口，当originprotocol为HTTPS时生效            |
| testurl         | 否   | string | 测试URL地址，用于测试网址的连通性和可用性                    |
| testcodes       | 否   | string | 需要忽略的测试URL响应码，多个用英文逗号隔开                  |
| cacheconfig     | 否   | list   | 缓存规则设置，最多可添加10条配置                             |
| isnevercache    | 是   | int    | 是否缓存（1：缓存 ，0 ：不缓存）                             |
| pathpattern     | 是   | string | 缓存路径，支持正则                                           |
| cachetime       | 是   | string | 缓存时间，单位秒                                             |
| cachecontrol    | 是   | int    | 是否遵循源站 （1：遵循， 0 ：不遵循）                        |
| filepartstore   | 否   | bool   | 是否开启大文件切片，如开启则源必须支持range回源              |

**请求示例：**

```python
def create_cdn():
    """
    创建加速域名
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/distribution"
    action = "CreateCdn"
    method = "POST"
    param = {}
    body = {
        "domainname": "openapitest.cdscdntest.com",
        "typeid": "web",
        "regionid": [
            "CN"
        ],
        "protocolid": "http",
        "origin": {
            "originurl": "1.1.1.1",
            "mastersource": "",
            "slavesource": "",
            "originprotocol": "HTTP",
            "originrewrite": "baidu.com",
            "originheader": [
                {
                    "key": "ss",
                    "value": "ss"
                }
            ],
            "originport": "80"
        },
        "cacheconfig": [
            {
                "isnevercache": 1,
                "pathpattern": "/.*\.(html|htm|js|css|txt|shtml|xml)",
                "cachetime": "3600",
                "cachecontrol": 0
            }
        ],
        "filepartstore": False
    }
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    result = json.dumps(result)  # json格式化
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": {
        "formid": 23829,
        "speedid": 3174
    }
}
```

**返回参数说明：**

| 参数名  | 类型   | 说明       |
| :------ | :----- | ---------- |
| code    | int    | 状态码     |
| msg     | string | 信息描述   |
| data    | dict   | 数据信息   |
| formid  | int    | 任务 id    |
| speedid | int    | 加速域名id |

### DescribeCdn

**Action：** DescribeCdn

**描述：** 获取加速域名列表

**请求地址：** api.capitalonline.net/cdnapi/distribution

**请求方法：** GET

**请求参数：**

| 参数名    | 必选 | 类型   | 说明               |
| :-------- | :--- | :----- | ------------------ |
| pageindex | 否   | string | 页索引             |
| pagesize  | 否   | string | 每页显示最大记录数 |
| keyword   | 否   | string | 加速域名           |

**请求示例：**

```python
def get_cdn_list():
    """
    获取加速域名列表
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/distribution"
    action = "DescribeCdn"
    method = "GET"
    param = {
        "pageindex": "1",
        "pagesize": "10",
        "keyword": "openapitest.cdscdntest.com"
    }
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    result = json.dumps(result)  # json格式化
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": {
        "rows": [
            {
                "id": 3174,
                "domainname": "openapitest.cdscdntest.com",
                "statusid": "01",
                "statusname": "启用",
                "typeid": "web",
                "typename": "网页加速",
                "confstatusid": "01",
                "confstatusname": "正在配置",
                "confstatusmsg": "",
                "createtime": "2021-09-26T00:07:57.000Z",
                "updatetime": "2021-09-26T00:08:17.000Z",
                "bizstatusid": "01",
                "bizstatusname": "正常",
                "userid": "13900000800",
                "username": "",
                "customerid": "E020514",
                "moduleid": "CDN",
                "modulename": "CDN",
                "modulecode": "125ee8ab74db11e68a93005056a4567b",
                "protocolid": "http",
                "protocolname": "HTTP",
                "regionname": "中国大陆:883760832745e0a806970c2bcbe2b898.cdscdntest.com"
            }
        ],
        "totalcount": 1,
        "pagesize": "10",
        "pageindex": 0
    }
}
```

**返回参数说明：**

| 参数名         | 类型   | 说明               |
| :------------- | :----- | ------------------ |
| code           | int    | 状态码             |
| msg            | string | 信息描述           |
| data           | dict   | 数据信息           |
| rows           | list   | 加速域名列表       |
| id             | int    | 加速域名id         |
| domainname     | string | 加速域名           |
| statusid       | string | 启用禁用状态id     |
| statusname     | string | 启用禁用状态名称   |
| typeid         | string | 加速类型id         |
| typename       | string | 加速类型名称       |
| confstatusid   | string | 配置状态id         |
| confstatusname | string | 配置状态名称       |
| confstatusmsg  | string | 配置状态消息       |
| createtime     | string | 创建时间           |
| updatetime     | string | 更新时间           |
| bizstatusid    | string | 业务状态id         |
| bizstatusname  | string | 业务状态名称       |
| userid         | string | 用户id             |
| username       | string | 用户名称           |
| customerid     | string | 客户id             |
| moduleid       | string | 模块id             |
| modulename     | string | 模块名称           |
| modulecode     | string | 模块编码           |
| protocolid     | string | 协议id             |
| protocolname   | string | 协议名称           |
| regionname     | string | 区域：CNAME        |
| totalcount     | int    | 加速域名总条数     |
| pagesize       | string | 每页显示最大记录数 |
| pageindex      | int    | 页索引             |

### DescribeCdnInfo

**Action：** DescribeCdnInfo

**描述：** 获取加速域名的详细信息

**请求地址：**api.capitalonline.net/cdnapi/distribution/:domainname

**请求方法：** GET

**请求参数：**

无

**请求示例：**

```python
def get_cdn_info(domain_name):
    """
    获取加速域名的详细信息
    :param domain_name: 加速域名
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/distribution/" + domain_name
    action = "DescribeCdnInfo"
    method = "GET"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    result = json.dumps(result)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": {
        "id": 82431,
        "moduleid": "CDN",
        "domainname": "openapitest.cdscdntest.com",
        "fullcname": "中国大陆:e31c3f808ebb311766ba4a9e981fbfbc.cdscdscdn.com",
        "statusid": "01",
        "protocolid": "http",
        "typeid": "web",
        "sslid": 0,
        "confstatusid": "02",
        "confstatusmsg": "",
        "bizstatusid": "01",
        "bizstatusmsg": "",
        "testurl": "",
        "ifdel": 0,
        "createtime": "2021-09-28T03:34:13.000Z",
        "updatetime": "2021-09-28T03:40:01.000Z",
        "testcodes": "",
        "filepartstore": 0,
        "remark": "",
        "regionid": [
            "CN"
        ],
        "origin": {
            "originprotocol": "HTTP",
            "originrewrite": "baidu.com",
            "originheader": "[{\"key\":\"ss\",\"value\":\"ss\"}]",
            "originport": "80",
            "originporthttps": "",
            "mastersource": "",
            "slaversource": "",
            "originurl": "1.1.1.1"
        },
        "cacheconfig": [
            {
                "id": 137547,
                "pathpattern": "/.*\\.(html|htm|js|css|txt|shtml|xml)",
                "isnevercache": 1,
                "cachecontrol": 0,
                "cachetime": 3600
            }
        ],
        "ipacl": [
            {
                "ipperiodtypeid": "Allow",
                "iplist": "1.1.1.1",
                "period": []
            }
        ],
        "useragent": [
            {
                "id": 8352,
                "pathpattern": "/.*",
                "useragent": "IE",
                "retstatus": "deny",
                "jumplocation": ""
            }
        ],
        "querystringsettings": [
            {
                "id": 37764,
                "pathpattern": "/.*",
                "isignorequerystring": 1
            }
        ],
        "resheader": [
            {
                "id": 8496,
                "key": "header1",
                "value": "value1"
            }
        ],
        "refereracl": [
            {
                "id": 5562,
                "isopen": 1,
                "isallownullreferer": 1,
                "whitelist": "1.1.1.1",
                "blacklist": "",
                "pathpattern": "/.*"
            }
        ]
    }
}
```

**返回参数说明：**

| 参数名              | 类型   | 说明                                                         |
| :------------------ | :----- | ------------------------------------------------------------ |
| code                | int    | 状态码                                                       |
| msg                 | string | 信息描述                                                     |
| data                | dict   | 数据信息                                                     |
| id                  | int    | 加速域名id                                                   |
| moduleid            | string | 模块id                                                       |
| domainname          | string | 加速域名                                                     |
| fullcname           | string | 区域：CNAME                                                  |
| statusid            | string | 启用禁用状态id（01：启用， 02：禁用）                        |
| protocolid          | string | 协议id                                                       |
| typeid              | string | 加速类型id（web：网页加速，download：下载加速，video：点播加速，dynamic：动态加速） |
| sslid               | int    | 证书id                                                       |
| confstatusid        | string | 配置状态id（01：配置中，02：已生效，03：配置失败）           |
| confstatusmsg       | string | 配置状态消息                                                 |
| bizstatusid         | string | 业务状态id（01：正常，02：删除中，04：删除失败，05：余额不足） |
| bizstatusmsg        | string | 业务状态消息                                                 |
| testurl             | string | 测试URL                                                      |
| ifdel               | int    | 域名是否删除（0：否，1：是）                                 |
| createtime          | string | 创建时间                                                     |
| updatetime          | string | 更新时间                                                     |
| testcodes           | string | 忽略响应码                                                   |
| filepartstore       | int    | 是否开启大文件切片（0：否，1：是）                           |
| remark              | string | 备注信息                                                     |
| regionid            | list   | 区域（CN：中国大陆，OVS：海外）                              |
| origin              | dict   | 源站配置信息                                                 |
| originprotocol      | string | 回源协议                                                     |
| originrewrite       | string | 回源重写host                                                 |
| originheader        | string | 回源请求头配置                                               |
| originport          | string | http回源协议端口                                             |
| originporthttps     | string | https回源协议端口                                            |
| mastersource        | string | 主源IP或域名                                                 |
| slaversource        | string | 备源IP或域名                                                 |
| originurl           | string | 回源IP或域名                                                 |
| cacheconfig         | list   | 缓存规则设置                                                 |
| id                  | int    | 缓存规则id                                                   |
| pathpattern         | string | 缓存路径                                                     |
| isnevercache        | int    | 是否缓存（1：缓存 ，0 ：不缓存）                             |
| cachecontrol        | int    | 是否遵循源站 （1：遵循， 0 ：不遵循）                        |
| cachetime           | int    | 缓存时间，单位秒                                             |
| ipacl               | list   | IP访问控制                                                   |
| ipperiodtypeid      | string | Allow：允许，Deny：拒绝                                      |
| iplist              | string | 允许或拒绝访问的ip                                           |
| period              | list   | 允许或拒绝访问的ip段                                         |
| useragent           | list   | UA防盗链配置                                                 |
| id                  | int    | UA防盗链配置id                                               |
| pathpattern         | string | 路径                                                         |
| useragent           | string | User Agent值                                                 |
| retstatus           | string | deny：拒绝，allow：允许                                      |
| jumplocation        | string | 跳转链接                                                     |
| querystringsettings | list   | 去问号配置                                                   |
| id                  | int    | 去问号配置id                                                 |
| pathpattern         | string | 路径                                                         |
| isignorequerystring | int    | 是否开启去问号（1：开启，0：关闭）                           |
| resheader           | list   | 响应头配置                                                   |
| id                  | int    | 响应头配置id                                                 |
| key                 | string | 响应头参数                                                   |
| value               | string | 参数对应的取值                                               |
| refereracl          | list   | Referer防盗链配置                                            |
| id                  | int    | Referer防盗链配置id                                          |
| isopen              | int    | 是否开启（1：是）                                            |
| isallownullreferer  | int    | 是否允许空Referer字段访问CDN资源（1：允许， 0 ：不允许）     |
| whitelist           | string | 白名单                                                       |
| blacklist           | string | 黑名单                                                       |
| pathpattern         | string | 路径                                                         |

### ModifyCdn

**Action：** ModifyCdn

**描述：** 修改加速域名

**请求地址：**api.capitalonline.net/cdnapi/distribution/:domainname

**请求方法：** PUT

**请求参数：**

| 参数名              | 必选 | 类型   | 说明                                                         |
| :------------------ | :--- | ------ | ------------------------------------------------------------ |
| domainname          | 是   | string | 加速域名                                                     |
| typeid              | 是   | string | 加速类型（web：网页加速，download：下载加速，video：点播加速，dynamic：动态加速） |
| regionid            | 是   | list   | 区域（CN：中国大陆，OVS：海外）                              |
| protocolid          | 是   | string | 协议（http，https）                                          |
| sslid               | 否   | int    | 证书id，当protocolid为https时为必填项                        |
| origin              | 是   | dict   | 源站设置                                                     |
| originurl           | 是   | string | 回源ip或域名                                                 |
| mastersource        | 是   | string | 主源IP或域名，不为空时表示主备方式(与 originurl 同时存在时，优先主备) |
| slavesource         | 是   | string | 备源IP或域名，不为空时表示主备方式(与 originurl 同时存在时，优先主备) |
| originprotocol      | 是   | string | 回源协议（MATCH，HTTP，HTTPS）                               |
| originrewrite       | 否   | string | 回源重写host                                                 |
| originheader        | 否   | list   | 回源请求头配置                                               |
| originport          | 否   | string | http 回源协议端口，当originprotocol为HTTP时生效              |
| originporthttps     | 否   | string | https 回源协议端口，当originprotocol为HTTPS时生效            |
| testurl             | 否   | string | 测试URL地址，用于测试网址的连通性和可用性                    |
| testcodes           | 否   | string | 需要忽略的测试URL响应码，多个用英文逗号隔开                  |
| cacheconfig         | 否   | list   | 缓存规则设置，最多可添加10条配置                             |
| isnevercache        | 是   | int    | 是否缓存（1：缓存 ，0 ：不缓存）                             |
| pathpattern         | 是   | string | 缓存路径，支持正则                                           |
| cachetime           | 是   | string | 缓存时间，单位秒                                             |
| cachecontrol        | 是   | int    | 是否遵循源站 （1：遵循， 0 ：不遵循）                        |
| filepartstore       | 否   | int    | 是否开启大文件切片，如开启则源必须支持range回源（1：是，0：否） |
| querystringsettings | 否   | list   | 去问号配置，只能添加1条配置                                  |
| pathpattern         | 是   | string | 路径，值为“/.*”                                              |
| isignorequerystring | 是   | int    | 是否开启去问号（1：开启，0：关闭）                           |
| resheader           | 否   | list   | 响应头配置，最多可添加10条配置                               |
| key                 | 是   | string | 响应头参数                                                   |
| value               | 是   | string | 参数对应的取值                                               |
| ipacl               | 否   | list   | IP访问控制，只能添加1条配置                                  |
| ipperiodtypeid      | 是   | string | Allow：允许，Deny：拒绝                                      |
| iplist              | 否   | string | 允许或拒绝访问的ip，多个用英文逗号‘,’分隔，iplist和period其中一个必填 |
| period              | 否   | list   | 允许或拒绝访问的ip段，iplist和period其中一个必填             |
| ipstart             | 是   | string | 开始 IP 段                                                   |
| ipend               | 是   | string | 结束 IP 段                                                   |
| refereracl          | 否   | list   | Referer防盗链配置，最多可添加10条配置                        |
| isopen              | 是   | int    | 是否开启，值为1                                              |
| isallownullreferer  | 是   | int    | 是否允许空Referer字段访问CDN资源，多条配置时该字段的值要保持一致（1：允许， 0 ：不允许） |
| pathpattern         | 是   | string | 路径，值为“/.*”                                              |
| whitelist           | 否   | string | 白名单，whitelist和blacklist其中一个必填                     |
| blacklist           | 否   | string | 黑名单，whitelist和blacklist其中一个必填                     |
| useragent           | 否   | list   | UA防盗链配置，最多可添加10条配置                             |
| pathpattern         | 是   | string | 路径，值为“/.*”                                              |
| useragent           | 是   | string | User Agent值                                                 |
| retstatus           | 是   | string | deny：拒绝，allow：允许                                      |
| jumplocation        | 是   | string | 跳转链接，当retstatus为allow时不能为空                       |

**请求示例：**

```python
def modify_cdn(domain_name):
    """
    修改加速域名
    :param domain_name: 加速域名
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/distribution/" + domain_name
    action = "ModifyCdn"
    method = "PUT"
    param = {}
    body = {
        "domainname": "openapitest.cdscdntest.com",
        "typeid": "web",
        "regionid": [
            "CN"
        ],
        "protocolid": "http",
        "origin": {
            "originurl": "1.1.1.1",
            "mastersource": "",
            "slaversource": "",
            "originprotocol": "HTTP",
            "originrewrite": "baidu.com",
            "originheader": [
                {
                    "key": "ss",
                    "value": "ss"
                },
                {
                    "key": "key",
                    "value": "value"
                }
            ],
            "originport": "80",
            "originporthttps": ""
        },
        "cacheconfig": [
            {
                "pathpattern": "/.*\.(html|htm|js|css|txt|shtml|xml)",
                "isnevercache": 1,
                "cachecontrol": 0,
                "cachetime": 3600
            },
            {
                "pathpattern": "/.*",
                "isnevercache": 1,
                "cachecontrol": 1,
                "cachetime": 100
            }
        ],
        "filepartstore": 1,
        "ipacl": [
            {
                "ipperiodtypeid": "Allow",
                "iplist": "1.1.1.1",
                "period": [
                    {
                        "ipstart": "1.1.1.1",
                        "ipend": "2.2.2.2"
                    }
                ]
            }
        ],
        "useragent": [
            {
                "pathpattern": "/.*",
                "useragent": "IE",
                "retstatus": "deny",
                "jumplocation": ""
            },
            {
                "pathpattern": "/.*",
                "useragent": "Google",
                "retstatus": "allow",
                "jumplocation": "http://www.baidu.com"
            }
        ],
        "querystringsettings": [
            {
                "pathpattern": "/.*",
                "isignorequerystring": 1
            }
        ],
        "resheader": [
            {
                "key": "header1",
                "value": "value1"
            },
            {
                "key": "key",
                "value": "value"
            }
        ],
        "refereracl": [
            {
                "isopen": 1,
                "isallownullreferer": 1,
                "whitelist": "1.1.1.1",
                "blacklist": "",
                "pathpattern": "/.*"
            },
            {
                "isopen": 1,
                "isallownullreferer": 1,
                "whitelist": "2.2.2.2",
                "blacklist": "",
                "pathpattern": "/.*"
            }
        ]
    }
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.put(url, json=body)
    result = json.loads(resp.content)
    result = json.dumps(result)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": {
        "formid": 534564
    }
}
```

**返回参数说明：**

| 参数名 | 类型   | 说明     |
| :----- | :----- | -------- |
| code   | int    | 状态码   |
| msg    | string | 信息描述 |
| data   | dict   | 数据信息 |
| formid | int    | 任务 id  |

### EnableCdn

**Action：** EnableCdn

**描述：** 启用加速域名

**请求地址：**api.capitalonline.net/cdnapi/distribution/:domainname/enable

**请求方法：** PUT

**请求参数：**

无

**请求示例：**

```python
def enable_cdn(domain_name):
    """
    启用加速域名
    :param domain_name: 加速域名
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/distribution/" + domain_name + "/enable"
    action = "EnableCdn"
    method = "PUT"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.put(url)
    result = json.loads(resp.content)
    result = json.dumps(result)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": {
        "formid": 534591
    }
}
```

**返回参数说明：**

| 参数名 | 类型   | 说明     |
| :----- | :----- | -------- |
| code   | int    | 状态码   |
| msg    | string | 信息描述 |
| data   | dict   | 数据信息 |
| formid | int    | 任务 id  |

### DisableCdn

**Action：** DisableCdn

**描述：** 禁用加速域名

**请求地址：** api.capitalonline.net/cdnapi/distribution/:domainname/disable

**请求方法：** PUT

**请求参数：**

无

**请求示例：**

```python
def disable_cdn(domain_name):
    """
    禁用加速域名
    :param domain_name: 加速域名
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/distribution/" + domain_name + "/disable"
    action = "DisableCdn"
    method = "PUT"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.put(url)
    result = json.loads(resp.content)
    result = json.dumps(result)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": {
        "formid": 534600
    }
}
```

**返回参数说明：**

| 参数名 | 类型   | 说明     |
| :----- | :----- | -------- |
| code   | int    | 状态码   |
| msg    | string | 信息描述 |
| data   | dict   | 数据信息 |
| formid | int    | 任务 id  |

### DeleteCdn

**Action：** DeleteCdn

**描述：** 删除加速域名

**请求地址：**api.capitalonline.net/cdnapi/distribution/:domainname

**请求方法：** DELETE

**请求参数：**

无

**请求示例：**

```python
def delete_cdn(domain_name):
    """
    删除加速域名
    :param domain_name: 加速域名
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/distribution/" + domain_name
    action = "DeleteCdn"
    method = "DELETE"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.delete(url)
    result = json.loads(resp.content)
    result = json.dumps(result)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": {
        "formid": 534645
    }
}
```

**返回参数说明：**

| 参数名 | 类型   | 说明     |
| :----- | :----- | -------- |
| code   | int    | 状态码   |
| msg    | string | 信息描述 |
| data   | dict   | 数据信息 |
| formid | int    | 任务 id  |

### ModifyProtocol

**Action：** ModifyProtocol

**描述：** 修改加速域名的协议为https协议

**请求地址：**api.capitalonline.net/cdnapi/distribution/https/:domainname/:sslid

**请求方法：** PUT

**请求参数：**

无

**请求示例：**

```python
def modify_protocol(domain_name, ssl_id):
    """
    修改加速域名的协议为https协议
    :param domain_name: 加速域名
    :param ssl_id: 证书id
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/distribution/https/" + domain_name + "/" + ssl_id
    action = "ModifyProtocol"
    method = "PUT"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.put(url)
    result = json.loads(resp.content)
    result = json.dumps(result)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": {
        "formid": 534636
    }
}
```

**返回参数说明：**

| 参数名 | 类型   | 说明     |
| :----- | :----- | -------- |
| code   | int    | 状态码   |
| msg    | string | 信息描述 |
| data   | dict   | 数据信息 |
| formid | int    | 任务 id  |

## 证书管理

### CreateSsl

**Action：** CreateSsl

**描述：** 创建证书

**请求地址：** api.capitalonline.net/cdnapi/ssl

**请求方法：** POST

**请求参数：**

| 参数名     | 必选 | 类型   | 说明     |
| :--------- | :--- | :----- | -------- |
| name       | 是   | string | 证书名称 |
| publickey  | 是   | string | 公钥     |
| privatekey | 是   | string | 私钥     |

**请求示例：**

```python
def create_ssl():
    """
    创建证书
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/ssl"
    action = "CreateSsl"
    method = "POST"
    param = {}
    body = {
        "name": "create-test",
        "publickey": "*******",
        "privatekey": "*******"
    }
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    result = json.dumps(result)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": {
        "id": 11142
    }
}
```

**返回参数说明：**

| 参数名 | 类型   | 说明     |
| :----- | :----- | -------- |
| code   | int    | 状态码   |
| msg    | string | 信息描述 |
| data   | dict   | 数据信息 |
| id     | int    | 证书id   |

### ModifySsl

**Action：** ModifySsl

**描述：** 修改证书

**请求地址：**api.capitalonline.net/cdnapi/ssl/:id

**请求方法：** PUT

**请求参数：**

| 参数名     | 必选 | 类型   | 说明     |
| :--------- | :--- | :----- | -------- |
| name       | 是   | string | 证书名称 |
| publickey  | 是   | string | 公钥     |
| privatekey | 是   | string | 私钥     |

**请求示例：**

```python
def modify_ssl(ssl_id):
    """
    修改证书
    :param ssl_id: 证书id
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/ssl/" + ssl_id
    action = "ModifySsl"
    method = "PUT"
    param = {}
    body = {
        "name": "create-test",
        "publickey": "*******",
        "privatekey": "*******"
    }
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.put(url, json=body)
    result = json.loads(resp.content)
    result = json.dumps(result)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": {}
}
```

**返回参数说明：**

| 参数名 | 类型   | 说明     |
| :----- | :----- | -------- |
| code   | int    | 状态码   |
| msg    | string | 信息描述 |
| data   | dict   | 数据信息 |

### DescribeSsl

**Action：** DescribeSsl

**描述：** 获取证书列表

**请求地址：**api.capitalonline.net/cdnapi/ssl

**请求方法：** GET

**请求参数：**

| 参数名    | 必选 | 类型   | 说明               |
| :-------- | :--- | :----- | ------------------ |
| pageindex | 否   | string | 页索引             |
| pagesize  | 否   | string | 每页显示最大记录数 |

**请求示例：**

```python
def get_ssl_list():
    """
    获取证书列表
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/ssl"
    action = "DescribeSsl"
    method = "GET"
    param = {
        "pageindex": "1",
        "pagesize": "10"
    }
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    result = json.dumps(result)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": {
        "rows": [
            {
                "id": 11142,
                "name": "create-test",
                "moduleid": "CDN",
                "modulename": "CDN",
                "createtime": "2021-09-28T10:36:53.000Z",
                "updatetime": "2021-09-28T10:49:04.000Z",
                "authname": "cmyalidt.cdscdntest.com",
                "bindname": "",
                "billstatus": 0,
                "endtime": "2022-08-06T06:33:34.000Z",
                "ifdel": 0,
                "customerid": "E020514",
                "userid": "13900000800",
                "username": "",
                "statusid": "01",
                "statusname": "未使用"
            }
        ],
        "totalcount": 1,
        "pagesize": "10"
    }
}
```

**返回参数说明：**

| 参数名     | 类型   | 说明                             |
| ---------- | :----- | -------------------------------- |
| code       | int    | 状态码                           |
| msg        | string | 信息描述                         |
| data       | dict   | 数据信息                         |
| rows       | list   | 证书列表                         |
| id         | int    | 证书id                           |
| name       | string | 证书名称                         |
| moduleid   | string | 模块id                           |
| modulename | string | 模块名称                         |
| createtime | string | 创建时间                         |
| updatetime | string | 更新时间                         |
| authname   | string | 证书授权的域名                   |
| bindname   | string | 已经绑定的域名                   |
| billstatus | int    | 是否计费（0：未计费，1：已计费） |
| endtime    | string | 证书到期时间                     |
| ifdel      | int    | 证书是否删除（0：否，1：是）     |
| customerid | string | 客户id                           |
| userid     | string | 用户id                           |
| username   | string | 用户名称                         |
| statusid   | string | 证书状态id                       |
| statusname | string | 证书状态名称                     |
| totalcount | int    | 证书总条数                       |
| pagesize   | string | 每页显示最大记录数               |

### DescribeSslInfo

**Action：** DescribeSslInfo

**描述：** 获取证书的详细信息

**请求地址：**api.capitalonline.net/cdnapi/ssl/:id 

**请求方法：** GET

**请求参数：**

无

**请求示例：**

```python
def get_ssl_info(ssl_id):
    """
    获取证书的详细信息
    :param ssl_id: 证书id
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/ssl/" + ssl_id
    action = "DescribeSslInfo"
    method = "GET"
    param = {}
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    result = json.dumps(result)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": {
        "rows": {
            "id": 11142,
            "moduleid": "CDN",
            "name": "create-test",
            "publickey": "*******",
            "privatekey": "*******",
            "statusid": "01",
            "statusname": "未使用",
            "createtime": "2021-09-28T10:36:53.000Z",
            "updatetime": "2021-09-28T10:49:04.000Z",
            "authname": "cmyalidt.cdscdntest.com",
            "bindname": "",
            "billstatus": 0,
            "endtime": "2022-08-06T06:33:34.000Z",
            "ifdel": 0,
            "customerid": "E020514",
            "userid": "13900000800",
            "username": ""
        }
    }
}
```

**返回参数说明：**

| 参数名     | 类型   | 说明                             |
| ---------- | :----- | -------------------------------- |
| code       | int    | 状态码                           |
| msg        | string | 信息描述                         |
| data       | dict   | 数据信息                         |
| rows       | dict   | 证书信息                         |
| id         | int    | 证书id                           |
| moduleid   | string | 模块id                           |
| name       | string | 证书名称                         |
| publickey  | string | 公钥                             |
| privatekey | string | 私钥                             |
| statusid   | string | 证书状态id                       |
| statusname | string | 证书状态名称                     |
| createtime | string | 创建时间                         |
| updatetime | string | 更新时间                         |
| authname   | string | 证书授权的域名                   |
| bindname   | string | 已经绑定的域名                   |
| billstatus | int    | 是否计费（0：未计费，1：已计费） |
| endtime    | string | 证书到期时间                     |
| ifdel      | int    | 证书是否删除（0：否，1：是）     |
| customerid | string | 客户id                           |
| userid     | string | 用户id                           |
| username   | string | 用户名称                         |

## 刷新预取

### PrefetchFile

预取是主动获取源站新文件至二级缓存服务器，适用于文件发布、更新，降低文件链接放出时可能对源站产生的大量请求和带宽压力。

注意：预取文件的时候将有回源操作，会占用源站带宽。

**Action：** PrefetchFile

**描述：** 预取文件

**请求地址：**api.capitalonline.net/cdnapi/distribution/v4/prefetch

**请求方法：** POST

**请求参数：**

| 参数名 | 必选 | 类型   | 说明                         |
| :----- | :--- | :----- | ---------------------------- |
| url    | 是   | string | 预取文件url ，多条以’\n’分隔 |

**填写说明：**

1、请输入完整路径，如 http://www.test.com/images/logo.jpg；支持正则表达式，如 http://www.test.com/images/*.jpg。

2、请注意区分 url 中的字母的大小写，错误的大小写会导致预取无效。

3、一次最多提交 99 条 url，以’\n’分隔。

4、文件大的时候，预取有可能占用大量带宽，建议在不影响业务的时候进行预取。

**请求示例：**

```python
def prefetch_file():
    """
    预取文件
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/distribution/v4/prefetch"
    action = "PrefetchFile"
    method = "POST"
    param = {}
    body = {
        "url": "http://www.test.com/images/a.txt\nhttp://www.test.com/images/test.png"
    }
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": true
}
```

**返回参数说明：**

| 参数名 | 类型   | 说明     |
| :----- | :----- | -------- |
| code   | int    | 状态码   |
| msg    | string | 信息描述 |
| data   | bool   | 数据信息 |

### PrefetchStatus

预取进度状态查询

**Action：** PrefetchStatus

**描述：** 预取进度状态查询

**请求地址：**api.capitalonline.net/cdnapi/distribution/v4/prefetch/status

**请求方法：** GET

**请求参数：**

| 参数名 | 必选 | 类型   | 说明                     |
| :----- | :--- | :----- | ------------------------ |
| id    | 是   | int | 文件预取唯一id |

**填写说明：**

1、可调用PrefetchList方法查询id

**请求示例：**

```python
 def prefetch_status(self, id):
        """
        预取文件
        """
        # cdn_url = "http://cdsapi-gateway.gic.pre/cdnapi/distribution/v4/prefetch/status"
        cdn_url = "http://api.capitalonline.net/cdnapi/distribution/v4/prefetch/status"
        action = "PrefetchStatus"
        method = "GET"
        param = {
            "id": id,
        }
        url = get_signature(action, self.ak, self.sk, method, cdn_url, param)
        resp = requests.get(url)
        result = json.loads(resp.content)
        # result = json.dumps(result)
        print(result)
```

**返回示例：**

```json
{
	"code": 200,
	"msg": "成功",
	"data": {
		"id": "3230460",
		"status_id": "complete",
		"process": 100,
		"description": "",
		"createtime": "2022-08-03T06:47:47.000Z",
		"status_name": "完成"
	}
}
```

**返回参数说明：**

| 参数名 | 类型   | 说明     |
| :----- | ------ | -------- |
| code   | int    | 状态码   |
| msg    | string | 信息描述 |
| data   | json   | 文件预取状态信息 |
| id   | int    | 文件预取唯一id   |
| status_id   | string    | 预取进度状态id，取值范围（complete 完成，refreshing 预取中，failed 错误，pending 待预取）   |
| status_name   | string    | 预取进度状态名称   |
| process   | flow    | 文件预取进度百分比   |
| description   | string    | 描述   |
| createtime   | datetime    | 创建时间   |  




### PrefetchList

分页查询文件预取列表

**Action：** PrefetchList

**描述：** 分页查询提交的文件预取列表

**请求地址：**api.capitalonline.net/cdnapi/distribution/v4/prefetch/list

**请求方法：** GET

**请求参数：**

| 参数名 | 必选 | 类型   | 说明                     |
| :----- | :--- | :----- | ------------------------ |
| pageindex    | 是   | int | 页索引，默认1 |
| pagesize    | 是   | int | 最多显示记录数，默认2o |
| project_id    | 否   | string | 项目id，用于分项目显示文件预取结果，默认不区分 |
| url    | 否   | string | 模糊搜索搜索文件预取url |

**填写说明：**

1，按示例传参即可

**请求示例：**

```python
    def prefetch_list(self):
        """
        预取文件 list
        """
        #cdn_url = "http://cdsapi-gateway.gic.pre/cdnapi/distribution/v4/prefetch/list"
        cdn_url = "http://api.capitalonline.net/cdnapi/distribution/v4/prefetch/list"
        action = "PrefetchList"
        method = "GET"
        param = {
            "pageindex": "1",
            "pagesize": "20",
            # "keyword": "create-domain-test123.cdscdntest.com"
            #"project_id":"15233f9a-6104-11eb-a07a-3e582f550d79"
        }
        url = get_signature(action, self.ak, self.sk, method, cdn_url, param)
        resp = requests.get(url)
        result = json.loads(resp.content)
        # result = json.dumps(result)
        print(result)
```

**返回示例：**

```json
{
	"code": 200,
	"msg": "成功",
	"data": {
		"rows": [{
			"id": 626742,
			"accountid": 44712,
			"url": "http://group2.cdscdntest.com/iso/CentOS-8.1.1911-x86_64-dvd1.iso",
			"speedid": 73521,
			"domainname": "group2.cdscdntest.com",
			"createtime": "2021-02-02T09:31:14.000Z",
			"updatetime": "2021-02-02T09:31:14.000Z",
			"customerid": "E890856",
			"userid": "cmyyuanzi@163.com",
			"username": "cmy",
			"statusid": "02",
			"statusname": "已完成",
			"remark": ""
		}],
		"totalcount": 1,
		"pagesize": "20"
	}
}
```

**返回参数说明：**

| 参数名 | 类型   | 说明     |
| :----- | ------ | -------- |
| code   | int    | 状态码   |
| msg    | string | 信息描述 |
| data   | json   | 数据信息 |  
| rows   | array   | 数组 |                 
| id   | int    | 文件预取唯一id   |
| accountid   | int    | 用户id   |
| url   | string    | 文件预取url   |
| speedid   | int    | 加速域名主键   |
| domainname   | string    | 加速域名   |      
| createtime   | datetime    | 创建时间   |     
| updatetime   | datetime    | 修改时间   |     
| customerid   | string    | 客户ID   |     
| userid   | int    | 用户ID   |     
| username   | string    | 用户名称   |     
| statusid   | string    | 文件预取状态id   |     
| statusname   | string    | 文件预取状态名称   |    
| totalcount   | int    | 总记录数   |  
| pagesize   | int    |   每页最多显示记录数 | 



### ContentRefresh

内容刷新功能可从各加速节点上清除指定的目录或者文件缓存，使得用户请求重新回源获取，当您希望用户及时看到最新版本的文件可以采用此手动缓存刷新方式。

**Action：** ContentRefresh

**描述：** 内容刷新

**请求地址：**api.capitalonline.net/cdnapi/distribution/v4/cache

**请求方法：** POST

**请求参数：**

| 参数名 | 必选 | 类型   | 说明                     |
| :----- | :--- | :----- | ------------------------ |
| url    | 是   | string | 刷新url ，多条以’\n’分隔 |

**填写说明：**

1、当前目录为根目录（/），如要刷新目录，请以正斜杠 / 结尾，如 http://www.test.com/images/ ；如要刷新文件，请输入完整路径，如 http://www.test.com/images/logo.jpg；支持正则表达式，如 http://www.test.com/images/*.jpg。

2、请注意区分 url 中的字母的大小写，错误的大小写会导致刷新无效。

3、刷新目录时如果目录有上下级层次关系，本功能会自动同时推送下级子目录，不需要填写下级子目录。

4、一次最多提交 99 条 url，以’\n’分隔。

**请求示例：**

```python
def content_refresh():
    """
    内容刷新
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/distribution/v4/cache"
    action = "ContentRefresh"
    method = "POST"
    param = {}
    body = {
        "url": "http://www.test.com/images/\nhttp://www.test.com/images/test.png"
    }
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": true
}
```

**返回参数说明：**

| 参数名 | 类型   | 说明     |
| :----- | ------ | -------- |
| code   | int    | 状态码   |
| msg    | string | 信息描述 |
| data   | bool   | 数据信息 |


### CacheStatus

缓存刷新进度查询

**Action：** CacheStatus

**描述：** 缓存刷新进度查询

**请求地址：**api.capitalonline.net/cdnapi/distribution/v4/cache/status

**请求方法：** GET

**请求参数：**

| 参数名 | 必选 | 类型   | 说明                     |
| :----- | :--- | :----- | ------------------------ |
| id    | 是   | int | 缓存刷新唯一id |

**填写说明：**

1、可调用CacheList方法查询id

**请求示例：**

```python
def cache_status(self, id):
    """
    缓存刷新状态查询
    """
    # cdn_url = "http://cdsapi-gateway.gic.pre/cdnapi/distribution/v4/cache/status"
    cdn_url = "http://api.capitalonline.net/cdnapi/distribution/v4/cache/status"
    action = "CacheStatus"
    method = "GET"
    param = {
        "id": id,
    }
    url = get_signature(action, self.ak, self.sk, method, cdn_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    # result = json.dumps(result)
    print(result)
```

**返回示例：**

```json
{
	"code": 200,
	"msg": "成功",
	"data": {
		"id": "5987556",
		"status_id": "complete",
		"process": 100,
		"description": "",
		"createtime": "2022-08-03T06:47:31.000Z",
		"status_name": "完成"
	}
}
```

**返回参数说明：**

| 参数名 | 类型   | 说明     |
| :----- | ------ | -------- |
| code   | int    | 状态码   |
| msg    | string | 信息描述 |
| data   | json   | 缓存刷新状态信息 |
| id   | int    | 缓存刷新唯一id   |
| status_id   | string    | 缓存刷新进度状态id，取值范围（complete 完成，refreshing 刷新中，failed 错误，pending 待刷新）   |
| process   | flow    | 进度百分比   |
| status_name   | string    | 缓存刷新进度状态名称   |
| description   | string    | 描述   |
| createtime   | datetime    | 创建时间   |  




### CacheList

分页查询缓存刷新列表

**Action：** CacheList

**描述：** 分页查询缓存刷新列表

**请求地址：**api.capitalonline.net/cdnapi/distribution/v4/cache/list

**请求方法：** GET

**请求参数：**

| 参数名 | 必选 | 类型   | 说明                     |
| :----- | :--- | :----- | ------------------------ |
| pageindex    | 是   | int | 页索引，默认1 |
| pagesize    | 是   | int | 每页最多显示记录数，默认2o |
| project_id    | 否   | string | 项目id，用于分项目显示缓存刷新结果，默认不区分 |
| url    | 否   | int | 模糊搜索缓存刷新url |

**填写说明：**

1，按示例传参即可

**请求示例：**

```python
    def cache_list(self):
        """
        缓存刷新 list
        """
        # cdn_url = "http://cdsapi-gateway.gic.pre/cdnapi/distribution/v4/cache/list"
        cdn_url = "http://api.capitalonline.net/cdnapi/distribution/v4/cache/list"
        action = "CacheList"
        method = "GET"
        param = {
            "pageindex": "1",
            "pagesize": "10",
            # "keyword": "create-domain-test123.cdscdntest.com"
        }
        url = get_signature(action, self.ak, self.sk, method, cdn_url, param)
        resp = requests.get(url)
        result = json.loads(resp.content)
        # result = json.dumps(result)
        print(result)
```

**返回示例：**

```json
{
	"code": 200,
	"msg": "成功",
	"data": {
		"rows": [{
			"id": 5987556,
			"accountid": 44712,
			"speedid": 85787,
			"domainname": "cmygic2test.cdscdntest.com",
			"url": "http://cmygic2test.cdscdntest.com/boom20m55s.mp4",
			"createtime": "2022-08-03T06:47:31.000Z",
			"updatetime": "2022-08-03T06:47:31.000Z",
			"customerid": "E890856",
			"userid": "cmyyuanzi@163.com",
			"username": "cmy",
			"statusid": "02",
			"statusname": "已完成",
			"remark": ""
		}],
		"totalcount": 262,
		"pagesize": "10"
	}
}
```

**返回参数说明：**

| 参数名 | 类型   | 说明     |
| :----- | ------ | -------- |
| code   | int    | 状态码   |
| msg    | string | 信息描述 |
| data   | json   | 数据信息 |  
| rows   | array   | 数组 |                 
| id   | int    | 缓存刷新唯一id   |
| accountid   | int    | 用户id   |
| url   | string    | 缓存刷新url   |
| speedid   | int    | 加速域名主键   |
| domainname   | string    | 加速域名   |      
| createtime   | datetime    | 创建时间   |     
| updatetime   | datetime    | 修改时间   |     
| customerid   | string    | 客户ID   |     
| userid   | int    | 用户ID   |     
| username   | string    | 用户名称   |     
| statusid   | string    | 刷新状态id   |     
| statusname   | string    | 刷新状态名称   |     
| totalcount   | int    | 总记录数   |  
| pagesize   | int    |   每页最多显示记录数 |  


## 用量统计

### FlowStatistics

**Action：** FlowStatistics

**描述：** 获取指定域名在指定时间段内的用量信息

**请求地址：**api.capitalonline.net/cdnapi/distribution/flow

**请求方法：** POST

**请求参数：**

| 参数名      | 必选 | 类型   | 说明                                  |
| :---------- | :--- | :----- | ------------------------------------- |
| domainname  | 是   | list   | 域名列表                              |
| begindate   | 是   | string | 开始日期                              |
| enddate     | 是   | string | 结束日期                              |
| spacingtype | 是   | string | 时间周期（01：5分钟，03：天，04：月） |
| peaktypeid  | 是   | string | 类型（01：流量，02：带宽）            |

**请求示例：**

```python
def flow_statistics():
    """
    获取指定域名在指定时间段内的用量信息
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/distribution/flow"
    action = "FlowStatistics"
    method = "POST"
    param = {}
    body = {
        "domainname": ["openapitest.cdscdntest.com", "test.cdscdntest.com"],
        "begindate": "2021-09-29",
        "enddate": "2021-09-30",
        "spacingtype": "01",
        "peaktypeid": "01"
    }
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": [
        {
            "counttime": "2021-09-29 10:40:00",
            "regionid": "OVS",
            "typeid": "web",
            "protocolid": "http",
            "value": 0.00001
        },
        {
            "counttime": "2021-09-29 10:40:00",
            "regionid": "CN",
            "typeid": "web",
            "protocolid": "http",
            "value": 0.000001
        },
        {
            "counttime": "2021-09-29 10:45:00",
            "regionid": "OVS",
            "typeid": "web",
            "protocolid": "http",
            "value": 0.00008
        }
    ]
}
```

**返回参数说明：**

| 参数名     | 类型   | 说明                                                         |
| ---------- | :----- | ------------------------------------------------------------ |
| code       | int    | 状态码                                                       |
| msg        | string | 信息描述                                                     |
| data       | list   | 数据信息                                                     |
| counttime  | string | 时间                                                         |
| regionid   | string | 区域（CN：中国大陆，OVS：海外）                              |
| typeid     | string | 加速类型（web：网页加速，download：下载加速，video：点播加速） |
| protocolid | string | 协议（http，https）                                          |
| value      | float  | 数据，peaktypeid为01时，value为流量，单位是GB；peaktypeid为02时，value为带宽，单位是Mb |

### DosageAnalysis

**Action：** DosageAnalysis

**描述：** 获取指定域名今天、昨天、本月以及上个月的流量（单位：GB）和带宽（单位：Mb）

**请求地址：**api.capitalonline.net/cdnapi/distribution/usageinfo

**请求方法：** POST

**请求参数：**

| 参数名  | 必选 | 类型 | 说明     |
| :------ | :--- | :--- | -------- |
| domains | 是   | list | 域名列表 |

**请求示例：**

```python
def dosage_analysis():
    """
    获取指定域名今天、昨天、本月以及上个月的流量和带宽
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/distribution/usageinfo"
    action = "DosageAnalysis"
    method = "POST"
    param = {}
    body = {
        "domains": ["openapitest.cdscdntest.com", "test.cdscdntest.com"]
    }
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": {
        "peak": {
            "type": "top_bandwidth",
            "current_month": 7.292106,
            "last_month": 131.640734,
            "today": 0.00216,
            "yesterday": 6.760003
        },
        "flow": {
            "type": "total_flow",
            "current_month": 0.306807789,
            "last_month": 32.707811785,
            "today": 0.000091001,
            "yesterday": 0.280902674
        }
    }
}
```

**返回参数说明：**

| 参数名        | 类型   | 说明                            |
| ------------- | :----- | ------------------------------- |
| code          | int    | 状态码                          |
| msg           | string | 信息描述                        |
| data          | dict   | 数据信息                        |
| peak          | dict   | 带宽信息                        |
| type          | string | 类型（top_bandwidth：带宽峰值） |
| current_month | float  | 本月带宽峰值，单位是Mb          |
| last_month    | float  | 上月带宽峰值，单位是Mb          |
| today         | float  | 今日带宽峰值，单位是Mb          |
| yesterday     | float  | 昨日带宽峰值，单位是Mb          |
| flow          | dict   | 流量信息                        |
| type          | string | 类型（total_flow：总流量）      |
| current_month | float  | 本月总流量，单位是GB            |
| last_month    | float  | 上月总流量，单位是GB            |
| today         | float  | 今日总流量，单位是GB            |
| yesterday     | float  | 昨日总流量，单位是GB            |

### PathMetering

**Action：** PathMetering

**描述：** 获取指定路径下产生的流量

**请求地址：**api.capitalonline.net/cdnapi/distribution/pathflow

**请求方法：** POST

**请求参数：**

| 参数名     | 必选 | 类型   | 说明                                           |
| :--------- | :--- | :----- | ---------------------------------------------- |
| path       | 是   | string | 路径                                           |
| begindate  | 是   | string | 开始时间                                       |
| enddate    | 是   | string | 结束时间                                       |
| interval   | 是   | string | 时间周期（minute：5分钟，hour：小时，day：天） |
| domainname | 否   | string | 查询的域名，默认该用户下所有的域名             |
| is_convert | 否   | bool   | 是否转换成 GB，默认false                       |

**请求示例：**

```python
def path_metering():
    """
    获取指定路径下产生的流量
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/distribution/pathflow"
    action = "PathMetering"
    method = "POST"
    param = {}
    body = {
        "path": "/test/",
        "begindate": "2021-09-29 00:00:00",
        "enddate": "2021-09-29 23:59:59",
        "interval": "minute"
    }
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.post(url, json=body)
    result = json.loads(resp.content)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": [
        {
            "counttime": "2021-09-29 15:50:00",
            "domainname": "test.cdscdntest.com",
            "flow": 523600
        },
        {
            "counttime": "2021-09-29 15:55:00",
            "domainname": "test.cdscdntest.com",
            "flow": 7502467.5
        }
    ]
}
```

**返回参数说明：**

| 参数名     | 类型   | 说明             |
| ---------- | :----- | ---------------- |
| code       | int    | 状态码           |
| msg        | string | 信息描述         |
| data       | list   | 数据信息         |
| counttime  | string | 流量产生的时间   |
| domainname | string | 加速域名         |
| flow       | float  | 流量，单位是Byte |

**Action：LogsList

**描述：** 获取指定域名下的服务器日志

**请求地址：**api.capitalonline.net/cdnapi/distribution/logs/list

**请求方法：** GET

**请求参数：**

| 参数名     | 必选  | 类型     | 说明        |
| :--------- |:----|:-------|-----------|
| domainname       | 是   | string | 加速域名      |
| pageindex  | 是   | string | 起始页       |
| pagesize    | 是   | string | 每页最多显示记录数 |
| project_id   | 是   | string | 项目id      |
| begindate | 是   | string | 开始时间      |
| enddate | 是   | string | 截止时间      |

**请求示例：**

```python
def logs_list():
    """
    获取指定域名下的服务器日志
    """
    cdn_url = "https://api.capitalonline.net/cdnapi/distribution/logs/list"
    action = "LogsList"
    method = "GET"
    param = {
        "domainname": "cmyprodtest1013.cdscdntest.com",
        "pageindex": "1",
        "pagesize": "20",
        "project_id": "0-0",
        "begindate": "2022-12-05",
        "enddate": "2022-12-05"
        }
    body = {}
    url = get_signature(action, AK, AccessKeySecret, method, cdn_url, param)
    resp = requests.get(url)
    result = json.loads(resp.content)
    print(result)
```

**返回示例：**

```json
{
    "code": 200,
    "msg": "成功",
    "data": {
      "rows":[
        {
            "accountid": 44712,
            "begindate": "2022-12-04T16:00:00.000Z",
            "createtime": "2022-12-04T16:45:26.000Z",
            "domainname": "cmyprodtest1013.cdscdntest.com",
            "enddate": "2022-12-04T16:05:00.000Z",
            "filename": "cmyprodtest1013.cdscdntest.com_20221205_00.00_00.05.gz",
            "frequency": 0,
            "fullurl": "http://cdn.5e29863a6e8e41fca3e1dd4440273a72.oss-cnbj01.cdsgss.com/data/cdnlogs/cmyprodtest1013.cdscdntest.com_20221205_00.00_00.05.gz",
            "id": 637791,
            "ifdel": 0,
            "line": 0,
            "size": 105098,
            "updatetime": "2022-12-04T16:45:26.000Z",
        }
      ],
      "pagesize": 20,
      "totalcount": 1
    }
     
}
```

**返回参数说明：**

| 参数名        | 类型     | 说明              |
|------------|:-------|-----------------|
| code       | int    | 状态码             |
| msg        | string | 信息描述            |
| data       | dict   | 数据信息            |
| rows       | list   | 数据信息            |
| pagesize   | string | 每页显示记录数         |
| totalcount | string | 总记录数            |
| accountid  | int    | 用户id            |
| begindate  | string | 开始时间            |
| createtime | string | 创建时间            |
| domainname | string | 加速域名            |
| enddate    | string | 结束时间            |
| filename   | string | 文件名称            |
| frequency  | string | 执行次数            |
| fullurl    | string | http 下载路径          |
| id         | int    | 主键            |
| ifdel      | int    | 是否有效 |
| line       | int    | 日志行数              |
| size       | int    | 文件大小            |
| updatetime | string | 更新时间            |

## 错误码

| **HttpCode** | **错误码** | **描述**                                                     |
| ------------ | ---------- | ------------------------------------------------------------ |
| 412          | 41200001   | 请求失败，参数缺少必须项:%s                                  |
| 404          | 40400001   | 请求资源不存在                                               |
| 401          | 40100001   | 请求失败，未授权                                             |
| 500          | 50000001   | 服务器内容错误                                               |
| 412          | 41200002   | 日期格式不正确:%s                                            |
| 412          | 41200003   | 开始日期不能大于结束日期                                     |
| 412          | 41200004   | 未知的取值范围:%s                                            |
| 412          | 412A2001   | NotUse 只能是 True 或 False                                  |
| 412          | 412A2002   | Aliases 中有不合法域名                                       |
| 412          | 412A2003   | TestUrls 格式不符合规则                                      |
| 412          | 412A2004   | TestCodes 值只能是数字                                       |
| 412          | 412A2005   | OriginSource 只能是一个域名或者多个 ip（逗号隔开）           |
| 412          | 412A2006   | OriginSource 动态回源域名解析不到 A 记录                     |
| 412          | 412A2007   | OriginRewrite 不是域名                                       |
| 501          | 501A2008   | OriginHeader 必须是键值对                                    |
| 412          | 412A2009   | BackToSourceType 只能为 RoundRobin 或者 Backup               |
| 412          | 412A2010   | CarrierCode 值必须为 TEL\|CNC\|MOB\|EDU\|TIE\|ANY            |
| 412          | 412A2011   | CarrierCode 有重复值                                         |
| 412          | 412A2019   | 路径模式格式不符合规则！不支持中文符号和特殊字符<> ' "       |
| 412          | 412A2012   | MasterIps 中不是 ip                                          |
| 412          | 412A2013   | MasterIps 中有重复 ip                                        |
| 412          | 412A2014   | SlaverIps 中不是 ip                                          |
| 412          | 412A2015   | SlaverIps 中有重复 ip                                        |
| 412          | 412A2016   | MasterIps 和 SlaverIps 中有重复的 ip                         |
| 412          | 412A2017   | OriginSourceEx 中不是 ip                                     |
| 412          | 412A2018   | 回源域名不能与加速域名相同                                   |
| 412          | 412A2020   | IgnoreQueryString 只能是 True 或者 False                     |
| 412          | 412A2021   | 点播配置中只可以有两个 Item 标签                             |
| 412          | 412A2022   | VideoType 必须为 mp4 或 flv                                  |
| 412          | 412A2023   | VideoType 内容不可重复                                       |
| 412          | 412A2024   | DragType 必须为 time 或 size                                 |
| 412          | 412A2025   | NeverCache 只能是 True 或者 False                            |
| 412          | 412A2026   | CacheControl 只能是 NotIgnore 或者 Ignore                    |
| 412          | 412A2027   | CacheTime 填写不正确                                         |
| 412          | 412A2028   | CacheTime 单位不正确                                         |
| 412          | 412A2029   | WhiteList 不能超过 1900 个域名                               |
| 412          | 412A2030   | BlackList 不能超过 1900 个域名                               |
| 412          | 412A2031   | whiteList 中有不合法域名                                     |
| 412          | 412A2032   | BlackList 中有不合法域名                                     |
| 412          | 412A2033   | WhiteList 和 BlackList 不能同时有值                          |
| 412          | 412A2034   | DenyIpStart 中不是 ip                                        |
| 412          | 412A2035   | DenyIpEnd 中不是 ip                                          |
| 412          | 412A2036   | AllowIpStart 中不是 ip                                       |
| 412          | 412A2037   | AllowIpEnd 中不是 ip                                         |
| 412          | 412A2038   | 起始 ip 不能大于等于结束 ip                                  |
| 412          | 412A2039   | DenyIpList 中不是 ip                                         |
| 412          | 412A2040   | AllowIpList 中不是 ip                                        |
| 412          | 412A2041   | 禁用（启用）ip 和 referer 防盗链不能同时存在                 |
| 412          | 412A2042   | 禁用 ip 和启用 ip 不能同时存在                               |
| 412          | 412A2043   | WhiteList 和 BlackList 至少存在一个                          |
| 412          | 412A2044   | RetStatus 只能为 403 或者 302                                |
| 412          | 412A2045   | JumpLocation url 格式不符合规则                              |
| 412          | 412A2046   | IsOpen 只能是 True 或 False                                  |
| 412          | 412A2047   | 至少有一个 key 存在时才能开启                                |
| 412          | 412A2048   | AclGeneralTimeStamp/Key 不能超过 256 个字符                  |
| 412          | 412A2049   | AclGeneralTimeStamp/Key 只能是数字或者字母                   |
| 412          | 412A2050   | AclGeneralTimeStamp/TimeStamp 只能是数字                     |
| 412          | 412A2051   | 平台类型不匹配                                               |
| 412          | 412A2052   | 加速类型 Platform/Type 不能更改                              |
| 412          | 412A2053   | AllowNullReferer 只能是 True 或者 False                      |
| 412          | 412A2054   | OriginProtocol 只能是 http 或者 https                        |
| 412          | 412A2055   | OriginProtocolHttps 只能是 http 或者 https                   |
| 412          | 412A2056   | StartOffset 和 StartTime 至少存在一个                        |
| 412          | 412A2057   | StartOffset 值只能为数字                                     |
| 412          | 412A2058   | StartTime 值只能为数字                                       |
| 412          | 412A2059   | LimitSpeedRate 只能为数字                                    |
| 412          | 412A2060   | Duration 填写不正确                                          |
| 412          | 412A2061   | PartStore 填写不正确                                         |
| 412          | 412A2062   | TimeRange 值只能为数字                                       |
| 412          | 412A2063   | QueryMax 值只能为数字                                        |
| 412          | 412A2064   | ForbidTime 值只能为数字                                      |
| 412          | 412A2065   | 主回源域名不合法                                             |
| 412          | 412A2066   | 备回源域名不合法                                             |
| 412          | 412A2067   | 域名已存在于我们系统                                         |
| 412          | 412A2068   | 域名重复                                                     |
| 412          | 412A2069   | 加速已经启用（禁用）不能重复操作                             |
| 412          | 412A2070   | 加速类型不允许修改                                           |
| 412          | 412A2071   | 参数不合法                                                   |
| 412          | 412A2072   | 域名不存在或不属于当前客户                                   |
| 412          | 412A2073   | 域名不属于云平台                                             |
| 412          | 412A2074   | 未找到该域名的日志文件                                       |
| 412          | 412A2075   | 指定的 ssl 不存在                                            |
| 412          | 412A2076   | 私钥和证书不匹配                                             |
| 412          | 412A2077   | 请求消息体不能为空                                           |
| 412          | 412A2078   | XML 格式不符合规则                                           |
| 412          | 412A2079   | JSON 格式不符合规则                                          |
| 412          | 412A2080   | 域名没有备案                                                 |
| 412          | 412A2081   | 创建的 distribution 数量已经达到上限                         |
| 412          | 412A2082   | 日期格式不符合规则                                           |
| 500          | 500A0001   | 拒绝访问                                                     |
| 500          | 500A0002   | 请求的签名经过计算跟你提供的签名不匹配，请检查你的通行密钥和签名方法 |
| 500          | 500A0003   | 指定的验证码无效                                             |
| 500          | 500A0004   | 超过每天备案调用次数                                         |
| 500          | 500A0005   | 有域名关联该证书不能删除                                     |
| 500          | 500A0006   | 请求过于频繁，请一分钟之后再试                               |
| 500          | 500A0007   | 单次推送 url 不能超过 100 条                                 |
| 500          | 500A0008   | xml 转字符串出错                                             |
| 500          | 500A0009   | 数据库操作失败                                               |
| 500          | 500A0010   | 数据库查询失败                                               |
| 500          | 500A0011   | 程序出错                                                     |
| 500          | 500A0012   | 指定的 distribution 不存在                                   |
| 500          | 500A0013   | 指定的 distribution 已经或者正在删除                         |
| 500          | 500A0014   | 插入数据库失败                                               |
| 412          | 412A2083   | 解析不到 Customer/Id                                         |
| 412          | 412A2084   | 解析不到 Platform/Type                                       |
| 412          | 412A2085   | 解析不到 NotUse                                              |
| 412          | 412A2086   | 解析不到 Domain                                              |
| 412          | 412A2087   | 解析不到 Aliases                                             |
| 412          | 412A2088   | 解析不到 Origin                                              |
| 412          | 412A2089   | 解析不到 OriginSource                                        |
| 412          | 412A2090   | 解析不到 BackToSourceType                                    |
| 412          | 412A2091   | 解析不到 Item                                                |
| 412          | 412A2092   | 解析不到 CarrierCode                                         |
| 412          | 412A2093   | 解析不到 MasterIps                                           |
| 412          | 412A2094   | 解析不到 SlaverIps                                           |
| 412          | 412A2095   | 解析不到 OriginSourceEx                                      |
| 412          | 412A2096   | 解析不到QueryStringSettingsTop/QueryStringSetting/PathPattern |
| 412          | 412A2097   | 解析不到 IgnoreQueryString                                   |
| 412          | 412A2098   | 解析不到 VideoType                                           |
| 412          | 412A2099   | 解析不到 NeverCache                                          |
| 412          | 412A2100   | 解析不到 CacheControl                                        |
| 412          | 412A2101   | 解析不到 CacheTime                                           |
| 412          | 412A2102   | 解析不到 AclUserAgent/UserAgent                              |
| 412          | 412A2103   | 解析不到 AclUserAgent/JumpLocation                           |
| 412          | 412A2104   | 解析不到 AclTimeStamp/IsOpen                                 |
| 412          | 412A2105   | 解析不到 AclGeneralTimeStamp/Key                             |
| 412          | 412A2106   | 解析不到 AclGeneralTimeStamp/TimeStamp                       |
| 412          | 412A2107   | 解析不到 Logging/Analytics                                   |
| 412          | 412A2108   | 解析不到 Logging/Format                                      |
| 412          | 412A2109   | 解析不到 Logging/SplitTime                                   |
| 412          | 412A2110   | AdvanceConfig 和 OriginSource 至少存在一个                   |
| 412          | 412A2111   | 解析不到CacheBehaviorTop/CacheBehaviors/CacheBehavior/PathPattern |
| 412          | 412A2112   | 解析不到 DenyIpStart                                         |
| 412          | 412A2113   | 解析不到 DenyIpEnd                                           |
| 412          | 412A2114   | 解析不到 AllowIpStart                                        |
| 412          | 412A2115   | 解析不到 AllowIpEnd                                          |
| 412          | 412A2116   | 解析不到 AclBehaviors/AclBehavior/PathPattern                |
| 412          | 412A2117   | 解析不到 Logging                                             |
| 412          | 412A2118   | 解析不到 DistributionConfig                                  |
| 412          | 412A2119   | 解析不到 SSLId                                               |
| 412          | 412A2120   | 解析不到 LimitSpeedRate                                      |
| 412          | 412A2121   | 解析不到 TimeRange                                           |
| 412          | 412A2122   | 解析不到 QueryMax                                            |
| 412          | 412A2123   | 解析不到 ForbidTime                                          |
| 401          | 40100002   | 请求的签名经过计算跟你提供的签名不匹配，请检查你的通行密钥和签名方法 |
| 412          | 412A2124   | 提供的 xml 与上次的相同                                      |
| 401          | 40100003   | Token 已过期,请重新登陆                                      |
| 412          | 41200008   | 余额不足，不能进行此操作                                     |
| 500          | 50000002   | 数据库操作失败                                               |
| 500          | 50000003   | 数据库查询失败                                               |
| 500          | 50000004   | 检索数据异常                                                 |
| 412          | 41200009   | 您没有任何加速域名信息可查询                                 |
| 500          | 50000005   | 缺少必须的参数项，请联系管理员进行配置                       |
| 500          | 50000006   | 订单不存在,不能进行修改操作                                  |
| 500          | 50000007   | 订单已存在,请勿重复提交                                      |
| 500          | 50000008   | 请勿重复选择提交计费方案                                     |
| 500          | 50000009   | 创建订单失败                                                 |
| 500          | 50000010   | 不是一个有效的日期                                           |
| 500          | 50000011   | 订单已存在，请先进行撤销操作                                 |
| 500          | 50000012   | 用户名已存在                                                 |
| 500          | 50000013   | id不正确，用户信息不存在                                     |
| 500          | 50000014   | captcha不存在，请生成验证码                                  |
| 500          | 50000015   | 验证码不正确,请重新输入                                      |
| 500          | 50000016   | 未知的tokenid                                                |
| 500          | 50000017   | 用户名或者密码不正确                                         |
| 500          | 50000018   | 获取用户信息错误                                             |
| 500          | 50000020   | 未知的返回结果                                               |
| 500          | 500A0015   | 域名不合法或域名不属于当前请求用户!                          |
| 500          | 50000021   | code已存在，不能进行此操作                                   |
| 500          | 50000022   | id不存在，不能进行此操作                                     |
| 500          | 50000023   | 未知的parentid                                               |
| 412          | 41200010   | 请求的数据不是一个数组                                       |
| 500          | 50000024   | 未知的sslid                                                  |
| 500          | 50000025   | 错误的DistributionConfig结构                                 |
| 500          | 50000026   | 未知的cname                                                  |
| 500          | 50000027   | 该域名已存在，请勿重复创建                                   |
| 500          | 50000028   | goodsid不存在，请联系管理员检查OP配置                        |
| 412          | 41200011   | 非员工用户不能登录该OP系统                                   |
| 500          | 50000029   | 加速域名不匹配,请检查加速域名与CName是否一致                 |
| 500          | 50000030   | 已删除的加速域名不能进行该操作                               |
| 500          | 50000031   | 正在执行删除的加速域名不能进行该操作                         |
| 500          | 50000032   | 已禁用的加速域名不能进行该操作                               |
| 500          | 50000033   | 该加速域名不允许在本系统中修改                               |
| 500          | 50000034   | 已启用的加速域名不能进行该操作                               |
| 412          | 41200012   | publickey长度必须少于10000                                   |
| 412          | 41200013   | privatekey长度必须少于10000                                  |
| 412          | 41200014   | sslid证书已被禁用不能进行该操作                              |
| 500          | 50000035   | 资源已存在                                                   |
| 500          | 50000036   | 资源不存在                                                   |
| 412          | 41200015   | url的条数不能大于:%s                                         |
| 412          | 41200016   | url的长度不能大于:%s                                         |
| 412          | 41200017   | 加速域名最多只允许创建15个                                   |
| 412          | 41200018   | 客户ID不存在                                                 |
| 500          | 50000037   | bs对象type取值范围无效[RoundRobin,Backup]                    |
| 500          | 50000038   | 未知的rftype                                                 |
| 412          | 41200019   | 该路径已存在                                                 |
| 412          | 41200020   | 未匹配到删除的项                                             |
| 412          | 41200021   | 请求失败，参数缺少必须项:ips                                 |
| 412          | 41200022   | 请求失败，参数缺少必须项:mips                                |
| 412          | 41200023   | 请求失败，参数缺少必须项:sips                                |
| 500          | 50000039   | 当前url地址不是您创建的加速域名                              |