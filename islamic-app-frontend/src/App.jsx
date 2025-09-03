import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import QuranSection from './components/QuranSection.jsx'
import AzkarSection from './components/AzkarSection.jsx'
import HadithSection from './components/HadithSection.jsx'
import DuasSection from './components/DuasSection.jsx'
import SadaqaSection from './components/SadaqaSection.jsx'
import TasbihSection from './components/TasbihSection.jsx'
import PrayerTimesSection from './components/PrayerTimesSection.jsx'
import NotificationSettings from './components/NotificationSettings.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    // Check for saved user data
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <Hero />
      <QuranSection />
      <AzkarSection />
      <HadithSection />
      <DuasSection />
      <SadaqaSection />
      <TasbihSection />
      <PrayerTimesSection />
      <NotificationSettings />
      <Footer />
    </div>
  )
}

export default App
