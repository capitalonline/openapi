<template>
  <div class="instance-list">
    <!-- 头部查询 -->
    <action-block :search_option="search_con" @fn-search="FnSearch" :type="false"></action-block>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
@Component({})
export default class list extends Vue {
  private search_con = {
    nfv_id: { placeholder: "请输入宿主机ID" },
    nat_gateway_id: { placeholder: "请输入云服务器ID"},
    nat_gateway_id: { placeholder: "请输入显卡类型"},
    nat_gateway_id: { placeholder: "请输入显卡名称"},
    nat_gateway_id: { placeholder: "请选择显卡状态"},
    customer_id: { placeholder: "请输入sn号" },
    create_time: {
      placeholder: ["开始时间", "结束时间"],
      type: "daterange",
      width: "360",
      clearable: true,
      dis_day: 1,
      defaultTime: []
    },
  };

}
</script>

<style scoped>

</style>
