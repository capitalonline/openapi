<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import BackHeaderNew from "@/components/backHeader-new.vue";
import Service from "@/https/vmOp2/cluster/pod/instance"

@Component({
  components: {BackHeaderNew}
})
export default class securityGroup extends Vue {
  private activeName: string = 'enter';
  private security_list: any[] = []
  private enterList:any=[]
  private outList:any=[]
  private currentId =0
  private ruleInfo:any={
    strategyObj:{
      true:'允许',
      false:'拒绝'
    },
    agreement:{
      'tcp':'自定义TCP',
      'udp':'自定义UDP',
      'icmp':'全部ICMP',
    },
    portRange:{
      '22/22':'SSH(22)',
      '23/23':'telnet(23)',
      '80/80':'HTTP(80)',
      '443/443':'HTTPS(443)',
      '1521/1521':'Oracle(1521)',
      '3306/3306':'MySQL(3306)',
      '3389/3389':'RDP(3389)',
      '6379/6379':'Redis(6379)',
      '1/65535':'全部(1/65535)',
    },
    authObj:{
      '0.0.0.0/0':'0.0.0.0/0',
      '10.0.0.0/8':'10.0.0.0/8',
      '172.16.0.0/12':'172.16.0.0/12',
      '192.168.0.0/16':'192.168.0.0/16',
    }
  }
  created(){
    this.get_security_group()
  }
  private async get_security_group(){
    const res = await Service.get_security_info({
      ecs_id:this.$route.query.ecs_id
    })
    if( res.code === 'Success'){
      this.security_list = res.data.sg_list
      this.init_list()
    }
  }
  //处理数据，将安全组id和name放到每个规则对象中
  private init_list(){
    this.enterList = []
    this.outList = []
    this.security_list.map(item=> {
      const enterList =item.ingress.map(rule=>({
        id:item.id,
        name:item.name,
        ...rule
      }))
      enterList.length && this.enterList.push(...enterList)
    })
    this.security_list.map(item=>{
      const outList = item.egress.map(rule=>({
        id:item.id,
        name:item.name,
        ...rule
      }))
      outList.length && this.outList.push(...outList)
    })
  }
  //根据id对同一个安全组出方向、入方向规则进行分别计数
  countRules(data) {
    const map = new Map()
    data.forEach(item => {
      const count = map.get(item.id) || 0
      map.set(item.id, count + 1)
    })
    return map
  }
  // 根据id判断，为同一个安全组的规则合并第一列单元格
  objectSpanMethod(type) {
    return ({ row, column, rowIndex, columnIndex }) => {
      if (columnIndex === 0) { // 安全组名称列的索引为 0
        const id = row.id
        const countMap = type === 'ingress' ? this.countRules(this.enterList) : this.countRules(this.outList)
        const count = countMap.get(id) || 1
        const pos = rowIndex - (type === 'ingress' ? this.enterList : this.outList).findIndex(item => item.id === id)
        if (count > 1 && pos === 0) {
          return {
            rowspan: count,
            colspan: 1
          }
        } else if (count > 1 && pos > 0) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  }
  private handleClick(){}
  handleCellMouseEnter(row, column, cell, event) {
    this.currentId= row.id
  }
  handleCellMouseLeave() {
    this.currentId= -1
  }
  rowClassName({ row }) {
    return row.id === this.currentId ? 'current-hover-row' : ''
  }
}
</script>

<template>
  <div style="height: 100%">
    <div style="margin-top: -76px">
      <back-header-new :title="'安全组详情'"></back-header-new>
    </div>
  <div class="box">
    <div class="left-box">
      <div>已关联安全组</div>
      <el-divider></el-divider>
      <div>
        <el-table :data="security_list">
          <el-table-column label="安全组名称" prop="name" width="220px"></el-table-column>
          <el-table-column label="优先级" prop="priority" sortable></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="right-box">
      <el-card class="safe-rule">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="入方向" name="enter">
            <el-table :data="enterList"
                      :span-method="objectSpanMethod('ingress')"
                      @cell-mouse-enter="handleCellMouseEnter"
                      @cell-mouse-leave="handleCellMouseLeave"
                      :row-class-name="rowClassName" >
              <el-table-column label="安全组名称" prop="name"></el-table-column>
              <el-table-column label="优先级" prop="priority"></el-table-column>
              <el-table-column label="授权策略" prop="policy">
                <template slot-scope="scope">
                  <span>{{ruleInfo.strategyObj[scope.row.status]}}</span>
                </template>
              </el-table-column>
              <el-table-column label="协议类型" prop="protocol">
                <template slot-scope="scope">
                  <span>{{ruleInfo.agreement[scope.row.protocol]}}</span>
                </template>
              </el-table-column>
              <el-table-column label="端口范围" prop="">
                <template slot-scope="scope">
                  <span>{{ruleInfo.portRange[scope.row.port] ? ruleInfo.portRange[scope.row.port] : scope.row.port}}</span>
                </template>
              </el-table-column>
              <el-table-column label="授权对象" prop="cidrIp">
                <template slot-scope="scope">
                  <span>{{ruleInfo.authObj[scope.row.cidr_block] ? ruleInfo.authObj[scope.row.cidr_block] : scope.row.cidr_block}}</span>
                </template>
              </el-table-column>
              <el-table-column label="描述" prop="policy_description"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="出方向" name="out">
            <el-table :data="outList"
                      :span-method="objectSpanMethod('egress')"
                      @cell-mouse-enter="handleCellMouseEnter"
                      @cell-mouse-leave="handleCellMouseLeave"
                      :row-class-name="rowClassName">
              <el-table-column label="安全组名称" prop="name"></el-table-column>
              <el-table-column label="优先级" prop="priority"></el-table-column>
              <el-table-column label="授权策略" prop="policy">
                <template slot-scope="scope">
                  <span>{{ruleInfo.strategyObj[scope.row.status]}}</span>
                </template>
              </el-table-column>
              <el-table-column label="协议类型" prop="protocol">
                <template slot-scope="scope">
                  <span>{{ruleInfo.agreement[scope.row.protocol]}}</span>
                </template>
              </el-table-column>
              <el-table-column label="端口范围" prop="">
                <template slot-scope="scope">
                  <span>{{ruleInfo.portRange[scope.row.port] ? ruleInfo.portRange[scope.row.port] : scope.row.port}}</span>
                </template>
              </el-table-column>
              <el-table-column label="授权对象" prop="cidrIp">
                <template slot-scope="scope">
                  <span>{{ruleInfo.authObj[scope.row.cidr_block] ? ruleInfo.authObj[scope.row.cidr_block] : scope.row.cidr_block}}</span>
                </template>
              </el-table-column>
              <el-table-column label="描述" prop="policy_description"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

  </div>
  </div>
</template>

<style scoped lang="scss">
.box{
  display: flex;
  margin-top: 70px;
  height: 100%;
  .left-box{
    background: #Ffffff;
    border: 1px solid #e5e8ef;
    border-radius: 2px;
    flex-shrink: 0;
    margin-right: 12px;
    padding: 20px;
    width: 300px;
    margin-top: 70px;
  }
  .right-box{
    overflow: auto;
    background: #Ffffff;
    border: 1px solid #e5e8ef;
    border-radius: 2px;
    flex-grow: 1;
    padding: 20px;
    width: 0;
    margin-top: 70px;
    .divider{
      margin-top: 45px!important;
    }
    .el-card.safe-rule.is-always-shadow{
      box-shadow: none;
      border: none;
      border-bottom: 1px solid #e7e7e7;;
    }
  }
  ::v-deep .el-table .current-hover-row {
    background: #f5f7fa;
  }
}


</style>
