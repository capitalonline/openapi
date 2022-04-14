<template>
    <div>
        <action-block :search_option="search_option" @fn-search="search"></action-block>
        <div class="icon m-bottom10">
            <el-tooltip content="导出" placement="bottom" effect="light">
                <el-button type="text" @click="down" :disabled="!auth_list.includes('export')"><svg-icon icon="export" class="export"></svg-icon></el-button>
            </el-tooltip>
        </div>
        <el-table :data="list" border class="event-table">
            <!-- <el-table-column type="selection"></el-table-column> -->
            <el-table-column prop="os_id" label="镜像ID"></el-table-column>
            <el-table-column prop="os_name" label="镜像名称"></el-table-column>
            <el-table-column prop="customer_id" label="客户ID"></el-table-column>
            <el-table-column prop="customer_name" label="客户名称"></el-table-column>
            <el-table-column prop="type" label="镜像类型" :filter-multiple="false" column-key="type" :filters="mirror_type"></el-table-column>
            <el-table-column prop="init_mirror" label="初始镜像"></el-table-column>
            <el-table-column prop="size" label="容量(GB)" sortable="custom"></el-table-column>
            <el-table-column prop="compute_type" label="计算类型" :filter-multiple="false" column-key="compute_type" :filters="compute_type"></el-table-column>
            <el-table-column prop="drive_type" label="驱动类型" :filter-multiple="false" column-key="drive_type" :filters="drive_type"></el-table-column>
            <el-table-column prop="disk_type" label="盘类型" :filter-multiple="false" column-key="disk_type" :filters="disk_type"></el-table-column>
            <el-table-column prop="storage" label="存储介质" :filter-multiple="false" column-key="storage" :filters="storage_list"></el-table-column>
            <el-table-column prop="az" label="存在可用区数量">
                <template slot-scope="scope">
                    <span>{{scope.row.az}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" :filter-multiple="false" column-key="status" :filters="status_list"></el-table-column>
            <el-table-column prop="update_time" label="更新时间" sortable="custom"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" sortable="custom"></el-table-column>
            <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
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
    </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import SvgIcon from '../../components/svgIcon/index.vue';
@Component({
    components:{
        ActionBlock,
        SvgIcon,
    }
})
export default class PrivateMirror extends Vue{
    private search_option:any={
        customer:{placeholder:'请输入客户ID/名称'},
        mirror:{placeholder:'请输入镜像ID/名称'},
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
    private disk_type:any=[];
    private storage_list:any=[]
    private status_list:any=[];
    private visible:boolean=true;
    private oper_type:String="";
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

    }
    private FnSync(obj){
        this.visible=true;
        this.oper_type='sync';
        this.oper_info=obj
    }
    private record(obj){

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