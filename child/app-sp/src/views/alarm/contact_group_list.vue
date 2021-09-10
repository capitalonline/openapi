<template>
  <div class="contact-group">
    <action-block :search_option="search" @fn-search="fn_search">
        <template #default>
            <el-button type="primary" @click="add">新建联系人组</el-button>
            <el-button type="primary" @click="del">删除联系人组</el-button>
        </template>
    </action-block>
    <el-collapse accordion>
        <el-collapse-item v-for="item in group_arr" :key="item.id">
            <template slot="title">
                <el-checkbox v-model="item.check" @change="sel_users(item.id,$event)">{{item.name}}</el-checkbox>
                <el-button type="text" @click.stop="edit(item.id)" class="edit">编辑</el-button>
            </template>
            <div class="table-box">
                <el-table :data="list" border class="event-table">
                    <el-table-column prop="event_id" label="事件ID">
                        <template slot-scope="scope">
                        <span class="event-id">{{scope.row.event_id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="customer_id" label="客户ID"></el-table-column>
                    <el-table-column prop="customer" label="客户名称"></el-table-column>
                    <el-table-column prop="event_name" label="事件名称"></el-table-column>
                    <el-table-column prop="event_state_name" label="事件状态">
                        <template slot-scope="scope">
                        <span :class="[scope.row.status === 'fail'|| scope.row.status === 'portion_fail' ? 'err' : '']">{{scope.row.event_state_name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="implementation_name" label="任务执行情况"></el-table-column>
                    <el-table-column prop="op_user" label="操作用户"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间">
                        <template slot-scope="scope">
                        <span>{{scope.row.create_time ? moment(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss") : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="update_time" label="完成时间">
                        <template slot-scope="scope">
                        <span>{{scope.row.update_time ? moment(scope.row.update_time).format("YYYY-MM-DD HH:mm:ss") : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="任务">
                        <template slot-scope="scope">
                        <el-button type="text" @click="view(scope.row.event_id,scope.row.event_name)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-collapse-item>
    </el-collapse>
    <template v-if="group_title">
        <AddGroup :title="group_title" :id="group_id" :visible="group_visible" @close = "close_group" />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue'
import AddGroup from './add_group.vue'
@Component({
    components:{
        ActionBlock,
        AddGroup
    }
})
export default class ContactList extends Vue{
    private search={
        content:{placeholder:'请输入组名后查询'}
    }
    private list = [{name:1}]
    private current:number=1
    private size:number=3
    private total:number=0
    private group_arr=[{id:'group1',name:'group1',check:false},{id:'group2',name:'group2',check:false},{id:'group3',name:'group3',check:false}]
    private group_title:String = "新建联系人组"
    private group_visible:Boolean=false
    private group_id:String=""

    created() {
        this.fn_search()
    }
    private fn_search(data:any={}){

    }
    private close_group(){
        this.group_visible=false
        this.group_id=""
    }
    private add(){
        this.group_title="新建联系人组"
        this.group_visible=true
    }
    private edit(id:string){
        this.group_id=id
        this.group_title="编辑联系人组"
        this.group_visible=true
    }
    private del(id:string = ''){
        
    }
    private addToWarnGroup(){
        
    }
    private handleSizeChange(size){
        this.size=size
    }
    private handleCurrentChange(cur){
        this.current = cur
    }
    private sel_users(id,e){
        console.log("####",id,e)
    }
}
</script>
<style lang="scss" scoped>

label.el-checkbox{
    margin-left: 30px;
}
.edit{
    position: absolute;
    right: 30px;
}
</style>
<style lang="scss">
.contact-group{
    i.el-collapse-item__arrow.el-icon-arrow-right {
        position: absolute !important;
        left: 10px !important;
    }
    .el-collapse-item__content {
        background: #f5f6fa !important;
        padding: 20px !important;
    }
}

</style>