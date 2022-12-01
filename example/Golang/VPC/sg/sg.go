package sg

import (
	"encoding/json"
	"example/VPC/common"
	"fmt"
	"net/http"
)

const SgUrl = ""

func MakeArrayParam(l []string) string {
	if len(l) > 1 {
		b, _ := json.Marshal(l)
		return string(b)
	} else if len(l) == 1 {
		return l[0]
	} else {
		return ""
	}
}

// 查看安全组详情
type DescribeSecurityGroupsResp struct {
	TotalCount       int                            `json:"TotalCount"`
	SecurityGroupSet []DescribeSecurityGroupSetInfo `json:"SecurityGroupSet"`
}

type DescribeSecurityGroupSetInfo struct {
	SecurityGroupId     string      `json:"SecurityGroupId"`
	SecurityGroupName   string      `json:"SecurityGroupName"`
	SecurityGroupRegion string      `json:"SecurityGroupRegion"`
	InstanceCount       int         `json:"InstanceCount"`
	IpCount             int         `json:"IpCount"`
	CreatedTime         interface{} `json:"CreatedTime"`
	UpdateTime          interface{} `json:"UpdateTime"`
	SecurityGroupDesc   string      `json:"SecurityGroupDesc"`
	GroupInterconnected bool        `json:"GroupInterconnected"`
}

func DescribeSecurityGroups() (DescribeSecurityGroupsResp, error) {
	var (
		action = "DescribeSecurityGroups"
	)
	params := map[string]interface{}{
		"RegionCode": "SR_SaintPaul",
		"PageNumber": 1,
		"PageSize":   10,
		// "SecurityGroupId": "sg-6gbo8grwf6mjndue",  // 根据安全组单一请求
		// "SecurityGroupId": MakeArrayParam([]string{"sg-6gbo8grwf6mjndue", "sg-r3i1nkrgf4mcnxui"}), // 根据安全组批量请求
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
		return DescribeSecurityGroupsResp{}, err
	}

	res := common.DoHttpPost(action, SgUrl, http.MethodGet, body)
	bytes, err := json.Marshal(res.Data)
	if err != nil {
		return DescribeSecurityGroupsResp{}, err
	}
	data := DescribeSecurityGroupsResp{}
	err = json.Unmarshal(bytes, &data)
	return data, err
}

// 创建安全组
type CreateSecurityGroupReq struct {
	RegionCode          string `json:"RegionCode"`
	GroupName           string `json:"SecurityGroupName"`
	GroupDescription    string `json:"SecurityGroupDescription"`
	GroupInterconnected bool   `json:"GroupInterconnected"`
}

func CreateSecurityGroup() (common.CommonReturn, error) {
	var (
		action = "CreateSecurityGroup"
	)
	params := CreateSecurityGroupReq{
		RegionCode:          "SR_SaintPaul",
		GroupName:           "gyx20221129",
		GroupDescription:    "",
		GroupInterconnected: true,
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
		return common.CommonReturn{}, err
	}
	res := common.DoHttpPost(action, SgUrl, http.MethodPost, body)
	return res, nil
}

// 修改安全组属性
func ModifySecurityGroupAttribute() (common.CommonReturn, error) {
	var (
		action = "ModifySecurityGroupAttribute"
	)
	params := map[string]interface{}{
		"SecurityGroupId":          "sg-hnycxsrrdvszkzbn",
		"SecurityGroupDescription": "描述修改",
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
		return common.CommonReturn{}, err
	}
	res := common.DoHttpPost(action, SgUrl, http.MethodPost, body)
	return res, nil
}

// 删除安全组
func DeleteSecurityGroup() (common.CommonReturn, error) {
	var (
		action = "DeleteSecurityGroup"
	)
	params := map[string]interface{}{
		"SecurityGroupId": "sg-em7aasr5cjhb4km3",
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
		return common.CommonReturn{}, err
	}
	res := common.DoHttpPost(action, SgUrl, http.MethodPost, body)
	return res, nil
}

// 安全组新增规则
type CreateSecurityGroupPoliciesReq struct {
	SecurityGroupId        string                       `json:"SecurityGroupId" `
	SecurityGroupPolicySet CreateSecurityGroupPolicySet `json:"SecurityGroupPolicySet"`
}

type CreateSecurityGroupPolicySet struct {
	Ingress []CreateSecurityPolicyInfo `json:"Ingress"`
	Egress  []CreateSecurityPolicyInfo `json:"Egress"`
}

type CreateSecurityPolicyInfo struct {
	Protocol          string `json:"Protocol"`
	PolicyDescription string `json:"PolicyDescription"`
	Port              string `json:"Port"`
	CidrBlock         string `json:"CidrBlock" `
	Priority          int    `json:"Priority" `
	Status            bool   `json:"Status" `
}

