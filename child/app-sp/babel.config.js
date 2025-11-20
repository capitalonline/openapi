module.exports = {
  presets: [
        '@vue/cli-plugin-babel/preset',
      "@babel/preset-env"
  ],
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-syntax-dynamic-import",
    ["babel-plugin-transform-remove-console", { "exclude": ["error", "warn"] }]
 ]
}