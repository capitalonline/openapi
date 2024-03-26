<template>
  <div id="menu" class="menuDiv">
    <ul class="menuUl">
      <li
        v-for="(item, index) in menus"
        :key="index"
        @click.stop="infoClick(index)"
      >
        <i :class="item.icon"></i> {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
@Component({

})

export default class RightClick extends Vue{
  @Prop({default:()=>[]}) multi_rows!:any
  private menus= [
    { name: "菜单一", operType: 1, icon: "el-icon-upload2" },
    { name: "菜单二", operType: 2, icon: "el-icon-folder-add" },
    { name: "菜单三", operType: 3, icon: "el-icon-edit-outline" },
    { name: "菜单四", operType: 4, icon: "el-icon-folder-remove" },
    { name: "菜单五", operType: 5, icon: "el-icon-download" },
  ]
  private infoClick(index) {
    if (index === 0) {
      // 要做的事情
      console.log(']]]]]',this.multi_rows)
    }
    let menu = document.querySelector("#menu") as HTMLElement;
    menu.style.display = "none";
  }

}
</script>

<style scoped lang="scss">
.menuDiv {
  display: none;
  position: absolute;

  .menuUl {
    height: auto;
    width: auto;
    font-size: 14px;
    text-align: left;
    border-radius: 4px;
    border: none;
    background-color: #ffffff;
    color: #606266;
    list-style: none;
    border: 1px solid #ebeef5;

    li {
      width: 140px;
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
      cursor: pointer;
      border-bottom: 1px solid rgba(255, 255, 255, 0.47);

      &:hover {
        display: block;
        background-color: #ecf5ff;
        color: #7abbff;
      }
    }
  }
}

</style>
