<template>
  <el-card>
    <div :id="chart_id" :key="chart_id" class="chart"></div>
    <el-select v-model="selected_legend" @change="FnChangeSelected">
      <el-option v-for="item in legend_list" :key="item" :value="item" :label="item"></el-option>
    </el-select>
  </el-card>
</template>

<script lang="ts">
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
// 系列类型的定义后缀都为 SeriesOption
import {
  LineChart,
  LineSeriesOption
} from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
  LegendScrollComponent,
  LegendComponentOption,
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
  CanvasRenderer
} from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
   LineSeriesOption | TooltipComponentOption | TitleComponentOption | GridComponentOption | DataZoomComponentOption | LegendComponentOption
>;

// 注册必须的组件
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer, DataZoomComponent, LegendScrollComponent]
);

import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class LineEchart extends Vue{
  @Prop({default: 'id'}) private chart_id!: string;
  @Prop({default: ''}) private title!: string;
  @Prop({default: []}) private time_frame!: Array<string>;
  private instance = null;
  private legend_list = [];
  private selected_legend = '';
  private 
  private option: ECOption = {
    yAxis: {
      type: 'value'
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      }, {
        start: 0,
        end: 10
      }
    ],
    tooltip: {
      formatter: '{b0}<br />'+ this.title + ': {c0}'
    },
    series: []
  }

  private FnSetOption() {
    this.option.title = {
      text: this.title
    }
    this.FnGetxAxis();
    this.instance.setOption(this.option)
  }

  private FnGetxAxis() {
    let start_time = new Date(this.time_frame[0]).getTime();
    let end_time = new Date(this.time_frame[1]).getTime();
    let x_data = [];
    let y_data_0 = [];
    let y_data_1 = [];
    let y_data_2 = [];
    let y_data_3 = [];
    let minute = 1000 * 60;
    for(let i = 0; i < Math.floor((end_time - start_time)/minute); i++) {
      x_data.push(moment(new Date(start_time + i*minute)).format('MM-DD hh:mm'))
      y_data_0.push(Math.random()*100)
      y_data_1.push(Math.random()*100)
      y_data_2.push(Math.random()*100)
      y_data_3.push(Math.random()*100)
    }
    this.option.legend = {
        type: 'scroll',
        orient: 'vertical',
        right: -20,
        top: 20,
        bottom: 20,
        show: false
    };
    this.option.xAxis = {
      type: 'category',
      boundaryGap: false,
      data: x_data
    };
    this.option.series = [{
      name: '1',
      data: y_data_0,
      type: 'line',
      smooth: true
    },{
      name: '2',
      data: y_data_1,
      type: 'line',
      smooth: true
    },{
      name: '3',
      data: y_data_2,
      type: 'line',
      smooth: true
    },{
      name: '4',
      data: y_data_3,
      type: 'line',
      smooth: true
    }]
    this.legend_list = ['0','1','2','3','4'];
    this.selected_legend = '0';
  }

  private mounted() {
    this.FnChangeChartId(this.chart_id);
    window.addEventListener('resize', () => {
      if (this.instance) {
        this.instance.resize();
      }
    })
  }

  private FnChangeSelected() {
    if (this.selected_legend === '0') {
      this.instance.dispatchAction({type: 'legendAllSelect'})
    } else {
      this.legend_list.forEach(item => {
        if (item === this.selected_legend) {
          this.instance.dispatchAction({type: 'legendSelect', name: item})
        } else {
          this.instance.dispatchAction({type: 'legendUnSelect', name: item})
        }
      })
    }
  }

  @Watch('chart_id')
  private FnChangeChartId(newVal) {
    this.$nextTick(() => {
      console.log('chart_id', this.chart_id, document.querySelector(`#${this.chart_id}`))
      this.instance = echarts.init(document.querySelector(`#${this.chart_id}`));
      this.FnSetOption();
    })
  }
}

</script>

<style lang="scss" scoped>
.chart-card {
  border: 1px solid #e7e7e7;
}
.chart {
  width: 100%;
  height: 300px;
}
.el-card {
  position: relative;
  .el-select {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>