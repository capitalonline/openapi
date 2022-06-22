<template>
  <div>
    <el-dialog
      title="操作记录"
      :visible.sync="visibleSync"
      width="60%"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="back"
    >
      <div>
        <el-dialog
            title="响应信息"
            :visible.sync="res_visible"
            width="60%"
            :destroy-on-close="true"
            @close="clost_res"
            append-to-body
            custom-class="response-data"
          >
          <div>{{response}}</div>
        </el-dialog>
      </div>
      <div>
        <div class="icon m-bottom10">
          <el-tooltip content="刷新" placement="bottom" effect="light">
            <el-button type="text" @click="getOperateRecordList"><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
          </el-tooltip>
        </div>
        <el-table :data="record_list" border class="record-table">
          <el-table-column prop="create_time" label="操作时间"></el-table-column>
          <el-table-column prop="op_content" label="操作内容"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="response" label="响应信息">
            <template slot-scope="scope">
              <el-button type="text" @click="view(scope.row.result)" v-if="scope.row.result">查看</el-button>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="finish_time" label="完成时间"></el-table-column>
          <el-table-column prop="op_user" label="用户名"></el-table-column>
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="visibleSync=false" type="primary">返回</el-button>
        </div>
        
      </div>
      
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue,PropSync } from 'vue-property-decorator';
import Service from '../../https/az/list';
import SvgIcon from '../../components/svgIcon/index.vue'
@Component({
  components:{
    SvgIcon
  }
})
export default class Record extends Vue{
  $message;
  @PropSync('visible') visibleSync!:Boolean;
  @Prop(String) az_id!:String
  private record_list:any = []
  private current:number = 1
  private size:number = 20
  private total:number = 0
  private response:string="";
  private res_visible:boolean=false
  created() {
    this.getOperateRecordList()
  }
  private async getOperateRecordList() {
    let res:any = await Service.record({
        az_id:this.az_id,
        page_index:this.current,
        page_size:this.size,
    })
    if(res.code==="Success"){
      this.record_list = res.data.history_list
      this.total = res.data?.page_info?.count || 0
    }
  }
  private handleSizeChange(size){
    this.size = size
    this.getOperateRecordList()
  }
  private handleCurrentChange(cur){
    this.current = cur
    this.getOperateRecordList()
  }
  private view(str:string){
    this.response = str
    this.res_visible = true
  }
  private clost_res(){
    this.res_visible=false
    this.response=""
  }
  
}
</script>
<style lang="scss">
.response-data{
  .el-dialog__body{
    border-top: 1px solid #ccc !important;
    background-color: #f5f6fa !important;
  }
  
}
.dialog-footer{
  margin-top: 10px !important;
  text-align: right !important;
}
.icon{
  width:100%;
  text-align: right;
}
</style>