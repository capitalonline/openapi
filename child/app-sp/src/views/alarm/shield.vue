<template>
    <div>
        <action-block :search_option="search" @fn-search="fn_search">
            <el-button type="primary" v-for="(item,i) in headerOperateBtns" :key="i" @click="handle(i)" :disabled="!authList.includes(i)">{{item}}</el-button>
        </action-block>
        <el-table :data="list" border class="event-table" @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="shield_name" label="屏蔽名称"></el-table-column>
            <el-table-column prop="createTime" label="屏蔽状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.enable===1" class="running">屏蔽中</span>
                     <span v-else class="build_fail">已停用</span>
                </template>
            </el-table-column>
            <el-table-column prop="created_time" label="创建时间">
                <template slot-scope="scope">
                    <span>{{moment(scope.row.created_time).format('YYYY-MM-DD HH:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="updated_time" label="修改时间">
                <template slot-scope="scope">
                    <span>{{moment(scope.row.created_time).format('YYYY-MM-DD HH:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" v-for="(item,i) in operateBtns" :key="item" :disabled="!FnDisable(i,scope.row)" @click="handle(i,scope.row)">{{item}}</el-button>
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
        <template v-if="visible">
            <shield-detail :detaiId="multipleSelection[0].id" :visible.sync="visible"></shield-detail>
        </template>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import moment from 'moment';
import Service from '../../https/alarm/list';
import ShieldDetail from './shieldDetail.vue';
@Component({
    components:{
        ActionBlock,
        ShieldDetail
    }
})
export default class Shield extends Vue{
    private search:any = {
        name:{placeholder:'请输入屏蔽名称'},
        enable:{placeholder:'请选择屏蔽状态',list:[
            {type:'1',label:'屏蔽中'},
            {type:'2',label:'已停用'}
        ]},
    }
    private list=[{productType:'1'}]
    private current:number = 1
    private size:number = 20
    private total:number = 0
    private search_data:any = {};
    private multipleSelection:any=[];
    private operateType:string='';
    private moment = moment
    private headerOperateBtns={
        alarm_create:'创建屏蔽',
        del:'删除',
        apply:'应用',
        stop:'停用'
    }
    private operateBtns={
        detail:'详情',
        edit:'修改',
        apply:'应用',
        stop:'停用',
        del:'删除',
    }
    created() {
        this.getShieldList()
    }
    private async getShieldList(){
        let res:any = await Service.get_shield_list({
            page:this.current,
            pageSize:this.size,
            name:this.search_data.name,
            enable:this.search_data.enable ? Number(this.search_data.enable):undefined
        })
        if(res.code==='Success'){
            this.list = res.data.datas;
            this.total = res.data.total
        }
    }
    private fn_search(data:any={}){
        this.search_data = {...data}
        this.getShieldList()
    }
    private handleSizeChange(size){
        this.size = size;
         this.getShieldList()
    }
    private handleCurrentChange(cur){
        this.current = cur
         this.getShieldList()
    }
    private handleSelectionChange(val){
        this.multipleSelection = val;
    }
    private handle(val:string,row:any={}){
        console.log('row',row,this.$store.state.auth_info);
        if(Object.keys(row).length>0){
            this.multipleSelection=[row];
        }
        this.operateType=val
        if(val==='create'){
            this.$router.push('/alarmInfo/create')
        }else if(val==='edit'){
            this.$router.push({path:'/alarmInfo/create',query:{
                id:row.id
            }})
        }else if(val==='detail'){
            this.$router.push({
                path:'/alarmInfo/detail',
                query:{
                    id:row.id
                }
            })
        }else if(['apply','stop'].includes(val)){
            this.apply()
        }else if(val==='del'){
            this.del()
        }
    }
    private judgeDeadTime(time){
        if(!time){
            return false // true到期，false未到期
        }else{
            return moment(new Date()).diff( moment(time),'seconds')>0 // true到期，false未到期
        }
    }
    private judgeOperate(){//true表示能操作，false表示不能操作,0表示停用，1表示屏蔽中        
        return this.judge(this.operateType,this.multipleSelection)
    }
    private judge(type,list){
        let flag:boolean=true
        if(type==='apply'){
            //flag为true时不能操作
            let applyFlag = list.some(item=>item.enable===1 || this.judgeDeadTime(item.shield_end_time))
            flag = !applyFlag
        }else if(type==='stop'){
            flag = !list.some(item=>item.enable===0)
        }else if(type==='del'){
            flag = !list.some(item=>item.enable===1)
        }
        return flag
    }
    private FnDisable(label,row){
        return this.judge(label,[row])
    }
    private apply(){
        if(!this.judgeOperate()){
            if(this.operateType==='apply'){
                this.$message.warning('只能对已停用且静默时间未到期的策略进行应用');
            }else{
                this.$message.warning('只能对屏蔽中的策略进行停用');
            }
            return;
        }
        const h = this.$createElement;
        let title = this.operateType==='apply' ? '应用':'停用';
        let names = this.multipleSelection.map(item=>item.shield_name)
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, `确定${title} `),
            h('i', { style: 'color: #455cc6' },names.join(',')),
            h('span', null, ' 这些屏蔽策略吗? ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(async action => {
            let res:any = await Service.shield_apply({
                ids:this.multipleSelection.map(item=>item.id),
                enable:this.operateType==='apply' ? 1 : 0
            })
            if(res.code==='Success'){
                this.$message.success(res.message)
                this.getShieldList()
            }
        })
    }
    private del(){
        if(!this.judgeOperate()){
            this.$message.warning('只能对已停用的策略进行删除');
            return;
        }
        const h = this.$createElement;
        let names = this.multipleSelection.map(item=>item.shield_name)
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, `确定删除 `),
            h('i', { style: 'color: #455cc6' },`${names.join(',')} `),
            h('span', null, `吗？ `),
            h('div', null, ' 删除该屏蔽策略后，所有产品无法使用该屏蔽策略，且删除后无法恢复? ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(async action => {
            let res:any = await Service.shield_del({
                ids:this.multipleSelection.map(item=>item.id),
            })
            if(res.code==='Success'){
                this.$message.success(res.message)
                this.getShieldList()
            }
        })
    }
}
</script>
<style lang="scss" scoped>
.time_btns{
    margin-bottom: 20px;
    
}
.event-table{
    margin-top: 20px;
}
button.el-button.time_operate {
    border-radius: 0;
    border-right: none;
    width: 80px;
    text-align: center;
    height: 34px;
    // line-height: 34px;
    margin:0 !important
}
button.el-button.time_operate:last-child{
    border: 1px solid #DCDFE6;
}
i.el-icon-document{
    cursor: pointer;
    margin-left: 15px;
}
.el-icon-document:before {
    content: "\e785";
    color: #455cc6;
}
</style>