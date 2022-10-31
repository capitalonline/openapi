<template>
    <div class="nas-detail">
        <back-header
            :pathName="'filesystem_list'"
            :title="'文件系统详情'"
            :btnTitle="'返回'"
        >
        </back-header>
        <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="base">
                <el-card class="m-bottom20">
                    <div slot="header" class="clearfix">
                        <span class="title">文件系统信息</span>
                    </div>
                    <el-descriptions class="margin-top" :column="2">
                        <el-descriptions-item v-for="(item,i) in fileInfo" :key="i" :label="item.label">{{item.value}}
                            <span v-if="i==='mount_path'" class="m-left10">
                                <Clipboard :content="item.value"></Clipboard>
                            </span></el-descriptions-item>
                    </el-descriptions>
                </el-card>
                
                <!-- <el-divider></el-divider> -->
                <el-card>
                    <div slot="header" class="clearfix">
                        <span class="title">中转虚拟机信息</span>
                    </div>
                    <el-descriptions class="margin-top" :column="2">
                        <el-descriptions-item v-for="(item,i) in vmInfo" :key="i" :label="item.label">
                            <el-button type="text" v-if="i==='transfer_vm_id'" @click="FnToMonitor(detailInfo[i])">{{detailInfo[i]}}</el-button>
                            <div v-else-if="i==='ip'">
                                <div>VPC:{{detailInfo.transfer_vm_vpc_ip}}</div>
                                <div>存储网:{{detailInfo.transfer_vm_storage_ip}}</div>
                            </div>
                            <div v-else-if="i==='config'">
                                <div>CPU:{{detailInfo.transfer_vm_conf_cpu}}</div>
                                <div>内存:{{detailInfo.transfer_vm_conf_mem}}</div>
                                <div>系统盘:{{detailInfo.transfer_vm_conf_system_disk_size ? `${detailInfo.transfer_vm_conf_system_disk_size}${detailInfo.transfer_vm_conf_system_disk_unit} (${detailInfo.transfer_vm_conf_system_disk_type})` : ''}}</div>
                            </div>
                            <span v-else>{{detailInfo[i]}}</span>
                            
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="文件系统监控" name="monitor">
                <template v-if="activeName==='monitor'">
                    <Monitor :info="{'id':$route.query.id,'region_id':detailInfo.region_id}"></Monitor>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
     
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync,Emit} from 'vue-property-decorator';
import Service from '../../https/filesystem/list';
import moment from 'moment';
import backHeader from '@/components/backHeader.vue';
import detail from '@/https/event/detail';
import Monitor from './monitor.vue';
import Clipboard from '../../components/clipboard.vue';
@Component({
    components:{
        backHeader,
        Monitor,
        Clipboard
    }
})
export default class NasDetail extends Vue{
    private activeName:string='base'
    private fileInfo:any={
        customer_id:{label:'客户ID',value:''},
        customer_name:{label:'客户名称',value:''},
        nas_id:{label:'文件系统ID',value:''},
        nas_name:{label:'文件系统名称',value:''},
        nas_type:{label:'NAS类型',value:''},
        protocol_type:{label:'协议类型',value:''},
        az_name:{label:'地域及可用区',value:''},
        vpc_id:{label:'VPC',value:''},
        subnet_id:{label:'子网',value:''},
        mount_path:{label:'挂载地址',value:''},
        used:{label:'已使用量/总容量',value:''},
        billing_method:{label:'计费方式',value:''},
        status_ch:{label:'状态',value:''},
        create_time:{label:'创建时间',value:''},
    }
    private vmInfo:any={
        transfer_vm_id:{label:'虚拟机ID',value:''},
        // transfer_vm_name:{label:'虚拟机名称',value:''},
        ip:{label:'虚拟机IP地址',value:''},
        config:{label:'虚拟机配置',value:''},
        transfer_vm_host_name:{label:'所在宿主机',value:''},
    }
    private units=['B','KB','MB','GB','TB','PB','EB','ZB']
    private clear=null
    private feeInfo={
      '0':'按需计费',
      '1':'包年包月',
      '2':'按次计费',
    }
    private detailInfo:any={}
    created() {
        this.getDetail()
    }
    private async getDetail(){
        let res:any = await Service.get_nas_detail({
            nas_id:this.$route.query.id
        })
        if(res.code==="Success"){
            this.detailInfo = res.data;
            this.getFileUse()
            for(let i in this.fileInfo){
                if(i==='az_name'){
                    this.fileInfo[i].value=res.data.region_name ? `${res.data.region_name}-${res.data.az_name}` : '--'
                }else if(i==='vpc_id'){
                    this.fileInfo[i].value=res.data.vpc_id ? `${res.data.vpc_id} / ${res.data.vpc_name}` : '--'
                }else if(i==='subnet_id'){
                    this.fileInfo[i].value=res.data.subnet_id ? `${res.data.subnet_id} / ${res.data.subnet_name}` : '--'
                }else if(i==='mount_path'){
                    this.fileInfo[i].value=res.data.mount_path ? res.data.mount_path[0] : ''
                }else if(i==='billing_method'){
                    this.fileInfo[i].value=this.feeInfo[res.data.billing_method]
                }else if(i==='create_time'){
                    this.fileInfo[i].value=res.data.create_time ? moment(res.data.create_time).format('YYYY-MM-DD HH:mm:ss') : ''
                }else{
                    this.fileInfo[i].value = res.data[i]
                }   
                
            }
        }
    }
    private FnSetTimer(){
      if(this.clear){
        this.FnClearTimer()
      }
      this.clear = setTimeout(()=>{
        this.getFileUse(false)
      },1000*60)
    }
    private FnClearTimer(){
      if(this.clear){
        clearTimeout(this.clear)
      }
    }
    private async getFileUse(loading:boolean=true){
      if(!loading){
        this.$store.commit("SET_LOADING",false)
      }
      let res:any = await Service.get_file_use({
        region_id:this.detailInfo.region_id,
        volume_ids:[this.detailInfo.nas_id]
      })
      if(res.code==='Success'){
            let id:string = this.detailInfo.nas_id
            let size  = this.computeUnit(res.data[id]&& res.data[id].used ? res.data[id].used : 0);
            let total = this.computeUnit(res.data[id]&& res.data[id].total ? (res.data[id].total) : 0);
            this.fileInfo.used.value  = `${size} / ${total}`
        }
    }
    private computeUnit(value,num=0){
        if(value>=1024){
            return this.computeUnit(value/1024,++num)
        }else{
            return value.toFixed(2) + this.units[num];
        }        
    }
    beforeDestroy() {
        this.FnClearTimer()
    }
    private FnToMonitor(row) {
        sessionStorage.setItem('vm_monitor',JSON.stringify({
            ...row,
            hostId:row.transfer_vm_id,
            ip:row.transfer_vm_storage_ip,
            instanceType:'vm',
            os:'linux',
            region_id:row.region_id,
            replica:row.az_id,
            id:row.transfer_vm_id
        }))
        this.$router.push("/instance/monitor/" + row.transfer_vm_id);
    }
    // private FnToMonitor(id) {
    //     this.$router.push("/instance/monitor/" + id);
    // }
}

</script>
<style lang="scss">
    .nas-detail{
        .el-card__header{
            font-size: 14px !important;
            font-weight: bold !important;
        }
    }

</style>