<template>
  <div>
    <el-tree
      :data="tree_data"
      @node-click="handleNodeClick"
      @node-contextmenu="handleRight"
      node-key="id"
      ref="treeControl"
      :current-node-key="currentLivingIdLocal"
      :expand-on-click-node="false"
      :default-expanded-keys="[currentLivingIdLocal]"
      highlight-current
      @click.stop
    >
      <span slot-scope="{node,data}" class="treeLabel" @dblclick="handleNodeDblClick(node)">
        <svg-icon-font :iconName="getIconName(node)"></svg-icon-font>
        <span class="m-left5" :title="node.label">{{ node.label }}</span>
      </span>
    </el-tree>
    <div v-if="showContextMenu">
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
    <add-host :visible.sync="add_host_visible" @close="close" :cluster_id="select_tree_data.id" :info="cluster_info"></add-host>
    <create-cluster :visible.sync="edit_cluster_visible" :isCreate="false" :oper_info="[cluster_info]"></create-cluster>

  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from "vue-property-decorator";
import RightClick from "@/views/vmOp2/component/right-click.vue";
import Operate from "@/views/vmOp2/cluster/host/operate.vue";
import {getHostStatus} from "@/utils/getStatusInfo";
import {hideMenu} from "@/utils/vmOp2/hideMenu";
import Service from "@/https/alarm/list";
import bus from "@/utils/vmOp2/eventBus"
import AddHost from "@/views/vmOp2/cluster/clusterItem/addHost.vue";
import CreateCluster from "@/views/vmOp2/cluster/pod/createCluster.vue";
import ClusterServe from "@/https/vmOp2/cluster/pod";
import { findPodIdByClusterId } from "@/utils/vmOp2/findPodId"
@Component({
  components: {CreateCluster, AddHost, Operate, RightClick}
})
export default class LeftTree extends Vue{
  @Prop({default:true})refresh!:boolean
  @Prop({default:()=>[]})tree_data!:Array<object>
  private iconClasses= {
    1: 'icon-tree',
    2: 'icon-machine',
    3: 'icon-serve',
  }
  private showContextMenu:boolean = false
  private contextMenu = { x: 0, y: 0 }
  private optionData = []
  private active_name: string = ''
  private oper_type:string="";
  private oper_label:string="";
  private visible:Boolean=false;
  private list:any=[]
  private currentLivingIdLocal = ''
  private type = ''
  private add_host_visible:boolean = false
  private edit_cluster_visible:boolean = false
  private select_tree_data:any ={}
  private buttons:any =[] // 按钮的文本内容
  private cluster_info = {}
  @Watch('$route')
  private onRouteChange(to, from) {
    this.active_name = to.name;
    this.updateCurrentNodeFromRoute();
  }

