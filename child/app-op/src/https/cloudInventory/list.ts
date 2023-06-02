// 云盘库存
import service from "../http"
import { getEcsOptions } from '../common';

export default{
  // 云盘库存列表查询
  get_disk_inventory(req) {
    return service(getEcsOptions('GET','/stock/disk_inventory/',req))
  },
  // 云盘库存列表导出
  disk_inventory_download(req) {
    return service(getEcsOptions('GET','/stock/disk_inventory_download/',req))
  }, 
  // 云盘库存监控查询
  get_disk_inventory_monitor(req) {
    return service(getEcsOptions('GET','/stock/disk_inventory_monitor/',req))
  },
  // 云盘可售容量配额
  set_available_sale_size(req){
    return service(getEcsOptions('POST','/ebs/available_sale_size/',req))
},
}