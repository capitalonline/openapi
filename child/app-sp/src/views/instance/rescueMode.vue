<template>
  <div>
    <el-dialog
      title="进入救援模式"
      :visible.sync="visibleSync"
      width="500px"
      :destroy-on-close="true">
    </el-dialog>
  </div>

</template>

<script>
export default {
name: "rescueMode"
}
</script>

<style scoped>

</style>
