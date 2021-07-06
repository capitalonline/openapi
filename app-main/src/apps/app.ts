const apps: any[] = [
  {
    name: "app-sp",
    entry: process.env.VUE_APP_SP_ENTRY + "/child/app-sp/",
    container: "#container",
    activeRule: "/app-sp"
  },
  {
    name: "app-op",
    entry: process.env.VUE_APP_OP_ENTRY + "/child/app-op/",
    container: "#container",
    activeRule: "/app-op"
  },
];
export default apps;