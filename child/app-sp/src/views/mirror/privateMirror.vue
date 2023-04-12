<template>
    <div>
        <action-block :search_option="search_option" @fn-search="search"></action-block>
        <div class="icon m-bottom10">
            <el-tooltip content="导出" placement="bottom" effect="light">
                <el-button type="text" @click="down" :disabled="!auth_list.includes('export')"><svg-icon icon="export" class="export"></svg-icon></el-button>
            </el-tooltip>
        </div>
        <el-table 
            :data="list" 
            border 
            class="event-table"
            @sort-change="FnSortChange"
            @filter-change="filterAttribute"
        >
            <!-- <el-table-column type="selection"></el-table-column> -->
            <el-table-column prop="os_id" label="镜像ID"></el-table-column>
            <el-table-column prop="display_name" label="镜像名称"></el-table-column>
            <el-table-column prop="customer_id" label="客户ID"></el-table-column>
            <el-table-column prop="customer_name" label="客户名称"></el-table-column>
            <el-table-column prop="os_type" label="镜像类型" :filter-multiple="false" column-key="os_type" :filters="mirror_type"></el-table-column>
            <el-table-column prop="product_source" label="产品来源" :filter-multiple="false" column-key="product_source" :filters="source_list"></el-table-column>
            <el-table-column prop="init_mirror" label="初始镜像">
                <template slot-scope="scope">
                    <span>{{`${scope.row.os_type} ${scope.row.os_version} ${scope.row.os_bit}位`}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="size" label="规格" sortable="custom">
                <template slot-scope="scope">
                    <span>{{scope.row.size}}GB</span>
                </template>
            </el-table-column>
            <el-table-column prop="used_size" label="占用容量(GB)" sortable="custom">
                <template slot-scope="scope">
                    <span>{{scope.row.used_size}}GB</span>
                </template>
            </el-table-column>
            <el-table-column prop="support_type" label="计算类型" :filter-multiple="false" column-key="support_type" :filters="compute_type"></el-table-column>
            <el-table-column prop="support_gpu_driver" label="驱动类型" :filter-multiple="false" column-key="support_gpu_driver" :filters="drive_type"></el-table-column>
            <el-table-column prop="business_disk_type" label="盘类型" :filter-multiple="false" column-key="business_disk_type" :filters="disk_type"></el-table-column>
            <el-table-column prop="backend_type" label="存储介质" :filter-multiple="false" column-key="backend_type" :filters="storage_list"></el-table-column>
            <el-table-column prop="az" label="存在可用区数量"  width="120" class-name="private-mirror-az">
                <template slot-scope="scope">
                    <span>共  <span class="num_message">{{scope.row.az_list ? scope.row.az_list.length : 0}}</span>   个</span>
                    <span>   ( 可用:<span class="num_message">  {{scope.row.az_list ? scope.row.az_list.filter(item=>item.status==='running').length : 0}}</span> )</span>
                </template>
            </el-table-column>
            <el-table-column prop="" label="" type="expand" width="50">
                <template slot-scope="props">
                    <div v-for="(item,index) in props.row.az_list" :key="index" class="table-expand">
                        <div class="az-name">{{item.az_name}}</div>
                        <div class="status" :class="item.status">{{item.status_display}}</div>
                        <div class="time">{{item.create_time}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="status_display" label="状态" :filter-multiple="false" column-key="status" :filters="status_list" width="120">
                <template slot-scope="scope">
                    <span :class="[scope.row.status]">{{scope.row.status_display}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="speed" label="优化加速">
                <template slot-scope="scope">
                    <span v-if="scope.row.is_accelerate" class="running">开启</span>
                    <span v-if="!scope.row.is_accelerate">-</span>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" sortable="custom" width="120"></el-table-column>
            <el-table-column prop="update_time" label="更新时间" sortable="custom" width="120"></el-table-column>
            <el-table-column prop="operate" label="操作"  width="120">
                <template slot-scope="scope">
                    <el-button type="text" @click="record(scope.row)" :disabled="!auth_list.includes('record')">操作记录</el-button>
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
        <template v-if="visible">
            <Record :visible.sync="visible" :type="'message'" :record_id="oper_info.os_id" @close="close"></Record>
        </template>
    </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import SvgIcon from '../../components/svgIcon/index.vue';
import Service from '../../https/mirror/list';
import moment from 'moment';
import {trans} from '../../utils/transIndex';
import Record from '../instance/record.vue'
@Component({
    components:{
        ActionBlock,
        SvgIcon,
        Record
    }
})
export default class PrivateMirror extends Vue{
    private search_option:any={
        customer_info:{placeholder:'请输入客户ID/名称'},
        image_info:{placeholder:'请输入镜像ID/名称'},
        time:{
            placeholder:['开始时间','结束时间'],
            type:'daterange',
            width:'360',
            clearable:true,
            dis_day:1,
            defaultTime:[]
        }
    }
    private list:any=[{id:1,status:'enable'}]
    private current:number = 1
    private size:number = 20
    private total:number = 0
    private search_data:any={};
    private auth_list:any=[];
    private mirror_type:any=[];
    private source_list:any=[
        {text:'云桌面',value:'云桌面'},
        {text:'云主机',value:'云主机'},
        {text:'文件存储转发',value:'文件存储转发'},
        {text:'容器',value:'容器'},
    ]
    private compute_type:any=[
        {text:'GPU',value:'GPU'},
        {text:'CPU',value:'CPU'},
        {text:'CPU/GPU',value:'CPU/GPU'},
    ];
    private drive_type:any=[
        {text:'DataCenter',value:'DataCenter'},
        {text:'Geforce',value:'Geforce'},
        {text:'Enflame',value:'Enflame'},
    ];
    private disk_type:any=[{text:'系统盘',value:'system'},{text:'数据盘',value:'data'}];
    private storage_list:any=[{value:'local',text:'本地盘'},{value:'block',text:'云盘'}]
    private status_list:any=[];
    private visible:boolean=false;
    private oper_type:String="";
    private support_product_source_type:String='';
    private oper_info:any={};
    private filter_data:any={};
    created() {
        this.auth_list = this.$store.state.auth_info[this.$route.name];
        this.get_mirror_type();
        this.get_status_list()
        this.search();
    }
    private async get_mirror_type(){
        let res:any = await Service.get_mirror_type({})
        if(res.code==="Success"){
            let list:any=[]
            res.data.type_list.map(item=>{
                list.push({text:item,value:item});
                return item
            })
            this.mirror_type = list
        }
    }
    @Watch('$store.state.pod_id')
    private watch_pod(){
        this.search(this.search_data)
    }
    private search(data:any={}){
        this.current = 1;
        this.search_data={...data,...this.filter_data}
        this.getMirrorList()
    }
    private async get_status_list(){
        let res:any = await Service.get_status_list({})
        if(res.code==="Success"){
            let list:any=[];
            for(let i in res.data){
                list.push({text:res.data[i],value:i})
            }
            this.status_list = list
        }
    }
    private async getMirrorList(){
        const {image_info,customer_info,time,os_type,sort_size,sort_used_size,support_gpu_driver,support_type,support_product_source_type,business_disk_type,status,backend_type,sort_update_time,sort_create_time,product_source}=this.search_data
        let res:any = await Service.get_private_mirror_list({
            image_info,
            customer_info,
            pod_id:this.$store.state.pod_id,
            start_day:time && time[0] ? moment(time[0]).format('YYYY-MM-DD') : undefined,
            end_day:time && time[1] ? moment(time[1]).format('YYYY-MM-DD') : undefined,
            os_type:os_type ? os_type[0] : undefined,
            sort_size,
            sort_used_size,
            support_gpu_driver:support_gpu_driver ? support_gpu_driver[0] : undefined,
            support_type:support_type ? support_type[0] : undefined,
            // product_source:product_source_type ? support_product_source_type[0] : undefined,
            business_disk_type:business_disk_type ? business_disk_type[0] : undefined,
            status:status ? status[0] : undefined,
            backend_type:backend_type ? backend_type[0] : undefined,
            product_source:product_source ? product_source[0] : undefined,
            sort_update_time,
            sort_create_time,
            page_index:this.current,
            page_size:this.size
        })
        if(res.code==='Success'){
            this.list = res.data.image_list;
            this.total = res.data.page_info.count
        }
    }
    private handleSizeChange(size){
        this.size = size
        this.getMirrorList()
    }
    private handleCurrentChange(cur){
        this.current = cur
        this.getMirrorList()
    }
    private FnSortChange(obj){
        this.search_data.sort_size =undefined
        this.search_data.sort_update_time =undefined;
        this.search_data.sort_create_time =undefined;
        this.search_data.sort_used_size=undefined
        this.search_data[`sort_${obj.prop}`]= obj.order==="descending" ? '1' :obj.order==="ascending" ? '0' : undefined
        this.getMirrorList()
    }
    private filterAttribute(obj:any){
        this.filter_data = {...this.filter_data,...obj};
        this.search(this.search_data)
        
    }
    private record(obj){
        this.oper_info=obj;
        this.visible=true
    }
    private close(val){
        this.visible = false
    }
    private down(){
        const {image_info,customer_info,time,os_type,sort_size,support_gpu_driver,support_type,business_disk_type,status,backend_type,sort_update_time,sort_create_time,product_source}=this.search_data;
        let obj={
            image_info,
            customer_info,
            az_id:'',
            start_day:time && time[0] ? moment(time[0]).format('YYYY-MM-DD') : undefined,
            end_day:time && time[1] ? moment(time[1]).format('YYYY-MM-DD') : undefined,
            os_type:os_type ? os_type[0] : undefined,
            sort_size,
            support_gpu_driver:support_gpu_driver ? support_gpu_driver[0] : undefined,
            support_type:support_type ? support_type[0] : undefined,
            // 产品来源
            product_source:product_source ? product_source[0] : undefined,
            business_disk_type:business_disk_type ? business_disk_type[0] : undefined,
            status:status ? status[0] : undefined,
            backend_type:backend_type ? backend_type[0] : undefined,
            // product_source:product_source?product_source[0] : undefined,
            sort_update_time,
            sort_create_time,
        }
        let str=""
        for (let i in obj){
            if(obj[i]){
                str =str+`${i}=${obj[i]}&`
            }
        }
        let query = str==="" ? "" : `?${str.slice(0,str.length-1)}`;
        window.location.href=`/ecs_business/v1/img/private_image_list_download/${query}`
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
    margin-right: 240px;
    .time,.status{
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
td.private-mirror-az.el-table__cell{
    border-right: none;
}
</style>