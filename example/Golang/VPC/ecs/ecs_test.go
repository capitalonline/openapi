package ecs

import (
	"encoding/json"
	"example/VPC/common"
	"fmt"
	"log"
	"testing"
)

func TestCreateImage(t *testing.T) {
	var (
		resp common.CommonReturn
		err  error
	)
	resp, err = CreateImage(CreateImageReq{
		EcsId: "ins-x", // 实例需要关机
		Name:  "image_demo",
	})
	if err != nil {
		log.Fatalln(resp, err)
	}
	log.Println(resp.Data)
	if resp.Code == "Success" && resp.Data != nil {
		bytes, _ := json.Marshal(resp.Data)
		data := CreateImageResp{}
		_ = json.Unmarshal(bytes, &data)
		fmt.Println(data)
	}
}

func TestCreateInstance(t *testing.T) {
	var (
		resp common.CommonReturn
		err  error
	)
	resp, err = CreateInstance(CreateInstanceReq{})
	if err != nil {
		log.Fatalln(resp, err)
	}
	log.Println(resp.Data)
	if resp.Code == "Success" && resp.Data != nil {
		bytes, _ := json.Marshal(resp.Data)
		data := CreateInstanceResp{}
		_ = json.Unmarshal(bytes, &data)
		fmt.Println(data)
	}
}
