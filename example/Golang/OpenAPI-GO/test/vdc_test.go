package test

import (
	"testing"
	"OpenAPI-GO/model"
	"fmt"
)

func TestDescribeVdc(t *testing.T)  {
	result := model.DescribeVdc("", "", "")
	fmt.Printf("%v", string(result))
}
