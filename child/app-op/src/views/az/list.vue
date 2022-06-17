<template>
    <div>
        <div class="search-box">
            <el-select placeholder="请选择地域" v-model="region" class="search">
                <el-option v-for="item in regionList" :key="item.region_id" :value="item.region_id">{{item.region_name}}</el-option>
            </el-select>
            <el-select placeholder="请选择可用区" v-model="az" class="search">
                <el-option v-for="item in azList" :key="item.az_id" :value="item.az_id">{{item.az_name}}</el-option>
            </el-select>
            <el-select placeholder="请选择公网类型" v-model="public" class="search">
                <el-option v-for="item in publicList" :key="item.region_id" :value="item.region_id">{{item.region_name}}</el-option>
            </el-select>
            <div>
                <el-button type="primary">同步</el-button>
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
           <el-table-column prop="net_type" label="公网类型"></el-table-column>
           <el-table-column prop="backend_types" label="存储类型"></el-table-column>
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
                   <el-button type="text" @click="handle(scope.row,'edit')">编辑</el-button>
                   <el-button type="text" @click="del(scope.row)">删除</el-button>
                   <el-button type="text" @click="handle(scope.row,'record')">操作记录</el-button>
                   <el-button type="text" @click="handle(scope.row,'resource')">调度策略管理</el-button>
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
            <resource :visible.sync="visible" :info="operateInfo"></resource>
        </template>
        <template v-if="visible && operateType==='record'">
            <record :visible.sync="visible" :info="operateInfo"></record>
        </template>
    </div>
</template>

<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import Service from '../../https/az/list';
import Edit from './edit.vue';
import Resource from './resouce.vue';
import Record from '../instance/record.vue'
@Component({
    components:{
        Edit,
        Resource,
        Record
    }
})
export default class Az extends Vue{
    private list:any=[{az_id:'1',az_name:'北京A'}];
    private region:string='';
    private az:string='';
    private public:string='';
    private regionList:any=[]
    private azList:any=[]
    private publicList:any=[];
    private visible:boolean=false;
    private operateInfo:any={};
    private operateType:string=''
    private pageInfo:any={
        page_index:1,
        page_size:20,
        total:0,
    }
    
    created() {
        // this.getAzList()
    }
    private async getAzList(){
        let res:any = await Service.get_az_list({
            region_name:this.region,
            az_name:this.az,
            net_type:this.public,
            page_index:this.pageInfo.page_index,
            page_size:this.pageInfo.page_size,
        })
        if(res.code==='Success'){
            this.list = res.data.az_list;
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
    private handle(obj,label){
        this.operateInfo = obj;
        this.operateType = label
        this.visible=true;
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
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
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