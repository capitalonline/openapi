<template>
  <div class="top-header">
    <div class="left-content">
      <el-button type="text">
        <el-autocomplete prefix-icon="el-icon-search"
          v-model="state"
          @select="handleSelect"
        ></el-autocomplete>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component,Vue} from "vue-property-decorator";

@Component({})
export default class TopHeader extends Vue{
  private state=''
  private handleSelect(item) {
    console.log(item);
  }
}
</script>

<style lang="scss">
.top-header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #e7e7e7;
  .left-content {
    display: flex;
    align-items: center;
    i.el-icon-search{
      font-size: 22px;
      vertical-align: middle;
    }
    .el-input__inner {
      border: 0;
      height: 40px;
      min-width: 500px;
      max-width: none;
    }
    .el-input__inner:focus {
      border: 1px solid #455cc6;
      min-width: 500px;
      max-width: none;
    }
  }
  svg {
    width: 60px;
  }
  .right-content {
    display: flex;
    align-items: center;
  }
}

</style>
