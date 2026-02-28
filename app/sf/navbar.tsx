import Link from 'next/link'
import {
    FiHome,
    FiMessageSquare,
    FiUsers,
    FiBell,
    FiCalendar,
    FiBookOpen,
} from 'react-icons/fi'

export default function Navbar() {
    const NAV_ITEMS = [
        { href: '/', icon: FiHome, label: 'Home' },
        { href: '/messages', icon: FiMessageSquare, label: 'Messages' },
        { href: '/friends', icon: FiUsers, label: 'Friends' },
        { href: '/events', icon: FiCalendar, label: 'Events' },
        { href: '/school', icon: FiBookOpen, label: 'School' },
        { href: '/notifications', icon: FiBell, label: 'Notifications', badge: true },
    ]
    return (
        <nav className="flex items-center gap-5 justify-between px-6">
            {NAV_ITEMS.map(({ href, icon: Icon, label, badge }) => (
                <Link
                    key={href}
                    href={href}
                    title={label}
                    aria-label={label}
                    className="relative p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    <Icon className="h-5 w-5" />
                    {badge && (
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                    )}
                </Link>
            ))}
        </nav>
    )
}