<template>
  <div>
    <back-header title="创建云服务器" back_url="/instance"></back-header>
    <div class="create-box">
      <div class="left-box">
        <el-card>
          <label-block label="客户ID" :is_required="true">
            <div class="input-msg-box">
              <div class="input-box">
                <el-input v-model="customer_id_input"></el-input>
              </div>
              <div v-show="error_msg.customer_id.show" class="error_message">{{ error_msg.customer_id.msg }}</div>
            </div>
          </label-block>
          <label-block label="客户名称">
            {{ customer_name }}
          </label-block>
          <label-block label="是否计费">
            <el-switch v-model="is_billing">
            </el-switch>
          </label-block>
        </el-card>

        <el-card>
          <label-block label="可用区" :is_required="true">
            <div class="region-box">
              <Area :list="region_list" @get_area_id="FnGetRegionId" :area="default_region.region_id" class="m-right20" />
              <el-select v-model="default_az" value-key="az_id">
                <el-option v-for="az in default_region.az_list" :key="az.az_id" :value="az" :label="az.az_name"></el-option>
              </el-select>
            </div>
          </label-block>
        </el-card>

        <el-card>
          <label-block label="网络" :is_required="true">
            <el-select v-model="default_vpc" value-key="vpc_id">
              <el-option v-for="vpc in vpc_list" :key="vpc.vpc_id" :value="vpc" :label="vpc.vpc_name"></el-option>
            </el-select>
            <span v-if="error_msg.vpc_id.show" class="error_message m-left10">{{ error_msg.vpc_id.msg }}</span>
            <el-select v-model="default_subnet" value-key="subnet_id" class="m-left20 m-right10">
              <el-option v-for="subnet in default_vpc.subnet_list" :key="subnet.subnet_id" :value="subnet" :label="subnet.subnet_name"></el-option>
            </el-select>
            <span v-if="error_msg.subnet_id.show" class="error_message m-right10">{{ error_msg.subnet_id.msg }}</span>
            <span class="prompt_message"> 可用IP数量 <span class="num_message">{{ default_subnet.ip_not_used }}</span> 个</span>
          </label-block>
        </el-card>

        <el-card>
          <label-block label="计算规格">
            <update-spec
              :az_id="default_az.az_id"
              :customer_id="customer_id"
              :billing_method="billing_method"
              @fn-spec="FnGetSpec">
            </update-spec>
          </label-block>
        </el-card>

        <el-card>
          <update-os
            :az_id="default_az.az_id"
            :is_gpu="ecs_spec_info.is_gpu"
            :customer_id="customer_id"
            :support_gpu_driver="ecs_spec_info.support_gpu_driver"
            @fn-os="FnGetOs">
          </update-os>
        </el-card>

        <el-card class="disk-box">
          <update-disk :az_id="default_az.az_id" :customer_id="customer_id"
            :system_disk="true"
            ref="update-disk"
            :data_disk="true"
            :is_gpu="ecs_spec_info.is_gpu"
            :os_disk_size="os_info.disk_size"
            :spec_family_id="ecs_spec_info.spec_family_id"
            :billing_method="billing_method"
            @fn-system-disk="FnGetSystemDisk"
            @fn-data-disk="FnGetDataDisk"
            @fn-billing-info="FnGetDiskBillingInfo">
          </update-disk>
        </el-card>

        <el-card>
          <label-block label="购买数量">
            <el-input-number
              v-model="num_info.num"
              :min="num_info.min"
              :max="num_info.max"
              @blur="FnCheckNum"
              @change="FnGetPrice"
            ></el-input-number>
            <span class="prompt_message m-left10" :class="{error_message: num_info.num > num_info.max}">
              一次最多可创建<span class="num_message"> {{ num_info.max }} </span>台实例
            </span>
            <el-button type="text" @click="FnGetLimitNum">
              <svg-icon icon="refresh" class="refresh"></svg-icon>
            </el-button>
          </label-block>
        </el-card>

        <el-card>
          <label-block label="名称">
            <div class="input-msg-box">
              <div class="input-box">
                <el-input v-model="ecs_name_info.ecs_name" @blur="FnCheckEcsName"></el-input>
              </div>
              <div v-show="error_msg.ecs_name.show" class="error_message">{{ error_msg.ecs_name.msg }}</div>
            </div>
            <div class="prompt_message"> 2-60个字符，可包含大小写字母、中文、数字、点号、下划线、半角冒号、连字符、英文括号等常用字符</div>
          </label-block>
          <update-pwd ref="update_pwd" :username="os_info.username"></update-pwd>
        </el-card>
      </div>
      <div class="right-box">
        <el-card class="fixed-top">
          <div slot="header">
            当前配置信息
          </div>
          <div class="right-row">
            <div>可用区</div>
            <div class="right-text">{{ default_region.region_name }} | {{ default_az.az_name }}</div>
          </div>
          <div class="right-row">
            <div>网络</div>
            <div class="right-text">{{ default_vpc.vpc_name }} | {{ default_subnet.subnet_name }}</div>
          </div>
          <div class="right-row">
            <div>计算规格</div>
            <div class="right-text">{{ ecs_spec_info.ecs_goods_name }} | {{ ecs_spec_info.cpu }}vCPU | {{ ecs_spec_info.ram }}GiB
              <span v-if="ecs_spec_info.is_gpu">| {{ ecs_spec_info.gpu }}*{{ ecs_spec_info.card_name }}</span>
            </div>
          </div>
          <div class="right-row">
            <div>镜像</div>
            <div class="right-text">{{os_info.os_label}}</div>
          </div>
          <div class="right-row">
            <div>系统盘({{ system_info.disk_name }})</div>
            <div class="right-text">{{ system_info.disk_size }}{{ system_info.disk_unit }}</div>
          </div>
          <div class="right-row">
            <div></div>
            <div class="num_message">{{ system_disk_price }}</div>
          </div>
          <div v-for="(value, key) in total_data_disk" :key="key" class="right-row">
            <div>数据盘({{ value.label }})</div>
            <div class="right-text">{{ value.size }}{{ value.unit }}</div>
          </div>
          <div class="right-row" v-if="Object.keys(total_data_disk).length > 0">
            <div></div>
            <div class="num_message">{{ data_disk_price }}</div>
          </div>
          <div class="right-row">
            <div>购买数量</div>
            <div class="right-text">{{ QTY }}</div>
          </div>
        </el-card>

        <el-card class="confirm-card">
          <div class="row" v-if="is_billing">
            <div>总价</div>
            <div class="num_message">{{ total_price }}</div>
          </div>
          <el-button type="primary" class="create-btn" @click="FnConfirmCreate" :disabled="allVoulumns">创 建</el-button>
        </el-card>
      </div>
    </div>
    <confirm-box :visible.sync="confirm_create_visible" @fn-create="FnCreate"></confirm-box>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import LabelBlock from '../../components/labelBlock.vue';
