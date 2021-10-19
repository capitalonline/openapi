<template>
  <div class="monitor">
    <back-header title="云服务器监控" back_url="/instance"></back-header>
    <el-card class="m-bottom20">
      <template #header>
        <span>云服务器详情</span>
      </template>
      <div class="detail-box">
        <div v-for="(item, key) in detail_info" :key="key" class="row">
          <span class="left-title">{{ item.label }}:</span>
          <span>{{ item.value }}</span>
        </div>
      </div>
    </el-card>
    
    <el-card class="tab-card">
      <el-tabs v-model="default_tab" type="card">
        <el-tab-pane v-for="(value, tab) in tab_list" :key="tab" :label="value" :name="tab"></el-tab-pane>
      </el-tabs>

      <time-group @fn-emit="FnGetTimer"></time-group>

      <div class="chart-box" v-if="default_tab === 'instance'">
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
        <line-echart 
          chart_id="system_chart"
          :data="system_load"
          class="item">
        </line-echart>
      </div>

      <div class="chart-box" v-if="default_tab === 'net'">
        <line-echart 
          chart_id="net_chart"
          :data="net_in_out"
          class="item"
        ></line-echart>
        <line-echart 
          chart_id="net_rate_chart"
          :data="net_rate"
          class="item"
        ></line-echart>
      </div>

      <div class="chart-box" v-if="default_tab === 'disk'">
        <line-echart 
          chart_id="disk_chart"
          :data="disk_used"
          class="item"
        ></line-echart>
        <line-echart 
          chart_id="disk_through_chart"
          :data="disk_bytes"
          class="item"
        ></line-echart>
        <line-echart 
          chart_id="disk_iops_chart"
          :data="disk_iops"
          class="item">
        </line-echart>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import BackHeader from '../../components/backHeader.vue';
import TimeGroup from '../../components/search/timeGroup.vue';
import LineEchart from '../../components/chart/list.vue';
import DetailService from '../../https/instance/record_detail';
import Service from '../../https/monitor/index';
import moment from 'moment';

