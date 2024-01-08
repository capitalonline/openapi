<template>
  <div class="growth-box">
    <el-dialog :visible.sync="syncVisible" @close="FnClose">
      <el-table :data="list" border>
      <el-table-column label="日期"></el-table-column>
      <el-table-column label="可售容量"></el-table-column>
      <el-table-column label="较前一日增长量"></el-table-column>
    </el-table>
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
  private list:any =[]
  private async pool_add_rate(){
    let res:any = await Service.search_pool_add_rate({
      pool_id:this.pool_id
    })
    if(res.code === 'Success'){
      this.list = res.data.pool_add_info
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