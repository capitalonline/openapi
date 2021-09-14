import service from '../http'
import { getMonitorOptions }from '../common'

export default {
  get_cpu(reqData) {
    return service(getMonitorOptions('GET', '/cpu_info', reqData))
  },
  get_disk(reqData) {
    return service(getMonitorOptions('GET', '/disk_info', reqData))
  },
  get_load(reqData) {
    return service(getMonitorOptions('GET', '/load_info', reqData))
  },
  get_memory(reqData) {
    return service(getMonitorOptions('GET', '/memory_info', reqData))
  },
  get_network(reqData) {
    return service(getMonitorOptions('GET', '/network_info', reqData))
  }
}
