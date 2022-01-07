<template>
    <div class="confirm-box">
        <el-dialog
            title="提示"
            :visible.sync="visible_sync"
            :show-close="false"
            width="400px"
            >
            <i class="el-icon-success"></i>
            <span class="m-left10">请确认订单并开始执行创建任务</span>
            <!-- <span class="m-left10">确定开启计费吗？开启后将不支持关闭计费</span> -->
            <div class="text-right m-top10">
                <el-button @click="visible_sync=false">取消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Component, PropSync, Emit, Vue } from 'vue-property-decorator';

@Component
export default class createBuy extends Vue {
    @PropSync('visible') visible_sync:Boolean;


    private confirm(){
        this.visible_sync=false;
        this.create()
    }
    @Emit('fn-create')
    private create(){

    }
}
</script>
<style lang="scss">
.confirm-box{
    .el-dialog__body,.el-dialog__header{
        padding: 10px 20px !important;
    }
    .el-icon-success:before{
        color: #67c23a;
    }
}
</style>
