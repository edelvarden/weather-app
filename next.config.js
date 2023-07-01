/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  experimental: {
    appDir: true
  },
  images: {
    domains: ["openweathermap.org"]
  }
}

module.exports = nextConfig
