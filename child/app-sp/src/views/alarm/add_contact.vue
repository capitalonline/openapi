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
                prop="phone"
                label="电话号码"
                :rules="[{required:true,message:'请输入电话号码',trigger:'blur'}]"
            >
                <el-input v-model="form_data.phone" />
            </el-form-item>
            <el-form-item
                prop="wxOpenID"
                label="微信号"
                :rules="[{required:true,message:'请输入微信号',trigger:'blur'}]"
            >
                <el-input v-model="form_data.wxOpenID" />
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
import ActionBlock from '../../components/search/actionBlock.vue';
import { Form } from "element-ui";
import moment from 'moment';
import Service from '../../https/alarm/list'
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
      phone:'',
      wxOpenID:''

  }
  created() {
  }
  private confirm(){
      const form = this.$refs.form as Form
      form.validate(async (valid:boolean)=>{
          if(valid){
            let res:any = await Service.add_contact({
              ...this.form_data
            })
            if(res.code===0){
              this.$message.success("新建成功")
            }
            this.back()
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