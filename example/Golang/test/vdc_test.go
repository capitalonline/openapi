package test

import (
	"testing"
	"OpenAPI-GO/model"
	"fmt"
)

func TestDescribeVdc(t *testing.T)  {
	result := model.DescribeVdc("APAC_Seoul_A", "8cf43b43-7920-4478-acf6-969245dcec14", "")
	fmt.Printf("%v", string(result))
}

func TestCreateVdc(t *testing.T) {
	info := model.PublicNetworkInfo{
		Name: "TestGoPublic",
		Type: "Bandwidth_BGP",
		BillingMethod: "BandwIdth",
		Qos: 5,
		IPNum: 4,
	}
	result := model.CreateVdc("APAC_Seoul_A", "TestGo", info)
	fmt.Println(result)
}

func TestAddPublicIp(t *testing.T) {
	result := model.AddPublicIp("adcb9736-c64c-11ea-aaab-0242ac110002", "4")
	fmt.Println(result)
}

func TestDeletePublicIp(t *testing.T) {
	result := model.DeletePublicIp("286bc11c-c64f-11ea-b707-0242ac110002")
	fmt.Println(result)
}

func TestDescribeBandwidthTraffic(t *testing.T) {
	result := model.DescribeBandwidthTraffic("adcb9736-c64c-11ea-aaab-0242ac110002")
	fmt.Println(result)
}