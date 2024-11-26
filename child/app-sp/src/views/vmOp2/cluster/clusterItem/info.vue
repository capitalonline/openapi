<template>
  <div>
  <div class="info">
    <div class="icon">
      <i class="iconfont icon-xinxi" style="font-size: 100px"></i>
    </div>
      <div class="item">
        <div v-for="(item,id) in base_info" :key="id" >
          <span class="m-right20">{{item.label}}</span>
          <span>{{item.value}}</span>
        </div>
      </div>
    <div class="progress">
      <div class="bar" v-for="(item,id) in progress_info" :key="id">
        <span>{{item.label}}</span>
        <span v-if="item.label === 'GPU'" class="prompt_message text-right">
            {{item.gpu_type}}
          </span>
        <div class="flex-between m-bottom5">
<!--          <span v-if="item.label === 'GPU'">-->
<!--            <i class="iconfont icon-breakdown" style="font-size: 20px"></i>-->
<!--            故障：{{item.breakdown}}-->
<!--          </span>-->
        </div>
        <el-progress :stroke-width="16" color="#455cc6" :percentage="Math.round(item.percentage)"></el-progress>
        <div class="flex-between m-top5">
          <span>已用：{{item.used+'/'+item.total}}</span>
          <span>可用：{{item.available}}</span>
        </div>
      </div>
    </div>
  </div>
    <div class="resource_info">
      <div style="font-weight: bold;font-size: 18px">迁移可用资源数量</div>
      <el-divider></el-divider>
      <el-table border :data="list" max-height="360px">
        <el-table-column prop="ecs_spec_family_name" label="实例规格族名称"></el-table-column>
        <el-table-column prop="cpu_count" label="vCPU" ></el-table-column>
        <el-table-column prop="memory_size" label="内存（GB）" ></el-table-column>
        <el-table-column prop="gpu_count" label="GPU" ></el-table-column>
        <el-table-column prop="available_count" label="可用数量" ></el-table-column>
      </el-table>
      <div class="m-top5" style="color: #aaaaaa">注：数据包含专属用户资源，如实际调整如发现资源不足，请手动解绑专属用户资源</div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import SvgIcon from '@/components/svgIcon/index.vue'
import Service from "@/https/vmOp2/cluster/clusterItem";

@Component({
  components:{
    SvgIcon
  }
})
export default class COverview extends Vue{
  @Prop({default:''})cluster_id!:string
  private detail_info :any={}
  private list:any=[]
  private base_info={
    host_count:{label:'主机',value:'20'},
    ecs_count:{label:'虚拟机',value:'100'},
  }
  private progress_info={
    cpu:{label:'CPU',used:'200GHz',available:'3.8Thz',total:'4THz',percentage:0},
    memory:{label:'内存',used:'0TB',available:'0GB',total:'0TB',percentage:0},
    gpu:{label:'GPU',used:'0块',available:'100%',total:'100块',breakdown:'20块',percentage:0,gpu_type:'RTX 4090'},
    storage:{label:'存储',used:'0TB',available:'0GB',total:'0TB',percentage:0}
  }
  created(){
    this.get_cluster_outline()
    this.FnGetList()
  }
  private async get_cluster_outline(){
    let res:any = await Service.get_cluster_outline({
      // az_id:this.$store.state.az_id,
      // pod_id:'d40362006e6711ee8fa0be688589ed9a',
      cluster_id:this.$route.params.id
    })
    if(res.code === 'Success'){
      this.detail_info = res.data
      for(let i in this.base_info){
        this.base_info[i].value = this.detail_info[i]
      }
      this.progress_info.cpu ={
        ...this.progress_info.cpu,
        used: this.detail_info.cpu_statistic.used+ '核',
        total: this.detail_info.cpu_statistic.total + '核',
        available:this.detail_info.cpu_statistic.available + '核',
        percentage: this.detail_info.cpu_statistic.rate * 100
      }
      this.progress_info.memory ={
        ...this.progress_info.memory,
        used: this.detail_info.ram_statistic.used + 'TB',
        total: this.detail_info.ram_statistic.total + 'TB',
        available:this.detail_info.ram_statistic.available + 'TB',
        percentage: this.detail_info.ram_statistic.rate * 100
      }
      this.progress_info.gpu ={
        ...this.progress_info.gpu,
        used: this.detail_info.gpu_statistic.used + '个',
        total: this.detail_info.gpu_statistic.total + '个',
        available:this.detail_info.gpu_statistic.available + '个',
        percentage: this.detail_info.gpu_statistic.rate * 100,
        breakdown: this.detail_info.gpu_statistic.fault + '块',
        gpu_type: this.detail_info.gpu_statistic.gpu_type
      }
      this.progress_info.storage ={
        ...this.progress_info.storage,
        used: this.detail_info.storage_statistic.used + 'TB',
        total: this.detail_info.storage_statistic.total + 'TB',
        available:this.detail_info.storage_statistic.available + 'TB',
        percentage: this.detail_info.storage_statistic.rate * 100
      }
    }
  }
  private async FnGetList(){
    let res:any = await Service.get_resource_list(
      {
        cluster_id:this.$route.params.id,
        az_id:this.$store.state.az_id
      }
    )
    if(res.code === 'Success'){
      this.list = res.data.resource_list
    }
  }

}
</script>

<style scoped lang="scss">
.info{
  display: flex;
  background: #ffffff;
  .icon{
    width: 12%;
    margin-top:20px;
    margin-left: 10px;
    color: #d7d7d7
  }
  .item{
    flex:1;
    div{
      margin: 15px;
      font-size: 14px;
    }
  }
  .progress{
    width: 65%;
    flex-wrap: wrap;
    display: flex;
    .bar{
      max-width: 400px;
      font-size: 14px;
      width: 40%;
      margin: 20px;
      ::v-deep .el-progress-bar__outer {
        border-radius: 0;
      }
      ::v-deep .el-progress-bar__inner {
        border-radius: 0;
      }
      ::v-deep .el-progress__text{
        font-size: 14px!important;
      }
    }
  }
  .m-bottom5{
  margin-bottom: 5px;
  }
  .m-top5{
    margin-top: 5px;
  }
  .m-top50{
    margin-top: 50px !important;
  }
}
.resource_info{
  background: #ffffff;
  padding: 30px;
  border-radius: 4px;
  .el-table{
    margin-top: 20px;
  }
}

</style>
