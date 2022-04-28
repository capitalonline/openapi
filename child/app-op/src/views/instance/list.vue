<template>
  <div class="instance-list">
    <action-block :search_option="search_con" @fn-search="FnSearch" type="instance">
      <template #default>
        <el-button
          type="primary"
          @click="FnToCreate"
          :disabled="!operate_auth.includes('instance_create')"
          >创建实例</el-button
        >
        <el-button
          type="primary"
          @click="FnOperate('delete_ecs')"
          :disabled="!operate_auth.includes('delete')"
          >逻辑删除</el-button
        >
        <el-button
          type="primary"
          @click="FnOperate('recover_ecs')"
          :disabled="!operate_auth.includes('recover')"
          >恢 复</el-button
        >
        <el-button
          type="primary"
          @click="FnOperate('destroy_ecs')"
          :disabled="!operate_auth.includes('destroy')"
          >销 毁</el-button
        >
        <el-button
          type="primary"
          @click="FnOperate('open_bill')"
          :disabled="!operate_auth.includes('open_bill')"
          >开启计费</el-button
        >
      </template>
    </action-block>
    <div class="icon m-bottom10">
      <el-tooltip content="自定义列表项" placement="bottom" effect="light">
        <el-button type="text" @click="FnCustom">
          <i class="el-icon-s-tools" ></i>
        </el-button>        
      </el-tooltip>
      <el-tooltip content="刷新" placement="bottom" effect="light">
        <el-button type="text" @click="FnGetList">
          <svg-icon icon="refresh" class="refresh"></svg-icon>
        </el-button>
      </el-tooltip>
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
      <el-table-column
        v-for="item in select_table_item"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :column-key="item.prop"
        :sortable="item.sortable"
        :filters="item.filters"
        :filter-multiple="false"
      >
        <template #default="scope">
          <template v-if="item.prop === 'ecs_name'">
            <pre>{{ scope.row.ecs_name }}</pre>
          </template>
          <template v-else-if="item.prop === 'status'">
            <span :class="scope.row.status">{{ scope.row.status_display }}</span>
          </template>
          <template v-else-if="item.prop === 'goods_name'">
            {{ scope.row.ecs_goods_name }} <br />
            {{ scope.row.cpu_size }}vCPU | {{ scope.row.ram_size }}GiB <br />
            <span v-if="scope.row.gpu_size"
              >| {{ scope.row.gpu_size }}*{{ scope.row.card_name }}</span
            >
          </template>
          <template v-else-if="item.prop === 'private_net'">
            <div v-if="scope.row.private_net">
              {{ scope.row.private_net }}
              （vlan {{ scope.row.vlan[FnGetNet(scope.row.private_net)] }}）
            </div>
          </template>
          <template v-else-if="item.prop === 'virtual_net'">
            <div v-if="scope.row.pub_net">
              <span
                class="circel-border"
                v-if="
                  scope.row.eip_info[scope.row.pub_net] &&
                  scope.row.eip_info[scope.row.pub_net].conf_name
                "
              >
                {{ scope.row.eip_info[scope.row.pub_net].conf_name }}
              </span>
              {{ scope.row.pub_net }}
              （vlan {{ scope.row.vlan[FnGetNet(scope.row.pub_net)] }}）
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
              （vlan {{ scope.row.vlan[FnGetNet(item)] }}）
            </div>
          </template>
          <template v-else-if="item.prop === 'pub_net'">
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
          <template v-else-if="item.prop === 'create_time'">
            <div class="time-box">{{ scope.row.create_time }}</div>
          </template>
          <template v-else-if="item.prop === 'billing_method'">
            <div>
              {{
                scope.row.is_charge
                  ? billing_method_relation[scope.row.billing_method]
                  : "不计费"
              }}
            </div>
          </template>
          <template v-else>
            {{ scope.row[item.prop] }}
          </template>
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
              <div>{{ scope.row.name }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <span :class="scope.row.status">{{
                scope.row.status_display
              }}</span>
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

    <custom-list-item
      type="ecs"
      :visible.sync="show_custom" 
      :all_item="all_item"
      :all_column_item="all_table_item" 
      @fn-custom="FnGetTableItem"
    ></custom-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LabelBlock from "../../components/labelBlock.vue";
import actionBlock from "../../components/search/actionBlock.vue";
import SvgIcon from "../../components/svgIcon/index.vue";
import CustomListItem from '../../components/customListItem.vue';
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
import moment from "moment";
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
    CustomListItem
  },
})
export default class App extends Vue {
  private search_con = {
    az_id: { placeholder: "请选择可用区", list: [] },
    ecs_id: { placeholder: "请输入云服务器ID" },
    ecs_name: { placeholder: "请输入云服务器名称" },
    status: {
      placeholder: "请选择云服务器状态",
      list: [],
      multiple: true,
      default_value: [],
    },
    create_time: {
      placeholder: ["开始时间", "结束时间"],
      type: "daterange",
      width: "360",
      clearable: true,
      dis_day: 1,
      defaultTime: [],
    },
    customer_id: { placeholder: "请输入客户ID" },
    customer_name: { placeholder: "请输入客户名称" },
    os_type: { placeholder: "请选择操作系统", list: [] },
    private_net: { placeholder: "请输入私网IP" },
    host_id: { placeholder: "请输入物理机ID", default_value: "" },
  };
  private search_reqData = {};
  private search_billing_method = "all";
  private search_op_source = "";
  private search_ecs_goods_name = [];
  private instance_list: Array<Object> = [];
  private customer_id: string = "";
  private az_id: string = "";
  private is_gpu: number = 0;
  private origin_disk_size: number = 0;
  private support_gpu_driver: string = "";
  private spec_family_id: string = "";
  private billing_method: string = "0";
  private multiple_selection: Array<Object> = [];
  private multiple_selection_id: Array<string> = [];
  private operate_auth = [];
  private show_operate_dialog: boolean = false;
  private operate_title: string = "";
  private default_operate_type: string = "";
  private shutdown_ecs_type: string = "shutdown_ecs";
  private record_visible: boolean = false;
  private record_id: string = "";
  private detail_visible: boolean = false;
  private detail_id: string = "";
  private page_info = {
    page_sizes: [20, 50, 100],
    page_size: 20,
    page_index: 1,
    total: 0,
  };
  private billing_method_relation = {
    "": "不计费",
    0: "按需计费",
    1: "包年包月",
  };
  private billing_method_list = [];
  private ecs_goods_name_list = [];
  private timer = null;
  private os_info = {};
  private disk_billing_info = {};
  private total_price = "";
  private ecs_list_price = {};
  private loading = false;
  private sort_prop_name = "";
  private sort_order = 0;
  private show_custom = false;
  private all_item = [
    {
      name: "基本信息",
      filed: [
        {
          field_name: "ecs_id",
          show_name: "云服务器ID",
          sortable: "custom"
        },
        {
          field_name: "ecs_name",
          show_name: "云服务器名称",
          sortable: "custom"
        },
        {
          field_name: "customer_id",
          show_name: "客户ID",
          sortable: "custom"
        },
        {
          field_name: "customer_name",
          show_name: "客户名称",
          sortable: "custom"
        },
        {
          field_name: "customer_type",
          show_name: "客户类别",
          sortable: "custom"
        },
        {
          field_name: "customer_level",
          show_name: "客户等级",
          sortable: "custom"
        },
        {
          field_name: "az_name",
          show_name: "可用区",
          sortable: "custom"
        },
        {
          field_name: "pod",
          show_name: "POD",
          hidden: true,
          sortable: "custom"
        }
      ]
    },
    {
      name: "产品信息",
      filed: [
        {
          field_name: "goods_name",
          show_name: "计算规格",
          sortable: "custom"
        },
        {
          field_name: "system_disk_type",
          show_name: "系统盘类型",
          sortable: "custom"
        },
        {
          field_name: "system_disk_size",
          show_name: "系统盘容量",
          sortable: "custom"
        },
        {
          field_name: "data_disk_type",
          show_name: "数据盘类型",
          sortable: "custom"
        },
        {
          field_name: "data_disk_size",
          show_name: "数据盘容量",
          sortable: "custom"
        },
        {
          field_name: "host_name",
          show_name: "所属宿主机",
          sortable: "custom"
        },
        {
          field_name: "os_type",
          show_name: "操作系统类型",
          hidden: true,
          sortable: "custom"
        },
        {
          field_name: "os_version",
          show_name: "操作系统版本",
          hidden: true,
          sortable: "custom"
        },
        {
          field_name: "private_net",
          show_name: "主私网IP",
          hidden: true,
          sortable: "custom"
        },
        {
          field_name: "virtual_net",
          show_name: "虚拟出网网关",
          hidden: true,
          sortable: "custom"
        },
        {
          field_name: "pub_net",
          show_name: "公网IP",
          hidden: true,
          sortable: "custom"
        }
      ]
    },
    {
      name: "其他",
      filed: [
        {
          field_name: "create_time",
          show_name: "创建时间",
          sortable: "custom"
        },
        {
          field_name: "destroy_time",
          show_name: "销毁时间",
          hidden: true,
          sortable: "custom"
        },
        {
          field_name: "billing_method",
          show_name: "计费方式",
          sortable: "custom"
        },
        {
          field_name: "is_renewal",
          show_name: "续约方式",
          hidden: true,
          sortable: "custom"
        },
        {
          field_name: "status",
          show_name: "状态",
        }
      ]
    }
  ]
  private all_table_item = []
  private select_table_item = [];
  private filters_status = ["destroy", "destroying"]; // 运营op不展示销毁的状态
  private default_status = []; // 默认展示的状态

