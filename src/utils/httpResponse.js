module.exports.TYPE = {
  JSON: 0,
  MESSAGE: 1
};

module.exports.ok = (message, type, headers) => {
  return getResponse(200, message, type, headers);
};
module.exports.created = (message, type, headers) => {
  return getResponse(201, message, type, headers);
};
module.exports.accepted = (message, type, headers) => {
  return getResponse(202, message, type, headers);
};
module.exports.noContent = (message, type, headers) => {
  return getResponse(204, message, type, headers);
};
module.exports.partialContent = (message, type, headers) => {
  return getResponse(206, message, type, headers);
};
module.exports.redirect = (message, type, headers) => {
  return getResponse(302, message, type, headers);
};
module.exports.notModified = (message, type, headers) => {
  return getResponse(304, message, type, headers);
};
module.exports.badRequest = (message, type, headers) => {
  return getResponse(400, message, type, headers);
};
module.exports.unauthorized = (message, type, headers) => {
  return getResponse(401, message, type, headers);
};
module.exports.forbidden = (message, type, headers) => {
  return getResponse(403, message, type, headers);
};
module.exports.notFound = (message, type, headers) => {
  return getResponse(404, message, type, headers);
};
module.exports.conflict = (message, type, headers) => {
  return getResponse(409, message, type, headers);
};
module.exports.gone = (message, type, headers) => {
  return getResponse(410, message, type, headers);
};
module.exports.unprocessableEntity = (message, type, headers) => {
  return getResponse(422, message, type, headers);
};
module.exports.internalServerError = (message, type, headers) => {
  return getResponse(500, message, type, headers);
};
module.exports.badGateway = (message, type, headers) => {
  return getResponse(502, message, type, headers);
};
module.exports.gatewayTimeout = (message, type, headers) => {
  return getResponse(504, message, type, headers);
};

const getResponse = (statusCode, body, type, headers) => {
  switch (statusCode) {
    case 200:
    case 201:
    case 202:
    case 204:
    case 206:
    case 302:
    case 304:
    case 400:
    case 401:
    case 403:
    case 404:
    case 409:
    case 410:
    case 422:
    case 500:
    case 502:
    case 504:
      break;
    default:
      throw new Error(`${statusCode} - ${body}`);
  }

  if (!(typeof headers === 'object') && !Array.isArray(headers)) {
    headers = {};
  }

  let response = {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers
  };

  if (statusCode === 302) {
    delete response.body;
  }

  if (headers['Content-Type']) {
    return response;
  } else {
    switch (type) {
      case this.TYPE.JSON:
        headers = Object.assign(headers, {
          'Content-Type': 'api-application/json'
        });
        break;
      case this.TYPE.MESSAGE:
      default:
        body = { message: body };
        headers = Object.assign(headers, {
          'Content-Type': 'api-application/json'
        });
        break;
    }
    return response;
  }
};
