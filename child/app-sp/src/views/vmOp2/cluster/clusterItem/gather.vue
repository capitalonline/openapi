<template>
  <div class="tabBox">
    <div class="currentInfo">
      {{$store.state.display}}
    </div>
    <el-tabs v-model="active_tab" @tab-click="handleClick">
      <el-tab-pane v-for="(value,key) in tab_list" :key="key" :label="value" :name="key"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
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
  private active_tab='cluster_info'
  private cluster_id = this.$route.params.id
  private tab_list = {
    cluster_info: '概要',
    // host: '主机',
    // virtual_machine: '虚拟机',
    // gpu:'GPU'
  }
  private handleClick(tab, event) {
    if(this.$route.name!== tab.name){
      this.$router.push({
        name:tab.name,
        params:{id:this.cluster_id},
      })
    }
  }
  created() {
    this.active_tab = this.$route.name
  }
}
</script>

<style>
.currentInfo{
  font-weight: bold;

}


</style>