import BackHeader from '../../components/backHeader.vue';
import Area from '../../components/Area.vue';
import updateSpec from './updateSpec.vue';
import updateOs from './updateOs.vue';
import updateDisk from './updateDisk.vue';
import updatePwd from './resetPwd.vue';
import confirmBox from '../../components/confirmBox.vue';
import SvgIcon from '../../components/svgIcon/index.vue'
import Service from '../../https/instance/create';
import { checkEcsName } from '../../utils/checkEcsName';

@Component({
  components: {
    LabelBlock,
    BackHeader,
    Area,
    updateSpec,
    updateOs,
    updateDisk,
    updatePwd,
    confirmBox,
    SvgIcon
  }
})

export default class App extends Vue {
  $message;
  $router;
  $set;
  private customer_id = '';
  private customer_id_input = '';
  private customer_name = '';
  private is_billing = true;
  private billing_method = '0';
  private region_list = [];
  private default_region = {
    region_id: '',
    region_name: '',
    az_list: []
  };

  private default_az = {
    az_id: '',
    az_name: ''
  };

  private vpc_list = [];
  private default_vpc = {
    vpc_id: '',
    vpc_segment_id: '',
    vpc_segment_address: '',
    subnet_list: []
  };

  private default_subnet = {
    subnet_id: '',
    vlan_id: '',
    ip_address: '',
    mask: '',
    ip_type: '',
    ip_not_used: 0
  };

