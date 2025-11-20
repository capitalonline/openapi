module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["babel-plugin-transform-remove-console", { "exclude": ["error", "warn"] }]
  ]
}
