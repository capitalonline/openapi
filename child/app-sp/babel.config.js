let plugins = [];
if (process.env.NODE_ENV == "production") {
  plugins.push([
    "babel-plugin-transform-remove-console",
    { exclude: ["error", "warn"] },
  ]);
}
plugins.push("@babel/plugin-proposal-optional-chaining","@babel/plugin-syntax-dynamic-import",)
module.exports = {
  presets: [
        '@vue/cli-plugin-babel/preset',
      "@babel/preset-env"
  ],
  plugins: plugins
}