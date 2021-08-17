// 云盘列表
import service from "../http"
import {getOptions}from '../event/common'

export default{
    //获取事件列表
    get_disk_list(req){
        return service(getOptions('POST','/ecs_service/v1/ecs/get_disk_list/',req))
    }
}