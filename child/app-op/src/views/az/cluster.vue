<template>
  <el-dialog
      title="集群调度"
      :visible.sync="visibleSync"
      width="500px"
      :destroy-on-close="true"
      :close-on-click-modal="false"
  >
    <el-form ref="form" :model="form" label-width="180px" label-suffix=":" label-position="left">
      <el-form-item label="是否开启集群调度">
        <el-switch
            class="tableScopeSwitch"
            v-model="form.isEnable"
            active-text="开"
            inactive-text="关"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否开启宕机集群内迁移">
        <el-switch
            class="tableScopeSwitch"
            v-model="form.isMigration"
            active-text="开"
            inactive-text="关"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="!form.isEnable">
        </el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="visibleSync = false">取 消</el-button>
        </span>
  </el-dialog>
</template>

<script lang="ts">
import {Component, Prop, PropSync, Vue, Watch} from "vue-property-decorator";
import Service from '../../https/az/list';
@Component

export default class Cluster extends Vue{
  @PropSync('visible')visibleSync!:boolean;
  @Prop({default:()=>{}})info!:any;
  private form:any = {
    isEnable: false,
    isMigration:false
  }
  @Watch('form.isEnable')
  private watch_enable(n){
    if(!n){
      this.form.isMigration = false
    }
  }
  created(){
    if(this.info.cluster_schedule === 1){
      this.form ={
        isEnable: true,
        isMigration:false
      }
    }else if(this.info.cluster_schedule === 2){
      this.form ={
        isEnable: true,
        isMigration:true
      }
    }
  }
   private get enable_cluster():number{
    if (this.form.isEnable && !this.form.isMigration) {
      return 1;
    } else if (this.form.isEnable && this.form.isMigration) {
      return 2;
    } else {
      return 0;
    }
  }
  private async confirm(){
    let res:any = await Service.enable_cluster_schedule({
      az_id:this.info.az_id,
      enable:this.enable_cluster
    })
    if(res.code === 'Success'){
      this.$message.success(res.message)
    }
    this.visibleSync=false
  }
}
</script>

<style scoped>

</style>