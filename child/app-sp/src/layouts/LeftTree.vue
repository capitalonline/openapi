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
    <span slot-scope="{node,data}" class="treeLabel">
      <i :class="iconClasses[node.level]"></i>
      <span class="m-left5" :title="node.label">{{  node.label }}</span>
    </span>
  </el-tree>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from "vue-property-decorator";
@Component({})

export default class LeftTree extends Vue{
  @Prop({default:''})currentLivingId!:string
  @Prop({default:true})refresh!:boolean
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
      if(this.$route?.params?.id){
        let routeId = this.$route?.params?.id
        if(this.tree_data[0]['id'] === routeId){
          return;
        }
      }
      if(this.refresh) {
        console.log('####')
        this.$router.push({name: 'pod_info', params: {id: this.tree_data[0]['id']}})
        this.$store.commit('SET_DISPLAY_NAME', this.tree_data[0]['label']);
      }
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
    if(this.$route?.params?.id){
      let routeId = this.$route?.params?.id
      if(data.id === routeId){
        return;
      }
    }
    if(data.type=== 'pod'){
      this.$router.push({name:'pod_info',params:{id:data.id}})
    }
    if(data.type === 'cluster'){
      this.$router.push({name:'cluster_info',params:{id:data.id}})
    }
    if(data.type === 'host'){
      this.$router.push({name:'host_list',params:{id:data.id}})
    }
    if(data.type === 'waiting_hosts'){
      console.log('data.id',data.id)
      this.$router.push(({name:'waiting_hosts',params:{id:data.id}}))
    }
    this.$store.commit('SET_DISPLAY_NAME',data.label);
  }
  private handleRight(event,data,node,com){
    console.log(event,data,node,com)
  }
}
</script>

<style scoped>
.treeLabel {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
