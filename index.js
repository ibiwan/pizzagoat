require('dotenv').config();
const { resolve } = require('./src/dependencies');

if (process.argv.length > 2) {
  const { handle } = resolve('commandLineService');
  handle();
} else {
  const { start } = resolve('restApiService');
  start();
}
