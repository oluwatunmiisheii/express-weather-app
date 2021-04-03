const request = require('request')

const geoCodeRequestOptions = {
  method: 'GET',
  json: true,
  qs: {
    q: 'los angeles',
    limit: 1,
    access_token: "pk.eyJ1IjoidHVubWlpIiwiYSI6ImNrZ21nbXYyeTFyZ3UydHRldHV4bzI1cTcifQ.NhFnFZog_d7tNGQMLIr30Q",
  },
  headers: {
    useQueryString: true
  }
};

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`
  geoCodeRequestOptions.url = url
  request(geoCodeRequestOptions, (error, response) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (response.body.features.length === 0) {
      callback('Unable to find location, Try another search', undefined);
    } else {
      const { center, place_name } = { ...response.body.features[0] }
      callback(undefined, { center, place_name });
    }

  })
}

module.exports = geocode