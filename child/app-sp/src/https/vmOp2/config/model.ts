import service from "@/https/http"
import { getEcsOptions } from '@/https/common'

export default{
  //新增型号信息
  add_model_info(req){
    return service(getEcsOptions('POST','/ecs/add_model_info/',req))
  },
  //删除型号信息
  delete_model_info(req){
    return service(getEcsOptions('POST','/ecs/bulk_delete_model_info/',req))
  },
  //修改型号信息
  update_model_info(req){
    return service(getEcsOptions('POST','/ecs/update_model_info/',req))
  },
  //获取型号信息列表
  model_info_list(req){
    return service(getEcsOptions('GET','/ecs/model_info_list/',req))
  },
  //获取品牌信息列表
  get_model_brand_list(req){
    return service(getEcsOptions('GET','/ecs/model_brand_list/',req))
  },
  //同步 cpu 信息
  sync_cpu_info(req){
    return service(getEcsOptions('POST','/ecs/sync_cpu_info/',req))
  },
  //从规格族同步CPU信息
  spec_family_sync(){
    return service(getEcsOptions('POST','/ecs/spec_family_sync_cpu/'))
  }
}
