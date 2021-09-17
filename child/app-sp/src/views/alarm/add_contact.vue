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
        </el-form>
        <el-divider />
        <div class="foot-btn">
            <el-button type="primary" @click="confirm">确定</el-button>
            <el-button type="default" @click="back('0')">取消</el-button>
        </div>
        
      </div>
      
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
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

  }
  created() {
    if(this.id!==""){
      this.get_contact_detail()
    }
  }
  // @Watch("id")
  // private watch_id(newVal){
    
  // }
  private async get_contact_detail(){
    let res:any = await Service.get_contact_detail({
        id:this.id,
      })
      if(res.code==='Success'){
        const {name,email,phone}=res.data
          this.form_data={
            name,
            email,
            phone
          }
      }else{
        
      }
  }
  private confirm(){
      const form = this.$refs.form as Form
      form.validate(async (valid:boolean)=>{
          if(valid){
            if(this.id===""){
              let res:any = await Service.add_contact({
                ...this.form_data
              })
              if(res.code==='Success'){
                this.$message.success("新建联系人任务下发成功")
                this.back('1')
              }else{
                this.back('0')
              }
            }else{
              let res:any = await Service.update_contact({
                ...this.form_data,
                id:this.id
              })
              if(res.code==='Success'){
                this.$message.success("编辑联系人任务下发成功")
                this.back('1')
              }else{
                this.back('0')
              }
            }
            
            
          }
      })
  }
  @Emit("close")
  private back(val){
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