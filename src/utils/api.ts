import axios from "axios"
import { WeatherData } from "@/types/WeatherData"

const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY

export const getWeatherData = async (query: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
    )

    return response.data
  } catch (error) {
    throw new Error("Failed to fetch weather data")
  }
}
