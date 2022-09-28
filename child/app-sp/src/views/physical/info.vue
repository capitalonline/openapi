<template>
    <div class="info">
        <div class="item">
            <div v-for="(item,id) in base_info" :key="id" >
                <span class="m-right10">{{item.label}}</span>
                
                <span v-if="id==='gpu_instance'" class="check-group">
                    <el-checkbox-group v-model="detail_info.gpu_instance">
                        <el-checkbox label="pass-through" disabled>GPU直通</el-checkbox>
                        <el-checkbox label="virtualized" disabled>GPU虚拟化</el-checkbox>
                    </el-checkbox-group>
                </span>
                <span class="clickble" v-else-if="id==='vm_count'" @click="goToInstance">{{item.value}}</span>
                <el-tooltip v-else-if="id==='netcard_count'" class="item" effect="light" placement="right">
                    <div slot="content">
                        <p v-for="(net,index) in detail_info.host_nic" :key="index">{{net}}</p>
                    </div>
                    <span class="num_message">{{item.value}}</span>
                </el-tooltip>
                <span v-else>{{item.value}}</span>
            </div>
        </div>
        <div class="progress">
            <div class="bar" v-for="(item,id) in progress_info" :key="id">
                <div class="flex-between m-bottom5">
                    <span>{{item.label}}</span>
                    <span>可用：{{item.remain}}</span>
                </div>
                <el-progress :text-inside="true" :stroke-width="16" color="#455cc6" :percentage="item.percentage"></el-progress>
                <div class="flex-between m-top5">
                    <span>已用：{{item.used}}</span>
                    <span>容量：{{item.total}}</span>
                </div>
            </div>
            <div class="bar m-top50">
                <div class="mark">
                    <el-tooltip content='已分配的核数/总核数(cpu个数*物理cpu核数*2)' placement='bottom' effect="light">
                        <div class="m-bottom10">已分配CPU核数：<span class="destroy">{{detail_info.vcpu_allot}}</span> / {{detail_info.cpu_cores_total}}</div>
                    </el-tooltip>
                    <el-tooltip content='已分配的内存容量/该物理机总容量' placement='bottom' effect="light">
                        <div class="m-bottom10">已分配内存容量：<span class="destroy">{{detail_info.memory_allot}}</span> / {{detail_info.memory_total}}</div>
                    </el-tooltip>
                    <el-tooltip content='已分配的显卡容量/该宿主机显卡总数量' placement='bottom' effect="light" v-if="['GPU','CPU/GPU','vGPU'].includes(detail_info.gpu_instance)">
                        <div>已分配显卡：<span class="destroy">{{parseInt(detail_info.gpu_count) - parseInt(detail_info.gpu_free)}}</span> / {{detail_info.gpu_count}}</div>
                    </el-tooltip>
                </div>
                
            </div>
        </div>
        
    </div>
</template>
<script lang="ts">
import { Component, Emit, Vue ,Prop} from 'vue-property-decorator';
import Service from '../../https/physical/list';
import moment from 'moment';
import MarkTip from '../../components/markTip.vue'
@Component({
    components:{
        MarkTip
    }
})
export default class Info extends Vue{
    $route;
    $router;
    @Prop(String)host_id!:string;
    private base_info={
        host_model:{label:'型号:',value:'111'},
        cpu_model:{label:'处理器类型:',value:''},
        cpu_sockets:{label:'处理器数量:',value:''},
        cpu_cores_total:{label:'逻辑处理器:',value:''},
        netcard_count:{label:'网卡:',value:''},
        gpu_model:{label:'显卡型号:',value:''},
        gpu_count:{label:'显卡数量:',value:''},
        disk_type:{label:'磁盘类型:',value:''},
        status:{label:'状况:',value:''},
        start_time:{label:'运行时间:',value:''},
        os_version:{label:'操作系统:',value:''},
        vm_count:{label:'虚拟机:',value:''},
        SRIOV:{label:'SRIOV:',value:''},
        gpu_instance:{label:'GPU实例:',value:''},
        agent_version:{label:'Agent版本:',value:''},
        kernel_version:{label:'内核版本:',value:''},
    }
    private progress_info={
        cpu:{label:'CPU',used:'0%',remain:'100%',total:'100%',percentage:0},
        memory:{label:'内存',used:'0GB',remain:'0GB',total:'0GB',percentage:0},
        storage:{label:'存储',used:'0GB',remain:'0GB',total:'0GB',percentage:0}
    }
    private detail_info:any={}
    created() {
        this.get_info()
    }
    private async get_info(){
        let res:any = await Service.get_detail_overview({
            host_id:this.host_id
        })
        if(res.code==="Success"){
            // this.gpu_instance = res.data.gpu_instance;
            this.detail_info = res.data
            for(let i in this.base_info){
                this.base_info[i].value = res.data[i]
            }
            this.base_info.start_time.value=this.detail_info.start_time ? moment(new Date()).diff(moment(this.detail_info.start_time), 'days')<=0 ? moment(new Date()).diff(moment(this.detail_info.start_time), 'hours')+'小时' :
                                            moment(new Date()).diff(moment(this.detail_info.start_time), 'days')+'天' : '无'
            this.base_info.SRIOV.value =this.base_info.SRIOV.value  ? '支持' :'不支持';
            this.progress_info.cpu = {
                ...this.progress_info.cpu,
                used:this.detail_info.cpu_usage,
                remain:(100-this.detail_info.cpu_usage)+'%',
                percentage:this.detail_info.cpu_usage
            }
            this.progress_info.memory = {
                ...this.progress_info.memory,
                used:(this.detail_info.memory_total - this.detail_info.memory_free)+'GB',
                remain:this.detail_info.memory_free+'GB',
                total:this.detail_info.memory_total+'GB',
                percentage:this.detail_info.memory_usage
            }
            this.progress_info.storage = {
                ...this.progress_info.storage,
                used:this.detail_info.ram_allot+'GB',
                total:this.detail_info.ram_allot + this.detail_info.ram_free+'GB',
                remain:this.detail_info.ram_free+'GB',
                percentage:Number(((this.detail_info.ram_allot / (this.detail_info.ram_allot + this.detail_info.ram_free))*100).toFixed(0))
            }

        }
    }
    private goToInstance(){
        this.$router.push({
            name:'instance_list',
            query:{
                host_id:this.host_id
            }
        })
    }
}
</script>
<style lang="scss" scoped>
.info{
    display: flex;
    .item{
        flex:1;
        div{
            margin-bottom: 15px;
            font-size: 14px;
        }
        
    }
    .progress{
        width: 40%;
        .bar{
            max-width: 400px;
            font-size: 14px;
            width: 100%;
            margin: auto;
            margin-bottom: 20px;
            .mark{
                max-width: 200px;
                
            }

        }
        
    }
    .check-group{
        .el-checkbox-group{
            display: inline;
        }
        
    }
    .m-bottom5{
        margin-bottom: 5px;
    }
    .m-top5{
        margin-top: 5px;
    }
    .m-top50{
        margin-top: 50px !important;
    }
}

</style>