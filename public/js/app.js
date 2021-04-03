console.log('client side javascript file is loaded')

// fetch puzzle from mead's url
fetch('http://puzzle.mead.io/puzzle')
  .then(response => {
    response.json()
      .then((data) => {
        console.log(data)
      })
  })
  

// select UI elements
const UIsearchWeatherForm = document.querySelector('form')
const UIseachInput = document.querySelector('input')
const UImessageOne = document.querySelector('#message-one')
const UImesssageTwo = document.querySelector('#message-two')

UIsearchWeatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = UIseachInput.value
  fetchLocationData(location)
})


function fetchLocationData(location) {
  UImessageOne.textContent = 'Loading'
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response => {
      response.json()
        .then((data) => {
          if (data.error) {
            UImessageOne.textContent = data.error
          } else {
            UIseachInput.value = ''
            UImessageOne.textContent = data.address
            UImesssageTwo.textContent = data.forecast
          }
        })
    })
}

