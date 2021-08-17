<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="40%"
      :destroy-on-close="true"
      @close="back"
    >
      <div>
        <el-form :model="form_data" ref="form" label-width="100px" class="demo-dynamic">
            <el-form-item
                prop="name"
                label="姓名"
                :rules="[{required:true,message:'请输入姓名',trigger:'blur'}]"
            >
                <el-input v-model="form_data.name" />
            </el-form-item>
            <el-form-item
                prop="email"
                label="邮箱"
                :rules="[{required:true,message:'请输入邮箱',trigger:'blur'}]"
            >
                <el-input v-model="form_data.email" />
            </el-form-item>
            <el-form-item
                prop="tell"
                label="电话号码"
                :rules="[{required:true,message:'请输入电话号码',trigger:'blur'}]"
            >
                <el-input v-model="form_data.tell" />
            </el-form-item>
            <el-form-item
                prop="wechat"
                label="微信号"
                :rules="[{required:true,message:'请输入微信号',trigger:'blur'}]"
            >
                <el-input v-model="form_data.wechat" />
            </el-form-item>
        </el-form>
        <el-divider />
        <div class="foot-btn">
            <el-button type="primary" @click="confirm">确定</el-button>
            <el-button type="default" @click="back">取消</el-button>
        </div>
        
      </div>
      
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/actionBlock.vue';
import { Form } from "element-ui";
import moment from 'moment';

@Component({
  components:{
    ActionBlock
  }
})
export default class InsDetail extends Vue{
  $message;
  @Prop(Boolean) visible!:Boolean;
  @Prop(String) id:String;
  @Prop(String) title:String

  private form_data:any={
      name:'',
      email:'',
      tell:'',
      wechat:''

  }
  created() {
  }
  private confirm(){
      const form = this.$refs.form as Form
      form.validate((valid:boolean)=>{
          if(valid){

          }
      })
  }
  @Emit("close")
  private back(){
    const form = this.$refs.form as Form
    form.resetFields()
  }
  
}
</script>
<style lang="scss" scoped>
.foot-btn{
    width:100%;
    text-align: right;
    .el-button:first-child{
        margin-right: 10px;
    }
}
</style>