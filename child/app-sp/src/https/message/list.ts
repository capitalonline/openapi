//消息通知
import service from "../http"
import { getHostOptions } from '../common'

export default{
    //获取消息通知列表
    get_message_list(req){
        return service(getHostOptions('GET','/host/business_test_record/',req))
    },
    //获取消息通知操作内容
    get_inform_list(req){
        return service(getHostOptions('GET','/host/get_op_content/',req))
    },
}