<template>
  <div class="contact-group">
    <action-block :search_option="search" @fn-search="fn_search">
        <template #default>
            <el-button type="primary" @click="add" :disabled="!auth_list.includes('add_contact_group')">新建联系人组</el-button>
            <el-button type="primary" @click="del" :disabled="!auth_list.includes('delete_contact_group')">删除联系人组</el-button>
        </template>
    </action-block>
    <el-collapse accordion>
        <el-collapse-item v-for="item in group_list" :key="item.id">
            <template slot="title">
                <el-checkbox v-model="item.check" @change="sel_users(item.id,$event)">{{item.name}}</el-checkbox>
                <el-button type="text" @click.stop="edit(item.id)" class="edit" :disabled="!auth_list.includes('edit_contact_group')">编辑</el-button>
            </template>
            <div class="table-box">
                <el-table :data="item.members" border class="event-table" max-height="396">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="email" label="邮箱"></el-table-column>
                    <el-table-column prop="phone" label="电话号码"></el-table-column>
                    <el-table-column prop="groups" label="所属报警组">
                        <template slot-scope="scope">
                            <span v-for="(item,index) in scope.row.groups" :key="item.id">{{index===scope.row.groups.length-1 ? `${item.name}` : `${item.name},`}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="remove(scope.row.id,item.id,item.name)" :disabled="!auth_list.includes('remove_contact')">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-collapse-item>
    </el-collapse>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[2,20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <template v-if="group_visible">
        <AddGroup :title="group_title" :id="group_id" :visible.sync="group_visible" @close = "close_group" />
    </template>
     <!-- <template v-if="del_visible">
        <common-del :visible.sync="del_visible" :title="'删除联系人组'" :rows="group_rows" @close = "close_group" />
    </template> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue'
import AddGroup from './add_group.vue';
import Service from '../../https/alarm/list'
import CommonDel from './commonDel.vue'
@Component({
    components:{
        ActionBlock,
        AddGroup,
        CommonDel
    }
})
export default class ContactList extends Vue{
    $route;
    private search={
        name:{placeholder:'请输入组名后查询'}
    }
    private search_data:any={}
    private list = []
    private current:number=1
    private size:number=20
    private total:number=0
    private group_list=[]
    private group_title:String = "新建联系人组"
    private group_visible:Boolean=false
    private del_visible:Boolean=false
    private group_id:String=""
    private group_rows:any=[]
    private auth_list:any=[]
    created() {
        this.fn_search()
        this.auth_list=this.$store.state.auth_info[this.$route.name]
    }
    private fn_search(data:any={}){
        this.search_data = data
        this.current=1
        this.getContactGroupList()
    }
    private async getContactGroupList(){
        let res:any = await Service.get_contact_group_list({
            name:this.search_data.name,
            page:this.current,
            pageSize:this.size,
        })
        if(res.code==='Success'){
            this.group_list = res.data.datas.map(item=>{
                item = Object.assign({},item,{check:false})
                return item;
            })
            this.total = res.data.total || 0
        }
    }
    private handleSizeChange(size){
        this.size=size
        this.getContactGroupList()
    }
    private handleCurrentChange(cur){
        this.current = cur
        this.getContactGroupList()
    }
    private handleSelectionChange(val){
        this.group_rows = val
    }
    private async remove(memberId,groupId,groupName){
        const memberIds:any = this.group_list.filter(item=>item.id===groupId)[0].members
        this.$confirm(`确定将此用户从${groupName}中移去吗， 是否继续?`, '联系人移除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
            let res:any = await Service.update_contact_group({
                id:groupId,
                name:groupName,
                contactIDs:memberIds.map(item=>{
                    if(item.id!==memberId){
                        return item.id
                    }
                })
            })
            if(res.code==='Success'){
                this.$message.success("移除联系人任务下发成功！")
                this.getContactGroupList()
            }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消移除'
          });
        });


    }
    private close_group(val){
        this.group_visible=false
        this.del_visible=false
        this.group_rows=[]
        this.group_id=""
        val==='1' && this.getContactGroupList()
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
    private sel_users(){

    }
    private del(){
        this.group_rows = this.group_list.filter(item=>item.check)
        if(this.group_rows.length===0){
            this.$message.warning("请先勾选联系人组!");
            return;
        }
        const names = this.group_rows.map(item=>item.name)
        const ids = this.group_rows.map(item=>item.id)
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '确定删除 '),
            h('i', { style: 'color: #455cc6'}, `${names.join(',')}`),
            h('span', null, '  吗, 是否继续?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          iconClass: 'el-icon-warning',
          customClass:'message-box'
        }).then(async() => {
            let res:any = await Service.delete_contact_group({
                ids
            })
            if (res.code==='Success') {
                this.$message.success(`删除联系人组任务下发成功！`)
                this.getContactGroupList()
            }
        }).catch(()=>{
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
            this.getContactGroupList()
        })
    }
    private addToWarnGroup(){

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
.el-message-box.message-box{
    i{
        word-wrap:break-word
    }

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
