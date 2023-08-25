import service from '../http'
import { getEcsOptions }from '../common'

export default {
  get_log_list(reqData) {
    return service(getEcsOptions('POST', '/audit/get_operation_log_list/', reqData))
  }
}
