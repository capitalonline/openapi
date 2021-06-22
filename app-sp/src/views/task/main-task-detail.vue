<template>
  <div>
    <div>{{ maintask_name }}</div>
    <div class="flow-box">
      <div v-for="flow in subtask_list" :key="flow" class="flow">
        <div v-for="item in flow" :key="item" class="item">
          {{ item.subtask_name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Service from '../../https/task/main-task'

@Component({
  
})
export default class extends Vue {
  $route;
  private maintask_name = '';
  private subtask_list = [];
  private async FnGetDetail() {
    let resData :any = await Service.get_maintask_detail({id: this.$route.params.id})
    if(resData.code == 200) {
      this.maintask_name = resData.data.maintask_name;
      this.subtask_list = JSON.parse(resData.data.subtask_flow_detail);
      console.log("subtask_list", this.subtask_list)
    }
  };

  created() {
    this.FnGetDetail()
  }
}
</script>

<style lang="scss" scoped>
.flow-box {
  display: flex;
  justify-content: space-around;
  .flow {
    width: 500px;
    padding: 20px;
    .item {
      padding: 20px;
    }
  }
}
</style>