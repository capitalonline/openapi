package test

import (
	"example/model"
	"fmt"
	"testing"
)

func TestCreateInstanceEcs(t *testing.T) {
	res, _ := model.CreateInstanceEcs()
	fmt.Println(res)
}

func TestDescribeRegions(t *testing.T) {
	res, _ := model.DescribeRegions()
	fmt.Println(res)
}

func TestDescribeEcsFamilyInfo(t *testing.T) {
	res, _ := model.DescribeEcsFamilyInfo()
	fmt.Println(res)
}

func TestDescribeImage(t *testing.T) {
	res, _ := model.DescribeImage()
	fmt.Println(res)
}
