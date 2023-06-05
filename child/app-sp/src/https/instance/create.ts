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
  get_all_cpu_ram() {
    return service(getEcsOptions('GET', '/ecs/ram_cpu_list/'))
  },
  get_category_list(reqData) {
    return service(getEcsOptions('GET', '/ecs/ecs_category_list/', reqData))
  },
  ecs_family_info(reqData) {
    return service(getEcsOptions('GET', '/ecs/ecs_family_info/', reqData))
  },
  get_os_list(reqData) {
    return service(getEcsOptions('POST', '/img/image_info/', reqData))
  },
  get_price(reqData) {
    return service(getEcsOptions('POST', '/ecs/get_price/', reqData))
  },
  create_instance(reqData) {
    return service(getEcsOptions('POST', '/ecs/create_ecs/', reqData))
  },
  get_ecs_limit(reqData) {
    return service(getEcsOptions('POST', '/ecs/get_ecs_limit/', reqData))
  },
  
}
