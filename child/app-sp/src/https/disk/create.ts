// 创建云盘
import service from "../http"
import { getEcsOptions }from '../common'

export default{
    //创建云盘
    create(req){
        return service(getEcsOptions('POST','/ebs/create_disk/',req))
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