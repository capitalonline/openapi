<template>
  <el-card>
    <div :id="chart_id" :key="chart_id" class="chart"></div>
    <el-select v-model="selected_legend" @change="FnChangeSelected" v-if="legend && legend.length > 0" clearable>
      <el-option v-for="item in legend" :key="item" :value="item" :label="item"></el-option>
    </el-select>
    <div class="empty-box" v-if="!data.xTime || data.xTime.length === 0">
      <el-empty description="暂无数据"></el-empty>
    </div>
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
  @Prop({default: () => {
    return {
      title: '',
      unit: '',
      xTime: [],
      yValue: [],
      resize: 0
    }
  }}) private data!: any;
  private instance = null;
  private legend = [];
  private legend_relation = {};
  private selected_legend = '';
  private option: ECOption = {
    yAxis: {
      type: 'value'
    },
    grid: {
      bottom: 80
    },
    dataZoom: [
      {
        type: 'inside',
        start: 90,
        end: 100
      }, {
        start: 90,
        end: 100
      }
    ],
    series: []
  }

  private FnSetOption() {
    this.option.title = {
      text: this.data.title + '(' + this.data.unit + ')'
    };
    this.option.tooltip = {
      trigger: 'axis',
      confine: true,
      // formatter: '{b0}<br />'+ this.data.title + '(' + this.data.unit + ')' + ': {c0}'
    };
    this.FnGetxAxis();
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
    if (!this.data.xTime) {
      return
    }
    this.option.xAxis = {
      type: 'category',
      boundaryGap: false,
      data: this.data.xTime.map(item => {
        return moment(new Date(moment.utc(item).format())).format('MM/DD HH:mm:ss').replace(' ', '\n')
      }),
    };
    this.option.series = [];
    this.legend_relation = {};
    if (!this.data.legend || this.data.legend.length === 0) {
      this.option.series.push({
        name: this.data.title,
        data: this.data.yValue,
        type: 'line',
        smooth: true
      })
      return
    }
    if (this.data.type) {
      this.legend = this.data.legend.filter(item => item.indexOf(this.data.type) < 0);
    } else {
      this.legend = this.data.legend;
    }
    for(let i = 0; i < this.data.legend.length; i++) { // 一个legend对应两条线
      let item  = this.data.yValue[i];
      if (this.data.type) {
        if (this.data.legend[i].indexOf(this.data.type) < 0) {
          let legend = this.data.legend[i];
          this.data.legend[i]+= this.data.line_name[0];
          this.legend_relation[legend] = [this.data.legend[i]];
        } else {
          let legend = this.data.legend[i].replace(this.data.type, '');
          this.data.legend[i] = legend + this.data.line_name[1];
          this.legend_relation[legend].push(this.data.legend[i]);
        }
      } else {
        this.legend_relation[this.data.legend[i]] = [this.data.legend[i]];
      }
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
        if (this.legend_relation[this.selected_legend].includes(item)) {
          this.instance.dispatchAction({type: 'legendSelect', name: item})
        } else {
          this.instance.dispatchAction({type: 'legendUnSelect', name: item})
        }
      })
    }
  }

  @Watch('chart_id')
  private FnChangeChartId(newVal) {
    this.selected_legend = '';
    this.$nextTick(() => {
      this.instance = echarts.init(document.querySelector(`#${this.chart_id}`));
      this.FnSetOption();
    })
  }

  @Watch('data.resize')
  private FnChangeChart(newVal) {
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
  .empty-box {
    position: absolute;
    width: 100%;
    height: 80%;
    top: 20%;
    left: 0;
    background: #fff;
  }
}
</style>