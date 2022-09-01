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
            <el-table-column prop="customer_id " label="客户ID"></el-table-column>
            <el-table-column prop="customer_name " label="客户名称"></el-table-column>
            <el-table-column prop="nas_id" label="文件系统ID/名称">
                <template slot-scope="scope">
                    <div>
                        <el-tooltip 
                            :content="scope.row.nas_id" 
                            placement="bottom" 
                            effect="light">
                                <span class="id-cell clickble">{{ scope.row.nas_id }}</span>
                        </el-tooltip>
                        <Clipboard :content="scope.row.nas_id" v-if="scope.row.nas_id"></Clipboard>
                    </div>
                    <div>{{scope.row.nas_name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="nas_type" label="NAS类型"></el-table-column>
            <el-table-column prop="protocol_type" label="协议类型"></el-table-column>
            <el-table-column prop="az_name" label="地域-可用区">
                <template slot-scope="scope">
                    <span>{{`${scope.row.region_name}-${scope.row.az_name}`}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="vpc_id" label="VPC">
                <template slot-scope="scope">
                    <div>{{scope.row.vpc_id}}</div>
                    <div>{{scope.row.vpc_name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="subnet_id" label="子网">
                <template slot-scope="scope">
                    <div>{{scope.row.subnet_id}}</div>
                    <div>{{scope.row.subnet_name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="mount_path" label="挂载地址" width="180">
                <template slot-scope="scope">
                    <el-tooltip 
                        :content="scope.row.mount_path " 
                        placement="bottom" 
                        effect="light">
                            <span class="id-cell">{{ scope.row.mount_path  }}</span>
                    </el-tooltip>
                    <Clipboard :content="scope.row.mount_path " v-if="scope.row.mount_path "></Clipboard>                
                </template>
            </el-table-column>
            <el-table-column prop="path_name" label="使用量/总容量"  width="140">
                <template slot-scope="scope">
                   <span></span>
                </template>
            </el-table-column>
            <el-table-column prop="space_use_rate " label="空间使用率"></el-table-column>
            <el-table-column prop="transfer_vm_id" label="中转虚拟机ID"></el-table-column>
            <el-table-column prop="transfer_vm_name" label="中转虚拟机名称"></el-table-column>
            <el-table-column prop="transfer_vm_vpc_ip" label="中转虚拟机IP">
                <template slot-scope="scope">
                   <span>{{`${scope.row.transfer_vm_vpc_ip}/${scope.row.transfer_vm_storage_ip}`}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="billing_method" label="计费方式"></el-table-column>
            <el-table-column prop="status_ch" label="状态"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="capacity(scope.row)" :disabled="!auth_list.includes('record')">扩容</el-button> 
                    <!-- <el-button type="text" @click="record(scope.row)" :disabled="!auth_list.includes('record')">删除</el-button>  -->
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
        customer_id:{placeholder:'请输入客户ID'},
        customer_name:{placeholder:'请输入客户名称'},
        nas_id:{placeholder:'请输入文件系统ID'},
        nas_name:{placeholder:'请输入文件系统名称'},
        transfer_vm_id:{placeholder:'请输入中转虚拟机ID'},
        transfer_vm_ip:{placeholder:'请输入中转虚拟机IP'},
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
        this.search()
    }
    @Watch('visible')
    private watch_visible(nv){
        if(!nv){
            this.getNasList()
        }
    }
    @Watch('$store.state.pod_id')
    private watch_pod(){
        this.search(this.search_data)
    }
    private async getNasList(){
        let res:any = await Service.get_nas_list({
            ...this.search_data,
            page_index:this.current,
            page_size:this.size
        })
        if(res.code==="Success"){
            this.list = res.data.nas_list;
            this.total = res.data.page.count
            
        }
    }
    private search(data:any={}){
        this.current = 1;
        this.search_data={...data}
        this.getNasList()
    }
    private refresh(){
        this.getNasList()
    }
    private handleSizeChange(size){
        this.size = size
        this.getNasList()
    }
    private handleCurrentChange(cur){
        this.current = cur
        this.getNasList()
    }
    private capacity(row){
        this.visible=true;
        this.operateInfo=row
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