<template>
    <el-dialog
        title="自定义列表项"
        :visible.sync="visibleSync"
        width="30%"
        :destroy-on-close="true"
        :show-close="false"
        :close-on-click-modal="false"
    >
        
        <span slot="footer" class="dialog-footer">
            <el-button @click="visibleSync = false">取 消</el-button>
            <el-button type="primary" @click="visibleSync = false">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,PropSync} from 'vue-property-decorator'
@Component
export default class CustomList extends Vue{
    @PropSync('visible') visibleSync!:boolean
    
}
</script>