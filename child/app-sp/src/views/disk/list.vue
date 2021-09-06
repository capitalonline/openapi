<template>
  <div>
    <action-block :search_option="search_dom" @fn-search="search">
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
      @selection-change="handleSelectionChange"
      @filter-change="filterAttribute"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="customer_id" label="客户ID"></el-table-column>
      <el-table-column prop="customer_name" label="客户名称"></el-table-column>
      <el-table-column prop="disk_id" label="云盘ID"></el-table-column>
      <el-table-column prop="disk_name" label="云盘名称"></el-table-column>
      <el-table-column prop="status_name" label="云盘状态"></el-table-column>
      <el-table-column prop="type" label="类型容量">
        <template slot-scope="scope">
          <span>{{scope.row.feature ? `${scope.row.feature} / ${scope.row.size}GB` : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="az_name" label="地域及可用区"></el-table-column>
      <el-table-column prop="disk_type" label="属性" :filters="diskAttribute" column-key="disk_type">
        <template slot-scope="scope">
          <span>{{scope.row.disk_type==="data" ? `数据盘` : '系统盘'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ecs_id" label="实例名称/ID">
        <template slot-scope="scope">
          <span>{{scope.row.ecs_id ? `${scope.row.ecs_name} / ${scope.row.ecs_id}` : ''}}</span>
        </template>
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
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
      <edit-name :visible="visible" :name="mount_id[0]" @close = "close_disk" />
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
import Service from '../../https/disk/list';
import {trans} from '../../utils/transIndex'
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
  private disk_list:any=[]
  private current:number = 1;
  private size:number=20;
  private total:number = 0;
  private disk_state:any = []
  private search_dom = {
    disk_id:{placeholder:'请输入云盘ID'},
    ecs_id:{placeholder:'请输入实例ID'},
    status:{list:[],placeholder:'请选择与云盘状态'},
    customer_id:{placeholder:'请输入客户ID'},
    customer_name: {placeholder:'请输入客户名称'},
  }
  private visible:Boolean = false;
  private operate_type:string=""
  private mount_id:any = [];
  private disk_property:Array<String>=[]
  private common_operate:any = {
  delete:'逻辑删除',
  restore:'恢复',
  destroy:'销毁'
}
  private req_data:any={}
  private diskAttribute=[
    {
      text:'数据盘',
      value:'data'
    },
    {
      text:'系统盘',
      value:'system'
    },
  ]
  created() {
    this.get_disk_state();
    this.getDiskList()
  }
  //获取云盘状态列表
  private async get_disk_state(){
    let res:any = await Service.get_disk_state({})
    if(res.code==="Success"){
      this.search_dom.status.list = trans(res.data,'status_name','status','label','type') 
    }
  }
  private async getDiskList(){
    const {req_data}=this
    let res:any = await Service.get_disk_list({
      disk_id:req_data.disk_id || '',
      ecs_id:req_data.ecs_id || '',
      status:req_data.status || '',
      customer_id:req_data.customer_id || '',
      customer_name:req_data.customer_name || '',
      disk_property:this.disk_property ,
      page_index:this.current,
      page_size:this.size,
    })
    if(res.code==="Success"){
      this.disk_list = res.data.result || []
      this.total = res.data.page_info.count || 0
    }
  }
  private search(data:any={}){
    this.current = 1;
    this.req_data = data;
    this.getDiskList()
  }
  private handleSizeChange(size){
    this.size = size
    this.getDiskList()
  }
  private handleCurrentChange(cur){
    this.current = cur
    this.getDiskList()
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
    if(!this.judge_disk('status','waiting')){
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
    if(!this.judge_disk('status','running')){
      this.$message.warning('只允许对使用中的云盘进行批量操作！')
      return;
    }
    if(!this.judge_disk('disk_type','data')){
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
        this.close_disk("0")
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
    const fil:any = this.mount_id.filter(item=>item.status==="running")
    if(fil.length>0){
      this.$message.warning('只允许对待挂载的云盘进行批量操作,请先卸载使用中的云盘，再手动删除！')
      return;
    }
    const flag:boolean = this.mount_id.every((item,index,arr)=>{
      console.log("mount_id",this.mount_id)
      return item.status ==='waiting' || item.status ==='error'
    })
    if(!flag){
      this.$message.warning('只允许对待挂载或错误的云盘进行批量操作！')
      return;
    }
    if(!this.judge_disk('disk_type','data')){
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
      return item.status ==='deleted' && !item.is_follow_delete
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
      return (item.ecs_status ==="running" && item.status==="running") || item.status ==="waiting"
    })
    if(!flag){
      this.$message.warning('仅支持对实例状态为运行中且云盘状态为使用中，或云盘状态为待挂载的云盘进行批量操作！')
      return;
    }
    
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
      return obj.status==="waiting" && obj.az_id === obj.ecs_az && (obj.ecs_status==="running" || obj.ecs_status==="shutdown")
    }else if(label==="unInstall"){
      return obj.status==="using" && obj.disk_type==="data"
    }else if(label==="delete"){
      return (obj.status==="waiting" || obj.status==="error") && obj.disk_type==="data"
    }else if(label==="destroy"){
      return obj.status==="deleted" && obj.is_follow_delete===false
    }else if(label==="capacity"){
      return (obj.status==="using" && obj.ecs_status==="running") || obj.status==="waiting"
    }else if(label==="edit_attr"){
      return obj.status==="using"
    }
  }
  private close_disk(val){
    this.visible = false
    this.mount_id=[]
    this.operate_type = ''
    this.toggleSelection()
    this.current =1;
    val==="1" && this.getDiskList()
    
  }
  private handleSelectionChange(data){
    this.mount_id = data
  }
  private toggleSelection() {
    const table = this.$refs.disk_table as Table
    table.clearSelection()
  }
  private filterAttribute(obj:any){
    this.disk_property = obj["disk_type"]
    this.current = 1
    this.getDiskList()
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