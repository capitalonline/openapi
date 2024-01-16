<template>
  <el-dialog :visible.sync="syncVisible" @close="FnClose" title="设置阈值" width="800px">
    <div class="tip">
      <div class="title">{{row['pool_name']}}阈值:</div>
      <div>使用率：使用率阈值通常建议不超过75%，使用率过高可能会出现<span class="error">数据丢失，平台瘫痪</span>的风险。</div>
      <div>售卖率：售卖率阈值通常建议不超过130%，售卖率过高可能会出现块存储资源池突然备占满的情况，存在<span class="error">数据丢失、平台瘫痪</span>的风险。</div>
    </div>
    <div>
      <table class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition" width="500px" height="70px" cellspacing="0">
        <thead>
        <tr>
          <th class="el-table_3_column_26 el-table__cell"><div></div></th>
          <th class="el-table_3_column_26 el-table__cell"><div class="title has-gutter">当前实际值</div></th>
          <th class="el-table_3_column_26 el-table__cell"><div class="title has-gutter">当前阈值</div></th>
        </tr>
        </thead>
        <tbody class="el-table__body-wrapper is-scrolling-none">
        <tr class="el-table__row">
          <td class="el-table_3_column_26 el-table__cell" style="width: 100px"><div class="title">使用率阈值</div></td>
          <td class="el-table_3_column_26 el-table__cell"><div class="cell el-tooltip" >{{actual_data.use_rate}}</div></td>
          <td class="el-table_3_column_26 el-table__cell" ><div class="cell el-tooltip" >{{threshold_data.use_rate}}</div></td>
        </tr>
        <tr class="el-table__row">
          <td class="el-table_3_column_26 el-table__cell"><div class="title">售卖率阈值</div></td>
          <td class="el-table_3_column_26 el-table__cell"><div class="cell el-tooltip" >{{actual_data.sell_rate}}</div></td>
          <td class="el-table_3_column_26 el-table__cell"><div class="cell el-tooltip">{{threshold_data.sell_rate}}</div></td>
        </tr>
        </tbody>
      </table>
    </div>
    <el-form :model="thresholdFrom"  label-width="120px" label-position="left" style="margin-top: 20px">
      <el-form-item label="使用率阈值：">
        <el-input
            style="width: 282px"
            size="small"
            v-model="thresholdFrom.use_rate_threshold"
            oninput="value= value.match(/\d+(\.\d{0,9})?/) ? value.match(/\d+(\.\d{0,9})?/)[0] : ''">
          <span slot="suffix">%</span>
        </el-input>
      </el-form-item>
      <el-form-item label="售卖率阈值：">
        <el-input
            style="width: 282px"
            size="small"
            v-model="thresholdFrom.sell_rate_threshold"
            oninput="value= value.match(/\d+(\.\d{0,9})?/) ? value.match(/\d+(\.\d{0,9})?/)[0] : ''">
          <span slot="suffix">%</span>
        </el-input>
      </el-form-item>
      <el-form-item label="剩余可售容量：">
          <span>{{row.status === 'BANNED' ? 0 : enable_sale + 'TB'}}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="FnConfirm" type="primary">确认</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import {Component, Emit, Prop, PropSync, Vue, Watch} from "vue-property-decorator";
import Service from "@/https/blockStorage/list";
@Component({})

export default class GrowthRate extends Vue{
  @PropSync('visible', {type: Boolean}) syncVisible!: boolean;
  @Prop({default: () => {
      return {}
    }}) row!: Object;
  @Prop({default:''}) az_id!:string
  private actual_data = {
    use_rate: '',
    sell_rate: '',
  }
  private threshold_data = {
    use_rate:'',
    sell_rate:'',
  }
  private thresholdFrom:any = {
    use_rate_threshold:'',
    sell_rate_threshold:''
  }
  private dataList:any = []
  private async FnConfirm(){
    let res:any = await Service.handle_pool_info({
      pool_name:this.row['pool_name'],
      az_id:this.az_id,
      pool_id:this.row['pool_id'],
      op_type:'set_rate_threshold',
      use_rate_threshold:this.thresholdFrom.use_rate_threshold/100,
      sell_rate_threshold:this.thresholdFrom.sell_rate_threshold/100
    })
    if(res.code === 'Success'){
      this.$message.success(res.message)
      this.FnClose()
      this.FnEmit()
    }
  }
  private FnClose(){
    this.syncVisible = false;
    this.thresholdFrom = {}
  }
  get enable_sale(){
    let sale_threshold:number = 0
    if(this.thresholdFrom.sell_rate_threshold) {
       sale_threshold = this.thresholdFrom.sell_rate_threshold/100 * Number(this.row['total_amount'].replace(/TB/g, '')) - Number(this.row['sold_amount'].replace(/TB/g, ''))
    }
    return Number(sale_threshold.toFixed(2))
  }
  @Emit('fn-refresh')
  public FnEmit(){}
  @Watch('syncVisible')
  private FnGetRow(newVal) {
    if (!newVal) {
      this.thresholdFrom = {}
      this.dataList = []
      return
    }
    this.actual_data.use_rate = this.row['actual_use_rate'];
    this.actual_data.sell_rate = this.row['actual_sell_rate']
    this.threshold_data.use_rate = this.row['use_rate_threshold'];
    this.threshold_data.sell_rate = this.row['sell_rate_threshold'];
    this.dataList = [this.actual_data,this.threshold_data]
  }

}
</script>

<style scoped lang="scss">
.tip{
  font-weight: bold;
  margin-bottom: 20px;
  .title{
    margin-bottom: 10px;
    padding-left: 15px;
  }
  .error{
    color:red
  }
}
.dialog-footer{
  text-align: right !important;
  margin-top: 10px !important;
  padding-top: 20px;
}
.title{
  padding: 5px;
}
</style>