<template>
  <div>
    <action-block :search_option="search_option" @fn-search="search"></action-block>
    <el-table
      :data="list"
      border
      class="event-table"
    >
      <el-table-column prop="os_id" label="操作类型"></el-table-column>
      <el-table-column prop="os_id" label="操作对象类型"></el-table-column>
      <el-table-column prop="os_id" label="操作对象列表/内容">
        <template #default="scope">
        <el-popover
          placement="bottom"
          width="400"
          trigger="click">
          <el-table :data="clickData">
            <el-table-column width="150" property="date" label="对象名称"></el-table-column>
            <el-table-column width="150" property="name" label="对象ID"></el-table-column>
            <el-table-column width="100" property="address" label="操作内容"></el-table-column>
          </el-table>
          <el-button slot="reference" type="text">{{'共'+ scope.row.num + '条'}}</el-button>
        </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="os_id" label="操作时间"></el-table-column>
      <el-table-column prop="os_id" label="操作人"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import ActionBlock from "../../components/search/actionBlock.vue";

@Component({
  components: {
    ActionBlock,
  }
})
export default class LogList extends Vue{
  private search_option:Object={
    operate_type: {placeholder: "请选择操作类型", list: []},
    operate_object: {placeholder: "请选择操作对象", list: []},
    operator_id:{placeholder:'请输入操作对象ID'},
    operator:{placeholder:'请输入操作人'},
    time:{
      placeholder:['开始时间','结束时间'],
      type:'daterange',
      width:'360',
      clearable:true,
      dis_day:1,
      defaultTime:[]
    }
  }
  private list:Array<any>=[{os_id:'1111'}]
  private clickData:Array<any>=[]
  private search_data:any={};
  private current:number = 1

  private search(data:any={}){
    this.current = 1;
    this.search_data.push(data)
    this.getLogList()
  }
  private async getLogList(){

  }
}
</script>

<style scoped>

</style>
