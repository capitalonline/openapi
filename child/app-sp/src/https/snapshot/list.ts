import service from '../http'
import { getEcsOptions,getSnapshotOptions }from '../common'

export default {
    get_snapshot_list(reqData) {
        return service(getEcsOptions('POST', '/snapshot/snapshot_list/', reqData))
    },
    get_snapshot_chains_list(reqData) {  // 快照链列表
        return service(getEcsOptions('POST', '/snapshot/snapshot_chains_list/', reqData))
    },
    chains_detail(reqData) {  // 快照链详情
        return service(getEcsOptions('GET', '/snapshot/snapshot_chains_detail/', reqData))
    },
    record(reqData) {  // 快照链详情
        return service(getEcsOptions('GET', '/snapshot/history_record/', reqData))
    },
    get_monitor_id(reqData) {  // 快照链详情
        return service(getEcsOptions('GET', '/snapshot/snapshot_disk_ids/', reqData))
    },
    get_snapshot_info(reqData){
        return service(getSnapshotOptions('POST','/snapshot/snapshot_use_monitor', reqData))
    }
}