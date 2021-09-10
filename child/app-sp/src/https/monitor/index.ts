import service from '../http'
import { getMonitorOptions }from '../common'

export default {
  get_cpu(reqData) {
    return service(getMonitorOptions('GET', '/cpu_info', reqData))
  }
}
