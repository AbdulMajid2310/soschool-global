"use client";

import React, { useState } from 'react';
import {
    FiPlus, FiSend, FiArrowDownLeft, FiArrowUpRight,
    FiActivity, FiCreditCard, FiShield, FiMoreHorizontal,
    FiZap, FiDownload, FiUsers, FiX, FiCheckCircle,
    FiEye, FiEyeOff, FiTrendingUp, FiSmartphone, FiArrowRight,
    FiHome,
    FiPhone,
    FiGrid,
    FiChevronRight
} from 'react-icons/fi';
import TopUpModal from './topUpModal';
import TransferModal from './transferModal';

// --- TYPES (English) ---
interface Transaction {
    id: string;
    type: 'In' | 'Out';
    category: string;
    title: string;
    amount: number;
    date: string;
    time: string;
    recipient?: string;
    paymentMethod: string;
    referenceId: string;
}


const SoPayDashboard = () => {
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
    const [isHideBalance, setIsHideBalance] = useState(false);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);
    const [isTransferOpen, setIsTransferOpen] = useState(false);

    // --- DATA REALISTIS (Indonesian Content) ---
    const [balance] = useState(1250500);
    const [income] = useState(1500000); // Total Pemasukan
    const [expense] = useState(249500);  // Total Pengeluaran



    const [transactions] = useState<Transaction[]>([
        {
            id: 'TX-99201', type: 'Out', category: 'Kantin', title: 'Makan Siang Kantin',
            amount: 25500, date: '28 Jan 2026', time: '12:30:11',
            paymentMethod: 'SoPay Wallet', referenceId: 'SPY-009211882', recipient: 'Kantin Sehat'
        },
        {
            id: 'TX-99202', type: 'In', category: 'Topup', title: 'Top Up dari BNI',
            amount: 500000, date: '28 Jan 2026', time: '09:00:45',
            paymentMethod: 'Virtual Account', referenceId: 'BNI-77281922'
        },
        {
            id: 'TX-99203', type: 'Out', category: 'Perpus', title: 'Denda Buku Clean Code',
            amount: 6000, date: '27 Jan 2026', time: '14:20:00',
            paymentMethod: 'SoPay Wallet', referenceId: 'LIB-221199', recipient: 'Perpus SoSchool'
        },
        {
            id: 'TX-99204', type: 'Out', category: 'Kantin', title: 'Es Teh Manis & Snack',
            amount: 12000, date: '27 Jan 2026', time: '10:15:00',
            paymentMethod: 'SoPay Wallet', referenceId: 'SPY-009211885', recipient: 'Kantin Stall 01'
        },
    ]);



    return (
        <div className="min-h-screen  font-sans pb-20 selection:bg-emerald-500">

            {/* --- AMBIENT BLOOM --- */}
            <div className="fixed top-0 left-1/4 w-100 h-100 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

            <main className="relative z-10 ">

                {/* --- HEADER --- */}
                <div className="flex justify-between items-center mb-10 bg-white/2 border border-white/5 p-5 rounded-4xl backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
                            <FiZap size={20} />
                        </div>
                        <h1 className="text-lg font-black text-white italic tracking-tighter uppercase">SoPay<span className="text-emerald-500">.</span>Center</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right mr-2 hidden sm:block">
                            <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest leading-none mb-1">Status Enkripsi</p>
                            <p className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1 justify-end">
                                <FiShield size={10} /> Aktif
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-900 border border-white/10" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* --- LEFT: MAIN WALLET --- */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Balance Card */}
                        <div className="bg-[#0D0D0D] border border-white/5 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute bottom-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <FiCreditCard size={120} />
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Total Saldo</p>
                                <button onClick={() => setIsHideBalance(!isHideBalance)} className="hover:text-emerald-500 transition-colors">
                                    {isHideBalance ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                                </button>
                            </div>
                            <h2 className="text-5xl font-black text-white italic tracking-tighter mb-10">
                                {isHideBalance ? "••••••••" : `Rp ${balance.toLocaleString('id-ID')}`}
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => setIsTopUpOpen(true)} className="py-4 bg-emerald-500 hover:bg-emerald-400 text-black rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg shadow-emerald-500/10 active:scale-95">
                                    <FiPlus size={16} className="inline mr-2" /> Top Up
                                </button>
                                <button onClick={() => setIsTransferOpen(true)} className="py-4 bg-white z-20 hover:bg-gray-200 text-black rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95">
                                    <FiSend size={16} className="inline mr-2" /> Transfer
                                </button>
                            </div>
                        </div>

                        {/* Income & Expense Breakdown */}
                        <div className="bg-[#0D0D0D] border border-white/5 p-8 rounded-[2.5rem] grid grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-2">
                                    <FiArrowDownLeft /> Pemasukan
                                </div>
                                <p className="text-lg font-black text-white italic tracking-tighter">Rp {income.toLocaleString('id-ID')}</p>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-3">
                                    <div className="h-full bg-emerald-500 w-[70%]" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest mb-2">
                                    <FiArrowUpRight /> Pengeluaran
                                </div>
                                <p className="text-lg font-black text-white italic tracking-tighter ">Rp {expense.toLocaleString('id-ID')}</p>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-3">
                                    <div className="h-full bg-red-500 w-[25%]" />
                                </div>
                            </div>
                        </div>

                        {/* Quick Contacts */}
                        <div className="bg-[#0D0D0D] border border-white/5 p-8 rounded-[2.5rem]">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <FiUsers className="text-emerald-500" /> Transfer Cepat
                            </h3>
                            <div className="flex gap-4">
                                {['BS', 'AK', 'RW', 'MT'].map((init, i) => (
                                    <div key={i} className="w-12 h-12 bg-gray-950 border border-white/5 rounded-xl flex items-center justify-center text-[10px] font-black text-gray-500 hover:border-emerald-500 hover:text-white transition-all cursor-pointer">
                                        {init}
                                    </div>
                                ))}
                                <div className="w-12 h-12 border border-dashed border-gray-800 rounded-xl flex items-center justify-center text-gray-700 hover:text-emerald-500 hover:border-emerald-500 cursor-pointer transition-all">
                                    <FiPlus size={18} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT: ACTIVITY LIST --- */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-3">
                                <FiActivity className="text-emerald-500" /> Histori Transaksi
                            </h2>
                            <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-white transition-colors">
                                <FiDownload size={18} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {transactions.map(tx => (
                                <div
                                    key={tx.id}
                                    onClick={() => setSelectedTx(tx)}
                                    className="group bg-[#0D0D0D] border border-white/5 p-5 rounded-3xl flex items-center justify-between hover:border-emerald-500/30 cursor-pointer transition-all active:scale-[0.99]"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'In' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-800/50 text-gray-400'}`}>
                                            {tx.type === 'In' ? <FiArrowDownLeft size={20} /> : <FiArrowUpRight size={20} />}
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-black text-white italic uppercase tracking-tighter leading-none mb-1">{tx.title}</p>
                                            <p className="text-[9px] font-bold text-gray-700 uppercase">{tx.date} • {tx.time}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-base font-black italic ${tx.type === 'In' ? 'text-emerald-500' : 'text-white'}`}>
                                            {tx.type === 'In' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
                                        </p>
                                        <div className="flex items-center justify-end gap-1 mt-1">
                                            <span className="text-[8px] font-black text-gray-800 uppercase tracking-widest">Detail</span>
                                            <FiArrowRight size={10} className="text-gray-800 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ANALYTICS PREVIEW CARD */}
                        <div className="bg-linear-to-r from-emerald-500/5 to-transparent border border-emerald-500/10 p-8 rounded-[3rem] mt-10 flex items-center justify-between group">
                            <div className="space-y-2">
                                <h4 className="text-xs font-black text-white uppercase italic tracking-widest">Analitik Bulanan</h4>
                                <p className="text-[10px] text-gray-500 max-w-sm leading-relaxed">
                                    Pengeluaran Anda bulan ini turun <span className="text-emerald-500">12%</span> dibandingkan bulan lalu. Kerja bagus, Majid!
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <FiTrendingUp size={40} className="text-emerald-500 opacity-20 group-hover:opacity-50 transition-opacity" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RECEIPT MODAL --- */}
                {selectedTx && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="relative w-full max-w-100 bg-[#0D0D0D] border border-white/10 rounded-[3.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                            <div className="p-10">
                                <div className="text-center mb-10">
                                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-black mx-auto mb-4 shadow-xl shadow-emerald-500/20">
                                        <FiCheckCircle size={32} />
                                    </div>
                                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Status: Berhasil</h3>
                                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1">Ref No: {selectedTx.referenceId}</p>
                                </div>

                                <div className="bg-white/5 rounded-3xl p-8 mb-10 text-center border border-white/5">
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Jumlah Transaksi</p>
                                    <p className="text-4xl font-black text-white italic tracking-tighter">Rp {selectedTx.amount.toLocaleString('id-ID')}</p>
                                </div>

                                <div className="space-y-4 px-2">
                                    <ReceiptRow label="Kategori" value={selectedTx.category} />
                                    <ReceiptRow label="Metode" value={selectedTx.paymentMethod} />
                                    {selectedTx.recipient && <ReceiptRow label="Tujuan" value={selectedTx.recipient} />}
                                    <ReceiptRow label="Waktu" value={`${selectedTx.date}, ${selectedTx.time}`} />
                                </div>

                                <div className="flex gap-3 mt-12">
                                    <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase text-white transition-all">
                                        Cetak
                                    </button>
                                    <button className="flex-1 py-4 bg-emerald-500 text-black rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase transition-all">
                                        Simpan
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedTx(null)}
                                className="absolute top-8 right-8 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all text-white"
                            >
                                <FiX size={16} />
                            </button>
                        </div>
                    </div>
                )}

            </main>
            {/* --- FLOATING TOP-UP MODAL --- */}
            {isTopUpOpen && (
                <TopUpModal onClose={() => setIsTopUpOpen(false)} />
            )}

            {isTransferOpen && (
                <TransferModal onClose={() => setIsTransferOpen(false)} />
            )}
        </div>
    );
};

const ReceiptRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between items-center">
        <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">{label}</span>
        <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{value}</span>
    </div>
);

export default SoPayDashboard;