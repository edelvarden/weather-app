This is a "Weather App" project written using [Next.js](https://nextjs.org/) 13 and [OpenWeather](https://openweathermap.org/) API
c
## Getting Started

### Get API key
1. Sign In or Register your [Open Weather](https://home.openweathermap.org/users/sign_in) account
2. Go to the [home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)
3. Click **Generate** button to create your personal API key

### Set Environment Variables
1. Rename `.env.local.example` to `.env.local`, or use the following command:

```
cp .env.example .env.local
```

2. Replace `"your_api_key"` placeholder text to your API key inside `.env.local`, example of file content:

```
NEXT_PUBLIC_OPEN_WEATHER_API_KEY = "your_api_key"
```

### Run in development

Install all dependencies and run in development mode.

```
yarn
yarn dev
```