import { registerMicroApps, start } from "qiankun";
import apps from "./app";

registerMicroApps(apps, {
  beforeLoad: (app: object) => {
    return Promise.resolve()
  },
  afterMount: (app: object) => {
    return Promise.resolve()
  }
})

export default start;