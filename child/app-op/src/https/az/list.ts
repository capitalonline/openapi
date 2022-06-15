// 可用区管理
import service from "../http"
import { getEcsOptions }from '../common'

export default{
    //获取可用区列表
    get_az_list(req){
        return service(getEcsOptions('GET','/ecs/manage_az_list`',req))
    },
    //获取云盘类型信息
    get_disk_type(req){
        return service(getEcsOptions('GET','/ebs/disk_info/',req))
    },
    //获取云盘价格
    get_price(req) {
        return service(getEcsOptions('POST', '/ecs/get_price/', req))
    },
    //获取云盘扩容价格
    get_capacity_price(req) {
        return service(getEcsOptions('POST', '/ebs/get_ebs_price/', req))
    },
    
}