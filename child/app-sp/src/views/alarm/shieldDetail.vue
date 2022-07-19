<template>
    <div class="detail">
        <back-header :title="'屏蔽详情'" back_url="/alarmInfo"></back-header>
        <el-card>
            <el-descriptions title="" :column="1" labelClassName='label'>
                <el-descriptions-item v-for="(item,i) in info" :key="i" :label="item.label">
                    <span v-html="item.value" v-if="i!=='conditions'"></span>
                    <span v-else>
                        <span v-for="inn in item.value" :key="inn.id">{{inn.condition_object_ch}} : {{inn.id}}<br></span>
                    </span>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        
        <!-- <div v-for="(item,i) in info" :key="i" class="item">
            <span>{{item.label}}:</span>
            <span v-html="item.value" v-if="i!=='conditions'"></span>
            <span v-else>
                <div v-for="inn in item.value" :key="inn.id">{{inn.condition_object_ch}} : {{inn.id}}</div>
            </span>
        </div> -->
    </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import BackHeader from '../../components/backHeader.vue';
import Service from '../../https/alarm/list';

@Component({
    components:{
        BackHeader
    }
})
export default class ShieldDetail extends Vue{
    private info:any={
        shield_name:{label:'屏蔽名称',value:''},
        shield_mechanism_ch:{label:'告警机制',value:''},
        effective_scope_ch:{label:'抑制范围',value:''},
        conditions:{label:'条件',value:[]},
        shield_time_ch:{label:'静默时间',value:''},
    }
    private id:string=''
    created() {
        this.id = this.$route.query.id as string;
        this.detail()
    }
    private async detail(){        
        let res:any = await Service.shield_detail({id:this.id})
        if(res.code==='Success'){
            this.info.shield_name.value = res.data.shield_name;
            this.info.shield_mechanism_ch.value = res.data.shield_mechanism_ch;
            this.info.effective_scope_ch.value = res.data.effective_scope_ch;
            this.info.conditions.value = res.data.conditions;
            this.info.shield_time_ch.value = res.data.shield_time_ch + '<br>' + '<span v-if="res.data.shield_start_time">'+res.data.shield_start_time+'——'+res.data.shield_end_time+'</span>';
        }
    }
}
</script>
<style lang="scss">
.label{
    width:100px;
}
</style>