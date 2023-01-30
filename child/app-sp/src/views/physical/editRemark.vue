<template>
    <el-dialog
      :title="`编辑备注-${rows.host_name}`"
      :visible.sync="visible_sync"
      width="400px"
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
        <el-input type="textarea" v-model="value" maxlength="512"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="visible_sync=false">取消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, PropSync} from 'vue-property-decorator';
@Component({})
export default class Remark extends Vue{
    @PropSync('visible') visible_sync!:Boolean;
    @Prop({default:()=>({host_name:''})})rows!:any
    private value:string='';
    created() {
        
    }
    private async confirm(){
        
    }
}
</script>
<style lang="scss" scoped>
    .total{
        height: 32px;
        width:18px;
        background: rgb(241,241,241);
        position: relative;
        display: inline-block;
        margin:0 10px;
        margin-bottom: 5px;
        .used{
            width: 100%;
            position: absolute;
            z-index: 999;
            bottom: 0;
        }
    }
</style>