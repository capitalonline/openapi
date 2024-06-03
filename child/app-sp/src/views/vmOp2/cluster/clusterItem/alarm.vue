<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="报警信息" name="1">
      <template v-if="activeName==='1'">
        <info></info>
      </template>
    </el-tab-pane>
    <el-tab-pane label="屏蔽管理" name="2" disabled>
      <template v-if="activeName==='2'">
        <shield></shield>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import Info from './alarm_info.vue';
import Shield from './alarm_shield.vue';
@Component({
  components:{
    Info,
    Shield
  }
})
export default class AlarmInfo extends Vue{
  private activeName:String='1'
}
</script>
