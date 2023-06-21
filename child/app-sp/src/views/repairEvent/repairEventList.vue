<template>
    <div>
      <action-block :search_option="search" @fn-search="fn_search"></action-block>
      <div class="prompt_message">重试：支持对失败状态的任务进行重试；忽略：支持对任务进行忽略，忽略的任务不展示</div>
      <el-table
        :data="event_list"
        ref="evenTable"
        border
        class="event-table"
        @filter-change="filterAttribute"
        @expand-change="rowClick"
      >
        <el-table-column type="expand">
          <template #default="scope">
            <div style="overflow: hidden;padding: 0 0 24px;">
              <ul>
                <li>
                  <h1>step1：<el-button type="primary" @click="getUnderlyingTasksInfo(scope.row.task_id)">检查底层任务状态</el-button></h1>
<!--                  <template v-if="step1_status">-->
<!--                    <div class="m-top10 m-bottom10"><b>主任务检查结果：</b></div>-->
<!--                    <div style="width:90%">-->
<!--                      <el-descriptions-->
<!--                        :column="2"-->
<!--                        border-->
<!--                      >-->
<!--                        <el-descriptions-item width="100" label="主任务Id">{{maintask.taskId}}</el-descriptions-item>-->
<!--                        <el-descriptions-item width="100" label="上一次执行结束时间">{{maintask.execEndTime}}</el-descriptions-item>-->
<!--                        <el-descriptions-item width="100" label="主任务执行参数"><div style="max-width: 700px;">{{JSON.stringify(maintask.globalContext)}}</div></el-descriptions-item>-->
<!--                      </el-descriptions>-->
<!--                    </div>-->

