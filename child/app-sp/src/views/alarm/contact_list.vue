<template>
  <div>
    <action-block :search_option="search" @fn-search="fn_search">
        <template #default>
            <el-button type="primary" @click="add">新建联系人</el-button>
            <el-button type="primary" @click="del">删除联系人</el-button>
            <el-button type="primary" @click="addToWarnGroup">添加至报警联系组</el-button>
        </template>
    </action-block>
    <el-table :data="list" border class="event-table">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="task_id" label="姓名"></el-table-column>
        <el-table-column prop="event" label="邮箱"></el-table-column>
        <el-table-column prop="cloud_id" label="电话号码"></el-table-column>
        <el-table-column prop="task_name" label="微信号"></el-table-column>
        <el-table-column prop="task_state" label="所属报警组"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row.task_id)">编辑</el-button>
            <el-button type="text" @click="del(scope.row.task_id)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[3,5,10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <template v-if="user_visible">
        <AddContact :title="user_title" :id="user_id" :visible="user_visible" @close = "close_user" />
    </template>
    <template v-if="group_visible">
        <AddToGroup :visible="group_visible" @close = "close_group" />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/actionBlock.vue'
import AddContact from './add_contact.vue'
import AddToGroup from './add_to_group.vue'
@Component({
    components:{
        ActionBlock,
        AddContact,
        AddToGroup
    }
})
export default class ContactList extends Vue{
    private type_list=[
        {
            type:'name',
            label:'姓名'
        },
        {
            type:'email',
            label:'邮箱'
        },
        {
            type:'tell',
            label:'电话号码'
        },
        {
            type:'weChat',
            label:'微信'
        },
    ]
    private search={
        type:{placeholder:'请选择属性',list:this.type_list},
        content:{placeholder:'请输入后查询'}
    }
    private list = [{name:1}]
    private current:number=1
    private size:number=3
    private total:number=0
    private user_visible:Boolean=false
    private user_id:String=""
    private user_title:String="新建联系人"
    private group_visible:Boolean=false

    created() {
        this.fn_search()
    }
    private fn_search(data:any={}){

    }
    private add(){
        this.user_title="新建联系人"
        this.user_visible=true
    }
    private edit(id:string){
        this.user_id=id
        this.user_title="编辑联系人"
        this.user_visible=true
    }
    private del(id:string = ''){
        
    }
    private close_user(){
        this.user_visible=false
        this.user_id=""
    }
    private close_group(){
        this.group_visible=false
    }
    private addToWarnGroup(){
        this.group_visible=true
    }
    private handleSizeChange(size){
        this.size=size
    }
    private handleCurrentChange(cur){
        this.current = cur
    }
}
</script>