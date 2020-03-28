const flickrApi = require('./utils/flickr-api');
const httpResponse = require('./utils/httpResponse');

module.exports = async event => {
  const { FLICKR_API_KEY: api_key } = process.env;
  let response;
  console.log('Starting  process');

  const body = JSON.parse(event.body);

  console.log('Request Body', body);

  const { text = '' } = body;
  if (!text) return httpResponse.badRequest('Text field is empty', httpResponse.TYPE.MESSAGE);

  console.log('Making request to Flickr photos');

  try {
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
    response = httpResponse.ok(photo, httpResponse.TYPE.JSON);
  } catch (error) {
    console.log(error);
    response = httpResponse.internalServerError(`Something went wrong: ${error}`);
  }

  return response;
};
