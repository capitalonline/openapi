<template>
  <div class="m-bottom20">
    <div class="action-box">
      <el-form :model="echartForm" :inline="true" label-width="100px" label-position="right">
        <el-form-item label="节点:">
          <el-select v-model="echartForm.az_id" @change="podChange">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item, index) in az_list" :key="index" :label="item.az_name" :value="item.az_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始日期:">
          <el-date-picker
            @change="createTimeChange"
            v-model="echartForm.create_time"
            type="date"
            placeholder="选择起始日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期:">
          <el-date-picker
            @change="endTimeChange"
            v-model="echartForm.end_time"
            type="date"
            placeholder="选择结束日期"
          ></el-date-picker>
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
      <el-table-column prop="PodName" label="节点"></el-table-column>
      <el-table-column prop="TotalSize" label="总体可售容量(TB)"></el-table-column>
      <el-table-column prop="SoldSize" label="已售容量(TB)"></el-table-column>
      <el-table-column prop="AvailableSize" label="剩余可售容量(TB)"></el-table-column>
      <el-table-column prop="SaleRate" label="售出百分比(%)"></el-table-column>
      <el-table-column prop="PodName" label="更新时间"></el-table-column>
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
import httpService from '../../https/statistical/list';
import { relativeTimeThreshold } from 'moment';
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
  private az_list = {}
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
    resize: 0
  }
  private cloudList: any = [{
    PodName: '张三'
  }]

  created() {
    this.searchList()
    this.get_az_list()
    this.authList = this.$store.state.auth_info[this.$route.name];
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
        this.pageInfo.count = res.data.page_info.total
      }
    })
  }
  private exportList() {
    let params = {
      az_id: this.cloudForm.az_id
    }
    Service.disk_inventory_download(params).then(res => {
      if(res.code === "Success") {

      }
    })
  }
  private podChange(val) {
    this.monitoringSearch()
  }
  private createTimeChange(val) {
    this.monitoringSearch()
  }
  private endTimeChange(val) {
    this.monitoringSearch()
  }
  private monitoringSearch() {
    let params = {
      ...this.echartForm
    }
    Service.get_disk_inventory_monitor(params).then(res => {
      if(res.code === 'Success') {
      }
    })
  }
  private editNum(row) {
    this.cur_pod = row.PodName
    this.cur_az_id = row.az_id
    this.totalNum = row.TotalSize
    this.dialogVisible = true
  }
  private saleNumChange() {
    let params = {
      az_id: this.cur_az_id,
      TotalSize: this.saleForm.TotalSize
    }
    Service.set_available_sale_size(params).then(res => {
      if(res.code === 'Success') {
        this.$message.success(res.message)
        this.saleNumChangeCancel()
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
    httpService.get_az_list({}).then(res => {
      if(res.code === 'Success') {
        this.az_list = res.data.az_list
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
</style>