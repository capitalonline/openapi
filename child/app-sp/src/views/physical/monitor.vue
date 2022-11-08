<template>
  <div class="monitor">
    <div class="tab-card">
      <el-tabs v-model="default_tab" type="card">
        <el-tab-pane v-for="(value, tab) in tab_list" :key="tab" :label="value" :name="tab"></el-tab-pane>
      </el-tabs>

      <time-group
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
      </div>

      <div class="chart-box" v-if="default_tab === 'net'">
        <!-- <line-echart
          chart_id="net_chart"
          :data="net_in_out"
          class="item"
        ></line-echart> -->
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import BackHeader from '../../components/backHeader.vue';
import TimeGroup from '../../components/search/timeGroup.vue';
import LineEchart from '../../components/chart/list.vue';
import DetailService from '../../https/physical/list';
import Service from '../../https/monitor/index';
import EcsService from '../../https/instance/list';
import moment from 'moment';

@Component({
  components: {
    BackHeader,
    TimeGroup,
    LineEchart
  }
})
export default class Monitor extends Vue{
  @Prop({default: ''}) readonly host_id;
  @Prop({default: ''}) readonly host_name;
  private host_info = {
    region_id: '',
    az_id: '',
    host_ip: '',
    host_purpose: ''
  };
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
  private gpu_used = {
    title: 'GPU使用率',
    unit: '',
    xTime: [],
    yValue: [],
    resize: 0,
    legend: [],
  }
  private gpu_memory_used = {
    title: '显存使用率',
    unit: '',
    xTime: [],
    yValue: [],
    resize: 0,
    legend: [],
  }
  private gpu_temperature = {
    title: 'GPU温度',
    unit: '',
    xTime: [],
    yValue: [],
    resize: 0,
    legend: [],
  }
  private gpu_frequency = {
    title: 'GPU主频',
    unit: '',
    xTime: [],
    yValue: [],
    resize: 0,
    legend: [],
    line_name: ['GPU核心频率', '显存频率'],
    type: 'double_line'
  }
  private default_date_timer = [];

  private FnGetTimer(timer) {
    this.default_date_timer = timer;
    if (this.host_info.host_ip) {
      this.FnGetChartData()
    }
  }

