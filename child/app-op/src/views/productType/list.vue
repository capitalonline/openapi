<template>
    <div>
        <action-block :search_option="search_dom" @fn-search="FnSearch">
            <template #default>
                <el-button type="primary" @click="add('add',{})">新增</el-button>
            </template>
        </action-block>
        <el-table
            :data="list"
            border
            ref="product_list"
        >
            <el-table-column prop="host_product_id" label="物理机产品ID">
                <template slot-scope="scope">
                    <span :class="scope.row.is_complete ? 'normal' : 'error_message'">{{scope.row.host_product_id}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="产品名称">
                <template slot-scope="scope">
                    <span :class="scope.row.is_complete ? 'normal' : 'error_message'">{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="cpu_info" label="CPU">
                <template slot-scope="scope">
                    <span :class="scope.row.is_complete ? 'normal' : 'error_message'">{{scope.row.cpu_name}}<span v-if="scope.row.cpu_name"> * </span>{{scope.row.cpu_size}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="logic_cpu_size" label="逻辑核数">
                <template slot-scope="scope">
                    <span :class="scope.row.is_complete ? 'normal' : 'error_message'">{{scope.row.logic_cpu_size}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ram_info" label="内存">
                <template slot-scope="scope">
                    <span :class="scope.row.is_complete ? 'normal' : 'error_message'">{{scope.row.ram_capacity}} {{scope.row.common_unit}}<span v-if="scope.row.ram_capacity"> * </span>{{scope.row.ram_size}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="gpu_info" label="显卡">
                <template slot-scope="scope">
                    <span :class="scope.row.is_complete ? 'normal' : 'error_message'">{{scope.row.gpu_name}}<span v-if="scope.row.gpu_name"> * </span>{{scope.row.gpu_size}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="disk_info" label="硬盘">
                <template slot-scope="scope">
                    <span :class="scope.row.is_complete ? 'normal' : 'error_message'">{{scope.row.disk_capacity}} {{scope.row.disk_unit}}<span v-if="scope.row.disk_capacity"> * </span>{{scope.row.disk_size}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="network_card_info" label="网卡">
                <template slot-scope="scope">
                    <span :class="scope.row.is_complete ? 'normal' : 'error_message'">{{scope.row.network_card_type}}<span v-if="scope.row.network_card_type"> * </span>{{scope.row.network_card_size}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="可用区" width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.az_info && scope.row.az_info.length>1">共  <span class="num_message">{{scope.row.az_info.length}}</span>  个</span>
                    <span v-else-if="scope.row.az_info && scope.row.az_info.length===1">{{scope.row.az_info[0].az_name}}</span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column prop="" label="" type="expand" width="50">
                <template slot-scope="props">
                    <div v-for="(item,index) in props.row.az_info" :key="index" class="table-expand">
                        <div class="az-name">
                            <span>{{item.az_name}}</span>
                            <span v-if="item.pod_name_list.length>0"> ( </span>
                            <span v-for="(pod,index) in item.pod_name_list.slice(0,2)" :key="pod">{{pod}}{{index===item.pod_name_list.length-1 ? '' : ','}}</span>
                            <span v-if="item.pod_name_list.length>2"> ...</span>
                            <span v-if="item.pod_name_list.length>0">)</span>
                        </div>
                        <div class="status" :class="item.status">{{item.status_display}}</div>
                        <div class="time">{{item.create_time}}</div>
                        <div class="perch"></div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="total_num" label="物理机台数" width="120">
                <template slot-scope="scope">
                    <span :class="scope.row.is_complete ? 'normal' : 'error_message'">{{scope.row.total_num}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="120">
                <template slot-scope="scope">
                    <span :class="scope.row.is_complete ? 'normal' : 'error_message'">{{scope.row.host_product_id}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作" width="120">
               <template slot-scope="scope">
                   <el-button type="text" @click="add('edit',scope.row)">编辑</el-button>
               </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page_info.current"
            :page-sizes="[20, 50, 100]"
            :page-size="page_info.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page_info.total">
        </el-pagination>
        <template v-if="visible">
            <Add :visible.sync="visible" :row="this.operInfo" :title="operLabel==='add' ? '新增' : '编辑'"></Add>
        </template>
    </div>
</template>

<script lang="ts">
import {Vue,Component, Watch} from 'vue-property-decorator';
import ActionBlock from '@/components/search/actionBlock.vue';
import Service from '../../https/hostProductType'
import Add from './add.vue';
import EcsService from '../../https/instance/create';
import {trans} from '../../utils/transIndex';       
@Component({
    components:{
        ActionBlock,
        Add
    }
})
export default class ProductType extends Vue{
    private search_dom:any={
        az_id:{placeholder:'请选择可用区',list:[]},
        host_product_id:{placeholder:'请输入物理机产品id'},
        cpu_name:{placeholder:'请输入CPU型号'},
        gpu_card_name:{placeholder:'请输入显卡型号'},
        net_card_type:{placeholder:'请输入网卡型号'},
    }
    private visible:boolean=false
    private list:any=[{id:'1'}];
    private search_data:any={}
    private operLabel = 'add';
    private operInfo:any={};
    private page_info:any={
        current:1,
        size:20,
        total:0
    }
    created(){
        this.get_az_list();
        this.getHostTypes()
    }
    @Watch('visible')
    private watch_visible(nv){
        if(!nv){
            this.getHostTypes()
        }
    }
    private FnSearch(data:any={}){
        this.page_info.current=1;
        this.search_data = {...data};
        this.getHostTypes()
    }
    private async getHostTypes(){
        const {az_id,host_product_id,cpu_name,gpu_card_name,net_card_type}=this.search_data
        let res:any = await Service.get_host_type({
            az_id,
            host_product_id,
            cpu_name,
            gpu_card_name,
            net_card_type,
            page_index:this.page_info.current,
            page_size:this.page_info.size,
        })
        if(res.code==="Success"){
            this.list = res.data.host_product_list;
            this.page_info.total = res.data.page_info.count
        }
    }
    private async get_az_list(){
    let res:any=await EcsService.get_region_az_list({})
        if(res.code==="Success"){
            res.data.forEach(item=>{
                item.region_list.forEach(inn=>{
                this.search_dom.az_id.list=[...this.search_dom.az_id.list,...trans(inn.az_list,'az_name','az_id','label','type')]
                })
            })
        }
    }
    private handleSizeChange(size){
        this.page_info.size = size
        this.getHostTypes()
    }
    private handleCurrentChange(cur){
        this.page_info.current = cur
        this.getHostTypes()
    }
    private add(val,obj){
        this.operLabel = val;
        this.operInfo=obj;
        this.visible=true
    }
}
</script>

<style lang="scss" scoped>
.normal{
    color:#606266
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