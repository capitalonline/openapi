package model

import (
	"encoding/json"
	"fmt"
)

const EcsUrl = "https://api.capitalonline.net/ecs/v1"

func CreateInstanceEcs() (CommonReturn, error) {
	action := "CreateInstance"
	method := "POST"
	body, err := json.Marshal(map[string]interface{}{
		"AvailableZoneCode": "CN_Suqian_B",
		"EcsFamilyName":     "CPU计算型C1",
		"Cpu":               2,
		"Ram":               4,
		"Gpu":               0,
		"Number":            1,
		"BillingMethod":     "0",
		"ImageId":           "ee300237-0ef4-40a9-ad79-7470262d4a2f",
		"SystemDisk": map[string]interface{}{
			"DiskFeature": "local",
			"Size":        50,
		},
		"VpcInfo": map[string]interface{}{
			"VpcId": "xxx",
		},
		"SubnetInfo": map[string]interface{}{
			"SubnetId": "xxx",
		},
		"Name":        "ecs-test-golang",
		"StartNumber": 0,
		"Password":    "123QWEqwe",
	},
	)
	if err != nil {
		return CommonReturn{}, err
	}
	res := doHttpPost(action, EcsUrl, method, body)
	fmt.Printf(">>>>>>> request result: %v", res)
	return res, nil
}

func DescribeRegions() (CommonReturn, error) {
	action := "DescribeRegions"
	method := "GET"

	res := doHttpPost(action, EcsUrl, method, nil)
	fmt.Printf(">>>>>>> request result: %v", res)
	return res, nil
}

func DescribeEcsFamilyInfo() (CommonReturn, error) {
	action := "DescribeEcsFamilyInfo"
	method := "GET"
	body, err := json.Marshal(map[string]interface{}{
		"AvailableZoneCode": "CN_Suqian_B",
		"BillingMethod":     "0",
	},
	)
	if err != nil {
		return CommonReturn{}, err
	}
	res := doHttpPost(action, EcsUrl, method, body)
	fmt.Printf(">>>>>>> request result: %v", res)
	return res, nil
}

func DescribeImage() (CommonReturn, error) {
	action := "DescribeImage"
	method := "GET"
	body, err := json.Marshal(map[string]interface{}{
		"AvailableZoneCode": "CN_Suqian_B",
	},
	)
	if err != nil {
		return CommonReturn{}, err
	}
	res := doHttpPost(action, EcsUrl, method, body)
	fmt.Printf(">>>>>>> request result: %v", res)
	return res, nil
}
