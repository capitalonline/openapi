# coding: utf-8
import uuid
import hmac
import time
import urllib2
import urllib
import sys, os
import base64
import hashlib
from hashlib import sha1
import requests
import json


CCS_URL          = "http://cdsapi.capitalonline.net/ccs"
NETWORK_URL      = "http://cdsapi.capitalonline.net/network"

# AK、SK
AK              = "您的AK"
AccessKeySecret = "您的SK"


def percentEncode(str):
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

def create_template(vm_id, name):
    """创建模板"""

    action = "CreateTemplate"
    method = "POST"

    # 获取签名自动生成请求url
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    body = {
        "InstanceId": vm_id,
        "DisplayName": name
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    print result

def delete_template(template_id, region_id):
    """删除模板""""

    action = "DeleteTemplate"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    body = {
        "TemplateId": template_id,
        "RegionId": region_id
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    print result

def list_template():
    """模板列表"""

    action = "DescribeTemplateInfo"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    body = {
        "PageSize": 10,
        "PageNumber": 1,
        # "Keyword": "test"
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    task_id = result.get("TaskId")
    print result

def sync_template(template_id, region_id):
    """同步模板""""
    
    action = "SyncTemplate"
    method = "POST"
    url = get_signature(action, AK, AccessKeySecret, method, CCS_URL)
    body = {
        "TemplateId":template_id 
        "RegionId": region_id
    }
    res = requests.post(url, json=body)
    result = json.loads(res.content)
    print result



if __name__ == "__main__":

    # 1.定制模板
    create_template(vm_id="xxxx", name="display_name")

    # 2.删除模板
    # delete_template(template_id, region_id)

    # 3.模板列表
    # list_template()

    # 4.同步模板
    # sync_template(template_id, region_id)