<template>
  <div>
    <action-block :search_option="search_con" @fn-search="FnSearch">
      <template #default>
        <el-button type="primary" @click="FnToCreate" 
          :disabled="!operate_auth.includes('instance_create')">创建实例</el-button>
        <el-button type="primary" @click="FnOperate('start_up_ecs')" 
          :disabled="!operate_auth.includes('start_up')">开 机</el-button>
        <el-button type="primary" @click="FnOperate('shutdown_ecs')"
          :disabled="!operate_auth.includes('shutdown')">关 机</el-button>
        <el-button type="primary" @click="FnOperate('restart_ecs')"
          :disabled="!operate_auth.includes('restart')">重 启</el-button>
        <el-button type="primary" @click="FnOperate('delete_ecs')"
         :disabled="!operate_auth.includes('delete')">逻辑删除</el-button>
        <el-button type="primary" @click="FnOperate('recover_ecs')"
         :disabled="!operate_auth.includes('recover')">恢 复</el-button>
        <el-button type="primary" @click="FnOperate('destroy_ecs')"
         :disabled="!operate_auth.includes('destroy')">销 毁</el-button>
        <el-button type="primary" @click="FnOperate('update_spec')">更换实例规格</el-button>
        <el-button type="primary" @click="FnOperate('update_system')">更换系统盘</el-button>
        <el-button type="primary" @click="FnOperate('reset_pwd')">更换密码</el-button>
      </template>
    </action-block>

    <el-table 
      ref="multipleTable"
      :data="instance_list"
      @selection-change="handleSelectionChange"
      border>
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="customer_id" label="客户ID"></el-table-column>
      <el-table-column prop="customer_name" label="客户名称"></el-table-column>
      <el-table-column prop="ecs_id" label="云服务器ID"></el-table-column>
      <el-table-column prop="ecs_name" label="云服务器名称"></el-table-column>
      <el-table-column prop="az_name" label="可用区"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <span :class="scope.row.status">{{ scope.row.status_display }}</span>
        </template>
      </el-table-column>
      <el-table-column label="配置详情">
        <template #default="scope">
            <el-button type="text" @click="FnToDetail(scope.row.ecs_id)" 
            :disabled="!operate_auth.includes('instance_detail')">配置详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="private_net" label="私网IP"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="FnToRecord(scope.row.ecs_id)"
            :disabled="!operate_auth.includes('instance_record')">操作记录</el-button>
            <el-button type="text" @click="FnToMonitor(scope.row.ecs_id)">监控</el-button>
            <!-- <el-button type="text">远程连接</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="FnGetList()"
      @current-change="FnGetList()"
      :current-page.sync="page_info.page_index"
      :page-sizes="page_info.page_sizes"
      :page-size.sync="page_info.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page_info.total">
    </el-pagination>

    <el-dialog :title="operate_title" :visible.sync="show_operate_dialog">
      <template v-if="default_operate_type === 'recover_ecs'">
        <Recover ref="recover" :multiple_selection="multiple_selection" :customer_id="customer_id"></Recover>
      </template>
      <div v-else>
        <el-alert
          :title="`是否确定要对以下实例执行 ${operate_title} 操作`"
          type="warning"
          :closable = "false"
          center>
        </el-alert>
        <el-table :data="multiple_selection" border>
          <el-table-column prop="customer_id" label="客户ID"></el-table-column>
          <el-table-column prop="customer_name" label="客户名称"></el-table-column>
          <el-table-column prop="ecs_id" label="云服务器ID"></el-table-column>
          <el-table-column prop="ecs_name" label="云服务器名称"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <span :class="scope.row.status">{{ scope.row.status_display }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="component-box">
          <template v-if="default_operate_type === 'update_spec'">
            <update-spec ref="update_spec" :customer_id="customer_id" :az_id="az_id"></update-spec>
          </template>
          <template v-if="default_operate_type === 'update_system'">
            <update-os ref="update_os" :customer_id="customer_id" :az_id="az_id"></update-os>
            <update-disk ref="update_disk" :system_disk="true" :customer_id="customer_id" :az_id="az_id"></update-disk>
            <reset-pwd ref="reset_pwd" :customer_id="customer_id" :az_id="az_id"></reset-pwd>
          </template>
          <template v-if="default_operate_type === 'reset_pwd'">
            <reset-pwd ref="reset_pwd" :customer_id="customer_id" :az_id="az_id"></reset-pwd>
          </template>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="FnConfirm">确 定</el-button>
        <el-button @click="FnClose">取 消</el-button>
      </span>
    </el-dialog>
    <template v-if="record_visible">
      <Record :visible = "record_visible" :record_id = "record_id" @close = 'closeRecord' />
    </template>
    <template v-if="detail_visible">
      <Detail :visible = "detail_visible" :detail_id = "detail_id" @close-detail = 'closeDetail' />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LabelBlock from '../../components/labelBlock.vue';
import actionBlock from '../../components/actionBlock.vue';
import getInsStatus from '../../utils/getStatusInfo';
import Service from '../../https/instance/list';
import Record from './record.vue';
import Detail from './detail.vue';
import resetPwd from './resetPwd.vue';
import updateSpec from './updateSpec.vue';
import updateOs from './updateOs.vue';
import updateDisk from './updateDisk.vue';
import Recover from './recover.vue';
import moment from 'moment';
@Component({
  components: {
    LabelBlock,
    actionBlock,
    Record,
    Detail,
    resetPwd, 
    updateSpec, 
    updateOs,
    updateDisk,
    Recover
  },
})

export default class App extends Vue {
  $router;
  $route;
  $message;
  $store;
  private search_con = {
    ecs_id: { placeholder: '请输入云服务器ID' },
    ecs_name: { placeholder: '请输入云服务器名称' },
    status: { placeholder: '请选择云服务器状态', list: [] },
    create_time: { 
      placeholder: ['开始时间', '结束时间'], 
      type: 'daterange', 
      width: '360', 
      clearable: false,
      dis_day: 31,
      defaultTime: [new Date(), new Date()] },
    customer_id: { placeholder: '请输入客户ID' },
    customer_name: { placeholder: '请输入客户名称' },
    os_type: { placeholder: '请选择操作系统', list: [] },
    private_net: { placeholder: '请输入私网IP' }
  };
  private search_reqData = {};
  private instance_list: Array<Object> = [];
  private customer_id: string = '';
  private az_id: string = '';
  private multiple_selection: Array<Object> = [];
  private operate_auth = [];
  private show_operate_dialog: boolean = false;
  private operate_title: string = '';
  private default_operate_type: string = '';
  private record_visible:boolean = false;
  private record_id:string = '';
  private detail_visible:boolean = false;
  private detail_id:string = '';
  private page_info = {
    page_sizes: [20, 50, 100],
    page_size: 20,
    page_index: 1,
    total: 0
  }
  private timer = null;
  private dialog_component = null;
  private FnSearch(data) {
    this.search_reqData = {
      ecs_id: data.ecs_id,
      ecs_name: data.ecs_name,
      status: data.status,
      customer_id: data.customer_id,
      customer_name: data.customer_name,
      os_type: data.os_type,
      private_net: data.private_net,
      start_time: data.create_time ? moment(data.create_time[0]).format('YYYY-MM-DD') : undefined,
      end_time: data.create_time ? moment(data.create_time[1]).format('YYYY-MM-DD') : undefined
    };
    this.page_info.page_index = 1;
    this.FnGetList()
  }
  private async FnGetList(loading: boolean = true) {
    let multiple_selection = [];
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (!loading) {
      this.$store.commit('SET_LOADING', false);
      multiple_selection = this.multiple_selection.map((row: any) => {
        return row.ecs_id;
      });
    }
    const resData: any = await Service.get_instance_list(Object.assign({
      page_index: this.page_info.page_index,
      page_size: this.page_info.page_size
    }, this.search_reqData));
    if (resData.code === 'Success') {
      this.instance_list = resData.data.ecs_list;
      var rows = [];
      if (multiple_selection.length > 0) {
        rows = resData.data.ecs_list.filter(row => multiple_selection.includes(row.ecs_id));
      }
      if (rows && rows.length > 0) {
        this.$nextTick(() => {
          rows.forEach(row => {
            (this.$refs.multipleTable as any).toggleRowSelection(row);
          })
        })
      }
      this.page_info.total = resData.data.page.count;
    }
    this.FnSetTimer();
  }
  private handleSelectionChange(val) {
    this.multiple_selection = val;
  }
  private FnToCreate() {
    this.$router.push('/instance/create')
  }
  private FnOperate(type) {
    if (this.multiple_selection.length === 0) {
      this.$message.warning('请选择要操作的实例！');
      return
    }
    const operate_info = getInsStatus.getInsOperateAuth(type);
    if (['reset_pwd', 'update_spec', 'update_system'].indexOf(type) >= 0) {
      if(!this.FnJudegCustomerAz(operate_info)) {
        return
      }
    } else {
      if(!this.FnJudgeCustomer(operate_info)) {
        return
      }
    }
    this.operate_title = operate_info.label;
    this.show_operate_dialog = true;
    this.default_operate_type = type;
  }
  private FnJudgeCustomer(operate_info): boolean {
    this.customer_id = '';
    let flag = true;
    for (let index = 0; index < this.multiple_selection.length; index++) {
      let item: any = this.multiple_selection[index];
      if ( index === 0 ) {
        this.customer_id = item.customer_id;
      }
      if (item.customer_id !== this.customer_id) {
        this.$message.warning('只允许对同一客户的实例进行批量操作！')
        flag = false;
        break;
      }
      if (operate_info.auth.indexOf(item.status) < 0) {
        this.$message.warning(operate_info.msg)
        flag = false;
        break;
      }
    }
    return flag
  }
  private FnJudegCustomerAz(operate_info): boolean {
    this.customer_id = '';
    this.az_id = '';
    let flag = true;
    for (let index = 0; index < this.multiple_selection.length; index++) {
      let item: any = this.multiple_selection[index];
      if ( index === 0 ) {
        this.customer_id = item.customer_id;
      }
      if (item.customer_id !== this.customer_id || item.az_id !== this.az_id) {
        this.$message.warning('只允许对同一客户的同一可用区下实例进行批量操作！')
        flag = false;
        break;
      }
      if (operate_info.auth.indexOf(item.status) < 0) {
        this.$message.warning(operate_info.msg)
        flag = false;
        break;
      }
    }
    return flag
  }
  private FnConfirm() {
    if ( this.default_operate_type === 'recover_ecs' ) {
      (this.$refs.recover as any).FnRecover();
      return
    }
    const reqData = {
      op_type: this.default_operate_type,
      customer_id: this.customer_id,
      ecs_ids: this.multiple_selection.map((item: any) => {
        return item.ecs_id
      })
    };
    if(['start_up_ecs', 'shutdown_ecs', 'restart_ecs'].indexOf(this.default_operate_type) >= 0) {
      this.FnPowerOperate(reqData);
    }
    else if( this.default_operate_type === 'delete_ecs' ) {
      this.FnDelete(reqData);
    }
    else if ( this.default_operate_type === 'destroy_ecs' ) {
      this.FnDestroy(reqData);
    }
    else if ( this.default_operate_type === 'reset_pwd' ) {
      this.FnResetPwd(reqData);
    }
    else if ( this.default_operate_type === 'update_spec') {
      this.FnUpdateSpec(reqData);
    }
    else if ( this.default_operate_type === 'update_system' ) {
      this.FnUpdateSystem(reqData);
    }
  }
  private async FnPowerOperate(reqData) {
    const resData: any = await Service.operate_instance(reqData);
    if(resData.code == "Success") {
      this.$message.success(resData.msg || `成功下发 ${this.operate_title} 任务！`);
      this.show_operate_dialog = false;
      this.FnGetList();
    }
  }
  private async FnDelete(reqData) {
    const resData: any = await Service.delete_instance(reqData);
    if(resData.code == "Success") {
      this.$message.success(resData.msg || `成功下发 ${this.operate_title} 任务！`);
      this.show_operate_dialog = false;
      this.FnGetList()
    }
  }
  private async FnDestroy(reqData) {
    const resData: any = await Service.destroy_instance(reqData);
    if(resData.code == "Success") {
      this.$message.success(resData.msg || `成功下发 ${this.operate_title} 任务！`);
      this.show_operate_dialog = false;
      this.page_info.page_index = 1;
      this.FnGetList()
    }
  }
  private async FnResetPwd(reqData) {
    let data = (this.$refs.reset_pwd as any).FnSubmit();
    if( data.flag ) {
      reqData.password = data.password;
      let resData: any = await Service.reset_password(reqData);
      if (resData.code === 'Success') {
        this.$message.success(resData.msg || `成功下发 ${this.operate_title} 任务！`);
      }
      this.FnClose();
    }
  }
  private async FnUpdateSpec(reqData) {
    let data = (this.$refs.update_spec as any).FnSubmit();
    if( data.flag ) {
      reqData.ecs_goods_id = data.spec_info.ecs_goods_id;
      reqData.goods_name = data.spec_info.goods_name;
      reqData.cpu_size = data.spec_info.cpu_size;
      reqData.ram_size = data.spec_info.ram_size;
      let resData: any = await Service.update_spec(reqData);
      if (resData.code === 'Success') {
        this.$message.success(resData.msg || `成功下发 ${this.operate_title} 任务！`);
      }
      this.FnClose();
    }
  }
  private async FnUpdateSystem(reqData) {
    let os_data = (this.$refs.update_os as any).FnSubmit();
    let disk_data = (this.$refs.update_disk as any).FnSubmit();
    let pwd_data = (this.$refs.reset_pwd as any).FnSubmit();
    if( os_data.flag && disk_data.flag && pwd_data.flag ) {
      reqData.os_id = os_data.os_info.os_id;
      reqData.os_type = os_data.os_info.os_type;
      reqData.disk_info = {
        system_disk: {
          ecs_goods_id: disk_data.ecs_goods_id,
          goods_name: disk_data.disk_name,
          disk_feature: disk_data.disk_feature,
          disk_type: disk_data.disk_type,
          disk_size: disk_data.disk_size
        },
      }
      reqData.password = pwd_data.password;
      let resData: any = await Service.update_system(reqData);
      if (resData.code === 'Success') {
        this.$message.success(resData.msg || `成功下发 ${this.operate_title} 任务！`);
      }
      this.FnClose();
    }
  }
  private FnClose() {
    this.show_operate_dialog = false;
    if (['reset_pwd', 'update_spec', 'update_system'].indexOf(this.default_operate_type) > 0) {
      // (this.$refs.child_componet as any).FnResetForm();
    }
    this.FnGetList()
  }
  private FnToDetail(id) {
    this.detail_id = id
    this.detail_visible = true
    // this.$router.push('/instance/detail/' + id)
  }
  private FnToRecord(id) {
    this.record_id = id
    this.record_visible = true
    // this.$router.push('/instance/record/' + id)
  }
  private FnToMonitor(id) {
    this.$router.push('/instance/monitor/' + id)
  }
  private closeRecord() {
    this.record_visible = false
  }
  private closeDetail() {
    this.detail_visible = false
  }
  private FnSetTimer() {
    this.timer = setTimeout(() => {
      this.FnGetList(false)
    }, 1000 *5)
  }
  private async FnGetStatus() {
    if (this.$store.state.status_list.length > 0) {
      this.search_con.status.list = this.$store.state.status_list;
    } else {
      let resData: any = await Service.get_status_list();
      if (resData.code === 'Success') {
        this.search_con.status.list = [];
        for (let key in resData.data) {
          this.search_con.status.list.push({
            label: resData.data[key],
            type: key
          })
        }
        this.$store.commit('SET_STATUS_LIST', this.search_con.status.list)
      }
    }
  }

  private mounted() {
    this.operate_auth = this.$store.state.auth_info[this.$route.name];
    this.FnGetStatus();
    this.search_con.os_type.list = [{
      label: "centos",
      type: "centos"
    },{
      label: "ubuntu",
      type: "ubuntu"
    },{
      label: "windows",
      type: "windows"
    }];
    this.FnSearch({
      create_time: this.search_con.create_time.defaultTime
    });
  }
  private beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.component-box {
  width: 550px;
  margin: 20px auto;
}
</style>