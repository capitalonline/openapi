// 任务查询
// 重试
import service from "../http"
import { getEcsOptions } from '../common'
export default{
    //获取任务列表
    get_task_list(req){
        return service(getEcsOptions('POST','/event/get_task_list/',req))
    },
    //重试
    reTry(req){
        return service(getEcsOptions('POST','/task/task_retry/',req))
    },
}