func CreateSecurityGroupPolicies() (common.CommonReturn, error) {
	var (
		action = "CreateSecurityGroupPolicies"
	)
	params := CreateSecurityGroupPoliciesReq{
		SecurityGroupId: "sg-hnycxsrrdvszkzbn",
		SecurityGroupPolicySet: CreateSecurityGroupPolicySet{
			Ingress: []CreateSecurityPolicyInfo{
				{
					Protocol:          "tcp",
					PolicyDescription: "入站规则描述",
					Port:              "80/90",
					CidrBlock:         "0.0.0.0/0",
					Priority:          1,
					Status:            true,
				},
				{
					Protocol:          "icmp",
					PolicyDescription: "入站规则描述",
					Port:              "1/1",
					CidrBlock:         "0.0.0.0/0",
					Priority:          2,
					Status:            false,
				},
			},
			Egress: []CreateSecurityPolicyInfo{
				{
					Protocol:          "tcp",
					PolicyDescription: "出站规则描述",
					Port:              "3306/3306",
					CidrBlock:         "0.0.0.0/0",
					Priority:          1,
					Status:            false,
				},
			},
		},
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
		return common.CommonReturn{}, err
	}
	res := common.DoHttpPost(action, SgUrl, http.MethodPost, body)
	return res, nil
}

// 查看安全组规则详情
type SecurityGroupPoliciesResp struct {
	SecurityGroupId        string                     `json:"SecurityGroupId"`
	SecurityGroupPolicySet SecurityGroupPolicySetResp `json:"SecurityGroupPolicySet"`
}

type SecurityGroupPolicySetResp struct {
	Ingress []SecurityPolicyInfoResp `json:"Ingress"`
	Egress  []SecurityPolicyInfoResp `json:"Egress"`
}

type SecurityPolicyInfoResp struct {
	SecurityGroupId   string `json:"SecurityGroupId"`
	PolicyID          string `json:"PolicyId"`
	Protocol          string `json:"Protocol"`
	PolicyDescription string `json:"PolicyDescription"`
	Port              string `json:"Port"`
	CidrBlock         string `json:"CidrBlock"`
	Priority          int    `json:"Priority"`
	Status            bool   `json:"Status"`
}

func DescribeSecurityGroupPolicies() (SecurityGroupPoliciesResp, error) {
	var (
		action = "DescribeSecurityGroupPolicies"
	)
	params := map[string]interface{}{
		"SecurityGroupId": "sg-hnycxsrrdvszkzbn", // 根据安全组单一请求
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
		return SecurityGroupPoliciesResp{}, err
	}

	res := common.DoHttpPost(action, SgUrl, http.MethodGet, body)
	bytes, err := json.Marshal(res.Data)
	if err != nil {
		return SecurityGroupPoliciesResp{}, err
	}
	data := SecurityGroupPoliciesResp{}
	err = json.Unmarshal(bytes, &data)
	return data, err
}

// 删除安全组规则
type DelPolicyReq struct {
	SecurityGroupId string   `json:"SecurityGroupId"`
	PolicyIds       []string `json:"PolicyIds"`
}

func DeleteSecurityGroupPolicies() (common.CommonReturn, error) {
	var (
		action = "DeleteSecurityGroupPolicies"
	)
	params := DelPolicyReq{
		SecurityGroupId: "sg-hnycxsrrdvszkzbn",
		PolicyIds:       []string{"sp-v8m111r9lb1vafn0"},
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
		return common.CommonReturn{}, err
	}
	res := common.DoHttpPost(action, SgUrl, http.MethodPost, body)
	return res, nil
}

// 修改安全组规则
type ModifySecurityGroupPoliciesReq struct {
	SecurityGroupId        string                       `json:"SecurityGroupId"`
	SecurityGroupPolicySet ModifySecurityGroupPolicySet `json:"SecurityGroupPolicySet"`
	Reset                  bool                         `json:"Reset"`
}

type ModifySecurityGroupPolicySet struct {
	Ingress []ModifySecurityPolicyInfo `json:"Ingress"`
	Egress  []ModifySecurityPolicyInfo `json:"Egress"`
}

type ModifySecurityPolicyInfo struct {
	Protocol          string `json:"Protocol"`
	PolicyDescription string `json:"PolicyDescription" `
	Port              string `json:"Port"`
	CidrBlock         string `json:"CidrBlock"`
	Priority          int    `json:"Priority"`
	Status            bool   `json:"Status"`
	PolicyID          string `json:"PolicyId"`
}