  private ecs_spec_info: any = {};
  private os_info: any = {};
  private system_info: any = {};
  private data_disk_list = [];
  private data_disks:any=[]
  private total_data_disk = {};
  private disk_billing_info = {};
  private QTY:number=1
  private num_info = {
    num: 1,
    min: 1,
    max: 1
  };
  private system_disk_price = '0.00';
  private data_disk_price = '0.00';
  private total_price = '0.00';
  private error_msg = {
    customer_id: { show: false, msg: '请输入正确的customer_id' },
    vpc_id: { show: false, msg: '无可用VPC' },
    subnet_id: { show: false, msg: '无可用子网' },
    ecs_name: { show: false, msg: '请输入正确的实例名称' }
  };

  private ecs_name_info = {
    ecs_name: '',
    password: '',
    confirm_password: ''
  };

  private confirm_create_visible: boolean = false;

  private async FnGetCustomerName () {
    const resData = await Service.get_customer_name({ customer_id: this.customer_id_input });
    if (resData.code === 'Success') {
      this.customer_id = resData.data.customer_id;
      this.customer_name = resData.data.customer_name;
      this.error_msg.customer_id.show = false;
      this.FnGetRegionAzList();
    }
  }

  private async FnGetRegionAzList () {
    const resData = await Service.get_region_az_list({ customer_id: this.customer_id });
    if (resData.code === 'Success') {
      this.region_list = resData.data;
    }
  }

  private FnGetRegionId (id) {
    for (const group of this.region_list) {
      for (const region of group.region_list) {
        if (region.region_id === id) {
          this.default_region = region;
          break;
        }
      }
    }
    this.default_az = this.default_region.az_list[0] || {
      az_id: '',
      az_name: ''
    };
  }

  private async FnGetNetList () {
    const resData = await Service.get_net_list({
      az_id: this.default_az.az_id,
      region_id: this.default_region.region_id,
      customer_id: this.customer_id
    });
    if (resData.code === 'Success') {
      this.vpc_list = resData.data.vpc_list;
      if (this.vpc_list.length > 0) {
        this.default_vpc = this.vpc_list[0];
        this.error_msg.vpc_id.show = false;
      } else {
        this.default_vpc = {
          vpc_id: '',
          vpc_segment_id: '',
          vpc_segment_address: '',
          subnet_list: []
        };
        this.default_vpc.subnet_list = [];
        this.error_msg.vpc_id.show = true;
      }
    }
  }

  private FnCheckEcsName (): boolean {
    const data = checkEcsName(this.ecs_name_info.ecs_name);
    this.error_msg.ecs_name.show = !data.flag;
    this.error_msg.ecs_name.msg = data.msg;
    return this.error_msg.ecs_name.show
  }

  private FnGetSpec (data): void {
    if (this.ecs_spec_info.is_gpu === data.is_gpu) {
      this.ecs_spec_info = data;
      this.FnGetLimitNum()
      this.FnGetPrice('spec')
    } else {
      this.ecs_spec_info = data; // 当cpu和gpu类型相互交换时，由系统盘改变触发算价
    }
  }

