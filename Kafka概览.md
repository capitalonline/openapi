Kafka 公开API目录
=================
* [API概览](#api概览)
* [认证方式](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#认证方式)
  * [1.公共请求参数](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#1公共请求参数)
  * [2.签名机制](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#2签名机制)
    * [步骤一：构造规范化请求字符串](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#步骤一构造规范化请求字符串)
    * [步骤二：构造签名字符串](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#步骤二构造签名字符串)
  * [3.获取签名代码](https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#2获取签名代码)
* [错误码](#错误码)
* [访问地址](#访问地址)
* [实例](#实例)
    * [1.GetKafkaList](#1getkafkalist)

### API概览

Kafka产品提供以下相关API接口。

#### 实例

| API                 | 描述                                      |
| ------------------- | ----------------------------------------- |
| GetKafkaList       | 获取Kafka实例列表         |


### 访问地址


| 地区     | 访问地址                      |
| -------- | ----------------------------- |
| 中国大陆 | cdsapi.capitalonline.net      |
| 亚太地区 | cdsapi-asia.capitalonline.net |
| 欧美地区 | cdsapi-us.capitalonline.net   |

### 1.GetKafkaList

**Action：** GetKafkaList

**描述：** 获取Kafka实例列表

**请求地址：** cdsapi.capitalonline.net/kafka

**请求方法：** POST

**请求参数：**

无

**请求示例：**

```python
def get_kafka_list():
        """
        获取Kafka实例列表
        """
        action = "GetKafkaList"
        method = "POST"
        param = {
        }
        url = get_signature(action, self.AK, self.AccessKeySecret, method, self.KafkaUrl, param)
        body = {
            "ProjectId": "b9661xxx-59fe-11eb-b7e7-46d055d59xxx",
            "RegionId": "APAC_Singapore_D",
            "InstanceId": ["94c08xxx-6095-11eb-b408-0242ac11xxxx"]
        }
        res = requests.post(url, json=body)
        print(res.content)
        result = json.loads(res.content)
        print(result)
```

**返回示例：**

```json
{
    "Code": "Success",
    "Data": [
        {
            "CreateTime": "2021-03-05 15:22:48",
            "DiskSize": 100,
            "DiskType": "ssd_disk",
            "Endpoint": "xxxxxx1.kafka.yun-paas.com.:9093,xxxxxxxx2.kafka.yun-paas.com.:9093,xxxxxxxx3.kafka.yun-paas.com.:9093",
            "ExpiredTime": "2099-01-01T00:00:00Z",
            "InstanceDeployType": "公网",
            "InstanceId": "968f8714-7d83-11eb-8946-xxxxxxxxxx",
            "InstanceName": "Test",
            "IopsPkg": "1个",
            "KafkaSpec": "4C8G",
            "KafkaVersion": "v2.2.0",
            "MsgRetain": "24小时",
            "NodeNumber": 3,
            "NodesList": [
                {
                    "BrokerId": 1,
                    "CreateTime": "2021-03-05 15:22:48",
                    "NodeId": "0322b342-5ec3-4511-9397-xxxxxxxxxx",
                    "NodeSpec": "4C8G",
                    "NodeStatus": "run",
                    "PrivateIP": "10.240.xx.xx",
                    "UpdateTime": "2021-03-05 15:27:26"
                },
                {
                    "BrokerId": 2,
                    "CreateTime": "2021-03-05 15:22:48",
                    "NodeId": "1865d66b-c84d-4b87-bcfa-xxxxxxxxxx",
                    "NodeSpec": "4C8G",
                    "NodeStatus": "run",
                    "PrivateIP": "10.240.xx.xx",
                    "UpdateTime": "2021-03-05 15:27:26"
                },
                {
                    "BrokerId": 3,
                    "CreateTime": "2021-03-05 15:22:48",
                    "NodeId": "9be45f93-6818-4ed1-bad9-xxxxxxxxxx",
                    "NodeSpec": "4C8G",
                    "NodeStatus": "run",
                    "PrivateIP": "10.240.xx.xx",
                    "UpdateTime": "2021-03-05 15:27:26"
                }
            ],
            "PayType": "按需",
            "RegionId": "CN_Guangzhou_A",
            "RegionName": "中国大陆-广州-可用区A",
            "ServiceStatus": "run",
            "UpdateTime": "2021-03-05 15:27:26",
            "VdcId": "4538821a-5bea-42be-b255-xxxxxxxxxx",
            "VdcName": "TestGuangZhou"
        }
    ],
    "Message": "获取kafka集群列表成功！"
}

```

**返回参数说明：**

| 参数名     | 类型   | 说明                                                   |
| :--------- | :----- | ------------------------------------------------------ |
| Code       | string | 状态码                                                 |
| Data       | dict   | 数据                                                   |
| CreateTime | string | 创建时间                                               |
| DiskSize   | int    | 磁盘大小                                               |
| DiskType   | string | 磁盘类型 |
| Endpoint   | string | 链接地址                                               |
| ExpiredTime | string | 过期时间                                               |
| InstanceId   | string | 实例ID                            |
| InstanceName   | string | 名称                           |
| IopsPkg   | string | IO增强包数量                            |
| KafkaSpec   | string | 实例规格                            |
| KafkaVersion   | string | 实例版本                            |
| MsgRetain   | string | 消息保留时长                            |
| NodeNumber   | string | 节点数量                            |
| NodesList   | list | 节点列表                            |
| BrokerId   | int | Broker ID                            |
| NodeId   | string | 节点ID                            |
| NodeSpec   | string | 节点规格                            |
| NodeStatus   | string | 节点状态                            |
| PrivateIP   | string | 节点内网IP                            |
| UpdateTime   | string | 更新时间                          |
| PayType   | string | 计费类型：按需，包年包月                            |
| RegionId   | string | 可用区ID                         |
| RegionName   | string | 可用区名称                            |
| ServiceStatus   | string | 实例状态                            |
| VdcId   | string | VDC ID                            |
| VdcName   | string | VDC名称                            |
| Message    | string | 信息描述                                               |
