<template>
    <div class="snapshot-monitor">
        <action-block :search_option="search_option" @fn-search = "FnSearch" :isShowBg="false"></action-block>
        <div class="title m-bottom10">
            <div class="m-right10">容量监控信息  <span class="error_message">（监控数据每1小时更新一次）</span></div> 
            <!-- <el-select v-model="region_id" @change="change">
                <el-option v-for="item in regionList" :label="item.region_name" :value="item.region_id" :key="item.region_id"></el-option>
            </el-select> -->
        </div>
        
        <time-group class="m-bottom10" :dis_day="16" :type="true" :timeList="timeList" @fn-emit="getTime"></time-group>
        <disk-chart
            :chart_id="'storage'"
            :data="chartData"
            :title="`快照容量(GB)`"
        ></disk-chart>
        
        
    </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from 'vue-property-decorator';
import Service from '../../https/monitor/index';
import SnapshotService from '../../https/snapshot/list'
import TimeGroup from '../../components/search/timeGroup.vue'
import DiskChart from '../../components/chart/disk-chart.vue';
import ActionBlock from '../../components/search/actionBlock.vue'
// import {FnGetRegion} from '../../utils/getRegionInfo'
import moment from 'moment'
@Component({
    components:{
        TimeGroup,
        DiskChart,
        ActionBlock
    }
})
export default class Monitor extends Vue{
    @Prop({default:()=>({
        ecs_id:''
    })})info!:any;
    private data:any=this.info;
    private chartData:any={};
    private region_id:string=''
    private regionList:any=[]
    private monitorIds:Array<String>=[]
    private search_value:any={}
    private search_option:any={
        customer_id:{placeholder:'请输入客户ID'},
        customer_name:{placeholder:'请输入客户名称'},
    }
    private timeList={
        '6_hour': {label: '6小时', time: 1000 * 60 * 60 * 6},
        '12_hour': {label: '12小时', time: 1000 * 60 * 60 * 12},
        day: {label: '1天', time: 1000 * 60 * 60 * 24},
        '3_day': {label: '3天', time: 1000 * 60 * 60 * 24 * 3},
        week: {label: '7天', time: 1000 * 60 * 60* 24 * 7},
        '14_day': {label: '14天', time: 1000 * 60 * 60* 24 * 14}
    }
    created() {
        this.getMonitorId()
    }
    private FnSearch(data:any={}){
        this.search_value=data
        this.getMonitorId()
    }
    @Watch("$store.state.pod_id")
    private watch_pod(nv){
      if(!nv){
        return;
      }
      this.getData()
    }
    private getTime(val){
        this.data.time = val;
        this.monitorIds.length>0 && this.getData()
    }
    private async getMonitorId(){//获取盘id
        let res:any =await SnapshotService.get_monitor_id({
            pod_id:this.$store.state.pod_id,
            customer_id:this.search_value.customer_id,
            customer_name:this.search_value.customer_id,
        })
        if(res.code==='Success'){
            this.monitorIds = res.data
            this.getData()
        }
    }
    private async getData(){//获取监控数据
        const {time} = this.data
        console.log('this.chartData',this.chartData)
        let res:any = await SnapshotService.get_snapshot_info({
            volume_id:this.monitorIds,
            start_time: moment(time[0] as any).utc().unix(),
            end_time:moment(time[1] as any).utc().unix(),
        })
        if(res.code==='Success'){
            let time:any = res.data.map(item=>moment.unix(item.time_at))
            let value:any = res.data.map(item=>item.total_size.toFixed(2))
            if(value.length===0){
                this.chartData={}
                return;
            }
            this.chartData={
                storage:{
                    time:time,
                    unit:'',
                    series:[
                        {
                            name:'容量',
                            data:value
                        },
                    ]
                }
            }
            console.log('this.chartData',this.chartData)
            
        }
    }
}
</script>
<style lang="scss" scoped>
.snapshot-monitor{
    padding: 24px;
    border-top: 1px solid #ebebf7;
    background: #fff;
    .title{
        display: flex;
        align-items: center;
    }
}
</style>