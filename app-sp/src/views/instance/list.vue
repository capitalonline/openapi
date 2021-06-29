<template>
  <div>
    <action-block :search_option="search_con">
      <template #default>
        <el-button type="primary" @click="FnToCreate">创建实例</el-button>
      </template>
    </action-block>

    <el-table :data="instance_list" border>
      <el-table-column prop="customer_id" label="客户ID"></el-table-column>
      <el-table-column prop="customer_name" label="客户名称"></el-table-column>
      <el-table-column prop="id" label="云服务器ID"></el-table-column>
      <el-table-column prop="name" label="云服务器名称"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column label="配置详情"></el-table-column>
      <el-table-column prop="private_ip" label="私网IP"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LabelBlock from '../../components/labelBlock.vue';
import actionBlock from '../../components/actionBlock.vue';

@Component({
  components: {
    LabelBlock,
    actionBlock
  },
})

export default class App extends Vue {
  $router;
  private search_con = {
    id: { placeholder: '请输入云服务器ID' },
    name: { placeholder: '请输入云服务器名称' },
    status: { placeholder: '请选择云服务器状态', list: [] },
    create_name: { placeholder: '请输入云服务器创建时间' },
    customer_id: { placeholder: '请输入客户ID' },
    customer_name: { placeholder: '请输入客户名称' },
    system: { placeholder: '请选择操作系统', list: [] },
    private_ip: { placeholder: '请输入私网IP' }
  };
  private instance_list = [
    {
      customer_id: '123456',
      customer_name: '客户名称',
      id: 'ins-abcr50fvgj45fgqw',
      name: 'test1.计算-6',
      status: 'ok',
      private_ip: '192.168.1.4',
      create_time: '2021-06-23 12:06:02'
    }
  ];
  private FnToCreate() {
    this.$router.push('/instance/create')
  };
  
  created() {
    this.search_con.status.list = [{
      label: "正常",
      type: "ok"
    }];
    this.search_con.system.list = [{
      label: "centos",
      type: "centos"
    }];
  }
}
</script>
