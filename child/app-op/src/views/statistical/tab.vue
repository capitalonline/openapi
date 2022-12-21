<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="NAS存储" name="first">
            <template v-if="activeName==='first'">
                <nas />
            </template>
        </el-tab-pane>
        <el-tab-pane label="云盘" name="second"> 
            <template v-if="activeName==='second'">
                <disk />
            </template></el-tab-pane>
    </el-tabs>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Nas from './resource.vue';
import Disk from './disk.vue'
@Component({
    components:{
        Nas,
        Disk,
    }
})
export default class TabList extends Vue {
    private activeName:string='first';
    created() {
        
    }
    private handleClick(){

    }
}
</script>