const NodeGeocoder = require('node-geocoder');
const myEnv = require("../config/conf");

const options = {
  provider: myEnv.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: myEnv.GEOCODER_API_KEY, // for Mapquest, OpenCage, APlace, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;