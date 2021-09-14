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
              <div v-show="error_msg.customer_id.show" class="warning_message">{{ error_msg.customer_id.msg }}</div>
            </div>
          </label-block>
          <label-block label="客户名称">
            {{ customer_name }}
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
            <span v-if="error_msg.vpc_id.show" class="warning_message m-left10">{{ error_msg.vpc_id.msg }}</span>
            <el-select v-model="default_subnet" value-key="subnet_id" class="m-left20 m-right10">
              <el-option v-for="subnet in default_vpc.subnet_list" :key="subnet.subnet_id" :value="subnet" :label="subnet.subnet_name"></el-option>
            </el-select>
            <span v-if="error_msg.subnet_id.show" class="warning_message m-right10">{{ error_msg.subnet_id.msg }}</span>
            <span class="prompt_message"> 可用IP数量 <span class="num_message">{{ default_subnet.ip_not_used }}</span> 个</span>
          </label-block>
        </el-card>

        <el-card>
          <label-block label="计算规格">
            <update-spec :az_id="default_az.az_id" :customer_id="customer_id" @fn-spec="FnGetSpec"></update-spec>
          </label-block>
        </el-card>

        <el-card>
          <update-os :az_id="default_az.az_id" :customer_id="customer_id" @fn-os="FnGetOs"></update-os>
        </el-card>

        <el-card class="disk-box">
          <update-disk :az_id="default_az.az_id" :customer_id="customer_id" 
            :system_disk="true" 
            :data_disk="true"
            :os_disk_size="os_info.disk_size"
            @fn-system-disk="FnGetSystemDisk" 
            @fn-data-disk="FnGetDataDisk">
            </update-disk>
        </el-card>

        <el-card>
          <label-block label="购买数量">
            <el-input-number v-model="num_info.num" :min="num_info.min" :max="num_info.max"></el-input-number>
            <span class="prompt_message m-left10">一次最多创建20台</span>
          </label-block>
        </el-card>

        <el-card>
          <label-block label="名称">
            <div class="input-msg-box">
              <div class="input-box">
                <el-input v-model="ecs_name_info.ecs_name" @blur="FnCheckEcsName"></el-input>
              </div>
              <div v-show="error_msg.ecs_name.show" class="warning_message">{{ error_msg.ecs_name.msg }}</div>
            </div>
            <div class="prompt_message"> 2-60个字符，可包含大小写字母、中文、数字、点号、下划线、半角冒号、连字符、英文括号等常用字符</div>
          </label-block>
          <update-pwd ref="update_pwd" :username="os_info.username"></update-pwd>
        </el-card>
      </div>
      <div class="right-box">
        <el-card>
          <div slot="header"> 
            当前配置信息
          </div>
          <div class="right-row">
            <div>可用区</div>
            <div>{{ default_region.region_name }} -- {{ default_az.az_name }}</div>
          </div>
          <div class="right-row">
            <div>网络</div>
            <div>{{ default_vpc.vpc_name }} -- {{ default_subnet.subnet_name }}</div>
          </div>
          <div class="right-row">
            <div>计算规格</div>
            <div>{{ ecs_spec_info.cpu_size }}核{{ ecs_spec_info.ram_size }}GiB</div>
          </div>
          <div class="right-row">
            <div>系统盘({{ system_info.disk_name }})</div>
            <div>{{ system_info.disk_size }}{{ system_info.disk_unit }}</div>
          </div>
          <div v-for="(item, index) in data_disk_list" :key="index" class="right-row">
            <div>数据盘({{ item.default_disk_info.disk_name }})</div>
            <div>{{ item.disk_size }}{{ item.default_disk_info.disk_unit }}({{ item.num }})</div>
          </div>
          <div class="right-row">
            <div>购买数量</div>
            <div>{{ num_info.num }}</div>
          </div>
        </el-card>
      </div>
      <div class="confirm-box">
        <el-card>
          <el-button type="primary" class="create-btn" @click="FnCreate">创 建</el-button>
        </el-card>
      </div>
    </div>
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
    updatePwd
  },
})

