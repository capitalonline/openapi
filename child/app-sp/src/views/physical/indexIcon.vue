<template>
    <div class="circle">{{num}}</div>
</template>
<script lang="ts">
import {Vue,Component,Prop} from 'vue-property-decorator';
@Component({})
export default class CircleIcon extends Vue{
    @Prop()num!:number;
}
</script>
<style lang="scss" scoped>
.circle{
    display: inline-block;
    width: 30px;
    line-height: 28px;
    text-align: center;
    border: 1px solid #888;
    border-radius: 30px;
    margin-right: 10px;
}
</style>
