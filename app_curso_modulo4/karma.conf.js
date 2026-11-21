// Configuración de Karma para `ns test android` / `ns test ios`
// (10) Incluye karma-junit-reporter: al terminar genera reports/junit/TESTS-*.xml
module.exports = function (config) {
  const options = {
    basePath: '',
    frameworks: ['jasmine'],
    files: ['src/tests/**/*.spec.ts'],
    exclude: [],
    preprocessors: {},

    reporters: ['progress', 'junit'],
    junitReporter: {
      outputDir: 'reports/junit', // carpeta de salida (relativa a basePath)
      outputFile: undefined,      // un archivo TESTS-<navegador>.xml por dispositivo
      useBrowserName: true,
      suite: 'app_curso_modulo4',
    },

    hostname: '127.0.0.1',
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [],
    customLaunchers: {
      android: { base: 'NS', platform: 'android' },
      ios: { base: 'NS', platform: 'ios' },
    },
    singleRun: false,
  };

  config.set(options);
};
