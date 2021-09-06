import service from "../http"
import { getEcsOptions }from '../common'
export default{
    //获取云服务器操作记录
    get_operate_record_list(req){
        return service(getEcsOptions('GET','/ecs/history_record/',req))
    },
    //获取获取云服务器配置详情
    get_detail(req){
        return service(getEcsOptions('POST','/ecs/get_ecs_detail/',req))
    },
}