import service from "@/https/http"
import {getEcsOptions, getHostOptions} from '@/https/common'

export default{
  //获取pod概要
  get_pod_outline(req){
    return service(getEcsOptions('GET','/pod/get_pod_outline/',req))
  },
  //获取pod集群数据
  get_pod_cluster_list(req){
    return service(getEcsOptions('GET','/pod/get_pod_cluster_list/',req))
  },
  //获取pod集群表头
  get_cluster_field(){
    return service(getEcsOptions('GET','/pod/get_cluster_field/'))
  },
  //获取pod主机表头
  get_pod_host_field(){
    return service(getEcsOptions('GET','/pod/get_pod_host_field/'))
  },
  //获取pod主机数据
  get_pod_host_list(req){
    return service(getEcsOptions('GET','/pod/get_pod_host_list/',req))
  },
  //获取pod虚拟机数据
  get_pod_ecs_list(req){
    return service(getEcsOptions('GET','/pod/get_pod_ecs_list/',req))
  },
  //获取pod虚拟机表头
  get_pod_ecs_field(){
    return service(getEcsOptions('GET','/pod/get_pod_ecs_field/'))
  },
  //获取电源与机器状态
  get_status_list(req){
    return service(getHostOptions('GET','/host/host_status_list/',req))
  },
  get_vm_status_list() {
    return service(getEcsOptions('GET', '/ecs/ecs_status_list/'))
  },
  get_family_data() {
    return service(getEcsOptions('GET', '/ecs/get_family_data/'))
  },
  get_product_source(){
    return service(getEcsOptions('GET','/ecs/get_product_source/'))
  }

}
