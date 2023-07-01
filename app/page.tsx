'use client'
import React, { useState } from "react"
import Head from "next/head"
import Layout from "../components/Layout"
import SearchBar from "../components/SearchBar"
import WeatherCard from "../components/WeatherCard"
import { WeatherData } from "../types/WeatherData"
import { getWeatherData } from "../utils/api"

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
      <Head>
        <title>Weather App</title>
      </Head>
      <div className="max-w-md mx-auto">
        <SearchBar onSearch={handleSearch} />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {weather && <WeatherCard data={weather} />}
      </div>
    </Layout>
  )
}

export default Home
