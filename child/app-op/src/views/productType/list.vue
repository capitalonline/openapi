<template>
    <div>
        <action-block :search_option="search_dom" @fn-search="FnSearch">
            <template #default>
                <el-button type="primary" @click="add">新增</el-button>
            </template>
        </action-block>
        <el-table
            :data="list"
            border
            ref="product_list"
        >
            <el-table-column prop="az_id" label="物理机产品ID"></el-table-column>
            <el-table-column prop="az_name" label="产品名称"></el-table-column>
            <el-table-column prop="region_name" label="CPU"></el-table-column>
            <el-table-column prop="region_id" label="逻辑核数"></el-table-column>
            <el-table-column prop="net_type" label="内存"></el-table-column>
            <el-table-column prop="backend_types" label="显卡"></el-table-column>
            <el-table-column prop="status_display" label="硬盘"></el-table-column>
            <el-table-column prop="customer" label="网卡"></el-table-column>
            <el-table-column prop="remark" label="可用区"></el-table-column>
            <el-table-column prop="update_time" label="物理机台数"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="operate" label="操作">
               <template slot-scope="scope">
                   <el-button type="text" @click="edit(scope.row,'edit')">编辑</el-button>
               </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import ActionBlock from '@/components/search/actionBlock.vue';
@Component({
    components:{
        ActionBlock
    }
})
export default class ProductType extends Vue{
    private search_dom:any={
        az:{placeholder:'请选择可用区',list:[]},
        id:{placeholder:'请输入物理机产品id'},
        cpu:{placeholder:'请输入CPU型号'},
        gpu:{placeholder:'请输入显卡型号'},
        net:{placeholder:'请输入网卡型号'},
    }
    private list:any=[]
    private FnSearch(val){

    }
    private add(){

    }
    private edit(){
        
    }
}
</script>

<style lang="" scoped>

</style>