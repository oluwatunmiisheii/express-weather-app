const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const getCurrentWeather = require('./utils/forecast')

// initialize express
const app = express()
const port = process.env.PORT || 3000

// register public directory for static file rendering
const publicDirectoryPath = path.join(__dirname, '../public')

// used when telling express to ook for template as our render src instead of viewa
const viewsPath = path.join(__dirname,'../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

// mregister hbs templating engine which by default looks to render anything with hbs extension inside views folder except stated otherwise
app.set('view engine', 'hbs')

// make use of custom path
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// makes use of static html pages in public directory
app.use(express.static(path.join(publicDirectoryPath)))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Adenuga'
  }) 
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Adenuga'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    helpText: 'This is a message from the help page',
    name: 'Adenuga'
  })
})

app.get('/weather', (req, res) => {
  const { address } = req.query
  if(!address) {
    return res.send({
      error: 'Please provide an address'
    })
  }

  geocode(address, (geocodingError, data) => {
    if (geocodingError) {
      return res.send({
        error: geocodingError
      })
    }
    getCurrentWeather(data.place_name, data.center[1], data.center[0], (getCurrentWeatherError, forecastData) => {
      if (getCurrentWeatherError) {
        return res.send({
          error: getCurrentWeatherError
        })
      }

      res.send({
        forecast: `it is currently ${forecastData[0]} in ${address}. ${forecastData[1]}`,
        address,
        name: 'Adenuga'
      })
    })
  })

    
  
})

// match any page after help that does not exist
app.get('/help/*', (req, res) => {
  res.render('help', {
    title: '404 Page',
    errorMessage: 'Help article not found',
    name: 'Adenuga'
  })
})

app.get('*', (req, res) => {
  res.render('help', {
    title: '404 Page',
    errorMessage: 'Page not found',
    name: 'Adenuga'
  })
})

// starts up the server and listens on the port provided
app.listen(port, () => {
  console.log('server is up on port' + port)
})