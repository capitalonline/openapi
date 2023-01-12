<template>
    <div>
      <el-dialog
        title="配置详情"
        :visible.sync="visible"
        width="60%"
        :destroy-on-close="true"
      >
        <div>
            <el-table :data="list">
                <el-table-column prop="vlan" label="VLAN">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.vlan" />
                    </template>
                </el-table-column>
                <el-table-column prop="ip" label="IP地址">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.ip" />
                    </template>
                </el-table-column>
                <el-table-column prop="subnet" label="子网掩码">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.subnet" />
                    </template>
                </el-table-column>
                <el-table-column prop="gateway" label="网关">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.gateway" />
                    </template>
                </el-table-column>
                <el-table-column prop="mainDns" label="主DNS">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.mainDns" />
                    </template>
                </el-table-column>
                <el-table-column prop="dns" label="备DNS">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.dns" />
                    </template>
                </el-table-column>
                <el-table-column prop="operate" label="">
                    <template slot-scope="scope">
                        <i class="el-icon-remove-outline delete-icon" v-if="list.length>1" @click="del(index)"></i>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="text" @click="add" :disabled="list.length===5"><i class="el-icon-circle-plus"></i> 添加数据盘</el-button>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">确定</el-button>
                <el-button type="default">返回</el-button>
            </div>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue,Prop,Emit } from 'vue-property-decorator';
  @Component
  export default class InsDetail extends Vue{
    $message;
    @Prop(Boolean) visible!:Boolean;
    @Prop(String) detail_id!:String;
    private list:any=[
        {
            vlan:'',
            ip:'',
            subnet:'',
            gateway:'',
            mainDns:'',
            dns:''
        }
    ]
    private add(){
        this.list.push({
            vlan:'',
            ip:'',
            subnet:'',
            gateway:'',
            mainDns:'',
            dns:''
        })
    }
    private del(ind){
        this.list = this.list.filter((item,index)=>index!==ind)
    }
    created() {
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

  
  