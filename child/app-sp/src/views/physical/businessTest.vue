<template>
    <el-dialog
        title="业务测试"
        :visible.sync="visible_sync"
        width="1000px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        @close="cancel"
    >
        <div>
            <el-button type="primary" @click="add" class="m-bottom10">新增测试任务</el-button>
            <div class="m-bottom20">将对<span class="m-left10">{{'az'}}</span><span class="num_message m-left10">{{'num'}}</span>台物理机  进行业务测试，请确保选中的物理机无客户业务进行。</div>
            <div class="m-bottom10">云主机创建（在选中的每台物理机上创建1个1核1G的云主机，GPU物理机需创建1个CPU云主机和1个GPU云主机。若创建成功且正常运行，则该项任务测试通过）</div>
            <div v-for="(obj,key) in selectedTasks" :key="key" class="m-bottom10">
                <el-select v-model="obj.task_id" placeholder="请选择测试任务列表" @change="changeTask(obj)">
                    <el-option v-for="item in taskList" :key="item.id" :value="item.id" :label="item.name" ></el-option>
                </el-select>
                <span class="m-left10" v-if="obj.task_id">该任务需设置参数，请点击<el-button type="text" @click="setParams">设置参数</el-button></span>
            </div>
            <div>云主机回收（测试完成，云主机进行销毁）</div>
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
@Component({
    components:{
        SvgIcon
    }
})
export default class BusinessTest extends Vue{
    @PropSync('visible')visible_sync!:boolean;
    private taskList = [
        {id:'1',name:'任务1'},
        {id:'2',name:'任务2'},
        {id:'3',name:'任务3'},
        {id:'4',name:'任务4'},
        {id:'5',name:'任务5'},
    ];
    private selectedTasks = {};
    private num:number=1;
    private task:string=''
    created(){
        console.log("created",this.visible_sync)
    }
    private add(){
        if(Object.keys(this.selectedTasks).length===this.taskList.length){
            return;
        }
        this.selectedTasks = {...this.selectedTasks,[Math.random()*1000]:{task_id:'',params:{}}}
        console.log("this.selectedTasks",this.selectedTasks)

    }
    private changeTask(){
        
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