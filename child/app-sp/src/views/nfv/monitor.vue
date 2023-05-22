<template>
  <div class="monitor">
    <!-- v-if="source_name === 'monitor'" -->
    <div >
      <back-header title="NFV云服务器监控" back_url="/nfv"></back-header>
      <el-card class="m-bottom20">
        <template #header>
          <span>NFV云服务器详情</span>
        </template>
        <div class="detail-box">
          <div v-for="(item, key) in detail_info" :key="key" class="row">
            <span class="left-title">{{ item.label }}:</span>
            <span v-html="item.value"></span>
          </div>
        </div>
      </el-card>
    </div>

    <el-card class="tab-card">
      <el-tabs v-model="default_tab" type="card">
        <el-tab-pane v-for="(value, tab) in tab_list" :key="tab" :label="value" :name="tab"></el-tab-pane>
      </el-tabs>
      <!-- v-if="ecs_info.create_finish_time || session.getItem('vm_monitor')" -->
      <time-group
        :start_time="ecs_info.create_finish_time"
        @fn-emit="FnGetTimer">
      </time-group>

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
          class="item"
          v-if="ecs_info.os_system.toLocaleLowerCase() !== 'windows'">
        </line-echart>
      </div>

      <div class="chart-box" v-if="default_tab === 'net'">
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
      <div class="chart-box" v-if="default_tab === 'gpu'">
        <line-echart
          chart_id="gpu_chart"
          :data="gpu_used"
          class="item"
        ></line-echart>
        <line-echart
          chart_id="gpu_memory_chart"
          :data="gpu_memory_used"
          class="item"
        ></line-echart>
        <line-echart
          chart_id="gpu_temperature"
          :data="gpu_temperature"
          class="item"
        ></line-echart>
        <line-echart
          chart_id="gpu_frequency"
          :data="gpu_frequency"
          class="item"
        ></line-echart>
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
  private session = sessionStorage
  private source_name = 'monitor';
  private ecs_info = {
    region_id: '',
    az_id: '',
    private_net: '',
    create_finish_time: '',
    os_system: ''
  };
  private detail_info = {
    ecs_name: {label: '云服务器名称', value: '111'},
    ecs_rule: {label: '云服务器规格', value: '222'},
    memory_ip: {label: '存储网IP', value: '333'},
    status: {label: '运行状态', value: '444'}
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
  }
  private gpu_used = {
    title: 'GPU使用率',
    unit: '',
    xTime: [],
    yValue: [],
    resize: 0
  };
  private gpu_memory_used = {
    title: '显存使用率',
    unit: '',
    xTime: [],
    yValue: [],
    resize: 0
  };
  private gpu_temperature = {
    title: 'GPU温度',
    unit: '',
    xTime: [],
    yValue: [],
    resize: 0
  }
  private gpu_frequency = {
    title: 'GPU主频',
    unit: '',
    xTime: [],
    yValue: [],
    resize: 0,
    line_name: ['GPU核心频率', '显存频率'],
    type: 'double_line'
  }
  private default_date_timer = [];
  // @Watch('$route',{immediate:true,deep:true})
  // private FnRoute(to,from){
  // }
  private FnGetTimer(timer) {
    this.default_date_timer = timer;
    this.FnGetChartData();
  }

  private FnGetChartData() {
    let id = '';
    let region = '';
    let replica = '';
    let ip = '';
    let instanceType = '';
    let type = 'kvm';
    if (this.source_name === 'monitor') {
      // id =sessionStorage.getItem('vm_monitor') ? JSON.parse(sessionStorage.getItem('vm_monitor')).id :this.detail_info.ecs_id.value;
      region = this.ecs_info.region_id;
      replica = this.ecs_info.az_id;
      ip = this.ecs_info.private_net;
      instanceType = 'vm';
    } else {
      let query = this.$route.query;
      id = query.id;
      region = query.region;
      replica = query.az;
      ip = query.ip;
      instanceType = query.type;
      type = 'gpu';
    }
    if (!id) {
      return
    }
    let vm_info = sessionStorage.getItem('vm_monitor') ? JSON.parse(sessionStorage.getItem('vm_monitor')) : ''
    let reqData = {
      hostId: Object.keys(vm_info).length>0 ?vm_info.hostId : id,
      region: Object.keys(vm_info).length>0 ?vm_info.region_id : region,
      replica: Object.keys(vm_info).length>0 ?vm_info.replica : replica,
      ip: Object.keys(vm_info).length>0 ?vm_info.ip : ip,
      instanceType: Object.keys(vm_info).length>0 ?vm_info.instanceType : instanceType,
      os: Object.keys(vm_info).length>0 ?vm_info.os : this.ecs_info.os_system.toLocaleLowerCase(),
      start: moment.utc(this.default_date_timer[0]).format('YYYY-MM-DD HH:mm:ss'),
      end: moment.utc(this.default_date_timer[1]).format('YYYY-MM-DD HH:mm:ss')
    }
    if (this.default_tab === 'instance') {
      this.FnGetCpu(type, reqData);
      this.FnGetMemory(type, reqData);
      if (this.ecs_info.os_system.toLocaleLowerCase() !== 'windows') this.FnGetLoad(type, reqData);
    } else if (this.default_tab === 'disk') {
      this.FnGetDiskInfo(type, reqData);
    } else if (this.default_tab === 'net') {
      this.FnGetNetInfo(type, reqData);
    } else if (this.default_tab === 'gpu') {
      this.FnGetGpuInfo(type, reqData)
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
        private_net: data.pipe.private_net,
        os_system: data.os_info.system,
        create_finish_time: moment(new Date(data.create_finish_time)).format()
      }
      this.detail_info.ecs_name.value = data.ecs_name;
      // this.detail_info.ecs_id.value = data.ecs_id;
      this.detail_info.ecs_rule.value =
        `${data.ecs_rule.name} ${data.ecs_rule.cpu_num}vCPU ${data.ecs_rule.ram}GiB` + (data.is_gpu ? `${data.ecs_rule.gpu}*${data.card_name}`: '');
      // this.detail_info.az_name.value = data.az_name;
      // this.detail_info.system_disk_conf.value =
        `${data.disk.system_disk_conf.disk_name} ${data.disk.system_disk_conf.size}${data.disk.system_disk_conf.unit}`;
      // this.detail_info.os_info.value = `${data.os_info.system} ${data.os_info.version} ${data.os_info.bite}${data.os_info.unit}`;

      let pipe_info = data.pipe;
      // this.detail_info.private_net.value = `${pipe_info.private_net}（主）<br> `;
      //   this.detail_info.public_net.value = '';
        if (pipe_info.pub_net) {
          let pub_eip_info = pipe_info.eip_info[pipe_info.pub_net];
          // this.detail_info.private_net.value+= pipe_info.pub_net +
            // (pub_eip_info.conf_name ? '（' + pub_eip_info.conf_name + '）' : ' ') + '默认出网网卡<br>';
          // if ( pub_eip_info.eip_ip ) this.detail_info.public_net.value = `${pub_eip_info.eip_ip}（${pub_eip_info.conf_name}）<br>`;
        }
        for (let item of pipe_info.virtual_net) {
          let eip_info = pipe_info.eip_info[item];
          // this.detail_info.private_net.value+= item + (eip_info.conf_name ? '（' + eip_info.conf_name + '）': '') + '<br>';
          // if (eip_info.eip_ip) this.detail_info.public_net.value+= `${eip_info.eip_ip}（${eip_info.conf_name}）<br>`;
        }

      this.detail_info.status.value = data.status_display;
      if (!data.is_gpu) {
        Vue.delete(this.tab_list, 'gpu')
      }
      // this.FnGetChartData()
    }
  }
  private async FnGetCpu(type, reqData) {
    let resData: any = await Service.get_cpu(type, Object.assign(
      { queryType: 'use_total' },
      reqData
    ))
    this.FnHandleSingleData('cpu_used', resData);
  }
  private async FnGetMemory(type, reqData) {
    let resData: any = await Service.get_memory(type, Object.assign(
      { queryType: 'used' },
      reqData
    ))
    this.FnHandleSingleData('memory_used', resData);
  }
  private FnHandleSingleData(type, resData) { // 处理cpu，内存，GPU
    if (resData.code === 'Success') {
      this[type].xTime = resData.data.xTime;
      this[type].yValue = resData.data.yValues;
      this[type].unit = resData.data.unit;
    }
    this[type].resize++;
  }
  private async FnGetLoad(type, reqData) {
    this.system_load.yValue = [];
    let legend = this.system_load.legend;
    Promise.all([Service.get_load(type, Object.assign({queryType: legend[0]}, reqData)),
      Service.get_load(type, Object.assign({queryType: legend[1]}, reqData)),
      Service.get_load(type, Object.assign({queryType: legend[2]}, reqData))
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
  private FnGetDiskInfo(type, reqData) {
    Service.get_disk(type, Object.assign({ queryType: 'use' }, reqData)).then((resData: any) => {
      if (resData.code === 'Success') {
        this.disk_used.xTime = resData.data.xTime;
        this.disk_used.yValue = resData.data.yValues;
        this.disk_used.legend = resData.data.metricInfo;
        this.disk_used.unit = resData.data.unit;
      }
      let resize = this.disk_used.resize++;
    })
    this.disk_bytes.yValue = [];
    Promise.all([Service.get_disk(type, Object.assign({ queryType: 'readbytes' }, reqData)),
      Service.get_disk(type, Object.assign({ queryType: 'writebytes' }, reqData))
    ]).then(resData => {
      this.FnHandleDubleData('disk_bytes', resData)
    })
    this.disk_iops.yValue = [];
    Promise.all([Service.get_disk(type, Object.assign({ queryType: 'readiops' }, reqData)),
      Service.get_disk(type, Object.assign({ queryType: 'writeiops' }, reqData))
    ]).then(resData => {
      this.FnHandleDubleData('disk_iops', resData)
    })
  }
  private FnHandleDubleData(type, resData) { // 处理磁盘iops, 吞吐量，网络,GPU主频
    let index = 0;
      resData.forEach((item: any) => {
        if (item.code === 'Success') {
          item.data.metricInfo = item.data.metricInfo || item.data.device || item.data.gpuName
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
            console.log('1',this[type].yValue)
            this[type].yValue.push(...item.data.yValues);
            console.log('2',this[type].yValue)
          }
        }
        index++;
      })
      this[type].resize++;
      console.log('####',this[type])
  }
  private FnGetNetInfo(type, reqData) {
    this.net_in_out.yValue = [];
    // Promise.all([Service.get_network(type, Object.assign({queryType: 'networkout'}, reqData)),
    //   Service.get_network(type, Object.assign({queryType: 'networkin'}, reqData))
    // ]).then(resData => {
    //   this.FnHandleDubleData('net_in_out', resData)
    // })
    this.net_rate.yValue = [];
    Promise.all([Service.get_network(type, Object.assign({queryType: 'networkout_rate'}, reqData)),
      Service.get_network(type, Object.assign({queryType: 'networkin_rate'}, reqData))
    ]).then(resData => {
      this.FnHandleDubleData('net_rate', resData)
    })
  }
  
  private FnGetGpuInfo(type, reqData) {
    this.gpu_used.yValue=[]
    Service.get_gpu(type, Object.assign({queryType: 'gpu_usage'}, reqData)).then(resData => {
      this.FnHandleDubleData('gpu_used', [resData]);
    })
    this.gpu_memory_used.yValue=[]
    Service.get_gpu(type, Object.assign({queryType: 'memory_usage'}, reqData)).then(resData => {
      this.FnHandleDubleData('gpu_memory_used', [resData]);
    })
    this.gpu_temperature.yValue=[]
    Service.get_gpu(type, Object.assign({queryType: 'temperature'}, reqData)).then(resData => {
      this.FnHandleDubleData('gpu_temperature', [resData]);
    })
    this.gpu_frequency.yValue = [];
    Promise.all([Service.get_gpu(type, Object.assign({queryType: 'gpu_clocks_graphics'}, reqData)),
      Service.get_gpu(type, Object.assign({queryType: 'gpu_clocks_memory'}, reqData))
    ]).then(resData => {
      // resData.map(item=>{
      //   if(item.data.yValues && item.data.yValues.length>0){
      //     item.data.yValues = item.data.yValues
      //   }
      //   return item;
      // })
      this.FnHandleDubleData('gpu_frequency', resData)
    })
    this.gpu_frequency.yValue = [];
    Promise.all([Service.get_gpu(type, Object.assign({queryType: 'gpu_clocks_graphics'}, reqData)),
      Service.get_gpu(type, Object.assign({queryType: 'gpu_clocks_memory'}, reqData))
    ]).then(resData => {
      console.log('resData',resData)
      resData.map(item=>{
        if(item.data.yValues && item.data.yValues.length>0){
          item.data.yValues = [item.data.yValues]
        }
        return item;
      })
      this.FnHandleDubleData('gpu_frequency', resData)
    })
  }
  private created() {
    this.default_tab = Object.keys(this.tab_list)[0];
    this.source_name = this.$route.name;
    if(sessionStorage.getItem('vm_monitor')){
      Vue.delete(this.tab_list, 'gpu');
      let vm_info = JSON.parse(sessionStorage.getItem('vm_monitor'))
      this.detail_info.ecs_name.value = vm_info.transfer_vm_name;
      // this.detail_info.ecs_id.value = vm_info.transfer_vm_id;
      // this.detail_info.az_name.value = vm_info.region_name+'-'+vm_info.az_name;
      // this.detail_info.system_disk_conf.value = vm_info.transfer_vm_conf_system_disk_type ? `${vm_info.transfer_vm_conf_system_disk_type}  ${vm_info.transfer_vm_conf_system_disk_size}${vm_info.transfer_vm_conf_system_disk_unit}` : ''
      // this.detail_info.os_info.value = vm_info.transfer_vm_image;
      // this.detail_info.private_net.value = `${vm_info.transfer_vm_vpc_ip}（vpc ip）<br> ${vm_info.transfer_vm_storage_ip }（存储网 ip）`
      this.detail_info.status.value = vm_info.status_cn;
    }
    if (this.source_name === 'monitor' && !sessionStorage.getItem('vm_monitor')) {
      this.FnGetDetail();
    }
  }
  private destroyed() {
    sessionStorage.removeItem('vm_monitor')
  }
  @Watch('default_tab')
  private FnChangeTab(newVal, oldVal) {
    if (oldVal) {
      this.FnGetChartData();
    }
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
    display: flex;
    width: calc(100%/4);
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
