'use client'

import React from 'react'
import Sidebar from './sidebar'
import Header from './header'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="z-40">
        <Header  />
      </div>

      {/* Main Content */}
      <div className="flex transition-all duration-300">
        <div className='h-screen sticky top-0'>

        <Sidebar />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto py-20 px-4 text-gray-800 dark:text-gray-100">
          {children}
        </main>
      </div>
    </div>
  )
}
