package model

import (
	"encoding/json"
)

var NetworkUrl = "https://cdsapi.capitalonline.net/network"

func DescribeVdc(RegionId, VdcId, Keyword string) CommonReturn {
	action := "DescribeVdc"
	method := "GET"

	var param = map[string]string{}
	if RegionId != "" {
		param["RegionId"] = RegionId
	}
	if VdcId != "" {
		param["VdcId"] = VdcId
	}
	if Keyword != "" {
		param["Keyword"] = Keyword
	}
	body, err := json.Marshal(param)
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, NetworkUrl, method, body)
	return res
}

type PublicNetworkInfo struct {
	Name          string
	Type          string
	BillingMethod string
	Qos           int
	IPNum         int
}

func CreateVdc(RegionId, VdcName string, info PublicNetworkInfo) CommonReturn {
	action := "CreateVdc"
	method := "POST"

	param := map[string]interface{}{
		"RegionId":      RegionId,
		"VdcName":       VdcName,
		"PublicNetwork": info,
	}
	body, err := json.Marshal(param)
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, NetworkUrl, method, body)
	return res
}

func AddPublicIp(PublicId string, Number string) CommonReturn {
	action := "AddPublicIp"
	method := "GET"

	param := map[string]interface{}{
		"PublicId": PublicId,
		"Number":   Number,
	}
	body, err := json.Marshal(param)
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, NetworkUrl, method, body)
	return res
}

func DeletePublicIp(SegmentId string) CommonReturn {
	action := "DeletePublicIp"
	method := "GET"
	param := map[string]string{
		"SegmentId": SegmentId,
	}
	body, err := json.Marshal(param)
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, NetworkUrl, method, body)
	return res
}

func DescribeBandwidthTraffic(NetworkId string) CommonReturn {
	action := "DescribeBandwidthTraffic"
	method := "GET"
	param := map[string]string{
		"NetworkId": NetworkId,
	}
	body, err := json.Marshal(param)
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, NetworkUrl, method, body)
	return res
}
