// 可用区管理
import service from "../http"
import { getEcsOptions }from '../common'

export default{
    //获取资源库存列表
    get_inventory_list(req){
        return service(getEcsOptions('GET','/stock/host_stock/',req))
    },
    //获取产品库存列表
    get_product_inventory_list(req){
        return service(getEcsOptions('GET','/stock/spec_stock/',req))
    },
    //获取物理机产品名称
    get_product_host_name(req){
        return service(getEcsOptions('GET','/host/host_product_list/',req))
    },
    //获取客户信息
    get_customer_sell_info(req){
        return service(getEcsOptions('GET','/stock/get_customer_sell_info/',req))
    },
}