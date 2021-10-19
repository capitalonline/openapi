export const create_obj = {
    code:0,
    message:'成功',
    data:[
        {
        id:'disk-dmgebkqq843caved',
        name:'通用策略',
        productType:[
            {
                id:'ecs',
                name:'云服务器ECS',
                rules:[
                    {
                        id:'ecs'+Math.floor((Math.random()*9+1)*1000000),
                        name:'cpu使用率',
                        level_name:['Host.cpu.total'],
                        type:'0',
                        level:[
                            {
                                range:'>=',
                                num:'80',
                                cycle_time:'1',
                                cycle_num:'15',
                                alram_type:'serious',
                                notice:["短信","邮箱"]
                            },
                            {
                                range:'>=',
                                num:'50',
                                cycle_time:'15',
                                cycle_num:'1',
                                alram_type:'ordinary',
                                notice:["短信"]
                            },
                        ]
                        
                    },
                    {
                        id:'ecs'+Math.floor((Math.random()*9+1)*1000000),
                        name:'磁盘使用率',
                        event_type:'abnormal',
                        type:'1',
                        event_name:['loss'],
                        alram_type:'ordinary',
                        notice:["短信"]
                    }
                ]
            },
            {
                id:'gpu',
                name:'GPU',
                rules:[
                    {
                        name:'GPU使用率',
                        level_name:'Host.cpu.total',
                        type:'1',
                        level:[
                            {
                                range:'>=',
                                num:'80',
                                cycle_time:'1',
                                cycle_num:'15',
                                alram_type:'serious',
                                notice:["短信","邮箱"]
                            },
                            {
                                range:'>=',
                                num:'50',
                                cycle_time:'15',
                                cycle_num:'1',
                                alram_type:'ordinary',
                                notice:["短信"]
                            },
                        ]
                        
                    },
                    {
                        name:'GPU磁盘占有率',
                        event_type:'abnormal',
                        type:'2',
                        event_name:['loss','diskSpaceRunOut'],
                        alram_type:'ordinary',
                        notice:["短信"]
                    }
                ]
            }
        ]
    }]
}
export const mock = {
    code:0,
    message:'成功',
    data:{
        "id":'celve',
        "name": "通用策略",//策略名称
        "rules": [ 
          //一条规则
          {
            "id":'ecs'+Math.floor((Math.random()*9+1)*1000000),
            "name": "cpu使用率", //告警规则名称
            "productType": "ecs",//产品类型
            "ruleRecords": [
                //一个阈值指标项
              {
                "id":'ecs'+Math.floor((Math.random()*9+1)*1000000),
                "alarmMethod": ["phone","wx"], //告警方式
                "alarmType": "metric",//阈值报警还是事件报警
                "eventName": "",//事件名称
                "eventType": "",//事件类型
                "level": 2,//告警等级，严重还是普通等
                "metricCondition": ">=", //>,<,>=,<=
                "metricID": "disk.mem.usedutilization",//告警指标
                "metricMaxValue": 0,//不需要处理
                "metricPeriod": 1,//几分钟一个周期
                "metricPeriodNum": 30,//持续几个周期
                "metricUnit": "%",//输入值后面的单位
                "metricValue": 90//输入的范围值
              },
              //一个阈值指标项
              {
                "id":'ecs'+Math.floor((Math.random()*9+1)*1000000),
                "alarmMethod": ["email","wx"], //告警方式
                "alarmType": "metric",//阈值报警还是事件报警
                "eventName": "",//事件名称
                "eventType": "",//事件类型
                "level": 1,//告警等级，严重还是普通等
                "metricCondition": ">", //>,<,>=,<=
                "metricID": "disk.mem.usedutilization",//告警指标
                "metricMaxValue": 0,//不需要处理
                "metricPeriod": 15,//几分钟一个周期
                "metricPeriodNum": 5,//持续几个周期
                "metricUnit": "%",//输入值后面的单位
                "metricValue": 60//输入的范围值
              }
            ]
          },
          //一条规则
          {
            "id":'ecs'+Math.floor((Math.random()*9+1)*1000000),
            "name": "云盘阈值", //告警规则名称
            "productType": "ecs",//产品类型
            "ruleRecords": [
              {
                "id":'ecs'+Math.floor((Math.random()*9+1)*1000000),
                "alarmMethod": ["phone","wx"], //告警方式
                "alarmType": "metric",//阈值报警还是事件报警
                "eventName": "",//事件名称
                "eventType": "",//事件类型
                "level": 2,//告警等级，严重还是普通等
                "metricCondition": ">=", //>,<,>=,<=
                "metricID": "disk.mem.usedutilization",//告警指标
                "metricMaxValue": 0,//不需要处理
                "metricPeriod": 1,//几分钟一个周期
                "metricPeriodNum": 30,//持续几个周期
                "metricUnit": "%",//输入值后面的单位
                "metricValue": 90//输入的范围值
              }
            ]
          },
          //一条规则
          {
            "id":'gpu'+Math.floor((Math.random()*9+1)*1000000),//每条规则ID
            "name": "异常事件报警", //告警规则名称
            "productType": "gpu",//产品类型
            "ruleRecords": [
              {
                "id":'ecs'+Math.floor((Math.random()*9+1)*1000000),
                "alarmMethod": ["phone","wx"], //告警方式
                "alarmType": "event",//阈值报警还是事件报警
                "eventName": ["crash","oom"],//事件名称
                "eventType": "abnormal_event",//事件类型
                "level": 2,//告警等级，严重还是普通等
                "metricCondition":"" , //>,<,>=,<=
                "metricID": "",//告警指标
                "metricMaxValue": 0,//不需要处理
                "metricPeriod": 0,//几分钟一个周期
                "metricPeriodNum": 0,//持续几个周期
                "metricUnit": "",//输入值后面的单位
                "metricValue": 0//输入的范围值
              }
            ]
          },
        ]
      }
}
export const productList = [
    {
        id:'ecs',
        name:'ecs'
    },
    // {
    //     id:'gpu',
    //     name:'GPU'
    // },
    // {
    //     id:'slb',
    //     name:'负载均衡'
    // },
    // {
    //     id:'vpc',
    //     name:'私有网络VPC'
    // },
    // {
    //     id:'safe',
    //     name:'安全组'
    // },
]