  private FnGetChartData() {
    let type = 'kvm';
    if (!this.host_name) {
      return
    }
    let reqData = {
      hostId: this.host_name,
      region: this.host_info.region_id,
      replica: this.host_info.az_id,
      ip: this.host_info.host_ip,
      instanceType: 'host',
      start: moment.utc(this.default_date_timer[0]).format('YYYY-MM-DD HH:mm:ss'),
      end: moment.utc(this.default_date_timer[1]).format('YYYY-MM-DD HH:mm:ss')
    }
    if (this.default_tab === 'instance') {
      this.FnGetCpu(type, reqData);
      this.FnGetMemory(type, reqData);
    } else if (this.default_tab === 'disk') {
      this.FnGetDiskInfo(type, reqData);
    } else if (this.default_tab === 'net') {
      this.FnGetNetInfo(type, reqData);
    } else if (this.default_tab === 'gpu') {
      this.FnGetGpuInfo(type, reqData)
    }
  }
  private async FnGetDetail() {
    const resData = await DetailService.get_detail_overview({
      host_id: this.host_id
    })
    if ( resData.code === 'Success' ) {
      this.host_info = resData.data
      if (this.host_info.host_purpose === 'CPU') {
        Vue.delete(this.tab_list, 'gpu')
      }
      this.FnGetChartData()
    }
  }
  private async FnGetCpu(type, reqData) {
    const resData = await Service.get_cpu(type,
      { queryType: 'use_total', ...reqData }
    )
    this.FnHandleSingleData('cpu_used', resData);
  }
  private async FnGetMemory(type, reqData) {
    const resData = await Service.get_memory(type,
      { queryType: 'used', ...reqData },
    )
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
  private FnHandleMoreData(type, resData) { // 处理负载
    let index = 0;
    this[type].yValue=[]
    resData.forEach((item: any) => {
      if (item.code === 'Success') {
        if (item.data.xTime) {
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
    Service.get_disk(type, { queryType: 'use', ...reqData }).then((resData: any) => {
      if (resData.code === 'Success') {
        this.disk_used.xTime = resData.data.xTime;
        this.disk_used.yValue = resData.data.yValues;
        this.disk_used.legend = resData.data.metricInfo;
        this.disk_used.unit = resData.data.unit;
      }
      let resize = this.disk_used.resize++;
    })
    this.disk_bytes.yValue = [];
    Promise.all([Service.get_disk(type, { queryType: 'readbytes', ...reqData }),
      Service.get_disk(type, { queryType: 'writebytes', ...reqData })
    ]).then(resData => {
      this.FnHandleDubleData('disk_bytes', resData)
    })
    this.disk_iops.yValue = [];
    Promise.all([Service.get_disk(type, { queryType: 'readiops', ...reqData }),
      Service.get_disk(type, { queryType: 'writeiops', ...reqData })
    ]).then(resData => {
      this.FnHandleDubleData('disk_iops', resData)
    })
  }
  private FnHandleMoreGpuNameData(data,ecs_list){//处理多个gpu卡数据，又是多条线
    let instance:any=[]  
    let list=[]  
    let indexs = []
    data.map((item,index)=>{
      if(item.data.xTime){
        list.push(item)
        indexs.push(index)
      }
    })
    let instanceList = ecs_list.filter((ecs,i)=>indexs.includes(i))
    if(list.length===0){
      return {data:{}}
    }
    let obj = list[0]
    let timeIndex:number=0
    list.map((item,index)=>{//把几个卡的数据合在一起，其余的数据是公用的，除了gpuname和yvalue
      if(item.data.xTime.length > list[timeIndex].data.xTime.length){
        timeIndex=index
      }
      item.data.gpuName.map(gpu=>{//每个卡对应一个云主机id
        instance.push(instanceList[index])
      })
      if(index!==0){
        obj.data.gpuName= [...obj.data.gpuName,...item.data.gpuName];
        obj.data.yValues=[...obj.data.yValues,...item.data.yValues]
      }        
    })
    obj.data.gpuName = obj.data.gpuName.map((gpu,i)=>{
      let name = instance[i].ecs_name.length>20 ? `${instance[i].ecs_name.slice(0,20)}...` : instance[i].ecs_name
      return instance[i].customer_name+'-'+name+'-'+gpu
    })
    obj.data.xTime = list[timeIndex].data.xTime
    return obj
  }
  private FnHandleDubleData(type, resData) { // 处理磁盘iops, 吞吐量，网络,GPU主频
    console.log('resData',resData)
    let index = 0;
    let timeIndex:number=0
      resData.forEach((item: any) => {
        if (item.code === 'Success') {
          item.data.metricInfo = item.data.metricInfo || item.data.device ||item.data.gpuName;
          if (index === 0) {
            timeIndex = 0
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
      console.log('this[type]',this[type])
  }
  private FnGetNetInfo(type, reqData) {
    this.net_in_out.yValue = [];
    // Promise.all([Service.get_network(type, Object.assign({queryType: 'networkout'}, reqData)),
    //   Service.get_network(type, Object.assign({queryType: 'networkin'}, reqData))
    // ]).then(resData => {
    //   this.FnHandleDubleData('net_in_out', resData)
    // })
    this.net_rate.yValue = [];
    Promise.all([Service.get_network(type, {queryType: 'networkout_rate', ...reqData}),
      Service.get_network(type, {queryType: 'networkin_rate', ...reqData})
    ]).then(resData => {
      this.FnHandleDubleData('net_rate', resData)
    })
  }
  private async FnGetGpuInfo(type, reqData) {    
    const resData = await EcsService.get_instance_list({
      billing_method: 'all',
      host_id: this.host_id,
      pod_id:this.$store.state.pod_id
    })
    let ecs_list = []
    this.gpu_used.legend = []
    this.gpu_memory_used.legend = []
    this.gpu_temperature.legend = []
    this.gpu_frequency.legend = []
    if (resData.code === 'Success') {
      ecs_list = resData.data.ecs_list.filter(item => {
        return item.status !== 'destroy' && (this.host_info.host_purpose === 'GPU' ? true : item.is_gpu)
      })      
    }
    this.gpu_used.yValue = [];
    Promise.all(ecs_list.map(item => {
      // this.gpu_used.legend.push(item.ecs_name)
      return Service.get_gpu(type, {
        queryType: 'gpu_usage',
        hostId: item.ecs_id,
        region: reqData.region,
        replica: reqData.replica,
        ip: item.private_net,
        instanceType: 'vm',
        start: reqData.start,
        end: reqData.end
      })
    })).then(resData => {
      this.FnHandleDubleData('gpu_used', [this.FnHandleMoreGpuNameData(resData,ecs_list)])
      // this.FnHandleMoreData('gpu_used', resData)
    })
    this.gpu_memory_used.yValue = [];
    Promise.all(ecs_list.map(item => {
      this.gpu_memory_used.legend.push(item.ecs_name)
      return Service.get_gpu(type, {
        queryType: 'memory_usage',
        hostId: item.ecs_id,
        region: reqData.region,
        replica: reqData.replica,
        ip: item.private_net,
        instanceType: 'vm',
        start: reqData.start,
        end: reqData.end
      })
    })).then(resData => {
      this.FnHandleDubleData('gpu_memory_used', [this.FnHandleMoreGpuNameData(resData,ecs_list)])
      // this.FnHandleMoreData('gpu_memory_used', resData)
    })
    this.gpu_temperature.yValue = [];
    Promise.all(ecs_list.map(item => {
      this.gpu_temperature.legend.push(item.ecs_name)
      return Service.get_gpu(type, {
        queryType: 'temperature',
        hostId: item.ecs_id,
        region: reqData.region,
        replica: reqData.replica,
        ip: item.private_net,
        instanceType: 'vm',
        start: reqData.start,
        end: reqData.end
      })
    })).then(resData => {
      this.FnHandleDubleData('gpu_temperature', [this.FnHandleMoreGpuNameData(resData,ecs_list)])
      // this.FnHandleMoreData('gpu_temperature', resData)
    })
    let graphicsList=[]
    let memoryList=[]
    ecs_list.forEach((item:any)=>{
      let data={
        hostId: item.ecs_id,
        region: reqData.region,
        replica: reqData.replica,
        ip: item.private_net,
        instanceType: 'vm',
        start: reqData.start,
        end: reqData.end
      }
      graphicsList.push(Service.get_gpu(type, {//每一个云主机都得掉一次两个接口
        queryType: 'gpu_clocks_graphics',
        ...data
      }))
      memoryList.push(Service.get_gpu(type, {
        queryType: 'gpu_clocks_memory',
        ...data
      }))
    })
    this.gpu_frequency.yValue = [];
    Promise.all(graphicsList).then(resData => {
      Promise.all(memoryList).then(res => {
        this.FnHandleDubleData('gpu_frequency', [this.FnHandleMoreGpuNameData(resData,ecs_list),this.FnHandleMoreGpuNameData(res,ecs_list)])
      })
    })
    
  }
  private created() {
    this.default_tab = Object.keys(this.tab_list)[0];
    this.FnGetDetail();
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
