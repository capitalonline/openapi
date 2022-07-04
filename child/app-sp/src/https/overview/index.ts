// 概览
import service from "../http"
import { getEcsOptions } from '../common';

export default{
    //获取物理机概览信息
    get_host_overview(req){
        return service(getEcsOptions('POST','/host/get_host_overview/',req))
    },
    //获取云主机概览信息
    get_ecs_overview(req){
        return service(getEcsOptions('POST','/ecs/get_ecs_overview/',req))
    },
    //获取物理机产品列表
    get_host_type(req){
        return service(getEcsOptions('GET','/host/host_product_list/',req))
    },

}