<template>
  <div>
    <div class="search-box" >
      <el-input prefix-icon="el-icon-search"></el-input>
    <div class="icon m-bottom10">
      <el-dropdown @command="handleOperate">
        <el-button type="text"><i class="iconfont icon-more" style="font-weight: bold;margin-right: 5px;font-size: 18px"></i></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in rows_operate_btns" :command="{label:item.value}" :key="item.value" >{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tooltip content="自定义列表项" placement="bottom" effect="light">
        <el-button type="text" @click="FnCustom"><i class="el-icon-s-tools" ></i></el-button>
      </el-tooltip>
      <el-tooltip content="刷新" placement="bottom" effect="light">
        <el-button type="text" @click="refresh" ><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
      </el-tooltip>
    </div>
    </div>
    <el-table
      :data="list"
      border
      ref="table"
      :row-class-name="rowStyle"
      @row-contextmenu="FnRightClick"
      @row-click="FnOperRow"
      @selection-change="handleSelectionChange"
      @sort-change="FnSortChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column
        v-for="(item) in custom_host"
        :filter-multiple="item.column_key ? false : null"
        :key="item.prop"
        :prop="item.prop"
        :column-key="item.column_key ? item.column_key : null"
        :filters="item.column_key ? item.list : null"
        :sortable="item.sortable ? item.sortable : null"
        :width="item.width ? item.width : null"
        :type="item.type"
        :label="item.label"
        :show-overflow-tooltip='item.overflow'
        :min-width="item.minWidth"
      >
        <template #default="scope" v-if="item.prop==='cpu_rate'">
          <el-progress :stroke-width="14" color="#455cc6" :percentage="scope.row.cpu_rate* 100"></el-progress>
        </template>
        <template #default="scope" v-else-if="item.prop==='ram_rate'">
          <el-progress :stroke-width="14" color="#455cc6" :percentage="scope.row.ram_rate* 100"></el-progress>
        </template>
        <template #default="scope" v-else-if="item.prop==='gpu_rate'">
          <el-progress :stroke-width="14" color="#455cc6" :percentage="scope.row.gpu_rate* 100"></el-progress>
        </template>
        <template #default="scope" v-else-if="item.prop==='storage_rate'">
          <el-progress :stroke-width="14" color="#455cc6" :percentage="scope.row.storage_rate* 100"></el-progress>
        </template>
        <template #default="scope" v-else-if="item.prop==='cpu_model'">
          <el-tooltip effect="dark" v-if="scope.row.cpu_model.length>0">
            <div slot="content">
              <div v-for="(item,index) in scope.row.cpu_model" :key="index">{{item}}</div>
            </div>
            <div class="tooltip-cell">{{scope.row.cpu_model[0]}}</div>
          </el-tooltip>
          <div v-else></div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page_info.current"
      :page-sizes="[20, 50, 100]"
      :page-size="page_info.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page_info.total">
    </el-pagination>
    <custom-list-item
      :visible.sync="show_custom"
      :all_item="all_item"
      :all_column_item="all_column_item"
      @fn-custom="get_custom_columns"
      :type="'cluster'"
    ></custom-list-item>
    <right-click :multi_rows="multi_rows" :menus="menus" :name="multi_rows.length>0? multi_rows[0].cluster_name: ''" :error_msg="error_msg" @fn-click="infoClick"></right-click>
    <create-cluster :visible.sync="visible" :oper_info="multi_rows" :isCreate="isCreate"></create-cluster>
  </div>

</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import SvgIcon from '@/components/svgIcon/index.vue';
import SearchFrom from "@/components/search/searchFrom.vue";
import CustomListItem from '@/views/physical/customListItem.vue';
import {deal_list} from "@/utils/transIndex";
import Service from "@/https/vmOp2/cluster/pod";
import { rightClick } from "@/utils/vmOp2/rightClick"
import { hideMenu} from "@/utils/vmOp2/hideMenu"
import RightClick from "@/views/vmOp2/component/right-click.vue";
import CreateCluster from "@/views/vmOp2/cluster/pod/createCluster.vue";
@Component({
  components: {
    CreateCluster,
    SearchFrom,
    SvgIcon,
    CustomListItem,
    RightClick
  }
})

export default class List extends Vue{
  private list=[]
  private all_column_item=[];
  private multi_rows:any=[];
  private search_data:any={}
  private isCreate:boolean=false
  private visible:boolean=false
  private rows_operate_btns:any=[
    {label:'新建集群',value:'create_cluster'},
  ]
  private menus= [
    { label: "添加主机", value: 'add_host',single:true,disabled: false},
    { label: "添加虚拟机", value: 'add_vm',single:true,disabled: false},
    { label: "编辑集群", value: 'edit_cluster',single:true,disabled: false },
    { label: "删除集群", value: 'delete_cluster', disabled: false},
  ]
  private error_msg={
    delete_cluster:'仅支持无物理机的cluster进行删除'
  }
  private page_info:any={
    current:1,
    size:20,
    total:0
  }
  private all_item:Array<any>=[]
  private custom_host=[]
  private show_custom:boolean=false;
  @Watch('visible')
  private watch_visible(nv){
    if(!nv){
      this.multi_rows=[];
      this.get_pod_cluster_list()
    }
  }
  @Watch('multi_rows',{immediate:true,deep:true})
  private watch_multi(){
    this.handleMenus()
  }
  created(){
    this.get_field()
    this.get_pod_cluster_list()
    //监听点击事件，点击时隐藏右键菜单
    document.addEventListener('click', hideMenu);
  }
  private handleMenus(){
    //判断右键菜单项是否置灰
    this.menus.forEach(item => {
      item.disabled = this.judge(item.value);
    });
  }
  private judge(value){
    let flag = false;
      switch (value) {
        case 'delete_cluster':
          flag = !this.multi_rows.every(item => item.host_count === 0);
          break;
        case 'add_vm':
          // 执行添加虚拟机的逻辑
          break;
        case 'edit_cluster':
          // 执行编辑集群的逻辑
          break;
      }
    //let operate_auth = !this.$store.state.auth_info[this.$route.name];
    return flag
  }

