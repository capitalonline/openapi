<template>
    <el-dialog
        title="业务测试"
        :visible.sync="visible_sync"
        width="1000px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        @close="cancel"
    >
        <div class="m-left10">
            <el-button type="primary" @click="add" class="m-bottom10">新增测试任务</el-button>
            <div class="m-bottom20">将对<span class="m-left10">{{'az'}}</span><span class="num_message m-left10">{{'num'}}</span>台物理机  进行业务测试，请确保选中的物理机无客户业务进行。</div>
            <div class="m-bottom10"><circle-icon :num="1"></circle-icon>云主机创建（在选中的每台物理机上创建1个1核1G的云主机，GPU物理机需创建1个CPU云主机和1个GPU云主机。若创建成功且正常运行，则该项任务测试通过）</div>
            <div v-for="(item,index) in selectedTasks" :key="index" class="m-bottom10">
                <circle-icon :num="index+2"></circle-icon>
                <el-select v-model="item.task_id" placeholder="请选择测试任务列表" @change="changeTask($event,index)">
                    <el-option v-for="inn in taskList" :key="inn.maintask_name" :value="inn.maintask_name" :label="inn.display_name" :disabled="item.disList.includes(inn.maintask_name)"></el-option>
                </el-select>
                <span class="m-left10" v-if="item.task_id">该任务需设置参数，请点击<el-button type="text" @click="setParams">设置参数</el-button></span>
                <el-button class="m-left10" type="text" @click="del(index)">删除</el-button>
            </div>
            <div><circle-icon :num="selectedTasks.length+2"></circle-icon>云主机回收（测试完成，云主机进行销毁）</div>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync,Watch} from 'vue-property-decorator';
import SvgIcon from '../../components/svgIcon/index.vue';
import CircleIcon from './indexIcon.vue';
import Service from '../../https/physical/list'
@Component({
    components:{
        SvgIcon,
        CircleIcon
    }
})
export default class BusinessTest extends Vue{
    @PropSync('visible')visible_sync!:boolean;
    private taskList:Array<any>= [];
    private selectedTasks:Array<any> = [];
    private num:number=1;
    private task:string='';
    created(){
        this.get_task_list()
    }
    private async get_task_list(){
        let res:any=await Service.get_task_list({})
        if(res.code==='Success'){
            this.taskList = res.data.task_list
        }
    }
    private set_disList(){
        let ids = this.selectedTasks.map(task=>task.task_id)//已经选中的任务id
        this.selectedTasks.map(item=>{
            item.disList = ids.filter(inn=>inn!==item.maintask_name)
            return item;
        })
        console.log("this.selectedTasks",this.selectedTasks)
    }
    private add(){
        if(this.selectedTasks.length===this.taskList.length){
            return;
        }
        this.selectedTasks.push({task_id:'',params:{},disList:[]}) 
        this.set_disList()
    }
    private changeTask(val,key){
        this.set_disList()
        // console.log("changeTask",val)
        
        // console.log("this.selectedTasks",this.selectedTasks)
    }
    private del(ind){
        console.log("del",ind)
        let list:any=[]
        this.selectedTasks.map((item,index)=>{
            if(index!==ind){
                list.push(item)
            }
            return item;
        })
        this.selectedTasks = list
        this.set_disList()
    }
    private setParams(){
        
    }
    private confirm(){
        
        this.visible_sync=false
    }
    private cancel(){
        this.visible_sync=false
    }
}
</script>
<style lang="scss" scoped>
.email{
    display: inline-block;
    width: 420px;
    margin-left: 10px;
    margin-top: 20px;
}
</style>