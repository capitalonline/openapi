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
      <span>
       {{node.label}}
        </span>
    </span>
  </el-tree>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from "vue-property-decorator";
@Component({})

export default class LeftTree extends Vue{
  @Prop({default:'1'})currentLivingId!:string
  @Prop({default:()=>[]})tree_data!:Array
  @Watch('$route')
  private FnWatchRouter(to, from) {
    this.active_name = to.name;
  }
  private active_name: string = ''
  created(){
    this.$nextTick(()=>{
      (this.$refs.tree as any).setCurrentKey(this.currentLivingId)
    })
    this.$router.push({name:'pod_list',params:{type:'overview'}})
  }
  private handleNodeClick(data) {
    if(data.type=== 'pod'  && !this.isCurrentRoute('pod_list', { type: 'overview' })){
      this.$router.push({name:'pod_list',params:{type:'overview'}})
    }
    if(data.type === 'cluster' && !this.isCurrentRoute('cluster_list', { type: 'overview', id: data.id })){
      this.$router.push({name:'cluster_list',params:{type:'overview',id:data.id}})
    }
    if(data.type === 'host' && !this.isCurrentRoute('repair_event_list', { id: data.id })){
      console.log(data.id)
      this.$router.push({name:'repair_event_list',params:{id:data.id}})
    }
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
