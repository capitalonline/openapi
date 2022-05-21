<template>
  <div class="detail">
    <back-header
      :pathName="'disk_list'"
      :title="'云盘详情'"
      :btnTitle="'返回'"
    >
      <template #left>您目前拥有<span class="num_message"> {{$route.query.count}} </span>块云盘</template>
    </back-header>
    <div class="base_info">
      <el-tabs type="card" v-model="active_key">
        <el-tab-pane label="基本信息" name="base_info">
          <!-- <div class="operate-btn">
            <el-button @click="operate('mount')" :disabled="!disk_info || disk_info.status!=='waiting' || disk_info.disk_type_display!=='数据盘'">挂载</el-button>
            <el-button @click="capacity" :disabled="!disk_info || !(disk_info.status==='waiting' || (disk_info.status==='running' && disk_info.ecs_status==='running'))">扩容</el-button>
            <el-button type="text" @click="get_disk_detail"><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
          </div> -->
          <el-card class="m-left20 m-right20">
            <el-descriptions :column="split_column">
              <el-descriptions-item label="云盘ID">{{disk_info.disk_id || '-'}}</el-descriptions-item>
              <el-descriptions-item label="地域">{{disk_info.region_name || '-'}}</el-descriptions-item>
              <el-descriptions-item label="云盘名称" labelClassName="label" contentClassName="content">
                  <div class="disk-name">
                    <pre>{{disk_info.name || '-'}}</pre>
                  </div>
                  <!-- <el-button type="text" class="btn" :disabled="!['waiting','running'].includes(disk_info.status)" @click="operate('edit_name')">修改</el-button> -->
              </el-descriptions-item>
              <el-descriptions-item label="可用区">{{disk_info.az_name || '-'}}</el-descriptions-item>
              <el-descriptions-item label="云盘类型">{{disk_info.feature+'云盘' || '-'}}</el-descriptions-item>
              <el-descriptions-item label="云盘状态">{{disk_info.status_display || '-'}}</el-descriptions-item>
              <el-descriptions-item label="云盘容量">{{disk_info.size || '-'}}</el-descriptions-item>
              <el-descriptions-item label="创建自">{{disk_info.user_name || '-'}}</el-descriptions-item>
              <el-descriptions-item label="云盘性能">
                <span class="m-right10">{{disk_info.disk_iops || '-'}}</span>
                <span>{{disk_info.band_mbps || '-'}}</span>
              </el-descriptions-item>
              <el-descriptions-item label="创建时间">{{disk_info.create_time ? moment(disk_info.create_time).format("YYYY-MM-DD HH:mm:ss") : '-'}}</el-descriptions-item>
              <el-descriptions-item label="云盘属性">{{disk_info.disk_type_display || '-'}}</el-descriptions-item>
              <el-descriptions-item label="付费类型">{{disk_info.billing_method_display || '-'}}</el-descriptions-item>
            </el-descriptions>
          </el-card>
          <el-card class="m-left20 m-right20">
            <el-descriptions :column="split_column">
              <el-descriptions-item label="所挂载的实例ID">{{disk_info.ecs_id || '-'}}</el-descriptions-item>
              <el-descriptions-item label="所挂载的实例名称"><pre>{{disk_info.ecs_name || '-'}}</pre></el-descriptions-item>
              <el-descriptions-item label="云盘是否随实例删除">
                {{disk_info.is_follow_delete ? '是' : '否'}}
                  <!-- <el-button type="text" class="btn" :disabled="disk_info.status!=='running' || disk_info.disk_type_display==='系统盘'" @click="operate('edit_attr')">修改</el-button> -->
              </el-descriptions-item>
              <el-descriptions-item label="硬盘设备名">{{disk_info.mount_path || '-'}}</el-descriptions-item>
            </el-descriptions>
          </el-card>
          
        </el-tab-pane>
        <el-tab-pane label="监控" name="monitor" v-if="disk_info.mount_path">
            <monitor
                :info="disk_info"
                v-if="active_key==='monitor'&& disk_info.status==='running'"
            >
          </monitor>

        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <template v-if="visible && operate_type==='mount'">
        <mount-disk :visible="visible" :multi_select="disk_list" @close = "close_disk" />
    </template>
    <template v-if="visible && operate_type==='edit_attr'">
        <edit-attr :visible="visible" :multi_select="disk_list" @close = "close_disk" />
    </template>
    <template v-if="visible && operate_type==='edit_name'">
        <edit-name :visible="visible" :multi_select="disk_list" @close = "close_disk" />
    </template> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SvgIcon from '../../components/svgIcon/index.vue';
