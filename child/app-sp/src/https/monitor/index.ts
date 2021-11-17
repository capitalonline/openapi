import service from '../http'
import { getMonitorOptions }from '../common'
import { getGpuMonitorOptions }from '../common'

function FnHandleOptions(type) {
  let option = getMonitorOptions
  if (type === 'gpu') {
    option = getGpuMonitorOptions
  }
  return option
}
export default {
  get_cpu(type, reqData) {
    return service(FnHandleOptions(type)('GET', '/cpu_info', reqData))
  },
  get_disk(type, reqData) {
    return service(FnHandleOptions(type)('GET', '/disk_info', reqData))
  },
  get_load(type, reqData) {
    return service(FnHandleOptions(type)('GET', '/load_info', reqData))
  },
  get_memory(type, reqData) {
    return service(FnHandleOptions(type)('GET', '/memory_info', reqData))
  },
  get_network(type, reqData) {
    return service(FnHandleOptions(type)('GET', '/network_info', reqData))
  },
  get_gpu(type, reqData) {
    return service(FnHandleOptions(type)('GET','/gpu_info', reqData))
  }
}