  @Watch('tree_data', { immediate: true, deep: true })
  private watch_tree_data(newTreeData) {
    if (newTreeData.length > 0) {
      this.tree_data = newTreeData;
      if(this.refresh || !this.$route.params.id) {
        this.$router.push({name: 'pod_info', params: {id: this.tree_data[0]['id']}})
        this.$store.commit('SET_DISPLAY_NAME', this.tree_data[0]['label']);
      }
      this.updateCurrentNodeFromRoute();
    }
  }
  private updateCurrentNodeFromRoute() {
    const routeId = this.$route?.params?.id;
    if (routeId) {
      this.currentLivingIdLocal = routeId;
      this.$nextTick(() => {
        (this.$refs.treeControl as any).setCurrentKey(this.currentLivingIdLocal);
      });
    }
  }
  private handleNodeDblClick(node) {
    if (node.expanded) {
      node.expanded = false;
    } else {
      node.expanded = true;
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
  private async getAlarmList(){
    let res:any=await Service.get_alarm_list({})
    if(res.code==='Success'){
      this.list = res.data.datas || []
    }
  }
  private getIconName(node) {
    const instance = this.list.find(item => item.instanceID === node.label);
    if (instance && instance.dealStatus === 0) {
      return "icon-menjin-zhujibaojing";
    }
    return this.iconClasses[node.level];
  }
  private tooltip(item){
    if(this.type === 'host' ){
      const obj = getHostStatus(item)
      if(obj.msg) {
        return obj.msg
      } else {
        return '无操作权限'
      }
    }else {
      return '仅支持无物理机的cluster进行删除'
    }
  }
  created(){
    this.getAlarmList()
  }
  mounted() {
    bus.$on('filterTextChanged', (filterText) => {
      this.handleNodeClick(filterText)
    });
  }
  private infoClick(item) {
    console.log(item,this.type)
    if(this.type === 'host'){
      const {label, key}=item
      this.oper_type = key;
      this.oper_label = label
      this.visible = true;
    }else if(this.type === 'cluster') {
      let pod = findPodIdByClusterId(this.select_tree_data.id)
      this.cluster_info = {
        cluster_id:this.select_tree_data.id,
        cluster_name:this.select_tree_data.label,
        pod_id:pod,
        cpu_brand:this.select_tree_data.cpu_brand,
        cpu_type_id:this.select_tree_data.cpu_type_id,
        gpu_type_id:this.select_tree_data.gpu_type_id,
        backend_type:this.select_tree_data.backend_type,
        max_host_count:this.select_tree_data.max_host_count,
        storage_cluster_id:this.select_tree_data.storage_cluster_id,
        storage_cluster_name:this.select_tree_data.storage_cluster_name
      }
      console.log('this.cluster_info',this.cluster_info)
      if (item.key === 'add_host') {
        this.add_host_visible = true
      } else if (item.key === 'edit_cluster') {
        this.edit_cluster_visible = true
      } else if (item.key === 'delete_cluster') {
        this.$confirm(`是否确认删除集群：${this.select_tree_data['label']}?`, '删除集群', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let res:any = await ClusterServe.delete_cluster({
            cluster_id:[this.select_tree_data['id']]
          })
          if(res.code === 'Success'){
            this.$message.success(res.message)
            bus.$emit('getTreeData',true)
          }
        }).catch(() => {

        })

      }
    }
    this.OptionCardClose

  }
  private close(val){
  }
  //全局搜索选中的是虚机时，通过此方法从树数据获取host_name,用来存储到storage中，以便展示以及监控数据的正确获取
  private findHostNameById(hostId) {
    for (const pod of this.$store.state.tree_list) {
      for (const cluster of pod.children) {
        for (const host of cluster.children) {
          if (host.host_id === hostId) {
            return host.host_name;
          }
        }
      }
    }
    return null;
  }
  private handleNodeClick(data) {
    if(this.$route?.params?.id){
      let routeId = this.$route?.params?.id
        if (data.id === routeId) {
          return;
      }
    }
    let vm_host_name = ''
    if(data.type=== 'pod'){
      this.$router.push({name:'pod_info',params:{id:data.id}})
    }
    if(data.type === 'cluster'){
      this.$router.push({name:'cluster_info',params:{id:data.id}})
    }
    if(data.type === 'host'){
      this.$router.push({name:'host_info',params:{id:data.id}})
      if(data.vm){
        vm_host_name = this.findHostNameById(data.id)
        this.$store.commit('SET_SEARCH_VM',data.name);
        this.$router.push({name:'host_vm',params:{id:data.id}})
      }
    }
    if(data.type === 'waiting_hosts'){
      console.log('data.id',data.id)
      this.$router.push(({name:'waiting_hosts',params:{id:data.id}}))
    }
    this.showContextMenu = false
    this.$store.commit('SET_DISPLAY_NAME',data.label? data.label : data.vm ? vm_host_name : data.name);
  }
  private handleRight(event,data,node){
     hideMenu()
    this.select_tree_data = data
    this.type = data.type
    if(this.type === 'cluster'){
      this.buttons =[
        {label:'添加计算节点',key:'add_host',disable:false},
        { label: "编辑集群", key: 'edit_cluster',disabled: false },
        { label: "删除集群", key: 'delete_cluster', disabled: false},
      ]

    }else if(this.type === 'host'){
      this.buttons =[
        {label:'开机',key:'start_up_host',disable:false},
        {label:'关机',key:'shutdown_host',disable:false},
        {label:'重启',key:'restart_host',disable:false},
      ]
    }
    if(this.type === 'host' || this.type === 'cluster'){
      event.preventDefault();
      this.handleNodeClick(data)
      this.showContextMenu = true;
      this.contextMenu.x = event.clientX;
      this.contextMenu.y = event.clientY;
      this.optionData = data
      this.handleMenus(data)
      document.addEventListener('click', this.OptionCardClose);
      document.addEventListener('contextmenu', this.OptionCardClose)
    }
  }
  private handleMenus(data) {
    // 处理菜单项
    for (const item of this.buttons) {
      if(this.type === 'host') {
        item.disable = !this.judge(data, item.key);
      }else {
        if(item.key === 'delete_cluster'){
          item.disable = data.host_count !== 0
        }
      }
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
      document.removeEventListener('click',this.OptionCardClose);
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
