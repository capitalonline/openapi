<template>
  <div>
    <el-card class="m-bottom20">
    <action-block :search_option="search_option" @fn-search="search" >
    </action-block>
    <div class="icon m-bottom10">
      <el-tooltip content="刷新" placement="bottom" effect="light">
        <el-button type="text" @click="search"><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
      </el-tooltip>
    </div>
    <el-table
      :data="list"
      border
    >
      <el-table-column prop="ecs_id" label="云主机ID"></el-table-column>
      <el-table-column prop="ecs_name" label="云主机名称"></el-table-column>
      <el-table-column prop="status_display" label="云主机状态">
        <template slot-scope="scope">
          <span :class="[scope.row.status]">{{scope.row.status_display}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="云主机IP地址"></el-table-column>
      <el-table-column prop="create_time" label="更新时间"></el-table-column>
    </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page_info.page_index"
        :page-sizes="page_info.page_sizes"
        :page-size="page_info.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page_info.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import ActionBlock from '../../components/search/actionBlock.vue';
import SvgIcon from '../../components/svgIcon/index.vue';
import Service from '../../https/filesystem/list'
@Component({
  components: {
    ActionBlock,
    SvgIcon
  }
})
export default class Client extends Vue{
  @Prop({default:''}) private nas_id!:string
  private page_info = {
    page_sizes: [20, 50, 100],
    page_size: 20,
    page_index: 1,
    total: 0
  };
  private search_option:Object={
    ecs_id:{placeholder:'请输入云主机ID'},
    ecs_name:{placeholder:'请输入云主机名称'},
    ip:{placeholder:'请输入云主机IP地址'},
  }
  private search_data:{}
  private clear=null;
  private list:any = []
  created() {
    this.getClientList();
  }
  private search(data:any={}){
    this.search_data={...data}
    this.getClientList()
  }
  private async getClientList(loading:boolean=true){
    if(!loading){
      this.$store.commit("SET_LOADING",false)
    }
    let res:any =await Service.get_nas_ecs({
      nas_id:this.nas_id,
      page_index: this.page_info.page_index,
      page_size: this.page_info.page_size,
      ...this.search_data
    })
    if(res.code === 'Success'){
      this.list = res.data.ecs_info_list
      this.page_info.total = res.data.page_info.count
    }
    this.FnSetTimer()
  }
  //handleSizeChange
  private handleSizeChange(val){
    this.page_info.page_size = val;
    this.page_info.page_index = 1
    this.getClientList()
  }
  private handleCurrentChange(cur){
    this.page_info.page_index = cur
    this.getClientList();
  }
  beforeDestroy() {
    this.FnClearTimer()
  }
  private FnSetTimer(){
    if(this.clear){
      this.FnClearTimer()
    }
    this.clear = setTimeout(()=>{
      this.getClientList(false)
    },1000*3*60)
  }
  private FnClearTimer(){
    if(this.clear){
      clearTimeout(this.clear)
    }
  }
}
</script>

<style scoped>
.icon{
  width:100%;
  text-align: right;
}


</style>
