<template>
  <div>
    <div class="icon m-bottom10">
      <el-tooltip content="自定义列表项" placement="bottom" effect="light">
        <el-button type="text" ><i class="el-icon-s-tools" ></i></el-button>
      </el-tooltip>
      <el-tooltip content="刷新" placement="bottom" effect="light">
        <el-button type="text" ><svg-icon icon="refresh" class="refresh"></svg-icon></el-button>
      </el-tooltip>
      <el-tooltip content="导出" placement="bottom" effect="light">
        <el-button type="text" ><svg-icon icon="export" class="export"></svg-icon></el-button>
      </el-tooltip>
    </div>

  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
@Component({
  components:{

  }
})

export default class SearchFrom extends Vue{
name: "searchFrom"
}
</script>

<style scoped lang="scss">
.icon{
  width:100%;
  text-align: right;
}
</style>
