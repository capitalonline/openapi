// 事件列表
import service from "../http"
import { getEcsOptions } from '../common'

export default{
    //获取事件列表
    get_event_list(req){
        return service(getEcsOptions('POST','/event/get_event_list/',req))
    },
    //获取筛选列表
    get_filter_list(req){
        return service(getEcsOptions('POST','/event/get_filter_item/',req))
    },
}
