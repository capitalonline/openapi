<template>
  <div class="instance-list">
    <action-block :search_option="search_con" @fn-search="FnSearch" :type="false"></action-block>
    <el-table
      :data="gpu_list"
      @filter-change="handleFilterChange"
      border
    >
      <el-table-column prop="customer_id" label="客户ID"></el-table-column>
      <el-table-column prop="customer_name" label="客户名称"></el-table-column>
      <el-table-column prop="host_name" label="主机名"></el-table-column>
      <el-table-column prop="host_name" label="主机名"></el-table-column>
      <el-table-column prop="host_id" label="物理机ID" width="200px"></el-table-column>
      <el-table-column prop="host_ip" label="管理网IP"></el-table-column>
      <el-table-column prop="card_name" label="GPU"></el-table-column>
      <el-table-column label="Slot号" prop="slot"></el-table-column>
      <el-table-column label="PCIe号" prop="pci_address"></el-table-column>
      <el-table-column label="SN号" prop="sn"></el-table-column>
      <el-table-column label="状态" prop="status" column-key="status" :filters="status_list" :filter-multiple="false">
        <template #default="scope">
          <span :class="[scope.row.status === 'FF' ? 'err' : 'normal']">{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column label="监控">
        <template #default="scope">
          <el-button type="text" @click="FnGoToMonitor(scope.row)">查看监控</el-button>
        </template>
      </el-table-column>
      <el-table-column label="所属云主机" prop="vm_id"></el-table-column>
      <el-table-column label="创建时间" prop="create_time"></el-table-column>
      <el-table-column label="更新时间" prop="update_time"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button
            type="text"
            @click="FnEdit(scope.row)"
            :disabled="!operate_auth.includes('update')"
          >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page_info.page_index"
      :page-sizes="page_info.page_sizes"
      :page-size.sync="page_info.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page_info.total"
    >
    </el-pagination>
    <gpu-edit
      :visible.sync="visible"
      :oper_info="oper_info">
    </gpu-edit>
  </div>

</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import ActionBlock from '../../components/search/actionBlock.vue';
import moment from "moment";
import Service from "@/https/gpu/list";
import GpuEdit from "@/views/gpu/gpuEdit.vue";
@Component({
  components:{
    GpuEdit,
    ActionBlock
}})
export default class list extends Vue {
  private gpu_list:Array<Object> = [];
  private search_reqData ={}
  private visible:boolean = false
  private oper_info = {}
  private err = 'err'
  private normal = 'normal'
  private operate_auth = []
  private search_status=[]
  private status_list =[
    {text: '正常', value: 'READY'},
    {text: 'FF', value: 'DISCONNECTED'},
  ]
  private page_info = {
    page_sizes: [20, 50, 100],
    page_size: 20,
    page_index: 1,
    total: 0
  };
  private search_con = {
    host_id: { placeholder: "请输入物理机ID" },
    vm_id: { placeholder: "请输入云服务器ID"},
    card_name: { placeholder: "请输入显卡名称"},
    host_ip:{placeholder:'请输入管理网IP'},
    host_name:{placeholder:'请输入主机名称'},
    customer_id: {placeholder:'请输入客户ID'},
    customer_name: {placeholder:'请输入客户名称'},
    sn: { placeholder: "请输入sn号" },
    create_time: {
      placeholder: ["开始时间", "结束时间"],
      type: "daterange",
      width: "360",
      clearable: true,
      dis_day: 1,
      defaultTime: []
    },
  }
  @Watch('visible')
  private watch_visible(nv){
    if(!nv){
      this.oper_info={};
      this.FnGetList()
    }
  }
  private handleFilterChange(val){
    this.search_status = val.status;
    console.log('this.search_status',this.search_status)
    this.FnGetList();
  }
  created(){
    this.FnGetList();
    this.operate_auth = this.$store.state.auth_info[this.$route.name];
  }
  private async FnEdit(row){
    this.visible = true
    this.oper_info = row
  }
  private FnGoToMonitor(row) {
    this.$router.push({name:'physical_detail',query:{id:row.host_id,name:row.host_name},params:{active:"1",default_tab:'gpu'}})
  }
  private FnSearch(data: any = {}) {
    this.search_reqData = {
      host_id:data.host_id,
      vm_id: data.vm_id,
      card_name: data.card_name,
      sn:data.sn,
      create_time_start:data.create_time && data.create_time[0]
        ?  moment(data.create_time[0]).local().format("YYYY-MM-DDTHH:mm:ss[Z]")
        : undefined,
      create_time_end:data.create_time && data.create_time[0]
        ?  moment(data.create_time[1]).local().format("YYYY-MM-DDTHH:mm:ss[Z]")
        : undefined,
    };
    this.FnGetList();
  }
  private async FnGetList(){
    const resData: any = await Service.get_gpu_list({
      page_index:this.page_info.page_index,
      page_size:this.page_info.page_size,
      status:this.search_status.length>0 ? this.search_status.join(',') : this.search_status.map(item=>item.value).join(','),
      ...this.search_reqData
    })
    console.log('this.search_status',this.search_status)
    if (resData.code === "Success") {
      this.gpu_list = resData.data.page_info_list
      this.page_info.total = resData.data.page_info.count
    }
  }
  //handleSizeChange
  private handleSizeChange(val){
    this.page_info.page_size = val;
    this.page_info.page_index = 1
    this.FnGetList()
  }
  private handleCurrentChange(cur){
    this.page_info.page_index = cur
    this.FnGetList();
  }

}
</script>

<style scoped>
.err {
  color: #DA3B18;
}
.normal {
  color:#2DA867;
}

</style>
