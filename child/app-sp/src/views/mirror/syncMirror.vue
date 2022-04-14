<template>
    <el-dialog
        title="同步镜像"
        :visible.sync="visible_sync"
        width="600px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        @close="cancel"
    >
        <div>
            <div>镜像信息</div>
            <el-row :gutter="24">
                <el-col :span="12" v-for="item in info" :key="item.id">
                    <span class="label">{{item.label}}:</span>
                    <span class="value">{{item.value}}</span>
                </el-col>
            </el-row>
        </div>
        <div>
            <div>镜像同步位置</div>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync} from 'vue-property-decorator';
@Component({
    components:{
    }
})
export default class SyncMirror extends Vue{
    @PropSync('visible')visible_sync!:boolean;
    private info={
        name:{label:'镜像名称',value:'1'},
        id:{label:'镜像ID',value:'2'},
        system:{label:'操作系统',value:'3'},
        size:{label:'容量',value:'4'},
        type:{label:'类型',value:'5'},
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
.label{
    width:120px;
}
</style>
