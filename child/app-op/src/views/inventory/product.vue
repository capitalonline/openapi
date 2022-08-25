<template>
    <div>
        <action-block :search_option="searchDom"  @fn-search="search" @fn-filter="FnFilter"></action-block>
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
           <el-table-column prop="gpu" label="GPU" sortable='custom'>
               <template slot-scope="scope">
                   <span>{{`${scope.row.local_disk_storage}${scope.row.local_disk_storage_unit}`}}</span>
               </template>
           </el-table-column>
           <el-table-column prop="instance_sell_num" label="已售实例数量" sortable='custom'></el-table-column>
           <el-table-column prop="customer_sell_num" label="已售客户数量" sortable='custom'></el-table-column>
           <el-table-column prop="available_num" label="剩余可售数量" sortable='custom'></el-table-column>
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
    </div>
</template>

<script lang="ts">
import {Vue,Component,Watch} from 'vue-property-decorator';
import Service from '../../https/inventory/list';
import iService from '../../https/instance/create';
import ActionBlock from '@/components/search/actionBlock.vue';
import {trans} from '../../utils/transIndex'
@Component({
    components:{
        ActionBlock
    }
})
export default class ProductInventory extends Vue{
    private list:any=[];
    private sort:string=undefined;
    private sortLable:string=''
    private authList:any=[];
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
        // this.getProductInventoryList()
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
                    type:item.host_product_id,
                    label:item.name
                })
            })
            this.pageInfo.total = res.data.page_info.count
        }
    }
    private FnFilter(val){
        this.getHostProductName(val,false)
    }
    private search(val){
        console.log('val',val)
        this.search_info={...val};
        this.getProductInventoryList()
    }
    private async getProductInventoryList(){
        let res:any= Service.get_product_inventory_list({
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
            this.pageInfo.total = res.data.page_info.count
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
        console.log('###',obj.prop, obj.order)
        this.sortLable=obj.prop
        this.sort =obj.order==="descending" ? '1' : obj.order==="ascending" ? '0' : undefined
        this.getProductInventoryList()
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