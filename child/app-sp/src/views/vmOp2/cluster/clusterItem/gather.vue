<template>
  <div class="tabBox">
    <div class="currentInfo">
      POD219 (SUQIAN-B)
    </div>
    <el-tabs v-model="active_tab" @tab-click="handleClick">
      <el-tab-pane v-for="(value,key) in tab_list" :key="key" :label="value" :name="key"></el-tab-pane>
    </el-tabs>
    <template v-if="active_tab === 'info'">
      <info :cluster_id="cluster_id"></info>
    </template>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Info from "@/views/vmOp2/cluster/clusterItem/info.vue";
@Component({
  components:{
    Info
  }
})
export default class Pod extends Vue{
  private active_tab=this.$route.params.type || 'info'
  private cluster_id = this.$route.params.id
  private tab_list = {
    info: '概要',
    // host: '主机',
    // virtual_machine: '虚拟机',
    // gpu:'GPU'
  }
  private handleClick(tab, event) {
    this.$router.push({
      name:'cluster_list',
      params:{type:tab.name},
    })
  }
  created(){
    this.active_tab = this.$route.params.type
  }
}
</script>

<style>


</style>
