const app = require('./src/app');

exports.handler = async event => {
  const result = await app(event);
  return result;
};
