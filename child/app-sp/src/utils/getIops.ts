interface DiskInfo {
  disk_min: string | number,
  disk_step: string | number,
  min_iops: string | number,
  max_iops: string | number,
  min_throughput:string | number,
  throughput_step:string | number,
  throughput_unit: string,
  max_throughput: string | number,
  iops_step: string | number,
  iops_unit: string,
  [propName: string]: any;
}

export default function getIops(disk_info: DiskInfo, size: number=NaN): any {
  console.log("disk_info",disk_info)
  let step =size ? (size - Number(disk_info.disk_min))/Number(disk_info.disk_step) : 0;
  let iops = Number(disk_info.min_iops) + Number(disk_info.iops_step) * step > disk_info.max_iops ? disk_info.max_iops : Number(disk_info.min_iops) + Number(disk_info.iops_step) * step;
  let throughput = Number(disk_info.min_throughput) + Number(disk_info.throughput_step) * step > disk_info.max_throughput ? disk_info.max_throughput : Number(disk_info.min_throughput) + Number(disk_info.throughput_step) * step;
  return {
    iops_show:iops + ' ' + disk_info.iops_unit,
    throughput_show:throughput + ' ' + disk_info.throughput_unit,
    iops,
    throughput
  }
}
