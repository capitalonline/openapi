package ebs

import (
	"encoding/json"
	"example/VPC/common"
	"fmt"
	"net/http"
)

type CreateDiskReq struct {
	AvailableZoneCode   string `json:"AvailableZoneCode"`             // 可用区Code
	EcsId               string `json:"EcsId,omitempty"`               // 挂载到云主机的实例（支持创建即挂载）
	ReleaseWithInstance int    `json:"ReleaseWithInstance,omitempty"` // 是否随实例删除（支持创建即挂载）
	DiskName            string `json:"DiskName"`                      //设置的云盘名称
	DiskFeature         string `json:"DiskFeature"`                   // 盘类型(目前只支持SSD)
	Size                int    `json:"Size"`                          // 盘容量 单位:GB,容量为8的倍数，且最小24GB起
	Number              int    `json:"Number"`                        // 创建数量
	BillingMethod       string `json:"BillingMethod"`                 // 计费方式
}

type CreateDiskResp struct {
	DiskIdSet []interface{} `json:"DiskIdSet"`
	EventId   string        `json:"EventId"`
}

// CreateDisk 创建云盘示例 说明：https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#1createdisk-1
func CreateDisk(params CreateDiskReq) (common.CommonReturn, error) {
	var (
		action = "CreateDisk"
		// map类型
		/*
				params = map[string]interface{}{
				"AvailableZoneCode": "CN_Hohhot_B",
				"DiskName":          "demo",
				"DiskFeature":       "SSD",
				"Size":              32,
				"Number":            1,
				"BillingMethod":     "0",
			}
		*/
	)

	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
	}

	res := common.DoHttpPost(action, common.EbsUrl, http.MethodPost, body)
	return res, nil
}

type AttachDiskReq struct {
	DiskIds             []string `json:"DiskIds"`             // 挂载的云盘id列表
	EcsId               string   `json:"EcsId"`               // 挂载的目标实例id
	ReleaseWithInstance int      `json:"ReleaseWithInstance"` // 是否随实例删除
}

// AttachDisk 挂载云盘示例 说明：https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#4attachdisk
func AttachDisk(params AttachDiskReq) (common.CommonReturn, error) {
	var (
		action = "AttachDisk"
		// map类型
		/*
			params = map[string]interface{}{
				"DiskIds": []string{"disk1", "disk2"},
				"EcsId":   "ins-cplc7w0rfmy7sb1g",
			}
		*/
	)

	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
	}

	res := common.DoHttpPost(action, common.EbsUrl, http.MethodPost, body)
	return res, nil
}

type DetachDiskReq struct {
	DiskIds []string `json:"DiskIds"`
}

// DetachDisk 卸载云盘示例 说明：https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#3detachdisk-1
func DetachDisk(params AttachDiskReq) (common.CommonReturn, error) {
	var (
		action = "DetachDisk"
		// map类型
		/*
			params = map[string]interface{}{
				"DiskIds": []string{"disk1", "disk2"},
			}
		*/
	)

	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
	}

	res := common.DoHttpPost(action, common.EbsUrl, http.MethodPost, body)
	return res, nil
}

type TerminateDisksRequest struct {
	DiskIds []string `json:"DiskIds"`
}

// TerminateDisks 删除云盘示例 说明：https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#2deletedisk
func TerminateDisks(request TerminateDisksRequest) (common.CommonReturn, error) {
	action := "DeleteDisk"

	// map方式传参
	params := map[string]interface{}{
		"DiskIds": request.DiskIds,
	}

	// 结构体传参方式实例
	// params := request

	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
	}

	res := common.DoHttpPost(action, common.EbsUrl, http.MethodPost, body)
	return res, nil
}

type DescribeDiskRequest struct {
	DiskId string `json:"DiskId"` //云盘id
}

type DescribeDiskResp struct {
	DiskInfo Disk `json:"DiskInfo"`
}