<!--                    <div class="m-top10 m-bottom10"><b>子任务检查结果：</b></div>-->
<!--                    <el-table :data="subtasks"-->
<!--                              border-->
<!--                              v-if="subtasks.length > 0"-->
<!--                              style="width:99%"-->
<!--                              class="event-table">-->
<!--                      <el-table-column prop="subtaskId" label="子任务Id"></el-table-column>-->
<!--                      <el-table-column prop="status" label="状态"></el-table-column>-->
<!--                      <el-table-column prop="errorMsg" label="失败原因"></el-table-column>-->
<!--                      <el-table-column prop="executorName" label="执行服务"></el-table-column>-->
<!--                      <el-table-column prop="subtaskName" label="子任务名称"></el-table-column>-->
<!--                      <el-table-column prop="execTime" label="执行时间"></el-table-column>-->
<!--                      <el-table-column label="执行参数">-->
<!--                        <template #default="step">-->
<!--                          {{step.row.status && step.row.status === 'failed' ? step.row.parameters : '-'}}-->
<!--                        </template>-->
<!--                      </el-table-column>-->
<!--                      <el-table-column label="回调参数">-->
<!--                        <template #default="step">-->
<!--                          {{step.row.callbackContent}}-->
<!--                        </template>-->
<!--                      </el-table-column>-->
<!--                    </el-table>-->
<!--                  </template>-->

                </li>
                <li v-if="(maintask.status == 'failed' || step2_mainTaskStatus) && step1_status">
                  <h1>step2：底层任务修复</h1>
                  <div class="m-top10 m-bottom10"><b>主任务：</b></div>
                  <el-table :data="maintaskList"
                            border
                            style="width:99%">
                    <el-table-column prop="taskId" width="200" label="主任务Id"></el-table-column>
                    <el-table-column prop="execEndTime" width="200" label="上一次执行结束时间"></el-table-column>
                    <el-table-column label="当前错误参数显示" width="400">
                      <template #default="step">
                        {{step.row.globalContext}}<br>
                        <Clipboard :content="JSON.stringify(step.row.globalContext)" v-if="step.row.globalContext"></Clipboard>
                      </template>
                    </el-table-column>
                    <el-table-column label="预期修改" width="400">
                      <template #default="step">
                        <el-input type="textarea" class="eventTextarea" v-model="re_parameters" style="width: 370px;height: 150px;"></el-input>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="m-top10 m-bottom10"><b>子任务列表：</b></div>
                  <el-table :data="subtasks_step2"
                            border
                            v-if="subtasks_step2.length > 0"
                            style="width:99%">
                    <el-table-column width="55">
                      <template #default="step">
                        <el-checkbox v-model="step.row.isCheck" v-if="step.row.status == 'failed'"></el-checkbox>
                      </template>
                    </el-table-column>
                    <el-table-column prop="subtaskId" label="子任务Id"></el-table-column>
                    <el-table-column prop="status" width="80" label="状态"></el-table-column>
                    <el-table-column prop="errorMsg" label="失败原因"></el-table-column>
                    <el-table-column prop="executorName" label="执行服务"></el-table-column>
                    <el-table-column prop="subtaskName" label="子任务名称"></el-table-column>
                    <el-table-column prop="execTime" label="执行时间"></el-table-column>
                    <el-table-column label="回调参数">
                      <template #default="step">
                        {{step.row.callbackContent && JSON.stringify(step.row.callbackContent) !== '{}' ? JSON.stringify(step.row.callbackContent) : '-'}}
                      </template>
                    </el-table-column>
                    <el-table-column label="当前错误参数显示">
                      <template #default="step">
                        {{JSON.stringify(step.row.parameters)}}<br>
                        <Clipboard :content="JSON.stringify(step.row.parameters)" v-if="step.row.parameters"></Clipboard>
                      </template>
                    </el-table-column>
                    <el-table-column label="预期修改" width="200">
                      <template #default="step">
                        <el-input type="textarea" class="eventTextarea" v-if="step.row.status == 'failed'" v-model="step.row.re_parameters" style="width: 170px;height: 150px;"></el-input>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button type="primary" class="m-top10 m-bottom10" @click="setReTasks(scope.row.task_id)">底层任务修复执行</el-button>
                  <div style="width: 25%" v-if="step2_status && step2_mainTaskStatus"><el-progress :percentage="step2_progress"></el-progress></div>
                  <div class="step-result" v-if="step2_progress === 100 && step2_mainTaskStatus">执行结果：
                    <span v-if="maintask.status == 'failed'">任务失败</span>
                    <span v-else>任务成功</span>
                  </div>

                </li>
                <li v-if="step1_status">
                  <h1>step3：修复业务层</h1>
                  <el-table :data="resources"
                            border
                            style="width:99%"
                            class="event-table">
                    <el-table-column prop="resource_id" label="资源id"></el-table-column>
                    <el-table-column prop="resource_type" label="资源类型"></el-table-column>
                    <el-table-column prop="need_repair" label="是否需要修复">
                      <template #default="step">
                        {{step.row.need_repair ? '是' : '否'}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="status_display" label="当前状态"></el-table-column>
                    <el-table-column prop="expect_status_display" label="期望状态"></el-table-column>
                    <el-table-column prop="after_status_display" label="修复后状态"></el-table-column>
                    <el-table-column label="期望状态">
                      <template #default="step">
                        <el-select v-model="step.row.re_status" >
                          <el-option v-for="m in step.row.re_status_list" :label="m.status_display" :value="m.status">{{m.status_display}}</el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button type="primary" class="m-top10 m-bottom10" @click="setTasksStatus(scope.row.task_id)">修复业务层执行</el-button>
                  <div class="step-result">执行结果：{{step3_str}}</div>
                </li>
              </ul>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="task_id" label="任务ID"></el-table-column>
        <el-table-column prop="task_type" label="任务名称"></el-table-column>
        <el-table-column prop="cloud_id" label="资源ID"></el-table-column>
        <el-table-column prop="customer_id" label="客户ID"></el-table-column>
        <el-table-column prop="customer_name" label="客户名称"></el-table-column>
        <el-table-column prop="az_name" label="可用区"></el-table-column>
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
<!--        <el-table-column label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button type="text"-->
<!--              @click="retry(scope.row.task_id,scope.row.event_id)"-->
<!--            >重试</el-button>-->
<!--            <el-button type="text" @click="ignore(scope.row.task_id,scope.row.event_id)"-->
<!--            >忽略</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
  import Clipboard from "@/components/clipboard.vue";
  @Component({
    components:{
      ActionBlock,
      Clipboard,
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
    private step1_status:boolean = false
    private maintask:any = {}
    private maintaskList:any = []
    private subtasks:any = []
    private subtasks_step2:any = []
    private resources:any = []
    private re_parameters:any = ''
    private step3_str:string = ''
    private step2_str:string = ''
    private step2_progress:number = 0
    private step2_status:boolean = false
    private clear = null;
    private step2_mainTaskStatus:boolean = false

    created() {
      this.get_az_list();
      this.getFilterList()
      this.fn_search()
    }
    private async get_az_list(){
      this.search.az_id.list=[]
    let res:any=await EcsService.get_region_az_list({})
        if(res.code==="Success"){
            res.data.forEach(item=>{
                item.region_list.forEach(inn=>{
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
      const res:any = await service.get_repair_event_list({
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
        this.event_list = this.event_list.map(e => {
          return Object.assign({}, e, {isExpand: false})
        })


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
    private async getUnderlyingTasksInfo (task_id,loading:boolean = true,status) {
      if (!loading) {
        this.$store.commit('SET_LOADING', false);
        // this.step2_mainTaskStatus = status
      }
      let res:any = await service.getUnderlyingTasks({
        task_id
      })
      this.step1_status = true
      if(res.code==='Success'){
        this.maintask = res.data.maintask
        this.maintaskList = [res.data.maintask]
        this.subtasks = res.data.subtasks
        this.step2_progress = res.data.process
        this.step2_mainTaskStatus = status
        this.subtasks_step2 = res.data.subtasks.map(e => {
          return Object.assign({}, e,{
            re_parameters: '',
            isCheck: e.status === 'failed'
          })
        })
      }
      this.getResourceStatusInfo(task_id,loading)
      if(this.maintask.status !== 'doing'){
        if (this.clear) {
          this.FnClearTimer();
        }
      }

    }
    // 获取任务资源类型的状态列表
    private async getResourceStatusInfo (task_id,loading:boolean = true) {
      console.log('11111'+loading)
      if (!loading) {
        this.$store.commit('SET_LOADING', false);
      }
      if (!loading) {
        await Promise.all([
          service.getResourceStatus(),
          service.getTasksStatus({task_id})
        ]).then(([res, taskList]) => {
          if (res.code === 'Success' && taskList.code === 'Success') {
            this.resources = taskList.data.resource_detail.map(e => {
              const list = res.data[e.resource_type];
              return Object.assign({}, e, {
                re_status: list[0].status,
                re_status_list: list
              });
            });
          }
        });
      } else {
        let res = await service.getResourceStatus();
        let taskList = await service.getTasksStatus({ task_id });

        if (res.code === 'Success' && taskList.code === 'Success') {
          this.resources = taskList.data.resource_detail.map(e => {
            const list = res.data[e.resource_type];
            return Object.assign({}, e, {
              re_status: list[0].status,
              re_status_list: list
            });
          });
        }
      }
      // let res:any = await service.getResourceStatus()
      // let taskList:any = await service.getTasksStatus({
      //   task_id
      // })
      // if(res.code==='Success' && taskList.code === 'Success'){
      //   this.resources = taskList.data.resource_detail.map(e => {
      //     const list = res.data[e.resource_type]
      //     return Object.assign({}, e,{
      //       re_status: list[0].status,
      //       re_status_list: list
      //     })
      //   })
      // }
    }
    // step3的执行
    private async setTasksStatus (task_id) {
      let repairResources:any = this.resources.map(e => {
        return {
          resource_id: e.resource_id,
          resource_type: e.resource_type,
          expect_status: e.re_status,
        }
      })
      let res:any = await service.setTasksStatus({
        task_id: task_id,
        repair_resource: repairResources
      })
      if(res.code==='Success'){
        const data = res.data.repair_list
        this.resources = this.resources.map(e => {
          return Object.assign({}, e, {
            after_status: data[e.resource_id].status,
            after_status_display: data[e.resource_id].status_display
          })
        })
        this.step3_str=res.data.repair_detail
      }
    }
    // step2的执行
    private async setReTasks (task_id) {
      this.step2_status = true
      this.$store.commit('SET_LOADING', false);
      let subtasks:any = this.subtasks_step2.filter(e => e.status === 'failed').map(e => {
        return {
          failedSubExecFlag: e.isCheck ? 1 : 0,
          subtaskId: e.subtaskId,
          parameters: e.re_parameters
        }
      })
      let res:any = await service.setReTasks({
        task_id: task_id,
        global_context: this.re_parameters !== '' ? this.re_parameters : undefined,
        subtasks: subtasks
      })
      if(res.code==='Success'){
        this.$message.success(res.message);
        // this.step2_str = res.data.result_str
        this.FnSetTimer(task_id);
      }
    }

    private FnSetTimer(task_id) {
      if (this.clear) {
        this.FnClearTimer();
      }
      this.clear = setInterval(()=>{
        this.getUnderlyingTasksInfo(task_id, false,true);
      },5000);
    }
    private FnClearTimer() {
      if (this.clear) {
        clearInterval(this.clear);
      }
    }

    private rowClick (row) {
      this.event_list.forEach(e => {
        if (row.task_id !== e.task_id) {
          (this.$refs['evenTable'] as any).toggleRowExpansion(e, false)
          // this.$refs.evenTable.toggleRowExpansion(e, false)
          e.isExpand = false
        } else {
          if (row.isExpand) {
            e.isExpand = false
          } else {
            e.isExpand = true
          }
          (this.$refs['evenTable'] as any).toggleRowExpansion(e, e.isExpand)
        }
      })
      this.clearTask()
    }
    private clearTask () {
      this.step1_status = false
      this.maintask = {}
      this.maintaskList = []
      this.subtasks = []
      this.subtasks_step2 = []
      this.resources = []
      this.re_parameters = ''
    }

  }
  </script>
  <style lang="scss">
    .step{
      display: flex; align-items: center
    }
    .step-result{
      color: forestgreen;
    }
    .eventTextarea .el-textarea__inner{
      height:150px !important;
    }
  </style>
