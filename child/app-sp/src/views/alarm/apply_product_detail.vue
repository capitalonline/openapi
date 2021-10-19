<template>
    <el-dialog
        title="应用产品详情"
        :visible.sync="detail_visible"
        width="600px"
        custom-class="del"
        :destroy-on-close="true"
        @close="cancel"
    >
        <el-table
            :data="list"
            border
        >
            <el-table-column prop="name" label="应用产品"></el-table-column>
            <el-table-column prop="email" label="应用地域及可用区"></el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[20, 50, 100]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,Emit, PropSync} from "vue-property-decorator";
@Component({})
export default class ApplyDetail extends Vue{
    @PropSync("visible") detail_visible!:Boolean;
    private current:number = 1
    private size:number = 10
    private total:number = 0
    private list=[]
    private get_apply_list(){

    }
    private handleSizeChange(size){
        this.size = size
        this.get_apply_list()
    }
    private handleCurrentChange(cur){
        this.current = cur
        this.get_apply_list()
    }
    @Emit("close")
    private cancel(val){
        this.detail_visible=false
    }
}
</script>
<style lang="scss" scoped>
    .box{
        padding: 0 30px;
        .prompt{
            margin-top: 20px;
        }
        
    }
    
</style>
<style lang="scss">
.el-dialog.del{
    .el-dialog__body{
        border-top: 1px solid #DCDFE6;;
        border-bottom: 1px solid #DCDFE6;
    }
    .el-dialog__footer{
        text-align: right;
    }
}
</style>