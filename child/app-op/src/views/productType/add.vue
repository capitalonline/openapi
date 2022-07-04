<template>
  <el-dialog :visible.sync="syncVisible" :title="title" :close-on-click-modal="false" width="900px">
    <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        label-width="120px"
        label-suffix=":"
        label-position="left">
        <el-form-item label="物理机产品id" prop="id" v-if="formData.id">{{formData.id}}</el-form-item>
        <el-form-item label="产品名称" prop="name">
            <el-input v-model="formData.name" :maxLength="256"></el-input>
        </el-form-item>
        <el-form-item label="CPU" prop="cpu">
            <el-input v-model="formData.cpu" placeholder="型号" :maxLength="256"></el-input>*
            <el-input-number v-model="formData.cpuNum" :min="0" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="逻辑核数" prop="nuclear">
          <el-input-number class="four-two" v-model="formData.nuclear" :min="0" :step="1" placeholder="=CPU物理核数*2*颗数"></el-input-number>
        </el-form-item>
        <el-form-item label="内存" prop="memory">
            <el-input-number class="four-two" v-model="formData.memory" :min="0" :step="1" placeholder="单块容量"></el-input-number> GB *   
            &nbsp;<el-input-number v-model="formData.memoryNum" :min="0" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="显卡"  prop="gpu">
            <el-input v-model="formData.gpu" placeholder="型号" :maxLength="256"></el-input>
            <span v-if="formData.gpu">  *   <el-input-number v-model="formData.gpuNum" :min="0" :step="1"></el-input-number></span>
        </el-form-item>
        <el-form-item label="显存"  prop="gpuMemory" v-if="formData.gpu">
            <el-input-number class="four-two" v-model="formData.gpuMemory" :min="0" :step="1" placeholder="单块显卡的显存"></el-input-number> GB
        </el-form-item>
        <el-form-item label="硬盘"  prop="disk">
            <el-input-number class="two" v-model="formData.disk" :min="0" :step="1" placeholder="单块容量"></el-input-number>
            <el-select v-model="formData.unit" class="m-right10">
              <el-option label="GB" value="GB"></el-option>
              <el-option label="TB" value="TB"></el-option>
            </el-select>   *   <el-input-number v-model="formData.diskNum" :min="0" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="网卡"  prop="net">
            <el-input v-model="formData.net" placeholder="型号" :maxLength="256"></el-input>*
            <el-input-number v-model="formData.netNum" :min="0" :step="1"></el-input-number>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="FnConfirm">确 定</el-button>
      <el-button @click="syncVisible=false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { ElForm } from 'element-ui/types/form';
import { Component, Prop, PropSync, Emit, Watch, Vue } from 'vue-property-decorator';
import Service from '../../https/hostProductType';

@Component
export default class AddPod extends Vue {
  $message;
  @PropSync('visible', {type: Boolean}) syncVisible!: boolean;
  @Prop({default: '新增'}) title!: string;
  @Prop({default: () => ({
    host_product_id:''
  })}) row!: any;
  private formData:any = {
    id:this.row.host_product_id ? this.row.host_product_id : '',
    name: this.row.host_product_id ?  this.row.name : '',
    cpu: this.row.host_product_id ? this.row.cpu_name : '',
    cpuNum:this.row.host_product_id ? Number(this.row.cpu_size) : 1,
    nuclear:this.row.host_product_id ? Number(this.row.logic_cpu_size) : '',
    memory:this.row.host_product_id ? Number(this.row.ram_capacity) : '',
    memoryNum:this.row.host_product_id ? Number(this.row.ram_size) : 1,
    gpu:this.row.host_product_id ? this.row.gpu_name : '',
    gpuNum:this.row.host_product_id ? Number(this.row.gpu_size) : 1,
    gpuMemory:this.row.host_product_id ? Number(this.row.gpu_capacity) : '',
    disk:this.row.host_product_id ? Number(this.row.disk_capacity) : '',
    unit:this.row.host_product_id ? this.row.disk_unit : 'GB',
    diskNum:this.row.host_product_id ? Number(this.row.disk_size) : 1,
    net:this.row.host_product_id ? this.row.network_card_type : '',
    netNum:this.row.host_product_id ? Number(this.row.network_card_size) : 1,
  };
  created() {
  }
  private validNuclear = (rule, value, callback)=>{    
    if(!value){      
      return callback(new Error('请输入逻辑核数'))
    }
    else if((value % 2)!==0){      
      return callback(new Error('逻辑核数=CPU物理核数*2*颗数'))
    }else{
      callback()
    }
  }
  private rules = {
    name: [{ required: true, trigger: 'blur', message: '请输入产品名称' }],
    cpu: [{ required: true, trigger: 'blur', message: '请输入CPU型号' }],
    nuclear: [{ required: true, validator:this.validNuclear}],
    memory: [{ required: true, trigger: 'blur', message: '请输入内存容量' }],
    disk: [{ required: true, trigger: 'blur', message: '请输入单块硬盘容量' }],
    net: [{ required: true, trigger: 'blur', message: '请输入网卡型号' }],
  }
  private FnConfirm(){
    let form = this.$refs.form as any;
    const {name,cpu,cpuNum,nuclear,memory,
          memoryNum,gpu,gpuNum,gpuMemory,disk,
          diskNum,net,netNum,unit
    }=this.formData;
    let req:any={
      name,
      cpu_name:cpu,
      cpu_size:cpuNum,
      logic_cpu_size:nuclear,
      ram_size:memoryNum,
      ram_capacity:memory,
      gpu_capacity:gpu ? gpuMemory : undefined,
      gpu_size:gpu ? gpuNum : undefined,
      gpu_card_name:gpu,
      disk_size:diskNum,
      disk_capacity:disk,
      network_card_type:net,
      network_card_size:netNum,
      disk_unit:unit,
    }
    form.validate(async valid=>{
      if(valid){
        let res:any;
        if(this.title==='新增'){
          res = await Service.add({
            ...req,
          })
        }else{
          res = await Service.edit({
            host_product_id:this.formData.id,
            ...req,
          })
        }
        
        if(res.code==='Success'){
          this.syncVisible=false;
          this.$message.success(res.message)
        }
      }
    })
  }
}
</script>


<style lang="scss" scoped>
.el-input,.el-iput-number{
  width: 420px;
  margin-right: 5px;
}
.four-two{
  width: 420px;
  margin-right: 5px;
}
.two{
  width: 210px;
  margin-right: 5px;
}

</style>