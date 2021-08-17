// 创建云主机 √
// 获取客户名称 √
// 地域可用区 √
// vpc、子网 √
// 计算规格 √
// 镜像 √
// 系统盘、数据盘规格 √
import service from '../http'

export default {
  get_customer_name(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/get_customer_name/',
      data: reqData
    })
  },
  get_region_az_list(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/region_az_info/',
      data: reqData
    })
  },
  get_net_list(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/net_info/',
      data: reqData
    })
  },
  get_spec_list(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/ecs_spec_info/',
      data: reqData
    })
  },
  get_os_list(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/ecs_os_info/',
      data: reqData
    })
  },
  get_disk_info(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/ecs_disk_info/',
      data: reqData
    })
  },
  create_instance(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/create_ecs/',
      data: reqData
    })
  }
}