  private FnGetOs (data): void {
    this.os_info = {
      os_id: data.os_id,
      os_type: data.os_type,
      username: data.username,
      disk_size: Number(data.disk_size),
      os_label: data.os_label
    }
  }
  private get allVoulumns():boolean{//为true时禁用
    let dom:any = this.$refs['update-disk'] as updateDisk
    this.QTY = (this.data_disks.length >0 ? this.data_disks.reduce((pre,cur)=>{
      return pre + cur.num
    },0) : 0)+1
    return this.data_disks.length >0 ? this.data_disks.some(item=>dom.getResetInfo(item).reset<0) : false
  }
  //E888925
  private FnGetSystemDisk (data): void {
    this.system_info = data;
    this.FnGetLimitNum()
    this.FnGetPrice('system');
  }
  private FnGetDataDisk (data): void {
    this.data_disks = data
    this.data_disk_list = [];
    this.total_data_disk = {};
    data.forEach(item => {
      const row = {
        ebs_goods_id: item.default_disk_info.ecs_goods_id,
        goods_name: item.default_disk_info.disk_name,
        disk_feature: item.default_disk_info.disk_feature,
        disk_type: item.default_disk_info.disk_type,
        disk_size: item.disk_size,
        ebs_number: 1,
        is_follow_delete: Number(item.del)
      }
      if (row.disk_feature !== 'local') {
        row['storage_space'] = item.disk_size;
        row['iops'] = item.iops;
        row['handling_capacity'] = item.handling_capacity;
        row['gic_goods_id'] = this.disk_billing_info[item.default_disk_info.ecs_goods_id].gic_goods_id;
      } else {
        row.ebs_goods_id = this.ecs_spec_info.ecs_goods_id;
        row.is_follow_delete = 1;
        row['local_disk-space'] = item.disk_size;
        row['local_disk-IOPS'] = item.iops;
        row['local_disk-throughput'] = item.handling_capacity;
        row['gic_goods_id'] = this.ecs_spec_info.billing_info[row.ebs_goods_id].gic_goods_id;
      }
      for (let i = 0; i < item.num; i++) {
        this.data_disk_list.push(row)
      }
      const size = item.disk_size * item.num;
      if (this.total_data_disk[row.disk_feature]) {
        this.total_data_disk[row.disk_feature].size += size;
      } else {
        this.total_data_disk[row.disk_feature] = {
          label: row.goods_name,
          size,
          unit: item.default_disk_info.disk_unit
        }
      }
    })
    this.FnGetLimitNum()
    this.FnGetPrice('disk')
  }

  private FnGetDiskBillingInfo (data): void {
    this.disk_billing_info = data;
  }

  private async FnGetLimitNum () {
    if(!this.ecs_spec_info.spec_family_id || !this.ecs_spec_info.spec_id){
      return;
    }
    const resData = await Service.get_ecs_limit({
      customer_id: this.customer_id,
      az_id: this.default_az.az_id,
      spec_family_id: this.ecs_spec_info.spec_family_id,
      spec_id: this.ecs_spec_info.spec_id,
      disk_info: {
        system_disk: {
          disk_feature: this.system_info.disk_feature,
          disk_type: this.system_info.disk_type,
          disk_size: this.system_info.disk_size,
        },
        data_disks: this.data_disk_list,
      }
    })
    if (resData.code === 'Success') {
      this.num_info.max = resData.data.max_num
    }
  }
  // 数量输入框失焦时判断是否为空，为空则填充最小值
  private FnCheckNum () {
    if (!this.num_info.num) {
      this.num_info.num = this.num_info.min;
    }
  }

