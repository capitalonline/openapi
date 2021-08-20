<template>
  <div>
    <action-block :search_option="search" @fn-search="getDiskList">
      <template #default>
        <el-button type="primary" @click="create">创建云盘</el-button>
        <el-button type="primary" @click="mount">挂载</el-button>
        <el-button type="primary" @click="unInstall">卸载</el-button>
        <el-button type="primary" @click="del_disk">逻辑删除</el-button>
        <el-button type="primary" @click="restore('restore')">恢复</el-button>
        <el-button type="primary" @click="restore('destroy')">销毁</el-button>
        <el-button type="primary" @click="capacity">扩容</el-button>
      </template>
    </action-block>
    <el-table
      :data="disk_list"
      border
      ref="disk_table"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="customer_id" label="客户ID"></el-table-column>
      <el-table-column prop="customer_name" label="客户名称"></el-table-column>
      <el-table-column prop="disk_id" label="云盘ID"></el-table-column>
      <el-table-column prop="disk_name" label="云盘名称"></el-table-column>
      <el-table-column prop="status" label="云盘状态"></el-table-column>
      <el-table-column prop="type" label="类型容量">
        <template slot-scope="scope">
          <span>{{scope.row.feature ? `${scope.row.feature}${scope.row.size}` : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="az_name" label="地域及可用区"></el-table-column>
      <el-table-column prop="disk_type" label="属性" :filters="diskAttribute" :filter-method="filterAttribute"></el-table-column>
      <el-table-column prop="ecs_id" label="实例名称/ID">
        <template slot-scope="scope">
          <span>{{scope.row.ecs_id ? `${scope.row.ecs_id} / ${scope.row.size}` : ''}}</span>
        </template>ecs_id
      </el-table-column>
      <el-table-column label="操作栏">
        <template slot-scope="scope">
          <el-button type="text" @click="operateRecord(scope.row)">操作记录</el-button>
          <el-dropdown @command="handleOperate">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{label:'mount',value:scope.row}" :disabled="!limit_disk_operate('mount',scope.row)">挂载</el-dropdown-item>
              <el-dropdown-item :command="{label:'unInstall',value:scope.row}" :disabled="!limit_disk_operate('unInstall',scope.row)">卸载</el-dropdown-item>
              <el-dropdown-item :command="{label:'delete',value:scope.row}" :disabled="!limit_disk_operate('delete',scope.row)">逻辑删除</el-dropdown-item>
              <el-dropdown-item :command="{label:'destroy',value:scope.row}" :disabled="!limit_disk_operate('destroy',scope.row)">销毁</el-dropdown-item>
              <el-dropdown-item :command="{label:'capacity',value:scope.row}" :disabled="!limit_disk_operate('capacity',scope.row)">扩容</el-dropdown-item>
              <el-dropdown-item :command="{label:'edit_attr',value:scope.row}" :disabled="!limit_disk_operate('edit_attr',scope.row)">编辑属性</el-dropdown-item>
              <el-dropdown-item :command="{label:'edit_name',value:scope.row}">修改云盘名称</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <template v-if="visible && operate_type==='record'">
      <Record :visible="visible" :record_id="mount_id[0].disk_id" @close = "close_disk" />
    </template>
    <template v-if="visible && operate_type==='mount'">
      <mount-disk :visible="visible" :mount_id="mount_id" @close = "close_disk" />
    </template>
    <template v-if="visible && operate_type==='unInstall'">
      <UnInstall :visible="visible" :mount_id="mount_id" @close = "close_disk" />
    </template>
    <template v-if="visible && operate_type==='edit_attr'">
      <edit-attr :visible="visible" :attr="mount_id[0]" @close = "close_disk" />
    </template>
    <template v-if="visible && operate_type==='edit_name'">
      <edit-name :visible="visible" :name="mount_id[0].disk_name" @close = "close_disk" />
    </template>
    <template v-if="visible && (operate_type==='delete' || operate_type==='restore' || operate_type==='destroy')">
      <Common :visible="visible" :mount_id="mount_id" :title="common_operate[operate_type]" @close = "close_disk" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/actionBlock.vue'
import Record from '../instance/record.vue';
import MountDisk from './mountDisk.vue';
import UnInstall from './unInstall.vue';
import EditAttr from './editAttr.vue';
import EditName from './editName.vue';
import Common from './commonDialog.vue'
import {Table} from 'element-ui'

@Component({
  components:{
    ActionBlock,
    Record,
    MountDisk,
    UnInstall,
    EditAttr,
    EditName,
    Common
  }
})
export default class extends Vue {
  $message;
  $router;
  private state_list:any=[

  ]
  private disk_list:any=[
    {
      "customer_id": "E25875",                                                
      "customer_name": "张三",                                                 
      "disk_id": "d-bp153va98b325ghj",                                        
      "disk_name": "ssd-20210626",                                            
      "status": "使用中",                                                      
      "feature": "高性能型（SSD）",                                             
      "size": "100",                                                          
      "az_name": "可用区A",                                                 
      "az_id": "254",                                                         
      "disk_type": "数据盘",                                                   
      "ecs_id": "i-abcr50fvgj", 
      "ecs_status": "运行中",
      "is_follow_delete":'1',
      "ecs_az_name":'可用区A'                             
    },
    {
      "customer_id": "E25875",                                                
      "customer_name": "张三",                                                 
      "disk_id": "d-bp153va98b325ghj",                                        
      "disk_name": "ssd-20210626",                                            
      "status": "已删除",                                                      
      "feature": "高性能型（SSD）",                                             
      "size": "100",                                                           
      "az_name": "可用区A",                                                 
      "az_id": "254",                                                         
      "disk_type": "数据盘",                                                   
      "ecs_id": "i-abcr50fvgj", 
      "ecs_status": "运行中", 
      "is_follow_delete":'0',
      "ecs_az_name":'可用区A'                                           
    },
    {
      "customer_id": "E25875",                                                
      "customer_name": "张三",                                                 
      "disk_id": "d-bp153va98b325ghi",                                        
      "disk_name": "ssd-20210626",                                            
      "status": "已删除",                                                      
      "feature": "高性能型（SSD）",                                             
      "size": "100",                                                           
      "az_name": "可用区B",                                                 
      "az_id": "254",                                                         
      "disk_type": "数据盘",                                                   
      "ecs_id": "i-abcr50fvgj", 
      "ecs_status": "运行中", 
      "is_follow_delete":'0' ,
      "ecs_az_name":'可用区A'                                                
    },
    {
      "customer_id": "E25875",                                                
      "customer_name": "张三",                                                 
      "disk_id": "d-bp153va98b325ghj",                                        
      "disk_name": "ssd-20210626",                                            
      "status": "错误",                                                      
      "feature": "高性能型（SSD）",                                             
      "size": "100",                                                           
      "az_name": "可用区A",                                                 
      "az_id": "254",                                                         
      "disk_type": "数据盘",                                                   
      "ecs_id": "i-abcr50fvgj",
      "ecs_status": "运行中", 
      "is_follow_delete":'0' ,
      "ecs_az_name":'可用区A'                                                  
    },
  ]
  private loading = false
  private search = {
    disk_id:{placeholder:'请输入云盘ID'},
    ecs_id:{placeholder:'请输入实例ID'},
    status:{list:this.state_list,placeholder:'请选择与云盘状态'},
    customer_id:{placeholder:'请输入客户ID'},
    customer_name: {placeholder:'请输入客户名称'},
  }
  private visible:Boolean = false;
  private operate_type:string=""
  private mount_id:any = [];
  private common_operate:any = {
  delete:'逻辑删除',
  restore:'恢复',
  destroy:'销毁'
}
  private diskAttribute=[
    {
      text:'数据盘',
      value:'data_disk'
    },
    {
      text:'系统盘',
      value:'system_disk'
    },
  ]
  private async getDiskList(){
    let res:any=await({

    })
  }
  private handleOperate(obj){
    console.log("$event",obj)
    this.mount_id=[obj.value]
    this.operate_type =obj.label 
    if(obj.label==="mount"){
      this.mount()
    }else if(obj.label==="unInstall"){
      this.unInstall()
    }else if(obj.label==="delete"){
      this.del_disk()
    }else if(obj.label==="destroy"){
      this.restore('destroy')
    }else if(obj.label==="capacity"){
      this.capacity()
    }else if(obj.label==="edit_attr"){
      this.visible = true
    }else if(obj.label==="edit_name"){
      this.visible = true
    }
  }
  private create(){
    this.$router.push('/disk/create')
  }
  private operateRecord(obj:any){
    this.mount_id=[obj]
    this.visible=true
    this.operate_type = "record"
  }
  //挂载云盘---缺少判断条件
  private mount(){
    if(this.mount_id.length===0){
      this.$message.warning('请选择要操作的云盘！')
      return;
    }
    if(!this.judge_disk('customer_id',this.mount_id[0].customer_id)){
      this.$message.warning('只允许对同一客户的云盘进行批量操作！')
      return;
    }
    if(!this.judge_disk('status','待挂载')){
      this.$message.warning('只允许对待挂载的云盘进行批量操作！')
      return;
    }
    if(!this.judge_disk('az_name',this.mount_id[0].az_name)){
      this.$message.warning('只允许对同一可用区的云盘进行批量操作！')
      return;
    }
    this.operate_type="mount"
    this.visible=true
  }
  //卸载云盘
  private unInstall(){
    if(this.mount_id.length===0){
      this.$message.warning('请选择要操作的云盘！')
      return;
    }
    if(!this.judge_disk('customer_id',this.mount_id[0].customer_id)){
      this.$message.warning('只允许对同一客户的云盘进行批量操作！')
      return;
    }
    if(!this.judge_disk('status','使用中')){
      this.$message.warning('只允许对使用中的云盘进行批量操作！')
      return;
    }
    if(!this.judge_disk('disk_type','数据盘')){
      this.$message.warning('只允许对数据盘进行批量操作！')
      return;
    }
    this.$confirm('文件索引是否已被删除，建议最好删除后再进行卸载。是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.operate_type="unInstall"
      this.visible=true
    }).catch(() => {
        this.close_disk()
    });
  }
  //逻辑删除云盘
  private del_disk(){
    if(this.mount_id.length===0){
      this.$message.warning('请选择要操作的云盘！')
      return;
    }
    if(!this.judge_disk('customer_id',this.mount_id[0].customer_id)){
      this.$message.warning('只允许对同一客户的云盘进行批量操作！')
      return;
    }
    const fil:any = this.mount_id.filter(item=>item.status==="使用中")
    if(fil.length>0){
      this.$message.warning('只允许对待挂载的云盘进行批量操作,请先卸载使用中的云盘，再手动删除！')
      return;
    }
    const flag:boolean = this.mount_id.every((item,index,arr)=>{
      console.log("mount_id",this.mount_id)
      return item.status ==='待挂载' || item.status ==='错误'
    })
    console.log("flag",flag)
    if(!flag){
      this.$message.warning('只允许对待挂载或错误的云盘进行批量操作！')
      return;
    }
    if(!this.judge_disk('disk_type','数据盘')){
      this.$message.warning('只允许对数据盘进行批量操作！')
      return;
    }
    this.operate_type="delete"
    this.visible = true
  }
  //恢复或销毁云盘
  private restore(str:string){
    if(this.mount_id.length===0){
      this.$message.warning('请选择要操作的云盘！')
      return;
    }
    if(!this.judge_disk('customer_id',this.mount_id[0].customer_id)){
      this.$message.warning('只允许对同一客户的云盘进行批量操作！')
      return;
    }
    const flag:boolean = this.mount_id.every((item,index,arr)=>{
      return item.status ==='已删除' && item.is_follow_delete ==='0'
    })
    if(!flag){
      this.$message.warning('只允许对已删除且不随实例删除的云盘进行批量操作！')
      return;
    }
    this.operate_type=str
    this.visible = true
  }
  //扩容
  private capacity(){
    if(this.mount_id.length===0){
      this.$message.warning('请选择要操作的云盘！')
      return;
    }
    if(!this.judge_disk('customer_id',this.mount_id[0].customer_id)){
      this.$message.warning('只允许对同一客户的云盘进行批量操作！')
      return;
    }
    if(!this.judge_disk('az_name',this.mount_id[0].az_name)){
      this.$message.warning('只允许对同一可用区的云盘进行批量操作！')
      return;
    }
    const flag:boolean = this.mount_id.every((item,index,arr)=>{
      return (item.ecs_status ==="运行中" && item.status==="使用中") || item.status ==="待挂载"
    })
    if(!flag){
      this.$message.warning('仅支持对实例状态为运行中且云盘状态为使用中，或云盘状态为待挂载的云盘进行批量操作！')
      return;
    }
    // if(!(this.judge_disk("ecs_status","运行中") && this.judge_disk("status","使用中")) && !this.judge_disk('status','待挂载')){
    //   this.$message.warning('仅支持对实例状态为运行中且云盘状态为使用中，或云盘状态为待挂载的云盘进行批量操作！')
    //   return;
    // }
    
    this.$router.push({
      path:'/disk/capacity',
      query:{
        list:JSON.stringify(this.mount_id) 
      }
    })
  }
  //判断已选择云盘是否符合操作要求
  private judge_disk(label:string,val:any){
    return this.mount_id.every((item,index,arr)=>{
      return item[label] ===val
    })
  }
  //限制云盘操作
  private limit_disk_operate(label:string,obj:any){
    if(label==="mount"){
      return obj.status==="待挂载" && obj.az_name === obj.ecs_az_name && (obj.ecs_status==="运行中" || obj.ecs_status==="已关机")
    }else if(label==="unInstall"){
      return obj.status==="使用中" && obj.disk_type==="数据盘"
    }else if(label==="delete"){
      return (obj.status==="待挂载" || obj.status==="错误") && obj.disk_type==="数据盘"
    }else if(label==="destroy"){
      return obj.status==="已删除" && obj.is_follow_delete==="0"
    }else if(label==="capacity"){
      return (obj.status==="使用中" && obj.ecs_status==="运行中") || obj.status==="待挂载"
    }else if(label==="edit_attr"){
      return obj.status==="挂载中"
    }
  }
  private close_disk(){
    this.visible = false
    this.mount_id=[]
    this.operate_type = ''
    this.toggleSelection()
    
  }
  private handleSelectionChange(data){
    this.mount_id = data
  }
  private toggleSelection() {
    const table = this.$refs.disk_table as Table
    table.clearSelection()
  }
  private filterAttribute(value:String){

  }
  created() {
    
  }
}
</script>
<style lang="scss" scoped>
.el-dropdown {
    font-size: 12px !important;
    margin-left: 10px !important;
    color: #455cc6 !important;
}
</style>