export const range_list=[
    {id:'>=',title:'>='},
    {id:'<=',title:'<='},
    {id:'>',title:'>'},
    {id:'<',title:'<'},
]
export const cycle_time=[
    {
        id:'1',
        title:'1分钟一个周期',
    },
    {
        id:'15',
        title:'15分钟一个周期',
    },
    {
        id:'30',
        title:'30分钟一个周期',
    },
    {
        id:'60',
        title:'60分钟一个周期',
    },
]
export const cycle_num=[
    {
        id:'1',
        title:'持续1个周期',
    },
    {
        id:'3',
        title:'持续3个周期',
    },
    {
        id:'5',
        title:'持续5个周期',
    },
    {
        id:'10',
        title:'持续10个周期',
    },
    {
        id:'15',
        title:'持续15个周期',
    },
    {
        id:'30',
        title:'持续30个周期',
    },
]
export const alarm_type=[
    {
        id:'2',
        title:'严重',
    },
    {
        id:'1',
        title:'告警',
    },
    {
        id:'0',
        title:'普通',
    },
]
export const notice_list = [{id:'email',name:"邮箱"},{id:'phone',name:"短信"}]
export const event_type=[
    {
        id:'abnormal_event',
        title:'异常事件',
    },
]
export const event_name=[
    {
        id:'crash',
        title:'宕机',
    },
    {
        id:'oom',
        title:'内存使用过载',
    },
    {
        id:'disk_read_only',
        title:'磁盘只读',
    },
    {
        id:'io_wrong',
        title:'IO错误',
    },
    {
        id:'disk_out_of_space',
        title:'磁盘空间耗尽',
    },
    {
        id:'network_packet_drop',
        title:'网络丢包',
    },
    {
        id:'kernelError',
        title:'内核异常',
    },
]
//应用策略通道沉默周期
export const cycle_period=[
    {
        id:'900',
        title:'15分钟'
    },
    {
        id:'1800',
        title:'30分钟'
    },
    {
        id:'3600',
        title:'60分钟'
    },
    {
        id:'10800',
        title:'3小时'
    },
    {
        id:'21600',
        title:'6小时'
    },
    {
        id:'43200',
        title:'12小时'
    },
    {
        id:'86400',
        title:'24小时'
    },
]