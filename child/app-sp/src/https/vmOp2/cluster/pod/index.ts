import service from "@/https/http"
import { getEcsOptions } from '@/https/common'

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
    return service(getEcsOptions('POST','/ecs/get_pod_ecs_list/',req))
  },
  //获取pod虚拟机表头
  get_pod_ecs_field(){
    return service(getEcsOptions('GET','/pod/get_pod_ecs_field/'))
  },
  //新建集群
  create_cluster(req){
    return service(getEcsOptions('POST','/cluster/create_cluster/',req))
  },
  //编辑集群
  update_cluster(req){
    return service(getEcsOptions('POST','/cluster/update_cluster/',req))
  },
  //删除集群
  delete_cluster(req){
    return service(getEcsOptions('POST','/cluster/delete_cluster/',req))
  },
  //获取pod信息
  get_pod_list(req){
    return service(getEcsOptions('GET','/pod/get_pod_list/',req))
  },
  //获取cpu/gpu型号信息
  get_model_info_list(req){
    return service(getEcsOptions('GET','/cluster/get_model_info_list/',req))
  },
  //获取存储集群信息
  get_storage_cluster_info(req){
    return service(getEcsOptions('GET','/cluster/get_storage_cluster_info/',req))
  }
}
