<template>
    <div>
        <action-block :search_option="searchDom"  @fn-search="search" @fn-filter="FnFilter"></action-block>
        <div class="text-right m-bottom10">
            <el-tooltip content="导出" placement="bottom" effect="light">
                <el-button type="text" @click="exportList" ><svg-icon icon="export" class="export"></svg-icon></el-button>
            </el-tooltip>
        </div>
        <el-table
            :data="list"
            border
            @sort-change="handleSort"
        >
           <el-table-column prop="region_name" label="所属地域"></el-table-column>
           <el-table-column prop="az_name" label="可用区名称"></el-table-column>
           <el-table-column prop="host_product_name" label="物理机产品名称"></el-table-column>
           <el-table-column prop="spec_family_name" label="实例规格族"></el-table-column>
           <el-table-column prop="cpu" label="vcpu (核)" sortable='custom'></el-table-column>
           <el-table-column prop="ram" label="内存(GB)" sortable='custom'></el-table-column>
           <el-table-column prop="gpu" label="GPU" sortable='custom'></el-table-column>
           <el-table-column prop="instance_sell_num" label="已售实例数量" sortable='custom'></el-table-column>
           <el-table-column prop="customer_sell_num" label="已售客户数量" sortable='custom'>
                <template slot-scope="scope">
                    <el-button type="text" @click="detail(scope.row)">{{scope.row.customer_sell_num}}</el-button>
                </template>
           </el-table-column>
           <el-table-column prop="available_num" label="剩余可售数量" sortable='custom'>
            <template slot-scope="scope">
                <el-tooltip placement="top" effect="light">
                    <div slot="content">
                        <el-table :data="scope.row.availableNumList" >
                            <el-table-column prop="name" label="主机归属"></el-table-column>
                            <el-table-column prop="num" label="剩余可售量"></el-table-column>
                        </el-table>
                    </div>
                    <span>{{scope.row.available_num}}</span>
                </el-tooltip>
            </template>
           </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.page_index"
            :page-sizes="[20, 50, 100]"
            :page-size="pageInfo.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total">
        </el-pagination>
        <template v-if="visible">
            <Customer :visible.sync="visible" :info="operateInfo"></Customer>
        </template>
    </div>
</template>

<script lang="ts">
import {Vue,Component,Watch} from 'vue-property-decorator';
import Service from '../../https/inventory/list';
import iService from '../../https/instance/create';
import ListService from '../../https/instance/list'
import ActionBlock from '@/components/search/actionBlock.vue';
import {trans,deal_list} from '../../utils/transIndex'
import svgIcon from '@/components/svgIcon/index.vue';
import Customer from './customer.vue';
@Component({
    components:{
        ActionBlock,
        svgIcon,
        Customer
    }
})
export default class ProductInventory extends Vue{
    private list:any=[];
    private sort:string=undefined;
    private sortLable:string=''
    private authList:any=[];
    private visible:boolean=false;
    private operateInfo:any={}
    private pageInfo:any={
        page_index:1,
        page_size:20,
        total:0,
    }
    private searchDom:any={
        region_id:{placeholder:'请选择地域',list:[]},
        az_id:{placeholder:'请选择可用区',list:[]},
        host_product_name:{placeholder:'请选择物理机产品名称',list:[],multiple:true,filter:true},
        spec_family_id:{placeholder:'请选择实例规格族',list:[]},
    }
    private search_info:any={}
    created() {
        this.authList = this.$store.state.auth_info[this.$route.name];        
        this.getRegion()
        this.getHostProductName()
        this.getFamilyList()
        this.getProductInventoryList()
    }
    private async getRegion(){
        this.searchDom.region_id.list=[]
        let res:any = await iService.get_region_az_list({});
        if(res.code==='Success'){
            for(let i in res.data){
                this.searchDom.region_id.list=[...this.searchDom.region_id.list,...trans(res.data[i].region_list,'region_name','region_id','label','type')]
                for(let az in res.data[i].region_list){
                    this.searchDom.az_id.list=[...this.searchDom.az_id.list,...trans(res.data[i].region_list[az].az_list,'az_name','az_id','label','type')]

                }
            }
        }
    }
    private async getHostProductName(val:String='',loading:boolean=true){
        if(!loading){
            this.$store.commit("SET_LOADING", false);
        }
        let res:any = await Service.get_product_host_name({
            page_index:1,
            page_size:20,
            name:val
        })
        if(res.code==='Success'){
            this.searchDom.host_product_name.list=[]
            res.data.host_product_list.map(item=>{
                this.searchDom.host_product_name.list.push({
                    type:item.name,
                    label:item.name
                })
            })
            this.pageInfo.total = res.data.page_info.count
        }
    }
    private async getFamilyList(){
        let res:any =await ListService.get_family_data();
        if(res.code==='Success'){
        let key_list=['spec_family_id','name'];
        let label_list=['type','label']
        this.searchDom.spec_family_id.list =deal_list(res.data.spec_family_list,label_list,key_list);
        }
    }
    private FnFilter(val){
        this.getHostProductName(val,false)
    }
    private search(val){
        this.search_info={...val};
        this.getProductInventoryList()
    }
    private async getProductInventoryList(){
        let res:any= await Service.get_product_inventory_list({
            region_id:this.search_info.region_id,
            az_id:this.search_info.az_id,
            host_product_name:this.search_info.host_product_name ? this.search_info.host_product_name.join(',') : undefined,
            spec_family_id:this.search_info.spec_family_id,
            [this.sortLable ? `sort_${this.sortLable}` : '']:this.sortLable ? this.sort : undefined,
            page_index:this.pageInfo.page_index,
            page_size:this.pageInfo.page_size,
        })
        if(res.code==='Success'){
            this.list = res.data.spec_stock_list;
            this.pageInfo.total = res.data.page_info.count;
            this.list.map(item=>{
                item.availableNumList= [
                    {name:'云主机',num:item.cloud_vm_sale_num},
                    {name:'云桌面',num:item.cloud_desktop_sale_num},
                    {name:'文件存储',num:item.nas_host_sale_num},
                ];
                return item;
            })
        }
    }
    private handleCurrentChange(cur){
        this.pageInfo.page_index = cur;
        this.getProductInventoryList()
    }
    private handleSizeChange(size){
        this.pageInfo.page_size = size;
        this.getProductInventoryList()
    }
    private handleSort(obj ){
        this.sortLable=obj.prop
        this.sort =obj.order==="descending" ? '1' : obj.order==="ascending" ? '0' : undefined
        this.getProductInventoryList()
    }
    private exportList(){
        let str=''
        for(let i in this.search_info){
            if(this.search_info[i]){
                str=str + `${i}=${Array.isArray(this.search_info[i]) ? this.search_info[i].join(',') : this.search_info[i]}&`
            }
        }
        let query=str==='' ? '' : `?${str.slice(0,str.length-1)}`
        window.location.href = `/ecs_business/v1/stock/spec_stock_download/${query}`
    }
    private detail(row){
        this.visible=true;
        this.operateInfo=row
    }
    
}
</script>

<style lang="scss" scoped>
.search-box{
    padding: 20px;
    background: #f2f2f2;
    border: 1px solid #e7e7e7;
    margin-bottom: 20px;
    .search{
        width: 200px;
        margin-right: 20px;
        margin-bottom: 20px;
    }
}
.active{
    color: red;
}
.normal{
    color:'#606266'
}
</style>