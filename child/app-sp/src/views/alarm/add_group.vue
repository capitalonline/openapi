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
                label="组名"
                :rules="[{required:true,message:'请输入组名',trigger:'blur'}]"
            >
                <el-input v-model="form_data.name" />
            </el-form-item>
            <el-form-item
                prop="contact"
                label="选择联系人"
                :rules="[{required:true,message:'请选择联系人',trigger:'blur'}]"
            >
                <el-transfer
                    filterable
                    :titles="['联系人','已选择']"
                    :filter-method="filterMethod"
                    filter-placeholder="请输入搜索内容"
                    v-model="form_data.contact"
                    :data="contact_list"
                >
                </el-transfer>
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
      contact:[]

  }
  private contact_list:any=[
      {key:'zhangsan',label:'张三'},
      {key:'lisi',label:'李四'},
      {key:'wanger',label:'王二'},
      {key:'zhaowu',label:'赵五'},
  ]
  created() {
  }
  private filterMethod(){
      return this.contact_list
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