func ModifySecurityGroupPolicies1() (common.CommonReturn, error) {
	var (
		action = "ModifySecurityGroupPolicies"
	)
	params := ModifySecurityGroupPoliciesReq{
		SecurityGroupId: "sg-hnycxsrrdvszkzbn",
		Reset:           true, // 覆盖之前规则
		SecurityGroupPolicySet: ModifySecurityGroupPolicySet{
			Ingress: []ModifySecurityPolicyInfo{
				{
					Protocol:          "tcp",
					PolicyDescription: "入站规则描述",
					Port:              "80/80",
					CidrBlock:         "0.0.0.0/0",
					Priority:          1,
					Status:            true,
				},
				{
					Protocol:          "icmp",
					PolicyDescription: "入站规则描述",
					Port:              "1/1",
					CidrBlock:         "0.0.0.0/0",
					Priority:          2,
					Status:            false,
				},
			},
			Egress: []ModifySecurityPolicyInfo{},
		},
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
		return common.CommonReturn{}, err
	}
	res := common.DoHttpPost(action, SgUrl, http.MethodPost, body)
	return res, nil
}

func ModifySecurityGroupPolicies2() (common.CommonReturn, error) {
	var (
		action = "ModifySecurityGroupPolicies"
	)
	params := ModifySecurityGroupPoliciesReq{
		SecurityGroupId: "sg-hnycxsrrdvszkzbn",
		Reset:           false, // 不覆盖之前规则，只修改指定id规则
		SecurityGroupPolicySet: ModifySecurityGroupPolicySet{
			Ingress: []ModifySecurityPolicyInfo{
				{
					PolicyID:          "sp-hi7hfarnlx19axn0",
					Protocol:          "tcp",
					PolicyDescription: "入站规则描述",
					Port:              "8080/8080",
					CidrBlock:         "0.0.0.0/0",
					Priority:          1,
					Status:            true,
				},
			},
		},
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
		return common.CommonReturn{}, err
	}
	res := common.DoHttpPost(action, SgUrl, http.MethodPost, body)
	return res, nil
}

// 安装组绑定实例
type AssociateSecurityGroupsReq struct {
	SecurityGroupId string             `json:"SecurityGroupId"`
	RegionCode      string             `json:"RegionCode"`
	InstanceSet     []InstanceSecurity `json:"InstanceSet"`
}

type InstanceSecurity struct {
	InstanceId            string `json:"InstanceId"`
	SecurityGroupPriority int    `json:"SecurityGroupPriority"`
}

func AssociateSecurityGroups() (common.CommonReturn, error) {
	var (
		action = "AssociateSecurityGroups"
	)
	params := AssociateSecurityGroupsReq{
		SecurityGroupId: "sg-hnycxsrrdvszkzbn",
		RegionCode:      "SR_SaintPaul",
		InstanceSet: []InstanceSecurity{
			{
				InstanceId:            "ins-ktqyh5rra9u7h6k1",
				SecurityGroupPriority: 5,
			},
		},
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
		return common.CommonReturn{}, err
	}
	res := common.DoHttpPost(action, SgUrl, http.MethodPost, body)
	return res, nil
}

// 安全组解绑实例
type DisassociateSecurityGroupsReq struct {
	SecurityGroupId string   `json:"SecurityGroupId"`
	InstanceIds     []string `json:"InstanceIds"`
}

func DisassociateSecurityGroups() (common.CommonReturn, error) {
	var (
		action = "DisassociateSecurityGroups"
	)
	params := DisassociateSecurityGroupsReq{
		SecurityGroupId: "sg-hnycxsrrdvszkzbn",
		InstanceIds:     []string{"ins-ktqyh5rra9u7h6k1"},
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
		return common.CommonReturn{}, err
	}
	res := common.DoHttpPost(action, SgUrl, http.MethodPost, body)
	return res, nil
}

type ModifySecurityGroupsPriorityReq struct {
	InstanceId       string                   `json:"InstanceId"`
	RegionCode       string                   `json:"RegionCode"`
	SecurityGroupSet []InstanceSecurityGroups `json:"SecurityGroupSet"`
}

type InstanceSecurityGroups struct {
	SecurityGroupId string `json:"SecurityGroupId"`
	Priority        int    `json:"Priority"`
}

// 修改/重置实例下安全组优先级
func ModifySecurityGroupsPriority() (common.CommonReturn, error) {
	var (
		action = "ModifySecurityGroupsPriority"
	)
	params := ModifySecurityGroupsPriorityReq{
		InstanceId: "ins-ktqyh5rra9u7h6k1",
		RegionCode: "SR_SaintPaul",
		SecurityGroupSet: []InstanceSecurityGroups{{
			SecurityGroupId: "sg-hnycxsrrdvszkzbn",
			Priority:        1,
		}},
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
		return common.CommonReturn{}, err
	}
	res := common.DoHttpPost(action, SgUrl, http.MethodPost, body)
	return res, nil
}

// 查看安全组下实例详情
func DescribeSecurityGroupAssociationStatistics() (common.CommonReturn, error) {
	var (
		action = "DescribeSecurityGroupAssociationStatistics"
	)
	params := map[string]interface{}{
		"SecurityGroupId": "sg-hnycxsrrdvszkzbn", // 根据安全组单一请求
	}
	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
		return common.CommonReturn{}, err
	}

	res := common.DoHttpPost(action, SgUrl, http.MethodGet, body)
	return res, err
}
