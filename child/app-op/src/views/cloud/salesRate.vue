<template>
  <div>
    <div class="explain">
      <el-form :model="salesForm" :inline="true" label-width="100px" label-position="left">
        <el-form-item  label="节点:">
          <el-select v-model="salesForm.az_id"  @change="az_idChange">
            <el-option v-for="(item, index) in az_list" :key="index" :label="item.az_name" :value="item.az_id"></el-option>
          </el-select>
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
      <el-table-column prop="status" width="110">
        <template slot="header" slot-scope="scope">
          <span class="m-right10">当前状态</span>
          <el-button type="text" @click="get_pool_info">刷新</el-button>
        </template>
        <template slot-scope="scope">
          <el-tooltip
              v-if="scope.row.status === 'BANNED'"
              :content="scope.row.message"
              popper-class="tooltip-width"
              placement="top"
              effect="light">
            <span class="error">已禁售</span>
          </el-tooltip>
          <span v-else>正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="event_id" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button type="text" @click="handle_pool_info(scope.row,'set_rate_threshold')" :disabled="!operate_auth.includes('set_threshold')">设置阈值</el-button>
          <el-button type="text" @click="handle_pool_info(scope.row,'cancel_forbid_sell')" v-if="scope.row.status==='BANNED'" :disabled="!operate_auth.includes('cancel_forbid_sale')">取消禁售</el-button>
          <el-button type="text" @click="handle_pool_info(scope.row,'forbid_sell')" v-else :disabled="!operate_auth.includes('forbid_sale')">禁售</el-button>
        </template>
      </el-table-column>
    </el-table>
    <growth-rate :visible.sync="show_growth_rate" :pool_id=pool_id :az_id="salesForm.az_id"></growth-rate>
    <threshold :visible.sync="show_threshold" :row="threshold_info" :az_id="salesForm.az_id" @fn-refresh="get_pool_info"></threshold>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import httpService from "@/https/az/list";
import Service from "@/https/blockStorage/list";
import GrowthRate from "@/views/cloud/growthRate.vue";
import Threshold from "@/views/cloud/threshold.vue";
import item from "@/components/params/item.vue";
@Component({
  components: {Threshold, GrowthRate}
})

export default class salesRate extends Vue {
  private list:any = []
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
    } else if(type === 'forbid_sell') {
      //禁售提示信息根据操作禁售的POOL是否是该可用区唯一正常售卖的POOL
      let readyCount = this.list.filter(item=>item.status === 'READY').length
      let sell_status = {}
      let content = ''
      this.list.forEach(item=>{
        if(item.pool_id !== row.pool_id) {
          let status = item.status === 'READY' ? '正常' : '已禁售'
          sell_status[item.pool_name] = status
        }
      })
      if(Object.keys(sell_status).length>0) {
         content += `<div>此集群的其他POOL状态</div><ul>`
      }
      for(let pool_name in sell_status){
        content += `<ol>${pool_name}: ${sell_status[pool_name]}</ol>`;
      }
      content += readyCount === 1 ? `</ul><div style="margin-top: 10px">您将禁售的是${row.pool_name},<br>此POOL禁售后，将会导致整个集群云盘禁售，<span style="color: red">无法开通计算实例</span>，是否确认操作？</div>` :`</ul><div>您将禁售的是${row.pool_name},<br>禁售后，此可用区将无法调度${row.pool_name}的存储资源，是否确认操作？</div>`
      this.$confirm(content, '禁售设置', {
        confirmButtonText: '确认',
        dangerouslyUseHTMLString: true,
      }).then(async() => {
        let res: any = await Service.handle_pool_info({
          az_id: this.salesForm.az_id,
          pool_id: row.pool_id,
          op_type: type
        });
        if (res && res.code === 'Success') {
          this.$message.success(res.message);
          this.get_pool_info();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁售设置'
        });
      });
    }else {
      let use_rate_threshold = parseFloat(row.use_rate_threshold)
      let actual_use_rate = parseFloat(row.actual_use_rate)
      let sell_rate_threshold = parseFloat(row.sell_rate_threshold)
      let actual_sell_rate = parseFloat(row.actual_sell_rate)
      if (use_rate_threshold > actual_use_rate && sell_rate_threshold > actual_sell_rate) {
        let res: any = await Service.handle_pool_info({
          az_id: this.salesForm.az_id,
          pool_id: row.pool_id,
          op_type: type
        })
        if (res.code === 'Success') {
          this.$message.success(res.message)
          this.get_pool_info()
        }
      } else {
        let reasons = [];
        if (use_rate_threshold <= actual_use_rate) {
          reasons.push('实际使用率超过使用率阈值');
        }
        if (sell_rate_threshold <= actual_sell_rate) {
          reasons.push('实际售卖率超过售卖率阈值');
        }
        this.$message.error( reasons.join('、')+ '，不支持取消禁售');
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
