<template>
    <div>
        <back-header :title="'屏蔽详情'" back_url="/alarmInfo"></back-header>
        <div v-for="(item,i) in info" :key="i">
            <span>{{item.label}}</span>
            <span v-html="item.value"></span>
        </div>
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
        this.id = this.$route.params.id;
        this.detail()
    }
    private async detail(){
        console.log('id',this.$route.params.id);
        
        let res:any = await Service.shield_detail({id:this.id})
        if(res.code==='Success'){
            this.info.shield_name.value = res.data.shield_name;
            this.info.shieldshield_mechanism_ch_name.value = res.data.shield_mechanism_ch;
            this.info.effective_scope_ch.value = res.data.effective_scope_ch;
            this.info.conditions.value = res.data.conditions;
            this.info.shield_time_ch.value = res.data.shield_time_ch + '<br>' + '<span v-if="res.data.shield_start_time">'+res.data.shield_start_time+'——'+res.data.shield_end_time+'</span>';
        }
    }
}
</script>