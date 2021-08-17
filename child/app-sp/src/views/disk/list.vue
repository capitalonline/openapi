<template>
  <div>
    <action-block :search_option="search" @fn-search="getDiskList">
      <template #default>
        <el-button type="primary" @click="create">创建云盘</el-button>
        <el-button type="primary" @click="operate('mount')">挂载</el-button>
        <el-button type="primary" @click="operate('unInstall')">卸载</el-button>
        <el-button type="primary" @click="operate('delete')">逻辑删除</el-button>
        <el-button type="primary" @click="operate('recover')">恢复</el-button>
        <el-button type="primary" @click="operate('destroy')">销毁</el-button>
      </template>
    </action-block>
    <el-table
      :data="disk_list"
      border
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="customer_id" label="客户ID"></el-table-column>
      <el-table-column prop="customer_name" label="客户名称"></el-table-column>
      <el-table-column prop="disk_id" label="云盘ID"></el-table-column>
      <el-table-column prop="disk_name" label="云盘名称"></el-table-column>
      <el-table-column prop="status" label="云盘状态"></el-table-column>
      <el-table-column prop="type" label="类型容量">
        <template slot-scope="scope">
          <span>{{scope.row.feature ? `${scope.row.feature}${scope.row.size}` : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="az_name" label="地域及可用区"></el-table-column>
      <el-table-column prop="disk_type" label="属性" :filters="diskAttribute" :filter-method="filterAttribute"></el-table-column>
      <el-table-column prop="ecs_id" label="实例名称/ID">
        <template slot-scope="scope">
          <span>{{scope.row.ecs_id ? `${scope.row.ecs_id} / ${scope.row.size}` : ''}}</span>
        </template>ecs_id
      </el-table-column>
      <el-table-column label="操作栏">
        <template slot-scope="scope">
          <el-button type="text" @click="operateRecord(scope.row.disk_id)">操作记录</el-button>
          <el-dropdown @command="handleOperate">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="mount">挂载</el-dropdown-item>
              <el-dropdown-item command="unInstall">卸载</el-dropdown-item>
              <el-dropdown-item command="delete">删除</el-dropdown-item>
              <el-dropdown-item command="destroy" disabled>销毁</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <template v-if="record_visible">
      <Record :visible="record_visible" :record_id="record_id" @close = 'closeRecord' />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/actionBlock.vue'
import Record from '../instance/record.vue'
@Component({
  components:{
    ActionBlock,
    Record
  }
})
export default class extends Vue {
  $message;
  $router;
  private state_list:any=[

  ]
  private disk_list:any=[{
    customer_id:'1',
    clientName:'1'
  }]
  private loading = false
  private search = {
    disk_id:{placeholder:'请输入云盘ID'},
    ecs_id:{placeholder:'请输入实例ID'},
    status:{list:this.state_list,placeholder:'请选择与云盘状态'},
    customer_id:{placeholder:'请输入客户ID'},
    customer_name: {placeholder:'请输入客户名称'},
  }
  private record_id:string=""
  private record_visible = false
  private diskAttribute=[
    {
      text:'数据盘',
      value:'data_disk'
    },
    {
      text:'系统盘',
      value:'system_disk'
    },
  ]
  private async getDiskList(){
    let res:any=await({

    })
  }
  private operate(value:string){
    console.log("value",value)
  }
  private handleOperate(value){
    this.operate(value)
  }
  private create(){
    this.$router.push('/disk/create')
  }
  private operateRecord(id:string){
    this.record_id=id
    this.record_visible=true
  }
  private closeRecord(){
    this.record_visible = false
  }
  private handleSelectionChange(){

  }
  private filterAttribute(value:String){

  }
  created() {
    
  }
}
</script>
<style lang="scss" scoped>
.el-dropdown {
    font-size: 12px !important;
    margin-left: 10px !important;
    color: #455cc6 !important;
}
</style>