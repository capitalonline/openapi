import service from '../http'
import { getEcsOptions }from '../common'

export default {
    get_snapshot_list(reqData) {
        return service(getEcsOptions('GET', '/snapshot/snapshot_list/', reqData))
    },
    get_snapshot_chains_list(reqData) {  // 快照链列表
        return service(getEcsOptions('GET', '/snapshot/snapshot_chains_list/', reqData))
    },
    chains_detail(reqData) {  // 快照链详情
        return service(getEcsOptions('GET', '/snapshot/snapshot_chains_detail/', reqData))
    },

}