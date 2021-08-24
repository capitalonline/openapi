// 获取列表
// 详情 √
// 电源操作分开接口 √
// 删除 √
// 恢复 √
// 销毁 √
// 操作记录 √
// 远程连接（vnc？）

import service from '../http'

export default {
  get_instance_list(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/ecs_list/',
      data: reqData
    })
  },
  operate_instance(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/operate/',
      data: reqData
    })
  },
  delete_instance(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/delete/',
      data: reqData
    })
  },
  recover_instance(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/recover/',
      data: reqData
    })
  },
  destroy_instance(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/destroy/',
      data: reqData
    })
  },
  get_status_list() {
    return service({
      method: 'GET',
      url: '/ecs_business/v1/ecs/ecs_status_list/'
    })
  },
  reset_password(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/ecs_reset_password/',
      data: reqData
    })
  },
  update_spec(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/ecs_change_configure/',
      data: reqData
    })
  },
  update_system(reqData) {
    return service({
      method: 'POST',
      url: '/ecs_business/v1/ecs/ecs_change_system/',
      data: reqData
    })
  }
}
