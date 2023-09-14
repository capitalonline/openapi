// 事件列表
import service from "../http"
import { getEcsOptions }from '../common'
import qs from "qs";

export default {
  //获取显卡信息
  get_gpu_list(req) {
    return service(getEcsOptions('GET', '/host/gpu_list/', req))
  },
  //编辑显卡
  post_edit_gpu(req) {
    return service(getEcsOptions('POST', '/host/edit_gpu/', req))
  },
  //获取显卡记录
  get_gpu_record(req) {
    return service(getEcsOptions('GET', '/host/get_gpu_record/', req))
  },
  // 导出excel
  gpu_record_download(req) {
    return service({
      method: 'GET',
      url: '/ecs_business/v1/host/gpu_record_download/',
      params: req,
      paramsSerializer: params => qs.stringify(params),
      responseType: 'blob'
    })
  },
}