type Disk struct {
	DiskId              string `json:"DiskId"`              //地域code
	DiskName            string `json:"DiskName"`            //云盘名称
	Size                int    `json:"Size"`                //云盘ID
	EcsId               string `json:"EcsId"`               //挂载的实例，未挂载为空
	EcsName             string `json:"EcsName"`             //挂载实例的名称，未挂载为空
	BillingMethod       string `json:"BillingMethod"`       //0:按需计费, 1:包年包月
	ReleaseWithInstance int    `json:"ReleaseWithInstance"` //是否随实例删除，1:是，0:否
	RegionCode          string `json:"RegionCode"`          //地域code
	AvailableZoneCode   string `json:"AvailableZoneCode"`   //可用区code
	Status              string `json:"Status"`              //状态code
	StatusDisplay       string `json:"StatusDisplay"`       //状态说明
	DiskFeature         string `json:"DiskFeature"`         //盘类型
	Property            string `json:"Property"`            //system:系统盘 data：数据盘
}

// DescribeDisk 云盘详情示例 说明：https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#8describedisk
func DescribeDisk(diskId string) (common.CommonReturn, error) {
	action := "DescribeDisk"
	body, err := json.Marshal(map[string]interface{}{
		"DiskId": diskId,
	})
	if err != nil {
		return common.CommonReturn{}, err
	}
	res := common.DoHttpPost(action, common.EbsUrl, http.MethodGet, body)
	return res, nil
}

// DescribeDiskQuota 查询云盘配额示例 说明：https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#6describediskquota

// DescribeDiskQuotaRequest 查询云盘配额入参
type DescribeDiskQuotaRequest struct {
	AvailableZoneCode string `json:"AvailableZoneCode"`
}

// DescribeDiskQuotaData 查询云盘配额返回data结构
type DescribeDiskQuotaData struct {
	// 配额列表
	QuotaList []QuotaList `json:"QuotaList"`
}
type QuotaList struct {
	TotalQuota  int    `json:"TotalQuota"`  // 总配额,单位:GB
	UsedQuota   int    `json:"UsedQuota"`   // 已用配额,单位:GB
	FreeQuota   int    `json:"FreeQuota"`   // 剩余配额,单位:GB
	DiskFeature string `json:"DiskFeature"` // 云盘类型
}

// DescribeDiskQuotaData 查询云盘配额
func DescribeDiskQuota(availableZoneCode string) (common.CommonReturn, error) {
	action := "DescribeDiskQuota"
	params := map[string]interface{}{
		// 可用区Code  必传项，首云接口目前只支持根据可用区查云盘配额
		"AvailableZoneCode": availableZoneCode,
	}

	// 结构体传参方式实例
	//params := DescribeDiskQuotaRequest{
	//	AvailableZoneCode: "CN_Suqian_A",
	//}

	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
	}

	res := common.DoHttpPost(action, common.EbsUrl, http.MethodGet, body)
	// 将返回值反序列化为结构体
	bytes, err := json.Marshal(res.Data)
	data := DescribeDiskQuotaData{}
	err = json.Unmarshal(bytes, &data)

	return res, nil
}

// DescribeSnapshots 查询云盘快照列表
func DescribeSnapshots() (common.CommonReturn, error) {
	action := "DescribeSnapshotList"
	method := "GET"
	params := map[string]interface{}{
		"AvailableZoneCode": "CN_Suqian_A",
		"RegionCode":        "CN_Suqian",
		// "DiskId":            "",
		"PageNumber": 1,
		"PageSize":   20,
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
	}
	res := common.DoHttpPost(action, common.EbsUrl, method, body)
	fmt.Printf(">>>>>>> request result: %v", res)
	return res, nil
}

// 获取快照列表请求体
type DescribeSnapshotsRequest struct {
	AvailableZoneCode string `json:"AvailableZoneCode"` //可用区Code
	RegionCode        string `json:"RegionCode"`        //地域Code
	DiskId            string `json:"DiskId"`            //云盘ID
	PageNumber        int    `json:"PageNumber"`        //页码
	PageSize          int    `json:"PageSize"`          //每页记录数
}

// 获取快照列表返回数据体
type DescribeSnapshotsData struct {
	SnapshotList []SnapshotList `json:"SnapshotList"`
}

