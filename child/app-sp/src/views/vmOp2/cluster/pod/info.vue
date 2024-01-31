<template>
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
        <div class="flex-between m-bottom5">
          <span>{{item.label}}</span>
          <span v-if="item.label === 'GPU'">
             <i class="iconfont icon-breakdown" style="font-size: 20px"></i>
            故障：{{item.breakdown}}</span>
        </div>
        <el-progress :stroke-width="16"  color="#455cc6" :percentage="item.percentage"></el-progress>
        <div class="flex-between m-top5">
          <span>已用：{{item.used+'/'+item.total}}</span>
          <span>可用：{{item.remain}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import SvgIcon from '@/components/svgIcon/index.vue'

@Component({
  components:{
    SvgIcon
  }
})
export default class COverview extends Vue{
  @Prop({default:''})cluster_id!:string
  private base_info={
    cluster:{label:'集群',value:'10'},
    host:{label:'主机',value:'20'},
    instance:{label:'虚拟机',value:'100'},
    storage:{label:'存储',value:'100'},
    network:{label:'网络',value:'20'},
  }
  private progress_info={
    cpu:{label:'CPU',used:'200GHz',remain:'3.8Thz',total:'4THz',percentage:0},
    memory:{label:'内存',used:'0TB',remain:'0GB',total:'0TB',percentage:0},
    gpu:{label:'GPU',used:'0块',remain:'100%',total:'100块',breakdown:'20块',percentage:0},
    storage:{label:'存储',used:'0TB',remain:'0GB',total:'0TB',percentage:0}
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
  .info-icon{
    fill:#d7d7d7 ;
    width: 100px;
    margin-left: 10px;
  }
  .progress{
    width: 60%;
    flex-wrap: wrap;
    display: flex;
    .bar{
      max-width: 400px;
      font-size: 14px;
      width: 40%;
      margin: 20px;
    }
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

</style>
