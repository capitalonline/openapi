<template>
    <div class="instance-list">
        <!-- 头部查询 -->
      <action-block :search_option="search_con" :type="false"></action-block>
      <el-table
        ref="multipleTable"
        :data="nfv_list"
        @filter-change="handleFilterChange"
        border
      >
        <el-table-column prop="customer_id" label="客户ID"></el-table-column>
        <el-table-column prop="ecs_id" label="云服务器ID"></el-table-column>
        <el-table-column prop="nat_id" label="nat网关ID"></el-table-column>
        <el-table-column prop="status" label="状态" width="90" column-key="status" :filters="status_list" >
          <template #default="scope">
              <div :class="scope.row.status">{{ scope.row.status }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="host_name" label="宿主机名称"></el-table-column>
        <el-table-column prop="cpu" label="CPU" ></el-table-column>
        <el-table-column prop="ram" label="内存"></el-table-column>
        <el-table-column prop="group_ip" label="NAT组IP"></el-table-column>
        <el-table-column prop="role_name" label="角色" ></el-table-column>
        <el-table-column prop="vpc_time" label="VPC ID/VPC名称" width="120"></el-table-column>
        <el-table-column label="操作" width="180" >
          <template #default="scope">
            <el-button
              type="text"
              @click="FnToDetail(scope.row.ecs_id)"
              :disabled="!operate_auth.includes('nfv_detail')"
              >详情</el-button
            >
            <el-button
            type="text"
            @click="FnToRecord(scope.row.ecs_id)"
            :disabled="!operate_auth.includes('nfv_record')"
            >操作记录</el-button
          >
            <el-button
              type="text"
              :disabled="!operate_auth.includes('monitor')"
              @click="FnToMonitor(scope.row.ecs_id)"
              >监控</el-button
            >
            <!--  -->
            <el-button
              type="text"
              :disabled="
                  scope.row.status !== 'running'|| !operate_auth.includes('vnc') 
              "
              @click="FnToVnc(scope.row.ecs_id)"
              >远程连接</el-button
            >
            <el-button
              type="text"
              :disabled="!operate_auth.includes('start_up')"
              >开机</el-button
            >
            <el-button
              type="text"
              :disabled="!operate_auth.includes('shutdown')"
              >关机</el-button
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
      <!-- 详情 -->
      <template v-if="detail_visible">
        <Detail
          :visible="detail_visible"
          :detail_id="detail_id"
          @close-detail="closeDetail"
        />
      </template>
      <!-- 操作记录 -->
      <template v-if="record_visible">
      <Record
        :visible="record_visible"
        :record_id="record_id"
        @close="closeRecord"
      />
    </template>
    </div>
    
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync} from 'vue-property-decorator';
import Service from "../../https/nfv/list";
import Detail from "./detail.vue";
import Record from "./record.vue";
import actionBlock from "../../components/search/actionBlock.vue";
@Component({
    components:{
        actionBlock,
        Detail,
        Record,
    }
})
export default class App extends Vue{
    // 搜索
  private search_con = {
      ecs_id: { placeholder: "请输入云服务器ID" },
      os_info: { placeholder: "请输入NAT网关ID"},
      customer_id: { placeholder: "请输入客户ID" },
      host_name: { placeholder: "请输入宿主机名称", },
};
  private search_reqData = {};
  private search_billing_method = "all";
  private search_op_source = "";
  private search_ecs_goods_name = [];
  private search_status=[]
    //   列表
    private nfv_list:Array<Object> = [
        {customer_id:'111',ecs_id:'222',nat_id:'333',status:'running',host_name:'lala',cpu:'gaga',ram:'wahaha',group_id:'444',role_name:'zhangsan',vpc_name:'test'}
    ];
    private status_list= [
        {text:'创建中',value: "building"},
        {text:'运行中',value: "running"},
        {text:'删除中',value: "deleting"},
    ]
    // 用户操作权限
    private operate_auth = ['nfv_detail','monitor','vnc','start_up','shutdown','nfv_record'];
    // 分页
    private page_info = {
    page_sizes: [20, 50, 100],
    page_size: 20,
    page_index: 1,
    total: 0
    };
      // 详情参数
    private detail_id: string = '';
    private detail_visible: boolean = false;
    // 操作记录参数
    private record_visible: boolean = false;
    private record_id: string = "";

  // 获取状态列表
  private async FnGetStatus() {
    // if (this.$store.state.status_list.length > 0) {
    //   this.search_con.status.list = this.$store.state.status_list;
    // } else {
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
          // this.FnSearch();
        }
      }
    // }
  }

   //获取首页列表
  private async FnGetList(loading: boolean = true) {
    console.log('search_reqData',this.search_reqData);
    
    if(!this.$store.state.pod_id){
      return ;
    }
    if (!loading) {
      this.$store.commit("SET_LOADING", false);
    }
  }

   //筛选列表状态
  private handleFilterChange(val){
    this.search_status = val.status;
    this.FnGetList();
  }

//   跳转到监控页面
  private FnToMonitor(id){
    this.$router.push("/nfv/monitor/" + id);
  }
//   远程连接
private async FnToVnc(id){
    let resData: any = await Service.get_vnc_url({
      ecs_id: id
    });
    if (resData.code === "Success") {
      let vnc_info = resData.data.vnc_info.split("/vnc_lite.html");
      let url = `${vnc_info[0]}/vnc_lite.html?op-token=${this.$store.state.token}?path=/?id=${id}`;
      window.open(url);
    }
}

// 点击分页
private handleSizeChange(val){
    // this.FnClearTimer();
    this.page_info.page_size = val;
    this.FnGetList()
  }
  private handleCurrentChange(cur){
    // this.FnClearTimer();
    this.page_info.page_index = cur
    this.FnGetList();
  }

// 详情
  // 跳转详情页
  private FnToDetail(id) {
    this.detail_id = id;
    this.detail_visible = true;
  }
  // 关闭详情页
  private closeDetail(){
    this.detail_visible = false;
  }

  //跳转操作纪录页
  private FnToRecord(id) {
    this.record_id = id;
    this.record_visible = true;
  }
  // 关闭操作纪录页面
  private closeRecord() {
    this.record_visible = false;
  }
  private created(){
    // this.operate_auth = this.$store.state.auth_info[this.$route.name];
    // console.log(this.operate_auth,'this.operate_auth');
    
  }
}
</script>
<style lang="scss" scoped>

</style>
