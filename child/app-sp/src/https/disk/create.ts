// 创建云盘
import service from "../http"
import {getOptions}from '../event/common'

export default{
    //获取事件列表
    get_disk_list(req){
        return service(getOptions('POST','/eds/api_create_disk/',req))
    }
}