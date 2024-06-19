<template>
  <el-dialog
    class="clusterBox"
    :title="isCreate? '新建集群' : '编辑集群'"
    :visible.sync="visible_sync"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @close="cancel"
    width="800px"
    append-to-body
    >
    <el-form :model="form_data" :rules="rules" ref="createForm" label-width="170px" class="demo-ruleForm" label-position="left" label-suffix=":">
      <el-form-item label="集群名称" prop="cluster_name">
        <el-input v-model="form_data.cluster_name" type="textarea" autosize resize="none" :maxlength="100" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="所属POD" >
        <el-select v-model="form_data.father_pod" filterable :disabled="!isCreate && (oper_info && oper_info.length > 0 && oper_info[0].host_count !== 0)">
          <el-option v-for="item in pod_list" :key="item.pod_id" :label="item.pod_name" :value="item.pod_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="CPU品牌" >
        <el-select v-model="form_data.cpu_brand" @change="changeCpuBrand" :disabled="!isCreate && (oper_info && oper_info.length > 0 && oper_info[0].host_count !== 0)">
          <el-option v-for="item in cpu_brand_list" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="CPU型号" prop="cpu_model">
        <el-select v-model="form_data.cpu_model" filterable multiple>
          <el-option v-for="item in cpu_model_list" :key="item.id" :label="item.real_name" :value="item.real_name" :disabled="FnSelectedCpus(item)"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="GPU型号" >
        <el-select v-model="form_data.gpu_model" filterable :disabled="!isCreate && (oper_info && oper_info.length > 0 && oper_info[0].host_count !== 0)">
          <el-option v-for="(item,index) in gpu_model_list" :key="index" :label="item.real_name" :value="item.real_name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="块存储集群">
        <el-select v-model="form_data.block_storage_cluster" value-key="id" :disabled="!isCreate && (oper_info && oper_info.length > 0 && oper_info[0].host_count !== 0)">
          <el-option v-for="item in storage_cluster_list" :key="item.id" :label="item.name" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最大物理机数" prop="max_host_number">
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
import {Form} from "element-ui";
import bus from "@/utils/vmOp2/eventBus";
@Component({})

export default class CreateCluster extends Vue{
  @PropSync('visible') visible_sync!:Boolean;
  @Prop({default:()=>[]})oper_info!:any;
  @Prop({default:false})isCreate!:boolean;
  private pod_list:any =[]
  private cpu_brand_list:any=['Intel','AMD'];
  private cpu_model_list:any =[]
  private gpu_model_list:any =[]
  private storage_cluster_list:any =[]
  private form_data:any={
    cluster_name:'',
    father_pod:'',
    cpu_brand:this.cpu_brand_list[0],
    cpu_model:'',
    gpu_model:'',
    block_storage_cluster:{
      id:'',
      name:''
    },
    max_host_number:'50'
  }
  private rules={
    cluster_name: [{ required: true, message:'请输入集群名称', trigger: 'change' }],
    cpu_model: [{ required: true, message: '请选择CPU品牌', trigger: 'change' }],
    max_host_number: [{ required: true, message: '请输入最大物理机数', trigger: 'change' }],
  }

