import service from "@/https/http"
import { getEcsOptions } from '@/https/common'

export default{
  //获取集群概要
  get_cluster_outline(req){
    return service(getEcsOptions('GET','/pod/get_cluster_outline/',req))
  },
  //获取集群异常事件
  get_cluster_task_list(req){
    return service(getEcsOptions('POST','/event/get_cluster_task_list/',req))
  }
}
