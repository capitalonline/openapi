<template>
    <div>
        <action-block :search_option="search_option" @fn-search="search">
            <!-- <template #default>
                <el-button type="primary" @click="destroy" :disabled="!auth_list.includes('add_mirror')">销毁</el-button>
            </template> -->
        </action-block>
        <div class="icon m-bottom10">
            <el-tooltip content="导出" placement="bottom" effect="light">
                <el-button type="text" @click="down" :disabled="auth_list.includes('export')"><svg-icon icon="export" class="export"></svg-icon></el-button>
            </el-tooltip>
        </div>
        <el-table 
            :data="list" 
            border 
        >
            <el-table-column prop="customer_id" label="序号" width="45">
                <template slot-scope="scope">
                    <span>{{ scope.$index }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="customer_id" label="客户ID"></el-table-column>
            <el-table-column prop="customer_name" label="客户名称"></el-table-column>
            <el-table-column prop="nas_id" label="文件系统ID/名称" width="120px">
                <template slot-scope="scope">
                    
                    <div>{{`${scope.row.nas_id} / ${scope.row.nas_name}`}}</div>
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
// import Service from '../../https/statistical/list';
import moment from 'moment';
// import 
@Component({
    components:{
        ActionBlock,
        SvgIcon,
    }
})
export default class List extends Vue{
    private moment = moment;
    private units=['B','KB','MB','GB','TB','PB','EB','ZB']
    private search_option:Object={
        az_id:{placeholder:'请选择可用区',list:[]},
        customer_name:{placeholder:'请输入客户名称'},
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
    private show_custom:boolean=false;
    private all_item:Array<any>=[];
    private all_column_item=[];
    private custom_host=[]
    private feeInfo={
      '0':'按需计费',
      '1':'包年包月',
      '2':'按次计费',
    }
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
   
    private get_custom_columns(list) {
        console.log('list',list)
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
            return item;
        })
    }
    private down(){
        let obj = {
            pod_id:this.$store.state.pod_id,
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
        // let res:any = await Service.get_nas_list({
        //     ...this.search_data,
        //     pod_id:this.$store.state.pod_id,
        //     page_index:this.current,
        //     page_size:this.size
        // })
        // if(res.code==="Success"){
        //     this.list = res.data.nas_list;
        //     this.total = res.data.page.count
        //     this.getFileUse(false)
        // }
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
    //   if(!loading){
    //     this.$store.commit("SET_LOADING",false)
    //   }
    //   if(this.list.length===0){
    //     return;
    //   }
    //   let res:any = await Service.get_file_use({
    //     region_id:this.list[0].region_id,
    //     volume_ids:this.list.map(item=>item.nas_id)
    //   })
    //   if(res.code==='Success'){
    //     this.list.map(item=>{
    //       let size = this.computeUnit(res.data[item.nas_id]&& res.data[item.nas_id].used ? res.data[item.nas_id].used : 0);
    //       let total = this.computeUnit(res.data[item.nas_id]&& res.data[item.nas_id].total ? (res.data[item.nas_id].total) : 0);
    //     //   console.log('###',res.data[item.nas_id],res.data[item.nas_id].used,res.data[item.nas_id].total)
    //       let num:any = res.data[item.nas_id]&&res.data[item.nas_id].used && res.data[item.nas_id].total ? (Number(res.data[item.nas_id].used/res.data[item.nas_id].total)*100).toFixed(2) : '0.00'
    //       console.log('num',num)
    //       this.$set(item,'use_percent',`${num}%`)
    //       this.$set(item,'use_size',`${size} / ${total}`)
    //     })
    //   }
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
        console.log('ccc')
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