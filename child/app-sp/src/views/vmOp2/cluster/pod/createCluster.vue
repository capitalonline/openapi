<template>
  <el-dialog
    :title="isCreate? '新建集群' : '编辑集群'"
    :visible.sync="visible_sync"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @close="cancel"
    width="800px"
    append-to-body
    >
    <el-form :model="form_data" :rules="rules" ref="createForm" label-width="170px" class="demo-ruleForm" label-position="left" label-suffix=":">
      <el-form-item label="集群名称" prop="display_name">
        <el-input v-model="form_data.cluster_name" type="textarea" autosize resize="none" :maxlength="100" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="所属POD" prop="display_name">
        <el-select v-model="form_data.father_pod" filterable :disabled="!isCreate && (oper_info && oper_info.length > 0 && oper_info[0].host_count !== 0)">
          <el-option v-for="item in pod_list" :key="item.pod_id" :label="item.pod_name" :value="item.pod_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="CPU品牌" prop="display_name">
        <el-select v-model="form_data.cpu_brand" :disabled="!isCreate && (oper_info && oper_info.length > 0 && oper_info[0].host_count !== 0)">
          <el-option v-for="item in cpu_brand" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="CPU型号" prop="display_name">
        <el-select v-model="form_data.cpu_model" filterable multiple>
          <el-option v-for="item in cpu_model" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="GPU型号" prop="display_name">
        <el-select v-model="form_data.gpu_model" filterable :disabled="!isCreate && (oper_info && oper_info.length > 0 && oper_info[0].host_count !== 0)">
          <el-option v-for="item in gpu_model" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="块存储集群" prop="display_name">
        <el-select v-model="form_data.block_storage_cluster" :disabled="!isCreate && (oper_info && oper_info.length > 0 && oper_info[0].host_count !== 0)">
          <el-option v-for="item in block_storage_cluster" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最大物理机数" prop="display_name">
        <el-input-number v-model="form_data.max_host_number" controls-position="right" :min="!isCreate && (oper_info && oper_info.length > 0) ? oper_info[0].host_count : 1"  :max="100"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </span>
  </el-dialog>
</template>

<script lang="ts">
import {Component, Prop, PropSync, Vue, Watch} from "vue-property-decorator";
import Service from "@/https/vmOp2/cluster/pod/index"
@Component({})

export default class CreateCluster extends Vue{
  @PropSync('visible') visible_sync!:Boolean;
  @Prop({default:()=>[]})oper_info!:any;
  @Prop({default:false})isCreate!:boolean;
  private pod_list:any =[]
  private cpu_brand:any=['Intel','AMD'];
  private cpu_model:any =[]
  private gpu_model:any =[]
  private block_storage_cluster:any =[]
  private form_data:any={
    cluster_name:'',
    father_pod:'',
    cpu_brand:this.cpu_brand[0],
    cpu_model:'',
    gpu_model:'',
    block_storage_cluster:'',
    max_host_number:'50'
  }
  private rules={}
  @Watch('visible')
  private FnGetInfo(newVal){
    if(!newVal){
      this.form_data={
        cluster_name:'',
        pod:'',
        cpu_brand:this.cpu_brand[0],
        cpu_model:'',
        gpu_model:'',
        block_storage_cluster:'',
        max_host_number:'50'
      }
    }
    if(newVal && !this.isCreate){
      this.form_data={
        cluster_name:this.oper_info[0].cluster_name,
        pod:'',
        cpu_brand:this.cpu_brand[0],
        cpu_model:this.oper_info[0].cpu_model,
        gpu_model:this.oper_info[0].gpu_model,
        block_storage_cluster:'',
        max_host_number:'50'
      }
    }
  }
  created(){
    this.get_pod_list()
  }
  private async get_pod_list(){
    let res:any = await Service.get_pod_list({
      az_id:this.$store.state.az_id
    })
    if(res.code ==='Success'){
      this.pod_list = res.data.pod_info_list
    }
  }
  private get_model_info_list(){

  }
  private async confirm(){
    let res:any = await (this.isCreate? Service.create_cluster:Service.update_cluster)({
      cluster_id:this.oper_info[0]? this.oper_info[0].cluster_id:undefined,
      cluster_name:this.form_data.cluster_name,
      father_pod:this.form_data.father_pod,
      cpu_brand:this.form_data.cpu_brand,
      cpu_model:this.form_data.cpu_model,
      gpu_model:this.form_data.gpu_model,
      storage_cluster_name:this.form_data.block_storage_cluster,
      max_host_count:this.form_data.max_host_number
    })
    if(res.code==='Success'){
      this.$message.success(res.message)
      this.cancel()
    }
  }
  private cancel(){
    this.visible_sync=false
  }
}
</script>
<style lang="scss" scoped>
.el-select,.el-date-picker,.el-input-number{
  width: 530px;
}
.el-input-number, .el-input__icon{
  line-height: 33px;
}

</style>
