<template>
  <div>
    集群概览页{{cluster_id}}
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class COverview extends Vue{
  @Prop({default:''})cluster_id!:string

}
</script>

<style scoped>

</style>
