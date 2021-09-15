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
          title="CPU使用率（%）"
          :data="cpu_used"
          class="item"
        ></line-echart>
        <line-echart 
          chart_id="ram_chart"
          title="内存使用率（%）"
          :data="memory_used"
          class="item"
        ></line-echart>
        <line-echart 
          chart_id="system_chart"
          title="系统平均负载（%）"
          :data="system_load"
          class="item">
        </line-echart>
      </div>

      <div class="chart-box" v-if="default_tab === 'disk'">
        <line-echart 
          chart_id="disk_chart"
          title="磁盘使用率（%）"
          :data="disk_used"
          class="item"
        ></line-echart>
        <line-echart 
          chart_id="disk_through_chart"
          title="磁盘吞吐量（Kbps）"
          :time_frame="default_date_timer"
          class="item"
        ></line-echart>
        <line-echart 
          chart_id="disk_iops_chart"
          title="磁盘IOPS（%）"
          :time_frame="default_date_timer"
          class="item">
        </line-echart>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
    xTime: [],
    yValue: [],
    resize: 0
  };
  private memory_used = {
    xTime: [],
    yValue: [],
    resize: 0
  };
  private system_load = {
    xTime: [],
    yValue: [],
    resize: 0,
    legend: ['1m', '5m', '15m']
  };
  private disk_used = {
    xTime: [],
    yValue: [],
    resize: 0,
    legend: []
  };
  private disk_iops = {
    xTime: [],
    yValue: [],
    resize: 0,
    legend: []
  };
  private disk_bytes = {
    xTime: [],
    yValue: [],
    resize: 0,
    legend: []
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
    this.FnGetCpu();
    this.FnGetMemory();
    this.FnGetDiskInfo();
    this.FnGetLoad();
  }
  private async FnGetDetail() {
    const resData: any = await DetailService.get_detail({
      ecs_id: this.$route.params.id
    })
    if ( resData.code === 'Success' ) {
      let data = resData.data;
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
      this.FnGetCpu();
      this.FnGetMemory();
      this.FnGetDiskInfo();
      this.FnGetLoad();
    }
  }
  private async FnGetCpu() {
    if (!this.detail_info.ecs_id.value) {
      return
    }
    let resData: any = await Service.get_cpu({
      id: this.detail_info.ecs_id.value,
      // ip: this.detail_info.private_net_ip.value,
      ip: '10.4.0.146',
      instanceType: 'vm',
      start: moment.utc(this.default_date_timer[0]).format('YYYY-MM-DD HH:mm:ss'),
      end: moment.utc(this.default_date_timer[1]).format('YYYY-MM-DD HH:mm:ss'),
      queryType: 'use_total'
    })
    if (resData.code === 0) {
      this.cpu_used.xTime = resData.data.xTime;
      this.cpu_used.yValue = resData.data.yValues;
    }
    this.cpu_used.resize++;
  }
  private async FnGetMemory() {
    if (!this.detail_info.ecs_id.value) {
      return
    }
    let resData: any = await Service.get_memory({
      id: this.detail_info.ecs_id.value,
      // ip: this.detail_info.private_net_ip.value,
      ip: '10.4.0.146',
      instanceType: 'vm',
      start: moment.utc(this.default_date_timer[0]).format('YYYY-MM-DD HH:mm:ss'),
      end: moment.utc(this.default_date_timer[1]).format('YYYY-MM-DD HH:mm:ss'),
      queryType: 'used'
    })
    if (resData.code === 0) {
      this.memory_used.xTime = resData.data.xTime;
      this.memory_used.yValue = resData.data.yValues;
    }
    this.memory_used.resize++;
  }
  private async FnGetLoad() {
    if (!this.detail_info.ecs_id.value) {
      return
    }
    let reqData = {
      id: this.detail_info.ecs_id.value,
      // ip: this.detail_info.private_net_ip.value,
      ip: '10.4.0.146',
      instanceType: 'vm',
      start: moment.utc(this.default_date_timer[0]).format('YYYY-MM-DD HH:mm:ss'),
      end: moment.utc(this.default_date_timer[1]).format('YYYY-MM-DD HH:mm:ss')
    }
    this.system_load.yValue = [];
    let legend = this.system_load.legend;
    Promise.all([Service.get_load(Object.assign({}, reqData, {queryType: legend[0]})), 
      Service.get_load(Object.assign({}, reqData, {queryType: legend[1]})), 
      Service.get_load(Object.assign({}, reqData, {queryType: legend[2]}))]).then(resData => {
        let index = 0;
        resData.forEach((item: any) => {
          if (item.code === 0) {
            if (index === 0) this.system_load.xTime = item.data.xTime;
            this.system_load.yValue.push(item.data.yValues);
          }
          index++;
        })
        this.system_load.resize++;
    })
  }
  private FnGetDiskInfo() {
    this.FnGetDiskData('use').then(res => {
      if (res) this.disk_used = JSON.parse(JSON.stringify(res));
    });
    // this.FnGetDiskData('readbytes').then(res => {
      
    // });
    // this.FnGetDiskData('writebytes').then(res => {
      
    // });
  }
  private async FnGetDiskData(type) {
    if (!this.detail_info.ecs_id.value) {
      return
    }
    let resData: any = await Service.get_disk({
      id: this.detail_info.ecs_id.value,
      // ip: this.detail_info.private_net_ip.value,
      ip: '10.4.0.146',
      instanceType: 'vm',
      start: moment.utc(this.default_date_timer[0]).format('YYYY-MM-DD HH:mm:ss'),
      end: moment.utc(this.default_date_timer[1]).format('YYYY-MM-DD HH:mm:ss'),
      queryType: type
    })
    if (resData.code === 0) {
      // this.disk_list = resData.data.metricInfo;
    }
    let resize = this.disk_used.resize++;
    return {
      xTime: resData.data.xTime,
      yValue: resData.data.yValues,
      resize: resize,
      legend: resData.data.metricInfo
    }
  }
  private created() {
    this.FnGetDetail();
    this.default_tab = Object.keys(this.tab_list)[0];
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