import React, { useRef } from 'react'
import useGeolocation from 'react-hook-geolocation'
import './App.css'
import useOpenWeather from './useOpenWeather'

function App ({appid}) {
  const bodyEl = useRef(document.body)
  const geolocation = useGeolocation({ enableHighAccuracy: false })
  const weather = useOpenWeather({
    appid: appid,
    lat: geolocation.latitude,
    lon: geolocation.longitude
  })
  const whenTheWeatherIs = (weatherState) => {
    switch (weatherState) {
      case 'rain':
        bodyEl.current.classList.add('rainy_sky')
        break
      case 'clear':
        bodyEl.current.classList.add('clear_sky_blue')
        break
      default:
        bodyEl.current.classList.toggle('moderate')
    }
  }
  const DisplayWeather = ({ city, description }) => {
    return (
      <div>
        <p>{city}</p>
        <p>{description}</p>
      </div>
    )
  }
  return (
    <div className='App'>
      {weather ? (
        <DisplayWeather
          city={weather.name}
          description={weather.weather[0].description}
        />
      ) : (
        '...Loading'
      )}
    </div>
  )
}

export default App
