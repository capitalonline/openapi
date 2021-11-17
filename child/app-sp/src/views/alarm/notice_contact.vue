<template>
    <el-dialog
        title="通知联系人详情"
        :visible.sync="contact_visible"
        width="800px"
        custom-class="del"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        @close="cancel"
    >
        <el-table
            :data="list"
            border
            max-height="500"
        >
            <el-table-column prop="contactName" label="名称"></el-table-column>
            <el-table-column prop="contactType" label="通知方式">
                <template slot-scope="scope">
                    <span>{{scope.row.contactType==="email" ? '邮箱' : '短信'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="contactMode" label="联系方式"></el-table-column>
            <el-table-column prop="sendStatus" label="发送状态">
                <template slot-scope="scope">
                    <span :class="scope.row.sendStatus ? 'running' : 'error'">{{scope.row.sendStatus ? '成功' : '失败'}}</span>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,PropSync,Prop} from "vue-property-decorator";
@Component({})
export default class ViewContact extends Vue{
    @PropSync("visible") contact_visible!:Boolean;
    @Prop({default:()=>[]}) list!:any
    private cancel(){
        this.contact_visible = false
    }
}
</script>