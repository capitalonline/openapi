import service from "../http"

export default {
  // 获取子任务配置列表
  get_subtask_list(reqData: any = {}) {
    return service({
      method: "GET",
      url: "/api/v1/subtask/configuration",
      params: reqData
    })
  },
  // 添加子任务配置
  add_subtask(reqData: any) {
    return service({
      method: "POST",
      url: "/api/v1/subtask/configuration",
      data: reqData
    })
  },
  // 更新子任务配置
  update_subtask(reqData: any) {
    return service({
      method: "PUT",
      url: "/api/v1/subtask/configuration",
      data: reqData
    })
  },
  // 删除子任务配置
  delete_subtask(reqData: any) {
    return service({
      method: "DELETE",
      url: "/api/v1/subtask/configuration",
      params: reqData
    })
  }
}