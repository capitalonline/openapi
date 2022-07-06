<template>
    <div>
        <back-header :title="title" back_url='/physical'></back-header>
        <el-tabs type="border-card" v-model="active" @tab-click="handleClick">
            <el-tab-pane label="概要" name="0">
                <template v-if="active==='0'">
                    <Info :host_id="id" />
                </template>
            </el-tab-pane>
            <el-tab-pane label="监控" name="1">
                <template v-if="active==='1'">
                    <Monitor :host_id="id" :host_name="title"/>
                </template>
            </el-tab-pane>
            <el-tab-pane label="存储" name="2">
                <template v-if="active==='2'">
                    <Storage :host_id="id" />
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import Service from '../../https/instance/record_detail';
import BackHeader from '../../components/backHeader.vue'
import moment from 'moment';
import Info from './info.vue'
import Monitor from './monitor.vue'
import Storage from './storage.vue'
@Component({
    components:{
        Info,
        Monitor,
        Storage,
        BackHeader
    }
})
export default class Detail extends Vue{
    $route;
    private active:String="0";
    private title:string="";
    private id:string=""
    private handleClick(val){
        console.log("handleClick",val)
    }
    created() {
        this.title = this.$route.query.name
        this.id = this.$route.query.id
        console.log("this.$route",this.$route)
    }
}
</script>
