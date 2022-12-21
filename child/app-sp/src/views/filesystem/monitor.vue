<template>
    <div >
        <time-group :type="true" @fn-emit="getTime" :dis_day="30" :timeList="timeList"></time-group>
        <el-card class="m-bottom20">
            <disk-chart
                :chart_id="'use'"
                :data="chartData"
                :title="`空间用量(GB)`"
            ></disk-chart>
        </el-card>
        <!-- <el-card class="m-bottom20 m-top10">
            <disk-chart
                :chart_id="'iops'"
                :data="chartData"
                :title="`IOPS`"
            ></disk-chart>
        </el-card>
        <el-card class="m-bottom20">
            <disk-chart
                :chart_id="'bandwidth'"
                :data="chartData"
                :title="`带宽(MB/s)`"
            ></disk-chart>
        </el-card> -->
        
        
    </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from 'vue-property-decorator';
import Service from '../../https/filesystem/list';
import TimeGroup from '../../components/search/timeGroup.vue'
import DiskChart from '../../components/chart/disk-chart.vue';
import moment from 'moment'
@Component({
    components:{
        TimeGroup,
        DiskChart
    }
})
export default class Monitor extends Vue{
    @Prop({default:()=>({
        id:'',
        region_id:''
    })})info!:any;
    private time:any=[];
    private chartData:any={};
    private getTime(val){
        this.time = val;
        console.log('this.time',this.time)
        this.get_info()
    }
    private units=['B','KB','MB','GB','TB','PB','EB','ZB'];
    private timeList={
        '1_hour': {label: '1小时', time: 1000 * 60 * 60},
        '12_hour': {label: '12小时', time: 1000 * 60 * 60 * 12},
        day: {label: '1天', time: 1000 * 60 * 60 * 24},
        week: {label: '7天', time: 1000 * 60 * 60* 24 * 7},
        '14_day': {label: '14天', time: 1000 * 60 * 60* 24 * 14}
    }
    private computeUnit(value,num=0){
        if(value>=1024){
            return this.computeUnit(value/1024,++num)
        }else{
            return value.toFixed(2) + this.units[num];
        }
        // console.log("computeUnit",value.toFixed(2) + this.units[num])
        
    }
    private get_info(){
        if(!this.info.id || !this.info.region_id){
            return;
        }
        let req_data={
            volume_id:this.info.id,
            region_id:this.info.region_id,
            start_time: moment(this.time[0] as any).utc().unix(),
            end_time:moment(this.time[1] as any).utc().unix(),
        }
        Promise.all([
            Service.get_iops({...req_data}),
            Service.get_bandwidth({...req_data}),
            Service.get_use({...req_data}),
        ]).then(res=>{
            this.chartData={
                iops:res[0].data && res[0].data.length>0 ? {
                    time:res[0].data.map(item=>moment.unix(item.time_at)),
                    unit:res[0].data.unit,
                    series:[
                        {
                            name:'iops_read',
                            data:res[0].data.map(item=>item.iops_read)
                        },
                        {
                            name:'iops_write',
                            data:res[0].data.map(item=>item.iops_write)
                        },
                        
                    ]
                }:null,
                bandwidth:res[1].data && res[1].data.length>0 ? {
                    time:res[1].data.map(item=>moment.unix(item.time_at)),
                    unit:res[1].data.unit,
                    series:[
                        {
                            name:'bandwidth_read',
                            data:res[1].data.map(item=>item.bandwidth_read)
                        },
                        {
                            name:'bandwidth_write',
                            data:res[1].data.map(item=>item.bandwidth_write)
                        }
                    ]
                }:null,
                use:res[2].data && res[2].data.length>0 ? {
                    time:res[2].data.map(item=>moment.unix(item.time_at)),
                    unit:res[2].data.unit,
                    series:[
                        {
                            name:'used',
                            data:res[2].data.map((item:any)=>(item.used ? 
                                (parseFloat(item.used)/1024/1024/1024)<1 ? (parseFloat(item.used)/1024/1024/1024).toFixed(6) : (parseFloat(item.used)/1024/1024/1024).toFixed(2) 
                                : item.used))
                        },
                        {
                            name:'total',
                            data:res[2].data.map((item:any)=>(item.total ? 
                                (parseFloat(item.total)/1024/1024/1024)<1 ? (parseFloat(item.total)/1024/1024/1024).toFixed(6) : (parseFloat(item.total)/1024/1024/1024).toFixed(2) 
                                : item.total))
                        }
                    ],
                    tooltip:{
                        trigger: 'axis',
                        formatter:(params)=>{
                            let list=[]
                            params.map(item=>{
                                let val = this.computeUnit(item.value*1024*1024*1024)
                                list.push(item.marker+'<span style="margin-right:10px">'+item.seriesName+'</span>'+val)
                            })
                            return '<div>'+params[0].axisValue.replace('\n',' ')+'<br>'+list.join('<br>')+'</div>'
                        }
                    }
                }:null 
            }
            
        })
    }
    // setData
}
</script>