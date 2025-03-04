<template>
    <div>
        <el-dialog
            title="删除镜像"
            :visible.sync="visible_sync"
            width="1000px"
            :destroy-on-close="true"
            :close-on-click-modal="false"
        >
            <div>
                <div v-if="type==='del_az'" class="title">您将删除<span class="num_message">1</span>个镜像： <span class="num_message">{{rows[0].azName}}</span>下的镜像<span class="num_message">{{rows[0].display_name}}镜像</span></div>
                <el-alert
                    :title="alert_msg"
                    type="warning"
                    center
                    :closable="false">
                </el-alert>
                <el-table
                    v-if="type==='del'"
                    :data="rows"
                    border
                    max-height="300"
                >
                    <el-table-column prop="os_id" label="镜像名称/ID" align="center" width="150">
                        <template slot-scope="scope">
                            <div>{{scope.row.display_name}}</div>
                            <div>{{scope.row.os_id}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="os_type" label="镜像类型"></el-table-column>
                    <el-table-column prop="az" label="可用区">
                        <template slot-scope="scope">
                            <span v-for="item in scope.row.az_list" :key="item.az_id">{{item.az_name}}{{scope.row.az_list.length > 0 ? ';' : ''}}  </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status_display" label="状态">
                        <template slot-scope="scope">
                            <span :class="[scope.row.status]">{{scope.row.status_display}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirm">确认</el-button>
                <el-button @click="cancel">取消</el-button>
            </span>
        </el-dialog>
    </div>        
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch, PropSync} from 'vue-property-decorator';  
import Service from '../../../https/mirror/list';     
@Component
export default class DelCommonMirror extends Vue{
    @PropSync('visible')visible_sync!:boolean
    @Prop({default:()=>{}})rows!:any;
    @Prop()type!:string;
    private alert_msg:string=this.type==='del' ? "将删除该镜像在全部可用区的文件。镜像删除后，客户将无法使用该镜像进行创建实例与重装操作系统操作，确定要执行删除操作吗？" : '镜像删除后，客户将无法在删除可用区使用该镜像进行创建实例与重装操作系统操作，确定要执行删除操作吗？'
    created(){
    }
    private async confirm(){
        let res:any
        if(this.type==='del'){
            res = await Service.del_pub_mirror({
                os_ids:[this.rows[0].os_id]
            })
        }else{
            res= await Service.del_pub_mirror_az({
                os_id:this.rows[0].os_id,
                az_ids:[this.rows[0].azId]
            })
        }
        if(res.code==="Success"){
            this.$message.success(res.message)
        }
        this.visible_sync=false
    }
    private cancel(){
        this.visible_sync=false
    }
}
</script>
<style lang="scss" scoped>
.title{
    margin-bottom: 5px;
}
</style>