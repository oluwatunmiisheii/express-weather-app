const request = require('request')

// open weather request
const weatherRequestOptions = {
  method: 'GET',
  url: 'https://rapidapi.p.rapidapi.com/weather',
  json: true,
  qs: {
    id: '2172797',
    lang: 'en',
    units: 'metric',
    mode: 'xml, html'
  },
  headers: {
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    'x-rapidapi-key': '7ac7187514mshdb9d7deb6abf8edp1d5bb7jsnb12a298f5a3a',
    useQueryString: true
  }
};

const getCurrentWeather = (place, latitude, longitude, callback) => {

  weatherRequestOptions.qs.q = place
  weatherRequestOptions.qs.lat = latitude
  weatherRequestOptions.qs.lon = longitude

  request(weatherRequestOptions, (error, response) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (response.body.error) {
      callback('Unable to find location, Try another search', undefined);
    } else {
      const data = response.body
      if(data.cod === '404') {
        callback(data.message, undefined)
      } else {
        callback(undefined, [data.main.temp, data.weather[0].description])
      }
      // console.log(chalk.blue.inverse(`it is currently ${data.main.temp} degrees out. ${data.weather[0].description}`));
    }
  })
}

module.exports = getCurrentWeather