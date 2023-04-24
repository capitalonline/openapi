// 云盘列表
import service from "../http"
import { getEcsOptions } from '../common';

export default{
    //获取云盘列表
    get_disk_list(req){
        return service(getEcsOptions('POST','/ebs/get_disk_list/',req))
    },
    //云盘状态列表获取
    get_disk_state(req){
        return service(getEcsOptions('GET','/ebs/disk_status/',req))
    },
    //修改云盘名称接口
    edit_disk_name(req){
        return service(getEcsOptions('POST','/ebs/disk_name_update/',req))
    },
    //编辑云盘属性接口
    edit_disk_attr(req){
        return service(getEcsOptions('POST','/ebs/disk_property_update/ ',req))
    },
    //挂载
    mount(req){
        return service(getEcsOptions('POST','/ebs/mount/',req))
    },
    //卸载
    unmount(req){
        return service(getEcsOptions('POST','/ebs/unmount/',req))
    },
    //逻辑删除
    del_disk(req){
        return service(getEcsOptions('POST','/ebs/delete/',req))
    },
    //恢复
    recover(req){
        return service(getEcsOptions('POST','/ebs/recover/',req))
    },
    //销毁
    destroy(req){
        return service(getEcsOptions('POST','/ebs/destroy_disk/',req))
    },
    //扩容
    expansion(req){
        return service(getEcsOptions('POST','/ebs/expansion/',req))
    },
    //获取开启计费费用
    get_fee(req){
        return service(getEcsOptions('POST', '/ecs/each_resource_price/', req))
    },
    //开启计费
    open_bill(req){
        return service(getEcsOptions('POST', '/resource/start_charge/', req))
    },
    //获取集群名称
    get_cluster_name(req){
        return service(getEcsOptions('GET', '/ebs/cluster_name/', req))
    },
    //获取存储池名称
    get_storage_pool_name(req){
        return service(getEcsOptions('GET', '/ebs/storage_pool_name/', req))
    },
    //获取产品来源
    get_product_source(req){
        return service(getEcsOptions('GET', '/ebs/disk_product_source/', req))
    }
}