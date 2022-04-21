<template>
  <div class="header">
    <div class="left-content">
      <el-select v-model="default_pod">
        <el-option
          v-for="item in pod_list"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></el-option>
      </el-select>
    </div>
    <div class="right-content">
      <el-button type="text" @click="FnToWiki('public')">公网设置问题排查sop</el-button>
      <el-button type="text" @click="FnToWiki('')" class="m-right10">运维OP使用手册V1.0</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { logout } from '../https/public';

@Component
export default class Header extends Vue {
  private default_pod = 'ddd'
  private pod_list = [{
    id: 'ddd',
    name: 'pod12'
  }]
  private FnToWiki(type) {
    if (type === 'public') {
      window.open('http://wiki-private.capitalonline.net:8090/pages/viewpage.action?pageId=310018114')
    } else {
      window.open('http://wiki-private.capitalonline.net:8090/pages/viewpage.action?pageId=310018098')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #e7e7e7;
  .left-content {
    display: flex;
    align-items: center;
  }
  svg {
    width: 60px;
  }
  .right-content {
    display: flex;
    align-items: center;
  }
}
</style>
