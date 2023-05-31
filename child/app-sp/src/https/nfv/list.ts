import service from '../http'
import { getEcsOptions }from '../common'

export default {
    // 获取NFV实例信息列表
    get_nfv_list(reqData){
        return service(getEcsOptions('GET', '/nfv/nfv_list/', reqData))
        // return service({
        //     method:'GET', 
        //     url:'/ecs_business/v1/nfv/nfv_list', 
        //     params:reqData
        // })
    },
    // 操作NFV实例（启动、停止、重启）
    operate_nfv(reqData){
        return service({
            method:'POST',
            url:'/ecs_business/v1/nfv/operate',
            data:reqData
        })
    },
    // 获取远程连接
    get_vnc_url(reqData){
        return service({
            method:'POST',
            url:'/ecs_business/v1/nfv/vnc_info',
            data:reqData
        })
    },
    // 获取NFV状态
    get_status_list(){
        return service({
            method:'GET',
            url:'/ecs_business/v1/nfv/nfv_status_list',
            
        })
    }
}