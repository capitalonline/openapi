<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="主任务配置" name="first"></el-tab-pane>
      <el-tab-pane label="子任务配置" name="second"></el-tab-pane>
    </el-tabs>
    <div>
      <template v-if="activeName==='first'">
        <main-task-list />
      </template>
      <template v-else>
        <sub-task-list />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import MainTaskList from "@/views/vmOp2/task/main-task-list.vue";
import SubTaskList from "@/views/vmOp2/task/sub-task-list.vue";
@Component({
  components: {SubTaskList, MainTaskList}
})

export default class Task extends Vue{
  private activeName='first'

}
</script>

<style scoped>
.el-tabs {
  background: #fff;
}

</style>
