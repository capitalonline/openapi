<template>
    <div>
        <div>
            <el-select placeholder="请选择物理机产品类型名称" v-model="typeId">
                <el-option v-for="item in hostTypes" :key="item.host_product_id" :id="item.host_product_id" :label="item.name"></el-option>
            </el-select>
            <time-group @fn-emit="FnGetTimer"></time-group>
        </div>
        <div>
            <line-echart
                chart_id="cpu_chart"
                :data="cpu_used"
                class="item"
            >

            </line-echart>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import TimeGroup from '@/components/search/timeGroup.vue';
import LineEchart from '@/components/chart/list.vue';
import Service from '../../https/overview';
import moment from 'moment';
@Component({
    components:{
        TimeGroup,
        LineEchart
    }
})
export default class OverViewMonitor extends Vue{
    private hostTypes:any=[];
    private default_date_timer:any=[];
    private typeId:String='';
     private cpu_used = {
        title: 'CPU使用率',
        unit: '',
        xTime: [],
        yValue: [],
        resize: 0
    };

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
        this.get_cpu_percent()
    }
    private async get_cpu_percent(){
        let res:any = await Service.get_cpu_percent({
            hostIds:'ins-bqlayimq2olvakjg',
            hostIps:'',
            region:'',
            replica:'',
            start:moment.utc(this.default_date_timer[0]).format('YYYY-MM-DD HH:mm:ss'),
            end:moment.utc(this.default_date_timer[1]).format('YYYY-MM-DD HH:mm:ss'),
            totalCore:'',
        })
    }
}
</script>