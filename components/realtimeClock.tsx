"use client";

import React, { useState, useEffect } from 'react';

export default function RealtimeClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Format jam, menit, detik
    const formatTime = (date: Date) => {
        const hh = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');
        return { hh, mm, ss };
    };

    // Format tanggal Indonesia
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    const { hh, mm, ss } = formatTime(time);

    return (
        <div className="bg-white dark:bg-slate-900 p-2 px-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden relative group transition-all hover:border-blue-500/50">
            {/* Dekorasi Background */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-all"></div>

            <div className="relative z-10">

                <div>
                    <span className="text-xs  font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tight">
                        {formatDate(time)}
                    </span>
                </div>
                <div className="flex items-baseline gap-1">
                    {/* Jam & Menit */}
                    <h2 className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white leading-none">
                        {hh}<span className="text-blue-600 animate-[pulse_1s_infinite]"> : </span>{mm}
                    </h2>

                    {/* Detik (Lebih kecil agar elegan) */}
                    <span className="text-2xl font-black text-blue-600 italic ml-2 tabular-nums">
                        {ss}
                    </span>
                </div>


            </div>

            {/* Efek Garis Bawah saat Hover */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 group-hover:w-full transition-all duration-500"></div>
        </div>
    );
}