export default class App extends Vue {
  $message;
  $router;
  $set;
  private customer_id = '';
  private customer_id_input = '';
  private customer_name = '';
  private region_list = [];
  private default_region = {
    region_id: '',
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
  private num_info = {
    num: 1,
    min: 1,
    max: 20
  }; 
  private error_msg = {
    customer_id: { show: false, msg: '请输入正确的customer_id' },
    vpc_id: { show: false, msg: '无可用VPC' },
    subnet_id: { show: false, msg: '无可用子网' },
    ecs_name: { show: false, msg: '请输入正确的实例名称' },
  }
  private ecs_name_info = {
    ecs_name: '',
    password: '',
    confirm_password: ''
  };
  private async FnGetCustomerName() {
    const resData: any = await Service.get_customer_name({customer_id: this.customer_id_input});
    if (resData.code == 'Success') {
      this.customer_id = this.customer_id_input;
      this.customer_name = resData.data.customer_name;
      this.error_msg.customer_id.show = false;
      this.FnGetRegionAzList();
    }
  }
  private async FnGetRegionAzList() {
    const resData: any = await Service.get_region_az_list({customer_id: this.customer_id});
    if (resData.code == 'Success') {
      this.region_list = resData.data;
      // if (this.default_region.region_id == this.region_list[0].region_id) {
      //   this.FnChangeAz(this.default_az.az_id)
      // } else {
      //   this.default_region = this.region_list[0];
      // }
    }
  }
  private FnGetRegionId(id) {
    for (let group of this.region_list) {
      for (let region of group.region_list) {
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
  private async FnGetNetList() {
    const resData: any = await Service.get_net_list({
      az_id: this.default_az.az_id,
      region_id: this.default_region.region_id,
      customer_id: this.customer_id
    });
    if (resData.code == 'Success') {
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
    let data: any = checkEcsName(this.ecs_name_info.ecs_name);
    this.error_msg.ecs_name.show = !data.flag;
    this.error_msg.ecs_name.msg = data.msg;
    return this.error_msg.ecs_name.show
  }
  private FnGetSpec(data): void {
    this.ecs_spec_info = data
  }
  private FnGetOs(data): void {
    this.os_info = {
      os_id: data.os_id,
      os_type: data.os_type,
      username: data.username,
      disk_size: Number(data.disk_size)
    }
  }
  private FnGetSystemDisk(data): void {
    this.system_info = data;
  }
  private FnGetDataDisk(data): void {
    this.data_disk_list = data;
  }
  private async FnCreate() {
    if (!this.customer_id) {
      this.error_msg.customer_id.show = true;
      return
    } else if(this.FnCheckEcsName()) {
      return
    } else if(!this.default_subnet.subnet_id) {
      this.error_msg.subnet_id.show = true;
      return
    } else if(this.default_subnet.ip_not_used < this.num_info.num) {
      this.$message.warning('所选网络可用IP数量不足！')
      return
    }
    let pwd_result = (this.$refs.update_pwd as any).FnSubmit();
    if (!pwd_result.flag) {
      return
    } else {
      this.ecs_name_info.password = pwd_result.password;
    }
    let data_list = [];
    this.data_disk_list.forEach((item: any) => {
      let data = {
        ecs_goods_id: item.default_disk_info.ecs_goods_id,
        goods_name: item.default_disk_info.disk_name,
        disk_feature: item.default_disk_info.disk_feature,
        disk_type: item.default_disk_info.disk_type,
        disk_size: item.disk_size,
        is_follow_delete: item.del
      }
      for (let i = 0; i < item.num; i++) {
        data_list.push(data)
      }
    })
    const reqData = {
      customer_id: this.customer_id,
      az_id: this.default_az.az_id,
      net_info: {
        vpc_id: this.default_vpc.vpc_id,
        vpc_segment_id: this.default_vpc.vpc_segment_id,
        vpc_segment_address: this.default_vpc.vpc_segment_address,
        subnet_info: [{
          subnet_id: this.default_subnet.subnet_id,
          vlan_id: this.default_subnet.vlan_id,
          ip_address: this.default_subnet.ip_address,
          mask: this.default_subnet.mask,
          ip_type: this.default_subnet.ip_type
        }]
      },
      ecs_spec_info: this.ecs_spec_info,
      os_id: this.os_info.os_id,
      os_type: this.os_info.os_type,
      disk_info: {
        system_disk: {
          ecs_goods_id: this.system_info.ecs_goods_id,
          goods_name: this.system_info.disk_name,
          disk_feature: this.system_info.disk_feature,
          disk_type: this.system_info.disk_type,
          disk_size: this.system_info.disk_size
        },
        data_disks: data_list
      },
      num: this.num_info.num,
      ecs_name: this.ecs_name_info.ecs_name,
      username: this.os_info.username || 'root',
      password: this.ecs_name_info.password
    }
    const resData: any = await Service.create_instance(reqData);
    if (resData.code == 'Success') {
      this.$message.success(resData.msg || '成功下发 创 建 任务！')
      this.$router.push('/instance')
    }
  }

  @Watch('customer_id_input')
  private FnChangeCustomerId(newVal) {
    if (newVal.length > 6) {
      this.FnGetCustomerName();
    } else {
      this.error_msg.customer_id.show = true;
    }
  }
  @Watch('default_az.az_id')
  private FnChangeAz(newVal) {
    if (newVal) {
      this.FnGetNetList();
    }
  }
  @Watch('default_vpc.vpc_id')
  private FnChangeVpc(newVal) {
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
    width: 360px;
    padding-left: 20px;
    .right-row {
      display: flex;
      justify-content: space-between;
      line-height: 36px;
      font-size: 12px;
    }
  }
  .confirm-box {
    position: fixed;
    bottom: 0;
    right: 30px;
    width: 360px;
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

