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
           <el-table-column prop="cpu" label="CPU逻辑总核数(核)" sortable='custom'></el-table-column>
           <el-table-column prop="ram" label="内存总容量(GB)" sortable='custom'></el-table-column>
           <el-table-column prop="gpu" label="GPU总数量(块)" sortable='custom'></el-table-column>
           <el-table-column prop="local_disk_storage" label="本地盘总容量" sortable='custom'>
               <template slot-scope="scope">
                   <span>{{`${scope.row.local_disk_storage}${scope.row.local_disk_storage_unit}`}}</span>
               </template>
           </el-table-column>
           <el-table-column prop="cpu_allocate" label="已分配CPU逻辑核数(核)" sortable='custom'></el-table-column>
           <el-table-column prop="ram_allocate" label="已分配内存量(GB)" sortable='custom'></el-table-column>
           <el-table-column prop="gpu_allocate" label="已分配GPU总数量(块)" sortable='custom'></el-table-column>
           <el-table-column prop="local_disk_allocate" label="已分配本地盘容量" sortable='custom'>
                <template slot-scope="scope">
                   <span>{{`${scope.row.local_disk_allocate}${scope.row.local_disk_allocate_unit}`}}</span>
                </template>
           </el-table-column>
           <el-table-column prop="gpu_fault" label="GPU故障数量(块)" sortable='custom'></el-table-column>
           <el-table-column prop="cpu_available" label="剩余物理CPU逻辑核数(核)" sortable='custom'></el-table-column>
           <el-table-column prop="ram_available" label="剩余内存量(GB)" sortable='custom'></el-table-column>
           <el-table-column prop="gpu_available" label="剩余GPU数量(块)" sortable='custom'></el-table-column>
           <el-table-column prop="local_disk_available" label="剩余本地盘容量" sortable='custom'>
                <template slot-scope="scope">
                   <span>{{`${scope.row.local_disk_available}${scope.row.local_disk_available_unit}`}}</span>
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
    </div>
</template>

<script lang="ts">
import {Vue,Component,Watch} from 'vue-property-decorator';
import Service from '../../https/inventory/list';
import iService from '../../https/instance/create';
import ActionBlock from '@/components/search/actionBlock.vue';
import {trans} from '../../utils/transIndex';
import svgIcon from '@/components/svgIcon/index.vue';
@Component({
    components:{
        ActionBlock,
        svgIcon
    }
})
export default class Inventory extends Vue{
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
        region_id:{placeholder:'请选择地域',list:[], default_value: '', close_clearable: false},
        az_id:{placeholder:'请选择可用区',list:[]},
        host_product_name:{placeholder:'请选择物理机产品名称',list:[],multiple:true,filter:true},
    }
    private search_info:any={}
    created() {
        this.authList = this.$store.state.auth_info[this.$route.name];
        this.getRegion()
        this.getHostProductName()
        this.getInventoryList()
    }
    private async getRegion(){
        this.searchDom.region_id.list=[]
        let res:any = await iService.get_region_az_list({
            employee_no: this.$store.state.employee_no,
            user_name: this.$store.state.login_name
        });
        if(res.code==='Success'){
            for(let i in res.data){
                this.searchDom.region_id.list=[...this.searchDom.region_id.list,...trans(res.data[i].region_list,'region_name','region_id','label','type')]
                for(let az in res.data[i].region_list){
                    this.searchDom.az_id.list=[...this.searchDom.az_id.list,...trans(res.data[i].region_list[az].az_list,'az_name','az_id','label','type')]

                }
            }
            if (this.$store.state.is_special_user == '1') {
                this.searchDom.region_id.close_clearable = true
                this.searchDom.region_id.default_value = this.searchDom.region_id.list[0].type;
                this.search_info = this.searchDom.region_id.list[0].type;
                this.search(this.search_info)
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
    private FnFilter(val){
        this.getHostProductName(val,false)
    }
    private search(val){
        this.pageInfo.page_index=1
        this.search_info={...val}
        this.getInventoryList()
    }
    private async getInventoryList(){
        let res:any=await Service.get_inventory_list({
            region_id:this.search_info.region_id,
            az_id:this.search_info.az_id,
            host_product_name:this.search_info.host_product_name ? this.search_info.host_product_name.join(',') : undefined,
            [this.sortLable ? `sort_${this.sortLable}` : '']:this.sortLable ? this.sort.toString() : undefined,
            page_index:this.pageInfo.page_index,
            page_size:this.pageInfo.page_size,
        })
        if(res.code==='Success'){

            this.list = res.data.product_stock_list;
            this.pageInfo.total = res.data.page_info.count
        }
    }
    private handleCurrentChange(cur){
        this.pageInfo.page_index = cur;
        this.getInventoryList()
    }
    private handleSizeChange(size){
        this.pageInfo.page_size = size;
        this.getInventoryList()
    }
    private handleSort(obj ){
        this.sortLable=obj.prop
        this.sort =obj.order==="descending" ? '1' : obj.order==="ascending" ? '0' : undefined
        this.getInventoryList()
    }
    private exportList(){
        let str=''
        for(let i in this.search_info){
            if(this.search_info[i]){
                str=str + `${i}=${Array.isArray(this.search_info[i]) ? this.search_info[i].join(',') : this.search_info[i]}&`
            }
        }
        let query=str==='' ? '' : `?${str.slice(0,str.length-1)}`
        window.location.href = `/ecs_business/v1/stock/host_stock_download/${query}`
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
