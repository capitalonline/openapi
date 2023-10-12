import service from "../http"
import { getEcsOptions } from '../common';

export default{
    //NAS库存折线图
    post_nas_line(req){
        return service(getEcsOptions('POST','/stock/stock_line/',req))
    },
    //获取NAS库存列表
    get_nas_inventory(req){
        return service(getEcsOptions('POST','/stock/stock_table/',req))
    },
    //编辑NAS总容量
    post_edit_nas(req){
        return service(getEcsOptions('POST','/stock/edit_stock/',req))
    },
    //获取节点
    post_az_nas(){
        return service(getEcsOptions('POST','/stock/az_info/'))
    },
}