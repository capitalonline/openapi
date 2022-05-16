<template>
    <el-dialog
        title="自定义列表项"
        :visible.sync="visibleSync"
        width="30%"
        :destroy-on-close="true"
        :show-close="false"
        :close-on-click-modal="false"
    >
        <div>清除缓存或者更换浏览器，自定义列表失效</div>
        <div>
            <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="item in items" :key="item.prop" :label="item.prop">{{item.label}}</el-checkbox>
            </el-checkbox-group>
        </div>
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
    private checkList:any=[];
    private items = this.$store.state.custom_host
}
</script>