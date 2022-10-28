package ebs

import (
	"encoding/json"
	"example/VPC/common"
	"fmt"
	"log"
	"testing"
)

// 创建云盘测试
func TestCreateDisk(t *testing.T) {
	var (
		resp common.CommonReturn
		err  error
	)
	resp, err = CreateDisk(CreateDiskReq{
		AvailableZoneCode:   "CN_Suqian_B",
		EcsId:               "",
		ReleaseWithInstance: 0,
		DiskName:            "demo_gyx3",
		DiskFeature:         "SSD",
		Size:                24,
		Number:              1,
		BillingMethod:       "0",
	})
	if err != nil {
		log.Fatalln(err)
	}
	if resp.Code == "Success" && resp.Data != nil {
		bytes, _ := json.Marshal(resp.Data)
		data := CreateDiskResp{}
		_ = json.Unmarshal(bytes, &data)
		fmt.Println(data)
	}
}

// 挂载云盘测试
func TestAttachDiskReq(t *testing.T) {
	var (
		resp common.CommonReturn
		err  error
	)
	resp, err = AttachDisk(AttachDiskReq{
		DiskIds:             []string{"disk-xxx"},
		EcsId:               "ins-xxx",
		ReleaseWithInstance: 1,
	})
	if err != nil {
		log.Fatalln(err)
	}
	log.Printf("%#v\n", resp)

}

// 卸载云盘测试
func TestDetachDiskReq(t *testing.T) {
	var (
		resp common.CommonReturn
		err  error
	)
	resp, err = DetachDisk(AttachDiskReq{
		DiskIds: []string{""},
	})
	if err != nil {
		log.Fatalln(err)
	}
	log.Printf("%#v\n", resp)

}

// 获取云盘详情测试
func TestDescribeDisk(t *testing.T) {
	res, err := DescribeDisk("")
	if err != nil {
	}
	log.Println(res)
}

// 获取云盘配额测试
func TestDescribeDiskQuota(t *testing.T) {
	res, err := DescribeDiskQuota("CN_Suqian_B")
	if err != nil {
	}
	log.Println(res)
}

// 删除云盘测试
func TestTerminateDisks(t *testing.T) {
	res, err := TerminateDisks(TerminateDisksRequest{
		DiskIds: []string{""},
	})
	if err != nil {
	} else {
		log.Println(res)
	}
}

// 获取快照信息测试
func TestDescribeSnapshots(t *testing.T) {
	res, err := DescribeSnapshots()
	if err != nil {
	}
	fmt.Println(res)
}

// 创建快照测试
func TestCreateSnapshot(t *testing.T) {
	resp, err := CreateSnapshot()
	if err != nil {
		if resp.Data != nil {
			bytes, _ := json.Marshal(resp.Data)
			data := CreateSnapshotData{}
			_ = json.Unmarshal(bytes, &data)
			fmt.Println(data)
		}
	}
	fmt.Println(resp)
}

// 删除快照测试
func TestDeleteSnapshots(t *testing.T) {
	request := DeleteSnapshotsRequest{
		SnapshotIds: []string{"s-disk-xxx1", "s-disk-xxx2"},
	}
	res, err := DeleteSnapshots(request)
	if err != nil {
	} else {
		fmt.Println(res)
	}
}
