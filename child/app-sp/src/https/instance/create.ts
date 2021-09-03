import service from '../http'
import { getEcsOptions }from '../common'

export default {
  get_customer_name(reqData) {
    return service(getEcsOptions('POST', '/ecs/get_customer_name/', reqData))
  },
  get_region_az_list(reqData) {
    return service(getEcsOptions('POST', '/ecs/region_az_info/', reqData))
  },
  get_net_list(reqData) {
    return service(getEcsOptions('POST', '/ecs/net_info/', reqData))
  },
  get_spec_list(reqData) {
    return service(getEcsOptions('POST', '/ecs/ecs_spec_info/', reqData))
  },
  get_os_list(reqData) {
    return service(getEcsOptions('POST', '/img/image_info/', reqData))
  },
  create_instance(reqData) {
    return service(getEcsOptions('POST', '/ecs/create_ecs/', reqData))
  }
}