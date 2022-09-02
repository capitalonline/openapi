<template>
    <el-dialog
        title="扩容"
        :visible.sync="visibleSync"
        width="700px"
        :close-on-click-modal="false">
        <div v-for="(item,i) in configInfo" :key="i" class="m-bottom10">
            <span class="label">{{item.label}}</span>
            <span class="label">{{item.value}}</span>
        </div>
        <div>
            <span class="label">扩容后容量:</span>
            <span>
                <el-input-number v-model="size"></el-input-number>
                <el-select v-model="unit">
                    <el-option v-for="item in unitList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </span>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="visibleSync = false">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script lang="ts">
import {Vue,Component,Prop,PropSync,Emit} from 'vue-property-decorator';
import Service from '../../https/filesystem/list';
import moment from 'moment';

@Component({
    components:{}
})
export default class RollBack extends Vue{
    @PropSync('visible')visibleSync!:Boolean;
    @Prop({default:()=>{}})info!:any;
    private configInfo:any={
        customer_id:{label:'客户ID:',value:''},
        customer_name:{label:'客户名称:',value:''},
        nas_id:{label:'文件系统ID:',value:''},
        nas_name:{label:'文件系统名称:',value:''},
        total:{label:'当前容量:',value:''},
        used:{label:'当前使用量:',value:''},
    }
    private size:number=0;
    private unit:string=''
    private unitList:any=['GB','TB'];
    private units=['B','KB','MB','GB','TB','PB','EB','ZB']
    private clear=null
    created() {
        for(let i in this.configInfo){
            this.configInfo[i].value = this.info[i]
        }
        this.getFileUse()
    }
    beforeDestroy() {
        this.FnClearTimer()
    }
    private FnSetTimer(){
      if(this.clear){
        this.FnClearTimer()
      }
      this.clear = setTimeout(()=>{
        this.getFileUse(false)
      },1000*60)
    }
    private FnClearTimer(){
      if(this.clear){
        clearTimeout(this.clear)
      }
    }
    private async getFileUse(loading:boolean=true){
      if(!loading){
        this.$store.commit("setLoading",false)
      }
      let res:any = await Service.get_file_use({
        region_id:this.info.region_id,
        volume_ids:[this.info.nas_id]
      })
      if(res.code==='Success'){
        let id:string = this.info.nas_id
        this.configInfo.total.used  = this.computeUnit(res.data[id]&& res.data[id].used ? res.data[id].used : 0);
        this.configInfo.total.value = this.computeUnit(res.data[id]&& res.data[id].total ? (res.data[id].total) : 0);
        }
    } 
    private computeUnit(value,num=0){
        if(value>=1024){
            return this.computeUnit(value/1024,++num)
        }else{
            return value.toFixed(2) + this.units[num];
        }        
    }
    private async confirm(){
        let res:any = await Service.capacity({
            snapshot_id:this.info.snapshot_id,
            disk_id:this.info.disk_id,
            after_ecs_start:this.check
        })
        if(res.code==='Success'){
            this.$message.success(res.message)
            this.visibleSync=false;
        }
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