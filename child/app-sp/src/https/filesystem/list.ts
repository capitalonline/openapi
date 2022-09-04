// 事件列表
import service from "../http"
import { getNasOptions,getUsedOptions } from '../common'

export default{
    //获取文件系统列表接口
    get_nas_list(req){
        return service(getNasOptions('POST','/nas/nas_list/',req))
    },
    //获取文件系统详情
    get_nas_detail(req){
        return service(getNasOptions('GET','/nas/nas_detail/',req))
    },
    //文件系统扩容
    capacity(req){
        return service(getNasOptions('POST','/nas/expansion_nas/',req))
    },
    //中转机列表
    get_vm_list(req){
        return service(getNasOptions('POST','/nas/transfer_list/',req))
    },
    //获取IOPS监控信息
    get_iops(req){
        return service(getUsedOptions('GET','/nas/nas_iops_monitor',req))
    },
    //获取带宽监控信息
    get_bandwidth(req){
        return service(getUsedOptions('GET','/nas/nas_bandwidth_monitor',req))
    },
    //获取使用量监控信息
    get_use(req){
        return service(getUsedOptions('GET','/nas/nas_use_monitor',req))
    },
    //获取文件系统列表使用量/总量
    get_file_use(req){
        return service(getUsedOptions('POST','/nas/get_nas_use',req))
    },

}
