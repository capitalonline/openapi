<template>
    <div>
        <el-table 
            :data="list" 
            border 
        >
            <el-table-column prop="key" label="配置Key">
                <template slot-scope="scope">
                    <span>NAS_AVAILABLE_CHECK_INTERVAL</span>
                </template>
            </el-table-column>
            <el-table-column prop="value" label="配置Value">
                <template slot-scope="scope">
                    <span>{{`${scope.row.update_during}${timeInfo[scope.row.unit]}`}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button type="text" @click="set(scope.row)">设置</el-button> 
                </template>
            </el-table-column>
        </el-table>
        <template v-if="visible">
            <el-dialog
                title="设置"
                :visible.sync="visible"
                width="30%"
                :close-on-click-modal="false"
                :destroy-on-close="true">
                <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                    <el-form-item label="活动配置Key:">
                        NAS_AVAILABLE_CHECK_INTERVAL
                    </el-form-item>
                    <el-form-item label="配置Value:" prop="value">
                        <el-input v-model="form.value" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>
                    </el-form-item>
                    <el-form-item label="单位:" prop="unit">
                        <el-select v-model="form.unit">
                            <el-option value="h" label="小时"></el-option>
                            <el-option value="d" label="天"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="confirm">确定</el-button>
                    <el-button  @click="visible = false">取消</el-button>
                </span>
            </el-dialog>
        </template>
    </div>
</template>
<script lang="ts">
import {Vue,Component,Prop,Watch} from 'vue-property-decorator';
import ActionBlock from '../../components/search/actionBlock.vue';
import SvgIcon from '../../components/svgIcon/index.vue';
import Service from '../../https/filesystem/list';
import moment from 'moment';
import Clipboard from '../../components/clipboard.vue'
@Component({
    components:{
        ActionBlock,
        SvgIcon,
        Clipboard,
    }
})
export default class List extends Vue{
    private list:Array<any>=[{customer_id:1}]
    private auth_list:any=[];
    private operateInfo:any={}
    private visible:boolean=false;
    private timeInfo={
      'h':'小时',
      'd':'天',
    }
    private form={
        value:'',
        unit:'h'
    }
    private validatValue=(rule, value, callback)=>{
        let reg = new RegExp("^[0-9]*[1-9][0-9]*$")
        if (value === '') {
          callback(new Error('请输入配置Value'));
        } else if (!reg.test(value)) {
          callback(new Error('配置Value只能为正整数'));
        } else {
          callback();
        }
    }
    private rules:any={
        value: [
            { validator: this.validatValue, trigger: 'blur' }
          ],
    }
    created() {
        this.auth_list = this.$store.state.auth_info[this.$route.name];
        this.getSetList()
    }
    @Watch('visible')
    private watch_visible(nv){
        if(!nv){
            this.getSetList()
        }
    }
    private async getSetList(){
        let res:any = await Service.get_set_list({})
        if(res.code==="Success"){
            this.list = res.data.data;
        }
    }
    private set(row){
        this.visible=true;
        this.form.value = row.update_during;
        this.form.unit = row.unit
    }
    private confirm(){
        let form = this.$refs.form as any;
        form.validate(async valid=>{
            if(valid){
                let res = await Service.edit_update_time({
                    update_during:Number(this.form.value),
                    unit:this.form.unit
                })
                if(res.code==='Success'){
                    this.$message.success('修改时间成功')
                    this.visible=false
                }
            }
        })
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
