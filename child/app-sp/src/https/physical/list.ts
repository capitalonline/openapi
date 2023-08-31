// 物理机管理
import service from "../http"
import { getHostOptions } from '../common'

export default{
    //获取物理机列表
    get_host_list(req){
        return service(getHostOptions('POST','/host/get_host_list/',req))
    },
    //获取机房列表
    get_room_list(req){
        return service(getHostOptions('GET','/host/machine_room_list/',req))
    },
    //获取电源与机器状态
    get_status_list(req){
        return service(getHostOptions('GET','/host/host_status_list/',req))
    },
    //进入带外管理
    external_management(req){
        return service(getHostOptions('GET','/host/external_management/',req))
    },
    //迁移
    migrate(req){
        return service(getHostOptions('POST','/host/migration_operation/',req))
    },
    //驱散
    disperse(req){
        return service(getHostOptions('POST','/host/disperse_operation/',req))
    },
    //物理机操作记录
    record(req){
        return service(getHostOptions('POST','/host/host_operation_record/',req))
    },
    //获取迁移的主机推荐列表
    recommended_host(req){
        return service(getHostOptions('POST','/host/recommended_host/',req))
    },
    //在线，离线维护
    host_maintenance(req){
        return service(getHostOptions('POST','/host/host_maintenance/',req))
    },
    //完成维护
    finish_maintenance(req){
        return service(getHostOptions('POST','/host/host_finish_maintenance/',req))
    },
    //下架
    shelves(req){
        return service(getHostOptions('POST','/host/host_off_shelves/',req))
    },
    //获取详情-概览
    get_detail_overview(req){
        return service(getHostOptions('GET','/host/host_main_details/',req))
    },
    //获取详情-存储
    get_detail_storage(req){
        return service(getHostOptions('GET','/host/host_disk/',req))
    },
    //下载列表接口
    down(req){
        return service(getHostOptions('GET','/host/host_list_download/',req))
    },
    //关机，开机，重启
    host_operate(req){
        return service(getHostOptions('POST','/host/operate/',req))
    },
    //host模板上传
    host_import(req){
        return service(getHostOptions('POST','/host/import/',req))
    },
    //获取资源归属列表
    get_host_attribution(req){
        return service(getHostOptions('GET','/host/get_host_attribution/',req))
    },
    //设置资源归属
    set_host_attribution(req){
        return service(getHostOptions('POST','/host/set_host_attribution/',req))
    },
    //获取主机类型和主机用途
    get_host_type(req){
        return service(getHostOptions('GET','/host/get_host_config/',req))
    },
    //更改属性
    update_attribute(req){
        return service(getHostOptions('POST','/host/set_host_config/',req))
    },
    //获取更改设置的专属客户列表
    getCustomerList(req){
        return service(getHostOptions('POST','/host/get_customer_list/',req))
    },
    //获取更改设置的专属客户列表
    getFamilyList(req){
        return service(getHostOptions('POST','/host/get_family_list/',req))
    },
    //完成校验
    finish_validate(req){
        return service(getHostOptions('POST','/host/verification_finish/',req))
    },
    //获取回收部门
    get_host_recycle_department(req){
        return service(getHostOptions('GET','/host/get_host_recycle_department/',req))
    },
    //获取物理机列表字段
    get_host_list_field(req){
        return service(getHostOptions('GET','/host/get_host_list_field/',req))
    },
    //获取业务测试任务列表
    get_task_list(req){
        return service(getHostOptions('GET','/host/business_test_task/',req))
    },
    //业务测试下发
    create_test_task(req){
        return service(getHostOptions('POST','/host/create_test_task/',req))
    },
    //获取筛选字段
    get_host_filter_item(req){
        return service(getHostOptions('POST','/host/get_host_filter_item/',req))
    },
    //设置备注
    set_remark(req){
        return service(getHostOptions('POST','/host/set_host_remark/',req))
    },
    //设置迁移，调度标记
    set_flag(req){
        return service(getHostOptions('POST','/host/set_host_tag/',req))
    },
  //设置锁定
  set_lock(req){
    return service(getHostOptions('POST','/host/host_lock/',req))
  },
  //设置解锁
  set_unlock(req){
    return service(getHostOptions('POST','/host/host_unlock/',req))
  },
  //设置维护
  set_maintenance(req){
    return service(getHostOptions('POST','/host/host_maintenance/',req))
  },
  //获取维护记录
  get_maintenance_record(req){
    return service(getHostOptions('GET','/host/host_maintenance_record/',req))
  }


}
