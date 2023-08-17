import service from '../http'
import { getEcsOptions }from '../common'
import qs from 'qs'

export default {
  get_instance_list(reqData) {
    return service(getEcsOptions('POST', '/ecs/ecs_list/', reqData))
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
  get_family_data() {
    return service(getEcsOptions('GET', '/ecs/get_family_data/'))
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
  },
  get_vnc_url(reqData) {
    return service(getEcsOptions('GET', '/ecs/vnc_info/', reqData))
  },
  start_charge(reqData) {
    return service(getEcsOptions('POST', '/resource/start_charge/', reqData))
  },
  change_config_price(reqData) {
    return service(getEcsOptions('POST', '/ecs/change_config_price/', reqData))
  },
  change_system_price(reqData) {
    return service(getEcsOptions('POST', '/ecs/change_system_price/', reqData))
  },
  // 开启计费获取价格
  each_resource_price(reqData) {
    return service(getEcsOptions('POST', '/ecs/each_resource_price/', reqData))
  },
  //制作公共镜像
  add_common_mirror(reqData) {
    return service(getEcsOptions('POST', '/img/create_pub_image_by_ecs/', reqData))
  },
  //网卡设置
  set_net(req){
    return service(getEcsOptions('POST', '/ecs/ecs_set_base_nic/', req))
  },
  //获取网卡设置dns
  get_default_dns(req){
    return service(getEcsOptions('POST', '/ecs/az_default_dns/', req))
  },
  //挂载显卡
  mount_gpu_card(req){
    return service(getEcsOptions('POST', '/ecs/instance_gpu_card/', req))
  },
  // 更新显卡状态
  update_gpu_status(req) {
    return service(getEcsOptions('POST', '/ecs/update_gpu_status/', req))
  },
  // 导出excel
  export_list(reqData) {
    return service({
      method: 'GET',
      url: '/ecs_business/v1/ecs/ecs_list_download/',
      params: reqData,
      paramsSerializer: params => qs.stringify(params),
      responseType: 'blob'
    })
  },
  // 获取标签列表
  get_tag_list(){
    return service(getEcsOptions('GET','/ecs/get_tag_list/'))
  }
}
