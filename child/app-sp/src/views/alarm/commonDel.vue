<template>
    <el-dialog
        :title="title"
        :visible.sync="del_visible"
        width="600px"
        custom-class="del"
        :destroy-on-close="true"
        @close="cancel"
    >
        <div class="box">
            <div class="confirm">
                确认删除&nbsp;<span v-for="(item,index) in rows" :key="item.id" class="num_message">{{item.name}}
                    <span v-if="index!==rows.length-1">,</span>
                </span>&nbsp;吗?
            </div>
            <div v-if="title==='删除策略'" class="prompt_message prompt">删除该策略后，应用的所有产品将无法继续使用该策略，且删除后不能恢复</div>
            <div v-else class="prompt">删除后不能恢复</div>
        </div>
        
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="cancel('0')">取消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,Emit, PropSync} from "vue-property-decorator";
import Service from '../../https/alarm/list'
@Component({})
export default class CommonDel extends Vue{
    @Prop(String) title!:string;
    @PropSync("visible") del_visible!:Boolean
    @Prop({default:()=>{}}) rows!:any;

    @Emit("close")
    private cancel(val){
        this.del_visible=false
    }
    private async confirm(){
        const ids =this.rows.map(item=>item.id)
        let res:any= await Service.delete_strategy({
            ids
        })
        if(res.code==='Success'){
            this.$message.success(`${this.title}任务下发成功！`);
            this.cancel('1')
        }
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