<script lang="ts">
import {Vue, Component,Watch} from 'vue-property-decorator';
import actionBlock from "@/components/search/actionBlock.vue";
import SvgIcon from "@/components/svgIcon/index.vue";
import {rightClick} from "@/utils/vmOp2/rightClick";
import Add from "@/views//vmOp2/dict/add.vue";
import RightClick from "@/views/vmOp2/component/right-click.vue";
import Service from "@/https/vmOp2/config/model"
import Sync from "@/views/vmOp2/dict/sync.vue";
import { hideMenu } from '@/utils/vmOp2/hideMenu';

@Component({
  components: {Sync, RightClick, Add, SvgIcon, actionBlock}
})
export default class cpu extends Vue {
  private search_con = {
    cpu_info:{placeholder:'请输入CPU信息'},
    cpu_brand:{placeholder:'请选择CPU品牌',list:[]}
  }
  private search_value = {
    cpu_info: '',
    cpu_brand: '',
  };
  private  menus= [
    {label:'编辑',value:'edit',single:true},
    {label:'删除',value:'del'},
    {label:'底层同步',value:'sync'}
  ]
  private page_info:any={
    current:1,
    size:20,
    total:0
  }
  private list:any=[];
  private multiple_selection:any=[];
  private visible:boolean = false
  private sync_visible:boolean = false
  private info:any = {}
  created(){
    this.refresh()
    this.get_brand_list()
  }
  private refresh(){
    this.get_cpu_list()
  }
  private FnSearch(data:any={}){
    this.search_value.cpu_info = data.cpu_info;
    this.search_value.cpu_brand = data.cpu_brand;
    this.refresh()
  }
  private async get_brand_list(){
    let res = await Service.get_model_brand_list({
      model_type:'cpu'
    })
    if(res.code == 'Success'){
      this.search_con.cpu_brand.list = res.data.model_brand_list.map(item =>{
        return {
          type:item,
          label:item
        }
      })
    }
  }
  private async get_cpu_list(){
    let res = await Service.model_info_list({
      model_type:'cpu',
      cpu_search_info:this.search_value.cpu_info,
      cpu_brand:this.search_value.cpu_brand,
      page_index:this.page_info.current,
      page_size:this.page_info.size,
    })
    if(res.code == 'Success'){
      this.list = res.data.model_info_list
      this.page_info.total = res.data.page_info.count
    }
  }
  private infoClick(item){
    const {label,value} = item
    if(value === 'edit'){
      this.edit(this.multiple_selection[0])
    }else if(value === 'del'){
      this.del()
    }else {
      this.sync()
    }
    hideMenu()
  }
  private add(){
    this.visible = true
  }
  private specSync(){
    this.$confirm('是否确认进行规格同步操作？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      let res = await Service.spec_family_sync()
      if(res.code=='Success'){
        this.$message.success(res.message)
      }
    })
  }
  private close(val){
    val && this.get_cpu_list() && this.get_brand_list()
    this.visible = false
    this.sync_visible = false
    this.info = {}
  }
  private async sync(){
    if(this.multiple_selection.length <1){
      this.$message.warning('请选择要同步的CPU')
      return
    }
    this.sync_visible = true

  }
  private del(){
    let ids = this.multiple_selection.map(item=>{return item.cpu_type_id})
    let names = this.multiple_selection.map(item=>{return item.cpu_name})
    this.$confirm(`是否确认删除${names}?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      let res = await Service.delete_model_info({
        model_type:'cpu',
        model_type_id_list:ids
      })
      if(res.code == 'Success'){
        this.$message.success(res.message);
        this.get_cpu_list()
        this.get_brand_list()
      }
    })

  }
  private edit(info){
    this.visible = true
    this.info = info
  }
  //右键弹出操作
  FnRightClick(row,column,event){
    //判断当前行是否被选中，没选中时需选中并弹出菜单
    const isSelected = this.multiple_selection.some(item => item.cpu_type_id === row.cpu_type_id);
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
    const isSelected = this.multiple_selection.some(item => item.cpu_type_id === row.cpu_type_id);
    if (isSelected) {
      return 'rowStyle'
    }
  }
  private handleSelectionChange(data){
    this.multiple_selection = data
  }
  private handleSizeChange(size){
    this.page_info.size = size
    this.get_cpu_list()
  }
  private handleCurrentChange(cur){
    this.page_info.current = cur
    this.get_cpu_list()
  }

}
</script>

<template>
  <div class="app-container">
    <action-block :search_option="search_con" @fn-search="FnSearch">
      <template #default>
        <el-button type="primary" @click="add">新增</el-button>
        <el-button type="primary" @click="specSync">规格同步</el-button>
      </template>
    </action-block>
    <el-table
      :data="list"
      border
      height="100%"
      ref="table"
      @row-click="FnOperRow"
      @row-contextmenu="FnRightClick"
      :row-class-name="rowStyle"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="编号" prop="cpu_type_id" min-width="100px"></el-table-column>
      <el-table-column label="CPU显示名称" prop="cpu_name" min-width="120px"></el-table-column>
      <el-table-column label="底层名称" prop="cpu_real_name" min-width="110px"></el-table-column>
      <el-table-column label="代数" prop="cpu_generation"></el-table-column>
      <el-table-column label="类型" prop="cpu_type"></el-table-column>
      <el-table-column label="品牌" prop="cpu_brand"></el-table-column>
      <el-table-column label="型号" prop="cpu_model"></el-table-column>
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
    <add :visible.sync="visible"
         type="CPU"
         @close="close"
         :info="info">
    </add>
    <right-click
      :multi_rows="multiple_selection"
      :menus="menus"
      :name="multiple_selection.length>0 ? multiple_selection[0].cpu_name: ''"
      @fn-click="infoClick">
    </right-click>
    <Sync :row="multiple_selection" :visible.sync="sync_visible" @close="close"></Sync>
  </div>
</template>

<style scoped lang="scss">

</style>
