import service from '../http'
import { getAlarmOptions } from '../common'
export default{
    //获取报警信息
    get_alarm_list(req){
        return service(getAlarmOptions('GET','/record/list',req))
    },
    //获取策略列表 
    get_strategy_list(req){
        return service(getAlarmOptions('GET','/strategy/list',req))
    },
    //获取一条策略详情
    get_strategy_detail(req){
        return service(getAlarmOptions('GET','/strategy',req))
    },
    //获取创建策略时指标项列表
    get_index_list(req){
        return service(getAlarmOptions('GET','/metrics/info',req))
    },
    //创建策略
    add_strategy(req){
        return service(getAlarmOptions('POST','/strategy',req))
    },
    //更新策略
    update_strategy(req){
        return service(getAlarmOptions('PUT','/strategy',req))
    },
    //应用策略
    apply_strategy(req){
        return service(getAlarmOptions('PUT','/strategy/apply',req))
    },
    //删除策略
    delete_strategy(req){
        return service({
            method: 'DELETE',
            url: '/alarm/api/v1/strategy',
            data: req
          })
    },
    //获取联系人列表
    get_contact_list(req){
        return service(getAlarmOptions('GET','/contact/list',req))
    },
    
    //新建联系人
    add_contact(req){
        return service(getAlarmOptions('POST','/contact',req))
    },
    //获取联系人详情
    get_contact_detail(req){
        return service(getAlarmOptions('GET','/contact',req))
    },
    //编辑联系人
    update_contact(req){
        return service(getAlarmOptions('PUT','/contact',req))
    },
    
    //删除联系人
    delete_contact(req){
        return service({
            method: 'DELETE',
            url: '/alarm/api/v1/contact',
            data: req
          })
    },
    //添加联系人至联系人组
    add_contact_to_group(req){
        return service(getAlarmOptions('PUT','/contact_group/relation',req))
    },
    //获取联系人组列表
    get_contact_group_list(req){
        return service(getAlarmOptions('GET','/contact_group/list',req))
    },
    //获取联系人组详情
    get_contact_group_detail(req){
        return service(getAlarmOptions('GET','/contact_group',req))
    },
    //新建联系人组
    add_contact_group(req){
        return service(getAlarmOptions('POST','/contact_group',req))
    },
    //编辑联系人组
    update_contact_group(req){
        return service(getAlarmOptions('PUT','/contact_group',req))
    },
    //删除联系人组
    delete_contact_group(req){
        return service({
            method: 'DELETE',
            url: '/alarm/api/v1/contact_group',
            data: req
          })
    },
    //获取事件列表
    get_event_list(req){
        return service(getAlarmOptions('GET','/strategy/event/list',req))
    },
    //获取产品列表
    get_product_list(req){
        return service(getAlarmOptions('GET','/strategy/product/list',req))
    },
    //获取屏蔽列表
    get_shield_list(req){
        return service(getAlarmOptions('GET','/shield/list',req))
    },
    //获取创建所需信息
    get_create_info(req){
        return service(getAlarmOptions('GET','/shield/info',req))
    },
    //创建前获取策略列表
    get_strategy_info(req){
        return service(getAlarmOptions('GET','/shield/condition/strategy',req))
    },
    //获取规则列表
    get_rule_info(req){
        return service(getAlarmOptions('GET','/shield/condition/rule',req))
    },
    //创建告警策略
    create_shield(req){
        return service(getAlarmOptions('POST','/shield',req))
    },
    //获取屏蔽详情
    shield_detail(req){
        return service(getAlarmOptions('GET','/shield',req))
    },
    //应用或停用屏蔽
    shield_apply(req){
        return service(getAlarmOptions('PUT','/shield/apply',req))
    },
    //删除屏蔽
    shield_del(req){
        return service(getAlarmOptions('POST','/shield/delete',req))
    },

}