<template>
    <div>

    </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import Service from '../../https/overview'
@Component
export default class OverViewMonitor extends Vue{
    private hostTypes:any=[];

    created() {
        this.getHostTypes()
    }
    private async getHostTypes(){
        let res:any = await Service.get_host_type({})
        if(res.code==="Success"){
            this.hostTypes = res.data.host_product_list;
        }
    }
}
</script>