  private async FnGetPrice(type) {
    console.log('type', type)
    if (!this.ecs_spec_info.ecs_goods_id) {
      return
    }
    if (!this.system_info.disk_feature) {
      return
    }
    const reqData = {
      customer_id: this.customer_id,
      region_id: this.default_region.region_id,
      az_id: this.default_az.az_id,
      is_gpu: this.ecs_spec_info.is_gpu,
      batch: 0,
      billing_method: this.billing_method,
      ecs_info: {
        billing_info: this.ecs_spec_info.billing_info,
        ecs_goods_info: [{
          ecs_goods_id: this.ecs_spec_info.ecs_goods_id,
          cpu: this.ecs_spec_info.cpu,
          ram: this.ecs_spec_info.ram,
          gpu: this.ecs_spec_info.gpu,
          gic_goods_id: this.ecs_spec_info.billing_info[this.ecs_spec_info.ecs_goods_id].gic_goods_id
        }]
      },
      disk_info: {
        system_disk: {
          ebs_goods_id: this.system_info.ecs_goods_id,
          gic_goods_id: this.disk_billing_info[this.system_info.ecs_goods_id]?.gic_goods_id,
          goods_name: this.system_info.disk_name,
          disk_feature: this.system_info.disk_feature,
          disk_type: this.system_info.disk_type,
          disk_size: this.system_info.disk_size,
          is_follow_delete: this.system_info.is_follow_delete,
          storage_space: this.system_info.storage_space,
          iops: this.system_info.iops,
          handling_capacity: this.system_info.handling_capacity,
          ebs_number: 1
        },
        data_disk: this.data_disk_list,
        billing_info: this.disk_billing_info
      },
      number: this.num_info.num ? this.num_info.num : 1,
    }
    if (this.system_info.disk_feature === 'local') {
      reqData.disk_info.system_disk.ebs_goods_id = this.ecs_spec_info.ecs_goods_id;
      reqData.disk_info.billing_info[this.ecs_spec_info.ecs_goods_id] = this.ecs_spec_info.billing_info[this.ecs_spec_info.ecs_goods_id];
      reqData.disk_info.system_disk.gic_goods_id = reqData.disk_info.billing_info[this.ecs_spec_info.ecs_goods_id].gic_goods_id;
      reqData.disk_info.system_disk['local_disk-IOPS'] = this.system_info.iops;
      reqData.disk_info.system_disk['local_disk-space'] = this.system_info.storage_space;
      reqData.disk_info.system_disk['local_disk-throughput'] = this.system_info.handling_capacity;
    }
    const resData = await Service.get_price(reqData);
    if (resData.code === 'Success') {
      let { price_symbol, price_unit } = resData.data;
      let data_price = 0;
      if (resData.data.disk.data_disk?.length > 0) {
        data_price = resData.data.disk.data_disk.reduce((cur, item) => {
          return cur + item.price
        }, 0)
      }
      this.data_disk_price = price_symbol + data_price.toFixed(2) + '/' + price_unit;
      this.system_disk_price = price_symbol + resData.data.disk.system_disk.price.toFixed(2) + '/' + price_unit;
      this.total_price = price_symbol + resData.data.total_price.toFixed(2) + '/' + price_unit;
    }
  }

  private FnConfirmCreate () {
    if (!this.customer_id) {
      this.error_msg.customer_id.show = true;
      return
    } else if (this.FnCheckEcsName()) {
      return
    } else if (!this.default_subnet.subnet_id) {
      this.error_msg.subnet_id.show = true;
      return
    } else if (this.default_subnet.ip_not_used < this.num_info.num) {
      this.$message.warning('所选网络可用IP数量不足！')
      return
    } else if (this.num_info.num > this.num_info.max) {
      return
    }
    const pwd_result = (this.$refs.update_pwd as any).FnSubmit();
    if (!pwd_result.flag) {
      return
    } else {
      this.ecs_name_info.password = pwd_result.password;
    }
    this.confirm_create_visible = true;
  }

