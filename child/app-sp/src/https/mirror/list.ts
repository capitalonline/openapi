// 镜像列表
import service from "../http"
import { getEcsOptions } from '../common'

export default{
    //获取公共镜像列表
    get_pub_mirror_list(req){
        return service(getEcsOptions('GET','/img/get_pub_image_list/',req))
    },
    //公共镜像名称判重
    check_name(req){
        return service(getEcsOptions('POST','/img/name_check/',req))
    },
    //获取镜像类型
    get_mirror_type(req){
        return service(getEcsOptions('GET','/img/image_type/',req))
    },
    //获取模型镜像类型
    get_model_image_type(req){
        return service(getEcsOptions('GET','/img/model_image_type/',req))
    },
    //新增公共镜像
    add_pub_mirror(req){
        return service(getEcsOptions('GET','/img/create_pub_image/',req))
    },
    //编辑公共镜像
    edit_pub_mirror(req){
        return service(getEcsOptions('POST','/img/edit_image/',req))
    },
    //更改镜像状态
    change_status(req){
        return service(getEcsOptions('POST','/img/alter_image/',req))
    },
    //将镜像从某个可用区移除
    del_pub_mirror_az(req){
        return service(getEcsOptions('POST','/img/delete_pub_image/',req))
    },
    //删除镜像
    del_pub_mirror(req){
        return service(getEcsOptions('POST','/img/batch_delete_pub_image/',req))
    },
    //获取公共镜像操作记录
    get_pub_operate_record(req){
        return service(getEcsOptions('POST','/img/pub_image_operation_list/',req))
    },
    //获取公共镜像同步详情
    get_pub_sync_detail(req){
        return service(getEcsOptions('POST','/img/pub_image_info/',req))
    },
    //同步公共镜像
    sync_mirror(req){
        return service(getEcsOptions('POST','/img/sync_pub_image/',req))
    },
    //获取私有镜像列表
    get_private_mirror_list(req){
        return service(getEcsOptions('GET','/img/get_private_image_list/',req))
    },
    //获取镜像状态
    get_status_list(req){
        return service(getEcsOptions('GET','/img/get_image_status_list/',req))
    },
    //获取新增镜像时的可用区
    get_available_az(req){
        return service(getEcsOptions('POST','/img/get_available_az/',req))
    },
    //获取新增镜像时的存储类型
    get_disk_list(req){
        return service(getEcsOptions('GET','/img/backend_type/',req))
    },
  //获取产品来源
  get_product_source(){
      return service(getEcsOptions('GET','/ecs/get_product_source/'))
  },

}

