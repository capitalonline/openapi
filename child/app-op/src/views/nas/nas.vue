<template>
  <div class="m-bottom20">
    <div class="action-box">
      <el-form :model="echartForm" :inline="true" label-width="100px" label-position="right">
        <el-form-item label="节点:">
          <el-select v-model="echartForm.az_id" @change="podChange">
            <el-option v-for="(item, index) in az_list" :key="index" :label="item.az_name" :value="item.az_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
              class="date-picker"
              v-model="timeList"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="timeChange">

          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="m-bottom20">
      <line-echart
          chart_id="nas_chart"
          :data="nas_chart"
          class="item"
      ></line-echart>
    </div>

    <div class="action-box">
      <el-form :model="tableForm" :inline="true" label-width="100px" label-position="right">
        <el-form-item label="节点:">
          <el-select v-model="tableForm.az_id"  @change="az_idChange">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item, index) in az_list" :key="index" :label="item.az_name" :value="item.az_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="FnGetList" type="primary">刷新</el-button>
        </el-form-item>
      </el-form>
    </div>
      <el-table
          :data="list"
          border>
        <el-table-column prop="name" label="节点"></el-table-column>
        <el-table-column prop="total" label="总体可售容量(TB)"></el-table-column>
        <el-table-column prop="used" label="已售容量(TB)"></el-table-column>
        <el-table-column prop="surplus" label="剩余可售容量(TB)"></el-table-column>
        <el-table-column prop="utilization_rate" label="售出百分比(%)"></el-table-column>
        <el-table-column prop="create_time" label="更新时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="FnUpdate(scope.row)" :disabled="!operate_auth.includes('update')">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.page_index"
          :page-sizes="[20, 50, 100]"
          :page-size="pageInfo.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total">
      </el-pagination>
    <edit
        :visible="visible"
        :data_info="data_info"
        @close="closeUpdate"
    ></edit>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import Service from "@/https/nas/list";
import Edit from "@/views/nas/edit.vue";
import LineEchart from '../../components/chart/list.vue';
import httpService from "@/https/az/list";
@Component({
  components:{
    Edit,
    LineEchart
  }
})
export default class NasInventory extends Vue{
  private list:Array = [{az_name:'呼和浩特'}]
  private operate_auth = []
  private visible:boolean = false
  private data_info ={}
  private az_list = [{az_id:'09a38804-c1ee-11ec-bd22-4641dfd57315',az_name:'宿迁B'},{az_id:'e5aa47be-da46-11ec-bad2-defff767b3b5',az_name: '呼和浩特B'}]
  private timeList: any = [new Date(), new Date()]
  private echartForm: any = {
    az_id: '',
    create_time: '',
    end_time: ''
  }
  private tableForm: any = {
    az_id: ''
  }
  private pageInfo:any={
    page_index:1,
    page_size:20,
    total:0,
  }
  private nas_chart = {
    title: 'NAS库存',
    unit: '',
    xTime: [],
    yValue: [],
    legend: [],
    resize: 0
  }
  @Watch('visible')
  private watch_vis(n){
    if(!n){
      this.FnGetList()
    }
  }

  async created() {
    await this.getCurrentTime()
    await this.get_az_list()
    await this.FnGetList()
    this.operate_auth = this.$store.state.auth_info[this.$route.name];
  }
  private timeChange(val) {
    this.echartForm.create_time = val[0]
    this.echartForm.end_time = val[1]
    if(this.echartForm.az_id){
      this.FnPostLine()
    }
  }
  private FnUpdate(row){
    this.visible = true;
    this.data_info = row
  }
  private closeUpdate() {
    this.visible = false;
  }
  private podChange(val) {
    this.FnPostLine()
  }
  private az_idChange(val) {
    this.FnGetList()
  }
  private handleCurrentChange(cur){
    this.pageInfo.page_index = cur;
    this.FnGetList()
  }
  private handleSizeChange(size){
    this.pageInfo.page_size = size;
    this.FnGetList()
  }
  private async FnGetList(){
    let res:any = await Service.get_nas_inventory({
      az_id:this.tableForm.az_id,
      page_index:this.pageInfo.page_index,
      page_size:this.pageInfo.page_size,
    })
    if(res.code === 'Success'){
      this.list = res.data.operation_log_list
      this.pageInfo.total = res.data.page_info.count
    }
  }
  private async FnPostLine(){
    let res:any = await Service.post_nas_line({
      az_id:this.echartForm.az_id,
      create_time_start:this.echartForm.create_time,
      create_time_end:this.echartForm.end_time
    })
    if(res.code === 'Success'){
      this.nas_chart.xTime = res.data.map(item => item.create_time);
      this.nas_chart.yValue = [
        res.data.map(item => item.total),
        res.data.map(item => item.used)
      ]
      this.nas_chart.legend = ['总体空间容量', '已售NAS容量']
      this.nas_chart.unit = 'TB'
      this.nas_chart.resize++
    } else {
      this.nas_chart = {
        title: '云盘库存',
        unit: '',
        xTime: [],
        yValue: [],
        legend: [],
        resize: 0
      }
    }

  }
  private async get_az_list() {
    let params = {
      region_name: '',
      az_name: '',
      page_index: 1,
      page_size: 200
    }
    const res:any = await httpService.get_az_list(params)
      if(res.code === 'Success') {
        if(res.data.az_list.length > 0) {
          this.az_list = res.data.az_list.filter(item => item.az_id === '09a38804-c1ee-11ec-bd22-4641dfd57315' || item.az_id === 'e5aa47be-da46-11ec-bad2-defff767b3b5')
              .map(item => ({ az_id: item.az_id, az_name: item.az_name }))
        }
      }
  }
  private dateFormat(format, date, day) {
    if (!format) return '';
    let curDate = new Date(date.getTime() - 24 * 60 * 60 * 1000 * day);
    let dateMap = {
      y: curDate.getFullYear(),
      M: curDate.getMonth() + 1,
      d: curDate.getDate(),
      h: curDate.getHours(),
      m: curDate.getMinutes(),
      s: curDate.getSeconds(),
      S: curDate.getMilliseconds()
    };
    return format.replace(/(y+)|(M+)|(d+)|(h+)|(m+)|(s+)|(S+)/g, (a) => this._add0(dateMap[a[0]], a.length))
  }
  private _add0(time, len) {
    time = time.toString();
    let l = time.length;
    return l < len ? '0'.repeat(len - l) + time : time;
  }
  private getCurrentTime() {
    let start = new Date()
    let end = new Date()

    this.timeList = [this.dateFormat("yyyy-MM-dd hh:mm:ss", start, 7), this.dateFormat("yyyy-MM-dd hh:mm:ss", end, 0)]
    this.echartForm.create_time = this.dateFormat("yyyy-MM-dd hh:mm:ss", start, 7)
    this.echartForm.end_time = this.dateFormat("yyyy-MM-dd hh:mm:ss", end, 0)
  }
}
</script>

<style scoped>
.action-box{
  padding: 20px;
  background: #f2f2f2;
  border: 1px solid #e7e7e7;
  margin-bottom: 20px;
}

.date-picker ::v-deep .el-range__icon,
.date-picker ::v-deep .el-range-separator {
  line-height: 24px !important;
}
</style>