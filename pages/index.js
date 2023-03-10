import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState, useRef, useEffect } from "react"
import axios from "axios"

export default function Home() {

  const apiKey = '8519782db2afe34f08b16a17026e9a77'
  let lang = 'en'
  let units = 'metric'
  const location = 'Vancouver'
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&lang=${lang}&appid=${apiKey}`

  const [data, setData] = useState(null)
  const [isClient, setIsClient] = useState(false)
  const grabWeather = useRef(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // if (grabWeather.current === true) {
      fetchWeather()
    // }

    return () => {
      grabWeather.current = true;
    }
  }, [grabWeather.current])

  const current = new Date()
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`

  const fetchWeather = async () => {
    const response = await axios.get(url)

    const arrayOfDays = []

    let weatherData = response.data.list.map((weather, index) => {
      console.log(parseInt(weather.dt_txt.substr(8, 2), 10))
      let num = parseInt(weather.dt_txt.substr(8, 2), 10)

      if (num !== arrayOfDays.find(element => element === num)) {
        arrayOfDays.push(num)
        console.log("here")
        console.log(response.data.list[index])

        let month = ''
        let icon = ''

        if (weather.dt_txt.substr(5, 2) == 1) {
          month = 'January'
        } else if (weather.dt_txt.substr(5, 2) == 2) {
          month = 'February'
        } else if (weather.dt_txt.substr(5, 2) == 3) {
          month = 'March'
        } else if (weather.dt_txt.substr(5, 2) == 4) {
          month = 'April'
        } else if (weather.dt_txt.substr(5, 2) == 5) {
          month = 'May'
        } else if (weather.dt_txt.substr(5, 2) == 6) {
          month = 'June'
        } else if (weather.dt_txt.substr(5, 2) == 7) {
          month = 'July'
        } else if (weather.dt_txt.substr(5, 2) == 8) {
          month = 'August'
        } else if (weather.dt_txt.substr(5, 2) == 9) {
          month = 'September'
        } else if (weather.dt_txt.substr(5, 2) == 10) {
          month = 'October'
        } else if (weather.dt_txt.substr(5, 2) == 11) {
          month = 'November'
        } else {
          month = 'February'
        }

        if (weather.weather[0].main == "Clouds") {
          icon = '/icons/broken-clouds.png'
        } else if (weather.weather[0].main == "Clear") {
          icon = '/icons/clear-sky.png'
        } else if (weather.weather[0].main == "Atmosphere") {
          icon = '/icons/mist.png'
        } else if (weather.weather[0].main == "Rain") {
          icon = '/icons/rain.png'
        } else if (weather.weather[0].main == "Drizzle") {
          icon = '/icons/shower-rain.png'
        } else if (weather.weather[0].main == "Snow") {
          icon = '/icons/snow.png'
        } else if (weather.weather[0].main == "Thunderstorm") {
          icon = '/icons/thunderstorm.png'
        }

        let now = new Date(weather.dt_txt)
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let day = days[now.getDay()]

        return (
          <div key={index}>
            <Image
              src={icon}
              alt={icon}
              width={160}
              height={160}
            />

            <p>
              {day} <br /> {month} {weather.dt_txt.substr(8, 2)}, {weather.dt_txt.substr(0, 4)}
            </p>

            <div>
              {weather.main.temp.toFixed(1)}??C
            </div>
            <div>
              {weather.weather.main}
            </div>
          </div>
        )
      }
    })
    console.log(arrayOfDays)
    setData(weatherData)
  }

  return (
    <>
      <Head>
        <title>Trevor Weather</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isClient && <main className={styles.main}>
        <div>
          <Image
            src="/weather-forecast-logo.png"
            alt="Weather Forecast Logo"
            width={400}
            height={200}
          />
        </div>
        <h1>Vancouver, B.C. Weather Forecast</h1>
        <h2>Last updated: {date}</h2>

        <div className={styles.weather}>{isClient && data}</div>
      </main>}
    </>
  )
}
