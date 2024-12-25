<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import actionBlock from "@/components/search/actionBlock.vue";
import SvgIcon from "@/components/svgIcon/index.vue";
import {rightClick} from "@/utils/vmOp2/rightClick";
import Add from "@/views//vmOp2/dict/add.vue";
import RightClick from "@/views/vmOp2/component/right-click.vue";
import Service from "@/https/vmOp2/config/model";
import {hideMenu} from "@/utils/vmOp2/hideMenu";

@Component({
  components: {RightClick, Add, SvgIcon, actionBlock}
})
export default class gpu extends Vue {
  private search_con = {
    gpu_info:{placeholder:'请输入GPU信息'},
    gpu_brand:{placeholder:'请选择GPU品牌',list:[]}
  }
  private  menus= [
    {label:'编辑',value:'edit',single:true},
    {label:'删除',value:'del'},
  ]
  private page_info:any={
    current:1,
    size:20,
    total:0
  }
  private search_value = {
    gpu_info: '',
    gpu_brand: '',
  };
  private list:any=[];
  private multiple_selection:any=[];
  private visible:boolean = false
  private info:any = {}
  created(){
    this.refresh()
    this.get_brand_list()
  }
  private refresh(){
    this.get_gpu_list()
  }
  private FnSearch(data:any={}){
    this.search_value.gpu_info = data.gpu_info;
    this.search_value.gpu_brand = data.gpu_brand;
    this.refresh()

  }
  private async get_brand_list(){
    let res = await Service.get_model_brand_list({
      model_type:'gpu'
    })
    if(res.code == 'Success'){
      this.search_con.gpu_brand.list = res.data.model_brand_list.map(item =>{
        return {
          type:item,
          label:item
        }
      })
    }
  }
  private close(val){
    val && this.get_gpu_list() && this.get_brand_list()
    this.visible = false
    this.info = {}
  }
  private add(){
    this.visible = true
  }
  private del(){
    let ids = this.multiple_selection.map(item=>{return item.gpu_type_id})
    let names = this.multiple_selection.map(item=>{return item.gpu_name})
    this.$confirm(`是否确认删除${names}?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      let res = await Service.delete_model_info({
        model_type:'gpu',
        model_type_id_list:ids
      })
      if(res.code == 'Success'){
        this.$message.success(res.message);
        this.get_gpu_list()
        this.get_brand_list()
      }
    })
  }
  private edit(info){
    this.visible = true
    this.info = info
  }
  private async get_gpu_list(){
    let res = await Service.model_info_list({
      model_type:'gpu',
      gpu_search_info:this.search_value.gpu_info,
      gpu_brand:this.search_value.gpu_brand,
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
    }else {
      this.del()
    }
    hideMenu()
  }
  //右键弹出操作
  FnRightClick(row,column,event){
    //判断当前行是否被选中，没选中时需选中并弹出菜单
    const isSelected = this.multiple_selection.some(item => item.gpu_type_id === row.gpu_type_id);
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
    const isSelected = this.multiple_selection.some(item => item.gpu_type_id === row.gpu_type_id);
    if (isSelected) {
      return 'rowStyle'
    }
  }
  private handleSelectionChange(data){
    this.multiple_selection = data
  }
  private handleSizeChange(size){
    this.page_info.size = size
    this.get_gpu_list()
  }
  private handleCurrentChange(cur){
    this.page_info.current = cur
    this.get_gpu_list()
  }

}
</script>

<template>
  <div class="app-container">
    <action-block :search_option="search_con" @fn-search="FnSearch">
      <template #default>
        <el-button type="primary" @click="add">新增</el-button>
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
      <el-table-column label="编号" prop="gpu_type_id" align="center"></el-table-column>
      <el-table-column label="GPU显示名称" prop="gpu_name" align="center"></el-table-column>
      <el-table-column label="底层名称" prop="gpu_real_name" align="center">
        <template slot-scope="scope">
          <el-tooltip effect="light" v-if="scope.row.gpu_real_name.length>1">
            <div slot="content">
              <div v-for="(item,index) in scope.row.gpu_real_name" :key="index">
                {{item}}
              </div>
            </div>
            <div class="tooltip-cell">{{scope.row.gpu_real_name[0]+ '....'}}</div>
          </el-tooltip>
          <div v-else-if="scope.row.gpu_real_name.length == 1">{{scope.row.gpu_real_name[0]}}</div>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column label="品牌" prop="gpu_brand" align="center"></el-table-column>
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
         type="GPU"
         @close="close"
         :info="info">
    </add>
    <right-click
      :multi_rows="multiple_selection"
      :menus="menus"
      :name="multiple_selection.length>0 ? multiple_selection[0].gpu_name: ''"
      @fn-click="infoClick">
    </right-click>

  </div>
</template>

<style scoped lang="scss">

</style>
