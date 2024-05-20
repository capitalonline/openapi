<template>
  <div class="instance-list">
    <!-- 头部查询 -->
    <action-block :search_option="search_con" @fn-search="FnSearch" :type="false"></action-block>
    <div class="icon m-bottom10">
      <el-tooltip content="导出" placement="bottom" effect="light">
        <el-button type="text" @click="down" v-loading="loading"><svg-icon icon="export" class="export"></svg-icon></el-button>
      </el-tooltip>
    </div>
    <el-table
      :data="history_list"
      border
    >
      <el-table-column prop="customer_id" label="客户ID"></el-table-column>
      <el-table-column prop="customer_name" label="客户名称"></el-table-column>
      <el-table-column prop="host_name" label="主机名"></el-table-column>
      <el-table-column prop="host_id" label="物理机ID"></el-table-column>
      <el-table-column prop="host_ip" label="管理网IP"></el-table-column>
      <el-table-column prop="card_name" label="GPU"></el-table-column>
      <el-table-column label="所属云主机" prop="vm_id"></el-table-column>
      <el-table-column label="Slot号" prop="slot"></el-table-column>
      <el-table-column label="PCIe号" prop="pci_address"></el-table-column>
      <el-table-column label="SN号" prop="sn"></el-table-column>
      <el-table-column label="更新内容" prop="content"></el-table-column>
      <el-table-column label="创建时间" prop="create_time"></el-table-column>
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
  </div>

</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import ActionBlock from '@/components/search/actionBlock.vue';
import Service from "@/https/gpu/list";
import SvgIcon from '@/components/svgIcon/index.vue';
import moment from "moment";
import {getEcsOptions} from "@/https/common";
import storage from "@/store/storage";
@Component({
  components:{
    ActionBlock,
    SvgIcon
  }})
export default class faultRecord extends Vue {
  private history_list:Array<Object> = []
  private search_reqData ={}
  private loading:boolean = false
  private page_info = {
    page_sizes: [20, 50, 100],
    page_size: 20,
    page_index: 1,
    total: 0
  }
  private search_con = {
    // host_id: { placeholder: "请输入物理机ID" },
    pci_address: { placeholder: "请输入PCIe号"},
    host_ip:{placeholder:'请输入管理网IP'},
    //host_name:{placeholder:'请输入主机名称'},
    customer_id: {placeholder:'请输入客户名称/ID'},
    create_time: {
      placeholder: ["开始时间", "结束时间"],
      type: "daterange",
      width: "360",
      clearable: true,
      dis_day: 1,
      defaultTime: []
    },
  }
  @Watch("$store.state.pod_id")
  private watch_pod(nv){
    if(!nv){
      return;
    }
    this.FnGetList()
  }
  private FnSearch(data: any = {}) {
    this.search_reqData = {
      pci_address: data.pci_address,
      customer_id:data.customer_id,
      customer_name:data.customer_name,
      host_ip:data.host_ip,
      host_name:data.host_name,
      create_time_start:data.create_time && data.create_time[0]
        ? moment(data.create_time[0]).local().format("YYYY-MM-DDTHH:mm:ss[Z]")
        : undefined,
      create_time_end:data.create_time && data.create_time[0]
        ? moment(data.create_time[1]).local().format("YYYY-MM-DDTHH:mm:ss[Z]")
        : undefined,
    };
    this.FnGetList();
  }
  created(){
    this.FnGetList();
  }
  private async FnGetList(){
    const resData: any = await Service.get_gpu_record({
      pod_id:this.$store.state.pod_id,
      page_index:this.page_info.page_index,
      page_size:this.page_info.page_size,
      host_id:this.$route.params.id,
      ...this.search_reqData
    })
    if (resData.code === "Success") {
      this.history_list = resData.data.gpu_record_list
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
  private async down(){
    this.loading = true;
    const res:any = await Service.gpu_record_download({
      ...this.search_reqData
    })
    if (res) {
      this.loading = false;
      let blob = new Blob([res], {
        type: "application/octet-stream"
      });
      let reader = new FileReader();
      let title ='GPU故障记录-' +'-'+ moment(new Date()).format('YYYYMMDD')
      reader.readAsText(blob, "utf-8");
      reader.onload = () => {
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = title + ".xlsx";
        link.click();
        window.URL.revokeObjectURL(link.href);
      };
    }
  }
}
</script>

<style scoped>
.icon{
  width:100%;
  text-align: right;
}

</style>
