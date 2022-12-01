package sg

import (
	"fmt"
	"testing"
)

func TestDescribeSecurityGroups(t *testing.T) {
	data, err := DescribeSecurityGroups()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(data)
	}
}

func TestCreateSecurityGroup(t *testing.T) {
	data, err := CreateSecurityGroup()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(data)
	}
}

func TestModifySecurityGroupAttribute(t *testing.T) {
	data, err := ModifySecurityGroupAttribute()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(data)
	}
}

func TestDeleteSecurityGroup(t *testing.T) {
	data, err := DeleteSecurityGroup()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(data)
	}
}

func TestCreateSecurityGroupPolicies(t *testing.T) {
	data, err := CreateSecurityGroupPolicies()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(data)
	}
}

func TestDescribeSecurityGroupPolicies(t *testing.T) {
	data, err := DescribeSecurityGroupPolicies()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(data)
	}
}

func TestDeleteSecurityGroupPolicies(t *testing.T) {
	data, err := DeleteSecurityGroupPolicies()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(data)
	}
}

func TestModifySecurityGroupPolicies1(t *testing.T) {
	data, err := ModifySecurityGroupPolicies1()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(data)
	}
}

func TestModifySecurityGroupPolicies2(t *testing.T) {
	data, err := ModifySecurityGroupPolicies2()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(data)
	}
}

func TestAssociateSecurityGroups(t *testing.T) {
	data, err := AssociateSecurityGroups()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(data)
	}
}

func TestDisassociateSecurityGroups(t *testing.T) {
	data, err := DisassociateSecurityGroups()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(data)
	}
}

func TestModifySecurityGroupsPriority(t *testing.T) {
	data, err := ModifySecurityGroupsPriority()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(data)
	}
}

func TestDescribeSecurityGroupAssociationStatistics(t *testing.T) {
	data, err := DescribeSecurityGroupAssociationStatistics()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(data)
	}
}
