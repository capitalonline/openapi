<template>
  <div>
    <action-block :search_option="search_dom" @fn-search="search">
      <template #default>
        <el-button v-for="item in operateBtns" :key="item.value" type="primary" @click="handleBtn(item.value)" :disabled="!auth_list.includes(item.value)">{{item.label}}</el-button>
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
      <el-table-column prop="disk_name" label="云盘名称">
        <template slot-scope="scope">
          <pre>{{scope.row.disk_name}}</pre>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="云盘状态">
        <template slot-scope="scope">
          <span :class="scope.row.status">{{scope.row.status_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型容量">
        <template slot-scope="scope">
          <div>类型：{{scope.row.feature ? `${scope.row.feature}` : ''}}</div>
          <div>容量：{{scope.row.size ? `${scope.row.size}GB` : ''}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="az_name" label="地域及可用区">
          <template slot-scope="scope">
            <span>{{scope.row.region_name}}&nbsp;&nbsp;{{scope.row.az_name}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="disk_type" label="属性" :filter-multiple="false" :filters="diskAttribute" column-key="disk_property">
        <template slot-scope="scope">
          <span>{{scope.row.disk_type==="data" ? `数据盘` : '系统盘'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ecs_id" label="实例名称/ID">
        <template slot-scope="scope">
          <pre>{{scope.row.ecs_id ? `${scope.row.ecs_name} / ${scope.row.ecs_id}` : ''}}</pre>
        </template>
      </el-table-column>
      <el-table-column prop="is_follow_delete" label="删除设置">
        <template slot-scope="scope">
          <span>{{scope.row.ecs_id==="" ? '-' : scope.row.is_follow_delete ? '随实例删除' :'不随实例删除'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="fee_way" label="计费方式" :filter-multiple="false" :filters="fee_way_fil" column-key="fee_way">
        <template slot-scope="scope">
          <span>{{!scope.row.billing_method_display ? '不计费' : scope.row.billing_method_display}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="op_source" label="创建来源" :filter-multiple="false" :filters="op_source_fil" column-key="op_source">
        <template slot-scope="scope">
          <span>{{scope.row.op_source==="gic" ? 'GIC' : '运维后台'}}</span>
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
              <el-dropdown-item v-for="item in operateBtns.slice(1)" :key="item.value" :command="{label:item.value,value:scope.row}" :disabled="!limit_disk_operate(item.value,scope.row)">{{item.label}}</el-dropdown-item>
              <el-dropdown-item :command="{label:'edit_attr',value:scope.row}" :disabled="!limit_disk_operate('edit_attr',scope.row)">编辑属性</el-dropdown-item>
              <el-dropdown-item :command="{label:'edit_name',value:scope.row}" :disabled="!limit_disk_operate('edit_name',scope.row)">修改云盘名称</el-dropdown-item>
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
      <Record :visible="visible" :record_id="mount_id[0].disk_id" @close = "close_disk" :type="'ebs'" />
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
    <template v-if="visible && (operate_type==='delete' || operate_type==='restore' || operate_type==='destroy' || operate_type==='open_bill')">
      <Common :visible="visible" :mount_id="mount_id" :title="common_operate[operate_type]" @close = "close_disk" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import ConfirmBox from '../../components/confirmBox.vue'
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
    Common,
    ConfirmBox
  }
})
export default class extends Vue {
  $message;
  $router;
  $store;
  $route
  private disk_list:any=[]
  private current:number = 1;
  private size:number=20;
  private total:number = 0;
  private disk_state:any = [];
  private auth_list:any=[]
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
  private filter_obj = null
  private clear = null

  private common_operate:any = {
    delete:'逻辑删除',
    restore:'恢复',
    destroy:'销毁',
    open_bill:'开启计费'
  }
 
  private operateBtns=[
    {
      label:'创建云盘',
      value:'disk_create'
    },
    {
      label:'挂载',
      value:'mount'
    },
    {
      label:'卸载',
      value:'unInstall'
    },
    {
      label:'逻辑删除',
      value:'delete'
    },
    {
      label:'恢复',
      value:'restore'
    },
    {
      label:'销毁',
      value:'destroy'
    },
    {
      label:'扩容',
      value:'disk_capacity'
    },
    {
      label:'开启计费',
      value:'open_bill'
    },
  ]
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
  private op_source_fil=[
    {
      text:'运维后台',
      value:'cloud_op'
    },
    {
      text:'GIC',
      value:'gic'
    },
  ]
  private fee_way_fil=[
    {
      text:'按量计费',
      value:'0'
    },
    {
      text:'不计费',
      value:'no'
    },
  ]
  created() {
    this.get_disk_state();
    this.search()
    this.auth_list=this.$store.state.auth_info[this.$route.name]
  }

  private beforeDestroy() {
    this.FnClearTimer()
  }
  @Watch("$store.state.pod_id")
  private watch_pod(nv){
    if(!nv){
      return;
    }
    this.search(this.req_data)
  }
  @Watch("visible")
  private watch_visble(nv,ov){
    if(!nv){
      this.close_disk()
    }
  }
  //获取云盘状态列表
  private async get_disk_state(){
    let res:any = await Service.get_disk_state({})
    if(res.code==="Success"){
      this.search_dom.status.list = trans(res.data,'status_name','status','label','type') 
    }
  }
  private async getDiskList(loading:boolean = true){
    let copy_mount_id=[]
    if(!loading){
      this.$store.commit('SET_LOADING', false);
      copy_mount_id =this.mount_id.map(item=>{
        return item.disk_id
      })
    }
    const {req_data}=this
    let res:any = await Service.get_disk_list({
      pod_id:this.$store.state.pod_id,
      disk_id:req_data.disk_id || '',
      ecs_id:req_data.ecs_id || '',
      status:req_data.status || '',
      customer_id:req_data.customer_id || '',
      customer_name:req_data.customer_name || '',
      disk_property:req_data.disk_property ? req_data.disk_property[0] : '',
      op_source:req_data.op_source ? req_data.op_source[0] : '',
      billing_method:req_data.fee_way ? req_data.fee_way[0] : 'all',
      page_index:this.current,
      page_size:this.size,
    })
    if(res.code==="Success"){
      this.disk_list = res.data.result || []
      this.total = res.data.page_info.count || 0;
      let list = res.data.result.filter(item=>copy_mount_id.includes(item.disk_id))
      if(list.length>0){
        this.$nextTick(()=>{
          list.forEach(row => {
            (this.$refs.disk_table as any).toggleRowSelection(row);
          });
        });
        
      } 
    }
    this.FnSetTimer()
  }
  private FnSetTimer() {
    if(this.clear){
      this.FnClearTimer();
    }
    this.clear = setTimeout(() => {
      this.getDiskList(false)
    }, 1000 *5)
  }
  private FnClearTimer() {
    if(this.clear){
      clearTimeout(this.clear)
    }
  }
  private search(data:any={}){
    this.FnClearTimer()
    this.current = 1;
    this.req_data = {...data,...this.filter_obj};
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
  private handleBtn(val){
    if(val==="disk_create"){
      this[val]()
    }else{
      if(this.mount_id.length===0){
        this.$message.warning('请选择要操作的云盘！')
        return;
      }
      if(!this.judge_disk('customer_id',this.mount_id[0].customer_id)){
        this.$message.warning('只允许对同一客户的云盘进行批量操作！')
        return;
      }
      if(val==="restore" || val==="destroy"){
        this.restore(val)
      }else{
        this[val]()
      }
    }
    
  }
  private handleOperate(obj){
    this.FnClearTimer();
    this.mount_id=[obj.value]
    this.operate_type =obj.label 
    if(obj.label==="restore" || obj.label==="destroy"){
      this.restore(obj.label)
    }else if(obj.label==="edit_attr" || obj.label==="edit_name"){
      this.visible = true
    }else{
      this[obj.label]()
    }
  }
  private disk_create(){
    this.$router.push('/disk/create')
  }
  private operateRecord(obj:any){
    this.FnClearTimer();
    this.mount_id=[obj]
    this.visible=true
    this.operate_type = "record"
  }
  //挂载云盘
  private mount(){
    if(!this.judge_disk('status','waiting')){
      this.$message.warning('只允许对待挂载的云盘进行批量操作！')
      return;
    }
    if(!this.judge_disk('az_name',this.mount_id[0].az_name)){
      this.$message.warning('只允许对同一可用区的云盘进行批量操作！')
      return;
    }
    if(!this.judge_disk('is_charge',this.mount_id[0].is_charge)){
      this.$message.warning('只允许对同一计费状态的云盘进行批量操作！')
      return;
    }
    this.FnClearTimer();
    this.operate_type="mount"
    this.visible=true
  }
  //卸载云盘
  private unInstall(){
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
      this.FnClearTimer();
      this.operate_type="unInstall"
      this.visible=true
    }).catch(() => {
        this.close_disk()
    });
  }
  //逻辑删除云盘
  private delete(){
    const fil:any = this.mount_id.filter(item=>item.status==="running")
    if(fil.length>0){
      this.$message.warning('只允许对待挂载的云盘进行批量操作,请先卸载使用中的云盘，再手动删除！')
      return;
    }
    const flag:boolean = this.mount_id.every((item,index,arr)=>{
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
    this.FnClearTimer();
    this.operate_type="delete"
    this.visible = true
  }
  //恢复或销毁云盘
  private restore(str:string){
    const flag:boolean = this.mount_id.every((item,index,arr)=>{
      return item.status ==='deleted' && !item.is_follow_delete
    })
    const fail_state:boolean = this.mount_id.every((item,index,arr)=>{
      return (item.status ==='deleted' && !item.is_follow_delete) || item.status ==='build_fail'
    })
    if(str==="restore"){
      if(!flag){
        this.$message.warning('只允许对已删除且不随实例删除的云盘进行批量操作！')
        return;
      }
    }else{
      if(!fail_state){
        this.$message.warning('只允许对已删除且不随实例删除或创建失败的云盘进行批量操作！')
        return;
      }
    }
    
    this.FnClearTimer();
    this.operate_type=str
    this.visible = true
  }
  //扩容
  private disk_capacity(){
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
  private open_bill(){
    if(this.mount_id.length===1 && this.mount_id[0].status==="running"){
      this.$message.warning('使用中的云盘不支持单独开启计费，请前往云服务器列表页进行操作');
      return;
    }
    if(!this.judge_disk('status','waiting')){
      this.$message.warning('只允许对待挂载的云盘进行批量操作！')
      return;
    }
    this.FnClearTimer();
    this.operate_type="open_bill"
    this.visible = true
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
      return obj.status==="waiting" && this.auth_list.includes(label)
    }else if(label==="unInstall"){
      return obj.status==="running" && obj.disk_type==="data" && this.auth_list.includes(label)
    }else if(label==="delete"){
      return (obj.status==="waiting" || obj.status==="error") && obj.disk_type==="data" && this.auth_list.includes(label)
    }else if(label==="restore"){
      return obj.status==="deleted" && obj.is_follow_delete===false && this.auth_list.includes(label)
    }else if(label==="destroy"){
      return ((obj.status==="deleted" && obj.is_follow_delete===false) || obj.status ==='build_fail') && this.auth_list.includes(label)
    }else if(label==="disk_capacity"){
      return (obj.status==="running" && obj.ecs_status==="running") || obj.status==="waiting" && this.auth_list.includes('disk_capacity')
    }else if(label==="edit_attr"){
      return obj.status==="running" && obj.disk_type==="data" && this.auth_list.includes(label)
    }else if(label==="edit_name"){
      return (obj.status==="running" || obj.status==="waiting" || obj.status==="deleted") && this.auth_list.includes(label)
    }else if(label==="open_bill"){
      return obj.status==="waiting" && obj.is_charge===0 && this.auth_list.includes(label)
    }
  }
  private close_disk(){
    this.visible = false
    this.mount_id=[]
    this.operate_type = ''
    this.toggleSelection()
    this.current =1;
    this.getDiskList()
    
  }
  private handleSelectionChange(data){
    this.mount_id = data
    
  }
  private toggleSelection() {
    const table = this.$refs.disk_table as Table
    table.clearSelection()
  }
  private filterAttribute(obj:any){
    this.filter_obj = {...this.filter_obj,...obj}
    this.search(this.req_data)
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