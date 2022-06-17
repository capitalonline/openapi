<template>
    <el-dialog
        title="资源调度策略管理"
        :visible.sync="visibleSync"
        width="1000px"
        :destroy-on-close="true"
    >
    <div class="resource">
        <p>CPU资源</p>
        <div class="m-bottom10 p-left10">GPU{{title}}： 
            <el-input-number v-model="gpuPoint" :min="1" :max="10"></el-input-number>{{tip}}
        </div>
        <div class="m-bottom10 p-left10">CPU{{title}}： 
            <el-input-number v-model="cpuPoint" :min="1" :max="10"></el-input-number>{{tip}}
        </div>
        <div class="m-bottom10 p-left10">CPU/GPU{{title}}
            <div class="m-bottom10 m-top10 p-left10">CPU云主机超分倍数：<el-input-number v-model="cpuEcs" :min="1" :max="10"></el-input-number>{{tip}}</div>
            <div class="m-bottom10 p-left10">GPU云主机超分倍数：<el-input-number v-model="gpuEcs" :min="1" :max="10"></el-input-number>{{tip}}</div>
        </div>
        <div class="prompt_message m-bottom10 p-left10">{{prompt}}</div>
        <p>内存资源</p>
        <div class="m-bottom10 p-left10">内存可分配率需要在物理机初始化配置，修改需要重启宿主机。若需修改，请联系CloudOS底层研发。</div>
        <p>热迁阈值管理</p>
        <div class="m-bottom10 p-left10">
            <span class="per">CPU使用率达到</span><el-input-number v-model="percent" :min="1" :max="100"></el-input-number> % 
            <span class="remark">触发CPU云盘云主机自动热迁至其他使用率低的物理机上，使CPU使用率降至</span> 
            <el-input-number v-model="lowPercent" :min="1" :max="percent"></el-input-number> %
        </div>
        <div class="m-bottom10 p-left10">
            <span class="per">CPU负载达到</span><el-input-number v-model="load" :min="1" :max="100"></el-input-number> % 
            <span class="remark">触发CPU云盘云主机自动热迁至其他使用率低的物理机上，使CPU负载降至</span>  
            <el-input-number v-model="lowLoad" :min="1" :max="load"></el-input-number> %
        </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
        <el-button @click="visibleSync = false">取 消</el-button>
    </span>
    </el-dialog>
</template>

<script lang="ts">
import {Vue,Component,PropSync,Prop} from 'vue-property-decorator'
@Component
export default class Resource extends Vue{
    @PropSync('visible')visibleSync!:boolean;
    @Prop({default:()=>{}})info!:any;
    private title:string='物理机超分倍数'
    private tip:string=' (请输入0~10之间的小数或整数)';
    private prompt:string='CPU/GPU混合调度时请分别设置各自的占比。例：宿主机总体CPU超分2倍，GPU云主机占用80%，CPU云主机占用20%，那CPU云主机超分倍数为2*20%=0.4；GPU云主机超分倍数为1.6';
    private gpuPoint:number=1.00;
    private cpuPoint:number=1.00;
    private cpuEcs:number=1.00;
    private gpuEcs:number=1.00;
    private percent:number=1.00;
    private load:number=1.00;
    private lowPercent:number=1.00;
    private lowLoad:number=1.00;
    private confirm(){
        if(this.lowPercent>=this.percent || this.lowLoad>=this.load){
            return;
        }
        this.visibleSync = false
    }
}
</script>

<style lang="scss" scoped>
.resource{
    color: #333;
    p{
        font-size: 16px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
        margin-top: 20px;
    }
    p:first-child{
        margin-top: 0;
    }
    .p-left10{
        padding-left:20px
    }
    .per{
        display: inline-block;
        width: 105px;
    }
    .remark{
        display: inline-block;
        width: 485px;
    }
    .prompt_message {
        font-size: 14px;
        color: #999;
    }
}

</style>