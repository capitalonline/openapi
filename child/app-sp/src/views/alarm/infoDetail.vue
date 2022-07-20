<template>
    <el-dialog
      :title="'详情'"
      :visible.sync="visibleSync"
      width="400"
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
        <el-descriptions title="" :column="1" >
            <el-descriptions-item v-for="(item,i) in detail" :key="i" :label="item.label">
                {{item.value}}
            </el-descriptions-item>
        </el-descriptions>
    </el-dialog>    
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync} from 'vue-property-decorator';
@Component({})
export default class InfoDetail extends Vue{
    @Prop({default:()=>{}})info!:any;
    @PropSync('visible')visibleSync!:boolean;
    private notice={
        email:'邮箱',
        phone:'短信'

    }
    private detail:any={
        productType:{label:'产品类型',value:this.info.productType},
        instanceID:{label:'故障资源ID',value:this.info.instanceID},
        strategyName:{label:'策略名称',value:this.info.strategyName},
        ruleName:{label:'规则名称',value:this.info.ruleName},
        ruleDesc:{label:'报警规则',value:this.info.ruleDesc},
        azCode:{label:'所属可用区',value:this.info.azCode},
        createTime:{label:'发生时间',value:this.info.createTime},
        alarmType:{label:'报警类型',value:this.info.alarmType==='metric' ? '指标报警' :'事件报警'},
        contactGroup:{label:'通知对象',value:this.info.contactGroup.join(',')},
        alarmMethod:{label:'通知方式',value:this.info.alarmMethod.length===2 ? '邮箱+短信' : this.notice[this.info.alarmMethod[0]]},
        dealStatus:{label:'处理结果',value:this.info.dealStatus ? '已处理' : '未处理'},
    }
}
</script>