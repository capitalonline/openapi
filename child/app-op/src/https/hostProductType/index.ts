// 物理机管理
import service from "../http"
import { getHostOptions } from '../common'

export default{
    //获取物理机产品列表
    get_host_type(req){
        return service(getHostOptions('GET','/host/host_product_list/',req))
    },
    //新增物理机产品类型
    add(req){
        return service(getHostOptions('POST','/host/add_host_product/',req))
    },
    //编辑物理机产品类型
    edit(req){
        return service(getHostOptions('POST','/host/edit_host_product/',req))
    },
  
    
    

}