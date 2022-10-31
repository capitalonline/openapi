<template>
    <div>
        <action-block :search_option="search_option" @fn-search="search">
            <!-- <template #default>
                <el-button type="primary" @click="destroy" :disabled="!auth_list.includes('add_mirror')">销毁</el-button>
            </template> -->
        </action-block>
        <div class="icon m-bottom10">
            <!-- <el-tooltip content="导出" placement="bottom" effect="light">
                <el-button type="text" @click="down" :disabled="!auth_list.includes('export')"><svg-icon icon="export" class="export"></svg-icon></el-button>
            </el-tooltip> -->
            <el-tooltip content="刷新" placement="bottom" effect="light">
                <el-button type="text" @click="refresh"><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
            </el-tooltip>
        </div>
        <el-table 
            :data="list" 
            border 
        >
            <el-table-column prop="transfer_vm_id" label="虚拟机ID/名称">
                <template slot-scope="scope">
                    <div>
                        <el-tooltip 
                            :content="scope.row.transfer_vm_id" 
                            placement="bottom" 
                            effect="light">
                                <span class="id-cell num_message">{{ scope.row.transfer_vm_id }}</span>
                        </el-tooltip>
                        <Clipboard :content="scope.row.transfer_vm_id" v-if="scope.row.transfer_vm_id"></Clipboard>
                    </div>
                    <div>{{scope.row.transfer_vm_name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="transfer_vm_host_name" label="宿主机名称"></el-table-column>
            <el-table-column prop="status_cn" label="状态">
                <template slot-scope="scope">
                    <span :class="scope.row.status">{{scope.row.status_cn}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="vpc_id" label="VPC ID/名称">
                <template slot-scope="scope">
                    <div class="not-clickable">{{scope.row.vpc_id}}</div>
                    <div>{{scope.row.vpc_name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="subnet_id" label="子网ID/子网名称">
                <template slot-scope="scope">
                    <div class="not-clickable">{{scope.row.subnet_id}}</div>
                    <div>{{scope.row.subnet_name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="transfer_vm_vpc_ip" label="VPC IP/存储网IP">
                <template slot-scope="scope">
                    <div>VPC IP:{{scope.row.transfer_vm_vpc_ip}}</div>
                    <div>存储网IP:{{scope.row.transfer_vm_storage_ip}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="transfer_vm_conf_cpu" label="CPU"></el-table-column>
            <el-table-column prop="transfer_vm_conf_mem" label="内存"></el-table-column>
            <el-table-column prop="transfer_vm_os_type" label="操作系统"></el-table-column>
            <el-table-column prop="transfer_vm_image" label="镜像名称"></el-table-column>
            <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="FnVnc(scope.row.transfer_vm_id)" :disabled="!auth_list.includes('vnc')">远程连接</el-button> 
                    <el-button type="text" @click="FnToMonitor(scope.row)" :disabled="!auth_list.includes('monitor')">监控</el-button> 
                    <!-- <el-button type="text" @click="record(scope.row)" :disabled="!auth_list.includes('record')">操作记录</el-button>  -->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[20, 50, 100]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import SvgIcon from '../../components/svgIcon/index.vue';
import EcsService from "../../https/instance/list";
import Service from '../../https/filesystem/list';
import moment from 'moment';
import Clipboard from '../../components/clipboard.vue'
@Component({
    components:{
        ActionBlock,
        SvgIcon,
        Clipboard
    }
})
export default class CommonMirror extends Vue{
    private search_option:Object={
        transfer_vm_id:{placeholder:'请输入虚拟机ID'},
        transfer_vm_name:{placeholder:'请输入虚拟机名称'},
        vpc_id:{placeholder:'请输入VPC名称'},
        vpc_ip:{placeholder:'请输入VPC  IP地址'},
        transfer_vm_storage_ip:{placeholder:'请输入存储网IP地址'},
    }
    private list:Array<any>=[]
    private current:number = 1
    private size:number = 20
    private total:number = 0
    private search_data:any={};
    private auth_list:any=[];
    private operateInfo:any={}
    private visible:boolean=false
    created() {
        this.auth_list = this.$store.state.auth_info[this.$route.name];
        console.log('this.auth_list',this.auth_list)
        this.search()
    }
    @Watch('visible')
    private watch_visible(nv){
        if(!nv){
            this.getVmList()
        }
    }
    @Watch('$store.state.pod_id')
    private watch_pod(){
        this.search(this.search_data)
    }
    private async getVmList(){
        let res:any = await Service.get_vm_list({
            ...this.search_data,
            pod_id:this.$store.state.pod_id,
            page_index:this.current,
            page_size:this.size
        })
        if(res.code==="Success"){
            this.list = res.data.transfer_list;
            this.total = res.data.page.count
            
        }
    }
    private search(data:any={}){
        this.current = 1;
        this.search_data={...data}
        this.getVmList()
    }
    private refresh(){
        this.getVmList()
    }
    private handleSizeChange(size){
        this.size = size
        this.getVmList()
    }
    private handleCurrentChange(cur){
        this.current = cur
        this.getVmList()
    }
    private async FnVnc(id:string){
        let resData: any = await Service.get_vnc({
            pod_id: this.$store.state.pod_id
        });
        if (resData.code === "Success") {
            let url = `${resData.data.compute_domain}/vnc_lite.html?op-token=${this.$store.state.token}?path=/?id=${id}`;
            window.open(url);
        }
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
    
}
</script>
<style lang="scss" scoped>
.icon{
  width:100%;
  text-align: right;
}
i.el-icon-s-tools{
  font-size: 18px;
  vertical-align: middle;
}
.table-expand{
    display: flex;
    justify-content:right;
    margin-bottom: 10px;
    align-items: center;
    .operate{
        width: 180px;
        padding-left: 14px;
        text-align: left;
    }
    .time,.status,.perch{
        width: 120px;
        padding-left: 14px;
        line-height: 20px;
    }
    .az-name{
        width: 170px;
        padding-left: 14px;
        line-height: 20px;
    }
}
.table-expand:last-child{
    margin-bottom: 0;
}

</style>
<style lang="scss">
td.mirror-az.el-table__cell{
    border-right: none;
}
</style>