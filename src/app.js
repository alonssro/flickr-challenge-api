const flickrApi = require('./utils/flickr-api');
const httpResponse = require('./utils/httpResponse');

module.exports = async event => {
  const { FLICKR_API_KEY: api_key } = process.env;

  const body = JSON.parse(event.body);
  const { text = '' } = body;
  if (!text) return httpResponse.badRequest('Text field is empty', httpResponse.TYPE.MESSAGE);
  const {
    data: {
      photos: { photo }
    }
  } = await flickrApi.get('/', {
    params: {
      api_key,
      text,
      method: 'flickr.photos.search',
      format: 'json',
      nojsoncallback: 1
    }
  });

  return httpResponse.ok(photo, httpResponse.TYPE.JSON);
};
