package ecs

import (
	"encoding/json"
	"example/VPC/common"
	"fmt"
	"net/http"
)

/*
CreateImage https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#16createimage
*/

type CreateImageReq struct {
	EcsId string `json:"EcsId"`
	Name  string `json:"Name"`
}

type CreateImageResp struct {
	EventId string `json:"EventId"`
	ImageId string `json:"ImageId"`
}

func CreateImage(params CreateImageReq) (common.CommonReturn, error) {
	var (
		action = "CreateImage"
		// map类型
		/*
			params = map[string]interface{}{
				"EcsId": "ins-x",
				"Name":"私有镜像xx",
			}
		*/
	)

	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
	}

	res := common.DoHttpPost(action, common.EcsUrl, http.MethodPost, body)
	return res, nil
}

/*
CreateInstance https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#11createinstance
*/

type CreateInstanceReq struct {
	AvailableZoneCode string     `json:"AvailableZoneCode"`
	EcsFamilyName     string     `json:"EcsFamilyName"`
	Cpu               int        `json:"Cpu"`
	Ram               int        `json:"Ram"`
	Gpu               int        `json:"Gpu"`
	Number            int        `json:"Number"`
	BillingMethod     string     `json:"BillingMethod"`
	ImageId           string     `json:"ImageId"`
	SystemDiskBody    SystemDisk `json:"SystemDisk"`
	DataDiskBody      DataDisk   `json:"DataDisk"`
	VpcInfoBody       VpcInfo    `json:"VpcInfo"`
	SubnetInfoBody    SubnetInfo `json:"SubnetInfo"`
	Name              string     `json:"Name"`
	StartNumber       int        `json:"StartNumber"`
	Password          string     `json:"Password"`
}

type SystemDisk struct {
	DiskFeature string `json:"DiskFeature"`
	Size        int    `json:"Size"`
}

type DataDisk struct {
	DiskFeature         string `json:"DiskFeature"`
	Size                int    `json:"Size"`
	ReleaseWithInstance int    `json:"ReleaseWithInstance"`
}
type VpcInfo struct {
	VpcId string `json:"VpcId"`
}

type SubnetInfo struct {
	SubnetId string `json:"SubnetId"`
}

type CreateInstanceResp struct {
	EcsIdSet []interface{} `json:"EcsIdSet"`
	EventId  string        `json:"EventId"`
}

func CreateInstance(params CreateInstanceReq) (common.CommonReturn, error) {
	var (
		action = "CreateInstance"
	)

	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
	}

	res := common.DoHttpPost(action, common.EcsUrl, http.MethodPost, body)
	return res, nil
}
