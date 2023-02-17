<template>
  <div>
    <el-dialog
      title="操作记录"
      :visible.sync="visible"
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
        <action-block :search_option="['physical','message'].includes(type) ?{...search} :search" @fn-search="fn_search"></action-block>
        <div class="icon m-bottom10" v-if="['physical','message'].includes(type)">
          <el-tooltip content="刷新" placement="bottom" effect="light">
            <el-button type="text" @click="getOperateRecordList"><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
          </el-tooltip>
        </div>
        <el-table :data="record_list" border class="record-table">
          <el-table-column prop="oper_time" label="操作时间">
            <template slot-scope="scope">
              <span>{{scope.row.oper_time ? moment(scope.row.oper_time).format("YYYY-MM-DD HH:mm:ss") : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="oper_type_display" label="操作内容"></el-table-column>
          <el-table-column prop="status_display" label="状态"></el-table-column>
          <el-table-column prop="response" label="响应信息" v-if="!['message','physical'].includes(type)">
            <template slot-scope="scope">
              <el-button type="text" @click="view(scope.row.result)" v-if="scope.row.result">查看</el-button>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="response" label="响应信息" v-else>
            <template slot-scope="scope">
              <el-button type="text" @click="view(scope.row.response)" v-if="scope.row.response">查看</el-button>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="finish_time" label="完成时间">
            <template slot-scope="scope">
              <span>{{scope.row.finish_time ? moment(scope.row.finish_time).format("YYYY-MM-DD HH:mm:ss") : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="oper_user" :label="type==='nas' ? '操作用户' :'用户名'"></el-table-column>
          <el-table-column prop="flag_display" label="操作标识" v-if="!['physical','message'].includes(type)"></el-table-column>
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
import ActionBlock from '../../components/search/actionBlock.vue';
import Service from '../../https/instance/record_detail';
import p_service from '../../https/physical/list';
import m_service from '../../https/mirror/list';
import snapshot_service from '../../https/snapshot/list'
import n_service from '../../https/filesystem/list'
import moment from 'moment';
import {deal_list} from '../../utils/transIndex';
import SvgIcon from '../../components/svgIcon/index.vue'
@Component({
  components:{
    ActionBlock,
    SvgIcon
  }
})
export default class InsDetail extends Vue{
  $message;
  @Prop(Boolean) visible!:Boolean;
  @Prop(String) record_id!:String
  @Prop(String) type:string
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
  // private physical_option:any={
  //   time:{
  //     type:'datetimerange',
  //     placeholder:['开始时间','结束时间'],
  //     clearable:false,
  //     width:360,
  //     dis_day:31,
  //     defaultTime:[moment(new Date()).format("YYYY-MM-DD 00:00:00"),moment(new Date()).format("YYYY-MM-DD HH:mm:ss")]
  //   },
  // }
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
    let res:any
    const {search_data:data}=this
    let temp=this.type!=='physical' ? {
      task_type:data.content,
      cloud_id:this.record_id,
    }:{
      content:data.content,
      cloud_id:this.record_id,
      cloud_type:'host'
    }
    let req={
      status:data.state || '',
      page_size:this.size,                                                                         
      page_index:this.current,
      ...temp
    }
    if(this.type==='physical'){
      res = await p_service.record({
        // start:data.time ? moment(data.time[0]).format("YYYY-MM-DD HH:mm:ss") : moment(new Date()).format("YYYY-MM-DD 00:00:00"),
        // end:data.time ? moment(data.time[1]).format("YYYY-MM-DD HH:mm:ss") : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        ...req
      })
    }else if(this.type==='message'){
      res = await m_service.get_pub_operate_record({
        os_id:this.record_id,
        status:data.state || '',
        content_type:data.content,
        // start:data.time ? moment(data.time[0]).format("YYYY-MM-DD HH:mm:ss") : moment(new Date()).format("YYYY-MM-DD 00:00:00"),
        // end:data.time ? moment(data.time[1]).format("YYYY-MM-DD HH:mm:ss") : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        page_size:this.size,                                                                         
        page_index:this.current,
        
      })
    }else if(this.type==='snapshot'){
      res = await snapshot_service.record({
        cloud_id:this.record_id,
        cloud_type:'snapshot',
        status:data.state || '',
        task_type:data.content,
        page_size:this.size,                                                                         
        page_index:this.current,
      })   
    }else if(this.type==='nas'){
      res = await n_service.get_nas_record({
        ...req
      })
    }else{
      res = await Service.get_operate_record_list({
        cloud_type: this.type ? this.type :'ecs',
        ...req
      })
    }
    if(res.code==="Success"){
      if(!['physical','message'].includes(this.type)){
        this.record_list = res.data?.history_record || []
      }else{
        let key_list =['create_time','content','status_name','response','update_time','op_user']
        let label_list =['oper_time','oper_type_display','status_display','response','finish_time','oper_user']
        this.record_list = deal_list(res.data.operation_list,label_list,key_list)
        
      }
      
      this.total = this.type==='nas' ? res.data.total_num : (res.data?.page_info?.count || 0)
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
.icon{
  width:100%;
  text-align: right;
}
</style>