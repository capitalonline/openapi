<template>
  <div>
  <el-menu :default-active="active_menu">
    <template v-for="item in menu_list">
      <el-menu-item
        @click="urlChange(item.name)"
        :index="item.name"
        :key="item.name"
      >
        <template #title>
          {{ item.label }}
        </template>
      </el-menu-item>
    </template>
  </el-menu>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
@Component({

})
export default class Menu extends Vue{
  @Prop({default:()=>[]})menu_list!:Array<string>
  @Prop({default:''})active_menu!:string
  created(){

  }
  private urlChange(name){
    if (this.$route.name !== name) {
      this.$router.push({ name: name });
    }
  }

}
</script>

<style scoped>

</style>
