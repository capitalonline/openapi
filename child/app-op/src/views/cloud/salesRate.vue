<template>
  <div>
    <div class="explain">
      <el-form :model="salesForm" :inline="true" label-width="100px" label-position="left">
        <el-form-item  label="节点:">
          <el-select v-model="salesForm.az_id"  @change="az_idChange">
            <el-option v-for="(item, index) in az_list" :key="index" :label="item.az_name" :value="item.az_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary">刷新</el-button>
        </el-form-item>
      </el-form>
      <div>说明：当使用率或售卖率超过阈值时，块存储将自动禁售。</div>
      <span class="detail">名词释义</span>
      <div>使用率：使用率阈值通常建议不超过75%，使用率过高可能会出现<span class="error">数据丢失，平台瘫痪</span>的风险。</div>
      <div>售卖率：售卖率阈值通常建议不超过130%，售卖率过高可能会出现块存储资源池突然备占满的情况，存在<span class="error">数据丢失、平台瘫痪</span>的风险。</div>
    </div>
    <el-table
      :data="list"
      border
    >
      <el-table-column prop="pool_name" label="name" width="130"></el-table-column>
      <el-table-column prop="total_amount" label="总可用容量"></el-table-column>
      <el-table-column prop="used_amount" label="已用容量"></el-table-column>
      <el-table-column prop="can_sell_total_amount" label="可售总容量"></el-table-column>
      <el-table-column prop="sold_amount" label="已售容量"></el-table-column>
      <el-table-column prop="surplus_can_sell_amount" label="剩余可售"></el-table-column>
      <el-table-column prop="event_id" label="30天增长率">
        <template slot-scope="scope">
          <el-button type="text" @click="FnGetGrowth(scope.row.pool_id)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="actual_use_rate" label="实际使用率"></el-table-column>
      <el-table-column prop="actual_sell_rate" label="实际售卖率"></el-table-column>
      <el-table-column prop="use_rate_threshold" label="使用率阈值"></el-table-column>
      <el-table-column prop="sell_rate_threshold" label="售卖率阈值"></el-table-column>
      <el-table-column prop="status" label="当前状态">
        <template slot-scope="scope">
         <span class="error" v-if="scope.row.status === 0">已禁售</span>
          <span v-else>正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="event_id" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button type="text" @click="handle_pool_info(scope.row,'set_rate_threshold')" :disabled="!operate_auth.includes('set_threshold')">设置阈值</el-button>
          <el-button type="text" @click="handle_pool_info(scope.row,'cancel_forbid_sell')" v-if="scope.row.status===0" :disabled="!operate_auth.includes('cancel_forbid_sale')">取消禁售</el-button>
          <el-button type="text" @click="handle_pool_info(scope.row,'forbid_sell')" v-else :disabled="!operate_auth.includes('forbid_sale')">禁售</el-button>
        </template>
      </el-table-column>
    </el-table>
    <growth-rate :visible.sync="show_growth_rate" :pool_id=pool_id></growth-rate>
    <threshold :visible.sync="show_threshold" :row="threshold_info"></threshold>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import httpService from "@/https/az/list";
import Service from "@/https/blockStorage/list";
import GrowthRate from "@/views/cloud/growthRate.vue";
import Threshold from "@/views/cloud/threshold.vue";
@Component({
  components: {Threshold, GrowthRate}
})

export default class salesRate extends Vue {
  private list:any = [{pool_name:'POD219-POOL01',total_amount:'100TB',sold_amount:'90TB',actual_use_rate:'78%',status:1,actual_sell_rate:'90%',use_rate_threshold:'75%',sell_rate_threshold:'130%'},{event_id:'1111',status:0}]
  private operate_auth = [];
  private az_list = []
  private pool_id = ''
  private threshold_info = {}
  private show_growth_rate:boolean = false
  private show_threshold:boolean = false
  private salesForm: any = {
    az_id: ''
  }
   created() {
    this.get_az_list()
    this.operate_auth = this.$store.state.auth_info[this.$route.name];
  }
  private az_idChange(){

  }
  private async handle_pool_info(row,type){
    if(type === 'set_rate_threshold') {
      this.show_threshold = true
      this.threshold_info = row
    } else {
      let res:any = await Service.handle_pool_info({
        pool_id:row.pool_id,
        op_type:type
      })
      if(res.code === 'Success'){
       this.$message.success(res.message)
      }
    }
  }
  private async get_pool_info(){
    let res:any = await Service.get_pool_info({
      az_id:this.salesForm.az_id
    })
    if(res.code === 'Success'){
      this.list = res.data.pool_info
    }
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
            this.salesForm.az_id = this.az_list[0].az_id
          })
        }
        this.get_pool_info()
      }
    })
  }
  private FnGetGrowth(id){
    this.show_growth_rate = true
    this.pool_id = id
  }
}
</script>

<style scoped lang="scss">
.explain{
  padding: 20px;
  background: #f2f2f2;
  border: 1px solid #e7e7e7;
  margin-bottom: 20px;
  font-size: 14px;
  div {
    font-weight: 600;
  }
  .detail {
    display: block;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  .error{
    color:red
  }
}


</style>
