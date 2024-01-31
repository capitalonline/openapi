<template>
  <div class="tabBox">
    <div class="currentInfo">
      POD219 (SUQIAN-B)
    </div>
    <el-tabs v-model="active_tab" @tab-click="handleClick">
      <el-tab-pane v-for="(value,key) in tab_list" :key="key" :label="value" :name="key"></el-tab-pane>
    </el-tabs>
    <cluster-list v-if="active_tab === 'cluster'"></cluster-list>
    <info v-if="active_tab === 'info'"></info>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import ClusterList from '@/views/vmOp2/cluster/pod/cluster_list'
import Info from "@/views/vmOp2/cluster/pod/info.vue";
@Component({
  components:{
    ClusterList,
    Info
  }
})
export default class Pod extends Vue{
  private active_tab=this.$route.params.type || 'info'
  private tab_list = {
    info: '概要',
    cluster: '集群',
    host: '主机',
    virtual_machine: '虚拟机',
    gpu:'GPU'
  }
  // private tab_list ={}
  private handleClick(tab, event) {
    this.$router.push({
      name:'pod_list',
      params:{type:tab.name},
    })
  }
  created(){
    // Object.keys(this.tab_all).forEach(item=>{
    //   console.log('000',item)
    //   if (this.$store.state.auth_info[item]) {
    //     console.log('****',this.$store.state.auth_info[item])
    //     Object.keys(this.tab_list).push({
    //       item
    //     })
    //   }
    // })
    // console.log('---',this.tab_list)
    this.active_tab = this.$route.params.type
  }
}
</script>

<style lang="scss">


</style>
