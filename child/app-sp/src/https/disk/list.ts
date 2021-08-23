// 云盘列表
import service from "../http"
import {getOptions}from '../event/common'

export default{
    //获取云盘列表
    get_disk_list(req){
        return service(getOptions('POST','/ebs/get_disk_list/',req))
    },
    //云盘状态列表获取
    get_disk_state(req){
        return service(getOptions('POST','/ebs/api_disk_state/',req))
    },
    //修改云盘名称接口
    edit_disk_name(req){
        return service(getOptions('POST','/ebs/api_disk_name_update/',req))
    },
    //编辑云盘属性接口
    edit_disk_attr(req){
        return service(getOptions('POST','/ebs/api_disk_property_update/',req))
    },
    //挂载
    mount(req){
        return service(getOptions('POST','/ebs/mount/',req))
    },
    //卸载
    unmount(req){
        return service(getOptions('POST','/ebs/unmount/',req))
    },
    //逻辑删除
    del_disk(req){
        return service(getOptions('POST','/ebs/delete/',req))
    },
    //恢复
    recover(req){
        return service(getOptions('POST','/ebs/recover/',req))
    },
    //销毁
    destroy(req){
        return service(getOptions('POST','/ebs/destroy/',req))
    },
    //扩容
    expansion(req){
        return service(getOptions('POST','/ebs/expansion/',req))
    },

}