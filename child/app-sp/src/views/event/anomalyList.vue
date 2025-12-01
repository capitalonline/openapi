<template>
    <div>
      <action-block :search_option="search" @fn-search="fn_search"></action-block>
      <div class="prompt_message">重试：支持对失败状态的任务进行重试；忽略：支持对任务进行忽略，忽略的任务不展示</div>
      <el-table 
        :data="event_list" 
        border 
        class="event-table"
        @filter-change="filterAttribute"
      >
        <el-table-column prop="cloud_id" label="资源ID"></el-table-column>
        <el-table-column prop="customer_id" label="客户ID"></el-table-column>
        <el-table-column prop="customer_name" label="客户名称"></el-table-column>
        <el-table-column prop="az_name" label="可用区"></el-table-column>
        <el-table-column prop="task_id" label="任务ID"></el-table-column>
        <el-table-column prop="task_type" label="任务名称"></el-table-column>
        <el-table-column prop="task_state" label="任务状态"></el-table-column>
        <el-table-column prop="error_type" label="失败类型" :filter-multiple="false" column-key="error_type" :filters="error_type_list">
          <template slot-scope="scope">
            <span>{{scope.row.error_type}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="subtask_name" label="当前执行流程"></el-table-column>
        <el-table-column prop="detail" label="失败原因">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.detail" popper-class="tooltip-width" placement="bottom" effect="light">
              <span>{{ scope.row.detail.length>20 ? `${scope.row.detail.slice(0,21)}...` : scope.row.detail }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.create_time ? moment(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间">
          <template slot-scope="scope">
            <span>{{scope.row.update_time ? moment(scope.row.update_time).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="end_time" label="完成时间">
          <template slot-scope="scope">
            <span>{{scope.row.end_time ? moment(scope.row.end_time).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" 
              @click="retry(scope.row.task_id,scope.row.event_id)"
            >重试</el-button>
            <el-button type="text" @click="ignore(scope.row.task_id,scope.row.event_id)"
            >忽略</el-button>
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
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue,Watch } from 'vue-property-decorator';
  import ActionBlock from "../../components/search/actionBlock.vue";
  import service from '../../https/event/list';
  import EcsService from '../../https/instance/create'
  import {trans} from '../../utils/transIndex';
  import moment from 'moment';
  @Component({
    components:{
      ActionBlock,
    }
  })
  export default class List extends Vue {
    $router;
    $message;
    $store;
    private search:any = {
      az_id:  {placeholder:'请选择可用区',list:[]},
      cloud_id:  {placeholder:'请输入资源ID'},
      task_id: {placeholder:'请输入任务ID'},
      task_type: {placeholder:'请输入任务名称'},
      customer_id: {placeholder:'请输入客户ID'},
      customer_name: {placeholder:'请输入客户名称'},
      time:{
        type:'datetimerange',
        placeholder:['开始时间','结束时间'],
        clearable:false,
        width:360,
        defaultTime:[moment(new Date()).format("YYYY-MM-DD 00:00:00"),moment(new Date()).format("YYYY-MM-DD HH:mm:ss")]
      },
    };
    
    private event_num:number = 0;
    private finish_num:number = 0;
    private finished_percent:string = '0.00%';
    private fail_num:number = 0;
    private error_percent:string = '0.00%';
    private err:string = 'err'
    private current:number = 1
    private size:number = 20
    private total:number = 0
    private moment =moment
    private event_list:any=[]
    private min_date:any = ""
    private search_data:any = {};
    private event_detail: boolean = false;
    private sort_prop_name:string='';
    private sort_value:string=''
    private error_type_list=[];
    private filter_obj={}
    created() {
      this.get_az_list();
      this.getFilterList()
      this.fn_search()
    }
    private async get_az_list(){
      this.search.az_id.list=[]
    let res:any=await EcsService.get_region_az_list({})
        if(res.code==="Success"){
          // 如果是达州用户“DZ0003”，可用区只显示达州，dz_key为达州的可用区id
            const dz_user = this.$store.state.employee_no === 'DZ0003';
            const dz_key = '400024f8-94fd-11f0-98bd-bed299e83d5e';
            res.data.forEach(item=>{
                const filteredRegions = dz_user 
                  ? item.region_list.filter(inn => inn.region_id === dz_key) 
                  : item.region_list;
                filteredRegions.forEach(inn=>{
                this.search.az_id.list=[...this.search.az_id.list,...trans(inn.az_list,'az_name','az_id','label','type')]
                })
            })
        }
    }
    private async getFilterList(){
      let res:any=await service.get_filter_item({
        filed_names:['error_type']
      })
      if(res.code==='Success'){
        for(let i in res.data.error_type){
          this.error_type_list.push({text:res.data.error_type[i],value:i})
        }
      }
    }
    private fn_search(data:any={}){
      this.current = 1;
      this.search_data = {...data,...this.filter_obj}
      this.get_error_task_list()
    }
    private async get_error_task_list() {
      const {search_data:data}=this
      const res:any = await service.get_error_task_list({
        page_index:this.current,
        page_size:this.size,
        az_id:data.az_id || "",
        cloud_id:data.cloud_id || "",
        task_type:data.task_type || "",
        task_id:data.task_id || "",
        customer_id:data.customer_id || "",
        customer_name:data.customer_name || "",
        error_type:data.error_type ? data.error_type[0] : undefined,
        start_time:data.time ? moment(data.time[0]).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format("YYYY-MM-DD 00:00:00"),
        end_time:data.time ? moment(data.time[1]).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      })
      if(res.code==="Success"){
        this.event_list = res.data?.task_list || []
        this.total = res.data?.page_info?.count || 0
      }else{
          this.$message.error(res.msg || '操作错误')
        }
    }
    private handleSizeChange(size){
      this.size = size
      this.get_error_task_list()
    }
    private handleCurrentChange(cur){
      this.current = cur
      this.get_error_task_list()
    }
    private filterAttribute(obj:any){
      this.filter_obj = {...this.filter_obj,...obj};
      this.fn_search(this.search_data)
    }
    private async retry(task_id,event_id) {
      let res:any = await service.retry_task({
        task_id,
        event_id
      })
      if(res.code==='Success'){
        this.$message.success(res.message);
        this.get_error_task_list()
      }
    }
    private async ignore(task_id) {
      let res:any = await service.ignore({
        task_id,
      })
      if(res.code==='Success'){
        this.$message.success(res.message);
        this.get_error_task_list()
      }
    }
    
  }
  </script>
  <style lang="scss" scoped>
  </style>
  