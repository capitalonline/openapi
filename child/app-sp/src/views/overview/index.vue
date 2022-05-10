<template>
    <div class="box">
        <el-card class="box-card" v-for="item in overview_info" :key="item.name">
            <div slot="header" class="clearfix">
                <span class="title">{{item.name}}</span>
                <span class="all"><span class="num_message">{{item.all}}</span> 台</span>
            </div>
            <div class="content">
                <div v-for="(inn,key) in item.info" :key="key">
                    <p class="m-bottom10" :class="key">{{inn.value}}</p>
                    <p>{{inn.label}}</p>
                    
                </div>
            </div>
        </el-card>
        <!-- <el-card v-for="(item,key) in header_info" :key="key">

        </el-card> -->
    </div>
</template>
<script lang="ts">
import {Vue,Component,Watch} from 'vue-property-decorator';
import Service from '../../https/overview/index'
@Component
export default class OverView extends Vue{
    private header_info:any={
        CPU:{name:'CPU',total_label:'逻辑总核数:',total:2700,remain_label:'可用',remain:'80%',use:'20%',count:'100%',alloted:'2600核',allot_percent:'96%'},
        memory:{ name:'内存',total_label:'总容量:',total:'1.25TB',remain_label:'可用',remain:'8.44TB',use:'1.25TB',count:'9.69TB',alloted:'4.56TB',allot_percent:'60%'},
        GPU:{name:'GPU',total_label:'总块数:',total:800, remain_label:'可分配',remain:'22块',use:'',count:'',alloted:'22块',allot_percent:'16%'},
        storage:{name:'GPU',total_label:'总容量:',total:'4.22TB',remain_label:'可用',remain:'2.22TB',use:'2TB',count:'4.22TB',alloted:'2.6TB',allot_percent:'96%'},
    }
    private overview_info=[{
        name:'宿主机',
        all:233,
        info:{
            init:{label:'初始化待验证',value:50},
            init_error:{label:'验证失败',value:50},
            offline:{label:'离线',value:50},
            exception:{label:'异常',value:50},
            online_maintenance:{label:'在线维护中',value:50},
            offline_maintenance:{label:'离线维护中',value:50},
            online:{label:'在线',value:50},
        },
    },{
        name:'云主机',
        all:233,
        info:{
            failed:{label:'创建失败',value:50},
            error:{label:'错误',value:50},
            shutdown:{label:'已关机',value:50},
            running:{label:'运行中',value:50},
        }
    }]
    created(){
        this.get_overview(0);
        this.get_overview(1);
    }
    @Watch('$store.state.pod_id')
    private watch_pod(nv){
        this.get_overview(0);
        this.get_overview(1);
    }
    
    private async get_overview(ind){
        let func = ind===0 ? 'get_host_overview' : 'get_ecs_overview'
        let res:any= await Service[func]({
            pod_id:this.$store.state.pod_id
        })
        if(res.code==="Success"){
            this.overview_info[ind].all = res.data.all;
            for(let i in res.data){
                console.log("##",i,)
                if(this.overview_info[ind].info[i])this.overview_info[ind].info[i].value = res.data[i]
                
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>
.el-card{
    width: 80%;
    margin: auto;
    margin-bottom: 20px;
    .title{
        color: #333;
        font-weight: bold;
    }
    .all{
        float: right; 
        padding: 3px 0;
        font-weight: bold;
    }
    .content{
        display: flex;
        justify-content: space-between;
        text-align: center;
        
    }
}
.init,.failed{
    color:#4984E7;  
}
.init_error,.shutdown {
  color: #e6a23c;
}
.offline,
.exception,
.error {
  color:#DA3B18;
}
.online,.online_maintenance, {
  color:#2DA867;
}
</style>