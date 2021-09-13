<template>
  <el-card>
    <div :id="chart_id" :key="chart_id" class="chart"></div>
    <el-select v-model="selected_legend" @change="FnChangeSelected" v-if="data.legend && data.legend.length > 0" clearable>
      <el-option v-for="item in data.legend" :key="item" :value="item" :label="item"></el-option>
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
export default class LineEchart extends Vue {
  @Prop({default: 'id'}) private chart_id!: string;
  @Prop({default: ''}) private title!: string;
  @Prop({default: () => {
    return {
      xTime: [],
      yValue: [],
      resize: 0
    }
  }}) private data!: any;
  private instance = null;
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
    console.log('option', this.option)
    if(this.instance) {
      this.instance.setOption(this.option)
    }
  }

  private FnGetxAxis() {
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
      data: this.data.xTime,
    };
    this.option.series = [];
    if (!this.data.legend || this.data.legend.length === 0) {
      this.option.series.push({
        name: this.title,
        data: this.data.yValue,
        type: 'line',
        smooth: true
      })
      return
    }
    for(let i = 0; i < this.data.legend.length; i++) {
      let item  = this.data.yValue[i];
      this.option.series.push({
        name: this.data.legend[i],
        data: item,
        type: 'line',
        smooth: true
      })
    }
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
    if (!this.selected_legend) {
      this.instance.dispatchAction({type: 'legendAllSelect'})
    } else {
      this.data.legend.forEach(item => {
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
      this.instance = echarts.init(document.querySelector(`#${this.chart_id}`));
      this.FnSetOption();
    })
  }

  @Watch('data.resize')
  private FnChangeChart(newVal) {
    console.log('newVal', newVal)
    this.FnSetOption();
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