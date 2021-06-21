import { registerMicroApps, addGlobalUncaughtErrorHandler, start } from "qiankun";
import apps from "./app";

registerMicroApps(apps, {
  beforeLoad: (app: object) => {
    console.log("beforeLoad")
    return Promise.resolve()
  },
  afterMount: (app: object) => {
    console.log("afterMount")
    return Promise.resolve()
  }
})

export default start;