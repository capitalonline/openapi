<template>
    <el-dialog
        title="设置属性"
        :visible.sync="visible_sync"
        width="760"
        :destroy-on-close="true"
        :close-on-click-modal="false">
        <span>这是一段信息</span>
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
}
</script>