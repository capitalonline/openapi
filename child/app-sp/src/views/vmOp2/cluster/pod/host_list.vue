<template>
  <div>
    <div class="search-box" >
      <el-input prefix-icon="el-icon-search"></el-input>
      <div class="icon m-bottom10">
        <el-tooltip content="自定义列表项" placement="bottom" effect="light">
          <el-button type="text" @click="FnCustom"><i class="el-icon-s-tools" ></i></el-button>
        </el-tooltip>
        <el-tooltip content="刷新" placement="bottom" effect="light">
          <el-button type="text" @click="refresh" ><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
        </el-tooltip>
<!--        <el-tooltip content="导出" placement="bottom" effect="light">-->
<!--          <el-button type="text" ><svg-icon icon="export" class="export"></svg-icon></el-button>-->
<!--        </el-tooltip>-->
      </div>
    </div>
    <el-table
      :data="list"
      border
      :row-class-name="rowStyle"
      @row-click="FnOperRow"
      ref="table"
      @row-contextmenu="rightClick"
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
      >
        <template #default="scope" v-if="item.prop==='cpu_rate'">
          <el-progress :stroke-width="14" color="#455cc6" :percentage="scope.row.cpu_rate"></el-progress>
        </template>
        <template #default="scope" v-else-if="item.prop==='ram_rate'">
          <el-progress :stroke-width="14" color="#455cc6" :percentage="scope.row.ram_rate"></el-progress>
        </template>
        <template #default="scope" v-else-if="item.prop==='gpu_rage'">
          <el-progress :stroke-width="14" color="#455cc6" :percentage="scope.row.gpu_rage"></el-progress>
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
      :type="'pod_host'"
    ></custom-list-item>
    <right-click :multi_rows="multi_rows"></right-click>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SvgIcon from '@/components/svgIcon/index.vue';
import SearchFrom from "@/components/search/searchFrom.vue";
import CustomListItem from '@/views/physical/customListItem.vue';
import {deal_list} from "@/utils/transIndex";
import RightClick from "@/views/vmOp2/component/right-click.vue";
import Service from "@/https/vmOp2/cluster/pod";
@Component({
  components: {
    RightClick,
    SearchFrom,
    SvgIcon,
    CustomListItem
  }
})

export default class HostList extends Vue{
  private list=[{customer_id:'1111',cpu:25 },{customer_id:'2222',cpu:25 }]
  private all_column_item=[];
  private multi_rows:any=[];
  private search_data:any={}
  private page_info:any={
    current:1,
    size:20,
    total:0
  }
  private all_item:Array<any>=[]
  private custom_host=[]
  private show_custom:boolean=false;
  created(){
    this.get_field()
    this.get_pod_host_list()
    //监听点击事件，点击时隐藏右键菜单
    document.addEventListener('click', this.hideMenu);
  }
  private refresh(){
    this.get_pod_host_list()
  }
  //改变点击行得选中状态
  private FnOperRow(row){
   (this.$refs.table as any).toggleRowSelection(row)
  }
  //改变选中行的背景颜色
  rowStyle({row}) {
    const isSelected = this.multi_rows.some(item => item.host_id === row.host_id);
      if (isSelected) {
        return 'rowStyle'
      }
  }
  private hideMenu() {
    // 隐藏菜单的逻辑
    let menu = document.querySelector("#menu") as HTMLElement;
    if (menu) {
      menu.style.display = "none";
    }
  }
  //右键弹出操作
  rightClick(row,column,event){
    //组织浏览器默认右键菜单弹出
    event.preventDefault();
    //判断当前行是否被选中，没选中时需选中并弹出菜单
    const isSelected = this.multi_rows.some(item => item.host_id === row.host_id);
    if (!isSelected) {
      (this.$refs.table as any).toggleRowSelection(row)
    }
    let menu = document.querySelector("#menu") as HTMLElement;
    if(menu) {
      menu.style.left = event.clientX - 258 + "px";
      menu.style.top = event.clientY - 75 + "px";
      menu.style.display = "block";
      menu.style.zIndex = '1000';
    }
  }
  private async get_field(){
    let res:any = await Service.get_pod_host_field()
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
    this.get_custom_columns(this.$store.state.pod.host_list)
    }
  }
  private get_custom_columns(list) {
    if(list.length===0){
      return;
    }
    this.custom_host = this.all_column_item.filter(item=>list.includes(item.label));//选中的列表项
    this.custom_host.map((item:any)=>{
      item = Object.assign(item,{},{sortable:'custom'})
      if(['host_id','bare_metal_name','cpu_model'].includes(item.prop)){
        item = Object.assign(item,{},{width:'240px',overflow:true})
      }
      if(['host_name'].includes(item.prop)){
        item = Object.assign(item,{},{width:'150px',overflow:true})
      }
      if(['host_ip','out_band_address','gpu_count','ecs_count','cpu_rate','ram_rate','gpu_rage','gpu_model'].includes(item.prop)){
        item = Object.assign(item,{},{width:'120px'})
      }
      return item;
    })
  }
  private FnCustom() {
    this.show_custom = true;
  }
  private async get_pod_host_list(){
    let reqData = {
      page_index: this.page_info.current,
      page_size: this.page_info.size,
      az_id:this.$store.state.az_id,
      pod_id:this.$route.params.id,
    }
    let res:any = await Service.get_pod_host_list(reqData)
    if(res.code === 'Success'){
      this.list = res.data.result
      this.page_info.total = res.data.page_info.count
    }
  }
  private handleSelectionChange(data){
    this.multi_rows = data
  }
  private FnSortChange(obj){
  }
  private handleSizeChange(size){
    this.page_info.size = size
    this.get_pod_host_list()
  }
  private handleCurrentChange(cur){
    this.page_info.current = cur
    this.get_pod_host_list()
  }
  beforeDestroy() {
    // 移除全局点击事件监听
    document.removeEventListener('click', this.hideMenu);
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
