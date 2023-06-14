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
    get_filter_item(req){
        return service(getEcsOptions('POST','/event/get_filter_item/',req))
    },
    retry_task(req){
        return service(getEcsOptions('POST','/event/retry_task/',req))
    },
    get_error_task_list(req){
        return service(getEcsOptions('POST','/event/get_error_task_list/',req))
    },
    ignore(req){
        return service(getEcsOptions('POST','/event/task_status/',req))
    },
    //获取异常事件列表
    get_repair_event_list(req){
      return service(getEcsOptions('POST','/event/get_error_task_list/',req))
    },
    //检查底层任务状态,获取任务信息
    getUnderlyingTasks(req){
      return service(getEcsOptions('GET','/event/get_maintask_detail/',req))
    },
    //检查底层任务状态,获取任务状态信息
    getTasksStatus(req){
      return service(getEcsOptions('GET','/event/check_task_resource/',req))
    },
    //重试任务状态信息
    setTasksStatus(req){
      return service(getEcsOptions('GET','/event/repair_task_resource/',req))
    },
    //重试任务
    setReTasks(req){
      return service(getEcsOptions('GET','/event/repair_task/',req))
    },
}
