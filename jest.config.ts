const { join } = require('path')

module.exports = {
  preset: 'ts-jest',
  rootDir: 'tests',
  testEnvironment: join(__dirname, 'nexus-test-environment.js'),
};
