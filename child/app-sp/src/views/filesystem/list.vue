<template>
    <div>
        <action-block :search_option="search_option" @fn-search="search">
            <!-- <template #default>
                <el-button type="primary" @click="destroy" :disabled="!auth_list.includes('add_mirror')">销毁</el-button>
            </template> -->
        </action-block>
        <div class="icon m-bottom10">
            <el-tooltip content="自定义列表项" placement="bottom" effect="light">
                <el-button type="text" @click="FnCustom">
                <i class="el-icon-s-tools" ></i>
                </el-button>        
            </el-tooltip>
            <el-tooltip content="导出" placement="bottom" effect="light">
                <el-button type="text" @click="down" :disabled="auth_list.includes('export')"><svg-icon icon="export" class="export"></svg-icon></el-button>
            </el-tooltip>
            <el-tooltip content="刷新" placement="bottom" effect="light">
                <el-button type="text" @click="refresh"><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
            </el-tooltip>
        </div>
        <el-table 
            :data="list" 
            @filter-change="filterAttribute"
            border 
        >
            <el-table-column 
                v-for="(item) in custom_host" 
                :filter-multiple="item.column_key ? true : null"
                :key="item.prop" 
                :prop="item.prop" 
                :column-key="item.column_key ? item.column_key : null"
                :filters="item.column_key ? item.list : null"
                :sortable="item.sortable ? item.sortable : null"
                :width="item.width ? item.width : null"
                :label="item.label"
                :type="item.type"
                >
                <template #default="scope" v-if="item.prop==='nas_id_name'">
                    <div>
                        <el-tooltip 
                            :content="scope.row.nas_id" 
                            placement="bottom" 
                            effect="light">
                                <span class="not-clickable" v-if="['building','build_fail'].includes(scope.row.status)">{{ scope.row.nas_id }}</span>
                                <span v-else class="id-cell clickble" @click="detail(scope.row.nas_id)">{{ scope.row.nas_id }}</span>
                        </el-tooltip>
                        <Clipboard :content="scope.row.nas_id" v-if="scope.row.nas_id"></Clipboard>
                    </div>
                    <div>{{scope.row.nas_name}}</div>
                </template>
                <template #default="scope" v-else-if="item.prop==='region_az_name'">
                    <span>{{`${scope.row.region_name}-${scope.row.az_name}`}}</span>
                </template>
                <template #default="scope" v-else-if="item.prop==='vpc'">
                    <div class="not-clickable">{{scope.row.vpc_id}}</div>
                    <div>{{scope.row.vpc_name}}</div>
                </template>
                <template #default="scope" v-else-if="item.prop==='subnet'">
                    <div class="not-clickable">{{scope.row.subnet_id}}</div>
                    <div>{{scope.row.subnet_name}}</div>
                </template>
                <template #default="scope" v-else-if="item.prop==='mount_path'">
                    <el-tooltip 
                        :content="scope.row.mount_path[0]" 
                        placement="bottom" 
                        effect="light">
                            <span class="id-cell">{{ scope.row.mount_path[0]}}</span>
                    </el-tooltip>
                    <Clipboard :content="scope.row.mount_path[0]" v-if="scope.row.mount_path"></Clipboard> 
                </template>
                <template #default="scope" v-else-if="item.prop==='transfer_vpc_storage_ip'">
                    <div>VPC:{{scope.row.transfer_vm_vpc_ip}}</div>
                   <div>存储网:{{scope.row.transfer_vm_storage_ip}}</div>
                </template>
                <template #default="scope" v-else-if="item.prop==='billing_method'">
                    <span>{{feeInfo[scope.row.billing_method]}}</span>
                </template>
                <template #default="scope" v-else-if="item.prop==='status_ch'">
                    <span :class="scope.row.status">{{scope.row.status_ch}}</span>
                </template>
                <template #default="scope" v-else-if="item.prop==='create_time'">
                    <span>{{scope.row.create_time ? moment(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') : ''}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="customer_id" label="客户ID"></el-table-column>
            <el-table-column prop="customer_name" label="客户名称"></el-table-column>
            <el-table-column prop="nas_id" label="文件系统ID/名称" width="120px">
                <template slot-scope="scope">
                    <div>
                        <el-tooltip 
                            :content="scope.row.nas_id" 
                            placement="bottom" 
                            effect="light">
                                <span class="not-clickable" v-if="['building','build_fail'].includes(scope.row.status)">{{ scope.row.nas_id }}</span>
                                <span v-else class="id-cell clickble" @click="detail(scope.row.nas_id)">{{ scope.row.nas_id }}</span>
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
                    <div class="not-clickable">{{scope.row.vpc_id}}</div>
                    <div>{{scope.row.vpc_name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="subnet_id" label="子网">
                <template slot-scope="scope">
                    <div class="not-clickable">{{scope.row.subnet_id}}</div>
                    <div>{{scope.row.subnet_name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="mount_path" label="挂载地址" width="180">
                <template slot-scope="scope">
                    <el-tooltip 
                        :content="scope.row.mount_path[0]" 
                        placement="bottom" 
                        effect="light">
                            <span class="id-cell">{{ scope.row.mount_path[0]}}</span>
                    </el-tooltip>
                    <Clipboard :content="scope.row.mount_path[0]" v-if="scope.row.mount_path"></Clipboard>                
                </template>
            </el-table-column>
            <el-table-column prop="use_total_size" label="使用量/总容量"  width="140"></el-table-column>
            <el-table-column prop="used_percent" label="空间使用率"></el-table-column>
            <el-table-column prop="transfer_vm_id" label="中转虚拟机ID"></el-table-column>
            <el-table-column prop="transfer_vm_vpc_ip" label="中转虚拟机IP">
                <template slot-scope="scope">
                   <div>VPC:{{scope.row.transfer_vm_vpc_ip}}</div>
                   <div>存储网:{{scope.row.transfer_vm_storage_ip}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="billing_method" label="计费方式">
                <template slot-scope="scope">
                    <span>{{feeInfo[scope.row.billing_method]}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status_ch" label="状态">
                <template slot-scope="scope">
                    <span :class="scope.row.status">{{scope.row.status_ch}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="90">
                <template slot-scope="scope">
                    <span>{{scope.row.create_time ? moment(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') : ''}}</span>
                </template>
            </el-table-column> -->
            <el-table-column prop="operate" label="操作" width="140">
                <template slot-scope="scope">
                    <el-tooltip placement="right" v-if="scope.row.status!=='running' || !auth_list.includes('file_capacity')" effect="light" content="只有运行中的文件系统才可以扩容">
                        <span type="text" class="not-clickable m-right10">扩容</span> 
                    </el-tooltip>
                    <el-button type="text" v-else @click="capacity(scope.row)">扩容</el-button> 
                    <!-- <el-button type="text" @click="record(scope.row)" :disabled="!auth_list.includes('record')">删除</el-button>  -->
                    <el-button type="text" @click="record(scope.row)">操作记录</el-button> 
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
            <capacity :visible.sync="visible" :info="operateInfo"></capacity>
        </template>
        <template v-if="recordVisible">
            <record :visible="recordVisible" :record_id="operateInfo.nas_id" :type="'nas'" @close="closeRecord"></record>
        </template>
        <custom-list-item
            :visible.sync="show_custom" 
            :all_item="all_item"
            :all_column_item="all_column_item" 
            @fn-custom="get_custom_columns"
            :type="'nas'"
        ></custom-list-item>
    </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import SvgIcon from '../../components/svgIcon/index.vue';
import Service from '../../https/filesystem/list';
import moment from 'moment';
import Clipboard from '../../components/clipboard.vue'
import Capacity from './capacity.vue';
import {trans,deal_list} from '../../utils/transIndex';
import CustomListItem from '../physical/customListItem.vue';
import Record from '../instance/record.vue'
@Component({
    components:{
        ActionBlock,
        SvgIcon,
        Clipboard,
        Capacity,
        CustomListItem,
        Record
    }
})
export default class List extends Vue{
    private moment = moment;
    private units=['B','KB','MB','GB','TB','PB','EB','ZB']
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
    private clear=null
    private visible:boolean=false;
    private recordVisible:boolean=false
    private show_custom:boolean=false;
    private all_item:Array<any>=[];
    private all_column_item=[];
    private custom_host=[];
    private status_list:any=[];
    private filter_data:any={}
    private feeInfo={
      '0':'按需计费',
      '1':'包年包月',
      '2':'按次计费',
    }
    created() {
        this.get_status_list()
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
    private async get_field(){
        let res:any = await Service.get_field({})
        if(res.code==="Success"){
        let key_list=['field_name','show_name'];
        let label_list=['prop','label'];
        let list:Array<any>=[]
        res.data.map(item=>{
            list=[...list,...item.filed];
            return item;
        })
        this.all_item = res.data;
        this.all_column_item = deal_list(list,label_list,key_list);
        this.get_custom_columns(this.$store.state.nas_host)
        // this.get_custom_columns(this.$store.state.custom_host)


        }
    }
    private get_custom_columns(list) {
        if(list.length===0){
            return;
        }
        this.custom_host = this.all_column_item.filter(item=>list.includes(item.label));//选中的列表项
        this.custom_host.map((item:any)=>{
            if(item.prop==='nas_id_name'){
                item = Object.assign(item,{},{width:'120px'})
            }
            if(item.prop==='mount_path'){
                item = Object.assign(item,{},{width:'180px'})
            }
            if(item.prop==='create_time'){
                item = Object.assign(item,{},{width:'90px'})
            }
            if(item.prop==='status_ch'){
                item = Object.assign(item,{},{column_key:'status_list',list:this.status_list})
            }
            return item;
        })
    }
    private async get_status_list(){
        let res:any = await Service.get_status_list({})
        if(res.code==='Success'){
            this.status_list = []
            res.data.map(item=>{
                this.status_list.push({
                    text:item.status_ch,
                    value:item.status
                })
            })
            this.get_field()
        }else{
            this.get_field()
        }
        
    }
    private filterAttribute(obj:any){
        this.filter_data = {...this.filter_data,...obj};
        this.search(this.search_data)
    }
    private down(){
        let obj = {
            pod_id:this.$store.state.pod_id,
            status_list:this.filter_data.status_list ? this.filter_data.status_list.join(',') :'',
            field_names:JSON.stringify(this.custom_host.map((item:any)=>item.prop)) 
        }
        let str=""
        for (let i in obj){
            if(obj[i]){
                str =str+`${i}=${obj[i]}&`
            }
            }
            let query = str==="" ? "" : `?${str.slice(0,str.length-1)}`
            window.location.href=`/nas_union_business/v1/nas/nas_list_download/${query}`
        }
    private async getNasList(loading:boolean=true){
        if(!loading){
            this.$store.commit('SET_LOADING', false);
        }
        let res:any = await Service.get_nas_list({
            ...this.search_data,
            pod_id:this.$store.state.pod_id,
            page_index:this.current,
            page_size:this.size,
            status_list:this.filter_data.status_list || [],

        })
        if(res.code==="Success"){
            this.list = res.data.nas_list;
            this.total = res.data.page.count
            this.getFileUse(false)
        }
        this.FnSetTimer()
    }
    private FnSetTimer(){
      if(this.clear){
        this.FnClearTimer()
      }
      this.clear = setTimeout(()=>{
        this.getNasList(false)
      },1000*60)
    }
    private FnClearTimer(){
      if(this.clear){
        clearTimeout(this.clear)
      }
    }
    private FnCustom() {
        this.show_custom = true;
    }
    private async getFileUse(loading:boolean=true){
      if(!loading){
        this.$store.commit("SET_LOADING",false)
      }
      if(this.list.length===0){
        return;
      }
      let res:any = await Service.get_file_use({
        region_id:this.list[0].region_id,
        volume_ids:this.list.map(item=>item.nas_id)
      })
      if(res.code==='Success'){
        this.list.map(item=>{
          let size = this.computeUnit(res.data[item.nas_id]&& res.data[item.nas_id].used ? res.data[item.nas_id].used : 0);
          let total = this.computeUnit(res.data[item.nas_id]&& res.data[item.nas_id].total ? (res.data[item.nas_id].total) : 0);
          let num:any = res.data[item.nas_id]&&res.data[item.nas_id].used && res.data[item.nas_id].total ? (Number(res.data[item.nas_id].used/res.data[item.nas_id].total)*100).toFixed(2) : '0.00'
          this.$set(item,'use_percent',`${num}%`)
          this.$set(item,'use_size',`${size} / ${total}`)
        })
      }
    }
    private search(data:any={}){
        this.FnClearTimer()
        this.current = 1;
        this.search_data={...data}
        this.getNasList()
    }
    private refresh(){
        this.FnClearTimer()
        this.getNasList()
    }
    private handleSizeChange(size){
        this.FnClearTimer()
        this.size = size
        this.getNasList()
    }
    private handleCurrentChange(cur){
        this.FnClearTimer()
        this.current = cur
        this.getNasList()
    }
    private detail(id){
        this.FnClearTimer()
        this.$router.push({
            path:'fielsystem/detail',
            query:{
                id
            }
        })
    }
    private capacity(row){
        this.FnClearTimer()
        this.visible=true;
        this.operateInfo=row
    }
    private computeUnit(value,num=0){
        if(value>=1024){
            return this.computeUnit(value/1024,++num)
        }else{
            return value.toFixed(2) + this.units[num];
        }        
    }
    private record(row){
        this.FnClearTimer()
        this.recordVisible=true;
        this.operateInfo=row
    }
    private closeRecord(){
        this.recordVisible=false;
    }
    beforeDestroy() {
        this.FnClearTimer()
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