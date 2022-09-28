
<template>
    <div class="m-top20 m-left20 m-right20 ecs-chains">
        <el-descriptions title="基本信息" :column="2">
            <el-descriptions-item :label="item.label" v-for="(item,i) in configInfo" :key="i">{{item.value}}</el-descriptions-item>
        </el-descriptions>
        <!-- <el-divider></el-divider> -->
        <list-table :id="$route.query.id" :type="'detail'" :snapshot_chains_id="$route.query.id"></list-table>
    </div>
    

</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync} from 'vue-property-decorator';
import Service from '../../https/snapshot/list'
import ListTable from './list.vue'
import {Form} from 'element-ui';
@Component({
    components:{
        ListTable
    }
})
export default class Create extends Vue{
    @PropSync('visible')visibleSync!:false;
    @Prop({default:()=>{}})info!:any;
    private configInfo:any={
        customer_id:{label:'客户ID',value:''},
        az_name:{label:'可用区',value:''},
        customer_name:{label:'客户名称',value:''},
        disk_id:{label:'源云盘ID',value:''},
        snapshot_chains_id:{label:'快照链ID',value:''},
        disk_size:{label:'源云盘容量',value:''},
        snapshot_size:{label:'快照容量',value:''},
        disk_type:{label:'源云盘属性',value:''},
    }
    private form:any={
        update_snapshot_name:''
    }
    created() {
        console.log('###',this.$route.query.id)
        this.detail()
    }
    private async detail(){
        let res:any = await Service.chains_detail({
            snapshot_chains_id:this.$route.query.id
        })
        if(res.code==='Success'){
            let diskObj={
                system:'系统盘',
                data:'数据盘'
            }
            for(let i in this.configInfo){
                if(i==='disk_type'){
                    this.configInfo[i].value = diskObj[res.data[i]]
                }else if(i==='disk_size'){
                    this.configInfo[i].value = res.data[i]+'GB'
                }else{
                    this.configInfo[i].value = res.data[i]
                }
                
                
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>

.ecs-chains{
    .tip{
        margin-left: 120px;
    }
    .el-divider--horizontal{
        margin-top: 0 !important;
        background: #ebebf7 !important;
    }
}
</style>
