<template>
  <el-form 
    :model="data" 
    :rules="rules"
    ref="resetForm"
    label-position="left" 
    label-width="120px" 
    class="pwd-form">
    <el-form-item label="用户名">
      {{ username }}
    </el-form-item>
    <el-form-item label="新密码" prop="password">
      <div class="long-input"><el-input type="password" v-model="data.password"></el-input></div>
      <div class="prompt_message"> 8-30个字符，且同时包含三项（大写字母、小写字母、数字、()`~!@#$%^&*-+=_|{}[]:;,.?/中的特殊字符）</div>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirm_password">
      <div class="long-input"><el-input type="password" v-model="data.confirm_password"></el-input></div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop , Vue } from 'vue-property-decorator';
import { checkPwd } from '../../utils/checkPwd';

@Component
export default class resetPwd extends Vue{
  @Prop({default: 'root'}) private username!: string;
  private data = {
    password: '',
    confirm_password: ''
  }
  private FnCheckPwd = (rule, value, callback) => {
    let result = checkPwd(value);
    if (!result.flag) {
      callback(new Error(result.msg));
    }
    callback();
  }
  private FnCheckConfirmPwd = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入确认密码'));
    } else if (value !== this.data.password) {
      callback(new Error('两次密码输入不一致'));
    }
    callback();
  }
  private rules = {
    password: [{ required: true, validator: this.FnCheckPwd, trigger: 'blur' }],
    confirm_password: [{ required: true, validator: this.FnCheckConfirmPwd, trigger: 'blur' }]
  }
  private FnSubmit() {
    let flag = false;
    (this.$refs['resetForm'] as any).validate((valid) => {
      flag = valid;
    })
    return {
      flag: flag,
      password: this.data.password
    }
  }
  private FnResetForm(formName) {
    (this.$refs['resetForm'] as any).resetFields();
  }
}
</script>

<style lang="scss" scoped>
.prompt_message {
  line-height: 22px;
}
.long-input {
  width: 420px;
}
</style>