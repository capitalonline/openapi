<template>
    <div>
        <action-block :search_option="search_option" @fn-search="search">
            <template #default>
                <el-button type="primary" @click="add" :disabled="!auth_list.includes('add_mirror')">新增镜像</el-button>
            </template>
        </action-block>
        <div class="icon m-bottom10">
            <el-tooltip content="导出" placement="bottom" effect="light">
                <el-button type="text" @click="down" :disabled="!auth_list.includes('export')"><svg-icon icon="export" class="export"></svg-icon></el-button>
            </el-tooltip>
            <el-tooltip content="刷新" placement="bottom" effect="light">
                <el-button type="text" @click="refresh"><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
            </el-tooltip>
        </div>
        <el-table 
            :data="list" 
            border 
            class="event-table"
            @sort-change="FnSortChange"
            :cell-style="setCellStyle"
            @filter-change="filterAttribute"
        >
            <el-table-column prop="os_id" label="镜像ID"></el-table-column>
            <el-table-column prop="display_name" label="镜像名称"></el-table-column>
            <el-table-column prop="os_type" label="镜像类型" :filter-multiple="false" column-key="os_type" :filters="mirror_type"></el-table-column>
            <el-table-column prop="os_file_type" label="镜像文件类型"></el-table-column>
            <el-table-column prop="size" label="规格" sortable="custom">
                <template slot-scope="scope">
                    <span>{{scope.row.size}}GB</span>
                </template>
            </el-table-column>
            <el-table-column prop="support_type" label="计算类型" :filter-multiple="false" column-key="support_type" :filters="compute_type"></el-table-column>
            <el-table-column prop="support_gpu_driver" label="驱动类型" :filter-multiple="false" column-key="support_gpu_driver" :filters="drive_type"></el-table-column>
            <el-table-column prop="backend_type" label="存储类型"></el-table-column>
            <el-table-column prop="customer" label="客户权限">
                <template slot-scope="scope">
                    <span>{{scope.row.white_customer_list && scope.row.white_customer_list.length>0 ? scope.row.white_customer_list.join(',') : '全部客户'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="path_name" label="路径"  width="140">
                <template slot-scope="scope">
                    <el-tooltip 
                        :content="scope.row.path_name" 
                        placement="bottom" 
                        effect="light">
                            <span class="id-cell">{{ scope.row.path_name }}</span>
                    </el-tooltip>
                    <Clipboard :content="scope.row.path_name" v-if="scope.row.path_name"></Clipboard>
                    
                </template>
            </el-table-column>
            <el-table-column prop="az" label="可用区" width="120" class-name="mirror-az">
                <template slot-scope="scope">
                    <span>共  <span class="num_message">{{scope.row.az_list.length}}</span>  个</span>
                    <span>   ( 可用:<span class="num_message">  {{scope.row.az_list.filter(item=>item.status==='running').length}}</span> )</span>
                </template>
            </el-table-column>
            <el-table-column prop="" label="" type="expand" width="50">
                <template slot-scope="props">
                    <div v-for="(item,index) in props.row.az_list" :key="index" class="table-expand">
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
                        <el-button type="text" class="operate" @click="del_az({...props.row,azId:item.az_id,azName:item.az_name})" :disabled="!['running','blocking','create_fail'].includes(item.status) || !auth_list.includes('del_mirror')">删除</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="status_display" label="状态" :filter-multiple="false" column-key="status" :filters="status_list" width="120">
                <template slot-scope="scope">
                    <span :class="[scope.row.status]">{{scope.row.status_display}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" sortable="custom" width="120"></el-table-column>
            <el-table-column prop="update_time" label="更新时间" width="120"></el-table-column>
            <el-table-column prop="operate" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" :disabled="!['running','blocking'].includes(scope.row.status) || !auth_list.includes('edit_mirror')" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="text" :disabled="!['running','blocking','create_fail'].includes(scope.row.status) || !auth_list.includes('del_mirror')" @click="del(scope.row)">删除</el-button>
                    <el-button type="text" :disabled="!['running','blocking'].includes(scope.row.status) || !auth_list.includes('change_status')" @click="changeStatus(scope.row)">状态变更</el-button>
                    <el-button type="text" :disabled="!['running'].includes(scope.row.status) || !auth_list.includes('sync_mirror')" @click="FnSync(scope.row)">同步</el-button>
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
        <template v-if="visible && ['add','edit'].includes(oper_type)">
            <add-common :visible.sync="visible" :oper_info="oper_info"></add-common>
        </template>
        <template v-if="visible && ['sync'].includes(oper_type)">
            <sync-mirror :visible.sync="visible" :os_id="oper_info.os_id"></sync-mirror>
        </template>
        <template v-if="visible && ['change'].includes(oper_type)">
            <change-status :visible.sync="visible" :oper_info="oper_info"></change-status>
        </template>
        <template v-if="visible && ['del'].includes(oper_type)">
            <del-mirror :visible.sync="visible" :rows="[oper_info]" :type="oper_type"></del-mirror>
        </template>
        <template v-if="visible && ['del_az'].includes(oper_type)">
            <del-mirror :visible.sync="visible" :rows="[oper_info]" :type="oper_type"></del-mirror>
        </template>
        <template v-if="visible && ['record'].includes(oper_type)">
            <Record :visible.sync="visible" :type="'message'" :record_id="oper_info.os_id" @close="close"></Record>
        </template>
    </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import SvgIcon from '../../components/svgIcon/index.vue';
import Service from '../../https/mirror/list';
import AddCommon from './addCommon.vue';
import SyncMirror from './syncMirror.vue';
import ChangeStatus from './changeStatus.vue';
import AddCommonMirror from '../instance/addCommonMirror.vue';
import Record from '../instance/record.vue';
import DelMirror from './delMirror.vue'
import moment from 'moment';
import {paramsSerializer} from '../../utils/transIndex';
import Clipboard from '../../components/clipboard.vue'
@Component({
    components:{
        ActionBlock,
        SvgIcon,
        AddCommon,
        SyncMirror,
        ChangeStatus,
        AddCommonMirror,
        Record,
        DelMirror,
        Clipboard
    }
})
export default class CommonMirror extends Vue{
    private search_option:Object={
        os_id:{placeholder:'请输入镜像ID'},
        display_name:{placeholder:'请输入镜像名称'},
        time:{
            placeholder:['开始时间','结束时间'],
            type:'daterange',
            width:'360',
            clearable:true,
            dis_day:1,
            defaultTime:[]
        }
    }
    private list:Array<any>=[]
    private current:number = 1
    private size:number = 20
    private total:number = 0
    private search_data:any={};
    private auth_list:any=[];
    private mirror_type:any=[];
    private filter_data:any={}
    private compute_type:any=[
        {text:'GPU',value:'GPU'},
        {text:'CPU',value:'CPU'},
        {text:'CPU/GPU',value:'CPU/GPU'},
    ];
    private drive_type:any=[
        {text:'DataCenter',value:'DataCenter'},
        {text:'Geforce',value:'Geforce'},
    ];
    private status_list:any=[];
    private visible:boolean=true;
    private oper_type:string="";
    private oper_info:any={};
    created() {
        this.auth_list = this.$store.state.auth_info[this.$route.name];
        this.get_mirror_type();
        this.get_status_list()
        this.search()
    }
    @Watch('visible')
    private watch_visible(nv){
        if(!nv){
            this.oper_info={};
            this.getMirrorList()
        }
    }
    @Watch('$store.state.pod_id')
    private watch_pod(){
        this.search(this.search_data)
    }
    
    private async get_mirror_type(){
        let res:any = await Service.get_mirror_type({})
        if(res.code==="Success"){
            res.data.type_list.map(item=>{
                this.mirror_type.push({text:item,value:item})
            })
            
        }
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
    private search(data:any={}){
        this.current = 1;
        this.search_data={...data,...this.filter_data}
        this.getMirrorList()
    }
    private refresh(){
        this.getMirrorList()
    }
    private async getMirrorList(){
        const{os_id,display_name,time,os_type,sort_size,support_gpu_driver,sort_create_time,support_type,status} = this.search_data
        let res:any = await Service.get_pub_mirror_list({
            pod_id:this.$store.state.pod_id,
            image_id:os_id,
            image_name:display_name,
            start_day:time && time[0] ? moment(time[0]).format('YYYY-MM-DD') : undefined,
            end_day:time && time[1] ? moment(time[1]).format('YYYY-MM-DD') : undefined,
            os_type:os_type ? os_type[0] : undefined,
            sort_size,
            support_gpu_driver:support_gpu_driver ? support_gpu_driver[0] : undefined,
            support_type:support_type ? support_type[0] : undefined,
            status:status ? status[0] : undefined,
            sort_create_time:sort_create_time,
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
    setCellStyle(row, column, rowIndex, columnIndex){
        if(columnIndex==5){
            console.log('aaa')
            return {"color":"red"}
        }
    }
    private FnSortChange(obj){
        this.search_data.sort_size =undefined
        this.search_data.sort_create_time =undefined
        this.search_data[`sort_${obj.prop}`]= obj.order==="descending" ? '1' :obj.order==="ascending" ? '0' : undefined
        this.getMirrorList()
    }
    private filterAttribute(obj:any){
        console.log("obj",obj)
        this.filter_data = {...this.filter_data,...obj};
        this.search(this.search_data)
        
    }
    private add(){
        this.visible=true;
        this.oper_type='add'
    }
    private edit(obj){
        this.visible=true;
        this.oper_type='edit';
        this.oper_info=obj
    }
    private del(obj:any){
        this.visible=true;
        this.oper_type ='del';
        this.oper_info= obj;
    }
    private async del_az(obj){
        this.visible=true;
        this.oper_type='del_az';
        this.oper_info= obj;
        
    }
    private changeStatus(obj){
        this.visible=true;
        this.oper_type='change';
        this.oper_info=obj
    }
    private FnSync(obj){
        this.visible=true;
        this.oper_type='sync';
        this.oper_info=obj
    }
    private record(obj){
        this.visible=true;
        this.oper_type='record';
        this.oper_info=obj
    }
    private down(){
        const{os_id,display_name,time,os_type,support_gpu_driver,support_type,status} = this.search_data
        let query = paramsSerializer({
            image_id:os_id,
            image_name:display_name,
            start_day:time && time[0] ? moment(time[0]).format('YYYY-MM-DD') : undefined,
            end_day:time && time[1] ? moment(time[1]).format('YYYY-MM-DD') : undefined,
            os_type:os_type ? os_type[0] : undefined,
            support_gpu_driver:support_gpu_driver ? support_gpu_driver[0] : undefined,
            support_type:support_type ? support_type[0] : undefined,
            status:status ? status[0] : undefined,
        })
        window.location.href=`/ecs_business/v1/img/pub_image_list_download/${query}`
    }
    private operate(id:String){
       
    }
    private close(val){
        this.visible = false
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