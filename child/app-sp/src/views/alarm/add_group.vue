<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="800px"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="back"
    >
      <div class="add-group">
        <el-form :model="form_data" ref="form" label-width="100px" class="demo-dynamic">
            <el-form-item
                prop="name"
                label="组名"
                :rules="[
                  {required:true,message:'请输入组名',trigger:'blur'},
                  { pattern:/^[\u4e00-\u9fa5_a-zA-Z0-9-_:()\u002E]{2,60}$/,message:'名称长度应为2-60个字符',trigger:'blur' }
                ]"
            >
                <el-input v-model="form_data.name" minlength=2 maxlength=60 placeholder="2-60个字符" show-word-limit />
                <div class="prompt_message">可包含大小写字母,中文,数字,点号,下划线,半角冒号,连字符,英文括号</div>
            </el-form-item>
            <el-form-item
                prop="contact"
                label="选择联系人"
            >
              <div class="transfer">
                <el-transfer
                    filterable
                    :titles="['联系人','已选择']"
                    :filter-method="filterMethod"
                    filter-placeholder="请输入搜索内容"
                    v-model="form_data.contact"
                    :data="contact_list"
                >
                <span slot-scope="{ option }">
                  <el-tooltip 
                      placement="right" 
                      popper-class="tooltip-width"
                      :content="option.label"
                      effect="light">
                      <div class="tool-tip">{{option.label}}</div>
                  </el-tooltip>
                </span>
                </el-transfer>
              </div>
                
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
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import Service from '../../https/alarm/list'
import {trans} from '../../utils/transIndex'
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
  private contact_list:any=[]
  
  created() {
    this.getContactList('')
    if(this.id!==""){
      this.get_contact_group_detail()
    }
  }
  private async getContactList(name){
    let res:any = await Service.get_contact_list({
      page:1,
      pageSize:100,
      name
    })
    if(res.code==='Success'){
        this.contact_list = trans(res.data.datas,"name",'id','label','key')
    }
  }
  private async get_contact_group_detail(){
    let res:any=await Service.get_contact_group_detail({
      id:this.id
    })
    if(res.code==='Success'){
      const {name,members}=res.data
      this.form_data={
        name,
        contact:members.map(item=>item.id)
      }
    }
  }
  private filterMethod(query, item) {
      // this.getContactList(query)
      return item.label.indexOf(query) > -1;
    }
  private confirm(){
      const form = this.$refs.form as Form
      form.validate(async(valid:boolean)=>{
          if(valid){
            if(this.id===""){
                let res:any = await Service.add_contact_group({
                  name:this.form_data.name,
                  contactIDs:this.form_data.contact
              })
              if(res.code==='Success'){
                this.$message.success("新建联系人组任务下发成功！")
                this.back('1')
              }else{
                this.back('0')
              }
            }else{
              let res:any = await Service.update_contact_group({
                  id:this.id,
                  name:this.form_data.name,
                  contactIDs:this.form_data.contact
              })
              if(res.code==='Success'){
                this.$message.success("编辑联系人组任务下发成功！")
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
.tool-tip{
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


</style>
