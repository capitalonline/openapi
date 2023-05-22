import service from '../http'
import { getEcsOptions }from '../common'

export default {
    // 获取状态列表
    get_status_list(){
        return service(getEcsOptions('GET', '/ecs/ecs_status_list/'))
    },
    // 获取远程连接
    get_vnc_url(reqData){
        return service(getEcsOptions('GET', '/ecs/vnc_info/', reqData))
    }
}