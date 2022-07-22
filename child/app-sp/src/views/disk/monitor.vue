<template>
    <div >
        <time-group @fn-emit="getTime"></time-group>
        <el-card class="m-bottom20 m-top10">
            <disk-chart
                :chart_id="'iops'"
                :data="chartData"
                :title="`IOPS`"
            ></disk-chart>
        </el-card>
        <el-card class="m-bottom20">
            <disk-chart
                :chart_id="'bytes'"
                :data="chartData"
                :title="`吞吐量(${chartData.bytes && chartData.bytes.unit ?chartData.bytes.unit : ''})`"
            ></disk-chart>
        </el-card>
        <el-card class="m-bottom20">
            <disk-chart
                :chart_id="'spaceUse'"
                :data="chartData"
                :title="`空间使用率(${chartData.spaceUse && chartData.spaceUse.unit ?chartData.spaceUse.unit : ''})`"
            ></disk-chart>
        </el-card>
        
    </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from 'vue-property-decorator';
import Service from '../../https/monitor/index';
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
        ecs_id:''
    })})info!:any;
    private data:any=this.info;
    private chartData:any={};
    private getTime(val){
        this.data.time = val;
        this.get_disk_info()
    }
    private get_disk_info(){
        if(!this.data.ecs_id){
            return;
        }
        const{ecs_id,order,time,subnet_ip,az_id,region_id,os_type}=this.data
        let req_data={
            hostId:ecs_id,
            byId:order,
            os:os_type,
            ip:subnet_ip,
            instanceType:'disk',
            region:region_id,
            replica:az_id,
            start: moment(time[0] as any).utc().format('YYYY-MM-DD HH:mm:ss'),
            end:moment(time[1] as any).utc().format('YYYY-MM-DD HH:mm:ss'),
        }
        Promise.all([
            Service.get_disk_info('disk',{...req_data,queryType:'use'}),
            Service.get_disk_info('disk',{...req_data,queryType:'readbytes'}),
            Service.get_disk_info('disk',{...req_data,queryType:'writebytes'}),
            Service.get_disk_info('disk',{...req_data,queryType:'readiops'}),
            Service.get_disk_info('disk',{...req_data,queryType:'writeiops'}),
        ]).then(res=>{
            this.chartData={
                spaceUse:{
                    time:res[0].data.xTime,
                    unit:res[0].data.unit,
                    series:[
                        {
                            name:'use',
                            data:res[0].data.yValues[0]
                        },
                    ]
                },
                bytes:{
                    time:res[1].data.xTime,
                    unit:res[1].data.unit,
                    series:[
                        {
                            name:'read',
                            data:res[1].data.yValues[0]
                        },
                        {
                            name:'write',
                            data:res[2].data.yValues[0]
                        }
                    ]
                },
                iops:{
                    time:res[3].data.xTime,
                    unit:res[3].data.unit,
                    series:[
                        {
                            name:'read',
                            data:res[3].data.yValues[0]
                        },
                        {
                            name:'write',
                            data:res[4].data.yValues[0]
                        }
                    ]
                } 
            }
            console.log("this.chartData",this.chartData)
            
        })
    }
    setData
}
</script>