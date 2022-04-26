// 概览
import service from "../http"
import { getEcsOptions } from '../common';

export default{
    //获取物理机概览信息
    get_host_overview(req){
        return service(getEcsOptions('GET','/host/get_host_overview/',req))
    },
    //获取云主机概览信息
    get_ecs_overview(req){
        return service(getEcsOptions('GET','/ecs/get_ecs_overview/',req))
    },

}