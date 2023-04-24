<template>
    <div>
        <el-table 
            :data="list" 
            border 
        >
            <el-table-column prop="1" label="授权类型"></el-table-column>
            <el-table-column prop="2" label="计费方式"></el-table-column>
            <el-table-column prop="3" label="总数量"></el-table-column>
            <el-table-column prop="4" label="已分配数量"></el-table-column>
            <el-table-column prop="" label="" type="expand" width="50">
                <template slot-scope="props">
                    <div v-for="(item,index) in props.row.az_list" :key="index" class="table-expand">
                        <div class="az-name">
                            <span>{{item.az_name}}</span>
                            
                        </div>
                        <div><span>{{ item.num }}</span></div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="size" label="剩余数量"></el-table-column>
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
    </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from 'vue-property-decorator';
// import 
@Component({
    components:{
    }
})
export default class List extends Vue{
    private list:Array<any>=[]
    private current:number = 1
    private size:number = 20
    private total:number = 0
    created() {
        this.getList()
    }
    private async getList(){

    }
    private handleSizeChange(size){
        this.size = size
        this.getList()
    }
    private handleCurrentChange(cur){
        this.current = cur
        this.getList()
    }

}
</script>
<style lang="scss" scoped>
.icon{
  width:100%;
  text-align: right;
}
i.el-icon-s-tools{
  font-size: 18px;
  vertical-align: middle;
}
.table-expand{
    display: flex;
    justify-content:right;
    margin-bottom: 10px;
    align-items: center;
    .operate{
        width: 180px;
        padding-left: 14px;
        text-align: left;
    }
    .time,.status,.perch{
        width: 120px;
        padding-left: 14px;
        line-height: 20px;
    }
    .az-name{
        width: 170px;
        padding-left: 14px;
        line-height: 20px;
    }
}
.table-expand:last-child{
    margin-bottom: 0;
}

</style>
<style lang="scss">
td.mirror-az.el-table__cell{
    border-right: none;
}
</style>