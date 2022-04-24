// 镜像列表
import service from "../http"
import { getEcsOptions } from '../common'

export default{
    //获取公共镜像列表
    get_pub_mirror_list(req){
        return service(getEcsOptions('POST','/img/get_pub_image_list/',req))
    },
    //公共镜像名称判重
    check_name(req){
        return service(getEcsOptions('POST','/img/name_check/',req))
    },
    //获取镜像类型
    get_mirror_type(req){
        return service(getEcsOptions('GET','/img/image_type/',req))
    },
    //新增公共镜像
    add_pub_mirror(req){
        return service(getEcsOptions('POST','/img/create_pub_image/',req))
    },
    //编辑公共镜像
    edit_pub_mirror(req){
        return service(getEcsOptions('POST','/img/edit_image/',req))
    },
    //更改镜像状态
    change_status(req){
        return service(getEcsOptions('POST','/img/alter_image/',req))
    },
    //删除镜像
    del_pub_mirror(req){
        return service(getEcsOptions('POST','/img/delete_pub_image/',req))
    },
    //获取公共镜像操作记录
    get_pub_operate_record(req){
        return service(getEcsOptions('POST','/img/pub_image_operation_list/',req))
    },
    //获取公共镜像同步详情
    get_pub_sync_detail(req){
        return service(getEcsOptions('GET','/img/pub_image_info/',req))
    },
    //获取私有镜像列表
    get_private_mirror_list(req){
        return service(getEcsOptions('POST','/img/get_private_image_list/',req))
    },
}

    