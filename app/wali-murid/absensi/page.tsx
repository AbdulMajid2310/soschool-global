"use client";

import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { 
  FiCheckCircle, FiAlertCircle, FiBookOpen, 
  FiList, FiClock, FiActivity, FiArrowUpRight, FiUser, FiMapPin, FiLayers, FiCoffee, FiThermometer
} from 'react-icons/fi';

const ALL_SUBJECTS_DATA = [
  { id: 's1', name: 'Matematika', date: '2026-02-02', day: 'Senin', time: '07:30', status: 'HADIR', note: 'Aktif bertanya di materi integral.' },
  { id: 's2', name: 'Bahasa Inggris', date: '2026-02-02', day: 'Senin', time: '09:15', status: 'HADIR', note: 'Percaya diri dalam speaking test.' },
  { id: 's3', name: 'Pemrograman Web', date: '2026-02-02', day: 'Senin', time: '11:00', status: 'BOLOS', note: 'Siswa tidak terlihat di area laboratorium.' },
  { id: 's4', name: 'Fisika', date: '2026-02-02', day: 'Senin', time: '13:30', status: 'HADIR', note: 'Fokus pada praktikum optik.' },
  { id: 's5', name: 'Pendidikan Agama', date: '2026-01-30', day: 'Jumat', time: '07:30', status: 'SAKIT', note: 'Izin sakit (Demam disertai pusing).' },
  { id: 's6', name: 'Sejarah Indonesia', date: '2026-01-30', day: 'Jumat', time: '09:15', status: 'SAKIT', note: 'Izin sakit (Demam).' },
  { id: 's7', name: 'Olahraga', date: '2026-01-29', day: 'Kamis', time: '07:30', status: 'IZIN', note: 'Mewakili sekolah di LKS Nasional.' },
  { id: 's8', name: 'Kimia', date: '2026-01-29', day: 'Kamis', time: '10:00', status: 'HADIR', note: 'Menyelesaikan modul tepat waktu.' },
  { id: 's9', name: 'Biologi', date: '2026-01-28', day: 'Rabu', time: '07:30', status: 'HADIR', note: 'Hadir.' },
  { id: 's10', name: 'Seni Budaya', date: '2026-01-28', day: 'Rabu', time: '10:00', status: 'HADIR', note: 'Hadir.' },
  { id: 's11', name: 'Ekonomi', date: '2026-01-27', day: 'Selasa', time: '08:00', status: 'HADIR', note: 'Hadir.' },
  { id: 's12', name: 'Geografi', date: '2026-01-27', day: 'Selasa', time: '11:00', status: 'HADIR', note: 'Hadir.' },
];

