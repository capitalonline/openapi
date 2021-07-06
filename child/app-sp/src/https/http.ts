import axios from 'axios'
import { Loading, Message } from "element-ui";

let instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})
console.log("process.env", process.env)
// 添加请求拦截器
instance.interceptors.request.use(
  config => {  // 发送请求之前做些什么
    return config
  },
  error => {   // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => { // 对响应数据做点什么
    if(response.status == 200) {
      return response.data
    }
  },
  error => { // 对响应错误做点什么
    if(error.response.status == 401) {
    } else {
      Message({ message: error.response.data.msg, type: "error" })
    }
    return Promise.reject(error.response.data)
  }
)

export default instance