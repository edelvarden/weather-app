import React from "react"
import { WeatherData } from "../types/WeatherData"

interface WeatherCardProps {
  data: WeatherData
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const { name, main, weather, wind } = data

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-md shadow">
      <h2 className="text-xl font-semibold">{name}</h2>
      <div className="flex items-center justify-between mt-2">
        <div>
          <p className="text-4xl font-bold">{Math.round(main.temp)}°C</p>
          <p className="text-gray-600">{weather[0].description}</p>
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
          alt={weather[0].description}
          className="w-16 h-16"
        />
      </div>
      <div className="mt-4">
        <p>
          <span className="font-semibold">Feels like:</span>{" "}
          {Math.round(main.feels_like)}°C
        </p>
        <p>
          <span className="font-semibold">Humidity:</span> {main.humidity}%
        </p>
        <p>
          <span className="font-semibold">Wind Speed:</span> {wind.speed} m/s
        </p>
      </div>
    </div>
  )
}

export default WeatherCard
