"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';
import {
    FiCalendar, FiMapPin, FiStar, FiSearch, FiZap, FiAward, FiChevronRight, FiGrid, FiList
} from 'react-icons/fi';

// --- TYPES ---
type EventStatus = 'ONGOING' | 'UPCOMING' | 'COMPLETED';
type EventCategory = 'AKADEMIK' | 'LOMBA' | 'OSIS' | 'SEMINAR' | 'SEMUA';

interface SchoolEvent {
    id: string;
    title: string;
    category: Exclude<EventCategory, 'SEMUA'>;
    organizer: string;
    date: string;
    time: string;
    location: string;
    registeredCount: number;
    maxCapacity: number;
    image: string;
    status: EventStatus;
    xpReward: number;
}

// --- EXTENDED REALISTIC DATA ---
const MOCK_EVENTS: SchoolEvent[] = [
    { id: 'ev-1', title: "Lomba Coding Web Design: UI/UX", category: "LOMBA", organizer: "Jurusan RPL", date: "12 FEB", time: "08:00", location: "Lab RPL 1", registeredCount: 38, maxCapacity: 40, image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600", status: 'UPCOMING', xpReward: 350 },
    { id: 'ev-2', title: "Turnamen Basket Classmeet Turnamen Basket Classmeet Turnamen Basket Classmeet", category: "LOMBA", organizer: "OSIS", date: "14 FEB", time: "15:30", location: "Lapangan", registeredCount: 120, maxCapacity: 200, image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600", status: 'ONGOING', xpReward: 200 },
    { id: 'ev-3', title: "Workshop Next.js 15 & Tailwind 4", category: "AKADEMIK", organizer: "SoSchool", date: "18 FEB", time: "09:00", location: "Aula", registeredCount: 45, maxCapacity: 50, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600", status: 'UPCOMING', xpReward: 500 },
    { id: 'ev-4', title: "LDKS Calon Pengurus OSIS", category: "OSIS", organizer: "Kesiswaan", date: "25 FEB", time: "07:00", location: "Villa", registeredCount: 88, maxCapacity: 100, image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600", status: 'UPCOMING', xpReward: 1000 },
    { id: 'ev-5', title: "Seminar Karir: Industri 5.0", category: "SEMINAR", organizer: "Bursa Kerja", date: "02 MAR", time: "10:00", location: "Aula Utama", registeredCount: 190, maxCapacity: 300, image: "https://images.unsplash.com/photo-1475721027785-f74dea327912?auto=format&fit=crop&w=600", status: 'UPCOMING', xpReward: 150 },
    { id: 'ev-6', title: "Tryout UTBK Nasional 2026", category: "AKADEMIK", organizer: "Kurikulum", date: "05 MAR", time: "07:30", location: "Kelas XI", registeredCount: 450, maxCapacity: 500, image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600", status: 'UPCOMING', xpReward: 750 },
];

const EventsPage = () => {
    const [activeTab, setActiveTab] = useState<EventCategory>('SEMUA');
    const [searchQuery, setSearchQuery] = useState('');

    // --- FILTER LOGIC ---
    const filteredEvents = useMemo(() => {
        return MOCK_EVENTS.filter(event => {
            const matchesTab = activeTab === 'SEMUA' || event.category === activeTab;
            const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchQuery]);

    return (
        <div className="min-h-screen bg-[#050811] text-slate-200 pt-20 pb-20 px-4 sm:px-6  relative overflow-hidden font-sans">
            {/* Background Ornaments - No spaces in brackets */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.05)_0%,transparent_40%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.05)_0%,transparent_40%)]" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* --- HEADER --- */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 lg:mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-blue-500">
                                <FiCalendar size={20} />
                            </div>
                            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-400 italic">Timeline 2026</p>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-white leading-none">
                            AGENDA <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-500">SEKOLAH</span>
                        </h1>
                    </div>

                    <div className="flex gap-3 sm:gap-4 w-full md:w-auto">
                        <StatMini icon={<FiZap />} label="XP Pool" value="3.2k" color="text-amber-500" />
                        <StatMini icon={<FiAward />} label="Rank" value="#12" color="text-emerald-500" />
                    </div>
                </header>

                {/* --- FILTER & SEARCH BAR --- */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-4xl p-2 lg:p-3 mb-10 flex flex-col lg:flex-row gap-4 items-center">
                    {/* Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:flex-1 px-2">
                        {['SEMUA', 'AKADEMIK', 'LOMBA', 'OSIS', 'SEMINAR'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as EventCategory)}
                                className={`px-6 lg:px-8 py-3 rounded-3xl text-[10px] font-black tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    {/* Search */}
                    <div className="relative w-full lg:w-80 px-2">
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Cari event atau penyelenggara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-3xl py-3.5 pl-12 pr-6 text-[10px] font-bold text-white outline-none focus:border-blue-500/50 transition-all"
                        />
                    </div>
                </div>

                {/* --- GRID (Muat banyak data & Responsive) --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <EventCard key={event.id} data={event} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-white/5 rounded-4xl border border-dashed border-white/10">
                            <p className="text-slate-500 font-black italic uppercase tracking-widest">Event tidak ditemukan</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const EventCard: React.FC<{ data: SchoolEvent }> = ({ data }) => {
    const router = useRouter()
    const isOngoing = data.status === 'ONGOING';
    const progress = (data.registeredCount / data.maxCapacity) * 100;

    return (
        <div className="group bg-[#0f172a]/40 border border-white/5 rounded-4xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-2xl flex flex-col h-full">
            {/* Thumbnail */}
            <div className="h-44 sm:h-48 relative overflow-hidden">
                <img src={data.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={data.title} />
                <div className="absolute inset-0 bg-linear-to-t from-[#050811] via-transparent to-transparent" />

                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl">
                    <span className="text-[8px] font-black text-white uppercase tracking-widest italic">{data.category}</span>
                </div>

                <div className={`absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 ${isOngoing ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    <div className={`w-1 h-1 rounded-full ${isOngoing ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
                    <span className="text-[8px] font-black uppercase tracking-tighter">{data.status}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6  pt-4 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">{data.organizer}</span>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-500/10 rounded-lg">
                        <FiStar className="text-amber-500 fill-amber-500" size={10} />
                        <span className="text-[10px] font-black text-amber-500">+{data.xpReward} XP</span>
                    </div>
                </div>
                <div className='h-10'>

                    <h3 className="text-sm font-semibold text-white italic capitalize leading-tight group-hover:text-blue-400 transition-colors  line-clamp-2">
                        {data.title}
                    </h3>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mt-2 mb-6 sm:mb-8">
                    <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Waktu</p>
                        <div className="flex items-center gap-2 text-white">
                            <FiCalendar className="text-blue-500" size={12} />
                            <span className="text-[10px] font-black italic uppercase leading-none">{data.date} • {data.time}</span>
                        </div>
                    </div>
                    <div className="space-y-1 text-right">
                        <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Lokasi</p>
                        <div className="flex items-center gap-2 justify-end text-white">
                            <FiMapPin className="text-blue-500" size={12} />
                            <span className="text-[10px] font-black italic uppercase leading-none truncate max-w-20">{data.location}</span>
                        </div>
                    </div>
                </div>

                {/* Capacity Bar */}
                <div className="space-y-2 mb-8">
                    <div className="flex justify-between items-end">
                        <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Pendaftar</p>
                        <p className="text-[10px] font-black text-white">{data.registeredCount}/{data.maxCapacity}</p>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-linear-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ${progress > 90 ? 'from-rose-500 to-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : ''}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <button onClick={()=> router.push('/siswa/events/detail')} className="w-full group/btn flex items-center justify-center gap-3 bg-white text-black py-4 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-blue-600 hover:text-white active:scale-95">
                    Daftar Sekarang <FiChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

const StatMini = ({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
    <div className="bg-white/5 border border-white/5 p-4 px-4 sm:px-6 rounded-4xl flex flex-col items-center flex-1 md:flex-none min-w-25">
        <div className={`${color} mb-1`}>{icon}</div>
        <span className="text-lg font-black italic text-white leading-none">{value}</span>
        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1 text-center">{label}</span>
    </div>
);

export default EventsPage;