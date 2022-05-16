<template>
  <div>
     <el-dialog
      :title="title"
      :visible.sync="visible_sync"
      width="760px"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="back"
    >
        <div>
            <el-alert
                :title="alert_title"
                type="warning"
                center
                :closable="false">
            </el-alert>
            <el-table
                :data="rows"
                border
            >
                <el-table-column prop="host_name" label="主机名"></el-table-column>
                <el-table-column prop="host_name" label="区域" v-if="oper_type==='finish_validate'"></el-table-column>
                <el-table-column prop="machine_status_name" label="主机状态" v-if="!status_list.includes(title)"></el-table-column>
                <el-table-column prop="power_status_name" label="电源状态"></el-table-column>
                <el-table-column prop="power_status_name" label="主机用途"></el-table-column>
                <el-table-column prop="power_status_name" label="主机来源" v-if="['finish_validate','shelves'].includes(oper_type)"></el-table-column>
            </el-table>
            <div class="text-center m-top20" v-if="oper_type==='shelves'">
              <span>回收部门：</span>
              <el-select v-model="recycleId">
                <el-option v-for="item in recycle_list" :key="item.key" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </div>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="back('0')">取消</el-button>
        </span>
    </el-dialog>


    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue,PropSync } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import Service from '../../https/physical/list';
import moment from 'moment';

@Component({
  components:{
    ActionBlock
  }
})
export default class Operate extends Vue{
  $message;
  @PropSync('visible') visible_sync!:Boolean;
  @Prop({default:()=>[]}) rows!:any
  @Prop(String) title!:string;
  @Prop(String) oper_type!:string;
  private alert_title = `是否确定对以下${this.rows.length}台物理机执行${this.title}操作？`
  private status_list:Array<String> = ['开机','关机','重启'];
  private recycle_list=[
    {label:'裸金属',key:'ljs'},
    {label:'集团',key:'jt'}
  ]
  private recycleId:string=this.recycle_list[0].key
  private operate_info={
    'start_up_host':'host_operate',
    'shutdown_host':'host_operate',
    'restart_host':'host_operate',
    'online_maintenance':'host_maintenance',
    'offline_maintenance':'host_maintenance',
    'finish':'finish_maintenance',
    'shelves':'shelves',
    'disperse':'disperse',
    'finish_validate':'finish_validate',
  }
  private async confirm(){
    let req=this.status_list.includes(this.title) ? {
      op_type:this.oper_type,
      host_ids:this.rows.map(item=>item.host_id)
    } : ['online_maintenance','offline_maintenance'].includes(this.oper_type) ? {
      maintenance_type:this.oper_type,
      host_ids:this.rows.map(item=>item.host_id)
    }:{host_ids:this.rows.map(item=>item.host_id)}

    let res:any=await Service[this.operate_info[this.oper_type]]({
        ...req
    })
    if(res.code==="Success"){
      if(this.oper_type==="offline_maintenance" && res.data.fail_host_list.length>0){
        this.$message.warning(`物理机${this.title}任务下发失败！`)
        this.back("0");
        return;
      }
      this.$message.success(`物理机${this.title}任务下发成功！`)
      this.back("1")
    }else{
      this.back("0")
    }
  }
  @Emit("close")
  private back(val){
      this.visible_sync=false
  }

}
</script>
<style lang="scss">


</style>
