// 任务查询
// 重试
import service from "../http"
import {getOptions}from './common'
export default{
    //获取任务列表
    get_task_list(req){
        return service(getOptions('POST','/event/get_task_list/',req))
    },
    //重试
    reTry(req){
        return service(getOptions('POST','/task/task_retry/',req))
    }
}
