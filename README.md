# Weather App

This is a Weather App project written using [Next.js](https://nextjs.org/) 13 and the [OpenWeather](https://openweathermap.org/) API.

## Getting Started

### Get API key

1. Sign in or register your [OpenWeather](https://home.openweathermap.org/users/sign_in) account.
2. Go to [home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys).
3. Click the **Generate** button to create your personal API key.

### Set Environment Variables

1. Rename `.env.local.example` to `.env.local`, or use the following command:

   ```
   cp .env.local.example .env.local
   ```

2. Replace the placeholder text `"your_api_key"` with your API key inside `.env.local`. Here's an example of the file content:

   ```
   NEXT_PUBLIC_OPEN_WEATHER_API_KEY="your_api_key"
   ```

### Run in development

Install all dependencies and run in development mode:

```
yarn
yarn dev
```
