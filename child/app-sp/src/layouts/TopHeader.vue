<template>
  <div class="top-header">
    <div class="left-content">
<!--      <el-button type="text">-->
<!--        <el-autocomplete prefix-icon="el-icon-search"-->
<!--          v-model="state"-->
<!--          @select="handleSelect"-->
<!--        ></el-autocomplete>-->
<!--      </el-button>-->
      <el-select
        style="width: 140px"
        v-model="default_az"
        filterable
        :filter-method="get_az_list"
        @visible-change="change_pod"
      >
        <el-option
          v-for="item in az_list"
          :key="item.az_id"
          :value="item.az_id"
          :label="item.az_name"
        ></el-option>
      </el-select>
    </div>
    <div class="center-content">
      <el-input
        prefix-icon="el-icon-search"
        v-model="filterText"
        @focus="showPlaceholder"
        @blur="hidePlaceholder"
        ref="input"
        @input="onFilterTextChange"
        >
      </el-input>
    </div>
    <div class="right-content">
      <el-tooltip class="item" effect="dark" content="消息通知" placement="bottom">
      <el-button type="text" @click="goToMessage">
        <i class="iconfont icon-message" style="font-size: 25px"></i>
      </el-button>
      </el-tooltip>
      <el-dropdown @command="FnToWiki">
        <el-button type="text"><svg-icon icon="more" class="more"></svg-icon></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="{type:'public'}">公网设置问题排查sop</el-dropdown-item>
          <el-dropdown-item :command="{type:''}">运维OP使用手册V1.0</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
<!--      <el-button type="text" @click="goToTask">底层任务配置</el-button>-->
      <el-button @click="changeLayout()" type="info" round><i class="el-icon-sort"></i>切换旧页面</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import Service from "@/https/vmOp2/cluster/tree";
import SvgIcon from '@/components/svgIcon/index.vue';
import bus from "@/utils/vmOp2/eventBus"

@Component({
  components: {
    SvgIcon
  }
})
export default class TopHeader extends Vue{
  private default_az = ''
  private az_name = ''
  private az_code = ''
  private az_list = []
  private filterText = ''
  created(){
    this.get_az_list();
  }
  //获取az列表
  private async get_az_list(){
    this.az_list=[]
    let res:any=await Service.open_region_az_info({})
    if(res.code==="Success"){
      res.data.forEach(item=>{
        item.region_list.forEach(inn=>{
          this.az_list=[...this.az_list,...inn.az_list]
        })
      })
      this.default_az = this.$store.state.az_id ? this.$store.state.az_id : this.az_list[0].az_id
      this.az_name = this.$store.state.az_name ? this.$store.state.az_name :this.az_list[0].az_name
      this.az_code = this.$store.state.az_code ? this.$store.state.az_code :this.az_list[0].az_code
    }
  }
  private change_pod(val){
    if(!val){
      this.get_az_list()
    }
  }
  private changeLayout(){
    this.$router.push({name:'overview'})
  }
  private goToMessage(){
    this.$router.push({name:'message'})
  }
  private goToTask(){
    this.$router.push({name:'config_task'})
  }
  private FnToWiki(type) {
    if (type === 'public') {
      window.open('http://wiki-private.capitalonline.net:8090/pages/viewpage.action?pageId=310018114')
    } else {
      window.open('http://wiki-private.capitalonline.net:8090/pages/viewpage.action?pageId=310018098')
    }
  }
  private onFilterTextChange() {
    bus.$emit('filterTextChanged', this.filterText);
  }
  private showPlaceholder() {
    (this.$refs.input as any).$refs.input.setAttribute('placeholder', '输入关键字进行过滤');
  }
  hidePlaceholder() {
    (this.$refs.input as any).$refs.input.setAttribute('placeholder', '');
  }
  @Watch('default_az')
  private watch_pod(){
    this.$store.commit('SET_AZ',this.default_az);
    this.$store.commit('SET_AZ_NAME',this.az_name);
    this.$store.commit('SET_AZ_CODE',this.az_code);
  }
}
</script>

<style lang="scss">
.top-header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #e7e7e7;
  .left-content {
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    .el-input--suffix .el-input__inner {
      background: #F2F2F2;
    }

    i.el-icon-search {
      font-size: 22px;
      vertical-align: middle;
      margin-left: 10px;
    }
  }
  svg {
    width: 30px;
    margin:10px
  }
  .center-content{
    align-items: center;
    display: flex;
    flex: 1;
    .el-input__inner {
      border: none; /* 默认不显示边框 */
      box-shadow: none; /* 去掉默认的阴影 */
    }
    .el-input__inner:focus {
      border: 1px solid #455cc6; /* 焦点时显示边框 */
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 可选：增加阴影效果 */
    }
    .el-input-number, .el-input__icon{
      font-size: 23px;
    }
  }
  .right-content {
    display: flex;
    align-items: center;
  }
}

</style>