@Component({
  components: {
    BackHeader,
    TimeGroup,
    LineEchart
  }
})
export default class Monitor extends Vue{
  $route;
  private ecs_info = {
    region_id: '',
    az_id: '',
    private_net_ip: ''
  };
  private detail_info = {
    ecs_name: {label: '实例名称', value: ''},
    ecs_id: {label: '实例ID', value: ''},
    ecs_rule: {label: '云服务器规格', value: ''},
    az_name: {label: '地域及可用区', value: ''},
    system_disk_conf: {label: '系统盘', value: ''},
    os_info: {label: '镜像', value: ''},
    public_net_ip: {label: '公网IP', value: ''},
    private_net_ip: {label: '私网IP', value: ''},
    status: {label: '运行状态', value: ''}
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
  private system_load = {
    title: '系统平均负载',
    unit: '',
    xTime: [],
    yValue: [],
    resize: 0,
    legend: ['1m', '5m', '15m']
  };
  private net_in_out = {
    title: '网络流量',
    unit: '',
    xTime: [],
    yValue: [],
    resize: 0,
    legend: [],
    line_name: ['出网流量', '入网流量'],
    type: 'double_line'
  };
  private net_rate = {
    title: '网络吞吐量',
    unit: '',
    xTime: [],
    yValue: [],
    resize: 0,
    legend: [],
    line_name: ['出网流量速率', '入网流量速率'],
    type: 'double_line'
  };
  private disk_used = {
    title: '磁盘使用率',
    unit: '',
    xTime: [],
    yValue: [],
    resize: 0,
    legend: []
  };
  private disk_iops = {
    title: '磁盘IOPS',
    unit: '',
    xTime: [],
    yValue: [],
    resize: 0,
    legend: [],
    line_name: ['读', '写'],
    type: 'double_line'
  };
  private disk_bytes = {
    title: '磁盘吞吐量',
    unit: '',
    xTime: [],
    yValue: [],
    resize: 0,
    legend: [],
    line_name: ['读', '写'],
    type: 'double_line'
  }
  private default_tab = '';
  private tab_list = {
    instance: '主机',
    net: '网络',
    disk: '磁盘',
    gpu: 'GPU'
  }
  private default_date_timer = [];
  private FnHandleTime(time) {
     
  }
  
  private FnGetTimer(timer) {
    this.default_date_timer = timer;
    this.FnGetChartData();
  }
  private FnGetChartData() {
    if (!this.detail_info.ecs_id.value) {
      return
    }
    let reqData = {
      id: this.detail_info.ecs_id.value,
      // region: this.ecs_info.region_id,
      // replica: this.ecs_info.az_id,
      ip: this.ecs_info.private_net_ip,
      region: 'cn-bj',
      replica: 'A',
      // ip: '10.1.2.4',
      instanceType: 'vm',
      start: moment.utc(this.default_date_timer[0]).format('YYYY-MM-DD HH:mm:ss'),
      end: moment.utc(this.default_date_timer[1]).format('YYYY-MM-DD HH:mm:ss')
    }
    if (this.default_tab === 'instance') {
      this.FnGetCpu(reqData);
      this.FnGetMemory(reqData);
      this.FnGetLoad(reqData);
    } else if (this.default_tab === 'disk') {
      this.FnGetDiskInfo(reqData);
    } else if (this.default_tab === 'net') {
      this.FnGetNetInfo(reqData);
    }
  }
  private async FnGetDetail() {
    const resData: any = await DetailService.get_detail({
      ecs_id: this.$route.params.id
    })
    if ( resData.code === 'Success' ) {
      let data = resData.data;
      this.ecs_info = {
        region_id: data.region_id,
        az_id: data.az_id,
        private_net_ip: data.pipe.private_net_ip[0]
      }
      this.detail_info.ecs_name.value = data.ecs_name;
      this.detail_info.ecs_id.value = data.ecs_id;
      this.detail_info.ecs_rule.value = 
        `${data.ecs_rule.cpu_num}${data.ecs_rule.cpu_unit}${data.ecs_rule.ram}${data.ecs_rule.ram_unit}`;
      this.detail_info.az_name.value = data.az_name;
      this.detail_info.system_disk_conf.value = 
        `${data.disk.system_disk_conf.disk_name} ${data.disk.system_disk_conf.size}${data.disk.system_disk_conf.unit}`;
      this.detail_info.os_info.value = data.os_info.system;
      this.detail_info.private_net_ip.value = data.pipe.private_net_ip[0];
      this.detail_info.status.value = data.status_display;
      this.FnGetChartData();
    }
  }
  private async FnGetCpu(reqData) {
    let resData: any = await Service.get_cpu(Object.assign(
      { queryType: 'use_total' },
      reqData
    ))
    this.FnHandleSingleData('cpu_used', resData);
  }
  private async FnGetMemory(reqData) {
    let resData: any = await Service.get_memory(Object.assign(
      { queryType: 'used' },
      reqData
    ))
    this.FnHandleSingleData('memory_used', resData);
  }
  private FnHandleSingleData(type, resData) { // 处理cpu，内存
    if (resData.code === 'Success') {
      this[type].xTime = resData.data.xTime;
      this[type].yValue = resData.data.yValues;
      this[type].unit = resData.data.unit;
    }
    this[type].resize++;
  }
  private async FnGetLoad(reqData) {
    this.system_load.yValue = [];
    let legend = this.system_load.legend;
    Promise.all([Service.get_load(Object.assign({queryType: legend[0]}, reqData)), 
      Service.get_load(Object.assign({queryType: legend[1]}, reqData)), 
      Service.get_load(Object.assign({queryType: legend[2]}, reqData))
    ]).then(resData => {
      this.FnHandleMoreData('system_load', resData)
    })
  }
  private FnHandleMoreData(type, resData) { // 处理负载
    let index = 0;
    resData.forEach((item: any) => {
      if (item.code === 'Success') {
        if (index === 0) {
          this[type].xTime = item.data.xTime;
          this[type].unit = item.data.unit;
        }
        this[type].yValue.push(item.data.yValues);
      }
      index++;
    })
    this[type].resize++;
  }
  private FnGetDiskInfo(reqData) {
    Service.get_disk(Object.assign({ queryType: 'use' }, reqData)).then((resData: any) => {
      if (resData.code === 'Success') {      
        this.disk_used.xTime = resData.data.xTime;
        this.disk_used.yValue = resData.data.yValues;
        this.disk_used.legend = resData.data.metricInfo;
        this.disk_used.unit = resData.data.unit;
      }
      let resize = this.disk_used.resize++;
    })
    this.disk_bytes.yValue = [];
    Promise.all([Service.get_disk(Object.assign({ queryType: 'readbytes' }, reqData)),
      Service.get_disk(Object.assign({ queryType: 'writebytes' }, reqData))
    ]).then(resData => {
      this.FnHandleDubleData('disk_bytes', resData)
    })
    this.disk_iops.yValue = [];
    Promise.all([Service.get_disk(Object.assign({ queryType: 'readiops' }, reqData)),
      Service.get_disk(Object.assign({ queryType: 'writeiops' }, reqData))
    ]).then(resData => {
      this.FnHandleDubleData('disk_iops', resData)
    })
  }
  private FnHandleDubleData(type, resData) { // 处理磁盘iops, 吞吐量，网络
    let index = 0;
      resData.forEach((item: any) => {
        if (item.code === 'Success') {
          item.data.metricInfo = item.data.metricInfo || item.data.device;
          if (index === 0) {
            this[type].xTime = item.data.xTime;
            this[type].legend = item.data.metricInfo;
            this[type].unit = item.data.unit; 
          } else {
            if (item.data.metricInfo) {
              item.data.metricInfo.forEach(metric => {
                this[type].legend.push(metric + this.disk_iops.type);
              });
            }
          }
          if (item.data.yValues) {
            this[type].yValue.push(...item.data.yValues);
          }
        }
        index++;
      })
      this[type].resize++;
  }
  private FnGetNetInfo(reqData) {
    this.net_in_out.yValue = [];
    Promise.all([Service.get_network(Object.assign({queryType: 'networkout'}, reqData)), 
      Service.get_network(Object.assign({queryType: 'networkin'}, reqData))
    ]).then(resData => {
      this.FnHandleDubleData('net_in_out', resData)
      console.log(this.net_in_out)
    })
    this.net_rate.yValue = [];
    Promise.all([Service.get_network(Object.assign({queryType: 'networkout_rate'}, reqData)), 
      Service.get_network(Object.assign({queryType: 'networkin_rate'}, reqData))
    ]).then(resData => {
      this.FnHandleDubleData('net_rate', resData)
    })
  }
  private created() {
    this.FnGetDetail();
    this.default_tab = Object.keys(this.tab_list)[0];
  }

  @Watch('default_tab')
  private FnChangeTab() {
    this.FnGetChartData();
  }
}
</script>

<style lang="scss" scoped>
.monitor {
  font-size: 12px;
}
.detail-box {
  display: flex;
  flex-wrap: wrap;
  .row {
    width: calc(100%/3);
    line-height: 32px;
  }
  .left-title {
    display: inline-block;
    width: 80px;
    margin-right: 10px;
  }
}
.el-tabs {
  background: #fff;
}
.chart-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
  .item {
    width: 49%;
    margin-bottom: 20px;
  }

}
</style>

<style lang="scss">
.tab-card .el-card__body {
  // padding: 0;
}
</style>