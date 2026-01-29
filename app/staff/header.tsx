'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/button/ThemeToggle'
import {
    FiHome,
    FiMessageSquare,
    FiUsers,
    FiBell,
    FiCalendar,
    FiBookOpen,
    FiUser,
    FiSettings,
    FiLogOut,
} from 'react-icons/fi'
import { FaChevronLeft, FaSearch } from 'react-icons/fa'
import Navbar from './navbar'
import { IoCloseCircleOutline } from 'react-icons/io5'

const NAV_ITEMS = [
    { href: '/', icon: FiHome, label: 'Home' },
    { href: '/messages', icon: FiMessageSquare, label: 'Messages' },
    { href: '/friends', icon: FiUsers, label: 'Friends' },
    { href: '/events', icon: FiCalendar, label: 'Events' },
    { href: '/school', icon: FiBookOpen, label: 'School' },
    { href: '/notifications', icon: FiBell, label: 'Notifications', badge: true },
]

export default function Header() {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (!target.closest('.profile-menu-container')) {
                setIsProfileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <header className="fixed top-0 inset-x-0 z-30 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
            <div className="flex items-center justify-between px-6 lg:py-3 py-1">

                {/* Left - Logo */}
                <div className="flex items-center gap-2">
                    <img src="/images/logo.png" alt="SoSchool" className="h-10 w-10" />
                    <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                        SoSchool
                    </h1>
                </div>

                {/* Center */}
                <div className="flex items-center gap-6 flex-1 justify-center">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Cari..."
                        className="w-64 rounded-lg hidden lg:inline border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Navigation */}
                    <div className='hidden lg:inline'>

                        <Navbar />
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">


                    {/* Profile */}
                    <div className="relative profile-menu-container">
                        <div className='flex gap-4 items-center'>

                            <div className='lg:hidden'>
                                <button onClick={() => setSearchOpen(true)} className='p-3'><FaSearch /></button>
                            </div>
                            <button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="h-9 w-9 rounded-full bg-blue-500 text-white font-semibold hover:ring-2 hover:ring-blue-300"
                            >
                                <img src="https://i.pravatar.cc/150" alt="" className='h-full w-full object-cover rounded-full' />
                            </button>
                        </div>


                    </div>
                </div>


            </div>
            <div className='lg:hidden'>
                <Navbar />
            </div>
            {searchOpen && (
                <div className='h-screen bg-white dark:bg-gray-800 absolute mt-2 top-0 w-full'>

                    <div className=" flex gap-2 items-center    p-3">
                        <div onClick={() => setSearchOpen(false)}>

                            <button><FaChevronLeft className='text-xl ' /></button>
                        </div>
                        <div className='w-full px-3 py-2 flex rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>

                            <input
                                type="text"
                                placeholder="Cari..."
                                className="  outline-none w-full text-sm "
                                autoFocus
                            />
                            <div>

                                <button ><IoCloseCircleOutline /></button>
                            </div>
                        </div>
                    </div>
                    <div className='space-y-2 px-3 w-full'>
                        {[1, 2, 3, 4].map((i) => (

                            <div className='flex items-center w-full gap-4  p-2'>
                                <div>

                                    <div className='h-10 w-10'>
                                        <img src="https://i.pravatar.cc/150" alt="user" className='h-full w-full rounded-full' />
                                    </div>
                                </div>
                                <div className='w-full'>

                                    <p>Abdul Majid</p>
                                    <div className='text-xs flex justify-between items-center w-full'>

                                        <p >SMAN 1 Pedes Karawang</p>
                                        <p>Siswa</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}
            {isProfileMenuOpen && (
                <div className="absolute top-14 right-0 mt-2 w-48 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg overflow-hidden">
                    <div className='w-full'>

                        <div className=' w-full flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700'>
                            <p>Mode</p>
                            <ThemeToggle />
                        </div>
                    </div>
                    <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <FiUser /> Profil
                    </Link>
                    <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <FiSettings /> Pengaturan
                    </Link>
                    <div className="border-t dark:border-gray-700" />
                    <Link
                        href="/logout"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
                    >
                        <FiLogOut /> Keluar
                    </Link>
                </div>
            )}
        </header>
    )
}
