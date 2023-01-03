<template>
    <el-dialog
        title="应用产品详情"
        :visible.sync="detail_visible"
        width="600px"
        custom-class="del"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        @close="cancel"
    >
        <el-table
            :data="list"
            border
        >
            <el-table-column prop="name" label="应用产品"></el-table-column>
            <el-table-column prop="az" label="应用地域及可用区">
                <template slot-scope="scope">
                    <span v-for="(item,id) in scope.row.az" :key="id">{{id}}{{get_az_len(id)===item.length ? ';' : '-可用区'+item.join('、')}}</span>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,Emit, PropSync} from "vue-property-decorator";
import Service from '../../https/instance/create'
@Component({})
export default class ApplyDetail extends Vue{
    @PropSync("visible") detail_visible!:Boolean;
    @Prop({default:()=>[]}) rows!:any
    private current:number = 1
    private size:number = 10
    private total:number = 0
    private list:any=[];
    private region_az_list:any=[]
    created() {
        this.get_region_az()
    }
    private async get_region_az(){
        let res:any=await Service.get_region_az_list({})
        if(res.code==='Success'){
            this.region_az_list = res.data
            const az_obj = this.get_all_az()
            this.rows[0].instances.map(item=>{
            this.list.push({
                name:item.instance_name,
                az:az_obj
                // az:{'圣保罗':["圣保罗A","圣保罗B"]}
            })
        })

        }
    }
    
    private get_all_az(){
        let arr={}
        this.region_az_list.forEach(item => {
            item.region_list.forEach(inn=>{
                inn.az_list.forEach(az=>{
                    if(this.rows[0].az && this.rows[0].az.includes(az.az_id)){
                        arr[inn.region_name]=arr[inn.region_name] ? [...arr[inn.region_name],az.az_name]:[az.az_name]
                    }
                })
            })
        });        
        return arr
    }
    private get_az_len(region_name){
        let len:number=0
        this.region_az_list.forEach(item=>{
            item.region_list.forEach(inn=>{
                if(inn.region_name===region_name){
                    len=inn.az_list.length
                }
            })
        })
        return len
    }
    // private get_apply_list(){

    // }
    // private handleSizeChange(size){
    //     this.size = size
    //     this.get_apply_list()
    // }
    // private handleCurrentChange(cur){
    //     this.current = cur
    //     this.get_apply_list()
    // }
    @Emit("close")
    private cancel(val){
        this.detail_visible=false
    }
}
</script>
<style lang="scss" scoped>
    .box{
        padding: 0 30px;
        .prompt{
            margin-top: 20px;
        }
        
    }
    
</style>
<style lang="scss">
.el-dialog.del{
    .el-dialog__body{
        border-top: 1px solid #DCDFE6;;
        border-bottom: 1px solid #DCDFE6;
    }
    .el-dialog__footer{
        text-align: right;
    }
}
</style>