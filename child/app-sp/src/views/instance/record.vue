<template>
  <div>
    <el-dialog
      title="操作记录"
      :visible.sync="visible"
      width="60%"
      :destroy-on-close="true"
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
        <action-block :search_option="search" @fn-search="fn_search"></action-block>
        <el-table :data="record_list" border class="record-table">
          <el-table-column prop="oper_time" label="操作时间">
            <template slot-scope="scope">
              <span>{{scope.row.oper_time ? moment(scope.row.oper_time).format("YYYY-MM-DD HH:mm:ss") : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="oper_type_display" label="操作内容"></el-table-column>
          <el-table-column prop="status_display" label="状态"></el-table-column>
          <el-table-column prop="response" label="响应信息">
            <template slot-scope="scope">
              <el-button type="text" @click="view(scope.row.result)" v-if="scope.row.result">查看</el-button>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="finish_time" label="完成时间">
            <template slot-scope="scope">
              <span>{{scope.row.finish_time ? moment(scope.row.finish_time).format("YYYY-MM-DD HH:mm:ss") : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="oper_user" label="用户名"></el-table-column>
          <el-table-column prop="flag_display" label="操作标识"></el-table-column>
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
          <el-button @click="back" type="primary">返回</el-button>
        </div>
        
      </div>
      
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/actionBlock.vue';
import Service from '../../https/instance/record_detail';
import moment from 'moment';

@Component({
  components:{
    ActionBlock
  }
})
export default class InsDetail extends Vue{
  $message;
  @Prop(Boolean) visible!:Boolean;
  @Prop(String) record_id!:String
  @Prop(String) type:String
  private state_list:any = [
    {
        type:'',
        label:'全部'
      },
      {
        type:'doing',
        label:'执行中'
      },
      {
        type:'success',
        label:'成功'
      },
      {
        type:'failed',
        label:'失败'
      },
  ]
  private search:any = {
    state:{list:this.state_list,placeholder:'请选择状态'},
    content:{placeholder:'请输入操作内容'},
  }
  private CODE_STATE={
    creat_ecs:'创建云服务器',
    start_up_ecs:'启动云服务器',
    shutdown_ecs:'停止云服务器',
    restart_ecs:'重启云服务器',
    delete_ecs:'逻辑删除云服务器',
    recover_ecs:'恢复云服务器',
    destroy_ecs:'销毁云服务器',
  }
private CODE_RESPONSE={
  init:'初始化',
  doing:'进行中',
  finish:'成功',
  error:'错误',
  failed:'失败',
  part_fail:'部分失败',
}
  private record_list:any = []
  private current:number = 1
  private size:number = 20
  private total:number = 0
  private search_data:any={}
  private moment:any = moment
  private response:string=""
  private res_visible:boolean = false
  created() {
    this.fn_search()
  }
  private fn_search(data:any={}){
    this.current = 1;
    this.search_data = data
    this.getOperateRecordList()
  }
  private async getOperateRecordList() {
    // this.loading = true
    const {search_data:data}=this
    let res:any = await Service.get_operate_record_list({
      cloud_id:this.record_id,
      cloud_type: this.type ? this.type :'ecs',
      status:data.state || '',
      task_type:data.content || '',
      page_size:this.size,                                                                         
      page_index:this.current
    })
    if(res.code==="Success"){
      this.record_list = res.data?.history_record || []
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
  @Emit("close")
  private back(){

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

</style>