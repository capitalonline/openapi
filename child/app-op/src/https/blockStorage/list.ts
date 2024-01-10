import service from "../http"
import { getEcsOptions } from '../common';

export default{
    //获取资源池信息
    get_pool_info(req){
        return service(getEcsOptions('GET','/ebs/get_pool_info/',req))
    },
    //获取资源池30天增长率
    search_pool_add_rate(req){
        return service(getEcsOptions('GET','/ebs/search_pool_add_rate/',req))
    },
    //设置阈值/取消禁售/禁售
    handle_pool_info(req){
        return service(getEcsOptions('POST','/ebs/handle_pool_info/',req))
    }
}