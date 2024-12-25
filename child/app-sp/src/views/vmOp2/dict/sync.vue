<script lang="ts">
import {Vue, Component, PropSync, Emit,Prop} from 'vue-property-decorator';
import Service from "@/https/vmOp2/config/model"

@Component({})
export default class sync extends Vue {
  @PropSync('visible') visible_sync!:Boolean;
  @Prop({default:()=>[]}) row!:any;
  private async confirm(){
    let ids= this.row.map(item=>{return item.cpu_type_id})
    let res = await Service.sync_cpu_info({
      cpu_type_id_list:ids
    })
    if(res.code=='Success'){
      this.$message.success(res.message)
      this.$emit('close',1)
    }else {
      this.$emit('close',0)
    }
  }
  @Emit("close")
  private back(val){
    this.visible_sync=false
  }
}
</script>

<template>
  <div>
    <el-dialog
    title="底层同步"
    :visible.sync="visible_sync"
    width="760px"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @close="back"
    >
      <div>
        <el-alert
        :title="`是否确认对以下${row.length}个CPU信息执行底层同步操作`"
        type="warning"
        center
        :closable="false">
        </el-alert>
      </div>
      <el-table :data="row" :max-height="350">
        <el-table-column prop="cpu_type_id" label="编号"></el-table-column>
        <el-table-column prop="cpu_name" label="CPU显示名称"></el-table-column>
        <el-table-column prop="cpu_real_name" label="底层名称"></el-table-column>
        <el-table-column prop="cpu_generation" label="代数"></el-table-column>
        <el-table-column prop="cpu_type" label="类型"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="back('0')">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">

</style>
