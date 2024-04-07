<template>
  <div>
    <action-block :search_option="search_dom" @fn-search="search">
       <template #default>
        <el-button type="primary" @click="setIops">IOPS修改</el-button>
         <el-button type="primary" @click="updateMbps">吞吐量修改</el-button>
      </template>
    </action-block>
    <el-table
      :data="disk_record"
      border
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="customer_id" label="客户ID"></el-table-column>
      <el-table-column prop="customer_id" label="客户名称"></el-table-column>
      <el-table-column prop="customer_id" label="云盘ID"></el-table-column>
      <el-table-column prop="customer_id" label="云盘名称"></el-table-column>
      <el-table-column prop="customer_id" label="云盘状态"></el-table-column>
      <el-table-column prop="customer_id" label="IOPS及吞吐"></el-table-column>
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
export default class DiskVolume extends Vue{
  private disk_record:any=[]
  private current:number = 1;
  private size:number=20;
  private total:number = 0;
  private search_dom = {
    customer_id:{placeholder:'请输入客户ID'},
    disk_id:{placeholder:'请输入云盘ID'},
    ecs_id:{placeholder:'请输入实例ID'},
    dev_id: {placeholder:'请输入dev_id'},
    dev_name: {placeholder:'请输入dev_name'},
    customer_name: {placeholder:'请输入集群名称'},
  }
  private setIops(){

  }
  private updateMbps(){

  }
  private handleSizeChange(size){
    this.size = size
    this.getDataList()
  }
  private handleCurrentChange(cur){
    this.current = cur
    this.getDataList()
  }
  private getDataList(){

  }
}
</script>

<style scoped>

</style>
