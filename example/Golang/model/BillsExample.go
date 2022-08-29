package model

import (
	"encoding/json"
	"fmt"
)

var (
	billing bill

	accountInfo acInfo
	bInfo       billInfo
	bDetail     billDetail
)

const BillsUrl = "https://cdsapi.capitalonline.net/billing"

type acInfo struct {
	CostCount   int `json:"CostCount"`
	CostRecords []struct {
		Amount   float64 `json:"Amount"`
		Currency string  `json:"Currency"`
		Month    string  `json:"Month"`
	} `json:"CostRecords"`
	CreditLine         float64 `json:"CreditLine"`
	MasterTotalBalance float64 `json:"MasterTotalBalance"`
	MasterTotalCost    float64 `json:"MasterTotalCost"`
	RechargeCount      int     `json:"RechargeCount"`
	RechargeRecord     []struct {
		Amount      float64 `json:"Amount"`
		CreateDate  string  `json:"CreateDate"`
		Currency    string  `json:"Currency"`
		SwiftNumber string  `json:"SwiftNumber"`
		Type        string  `json:"Type"`
	} `json:"RechargeRecord"`
	ToDeduct float64 `json:"ToDeduct"`
}
type bill struct {
	BillInfo []struct {
		CreateTime   string  `json:"CreateTime"`
		DeleteTime   string  `json:"DeleteTime"`
		RegionID     string  `json:"RegionId"`
		ResourceID   string  `json:"ResourceId"`
		ResourceName string  `json:"ResourceName"`
		ResourceType string  `json:"ResourceType"`
		TotalCost    float64 `json:"TotalCost"`
		VdcID        string  `json:"VdcId"`
		VdcName      string  `json:"VdcName"`
	} `json:"BillInfo"`
	TotalMasterCost float64 `json:"TotalMasterCost"`
	TotalViceCost   float64 `json:"TotalViceCost"`
}
type billInfo struct {
	BillDetail []struct {
		Configuration string   `json:"Configuration"`
		CostDetail    string   `json:"CostDetail"`
		CreateTime    string   `json:"CreateTime"`
		EndTime       string   `json:"EndTime"`
		IPs           []string `json:"IPs"`
		PayDesc       string   `json:"PayDesc"`
		PayType       string   `json:"PayType"`
		RegionID      string   `json:"RegionId"`
		ResourceID    string   `json:"ResourceId"`
		ResourceName  string   `json:"ResourceName"`
		StartTime     string   `json:"StartTime"`
		Status        string   `json:"Status"`
		TotalCost     float64  `json:"TotalCost"`
		UnitPrice     float64  `json:"UnitPrice"`
		VdcID         string   `json:"VdcId"`
		VdcName       string   `json:"VdcName"`
	} `json:"BillDetail"`
	TotalCost float64 `json:"TotalCost"`
}
type billDetail struct {
	BeginTime  string `json:"BeginTime"`
	BillDetail []struct {
		APP       string  `json:"APP"`
		BeginTime string  `json:"BeginTime"`
		BillType  string  `json:"BillType"`
		CloudID   string  `json:"CloudId"`
		Config    string  `json:"Config"`
		Currency  string  `json:"Currency"`
		EndTime   string  `json:"EndTime"`
		GoodsType string  `json:"GoodsType"`
		Label     string  `json:"Label"`
		Product   string  `json:"Product"`
		Project   string  `json:"Project"`
		Resource  string  `json:"Resource"`
		Site      string  `json:"Site"`
		TotalCost float64 `json:"TotalCost"`
	} `json:"BillDetail"`
	EndTime      string `json:"EndTime"`
	TotalRecords int    `json:"TotalRecords"`
	TotalSummary struct {
		Currency   string  `json:"Currency"`
		MasterCost float64 `json:"MasterCost"`
		ToDeduct   float64 `json:"ToDeduct"`
		TotalCost  float64 `json:"TotalCost"`
		ViceCost   float64 `json:"ViceCost"`
	} `json:"TotalSummary"`
}

func DescribeBill() (CommonReturn, error) {
	action := "DescribeBill"
	method := "GET"
	body, err := json.Marshal(map[string]interface{}{
		"DateFromTo": "2022.08.02 - 2022.08.03",
		"Currency":   "CN",
	})
	res := doHttpPost(action, BillsUrl, method, body)
	fmt.Printf(">>>>>>> request result: %v", res)
	bytes, _ := json.Marshal(res.Data)
	json.Unmarshal(bytes, &billing)
	return res, err
}
func DescribeBillInfo() (CommonReturn, error) {
	action := "DescribeBillInfo"
	method := "GET"
	body, err := json.Marshal(map[string]interface{}{
		"DateFrom":   "2019.09.02",
		"DateTo":     "2019.09.03",
		"ResourceId": "XXXXX",
		"Currency":   "CN",
	})
	res := doHttpPost(action, BillsUrl, method, body)
	fmt.Printf(">>>>>>> request result: %v", res)
	bytes, _ := json.Marshal(res.Data)
	json.Unmarshal(bytes, &bInfo)
	return res, err
}
func DescribeBillDetail() (CommonReturn, error) {
	action := "DescribeBillDetail"
	method := "GET"
	body, err := json.Marshal(map[string]interface{}{
		"DateFrom":    "2022.07.01",
		"DateTo":      "2022.07.03",
		"ProjectName": "默认项目组",
	})
	res := doHttpPost(action, BillsUrl, method, body)
	fmt.Printf(">>>>>>> request result: %v", res)
	bytes, _ := json.Marshal(res.Data)
	json.Unmarshal(bytes, &bDetail)
	return res, err
}
func DescribeAccountInfo() (CommonReturn, error) {
	action := "DescribeAccountInfo"
	method := "GET"

	res := doHttpPost(action, BillsUrl, method, nil)
	fmt.Printf(">>>>>>> request result: %v", res)
	bytes, _ := json.Marshal(res.Data)
	json.Unmarshal(bytes, &accountInfo)
	return res, nil
}
