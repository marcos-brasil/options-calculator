/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // testRegex: "./lib/**/*.spec.ts",
  // testRegex: "\.\/lib\/european-black-scholes\.spec\.ts$"
  testRegex: "lib/.*.spec.ts$"
  // rootDir: '.'
};