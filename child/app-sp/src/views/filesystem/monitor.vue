<template>
    <div >
        <time-group :type="true" @fn-emit="getTime"></time-group>
        <el-card class="m-bottom20 m-top10">
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
                :title="`吞吐量(${chartData.bytes && chartData.bytes.unit ?chartData.bytes.unit : ''})`"
            ></disk-chart>
        </el-card>
        <el-card class="m-bottom20">
            <disk-chart
                :chart_id="'use'"
                :data="chartData"
                :title="`空间使用率(${chartData.spaceUse && chartData.spaceUse.unit ?chartData.spaceUse.unit : ''})`"
            ></disk-chart>
        </el-card>
        
    </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from 'vue-property-decorator';
import Service from '../../https/filesystem/list';
import TimeGroup from '../../components/timeGroup.vue'
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
        this.get_info()
    }
    private units=['B','KB','MB','GB','TB','PB','EB','ZB']
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
            region:this.info.region_id,
            start_time: moment(this.time[0] as any).utc().unix(),
            end_time:moment(this.time[1] as any).utc().unix(),
        }
        Promise.all([
            Service.get_iops({...req_data}),
            Service.get_bandwidth({...req_data}),
            Service.get_use({...req_data}),
        ]).then(res=>{
            this.chartData={
                iops:{
                    time:res[0].data.map(item=>item.time_at),
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
                },
                bandwidth:{
                    time:res[1].data.map(item=>item.time_at),
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
                },
                use:{
                    time:res[2].data.map(item=>item.time_at),
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
                            return '<div>'+list.join('<br>')+'</div>'
                        }
                    }
                } 
            }
            
        })
    }
    setData
}
</script>