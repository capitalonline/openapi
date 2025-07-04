// jest.config.js
module.exports = {
    // 其他配置...
    moduleFileExtensions: ['js','ts', 'json', 'vue'],
    transform: {
      '^.+\\.js$': 'babel-jest',
      '^.+\\.ts$': 'ts-jest',
      '^.+\\.vue$': 'vue-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!(@vue|vue-router|vuex)/)'],
  };