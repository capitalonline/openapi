<template>
  <div>
    <el-dialog
      title="迁移"
      :visible.sync="visible_sync"
      width="830px"
      :destroy-on-close="true"
      custom-class="upload"
      :close-on-click-modal="false"
    >
      <el-alert
        :title="`是否确定要对以下实例执行迁移操作`"
        type="warning"
        :closable="false"
        center
      >
      </el-alert>
      <el-table :data="ecs_list" border class="operate-table" max-height="400px">
        <el-table-column prop="customer_id" label="客户ID"></el-table-column>
        <el-table-column prop="customer_name" label="客户名称"></el-table-column>
        <el-table-column prop="ecs_id" label="实例名称/实例ID">
          <template slot-scope="scope">
            <div>{{scope.row.ecs_name}} / </div>
            <el-tooltip :content="getMsg(scope.row)" effect="light" v-if="!useable_list.includes(scope.row.ecs_id)">
              <div>{{scope.row.ecs_id}}</div>
            </el-tooltip>
            <span v-else>{{scope.row.ecs_id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status_display" label="状态"></el-table-column>
        <el-table-column prop="genre" label="计算规格"></el-table-column>
        <el-table-column prop="genre" label="存储" width="140px">
          <template slot-scope="scope">
            <div v-if="scope.row.disk_info">系统盘：{{Object.keys(scope.row.disk_info.system)[0]}} {{scope.row.disk_info.system[Object.keys(scope.row.disk_info.system)[0]]}}{{scope.row.disk_info.unit}}</div>
            <div v-if="scope.row.disk_info && Object.keys(scope.row.disk_info.data).length>0" class="data-item">
              数据盘：
              <!-- <div v-for="(name,i) in scope.row.disk_info.data" :key="i">{{i}}</div> -->
              <div v-for="(item,i) in scope.row.disk_info.data" :key="i">{{i}} {{item}}{{scope.row.disk_info.unit}}</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="right">
        <h4>目的主机:</h4>
        <div class="m-bottom20">
          <span class="m-right10">可用区:</span>
          <span>{{$store.state.az_name}}</span>
        </div>
        <div>物理机：<span class="prompt_message">（若不选择则随机迁移至合适的目的主机）</span></div>
        <div class="recommend" v-if="recommend.length>0">
          <div v-for="item in recommend" :key="item.host_id" class="item" @click="handle(item.host_id)" :class="physical.includes(item.host_id) ? 'active' : ''">
            {{item.host_name}}
            <el-tooltip :content="item.cpu_usage ? (parseFloat(item.cpu_usage)).toFixed(2)+'%' : '0.00%'" placement="bottom" effect="light">
              <div class="title">
                <CustomIcon :hei="item.cpu_usage" />
                <div>CPU</div>
              </div>
            </el-tooltip>
            <el-tooltip :content="item.memory_usage ? (parseFloat(item.memory_usage)).toFixed(2)+'%' : '0.00%'" placement="bottom" effect="light">
              <div class="title">
                <CustomIcon :hei="item.memory_usage" />
                <div>内存</div>
              </div>
            </el-tooltip>
            <el-tooltip :content="item.local_storage_usage ? (parseFloat(item.local_storage_usage)).toFixed(2)+'%' : '0.00%'" placement="bottom" effect="light">
              <div class="title">
                <CustomIcon :hei="item.local_storage_usage" />
                <div>本地存储</div>
              </div>
            </el-tooltip>
            <el-tooltip :content="`${item.used_gpu_num ? item.used_gpu_num : 0} / ${item.total_gpu_num ? item.total_gpu_num : 0}`" placement="bottom" effect="light">
              <div class="title">
                <CustomIcon :hei="item.total_gpu_num===0 ? 0 : Number((item.used_gpu_num / item.total_gpu_num).toFixed(2))*100" />
                <div>显卡</div>
              </div>
            </el-tooltip>
          </div>
        </div>
        <div v-else class="error_message m-top10">无合适的物理机，无法迁移。</div>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm" :disabled="this.recommend.length===0">确认</el-button>
            <el-button @click="visible_sync =false">取消</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script lang="ts">
import {Component, Emit, Prop, PropSync, Vue} from "vue-property-decorator";
import Service from "@/https/physical/list";
import CustomIcon from '@/views/physical/customIcon.vue';

@Component({
  components: {
    CustomIcon
  }
})
export default class Migrate extends Vue{
  @PropSync('visible') visible_sync!:Boolean;
  @Prop({default:()=>[]}) ecs_list!:any;
  private recommend=[];
  private physical:Array<string>=[]
  private list:any= this.ecs_list[0].ecs_list
  private useable_list:any=[];
  created() {
    this.get_recommended_host();
   // this.setUsableList(this.ecs_list)
    this.list=this.ecs_list[0].ecs_list;
  }
  private async get_recommended_host(val:string=""){
    this.$store.commit("SET_LOADING", false);
    let res:any=await Service.recommended_host({
      host_id:this.ecs_list[0].host_id,
      host_name:val,
      ecs_ids:this.ecs_list.map(item=>item.ecs_id),
      is_gpu:this.ecs_list[0].host_purpose==='GPU' ? '1' : '0',
      gpu_card_name:this.ecs_list[0].gpu_real_name,
    })
    if(res.code==="Success"){
      this.recommend = res.data.data;
      if(this.ecs_list.length===0){
        this.physical=[]
      }
    }
  }
  private setUsableList(data){
    let status_list = data[0].ecs_list.filter(item=>['已关机','运行中'].includes(item.status))//筛选出符合状态的；
    let list:any=[]
    status_list.map(item=>{
      if(item.is_gpu && item.status==='已关机' && !item.no_charge_shutdown_ecs){
        list.push(item.ecs_id)
      }else if(!item.is_gpu &&item.disk_info && item.disk_info.system){
        if(Object.keys(item.disk_info.system)[0]!=='local'){//cpu云盘
          if(['已关机','运行中'].includes(item.status)){//cpu云盘
            list.push(item.ecs_id)
          }
        }else{//cpu本地盘
          if(item.status==='已关机'){
            list.push(item.ecs_id)
          }
        }
      }
    })
    this.useable_list=list//可以进行迁移的云主机
  }
  private getMsg(item){
    if(item.is_gpu || (item.disk_info && Object.keys(item.disk_info.system)[0]==='local')){
      return '仅支持关机迁移'
    }else{
      return '仅运行中和已关机状态下迁移'
    }
  }
  private handle(id:string){
    if(this.physical.includes(id)){
      this.physical = this.physical.filter(item=>item!==id)
    }else{
      this.physical.push(id)
    }
  }
  private async confirm(){
    let res:any=await Service.migrate({
      ecs_ids:this.ecs_list.map(item=>item.ecs_id),
      start_host_id:this.ecs_list[0].host_id,
      end_host_ids:this.physical,
      is_gpu:this.ecs_list[0].host_purpose==='GPU' ? '1' : '0',
    })
    if(res.code==="Success"){
      this.$message.success(`物理机迁移任务下发成功！`)
      this.visible_sync = false
    }else{
      this.visible_sync = false
    }
  }

}
</script>

<style scoped>

</style>
