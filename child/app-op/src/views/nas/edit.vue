<template>
  <el-dialog :visible.sync="visible" title="编辑NAS可售总量"  @close="back">
    <el-form
        ref="resetForm"
        :model="data"
        label-width="120px"
        label-position="left">
      <el-form-item label="节点：" >{{data.az_name}}</el-form-item>
      <el-form-item label="当前总容量：">
        {{data.total}} TB
      </el-form-item>
      <el-form-item label="调整后总容量：">
        <el-input-number
            :controls="false"
            style="width: 282px"
            v-model="data.newTotal"
            :min="0"
            :precision="2"></el-input-number> TB
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="back">取 消</el-button>
      <el-button type="primary" @click="FnConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from "vue-property-decorator";
import Service from "@/https/nas/list";
@Component({})
export default class Edit extends Vue{
  @Prop(Boolean) visible!:Boolean;
  @Prop({default:()=>{}}) private data_info!:any;

  private data = {
    az_name: '',
    az_id: '',
    total: '',
    newTotal:''
  }
  private async FnConfirm(){
    let req = {
      az_id: this.data.az_id,
      total: this.data.newTotal
    }
    const res:any = await Service.post_edit_nas(req)
    if(res.code === 'Success'){
      this.$message.success(res.message)
      this.back()
    }
  }
  @Emit('close')
  private back(){
  }
  @Watch('visible')
  private FnGetRow(newVal) {
    if (!newVal) {
      this.data.newTotal = ''
    }
    this.data.az_name = this.data_info.name
    this.data.total = this.data_info.total
    this.data.az_id = this.data_info.az_id
  }
}
</script>

<style scoped>

</style>