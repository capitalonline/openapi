package test

import (
	"OpenAPI-GO/model"
	"fmt"
	"testing"
)

func TestCreateInstanceEcs(t *testing.T) {
	res := model.CreateInstanceEcs()
	fmt.Println(res)
}

func TestDescribeRegions(t *testing.T) {
	res := model.DescribeRegions()
	fmt.Println(res)
}

func TestDescribeEcsFamilyInfo(t *testing.T) {
	res := model.DescribeEcsFamilyInfo()
	fmt.Println(res)
}

func TestDescribeImage(t *testing.T) {
	res := model.DescribeImage()
	fmt.Println(res)
}