import BackHeader from '../../components/backHeader.vue'
import Service from '../../https/disk/list';
import CreateService from '../../https/disk/create';
// import MountDisk from './mountDisk.vue';
// import EditName from './editName.vue';
// import EditAttr from './editAttr.vue'
import Monitor from './monitor.vue';
import moment from 'moment';
@Component({
  components:{
    SvgIcon,
    BackHeader,
    // MountDisk,
    // EditName,
    // EditAttr,
    Monitor
  }
})
export default class DiskDetail extends Vue {
  $router;
  $route;
  private active_key="base_info"
  private split_column:number=2;
  private visible:boolean=false;
  private operate_type:string=""
  private disk_info:any={};
  private disk_list:any=[]
  private moment = moment
  private config_info:any={
    disk_id:{label:'云盘ID',value:''},
    region_name:{label:'地域',value:''},
    name:{label:'云盘名称',value:''},
    az_name:{label:'可用区',value:''},
    feature:{label:'云盘类型',value:''},
    status_display:{label:'云盘状态',value:''},
    size:{label:'云盘容量',value:''},
    user:{label:'创建自',value:''},
    disk_iops:{label:'云盘性能',value:''},
    create_time:{label:'创建时间',value:''},
    disk_type:{label:'云盘属性',value:''},
    billing_method_display:{label:'付费类型',value:''},
    ecs_id:{label:'所挂载的实例ID',value:''},
    ecs_name:{label:'所挂载的实例名称',value:''},
    is_follow_delete:{label:'云盘是否随实例删除',value:''},
    disk_name:{label:'硬盘设备名',value:''},

  }
  created() {
    this.get_disk_detail();
    
  }
  private async get_disk_detail(){
    let res:any = await CreateService.get_disk_detail({
      disk_id:this.$route.query.disk_id
    })
    if(res.code==="Success"){
      this.disk_info = res.data.disk_info;
      this.get_disk_list()
    }
  }
  private async get_disk_list(){
    let res:any = await Service.get_disk_list({
        disk_info:this.$route.query.id,
        page_index:1,
        page_size:20

    })
    if(res.code==="Success"){
        this.disk_list = res.data.disk_list;

    }
  }
  //扩容
  private capacity(){
      this.$router.push({
          path:'/disk/capacity',
          query:{
              list:JSON.stringify(this.disk_list) 
          }
      })
  }
  //挂载
  private operate(val){
    this.operate_type=val
    this.visible=true
  }
  private close_disk(val){
    console.log("val",val)
    this.visible=false
    this.operate_type=""
    val==="1" && this.get_disk_detail()
  }
} 
</script>
<style lang="scss" scoped>
.detail{
  background: #f5f5f5;
  .base_info{
    .operate-btn{
      text-align: right;
      display: flex;
      flex-direction: row-reverse;
      margin-bottom: 10px;
      margin-right: 20px;
      svg#svgIcon.svg-icon.refresh{
          color: #455cc6;
          margin-top: 6px;
      }
      .el-button + .el-button{
        margin-right: 10px;
      }
      
    }
  }
  .disk-name{
    display: inline-block;
    max-width: 53%;
  }
  .el-tabs--border-card {
    background: #f5f6fa;
    border: none;
    box-shadow: none;
  }
  .el-card.is-always-shadow{
    margin-bottom: 20px;
  }
  .el-descriptions-item__container{
    .btn{
      position: absolute;
      left: 30%;
      height: 21px;
      margin-top: -6px;
    }
  }
  
}

</style>
<style lang="scss">
.detail{
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active{
    background: #f5f6fa !important;
    border-top: 1px solid #455cc6;
  }
  
  .content{
    width: calc(100% - 88px);
    padding: 0;
  }
}
</style>
