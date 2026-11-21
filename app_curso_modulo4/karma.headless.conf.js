// Misma suite de Jasmine, pero ejecutada en Chrome Headless (sin emulador):
//   npm run test:unit
// Compila los .spec.ts con webpack + ts-loader y genera el reporte JUnit en reports/junit/.
const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    files: [
      { pattern: 'test-setup/jit.ts', watched: false },
      { pattern: 'src/tests/**/*.spec.ts', watched: false },
    ],
    preprocessors: { 'test-setup/jit.ts': ['webpack'], 'src/tests/**/*.spec.ts': ['webpack'] },
    webpack: {
      mode: 'development',
      devtool: false,
      resolve: { extensions: ['.ts', '.js'] },
      module: {
        rules: [{
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, 'tsconfig.spec.json'),
          },
        }],
      },
    },
    plugins: ['karma-jasmine', 'karma-webpack', 'karma-chrome-launcher', 'karma-junit-reporter'],

    reporters: ['progress', 'junit'],
    junitReporter: {
      outputDir: 'reports/junit',
      useBrowserName: true,
      suite: 'app_curso_modulo4',
    },

    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: { base: 'ChromeHeadless', flags: ['--no-sandbox'] },
    },
    singleRun: true,
  });
};
