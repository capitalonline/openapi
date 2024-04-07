<template>
  <div>
    <action-block :search_option="search_dom" @fn-search="search"></action-block>
    <el-table
      :data="disk_record"
      border
    >
      <el-table-column prop="customer_id" label="操作时间"></el-table-column>
      <el-table-column prop="customer_id" label="操作人"></el-table-column>
      <el-table-column prop="customer_id" label="操作类型"></el-table-column>
      <el-table-column prop="customer_id" label="对应任务ID"></el-table-column>
      <el-table-column prop="customer_id" label="客户ID"></el-table-column>
      <el-table-column prop="customer_id" label="客户名称"></el-table-column>
      <el-table-column prop="customer_id" label="云盘ID"></el-table-column>
      <el-table-column prop="customer_id" label="云盘名称"></el-table-column>
      <el-table-column prop="customer_id" label="云盘状态"></el-table-column>
      <el-table-column prop="customer_id" label="修改前IOPS"></el-table-column>
      <el-table-column prop="customer_id" label="修改后IOPS"></el-table-column>
      <el-table-column prop="customer_id" label="修改前吞吐量"></el-table-column>
      <el-table-column prop="customer_id" label="修改后吞吐量"></el-table-column>
      <el-table-column prop="customer_id" label="修改原因"></el-table-column>
      <el-table-column prop="customer_id" label="地域-可用区"></el-table-column>
      <el-table-column prop="customer_id" label="属性"></el-table-column>
      <el-table-column prop="customer_id" label="实例ID/名称"></el-table-column>
      <el-table-column prop="customer_id" label="dev_id"></el-table-column>
      <el-table-column prop="customer_id" label="dev_name"></el-table-column>
      <el-table-column prop="customer_id" label="集群名称"></el-table-column>
      <el-table-column prop="customer_id" label="存储池名称"></el-table-column>
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
import {Component, Vue} from "vue-property-decorator";
import ActionBlock from '../../components/search/actionBlock.vue';
@Component({
  components: {
    ActionBlock,
  }
})

export default class DiskRecord extends Vue{
  private disk_record:any=[]
  private current:number = 1;
  private size:number=20;
  private total:number = 0;
  private search_dom = {
    disk_id:{placeholder:'请输入云盘ID'},
    ecs_id:{placeholder:'请输入实例ID'},
    customer_id:{placeholder:'请输入客户ID'},
    customer_name: {placeholder:'请输入客户名称'},
  }
  private handleSizeChange(size){
    this.size = size
    this.getRecordList()
  }
  private handleCurrentChange(cur){
    this.current = cur
    this.getRecordList()
  }
  private getRecordList(){

  }
}
</script>

<style scoped>

</style>
