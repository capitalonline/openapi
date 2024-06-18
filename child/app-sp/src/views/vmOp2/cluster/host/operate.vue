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
          title="操作重启请检查是否有虚机运行，若有，请谨慎操作！"
          type="warning"
          center
          v-if="oper_type==='restart_host'"
          :closable="false">
        </el-alert>
        <el-alert
          :title="alert_title"
          type="warning"
          center
          :closable="false">
        </el-alert>
        <el-table
          :data="rows"
          border
          max-height="253"
        >
          <el-table-column prop="label" label="主机名" width="150"></el-table-column>
          <el-table-column prop="power_status_name" label="电源状态"></el-table-column>
          <el-table-column prop="machine_status_name" label="机器状态"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="confirm" :disabled="rows.length === 0">确认</el-button>
            <el-button type="primary" @click="back('0')">取消</el-button>
        </span>
    </el-dialog>


  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue,PropSync } from 'vue-property-decorator';
import ActionBlock from '@/components/search/actionBlock.vue';
import Service from '@/https/physical/list';
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
  private list:any=[]
  private operate_info={
    'start_up_host':'host_operate',
    'shutdown_host':'host_operate',
    'restart_host':'host_operate',
  }
  private async confirm(){
    let req={
      op_type: this.oper_type,
      host_ids: this.rows.map(item => item.id)
    }
    console.log(this.oper_type)
    let res:any=await Service[this.operate_info[this.oper_type]]({
      ...req
    })

    if(res.code==="Success"){
      if(res.data.fail_host_list.length>0){
        if(this.oper_type === 'maintenance'){
          let message = "";
          for (let key in res.data.fail_msg_group_by_host) {
            message += res.data.fail_msg_group_by_host[key] + "\n";
          }
          this.$message.error(message);
          this.back("0");
        }else {
          this.$message.warning(res.message + res.data.fail_msg)
          res.data.success_host_list.length> 0 ? this.back("1"): this.back('0')
          return;
        }
      }else{
        this.$message.success(res.message)
        this.back("1")
      }
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
