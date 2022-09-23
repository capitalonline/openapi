package model

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha1"
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"sort"
	"strings"
	"time"

	"encoding/json"
	"github.com/google/uuid"
)

var (
	SecretId  = ""
	SecretKey = ""
)

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
		par := make(map[string]string)
		err := json.Unmarshal(param, &par)
		if err != nil {
			panic(err)
		}
		for k, v := range par {
			request[k] = v
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

func doHttpPost(action, url, method string, reqBody []byte) CommonReturn {
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
	fmt.Println("response Headers:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println("response Body:", string(body))

	commonReturn := CommonReturn{}
	json.Unmarshal(body, &commonReturn)
	return commonReturn
}
