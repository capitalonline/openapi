<template>
  <el-dialog :visible.sync="syncVisible" :title="title" :close-on-click-modal="false" @close="FnClose">
    <el-form
        ref="resetForm"
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
            <el-input-number v-model="formData.cpuNum" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="逻辑核数" prop="nuclear">
          <el-input-number v-model="formData.nuclear" :step="1" placeholder="=CPU物理核数*2*颗数"></el-input-number>
        </el-form-item>
        <el-form-item label="内存" prop="memory">
            <el-input-number v-model="formData.memory" :step="1" placeholder="单块容量"></el-input-number> GB *
            <el-input-number v-model="formData.memoryNum" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="显卡"  prop="gpu">
            <el-input v-model="formData.gpu" placeholder="型号" :maxLength="256"></el-input>*
            <el-input-number v-model="formData.gpuNum" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="显存"  prop="gpuMemory">
            <el-input-number v-model="formData.gpuMemory" :step="1" placeholder="单块显卡的显存"></el-input-number> GB
        </el-form-item>
        <el-form-item label="硬盘"  prop="disk">
            <el-input-number v-model="formData.disk" :step="1" placeholder="单块容量"></el-input-number>*
            <el-select v-modal="formData.unit">
              <el-option label="GB" value="GB"></el-option>
              <el-option label="TB" value="TB"></el-option>
            </el-select>
            <el-input-number v-model="formData.diskNum" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="网卡"  prop="net">
            <el-input v-model="formData.net" placeholder="型号" :maxLength="256"></el-input>*
            <el-input-number v-model="formData.netNum" :step="1"></el-input-number>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="FnConfirm">确 定</el-button>
      <el-button @click="FnClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { ElForm } from 'element-ui/types/form';
import { Component, Prop, PropSync, Emit, Watch, Vue } from 'vue-property-decorator';
import Service from '../../https/pod/index';

@Component
export default class AddPod extends Vue {
  $message;
  @PropSync('visible', {type: Boolean}) syncVisible!: boolean;
  @Prop({default: '新增'}) title!: string;
  @Prop({default: () => ({
    id:'',
  })}) row!: Object;
  private formData:any = {
    id:'',
    name: '',
    cpu: '',
    cpuNum:1,
    nuclear: '',
    memory: '',
    memoryNum:1,
    gpu:'',
    gpuNum:1,
    gpuMemory: '',
    disk:'',
    unit:'GB',
    diskNum:1,
    net:'',
    netNum:1,
  };
  created() {
    this.formData.id = this.row.id
  }
  private rules = {
    name: [{ required: true, trigger: 'blur', message: '请输入产品名称' }],
    cpu: [{ required: true, trigger: 'blur', message: '请输入CPU型号' }],
    nuclear: [{ required: true, trigger: 'blur', message: '请输入逻辑核数' }],
    memory: [{ required: true, trigger: 'blur', message: '请输入内存' }],
    gpu: [{ required: true, trigger: 'blur', message: '请输入产品名称' }],
    gpuMemory: [{ required: true, trigger: 'blur', message: '请输入CPU型号' }],
    disk: [{ required: true, trigger: 'blur', message: '请输入产品名称' }],
    net: [{ required: true, trigger: 'blur', message: '请输入CPU型号' }],
  }
}
</script>


<style lang="scss" scoped>

</style>