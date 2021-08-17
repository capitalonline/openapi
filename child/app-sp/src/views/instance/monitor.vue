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
      <div class="time-box">
        <el-radio-group v-model="default_time" @change="FnChangeTime" class="m-right20">
          <el-radio-button 
            v-for="(value, key) in time_list" 
            :key="key" 
            :label="key">
            {{ value.label }}
          </el-radio-button>
        </el-radio-group>

        <span class="m-left20 m-right10">选择时间范围:</span>
        <el-date-picker
          v-model="default_date_timer"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="FnChangeDateTimer">
        </el-date-picker>
      </div>

      <div class="chart-box">
        <line-echart 
          chart_id="cpu_chart"
          title="CPU使用率（%）"
          :time_frame="default_date_timer"
          class="item"
        ></line-echart>
        <line-echart 
          chart_id="ram_chart"
          title="CPU使用率（%）"
          :time_frame="default_date_timer"
          class="item"
        ></line-echart>
        <line-echart 
          chart_id="sur_ram_chart"
          title="CPU使用率（%）"
          :time_frame="default_date_timer"
          class="item">
        </line-echart>
        <div class="item"></div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BackHeader from '../../components/backHeader.vue';
import LineEchart from '../../components/chart/list.vue';
import Service from '../../https/instance/record_detail';

@Component({
  components: {
    BackHeader,
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
  private default_tab = '';
  private tab_list = {
    instance: '主机',
    net: '网络',
    disk: '磁盘',
    gpu: 'GPU'
  }
  private time_list = {
    hour: {label: '1小时', time: 1000 * 60 * 60},
    '6_hour': {label: '6小时', time: 1000 * 60 * 60 * 6},
    '12_hour': {label: '12小时', time: 1000 * 60 * 60 * 12},
    day: {label: '1天', time: 1000 * 60 * 60 * 24},
    '3_day': {label: '3天', time: 1000 * 60 * 60 * 24 * 3},
    week: {label: '7天', time: 1000 * 60 * 60* 24 * 7},
    '14_day': {label: '14天', time: 1000 * 60 * 60* 24 * 14}
  };
  private default_time = '';
  private default_date_timer = [];

  private async FnGetDetail() {
    const resData: any = await Service.get_detail({
      ecs_id: this.$route.params.id
    })
    if ( resData.code === 'Success' ) {
      let data = resData.data;
      this.detail_info.ecs_name.value = data.ecs_name;
      this.detail_info.ecs_id.value = data.ecs_id;
      this.detail_info.ecs_rule.value = 
        `${data.ecs_rule.cpu_name}${data.ecs_rule.cpu_unit}${data.ecs_rule.ram}${data.ecs_rule.ram_unit}`;
      this.detail_info.az_name.value = data.az_name;
      this.detail_info.system_disk_conf.value = 
        `${data.disk.system_disk_conf.disk_name} ${data.disk.system_disk_conf.size}${data.disk.system_disk_conf.unit}`;
      this.detail_info.os_info.value = data.os_info.system;
      this.detail_info.private_net_ip.value = data.pipe.private_net_ip[0];
      this.detail_info.status.value = data.status_display;
    }
  }
  private FnChangeTime() {
    let time = this.time_list[this.default_time].time;
    let now = new Date().getTime();
    this.default_date_timer = [new Date(now), new Date(now + time)]
  }
  private FnChangeDateTimer() {
    this.default_time = '';
    let time = this.default_date_timer[1].getTime() - this.default_date_timer[0].getTime();
    for (let key in this.time_list) {
      if (this.time_list[key].time === time) {
        this.default_time = key;
      }
    }
  }

  private created() {
    this.FnGetDetail();
    this.default_tab = Object.keys(this.tab_list)[0];
    this.default_time = Object.keys(this.time_list)[0];
    this.FnChangeTime();
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
.time-box {
  display: flex;
  align-items: center;
}
.el-range-editor.el-input__inner{
  padding: 0px 10px !important;
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
.tab-card {
  .el-radio-button__inner {
    width: 60px;
    margin-right: -1px;
    border-radius: 0;
  }
  .el-radio-button:last-child .el-radio-button__inner,
  .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 0;
  }
}
</style>