  @Watch('visible')
  private FnGetInfo(n) {
  const defaultFormData = {
    cluster_name: '',
    father_pod: '',
    cpu_brand: this.cpu_brand_list[0],
    cpu_model: '',
    gpu_model: '',
    block_storage_cluster:{
      id:'',
      name:''
    },
    max_host_number: '50'
    };
    if (!n) {
      this.form_data = { ...defaultFormData };
    } else {
      this.get_pod_list();
      this.get_storage_cluster_info();
      this.getModelInfoList('cpu');
      this.getModelInfoList('gpu');
    }
    if (n && !this.isCreate) {
      this.form_data = {
        ...defaultFormData,
        cluster_name: this.oper_info[0].cluster_name,
        block_storage_cluster:{
          id:this.oper_info[0].storage_cluster_id,
          name:this.oper_info[0].storage_cluster_name
        },
        max_host_number:this.oper_info[0].max_host_count,
        cpu_brand:this.oper_info[0].cpu_brand
      };
      console.log('this.form_data',this.form_data)
    }
  }
  private FnSelectedCpus(item){
    let isDisabledModel = false
    if(this.oper_info && this.oper_info[0]){
      isDisabledModel = item.real_name === this.oper_info[0].cpu_model;
    }
    // 检查当前 CPU 型号是否有宿主机
    const hasHost = this.oper_info && this.oper_info.length > 0 && this.oper_info[0].host_count !== 0;
    // 如果当前 CPU 型号已经被选中，并且有宿主机，则禁用该选项
    if (isDisabledModel  && hasHost) {
      return true;
    }else {
      return false
    }
  }
  private async get_pod_list(){
    let res:any = await Service.get_pod_list({
      az_name:this.$store.state.az_name,
    })
    if(res.code ==='Success'){
      this.pod_list = res.data.pod_list
      this.form_data.father_pod = this.isCreate && this.pod_list[0] ? this.pod_list[0].pod_id : this.oper_info[0].pod_id
    }
  }
  private async get_storage_cluster_info(){
    let res:any = await Service.get_storage_cluster_info({
      az_id:this.$store.state.az_id,
      az_code:this.$store.state.az_code
    })
    if(res.code ==='Success'){
      this.storage_cluster_list = res.data.clusters
      if(this.isCreate){
        this.form_data.block_storage_cluster =  ''
      }else {
        this.form_data.block_storage_cluster.name = this.oper_info[0].storage_cluster_name
        this.form_data.block_storage_cluster.id = this.oper_info[0].storage_cluster_id
      }
    }
  }

  private async getModelInfoList(type){
    let res:any = await Service.get_model_info_list({
      handle_type: type,
      cpu_brand: this.form_data.cpu_brand // 保持这行不变
    });
    if(res.code === 'Success'){
      if(type === 'cpu'){
        this.cpu_model_list = res.data.model_info_list;
        if(this.isCreate){
          if(this.cpu_model_list.length > 0){
            this.form_data.cpu_model =[this.cpu_model_list[0].real_name]
          }else {
            this.form_data.cpu_model =''
          }
        }else {
          this.form_data.cpu_model = this.oper_info[0].cpu_model
        }
      } else if(type === 'gpu'){
        this.gpu_model_list = res.data.model_info_list;
        this.form_data.gpu_model = this.isCreate && '' ? this.gpu_model_list[0].real_name: this.oper_info[0].gpu_model;
      }
    }
  }

  private changeCpuBrand(){
    this.getModelInfoList('cpu')
  }
  private async confirm(){
    const form= this.$refs.createForm as Form;
    form.validate(async valid=> {
      console.log('====')
      if (valid) {
        let res: any = await (this.isCreate ? Service.create_cluster : Service.update_cluster)({
          az_id: this.$store.state.az_id,
          cluster_id: this.oper_info[0] ? this.oper_info[0].cluster_id : undefined,
          cluster_name: this.form_data.cluster_name,
          father_pod_id: this.form_data.father_pod,
          cpu_brand: this.form_data.cpu_brand,
          cpu_model: this.form_data.cpu_model,
          gpu_model: this.form_data.gpu_model,
          storage_cluster_id: this.form_data.block_storage_cluster.id,
          storage_cluster_name: this.form_data.block_storage_cluster.name,
          max_host_count: this.form_data.max_host_number
        })
        if (res.code === 'Success') {
          this.$message.success(res.message)
          this.cancel()
          bus.$emit('getTreeData',false)
        }
      }
    })
  }
  private cancel(){
    this.visible_sync=false
  }
}
</script>
<style lang="scss">
.clusterBox{
  .el-select,.el-date-picker,.el-input-number{
    width: 530px;
  }
  .el-input-number, .el-input__icon{
    line-height: 33px;
  }
  .el-tag.el-tag--info .el-tag__close{
    display: none;
  }
}

</style>
