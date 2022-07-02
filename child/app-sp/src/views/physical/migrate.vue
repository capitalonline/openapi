<template>
  <div>
     <el-dialog
      title="迁移"
      :visible.sync="visible_sync"
      width="1140px"
      :destroy-on-close="true"
      custom-class="upload"
      :close-on-click-modal="false"
      @close="back"
    >
        <div class="migrate">
            <div class="left">
                <div class="m-bottom10">
                    <el-checkbox v-model="checked" :indeterminate="isIndeterminate" @change="handleCheckAllChange" :disabled="useable_list.length===0"></el-checkbox>
                    {{rows[0].host_name}}(<span class="num_message">{{selected.length}}</span>/{{list.length}})
                    <span class="warning_message">(若是GPU型云主机，建议单选虚拟机)</span>
                </div>
                <el-table
                    :data="list"
                    ref="table"
                    border
                    max-height="500"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" :selectable="checkSelectable"></el-table-column>
                    <el-table-column prop="customer_id" label="客户ID"></el-table-column>
                    <el-table-column prop="customer_name" label="客户名称"></el-table-column>
                    <el-table-column prop="ecs_id" label="实例名称/实例ID">
                        <template slot-scope="scope">
                            <div>{{scope.row.ecs_name}}</div>
                            <el-tooltip :content="'待迁移的云主机需为CPU型或已关机的GPU型'" effect="light" v-if="!useable_list.includes(scope.row.ecs_id)">
                                <div>{{scope.row.ecs_id}}</div>
                            </el-tooltip>
                            <span v-else>{{scope.row.ecs_id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column prop="genre" label="计算规格"></el-table-column>
                    <el-table-column prop="genre" label="存储"></el-table-column>
                </el-table>
                <div class="error_message m-top10" v-if="selected.length===0">请选择虚拟机</div>
            </div>
            <div class="center">
                <div>迁移至</div>
                <div>------------></div>
            </div>
            <div class="right">
                <h4>目的主机:</h4>
                <div class="m-bottom20">
                    <span class="m-right10">可用区:</span>
                    <span>{{rows[0].az_name}}</span>
                </div>
                <div class="m-bottom10 flex-host">
                    <span class="m-right10">物理机:</span>
                    <div>
                        <el-select 
                            v-model="physical" 
                            filterable 
                            :filter-method="get_recommended_host" 
                            @visible-change="change_physical"
                            placeholder="请选择"
                            multiple 
                        >
                            <el-option
                                v-for="item in recommend"
                                :key="item.host_id"
                                :label="item.host_name"
                                :value="item.host_id"
                                
                            >
                                <span>{{item.host_name}}</span>
                                <!-- <el-tooltip :content="(parseFloat(item.cpu)).toFixed(2)+'%'" placement="bottom" effect="light">
                                    <span><CustomIcon :hei="item.cpu" />CPU</span>
                                </el-tooltip>
                                <el-tooltip :content="(parseFloat(item.ram)).toFixed(2)+'%'" placement="bottom" effect="light">
                                    <span><CustomIcon :hei="item.ram" />内存</span>
                                </el-tooltip> -->
                                
                            </el-option>
                        </el-select>
                        <div class="error_message m-top10" v-if="recommend.length===0">无合适的物理机，无法迁移。可选择单台虚机再次尝试</div>
                    </div>
                    
                </div>
                <!-- <div class="m-right10 flex-base">
                    <span class="m-right10">迁移推荐:</span>
                    <div>
                        <div v-for="item in recommend" :key="item.host_id">
                            {{item.host_name}}
                            <el-tooltip :content="(parseFloat(item.cpu_usage)).toFixed(2)+'%'" placement="top" effect="light">
                                <span><CustomIcon :hei="item.cpu_usage" />CPU</span>
                            </el-tooltip>
                            <el-tooltip :content="(parseFloat(item.memory_usage)).toFixed(2)+'%'" placement="top" effect="light">
                                <span><CustomIcon :hei="item.memory_usage" />内存</span>
                            </el-tooltip>
                        </div>
                    </div>
                </div> -->
            </div>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm" :disabled="this.recommend.length===0">确认</el-button>
            <el-button @click="back('0')">取消</el-button>
        </span>
    </el-dialog>


    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue,PropSync,Watch } from 'vue-property-decorator';
import Service from '../../https/physical/list';
import CustomIcon from './customIcon.vue'
import moment from 'moment';
import {Table} from 'element-ui'
@Component({
    components:{
        CustomIcon
    }
})
export default class Migrate extends Vue{
    $message;
    @PropSync('visible') visible_sync!:Boolean;
    @Prop({default:()=>[]})rows!:any
    private list:any= this.rows[0].ecs_list
    private selected:any=[];
    private checked:Boolean=false;
    private isIndeterminate:Boolean=false
    private physical:Array<string>=[]
    private physical_list:any=[]
    private recommend=[];
    private useable_list:any=[]
    created() {
        this.get_recommended_host()
        if(this.rows[0].host_purpose==='GPU'){
            this.useable_list=this.rows[0].ecs_list.filter(item=>(item.is_gpu && item.status==="已关机") || !item.is_gpu).map(inn=>inn.ecs_id)
        }else{
            this.useable_list=this.rows[0].ecs_list.map(item=>item.ecs_id)
        }//可以进行迁移的云主机
        this.list=this.rows[0].ecs_list;
    }
    //关闭面板时重新获取实例列表
    private change_physical(val){
        if(!val){
            this.get_recommended_host()
        }
    }
    @Watch("physical")
    private watch_physical(nv){
        this.judge()
    }
    private checkSelectable(row,index){
        if(this.useable_list.includes(row.ecs_id)){
            return true
        }else{
            return false
        }
    }
    private judge(){
        let cpu:any=this.physical_list.filter(item=>item.host_purpose==='CPU')
        let cpu_ids:any=cpu.map(item=>item.host_id)
        let len = [...new Set([...cpu_ids,...this.physical])].length
        if(this.selected.some(item=>item.is_gpu) && len<[...cpu_ids,...this.physical].length){//选中的云主机中存在gpu云主机，选中的目的主机中存在非gpu的物理机
            this.$message.warning('GPU云主机不能被迁移到非GPU物理机上')
            this.physical=[]
        }
    }
    private async get_recommended_host(val:string=""){
        this.$store.commit("SET_LOADING", false);
        let res:any=await Service.recommended_host({
            host_id:this.rows[0].host_id,
            host_name:val,
            ecs_ids:this.selected.map(item=>item.ecs_id),
            is_gpu:this.rows[0].host_purpose==='GPU' ? '1' : '0',
            gpu_card_name:this.rows[0].gpu_real_name,
        })
        if(res.code==="Success"){
            this.recommend = res.data.data;
        }
    }
    private handleCheckAllChange(val){
        const table = this.$refs.table as Table
        val ? table.toggleAllSelection() : table.clearSelection()
        this.isIndeterminate = false;
    }
    private handleSelectionChange(val){
        this.selected=val
        this.get_recommended_host()
        this.checked = val.length === this.list.length;
        this.isIndeterminate = val.length > 0 && val.length < this.list.length;
        this.judge()
    }
    private async confirm(){
        if(this.selected.length===0){
            return;
        }
        let res:any=await Service.migrate({
            ecs_ids:this.selected.map(item=>item.ecs_id),
            start_host_id:this.rows[0].host_id,
            end_host_ids:this.physical,
            is_gpu:this.rows[0].host_purpose==='GPU' ? '1' : '0',
        })
        if(res.code==="Success"){
            this.$message.success(`物理机迁移任务下发成功！`)
            this.back("1")
        }else{
            this.back("0")
        }
    }
    @Emit("close")
    private back(val){
        this.visible_sync=false
    }
  
}
</script>
<style lang="scss" scope>
.migrate{
    display: flex;
    .custom-label{
        display: none;
    }
    .left{
        flex: 1;
    }
    .center{
        width: 180px;
        margin-top: 58px;
        padding: 0 20px;
    }
    .right{
        min-width:400px;
        .flex-host{
            display:flex
        }
    }
    .flex-base{
        display: flex;
        align-items: baseline;
    }
    
    
}


</style>
<style lang="scss">
.migrate{
    li.el-select-dropdown__item.hover{
        display: flex !important;
    }
}
</style>