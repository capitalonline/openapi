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
            <el-table-column prop="disk_id" label="云盘ID"></el-table-column>
            <el-table-column prop="disk_name" label="云盘名称"></el-table-column>
            <el-table-column prop="status" label="云盘状态">
                <template slot-scope="scope">
                <span :class="scope.row.status">{{scope.row.status_name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="size" label="容量"></el-table-column>
            <el-table-column prop="used" label="实际使用空间"></el-table-column>
            <el-table-column prop="az_name" label="可用区">
                <template slot-scope="scope">
                    <span>{{`${scope.row.region_name}-${scope.row.az_name}`}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="disk_type" label="属性">
                <template slot-scope="scope">
                <span>{{scope.row.disk_type==="data" ? `数据盘` : '系统盘'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ecs_name" label="实例名称"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="fee_way" label="计费方式" :filter-multiple="false" :filters="fee_way_fil" column-key="fee_way">
                <template slot-scope="scope">
                <span>{{!scope.row.billing_method_display ? '不计费' : scope.row.billing_method_display}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="op_source" label="创建来源" :filter-multiple="false" :filters="op_source_fil" column-key="op_source">
                <template slot-scope="scope">
                <span>{{scope.row.op_source==="gic" ? 'GIC' : '运维后台'}}</span>
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