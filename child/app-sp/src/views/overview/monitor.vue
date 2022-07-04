<template>
    <div>
        <el-select placeholder="请选择物理机产品类型名称" v-model="typeId">
            <el-option v-for="item in hostTypes" :key="item.host_product_id" :id="item.host_product_id" :label="item.name"></el-option>
        </el-select>
        <time-group @fn-emit="FnGetTimer"></time-group>
    </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import TimeGroup from '@/components/search/timeGroup.vue';
import LineEchart from '@/components/chart/list.vue';
import Service from '../../https/overview';
@Component({
    components:{
        TimeGroup,
        LineEchart
    }
})
export default class OverViewMonitor extends Vue{
    private hostTypes:any=[];
    private default_date_timer:any=[];
    private typeId:String=''
    created() {
        this.getHostTypes()
    }
    private async getHostTypes(){
        let res:any = await Service.get_host_type({})
        if(res.code==="Success"){
            this.hostTypes = res.data.host_product_list;
        }
    }
    private FnGetTimer(timer:any){
        this.default_date_timer = timer;
    }
}
</script>