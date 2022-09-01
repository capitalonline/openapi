<template>
    <el-dialog
        title="扩容"
        :visible.sync="visibleSync"
        width="700px"
        :close-on-click-modal="false">
        <div v-for="(item,i) in configInfo" :key="i" class="m-bottom10">
            <span class="label">{{item.label}}</span>
            <span class="label">{{item.value}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="visibleSync = false">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync,Emit} from 'vue-property-decorator';
import Service from '../../https/snapshot/list';
import moment from 'moment';

@Component({
    components:{}
})
export default class RollBack extends Vue{
    @PropSync('visible')visibleSync!:Boolean;
    @Prop({default:()=>{}})info!:any;
    private configInfo:any={
        customer_id:{label:'客户ID:',value:''},
        customer_name:{label:'客户名称:',value:''},
        nas_id:{label:'文件系统ID:',value:''},
        nas_name:{label:'文件系统名称:',value:''},
        total:{label:'当前容量:',value:''},
        used:{label:'当前使用量:',value:''},
    }
    private async confirm(){
        let res:any = await Service.rollback({
            snapshot_id:this.info.snapshot_id,
            disk_id:this.info.disk_id,
            after_ecs_start:this.check
        })
        if(res.code==='Success'){
            this.$message.success(res.message)
            this.visibleSync=false;
        }
    }
    @Emit('fn-create')
    private create(){
        
    }
}
</script>
<style lang="scss" scoped>
.weight{
    font-weight: bold;
    font-size: 14px;
    margin: 0 5px;
}
</style>