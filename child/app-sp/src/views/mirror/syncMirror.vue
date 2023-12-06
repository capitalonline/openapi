<template>
    <el-dialog
        title="同步镜像"
        :visible.sync="visible_sync"
        width="800px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        @close="cancel"
    >
        <el-card class="card-box">
            <div slot="header" class="clearfix">镜像信息</div>
            <el-row :gutter="24">
                <el-col :span="12" v-for="item in info" :key="item.id">
                    <span class="label">{{item.label}}: </span>
                    <span class="value">{{item.value}}</span>
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <div slot="header" class="clearfix">镜像同步位置</div>
            <div class="card">
                <el-card v-for="(item,key) in list" :key="item.id" class="sync">
                    <div slot="header" class="clearfix">{{item.name}}</div>
                    <el-checkbox-group  v-model="item.checkList">
                        <el-checkbox v-for="(inn) in item.data" :key="inn.az_id" :label="inn.az_id" v-if="inn.label!=='not_available_az_list'" :disabled="inn.label==='current_az_list'">{{inn.az_name}}</el-checkbox>
                    </el-checkbox-group>
                    <el-divider></el-divider>
                    <div class="m-bottom10" v-if="item.len>0">不支持可用区</div>
                    <div v-for="(i) in item.data" :key="i" v-if="i.label==='not_available_az_list'">{{i.az_name}}</div>
                </el-card>
            </div>
        </el-card>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync} from 'vue-property-decorator';
import Service from '../../https/mirror/list'
@Component({
    components:{
    }
})
export default class SyncMirror extends Vue{
    @PropSync('visible')visible_sync!:boolean;
    @Prop({default:''})os_id!:string
    private info:any={
        name:{label:'镜像名称',value:'1'},
        id:{label:'镜像ID',value:'2'},
        system:{label:'操作系统',value:'3'},
        size:{label:'规格',value:'4'},
        type:{label:'类型',value:'5'},
    }
    private az_info:any={};
    private list:any=[]
    private current_az_list:any=[
             {
              "az_id":"16e6e380-729d-11ec-b62a-1e00e202ff80",
              "az_name":"大别山A","region_group_id":"408fd19e-fa78-11e6-bd9a-30b49e091019",
              "region_group_name":"中国大陆"
            }]
    private available_az_list=[
             {"az_id":"a18d6c6a-9619-418a-8526-2878f2653d5f",
              "az_name":"北京A",
              "region_group_id":"408fd19e-fa78-11e6-bd9a-30b49e091019",
              "region_group_name":"中国大陆"},
              {"az_id":"a18d6c6a-9619-418a-8526-2878f2653d52",
              "az_name":"北京A2",
              "region_group_id":"408fd19e-fa78-11e6-bd9a-30b49e091011",
              "region_group_name":"中国大陆"},
              {"az_id":"a18d6c6a-9619-418a-8526-2878f2653d51",
              "az_name":"北京A1",
              "region_group_id":"408fd19e-fa78-11e6-bd9a-30b49e091019",
              "region_group_name":"中国大陆"},
              {"az_id":"a18d6c6a-9619-418a-8526-2878f2653d53",
              "az_name":"北京A3",
              "region_group_id":"408fd19e-fa78-11e6-bd9a-30b49e091019",
              "region_group_name":"中国大陆"},
             {"az_id":"f9755192-b89d-11eb-b74e-1e00e202ff80",
              "az_name":"圣保罗A",
              "region_group_id":"498cc42c-b89d-11eb-b74e-1e00e202ff80",
              "region_group_name":"南美地区"}
         ]
    private not_available_az_list=[{
                "az_id":"a18d6c6a-9619-418a-8526-2878f2653d5f",
              "az_name":"北京A",
              "region_group_id":"408fd19e-fa78-11e6-bd9a-30b49e091019",
              "region_group_name":"中国大陆"}]
    created(){
        this.get_pub_sync_detail()
    }
    private async get_pub_sync_detail(){
        let az_info={}
        let res:any = await Service.get_pub_sync_detail({
            os_id:this.os_id
        })
        if(res.code==='Success'){
            this.info.name.value = res.data.display_name;
            this.info.id.value = res.data.os_id;
            this.info.system.value = `${res.data.os_type} ${res.data.os_version} ${res.data.os_bit} 位`;
            this.info.size.value = res.data.size ? res.data.size+'GB' : '';
            this.info.type.value = res.data.template_type==='public' ? '公共镜像' : '私有镜像';
            const {current_az_list,available_az_list,not_available_az_list}=res.data
            let ids = current_az_list.map(item=>item.az_id)
            let temp={
                'current_az_list':current_az_list,
                'available_az_list':available_az_list.filter(item=>!ids.includes(item.az_id)),
                'not_available_az_list':not_available_az_list
            }
            for(let i in temp){
                temp[i].map(item=>{
                    az_info[item.region_group_name] = {...az_info[item.region_group_name],[item.az_id]:{...item,label:i}};//同一区域拼接
                })
            }
            let list_temp:any=[];
            for(let i in az_info){
                let temp_list=[]
                for(let inn in az_info[i]){
                    temp_list.push(az_info[i][inn])
                }
                list_temp.push({name:i,data:temp_list,checkList:[],len:temp_list.filter(inn=>inn.label==='not_available_az_list').length,id:Math.random()*1000})
            }
            this.list = list_temp;
        }
    }
    private async confirm(){//sync_mirror
        let data:any=[]
        this.list.map(item=>{
            data=[...data,...item.checkList]
        })
      if(data.length<1){
        return false
      }
        let res:any = await Service.sync_mirror({
            os_id:this.os_id,
            az_ids:data
        })
        if(res.code==='Success'){
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
.card-box{
    margin-bottom: 20px;
}

.label{
    width:120px;
}
.el-col{
    padding-bottom: 12px;
}
.card{
    display: flex;
    .sync{
        width: 220px;
        margin-right: 10px;
    }
}
</style>
