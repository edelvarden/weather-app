"use client"
import React, { useState } from "react"
import Layout from "@/components/Layout"
import SearchBar from "@/components/SearchBar"
import WeatherCard from "@/components/WeatherCard"
import { WeatherData } from "@/types/WeatherData"
import { getWeatherData } from "@/utils/api"

const Home: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (query: string) => {
    try {
      const data = await getWeatherData(query)
      setWeather(data)
      setError(null)
    } catch (error) {
      setWeather(null)
      setError("Failed to fetch weather data. Please try again.")
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-md">
        <SearchBar onSearch={handleSearch} />
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {weather && <WeatherCard data={weather} />}
      </div>
    </Layout>
  )
}

export default Home
