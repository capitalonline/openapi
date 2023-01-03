import axios from 'axios';
import { Loading, Message } from "element-ui";
import store from '../store';
import uuid from '../utils/uuid';
import cookie from '../store/cookie';

let instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})
let loadingOptions = {
  lock: true,
  text: '请求加载中...',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.3)',
  customClass: "loading"
}
let loadingInstance;
let loadingCount = 0;

// 添加请求拦截器
instance.interceptors.request.use(
  config => {  // 发送请求之前做些什么
    if (store.state.loadingStatus) {
      loadingCount++;
      loadingInstance = Loading.service(loadingOptions);
    }
    config.headers["Access-Token"] = store.state.token;
    config.headers["X-Request-Id"] = uuid();
    return config
  },
  error => {   // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => { // 对响应数据做点什么
    loadingCount--;
    if (loadingCount <= 0) {
      loadingInstance.close();
    }
    if (response.status == 200 && response.data) {
      if (response.data.code === 'Unauthorized') {
        const sso_url = response.data.data.sso || process.env.VUE_APP_SSO_URL;
        window.location.href = sso_url + '?referer=' + window.location.href.split('?')[0];
      } else if (response.data.code === 'Success' || response.data.code === 0 || response.data instanceof Blob)  {
        return response.data
      } else {
        Message({ message: response.data.message || response.data.msg, type: 'error' })
        return response.data
      }
    }
  },
  error => { // 对响应错误做点什么
    loadingCount--;
    if (loadingCount <= 0) {
      loadingInstance.close();
    }
    if(error.response.status == 401) {
    } else {
      
      Message({ message: error.response.data.msg || error.response.data, type: 'error' })
    }
    return Promise.reject(error.response.data)
  }
)

export default instance