  private handleOperate(label){
    this.isCreate =true
    this.visible = true
  }
  private infoClick(item) {
    if (item.disabled) {
      return; // 禁用元素时不执行点击事件
    }
    if (item.value === 'edit_cluster') {
      this.isCreate =false
      this.visible = true
    }else if(item.value === 'delete_cluster'){
      let delete_cluster = this.multi_rows.map(item=>{return item.cluster_name})
      this.$confirm(`是否确认删除集群：${delete_cluster}?`, '删除集群', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        let cluster_ids =this.multi_rows.map(item=>{ return item.cluster_id})
        let res:any = await Service.delete_cluster({
          cluster_id:cluster_ids
        })
        if(res.code === 'Success'){
          this.$message.success(res.message)
          this.refresh()
        }
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
    if(!item.list){
      hideMenu()
    }
  }
  private refresh(){
    this.get_pod_cluster_list()
  }
  private FnRightClick(row,column,event){
    //判断当前行是否被选中，没选中时需选中并弹出菜单
    const isSelected = this.multi_rows.some(item => item.cluster_id === row.cluster_id);
    if (!isSelected) {
      (this.$refs.table as any).toggleRowSelection(row)
    }
    rightClick(row,column,event)
  }
  //改变点击行得选中状态
  private FnOperRow(row){
    (this.$refs.table as any).toggleRowSelection(row)
  }
  //改变选中行的背景颜色
  rowStyle({row}) {
    const isSelected = this.multi_rows.some(item => item.cluster_id === row.cluster_id);
    if (isSelected) {
      return 'rowStyle'
    }
  }
  private async get_field(){
   let res:any = await Service.get_cluster_field()
    if(res.code==="Success"){
      let key_list=['field_name','show_name'];
      let label_list=['prop','label'];
      let list:Array<any>=[]
      res.data.map(item=>{
        list=[...list,...item.filed];
        return item;
      })
      this.all_item = res.data;
      this.all_column_item = deal_list(list,label_list,key_list);
      this.get_custom_columns(this.$store.state.pod.cluster_host)
    }
  }
  private get_custom_columns(list) {
    if(list.length===0){
      return;
    }
    this.custom_host = this.all_column_item.filter(item=>list.includes(item.label));//选中的列表项
    this.custom_host.map((item:any)=>{
      item = Object.assign(item,{},{sortable:'custom'})
      if(['cluster_id','gpu_model'].includes(item.prop)){
        item = Object.assign(item,{},{minWidth:'240px',overflow:true})
      }
      if(['cpu_model'].includes(item.prop)){
        item = Object.assign(item,{},{width:'180'})
      }
      if(['storage_cluster_name','cluster_name','cpu_rate','ram_rate','gpu_rate','storage_rate','host_count','ecs_count','gpu_count','storage_count'].includes(item.prop)){
        item = Object.assign(item,{},{width:'120px'})
      }
      return item;
    })
  }
  private FnCustom() {
    this.show_custom = true;
  }
  private async get_pod_cluster_list(){
    let reqData = {
      page_index: this.page_info.current,
      page_size: this.page_info.size,
      az_id:this.$store.state.az_id,
      pod_id:this.$route.params.id,
      sort_field:this.search_data.sort_field,
      sort_type:this.search_data.sort_type
    }
    let res:any = await Service.get_pod_cluster_list(reqData)
    if(res.code === 'Success'){
      this.list = res.data.result
      this.page_info.total = res.data.page_info.count
    }
  }
  private handleSelectionChange(data){
    this.multi_rows = data
  }
  private FnSortChange(obj){
    this.search_data.sort_field = obj.order ? obj.prop : undefined
    this.search_data.sort_type = obj.order==="descending" ? '1' :obj.order==="ascending" ? '0' : undefined
    this.get_pod_cluster_list()
  }
  private handleSizeChange(size){
    this.page_info.size = size
    this.get_pod_cluster_list()
  }
  private handleCurrentChange(cur){
    this.page_info.current = cur
    this.get_pod_cluster_list()
  }
}
</script>

<style scoped lang="scss">
.search-box{
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  ::v-deep .el-input{
    width: 260px;
  }
  ::v-deep .el-input__inner{
    width: 260px;
    border-radius: 20px;
  }
}
i.el-icon-s-tools{
  font-size: 18px;
  vertical-align: middle;
}
::v-deep .el-progress-bar__outer {
  border-radius: 0;
}
::v-deep .el-progress-bar__inner {
  border-radius: 0;
}
::v-deep .el-progress__text{
  font-size: 14px!important;
}
//table选中高亮
::v-deep .el-table .rowStyle {
  background-color: #8CC4fc !important;

}
::v-deep .el-table .rowStyle:hover>td {
  background-color: #8CC4fc !important
}

</style>
