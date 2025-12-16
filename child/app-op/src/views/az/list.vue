<template>
    <div>
        <div class="search-box">
            <el-select placeholder="请选择地域"
                       v-model="search_data.region"
                       class="search"
                       @change="change($event,'region')"
                       :clearable="!$store.state.is_special_user">
                <el-option v-for="item in regionList" :key="item.region_id" :value="item.region_name" :label="item.region_name"></el-option>
            </el-select>
            <el-select
                placeholder="请选择可用区"
                v-model="search_data.az"
                class="search"
                :clearable="!$store.state.is_special_user"
                filterable
                :filter-method="filterAz"
                @visible-change="change_az"
                @change="changeAz"
            >
                <el-option v-for="item in azList" :key="item.az_id" :value="item.az_name" :label="item.az_name"></el-option>
            </el-select>
            <!-- <el-select placeholder="请选择公网类型" v-model="search_data.public" class="search" @change="change($event,'public')" clearable>
                <el-option v-for="(item,i) in publicList" :key="i" :value="i" :label="item"></el-option>
            </el-select> -->
            <div>
                <el-button type="primary" @click="sync" :disabled="!authList.includes('sync')">同步</el-button>
            </div>
        </div>
        <el-table
            :data="list"
            border
            ref="az_list"
        >
           <el-table-column prop="az_id" label="可用区编号">
               <template slot-scope="scope">
                   <span :class="scope.row.is_complete ? 'normal' : 'active'">{{scope.row.az_id}}</span>
               </template>
           </el-table-column>
           <el-table-column prop="az_name" label="可用区名称">
               <template slot-scope="scope">
                   <span :class="scope.row.is_complete ? 'normal' : 'active'">{{scope.row.az_name}}</span>
               </template>
           </el-table-column>
           <el-table-column prop="region_name" label="所属地域">
               <template slot-scope="scope">
                   <span :class="scope.row.is_complete ? 'normal' : 'active'">{{scope.row.region_name}}</span>
               </template>
           </el-table-column>
           <el-table-column prop="region_id" label="所属地域编号">
               <template slot-scope="scope">
                   <span :class="scope.row.is_complete ? 'normal' : 'active'">{{scope.row.region_id}}</span>
               </template>
           </el-table-column>
           <el-table-column prop="support_ecs_type" label="计算产品类型">
               <template slot-scope="scope">
                    <span :class="scope.row.is_complete ? 'normal' : 'active'">
                        <span v-for="(item,index) in scope.row.support_ecs_type">{{ item ? `${item.toUpperCase()}型${index===scope.row.support_ecs_type.length-1 ? '' : ','}` : '' }}</span>
                    </span>
               </template>
           </el-table-column>
           <!-- <el-table-column prop="net_type_display" label="公网类型">
               <template slot-scope="scope">
                   <span :class="scope.row.is_complete ? 'normal' : 'active'">{{scope.row.net_type_display}}</span>
               </template>
           </el-table-column> -->
           <el-table-column prop="backend_types_display" label="存储类型">
               <template slot-scope="scope">
                   <span :class="scope.row.is_complete ? 'normal' : 'active'">{{scope.row.backend_types_display}}</span>
               </template>
           </el-table-column>
           <el-table-column prop="status_display" label="状态">
               <template slot-scope="scope">
                   <span :class="scope.row.is_complete ? scope.row.status : 'active'">{{scope.row.status_display}}</span>
               </template>
           </el-table-column>
           <el-table-column prop="customer" label="客户权限">
               <template slot-scope="scope">
                   <span :class="scope.row.is_complete ? 'normal' : 'active'" v-if="!scope.row.customer || scope.row.customer.length===0">{{scope.row.customer && scope.row.status==='gray_open'&& scope.row.customer.length===0 ? '-' : '全部客户'}}</span>
                   <span :class="scope.row.is_complete ? 'normal' : 'active'" v-else>{{scope.row.customer.join(',')}}</span>
               </template>
           </el-table-column>
           <el-table-column prop="remark" label="备注">
               <template slot-scope="scope">
                   <span :class="scope.row.is_complete ? 'normal' : 'active'">{{scope.row.remark}}</span>
               </template>
           </el-table-column>
           <el-table-column prop="update_time" label="更新时间">
               <template slot-scope="scope">
                   <span :class="scope.row.is_complete ? 'normal' : 'active'">{{scope.row.update_time}}</span>
               </template>
           </el-table-column>
           <el-table-column prop="create_time" label="创建时间">
               <template slot-scope="scope">
                   <span :class="scope.row.is_complete ? 'normal' : 'active'">{{scope.row.create_time}}</span>
               </template>
           </el-table-column>
           <el-table-column prop="operate" label="操作">
               <template slot-scope="scope">
                 <el-button type="text" @click="handle({obj:scope.row,label:'edit'})" :disabled="!authList.includes('edit')">编辑</el-button>
                 <el-dropdown @command="handle" class="m-left5">
                   <el-button type="text">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                   <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item v-for="(item,index) in handle_btns"
                                       :key="index" :command="{obj:scope.row,label:item.value}"
                                       :disabled="!authList.includes(item.value)">
                       {{item.label}}
                     </el-dropdown-item>
                   </el-dropdown-menu>
                 </el-dropdown>
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
        <template v-if="visible && operateType==='edit'">
            <edit :visible.sync="visible" :info="operateInfo"></edit>
        </template>
        <template v-if="visible && operateType==='scheduling'">
            <resource :visible.sync="visible" :az_id="operateInfo.az_id"></resource>
        </template>
        <template v-if="visible && operateType==='record'">
            <record :visible.sync="visible" :az_id="operateInfo.az_id"></record>
        </template>
        <template v-if="visible && operateType==='dispatch'">
          <cluster :visible.sync="visible" :info="operateInfo"></cluster>
        </template>
        <template v-if="visible && operateType==='mirror_snapshot'">
          <mirror-scroll :visible.sync="visible" :info="operateInfo"></mirror-scroll>
        </template>
        <template v-if="visible && operateType==='mirror_back'">
          <mirror-back :visible.sync="visible" :az_id="operateInfo.az_id"></mirror-back>
        </template>
    </div>
