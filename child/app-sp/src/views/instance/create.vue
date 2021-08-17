<template>
  <div>
    <back-header title="创建云服务器" back_url="/instance"></back-header>
    <div class="create-box">
      <div class="left-box">
        <el-card>
          <label-block label="客户ID">
            <div class="input-msg-box">
              <div class="input-box">
                <el-input v-model="customer_id"></el-input>
              </div>
              <div v-show="error_msg.customer_id.show" class="warning_message">{{ error_msg.customer_id.msg }}</div>
            </div>
          </label-block>
          <label-block label="客户名称">
            {{ customer_name }}
          </label-block>
        </el-card>

        <el-card>
          <label-block label="可用区">
            <el-select v-model="default_region" value-key="region_id" class="m-right20">
              <el-option v-for="region in region_list" :key="region.region_id" :value="region" :label="region.region_name"></el-option>
            </el-select>
            <el-select v-model="default_az" value-key="az_id">
              <el-option v-for="az in default_region.az_list" :key="az.az_id" :value="az" :label="az.az_name"></el-option>
            </el-select>
          </label-block>
        </el-card>

        <el-card>
          <label-block label="网络">
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
            <div class="row">
              <span class="left-title">类型</span>
              <el-select v-model="default_calc" value-key="ecs_goods_id">
                <el-option v-for="calc in calc_list" :key="calc.ecs_goods_id" :value="calc" :label="calc.ecs_goods_name"></el-option>
              </el-select>
            </div>
            <div class="row">
              <span class="left-title">vCPU</span>
              <el-select v-model="default_spec" value-key="cpu_size" class="m-right20">
                <el-option v-for="spec in default_calc.ecs_spec_list" :key="spec.cpu_size" :value="spec" :label="spec.cpu_size"></el-option>
              </el-select>
              <span class="left-title">内存</span>
              <el-select v-model="default_ram">
                <el-option v-for="ram in default_spec.ram_size_list" :key="ram" :value="ram" :label="ram"></el-option>
              </el-select>
            </div>
          </label-block>
        </el-card>

        <el-card>
          <label-block label="镜像">
            <div class="m-bottom10">
              <el-radio-group v-model="default_os_template_type.os_template_type">
                <el-radio-button v-for="(value, os_template_type) in os_list" :key="os_template_type" :label="os_template_type"> {{ value.name }} </el-radio-button>
              </el-radio-group>
            </div>
            <el-select v-model="default_os_type" class="m-right20">
              <el-option v-for="os_type in default_os_template_type.os_types" :key="os_type" :value="os_type" :label="os_type"></el-option>
            </el-select>
            <el-select v-model="default_os_version" value-key="os_id" class="m-right10">
              <el-option v-for="version in default_os_template_type.os_versions[default_os_type]" :key="version.os_id" :value="version" :label="version.name"></el-option>
            </el-select>
            <span v-show="error_msg.os_id.show" class="warning_message">{{ error_msg.os_id.msg }}</span>
          </label-block>
        </el-card>

        <el-card class="disk-box">
          <label-block label="系统盘" class="m-bottom10">
            <el-select v-model="default_system_info" value-key="ecs_goods_id" class="m-right20" @change="FnChangeSysGoods">
              <el-option v-for="item in system_disk_info" :key="item.ecs_goods_id" :value="item" :label="item.disk_name"></el-option>
            </el-select>
            <el-input-number v-model="system_size" 
              :min="Number(default_system_info.disk_min)" 
              :max="Number(default_system_info.disk_max)" 
              :step="Number(default_system_info.disk_step)"
              step-strictly></el-input-number> 
            {{ default_system_info.disk_unit }}
          </label-block>
          <label-block label="数据盘">
            <!-- TODO key值 -->
            <div v-for="(data, index) in data_disk_list" :key="index" class="m-bottom10">
              <i class="el-icon-remove-outline delete-icon" @click="FnDelDataDisk(index)"></i>
              <el-select v-model="data.default_disk_info" value-key="ecs_goods_id" class="m-right20">
                <el-option v-for="item in data_disk_info" :key="item.ecs_goods_id" :value="item" :label="item.disk_name"></el-option>
              </el-select>
              <el-input-number v-model="data.disk_size" 
                :min="Number(data.default_disk_info.disk_min)" 
                :max="Number(data.default_disk_info.disk_max)" 
                :step="Number(data.default_disk_info.disk_step)"
                step-strictly></el-input-number> 
              {{ data.default_disk_info.disk_unit }}
              <el-input-number v-model="data.num" :min="data.min" :max="FnGetSurplus + data.num" :step="1" class="m-left10 m-right10"></el-input-number> 
              <el-checkbox v-model="data.del">随实例删除</el-checkbox>
            </div>
            <div class="disk-btn">
              <el-button type="text" @click="FnAddDataDisk" :disabled="FnGetSurplus === 0"><i class="el-icon-circle-plus"></i> 添加数据盘</el-button>
              <div class="prompt_message">您已选择 <span class="num_message">{{ FnGetDiskNum }}</span> 块盘， 
              还可以添加 <span class="num_message">{{ FnGetSurplus }}</span> 块盘</div>
            </div>
          </label-block>
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
          <label-block label="用户名">
            {{ default_os_version.username }}
          </label-block>
          <label-block label="密码">
            <template #default>
              <div class="input-msg-box">
                <div class="input-box">
                  <el-input type="password" v-model="ecs_name_info.password" placeholder="请输入密码" @blur="FnCheckPwd"></el-input>
                </div>
                <div v-show="error_msg.password.show" class="warning_message">{{ error_msg.password.msg }}</div>
              </div>
              <div class="prompt_message"> 8-30个字符，且同时包含三项（大写字母、小写字母、数字、()`~!@#$%^&*-+=_|{}[]:;,.?/中的特殊字符）</div>
              <div class="input-msg-box">
                <div class="input-box">
                  <el-input type="password" v-model="ecs_name_info.confirm_password" placeholder="请确认密码" @blur="FnCheckConPwd"></el-input>
                </div>
                <div v-show="error_msg.confirm_password.show" class="warning_message">{{ error_msg.confirm_password.msg }}</div>
              </div>
            </template>
          </label-block>
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
            <div>{{ default_spec.cpu_size }}核{{ default_ram }}G</div>
          </div>
          <div class="right-row">
            <div>系统盘({{ default_system_info.disk_name }})</div>
            <div>{{ system_size }}{{ default_system_info.disk_unit }}</div>
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
import Service from '../../https/instance/create';
import { checkPwd } from '../../utils/checkPwd';
import { checkEcsName } from '../../utils/checkEcsName';

@Component({
  components: {
    LabelBlock,
    BackHeader
  },
})

export default class App extends Vue {
  $message;
  $router;
  private customer_id = '';
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
  private calc_list = [];
  private default_calc = {
    ecs_goods_id: '',
    ecs_goods_name: '',
    ecs_spec_list: []
  };
  private default_spec = {
    cpu_size: '',
    ram_size_list: []
  };
  private default_ram = '';
  private os_list = [];
  private default_os_template_type = {
    os_template_type: '',
    os_types: [],
    os_versions: {}
  };
  private default_os_type = '';
  private default_os_version = {
    os_id: '',
    os_type: '',
    username: ''
  }; 
  private system_disk_info = [];
  private data_disk_info = [];
  private default_system_info = {
    ecs_goods_id: '',
    disk_name: '',
    disk_type: '',
    disk_feature: '',
    disk_min: 0,
    disk_max: 0,
    disk_step: 0,
    disk_unit: 'G'
  };
  private data_disk_list: Array<Object> = [];
  private system_size = 0;
  private num_info = {
    num: 1,
    min: 1,
    max: 20
  }; 
  private error_msg = {
    customer_id: { show: false, msg: '请输入正确的customer_id' },
    vpc_id: { show: false, msg: '无可用VPC' },
    subnet_id: { show: false, msg: '无可用子网' },
    os_id: { show: false, msg: '无可用镜像' },
    ecs_name: { show: false, msg: '请输入正确的实例名称' },
    password: { show: false, msg: '' },
    confirm_password: { show: false, msg: '两次密码输入不一致' }
  }
  private ecs_name_info = {
    ecs_name: '',
    password: '',
    confirm_password: ''
  };
  private async FnGetCustomerName() {
    const resData: any = await Service.get_customer_name({customer_id: this.customer_id});
    if (resData.code == 'Success') {
      this.customer_name = resData.data.customer_name;
      this.error_msg.customer_id.show = false;
      this.FnGetRegionAzList();
    }
  }
  private async FnGetRegionAzList() {
    const resData: any = await Service.get_region_az_list({customer_id: this.customer_id});
    if (resData.code == 'Success') {
      this.region_list = resData.data;
      if (this.default_region.region_id == this.region_list[0].region_id) {
        this.FnChangeAz(this.default_az.az_id)
      } else {
        this.default_region = this.region_list[0];
      }
    }
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
  private async FnGetSpecList() {
    let resData: any = await Service.get_spec_list({
      az_id: this.default_az.az_id,
      customer_id: this.customer_id
    });
    if (resData.code == 'Success') {
      this.calc_list = resData.data.length > 0 ? resData.data : [{ecs_spec_list: []}];
      this.default_calc = this.calc_list[0];
    }
  }
  private async FnGetOsList() {
    let resData: any = await Service.get_os_list({
      customer_id: this.customer_id, 
      az_id: this.default_az.az_id});
    if (resData.code == 'Success') {
      this.os_list = resData.data;
      if (this.default_os_template_type.os_template_type == Object.keys(this.os_list)[0]) {
        this.FnChangeOsTemplateType(this.default_os_template_type.os_template_type)
      } else {
        this.default_os_template_type.os_template_type = Object.keys(this.os_list)[0];
      }   
    }
  }
  private async FnGetDiskInfo() {
    let resData: any = await Service.get_disk_info({
      az_id: this.default_az.az_id,
      customer_id: this.customer_id
    });
    if (resData.code == 'Success') {
      this.system_disk_info = resData.data.system_disk;
      this.default_system_info = this.system_disk_info[0];
      this.FnChangeSysGoods();
      this.data_disk_info = resData.data.data_disk;
    }
  }
  private FnChangeSysGoods() {
    this.system_size = this.default_system_info.disk_min;
  }
  private FnAddDataDisk() {
    if (this.FnGetSurplus == 0) {
      return
    }
    let data = {
      default_disk_info: {
        disk_min: 0,
        disk_max: 0,
        disk_step: 0,
        disk_unit: 'G',
        disk_name: ''
      },
      disk_size: 0,
      num: 1,
      min: 1,
      del: false
    }
    data.default_disk_info = this.data_disk_info[0];
    if ( !data.default_disk_info.disk_max ) {
      return
    }
    data.disk_size = data.default_disk_info.disk_min;
    this.data_disk_list.push(data);
  }
  private FnDelDataDisk(index) {
    this.data_disk_list.splice(index, 1)
  }
  private FnCheckEcsName (): boolean {
    let data: any = checkEcsName(this.ecs_name_info.ecs_name);
    this.error_msg.ecs_name.show = !data.flag;
    this.error_msg.ecs_name.msg = data.msg;
    return this.error_msg.ecs_name.show
  }
  private FnCheckPwd(): boolean {
    let data: any = checkPwd(this.ecs_name_info.password);
    this.error_msg.password.show = !data.flag;
    this.error_msg.password.msg = data.msg;
    return this.error_msg.password.show
  }
  private FnCheckConPwd(): boolean {
    if (this.ecs_name_info.password != this.ecs_name_info.confirm_password) {
      this.error_msg.confirm_password.show = true;
    } else {
      this.error_msg.confirm_password.show = false;
    }
    return this.error_msg.confirm_password.show
  }
  private async FnCreate() {
    if (!this.customer_id) {
      this.error_msg.customer_id.show = true;
      return
    } else if(this.FnCheckEcsName()) {
      return
    } else if(this.FnCheckPwd()) {
      return
    } else if(this.FnCheckConPwd()) {
      return
    } else if(!this.default_subnet.subnet_id) {
      this.error_msg.subnet_id.show = true;
      return
    } else if(!this.default_os_version.os_id) {
      this.error_msg.os_id.show = true;
      return
    } else if(this.default_subnet.ip_not_used < this.num_info.num) {
      this.$message.warning('所选网络可用IP数量不足！')
      return
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
      ecs_spec_info: {
        ecs_goods_id: this.default_calc.ecs_goods_id,
        goods_name: this.default_calc.ecs_goods_name,
        cpu_size: this.default_spec.cpu_size,
        ram_size: this.default_ram
      },
      os_id: this.default_os_version.os_id,
      os_type: this.default_os_version.os_type,
      disk_info: {
        system_disk: {
          ecs_goods_id: this.default_system_info.ecs_goods_id,
          goods_name: this.default_system_info.disk_name,
          disk_feature: this.default_system_info.disk_feature,
          disk_type: this.default_system_info.disk_type,
          disk_size: this.system_size
        },
        data_disks: data_list
      },
      num: this.num_info.num,
      ecs_name: this.ecs_name_info.ecs_name,
      username: this.default_os_version.username || 'root',
      password: this.ecs_name_info.password
    }
    console.log("reqData", reqData)
    const resData: any = await Service.create_instance(reqData);
    if (resData.code == 'Success') {
      this.$message.success(resData.msg || '成功下发 创 建 任务！')
      this.$router.push('/instance')
    }
  }

  private get FnGetDiskNum(): number {
    if (this.data_disk_list.length > 0) {
      return this.data_disk_list.reduce((accumulator, currentValue: any = {num: 0}) => {
        return accumulator + currentValue.num
      }, 0);
    } else {
      return 0
    }
  }

  private get FnGetSurplus() {
    return 16 - this.FnGetDiskNum
  }

  @Watch('customer_id')
  private FnChangeCustomerId(newVal) {
    if (newVal.length > 6) {
      this.FnGetCustomerName();
    } else {
      this.error_msg.customer_id.show = true;
    }
  }
  @Watch('default_region.region_id')
  private FnChangeRegion(newVal) {
    if (newVal) {
      this.default_az = this.default_region.az_list[0] || {
        az_id: '',
        az_name: ''
      };
    }
  }
  @Watch('default_az.az_id')
  private FnChangeAz(newVal) {
    if (newVal) {
      this.FnGetNetList();
      this.FnGetSpecList();
      this.FnGetOsList();
      this.FnGetDiskInfo();
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
  @Watch('default_calc.ecs_goods_id')
  private FnChangeCalc(newVal) {
    if (newVal) {
      this.default_spec = this.default_calc.ecs_spec_list[0];
    }
  }
  @Watch('default_spec.cpu_size')
  private FnChangeSpec(newVal) {
    if (newVal) {
      this.default_ram = this.default_spec.ram_size_list[0];
    }
  }
  @Watch('default_os_template_type.os_template_type')
  private FnChangeOsTemplateType(newVal) {
      this.default_os_template_type.os_types = this.os_list[newVal].os_types;
      this.default_os_template_type.os_versions = this.os_list[newVal].os_versions;
      if (this.default_os_type == this.default_os_template_type.os_types[0]) {
        this.FnChangeOsType(this.default_os_type)
      } else {
        this.default_os_type = this.default_os_template_type.os_types[0];
      }
  }
  @Watch('default_os_type')
  private FnChangeOsType(newVal) {
    if (newVal) {
      this.default_os_version = this.default_os_template_type.os_versions[this.default_os_type][0];
      this.error_msg.os_id.show = false;
    } else {
      this.default_os_version = {
        os_id: '',
        os_type: '',
        username: ''
      };
      this.error_msg.os_id.show = true;
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
.disk-box {
  .el-select {
    width: 160px;
  }
  i {
    font-size: 24px;
    margin-right: 2px;
    vertical-align: middle;
  }
  .delete-icon {
    margin-right: 6px;
    color: #da3b18;
    cursor: pointer;
  }
  .disk-btn {
    display: flex;
    justify-content: space-between;
  }
}
</style>

