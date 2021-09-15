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
    //获取联系人详情
    get_contact_detail(req){
        return service(getAlarmOptions('GET','/contact',req))
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
    //编辑联系人
    update_contact(req){
        return service(getAlarmOptions('PUT','/contact',req))
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
    
    //删除联系人
    delete_contact(req){
        return service({
            method: 'DELETE',
            url: '/alarm/api/v1/contact',
            data: req
          })
    },
    //获取联系人组列表
    get_contact_group_list(req){
        return service(getAlarmOptions('GET','/contact_group/list',req))
    },
    //获取联系人详情
    get_contact_group_detail(req){
        return service(getAlarmOptions('GET','/contact_group',req))
    },
    //新建联系人
    add_contact_group(req){
        return service(getAlarmOptions('POST','/contact_group',req))
    },
    //编辑联系人
    update_contact_group(req){
        return service(getAlarmOptions('PUT','/contact_group',req))
    },
    //删除联系人
    delete_contact_group(req){
        return service({
            method: 'DELETE',
            url: '/alarm/api/v1/contact_group',
            data: req
          })
    },

}