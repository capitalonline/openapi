<template>
    <div>
        <action-block :search_option="search_option" @fn-search="search">
            <!-- <template #default>
                <el-button type="primary" @click="destroy" :disabled="!auth_list.includes('add_mirror')">销毁</el-button>
            </template> -->
        </action-block>
        <div class="icon m-bottom10">
            <el-tooltip content="刷新" placement="bottom" effect="light">
                <el-button type="text" @click="refresh"><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
            </el-tooltip>
        </div>
        <el-table 
            :data="list" 
            border 
        >
            <el-table-column prop="customer_id" label="客户ID"></el-table-column>
            <el-table-column prop="customer_name" label="客户名称"></el-table-column>
            <el-table-column prop="nas_id" label="文件系统ID/名称" width="120px">
                <template slot-scope="scope">
                    <div>
                        <el-tooltip 
                            :content="scope.row.nas_id" 
                            placement="bottom" 
                            effect="light">
                                <span class="id-cell clickble" @click="detail(scope.row.nas_id)">{{ scope.row.nas_id }}</span>
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
                        :content="scope.row.mount_path" 
                        placement="bottom" 
                        effect="light">
                            <span class="id-cell">{{ scope.row.mount_path}}</span>
                    </el-tooltip>
                    <Clipboard :content="scope.row.mount_path"></Clipboard>                
                </template>
            </el-table-column>
            <el-table-column prop="use_total_size" label="使用量/总容量"  width="140"></el-table-column>
            <el-table-column prop="used_percent" label="空间使用率"></el-table-column>
            <el-table-column prop="billing_method" label="计费方式">
                <template slot-scope="scope">
                    <span>{{feeInfo[scope.row.billing_method]}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status_ch" label="状态">
                <template slot-scope="scope">
                    <span :class="scope.row.status">{{scope.row.status_cn}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.create_time ? moment(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') : ''}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.row)">查看不可用原因</el-button> 
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
            <el-dialog
                title="查看文件系统不可用原因"
                :visible.sync="visible"
                width="30%"
                :close-on-click-modal="false"
                :destroy-on-close="true">
                <span>{{reason}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="visible = false">确 定</el-button>
                </span>
            </el-dialog>
        </template>
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
        Clipboard,
    }
})
export default class List extends Vue{
    private moment = moment;
    private units=['B','KB','MB','GB','TB','PB','EB','ZB']
    private search_option:Object={
        customer:{placeholder:'请输入后查询',list:[{type:'customer_id',label:'客户ID'},{type:'customer_name',label:'客户名称'}]
        ,type:'composite',width:340},
        nas:{placeholder:'请输入后查询',list:[{type:'nas_id',label:'文件系统ID'},{type:'nas_name',label:'文件系统名称'}]
        ,type:'composite',width:340},
        // customer_id:{placeholder:'请输入客户ID'},
        // customer_name:{placeholder:'请输入客户名称'},
        // nas_id:{placeholder:'请输入文件系统ID'},
        // nas_name:{placeholder:'请输入文件系统名称'},
    }
    private list:Array<any>=[{customer_id:1}]
    private current:number = 1
    private size:number = 20
    private total:number = 0
    private search_data:any={};
    private auth_list:any=[];
    private operateInfo:any={}
    private clear=null
    private visible:boolean=false;
    private reason:string=''
    private feeInfo={
      '0':'按需计费',
      '1':'包年包月',
      '2':'按次计费',
    }
    created() {
        this.auth_list = this.$store.state.auth_info[this.$route.name];
        this.search()
    }
    // @Watch('visible')
    // private watch_visible(nv){
    //     if(!nv){
    //         this.getNasList()
    //     }
    // }
    @Watch('$store.state.pod_id')
    private watch_pod(){
        this.search(this.search_data)
    }
    private async getNasList(loading:boolean=true){
        let res:any = await Service.get_not_use_list({
            [this.search_data.customersub ? this.search_data.customersub : 'customer_id']:this.search_data.customer,
            [this.search_data.nassub ? this.search_data.nassub : 'customer_id']:this.search_data.nas,
            // ...this.search_data,
            pod_id:this.$store.state.pod_id,
            page_index:this.current,
            page_size:this.size
        })
        if(res.code==="Success"){
            this.list = res.data.data;
            this.total = res.data.total_num
            this.getFileUse(false)
        }
    }
    private async getFileUse(loading:boolean=true){
      if(!loading){
        this.$store.commit("SET_LOADING",false)
      }
      let res:any = await Service.get_file_use({
        region_id:this.list[0].region_id,
        volume_ids:this.list.map(item=>item.nas_id)
      })
      if(res.code==='Success'){
        this.list.map(item=>{
          let size = this.computeUnit(res.data[item.nas_id]&& res.data[item.nas_id].used ? res.data[item.nas_id].used : 0);
          let total = this.computeUnit(res.data[item.nas_id]&& res.data[item.nas_id].total ? (res.data[item.nas_id].total) : 0);
        //   console.log('###',res.data[item.nas_id],res.data[item.nas_id].used,res.data[item.nas_id].total)
          let num:any = res.data[item.nas_id]&&res.data[item.nas_id].used && res.data[item.nas_id].total ? Number(res.data[item.nas_id].used/res.data[item.nas_id].total).toFixed(2) : 0.00
          console.log('num',num)
          this.$set(item,'used_percent',`${num}%`)
          this.$set(item,'use_total_size',`${size} / ${total}`)
        })
      }
    }
    private search(data:any={}){
        this.current = 1;
        this.search_data={...data}
        console.log('this.search_data',this.search_data)
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
    private computeUnit(value,num=0){
        if(value>=1024){
            return this.computeUnit(value/1024,++num)
        }else{
            return value.toFixed(2) + this.units[num];
        }        
    }
    private view(row){
        this.visible=true;
        this.reason = row.reason
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
