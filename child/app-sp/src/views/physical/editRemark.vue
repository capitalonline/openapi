<template>
    <el-dialog
      :title="`编辑备注-${rows.host_name}`"
      :visible.sync="visible_sync"
      width="400px"
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
        <el-input type="textarea" v-model="value" maxlength="128" show-word-limit rows="5"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="visible_sync=false">取消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, PropSync,Emit} from 'vue-property-decorator';
import Service from '../../https/physical/list'
@Component({})
export default class Remark extends Vue{
    @PropSync('visible') visible_sync!:Boolean;
    @Prop({default:()=>({host_name:'',remark:''})})rows!:any
    private value:string=this.rows.remark;
    created() {

    }
    private async confirm(){
        let res:any = await Service.set_remark({
            host_ids:[this.rows.host_id],
            remark:this.value
        })
        if(res.code==='Success'){
            this.$message.success(res.message);
            // this.visible_sync=false;
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
