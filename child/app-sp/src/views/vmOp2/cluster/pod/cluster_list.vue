<template>
  <div>
    <div class="search-box" >
      <el-input prefix-icon="el-icon-search"></el-input>
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
    <el-table border :data="list">
      <el-table-column prop="customer_id" label="名称"></el-table-column>
      <el-table-column prop="customer_id" label="物理机"></el-table-column>
      <el-table-column prop="customer_id" label="云主机"></el-table-column>
      <el-table-column prop="customer_id" label="CPU型号"></el-table-column>
      <el-table-column prop="customer_id" label="GPU型号"></el-table-column>
      <el-table-column prop="customer_id" label="GPU数量"></el-table-column>
      <el-table-column prop="customer_id" label="存储容量"></el-table-column>
      <el-table-column prop="cpu" label="CPU消耗量">
        <template slot-scope="scope">
          <span>
            <el-progress :stroke-width="14" color="#455cc6" :percentage="scope.row.cpu"></el-progress>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="customer_id" label="内存使用量">
        <template slot-scope="scope">
          <span>
            <el-progress :stroke-width="14" color="#455cc6" :percentage="scope.row.cpu"></el-progress>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="customer_id" label="GPU使用量">
        <template slot-scope="scope">
          <span>
            <el-progress :stroke-width="14" style="font-size: 14px" color="#455cc6" :percentage="scope.row.cpu"></el-progress>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="customer_id" label="存储使用量">
        <template slot-scope="scope">
          <span>
            <el-progress :stroke-width="14" color="#455cc6" :percentage="scope.row.cpu"></el-progress>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SvgIcon from '@/components/svgIcon/index';
import SearchFrom from "@/components/search/searchFrom.vue";
@Component({
  components: {
    SearchFrom,
    SvgIcon
  }
})

export default class List extends Vue{
  private list=[{customer_id:'1111',cpu:'25' }]
}
</script>

<style scoped lang="scss">
.search-box{
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  ::v-deep .el-input{
    width: 260px;
  }
  ::v-deep .el-input__inner{
    width: 260px;
    border-radius: 20px;
  }
}
i.el-icon-s-tools{
  font-size: 18px;
  vertical-align: middle;
}
::v-deep .el-progress-bar__outer {
  border-radius: 0;
}
::v-deep .el-progress-bar__inner {
  border-radius: 0;
}
::v-deep .el-progress__text{
  font-size: 14px!important;
}

</style>
