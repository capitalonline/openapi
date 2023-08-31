<template>
    <div class="instance-list">
        <!-- 头部查询 -->
      <action-block :search_option="search_con" @fn-search="FnSearch" :type="false"></action-block>
      <el-table
        :data="nfv_list"
        @filter-change="handleFilterChange"
        :hesder-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        border
      >
        <el-table-column prop="customer_id" label="客户ID"></el-table-column>
        <el-table-column label="云服务器ID" min-width="150px">
          <template #default="scope">
            <span style="margin-right: 5px">{{ scope.row.nfv_id }}</span>
            <Clipboard v-if="scope.row.nfv_id" :content="scope.row.nfv_id"></Clipboard>
          </template>
        </el-table-column>
        <el-table-column label="NAT网关ID" min-width="150px">
          <template #default="scope">
            <span style="margin-right: 5px">{{ scope.row.nat_gateway_id }}</span>
            <Clipboard v-if="scope.row.nat_gateway_id" :content="scope.row.nat_gateway_id"></Clipboard>
          </template>
        </el-table-column>
        <el-table-column  label="状态" width="90" column-key="status" :filters="status_list" >
          <template #default="scope">
              <div :class="scope.row.status">{{ scope.row.status_display }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="host_name" label="宿主机名称" width="90"></el-table-column>
        <el-table-column prop="cpu" label="CPU" ></el-table-column>
        <el-table-column prop="ram" label="内存"></el-table-column>
        <el-table-column prop="vnf_group_id" label="NAT组ID" min-width="150px"></el-table-column>
        <el-table-column prop="role" label="角色" ></el-table-column>
        <el-table-column  label="VPC ID" min-width="150px" width="120">
          <template #default="scope">
              <div style="margin-right: 5px">{{ scope.row.vpc_id}}</div>
              <Clipboard v-if="scope.row.vpc_id" :content="scope.row.vpc_id"></Clipboard>
          </template>
        </el-table-column>
        <el-table-column prop="vpc_name" label="VPC名称" width="120"></el-table-column>
        <el-table-column label="操作" width="180" >
          <template #default="scope">
         
            <!--  -->
            <el-button
              type="text"
              :disabled="
                  scope.row.status !== 'running'|| !operate_auth.includes('vnc') 
              "
              @click="FnToVnc(scope.row)"
              >远程连接</el-button
            >
            <el-button
              type="text"
              :disabled="!operate_auth.includes('monitor')"
              @click="FnToMonitor(scope.row)"
              >监控</el-button
            >
            <el-button
              type="text"
              @click="FnOperate('power_on',scope.row)"
              :disabled="scope.row.status !== 'stop'||!operate_auth.includes('start_up')"
              >开机</el-button
            >
            <el-button
              type="text"
              @click="FnOperate('power_off',scope.row)"
              :disabled="scope.row.status !== 'running' || !operate_auth.includes('shutdown')"
              >关机</el-button
            >
            <el-button
              type="text"
              @click="FnOperate('restart',scope.row)"
              :disabled="scope.row.status !== 'running' || !operate_auth.includes('restart')"
              >重启</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :page-sizes="page_info.page_sizes"
        :page-size.sync="page_info.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page_info.total"
        :current-page.sync="page_info.page_index"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    
</template>
<script lang="ts">
import {Vue,Component,Watch,Prop,PropSync} from 'vue-property-decorator';
import Service from "../../https/nfv/list";
import actionBlock from "../../components/search/actionBlock.vue";
import Clipboard from '../../components/clipboard.vue';
import moment from "moment";
@Component({
    components:{
        actionBlock,
        Clipboard
    }
})
export default class App extends Vue{
    // 搜索
  private search_con = {
      nfv_id: { placeholder: "请输入云服务器ID" },
      nat_gateway_id: { placeholder: "请输入NAT网关ID"},
      customer_id: { placeholder: "请输入客户ID" },
      host_name: { placeholder: "请输入宿主机名称", },
};
  private search_reqData = {};
  private search_status=[]
    //   列表
    private nfv_list:Array<Object> = [];
    private status_list= []
    // 用户操作权限
    private operate_auth = [];
    // 分页
    private page_info = {
    page_sizes: [20, 50, 100],
    page_size: 20,
    page_index: 1,
    total: 0
    };


    private timer = null;
    @Watch("$store.state.pod_id")
    private watch_pod(nv){
      if(!nv){
        return;
      }
      this.FnSearch(this.search_reqData)
    }

  // 获取状态列表
  private async FnGetStatus() {
      const resData = await Service.get_status_list();
      if (resData.code === "Success") {
        this.status_list = [];
        for (let key in resData.data) {
          if(key!=='destroy'){
            this.status_list.push({
              text: resData.data[key],
              value: key
            });
          }
          
        }
        if (this.$route.query.host_id) {
          
        } else {
          this.FnSearch(this.search_reqData);
        }
      }
  }

  private FnSetTimer() {
    if (this.timer) {
      this.FnClearTimer();
    }
    this.timer = setTimeout(() => {
      this.FnGetList(false);
    }, 1000 * 5);
  }
  private FnClearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  
    // 点击查询按钮
  private FnSearch(data: any = {}) {
    this.FnClearTimer();
    this.search_reqData = {
      pod_id:this.$store.state.pod_id,
      nfv_id: data.nfv_id,
      nat_gateway_id: data.nat_gateway_id,
      customer_id: data.customer_id,
      host_name: data.host_name,
    };
    this.page_info.page_index = 1;
    this.FnGetList();
  }

   //获取首页列表
  private async FnGetList(loading: boolean = true) {
    if(!this.$store.state.pod_id){
      return ;
    }
    if (!loading) {
      this.$store.commit("SET_LOADING", false);
    }
    let reqData = {
      page_index: this.page_info.page_index,
      page_size: this.page_info.page_size,
      status:this.search_status.length>0 ? this.search_status.join(',') : this.status_list.map(item=>item.value).join(','),
      ...this.search_reqData
    }
    for(let i in reqData) {
      if(!reqData[i]) {
        delete reqData[i];
      }
    }
    const resData: any = await Service.get_nfv_list(reqData);
    if (resData.code === "Success") {
      this.nfv_list = resData.data.nfv_list;
      this.page_info.total = resData.data.page.count;
    }
    this.FnSetTimer();
  }

   //筛选列表状态
  private handleFilterChange(val){
    this.search_status = val.status;
    this.FnGetList();
  }

//   跳转到监控页面
private FnToMonitor(row){
    this.$router.push({
    path:`/nfv/monitor/${row.nfv_id}/${row.ip}`
    })
}
//   远程连接
private async FnToVnc(row){
    let resData: any = await Service.get_vnc_url({
        nfv_id: row.nfv_id,
        region_id:row.region_id,
        az_id:row.az_id,
    });
    if (resData.code === "Success") {
      let vnc_info = resData.data.vnc_info.split("/vnc_lite.html");
      let url = `${vnc_info[0]}/vnc_lite.html?op-token=${this.$store.state.token}?path=/?id=${row.nfv_id}`;
      window.open(url);
    }
}
// 开机、关机、重启按钮
private async  FnOperate(type,row){
  let resData: any = await Service.operate_nfv({
      nfv_id_list:row.nfv_id.split(','),
      operation:type,
      region_id:row.region_id,
      az_id:row.az_id,
      customer_id:row.customer_id
    });
    if (resData.code === "Success") {
      this.FnGetList();
    }
}
// 点击分页
private handleSizeChange(val){
    this.FnClearTimer();
    this.page_info.page_size = val;
    this.FnGetList()
  }
  private handleCurrentChange(cur){
    this.FnClearTimer();
    this.page_info.page_index = cur
    this.FnGetList();
  }

  private created(){
    this.FnGetList();
    this.operate_auth = this.$store.state.auth_info[this.$route.name];
    
  }
  beforeDestroy() {
    this.FnClearTimer();
  }
  mounted(){
    this.FnGetStatus();
  }
}
</script>
<style lang="scss" scoped>

.component-box {
  width: 650px;
  margin: 20px auto;
}
.time-box {
  width: 70px;
}
.operate-table {
  max-height: 300px;
  overflow: auto;
}
.m-top23 {
  margin-top: 23px;
}
.mark-tip {
  margin-left: -20px;
  vertical-align: top;
}
.circel-border {
  display: inline-block;
  width: 30px;
  line-height: 28px;
  text-align: center;
  border: 1px solid #888;
  border-radius: 30px;
}
</style>

<style lang="scss">
.instance-list .el-loading-spinner .circular {
  width: 24px;
  height: 24px;
}
</style>
