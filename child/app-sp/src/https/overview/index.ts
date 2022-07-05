// 概览
import service from "../http"
import { getEcsOptions,getMonitorOptions } from '../common';

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
    //获取CPU使用率
    get_cpu_percent(req){
        return service(getMonitorOptions('GET','/cpu_group_info',req))
    },
    //获取内存使用率
    get_ram_percent(req){
        return service(getMonitorOptions('GET','/memory_group_info',req))
    },
    //获取本地盘使用率
    get_lcoal_percent(req){
        return service(getMonitorOptions('GET','/host/host_product_list/',req))
    },
    //获取显卡使用率
    get_gpu_percent(req){
        return service(getMonitorOptions('GET','/gpu_group_info',req))
    },
    //获取显存使用率
    get_gpu_capacity(req){
        return service(getMonitorOptions('GET','/host/host_product_list/',req))
    },  

}