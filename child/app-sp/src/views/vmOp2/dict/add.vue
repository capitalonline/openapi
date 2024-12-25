<script lang="ts">
import {Vue, Component, Prop, Emit, PropSync, Watch} from 'vue-property-decorator';
import Service from "@/https/vmOp2/config/model"
import {Form} from "element-ui";

@Component({})
export default class add_cpu extends Vue {
  @PropSync('visible')visible_sync!:boolean;
  @Prop({default:''}) type!:string;
  @Prop({default:()=>{}}) info!:any;
  private title:string = `新增${this.type}字典`
  private form:any= {
    display_name: '',
    real_name: '',
    generation: '',
    type: '',
    brand: '',
    model: '',
    id:''
  }
  private validatValue=(rule, value, callback)=>{
    let reg = new RegExp("^[0-9]*[1-9][0-9]*$")
    if (value === '') {
      callback(new Error('请输入代数'));
    } else if (!reg.test(value)) {
      callback(new Error('代数只能为正整数'));
    } else {
      callback();
    }
  }
  private rules = {
    display_name: [{ required: true, message: '请输入显示名称', trigger: 'blur' }],
    real_name: [{ required: true, message: '请输入底层名称', trigger: 'blur' }],
    generation: [{ validator: this.validatValue, trigger: 'blur',required: true, }],
    type: [{ required: true, message: '请输入类型', trigger: 'blur' }],
    brand: [{ required: true, message: '请输入品牌', trigger: 'blur' }],
    model: [{ required: true, message: '请输入型号', trigger: 'blur' }]
  }
  @Watch('info',{deep:true})
  private infoChange(val){
    if(val){
      if(this.type == 'CPU'){
        this.form = {
          display_name: val.cpu_name,
          real_name: val.cpu_real_name,
          generation: val.cpu_generation,
          type: val.cpu_type,
          brand: val.cpu_brand,
          model: val.cpu_model,
          id: val.cpu_type_id
        }
      }else {
        this.form = {
          display_name: val.gpu_name,
          real_name: val.gpu_real_name,
          brand: val.gpu_brand,
          id: val.gpu_type_id
        }
      }
      this.title = `${val && this.form.id ? '编辑' : '新增'}${this.type}字典`
    }
  }
  private async confirm(){
    let form = this.$refs.form as Form
    form.validate(async valid=>{
      if(valid){
        if (!Array.isArray(this.form.real_name) && this.type == 'GPU') {
            this.form.real_name = this.form.real_name.split(',')
        }
        let cpu_info = {
          model_type:this.type.toLowerCase(),
          cpu_name:this.form.display_name,
          cpu_real_name:this.form.real_name,
          cpu_generation:this.form.generation,
          cpu_type: this.form.type,
          cpu_brand:this.form.brand,
          cpu_model:this.form.model
        }
        let gpu_info = {
          model_type:this.type.toLowerCase(),
          gpu_name:this.form.display_name,
          gpu_real_name:this.form.real_name,
          gpu_brand:this.form.brand,
        }
        let res;
        if (Object.keys(this.info).length>0) {
          this.type == 'GPU' ? gpu_info['model_type_id'] = this.info.gpu_type_id :  cpu_info['model_type_id'] = this.info.cpu_type_id
          res = await Service.update_model_info(this.type == 'GPU'? gpu_info : cpu_info);
        } else {
          res = await Service.add_model_info(this.type == 'GPU'? gpu_info : cpu_info);
        }
        if(res.code === 'Success'){
          this.$emit('close', 1)
          this.$message.success(res.message)
        }else {
          this.$emit('close', 0)
        }
      }
    })
  }
  @Emit("close")
  private back(val){
    this.visible_sync=false
    const form = this.$refs.form as Form
    form.resetFields()
  }

}
</script>

<template>
  <div>
    <el-dialog
    :title="title"
    :visible.sync="visible_sync"
    width="45%"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @close="back"
    >
      <el-form :model="form" ref="form" :rules="rules" label-width="120px" label-position="left" label-suffix=":" class="demo-ruleForm">
        <el-form-item label="显示名称" prop="display_name">
          <el-input v-model="form.display_name" maxlength="128" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="底层名称" prop="real_name">
          <el-input v-model="form.real_name" maxlength="255" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="代数" prop="generation" v-if="type === 'CPU'">
          <el-input v-model="form.generation" maxlength="6" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type" v-if="type === 'CPU'">
          <el-input v-model="form.type" maxlength="36" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="form.brand" maxlength="36" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="型号" prop="model" v-if="type === 'CPU'">
          <el-input v-model="form.model" maxlength="36" show-word-limit>></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="back">取 消</el-button>
        </span>

    </el-dialog>
  </div>

</template>

<style scoped lang="scss">

</style>
