package test

import (
	"testing"
	"OpenAPI-GO/model"
	"fmt"
)

func TestDescribeInstance(t *testing.T)  {
	result := model.DescribeInstances("f6124738-346d-4b21-8a7c-f86bf04b76ed")
	fmt.Printf("%v", string(result))
}

func TestCreateInstance(t *testing.T) {
	t.Log("Start Test Create Instance")
	RegionId := "APAC_Seoul_A"
	VdcId := "c603ee06-cef3-439d-bdea-fd72768ecb77"
	InstanceName := "go-api"
	InstanceType := "High"
	ImageId := "Centos_7.6_64"
	Password := "!"

	res := model.CreateInstance(RegionId, VdcId, InstanceName, InstanceType, ImageId, Password, 4, 4, 1)
	fmt.Println(res)
}

func TestDeleteInstance(t *testing.T) {
	instanceId := "65929a1b-4083-4622-856e-01818dd0a6b2"
	var param = []string{instanceId}
	res := model.DeleteInstance(param)
	fmt.Println(res)
}

func TestStopInstance(t *testing.T)  {
	instanceId := "f6124738-346d-4b21-8a7c-f86bf04b76ed"
	res := model.StopInstance(instanceId)
	fmt.Println(res)
}

func TestStartInstance(t *testing.T)  {
	instanceId := "f6124738-346d-4b21-8a7c-f86bf04b76ed"
	res := model.StartInstance(instanceId)
	fmt.Println(res)
}

func TestRebootInstance(t *testing.T)  {
	instanceId := "f6124738-346d-4b21-8a7c-f86bf04b76ed"
	res := model.RebootInstance(instanceId)
	fmt.Println(res)
}

func TestModifyInstanceSpec(t *testing.T)  {
	instanceId := "f6124738-346d-4b21-8a7c-f86bf04b76ed"
	res := model.ModifyInstanceSpec(instanceId, 4, 8)
	fmt.Println(res)
}

func TestCreateDisk(t *testing.T) {
	instanceId := "f6124738-346d-4b21-8a7c-f86bf04b76ed"
	res := model.CreateDisk(instanceId)
	fmt.Println(res)
}

func TestResizeDisk(t *testing.T)  {
	instanceId := "f6124738-346d-4b21-8a7c-f86bf04b76ed"
	diskId := "22b01c34-b9ff-11ea-b1f3-0242ac110002"
	size := 200
	res := model.ResizeDisk(instanceId, diskId, size)
	fmt.Println(res)
}

func TestDeleteDisk(t *testing.T) {
	instanceId := "f6124738-346d-4b21-8a7c-f86bf04b76ed"
	diskIds := []string{"22b01c34-b9ff-11ea-b1f3-0242ac110002"}
	res := model.DeleteDisk(instanceId, diskIds)
	fmt.Println(res)
}

func TestResetImageByPassword(t *testing.T) {
	instanceId := "f6124738-346d-4b21-8a7c-f86bf04b76ed"
	imageId := "Centos_7.6_64"
	Password := "123abc,.;"
	res := model.ResetImage(instanceId, imageId, Password, "")
	fmt.Println(res)
}

func TestResetImageByPublicKey(t *testing.T) {
	instanceId := "f6124738-346d-4b21-8a7c-f86bf04b76ed"
	imageId := "Centos_7.6_64"
	PublicKey := "ssh-rsa"
	res := model.ResetImage(instanceId, imageId, "", PublicKey)
	fmt.Println(res)
}

func TestModifyIpAddress(t *testing.T) {
	instanceId := "f6124738-346d-4b21-8a7c-f86bf04b76ed"
	interfaceId := "36457034-baa2-11ea-8771-c60e117040ec"
	address := "xxx.xx.xx.xxx"
	res := model.ModifyIpAddress(instanceId, interfaceId, address)
	fmt.Println(res)
}

func TestModifyIpAddressToNull(t *testing.T) {
	instanceId := "f6124738-346d-4b21-8a7c-f86bf04b76ed"
	interfaceId := "36457034-baa2-11ea-8771-c60e117040ec"
	address := ""
	res := model.ModifyIpAddress(instanceId, interfaceId, address)
	fmt.Println(res)
}

func TestModifyInstanceName(t *testing.T) {
	instanceId := "f6124738-346d-4b21-8a7c-f86bf04b76ed"
	instanceName := "TestGoApi"
	res := model.ModifyInstanceName(instanceId, instanceName)
	fmt.Println(res)
}