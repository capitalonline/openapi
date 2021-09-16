<template>
  <div>
    <el-dialog
      title="添加至报警联系组"
      :visible.sync="visible"
      width="400px"
      :destroy-on-close="true"
      @close="back"
    >
      <div>
        <div class="search">
            <el-input v-model="searchVal" placeholder="请输入组名查询" @change="search"></el-input>
            <el-button type="primary" @click="search">查询</el-button>
        </div>
        
        <el-checkbox-group v-model="check_group" size="small">
            <el-checkbox v-for="item in group_list" :key="item.id" :label="item.id" border>{{item.name}}</el-checkbox>
        </el-checkbox-group>
        <div class="warn" v-show="warn_flag">请选择报警联系组</div>
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
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
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
  @Prop({default:()=>[]}) contact_rows!:any
  private searchVal:string='';
  private check_group:Array<String>=[]
  private group_list:any=[]
  private warn_flag:Boolean=false
  created() {
    this.getContactGroupList()
  }
  private search(e){
      console.log("search",e)
  }
  private async getContactGroupList(){
    let res:any = await Service.get_contact_group_list({})
    if(res.code===0){
        this.group_list = res.data.datas
    }
  }
  private async confirm(){
      if(this.check_group.length===0){
          this.warn_flag=true;
          return;
      }
      console.log('###',{contactIDs:this.contact_rows.map(item=>item.id),
        contactGroupIDs:this.check_group})
      let res:any = await Service.add_contact_to_group({
        contactIDs:this.contact_rows.map(item=>item.id),
        contactGroupIDs:this.check_group
      })
      if(res.code===0){
        this.$message.success("添加联系人至联系人组任务下发成功！")
        this.back('1')
      }else{
        this.back('0')
      }
  }
  @Watch("check_group")
  private getWarn(newVal,oldVal){
      console.log("getWarn",newVal,oldVal)
      if(newVal.length>0){
          this.warn_flag=false;
      }else if(newVal.length===0){
          this.warn_flag=true;
      }
  }
  @Emit("close")
  private back(val){
    
  }
  
}
</script>
<style lang="scss" scoped>
label.el-checkbox.el-checkbox--small.is-bordered{
    display: block;
    margin: 0;
    margin-top: 20px;
    width: 87px;
}
.foot-btn{
    width:100%;
    text-align: right;
    .el-button:first-child{
        margin-right: 10px;
    }
}
.warn{
    color: #F56C6C;
    font-size: 12px;
    margin-top: 4px;
}
.search{
    display: flex;
    .el-button--primary{
        margin-left: 10px;
    }
}
</style>