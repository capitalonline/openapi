// 云盘列表
import service from "../http"
import { getEcsOptions } from '../common';

export default{
    //获取集群列表
    get_cluster_list(req){
        return service(getEcsOptions('GET','/ebs/cluster_list/',req))
    },
    //获取存储池列表
    get_storage_pool_list(req){
        return service(getEcsOptions('GET','/ebs/storage_pool_list/',req))
    },
    
}