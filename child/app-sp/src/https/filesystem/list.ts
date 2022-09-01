// 事件列表
import service from "../http"
import { getEcsOptions } from '../common'

export default{
    //获取文件系统列表接口
    get_nas_list(req){
        return service(getEcsOptions('POST','1/nas/nas_list/',req))
    },
    //获取文件系统详情
    get_nas_detail(req){
        return service(getEcsOptions('POST','/nas/nas_detail/',req))
    },
    //文件系统扩容
    capacity(req){
        return service(getEcsOptions('POST','/nas/expansion/',req))
    },
    //中转机列表
    get_vm_list(req){
        return service(getEcsOptions('POST','/nas/transfers_list/',req))
    },
}
