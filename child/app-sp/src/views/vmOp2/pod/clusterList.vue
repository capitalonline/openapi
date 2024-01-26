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
    <el-table border :data="list">
      <el-table-column prop="customer_id" label="名称"></el-table-column>
      <el-table-column prop="customer_id" label="物理机"></el-table-column>
      <el-table-column prop="customer_id" label="云主机"></el-table-column>
      <el-table-column prop="customer_id" label="CPU型号"></el-table-column>
      <el-table-column prop="customer_id" label="GPU型号"></el-table-column>
      <el-table-column prop="customer_id" label="GPU数量"></el-table-column>
      <el-table-column prop="customer_id" label="存储容量"></el-table-column>
      <el-table-column prop="customer_id" label="CPU消耗量"></el-table-column>
      <el-table-column prop="customer_id" label="内存使用量"></el-table-column>
      <el-table-column prop="customer_id" label="GPU使用量"></el-table-column>
      <el-table-column prop="customer_id" label="存储使用量"></el-table-column>
    </el-table>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SvgIcon from '../../../components/svgIcon/index';
@Component({
  components: {
    SvgIcon
  }
})

export default class List extends Vue{
  private list=[{customer_id:'1111' }]
}
</script>

<style scoped lang="scss">
.icon{
  width:100%;
  text-align: right;
}
i.el-icon-s-tools{
  font-size: 18px;
  vertical-align: middle;
}

</style>
