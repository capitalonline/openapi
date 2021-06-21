import service from "./http"

export default {
  // 获取项目列表
  get_project_list() {
    return service({
      method: "GET",
      url: "/api/v1/project"
    })
  },
  // 创建项目
  create_project(reqData :any) {
    return service({
      method: "POST",
      url: "/api/v1/project",
      data: reqData
    })
  },
  // 更新项目
  update_project(reqData :any) {
    return service({
      method: "PUT",
      url: "/api/v1/project",
      data: reqData
    })
  },
  // 删除项目
  delete_project(reqData :any) {
    return service({
      method: "DELETE",
      url: "/api/v1/project",
      params: reqData
    })
  }
}