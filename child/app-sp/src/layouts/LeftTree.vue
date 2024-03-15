<template>
  <el-tree
    :data="tree_data"
    @node-click="handleNodeClick"
    @node-contextmenu="handleRight"
    node-key="id"
    ref="tree"
    :current-node-key="currentLivingId"
    :expand-on-click-node="false"
    :default-expanded-keys="[currentLivingId]"
    highlight-current
  >
    <span slot-scope="{node,data}">
      <i :class="iconClasses[node.level]"></i>
      {{ node.label }}
    </span>
  </el-tree>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from "vue-property-decorator";
@Component({})

export default class LeftTree extends Vue{
  @Prop({default:''})currentLivingId!:string
  @Prop({default:()=>[]})tree_data!:Array<object>
  private iconClasses= {
    1: 'iconfont icon-tree',
    2: 'iconfont icon-machine',
    3: 'iconfont icon-serve',
  }
  private active_name: string = ''
  @Watch('$route')
  private FnWatchRouter(to, from) {
    this.active_name = to.name;
  }
  @Watch('tree_data',{ immediate: true, deep: true })
  private watch_tree_data(n){
    if(n.length>0){
      this.tree_data = n
      this.$router.push({name:'pod_info',params:{id:this.tree_data[0]['id']}})
      this.$store.commit('SET_DISPLAY_NAME',this.tree_data[0]['label']);
    }
  }
  @Watch('currentLivingId')
  private watch_current(n){
    if(n){
      this.$nextTick(()=>{
        (this.$refs.tree as any).setCurrentKey(this.currentLivingId)
      })
    }
  }
  created(){
    this.$nextTick(()=>{
      (this.$refs.tree as any).setCurrentKey(this.currentLivingId)
    })
  }
  private handleNodeClick(data) {
    if(data.type=== 'pod'  && !this.isCurrentRoute('pod_info', { id:data.id})){
      this.$router.push({name:'pod_info',params:{id:data.id}})
    }
    if(data.type === 'cluster' && !this.isCurrentRoute('cluster_info', { id: data.id })){
      this.$router.push({name:'cluster_info',params:{id:data.id}})
    }
    if(data.type === 'host' && !this.isCurrentRoute('host_list', { id: data.id })){
      this.$router.push({name:'host_list',params:{id:data.id}})
    }
    this.$store.commit('SET_DISPLAY_NAME',data.label);
  }
  private isCurrentRoute(name, params) {
    const currentRoute = this.$route;
    const targetRoute = { name, params };

    return (
      currentRoute.name === targetRoute.name &&
      JSON.stringify(currentRoute.params) === JSON.stringify(targetRoute.params)
    );
  }
  private handleRight(event,data,node,com){
    console.log(event,data,node,com)
  }
}
</script>

<style scoped>

</style>
