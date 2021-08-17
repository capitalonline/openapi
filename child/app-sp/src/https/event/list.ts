// 事件列表
import service from "../http"
import {getOptions}from './common'

export default{
    //获取事件列表
    get_event_list(req){
        return service(getOptions('POST','/event/get_event_list/',req))
    }
}
