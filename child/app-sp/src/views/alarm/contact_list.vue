<template>
  <div>
    <action-block :search_option="search" @fn-search="fn_search">
        <template #default>
            <el-button type="primary" @click="add">新建联系人</el-button>
            <el-button type="primary" @click="del({})">删除联系人</el-button>
            <el-button type="primary" @click="addToWarnGroup">添加至报警联系组</el-button>
        </template>
    </action-block>
    <el-table 
        :data="list" 
        border 
        class="event-table"
        ref="contact_list"
        @selection-change="handleSelectionChange"
    >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="电话号码"></el-table-column>
        <el-table-column prop="groupName" label="所属报警组"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <template v-if="user_visible">
        <AddContact :title="user_title" :id="user_id" :visible="user_visible" @close = "close" />
    </template>
    <template v-if="group_visible">
        <AddToGroup :visible="group_visible" @close = "close" :contact_rows="contact_rows" />
    </template>
    <template v-if="del_visible">
        <common-dialog :visible.sync="del_visible" :title="'删除联系人'" :contact_rows="contact_rows" @close = "close" />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue'
import AddContact from './add_contact.vue'
import AddToGroup from './add_to_group.vue'
import Service from '../../https/alarm/list'
import CommonDialog from './commonDialog.vue'
import {Table} from'element-ui'
@Component({
    components:{
        ActionBlock,
        AddContact,
        AddToGroup,
        CommonDialog
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
            type:'phone',
            label:'电话号码'
        },
    ]
    private search={
        type:{placeholder:'请输入后查询',list:this.type_list,type:'composite',width:340},
    }
    private list = []
    private current:number=1
    private size:number=20
    private total:number=0
    private user_visible:Boolean=false
    private user_id:String=""
    private user_title:String="新建联系人"
    private group_visible:Boolean=false;
    private del_visible:Boolean=false
    private contact_rows:any=[]
    private search_data:any={}
    
    created() {
        this.fn_search()
    }
    private fn_search(data:any={}){
        this.current = 1
        this.search_data = data
        this.getContactList()
    }
    private async getContactList(){
        let res:any = await Service.get_contact_list({
            page:this.current,
            pageSize:this.size,
            [this.search_data.typesub ? this.search_data.typesub : 'name']:this.search_data.type
        })
        if(res.code===0){
            this.list = res.data.datas || []
            this.total = res.data.total || 0
        }
    }
    private handleSizeChange(size){
        this.size=size
        this.getContactList()
    }
    private handleCurrentChange(cur){
        this.current = cur
        this.getContactList()
    }
    private handleSelectionChange(val){
        this.contact_rows = val

    }
    private add(){
        this.user_title="新建联系人"
        this.user_visible=true
    }
    private async edit(id:string){
        this.user_id=id
        this.user_title="编辑联系人"
        this.user_visible=true
        // let res:any = await Service.get_contact_detail({
        //     id,
        // })
        // if(res.code===0){
        //     console.log("aqaa");
        //     this.user_visible=true
        // }else{
            
        // }
    }
    private del(id){
        console.log("id",id,this.contact_rows)
        if(Object.keys(id).length>0){
            this.contact_rows=[id]
        }
        console.log("this.contact_rows",this.contact_rows)
        this.del_visible = true

    }
    private close(val){
        this.user_visible=false
        this.group_visible=false
        this.del_visible=false
        this.contact_rows=[]
        this.user_id=""
        val==='1'&& this.getContactList()
        const table = this.$refs.contact_list as Table
        table.clearSelection()

    }
    private addToWarnGroup(){
        if(this.contact_rows.length===0){
            this.$message.warning("请先勾选联系人！");
            return;
        }
        this.group_visible=true
    }
    
}
</script>