<template>
  <div class="m-bottom20">
    <div class="action-box">
      <el-form :model="echartForm" :inline="true" label-width="100px" label-position="right">
        <el-form-item label="节点:">
          <el-select v-model="echartForm.az_id" @change="podChange">
            <!-- <el-option label="全部" value=""></el-option> -->
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
        chart_id="cloud_inventory"
        :data="cloud_inventory_used"
        class="item"
      ></line-echart>
    </div>
    <div class="action-box">
      <el-form :model="cloudForm" :inline="true" label-width="100px" label-position="right">
        <el-form-item label="节点:">
          <el-select v-model="cloudForm.az_id"  @change="az_idChange">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item, index) in az_list" :key="index" :label="item.az_name" :value="item.az_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchList" type="primary">刷新</el-button>
          <el-button @click="exportList" type="primary">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="cloudList" border>
      <el-table-column prop="az_name" label="节点"></el-table-column>
      <el-table-column prop="total_size" label="总体可售容量(TB)"></el-table-column>
      <el-table-column prop="sold_size" label="已售容量(TB)"></el-table-column>
      <el-table-column prop="available_size" label="剩余可售容量(TB)"></el-table-column>
      <el-table-column prop="sale_rate" label="售出百分比(%)"></el-table-column>
      <el-table-column prop="update_time" label="更新时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" :disabled="!authList.includes('available_sale_size')" @click="editNum(scope.row)">编辑</el-button>  
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
    <el-dialog
      title="编辑云盘可售总量"
      :visible.sync="dialogVisible"
      width:="450px"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form :data="saleForm">
        <el-form-item>
          节点：{{ cur_pod }}
        </el-form-item>
        <el-form-item>
          当前总容量：{{ totalNum }}TB
        </el-form-item>
        <el-form-item :label="'调整后总容量：'">
          <el-input-number
            :controls="false" 
            style="width: 282px" 
            v-model="saleForm.TotalSize"
            :min="0"
            :precision="2"></el-input-number>TB
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="saleNumChangeCancel">取消</el-button>
        <el-button type="primary" @click="saleNumChange">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LineEchart from '@/components/chart/list.vue';
import Service from '../../https/cloudInventory/list';
import httpService from '../../https/az/list';
@Component({
  components: {
    LineEchart
  }
})
export default class Inventory extends Vue {
  private dialogVisible = false
  private cur_pod = ''
  private cur_az_id = ''
  private totalNum = null
  private az_list = []
  private authList:any=[]
  private echartForm: any = {
    az_id: '',
    create_time: '',
    end_time: ''
  }
  private cloudForm: any = {
    az_id: ''
  }
  private saleForm: any = {
    TotalSize: null
  }
  private pageInfo:any={
      page_index:1,
      page_size:20,
      total:0,
  }
  private cloud_inventory_used = {
    title: '云盘库存',
    unit: '',
    xTime: [],
    yValue: [],
    legend: [],
    resize: 0
  }
  private cloudList: any = []
  private timeList: any = [new Date(), new Date()]

  async created() {
    await this.getCurentTime()
    await this.get_az_list()
    this.searchList()
    this.authList = this.$store.state.auth_info[this.$route.name];
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
  private getCurentTime() {
    let start = new Date()
    let end = new Date()

    this.timeList = [this.dateFormat("yyyy-MM-dd hh:mm:ss", start, 7), this.dateFormat("yyyy-MM-dd hh:mm:ss", end, 0)]
    this.echartForm.create_time = this.dateFormat("yyyy-MM-dd hh:mm:ss", start, 7)
    this.echartForm.end_time = this.dateFormat("yyyy-MM-dd hh:mm:ss", end, 0)
  }
  private timeChange(val) {
    this.echartForm.create_time = val[0]
    this.echartForm.end_time = val[1]
    this.monitoringSearch()
  }
  private handleCurrentChange(cur){
      this.pageInfo.page_index = cur;
      this.searchList()
  }
  private handleSizeChange(size){
      this.pageInfo.page_size = size;
      this.searchList()
  }
  private az_idChange(val) {
    this.searchList()
  }
  private searchList() {
    let params = {
      az_id: this.cloudForm.az_id,
      page_index:this.pageInfo.page_index,
      page_size:this.pageInfo.page_size,
    }
    Service.get_disk_inventory(params).then(res => {
      if(res.code === 'Success') {
        this.cloudList = res.data.result
        this.pageInfo.page_index = res.data.page_info.cur_page
        this.pageInfo.total = res.data.page_info.count
      }
    })
  }
  private exportList() {
    window.location.href = `/ecs_business/v1/stock/disk_inventory_download/?az_id=${this.cloudForm.az_id}`
  }
  private podChange(val) {
    this.monitoringSearch()
  }
  private monitoringSearch() {
    let params = {
      ...this.echartForm
    }
    Service.get_disk_inventory_monitor(params).then(res => {
      if(res.code === 'Success') {
        this.cloud_inventory_used.xTime = res.data.x_time
        this.cloud_inventory_used.yValue = [res.data.total_size,res.data.sold_size]
        this.cloud_inventory_used.legend = ['总体可售容量', '已售容量']
        this.cloud_inventory_used.unit = 'TB'
        this.cloud_inventory_used.resize++
      } else {
        this.cloud_inventory_used = {
          title: '云盘库存',
          unit: '',
          xTime: [],
          yValue: [],
          legend: [],
          resize: 0
        }
      }
      
    })
  }
  private editNum(row) {
    this.cur_pod = row.az_name
    this.cur_az_id = row.az_id
    this.totalNum = row.total_size
    this.dialogVisible = true
  }
  private saleNumChange() {
    let params = {
      az_id: this.cur_az_id,
      total_size: this.saleForm.TotalSize
    }
    Service.set_available_sale_size(params).then(res => {
      if(res.code === 'Success') {
        this.$message.success(res.message)
        this.saleNumChangeCancel()
        this.searchList()
      }
    })
  }
  private saleNumChangeCancel() {
    this.cur_pod = ''
    this.totalNum = null
    this.saleForm.TotalSize = null
    this.dialogVisible = false
  }
  private get_az_list() {
    let params = {
      region_name: '',
      az_name: '',
      page_index: 1,
      page_size: 200
    }
    httpService.get_az_list(params).then(res => {
      if(res.code === 'Success') {
        if(res.data.az_list.length > 0) {
          res.data.az_list.map(item => {
            if(item.status !== 'global_close') {
              this.az_list.push({
                az_id: item.az_id,
                az_name: item.az_name
              })
            }
          })
        }
        this.echartForm.az_id = this.az_list[0].az_id
        this.monitoringSearch()
      }
    })
  }
  
}
</script>
<style lang="scss" scoped>
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