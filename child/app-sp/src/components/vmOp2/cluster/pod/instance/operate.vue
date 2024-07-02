<template>
  <el-dialog
    :title="title"
    :visible.sync="show_operate_dialog"
    :close-on-click-modal="false"
    @close="back"
    width="60%"
  >
    <template v-if="oper_type === 'restore'">
      <Recover
        ref="recover"
        :multiple_selection="multiple_selection"
        :customer_id="customer_id"
        :is_gpu="is_gpu"
        @fn-close="back"
      ></Recover>
    </template>
    <div v-else>
      <el-alert
        :title="`是否确定要对以下实例执行 ${title} 操作`"
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
          v-if="oper_type === 'update_system'"
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
          v-if="oper_type === 'update_system'"
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
          v-if="oper_type === 'open_bill'"
        >
          <template #default="scope">
            <span>{{ ecs_list_price[scope.row.ecs_id] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="component-box">
        <template v-if="oper_type === 'update_spec'">
          <update-spec
            ref="update_spec"
            :ecs_list_info="multiple_selection"
            :customer_id="customer_id"
            :az_id="az_id"
            type="batch_update"
            :default_is_gpu="is_gpu"
          ></update-spec>
        </template>
        <template v-if="oper_type === 'update_system'">
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
            :disk_feature="system_disk_feature"
          >
          </update-disk>
          <reset-pwd
            ref="reset_pwd"
            :customer_id="customer_id"
            :az_id="az_id"
            :username="os_info.username"
          ></reset-pwd>
        </template>
        <div v-if="oper_type === 'gpu_manage'">
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
        <template v-if="oper_type === 'reset_pwd'">
          <reset-pwd
            ref="reset_pwd"
            label="新密码"
            :customer_id="customer_id"
            :az_id="az_id"
          ></reset-pwd>
        </template>
      </div>
      <div class="text-right m-right20" v-if="total_price && oper_type !== 'update_spec' ">
        <span v-if="oper_type === 'update_system'">变更后需支付费用</span>
        <span v-else>变更后总价：</span>
        <span class="num_message">{{ total_price }}</span>
      </div>
      <div class="text-center" v-if="oper_type === 'shutdown_ecs'">
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
      <template v-if="oper_type === 'restart_ecs'">
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
        <el-button @click="back">取 消</el-button>
      </span>
  </el-dialog>
</template>

<script lang="ts">
import {Component, Emit, Prop, PropSync, Vue} from "vue-property-decorator";
import Service from "@/https/vmOp2/cluster/pod/instance";
import Recover from "@/views/instance/recover.vue";
import updateSpec from "@/views/instance/updateSpec.vue";
import updateOs from "@/views/instance/updateOs.vue";
import updateDisk from "@/views/instance/updateDisk.vue";
import resetPwd from "@/views/instance/resetPwd.vue";
import MarkTip from "@/components/markTip.vue";
import SvgIcon from "@/components/svgIcon/index.vue";
@Component({
  components: {
    Recover,
    updateSpec,
    updateOs,
    updateDisk,
    resetPwd,
    MarkTip,
    SvgIcon
  }
})

export default class Operate extends Vue{
  @PropSync('visible') show_operate_dialog!:Boolean;
  @Prop({default:()=>[]}) multiple_selection!:any
  @Prop(String) title!:string;
  @Prop(String) oper_type!:string;
  @Prop(String) customer_id!:string
  @Prop(String) az_id!:string
  @Prop(Number) is_gpu!:number
  @Prop({default:()=>[]}) multiple_selection_id!:any
  @Prop({default:''}) private system_disk_feature!:string
  @Prop(Number) origin_disk_size!:number
  @Prop(String) spec_family_id!:string
  @Prop(String) os_type!:string
  @Prop(String) support_gpu_driver!: string
  private gpu_card_operate:string=''
  private billing_method: string = "0";
  private shutdown_ecs_type: string = "shutdown_ecs";
  private restart_ecs_type: string = "restart_ecs";
  private os_info = {};
  private disk_billing_info = {};
  private total_price = "";
  private ecs_list_price = {};
  private page_info = {
    page_sizes: [20, 50, 100],
    page_size: 20,
    page_index: 1,
    total: 0
  };
  @Emit("close")
  private back(val){
    this.show_operate_dialog=false
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
    if (this.system_disk_feature === "local") {
      reqData.ebs_goods_info["local_disk-IOPS"] = data.iops;
      reqData.ebs_goods_info["local_disk-space"] = data.storage_space;
      reqData.ebs_goods_info["local_disk-throughput"] = data.handling_capacity;
    } else {
      reqData.ebs_goods_info["iops"] = data.iops;
      reqData.ebs_goods_info["storage_space"] = data.storage_space;
      reqData.ebs_goods_info["handling_capacity"] = data.handling_capacity;
    }
    const resData = await Service.change_system_price(reqData);
    if (this.billing_method === "0") {
      this.total_price =
        resData.data.price_symbol +
        resData.data.total_price.toFixed(2) +
        "/" +
        resData.data.price_unit;
    } else {
      this.total_price =
        resData.data.price_symbol + resData.data.total_price.toFixed(2);
    }
  }
  private FnConfirm() {
    if (this.oper_type === "restore") {
      (this.$refs.recover as any).FnRecover();
      return;
    }
    const reqData = {
      op_type: this.oper_type,
      customer_id: this.customer_id,
      az_id: this.az_id,
      ecs_ids: this.multiple_selection_id
    };
    if (
      ["start_up_ecs", "shutdown_ecs", "restart_ecs"].indexOf(
        this.oper_type
      ) >= 0
    ) {
      this.FnPowerOperate(reqData);
    } else if (this.oper_type === "delete_ecs") {
      this.FnDelete(reqData);
    } else if (this.oper_type === "destroy_ecs") {
      this.FnDestroy(reqData);
    } else if (this.oper_type === "reset_pwd") {
      this.FnResetPwd(reqData);
    } else if (this.oper_type === "update_spec") {
      this.FnUpdateSpec(reqData);
    } else if (this.oper_type === "update_system") {
      this.FnUpdateSystem(reqData);
    } else if (this.oper_type === "open_bill") {
      this.FnOpenBill(
        Object.assign({ billing_method: this.billing_method }, reqData)
      );
    }else if(this.oper_type === "gpu_manage"){
      this.mount_gpu_card()
    }
  }
  private async FnPowerOperate(reqData) {
    if (this.oper_type === "restart_ecs") {
      reqData.op_type = this.restart_ecs_type;
    }
    if (this.oper_type === "shutdown_ecs") {
      reqData.op_type = this.shutdown_ecs_type;
    }
    const resData = await Service.operate_instance(reqData);
    if (resData.code == "Success") {
      this.$message.success(
        resData.msg || `成功下发 ${this.title} 任务！`
      );
      this.FnClose();
    }
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
        resData.msg || `成功下发 ${this.title} 任务！`
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
        resData.msg || `成功下发 ${this.title} 任务！`
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
          resData.msg || `成功下发 ${this.title} 任务！`
        );
      }
      this.FnClose();
    }
  }
  private async FnUpdateSpec(reqData) {
    let data = (this.$refs.update_spec as any).FnSubmit();
    if (data.flag) {
      reqData.ecs_list = data.spec_info.ecs_list
      reqData.billing_info = data.spec_info.billing_info[data.spec_info.ecs_goods_id];
      reqData.ecs_info = {
        ecs_family_name: data.spec_info.ecs_goods_name,
        cpu: data.spec_info.cpu,
        gpu: data.spec_info.gpu,
        ram: data.spec_info.ram,
        spec_id: data.spec_info.spec_id,
        ecs_goods_id: data.spec_info.ecs_goods_id,
        spec_family_id: data.spec_info.spec_family_id,
        cpu_name: data.spec_info.cpu_model,
        gpu_card_name: data.spec_info.gpu_card_name,
        gpu_type_id: data.spec_info.gpu_id,
        cpu_real_name: data.spec_info.cpu_real_name,
      };
      let resData: any = await Service.update_spec(reqData);
      if (resData.code === "Success") {
        this.$message.success(
          resData.msg || `成功下发 ${this.title} 任务！`
        );
      }
      this.FnClose();
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
      reqData.billing_method = this.billing_method
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
          resData.msg || `成功下发 ${this.title} 任务！`
        );
      }
      this.FnClose();
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
  private async mount_gpu_card(){
    if (this.gpu_card_operate === 'ecs_detach_gpu_card' && this.multiple_selection[0].status === 'deleted') {
      this.$message.warning('不支持对已删除的云服务器进行卸载显卡操作')
      return;
    }
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
  private FnClose() {
    this.total_price = "";
    this.gpu_card_operate='';
    this.back('1')
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
