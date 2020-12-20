import { useState, useEffect } from 'react'

const useOpenWeather = ({
  url = '//api.openweathermap.org/data/2.5/weather',
  lat = null,
  lon = null,
  appid,
  zip = null,
  units = 'imperial'
}) => {
  const [result, setResult] = useState()
  const getWeather = async () => {
    try {
      const query = `?appid=${appid}${lat && `&lat=` + lat}${lon &&
        `&lon=` + lon}&units=${units}${zip ? `&zip=` + zip : ''}`
      const response = await fetch(url + query)
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
  useEffect(() => {
    const setWeatherResults = async () => {
      const data = await getWeather()
      setResult(data)
      return data
    }
    if(url && lat && lon && appid) {
      setWeatherResults()
    }
  }, [url, lat, lon, appid, zip, units])
  return result
}
export default useOpenWeather
