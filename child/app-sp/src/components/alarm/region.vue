<template>
  <div class="apply">
    <el-form :model="form_data" ref="form" label-width="150px" class="demo-dynamic">
    <el-form-item
        prop="regions"
        label="地域："
    >
    <el-popover
        placement="bottom"
        width="400"
        trigger="click"
        popper-class="popper"
        v-model="visible"
    >
        <div>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange($event,'area_list')" v-if="area_list.length>0">全选</el-checkbox>
            <div v-for="item in area_list" :key="item.region_group_id">
                <el-divider content-position="left" class="divider">{{item.region_group_name}}</el-divider>
                <el-checkbox :indeterminate="item.isIndeterminate_group" v-model="item.check" @change="handleCheckGroupChange($event,item.region_group_id,'area_list')" class="group-all">全选</el-checkbox>
                <el-checkbox-group v-model="form_data.regions" class="group">
                    <el-checkbox v-for="area in item.region_list" :label="area.region_id" :key="area.region_id">{{area.region_name}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div v-if="area_list.length===0" class="no-data">暂无数据</div>
        </div>
        <el-select
            v-model="sel_region"
            multiple
            allow-create
            ref="region-select"
            class="region"
            slot="reference"
            popper-class="select-area"
        >

        </el-select>
    </el-popover>
    </el-form-item>
     <el-form-item
        prop="az"
        label="可用区:"
    >
    <el-popover
        placement="bottom"
        width="400"
        trigger="click"
        v-model="az_visible"
        popper-class="popper"
    >
        <div>
            <el-checkbox :indeterminate="az_isIndeterminate" v-model="az_checkAll" @change="handleCheckAllChange($event,'az_list')" v-if="az_list.length>0">全选</el-checkbox>
            <div v-for="item in az_list" :key="item.region_group_id">
                <el-divider content-position="left" class="divider">{{item.region_group_name}}</el-divider>
                <el-checkbox :indeterminate="item.isIndeterminate_group" v-model="item.check" @change="handleCheckGroupChange($event,item.region_group_id,'az_list')" class="group-all">全选</el-checkbox>
                <el-checkbox-group v-model="form_data.az" class="group">
                    <el-checkbox v-for="area in item.region_list" :label="area.region_id" :key="area.region_id">{{area.region_name}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div v-if="az_list.length===0" class="no-data">暂无数据</div>
        </div>
        <el-select
            v-model="sel_az"
            multiple
            allow-create
            ref="region-select"
            class="region"
            slot="reference"
            popper-class="select-area"
        >

        </el-select>
    </el-popover>
    </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import { Form } from "element-ui";
import moment from 'moment';
import Service from '../../https/instance/create';
import {trans} from '../../utils/transIndex'
import {usble_area_list} from './data'
@Component({})
export default class Region extends Vue{
    @Prop({default:()=>{}}) region_id!:any
    @Prop(String) customerId!:String;
    @Prop(String) customerName!:String;
    private visible:boolean=false
    private az_visible:boolean=false
    private sel_region:Array<string>=[];
    private sel_az:Array<string>=[];
    private area_list:any = []
    private az_list:any=[]
    private checkAll:boolean=false;
    private isIndeterminate:boolean=false;
    private az_checkAll:boolean=false;
    private az_isIndeterminate:boolean=false;
    private form_data:any=this.region_id
  created() {
    this.FnGetRegionAz()
  }
    //获取地区可用区信息
    private async FnGetRegionAz(){
        let res:any =await Service.get_region_az_list({
            customer_id:this.customerId,
            employee_no: this.$store.state.employee_no,
            user_name: this.$store.state.login_name
        })
        if(res.code==="Success"){
             this.area_list = res.data.map(item=>{
                item = Object.assign(item,{},{check:false,isIndeterminate_group:false})
                return item;
            })
            this.watch_regions(this.form_data.regions)
            // this.setRegionCheckState(this.area_list,'regions')
            // this.watch_area_list(this.area_list)
        }
    }
    private setRegionCheckState(list,type){
        let az=[]
        list.map((item)=>{
            let arr=[]
            item.region_list.map((inn)=>{
                if(this.form_data[type].includes(inn.region_id)){
                    arr.push(inn.region_id)
                    type==='regions' && az.push({
                        region_group_id:inn.region_id,
                        region_group_name:inn.region_name,
                        region_list:trans(inn.az_list,'az_name','az_id','region_name','region_id'),
                        check:false,
                        isIndeterminate_group:false,

                    })
                }
            })
            let check = arr.length===item.region_list.length ? true : false
            let isIndeterminate_group = arr.length===0 || arr.length===item.region_list.length ? false : true;
            item.check = check
            item.isIndeterminate_group = isIndeterminate_group
        })
        type==='regions' && (this.az_list = az)
        let check = type==='az' ? 'az_checkAll' : 'checkAll'
        let isIndeterminate = type==='az' ? 'az_isIndeterminate' : 'isIndeterminate'
        this.judge(list,isIndeterminate,check);
    }
    @Watch("customerName")
    private watch_customerName(nv){
        if(nv.length>0){
            this.FnGetRegionAz()
        }

    }
    @Watch("az_list.length")
    private watch_az_len(nv,ov){
        this.watch_az(this.form_data.az)
        // this.setRegionCheckState(this.az_list,'az')
    }
  @Watch("form_data.regions")
  private watch_regions(nv){
      if(nv.length===0){
          this.form_data.az=[]
      }
      this.setRegionCheckState(this.area_list,'regions')
      this.sel_region = this.trans(this.area_list,'regions')
      this.get_area_id('region')
  }
  @Watch("form_data.az")
  private watch_az(nv){
      this.setRegionCheckState(this.az_list,'az')
      this.sel_az = this.trans(this.az_list,'az')
      this.get_area_id('az')
  }
  private judge(list,isIndeterminate,checkAll){//判断全选的
    if(list.every(item=>item.check)){
          this[isIndeterminate] = false
          this[checkAll] = true
      }else{
          if(list.every(item=>!item.isIndeterminate_group && !item.check)){
              this[isIndeterminate] = false
              this[checkAll]=false
          }else{
              this[isIndeterminate] = true
              this[checkAll]=false
          }
      }
  }
    @Emit("get_area_id")
    private get_area_id(label:String){
        let az_ids = []
        this.area_list.map(item=>{
            item.region_list.map(inn=>{
                inn.az_list.map(az=>{
                az_ids.push(az.az_id)
                })
            })
        })
        if(this.area_list.every(item=>!item.check && !item.isIndeterminate_group)){//check是指这一行全选
            return {
                regions:this.getAllIds('area_list'),
                az:az_ids
            }
        }else{
            let temp=[]
            this.area_list.map(item=>{
                item.region_list.map(inn=>{
                        if(this.form_data.regions.includes(inn.region_id)){//当前这个区域被勾选
                            let ids = inn.az_list.map(az=>az.az_id)
                            let fil = this.form_data.az.filter(az=>ids.includes(az))
                            if(fil.length===0){
                                temp=[...temp,...ids]
                            }else{
                                temp=[...temp,...fil]
                            }
                        }
                    })
            })
            return {
                regions:this.form_data.regions,
                az:temp
            }
        }
  }
  getAllIds(list){
      let arr=[]
      this[list].map(item=>{
          item.region_list.map(inn=>{
              arr.push(inn.region_id)
          })
      })
      return arr
  }
  private handleCheckAllChange(val,list){
    let type = list==="az_list" ? 'az' : 'regions'
    this.form_data[type] = val ? this.getAllIds(list) : []
    // this.setRegionCheckState(this[list],type)
  }
  private handleCheckGroupChange(check:boolean,id:string,list){
    let type = list==="az_list" ? 'az' : 'regions'
    this[list].map(item=>{
        if(item.region_group_id===id){
            let ids = item.region_list.map(inn=>inn.region_id)
            if(check){
                this.form_data[type] =[...new Set([...this.form_data[type],...ids])]
            }else{
                this.form_data[type] = this.form_data[type].filter(inn=>!ids.includes(inn))
            }


        }
    })
    // this.setRegionCheckState(this[list],type)

  }

  //将ID转成name
  private trans(list,type){
      let temp:Array<string>=[]
      list.map(item=>{
        item.region_list.map(inn=>{
            if(this.form_data[type].includes(inn.region_id)){
                temp.push(inn.region_name)
            }
        })
      })
      return temp
  }

}
</script>
<style lang="scss" scoped>
.apply{
    .group-title{
        display: flex;
        align-items: center;
    }

    .foot-btn{
        width:100%;
        text-align: right;
        .el-button:first-child{
            margin-right: 10px;
        }
    }
    .check-group{
        display: flex;
    }


}
.no-data{
    text-align: center;
    color: #666;
}
</style>
<style lang="scss">
.el-select-dropdown.el-popper.select-area{
    display: none !important;
}
.el-checkbox-group.group {
    display: inline !important;
}
label.el-checkbox.group-all{
    margin-right: 30px;
}
.divider.el-divider.el-divider--horizontal{
    .el-divider__text.is-left{
        color: #828899 !important;
    }
}
.el-select.region.el-popover__reference{
    .el-tag.el-tag--info .el-tag__close{
        display: none !important;
    }
}
.popper{
    max-height: 500px;
    overflow-y: auto;
}
</style>
