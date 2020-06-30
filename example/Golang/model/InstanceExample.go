package model

import (
	"encoding/json"
	"fmt"
)

var CcsUrl = "https://cdsapi.capitalonline.net/ccs"

func CreateInstance(RegionId, VdcId, InstanceName, InstanceType, ImageId, Password string, Cpu, Ram, Amount int) string {
	action := "CreateInstance"
	method := "POST"

	var PublicIp []string
	var PrivateIp, DataDisk []interface{}

	body, err := json.Marshal(map[string]interface{}{
		"RegionId": RegionId,
		"VdcId": VdcId,
		"InstanceName": InstanceName,
		"Cpu": Cpu,
		"Ram": Ram,
		"InstanceType": InstanceType,
		"ImageId": ImageId,
		"DataDisk": DataDisk,
		"InstanceChargeType": "PostPaid",
		"Password": Password,
		"AutoRenew": 1,
		"PrepaidMonth": 1,
		"Amount": Amount,
		"PublicIp": PublicIp,
		"PrivateIp": PrivateIp,
	})
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, CcsUrl, method, body)
	return res
}

func DescribeInstances(InstanceId string) string {
	action := "DescribeInstances"
	method := "POST"

	body, err := json.Marshal(map[string]string{
		"InstanceId": InstanceId,
	})
	if err != nil {
		panic(err)
	}

	res := doHttpPost(action, CcsUrl, method, body)
	return res
}

func DeleteInstance(InstanceIds []string) string {
	action := "DeleteInstance"
	method := "POST"

	body, err := json.Marshal(map[string][]string{
		"InstanceIds": InstanceIds,
	})
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, CcsUrl, method, body)
	return res
}

func StopInstance(InstanceId string) string {
	action := "StopInstance"
	method := "GET"

	body, err := json.Marshal(map[string]string{
		"InstanceId": InstanceId,
	})
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, CcsUrl, method, body)
	return res
}

func StartInstance(InstanceId string) string {
	action := "StartInstance"
	method := "GET"

	body, err := json.Marshal(map[string]string{
		"InstanceId": InstanceId,
	})
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, CcsUrl, method, body)
	return res
}

func RebootInstance(InstanceId string) string {
	action := "RebootInstance"
	method := "GET"

	body, err := json.Marshal(map[string]string{
		"InstanceId": InstanceId,
	})
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, CcsUrl, method, body)
	return res
}

func ModifyInstanceSpec(InstanceId string, Cpu, Ram int) string {
	action := "ModifyInstanceSpec"
	method := "POST"

	body, err := json.Marshal(map[string]interface{}{
		"InstanceId": InstanceId,
		"Cpu": Cpu,
		"Ram": Ram,
	})
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, CcsUrl, method, body)
	return res
}

type DiskParam struct {
	Size int
	Type string
}

func CreateDisk(InstanceId string) string {
	action := "CreateDisk"
	method := "POST"

	param := make([]DiskParam, 1)
	param[0].Size = 100
	param[0].Type = "high_disk"

	fmt.Println(param)
	body, err := json.Marshal(map[string]interface{}{
		"InstanceId": InstanceId,
		"DataDisks":  param,
	})
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, CcsUrl, method, body)
	return res
}

func ResizeDisk(InstanceId, DiskId string, Size int) string {
	action := "ResizeDisk"
	method := "POST"

	body, err := json.Marshal(map[string]interface{}{
		"InstanceId": InstanceId,
		"DiskId":  DiskId,
		"DataSize": Size,
	})
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, CcsUrl, method, body)
	return res
}

func DeleteDisk(InstanceId string, DiskIds []string) string {
	action := "DeleteDisk"
	method := "POST"

	body, err := json.Marshal(map[string]interface{}{
		"InstanceId": InstanceId,
		"DiskIds":  DiskIds,
	})
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, CcsUrl, method, body)
	return res
}

func ResetImage(InstanceId, ImageId, Password, PublicKey string) string {
	action := "ResetImage"
	method := "POST"
	if Password == "" && PublicKey == "" {
		panic("not password or publicKey")
	}
	param := map[string]interface{}{
		"InstanceId": InstanceId,
		"ImageId":  ImageId,
	}
	if Password != "" {
		param["Password"] = Password
	}
	if PublicKey != "" {
		param["PublicKey"] = PublicKey
	}
	body, err := json.Marshal(param)
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, CcsUrl, method, body)
	return res
}

func ModifyIpAddress(InstanceId, InterfaceId, Address string) string {
	action := "ModifyIpAddress"
	method := "POST"
	body, err := json.Marshal(map[string]string{
		"InstanceId": InstanceId,
		"InterfaceId": InterfaceId,
		"Address": Address,
	})
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, CcsUrl, method, body)
	return res
}

func ModifyInstanceName(InstanceId, InstanceName string) string {
	action := "ModifyInstanceName"
	method := "POST"
	body, err := json.Marshal(map[string]string{
		"InstanceId": InstanceId,
		"InstanceName": InstanceName,
	})
	if err != nil {
		panic(err)
	}
	res := doHttpPost(action, CcsUrl, method, body)
	return res
}