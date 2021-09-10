<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="报警联系人" name="0">
        <List />
    </el-tab-pane>
    <el-tab-pane label="报警联系组" name="1">
        <GroupList />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue'
import List from './contact_list.vue';
import GroupList from './contact_group_list.vue'
@Component({
    components:{
        ActionBlock,
        List,
        GroupList
    }
})
export default class Contact extends Vue{
    private activeName:string="0"
    private handleClick(){

    }
}
</script>
