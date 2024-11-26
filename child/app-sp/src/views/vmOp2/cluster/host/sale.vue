<template>
  <div>
  <el-dialog
    :title="type === 'forbid' ? '禁售' : '取消禁售'"
    :visible.sync="visible_sync"
    width="800px"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @close="visible_sync=false"
  >
    <el-alert
      :title="`是否确定要对以下实例执行 ${type === 'forbid' ? '禁售' : '取消禁售'} 操作`"
      type="warning"
      :closable="false"
      center></el-alert>
    <el-table
      :data="oper_info"
      border
    >
      <el-table-column prop="card_name" label="GPU"></el-table-column>
      <el-table-column prop="host_id" label="物理机ID"></el-table-column>
      <el-table-column prop="host_name" label="主机名"></el-table-column>
      <el-table-column prop="pci_address" label="PCIe号"></el-table-column>
      <el-table-column prop="lock" v-if="type === 'forbid'" label="禁售原因" >
        <template slot-scope="scope">
          <el-input v-model="reason" type="textarea"  placeholder="请输入禁售原因" maxlength="50" show-word-limit></el-input>
          <div v-show="!reason" class="error_message">请输入禁售原因</div>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="confirm">确认</el-button>
    <el-button @click="visible_sync=false">取消</el-button>
  </span>
  </el-dialog>
  </div>
</template>
<script lang="ts">
import {Component, Vue, PropSync, Prop,Watch} from "vue-property-decorator";
import Service from "@/https/gpu/list";
import {findPodIdByHostId} from "@/utils/vmOp2/findPodId";
@Component({})
export default class Sale extends Vue{
  @PropSync('visible')visible_sync!:boolean;
  @Prop({default:()=>{}})oper_info!:any;
  @Prop({default:''}) type!:string;
  private reason:string = ''
  @Watch('visible_sync')
  private watch_visible(n){
    if(!n){
      this.reason = ''
    }
  }
  private async confirm(){
    if(this.type === 'forbid' && this.reason === '') return
    let pod_id = findPodIdByHostId(this.$route.params.id)
    let req = {
      pod_id:pod_id,
      op_type:this.type,
      host_id:this.oper_info[0].host_id,
      pci_address:this.oper_info[0].pci_address
    }
    if(this.type === 'forbid'){
      req['message'] = this.reason
    }
    let res = await Service.handle_gpu_sale(req)
    if(res.code === 'Success'){
      this.$message.success(res.message)
      this.visible_sync = false

    }
  }
}
</script>
<style lang="scss" scoped>
</style>