export default function AbsensiWaliMurid() {
  const [activeTab, setActiveTab] = useState<'today' | 'issue' | 'all'>('today');
  const today = '2026-02-02';
  const router = useRouter()

  const stats = useMemo(() => {
    const total = ALL_SUBJECTS_DATA.length;
    const hadir = ALL_SUBJECTS_DATA.filter(d => d.status === 'HADIR').length;
    const bolos = ALL_SUBJECTS_DATA.filter(d => d.status === 'BOLOS').length;
    const sakit = ALL_SUBJECTS_DATA.filter(d => d.status === 'SAKIT').length;
    const izin = ALL_SUBJECTS_DATA.filter(d => d.status === 'IZIN').length;
    const issueList = ALL_SUBJECTS_DATA.filter(d => d.status !== 'HADIR');
    const todayList = ALL_SUBJECTS_DATA.filter(d => d.date === today);
    const percentage = Math.round((hadir / total) * 100);

    return { total, hadir, bolos, sakit, izin, issueList, todayList, percentage };
  }, [today]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-1000">
      
      {/* --- TOP BENTO SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <FiUser size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black italic uppercase tracking-tighter leading-none">Ananda Pratama</h2>
                <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mt-1">XII - RPL 1</p>
              </div>
            </div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter leading-tight">
              KONTROL <span className="text-indigo-300">DISIPLIN</span>
            </h1>
          </div>
          
          <div className="relative z-10 mt-8">
              <p className="text-[9px] font-black uppercase text-indigo-200 italic">Persentase Hadir</p>
              <p className="text-5xl font-black italic">{stats.percentage}%</p>
          </div>
          <FiActivity className="absolute -right-5 -bottom-5 text-[12rem] text-white/5 rotate-12" />
        </div>

        {/* Bento Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Total Pertemuan */}
          <div className="bg-slate-900 text-white rounded-4xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <FiLayers className="text-white/10 absolute -right-2 -bottom-2" size={80} />
            <p className="text-[9px] font-black uppercase text-slate-400 italic relative z-10">Total Pertemuan</p>
            <p className="text-4xl font-black italic relative z-10">{stats.total}</p>
          </div>

          {/* Hadir */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-4xl p-6 flex flex-col justify-between shadow-sm group">
            <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"><FiCheckCircle /></div>
            <div>
              <p className="text-2xl font-black italic dark:text-white leading-none">{stats.hadir}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Total Hadir</p>
            </div>
          </div>

          {/* Izin */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-4xl p-6 flex flex-col justify-between shadow-sm group">
            <div className="w-10 h-10 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"><FiCoffee /></div>
            <div>
              <p className="text-2xl font-black italic dark:text-white leading-none">{stats.izin}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Total Izin</p>
            </div>
          </div>

          {/* Sakit */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-4xl p-6 flex flex-col justify-between shadow-sm group">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"><FiThermometer /></div>
            <div>
              <p className="text-2xl font-black italic dark:text-white leading-none">{stats.sakit}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Total Sakit</p>
            </div>
          </div>

          {/* Bolos */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-4xl p-6 flex flex-col justify-between shadow-sm group text-rose-600">
            <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"><FiAlertCircle /></div>
            <div>
              <p className="text-2xl font-black italic leading-none">{stats.bolos}</p>
              <p className="text-[9px] font-bold text-rose-400 uppercase mt-1">Total Bolos</p>
            </div>
          </div>

          {/* Action Card */}
          <div className="bg-indigo-50 dark:bg-indigo-500/5 rounded-4xl p-6 flex flex-col justify-center items-center text-center border border-dashed border-indigo-200 dark:border-indigo-500/20 group hover:bg-indigo-600 transition-all cursor-pointer">
            <p className="text-[9px] font-black uppercase text-indigo-600 group-hover:text-white italic">Unduh Rekap</p>
            <FiArrowUpRight className="text-indigo-600 group-hover:text-white mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
          </div>
        </div>
      </div>

      {/* --- TAB NAVIGATION --- */}
      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-white/5 rounded-[2.5rem] w-fit mx-auto md:mx-0 border border-slate-200 dark:border-white/5">
        {[
          { id: 'today', label: 'Hari Ini', icon: <FiClock /> },
          { id: 'issue', label: 'Masalah', icon: <FiAlertCircle /> },
          { id: 'all', label: '12 Mapel', icon: <FiList /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-3 px-8 py-3 rounded-full text-[10px] font-black uppercase italic tracking-wider transition-all
            ${activeTab === tab.id ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-xl' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="min-h-100">
        {activeTab === 'today' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-8 duration-700">
            {stats.todayList.map((mapel) => (
              <div key={mapel.id} onClick={()=> router.push('/wali-murid/absensi/detail')} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm hover:border-indigo-500 transition-all flex flex-col justify-between group relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[8px] font-black bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-lg text-slate-500 dark:text-slate-400 uppercase italic">{mapel.time}</span>
                    <div className={`w-2 h-2 rounded-full ${mapel.status === 'HADIR' ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
                  </div>
                  <h4 className="text-lg font-black italic uppercase dark:text-white leading-none mb-2 tracking-tighter">{mapel.name}</h4>
                  <p className="text-[10px] italic text-slate-400 line-clamp-2">"{mapel.note}"</p>
                </div>
                <div className={`mt-6 pt-4 border-t border-slate-50 dark:border-white/5 text-[9px] font-black uppercase italic relative z-10 ${mapel.status === 'HADIR' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  Status: {mapel.status}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'issue' && (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-xl animate-in slide-in-from-bottom-8 duration-700 overflow-hidden">
            <div className="p-8 border-b border-slate-50 dark:border-white/5 flex justify-between items-center bg-rose-50/30 dark:bg-rose-500/5">
              <h4 className="text-xs font-black italic uppercase tracking-widest text-rose-600">Log Ketidakhadiran</h4>
              <FiAlertCircle className="text-rose-600" size={20} />
            </div>
            <div className="divide-y divide-slate-50 dark:divide-white/5">
              {stats.issueList.map((item) => (
                <div key={item.id} onClick={()=> router.push('/wali-murid/absensi/detail')} className="p-8 flex flex-col md:flex-row md:items-center gap-8 group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <div className="md:w-32">
                    <p className="text-[9px] font-black text-slate-400 uppercase italic">{item.day}</p>
                    <p className="text-lg font-black italic dark:text-white leading-none">{item.date.split('-').reverse().join('/')}</p>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs font-black dark:text-white uppercase italic mb-1 tracking-wider">{item.name}</h5>
                    <p className="text-[11px] italic text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-black/20 p-4 rounded-2xl border border-slate-100 dark:border-white/5 leading-relaxed">
                      "{item.note}"
                    </p>
                  </div>
                  <div className={`px-5 py-2 rounded-full text-[9px] font-black italic uppercase tracking-widest text-center min-w-25
                    ${item.status === 'BOLOS' ? 'bg-rose-600 text-white' : item.status === 'SAKIT' ? 'bg-amber-500 text-white' : 'bg-blue-600 text-white'}`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'all' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-in slide-in-from-bottom-8 duration-700">
            {ALL_SUBJECTS_DATA.map((mapel) => (
              <div key={mapel.id} onClick={()=> router.push('/wali-murid/absensi/detail')} className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-white/5 flex flex-col items-center text-center group hover:border-indigo-500 transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4
                  ${mapel.status === 'HADIR' ? 'bg-emerald-500' : mapel.status === 'BOLOS' ? 'bg-rose-500' : mapel.status === 'SAKIT' ? 'bg-amber-500' : 'bg-blue-500'}`}>
                  <FiBookOpen size={16} />
                </div>
                <h5 className="text-[9px] font-black dark:text-white uppercase italic leading-tight mb-1">{mapel.name}</h5>
                <p className="text-[7px] font-bold text-slate-400 uppercase italic">{mapel.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- FOOTER --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <FiMapPin className="text-indigo-500" />
          <p className="text-[10px] font-bold text-slate-400 uppercase italic tracking-wider">SMK Negeri SoSchool - Monitoring Aktif</p>
        </div>
      </div>

    </div>
  );
}