let plugins = [];
if (process.env.NODE_ENV == "production") {
  plugins.push([
    "babel-plugin-transform-remove-console",
    { exclude: ["error", "warn"] },
  ]);
}
plugins.push([
  "component",
  {
    "libraryName": "element-ui",
    "styleLibraryName": "theme-chalk"
  }
]);
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: plugins
}
