<template>
  <div>
    <action-block :search_option="search" @fn-search="fn_search">
      <el-button type="primary" v-for="item in headerOperateBtns" :key="item.value" @click="handle(item)" :disabled="!authList.includes(item.value)">{{item.label}}</el-button>
    </action-block>
    <el-table
      :data="list"
      border
      ref="table"
      @selection-change="handleSelectionChange"
      @row-click="FnOperRow"
      @row-contextmenu="FnRightClick"
      :row-class-name="rowStyle">
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
          <span>{{moment(scope.row.updated_time).format('YYYY-MM-DD HH:mm:ss')}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column prop="operation" label="操作">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="text" v-for="(item,i) in operateBtns" :key="item" :disabled="!FnDisable(i,scope.row)" @click="handle(i,scope.row)">{{item}}</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
    <right-click
      :multi_rows="multipleSelection"
      :menus="menus"
      :name="multipleSelection.length>0 ? multipleSelection[0].shield_name: ''"
      @fn-click="handle">
    </right-click>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import ActionBlock from '@/components/search/actionBlock.vue';
import moment from 'moment';
import Service from '@/https/alarm/list';
import ShieldDetail from '@/views/alarm/shieldDetail.vue';
import {rightClick} from "@/utils/vmOp2/rightClick";
import RightClick from "@/views/vmOp2/component/right-click.vue";
import {hideMenu} from "@/utils/vmOp2/hideMenu";
@Component({
  components:{
    ActionBlock,
    ShieldDetail,
    RightClick
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
  private moment = moment;
  private visible:boolean=false;
  private authList:any=[]
  private headerOperateBtns=[
    {label: '创建屏蔽',value: 'alarm_create'},
  ]
  private menus= [
    {label: '详情',value: 'detail',single:true,disabled:false},
    {label: '修改',value: 'edit',single:true,disabled:false},
    {label: '应用',value: 'apply',disabled:false},
    {label: '停用',value: 'stop',disabled:false},
    {label: '删除',value: 'del',disabled:false},
  ]
  @Watch('multipleSelection',{immediate:true,deep:true})
  private watch_multi(){
    this.handleMenus()
  }
  private handleMenus() {
    // 处理菜单项
    if(this.multipleSelection.length>0) {
      for (const item of this.menus) {
        item.disabled = this.FnDisable(item.value, this.multipleSelection[0]);
      }
    }
  }
  //
  created() {
    this.getShieldList();
    this.authList = this.$store.state.auth_info['alarm_info']
  }
  //改变点击行得选中状态
  private FnOperRow(row){
    (this.$refs.table as any).toggleRowSelection(row)
  }
  //改变选中行的背景颜色
  rowStyle({row}) {
    const isSelected = this.multipleSelection.some(item => item.id === row.id);
    if (isSelected) {
      return 'rowStyle'
    }
  }
  //右键弹出操作
  FnRightClick(row,column,event){
    //判断当前行是否被选中，没选中时需选中并弹出菜单
    const isSelected = this.multipleSelection.some(item => item.id === row.id);
    if (!isSelected) {
      (this.$refs.table as any).toggleRowSelection(row)
    }
    rightClick(row,column,event)
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
    this.current = 1
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
  //
  private handle(item){
    const {label, value}=item
    this.operateType=value
    if(value==='alarm_create'){
      this.$router.push('/alarm_info/create')
    }else if(value==='edit'){
      this.$router.push({path:'/alarm_info/create',query:{
          id:this.multipleSelection[0].id
        }})
    }else if(value==='detail'){
      this.visible=true
    }else if(['apply','stop'].includes(value)){
      this.apply()
    }else if(value==='del'){
      this.del()
    }
    hideMenu()
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
    let flag:boolean=false
    if(list.length>0) {
      if (type === 'apply') {
        //flag为false时不能操作
        let applyFlag = list.some(item => item.enable === 1 || this.judgeDeadTime(item.shield_end_time))
        flag = applyFlag
      } else if (['stop'].includes(type)) {
        flag = list.some(item => item.enable === 0)
      } else if (['edit', 'del'].includes(type)) {
        flag = list.some(item => item.enable === 1)
      }
    }
    return flag
  }
  private FnDisable(label,row){
    return this.judge(label,[row])
  }
  private apply(){
    console.log(']]]]',this.judgeOperate())
    if(this.judgeOperate()){
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
    if(this.judgeOperate()){
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
