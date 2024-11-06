<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import ActionBlock from "@/components/search/actionBlock.vue";
import TimeGroup from "@/components/search/timeGroup.vue";
import service from "@/https/event/list";
import ClusterService from '@/https/vmOp2/cluster/clusterItem/index'
import moment from 'moment';

@Component({
  components: {TimeGroup, ActionBlock}
})
export default class event extends Vue {
  private default_date_timer = [];
  private data_list:any = []
  private status_list:any = []
  private search_data:any = {};
  private filter_obj = null
  private type_list:any = [
    {type:'crash_cold_migrate',label:'宕机迁移'},
    {type:'gpu_recover',label:'GPU恢复'},
    {type:'gpu_ff',label:'GPU掉卡'},
  ]
  private search_option:any={
    event_concre:{placeholder:'请输入事件内容'},
    event_type:{placeholder:'请选择事件类型', list:this.type_list},
    customer_id:{placeholder:'请输入客户ID'},
    cloud_id:{placeholder:'请输入对象ID'},
  }
  private start_time: string = new Date(new Date().setDate(new Date().getDate() - 90)).toISOString().replace('Z', '+08:00');
  private timeList = {
    '6_hour': {label: '6小时', time: 1000 * 60 * 60 * 6},
    '12_hour': {label: '12小时', time: 1000 * 60 * 60 * 12},
    day: {label: '1天', time: 1000 * 60 * 60 * 24},
    '3_day': {label: '3天', time: 1000 * 60 * 60 * 24 * 3},
    week: {label: '7天', time: 1000 * 60 * 60* 24 * 7},
    '14_day': {label: '14天', time: 1000 * 60 * 60* 24 * 14},
    '30_day': {label: '30天', time: 1000 * 60 * 60* 24 * 30}
  }
  private page_info:any={
    current:1,
    size:20,
    total:0
  }
  created(){
    this.getFilterList()
  }
  private async getFilterList(){
    let res:any=await service.get_filter_list({
      filed_names:['event_status']
    })
    if(res.code==='Success'){
      for(let i in res.data.event_status){
        this.status_list.push({text:res.data.event_status[i],value:i})
      }
    }
  }
  private fn_search(data:any={}){
    this.search_data = {...data,...this.filter_obj}
    this.FnGetList()
  }
  private async FnGetList(){
    const {search_data:data}=this
    let reqData= {
      cluster_id:this.$route.params.id,
      page_index:this.page_info.current,
      page_size:this.page_info.size,
      status:data.status ? data.status[0] :undefined,
      customer_id:data.customer_id || "",
      task_type:data.event_type || "",
      cloud_id:data.cloud_id || "",
      event_content:data.event_concre || "",
      start_time:moment(this.default_date_timer[0]).format('YYYY-MM-DD HH:mm:ss'),
      end_time:moment(this.default_date_timer[1]).format('YYYY-MM-DD HH:mm:ss'),
    }
    let res:any=await ClusterService.get_cluster_task_list(reqData)
    if(res.code==='Success'){
      this.data_list = res.data.event_list
      this.page_info.total = res.data.page_info.count
    }
  }
  private FnGetTimer(timer) {
    this.default_date_timer = timer;
    this.fn_search(this.search_data)
  }
  private handleSizeChange(size){
    this.page_info.size = size
    this.fn_search(this.search_data)
  }
  private handleCurrentChange(cur){
    this.page_info.current = cur
    this.fn_search(this.search_data)
  }
  private filterAttribute(obj:any){
    this.filter_obj = {...this.filter_obj,...obj}
    this.fn_search(this.search_data)
  }
}
</script>

<template>
  <div class="app-container">
      <action-block :search_option="search_option" @fn-search="fn_search" class="m-bottom10">
        <time-group
          :start_time="start_time"
          :timeList="timeList"
          default_timer="30_day"
          @fn-emit="FnGetTimer"
          >
        </time-group>
      </action-block>
      <div class="main-2">
        <el-table
          :data="data_list"
          ref="table"
          @filter-change="filterAttribute"
          height="100%">
          <el-table-column prop="task_type" label="任务名称"></el-table-column>
          <el-table-column prop="cloud_id" label="对象"></el-table-column>
          <el-table-column prop="customer_name" label="客户名称"></el-table-column>
          <el-table-column prop="customer_id" label="客户ID"></el-table-column>
          <el-table-column prop="status" label="状态" :filters="status_list" :filter-multiple="false" column-key="status" width="80px"></el-table-column>
          <el-table-column prop="event_content" label="详细信息">
            <template slot-scope="scope">
              <div v-if="Object.keys(scope.row.event_content).length > 0">
                <div v-for="(value, key) in scope.row.event_content" :key="key">
                  {{ key }}: {{ value }}
                </div>
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="开始时间"></el-table-column>
          <el-table-column prop="end_time" label="完成时间"></el-table-column>
        </el-table>
      </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page_info.current"
          :page-sizes="[20, 50, 100]"
          :page-size="page_info.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page_info.total">
        </el-pagination>

  </div>
</template>

<style scoped lang="scss">

</style>
