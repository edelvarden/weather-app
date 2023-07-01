import React from "react"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 py-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold">Weather App</h1>
        </div>
      </header>
      <main className="container mx-auto py-8">{children}</main>
      <footer className="bg-gray-300 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Weather App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout
