<template>
    <div>
        <action-block :search_option="search_option" @fn-search="search">
            <template #default>
                <el-button type="primary" @click="add" :disabled="!auth_list.includes('create')">新增镜像</el-button>
            </template>
        </action-block>
        <div class="icon m-bottom10">
            <el-tooltip content="导出" placement="bottom" effect="light">
                <el-button type="text" @click="down" :disabled="!auth_list.includes('export')"><svg-icon icon="export" class="export"></svg-icon></el-button>
            </el-tooltip>
        </div>
        <el-table :data="list" border class="event-table">
            <!-- <el-table-column type="selection"></el-table-column> -->
            <el-table-column prop="os_id" label="镜像ID"></el-table-column>
            <el-table-column prop="os_name" label="镜像名称"></el-table-column>
            <el-table-column prop="type" label="镜像类型" :filter-multiple="false" column-key="type" :filters="mirror_type"></el-table-column>
            <el-table-column prop="size" label="容量" sortable="custom"></el-table-column>
            <el-table-column prop="compute_type" label="计算类型" :filter-multiple="false" column-key="compute_type" :filters="compute_type"></el-table-column>
            <el-table-column prop="drive_type" label="驱动类型" :filter-multiple="false" column-key="drive_type" :filters="drive_type"></el-table-column>
            <el-table-column prop="storage" label="存储类型"></el-table-column>
            <el-table-column prop="az" label="可用区">
                <template slot-scope="scope">
                    <span>{{scope.row.az}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="customer" label="客户权限"></el-table-column>
            <el-table-column prop="status" label="状态" :filter-multiple="false" column-key="status" :filters="status_list"></el-table-column>
            <el-table-column prop="path" label="路径"></el-table-column>
            <el-table-column prop="update_time" label="更新时间"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" sortable="custom"></el-table-column>
            <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" v-if="['enable','disable'].includes(scope.row.status)" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="text" v-if="['enable','disable','build_fail'].includes(scope.row.status)" @click="del(scope.row)">删除</el-button>
                    <el-button type="text" v-if="['enable','disable'].includes(scope.row.status)" @click="changeStatus(scope.row)">状态变更</el-button>
                    <el-button type="text" v-if="['enable'].includes(scope.row.status)" @click="FnSync(scope.row)">同步</el-button>
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
        <template v-if="visible && ['add','edit'].includes(oper_type)">
            <add-common :visible.sync="visible" :id="oper_info.id ? oper_info.id : ''"></add-common>
        </template>
        <template v-if="visible && ['sync'].includes(oper_type)">
            <sync-mirror :visible.sync="visible"></sync-mirror>
        </template>
        <template v-if="visible && ['change'].includes(oper_type)">
            <change-status :visible.sync="visible"></change-status>
        </template>
        <template v-if="visible && ['addCommon'].includes(oper_type)">
            <add-common-mirror :visible.sync="visible"></add-common-mirror>
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
import moment from 'moment'
@Component({
    components:{
        ActionBlock,
        SvgIcon,
        AddCommon,
        SyncMirror,
        ChangeStatus,
        AddCommonMirror
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
    private list:any=[{id:1,status:'enable'}]
    private current:number = 1
    private size:number = 20
    private total:number = 0
    private search_data:any={};
    private auth_list:any=[];
    private mirror_type:any=[];
    private compute_type:any=[];
    private drive_type:any=[];
    private status_list:any=[];
    private visible:boolean=true;
    private oper_type:string="";
    private oper_info:any={};
    created() {
        this.auth_list = this.$store.state.auth_info[   this.$route.name]
        this.search()
    }
    private search(data:any={}){
        this.current = 1;
        this.search_data=data
        this.getMirrorList()
    }
    private async getMirrorList(){
        const{os_id,display_name,time} = this.search_data
        let res:any = await Service.get_pub_mirror_list({
            os_id,
            display_name,
            start_day:time && time[0] ? moment(time[0]).format('YYYY-MM-DD') : undefined,
            end_day:time && time[1] ? moment(time[1]).format('YYYY-MM-DD') : undefined,
        })
    }
    private handleSizeChange(size){
        this.size = size
        this.getMirrorList()
    }
    private handleCurrentChange(cur){
        this.current = cur
        this.getMirrorList()
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
    private del(obj){
        this.$confirm('您是否要删除镜像?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
        this.oper_type='addCommon';
        this.oper_info=obj
    }
    private down(){

    }
    private operate(id:String){
       
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
</style>