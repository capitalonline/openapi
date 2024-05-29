<template>
  <div>
    <el-dialog
      title="配置详情"
      :visible.sync="visible"
      width="60%"
      :destroy-on-close="true"
      @close="back"
    >
      <div v-loading="loading">
        <el-row :gutter="20">
          <el-col :span="10">
            <span class="label">云服务器ID:</span>
            <span>{{detail && detail.ecs_id}}</span>
          </el-col>
          <el-col :span="10">
            <span class="label">地域:</span>
            <span>{{detail && detail.region_name}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" class="name-row">
            <span class="label">云服务器名称:</span>
            <span><pre>{{detail && detail.ecs_name}}</pre></span>
          </el-col>
          <el-col :span="10">
            <span class="label">可用区:</span>
            <span>{{detail && detail.az_name}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <span class="label">状态:</span>
            <span>{{detail && detail.status_display}}</span>
          </el-col>
        </el-row>
        <div class="title">计算规格</div>
        <el-row :gutter="20">
          <el-col :span="20" v-if="detail && detail.ecs_rule && detail.ecs_rule.conf_name">
            <span class="label">{{detail && detail.ecs_rule && detail.ecs_rule.conf_name}}:</span>
            <span>{{detail && detail.ecs_rule && detail.ecs_rule.name}}</span>
            <span v-if="detail && detail.ecs_rule && detail.ecs_rule.cpu_num">&nbsp;&nbsp;
              {{detail && detail.ecs_rule && detail.ecs_rule.cpu_num}}vCPU
              <span>{{detail && detail.ecs_rule && detail.ecs_rule.ram}}GiB</span>
              <span v-if="detail && detail.is_gpu">{{detail && detail.ecs_rule && detail.ecs_rule.gpu}}*{{detail && detail.card_name}}</span>
            </span>
          </el-col>
        </el-row>
        <div class="title">操作系统</div>
        <div class="content">{{detail && detail.os_info && detail.os_info.name}}</div>
        <div class="title">存储</div>
        <div class="content">
          <span class="label">系统盘：</span>
          <span class="data-disk" v-if="detail && detail.disk && detail.disk.system_disk_conf" >{{detail && detail.disk && detail.disk.system_disk_conf && detail.disk.system_disk_conf.disk_name}}</span>
          <span class="data-disk-unit" v-if="detail && detail.disk && detail.disk.system_disk_conf && detail.disk.system_disk_conf.size">{{detail && detail.disk && detail.disk.system_disk_conf && detail.disk.system_disk_conf.size}}{{detail && detail.disk && detail.disk.system_disk_conf && detail.disk.system_disk_conf.unit}}</span>
          <span class="id_name" v-if="detail && detail.disk && detail.disk.system_disk_conf && detail.disk.system_disk_conf.id">({{detail && detail.disk && detail.disk.system_disk_conf && detail.disk.system_disk_conf.id}} / {{detail && detail.disk && detail.disk.system_disk_conf && detail.disk.system_disk_conf.name}})</span>

        </div>
        <div class="content data_disk">
          <span class="label">数据盘：</span>
          <div class="disk_content" v-if="detail && detail.disk && detail.disk.data_disk_conf">
            <div v-for="item in detail.disk.data_disk_conf" :key="item.id">
              <span class="data-disk">{{item.disk_name}}</span>
              <span class="data-disk-unit">{{item.size}}{{item.unit}}</span>
              <span class="id_name">({{item.id}} / {{item.name}})</span>
              <span>{{item.is_follow_delete ? '随实例删除' :'不随实例删除'}}</span>
            </div>
          </div>

        </div>
        <div class="title">网络</div>
        <div class="content">
          <span class="label">VPC:</span>
          <span v-if="detail && detail.pipe && detail.pipe.vpc_id">{{detail && detail.pipe && detail.pipe.vpc_id}} / {{detail && detail.pipe && detail.pipe.vpc_name}}</span>
        </div>
        <div class="content">
          <span class="label">子网:</span>
          <span v-if="detail && detail.pipe && detail.pipe.subnet_id">{{detail && detail.pipe && detail.pipe.subnet_id}} / {{detail && detail.pipe && detail.pipe.subnet_name}}</span>
        </div>
        <div class="content display-flex">
          <span class="label">私网IP：</span>
          <span v-if="detail && detail.pipe">
            <template v-if="detail.pipe.private_net">{{ detail.pipe.private_net }} （主）</template><br>
            <template v-if="detail.pipe.pub_net">
              {{ detail.pipe.pub_net }}
              <template v-if="detail.pipe.eip_info[detail.pipe.pub_net] && detail.pipe.eip_info[detail.pipe.pub_net].conf_name">
                （{{ detail.pipe.eip_info[detail.pipe.pub_net].conf_name }}）
              </template>
              <br>
            </template>
            <span v-for="item in detail.pipe.virtual_net" :key="item">
              {{ item }}
              <template v-if="detail.pipe.eip_info[item] && detail.pipe.eip_info[item].conf_name">
                （{{ detail.pipe.eip_info[item].conf_name }}）
              </template><br>
            </span>
          </span>
        </div>
        <div class="content display-flex">
          <span class="label">公网IP：</span>
          <span v-if="detail && detail.pipe">
            <template v-if="detail.pipe.pub_net && detail.pipe.eip_info[detail.pipe.pub_net] && detail.pipe.eip_info[detail.pipe.pub_net].eip_ip">
              {{ detail.pipe.eip_info[detail.pipe.pub_net].eip_ip }}
              （{{ detail.pipe.eip_info[detail.pipe.pub_net].conf_name }}）
              <br>
            </template>
            <span v-for="item in detail.pipe.virtual_net" :key="item">
              <template v-if="detail.pipe.eip_info[item] && detail.pipe.eip_info[item].conf_name">
                {{ item.eip_ip}}
                （{{ detail.pipe.eip_info[item].conf_name }}）
              </template><br>
            </span>
          </span>
        </div>
        <div class="divider"></div>
        <div class="content">
          <span class="label">所属机房:</span>
          <span>{{detail && detail.engine_room}}</span>
        </div>
        <div class="content">
          <span class="label">所属节点:</span>
          <span>{{detail && detail.host_name}}</span>
        </div>
        <div class="content">
          <span class="label">所属物理机:</span>
          <span v-if="detail && detail.host_id">{{detail && detail.host_id}}&nbsp;&nbsp;&nbsp;<span v-if="detail && detail.host_status">( {{detail && detail.host_status}} )</span></span>
        </div>
        <div class="content">
          <span class="label">处理器型号:</span>
          <span>{{detail && detail.cpu_type}}</span>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="back" type="primary">返回</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue,Prop,Emit } from 'vue-property-decorator';
import Service from '@/https/instance/record_detail'
@Component
export default class InsDetail extends Vue{
  $message;
  @Prop(Boolean) visible!:Boolean;
  @Prop(String) detail_id!:String;
  private detail:any =null
  private loading:Boolean =false;
  private async getDetail(){
    // this.loading=true
    let res:any = await Service.get_detail({
      ecs_id:this.detail_id,
    })
    if(res.code==="Success"){
      this.loading=false
      this.detail = res.data
    }else{
      this.loading=false
    }
  }
  @Emit("close-detail")
  private back(){

  }

  created() {
    this.getDetail()
  }
}
</script>
<style lang="scss" scoped>
.el-row{
  margin: 10px 0 !important;
  .el-col-10,.el-col-20{
    padding: 0 !important;
    span:first-child{
      margin-right: 8px;
    }
  }
}
.name-row {
  display: flex;
  line-height: 22px;
}
.title{
  font-size: 16px;
  padding: 20px 0 10px 0;
  border-top: 1px solid #ccc;
  font-weight: 600;
}
.content{
  margin:10px 0;
  span:first-child{
    margin-right: 8px;
  }

}
.display-flex {
  display: flex;
}
// .label{
//   width: 100px;
// }
.data_disk{
  display: flex;
  .disk_content{
    div{
      margin-bottom: 10px;
    }
    div:last-child{
      margin-bottom: 0;
    }
  }
}
.data-disk{
  display: inline-block;
  width: 150px;
  margin: 0 !important;
}
.data-disk-unit{
  display: inline-block;
  width: 100px;
  margin: 0;
}
.id_name{
  display: inline-block;
  width: 350px;
}
.divider{
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 20px;
}
.dialog-footer{
  border-top: 1px solid #ccc;
  text-align: right !important;
  margin-top: 10px !important;
  padding-top: 20px;
}
</style>

