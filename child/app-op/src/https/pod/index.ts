// pod管理
import service from "../http"
import { getEcsOptions } from '../common'

export default {
  // 获取POD列表
  get_pod_list(req) {
    return service(getEcsOptions('GET','/pod/get_pod_list/',req))
  },
  // 根据az_id获取az_name
  get_az_info(req) {
    return service(getEcsOptions('GET','/pod/get_pod_info/',req))
  },
  // 添加pod
  create_pod(req) {
    return service(getEcsOptions('POST', '/pod/create_pod/', req))
  },
  // 修改pod
  update_pod(req) {
    return service(getEcsOptions('POST', '/pod/update_pod/', req))
  },
  // 获取操作记录
  get_pod_history(req) {
    return service(getEcsOptions('GET','/pod/get_pod_history/',req))
  }
}
