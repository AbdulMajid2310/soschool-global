'use client'

import { useTheme } from '@/provider/ThemeProviders'
import { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isToggled, setIsToggled] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsToggled(theme === 'dark')
  }, [theme])

  if (!mounted) return null

  const handleToggle = () => {
    toggleTheme()
    setIsToggled(!isToggled)
  }

  return (
    <button
      onClick={handleToggle}
      className="relative w-16 h-6  rounded-full bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-900 shadow-inner hover:shadow-lg transition-all duration-500 overflow-hidden group"
      aria-label="Toggle theme"
    >
      {/* Efek latar belakang animasi */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-linear-to-r from-yellow-200/20 to-orange-200/20 dark:from-blue-400/20 dark:to-purple-400/20 animate-pulse"></div>
      </div>

      {/* Track/garis untuk toggle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-1 bg-linear-to-r from-transparent via-white/20 to-transparent dark:via-white/10"></div>
      </div>

      {/* Container untuk ikon dan knob */}
      <div 
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white dark:bg-gray-900 shadow-md transition-all duration-500 ease-in-out transform flex items-center justify-center ${
          isToggled ? 'translate-x-8' : 'translate-x-0'
        } group-hover:shadow-xl group-active:scale-95`}
      >
        {/* Ikon Matahari */}
        <div 
          className={`absolute transition-all duration-500 transform ${
            isToggled 
              ? 'opacity-0 rotate-180 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
          }`}
        >
          <FaSun className=" h-2 w-2  text-yellow-500 drop-shadow-sm" />
        </div>

        {/* Ikon Bulan */}
        <div 
          className={`absolute transition-all duration-500 transform ${
            isToggled 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-180 scale-0'
          }`}
        >
          <FaMoon className=" h-2 w-2  text-indigo-400 dark:text-purple-400 drop-shadow-sm" />
        </div>

        {/* Efek cahaya pada knob */}
        <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          isToggled 
            ? 'bg-linear-to-tr from-purple-400/20 to-transparent' 
            : 'bg-linear-to-tr from-yellow-400/20 to-transparent'
        }`}></div>
      </div>

      {/* Bintang animasi untuk mode gelap */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isToggled ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-2 right-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse animation-delay-200"></div>
        <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse animation-delay-400"></div>
        <div className="absolute bottom-1 right-2 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-600"></div>
      </div>

      {/* Sinar matahari animasi untuk mode terang */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        !isToggled ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-8">
          <div className="absolute inset-0 bg-yellow-300/20 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Gaya untuk delay animasi */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </button>
  )
}