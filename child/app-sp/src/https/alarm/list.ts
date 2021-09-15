import service from '../http'
import { getAlarmOptions } from '../common'
export default{
    //获取报警信息
    get_alarm_list(req){
        return service(getAlarmOptions('GET','/record',req))
    },
    //获取联系人组列表
    get_contact_group_list(req){
        return service(getAlarmOptions('GET','/contact_group/list',req))
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
    //删除策略
    delete_strategy(req){
        return service(getAlarmOptions('DELETE','/strategy',req))
    },
    //获取联系人列表
    get_contact_list(req){
        return service({
            method: 'GET',
            url: '/api/v1/contact_list',
            params: req
          })
    },
    //新建联系人
    add_contact(req){
        return service({
            method: 'PUT',
            url: '/api/v1/contact',
            params: req
          })
    },

}