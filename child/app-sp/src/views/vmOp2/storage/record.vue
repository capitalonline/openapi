<template>
  <div>
    <action-block :search_option="search_dom" @fn-search="search"></action-block>
    <el-table
      :data="disk_record"
      border
    >
      <el-table-column prop="create_time" label="操作时间"></el-table-column>
      <el-table-column prop="op_user" label="操作人"></el-table-column>
      <el-table-column prop="operation_type" label="操作类型" min-width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.operation_type==="change_iops" ? `修改云盘IOPS` : '修改云盘吞吐量'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customer_id" label="客户ID"></el-table-column>
      <el-table-column prop="customer_name" label="客户名称"></el-table-column>
      <el-table-column prop="disk_id" label="云盘ID"></el-table-column>
      <el-table-column prop="disk_name" label="云盘名称"></el-table-column>
      <el-table-column prop="status_name" label="云盘状态">
        <template slot-scope="scope">
          <span :class="scope.row.status">{{scope.row.status_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="disk_iops" label="修改前IOPS" min-width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.disk_iops ? `${scope.row.disk_iops}${scope.row.iops_unit}` : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="disk_iops_after" label="修改后IOPS" min-width="90px">
        <template slot-scope="scope">
          <span>{{scope.row.disk_iops_after ? `${scope.row.disk_iops_after}${scope.row.iops_unit}` :''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="band_mbps" label="修改前吞吐量" min-width="95px">
        <template slot-scope="scope">
          <span>{{scope.row.band_mbps ? `${scope.row.band_mbps}${scope.row.mbps_unit}`: '' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="band_mbps_after" label="修改后吞吐量" min-width="95px">
        <template slot-scope="scope">
          <span>{{scope.row.band_mbps_after ? `${scope.row.band_mbps_after}${scope.row.mbps_unit}`: '' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="change_reason" label="修改原因"></el-table-column>
      <el-table-column prop="az_name" label="地域-可用区" min-width="95px">
        <template slot-scope="scope">
          <span>{{scope.row.region_name}}&nbsp;&nbsp;{{scope.row.az_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="disk_type" label="属性">
        <template slot-scope="scope">
          <span>{{scope.row.disk_type==="data" ? `数据盘` : '系统盘'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ecs_id" label="实例ID">
        <template slot-scope="scope">
          <pre>{{scope.row.ecs_id ? scope.row.ecs_id : ''}}</pre>
        </template>
      </el-table-column>
      <el-table-column prop="dev_id" label="dev_id"></el-table-column>
      <el-table-column prop="dev_name" label="dev_name"></el-table-column>
      <el-table-column prop="cluster_name" label="集群名称"></el-table-column>
      <el-table-column prop="pool_name" label="存储池名称" min-width="100px"></el-table-column>
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
import ActionBlock from '@/components/search/actionBlock.vue';
import Service from '@/https/disk/list';
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
  private req_data:any={}
  private search_dom = {
    disk_id:{placeholder:'请输入云盘ID'},
    ecs_id:{placeholder:'请输入实例ID'},
    customer_info:{placeholder:'请输入客户ID/名称'},
  }
  created(){
    this.search()
  }
  private search(data:any={}){
    this.current = 1;
    this.req_data = {...data};
    this.getRecordList()
  }
  private handleSizeChange(size){
    this.size = size
    this.getRecordList()
  }
  private handleCurrentChange(cur){
    this.current = cur
    this.getRecordList()
  }
  private async getRecordList(){
    const {req_data}=this
    let res:any = await Service.iops_mbps_record({
      az_id:this.$store.state.az_id,
      customer_info:req_data.customer_info || '',
      disk_id:req_data.disk_id || '',
      ecs_id:req_data.ecs_id || '',
      page_index:this.current,
      page_size:this.size,
    })
    if(res.code==="Success"){
      this.disk_record = res.data.result || []
      this.total = res.data.page_info.count || 0;
    }
  }
}
</script>

<style scoped>

</style>
