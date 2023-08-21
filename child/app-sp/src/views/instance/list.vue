<template>
  <div class="instance-list">
    <action-block :search_option="search_con" @fn-search="FnSearch" :type="true">
      <template #default>
        <!-- <el-button
          type="primary"
          @click="FnToCreate"
          :disabled="!operate_auth.includes('instance_create')"
          >创建实例</el-button
        > -->
        <el-button
          type="primary"
          @click="FnOperate('start_up_ecs')"
          :disabled="!operate_auth.includes('start_up')"
          >开 机</el-button
        >
        <el-button
          type="primary"
          @click="FnOperate('shutdown_ecs')"
          :disabled="!operate_auth.includes('shutdown')"
          >关 机</el-button
        >
        <el-button
          type="primary"
          @click="FnOperate('restart_ecs')"
          :disabled="!operate_auth.includes('restart')"
          >重 启</el-button
        >
        <el-button
          type="primary"
          @click="FnOperate('delete_ecs')"
          :disabled="!operate_auth.includes('delete')"
          >逻辑删除</el-button
        >
        <!-- <el-button
          type="primary"
          @click="FnOperate('recover_ecs')"
          :disabled="!operate_auth.includes('recover')"
          >恢 复</el-button
        > -->
        <el-button
          type="primary"
          @click="FnOperate('destroy_ecs')"
          :disabled="!operate_auth.includes('destroy')"
          >销 毁</el-button
        >
        <el-button
          type="primary"
          @click="FnOperate('restore_ecs')"
          :disabled="!operate_auth.includes('restore')"
          >恢 复</el-button
        >
        <el-button
          type="primary"
          @click="FnOperate('update_spec')"
          :disabled="!operate_auth.includes('update_spec')"
          >更换实例规格</el-button
        >
        <el-button
          type="primary"
          @click="FnOperate('update_system')"
          :disabled="!operate_auth.includes('update_system')"
          >更换操作系统</el-button
        >
        <el-button
          type="primary"
          @click="FnOperate('reset_pwd')"
          :disabled="!operate_auth.includes('reset_pwd')"
          >重置密码</el-button
        >
        <el-button
          type="primary"
          @click="FnOperate('net_set')"
          :disabled="!operate_auth.includes('reset_pwd')"
          >网络设置</el-button
        >
        <!-- <el-button
          type="primary"
          @click="FnOperate('open_bill')"
          :disabled="!operate_auth.includes('open_bill')"
          >开启计费</el-button
        > -->
      </template>
    </action-block>
    <div class="icon m-bottom10">
      <el-tooltip content="导出" placement="bottom" effect="light">
        <el-button type="text" @click="FnExport" v-loading="loading">
          <svg-icon icon="export" class="export"></svg-icon>
        </el-button>
      </el-tooltip>
    </div>
    <el-table
      ref="multipleTable"
      :data="instance_list"
      @selection-change="handleSelectionChange"
      @filter-change="handleFilterChange"
      @sort-change="handleSortChange"
      border
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="customer_id" label="客户ID"></el-table-column>
      <el-table-column prop="customer_name" label="客户名称"></el-table-column>
      <el-table-column prop="ecs_id" label="云服务器ID"></el-table-column>
      <el-table-column prop="ecs_name" label="云服务器名称" sortable="custom">
        <template #default="scope">
          <pre>{{ scope.row.ecs_name }}</pre>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="az_name" label="可用区"></el-table-column> -->
      <el-table-column prop="status" label="状态" width="90" column-key="status" :filters="ecs_status_list">
        <template #default="scope">
          <div :class="scope.row.status">{{ scope.row.status_display }}</div>
          <div class="warning_message" v-if="scope.row.no_charge_shutdown_ecs && scope.row.status==='shutdown'">关机不计费</div>
        </template>
      </el-table-column>
      <el-table-column
        label="计算规格"
        :filters="ecs_goods_name_list"
        column-key="ecs_goods_name"
        width="100"
      >
        <template #default="scope">
          {{ scope.row.ecs_goods_name }} <br />
          {{ scope.row.cpu_size }}vCPU | {{ scope.row.ram_size }}GiB <br />
          <span v-if="scope.row.gpu_size"
            >| {{ scope.row.gpu_size }}*{{ scope.row.card_name }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="private_net" label="私网IP" sortable="custom">
        <template #default="scope">
          <div v-if="scope.row.private_net">
            {{ scope.row.private_net }}
            （vlan {{ scope.row.eip_info[scope.row.private_net].vlan_id }}）
            <!-- （vlan {{ scope.row.vlan[FnGetNet(scope.row.private_net)] }}） -->
          </div>
        </template>
      </el-table-column>
      <el-table-column label="虚拟出网网关IP">
        <template #default="scope">
          <div v-if="scope.row.pub_net">
            <span
              class="circel-border"
              v-if="
                scope.row.pub_net && scope.row.eip_info[scope.row.pub_net] &&
                  scope.row.eip_info[scope.row.pub_net].conf_name
              "
            >
              {{ scope.row.eip_info[scope.row.pub_net].conf_name }}
            </span>
            {{ scope.row.pub_net }}
            （vlan {{ scope.row.eip_info[scope.row.pub_net].vlan_id }}）
            <!-- （vlan {{ scope.row.vlan[FnGetNet(scope.row.pub_net)] }}） -->
          </div>
          <div v-for="item in scope.row.virtual_net" :key="item">
            <span
              class="circel-border"
              v-if="
                scope.row.eip_info[item] && scope.row.eip_info[item].conf_name
              "
            >
              {{ scope.row.eip_info[item].conf_name }}
            </span>
            {{ item }}
            （vlan {{ scope.row.eip_info[item].vlan_id }}）
            <!-- （vlan {{ scope.row.vlan[FnGetNet(item)] }}） -->
          </div>
        </template>
      </el-table-column>
      <el-table-column label="公网IP">
        <template #default="scope">
          <div
            v-if="
              scope.row.eip_info[scope.row.pub_net] &&
                scope.row.eip_info[scope.row.pub_net].conf_name
            "
          >
            <span class="circel-border">
              {{ scope.row.eip_info[scope.row.pub_net].conf_name }}
            </span>
            {{ scope.row.eip_info[scope.row.pub_net].eip_ip }}
          </div>
          <div v-for="item in scope.row.virtual_net" :key="item">
            <template
              v-if="
                scope.row.eip_info[item] && scope.row.eip_info[item].conf_name
              "
            >
              <span class="circel-border">
                {{ scope.row.eip_info[item].conf_name }}
              </span>
              {{ scope.row.eip_info[item].eip_ip }}
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="host_name" label="所属物理机" sortable="custom">
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间">
        <template #default="scope">
          <div class="time-box">{{ scope.row.update_time }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间">
        <template #default="scope">
          <div class="time-box">{{ scope.row.create_time }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="billing_method"
        label="计费方式"
        :filters="billing_method_list"
        column-key="billing_method"
        :filter-multiple="false"
      >
        <template #default="scope">
          <div>
            {{
              scope.row.is_charge
                ? billing_method_relation[scope.row.billing_method]
                : "不计费"
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="op_source"
        label="创建来源"
        :filters="[
          { text: '运维后台', value: 'cloud_op' },
          { text: 'GIC', value: 'gic' }
        ]"
        column-key="op_source"
        :filter-multiple="false"
      >
        <template #default="scope">
          <div>
            {{ scope.row.op_source === "cloud_op" ? "运维后台" : "GIC" }}
          </div>
        </template>
      </el-table-column> -->
      <el-table-column prop="gpu_card_status" label="显卡状态" :filter-multiple="false" column-key="card_status_type" :filters="gpu_status_list">
        <template slot-scope="scope">
            <span :class="[scope.row.gpu_card_status==='正常' ? 'running' :scope.row.gpu_card_status==='已卸载'?'destroy':scope.row.gpu_card_status==='关闭'? 'error' : '' ]">{{ scope.row.gpu_card_status }}</span>
          </template>
      </el-table-column>
      <!-- 产品来源  -->
      <el-table-column prop="product_source" label="产品来源" :filter-multiple="false" column-key="search_product_source" :filters="product_source_list">
        <template slot-scope="scope">
            <span>{{ scope.row.product_source}}</span>
          </template>
      </el-table-column>
      <!-- 计费账户ID -->
      <el-table-column prop="product_server_id" label="计费账户ID"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
            type="text"
            @click="FnToDetail(scope.row.ecs_id)"
            :disabled="!operate_auth.includes('instance_detail')"
            >详情</el-button
          >
          <el-button
            type="text"
            @click="FnToRecord(scope.row.ecs_id)"
            :disabled="!operate_auth.includes('instance_record')"
            >操作记录</el-button
          >
          <el-button
            type="text"
            @click="FnToMonitor(scope.row.ecs_id)"
            :disabled="!operate_auth.includes('monitor')"
            >监控</el-button
          >
          <el-button
            type="text"
            :disabled="
              scope.row.status !== 'running' || !operate_auth.includes('vnc')
            "
            @click="FnToVnc(scope.row.ecs_id)"
            >远程连接</el-button
          >
          <el-tooltip content="仅内部账号且状态为已关机的实例支持操作" effect="light" v-if="scope.row.status!== 'shutdown' || !operate_auth.includes('add_common_mirror') || scope.row.customer_type!=='内部'">
            <el-button type="text" class="not-clickable">制作公共镜像</el-button>
          </el-tooltip>
          <el-button
            type="text"
            v-else
            @click="addCommon(scope.row)"
            >制作公共镜像</el-button
          >
          <el-tooltip content="仅支持对GPU型实例支持显卡管理" effect="light" v-if="!scope.row.is_gpu">
            <el-button type="text" class="not-clickable">显卡管理</el-button>
          </el-tooltip>
          <el-button
            type="text"
            v-else
            @click="operateGpu(scope.row)"
            >显卡管理</el-button
          >
          <el-tooltip content="实例需为运行中" effect="light" v-if="scope.row.status!=='running'">
            <el-button type="text" class="not-clickable">网络设置</el-button>
          </el-tooltip>
          <el-button
            type="text"
            v-else
            @click="netSet('single',scope.row)"
            >网络设置</el-button
          >
          <!-- <el-button type="text" @click="FnOpenBill({ecs_ids: [scope.row.ecs_id], customer_id: scope.row.customer_id, billing_method: scope.row.billing_method})"
              :disabled="!operate_auth.includes('open_bill') || !['running', 'shutdown'].includes(scope.row.status) || Boolean(scope.row.is_charge)">
            开启计费</el-button> -->
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

    <el-dialog
      :title="operate_title"
      :visible.sync="show_operate_dialog"
      :close-on-click-modal="false"
      @close="FnClose"
      width="60%"
    >
      <template v-if="default_operate_type === 'recover_ecs'">
        <Recover
          ref="recover"
          :multiple_selection="multiple_selection"
          :customer_id="customer_id"
          :is_gpu="is_gpu"
          @fn-close="FnClose"
        ></Recover>
      </template>
      <div v-else>
        <el-alert
          :title="`是否确定要对以下实例执行 ${operate_title} 操作`"
          type="warning"
          :closable="false"
          center
        >
        </el-alert>
        <el-table :data="multiple_selection" border class="operate-table">
          <el-table-column label="客户名称/客户ID">
            <template #default="scope">
              <div>{{ scope.row.customer_name }}</div>
              <div>{{ scope.row.customer_id }}</div>
            </template>
          </el-table-column>
          <el-table-column label="云服务器名称/云服务器ID">
            <template #default="scope">
              <div>
                <pre>{{ scope.row.ecs_name }}</pre>
              </div>
              <div>{{ scope.row.ecs_id }}</div>
            </template>
          </el-table-column>
          <el-table-column label="云服务器规格">
            <template #default="scope">
              <div>
                {{ scope.row.ecs_goods_name }} {{ scope.row.cpu_size }}vCPU
                {{ scope.row.ram_size }}GiB
                <span v-if="is_gpu"
                  >{{ scope.row.gpu_size }}*{{ scope.row.card_name }}</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="系统盘"
            v-if="default_operate_type === 'update_system'"
          >
            <template #default="scope">
              <div>
                {{ scope.row.system_disk_type }}
                {{ scope.row.system_disk_size }}GB
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作系统"
            v-if="default_operate_type === 'update_system'"
          >
            <template #default="scope">
              <div>{{ scope.row.os_name }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <span :class="scope.row.status">{{
                scope.row.status_display
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="gpu_card_status" label="显卡状态">
            <template slot-scope="scope">
              <span :class="[scope.row.gpu_card_status==='正常' ? 'running' :scope.row.gpu_card_status==='已卸载'?'destroy':scope.row.gpu_card_status==='关闭'? 'error' : '' ]">{{ scope.row.gpu_card_status }}</span>
            </template>
          </el-table-column>
        
          <el-table-column
            prop=""
            label="价格"
            v-if="default_operate_type === 'open_bill'"
          >
            <template #default="scope">
              <span>{{ ecs_list_price[scope.row.ecs_id] }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="component-box">
          <template v-if="default_operate_type === 'update_spec'">
            <update-spec
              ref="update_spec"
              :customer_id="customer_id"
              :az_id="az_id"
              type="batch_update"
              :default_is_gpu="is_gpu"
              @fn-spec="FnChangeSpec"
            ></update-spec>
          </template>
          <template v-if="default_operate_type === 'update_system'">
            <update-os
              ref="update_os"
              :customer_id="customer_id"
              :az_id="az_id"
              :is_gpu="is_gpu"
              :default_os_type="os_type"
              :support_gpu_driver="support_gpu_driver"
              @fn-os="FnGetOsInfo"
            >
            </update-os>
            <update-disk
              ref="update_disk"
              :system_disk="true"
              :customer_id="customer_id"
              :az_id="az_id"
              :is_gpu="is_gpu"
              :os_disk_size="Number(os_info.disk_size)"
              :origin_disk_size="origin_disk_size"
              :spec_family_id="spec_family_id"
              @fn-billing-info="FnGetDiskBillingInfo"
              @fn-system-disk="FnChangeSystem"
            >
            </update-disk>
            <reset-pwd
              ref="reset_pwd"
              :customer_id="customer_id"
              :az_id="az_id"
              :username="os_info.username"
            ></reset-pwd>
          </template>
          <div v-if="default_operate_type === 'operateGpu'">
            操作：
            <el-radio-group v-model="gpu_card_operate">
              <el-radio label="ecs_attach_gpu_card" :disabled="!multiple_selection[0].gpu_operate_list.includes('ecs_attach_gpu_card')">挂载显卡</el-radio>
              <el-radio label="ecs_detach_gpu_card" :disabled="!multiple_selection[0].gpu_operate_list.includes('ecs_detach_gpu_card')">卸载显卡</el-radio>
              <el-radio label="ecs_change_fault_card" :disabled="!multiple_selection[0].gpu_operate_list.includes('ecs_change_fault_card')">切换显卡
                <el-tooltip content="当云主机显卡关闭时，切换成正常可用的显卡。" placement="right" effect="light">
                  <el-button type="text">
                    <svg-icon :icon="'info'" viewBox="0 0 18 18"></svg-icon>
                  </el-button>
                </el-tooltip>
              </el-radio>
            </el-radio-group>
          </div>
          <template v-if="default_operate_type === 'reset_pwd'">
            <reset-pwd
              ref="reset_pwd"
              label="新密码"
              :customer_id="customer_id"
              :az_id="az_id"
            ></reset-pwd>
          </template>
        </div>
        <div class="text-right m-right20" v-if="total_price">
          变更后总价：
          <span class="num_message">{{ total_price }}</span>
        </div>
        <div class="text-center" v-if="default_operate_type === 'shutdown_ecs'">
          关机方式：
          <el-radio
            v-model="shutdown_ecs_type"
            label="shutdown_ecs"
            class="m-left20"
            >正常关机</el-radio
          >
          <el-radio
            v-model="shutdown_ecs_type"
            label="compel_shutdown_ecs"
            class="m-left20"
            >强制关机</el-radio
          >
          <mark-tip
            class="mark-tip"
            content="等同于断电处理，Windows操作系统可能会损坏，请谨慎选择"
          ></mark-tip>
        </div>
        <template v-if="default_operate_type === 'restart_ecs'">
          <div class="text-center">
            重启方式:
            <el-radio
              v-model="restart_ecs_type"
              label="restart_ecs"
              class="m-left20"
              >正常重启</el-radio
            >
            <el-radio
              v-model="restart_ecs_type"
              label="hard_restart_ecs"
              class="m-left20"
              >硬重启</el-radio
            >
          </div>
          <div class="warning_message">说明：若云主机故障，请选择“硬重启”，使云主机快速恢复正常。</div>
        </template>
        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="FnConfirm">确 定</el-button>
        <el-button @click="FnClose">取 消</el-button>
      </span>
    </el-dialog>
    <template v-if="record_visible">
      <Record
        :visible="record_visible"
        :record_id="record_id"
        @close="closeRecord"
      />
    </template>
    <template v-if="detail_visible">
      <Detail
        :visible="detail_visible"
        :detail_id="detail_id"
        @close-detail="closeDetail"
      />
    </template>
    <template v-if="common_visible">
      <add-common
        :visible.sync="common_visible"
        :ecs_info="ecs_info"
      />
    </template>
    <template v-if="net_visible">
      <net-set
        :visible.sync="net_visible"
        :ecs_list="multiple_selection"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue,Watch } from "vue-property-decorator";
import LabelBlock from "../../components/labelBlock.vue";
import actionBlock from "../../components/search/actionBlock.vue";
import SvgIcon from "../../components/svgIcon/index.vue";
import getInsStatus from "../../utils/getStatusInfo";
import { trans } from "../../utils/transIndex";
import Service from "../../https/instance/list";
import EcsService from "../../https/instance/create";
import Record from "./record.vue";
import Detail from "./detail.vue";
import resetPwd from "./resetPwd.vue";
import updateSpec from "./updateSpec.vue";
import updateOs from "./updateOs.vue";
import updateDisk from "./updateDisk.vue";
import Recover from "./recover.vue";
import MarkTip from "../../components/markTip.vue";
import AddCommon from './addCommonMirror.vue'
import moment from "moment";
import storage from '../../store/storage';
import netSet from './netSet.vue'
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
    Recover,
    SvgIcon,
    MarkTip,
    AddCommon,
    netSet
  }
})
export default class App extends Vue {
  private search_con = {
    ecs_id: { placeholder: "请输入云服务器ID" },
    ecs_name: { placeholder: "请输入云服务器名称" },
    customer_id: { placeholder: "请输入客户ID" },
    customer_name: { placeholder: "请输入客户名称" },
    os_info: { placeholder: "请输入操作系统ID/名称"},
    private_net: { placeholder: "请输入私网IP" },
    public_net: { placeholder: "请输入公网IP" },
    host_id: { placeholder: "请输入物理机ID"},
    host_name: { placeholder: "请输入物理机名称", },
    host_ip: { placeholder: "请输入物理机管理IP"},
    out_band_address: { placeholder: "请输入物理机带外IP"},
    create_time: {
      placeholder: ["开始时间", "结束时间"],
      type: "daterange",
      width: "360",
      clearable: true,
      dis_day: 1,
      defaultTime: []
    },
  };
  private search_reqData = {};
  private search_billing_method = "all";
  private search_op_source = "";
  // 产品线来源
  private search_product_source='';
  private search_ecs_goods_name = [];
  private search_status=[]
  private instance_list: Array<Object> = [];
  private customer_id: string = "";
  private az_id: string = "";
  private is_gpu: number = 0;
  private origin_disk_size: number = 0;
  private support_gpu_driver: string = "";
  private spec_family_id: string = "";
  private gpu_card_operate:string=''
  private os_type = "";
  private billing_method: string = "0";
  private multiple_selection: any = [];
  private multiple_selection_id: Array<string> = [];
  private operate_auth = [];
  private show_operate_dialog: boolean = false;
  private operate_title: string = "";
  private default_operate_type: string = "";
  private shutdown_ecs_type: string = "shutdown_ecs";
  private restart_ecs_type: string = "restart_ecs";
  private record_visible: boolean = false;
  private record_id: string = "";
  private detail_visible: boolean = false;
  private detail_id: string = "";
  private net_visible:boolean=false;
  private gpu_status_list:any=[
    {text:'正常',value:'0'},
    {text:'卸载',value:'1'},
    {text:'关闭',value:'2'},
  ]
  // 产品来源
  private product_source_list:any=[
    {text:'云桌面',value:'云桌面'},
    {text:'云主机',value:'云主机'},
    {text:'文件存储转发',value:'文件存储转发'},
    {text:'容器',value:'容器'},
  ]
  // 服务账号ID
  private product_server_id:string=''
  private search_card_status_type:string=''
  private search_product_status_type:string=''
  private page_info = {
    page_sizes: [20, 50, 100],
    page_size: 20,
    page_index: 1,
    total: 0
  };
  private billing_method_relation = {
    "": "不计费",
    0: "按需计费",
    1: "包年包月"
  };
  private billing_method_list = [];
  private ecs_goods_name_list = [];
  private timer = null;
  private os_info = {};
  private ecs_info = {};
  private common_visible:boolean=false
  private disk_billing_info = {};
  private total_price = "";
  private ecs_list_price = {};
  private loading = false;
  private sort_prop_name = '';
  private sort_order = undefined;
  private ecs_status_list:any=[];
   @Watch("$store.state.pod_id")
    private watch_pod(nv){
      if(!nv){
        return;
      }
      this.FnSearch(this.search_reqData)
    }
  private FnSearch(data: any = {}) {
    this.FnClearTimer();
    this.search_reqData = {
      pod_id:this.$store.state.pod_id,
      ecs_id: data.ecs_id,
      ecs_name: data.ecs_name,
      customer_id: data.customer_id,
      customer_name: data.customer_name,
      os_info: data.os_info,
      private_net: data.private_net,
      public_net: data.public_net,
      host_id: data.host_id,
      host_name: data.host_name,
      host_ip: data.host_ip,
      out_band_address: data.out_band_address,
      //产品来源
      // product_source:data.product_source,
      // 服务账户ID
      // product_server_id:data.product_server_id,
      start_time:
        data.create_time && data.create_time[0]
          ? moment(data.create_time[0]).format("YYYY-MM-DD")
          : undefined,
      end_time:
        data.create_time && data.create_time[1]
          ? moment(data.create_time[1]).format("YYYY-MM-DD")
          : undefined
    };
    this.page_info.page_index = 1;
    this.FnGetList();
  }
  // 筛选实例来源
  private handleFilterChange(val) {
    console.log('val',val)
    this.FnClearTimer();
    setTimeout(()=>{
      if (val.op_source) {
        this.search_op_source = val.op_source[0];
      }
      if (val.billing_method) {
        this.search_billing_method =
          val.billing_method.length > 0 ? val.billing_method[0] : "all";
      }
      if (val.ecs_goods_name) {
        this.search_ecs_goods_name = val.ecs_goods_name;
      }
      if(val.status){
        this.search_status = val.status;
      }
      if(val.card_status_type){
        this.search_card_status_type = val.card_status_type[0];
      }
      // 产品来源
      if(val.search_product_source){
        this.search_product_source = val.search_product_source[0];
      }
      this.FnGetList();
    },500)
    
  }
  //handleSizeChange
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
  // 列表排序
  private handleSortChange(val) {
    this.FnClearTimer();
    let relation = {
      private_net: 'sort_private_ip',
      host_name: 'sort_host_name',
      ecs_name:'sort_ecs_name'
    }
    this.sort_prop_name = relation[val.prop];
    this.sort_order = val.order === "ascending" ? '0' : val.order === "descending" ? '1' : undefined;
    this.FnGetList()
  }
  // 获取网段
  private FnGetNet(ip) {
    let data = ip.split('.')
    return [data[0], data[1], data[2], '0'].join('.')
  }
  private async FnGetGraphics(ecs_id) {
    let reqData = {
      billing_method:
        this.search_billing_method == "" ? "no" : this.search_billing_method,
      page_index: this.page_info.page_index,
      page_size: this.page_info.page_size,
      status:this.search_status.length>0 ? this.search_status.join(',') : this.ecs_status_list.map(item=>item.value).join(','),
      [this.sort_prop_name]: this.sort_order,
      is_op:true,
      ...this.search_reqData
    }
    if (this.search_op_source) {
      reqData["op_source"] = this.search_op_source;
    }
    if (this.search_card_status_type) {
      reqData["card_status_type"] = this.search_card_status_type;
    }
    if (this.search_ecs_goods_name.length > 0) {
      reqData["spec_family_ids"] = JSON.stringify(this.search_ecs_goods_name);
    }
    reqData["ecs_id"] = ecs_id
    const resData: any = await Service.get_instance_list(reqData);
    if (resData.code == 'Success') {
      this.multiple_selection=resData.data.ecs_list;
        this.show_operate_dialog = true;
        this.operate_title = '显卡管理';
        this.default_operate_type = 'operateGpu';
        this.FnClearTimer();
    }
  }
  private async FnGetList(loading: boolean = true) {
    if(!this.$store.state.pod_id){
      return ;
    }
    this.multiple_selection_id = [];
    if (!loading) {
      this.$store.commit("SET_LOADING", false);
      this.multiple_selection_id = this.multiple_selection.map((row: any) => {
        return row.ecs_id;
      });
    }
    
    let reqData = {
      billing_method:
        this.search_billing_method == "" ? "no" : this.search_billing_method,
      page_index: this.page_info.page_index,
      page_size: this.page_info.page_size,
      status:this.search_status.length>0 ? this.search_status.join(',') : this.ecs_status_list.map(item=>item.value).join(','),
      [this.sort_prop_name]: this.sort_order,
      is_op:true,
      // 产品来源
      product_source:this.search_product_source,
      ...this.search_reqData
    }
    if (this.search_op_source) {
      reqData["op_source"] = this.search_op_source;
    }
    // 产品来源
    if(this.search_product_source){
      reqData["product_source"] = this.search_product_source;
    }
    if (this.search_card_status_type) {
      reqData["card_status_type"] = this.search_card_status_type;
    }
    if (this.search_ecs_goods_name.length > 0) {
      reqData["spec_family_ids"] = JSON.stringify(this.search_ecs_goods_name);
    }
    const resData: any = await Service.get_instance_list(reqData);
    if (resData.code === "Success") {
      this.instance_list = resData.data.ecs_list;
      var rows = [];
      if (this.multiple_selection_id.length > 0) {
        rows = resData.data.ecs_list.filter(row =>
          this.multiple_selection_id.includes(row.ecs_id)
        );
      }
      if (rows && rows.length > 0) {
        this.$nextTick(() => {
          rows.forEach(row => {
            (this.$refs.multipleTable as any).toggleRowSelection(row);
          });
        });
      }
      this.page_info.total = resData.data.page.count;
    }
    this.FnSetTimer();
  }
  private handleSelectionChange(val) {
    this.multiple_selection = val;
  }
  private FnToCreate() {
    this.$router.push("/instance/create");
  }
  private FnOperate(type) {
    if (this.multiple_selection.length === 0) {
      this.$message.warning("请选择要操作的实例！");
      return;
    }
    const operate_info = getInsStatus.getInsOperateAuth(type);
    if (
      ["reset_pwd", "update_spec", "update_system", "open_bill","net_set"].indexOf(
        type
      ) >= 0
    ) {
      if (!this.FnJudegCustomerAz(operate_info, type)) {
        return;
      }
      if (type === "open_bill") {
        this.FnGetEcsPrice();
      }
      if(type==='net_set'){
        this.netSet('batch');
        return;
      }
    }else {
      if (!this.FnJudgeCustomer(operate_info, type)) {
        return;
      }
    }
    this.operate_title = operate_info.label;
    this.show_operate_dialog = true;
    this.default_operate_type = type;
    this.FnClearTimer();
  }
  private FnJudgeCustomer(operate_info, type): boolean {
    this.customer_id = "";
    let flag = true;
    this.multiple_selection_id = [];
    for (let index = 0; index < this.multiple_selection.length; index++) {
      let item: any = this.multiple_selection[index];
      this.multiple_selection_id.push(item.ecs_id);
      if (index === 0) {
        this.customer_id = item.customer_id;
        this.is_gpu = Number(item.is_gpu);
      }
      if (item.customer_id !== this.customer_id) {
        this.$message.warning("只允许对同一客户的实例进行批量操作！");
        flag = false;
        break;
      }
      if (["recover_ecs"].indexOf(type) >= 0 && item.is_gpu != this.is_gpu) {
        this.$message.warning(
          `只允许对同一类型实例进行批量${operate_info.label}操作！`
        );
        flag = false;
        break;
      }
      if (operate_info.auth.indexOf(item.status) < 0) {
        this.$message.warning(operate_info.msg);
        flag = false;
        break;
      }
    }
    return flag;
  }
  private FnJudegCustomerAz(operate_info, type): boolean {
    this.customer_id = "";
    this.az_id = "";
    this.billing_method = "0";
    this.origin_disk_size = 0;
    this.support_gpu_driver = "";
    this.spec_family_id = "";
    this.os_type = "";
    let flag = true;
    this.multiple_selection_id = [];
    
    for (let index = 0; index < this.multiple_selection.length; index++) {
      let item: any = this.multiple_selection[index];
      this.multiple_selection_id.push(item.ecs_id);
      if (index === 0) {
        this.customer_id = item.customer_id;
        this.az_id = item.az_id;
        this.billing_method = item.billing_method;
        this.is_gpu = Number(item.is_gpu);
        this.support_gpu_driver = item.support_gpu_driver;
        this.spec_family_id = item.spec_family_id;
        this.os_type = item.os_type;
      }
      if (item.customer_id !== this.customer_id || item.az_id !== this.az_id) {
        this.$message.warning(
          "只允许对同一客户的同一可用区下实例进行批量操作！"
        );
        flag = false;
        break;
      }
      if (
        ["update_spec", "update_system"].indexOf(type) >= 0 &&
        (item.is_gpu != this.is_gpu ||
          item.billing_method !== this.billing_method)
      ) {
        this.$message.warning(
          `只允许对同一类型同一计费方式实例进行批量${operate_info.label}操作！`
        );
        flag = false;
        break;
      }
      if (type === "open_bill" && item.is_charge) {
        this.$message.warning("只允许对未开启计费的实例开启计费！");
        flag = false;
        break;
      }
      if (
        type === "update_system" &&
        item.support_gpu_driver != this.support_gpu_driver
      ) {
        this.$message.warning(
          `只允许对同一驱动类型实例进行批量${operate_info.label}操作！`
        );
        flag = false;
        break;
      }
      if (
        type === "update_system" &&
        item.spec_family_id != this.spec_family_id
      ) {
        this.$message.warning(
          `只允许对同一规格族实例进行批量${operate_info.label}操作！`
        );
        flag = false;
        break;
      }
      if (type === "update_system" && item.os_type != this.os_type) {
          this.$message.warning(`Windows和linux系统不可以互换重装！`);
          flag = false;
          break;
        }
      if (type === "update_spec" && this.is_gpu) {
        this.$message.warning(`不允许对GPU实例${operate_info.label}操作！`);
        flag = false;
        break;
      }
      if(['update_spec','update_system'].includes(type) && item.no_charge_shutdown_ecs){
        this.$message.warning(`不允许对关机不计费的实例${operate_info.label}操作！`);
        flag = false;
        break;
      }
      if (operate_info.auth.indexOf(item.status) < 0) {
        this.$message.warning(operate_info.msg);
        flag = false;
        break;
      }
      this.origin_disk_size = Math.max(
        this.origin_disk_size,
        item.system_disk_size
      );
    }
    return flag;
  }
  private FnConfirm() {
    if (this.default_operate_type === "recover_ecs") {
      (this.$refs.recover as any).FnRecover();
      return;
    }
    const reqData = {
      op_type: this.default_operate_type,
      customer_id: this.customer_id,
      az_id: this.az_id,
      ecs_ids: this.multiple_selection_id
    };
    if (
      ["start_up_ecs", "shutdown_ecs", "restart_ecs"].indexOf(
        this.default_operate_type
      ) >= 0
    ) {
      this.FnPowerOperate(reqData);
    } else if (this.default_operate_type === "delete_ecs") {
      this.FnDelete(reqData);
    } else if (this.default_operate_type === "destroy_ecs") {
      this.FnDestroy(reqData);
    } else if (this.default_operate_type === "reset_pwd") {
      this.FnResetPwd(reqData);
    } else if (this.default_operate_type === "update_spec") {
      this.FnUpdateSpec(reqData);
    } else if (this.default_operate_type === "update_system") {
      this.FnUpdateSystem(reqData);
    } else if (this.default_operate_type === "open_bill") {
      this.FnOpenBill(
        Object.assign({ billing_method: this.billing_method }, reqData)
      );
    }else if(this.default_operate_type === "operateGpu"){
      this.mount_gpu_card()
    }
  }
  private async mount_gpu_card(){
    let res:any = await Service.mount_gpu_card({
      ecs_id:this.multiple_selection[0].ecs_id,
      customer_id:this.multiple_selection[0].customer_id,
      event_type:this.gpu_card_operate
    })
    if (res.code == "Success") {
      this.$message.success(
        res.message
      );
      this.FnClose();
    }
  }
  private async FnPowerOperate(reqData) {
    if (this.default_operate_type === "restart_ecs") {
      reqData.op_type = this.restart_ecs_type;
    }
    if (this.default_operate_type === "shutdown_ecs") {
      reqData.op_type = this.shutdown_ecs_type;
    }
    const resData = await Service.operate_instance(reqData);
    if (resData.code == "Success") {
      this.$message.success(
        resData.msg || `成功下发 ${this.operate_title} 任务！`
      );
      this.FnClose();
    }
  }
  private netSet(type,row:any={}){
    if(type==='single'){
      this.multiple_selection = [row]
    }
    this.net_visible=true;
  }
  private async operateGpu(row){
    let {ecs_id} = row
    const resData: any = await Service.update_gpu_status({ecs_id})
    if(resData.code === 'Success'){
      this.FnGetGraphics(ecs_id)
    }

    // this.$confirm(`您选中的实例的显卡状态为${row.status_display}，请确认对显卡做${row.status_display==='已卸载' ? '挂载' : '卸载'}操作？`, '提示', {
    //   confirmButtonText: '确定',
    //   cancelButtonText: '取消',
    //   type: 'warning'
    // }).then(async () => {
    //   this.$message({
    //     type: 'success',
    //     message: '删除成功!'
    //   });
    // }).catch(() => {
    //   this.$message({
    //     type: 'info',
    //     message: '已取消删除'
    //   });          
    // });
  }
  private async FnDelete(reqData) {
    const resData: any = await Service.delete_instance(
      Object.assign(
        {
          is_gpu: this.is_gpu
        },
        reqData
      )
    );
    if (resData.code == "Success") {
      this.$message.success(
        resData.msg || `成功下发 ${this.operate_title} 任务！`
      );
      this.FnClose();
    }
  }
  private async FnDestroy(reqData) {
    const resData: any = await Service.destroy_instance(
      Object.assign(
        {
          is_gpu: this.is_gpu
        },
        reqData
      )
    );
    if (resData.code == "Success") {
      this.$message.success(
        resData.msg || `成功下发 ${this.operate_title} 任务！`
      );
      this.page_info.page_index = 1;
      this.FnClose();
    }
  }
  private async FnResetPwd(reqData) {
    let data = (this.$refs.reset_pwd as any).FnSubmit();
    if (data.flag) {
      reqData.password = data.password;
      let resData: any = await Service.reset_password(reqData);
      if (resData.code === "Success") {
        this.$message.success(
          resData.msg || `成功下发 ${this.operate_title} 任务！`
        );
      }
      this.FnClose();
    }
  }
  private async FnChangeSpec(data) {
    if (this.billing_method === "") {
      return;
    }
    let reqData = {
      customer_id: this.customer_id,
      az_id: this.az_id,
      billing_method: this.billing_method || "0",
      ecs_ids: this.multiple_selection_id,
      is_gpu: this.is_gpu,
      ecs_goods_info: {
        cpu: data.cpu,
        ram: data.ram,
        gpu: data.gpu
      },
      billing_info: data.billing_info[data.ecs_goods_id]
    };
    const resData = await Service.change_config_price(reqData);
    if (resData.code === "Success") {
      this.total_price =
        resData.data.price_symbol +
        resData.data.total_price.toFixed(2) +
        "/" +
        resData.data.price_unit;
    }
  }
  private async FnUpdateSpec(reqData) {
    let data = (this.$refs.update_spec as any).FnSubmit();
    if (data.flag) {
      reqData.billing_info =
        data.spec_info.billing_info[data.spec_info.ecs_goods_id];
      reqData.is_gpu = this.is_gpu;
      reqData.ecs_info = {
        ecs_goods_info: {
          ecs_goods_id: data.spec_info.ecs_goods_id,
          gic_goods_id: reqData.billing_info.gic_goods_id,
          cpu: data.spec_info.cpu,
          ram: data.spec_info.ram,
          gpu: data.spec_info.gpu
        }
      };
      let resData: any = await Service.update_spec(reqData);
      if (resData.code === "Success") {
        this.$message.success(
          resData.msg || `成功下发 ${this.operate_title} 任务！`
        );
      }
      this.FnClose();
    }
  }
  private FnGetOsInfo(data) {
    this.os_info = data;
  }
  private FnGetDiskBillingInfo(data) {
    this.disk_billing_info = data;
  }
  private async FnChangeSystem(data) {
    if (this.billing_method === "") {
      return;
    }
    let reqData = {
      customer_id: this.customer_id,
      az_id: this.az_id,
      billing_method: this.billing_method || "0",
      is_gpu: this.is_gpu,
      ecs_ids: this.multiple_selection_id,
      ebs_goods_info: {},
      billing_info: this.disk_billing_info[data.ecs_goods_id],
      
    };
    if (this.is_gpu) {
      reqData.ebs_goods_info["local_disk-IOPS"] = data.iops;
      reqData.ebs_goods_info["local_disk-space"] = data.storage_space;
      reqData.ebs_goods_info["local_disk-throughput"] = data.handling_capacity;
    } else {
      reqData.ebs_goods_info["iops"] = data.iops;
      reqData.ebs_goods_info["storage_space"] = data.storage_space;
      reqData.ebs_goods_info["handling_capacity"] = data.handling_capacity;
    }
    const resData = await Service.change_system_price(reqData);
    if (resData.code === "Success") {
      this.total_price =
        resData.data.price_symbol +
        resData.data.total_price.toFixed(2) +
        "/" +
        resData.data.price_unit;
    }
  }
  private async FnUpdateSystem(reqData) {
    let os_data = (this.$refs.update_os as any).FnSubmit();
    let disk_data = (this.$refs.update_disk as any).FnSubmit();
    let pwd_data = (this.$refs.reset_pwd as any).FnSubmit();
    if (os_data.flag && disk_data.flag && pwd_data.flag) {
      reqData.os_id = os_data.os_info.os_id;
      reqData.os_type = os_data.os_info.os_type;
      reqData.username = os_data.os_info.username;
      reqData.disk_info = {
        system_disk: {
          ecs_goods_id: disk_data.system_disk.ecs_goods_id,
          ebs_goods_id: disk_data.system_disk.ecs_goods_id,
          gic_goods_id: this.disk_billing_info[
            disk_data.system_disk.ecs_goods_id
          ]?.gic_goods_id,
          goods_name: disk_data.system_disk.disk_name,
          disk_feature: disk_data.system_disk.disk_feature,
          disk_type: disk_data.system_disk.disk_type,
          disk_size: disk_data.system_disk.disk_size,
          storage_space: disk_data.system_disk.disk_size,
          handling_capacity: disk_data.system_disk.handling_capacity,
          iops: disk_data.system_disk.iops,
          is_follow_delete: disk_data.system_disk.is_follow_delete,
          origin_disk_size: this.origin_disk_size
        }
      };
      if (disk_data.system_disk.disk_feature === "local") {
        reqData.disk_info.system_disk["local_disk-IOPS"] =
          reqData.disk_info.system_disk["iops"];
        reqData.disk_info.system_disk["local_disk-space"] =
          reqData.disk_info.system_disk["storage_space"];
        reqData.disk_info.system_disk["local_disk-throughput"] =
          reqData.disk_info.system_disk["handling_capacity"];
      }
      reqData.password = pwd_data.password;
      reqData.billing_info = this.disk_billing_info;
      reqData.is_gpu = this.is_gpu;
      let resData: any = await Service.update_system(reqData);
      if (resData.code === "Success") {
        this.$message.success(
          resData.msg || `成功下发 ${this.operate_title} 任务！`
        );
      }
      this.FnClose();
    }
  }
  private async FnGetEcsPrice() {
    this.ecs_list_price = {};
    const resData = await Service.each_resource_price({
      customer_id: this.customer_id,
      az_id: this.az_id,
      billing_method: "0",
      resource_ids: this.multiple_selection_id,
      resource_type: "ecs"
    });
    if (resData.code === "Success") {
      for (let item in resData.data.total_price) {
        this.$set(
          this.ecs_list_price,
          item,
          resData.data.price_symbol +
            resData.data.total_price[item].toFixed(2) +
            "/" +
            resData.data.price_unit
        );
      }
    }
  }
  private async FnOpenBill(row) {
    let reqData = {
      resource_ids: row.ecs_ids,
      customer_id: row.customer_id,
      billing_method: row.billing_method || "0",
      resource_type: "ecs"
    };
    const resData = await Service.start_charge(reqData);
    if (resData.code === "Success") {
      this.$message.success(`成功开启计费！`);
    }
    this.FnClose();
  }
  private async FnToVnc(id) {
    let resData: any = await Service.get_vnc_url({
      ecs_id: id
    });
    if (resData.code === "Success") {
      let vnc_info = resData.data.vnc_info.split("/vnc_lite.html");
      let url = `${vnc_info[0]}/vnc_lite.html?op-token=${this.$store.state.token}?path=/?id=${id}`;
      window.open(url);
    }
  }
  private addCommon(obj){
    this.FnClearTimer()
    this.ecs_info = obj
    this.common_visible = true;
  }
  @Watch("common_visible")
  private watch_common_visible(nv){
    if(!nv){
      this.FnGetList();
    }
  }
  @Watch("net_visible")
  private watch_net_visible(nv){
    if(!nv){
      this.FnGetList();
    }
  }
  private FnClose() {
    this.show_operate_dialog = false;
    this.default_operate_type = "";
    this.total_price = "";
    this.gpu_card_operate='';
    this.FnGetList();
  }
  private FnToDetail(id) {
    this.detail_id = id;
    this.detail_visible = true;
  }
  private FnToRecord(id) {
    this.record_id = id;
    this.record_visible = true;
  }
  private FnToMonitor(id) {
    this.$router.push("/instance/monitor/" + id);
  }
  private closeRecord() {
    this.record_visible = false;
  }
  private closeDetail() {
    this.detail_visible = false;
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
  private async FnGetStatus() {
    // if (this.$store.state.status_list.length > 0) {
    //   this.search_con.status.list = this.$store.state.status_list;
    // } else {
      const resData = await Service.get_status_list();
      if (resData.code === "Success") {
        this.ecs_status_list = [];
        for (let key in resData.data) {
          if(key!=='destroy'){
            this.ecs_status_list.push({
              text: resData.data[key],
              value: key
            });
          }
          
        }
        if (this.$route.query.host_id) {
          
        } else {
          this.FnSearch();
        }
        // this.$store.commit("SET_STATUS_LIST", this.search_con.status.list);
      }
    // }
  }
  private async get_az_list() {
    const res = await EcsService.get_region_az_list({});
    if (res.code === "Success") {
      res.data.forEach(item => {
        item.region_list.forEach(inn => {
          // this.search_con.az_id.list = [
          //   ...this.search_con.az_id.list,
          //   ...trans(inn.az_list, "az_name", "az_id", "label", "type")
          // ];
        });
      });
    }
  }
  // 获取云服务器类型信息
  private async FnGetCateGoryList() {
    const resData = await Service.get_family_data();
    if (resData.code === "Success") {
      this.ecs_goods_name_list = resData.data.spec_family_list.map(item => {
        return {
          value: item.spec_family_id,
          text: item.name
        };
      });
    }
  }

  private async FnExport() {
    console.log('this.search_product_source',this.search_product_source)
    this.loading = true;
    let obj = Object.assign(
        {
          billing_method:
            this.search_billing_method == ""
              ? "no"
              : this.search_billing_method,
          op_source: this.search_op_source,
          spec_family_ids:this.search_ecs_goods_name.join(','),
          // 产品来源
          product_source:this.search_product_source,
        },
        this.search_reqData
      )
    const resData = await Service.export_list(
      obj
    );
    if (resData) {
      this.loading = false;
      let blob = new Blob([resData], {
        type: "application/octet-stream"
      });
      let reader = new FileReader();
      let title ='云服务器-'+storage.get('pod_name') +'-'+ moment(new Date()).format('YYYYMMDD')
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

  private created() {
    this.operate_auth = this.$store.state.auth_info[this.$route.name];
    this.FnGetStatus();
    this.get_az_list();
    this.FnGetCateGoryList();
    // this.search_con.os_type.list = [
    //   {
    //     label: "centos",
    //     type: "centos"
    //   },
    //   {
    //     label: "ubuntu",
    //     type: "ubuntu"
    //   },
    //   {
    //     label: "windows",
    //     type: "windows"
    //   }
    // ];
    for (let key in this.billing_method_relation) {
      this.billing_method_list.push({
        value: key,
        text: this.billing_method_relation[key]
      });
    }
    
  }
  beforeDestroy() {
    this.FnClearTimer();
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
