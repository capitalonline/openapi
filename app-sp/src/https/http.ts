import axios from 'axios'

let instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

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
    if(response.data.code !== 'Success') {
      
    } 
    return response.data
  },
  error => { // 对响应错误做点什么
    if(error.response.status == "401") {
    }
    return Promise.reject(error)
  }
)

export default instance