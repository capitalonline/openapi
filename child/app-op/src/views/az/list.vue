<template>
    <div>
        <div class="search-box">
            <el-select placeholder="请选择地域" v-model="search_data.region" class="search" @change="change($event,'region')" clearable>
                <el-option v-for="item in regionList" :key="item.region_id" :value="item.region_name" :label="item.region_name"></el-option>
            </el-select>
            <el-select 
                placeholder="请选择可用区" 
                v-model="search_data.az" 
                class="search" 
                clearable 
                filterable 
                :filter-method="filterAz" 
                @visible-change="change_az"
                @change="changeAz"
            >
                <el-option v-for="item in azList" :key="item.az_id" :value="item.az_name" :label="item.az_name"></el-option>
            </el-select>
            <el-select placeholder="请选择公网类型" v-model="search_data.public" class="search" @change="change($event,'public')" clearable>
                <el-option v-for="(item,i) in publicList" :key="i" :value="i" :label="item"></el-option>
            </el-select>
            <div>
                <el-button type="primary" @click="sync" :disabled="!authList.includes('sync')">同步</el-button>
            </div>
        </div>
        <el-table
            :data="list"
            border
            ref="az_list"
        >
           <el-table-column prop="az_id" label="可用区编号"></el-table-column>
           <el-table-column prop="az_name" label="可用区名称"></el-table-column>
           <el-table-column prop="region_name" label="所属地域"></el-table-column>
           <el-table-column prop="region_id" label="所属地域编号"></el-table-column>
           <el-table-column prop="net_type_display" label="公网类型"></el-table-column>
           <el-table-column prop="backend_types_display" label="存储类型"></el-table-column>
           <el-table-column prop="status_display" label="状态">
               <template slot-scope="scope">
                   <span :class="scope.row.status">{{scope.row.status_display}}</span>
               </template>
           </el-table-column>
           <el-table-column prop="customer" label="客户权限">
               <template slot-scope="scope">
                   <span v-if="!scope.row.customer || scope.row.customer.length===0">全部客户</span>
                   <span v-else>{{scope.row.customer.join(',')}}</span>
               </template>
           </el-table-column>
           <el-table-column prop="remark" label="备注"></el-table-column>
           <el-table-column prop="update_time" label="更新时间"></el-table-column>
           <el-table-column prop="create_time" label="创建时间"></el-table-column>
           <el-table-column prop="operate" label="操作">
               <template slot-scope="scope">
                   <el-button type="text" @click="handle(scope.row,'edit')" :disabled="!authList.includes('edit')">编辑</el-button>
                   <el-button type="text" @click="del(scope.row)" :disabled="!authList.includes('del')">删除</el-button>
                   <el-button type="text" @click="handle(scope.row,'record')" :disabled="!authList.includes('record')">操作记录</el-button>
                   <el-button type="text" @click="handle(scope.row,'resource')" :disabled="!authList.includes('scheduling')">调度策略管理</el-button>
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
        <template v-if="visible && operateType==='resource'">
            <resource :visible.sync="visible" :az_id="operateInfo.az_id"></resource>
        </template>
        <template v-if="visible && operateType==='record'">
            <record :visible.sync="visible" :az_id="operateInfo.az_id"></record>
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
@Component({
    components:{
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
    private publicList:any={};
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
    
    created() {
        this.authList = this.$store.state.auth_info[this.$route.name];        
        this.getRegion()
        this.getNetType()
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
        let res:any = await iService.get_region_az_list({});
        if(res.code==='Success'){
            for(let i in res.data){
                this.regionList=[...this.regionList,...res.data[i].region_list]
            }
        }
    }
    private async getNetType(){
        let res:any = await Service.get_net_type();
        if(res.code==='Success'){
            this.publicList = res.data;
        }
    }
    private filterAz(val){
        console.log('filterAz');
        
        this.getAzList(val)
    }
    private changeAz(val){
        
        if(val){
            return;
        }else{
            console.log('changeAz');
            this.getAzList()
        }
    }
    private async getAzList(val:string=this.search_data.az){
        let res:any = await Service.get_az_list({
            region_name:this.search_data.region,
            az_name:val,
            net_type:this.search_data.public,
            page_index:this.pageInfo.page_index,
            page_size:this.pageInfo.page_size,
        })
        if(res.code==='Success'){
            this.list = res.data.az_list;
            if(this.flag){
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
    private handle(obj,label){
        this.operateInfo = obj;
        this.operateType = label
        this.visible=true;
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
                    this.$message.success(res.message)
                }
                done();
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
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

</style>