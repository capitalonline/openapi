<template>
  <el-dialog
    title="编辑GPU"
    :visible.sync="visible_sync"
    width="800px"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @close="cancel"
  >
    <el-form :model="form_data"  ref="gpu_form" label-width="170px" class="demo-ruleForm" label-position="left" label-suffix=":">
      <el-form-item label="物理机ID" prop="card_name">
        <span>{{ oper_info.host_id }}</span>
      </el-form-item>
      <el-form-item label="GPU" prop="card_name">
        <span>{{ oper_info.card_name }}</span>
      </el-form-item>
      <el-form-item label="PCIe号" prop="pci_address">
        <span>{{ oper_info.pci_address }}</span>
      </el-form-item>
      <el-form-item label="Slot" prop="slot">
        <span>{{ oper_info.slot }}</span>
      </el-form-item>
      <el-form-item label="SN号" prop="sn" :rules="[{ required: true, message: '请输入SN号', trigger: 'blur' }]">
        <el-input v-model="form_data.sn" type="textarea" autosize resize="none"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </span>
  </el-dialog>
</template>

<script lang="ts">
import {Component, Vue, PropSync, Prop, Watch} from "vue-property-decorator";
import {Form} from "element-ui";
import Service from "@/https/gpu/list";
@Component({})
export default class gpuEdit extends Vue{
  @PropSync('visible')visible_sync!:boolean;
  @Prop({default:()=>{}})oper_info!:any;

  private form_data:any={
    sn:this.oper_info.sn ? this.oper_info.sn : ''
  }
  @Watch('oper_info',{immediate:true})
  private watch_info(v){
    this.form_data.sn = v.sn ? v.sn : ''
  }
  private async confirm(){
    const form= this.$refs.gpu_form as Form;
    form.validate(async valid=> {
      if(valid) {
        const resData: any = await Service.post_edit_gpu({
          host_id: this.oper_info.host_id,
          pci_address: this.oper_info.pci_address,
          slot: this.oper_info.slot,
          sn: this.form_data.sn
        })
        if (resData.code === 'Success') {
          this.$message.success(resData.message)
          this.visible_sync = false
        }
      }
    })
  }
  private cancel(){
    const form= this.$refs.gpu_form as Form;
    form.resetFields()
    this.visible_sync=false
  }
}
</script>

<style scoped>

</style>
