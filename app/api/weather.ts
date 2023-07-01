import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY ?? ""

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" })
    return
  }

  const { query } = req.query

  if (!query) {
    res.status(400).json({ message: "Missing query parameter" })
    return
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
    )

    const weatherData = response.data
    res.status(200).json(weatherData)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}
