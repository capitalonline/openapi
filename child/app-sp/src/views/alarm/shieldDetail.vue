<template>
    <el-dialog
      :title="'屏蔽详情'"
      :visible.sync="visibleSync"
      width="400"
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
        <div class="box">
            <el-descriptions title="" :column="1" labelClassName='label'>
                <el-descriptions-item v-for="(item,i) in info" :key="i" :label="item.label">
                    <span v-html="item.value" v-if="i!=='conditions'"></span>
                    <span v-else>
                        <span v-for="inn in item.value" :key="inn.id" class="item"><span class="item-label">{{inn.condition_object_ch}} : </span>{{inn.condition_value}}<br></span>
                    </span>
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </el-dialog>  
</template>
<script lang="ts">
import {Vue,Component,PropSync,Prop} from 'vue-property-decorator';
import Service from '../../https/alarm/list';

@Component({
    components:{
    }
})
export default class ShieldDetail extends Vue{
    @Prop()detaiId!:string;
    @PropSync('visible')visibleSync!:boolean;
    private info:any={
        shield_name:{label:'屏蔽名称',value:''},
        shield_mechanism_ch:{label:'告警机制',value:''},
        effective_scope_ch:{label:'抑制范围',value:''},
        // conditions:{label:'条件',value:[]},
        shield_time_ch:{label:'静默时间',value:''},
    }
    private id:string=this.detaiId
    created() {
        this.detail()
    }
    private async detail(){        
        let res:any = await Service.shield_detail({id:this.id})
        if(res.code==='Success'){
            this.info.shield_name.value = res.data.shield_name;
            this.info.shield_mechanism_ch.value = res.data.shield_mechanism_ch;
            this.info.effective_scope_ch.value = res.data.effective_scope_ch;
            this.info.conditions.value = res.data.conditions;
            this.info.shield_time_ch.value = res.data.shield_time_ch + '<br>' + '<div v-if="res.data.shield_start_time" class="m-top10">'+res.data.shield_start_time+'——'+res.data.shield_end_time+'</div>';
        }
    }
}
</script>
<style lang="scss">
.box{
    max-height: 300px;
    overflow-y: auto;

}
.label{
    width:100px;
}
.item{
    display: block;
    margin-bottom: 10px;
    .item-label{
        display: inline-block;
        width: 78px;
        text-align: right;
        margin-right: 30px;
    }
}
</style>