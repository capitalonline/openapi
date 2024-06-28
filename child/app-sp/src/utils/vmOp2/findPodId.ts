import store from "@/store/index"
export function findPodIdByClusterId(id) {
  for (let pod of store.state.tree_list) {
    for (let cluster of pod.children) {
      if (cluster.cluster_id === id) {
        console.log('&&&',pod.id)
        return pod.pod_id;
      }
    }
  }
  return null;
}
export function findPodIdByHostId(id) {
  for (let pod of store.state.tree_list) {
      for (let cluster of pod.children || []) {
          for (let host of cluster.children || []) {
            if (host.host_id === id) {
              return pod.pod_id;
            }
          }
      }
  }
  return null; // 如果未找到匹配的 host_id，则返回 null
}
