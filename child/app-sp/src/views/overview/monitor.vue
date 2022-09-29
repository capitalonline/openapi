<template>
    <div class="m-bottom20">
        <div class="monitor">
            <el-select placeholder="请选择物理机产品类型名称" :multiple="true" v-model="productList" @change="changeProductType">
                <el-option v-for="item in hostTypes" :key="item.host_product_id" :value="item.host_product_id" :label="item.name"></el-option>
            </el-select>
            <span class="m-left10">物理机总台数:<span class="num_message"> {{Object.keys(physicalInfo).length}} </span>台</span>
            <time-group :dis_day="366" :timeList="timeList" @fn-emit="FnGetTimer"></time-group>
        </div>
        <div class="chart-box">
            <line-echart
                chart_id="cpu_chart"
                :data="cpu_used"
                class="item"
            ></line-echart>
            <line-echart
                chart_id="ram_chart"
                :data="memory_used"
                class="item"
            ></line-echart>
        </div>
        <div class="chart-box">
            <line-echart
                chart_id="graphics_card"
                :data="graphics_card_used"
                class="item"
            ></line-echart>
            <line-echart
                chart_id="graphics_ram"
                :data="graphics_ram_used"
                class="item"
            ></line-echart>
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
    private productList:any=[];
    private physicalInfo:any=[]
    private timeList={
        day: {label: '最近1天', time: 1000 * 60 * 60 * 24},
        week: {label: '最近7天', time: 1000 * 60 * 60* 24 * 7},
        '30_day': {label: '最近30天', time: 1000 * 60 * 60* 24 * 14},
        '90_day': {label: '最近90天', time: 1000 * 60 * 60* 24 * 14}
    }
    private cpu_used = {
        title: 'CPU使用率',
        unit: '',
        xTime: [],
        yValue: [],
        resize: 0
    };
    private memory_used = {
        title: '内存使用率',
        unit: '',
        xTime: [],
        yValue: [],
        resize: 0
    };
    private graphics_card_used = {
        title: '显卡使用率',
        unit: '',
        xTime: [],
        yValue: [],
        resize: 0
    };
    private graphics_ram_used = {
        title: '显存使用率',
        unit: '',
        xTime: [],
        yValue: [],
        resize: 0
    };

    created() {
        this.getHostTypes()
    }
    private async getHostTypes(){
        let res:any = await Service.get_host_type({
            pod_id:this.$store.state.pod_id
        })
        if(res.code==="Success"){
            this.hostTypes = res.data.host_product_list;
        }
    }
    private FnGetTimer(timer:any){
        this.default_date_timer = timer;
        this.init()
    }
    private changeProductType(){
        // this.physicalList=[]
        this.physicalInfo={}
        console.log('this.productList',this.productList)
        let list = this.hostTypes.filter(item=>this.productList.includes(item.host_product_id))
        console.log('list',list)
        list.map(item=>{
            item.host_infos.map(inn=>{
                this.physicalInfo[inn.host_name]={
                    hostIp:inn.host_ip,//一个物理机的管理网ip只有一个嘛
                    region:inn.region_id,
                    az:inn.az_id,
                    gpu_count:inn.gpu_count,//总量即卡的数量
                    total_gpu_capacity:inn.total_gpu_capacity
                }
            })
            
            // this.physicalList=[...this.physicalList,...item.host_infos]
        })
        console.log('this.physicalInfo',this.physicalInfo)
        this.init()
    }
    private init(){
        //各个物理机产品之间的物理机会重复嘛
        if(Object.keys(this.physicalInfo).length===0){
            return;
        }
        let values:any = Object.values(this.physicalInfo)
        let total:number = values.reduce((total,item)=>{
            return total+item.gpu_count
        },0)
        let req={
            hostIds:Object.keys(this.physicalInfo).join('|'),
            hostIps:values.map(item=>item.hostIp).join('|'),
            region:values[0].region,
            replica:values[0].az,
            start:moment.utc(this.default_date_timer[0]).format('YYYY-MM-DD HH:mm:ss'),
            end:moment.utc(this.default_date_timer[1]).format('YYYY-MM-DD HH:mm:ss'),
        }
        Promise.all([
            Service.get_cpu_percent({...req,totalCore:total}),//这个传总核数
            Service.get_ram_percent({...req,total}),
            Service.get_gpu_percent({...req,queryType:'memory',total}),
            Service.get_gpu_percent({...req,queryType:'gpu',total}),
        ]).then(res=>{

        })
    }
}
</script>
<style lang="scss" scoped>
.monitor{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.chart-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
  .item {
    width: 49%;
    // margin-bottom: 20px;
  }

}
</style>