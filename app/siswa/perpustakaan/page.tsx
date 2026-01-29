"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';
import {
    FiSearch, FiBookmark, FiStar,
    FiChevronRight, FiFilter, FiCheck, FiX
} from 'react-icons/fi';

const INITIAL_BOOKS = [
    { id: '1', title: 'Next.js 14 Revolution', author: 'Majid Amin', category: 'Technology', rating: 4.9, stock: 3, rack: 'A-12', cover: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400', desc: 'The future of web development.' },
    { id: '2', title: 'Cyber Security 101', author: 'Sarah Az', category: 'Technology', rating: 5.0, stock: 0, rack: 'B-02', cover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400', desc: 'Secure your digital life.' },
    { id: '3', title: 'Atomic Habits', author: 'James Clear', category: 'Self Dev', rating: 4.8, stock: 12, rack: 'C-05', cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', desc: 'Small changes, big results.' },
    { id: '4', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Technology', rating: 4.7, stock: 5, rack: 'A-08', cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400', desc: 'Your journey to mastery.' },
    { id: '5', title: 'Business Strategy', author: 'Elon M.', category: 'Business', rating: 4.5, stock: 2, rack: 'D-01', cover: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400', desc: 'How to scale big.' },
];

const StudentLibraryCenter = () => {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [bookingStatus, setBookingStatus] = useState<string | null>(null);
    const router = useRouter();
    const topRef = React.useRef<HTMLDivElement>(null);
    // Fungsi Filter Buku
    const filteredBooks = useMemo(() => {
        return INITIAL_BOOKS.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = activeCategory === "All" || book.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [search, activeCategory]);

    // Fungsi Handle Booking
    const handleBooking = (title: string) => {
        setBookingStatus(title);
        setTimeout(() => setBookingStatus(null), 3000);
    };

    return (
        <div className="h-full bg-[#0F1113] text-gray-300 font-sans selection:bg-emerald-500 selection:text-white pb-32">

            <main className="max-w-7xl mx-auto px-6 pt-10">

                {/* --- HERO BANNER --- */}
                <div className="relative h-80 rounded-[3.5rem] overflow-hidden mb-12 group border border-gray-800">
                    <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600" className="w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-[2s]" alt="Banner" />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0F1113] via-transparent to-transparent" />
                    <div className="absolute bottom-12 left-12 space-y-3">
                        <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white leading-none">
                            Discover <br /> <span className="text-emerald-500">New Worlds</span>
                        </h1>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] pl-1">Jelajahi Digital & Physical Resources</p>
                    </div>
                </div>

                {/* --- BROWSER HEADER & CATEGORIES --- */}
                <section  className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-800 pb-8">
                        <div className="space-y-6 flex-1">
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                                Lib<span className="text-emerald-500">rary</span> Browser
                            </h2>

                            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                                <div className="flex items-center gap-2 bg-[#1A1D1F] px-4 py-2 rounded-xl border border-gray-800 mr-2">
                                    <FiFilter className="text-emerald-500" size={14} />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Filter</span>
                                </div>
                                {["All", "Technology", "Science", "Business", "Self Dev"].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${activeCategory === cat
                                            ? 'bg-emerald-500 text-black border-emerald-400 shadow-lg shadow-emerald-500/20'
                                            : 'bg-[#1A1D1F] text-gray-500 border-gray-800 hover:border-gray-600 hover:text-gray-300'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 max-w-xl">
                            <div className="relative group">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search by title, author, or ISBN..."
                                    className="w-full bg-[#1A1D1F] border border-gray-800 rounded-2xl py-3.5 pl-12 pr-4 text-[10px] font-black uppercase tracking-[0.2em] outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all placeholder:text-gray-600"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- BOOK GRID --- */}
                    <div ref={topRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredBooks.length > 0 ? filteredBooks.map(book => (
                            <div key={book.id} className="group bg-[#1A1D1F]  rounded-xl border border-gray-800/50 hover:border-emerald-500/30 hover:bg-[#222629] transition-all duration-500 shadow-2xl">
                                <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden  shadow-2xl">
                                    <img src={book.cover} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={book.title} />
                                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-[9px] font-black text-emerald-400 uppercase tracking-widest border border-white/10">
                                        {book.rack}
                                    </div>
                                </div>

                                <div className="space-y-3 p-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[9px] font-black uppercase text-emerald-500 tracking-[0.2em]">{book.category}</span>
                                        <div className="flex items-center gap-1.5 text-amber-500 text-[10px] font-black bg-amber-500/5 px-2 py-1 rounded-lg border border-amber-500/10">
                                            <FiStar fill="currentColor" size={10} /> {book.rating}
                                        </div>
                                    </div>
                                    <h3 className="text-base font-black italic uppercase tracking-tighter text-white line-clamp-1 group-hover:text-emerald-500 transition-colors duration-300">
                                        {book.title}
                                    </h3>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 italic">
                                        <span className="w-4 h-px bg-gray-800" /> {book.author}
                                    </p>
                                    <div className="pt-5 flex gap-2">
                                        <button
                                            onClick={() => handleBooking(book.title)}
                                            disabled={book.stock === 0}
                                            className={`flex-1 py-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${book.stock > 0
                                                ? 'bg-emerald-500 text-black hover:bg-white shadow-xl shadow-emerald-500/10 active:scale-95'
                                                : 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700'
                                                }`}
                                        >
                                            {book.stock > 0 ? 'Booking' : 'Out Stock'}
                                        </button>
                                        <button className="p-4 bg-gray-800/50 hover:bg-gray-800 rounded-2xl text-gray-400 hover:text-emerald-500 transition-all border border-gray-700/30">
                                            <FiBookmark size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full py-32 text-center space-y-6 bg-[#1A1D1F] rounded-[4rem] border border-dashed border-gray-800">
                                <div className="bg-gray-800/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                                    <FiSearch size={32} className="text-gray-600" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">No books discovered</p>
                                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic">Try changing your search or filter</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* --- TOAST NOTIFICATION --- */}
            {bookingStatus && (
                <div className="fixed bottom-32 right-10 z-110 animate-in slide-in-from-bottom-10 fade-in duration-500">
                    <div className="bg-emerald-500 text-black p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(16,185,129,0.3)] flex items-center gap-5 border-2 border-emerald-400">
                        <div className="bg-black/10 p-2.5 rounded-xl"><FiCheck size={20} /></div>
                        <div className="pr-4 border-r border-black/10">
                            <p className="text-[10px] font-black uppercase tracking-widest">Success</p>
                            <p className="text-[10px] font-bold italic leading-none mt-1">"{bookingStatus}" Secured.</p>
                        </div>
                        <button onClick={() => setBookingStatus(null)} className="p-1 hover:rotate-90 transition-transform"><FiX size={18} /></button>
                    </div>
                </div>
            )}

            {/* --- FLOATING COMMAND DOCK (BOTTOM RIGHT) --- */}
            <div className="fixed bottom-10 right-10 z-100 flex flex-col items-end gap-6">
                <div className="group flex flex-col items-end gap-3">
                    {/* Pop-up Dashboard on Hover */}
                    <div className="mb-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto">
                        <div className="bg-[#1A1D1F] border border-gray-800 p-6 rounded-[2.5rem] shadow-3xl w-64">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Your Activity</p>
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            </div>
                            <div className="space-y-4 text-white">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-bold uppercase italic">Active Loans</span>
                                    <span className="text-emerald-500 font-black text-sm">02</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-bold uppercase italic">Pending Booking</span>
                                    <span className="text-amber-500 font-black text-sm">01</span>
                                </div>
                            </div>
                            <button
                                onClick={() => router.push('/siswa/perpustakaan/my-shelf')}
                                className="w-full mt-6 py-3 bg-emerald-500 text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-lg"
                            >
                                Manage My Shelf
                            </button>
                        </div>
                    </div>

                    {/* Main Action Dock */}
                    <div className="bg-[#1A1D1F]/90 backdrop-blur-2xl border border-gray-800 p-3 rounded-[3rem] flex items-center gap-3 shadow-2xl">
                        {/* Back to Top */}
                        <button
                            onClick={() => topRef.current?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-12 h-12 bg-[#1A1D1F] border border-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:text-emerald-500 hover:border-emerald-500/50 transition-all shadow-xl active:scale-90"
                        >
                            <FiChevronRight className="-rotate-90" size={18} />
                        </button>
                        <div className="w-px h-8 bg-gray-800 mx-1" />
                        <button
                            onClick={() => router.push('/siswa/perpustakaan/my-shelf')}
                            className="relative group/btn flex items-center gap-3 bg-gray-800/50 hover:bg-emerald-500 p-2 pr-6 rounded-full transition-all duration-500"
                        >
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 group-hover/btn:border-black transition-colors">
                                <img src="https://i.pravatar.cc/150?u=majid" alt="profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-left">
                                <p className="text-[8px] font-black text-gray-500 group-hover/btn:text-black/50 uppercase leading-none mb-1">My Shelf</p>
                                <p className="text-[10px] font-black text-white group-hover/btn:text-black uppercase italic leading-none tracking-tighter">Open Library</p>
                            </div>
                            <div className="absolute -top-1 -left-1 w-5 h-5 bg-emerald-500 text-black text-[9px] font-black flex items-center justify-center rounded-full border-2 border-[#1A1D1F] group-hover/btn:bg-black group-hover/btn:text-emerald-500 transition-colors shadow-lg">
                                3
                            </div>
                        </button>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default StudentLibraryCenter;