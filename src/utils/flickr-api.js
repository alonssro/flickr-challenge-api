const axios = require('axios');

module.exports = axios.create({
  baseURL: 'https://www.flickr.com/services/rest'
});
