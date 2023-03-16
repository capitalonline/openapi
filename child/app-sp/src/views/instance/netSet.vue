<template>
    <div>
      <el-dialog
        title="网络设置"
        :visible.sync="visibleSync"
        width="60%"
        :destroy-on-close="true"
      >
        <el-alert
            title="注：若批量选中实例，将以填写的私有IP地址为起始IP地址，依次配置至各实例中。"
            type="warning"
            :closable="false"
            center
            >
        </el-alert>
        <el-table :data="list">
            <el-table-column prop="vlan" label="VLAN">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.vlan_id" oninput="value = value.replace(/^(0+)|[^\d]+/g,'')" />
                    <div v-show="!judge('vlan',scope.row.vlan_id)" class="error_message">vlan需为大于0的数字</div>
                </template>
            </el-table-column>
            <el-table-column prop="ip" label="IP地址">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.ip_address" />
                    <div v-show="!judge('ip',scope.row.ip_address)" class="error_message">ip地址格式不正确</div>
                </template>
            </el-table-column>
            <el-table-column prop="subnet" label="子网掩码">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.mask" oninput="value = value.replace(/^(0+)|[^\d]+/g,'')" />
                    <div v-show="!judge('subnet',scope.row.mask)" class="error_message">子网掩码范围为1-32</div>
                </template>
            </el-table-column>
            <el-table-column prop="gateway" label="网关">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.gateway" />
                    <div v-show="!judge('ip',scope.row.gateway)" class="error_message">网关ip地址格式不正确</div>
                </template>
            </el-table-column>
            <el-table-column prop="mainDns" label="主DNS">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.mainDns" />
                    <div v-show="!judge('ip',scope.row.mainDns)" class="error_message">主DNS格式不正确</div>
                </template>
            </el-table-column>
            <el-table-column prop="dns" label="备DNS">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.dns" />
                    <div v-show="!judge('ip',scope.row.dns)" class="error_message">备DNS格式不正确</div>
                </template>
            </el-table-column>
            <el-table-column prop="operate" label="">
                <template slot-scope="scope">
                    <i class="el-icon-remove-outline delete-icon" v-if="list.length>1" @click="del(scope.$index)"></i>
                </template>
            </el-table-column>
        </el-table>
        <div class="m-top10">
            <el-button type="text" @click="add" :disabled="list.length===5"><i class="el-icon-circle-plus"></i> 添加数据盘</el-button>
        </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirm">确定</el-button>
                <el-button type="default" @click="visibleSync=false">取消</el-button>
            </span>
      </el-dialog>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue,Prop,Emit, PropSync } from 'vue-property-decorator';
  import Service from '../../https/instance/list'
  @Component
  export default class InsDetail extends Vue{
    $message;
    @PropSync('visible')visibleSync!:boolean
    @Prop({default:()=>[]}) ecs_list!:any;
    private list:any=[
        {
            vlan_id:'',
            ip_address:'',
            mask:'',
            gateway:'',
            mainDns:'',
            dns:''
        }
    ]
    created() {
    }
    private add(){
        this.list.push({
            vlan_id:'',
            ip_address:'',
            mask:'',
            gateway:'',
            mainDns:'',
            dns:''
        })
    }
    private judge(type,value){
        if(type==='vlan'){
            return Number(value)>0
        }else if(type==='ip'){
            let reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
            return value && reg.test(value)
        }else{
            return Number(value)>0 && Number(value)<=32
        }
    }
    private del(ind){
        this.list = this.list.filter((item,index)=>index!==ind)
    }
    
    private async confirm(){
        let obj = {
            vlan_id:'vlan',
            ip_address:'ip',
            mask:'subnet',
            gateway:'ip',
            mainDns:'ip',
            dns:'ip',
        }
        for(let i in this.list){
            for(let j in this.list[i]){
                if(!this.judge(obj[j],this.list[i][j])){
                    return;
                }
            }
        }
        let data = []
        this.list.map(item=>{
            const {vlan_id,ip_address,mask,gateway,mainDns,dns} = item
            data.push({
                netcard_id:'',
                vlan_id,
                ip_address,
                mask,
                gateway,
                dns:[mainDns,dns]
            })
        })
        let res:any = await Service.set_net({
            ecs_ids:this.ecs_list.map(item=>item.ecs_id),
            base_nic_info:data,
        })
        if(res.code==='Success'){
            this.$message.success(res.message)
        }
        console.log('confirm');
        this.visibleSync=false
    }
  }
  </script>
  <style lang="scss" scoped>
  i {
    font-size: 24px;
    margin-right: 2px;
    vertical-align: middle;
  }
  .delete-icon {
    margin-right: 6px;
    color: #da3b18;
    cursor: pointer;
  }
  </style>

  
  