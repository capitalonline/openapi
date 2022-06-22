// 可用区管理
import service from "../http"
import { getEcsOptions }from '../common'

export default{
    //获取可用区列表
    get_az_list(req){
        return service(getEcsOptions('GET','/ecs/manage_az_list/',req))
    },
    //编辑可用区
    edit(req){
        return service(getEcsOptions('POST','/ecs/az_edit/',req))
    },
    //同步可用区信息
    sync(){
        return service(getEcsOptions('GET','/ecs/sync_az_info/'))
    },
    //获取可用区存储类型
    get_backend_types(){
        return service(getEcsOptions('GET','/ecs/get_backend_types/'))
    },
    //获取可用区状态
    get_status(){
        return service(getEcsOptions('GET','/ecs/get_az_status_list/'))
    },
    //删除可用区
    del_status(req){
        return service(getEcsOptions('POST','/ecs/delete_az/',req))
    },
    //获取可用区操作记录
    record(req){
        return service(getEcsOptions('GET','/ecs/get_az_history/',req))
    },
}