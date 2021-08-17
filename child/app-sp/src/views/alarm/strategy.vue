<template>
    <div>
        <action-block :search_option="search" @fn-search="fn_search">
            <template #default>
                <el-button type="primary" @click="create">创建策略</el-button>
                <el-button type="primary" @click="operate('del')">删除</el-button>
                <el-button type="primary" @click="apply">应用</el-button>
                <el-button type="primary" @click="operate('stop')">停用</el-button>
            </template>
        </action-block>
        <el-table
            :data="list"
            border
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="customer_id" label="策略名称/ID"></el-table-column>
            <el-table-column prop="clientName" label="被应用过的产品"></el-table-column>
            <el-table-column prop="disk_id" label="策略状态"></el-table-column>
            <el-table-column prop="diskName" label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.update_time ? moment(scope.row.update_time).format("YYYY-MM-DD HH:mm:ss") : ''}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="修改时间">
                <template slot-scope="scope">
                    <span>{{scope.row.update_time ? moment(scope.row.update_time).format("YYYY-MM-DD HH:mm:ss") : ''}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作栏">
                <template slot-scope="scope">
                    <el-button type="text" @click="operateRecord(scope.row.disk_id)">修改</el-button>
                    <el-button type="text" @click="apply">应用</el-button>
                    <el-button type="text" @click="operateRecord(scope.row.disk_id)">停用</el-button>
                    <el-button type="text" @click="operateRecord(scope.row.disk_id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <template v-if="drawer">
            <ApplyStrategy :drawer="drawer" />
        </template>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActionBlock from '../../components/actionBlock.vue';
import ApplyStrategy from './apply_strategy.vue'
@Component({
    components:{
        ActionBlock,
        ApplyStrategy
    }
})
export default class Strategy extends Vue{
    $router;
    private search:any={
        name:{placeholder:'请输入策略名称'}
    }
    private list=[{customer_id:1}]
    private drawer:Boolean=false
    

    private fn_search(){

    }
    private handleSelectionChange(){

    }
    private create(){
        this.$router.push('/alarmStrategy/create')
    }
    private operate(str:string){

    }
    private apply(){
        this.drawer=true
        console.log("this.drawer",this.drawer)
    }
}
</script>