  private async FnCreate () {
    const reqData = {
      customer_id: this.customer_id,
      region_id: this.default_region.region_id,
      az_id: this.default_az.az_id,
      is_gpu: this.ecs_spec_info.is_gpu,
      cpu_model: this.ecs_spec_info.cpu_model,
      gpu_id : this.ecs_spec_info.gpu_id,
      net_info: {
        vpc_id: this.default_vpc.vpc_id,
        vpc_segment_id: this.default_vpc.vpc_segment_id,
        vpc_segment_address: this.default_vpc.vpc_segment_address,
        subnet_info: [{
          subnet_id: this.default_subnet.subnet_id,
          vlan_id: this.default_subnet.vlan_id,
          // ip_address: this.default_subnet.ip_address,
          mask: this.default_subnet.mask,
          ip_type: this.default_subnet.ip_type
        }]
      },
      ecs_spec_info: {
        ecs_goods_id: this.ecs_spec_info.ecs_goods_id,
        ecs_type: this.ecs_spec_info.ecs_type,
        ecs_family_name: this.ecs_spec_info.ecs_family_name,
        cpu: this.ecs_spec_info.cpu,
        ram: this.ecs_spec_info.ram,
        gpu: this.ecs_spec_info.gpu,
        billing_info: this.is_billing ? this.ecs_spec_info.billing_info[this.ecs_spec_info.ecs_goods_id] : {},
        gic_goods_id: this.ecs_spec_info.billing_info[this.ecs_spec_info.ecs_goods_id].gic_goods_id
      },
      os_id: this.os_info.os_id,
      os_type: this.os_info.os_type,
      disk_info: {
        system_disk: {
          ebs_goods_id: this.system_info.ecs_goods_id,
          gic_goods_id: this.disk_billing_info[this.system_info.ecs_goods_id]?.gic_goods_id,
          goods_name: this.system_info.disk_name,
          disk_feature: this.system_info.disk_feature,
          disk_type: this.system_info.disk_type,
          disk_size: this.system_info.disk_size,
          is_follow_delete: this.system_info.is_follow_delete,
          storage_space: this.system_info.storage_space,
          iops: this.system_info.iops,
          handling_capacity: this.system_info.handling_capacity
        },
        data_disks: this.data_disk_list,
        billing_info: this.is_billing ? this.disk_billing_info : {}
      },
      num: this.num_info.num ? this.num_info.num : 1,
      ecs_name: this.ecs_name_info.ecs_name.trim(),
      username: this.os_info.username || 'root',
      password: this.ecs_name_info.password
    }
    if (this.system_info.disk_feature === 'local') {
      reqData.disk_info.system_disk.ebs_goods_id = this.ecs_spec_info.ecs_goods_id;
      reqData.disk_info.system_disk.gic_goods_id = this.ecs_spec_info.billing_info[this.ecs_spec_info.ecs_goods_id].gic_goods_id;
      reqData.disk_info.billing_info[this.ecs_spec_info.ecs_goods_id] = this.ecs_spec_info.billing_info[this.ecs_spec_info.ecs_goods_id];
      reqData.disk_info.system_disk['local_disk-IOPS'] = this.system_info.iops;
      reqData.disk_info.system_disk['local_disk-space'] = this.system_info.storage_space;
      reqData.disk_info.system_disk['local_disk-throughput'] = this.system_info.handling_capacity;
    }
    const resData = await Service.create_instance(reqData);
    if (resData.code === 'Success') {
      this.$message.success(resData.msg || '成功下发 创 建 任务！')
      this.$router.push('/instance')
    }
  }

  @Watch('customer_id_input')
  private FnChangeCustomerId (newVal) {
    if (newVal.length > 6) {
      this.FnGetCustomerName();
    } else {
      this.error_msg.customer_id.show = true;
    }
  }

  @Watch('default_az.az_id')
  private FnChangeAz (newVal) {
    if (newVal) {
      this.FnGetNetList();
    }
  }

  @Watch('default_vpc.vpc_id')
  private FnChangeVpc (newVal) {
    if (this.default_vpc.subnet_list.length > 0) {
      this.default_subnet = this.default_vpc.subnet_list[0];
      this.error_msg.subnet_id.show = false;
    } else {
      this.default_subnet = {
        subnet_id: '',
        vlan_id: '',
        ip_address: '',
        mask: '',
        ip_type: '',
        ip_not_used: 0
      };
      this.error_msg.subnet_id.show = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.create-box {
  display: flex;
  .left-box {
    flex: 1;
  }
  .right-box {
    width: 316px;
    min-width: 316px;
    padding-left: 10px;
    margin-right: -10px;
    .right-row {
      display: flex;
      justify-content: space-between;
      line-height: 36px;
      font-size: 12px;
      .right-text {
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: right;
      }
    }
  }
  .confirm-card {
    .row {
      display: flex;
      justify-content: space-between;
    }
    position: fixed;
    bottom: 0;
    right: 20px;
    width: 316px;
  }
}
.el-card {
  margin-bottom: 10px;
  .input-msg-box {
    display: flex;
  }
  .input-box {
    width: 420px;
    margin-right: 20px;
  }
  .row {
    line-height: 42px;
  }
  .left-title {
    display: inline-block;
    width: 50px;
    font-size: 12px;
  }
}
.create-btn {
  width: 100%;
}
.region-box {
  display: flex;
}
</style>