// 快照数据
type SnapshotList struct {
	SnapshotId        string `json:"SnapshotId"`        //快照ID
	SnapshotName      string `json:"SnapshotName"`      //快照名称
	DiskId            string `json:"DiskId"`            //云盘ID
	DiskName          string `json:"DiskName"`          //云盘名称
	DiskSize          int    `json:"DiskSize"`          //盘容量，单位GB
	ReservedTime      string `json:"ReservedTime"`      //Forever:永久保留，当云盘删除时快照跟随云盘删除；具体数字为保留天数。
	SnapshotStatus    string `json:"SnapshotStatus"`    //快照状态
	CreateTime        string `json:"CreateTime"`        //快照创建时间
	RegionCode        string `json:"RegionCode"`        //地域Code
	AvailableZoneCode string `json:"AvailableZoneCode"` //可用区Code
	DiskProperty      string `json:"DiskProperty"`      //system:系统盘 data数据盘
}

// CreateSnapshot 创建单个云盘快照
func CreateSnapshot() (common.CommonReturn, error) {
	action := "CreateSnapshot"
	method := "POST"
	params := map[string]interface{}{
		"DiskId":       "disk-xxx",
		"SnapshotName": "test-openapi-create",
		"ReservedTime": "1",
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
	}
	res := common.DoHttpPost(action, common.EbsUrl, method, body)
	fmt.Printf(">>>>>>> request result: %v", res)
	return res, nil
}

// 创建快照请求体
type CreateSnapshotRequest struct {
	DiskId       string `json:"DiskId"`       //云盘ID,必传字段
	SnapshotName string `json:"SnapshotName"` //快照名称,不传默认与快照id一致，快照名称允许使用2-128个字符，不允许使用auto作为开头，允许大小写字母、数字、汉字和“-”。
	ReservedTime string `json:"ReservedTime"` //快照保留时间,不传递该参数默认为1。Forever:永久保留，当云盘删除时快照跟随云盘删除；具体数字为保留天数。
}

// 创建快照返回数据体
type CreateSnapshotData struct {
	EventId    string `json:"EventId"` //事件ID
	SnapshotId string `json:"SnapshotId"`
}

// 删除快照请求体
type DeleteSnapshotsRequest struct {
	// 想要删除的快照ID列表
	SnapshotIds []string `json:"SnapshotIds"`
}

// 删除快照返回数据结构体
type DeleteSnapshotsResponse struct {
	EventId string `json:"EventId"`
}

// DeleteSnapshots 删除快照
func DeleteSnapshots(request DeleteSnapshotsRequest) (DeleteSnapshotsResponse, error) {
	action := "DeleteSnapshot"
	method := "POST"

	// map方式传参
	params := map[string]interface{}{
		"SnapshotIds": request.SnapshotIds,
	}

	// 结构体传参方式实例
	// params := DeleteSnapshotsRequest

	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("json序列化失败:", err.Error())
	}

	res := common.DoHttpPost(action, common.EbsUrl, method, body)
	bytes, err := json.Marshal(res.Data)
	if err != nil {
		fmt.Println("json序列化失败:", err.Error())
	}
	data := DeleteSnapshotsResponse{}
	err = json.Unmarshal(bytes, &data)
	if err != nil {
		fmt.Println("json反序列化失败:", err.Error())
	}
	fmt.Printf(">>>>>>> request result: %v", res)
	return data, nil
}

// 云盘列表信息结构体
type DiskInfo struct {
	DiskId              string `json:"DiskId"`
	DiskName            string `json:"DiskName"`
	Size                int    `json:"Size"`
	EcsId               string `json:"EcsId"`
	EcsName             string `json:"EcsName"`
	BillingMethod       string `json:"BillingMethod"`
	ReleaseWithInstance int    `json:"ReleaseWithInstance"`
	RegionCode          string `json:"RegionCode"`
	AvailableZoneCode   string `json:"AvailableZoneCode"`
	Status              string `json:"Status"`
	StatusDisplay       string `json:"StatusDisplay"`
	DiskFeature         string `json:"DiskFeature"`
	Property            string `json:"Property"`
}

func DescribeDiskList() (common.CommonReturn, error) {
	var (
		action = "DescribeDiskList"
		params = map[string]interface{}{
			"DiskIds": []string{"disk-r28if0vrh1e1auuw"},
		}
	)
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
	}
	res := common.DoHttpPost(action, common.EbsUrl, http.MethodPost, body)
	return res, nil
}
