import service from "@/https/http"
import { getEcsOptions } from '@/https/common'

export default{
  //获取树结构
  get_host_tree_data(req){
    return service(getEcsOptions('GET','/host/get_host_tree_data/',req))
  },
  open_region_az_info(req){
    return service(getEcsOptions('POST','/ecs/open_region_az_info/',req))
  },
  global_search(req){
    return service(getEcsOptions('GET','/host/global_search/',req))
  }
}