</template>

<script lang="ts">
import {Vue,Component,Watch} from 'vue-property-decorator';
import Service from '../../https/az/list';
import iService from '../../https/instance/create'
import Edit from './edit.vue';
import Resource from './resouce.vue';
import Record from './record.vue'
import Cluster from "./cluster.vue";
import MirrorScroll from "@/views/az/mirrorScroll.vue";
import MirrorBack from "@/views/az/mirrorBack.vue";
@Component({
    components:{
        MirrorBack,
        MirrorScroll,
        Cluster,
        Edit,
        Resource,
        Record
    }
})
export default class Az extends Vue{
    private list:any=[];
    private search_data:any={
        region:'',
        az:'',
        public:''
    }
    private regionList:any=[]
    private azList:any=[]
    // private publicList:any={};
    private visible:boolean=false;
    private operateInfo:any={};
    private operateType:string='';
    private authList:any=[];
    private flag:boolean=true
    private pageInfo:any={
        page_index:1,
        page_size:20,
        total:0,
    }
    private handle_btns:any=[
        {
            label:'操作记录',
            value:'record'
        },
        {
            label:'调度策略管理',
            value:'scheduling'
        },
        {
            label:'集群调度',
            value:'dispatch'
        },
        {
          label:'镜像卷快照策略',
          value:'mirror_snapshot'
        },
        // {
        //   label:'镜像卷回滚',
        //   value:'mirror_back'
        // },
        {
          label:'删除',
          value:'del'
        },
    ]

    created() {
        this.authList = this.$store.state.auth_info[this.$route.name];
        this.getRegion()
        // this.getNetType()
        this.getAzList()
    }
    @Watch('visible')
    private watch_visible(nv){
        if(!nv){
            this.getAzList()
        }
    }
    private async getRegion(){
        this.regionList=[]
        let res:any = await iService.get_region_az_list({
            employee_no: this.$store.state.employee_no,
            user_name: this.$store.state.login_name
        });
        if(res.code==='Success'){
            for(let i in res.data){
                this.regionList=[...this.regionList,...res.data[i].region_list]
            }
            this.search_data.region = this.regionList[0].region_name
        }
    }
    // private async getNetType(){
    //     let res:any = await Service.get_net_type();
    //     if(res.code==='Success'){
    //         this.publicList = res.data;
    //     }
    // }
    private filterAz(val){
        this.getAzList(val)
    }
    private changeAz(val){

        if(val){
            return;
        }else{
            this.getAzList()
        }
    }
    private async getAzList(val:string=this.search_data.az){
        // net_type:this.search_data.public,--公网类型
        let res:any = await Service.get_az_list({
            region_name:this.search_data.region,
            az_name:val,
            page_index:this.pageInfo.page_index,
            page_size:this.pageInfo.page_size,
            employee_no: this.$store.state.employee_no,
            user_name: this.$store.state.login_name
        })
        if(res.code==='Success'){
            this.list = res.data.az_list;
            if(this.flag && !this.$store.state.is_special_user){
                this.azList = res.data.az_list
            }
            this.flag=false
            this.pageInfo.total = res.data.page_info.count
        }
    }
    private handleCurrentChange(cur){
        this.pageInfo.page_index = cur;
        this.getAzList()
    }
    private handleSizeChange(size){
        this.pageInfo.page_size = size;
        this.getAzList()
    }
    private change(val,label){
        // this.search_data[label] = val;
        this.pageInfo.page_index=1
        this.getAzList()
    }
    //关闭面板时重新获取实例列表
    private change_az(val){
        if(!val){
            this.getAzList()
        }

    }
    private handle(row){
        const {obj,label}=row;
        if(label==='del'){
          this.del(obj)
        }else {
          this.operateInfo = obj;
          this.operateType = label
          this.visible=true;
        }
    }
    private async sync(){
        let res:any = await Service.sync();
        if(res.code==='Success'){
            this.pageInfo.page_index = 1;
            this.getAzList()
        }
    }
    private del(obj){
        const h = this.$createElement;
         this.$msgbox({
          title: '删除',
          message: h('p', null, [
            h('span', null, '您是否确认删除 '),
            h('i', { style: 'color:  #455cc6' }, obj.az_name),
            h('span', null, ' 可用区？ '),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose:async (action, instance, done) => {
            if (action === 'confirm') {
                let res:any = await Service.del_status({
                    az_id:obj.az_id
                })
                if(res.code==='Success'){
                    this.$message.success(res.message);
                    this.getAzList()
                }
                done();
            } else {
              done();
            }
          }
        }).then(action => {
        });
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
