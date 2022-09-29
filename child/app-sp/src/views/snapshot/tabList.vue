<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="云盘快照" name="first">
            <template v-if="activeName==='first'">
                <snapshot />
            </template>
        </el-tab-pane>
        <el-tab-pane label="快照链" name="second"> 
            <template v-if="activeName==='second'">
                <chains />
            </template></el-tab-pane>
        <el-tab-pane label="快照容量" name="third">
            <template v-if="activeName==='third'">
                <monitor />
            </template>
        </el-tab-pane>
    </el-tabs>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Service from '../../https/snapshot/list';
import snapshot from './list.vue';
import chains from './chains.vue';
import Monitor from './monitor.vue'
@Component({
    components:{
        snapshot,
        chains,
        Monitor
    }
})
export default class TabList extends Vue {
    private activeName:String=this.$route.params.active ? this.$route.params.active : 'first';
    created() {
        
    }
    private handleClick(){

    }
}
</script>
