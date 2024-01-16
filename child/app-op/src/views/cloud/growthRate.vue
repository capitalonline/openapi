<template>
  <div class="growth-box">
    <el-dialog :visible.sync="syncVisible" @close="FnClose">
      <el-table :data="list" border>
      <el-table-column prop="date_truncated" label="日期"></el-table-column>
      <el-table-column prop="can_sell_amount" label="可售容量"></el-table-column>
      <el-table-column prop="add_amount" label="较前一日增长量"></el-table-column>
    </el-table>
      <el-pagination
          @size-change="pool_add_rate()"
          @current-change="pool_add_rate()"
          :current-page.sync="page_info.page_index"
          :page-sizes="page_info.page_sizes"
          :page-size.sync="page_info.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page_info.total"
      >
      </el-pagination>
  </el-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, PropSync, Vue, Watch} from "vue-property-decorator";
import Service from "@/https/blockStorage/list";
@Component({})

export default class GrowthRate extends Vue{
  @PropSync('visible', {type: Boolean}) syncVisible!: boolean;
  @Prop({default:''}) pool_id!:string;
  @Prop({default:''}) az_id!:string
  private list:any =[]
  private page_info = {
    page_sizes: [20, 50, 100],
    page_size: 20,
    page_index: 1,
    total: 0,
  };
  private async pool_add_rate(){
    let res:any = await Service.search_pool_add_rate({
      page_index: this.page_info.page_index,
      page_size: this.page_info.page_size,
      az_id:this.az_id,
      pool_id:this.pool_id
    })
    if(res.code === 'Success'){
      this.list = res.data.pool_add_info
      this.page_info.total = res.data.page_info.count
    }
  }
  private FnClose(){
    this.syncVisible = false;
  }
  @Watch('visible')
  private FnChangeVisible(newVal) {
    if (newVal) {
      this.pool_add_rate()
    }
  }

}
</script>

<style lang="scss">
.growth-box {
  .el-dialog__body,.el-dialog__header {
    background: none !important;

    .el-dialog__headerbtn .el-dialog__close {
      color: #4359C0;
      font-size: 16px;
      font-weight: bold;
    }
  }
}


</style>