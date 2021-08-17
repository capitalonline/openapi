import service from "../http"
import {getOptions}from '../event/common'
export default{
    //获取云服务器操作记录
    get_operate_record_list(req){
        return service(getOptions('POST','/ecs/history_record/',req))
    },
    //获取获取云服务器配置详情
    get_detail(req){
        return service(getOptions('POST','/ecs/get_ecs_detail/',req))
    },
}