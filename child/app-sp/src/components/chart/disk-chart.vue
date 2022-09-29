<template>
    <div>
        <div :id="chart_id" class="chart" v-if="Object.keys(data).length>0"></div>
        <el-empty description="暂无数据" v-else></el-empty>
    </div>
    
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from 'vue-property-decorator';
import * as echarts from 'echarts/core';
import moment from 'moment';
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts';
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';
// import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { time } from 'echarts';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | DataZoomComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  DataZoomComponent,
  TransformComponent,
  BarChart,
//   LabelLayout,
//   UniversalTransition,
  CanvasRenderer,
  LineChart,
]);


@Component({

})
export default class Charts extends Vue{
    @Prop(String)chart_id!:string;
    @Prop({default:()=>{}})data!:any;
    @Prop(String)title!:string;
    // private units=['B','KB','MB','GB','TB','PB','EB','ZB']
    private initChart:any;
    private option: ECOption={
        title:{
            text:this.title,
        },
        
        xAxis: {},
        yAxis: {
            type: 'value'
        },
        grid: {
            bottom: 90
        },
        tooltip:{},
        series: []
    };
    mounted() {
        this.setOptions()
        window.addEventListener('resize' ,()=>{
            this.initChart && this.initChart.resize()
        }) 
        
    }
    @Watch("data",{immediate:true,deep:true})
    private watch_data(nv:any){
        this.setOptions()
    }
    private async setOptions(){
        if(!this.data[this.chart_id]){
            return;
        }
        let x_time = this.data[this.chart_id].time.map(item=>moment.utc(item).local().format("MM/DD HH:mm:ss").replace(' ', '\n'))
        this.option= {
            title:{
                text:this.title,
            },
            xAxis:{
                type:'category',
                data:x_time,
                boundaryGap:false,
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 50,
                    end: 100,
                    filterMode:'filter'
                }, {
                    type: 'slider',
                    start: 50,
                    end: 100,
                    filterMode:'filter'
                }
            ],
            grid: {
                bottom: 90
            },
            yAxis: {
                type: 'value'
            },
            series: [],
            tooltip:this.data[this.chart_id].tooltip ? this.data[this.chart_id].tooltip : {
                trigger: 'axis',
            }
        }
        this.data[this.chart_id].series.map((item:any)=>{
            (this.option.series as any).push({
                name:item.name,
                data: item.data,
                type: 'line',
                smooth: true
            })
        })
        this.$nextTick(()=>{
            if(!document.getElementById(this.chart_id)){
                return;
            }
            this.initChart = echarts.init(document.getElementById(this.chart_id) as any);            
            this.option && this.initChart && this.initChart.setOption(this.option);
        });
        
    }

}
</script>
<style lang="scss" scoped>
.chart{
    width: 100%;
    height: 400px;
}
</style>
