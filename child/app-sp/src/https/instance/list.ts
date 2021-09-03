import service from '../http'
import { getEcsOptions }from '../common'

export default {
  get_instance_list(reqData) {
    return service(getEcsOptions('GET', '/ecs/ecs_list/', reqData))
  },
  operate_instance(reqData) {
    return service(getEcsOptions('POST', '/ecs/operate/', reqData))
  },
  delete_instance(reqData) {
    return service(getEcsOptions('POST', '/ecs/delete/', reqData))
  },
  recover_instance(reqData) {
    return service(getEcsOptions('POST', '/ecs/recover/', reqData))
  },
  destroy_instance(reqData) {
    return service(getEcsOptions('POST', '/ecs/destroy/', reqData))
  },
  get_status_list() {
    return service(getEcsOptions('GET', '/ecs/ecs_status_list/'))
  },
  reset_password(reqData) {
    return service(getEcsOptions('POST', '/ecs/ecs_reset_password/', reqData))
  },
  update_spec(reqData) {
    return service(getEcsOptions('POST', '/ecs/ecs_change_configure/', reqData))
  },
  update_system(reqData) {
    return service(getEcsOptions('POST', '/ecs/ecs_change_system/', reqData))
  },
  get_usage_ip(reqData) {
    return service(getEcsOptions('GET', '/ecs/get_deleted_ecs_ip/', reqData))
  }
}
