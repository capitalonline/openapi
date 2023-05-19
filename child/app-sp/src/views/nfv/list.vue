<template>
    <div class="instance-list">
        <!-- 头部查询 -->
    <action-block  :type="true"></action-block>
    </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync} from 'vue-property-decorator';
import actionBlock from "../../components/search/actionBlock.vue";
@Component({
    components:{
        actionBlock,
    }
})
export default class App extends Vue{
    private search_con = {
        ecs_id: { placeholder: "请输入云服务器ID" },
        ecs_name: { placeholder: "请输入云服务器名称" },
        // status: { placeholder: "请选择云服务器状态", list: [], multiple: true, default_value: [] },
        customer_id: { placeholder: "请输入客户ID" },
        customer_name: { placeholder: "请输入客户名称" },
        os_info: { placeholder: "请输入操作系统ID/名称"},
        private_net: { placeholder: "请输入私网IP" },
        public_net: { placeholder: "请输入公网IP" },
        host_id: { placeholder: "请输入物理机ID"},
        host_name: { placeholder: "请输入物理机名称", },
        host_ip: { placeholder: "请输入物理机管理IP"},
        out_band_address: { placeholder: "请输入物理机带外IP"},
        create_time: {
        placeholder: ["开始时间", "结束时间"],
        type: "daterange",
        width: "360",
        clearable: true,
        dis_day: 1,
        defaultTime: []
        },
  };
  private search_reqData = {};
  private search_billing_method = "all";
  private search_op_source = "";
  private search_ecs_goods_name = [];
  private search_status=[]

}
</script>
<style lang="scss" scoped>

</style>
