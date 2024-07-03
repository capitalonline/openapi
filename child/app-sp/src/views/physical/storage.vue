<template>
    <div>
         <el-table
            :data="list"
            border
            ref="table"
        >
            <el-table-column prop="name" label="名称">
                <template slot-scope="scope">
                    <span class="num_message">{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类型">
                <template slot-scope="scope">
                    <span>{{scope.row.path==="/" ? '系统盘' : '数据盘'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="path" label="挂载路径"></el-table-column>
            <el-table-column prop="all_size" label="总容量"></el-table-column>
            <el-table-column prop="used_size" label="占用空间"></el-table-column>
            <el-table-column prop="can_use_size" label="可用空间"></el-table-column>
            <el-table-column prop="used_persent" label="使用率"></el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import { Component, Emit, Vue,Prop } from 'vue-property-decorator';
import Service from '../../https/physical/list';
import moment from 'moment';

@Component({})
export default class Storage extends Vue{
    $route;
    @Prop(String)host_id!:string;
    private list:any=[]
    created() {
        this.get_list()
    }
    private async get_list(){
        let res:any=await Service.get_detail_storage({
            host_id: this.$route.params.id ? this.$route.params.id : this.host_id
        })
        if(res.code==="Success"){
            this.list = res.data.ram_list
        }
    }

}
</script>
