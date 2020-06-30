package model

import "encoding/json"

var NetworkUrl = "https://cdsapi.capitalonline.net/network"

func DescribeVdc(RegionId, VdcId, Keyword string) string {
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