<template>
    <el-dialog
        title="设置属性"
        :visible.sync="visible_sync"
        width="600px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
    >
        <div class="main">
            <div class="m-bottom20 m-right10">
                <span class="m-right10">主机类型</span>
                <el-select v-model="type" @change="changeType">
                    <el-option v-for="item in host_types" :key="item.type" :value="item.type" :label="item.type_name"></el-option>
                </el-select>
            </div>
            <div>
                <span class="m-right10">主机用途</span>
                <el-select v-model="use">
                    <el-option v-for="item in host_uses" :key="item.use_type" :value="item.use_type" :label="item.use_name"></el-option>
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
import {Vue,Component,PropSync} from 'vue-property-decorator';
import Service from '../../https/physical/list'
@Component({})
export default class UpdateAttribute extends Vue{
    @PropSync('visible') visible_sync!:Boolean;
    private type:String="";
    private use:String = "";
    private host_types=[]
    private host_uses=[];
    created() {
        this.getHostTypes()
    }
    private async getHostTypes(){
        let res:any = Service.get_host_type({})
        if(res.code==='Success'){
            this.host_types = res.data;
            this.type = this.host_types[0].value
            this.host_uses = this.host_types[0].list;
            this.use = this.host_uses[0].value
        }
        
    }
    private changeType(val){
        this.host_types.filter(item=>item.value===val)[0].list
    }
}
</script>
<style lang="scss" scoped>
.main{
    display: flex;
}
</style>