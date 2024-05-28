<template>
  <div>
  <el-tree
    :data="tree_data"
    @node-click="handleNodeClick"
    @node-contextmenu="handleRight"
    node-key="id"
    ref="treeControl"
    :expand-on-click-node="false"
    :default-expanded-keys="[currentLivingId]"
    highlight-current
  >
    <span slot-scope="{node,data}" class="treeLabel">
      <i :class="iconClasses[node.level]"></i>
      <span class="m-left5" :title="node.label">{{ node.label }}</span>
    </span>
  </el-tree>
<!--    右键菜单-->
    <div v-show="showContextMenu">
      <el-menu
        :style="contextMenuStyle"
        id="menu"
        text-color="#000"
      >
        <div class="tip" :title="optionData.label">操作-{{ optionData.label }}</div>
        <el-menu-item style="height: 30px;line-height: 30px"
                      v-for="button in buttons"
                      :key="button.key"
                      :index="button.key"
                      :disabled="button.disable"
                      @click="infoClick(button)"
        >
          <span slot="title" style="height: 30px" v-if="!button.disable">
            {{ button.label }}
          </span>
          <el-tooltip v-else  effect="light" :content="tooltip(button.key)" placement="right">
            <el-button type="text" style="height: 30px" >{{ button.label }}</el-button>
          </el-tooltip>
        </el-menu-item>
      </el-menu>
    </div>
    <operate :rows="[optionData]" :title="oper_label" :oper_type="oper_type" :visible.sync="visible" @close="close"></operate>

  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from "vue-property-decorator";
import RightClick from "@/views/vmOp2/component/right-click.vue";
import Operate from "@/views/vmOp2/cluster/host/operate.vue";
import {getHostStatus} from "@/utils/getStatusInfo";
@Component({
  components: {Operate, RightClick}
})

export default class LeftTree extends Vue{
  @Prop({default:''})currentLivingId!:string
  @Prop({default:()=>[]})tree_data!:Array<object>
  private iconClasses= {
    1: 'iconfont icon-tree',
    2: 'iconfont icon-machine',
    3: 'iconfont icon-serve',
  }
  private showContextMenu:boolean = false
  private contextMenu = { x: 0, y: 0 }
  private optionData = []
  private active_name: string = ''
  private oper_type:string="";
  private oper_label:string="";
  private visible:Boolean=false;
  private buttons:any =[
    {label:'开机',key:'start_up_host',disable:false},
    {label:'关机',key:'shutdown_host',disable:false},
    {label:'重启',key:'restart_host',disable:false},
    ] // 按钮的文本内容
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
      this.$router.push({name:'pod_info',params:{id:this.tree_data[0]['id']}})
      this.$store.commit('SET_DISPLAY_NAME',this.tree_data[0]['label']);
    }
  }
  @Watch('currentLivingId')
  private watch_current(n){
    if(n){
      this.$nextTick(()=>{
        (this.$refs.treeControl as any).setCurrentKey(this.currentLivingId)
      })
    }
  }
  get contextMenuStyle(){
    return {
      zIndex: 1000,
      position: 'fixed',
      left: `${this.contextMenu.x}px`,
      top: `${this.contextMenu.y}px`,
      width: '200px',
      background: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)'
    }
  }
  private tooltip(item){
    const obj = getHostStatus(item)
    if(obj.msg) {
      return obj.msg
    } else {
      return '无操作权限'
    }
  }
  created(){
    this.$nextTick(()=>{
      (this.$refs.treeControl as any).setCurrentKey(this.currentLivingId)
    })
  }
  mounted() {
    document.addEventListener('click', this.OptionCardClose);
    document.addEventListener('contextmenu', this.OptionCardClose);
  }
  private infoClick(item) {
    const {label, key}=item
    this.oper_type = key;
    this.oper_label = label
    this.visible = true;
    this.OptionCardClose

  }
  private close(val){
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
      this.$router.push({name:'host_info',params:{id:data.id}})
    }
    if(data.type === 'waiting_hosts'){
      console.log('data.id',data.id)
      this.$router.push(({name:'waiting_hosts',params:{id:data.id}}))
    }
    this.showContextMenu = false
    this.$store.commit('SET_DISPLAY_NAME',data.label);
    this.$store.commit('SET_NODE',data.type);
  }
  private handleRight(event,data,node){
    if(data.type === 'host') {
      event.preventDefault();
      (this.$refs.treeControl as any).setCurrentKey(data.id)
      this.handleNodeClick(data)
      this.showContextMenu = true;
      this.contextMenu.x = event.clientX;
      this.contextMenu.y = event.clientY;
      this.optionData = data
      this.handleMenus(data)
    }
  }
  private handleMenus(data) {
    // 处理菜单项
    for (const item of this.buttons) {
        item.disable = !this.judge(data,item.key);
    }
  }
  private judge(data,val):any{
    const obj = getHostStatus(val)
    let power_flag = obj.power.length === 0 ? true : obj.power.includes(data.power_status);
    let host_flag = obj.host.length === 0 ? true : obj.host.includes(data.machine_status);
    let vm_flag = obj.vm ? obj.vm === data.ecs_count + 1 : true;

    let flag_list = power_flag && host_flag && vm_flag;
    return flag_list
  }
  private OptionCardClose(event: MouseEvent) {
    const treeElement = (this.$refs.treeControl as Vue).$el;
    if (!treeElement.contains(event.target as Node)) {
      this.showContextMenu = false;
    }
  }
}
</script>

<style scoped>
.treeLabel {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tip {
  height: 30px;
  margin-bottom: 5px;
  background: #eceff2;
  font-size: 14px;
  padding-left: 17px;
  line-height: 30px;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 溢出部分隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
  max-width: 200px; /* 设置最大宽度，根据需要调整 */
}
.el-menu-item.is-active{
  color: #333333!important;
}
</style>
