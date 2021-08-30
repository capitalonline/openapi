<template>
  <el-card>
    <div :id="chart_id" class="chart"></div>
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
  DataZoomComponentOption
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
  CanvasRenderer
} from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
   LineSeriesOption | TooltipComponentOption | TitleComponentOption | GridComponentOption | DataZoomComponentOption
>;

// 注册必须的组件
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer, DataZoomComponent]
);

import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class LineEchart extends Vue{
  @Prop({default: 'id'}) private chart_id!: string;
  @Prop({default: ''}) private title!: string;
  @Prop({default: []}) private time_frame!: Array<string>;
  private instance = null;

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
    let y_data = [];
    let minute = 1000 * 60;
    for(let i = 0; i < Math.floor((end_time - start_time)/minute); i++) {
      x_data.push(moment(new Date(start_time + i*minute)).format('MM-DD hh:mm'))
      y_data.push(Math.random()*100)
    }
    this.option.xAxis = {
      type: 'category',
      boundaryGap: false,
      data: x_data
    };
    this.option.series = [{
      data: y_data,
      type: 'line',
      smooth: true
    }]
  }

  private mounted() {
    this.instance = echarts.init(document.querySelector(`#${this.chart_id}`));
    this.FnSetOption();
    window.addEventListener('resize', () => {
      if (this.instance) {
        this.instance.resize();
      }
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
</style>