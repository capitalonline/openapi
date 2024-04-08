import service from "@/https/http"
import { getEcsOptions } from '@/https/common'

export default{
  //获取集群概要
  get_cluster_outline(req){
    return service(getEcsOptions('GET','/pod/get_cluster_outline/',req))
  }
}
