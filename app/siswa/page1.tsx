"use client";

import React, { useState, useEffect } from 'react';
import { FaCalculator } from 'react-icons/fa';
import { 
  FiHome, FiBookOpen, FiAward, FiCreditCard, FiCalendar, FiClock, FiAlertCircle, 
  FiCheckCircle, FiFileText, FiSearch, FiBell, FiBook, FiMessageSquare,
  FiUpload, FiZap, FiUsers, FiGlobe, FiStar, FiTarget, FiCode, 
  FiChevronRight, FiDownload, FiPlayCircle, FiBarChart2, FiPieChart
} from 'react-icons/fi';
import { GiTrophy, GiBasketballBasket, GiMusicalNotes, GiAtomicSlashes } from 'react-icons/gi';

// =============================================================================
// DATA DUMMY DETAILED (Database Mockup)
// =============================================================================
const SO_DATA = {
  user: {
    name: "Siti Nurhaliza",
    nisn: "0092837465",
    level: "Grade 11 - Science 1",
    points: 4850,
    rank: 4,
    attendance: 98,
    gpa: 3.89,
    avatar: "SN"
  },
  subjects: [
    { 
      id: "MAT", name: "Matematika", teacher: "Drs. Mulyadi", progress: 75, icon: <FaCalculator/>, color: "text-blue-500", bg: "bg-blue-50",
      topics: [
        { title: "Trigonometri Lanjut", status: "completed", date: "12 Jan" },
        { title: "Integral Subtitusi", status: "ongoing", date: "Now" }
      ]
    },
    { 
      id: "PHY", name: "Fisika", teacher: "Ibu Ratna, M.Pd", progress: 40, icon: <GiAtomicSlashes />, color: "text-purple-500", bg: "bg-purple-50",
      topics: [
        { title: "Hukum Termodinamika", status: "locked", date: "Feb" }
      ]
    }
  ],
  assignments: [
    { id: 1, subject: "Biologi", title: "Praktikum Sel Hewan", deadline: "2 Jam lagi", type: "Laboratorium", difficulty: "Hard", xp: 500 },
    { id: 2, subject: "B. Inggris", title: "Narrative Essay", deadline: "Besok", type: "Writing", difficulty: "Medium", xp: 200 }
  ],
  announcements: [
    { title: "Study Tour Bali 2026", date: "Jan 28", tag: "Event" },
    { title: "Ujian Tengah Semester", date: "Feb 15", tag: "Academic" }
  ]
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const SoSchoolSiswaPro: React.FC = () => {
  const [view, setView] = useState<'home' | 'academic' | 'tasks' | 'ekskul' | 'social' | 'report'>('home');
  const [activeSubject, setActiveSubject] = useState<any>(null);

  // --- SUB-VIEW: HOME DASHBOARD ---
  const HomeView = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="relative z-10">
            <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 inline-block shadow-lg shadow-blue-500/30">Academic Year 2025/2026</span>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Semangat Belajar, <span className="text-blue-600">{SO_DATA.user.name.split(' ')[0]}!</span></h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed max-w-md">"Ilmu adalah harta yang bisa kamu bawa kemana saja tanpa merasa berat."</p>
          </div>
          <div className="flex gap-6 mt-10 relative z-10">
            <div className="text-center">
              <p className="text-2xl font-black italic">{SO_DATA.user.attendance}%</p>
              <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Kehadiran</p>
            </div>
            <div className="w-px h-10 bg-gray-100 dark:bg-gray-800" />
            <div className="text-center">
              <p className="text-2xl font-black italic">{SO_DATA.user.gpa}</p>
              <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Rata-Rata Nilai</p>
            </div>
            <div className="w-px h-10 bg-gray-100 dark:bg-gray-800" />
            <div className="text-center">
              <p className="text-2xl font-black italic">#{SO_DATA.user.rank}</p>
              <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Peringkat Kelas</p>
            </div>
          </div>
          <FiStar className="absolute -right-10 -top-10 text-yellow-400/10 w-64 h-64" />
        </div>

        <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-black uppercase opacity-60 tracking-[0.3em] mb-1">Scholar Points</p>
              <h3 className="text-5xl font-black italic tracking-tighter">{SO_DATA.user.points.toLocaleString()} <span className="text-xs not-italic opacity-50 uppercase tracking-widest">XP</span></h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="flex justify-between text-[9px] font-black uppercase mb-2">
                  <span>Level {Math.floor(SO_DATA.user.points/1000)}</span>
                  <span>Next Level: {Math.ceil((SO_DATA.user.points+1)/1000)*1000}</span>
                </div>
                <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full shadow-[0_0_10px_white]" style={{width: '65%'}} />
                </div>
              </div>
              <button className="w-full py-4 bg-white text-blue-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl">Redeem Rewards</button>
            </div>
          </div>
          <FiAward className="absolute -right-5 -top-5 text-white/5 w-48 h-48 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
        </div>
      </div>

      {/* Assignments & Calendar Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-6">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3"><FiClock className="text-orange-500"/> Tugas & Deadline</h3>
            <button className="text-[9px] font-black text-blue-600 uppercase border-b-2 border-blue-600">Lihat Semua</button>
          </div>
          {SO_DATA.assignments.map(task => (
            <div key={task.id} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 flex justify-between items-center group cursor-pointer hover:border-blue-400 transition-all shadow-xs">
              <div className="flex gap-5 items-center">
                <div className={`w-14 h-14 ${task.id === 1 ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'} rounded-2xl flex items-center justify-center text-xl`}>
                  {task.id === 1 ? <FiAlertCircle/> : <FiFileText/>}
                </div>
                <div>
                  <h4 className="font-black dark:text-white uppercase italic text-sm tracking-tight">{task.title}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{task.subject} • Deadline: <span className="text-red-500">{task.deadline}</span></p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-black bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg uppercase tracking-widest">+{task.xp} XP</span>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 border border-gray-100 dark:border-gray-800">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3"><FiBell className="text-blue-600"/> Papan Pengumuman</h3>
          <div className="space-y-4">
            {SO_DATA.announcements.map((ann, i) => (
              <div key={i} className="flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-gray-200">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-[10px] font-black text-gray-400 shrink-0 uppercase">
                  {ann.date.split(' ')[0]}<br/>{ann.date.split(' ')[1]}
                </div>
                <div>
                  <span className="text-[8px] font-black uppercase text-blue-600 tracking-widest">{ann.tag}</span>
                  <h5 className="text-xs font-black dark:text-white uppercase mt-1 leading-tight tracking-tight">{ann.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  // --- SUB-VIEW: ACADEMIC DETAIL ---
  const AcademicView = () => (
    <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
      <header>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Kurikulum Merdeka</h2>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">Mata Pelajaran & Materi Digital</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SO_DATA.subjects.map(sub => (
          <div key={sub.id} onClick={() => setActiveSubject(sub)} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8 hover:shadow-2xl transition-all cursor-pointer group">
            <div className={`w-16 h-16 ${sub.bg} ${sub.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
              {sub.icon}
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-1">{sub.name}</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">{sub.teacher}</p>
            
            <div className="space-y-4">
               <div className="flex justify-between items-end mb-1">
                  <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Learning Progress</span>
                  <span className={`text-xs font-black ${sub.color}`}>{sub.progress}%</span>
               </div>
               <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full ${sub.color.replace('text', 'bg')} rounded-full shadow-lg`} style={{width: `${sub.progress}%`}} />
               </div>
            </div>
            
            <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-50 dark:border-gray-800">
               <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[8px] font-black text-gray-400 italic">M1</div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[8px] font-black text-gray-400 italic">M2</div>
               </div>
               <FiChevronRight className="text-gray-300 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Modul Pop-up (Simplified) */}
      {activeSubject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6" onClick={() => setActiveSubject(null)}>
          <div className="bg-white dark:bg-gray-950 w-full max-w-4xl rounded-[3rem] p-10 overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-10">
              <div>
                <h4 className="text-3xl font-black italic uppercase tracking-tighter">{activeSubject.name}</h4>
                <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">{activeSubject.teacher}</p>
              </div>
              <button onClick={() => setActiveSubject(null)} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><FiZap/></button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Materi Pembelajaran</p>
                {activeSubject.topics.map((t: any, i: number) => (
                  <div key={i} className="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl flex justify-between items-center group cursor-pointer hover:bg-white border border-transparent hover:border-blue-100 shadow-xs transition-all">
                    <div className="flex gap-4 items-center">
                      <FiPlayCircle className="text-blue-600" />
                      <span className="text-xs font-black uppercase italic tracking-tight">{t.title}</span>
                    </div>
                    <span className="text-[8px] font-black bg-blue-100 text-blue-600 px-2 py-1 rounded-md">{t.date}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h5 className="text-xl font-black italic uppercase mb-2">Quiz Center</h5>
                  <p className="text-[9px] font-medium text-gray-400 uppercase tracking-widest mb-6">Uji pemahamanmu dengan kuis interaktif</p>
                  <button className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/40">Mulai Kuis Sekarang</button>
                </div>
                <FiTarget className="absolute -right-4 -bottom-4 text-white/5 w-40 h-40" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 overflow-hidden">
      
      {/* SIDEBAR: MAIN LLMS */}
      <aside className="w-72 bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 hidden lg:flex flex-col z-40 transition-all duration-300">
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-12 group cursor-pointer">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl italic shadow-2xl shadow-blue-500/40 group-hover:rotate-12 transition-transform">S</div>
            <div>
              <h1 className="text-xl font-black tracking-tighter italic uppercase leading-none">SO<span className="text-blue-600">SCHOOL</span></h1>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Student Portal</p>
            </div>
          </div>
          
          <nav className="space-y-1">
             <SidebarBtn active={view === 'home'} onClick={() => setView('home')} icon={<FiHome/>} label="Home Dashboard" />
             <SidebarBtn active={view === 'academic'} onClick={() => setView('academic')} icon={<FiBookOpen/>} label="Mata Pelajaran" />
             <SidebarBtn active={view === 'tasks'} onClick={() => setView('tasks')} icon={<FiFileText/>} label="Tugas & Kuis" />
             <SidebarBtn active={view === 'report'} onClick={() => setView('report')} icon={<FiBarChart2/>} label="Rapor Digital" />
          </nav>

          <div className="space-y-1 mt-10">
             <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 ml-4 italic">Resources</p>
             <SidebarBtn active={view === 'ekskul'} onClick={() => setView('ekskul')} icon={<FiStar/>} label="Ekstrakurikuler" />
             <SidebarBtn active={false} onClick={() => {}} icon={<FiCreditCard/>} label="SoPay Balance" />
          </div>
        </div>

        <div className="mt-auto p-8">
           <div className="bg-linear-to-br from-gray-900 to-gray-800 p-6 rounded-[2.5rem] border border-gray-700 shadow-2xl relative overflow-hidden group cursor-pointer">
              <div className="relative z-10">
                <div className="flex justify-between items-end mb-4">
                  <p className="text-[9px] font-black text-gray-400 uppercase">Class Identity</p>
                  <FiUsers className="text-blue-500" />
                </div>
                <p className="text-sm font-black italic uppercase text-white">{SO_DATA.user.level}</p>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-3xl z-0"></div>
           </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* HEADER: SOCIAL & IDENTITY */}
        <header className="h-24 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-900 flex items-center justify-between px-10 sticky top-0 z-30">
           <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 transition-all shadow-sm">
              <HeaderTab active={view === 'social'} onClick={() => setView('social')} icon={<FiGlobe/>} label="Circle Feed" />
              <HeaderTab active={false} onClick={() => {}} icon={<FiMessageSquare/>} label="Chat Room" />
           </div>

           <div className="flex items-center gap-6">
              <div className="relative cursor-pointer hover:scale-110 transition-all p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 group">
                 <FiBell size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                 <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-950"></span>
              </div>
              
              <div className="flex items-center gap-4 pl-6 border-l border-gray-100 dark:border-gray-800">
                 <div className="text-right hidden sm:block">
                    <p className="text-xs font-black dark:text-white uppercase italic tracking-tighter leading-none">{SO_DATA.user.name}</p>
                    <p className="text-[8px] text-blue-600 font-black uppercase mt-1 tracking-widest italic">{SO_DATA.user.nisn}</p>
                 </div>
                 <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-xl group cursor-pointer transition-all hover:rotate-3">
                    <div className="w-full h-full bg-white dark:bg-gray-950 rounded-[0.9rem] flex items-center justify-center text-blue-600 font-black italic text-lg tracking-tighter">
                      {SO_DATA.user.avatar}
                    </div>
                 </div>
              </div>
           </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-10 lg:p-14 scroll-smooth bg-gray-50/30 dark:bg-gray-950">
           <div className="max-w-7xl mx-auto">
              {view === 'home' && <HomeView />}
              {view === 'academic' && <AcademicView />}
              {(['tasks', 'ekskul', 'social', 'report']).includes(view) && (
                <div className="py-40 text-center animate-in zoom-in-95 duration-500">
                   <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-4xl flex items-center justify-center mx-auto text-blue-600 mb-6 shadow-xl shadow-blue-500/10">
                     <FiZap size={40} className="animate-bounce" />
                   </div>
                   <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Coming Soon</h3>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] max-w-sm mx-auto leading-relaxed">Fitur "{view}" sedang dalam tahap finalisasi untuk pengalaman belajar terbaik.</p>
                </div>
              )}
           </div>
        </main>

        {/* MOBILE NAVIGATION */}
        <div className="lg:hidden h-20 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 flex items-center justify-around px-6 sticky bottom-0 z-50">
           <button onClick={() => setView('home')} className={`p-4 rounded-2xl transition-all ${view === 'home' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' : 'text-gray-400'}`}><FiHome size={22}/></button>
           <button onClick={() => setView('academic')} className={`p-4 rounded-2xl transition-all ${view === 'academic' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' : 'text-gray-400'}`}><FiBookOpen size={22}/></button>
           <button onClick={() => setView('social')} className={`p-4 rounded-2xl transition-all ${view === 'social' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' : 'text-gray-400'}`}><FiGlobe size={22}/></button>
           <button onClick={() => setView('ekskul')} className={`p-4 rounded-2xl transition-all ${view === 'ekskul' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' : 'text-gray-400'}`}><FiStar size={22}/></button>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// HELPER COMPONENTS
// =============================================================================
const SidebarBtn = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/40 -translate-y-1' : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50 hover:text-blue-600'}`}>
    <span className={`${active ? 'text-white' : 'group-hover:text-blue-600 text-gray-400'} transition-colors text-xl`}>{icon}</span>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const HeaderTab = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 ${active ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-md ring-1 ring-gray-100 dark:ring-gray-700' : 'text-gray-400 hover:text-gray-600'}`}>
    <span className={`${active ? 'scale-110' : ''} text-lg`}>{icon}</span>
    <span className="text-[9px] font-black uppercase tracking-widest leading-none">{label}</span>
  </button>
);

export default SoSchoolSiswaPro;