<template>
    <el-dialog
        title="设置属性"
        :visible.sync="visible_sync"
        width="760"
        :destroy-on-close="true"
        :close-on-click-modal="false"
    >
        <div>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,PropSync} from 'vue-property-decorator'
@Component({})
export default class UpdateAttribute extends Vue{
    @PropSync('visible') visible_sync!:Boolean;
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
}
</script>