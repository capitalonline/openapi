<template>
    <el-dialog
        title="客户详情"
        :visible.sync="visibleSync"
        width="700px"
        :close-on-click-modal="false"
        :destroy-on-close="true">
        <el-table :data="list" >
            <el-table-column prop="customer_id" label="客户ID"></el-table-column>
            <el-table-column prop="customer_name" label="客户名称"></el-table-column>
            <el-table-column prop="num" label="购买数量"></el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.page_index"
            :page-sizes="[20, 50, 100]"
            :page-size="pageInfo.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total">
        </el-pagination>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary"  @click="visibleSync = false">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync,Emit} from 'vue-property-decorator';
import Service from '../../https/inventory/list';
import moment from 'moment';

@Component({
    components:{}
})
export default class Customer extends Vue{
    @PropSync('visible')visibleSync!:Boolean;
    @Prop({default:()=>{}})info!:any;
    private list:any=[]
    private moment:any= moment;
    private pageInfo:any={
        page_index:1,
        page_size:20,
        total:0,
    }
    created() {
        this.getCustomerList()
    }
    private async getCustomerList(){
        const {
            spec_family_id,
            host_product_id,
            az_id,
            cpu,
            ram,
            gpu,
        }=this.info
        let res:any = await Service.get_customer_sell_info({
            spec_family_id,
            host_product_id,
            az_id,
            cpu,
            ram,
            gpu,
            page_index:this.pageInfo.page_index,
            page_size:this.pageInfo.page_size,
        })
        if(res.code==='Success'){
            this.list=res.data.customer_buy_list;
            this.pageInfo.total = res.data.page_info.count
        }

    }
    private handleCurrentChange(cur){
        this.pageInfo.page_index = cur;
        this.getCustomerList()
    }
    private handleSizeChange(size){
        this.pageInfo.page_size = size;
        this.getCustomerList()
    }
    @Emit('fn-create')
    private create(){
        
    }
}
</script>
<style lang="scss" scoped>
.weight{
    font-weight: bold;
    font-size: 14px;
    margin: 0 5px;
}
</style>