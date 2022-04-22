<template>
    <div class="box">
        overview
        <!-- <el-card v-for="(item,key) in header_info" :key="key">

        </el-card> -->
    </div>
</template>
<script lang="ts">
import {Vue} from 'vue-property-decorator'
export default class OverView extends Vue{
    private header_info:any={
        CPU:{
            name:'CPU',
            total_label:'逻辑总核数:',
            total:2700,
            remain_label:'可用',
            remain:'80%',
            use:'20%',
            count:'100%',
            alloted:'2600核',
            allot_percent:'96%'
        },
        memory:{
            name:'内存',
            total_label:'总容量:',
            total:'1.25TB',
            remain_label:'可用',
            remain:'8.44TB',
            use:'1.25TB',
            count:'9.69TB',
            alloted:'4.56TB',
            allot_percent:'60%'
        },
        GPU:{
            name:'GPU',
            total_label:'总块数:',
            total:800,
            remain_label:'可分配',
            remain:'22块',
            use:'',
            count:'',
            alloted:'22块',
            allot_percent:'16%'
        },
        storage:{
            name:'GPU',
            total_label:'总容量:',
            total:'4.22TB',
            remain_label:'可用',
            remain:'2.22TB',
            use:'2TB',
            count:'4.22TB',
            alloted:'2.6TB',
            allot_percent:'96%'
        },
    }
  
}
</script>