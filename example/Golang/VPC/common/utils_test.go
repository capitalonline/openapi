package common

import (
	"log"
	"testing"
)

// 事件测试
func TestDescribeEvent(t *testing.T) {
	if eventResp, err := DescribeEvent("xxxx"); err == nil {
		if eventResp.Code == "Success" && eventResp.Data != nil {
			log.Printf("%#v /n", eventResp)
		}
	}
}
