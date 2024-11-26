import service from "@/https/http"
import {getEcsOptions, getHostOptions} from '@/https/common'

export default{
  //获取pod虚拟机表头
  get_pod_ecs_field(){
    return service(getEcsOptions('GET','/pod/get_pod_ecs_field/'))
  },
  get_vm_status_list() {
    return service(getEcsOptions('GET', '/ecs/ecs_status_list/'))
  },
  get_vnc_url(reqData) {
    return service(getEcsOptions('GET', '/ecs/vnc_info/', reqData))
  },
  // 更新显卡状态
  update_gpu_status(req) {
    return service(getEcsOptions('POST', '/ecs/update_gpu_status/', req))
  },
  // 开启计费获取价格
  each_resource_price(reqData) {
    return service(getEcsOptions('POST', '/ecs/each_resource_price/', reqData))
  },
  //获取pod虚拟机数据
  get_pod_ecs_list(req){
    return service(getEcsOptions('GET','/pod/get_pod_ecs_list/',req))
  },
  change_config_price(reqData) {
    return service(getEcsOptions('POST', '/ecs/change_config_price/', reqData))
  },
  change_system_price(reqData) {
    return service(getEcsOptions('POST', '/ecs/change_system_price/', reqData))
  },
  operate_instance(reqData) {
    return service(getEcsOptions('POST', '/ecs/operate/', reqData))
  },
  delete_instance(reqData) {
    return service(getEcsOptions('POST', '/ecs/delete/', reqData))
  },
  destroy_instance(reqData) {
    return service(getEcsOptions('POST', '/ecs/destroy/', reqData))
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
  start_charge(reqData) {
    return service(getEcsOptions('POST', '/resource/start_charge/', reqData))
  },
  mount_gpu_card(req){
    return service(getEcsOptions('POST', '/ecs/instance_gpu_card/', req))
  },
  get_family_data() {
    return service(getEcsOptions('GET', '/ecs/get_family_data/'))
  },
  get_product_source(){
    return service(getEcsOptions('GET','/ecs/get_product_source/'))
  },
  //进入救援模式
  enter_rescue(req){
    return service(getEcsOptions('POST','/ecs/enter_rescue/',req))
  },
  //退出救援模式
  exit_rescue(req){
    return service(getEcsOptions('POST','/ecs/exit_rescue/',req))
  }
}
