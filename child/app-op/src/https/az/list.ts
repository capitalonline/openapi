// 可用区管理
import service from "../http"
import { getEcsOptions }from '../common'

export default{
    //获取可用区列表
    get_az_list(req){
        return service(getEcsOptions('GET','/ecs/manage_az_list`',req))
    },
    //编辑可用区
    edit(req){
        return service(getEcsOptions('POST','/ecs/az_edit',req))
    },
    
    
}