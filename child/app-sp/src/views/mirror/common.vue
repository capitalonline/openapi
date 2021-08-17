<template>
    <div>
        <el-table :data="list" border class="event-table">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="mirror_id" label="镜像ID"></el-table-column>
            <el-table-column prop="name" label="镜像名称"></el-table-column>
            <el-table-column prop="os" label="操作系统"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="quantity" label="容量"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="progress" label="创建进度"></el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="text" @click="create">创建实例</el-button>
                <el-button type="text" @click="operate(scope.row.mirror_id)">操作记录</el-button>
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
        <template v-if="record_visible">
            <Record :visible = "record_visible" :record_id = "record_id" @close = 'closeRecord' />
        </template>
    </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'
import Record from '../instance/record.vue'
@Component({
    components:{
        Record
    }
})
export default class Mirror extends Vue{
    private list:any=[]
    private record_visible:Boolean=false
    private record_id:String=''
    private current:number = 1
    private size:number = 20
    private total:number = 0
    created() {
        
    }
    private create(){

    }
    private operate(id:String){
        this.record_id=id
        this.record_visible=true
    }
    private handleSizeChange(size){
        this.size = size
    }
    private handleCurrentChange(cur){
        this.current = cur
    }
}
</script>