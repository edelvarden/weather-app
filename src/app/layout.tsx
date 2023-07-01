import clsx from "clsx"
import "@/styles/globals.css"

import { Poppins } from "next/font/google"

export const metadata = {
  title: "Weather App",
  description: "Weather App written using Next.js 13 and the OpenWeather API"
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx(font.className, "")}>{children}</body>
    </html>
  )
}
