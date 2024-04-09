<template>
  <el-dialog
    :title="title"
    :visible.sync="visibleSync"
    width="50%"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @close="back"
  >
    <div class="tip">
      <div>产品定义：单块云盘吞吐量=min{120,0.2*容量，260}</div>
      <div style="font-weight: bold">不建议单独为某客户或实例手动调整限速，因IOPS超出会带来<span class="error">平台瘫痪</span>的风险，请操作前进行充分的风险评估。</div>
    </div>
    <el-form
      v-if="title === '修改吞吐量限制'"
      ref="resetForm"
      :model="data"
      label-width="120px"
      label-position="left">
      <el-form-item label="当前吞吐量：" >{{data.current_mbps ? `${data.current_mbps}${data.mbps_unit}` : ''}}</el-form-item>
      <el-form-item label="变更为：">
        <el-input-number
          :controls="false"
          style="width: 200px"
          v-model="data.update_mbps"
          :min="0"
          :max="260"
        ></el-input-number> MB/s
      </el-form-item>
      <el-radio-group v-model="data.set">
        <div><el-radio label="1">云盘变更（容量变更/重装系统）时，按默认规则更新限速值。</el-radio></div>
        <el-radio label="0">云盘变更（容量变更/重装系统）时，限速保持此设置值不变。</el-radio>
      </el-radio-group>
    </el-form>
    <div v-else>
      <div style="font-weight: bold;margin-bottom: 5px">您正在为所选择的{{mount_id.length}}个云盘批量设置IOPS，本次设置将同步应用于全部所选资源。</div>
      <el-form
        ref="batchFrom"
        label-width="120px"
        label-position="left">
        <el-select style="width: 365px" value="查看所选资源">
          <el-option
            v-for="disk in mount_id"
            :key="disk.disk_id"
            :value="disk.disk_id"
          >
            {{disk.disk_id+ '/' + disk.disk_name}}
          </el-option>
        </el-select>
        <el-form-item label="全部变更为：">
          <el-input-number
            :controls="false"
            style="width: 245px"
            v-model="data.update_mbps"
            :min="0"
            :max="26000"
          ></el-input-number> MB/s
        </el-form-item>
        <el-radio-group v-model="data.set">
          <div><el-radio label="1">云盘变更（容量变更/重装系统）时，按默认规则更新限速值。</el-radio></div>
          <el-radio label="0">云盘变更（容量变更/重装系统）时，限速保持此设置值不变。</el-radio>
        </el-radio-group>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirm">确定</el-button>
                <el-button type="default" @click="cancel">取消</el-button>
            </span>
  </el-dialog>
</template>

<script lang="ts">
import {Component, Emit, Prop, PropSync, Vue} from "vue-property-decorator";
import Service from "@/https/disk/list";
@Component({})

export default class Mbps extends Vue{
  @PropSync('visible') visibleSync!:Boolean;
  @Prop(String) title:string
  @Prop({default:()=>[]}) mount_id!:any
  private data = {
    current_mbps: '',
    mbps_unit: '',
    update_mbps: '',
    set:'1'
  }
  created() {
    this.data.current_mbps = this.mount_id[0].band_mbps
    this.data.mbps_unit = this.mount_id[0].mbps_unit
  }
  private async confirm(){
    let res:any = await Service.change_iops_mbps({
      disk_ids:this.mount_id.map(item=>item.disk_id),
      band_mbps:this.data.update_mbps,
      mbps_is_default:this.data.set,
      customer_id:this.mount_id[0].customer_id
    })
    if(res.code === 'Success'){
      this.$message.success(res.message)
      this.back("1",'mbps')
    }else{
      this.back("0",'mbps')
    }
  }
  private cancel(){
    this.back("0",'mbps')
  }
  @Emit("close")
  private back(val,type){
  }

}
</script>

<style scoped lang="scss">
.tip{
  padding: 10px;
  background: #f2fBfE;
  border: 1px solid #e7e7e7;
  margin-bottom: 10px;
  div{
    margin-top: 10px;
  }
}

</style>
