// Punto de entrada de `ns test android|ios` (@nativescript/unit-test-runner + Karma + Jasmine)
import { runTestApp } from '@nativescript/unit-test-runner';
declare let require: any;

runTestApp({
  runTests: () => {
    const tests = require.context('./tests', true, /\.spec\.ts$/);
    tests.keys().map(tests);
  },
});
