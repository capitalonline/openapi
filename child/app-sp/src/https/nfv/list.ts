import service from '../http'
import { getEcsOptions }from '../common'

export default {
    // 获取NFV实例信息列表
    get_nfv_list(reqData){
        return service(getEcsOptions('GET', '/nfv/nfv_list/', reqData))
        
    },
    // 操作NFV实例（启动、停止、重启）
    operate_nfv(reqData){
        return service(getEcsOptions('POST', '/nfv/operate/', reqData))
    },
    // 获取远程连接
    get_vnc_url(reqData){
        return service(getEcsOptions('POST', '/nfv/vnc_info/', reqData))
    },
    // 获取NFV状态
    get_status_list(){
        return service(getEcsOptions('GET', '/nfv/nfv_status_list/'))
    },

    // 获取详情接口
    get_detail(reqData){
        return service(getEcsOptions('GET', '/nfv/nfv_detail/',reqData))
    }

}