// 云盘列表
import service from "../http"
import {getOptions}from '../event/common'

export default{
    //获取云盘列表
    get_disk_list(req){
        return service(getOptions('POST','/eds/get_disk_list/',req))
    },
    //云盘状态列表获取
    get_disk_state(req){
        return service(getOptions('POST','/eds/api_disk_state/',req))
    },
    //修改云盘名称接口
    edit_disk_name(req){
        return service(getOptions('POST','/eds/api_disk_name_update/',req))
    },
    //编辑云盘属性接口
    edit_disk_attr(req){
        return service(getOptions('POST','/eds/api_disk_property_update/',req))
    },
}