package test

import (
	"example/VDC/model"
	"fmt"
	"testing"
)

func TestDescribeBill(t *testing.T) {
	res, _ := model.DescribeBill()
	fmt.Println(res)
}

func TestDescribeBillInfo(t *testing.T) {
	res, _ := model.DescribeBillInfo()
	fmt.Println(res)
}

func TestDescribeBillDetail(t *testing.T) {
	res, _ := model.DescribeBillDetail()
	fmt.Println(res)
}
func TestDescribeAccountInfo(t *testing.T) {
	res, _ := model.DescribeAccountInfo()
	fmt.Println(res)
}
