<template>
    <div>
        <el-table :data="list" border class="event-table">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="os_id" label="镜像ID"></el-table-column>
            <el-table-column prop="os_name" label="镜像名称"></el-table-column>
            <el-table-column prop="os_type_value" label="操作系统"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="disk_size" label="容量"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="processing" label="创建进度"></el-table-column>
            <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="create">创建实例</el-button>
                    <el-button type="text" @click="operate(scope.row.mirror_id)">操作记录</el-button>
                </template>
            </el-table-column> -->
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
import {Vue,Component,Prop,Watch} from 'vue-property-decorator'
import Record from '../instance/record.vue';
import Service from '../../https/mirror/list'
@Component({
    components:{
        Record
    }
})
export default class Mirror extends Vue{
    @Prop({default:()=>{}})search_data!:any

    private list:any=[]
    private record_visible:Boolean=false
    private record_id:String=''
    private current:number = 1
    private size:number = 20
    private total:number = 0
    private req_data:any={}
    created() {
        this.getMirrorList()
    }
    @Watch("search_data",{immediate:true,deep:true})
    private watch_search_data(newVal){
        this.req_data = newVal
    }
    private async getMirrorList(data:any={}){
        const req = Object.keys(data).length>0 ? data : this.req_data
        this.current = Object.keys(data).length>0 ? 1 : this.current
        let res:any=await Service.get_mirror_list({
            [req.namesub ? req.namesub : 'os_name'] :req.name,
            page_index:this.current,
            page_size:this.size,
        })
        if(res.code==="Success"){
            this.list = res.data.image_list || []
            this.total = res.data.page_info.count
        }
    }
    private operate(id:String){
        this.record_id=id
        this.record_visible=true
    }
    private handleSizeChange(size){
        this.size = size
        this.getMirrorList()
    }
    private handleCurrentChange(cur){
        this.current = cur
        this.getMirrorList()
    }
}
</script>