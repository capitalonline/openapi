package common

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha1"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"sort"
	"strings"
	"time"

	"encoding/json"

	"github.com/google/uuid"
)

var (
	SecretId  = "ak"
	SecretKey = "sk"
)

const EbsUrl = "https://api.capitalonline.net/ebs/v1"
const EcsUrl = "https://api.capitalonline.net/ecs/v1"

func percentEncode(str string) string {
	str = url.QueryEscape(str)
	str = strings.Replace(str, "+", "%20", -1)
	str = strings.Replace(str, "*", "%2A", -1)
	str = strings.Replace(str, "%7E", "~", -1)
	return str
}

func getUrlQueriesEncoded(params map[string]string) string {
	values := url.Values{}
	for key, value := range params {
		if value != "" && key != "SecretId" {
			values.Add(key, value)
		}
	}
	return values.Encode()
}

func sign(method, secretKey string, params map[string]string) string {
	var paramsKeys sort.StringSlice
	for k, _ := range params {
		paramsKeys = append(paramsKeys, k)
	}
	sort.Sort(paramsKeys)
	var urlStr string
	for _, k := range paramsKeys {
		urlStr += "&" + percentEncode(k) + "=" + percentEncode(params[k])
	}
	s := method + "&%2F&" + percentEncode(urlStr[1:])

	hashed := hmac.New(sha1.New, []byte(secretKey))
	hashed.Write([]byte(s))
	return base64.StdEncoding.EncodeToString(hashed.Sum(nil))
}

func getSignedURL(action, url, reqMethod string, param []byte) string {
	signMethod := "HMAC-SHA1"
	request := map[string]string{
		"AccessKeyId":      SecretId,
		"Action":           action,
		"Timestamp":        time.Now().UTC().Format("2006-01-02T15:04:05Z"),
		"SignatureMethod":  signMethod,
		"SignatureNonce":   uuid.New().String(),
		"SignatureVersion": "1.0",
		"Version":          "2019-08-08",
	}

	if len(param) > 0 && reqMethod == "GET" {
		par := make(map[string]interface{})
		err := json.Unmarshal(param, &par)
		if err != nil {
			panic(err)
		}
		for k, v := range par {
			request[k] = fmt.Sprintf("%v", v)
		}
	}

	signature := sign(reqMethod, SecretKey, request)
	request["Signature"] = signature
	signedURL := url + "?" + getUrlQueriesEncoded(request)
	return signedURL
}

type CommonReturn struct {
	Code       string
	Data       interface{}
	Message    string
	PageCount  int
	PageNumber int
	TaskId     string
}

func DoHttpPost(action, url, method string, reqBody []byte) CommonReturn {
	fmt.Println("ReqBody: ", string(reqBody))

	signedURL := getSignedURL(action, url, method, reqBody)
	req, _ := http.NewRequest(method, signedURL, bytes.NewBuffer(reqBody))
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("response Status:", resp.Status)
	// fmt.Println("response Headers:", resp.Header)
	body, _ := io.ReadAll(resp.Body)
	//fmt.Println("response Body:", string(body))

	commonReturn := CommonReturn{}
	json.Unmarshal(body, &commonReturn)
	return commonReturn
}

/*
事件接口示例说明：首云大多数响应都是返回一个事件id，然后根据事件id来查询相应的资源id
*/

// DescribeEvent 事件查询 https://github.com/capitalonline/openapi/blob/master/%E9%A6%96%E4%BA%91OpenAPI(v1.2).md#10describeevent

type EventResp struct { // Event响应结构（若需则使用），也可以使用map接受映射
	EventId            string     `json:"EventId"`            // 事件id
	EventStatus        string     `json:"EventStatus"`        // 事件状态
	EventStatusDisplay string     `json:"EventStatusDisplay"` // 事件中文名称
	EventType          string     `json:"EventType"`          // 事件类型
	EventTypeDisplay   string     `json:"EventTypeDisplay"`   // 事件类型中文名称
	CreateTime         string     `json:"CreateTime"`         // 创建时间
	TaskList           []struct { // 事件下的任务列表
		TaskId          string `json:"TaskId"`          // 任务id
		Status          string `json:"Status"`          // 任务状态
		StatusDisplay   string `json:"StatusDisplay"`   // 任务中文状态
		ResourceId      string `json:"ResourceId"`      // *任务对应的资源id
		CreateTime      string `json:"CreateTime"`      // 任务创建时间
		UpdateTime      string `json:"UpdateTime"`      // 任务更新时间
		EndTime         string `json:"EndTime"`         // 任务完成时间，未完成则为空
		ResourceType    string `json:"ResourceType"`    // 资源类型
		ResourceDisplay string `json:"ResourceDisplay"` // 资源类型中文名称
		TaskType        string `json:"TaskType"`        // 任务类型
		TaskTypeDisplay string `json:"TaskTypeDisplay"` // 任务类型中文名称
	} `json:"TaskList"`
}

func DescribeEvent(eventId string) (CommonReturn, error) {
	var (
		action = "DescribeEvent"
		params = map[string]interface{}{
			"EventId": eventId,
		}
	)

	body, err := json.Marshal(params)
	if err != nil {
		fmt.Println("反序列化失败：", err.Error())
	}

	res := DoHttpPost(action, EbsUrl, http.MethodGet, body)
	return res, nil
}
