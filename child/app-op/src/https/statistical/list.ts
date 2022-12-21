// 事件列表
import service from "../http"
import { getNasOptions } from '../common'

export default{
    //获取可用区
    get_az_list(req){
        return service(getNasOptions('GET','/operation/az_list',req))
    },
    //获取文件系统列表接口
    get_nas_list(req){
        return service(getNasOptions('POST','/operation/nas_list',req))
    },
    //获取云盘列表接口
    get_disk_list(req){
        return service(getNasOptions('POST','/operation/disk_list',req))
    },

}