  private FnSearch(data: any = {}) {
    this.search_reqData = {
      az_id: data.az_id,
      ecs_id: data.ecs_id,
      ecs_name: data.ecs_name,
      // status: data.status && data.status.length > 0 ? data.status.join(",") : this.default_status.join(","), 和后端沟通，后端限制了status长度
      status: data.status && data.status.length > 0 ? data.status.join(",") : "",
      customer_id: data.customer_id,
      customer_name: data.customer_name,
      os_type: data.os_type,
      private_net: data.private_net,
      host_id: data.host_id,
      start_time:
        data.create_time && data.create_time[0]
          ? moment(data.create_time[0]).format("YYYY-MM-DD")
          : undefined,
      end_time:
        data.create_time && data.create_time[1]
          ? moment(data.create_time[1]).format("YYYY-MM-DD")
          : undefined,
    };
    this.page_info.page_index = 1;
    this.FnGetList();
  }
  // 筛选实例来源
  private handleFilterChange(val) {
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
    this.FnGetList();
  }
  // 列表排序
  private handleSortChange(val) {
    let relation = {
      private_net: "sort_private_ip",
      host_name: "sort_host_name",
    };
    this.sort_prop_name = relation[val.prop];
    this.sort_order = Number(val.order !== "ascending");
    this.FnGetList();
  }
  // 获取网段
  private FnGetNet(ip) {
    let data = ip.split(".");
    return [data[0], data[1], data[2], "0"].join(".");
  }
  private async FnGetList(loading: boolean = true) {
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
      [this.sort_prop_name]: String(this.sort_order),
      ...this.search_reqData,
    };
    if (this.search_op_source) {
      reqData["op_source"] = this.search_op_source;
    }
    if (this.search_ecs_goods_name.length > 0) {
      reqData["spec_family_ids"] = JSON.stringify(this.search_ecs_goods_name);
    }
    const resData: any = await Service.get_instance_list(reqData);
    if (resData.code === "Success") {
      this.instance_list = resData.data.ecs_list;
      var rows = [];
      if (this.multiple_selection_id.length > 0) {
        rows = resData.data.ecs_list.filter((row) =>
          this.multiple_selection_id.includes(row.ecs_id)
        );
      }
      if (rows && rows.length > 0) {
        this.$nextTick(() => {
          rows.forEach((row) => {
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
      ["reset_pwd", "update_spec", "update_system", "open_bill"].indexOf(
        type
      ) >= 0
    ) {
      if (!this.FnJudegCustomerAz(operate_info, type)) {
        return;
      }
      if (type === "open_bill") {
        this.FnGetEcsPrice();
      }
    } else {
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
      if (type === "update_spec" && this.is_gpu) {
        this.$message.warning(`不允许对GPU实例${operate_info.label}操作！`);
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
      ecs_ids: this.multiple_selection_id,
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
    }
  }
  private async FnPowerOperate(reqData) {
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
  private async FnDelete(reqData) {
    const resData: any = await Service.delete_instance(
      Object.assign(
        {
          is_gpu: this.is_gpu,
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
          is_gpu: this.is_gpu,
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
        gpu: data.gpu,
      },
      billing_info: data.billing_info[data.ecs_goods_id],
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
          gpu: data.spec_info.gpu,
        },
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
          gic_goods_id:
            this.disk_billing_info[disk_data.system_disk.ecs_goods_id]
              ?.gic_goods_id,
          goods_name: disk_data.system_disk.disk_name,
          disk_feature: disk_data.system_disk.disk_feature,
          disk_type: disk_data.system_disk.disk_type,
          disk_size: disk_data.system_disk.disk_size,
          storage_space: disk_data.system_disk.disk_size,
          handling_capacity: disk_data.system_disk.handling_capacity,
          iops: disk_data.system_disk.iops,
          is_follow_delete: disk_data.system_disk.is_follow_delete,
          origin_disk_size: this.origin_disk_size,
        },
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
      resource_type: "ecs",
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
      resource_type: "ecs",
    };
    const resData = await Service.start_charge(reqData);
    if (resData.code === "Success") {
      this.$message.success(`成功开启计费！`);
    }
    this.FnClose();
  }
  private async FnToVnc(id) {
    let resData: any = await Service.get_vnc_url({
      ecs_id: id,
    });
    if (resData.code === "Success") {
      let vnc_info = resData.data.vnc_info.split("/vnc_lite.html");
      let url = `${vnc_info[0]}/vnc_lite.html?op-token=${this.$store.state.token}?path=/?id=${id}`;
      window.open(url);
    }
  }
  private FnClose() {
    this.show_operate_dialog = false;
    this.default_operate_type = "";
    this.total_price = "";
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
    if (this.$store.state.status_list.length > 0) {
      this.search_con.status.list = this.$store.state.status_list;
      this.default_status = this.search_con.status.list.map(item => item.type)
    } else {
      const resData = await Service.get_status_list();
      if (resData.code === "Success") {
        this.search_con.status.list = [];
        for (let key in resData.data) {
          if (!this.filters_status.includes(key)) {
            this.search_con.status.list.push({
              label: resData.data[key],
              type: key,
            });
            this.default_status.push(key)
          }
        }
        this.$store.commit("SET_STATUS_LIST", this.search_con.status.list);
      }
    }
  }
  private async get_az_list() {
    const res = await EcsService.get_region_az_list({});
    if (res.code === "Success") {
      res.data.forEach((item) => {
        item.region_list.forEach((inn) => {
          this.search_con.az_id.list = [
            ...this.search_con.az_id.list,
            ...trans(inn.az_list, "az_name", "az_id", "label", "type"),
          ];
        });
      });
    }
  }
  // 获取云服务器类型信息
  private async FnGetCateGoryList() {
    const resData = await Service.get_family_data();
    if (resData.code === "Success") {
      this.ecs_goods_name_list = resData.data.spec_family_list.map((item) => {
        return {
          value: item.spec_family_id,
          text: item.name,
        };
      });
    }
  }
  private FnCustom() {
    this.show_custom = true;
  }
  // 自定义列表项后改变表格展示项
  private FnGetTableItem(item_list) {
    this.select_table_item = this.all_table_item.filter((item) =>
      item_list.includes(item.label)
    );
  }
  private async FnExport() {
    this.loading = true;
    const resData = await Service.export_list(
      Object.assign(
        {
          billing_method:
            this.search_billing_method == ""
              ? "no"
              : this.search_billing_method,
          op_source: this.search_op_source,
        },
        this.search_reqData
      )
    );
    if (resData) {
      this.loading = false;
      let blob = new Blob([resData], {
        type: "application/octet-stream",
      });
      let reader = new FileReader();
      reader.readAsText(blob, "utf-8");
      reader.onload = () => {
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "云服务器列表" + ".xlsx";
        link.click();
        window.URL.revokeObjectURL(link.href);
      };
    }
  }

  private created() {
    this.operate_auth = this.$store.state.auth_info[this.$route.name];
    this.FnGetStatus();
    this.get_az_list();
    // this.FnGetCateGoryList();
    this.search_con.os_type.list = [
      {
        label: "centos",
        type: "centos",
      },
      {
        label: "ubuntu",
        type: "ubuntu",
      },
      {
        label: "windows",
        type: "windows",
      },
    ];
    for (let key in this.billing_method_relation) {
      this.billing_method_list.push({
        value: key,
        text: this.billing_method_relation[key],
      });
    }
    if (this.$route.query.host_id) {
      this.search_con.host_id.default_value = this.$route.query
        .host_id as string;
      this.search_con.status.default_value = ["running", "shutdown", "deleted"];
    }
    this.all_item.forEach(item => {
      this.all_table_item.push(...item.filed.map(item => {
        return {
          label: item.show_name,
          prop: item.field_name,
          hidden: item.hidden,
          sortable: item.sortable
        }
      }))
    });
  }
  private beforeDestroy() {
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
.icon {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  i {
    font-size: 18px;
  }
}
</style>
<style lang="scss">
.instance-list .el-table__body-wrapper {
  max-height: calc(100vh - 430px);
  overflow: auto;
}
.instance-list .el-loading-spinner .circular {
  width: 24px;
  height: 24px;
}
</style>
