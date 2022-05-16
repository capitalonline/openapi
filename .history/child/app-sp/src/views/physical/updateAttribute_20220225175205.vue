<template>
    <el-dialog
        title="设置属性"
        :visible.sync="visible_sync"
        width="400"
        :destroy-on-close="true"
        :close-on-click-modal="false"
    >
        <div>
            <div class="m-bottom20">
                <span class="m-right10">主机类型</span>
                <el-select v-model="type" @change="changeType">
                    <el-option v-for="item in host_types" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </div>
            <div>
                <span class="m-right10">主机用途</span>
                <el-select v-model="use">
                    <el-option v-for="item in host_uses" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </div>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible_sync = false">取 消</el-button>
            <el-button type="primary" @click="visible_sync = false">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,PropSync} from 'vue-property-decorator'
@Component({})
export default class UpdateAttribute extends Vue{
    @PropSync('visible') visible_sync!:Boolean;
    private type:String="";
    private use:String = "";
    private host_types=[
        {
            value:'compute',
            label:'计算',
            children:[
                {value:'1',label:'计算-CPU'},
                {value:'2',label:'计算-GPU'}
            ]
        },
        {
            value:'save',
            label:'存储',
            children:[
                {value:'save1',label:'存储-CPU'},
                {value:'save2',label:'存储-GPU'}
            ]

        }
    ]
    private host_uses=[];
    created() {
        this.getHostTypes()
    }
    private async getHostTypes(){
        this.type = this.host_types[0].value
        this.host_uses = this.host_types[0].children;
        this.use = this.host_uses[0].value
    }
    private changeType(val){
        this.host_types.filter(item=>item.value===val)[0].children
    }
}
</script>