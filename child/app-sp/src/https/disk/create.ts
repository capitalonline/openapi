// 创建云盘
import service from "../http"
import {getOptions}from '../event/common'

export default{
    //获取事件列表
    create(req){
        return service(getOptions('POST','/ebs/api_create_disk/',req))
    }
}