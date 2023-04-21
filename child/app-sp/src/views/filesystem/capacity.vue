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
                <el-input class="size" v-model="size" @keyup="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>
                <el-select v-model="unit">
                    <el-option v-for="item in unitList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </span>
            <div v-if="!text.test(Number(size))" class="error_message m-l-73">请输入正整数</div>
            <div v-else-if="!getIsMin()" class="error_message m-l-73">扩容后容量不能小于或者等于当前容量</div>
            <div v-else-if="unit==='TB' ? Number(size)>64 : Number(size)>64*1024" class="error_message m-l-73">扩容后容量不能大于64TB</div>
            <div class="prompt_message m-top10">说明：扩容后容量不能小于或者等于当前容量</div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm" :disabled="Math.ceil(max)>=64">确 定</el-button>
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
    private clear=null;
    private max:number=0
    private min:number=0
    private text:any = new RegExp("^[0-9]*[1-9][0-9]*$")
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
        this.$store.commit("SET_LOADING",false)
      }
      let res:any = await Service.get_file_use({
        region_id:this.info.region_id,
        volume_ids:[this.info.nas_id]
      })
      if(res.code==='Success'){
            let id:string = this.info.nas_id
            this.configInfo.used.value  = this.computeUnit(res.data[id]&& res.data[id].used ? res.data[id].used : 0);
            this.configInfo.total.value = this.computeUnit(res.data[id]&& res.data[id].total ? (res.data[id].total) : 0);
            let oldUnit:string = this.configInfo.total.value.slice(-2)
            this.size = Math.ceil(Number(this.configInfo.total.value.slice(0,-2)))
            this.max=res.data[id].total ? Number(res.data[id].total)/1024/1024/1024/1024 : 0;
            this.min = res.data[id].total ? Number(res.data[id].total)/1024/1024/1024 : 0;
            if(['GB','TB'].includes(oldUnit)){
                this.unit = oldUnit
            }else{
                this.unit = 'GB'
            }
            
        } 
        this.FnSetTimer();
    }
    private getIsMin(){
        let flag:boolean=true
        if(this.unit==='TB' && this.configInfo.total.value.indexOf('TB')>-1){//TB,TB
            flag=this.size>Number(this.max.toFixed(2))
        }else if(this.unit==='TB' && this.configInfo.total.value.indexOf('GB')>-1){//GB,TB
            flag=this.size>0
        }else if(this.unit==='GB' && this.configInfo.total.value.indexOf('TB')>-1){//TB,GB
            flag=this.size>Number(this.max.toFixed(2))*1024
        }else{//GB,GB
            flag=this.size>Number(this.min.toFixed(2))
        }
        return flag
    }
    private computeUnit(value,num=0){
        if(value>=1024){
            return this.computeUnit(value/1024,++num)
        }else{
            return value.toFixed(2) + this.units[num];
        }        
    }
    private async confirm(){
        if(!this.unit){
            return;
        }
        if(!this.text.test(this.size)){
            return
        }
        if(((this.unit==='TB' && Number(this.size)>64)) || Number(this.size)>64*1024 || !this.getIsMin()){
            return;
        }
        const {region_id,az_id,nas_id,customer_id}=this.info
        let res:any = await Service.capacity({
            region_id,
            az_id,
            nas_id,
            size:this.size,
            unit:this.unit,
            customer_id
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
.size{
    width: 240px;
    margin-right: 10px;
}
.m-l-73{
    margin-left: 73px;
}
</style>